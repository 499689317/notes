
// 统计战斗内掉线人数

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("battle_offline_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计战斗内掉线数据.txt";
			var fileName = "./统计战斗内掉线数据.csv";
			console.log(fileName);

			var list = yield colls["battle_offline_log"].$findAll({}, {_id: 0, rid: 0});
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
			
			// var des = "战斗内掉线总次数：" + list.length;
			// fs.appendFileSync(fileName, des + "\n", "utf-8");
			
			// for(var d in dates) {
			// 	var dess = d + "掉线人数：" + dates[d];
			// 	fs.appendFileSync(fileName, dess + "\n", "utf-8");
			// };
			

			var des = "日期,掉线次数,掉线总次数," + list.length + "\n";
			for(var d in dates) {
				des += (d + "," + dates[d] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();


