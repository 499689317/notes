
(function() {

	 console.log("abc".match(/^abc$/));
	 // 汉字匹配
	 console.log("中文".match(/[\u4e00-\u9fa5]+/));
	 // 双字节匹配
	 console.log("双字节".match(/[^\x00-\xff]*/));
	 // 匹配一个h5标签
	 console.log("<html>h5标签</html>".match(/<.*>.*<\/.*>/));
	 // 匹配一个url地址
	 console.log("http://127.0.0.1:443".match(/^http[s]?:\/\/.+$/));
	 // 匹配一个邮箱地址
	 console.log("mdh_1991@sina.com".match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/));
	 // 匹配最多20位数字
	 console.log("3842949147".match(/^[0-9]{1,20}$/));
	 // 匹配至少5位至多20位字母开头的字母数字._组成的字符串
	 console.log("ww902175_887..59".match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/));
	 // 匹配字母数字下划线与-组成的字符串
	 console.log("akhka88-877__".match(/^[\w-]{6,30}$/));
	 // 匹配中国电话号码，10086怎么办
	 console.log("0797-6293876".match(/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/));
})();

