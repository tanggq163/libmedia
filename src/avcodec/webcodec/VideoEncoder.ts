/*
 * libmedia Webcodec video encoder
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

import * as logger from 'common/util/logger'
import browser from 'common/util/browser'
import AVPacket from 'avutil/struct/avpacket'
import { AVCodecID } from 'avutil/codec'
import AVCodecParameters from 'avutil/struct/avcodecparameters'

export type WebVideoEncoderOptions = {
  onReceivePacket: (avpacket: AVPacket) => void
  onError: (error?: Error) => void
  enableHardwareAcceleration?: boolean
}

export default class WebVideoEncoder {

  private encoder: VideoEncoder

  private options: WebVideoEncoderOptions

  constructor(options: WebVideoEncoderOptions) {

    this.options = options

    this.encoder = new VideoEncoder({
      output: this.output.bind(this),
      error: this.error.bind(this)
    })
  }

  private async output(chunk: EncodedVideoChunk, metadata?: EncodedVideoChunkMetadata) {
    if (this.options.onReceivePacket) {

    }
  }

  private error(error: Error) {
    this.options.onError(error)
  }

  private getHardwarePreference(enable: boolean) {
    if (enable) {
      if (browser.checkVersion(browser.majorVersion, '94', true)) {
        return 'prefer-hardware'
      }
      else {
        return 'allow'
      }
    }
    else {
      if (browser.checkVersion(browser.majorVersion, '94', true)) {
        return 'prefer-software'
      }
      else {
        return 'deny'
      }
    }
  }

  public open(parameters: AVCodecParameters) {

  }

  public encode(frame: VideoFrame, key: boolean) {

  }

  public async flush() {
    await this.encoder.flush()
  }

  public close() {
    this.encoder.close()
    this.encoder = null
  }

  public getQueueLength() {
    return this.encoder.encodeQueueSize
  }
}