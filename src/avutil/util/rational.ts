/*
 * libmedia rational util
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

import { Rational } from '../struct/rational'

/**
 * 将一个时间戳由一个时间基转换到另一个时间基
 * 
 * @param a 待转换时间戳
 * @param bp 待转换时间戳的时间基
 * @param cq 目标时间基
 */
export function avRescaleQ(a: int64, bq: Rational, cq: Rational) {
  const b = a * static_cast<int64>(bq.num) * static_cast<int64>(cq.den)
  const c = static_cast<int64>(bq.den) * static_cast<int64>(cq.num)
  return b / c
}

/**
 * 将一个时间戳由一个时间基转换到另一个时间基
 * 
 * @param a 待转换时间戳
 * @param bp 待转换时间戳的时间基
 * @param cq 目标时间基
 */
export function avRescaleQ2(a: int64, bq: pointer<Rational>, cq: pointer<Rational>) {
  const b = a * static_cast<int64>(bq.num) * static_cast<int64>(cq.den)
  const c = static_cast<int64>(bq.den) * static_cast<int64>(cq.num)
  return b / c
}

/**
 * 将一个时间基转换成 double
 * 
 * @param a 
 */
export function avQ2D(a: Rational) {
  return a.num / a.den
}

/**
 * 将一个时间基转换成 double
 * 
 * @param a 
 */
export function avQ2D2(a: pointer<Rational>) {
  return a.num / a.den
}