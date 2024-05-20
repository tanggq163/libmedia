[**libmedia**](../../../../README.md) • **Docs**

***

[libmedia](../../../../README.md) / [avutil/struct/avframe](../README.md) / AVFrameSideData

# Class: AVFrameSideData

## Constructors

### new AVFrameSideData()

> **new AVFrameSideData**(): [`AVFrameSideData`](AVFrameSideData.md)

#### Returns

[`AVFrameSideData`](AVFrameSideData.md)

## Properties

### buf

> **buf**: `pointer`\<[`AVBufferRef`](../../avbuffer/classes/AVBufferRef.md)\> = `nullptr`

#### Source

[avutil/struct/avframe.ts:267](https://github.com/zhaohappy/libmedia/blob/acbbf6bd75e6ee4c968b9f441fe28c40f42f350d/src/avutil/struct/avframe.ts#L267)

***

### data

> **data**: `pointer`\<`uint8`\> = `nullptr`

#### Source

[avutil/struct/avframe.ts:261](https://github.com/zhaohappy/libmedia/blob/acbbf6bd75e6ee4c968b9f441fe28c40f42f350d/src/avutil/struct/avframe.ts#L261)

***

### metadata

> **metadata**: `pointer`\<`AVDictionary`\> = `nullptr`

#### Source

[avutil/struct/avframe.ts:265](https://github.com/zhaohappy/libmedia/blob/acbbf6bd75e6ee4c968b9f441fe28c40f42f350d/src/avutil/struct/avframe.ts#L265)

***

### size

> **size**: `int32` = `0`

#### Source

[avutil/struct/avframe.ts:263](https://github.com/zhaohappy/libmedia/blob/acbbf6bd75e6ee4c968b9f441fe28c40f42f350d/src/avutil/struct/avframe.ts#L263)

***

### type

> **type**: [`AVFrameSideDataType`](../enumerations/AVFrameSideDataType.md) = `0`

#### Source

[avutil/struct/avframe.ts:259](https://github.com/zhaohappy/libmedia/blob/acbbf6bd75e6ee4c968b9f441fe28c40f42f350d/src/avutil/struct/avframe.ts#L259)