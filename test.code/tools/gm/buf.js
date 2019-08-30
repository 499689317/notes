

/**
 * Buffer概念
 * Buffer实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 
 * 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。
 * Buffer非常适合处理字节
 * Buffer内最小操作单位是字节Byte(8位bit)，计算机中一个存储空间为1bit
 * 显示以16进制来显示(主要是因为二进制显示太不方便了，用16进制比较简洁)
 * 
 * TypedArray
 * Buffer实例也是Uint8Array实例
 * ArrayBuffer
 */


const buf = Buffer.from('hello world', 'ascii');

console.log(buf);
console.log(buf.length);

for(const b of buf) {
	console.log(b);
};
console.log(Buffer.poolSize);

// 输出 68656c6c6f20776f726c64
console.log(buf.toString('hex'));// 16进制

// 输出 aGVsbG8gd29ybGQ=
console.log(buf.toString('base64'));



/**
 * 流（Stream）
 * 所有使用 Node.js API 创建的流对象都只能操作 strings 和 Buffer（或 Uint8Array） 对象。
 * 几乎所有的 Node.js 应用，不管多么简单，都在某种程度上使用了流。
 * 可写流（Writeable）
 * 可读流（Readable）
 * http：request对象，respose对象
 * tcp: socket对象
 * zlib：Gzip对象
 * ......
 */


// zlib 压缩解压缩 deflate/inflate gzip/gunzip
/*
$ node
> // Load zlib and create a buffer to compress
> var zlib = require('zlib');
> var input = new Buffer('lorem ipsum dolor sit amet', 'utf8')
> // What's 'input'?
> input
<Buffer 6c 6f 72 65 6d 20 69 70 73 75 6d 20 64 6f 6c 6f 72 20 73 69 74 20 61 6d 65 74>
> // Compress it
> zlib.deflate(input)
<SlowBuffer 78 9c cb c9 2f 4a cd 55 c8 2c 28 2e cd 55 48 c9 cf c9 2f 52 28 ce 2c 51 48 cc 4d 2d 01 00 87 15 09 e5>
> // Compress it and convert to utf8 string, just for the heck of it
> zlib.deflate(input).toString('utf8')
'x???/J?U?,(.?UH???/R(?,QH?M-\u0001\u0000?\u0015\t?'
> // Compress, then uncompress (get back what we started with)
> zlib.inflate(zlib.deflate(input))
<SlowBuffer 6c 6f 72 65 6d 20 69 70 73 75 6d 20 64 6f 6c 6f 72 20 73 69 74 20 61 6d 65 74>
> // Again, and convert back to our initial string
> zlib.inflate(zlib.deflate(input)).toString('utf8')
'lorem ipsum dolor sit amet
*/

var zlib = require("zlib");
function zlibDeflateStr(data, encode, cb) {
	if (!data || !encode) {
		console.log(data, encode);
		cb && cb(new Error() );
		return;
	}
	var input = Buffer.from(data, encode);
	zlib.deflate(input, function(err, buf) {
		cb && cb(err, buf);
	});
};
function zlibInflateBuffer(buffer, encode, cb) {

	if (!buffer || !encode) {
		console.log(buffer, encode);
		cb && cb(new Error() );
		return;
	}
	zlib.inflate(buffer, function(err, buf) {
		if (err) {
			cb && cb(err);
			return;
		}
		cb && cb(err, buf.toString(encode));
	});
};
function zlibGzipStr(data, encode, cb) {

	if (!data || !encode) {
		console.log(data, encode);
		cb && cb(new Error() );
		return;
	}
	var input = Buffer.from(data, encode);
	zlib.gzip(input, function(err, buf) {
		cb && cb(err, buf);
	});
};
function zlibGunzipBuffer(buffer, encode, cb) {

	if (!buffer || !encode) {
		console.log(buffer, encode);
		cb && cb(new Error() );
		return;
	}
	zlib.gunzip(buffer, function(err, buf) {
		if (err) {
			cb && cb(err);
			return;
		}
		cb && cb(err, buf.toString(encode));
	});
};

// test解/压缩

var d = "ok,i love you";
var t = Date.now();
zlibDeflateStr(d, "utf8", function(err, buf) {
	var t1 = Date.now();
	console.log("deflate压缩用时：", t1 - t);
	console.log("deflate err: ", err);
	console.log("deflate buf: ", buf);
	zlibInflateBuffer(buf, "utf8", function(err, data) {
		var t2 = Date.now();
		console.log("inflate解压用时：", t2 - t1);
		console.log("inflate err: ", err);
		console.log("inflate data: ", data);
	});
});

var tt = Date.now();
zlibGzipStr(d, "utf8", function(err, buf) {
	var tt1 = Date.now();
	console.log("gzip压缩用时：", tt1 - tt);
	console.log("gzip err: ", err);
	console.log("gzip buf: ", buf);
	zlibGunzipBuffer(buf, "utf8", function(err, data) {
		var tt2 = Date.now();
		console.log("gunzip解压用时：", tt2 - tt1);
		console.log("gunzip err: ", err);
		console.log("gunzip data: ", data);
	});
});




