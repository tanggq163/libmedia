/*
 * libmedia flv amf
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

import BufferReader from 'common/io/BufferReader'
import IOReader from 'common/io/IOReader'

// @ts-ignore
@deasync
export async function parseObject(ioReader: IOReader | BufferReader, endPos: bigint) {
  const key = await ioReader.readString(await ioReader.readUint16())
  const value = await parseValue(ioReader, endPos)
  return {
    key,
    value
  }
}

// @ts-ignore
@deasync
export async function parseValue(ioReader: IOReader | BufferReader, endPos: bigint) {
  const type = await ioReader.readUint8()
  let value: any

  switch (type) {
    // double
    case 0:
      value = await ioReader.readDouble()
      break
      // boolean
    case 1:
      value = await ioReader.readUint8() ? true : false
      break
      // string
    case 2:
      value = await ioReader.readString(await ioReader.readUint16())
      break
      // object
    case 3:
      value = {}
      while (ioReader.getPos() < endPos) {
        const { key, value: val } = await parseObject(ioReader, endPos)
        value[key] = val
        if (((await ioReader.peekUint24()) & 0x00FFFFFF) === 9) {
          await ioReader.skip(3)
          break
        }
      }
      break
      // ECMA array type (Mixed array)
    case 8:
      value = {}
      // skip ECMAArrayLength(UI32)
      await ioReader.skip(4)
      while (ioReader.getPos() < endPos) {
        const { key, value: val } = await parseObject(ioReader, endPos)
        value[key] = val
        if (((await ioReader.peekUint24()) & 0x00FFFFFF) === 9) {
          await ioReader.skip(3)
          break
        }
      }
      break
      // ScriptDataObjectEnd
    case 9:
    case 5:
      value = null
      break
    // Strict array type
    case 10:
      value = []
      const length = await ioReader.readUint32()
      for (let i = 0; i < length; i++) {
        value.push(await parseValue(ioReader, endPos))
      }
      break
    // Date
    case 11:
      const timestamp = await ioReader.readDouble()
      const localTimeOffset = await ioReader.readInt16()
      value = new Date(timestamp + localTimeOffset * 60 * 1000)
      break
    // Long string type
    case 12:
      value = await ioReader.readString(await ioReader.readUint32())
      break
    default:

  }

  return value
}
