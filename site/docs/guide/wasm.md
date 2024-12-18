---
nav:
  title: 指南
  order: 2
group:
  title: 开始
order: 6
---

# 编解码器

## 介绍

编解码器被编译成了单独的 wasm 模块。编解码器的 wasm 模块有三个版本分别为 baseline、atomic、simd。baseline 版本是基准版本，指令集对应到 WebAssembly 的 MVP 版本，但需要支持 Mutable Globals，兼容性最高，性能最低；atomic 增加了 atomic 原子操作指令集和 Bulk Memory 指令集；simd 增加了 simd 向量加速指令集，性能最高。目前的 simd 版本是靠编译器自动优化的，不同的编解码器实现效果不同（目前没有看见过有针对 wasm 指令集做加速优化的开源项目，如果想要更高的加速效果需要自己优化，当前只有 h264 的 simd 解码器是手动优化的，也是性能最好的一个 wasm 模块）。

> 如果你发现某些 wasm(比如 aac.wasm) 文件太大了，这是因为其对应的代码实现里面声明了大块的全局数组导致 Data 段存在大块的全是 0 的数据；只要你的 web 服务器对静态资源开启 gzip 之类的压缩算法就能让其变得很小。

## 兼容性

| 环境            | baseline     | atomic     | simd         | webcodecs            |
| -----------    | -----------  |----------- | -----------  | -----------          |
| Chrome         | 74+          | 75+        | 91+          |94+                   |
| Firefox        | 61+          | 79+        | 89+          |130+                  |
| Safari         | 13.4+        | 15+        | 16.4+        |16.4+(video only)     |
| Wasmtime       | 0.20+        | 15+        | 15+          |N/A                   |
| Wasmer         | 0.7+         | N/A        | N/A          |N/A                   |
| Node.js        | 12.0+        | 16.4+      | 16.4+        |N/A                   |
| Deno           | 0.1+         | 1.9+       | 1.9+         |N/A                   |
| wasm2c         | 1.0.1+       | N/A        | N/A          |N/A                   |


## 解码器

| codec       | baseline   | atomic     | simd        |  webcodecs(Chrome) |
| ----------- | -----------|----------- | ----------- | -----------        |
| h264        | ✅         | ✅          | ✅          | ✅                 |
| hevc        | ✅         | ✅          | ✅          | ✅ (只支持硬解)      |
| vvc         | ✅         | ✅          | ✅          | ❌                 |
| av1         | ✅         | ✅          | ✅          | ✅                 |
| vp8         | ✅         | ✅          | ✅          | ✅                 |
| vp9         | ✅         | ✅          | ✅          | ✅                 |
| mpeg1       | ✅         | ✅          | ✅          | ❌                 |
| mpeg2       | ✅         | ✅          | ✅          | ❌                 |
| mpeg4       | ✅         | ✅          | ✅          | ❌                 |
| theora      | ✅         | ✅          | ✅          | ❌                 |
| aac         | ✅         | ✅          | ✅          | ✅                 |
| mp3         | ✅         | ✅          | ✅          | ✅                 |
| opus        | ✅         | ✅          | ✅          | ✅                 |
| flac        | ✅         | ✅          | ✅          | ❌                 |
| speex       | ✅         | ✅          | ✅          | ❌                 |
| vorbis      | ✅         | ✅          | ✅          | ❌                 |
| ac3         | ✅         | ✅          | ✅          | ❌                 |
| eac3        | ✅         | ✅          | ✅          | ❌                 |
| dts         | ✅         | ✅          | ✅          | ❌                 |
| G.711 A-law | ✅         | ✅          | ✅          | ❌                 |
| G.711 μ-law | ✅         | ✅          | ✅          | ❌                 |

## 编码器

| codec       | baseline   | atomic     | simd        |  webcodecs(Chrome) |
| ----------- | -----------|----------- | ----------- | -----------        |
| h264        | ✅         | ✅          | ✅          | ✅                 |
| hevc        | ❌         | ✅          | ✅          | ❌                 |
| vvc         | ❌         | ❌          | ❌          | ❌                 |
| av1         | ❌         | ✅          | ✅          | ✅                 |
| vp8         | ✅         | ✅          | ✅          | ✅                 |
| vp9         | ✅         | ✅          | ✅          | ✅                 |
| mpeg4       | ✅         | ✅          | ✅          | ❌                 |
| theora      | ✅         | ✅          | ✅          | ❌                 |
| aac         | ✅         | ✅          | ✅          | ✅                 |
| mp3         | ✅         | ✅          | ✅          | ❌                 |
| opus        | ✅         | ✅          | ✅          | ✅                 |
| flac        | ✅         | ✅          | ✅          | ❌                 |
| speex       | ✅         | ✅          | ✅          | ❌                 |
| vorbis      | ✅         | ✅          | ✅          | ❌                 |
| ac3         | ✅         | ✅          | ✅          | ❌                 |
| eac3        | ✅         | ✅          | ✅          | ❌                 |
| dts         | ✅         | ✅          | ✅          | ❌                 |
| G.711 A-law | ✅         | ✅          | ✅          | ❌                 |
| G.711 μ-law | ✅         | ✅          | ✅          | ❌                 |

## 使用

解码器在项目的 ```dist/decode``` 目录下，编码器在项目的 ```dist/encode``` 目录下。wasm 模块并没有发布 npm 包，建议自己将 wasm 文件托管到自己的 cdn 上。你也可以使用一些公共 cdn 来访问 github 上托管的文件。下面以 ```cdn.jsdelivr.net``` 举例。

```javascript
let codecName = 'h264'
let wasmVersion = '-simd'
let libmediaVersion = '0.1.2'

const decoderH264 = `https://cdn.jsdelivr.net/gh/zhaohappy/libmedia@${libmediaVersion}/dist/decode/${codecName}${wasmVersion}.wasm`

```

**libmediaVersion 使用你依赖的 libmedia 下的包的版本，不建议使用 latest 版本，可能会因为后续升级 wasm 文件导致原来的项目出现问题**