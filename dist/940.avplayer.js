"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[940],{9088:(e,a,t)=>{t.d(a,{Au:()=>w,Y2:()=>h,hG:()=>u,oz:()=>R});var i=t(7231);const r=[44100,48e3,32e3,0],s=[22050,24e3,16e3,0],o=[11025,12e3,8e3,0],n=[0,1152,1152,384],d=[0,576,1152,384],c=[0,576,1152,384],f=[0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,-1],m=[0,32,48,56,64,80,96,112,128,160,192,224,256,320,384,-1],p=[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,-1],l=[0,32,48,56,64,80,96,112,128,144,160,176,192,224,256,-1],g=[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,-1];function h(e,a){switch(e){case 0:return o[a];case 2:return s[a];case 3:return r[a]}return i.N_}function u(e,a){switch(e){case 0:return c[a];case 2:return d[a];case 3:return n[a]}return i.N_}function R(e,a,t){switch(a){case 1:switch(e){case 0:case 2:return g[t];case 3:return p[t]}break;case 2:switch(e){case 0:case 2:return g[t];case 3:return m[t]}case 3:switch(e){case 0:case 2:return l[t];case 3:return f[t]}}return i.N_}function w(e){switch(e){case 1:return 34;case 2:return 33;case 3:return 32}return i.N_}},5947:(e,a,t)=>{t.d(a,{A:()=>r});var i=t(1026);class r{constructor(){(0,i.A)(this,"type",-1),(0,i.A)(this,"onStreamAdd",void 0)}destroy(e){}}},7940:(e,a,t)=>{t.r(a),t.d(a,{default:()=>v});var i=t(1026),r=t(4686),s=t(1499),o=t(3939),n=t(932),d=t(4624),c=t(5947),f=t(7837),m=t(1517),p=t(7231),l=t(11),g=t(9088),h=t(4328);const u=100,R=128;var w=t(3607),x=t(2739),k="src/avformat/formats/mp3/id3v2.ts";function B(e,a){let t="utf-8";return 0===e?t="iso-8859-1":1===e?t="utf-16":2===e&&(t="utf-16be"),new TextDecoder(t).decode(a)}class I{constructor(){(0,i.A)(this,"version",void 0),(0,i.A)(this,"layer",void 0),(0,i.A)(this,"protection",void 0),(0,i.A)(this,"bitrateIndex",void 0),(0,i.A)(this,"samplingFrequency",void 0),(0,i.A)(this,"padding",void 0),(0,i.A)(this,"private",void 0),(0,i.A)(this,"mode",void 0),(0,i.A)(this,"modeExtension",void 0),(0,i.A)(this,"copyright",void 0),(0,i.A)(this,"original",void 0),(0,i.A)(this,"emphasis",void 0)}}function S(e,a){e.version=a>>19&3,e.layer=a>>17&3,e.protection=a>>16&1,e.bitrateIndex=a>>12&15,e.samplingFrequency=a>>10&3,e.padding=a>>9&1,e.mode=a>>6&3,e.modeExtension=a>>4&3,e.copyright=a>>3&1,e.original=a>>2&1,e.emphasis=3&a}function T(e,a){let t=g.oz(e.version,e.layer,e.bitrateIndex);switch(e.layer){case 1:default:t=144e3*t/(a<<(3===e.version?0:1))>>>0,t+=e.padding;break;case 2:t=144e3*t/a>>>0,t+=e.padding;break;case 3:t=12e3*t/a>>>0,t=4*(t+e.padding)}return t}var b="src/avformat/formats/IMp3Format.ts";class v extends c.A{constructor(){super(),(0,i.A)(this,"type",5),(0,i.A)(this,"context",void 0)}init(e){e.ioReader&&e.ioReader.setEndian(!0),this.context={firstFramePos:p.Dh,isVBR:!1,hasID3v1:!1,id3v2:{version:p.N_,revision:p.N_,flags:p.N_},fileSize:BigInt(0)}}async readHeader(e){const a=e.createStream();a.codecpar.codecId=86017,a.codecpar.codecType=1,a.startTime=BigInt(0),a.firstDTS=BigInt(0);const t={frameHeader:new I,nbFrame:BigInt(0),tocIndexes:[],nextDTS:BigInt(0),frameLength:0};a.privData=t;const i=a.metadata={},s=await e.ioReader.fileSize();if(1&e.ioReader.flags&&s>R&&(await e.ioReader.seek(s-BigInt(R)),"TAG"===await e.ioReader.readString(3))){let a=await e.ioReader.readBuffer(30);i.title=l.D(a).replace(/\s/g,""),a=await e.ioReader.readBuffer(30),i.artist=l.D(a).replace(/\s/g,""),a=await e.ioReader.readBuffer(30),i.album=l.D(a).replace(/\s/g,""),a=await e.ioReader.readBuffer(4),i.date=l.D(a).replace(/\s/g,""),a=await e.ioReader.readBuffer(30),i.comment=l.D(a).replace(/\s/g,""),0===a[28]&&0!==a[29]&&(i.track=a[29]+""),i.genre=await e.ioReader.readUint8(),this.context.hasID3v1=!0}if(await e.ioReader.seek(BigInt(0)),"ID3"===await e.ioReader.peekString(3)){await e.ioReader.skip(3),this.context.id3v2.version=await e.ioReader.readUint8(),this.context.id3v2.revision=await e.ioReader.readUint8(),this.context.id3v2.flags=await e.ioReader.readUint8();const a=(127&await e.ioReader.readUint8())<<21|(127&await e.ioReader.readUint8())<<14|(127&await e.ioReader.readUint8())<<7|127&await e.ioReader.readUint8();await async function(e,a,t,i){const r=2!==t.version,s=r?10:6;let o=e.getPos()+BigInt(a>>>0);async function n(){await e.seek(o)}if(r&&64&t.flags){let i=await async function(e,a){let t=0;for(;a--;)t=(t<<7)+(127&await e.readUint8());return t}(e,4);if(4===t.version&&(i-=4),i<0)return d.z3("invalid extended header length",k,92),await n();if(await e.skip(i),(a-=i+4)<0)return d.z3("extended header too long",k,98),await e.seek(o),await n()}for(;a>s;){let t,o;if(r){if(t=await e.readString(4),o=await e.readUint32(),!o){d.z3("invalid frame size",k,112);break}await e.readUint16()}else t=await e.readString(3),o=await e.readUint24();if("APIC"===t)i.poster=await e.readBuffer(o);else if("USLT"===t){const a=await e.readUint8(),t=await e.readString(3),r=await e.readBuffer(o-4);i.lyrics=`${t} ${B(a,r)}`}else if("COMM"===t||"COM"===t){const a=await e.readUint8(),t=await e.readString(3),r=await e.readBuffer(o-4);i.comment=`${t} ${B(a,r)}`}else{let a;switch(a="T"===t[0]?B(await e.readUint8(),await e.readBuffer(o-1)):await e.readBuffer(o),t){case"TIT2":case"TT2":i.title=a;break;case"TPE1":case"TP1":i.artist=a;break;case"TPE2":case"TP2":i.albumArtist=a;break;case"TPOS":i.disc=a;break;case"TCOP":i.copyright=a;break;case"TALB":case"TAL":i.album=a;break;case"TRCK":case"TRK":i.track=a;break;case"TYER":case"TDRL":case"TDRC":i.date=a;break;case"COMM":case"COM":i.comment=a;break;case"TCON":case"TCO":i.genre=a;break;case"TSSE":case"TEN":i.encoder=a;break;case"TCOM":i.composer=a;break;case"TENC":i.encodedBy=a;break;case"TLAN":i.language=a;break;case"TPE3":case"TP3":i.performer=a;break;case"TPUB":i.publisher=a;break;case"TCMP":case"TCP":i.compilation=a;break;case"TDEN":i.creationTime=a;break;case"TSOA":i.albumSort=a;break;case"TSOP":i.artistSort=a;break;case"TSOT":i.titleSort=a;break;case"TIT1":i.grouping=a;break;default:i[t]=a}}a-=o+s}4==t.version&&16&t.flags&&(o+=BigInt(10)),await e.seek(o)}(e.ioReader,a,this.context.id3v2,i)}for(this.context.firstFramePos=e.ioReader.getPos();65504&~await e.ioReader.peekUint16();)await e.ioReader.skip(1);this.context.firstFramePos!==e.ioReader.getPos()&&(d.R8(`skipping ${e.ioReader.getPos()-this.context.firstFramePos} bytes of junk at ${this.context.firstFramePos}`,b,170),this.context.firstFramePos=e.ioReader.getPos()),a.codecpar.extradataSize=4,a.codecpar.extradata=(0,f.sY)(a.codecpar.extradataSize),await e.ioReader.peekBuffer(a.codecpar.extradataSize,(0,r.JW)(a.codecpar.extradata,a.codecpar.extradataSize)),S(t.frameHeader,await e.ioReader.readUint32()),a.codecpar.profile=g.Au(t.frameHeader.layer),a.codecpar.frameSize=g.hG(t.frameHeader.version,t.frameHeader.layer),a.codecpar.sampleRate=g.Y2(t.frameHeader.version,t.frameHeader.samplingFrequency),a.timeBase.num=1,a.timeBase.den=a.codecpar.sampleRate;const o=3===t.frameHeader.mode?1:2;a.codecpar.chLayout.nbChannels=o,a.codecpar.channels=o;const n=BigInt(Math.floor(g.oz(t.frameHeader.version,t.frameHeader.layer,t.frameHeader.bitrateIndex))),c=T(t.frameHeader,a.codecpar.sampleRate),m=e.ioReader.getPos();await e.ioReader.skip([[0,9,17],[0,0,0],[0,9,17],[0,17,32]][t.frameHeader.version][a.codecpar.chLayout.nbChannels]);const p=await e.ioReader.readString(4);if("Xing"===p||"Info"===p){this.context.isVBR=!0;const r=await e.ioReader.readUint32();1&r&&(t.nbFrame=BigInt(Math.floor(await e.ioReader.readUint32()))),2&r&&(this.context.fileSize=BigInt(Math.floor(await e.ioReader.readUint32())));const o=s>=m?s-m:BigInt(0);if(o&&this.context.fileSize){const e=w.jk(o,this.context.fileSize),a=w.T9(o,this.context.fileSize)-e;o>this.context.fileSize&&a>e>>BigInt(4)?(t.nbFrame=BigInt(0),d.R8("invalid concatenated file detected - using bitrate for duration",b,227)):a>e>>BigInt(4)&&d.R8("filesize and duration do not match (growing file?)",b,230)}if(a.duration=t.nbFrame*BigInt(a.codecpar.frameSize>>>0),4&r)for(let i=0;i<u;i++){const r=await e.ioReader.readUint8(),s=this.context.fileSize*BigInt(Math.floor(r))/BigInt(256),o={dts:a.duration/BigInt(u)*BigInt(Math.floor(i)),pos:s};t.tocIndexes.push(o)}8&r&&await e.ioReader.skip(4),i.encoder=await e.ioReader.readString(9),this.context.firstFramePos+=BigInt(Math.floor(c))}else await e.ioReader.seek(m),"VBRI"===await e.ioReader.readString(4)?(1===await e.ioReader.readUint16()&&(await e.ioReader.skip(4),this.context.fileSize=BigInt(Math.floor(await e.ioReader.readUint32())),t.nbFrame=BigInt(Math.floor(await e.ioReader.readUint32())),a.duration=t.nbFrame*BigInt(a.codecpar.frameSize>>>0)),this.context.firstFramePos+=BigInt(Math.floor(c))):(this.context.isVBR=!1,a.codecpar.bitRate=n*BigInt(1e3),t.nbFrame=(s-this.context.firstFramePos-BigInt(R))/BigInt(Math.floor(c)),a.duration=t.nbFrame*BigInt(a.codecpar.frameSize>>>0),t.frameLength=c,this.context.fileSize=s);for(await e.ioReader.seek(this.context.firstFramePos);65504&~await e.ioReader.peekUint16();)await e.ioReader.skip(1);if(this.context.firstFramePos!==e.ioReader.getPos()&&(d.R8(`skipping ${e.ioReader.getPos()-this.context.firstFramePos} bytes of junk at ${this.context.firstFramePos}`,b,290),this.context.firstFramePos=e.ioReader.getPos()),t.tocIndexes.length)for(let e=0;e<u;e++)t.tocIndexes[e].pos+=this.context.firstFramePos;return 0}async readAVPacket(e,a){const t=e.getStreamByMediaType(1),i=t.privData,c=e.ioReader.getPos();if(this.context.hasID3v1&&c>=this.context.fileSize-BigInt(R))return-1048576;try{S(i.frameHeader,await e.ioReader.peekUint32());let d=this.context.isVBR?T(i.frameHeader,t.codecpar.sampleRate):i.frameLength;n.M[15](a+28,d),n.M[17](a+56,c),n.M[15](a+32,t.index),(0,r.Mr)(a+72,t.timeBase[s.o9],8),n.M[17](a+48,BigInt(t.codecpar.frameSize>>>0)),n.M[17](a+16,i.nextDTS),n.M[17](a+8,i.nextDTS),n.M[15](a+36,1|o.f[15](a+36)),i.nextDTS+=BigInt(t.codecpar.frameSize>>>0);const p=(0,f.sY)(d);return(0,m.NX)(a,p,d),await e.ioReader.readBuffer(d,(0,r.JW)(p,d)),0}catch(a){return-1048576!==e.ioReader.error&&d.z3(a.message,b,337),e.ioReader.error}}async syncToFrame(e){let a=p.Dh;const t=e.getStreamByMediaType(1),i=t.privData;for(;;)try{if(!(65504&~await e.ioReader.peekUint16())){a=e.ioReader.getPos(),S(i.frameHeader,await e.ioReader.peekUint32());let r=this.context.isVBR?T(i.frameHeader,t.codecpar.sampleRate):i.frameLength;if(r>512e3){await e.ioReader.skip(1);continue}await e.ioReader.skip(r);let s=0;for(;s<=3&&!(65504&~await e.ioReader.peekUint16());){S(i.frameHeader,await e.ioReader.peekUint32());let a=this.context.isVBR?T(i.frameHeader,t.codecpar.sampleRate):i.frameLength;await e.ioReader.skip(a),s++}if(!(s<3))break;await e.ioReader.seek(a+BigInt(1)),a=p.Dh}await e.ioReader.skip(1)}catch(e){break}a!==p.Dh&&await e.ioReader.seek(a)}async seek(e,a,t,i){const r=e.ioReader.getPos(),s=a.privData;if(a.sampleIndexes.length){let i=x.El(a.sampleIndexes,(e=>e.pts>t?-1:1));if(i>0&&(0,h.k)(t-a.sampleIndexes[i-1].pts,a.timeBase,p.i0)<BigInt(1e4))return d.Yz(`seek in sampleIndexes, found index: ${i}, pts: ${a.sampleIndexes[i-1].pts}, pos: ${a.sampleIndexes[i-1].pos}`,b,420),await e.ioReader.seek(a.sampleIndexes[i-1].pos),s.nextDTS=a.sampleIndexes[i-1].dts,r}if(t===BigInt(0))return await e.ioReader.seek(this.context.firstFramePos),r;if(this.context.isVBR)if(s.tocIndexes.length){const i=s.tocIndexes[0|Number(t/(a.duration/BigInt(u))&0xffffffffn)];if(i)d.Yz(`seek in xing toc indexes, pts: ${i.dts}, pos: ${i.pos}`,b,436),await e.ioReader.seek(i.pos),s.nextDTS=i.dts;else{d.Yz("not found any keyframe index, try to seek in bytes",b,441);const i=T(s.frameHeader,a.codecpar.sampleRate),r=t/BigInt(a.codecpar.frameSize>>>0),o=r*BigInt(Math.floor(i))+this.context.firstFramePos;s.nextDTS=r*BigInt(a.codecpar.frameSize>>>0),await e.ioReader.seek(o)}}else{d.Yz("not found any keyframe index, try to seek in bytes",b,450);const i=T(s.frameHeader,a.codecpar.sampleRate),r=t/BigInt(a.codecpar.frameSize>>>0),o=r*BigInt(Math.floor(i))+this.context.firstFramePos;s.nextDTS=r*BigInt(a.codecpar.frameSize>>>0),await e.ioReader.seek(o)}else{const i=t/BigInt(a.codecpar.frameSize>>>0),r=i*BigInt(s.frameLength>>>0)+this.context.firstFramePos;s.nextDTS=i*BigInt(a.codecpar.frameSize>>>0),await e.ioReader.seek(r)}return await this.syncToFrame(e),r}getAnalyzeStreamsCount(){return 1}}},3607:(e,a,t)=>{function i(e){return e>0?e:-e}function r(e,a){return e>a?e:a}function s(e,a){return e>a?a:e}t.d(a,{T9:()=>r,jk:()=>s,tn:()=>i})}}]);