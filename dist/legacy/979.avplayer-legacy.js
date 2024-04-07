"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[979],{85947:(t,e,i)=>{i.d(e,{A:()=>a});var n=i(78716),r=i(81570),s=i(134),a=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"type",-1),(0,s.A)(this,"onStreamAdd",void 0)}return(0,r.A)(t,[{key:"destroy",value:function(t){}}]),t}()},69979:(t,e,i)=>{i.r(e),i.d(e,{default:()=>R});var n=i(88435),r=i.n(n),s=i(25182),a=i(78716),h=i(81570),o=i(77193),u=i(25767),d=i(43070),l=i(31060),f=i(134),p=i(36443),g=i.n(p),c=i(63939),v=i(50932),m=i(69584),y=i(4624),k=i(94929),b=i(9705),A=i(92647),S=i(85947),P=i(14686),w=i(37837),U=i(71517),L=i(82348);function B(t,e,i){return e=(0,u.A)(e),(0,o.A)(t,I()?r()(e,i||[],(0,u.A)(t).constructor):e.apply(t,i))}function I(){try{var t=!Boolean.prototype.valueOf.call(r()(Boolean,[],(function(){})))}catch(t){}return(I=function(){return!!t})()}var x="src/avformat/formats/IOggsFormat.ts",R=function(t){function e(){var t;return(0,a.A)(this,e),t=B(this,e),(0,f.A)((0,d.A)(t),"type",3),(0,f.A)((0,d.A)(t),"headerPagesPayload",void 0),(0,f.A)((0,d.A)(t),"page",void 0),t.page=new m.B,t.headerPagesPayload=[],t}var i,n,r;return(0,l.A)(e,t),(0,h.A)(e,[{key:"init",value:function(t){t.ioReader&&t.ioReader.setEndian(!1),t.ioReader&&t.ioReader.setEndian(!1)}},{key:"readHeader",value:(r=(0,s.A)(g().mark((function t(e){var i,n,r,s;return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.ioReader.peekString(4);case 3:if("OggS"===t.sent){t.next=7;break}return y.z3("the file format is not oggs",x,76),t.abrupt("return",b.LR);case 7:return t.next=9,this.page.read(e.ioReader);case 9:if((i=new L.A(this.page.payload.length,!1)).appendBuffer(this.page.payload),"OpusHead"!==i.peekString(8)){t.next=33;break}return(n=new k.q).read(i),r=new k.o,this.page.reset(),t.next=19,this.page.read(e.ioReader);case 19:(i=new L.A(this.page.payload.length,!1)).appendBuffer(this.page.payload),r.read(i),this.headerPagesPayload=[n,r],(s=e.createStream()).codecpar.codecType=1,s.codecpar.codecId=86076,s.codecpar.sampleRate=this.headerPagesPayload[0].sampleRate,s.codecpar.chLayout.nbChannels=this.headerPagesPayload[0].channels,s.codecpar.channels=this.headerPagesPayload[0].channels,s.timeBase.den=s.codecpar.sampleRate,s.timeBase.num=1,s.privData={serialNumber:this.page.serialNumber},this.onStreamAdd&&this.onStreamAdd(s);case 33:return t.abrupt("return",0);case 36:return t.prev=36,t.t0=t.catch(0),y.z3(t.t0.message,x,128),t.abrupt("return",e.ioReader.error);case 40:case"end":return t.stop()}}),t,this,[[0,36]])}))),function(t){return r.apply(this,arguments)})},{key:"readAVPacket",value:(n=(0,s.A)(g().mark((function t(e,i){var n,r,s,a,h,o,u,d=this;return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.headerPagesPayload.length&&"OpusHead"===this.headerPagesPayload[0].signature){t.next=2;break}return t.abrupt("return",b.E$);case 2:return v.M[17](i+56,e.ioReader.getPos()),n=!1,t.prev=4,this.page.reset(),t.next=8,this.page.read(e.ioReader);case 8:return v.M[17](i+16,this.page.granulePosition),v.M[17](i+8,this.page.granulePosition),r=this.page.payload.length,s=(0,w.sY)(r),(0,P.lW)(s,r,this.page.payload),(0,U.NX)(i,s,r),(a=e.streams.find((function(t){return t.privData.serialNumber===d.page.serialNumber})))&&(v.M[15](i+32,a.index),v.M[15](i+76,a.timeBase.den),v.M[15](i+72,a.timeBase.num),86076===a.codecpar.codecId&&v.M[15](i+36,1|c.f[15](i+36))),n=!0,t.next=18,e.ioReader.peekBuffer(6);case 18:h=t.sent;case 19:if(!(1&h[5])){t.next=35;break}return this.page.reset(),t.next=23,this.page.read(e.ioReader);case 23:return v.M[17](i+16,this.page.granulePosition),v.M[17](i+8,this.page.granulePosition),o=(0,A.A)(Uint8Array,[(0,U.iI)(i),this.page.payload]),(0,w.Eb)(c.f[20](i+24)),u=(0,w.sY)(o.length),(0,P.lW)(u,o.length,o),v.M[20](i+24,u),v.M[15](i+28,o.length),t.next=32,e.ioReader.peekBuffer(6);case 32:h=t.sent,t.next=19;break;case 35:return t.abrupt("return",0);case 38:return t.prev=38,t.t0=t.catch(4),-1048576!==e.ioReader.error&&y.z3(t.t0.message,x,192),t.abrupt("return",n?0:e.ioReader.error);case 42:case"end":return t.stop()}}),t,this,[[4,38]])}))),function(t,e){return n.apply(this,arguments)})},{key:"seek",value:(i=(0,s.A)(g().mark((function t(e,i,n,r){return g().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",BigInt(b.E$));case 1:case"end":return t.stop()}}),t)}))),function(t,e,n,r){return i.apply(this,arguments)})},{key:"getAnalyzeStreamsCount",value:function(){return 1}}]),e}(S.A)},69584:(t,e,i)=>{i.d(e,{B:()=>d});var n=i(25182),r=i(78716),s=i(81570),a=i(134),h=i(36443),o=i.n(h),u=i(77231),d=function(){function t(){(0,r.A)(this,t),(0,a.A)(this,"capturePattern",void 0),(0,a.A)(this,"streamStructureVersion",void 0),(0,a.A)(this,"headerTypeFlag",void 0),(0,a.A)(this,"granulePosition",void 0),(0,a.A)(this,"serialNumber",void 0),(0,a.A)(this,"pageSequenceNumber",void 0),(0,a.A)(this,"crcCheckSum",void 0),(0,a.A)(this,"numberPageSegments",void 0),(0,a.A)(this,"segmentTable",void 0),(0,a.A)(this,"payload",void 0),this.reset()}var e,i;return(0,s.A)(t,[{key:"reset",value:function(){this.capturePattern="OggS",this.streamStructureVersion=0,this.headerTypeFlag=0,this.granulePosition=u.Dh,this.serialNumber=0,this.pageSequenceNumber=0,this.crcCheckSum=0,this.numberPageSegments=0,this.segmentTable=[]}},{key:"read",value:(i=(0,n.A)(o().mark((function t(e){var i;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.readPageHeader(e);case 2:if(!(i=this.segmentTable.reduce((function(t,e){return t+e}),0))){t.next=7;break}return t.next=6,e.readBuffer(i);case 6:this.payload=t.sent;case 7:case"end":return t.stop()}}),t,this)}))),function(t){return i.apply(this,arguments)})},{key:"readPageHeader",value:(e=(0,n.A)(o().mark((function t(e){var i,n;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.readString(4);case 2:return this.capturePattern=t.sent,t.next=5,e.readUint8();case 5:return this.streamStructureVersion=t.sent,t.next=8,e.readUint8();case 8:return this.headerTypeFlag=t.sent,t.next=11,e.readUint64();case 11:return this.granulePosition=t.sent,t.next=14,e.readUint32();case 14:return this.serialNumber=t.sent,t.next=17,e.readUint32();case 17:return this.pageSequenceNumber=t.sent,t.next=20,e.readUint32();case 20:return this.crcCheckSum=t.sent,t.next=23,e.readUint8();case 23:if(this.numberPageSegments=t.sent,!this.numberPageSegments){t.next=34;break}i=0;case 26:if(!(i<this.numberPageSegments)){t.next=34;break}return t.next=29,e.readUint8();case 29:n=t.sent,this.segmentTable.push(n);case 31:i++,t.next=26;break;case 34:case"end":return t.stop()}}),t,this)}))),function(t){return e.apply(this,arguments)})},{key:"write",value:function(t){if(t.writeString(this.capturePattern),t.writeUint8(this.streamStructureVersion),t.writeUint8(this.headerTypeFlag),t.writeUint64(this.granulePosition),t.writeUint32(this.serialNumber),t.writeUint32(this.pageSequenceNumber),t.writeUint32(this.crcCheckSum),this.payload){this.numberPageSegments=Math.ceil(this.payload.length/255);var e=this.payload.length%255;t.writeUint8(this.numberPageSegments);for(var i=0;i<this.numberPageSegments-1;i++)t.writeUint8(255);t.writeUint8(e),t.writeBuffer(this.payload)}else t.writeUint8(0)}}]),t}()},94929:(t,e,i)=>{i.d(e,{o:()=>u,q:()=>h});var n=i(78716),r=i(81570),s=i(134),a=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"streamCount",void 0),(0,s.A)(this,"coupledStreamCount",void 0),(0,s.A)(this,"mapping",void 0),this.streamCount=1,this.coupledStreamCount=0,this.mapping=null}return(0,r.A)(t,[{key:"read",value:function(t){this.streamCount=t.readUint8(),this.coupledStreamCount=t.readUint8(),this.mapping=t.readBuffer(this.streamCount+this.coupledStreamCount)}},{key:"write",value:function(t){t.writeUint8(this.streamCount),t.writeUint8(this.coupledStreamCount),t.writeBuffer(this.mapping)}}]),t}(),h=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"version",void 0),(0,s.A)(this,"channels",void 0),(0,s.A)(this,"preSkip",void 0),(0,s.A)(this,"sampleRate",void 0),(0,s.A)(this,"outputGain",void 0),(0,s.A)(this,"channelMappingFamily",void 0),(0,s.A)(this,"channelMappingTable",void 0),this.signature="OpusHead",this.version=1,this.channels=1,this.preSkip=0,this.sampleRate=48e3,this.outputGain=0,this.channelMappingFamily=0,this.channelMappingTable=new a}return(0,r.A)(t,[{key:"read",value:function(t){this.signature=t.readString(8),this.version=t.readUint8(),this.channels=t.readUint8(),this.preSkip=t.readUint16(),this.sampleRate=t.readUint32(),this.outputGain=t.readInt16(),this.channelMappingFamily=t.readUint8(),0!==this.channelMappingFamily&&this.channelMappingTable.read(t)}},{key:"write",value:function(t){t.writeString(this.signature),t.writeUint8(this.version),t.writeUint8(this.channels),t.writeUint16(this.preSkip),t.writeUint32(this.sampleRate),t.writeInt16(this.outputGain),t.writeUint8(this.channelMappingFamily),0!==this.channelMappingFamily&&this.channelMappingTable.write(t)}},{key:"setCodec",value:function(t){this.sampleRate=t.sampleRate,this.channels=t.chLayout.nbChannels}}]),t}(),o=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"list",void 0),this.list=[]}return(0,r.A)(t,[{key:"read",value:function(t,e){for(var i=0;i<e;i++){var n=t.readUint32();this.list.push(t.readString(n))}}},{key:"write",value:function(t){for(var e=0;e<this.list.length;e++){var i=t.encodeString(this.list[e]);t.writeUint32(i.length),t.writeBuffer(i)}}},{key:"addComment",value:function(t){this.list.push(t)}}]),t}(),u=function(){function t(){(0,n.A)(this,t),(0,s.A)(this,"streamIndex",void 0),(0,s.A)(this,"signature",void 0),(0,s.A)(this,"vendorStringLength",void 0),(0,s.A)(this,"vendorString",void 0),(0,s.A)(this,"userCommentListLength",void 0),(0,s.A)(this,"comments",void 0),this.signature="OpusTags",this.vendorString="libmedia.0.0.1",this.vendorStringLength=this.vendorString.length,this.userCommentListLength=0,this.comments=new o}return(0,r.A)(t,[{key:"read",value:function(t){this.signature=t.readString(8),this.vendorStringLength=t.readUint32(),this.vendorString=t.readString(this.vendorStringLength),this.userCommentListLength=t.readUint32(),this.userCommentListLength&&this.comments.read(t,this.userCommentListLength)}},{key:"write",value:function(t){t.writeString(this.signature);var e=t.encodeString(this.vendorString);t.writeUint32(e.length),t.writeBuffer(e),t.writeUint32(this.comments.list.length),this.comments.write(t)}},{key:"addComment",value:function(t){this.comments.addComment(t)}},{key:"setCodec",value:function(t){}}]),t}()},82348:(t,e,i)=>{i.d(e,{A:()=>u});var n=i(78716),r=i(81570),s=i(134),a=i(4624),h=i(50011),o="src/common/io/IOReaderSync.ts",u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1048576,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=arguments.length>2?arguments[2]:void 0;(0,n.A)(this,t),(0,s.A)(this,"data",void 0),(0,s.A)(this,"buffer",void 0),(0,s.A)(this,"pointer",void 0),(0,s.A)(this,"endPointer",void 0),(0,s.A)(this,"pos",void 0),(0,s.A)(this,"size",void 0),(0,s.A)(this,"littleEndian",void 0),(0,s.A)(this,"fileSize_",void 0),(0,s.A)(this,"error",void 0),(0,s.A)(this,"onFlush",void 0),(0,s.A)(this,"onSeek",void 0),(0,s.A)(this,"onSize",void 0),(0,s.A)(this,"flags",void 0),this.pos=BigInt(0),this.pointer=0,this.error=0,this.endPointer=0,this.littleEndian=!i,this.flags=0,r?(this.size=e,this.buffer=r,this.data=r.view):(this.size=Math.max(e,102400),this.buffer=new Uint8Array(this.size),this.data=new DataView(this.buffer.buffer))}return(0,r.A)(t,[{key:"readUint8",value:function(){this.remainingLength()<1&&this.flush(1);var t=this.data.getUint8(this.pointer);return this.pointer++,this.pos++,t}},{key:"peekUint8",value:function(){return this.remainingLength()<1&&this.flush(1),this.data.getUint8(this.pointer)}},{key:"readUint16",value:function(){this.remainingLength()<2&&this.flush(2);var t=this.data.getUint16(this.pointer,this.littleEndian);return this.pointer+=2,this.pos+=BigInt(2),t}},{key:"peekUint16",value:function(){return this.remainingLength()<2&&this.flush(2),this.data.getUint16(this.pointer,this.littleEndian)}},{key:"readUint24",value:function(){return this.readUint16()<<8|this.readUint8()}},{key:"peekUint24",value:function(){this.remainingLength()<3&&this.flush(3);var t=this.pointer,e=this.pos,i=this.readUint16()<<8|this.readUint8();return this.pointer=t,this.pos=e,i}},{key:"readUint32",value:function(){this.remainingLength()<4&&this.flush(4);var t=this.data.getUint32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}},{key:"peekUint32",value:function(){return this.remainingLength()<4&&this.flush(4),this.data.getUint32(this.pointer,this.littleEndian)}},{key:"readUint64",value:function(){this.remainingLength()<8&&this.flush(8);var t=this.data.getBigUint64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}},{key:"peekUint64",value:function(){return this.remainingLength()<8&&this.flush(8),this.data.getBigUint64(this.pointer,this.littleEndian)}},{key:"readInt8",value:function(){this.remainingLength()<1&&this.flush(1);var t=this.data.getInt8(this.pointer);return this.pointer++,this.pos++,t}},{key:"peekInt8",value:function(){return this.remainingLength()<1&&this.flush(1),this.data.getInt8(this.pointer)}},{key:"readInt16",value:function(){this.remainingLength()<2&&this.flush(2);var t=this.data.getInt16(this.pointer,this.littleEndian);return this.pointer+=2,this.pos+=BigInt(2),t}},{key:"peekInt16",value:function(){return this.remainingLength()<2&&this.flush(2),this.data.getInt16(this.pointer,this.littleEndian)}},{key:"readInt32",value:function(){this.remainingLength()<4&&this.flush(4);var t=this.data.getInt32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}},{key:"peekInt32",value:function(){return this.remainingLength()<4&&this.flush(4),this.data.getInt32(this.pointer,this.littleEndian)}},{key:"readInt64",value:function(){this.remainingLength()<8&&this.flush(8);var t=this.data.getBigInt64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}},{key:"peekInt64",value:function(){return this.remainingLength()<8&&this.flush(8),this.data.getBigInt64(this.pointer,this.littleEndian)}},{key:"readFloat",value:function(){this.remainingLength()<4&&this.flush(4);var t=this.data.getFloat32(this.pointer,this.littleEndian);return this.pointer+=4,this.pos+=BigInt(4),t}},{key:"peekFloat",value:function(){return this.remainingLength()<4&&this.flush(4),this.data.getFloat32(this.pointer,this.littleEndian)}},{key:"readDouble",value:function(){this.remainingLength()<8&&this.flush(8);var t=this.data.getFloat64(this.pointer,this.littleEndian);return this.pointer+=8,this.pos+=BigInt(8),t}},{key:"peekDouble",value:function(){return this.remainingLength()<8&&this.flush(8),this.data.getFloat64(this.pointer,this.littleEndian)}},{key:"readHex",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e="",i=0;i<t;i++){var n=this.readUint8().toString(16);e+=1===n.length?"0"+n:n}return e}},{key:"peekHex",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;t>this.size&&(this.error=-1048575,a.h2("peekHex, length too large",o,331)),this.remainingLength()<t&&this.flush(t);for(var e=this.pointer,i=this.pos,n="",r=0;r<t;r++){var s=this.readUint8().toString(16);n+=1===s.length?"0"+s:s}return this.pointer=e,this.pos=i,n}},{key:"readBuffer",value:function(t,e){if(!t)return new Uint8Array(0);if(e||(e=new Uint8Array(t)),this.remainingLength()<t){var i=0;if(this.remainingLength()>0){var n=this.remainingLength();e.set(this.buffer.subarray(this.pointer,this.pointer+n),i),i+=n,this.pointer+=n,this.pos+=BigInt(n),t-=n}for(;t>0;){this.flush();var r=Math.min(this.endPointer-this.pointer,t);e.set(this.buffer.subarray(this.pointer,this.pointer+r),i),i+=r,this.pointer+=r,this.pos+=BigInt(r),t-=r}}else e.set(this.buffer.subarray(this.pointer,this.pointer+t),0),this.pointer+=t,this.pos+=BigInt(t);return e}},{key:"peekBuffer",value:function(t,e){return t?(t>this.size&&(this.error=-1048575,a.h2("peekBuffer, length too large",o,415)),this.remainingLength()<t&&this.flush(t),e||(e=new Uint8Array(t)),e.set(this.buffer.subarray(this.pointer,this.pointer+t),0),e):new Uint8Array(0)}},{key:"readString",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this.readBuffer(t);return h.D(e)}},{key:"peekString",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this.peekBuffer(t);return h.D(e)}},{key:"readLine",value:function(){for(var t="";;){for(var e=!1,i=this.pointer;i<this.endPointer;i++)if(10===this.buffer[i]||13===this.buffer[i]){t+=this.readString(i-this.pointer),e=!0;break}if(e)break;t+=this.readString(this.remainingLength()),this.flush()}for(;;){var n=this.peekUint8();if(10!==n&&13!==n)break;this.readUint8()}return t}},{key:"peekLine",value:function(){this.remainingLength()<this.size&&this.flush();for(var t="",e=!1,i=this.pointer;i<this.endPointer;i++)if(10===this.buffer[i]||13===this.buffer[i]){t+=this.peekString(i-this.pointer),e=!0;break}return e||(this.error=-1048575,a.h2("peekLine, out of buffer",o,502)),t}},{key:"getPointer",value:function(){return this.pointer}},{key:"getPos",value:function(){return this.pos}},{key:"skip",value:function(t){for(var e=t;this.remainingLength()<t;)t-=this.remainingLength(),this.pointer=this.endPointer,this.flush();this.remainingLength()>=t&&(this.pointer+=t),this.pos+=BigInt(e)}},{key:"remainingLength",value:function(){return this.endPointer-this.pointer}},{key:"flush",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(this.onFlush||(this.error=-1048575,a.h2("IOReader error, flush failed because of no flush callback",o,560)),!(this.size-this.remainingLength()<=0))if(t=Math.min(t,this.size),this.pointer<this.endPointer?(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer):this.endPointer=0,this.pointer=0,t)for(;this.remainingLength()<t;){var e=this.onFlush(this.buffer.subarray(this.endPointer));if(e<0)throw this.error=e,new Error("IOReader error, flush ".concat(-1048576===e?"ended":"failed",", ret: ").concat(e));this.endPointer+=e}else{var i=this.onFlush(this.buffer.subarray(this.endPointer));if(i<0)throw this.error=i,new Error("IOReader error, flush ".concat(-1048576===i?"ended":"failed",", ret: ").concat(i));this.endPointer+=i}}},{key:"seek",value:function(t){var e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!(arguments.length>1&&void 0!==arguments[1]&&arguments[1])){var i=Number(t-this.pos);if(i<0&&Math.abs(i)<this.pointer)return this.pointer+=i,void(this.pos=t);if(i>0&&this.pointer+i<this.endPointer)return this.pointer+=i,void(this.pos=t);if(0===i)return}this.onSeek||(this.error=-1048575,a.h2("IOReader error, seek failed because of no seek callback",o,620)),this.pointer=this.endPointer=0,this.pos=t;var n=this.onSeek(t);0!==n&&(this.error=n,a.h2("IOReader error, seek failed",o,629)),e&&this.flush()}},{key:"getBuffer",value:function(){return this.buffer}},{key:"appendBuffer",value:function(t){if(this.size-this.endPointer>=t.length)this.buffer.set(t,this.endPointer),this.endPointer+=t.length;else if(this.buffer.set(this.buffer.subarray(this.pointer,this.endPointer),0),this.endPointer=this.endPointer-this.pointer,this.pointer=0,this.size-this.endPointer>=t.length)this.buffer.set(t,this.endPointer),this.endPointer+=t.length;else{var e=Math.min(this.size-this.endPointer,t.length);this.buffer.set(t.subarray(0,e),this.endPointer),this.endPointer+=e,a.R8("IOReader, call appendBuffer but the buffer's size is lagger then the remaining size",o,660)}}},{key:"reset",value:function(){this.pointer=this.endPointer=0,this.pos=BigInt(0),this.error=0}},{key:"setEndian",value:function(t){this.littleEndian=!t}},{key:"fileSize",value:function(){return this.fileSize_||(this.onSize||(this.error=-1048575,a.h2("IOReader error, fileSize failed because of no onSize callback",o,681)),this.fileSize_=this.onSize()),this.fileSize_}},{key:"getBufferSize",value:function(){return this.size}},{key:"pipe",value:function(t,e){if(e)if(this.remainingLength()<e){if(this.remainingLength()>0){var i=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+i)),this.pointer+=i,this.pos+=BigInt(i),e-=i}for(;e>0;){this.flush();var n=Math.min(this.endPointer-this.pointer,e);t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+n)),this.pointer+=n,this.pos+=BigInt(n),e-=n}}else t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+e)),this.pointer+=e,this.pos+=BigInt(e);else{if(this.remainingLength()>0){var r=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+r)),this.pointer+=r,this.pos+=BigInt(r)}for(;this.onFlush(this.buffer.subarray(0))>0;){var s=this.remainingLength();t.writeBuffer(this.buffer.subarray(this.pointer,this.pointer+s)),this.pointer+=s,this.pos+=BigInt(s)}}}}]),t}()}}]);