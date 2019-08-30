
var shell = require("./shell.js");



shell.test();




// shell.addTask("2017-12", function() {

// 	return function(next) {

// 		co(function* () {

// 			var startTime = Date.now();
// 			console.log(startTime);
// 			var logins = yield colls["2017-12"].$findAll({logId: "online-6"},{_id: 0});
// 			var endTime = Date.now();
// 			console.log(endTime);
// 			var costTime = endTime - startTime;
// 			console.log("find耗时 : " + costTime + "毫秒");
// 			// console.log(logins);
			
// 			// var st = Date.now();
// 			// var logins2 = yield colls["2017-12"].$findOne({logId: "online-6"},{_id: 0});
// 			// var et = Date.now();
// 			// console("findOne耗时：", et - st);

// 		}).then(function() {
// 			console.log("xxxxxxxx");
// 			next(null, null);
// 		});
// 	};
// }).start();











