
/**
 * 数据加密系统概念
 * 
 * hash算法(不可逆)
 * 加/解密(可逆)
 * 签名与认证
 * 
 * 对称加密系统：用同一个密钥做加解密运算（des/aes），加密和解密使用相同密钥的算法。
 * DES加密介绍 DES是一种对称加密算法，
 * DES加密算法出自IBM的研究，后来被美国政府正式采用，之后开始广泛流传，但是近些年使用越来越少，
 * 因为DES使用56位密钥，以现代计算能力，24小时内即可被破解。
 * 虽然如此，在某些简单应用中，我们还是可以使用DES加密算法。
 * 注意：DES加密和解密过程中，密钥长度都必须是8的倍数
 * 非对称加密系统：rsa
 * rsa加密算法(加密/签名)
 * rsa会生成两个密钥（公钥与私钥）
 * 加/解密：公钥用于加密，私钥用于解密
 * 签名认证：私钥用于签名，公钥用于认证
 *
 * 哈希函数：比如MD5,SHA，这些都不是加密算法。很多人把md5说成是加密算法，这是严重不正确的。
 * 哈希函数：MD5，SHA 是没有密钥的，相当与指纹的概念，因此也是不可逆的；md5是128位的，
 * SHA有不同的算法，有128，256等位。如SHA-256,SHA-384。
 * Base64：这更加不属于加密算法的范围了，它只是将byte[]数组进行了转换，
 * 为什么要转换呢？就是因为很多加密后的密文后者一些特殊的byte[]数组需要显示出来，或者需要进行传递（电子邮件），
 * 但是直接转换就会导致很多不可显示的字符，会丢失一些信息，因此就转换为Base64编码，这些都是可显示的字符。
 * 所以转换后，长度会增加。它是可逆的。
 * 3DES/DES/AES：这才是加密算法，因此也是可逆的，加解密需要密钥,也就是常说的key。
 * RSA：这是公钥加密，也就是加密和解密密钥不同，也是可逆的。
 * 
 * 
 * crypto加密模块：https://cnodejs.org/topic/504061d7fef591855112bab5
 * 模块提供了 HTTP 或 HTTPS 连接过程中封装安全凭证的方法，也提供了 OpenSSL 的哈希（hash），hmac，
 * 加密（cipher），
 * 解密（decipher），
 * 签名（sign），
 * 验证（verify） 方法的封装。
 * 1. 通过不可逆的hash算法可以保证登陆密码的安全
 * 2. 通过非对称的加密算法，可以保证数据存储的安全性
 * 3. 通过数字签名，可以验证数据在传输过程中是否被篡改
 * 
 */

// nodejs加密模块
var crypto = require("crypto");

// 返回支持的加密算法名数组
// console.log(crypto.getCiphers());
// 返回支持的哈希算法名数组
// console.log(crypto.getHashes());
// 返回支持的椭圆曲线名数组
// console.log(crypto.getCurves());

// md5散列函数
// 运算速度快：对jquery.js求md5值，57254个字符，耗时1.907ms
// 输出长度固定：输入长度不固定，输出长度固定（128位）。
// 运算不可逆：已知运算结果的情况下，无法通过逆运算得到原始字符串。
// 高度离散：输入的微小变化，可导致运算结果差异巨大。
// 弱碰撞性：不同输入的散列值可能相同。(概率非常小)

// 文件完整性校验：比如从网上下载一个软件，一般网站都会将软件的md5值附在网页上，用户下载完软件后，可对下载到本地的软件进行md5运算，然后跟网站上的md5值进行对比，确保下载的软件是完整的（或正确的）
// 密码保护：将md5后的密码保存到数据库，而不是保存明文密码，避免拖库等事件发生后，明文密码外泄。
// 防篡改：比如数字证书的防篡改，就用到了摘要算法。（当然还要结合数字签名等手段）
// var md5 = crypto.createHash("md5");
// var result = md5.update("b").digest("hex");
// 输出：92eb5ffee6ae2fec3ad71c777531578f
// console.log(result);

// 【crypto.createHash(algorithm)】
// 　　创建并返回一个哈希对象，使用指定的算法来生成哈希摘要。
// 　　参数 algorithm 取决于平台上 OpenSSL 版本所支持的算法。例如，'sha1', 'md5', 'sha256', 'sha512' 等等
// 【hash.update(data[, input_encoding])】
// 　　根据 data 来更新哈希内容，编码方式根据 input_encoding 来定，有 'utf8', 'ascii' 或 'binary'。
// 　　如果没有传入值，默认编码方式是'utf8'。如果 data 是 Buffer， input_encoding 将会被忽略。
// 　　因为它是流式数据，所以可以使用不同的数据调用很多次。
// 【hash.digest([encoding])】
// 　　计算传入的数据的哈希摘要。encoding 可以是 'hex', 'binary' 或 'base64'，如果没有指定encoding ，将返回 buffer。
// [注意]调用 digest() 后不能再用 hash 对象。

