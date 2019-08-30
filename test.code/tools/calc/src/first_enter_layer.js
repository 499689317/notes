
// 首次进入场景数据整理

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("first_enter_layer_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计首次进入场景数据.txt";
			var fileName = "./统计首次进入场景数据.csv";
			console.log(fileName);

			var list = yield colls["first_enter_layer_log"].$findAll({},{_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n", "utf-8");
			// console.log(list);
			var dates = {};
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					var time = new Date(key);
					var year = time.getFullYear();
					var month = time.getMonth() + 1;
					var date = time.getDate();
					var hour = time.getHours();
					var minu = time.getMinutes();
					var k = year + "/" + month + "/" + date + "号" + hour + "点"// +minu;
					if (!dates[k]) {
						dates[k] = 0;
					}
					dates[k]++;
				};
			}
			// for(var d in dates) {
			// 	var des = d + "首次进入场景人数：" + dates[d];
			// 	fs.appendFileSync(fileName, des + "\n", "utf-8");
			// }
			
			var des = "时间,首次进入场景人数,统计总人数," + list.length + "\n";
			for(var d in dates) {
				des += (d + "," + dates[d] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();


