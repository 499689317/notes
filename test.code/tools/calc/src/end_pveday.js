
// 每日挑战数据分析
// 完成每日挑战

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("end_daypve_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计每日挑战胜利数据.txt";
			var fileName = "./统计每日挑战胜利数据.csv";
			console.log(fileName);

			var list = yield colls["end_daypve_log"].$findAll({}, {_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n", "utf-8");

			var s1 = 0, s2 = 0, s3 = 0;
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					var level = list[i][key].state.Level;
					var result = list[i][key].state.Result;
					if (level == 1 && result == "Success") {
						s1++;
					} else if (level == 2 && result == "Success") {
						s2++;
					} else if (level == 3 && result == "Success") {
						s3++;
					}
				};
			}

			// var des = "\n每日挑战简单关卡胜利次数 : " + s1 +
			// 			"\n每日挑战普通关卡胜利次数 : " + s2 +
			// 			"\n每日挑战困难关卡胜利次数 : " + s3;
			// console.log("每日挑战详情：" + des);
			
			var des = "简单胜利次数,普通胜利次数,困难胜利次数,统计总人数," + list.length + "\n";
			des += (s1 + "," + s2 + "," + s3);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();


