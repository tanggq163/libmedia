/*
 * libmedia AVPlayer Controller
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

import { AVMediaType } from 'avutil/codec'
import IPCPort, { NOTIFY, RpcMessage } from 'common/network/IPCPort'
import createMessageChannel from './function/createMessageChannel'

export interface ControllerObserver {
  onVideoEnded: () => void
  onAudioEnded: () => void
  onCanvasUpdated: () => void
  onFirstVideoRendered: () => void
  onFirstVideoRenderedAfterUpdateCanvas: () => void
  onTimeUpdate: (pts: int64) => void
  onMSESeek: (time: number) => void
}

export default class Controller {
  private videoRenderControlChannel: MessageChannel
  private audioRenderControlChannel: MessageChannel
  private muxerControlChannel: MessageChannel

  private videoRenderControlIPCPort: IPCPort
  private audioRenderControlIPCPort: IPCPort
  private muxerControlIPCPort: IPCPort

  private observer: ControllerObserver

  private visibilityHidden: boolean
  private onVisibilityChange: (event: any) => void
  private timeUpdateListenType: AVMediaType
  private enableAudioVideoSync: boolean

  constructor(observer: ControllerObserver) {
    this.observer = observer
    this.videoRenderControlChannel = createMessageChannel()
    this.audioRenderControlChannel = createMessageChannel()
    this.muxerControlChannel = createMessageChannel()

    this.videoRenderControlIPCPort = new IPCPort(this.videoRenderControlChannel.port2)
    this.audioRenderControlIPCPort = new IPCPort(this.audioRenderControlChannel.port2)
    this.muxerControlIPCPort = new IPCPort(this.muxerControlChannel.port2)
    this.enableAudioVideoSync = true

    this.videoRenderControlIPCPort.on(NOTIFY, (request: RpcMessage) => {
      switch (request.method) {
        case 'ended':
          this.observer.onVideoEnded()
          break
        case 'updateCanvas':
          this.observer.onCanvasUpdated()
          break
        case 'firstRendered':
          this.observer.onFirstVideoRendered()
          break
        case 'firstRenderedAfterUpdateCanvas':
          this.observer.onFirstVideoRenderedAfterUpdateCanvas()
          break
        case 'syncPts':
          if (this.timeUpdateListenType === AVMediaType.AVMEDIA_TYPE_VIDEO) {
            this.observer.onTimeUpdate(request.params.pts)
          }
          break
      }
    })

    this.audioRenderControlIPCPort.on(NOTIFY, (request: RpcMessage) => {
      switch (request.method) {
        case 'syncPts':
          if (this.enableAudioVideoSync) {
            this.videoRenderControlIPCPort.notify('syncPts', request.params)
          }
          if (this.timeUpdateListenType === AVMediaType.AVMEDIA_TYPE_AUDIO) {
            this.observer.onTimeUpdate(request.params.pts)
          }
          break
        case 'ended':
          this.observer.onAudioEnded()
          break
      }
    })

    this.muxerControlIPCPort.on(NOTIFY, (request: RpcMessage) => {
      switch (request.method) {
        case 'seek':
          this.observer.onMSESeek(request.params.time)
          break
      }
    })

    this.onVisibilityChange = (event: any) => {
      this.visibilityHidden = document.visibilityState === 'hidden'
      this.videoRenderControlIPCPort.notify('skipRender', {
        skipRender: this.visibilityHidden
      })
    }
    this.visibilityHidden = document.visibilityState === 'hidden'
    document.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  public getVideoRenderControlPort() {
    return this.videoRenderControlChannel.port1
  }

  public getAudioRenderControlPort() {
    return this.audioRenderControlChannel.port1
  }

  public getMuxerRenderControlPort() {
    return this.muxerControlChannel.port1
  }

  public setTimeUpdateListenType(type: AVMediaType) {
    this.timeUpdateListenType = type
  }

  public setEnableAudioVideoSync(enable: boolean) {
    this.enableAudioVideoSync = enable
  }

  public destroy() {
    if (this.videoRenderControlIPCPort) {
      this.videoRenderControlIPCPort.destroy()
    }
    if (this.audioRenderControlIPCPort) {
      this.audioRenderControlIPCPort.destroy()
    }
    if (this.muxerControlIPCPort) {
      this.muxerControlIPCPort.destroy()
    }

    if (this.onVisibilityChange) {
      document.removeEventListener('visibilitychange', this.onVisibilityChange)
      this.onVisibilityChange = null
    }

    this.videoRenderControlIPCPort
      = this.audioRenderControlIPCPort
      = this.muxerControlIPCPort
      = this.videoRenderControlChannel
      = this.audioRenderControlChannel
      = this.muxerControlChannel = null
  }
}