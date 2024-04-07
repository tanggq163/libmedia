/*
 * libmedia Webcodec video decoder
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 * 
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 * 
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

import { AVCodecID, AVPacketSideDataType } from 'avutil/codec'
import browser from 'common/util/browser'
import getVideoCodec from '../function/getVideoCodec'
import AVPacket, { AVPacketFlags } from 'avutil/struct/avpacket'
import { mapUint8Array } from 'cheap/std/memory'
import AVCodecParameters from 'avutil/struct/avcodecparameters'
import { getAVPacketSideData } from 'avutil/util/avpacket'
import { getHardwarePreference } from '../function/getHardwarePreference'
import { BitFormat } from 'avformat/codecs/h264'

export type WebVideoDecoderOptions = {
  onReceiveFrame?: (frame: VideoFrame) => void
  enableHardwareAcceleration?: boolean
  onError: (error?: Error) => void
}

export default class WebVideoDecoder {

  private decoder: VideoDecoder

  private options: WebVideoDecoderOptions

  private codecId: AVCodecID

  private profile: number

  private level: number

  private extradata: Uint8Array

  private currentError: Error

  private inputQueue: number[]
  private outputQueue: VideoFrame[]

  private sort: boolean

  private keyframeRequire: boolean

  constructor(options: WebVideoDecoderOptions) {

    this.options = options
    this.inputQueue = []
    this.outputQueue = []

    this.sort = browser.safari
  }

  private async output(frame: VideoFrame) {
    if (this.sort) {
      let i = 0
      for (; i < this.outputQueue.length; i++) {
        if (this.outputQueue[i].timestamp > frame.timestamp) {
          this.outputQueue.splice(i, 0, frame)
          break
        }
      }
      if (i === this.outputQueue.length) {
        this.outputQueue.push(frame)
      }

      while (this.outputQueue.length > 2
        && this.outputQueue[0].timestamp === this.inputQueue[0]
      ) {
        const output = this.outputQueue.shift()
        if (this.options.onReceiveFrame) {
          this.options.onReceiveFrame(output)
        }
        else {
          output.close()
        }
        this.inputQueue.shift()
      }
    }
    else {
      if (this.options.onReceiveFrame) {
        this.options.onReceiveFrame(frame)
      }
      else {
        frame.close()
      }
    }
  }

  private error(error: Error) {
    this.currentError = error
    this.options.onError(error)
  }

  private changeExtraData(buffer: Uint8Array) {
    /**
     * 硬解时如果 sps pps 设置过于频繁会导致解码帧率不稳定（某些流每一关键帧都带有相同的 sps pps，这种情况如果相同就不设置了）
     */
    if ((this.codecId === AVCodecID.AV_CODEC_ID_H264
      || this.codecId === AVCodecID.AV_CODEC_ID_HEVC
    )
      && buffer.length === this.extradata.length
    ) {
      let same = true
      for (let i = 0; i < buffer.length; i++) {
        if (buffer[i] !== this.extradata[i]) {
          same = false
          break
        }
      }
      if (same) {
        return
      }
    }

    this.extradata = buffer.slice()

    this.decoder.reset()

    this.decoder.configure({
      codec: getVideoCodec(this.codecId, this.profile, this.level, buffer),
      description: this.extradata,
      hardwareAcceleration: getHardwarePreference(this.options.enableHardwareAcceleration ?? true) as HardwareAcceleration
    })

    this.keyframeRequire = true
  }

  public async open(parameters: pointer<AVCodecParameters>) {
    this.currentError = null
    this.codecId = parameters.codecId
    this.profile = parameters.profile
    this.level = parameters.level
    this.extradata = null
    if (parameters.extradata !== nullptr) {
      this.extradata = mapUint8Array(parameters.extradata, parameters.extradataSize).slice()
    }

    const config = {
      codec: getVideoCodec(this.codecId, this.profile, this.level, this.extradata),
      codedWidth: parameters.width,
      codedHeight: parameters.height,
      description: (parameters.bitFormat !== BitFormat.ANNEXB) ? this.extradata : undefined,
      hardwareAcceleration: getHardwarePreference(this.options.enableHardwareAcceleration ?? true) as HardwareAcceleration
    }

    const support = await VideoDecoder.isConfigSupported(config)

    if (!support.supported) {
      throw new Error('not support')
    }

    if (this.decoder && this.decoder.state !== 'closed') {
      this.decoder.close()
    }

    this.decoder = new VideoDecoder({
      output: this.output.bind(this),
      error: this.error.bind(this)
    })

    this.decoder.reset()
    this.decoder.configure(config)

    if (this.currentError) {
      throw this.currentError
    }

    this.keyframeRequire = true

    this.inputQueue.length = 0
    this.outputQueue.length = 0
  }

  public decode(avpacket: pointer<AVPacket>) {

    const element = getAVPacketSideData(avpacket, AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA)

    if (element !== nullptr) {
      this.changeExtraData(mapUint8Array(element.data, element.size))
    }

    const timestamp = Number(avpacket.pts)
    const key = avpacket.flags & AVPacketFlags.AV_PKT_FLAG_KEY

    if (this.keyframeRequire && !key) {
      return
    }

    const videoChunk = new EncodedVideoChunk({
      type: key ? 'key' : 'delta',
      timestamp,
      data: mapUint8Array(avpacket.data, avpacket.size)
    })

    if (this.sort) {
      let i = 0
      for (; i < this.inputQueue.length; i++) {
        if (this.inputQueue[i] > timestamp) {
          this.inputQueue.splice(i, 0, timestamp)
          break
        }
      }
      if (i === this.inputQueue.length) {
        this.inputQueue.push(timestamp)
      }
    }

    try {
      this.decoder.decode(videoChunk)
    }
    catch (error) {
      return -1
    }

    if (key) {
      this.keyframeRequire = false
    }

    return 0
  }

  public async flush() {
    await this.decoder.flush()
    if (this.sort) {
      while (this.outputQueue.length) {
        const frame = this.outputQueue.shift()
        if (this.options.onReceiveFrame) {
          this.options.onReceiveFrame(frame)
        }
        else {
          frame.close()
        }
      }
    }
    this.keyframeRequire = true
  }

  public close() {
    if (this.decoder && this.decoder.state !== 'closed') {
      this.decoder.close()
    }
    this.decoder = null
    this.currentError = null

    if (this.outputQueue?.length) {
      this.outputQueue.forEach((frame) => {
        frame.close()
      })
    }

    this.inputQueue = null
    this.outputQueue = null
  }

  public getQueueLength() {
    return this.decoder.decodeQueueSize
  }
}