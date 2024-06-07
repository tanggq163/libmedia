/*
 * libmedia avframe to VideoFrame utils
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

import { mapUint8Array } from 'cheap/std/memory'
import AVFrame from '../struct/avframe'
import { PixelFormatDescriptorsMap, PixelFormatFlags } from '../pixelFormatDescriptor'
import { AVColorPrimaries, AVColorRange, AVColorSpace, AVColorTransferCharacteristic, AVPixelFormat } from '../pixfmt'

export function avPixelFormat2Format(pixfmt: AVPixelFormat) {
  switch (pixfmt) {
    case AVPixelFormat.AV_PIX_FMT_YUV420P:
      return 'I420'
    case AVPixelFormat.AV_PIX_FMT_YUVA420P:
      return 'I420A'
    case AVPixelFormat.AV_PIX_FMT_YUV422P:
      return 'I422'
    case AVPixelFormat.AV_PIX_FMT_YUV444P:
      return 'I444'
    case AVPixelFormat.AV_PIX_FMT_BGRA:
      return 'BGRA'
    case AVPixelFormat.AV_PIX_FMT_RGBA:
      return 'RGBA'
    case AVPixelFormat.AV_PIX_FMT_NV12:
      return 'NV12'
    default:
      return null
  }
}

export function getVideoColorSpaceInit(avframe: pointer<AVFrame>) {
  const init: VideoColorSpaceInit = {
    fullRange: false,
    matrix: null,
    primaries: null,
    transfer: null
  }

  switch (avframe.colorSpace) {
    case AVColorSpace.AVCOL_SPC_BT709:
      init.matrix = 'bt709'
      break
    case AVColorSpace.AVCOL_SPC_SMPTE170M:
      init.matrix = 'smpte170m'
      break
    case AVColorSpace.AVCOL_SPC_BT470BG:
      init.matrix = 'bt470bg'
      break
    case AVColorSpace.AVCOL_SPC_RGB:
      init.matrix = 'rgb'
      break
    default:
      init.matrix = 'bt709'
      break
  }

  switch (avframe.colorPrimaries) {
    case AVColorPrimaries.AVCOL_PRI_BT709:
      init.primaries = 'bt709'
      break
    case AVColorPrimaries.AVCOL_PRI_BT470BG:
      init.primaries = 'bt470bg'
      break
    case AVColorPrimaries.AVCOL_PRI_SMPTE170M:
      init.primaries = 'smpte170m'
      break
    default:
      init.primaries = 'bt709'
      break
  }

  switch (avframe.colorTrc) {
    case AVColorTransferCharacteristic.AVCOL_TRC_BT709:
      init.transfer = 'bt709'
      break
    case AVColorTransferCharacteristic.AVCOL_TRC_IEC61966_2_1:
      init.transfer = 'iec61966-2-1'
      break
    case AVColorTransferCharacteristic.AVCOL_TRC_SMPTE170M:
      init.transfer = 'smpte170m'
      break
    default:
      init.transfer = 'bt709'
      break
  }

  if (avframe.colorRange === AVColorRange.AVCOL_RANGE_JPEG) {
    init.fullRange = true
  }

  return init
}

export function avframe2VideoFrame(avframe: pointer<AVFrame>) {

  let size = 0
  let height = avframe.height

  const des = PixelFormatDescriptorsMap[avframe.format as AVPixelFormat]

  const layout: PlaneLayout[] = []

  for (let i = 0; i < des.nbComponents; i++) {
    layout.push({
      offset: size,
      stride: avframe.linesize[i]
    })

    const bits = des.comp[i].depth <= 8 ? 1 : 2

    // rgb luma alpha
    if (des.flags & PixelFormatFlags.RGB || i === 0 || i === 3) {
      size += avframe.linesize[i] * height * bits
    }
    else {
      size += avframe.linesize[i] * (height >>> des.log2ChromaH)
    }
  }

  const videoFrame = new VideoFrame(mapUint8Array(accessof(avframe.extendedData), size), {
    codedWidth: avframe.width,
    codedHeight: height,
    timestamp: static_cast<double>(avframe.pts),
    format: avPixelFormat2Format(avframe.format),
    duration: static_cast<double>(avframe.duration),
    layout,
    colorSpace: getVideoColorSpaceInit(avframe)
  })

  return videoFrame
}