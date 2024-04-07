/*
 * libmedia hls loader
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

import Sleep from 'common/timer/Sleep'
import IOLoader, { IOLoaderStatus, Range } from './IOLoader'
import * as object from 'common/util/object'
import { IOError } from 'common/io/error'
import { Uint8ArrayInterface } from 'common/io/interface'
import * as errorType from 'avutil/error'
import { buildAbsoluteURL } from 'common/util/url'

import hlsParser from 'avprotocol/m3u8/parser'
import { MasterPlaylist, MediaPlaylist, Playlist } from 'avprotocol/m3u8/types'
import FetchIOLoader from './FetchIOLoader'
import getTimestamp from 'common/function/getTimestamp'
import * as logger from 'common/util/logger'

const FETCHED_HISTORY_LIST_MAX = 10

export interface FetchInfo {
  url: string
  headers?: Object
  withCredentials?: boolean
  referrerPolicy?: string
}

export default class HlsIOLoader extends IOLoader {


  private info: FetchInfo

  private range: Range

  private masterPlaylist: MasterPlaylist

  private mediaPlayList: MediaPlaylist

  private mediaPlayListIndex: number

  private fetchedMap: Map<string, boolean>

  private fetchedHistoryList: string[]

  private mediaListUrl: string

  private segmentIndex: number
  private currentUri: string

  private loader: FetchIOLoader
  private minBuffer: number

  private async fetchMasterPlayList() {
    const params: Partial<any> = {
      method: 'GET',
      headers: {},
      mode: 'cors',
      cache: 'default',
      referrerPolicy: 'no-referrer-when-downgrade'
    }
    if (this.info.headers) {
      object.each(this.info.headers, (value, key) => {
        params.headers[key] = value
      })
    }

    if (this.info.withCredentials) {
      params.credentials = 'include'
    }

    if (this.info.referrerPolicy) {
      params.referrerPolicy = this.info.referrerPolicy
    }

    try {
      const res = await fetch(this.info.url, params)
      const text = await res.text()

      const playList: Playlist = hlsParser(text)

      if (playList.isMasterPlaylist) {
        this.masterPlaylist = playList as MasterPlaylist
      }
      else {
        this.mediaPlayList = playList as MediaPlaylist

        if (this.options.isLive && (!this.mediaPlayList.segments || this.mediaPlayList.segments.length < 2)) {
          let wait = 5
          if (this.mediaPlayList.segments?.length) {
            wait = this.mediaPlayList.segments[0].duration * (2 - this.mediaPlayList.segments.length)
          }
          logger.warn(`wait for min buffer time, now segments: ${this.mediaPlayList.segments.length}`)
          await new Sleep(wait)
          return this.fetchMasterPlayList()
        }

        this.minBuffer = this.mediaPlayList.duration || 0

        if (this.mediaPlayList.endlist) {
          this.options.isLive = false
        }
        this.mediaListUrl = this.info.url
      }
      return playList
    }
    catch (error) {
      if (this.retryCount < this.options.retryCount) {
        this.retryCount++
        logger.error(`failed fetch m3u8 file, retry(${this.retryCount}/3)`)
        await new Sleep(5)
        return this.fetchMasterPlayList()
      }
      else {
        this.status = IOLoaderStatus.ERROR
        logger.fatal('HLSLoader: exception, fetch slice error')
      }
    }
  }

  private async fetchMediaPlayList() {
    let url: string

    if (this.masterPlaylist) {
      const currentVariant = this.masterPlaylist.variants[this.mediaPlayListIndex]

      if (!currentVariant) {
        logger.fatal('no media playlist')
      }
      url = currentVariant.uri
    }
    else {
      url = this.mediaListUrl
    }

    const params: Partial<any> = {
      method: 'GET',
      headers: {},
      mode: 'cors',
      cache: 'default',
      referrerPolicy: 'no-referrer-when-downgrade'
    }
    if (this.info.headers) {
      object.each(this.info.headers, (value, key) => {
        params.headers[key] = value
      })
    }

    if (this.info.withCredentials) {
      params.credentials = 'include'
    }

    if (this.info.referrerPolicy) {
      params.referrerPolicy = this.info.referrerPolicy
    }

    try {
      const res = await fetch(url, params)
      const text = await res.text()
      this.mediaPlayList = hlsParser(text) as MediaPlaylist

      if (this.options.isLive && (!this.mediaPlayList.segments || this.mediaPlayList.segments.length < 2)) {
        let wait = 5
        if (this.mediaPlayList.segments?.length) {
          wait = this.mediaPlayList.segments[0].duration * (2 - this.mediaPlayList.segments.length)
        }
        logger.warn(`wait for min buffer time, now segments: ${this.mediaPlayList.segments.length}`)
        await new Sleep(wait)
        return this.fetchMediaPlayList()
      }

      this.minBuffer = this.mediaPlayList.duration || 0

      if (this.mediaPlayList.endlist) {
        this.options.isLive = false
      }

      this.status = IOLoaderStatus.BUFFERING
      this.retryCount = 0

      return this.mediaPlayList
    }
    catch (error) {
      if (this.retryCount < this.options.retryCount) {
        this.retryCount++
        logger.error(`failed fetch m3u8 file, retry(${this.retryCount}/3)`)
        await new Sleep(this.options.retryInterval)
        return this.fetchMasterPlayList()
      }
      else {
        this.status = IOLoaderStatus.ERROR
        logger.fatal('HLSLoader: exception, fetch slice error')
      }
    }
  }


  public async open(info: FetchInfo, range: Range) {

    this.info = info
    this.range = range

    if (!this.range.to) {
      this.range.to = -1
    }

    this.range.from = Math.max(this.range.from, 0)

    this.mediaPlayListIndex = 0
    this.segmentIndex = 0

    this.fetchedMap = new Map()
    this.fetchedHistoryList = []

    this.status = IOLoaderStatus.CONNECTING
    this.retryCount = 0

    await this.fetchMasterPlayList()

    if (!this.mediaPlayList && this.masterPlaylist) {
      await this.fetchMediaPlayList()
    }

  }

  public async read(buffer: Uint8ArrayInterface): Promise<number> {

    let ret = 0

    if (this.loader) {
      ret = await this.loader.read(buffer)
      if (ret !== IOError.END) {
        return ret
      }
      else {
        if (this.options.isLive) {
          this.fetchedMap.set(this.currentUri, true)
          if (this.fetchedHistoryList.length === FETCHED_HISTORY_LIST_MAX) {
            this.fetchedMap.delete(this.fetchedHistoryList.shift())
          }
          this.fetchedHistoryList.push(this.currentUri)
        }
        else {
          this.segmentIndex++
          if (this.segmentIndex >= this.mediaPlayList.segments.length) {
            logger.info('hls segments ended')
            this.status = IOLoaderStatus.COMPLETE
            return IOError.END
          }
        }
        this.loader = null
      }
    }

    if (this.options.isLive) {
      if (this.mediaPlayList.segments.filter((segment) => {
        return segment.key
      }).length) {
        return errorType.FORMAT_NOT_SUPPORT
      }

      const segments = this.mediaPlayList.segments.filter((segment) => {
        return !this.fetchedMap.get(segment.uri)
      })

      if (!segments.length) {
        if (this.mediaPlayList.endlist) {
          this.status = IOLoaderStatus.COMPLETE
          return IOError.END
        }

        const wait = (this.minBuffer - (getTimestamp() - this.mediaPlayList.timestamp) / 1000) / 2
        if (wait > 0) {
          await new Sleep(wait)
        }

        await this.fetchMediaPlayList()
        return this.read(buffer)
      }

      this.currentUri = segments[0].uri

      this.loader = new FetchIOLoader(object.extend({}, this.options, { disableSegment: true, loop: false }))

      await this.loader.open(
        {
          url: buildAbsoluteURL(this.info.url, this.currentUri)
        },
        {
          from: 0,
          to: -1
        }
      )
      return this.loader.read(buffer)
    }
    else {
      this.loader = new FetchIOLoader(object.extend({}, this.options, { disableSegment: true, loop: false }))
      await this.loader.open(
        {
          url: buildAbsoluteURL(this.info.url, this.mediaPlayList.segments[this.segmentIndex].uri)
        },
        {
          from: 0,
          to: -1
        }
      )
      return this.loader.read(buffer)
    }
  }

  public async seek(timestamp: int64) {

    if (this.loader) {
      await this.loader.abort()
      this.loader = null
    }

    let duration = 0
    let seekTime = Number(timestamp)
    let index = 0

    for (let i = 0; i < this.mediaPlayList.segments.length; i++) {
      duration += this.mediaPlayList.segments[i].duration
      if (duration * 1000 >= seekTime) {
        index = i
        break
      }
    }
    this.segmentIndex = index
    if (this.status === IOLoaderStatus.COMPLETE) {
      this.status = IOLoaderStatus.BUFFERING
    }
  }

  public async size() {
    return 0n
  }

  public async abort() {
    if (this.loader) {
      await this.loader.abort()
      this.loader = null
    }
  }

  public async stop() {
    await this.abort()
    this.status = IOLoaderStatus.IDLE
  }

  public getDuration() {
    return this.mediaPlayList.duration
  }

  public getMinBuffer() {
    return this.minBuffer
  }
}