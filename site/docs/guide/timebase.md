---
nav:
  title: 指南
  order: 2
group:
  title: 代码解读
  order: 2
order: 2
---

# 时间基

时间基是一个贯穿 libmedia 的基础概念，所以必须要掌握，时间基就是时间的单位。时间基的数据结构是 [Rational](https://zhaohappy.github.io/libmedia/docs/libmedia_api/classes/avutil_struct_rational.Rational.html) 它表示一个分数，其中 den 是分母，num 是分子。表示一个单位是秒的多少。举个例子，我们现在有一个时间戳 100，它在不同的时间基下表示的时间如下:

- ```{num: 1, den: 1000}``` 这个时间基表示一个单位是 1/1000 秒，也就是 1 毫秒，所以 100 是 100*1/1000 秒也就是 100 毫秒；flv 就是用的这个时间基。
- ```{num: 1, den: 90000}``` 这个时间基表示一个单位是 1/90000 秒，所以 100 是 100*1/90000 秒大约是 1.111 毫秒；ts 流就是用的这个时间基。
- ```{num: 666, den: 6666}``` 这个时间基表示一个单位是 666/6666 秒，所以 100 是 100*666/6666 秒大约是 9.991 毫秒；当然如此奇怪的时间基没有谁用它，这里只是举个例子。

## 不同地方的时间基

libmedia 在不同发地方都存有时间基数据，它们代表的意义各不相同。

- AVStream 中的时间基是一个媒体的封装时间基，表示的是存放在媒体文件或者码流中的时间单位。解封装时由 demux 模块解析自动写入；封装时由用户写入作为后续的写入文件的时间单位。是 AVStream 下面的开始时间、时长等时间数据的单位。
- AVPacket 中的时间基是当前这个 AVPacket 中的 dts、pts、duration 的时间单位。如果 AVPacket 通过 [readAVPacket](https://zhaohappy.github.io/libmedia/docs/libmedia_api/functions/avformat_demux.readAVPacket.html) 得到则时间基是 AVStream 下面的时间基。
- AVFrame 中的时间基是当前这个 AVFrame 中的 pts、duration 的时间单位。当从解码器中得到则时间基是对应的 AVPacket 的时间基。
- 编码器中的时间基是输出的 AVPacket 中的时间基。创建编码器时需要传入一个时间基，代表着编码器编码之后输出的 AVPacket 使用这个时间基。
- VideoFrame 中的时间基在 Web 标准中是微秒。如果你使用 [WebVideoDecoder](https://zhaohappy.github.io/libmedia/docs/libmedia_api/classes/avcodec_webcodec_VideoDecoder.WebVideoDecoder.html) 解码得到则它的单位不再是微秒时间基而是输入的 AVPacket 的时间基。当然你也可以手动转换为标准的微秒时间基。
- AudioData 中的时间基在 Web 标准中是微秒。如果你使用 [WebAudioDecoder](https://zhaohappy.github.io/libmedia/docs/libmedia_api/classes/avcodec_webcodec_AudioDecoder.WebAudioDecoder.html) 解码得到则输出的单位也还是微秒时间基。对于 AudioDecoder 它不管输入的时间，统统会根据采样数重新计算。这里和 VideoFrame 有一个区别。VideoDecoder 会使用输入的时间。开发者需要注意这里的区别。

## 时间基转换

libmedia 提供了 [avRescaleQ](https://zhaohappy.github.io/libmedia/docs/libmedia_api/functions/avutil_util_rational.avRescaleQ.html) 方法来做时间基转换，它可以将一个时间从一个时间基转到另一个时间基，在音视频开发中会经常用到。

```javascript
const sourceTimeBase = { num: 1, den: 90000 }
const targetTimeBase = { num: 1, den: 1000 }
const pts = avRescaleQ(100n, sourceTimeBase, targetTimeBase)
```