// des编码
function desEncode(data, alg, key, iv) {

	if (!data || !alg || !key) {
		console.log(data, alg, key);
		return "";
	}
	var str = "",
		cipher = crypto.createCipher(alg, key, iv);
	str += cipher.update(data, "utf8", "hex");
	str += cipher.final("hex");
	return str;
};
// des解码
function desDecode(data, alg, key, iv) {

	if (!data || !alg || !key) {
		console.log(data, alg, key);
		return "";
	}
	var str = "",
		decipher = crypto.createDecipher(alg, key, iv);
	str += decipher.update(data, "hex", "utf8");
	str += decipher.final("utf8");
	return str;
};

// aes编码
function aesEncode(data, alg, key) {

	if (!data || !alg || !key) {
		console.log(data, key);
		return "";
	}
	var str = "",
		// 使用aes128编码
		cipher = crypto.createCipher(alg, key);
	// utf-8到base64
	str = cipher.update(data, "utf8", "base64"),
	str += cipher.final("base64");
	return str;
};
// aes解码
function aesDecode(data, alg, key) {

	if (!data || !alg || !key) {
		console.log(data, key);
		return null;
	}
	var str = "",
		decipher = crypto.createDecipher(alg, key);
	str = decipher.update(data, "base64", "utf8");
	str += decipher.final("utf8");
	return str;
};

// hmac算法(不可逆)
function getHmacEnctypted(data, alg, key) {

	if (!data || !alg || !key) {
		console.log(data, alg, key);
		return "";
	}
	var k = key.toString("utf8"),
		hmac = crypto.createHmac(alg, k);
	hmac.update(data, "utf8");
	return hmac.digest("hex");
};
function hmacDecrypted() {};

// 获取rsa签名
function getRsaSign(data, rsa_key, sign) {

	var verifier = crypto.createVerify("RSA-SHA1");
	verifier.update(data, "utf8", "base64");
	return verifier.verify(rsa_key, sign, "base64");
};
// 获取md5字符串值
function getMd5Str(str) {

	if (!str) {
		console.log(str);
		return "";
	}
	return crypto.createHash("md5").update(str).digest("hex");
};
// 获取md5二进制流
function getMd5Binary(str) {

	if (!str) {
		console.log(str);
		return "";
	}
	var buf = new Buffer(str);
	var bin = buf.toString("binary");
	return crypto.createHash("md5").update(bin).digest("hex");
};
// 获取sha1字符串
function getSha1Str(str) {

	if (!str) {
		console.log(str);
		return "";
	}
	return crypto.createHash("sha1").update(str).digest("hex");
};


// test 编解码

var d = "ok,this is str";
var d1 = "ok,this is buffer";
var d2 = new Buffer(d1);
console.log("d2: ", d2);
var k = "7y05R9qwKaIKgIHh4vAw19X1zuknR21Y";
var i = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// des
var des1 = desEncode(d, "des", k, i);
console.log("des1: ", des1);
var des2 = desDecode(des1, "des", k, i);
console.log("des2: ", des2);
// aes128
var aes1 = aesEncode(d, "aes128", k);
console.log("aes1: ", aes1);
var aes2 = aesDecode(aes1, "aes128", k);
console.log("aes2: ", aes2);
// 测试buffer数据
var des3 = desEncode(d2, "des", k, i);
console.log("des3: ", des3);
var des4 = desDecode(des3, "des", k, i);
console.log("des4: ", des4);
var aes3 = aesEncode(d2, "aes128", k);
console.log("aes3: ", aes3);
var aes4 = aesDecode(aes3, "aes128", k);
console.log("aes4: ", aes4);


var hmac1 = getHmacEnctypted(d, "sha1", k);
console.log("hmac1: ", hmac1);
var hmac2 = getHmacEnctypted(d, "md5", k);
console.log("hmac2: ", hmac2);

var md5str = getMd5Str(d);
console.log("md5str: ", md5str);
var md5bin = getMd5Binary(d);
console.log("md5bin: ", md5bin);
var sha1 = getSha1Str(d);
console.log("sha1: ", sha1);

// var sign = getRsaSign(d, k);
// console.log(sign);





