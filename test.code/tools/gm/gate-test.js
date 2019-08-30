

var http = require("http");
// http客户端

var options = {

	hostname: "101.201.234.73",
	port: 3000,
	// path: "/login/enter_game",
	// path: "/login/register",
	path: "/login/visitor",// /game/live?zz=xx
	method: "POST",// "GET"
};


var req = http.request(options, function(res) {

	// 
	console.log(res.statusCode)
	console.log(res.headers)

	res.setEncoding("utf-8");
	res.on("data", function(chunk) {

		console.log(chunk)
	});
});

req.write(JSON.stringify({rid: "1"}) );
req.end();




// function Test() {
// 	this.testcount = 0;
// };
// Test.prototype.test = function() {
	
// }
// Test.prototype.destroy = function() {
// 	this.testcount = 0;
// }

// var list = [];
// for (var i = 0; i < 100000; i++) {
// 	list.push(new Test() );
// }

// function beatheart() {

// 	var interval = setInterval(function() {

// 		// 定时检测
// 		var startTime = Date.now();
// 		list.forEach(function(value, index) {

// 			value.testcount++;
// 			if (value.testcount > 5) {
// 				value.destroy();
// 			}
// 		});
// 		var endTime = Date.now();
// 		var costTime = endTime - startTime;
// 		console.log("总共耗时" + costTime + "毫秒");
// 		console.log("数据长度" + list.length);
// 	}, 5000);
// };

// function requestheart() {

// 	var xxx = setInterval(function() {

// 		list.forEach(function(value, index) {

// 			value.testcount = 0;
// 		});
// 	}, 1000);
// };
// beatheart();
// requestheart();


