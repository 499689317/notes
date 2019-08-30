
// 统计点击关卡次数

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("click_level_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计点击关卡数据.txt";
			var fileName = "./统计点击关卡数据.csv";
			console.log(fileName);

			var list = yield colls["click_level_log"].$findAll({},{_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n", "utf-8");
			// console.log(list);
			var levels = {};
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					// var time = new Date(key);
					// var year = time.getFullYear();
					// var month = time.getMonth() + 1;
					// var date = time.getDate();
					// var hour = time.getHours();
					// var minu = time.getMinutes();
					// var k = year + "/" + month + "/" + date + "号" + hour + "点"// +minu;
					
					var id = list[i][key].state.LevelID;
					if (!levels[id]) {
						levels[id] = 0;
					}
					levels[id]++;
				};
			}

			// for(var d in levels) {
			// 	var des = d + "关卡点击次数：" + levels[d];
			// 	fs.appendFileSync(fileName, des + "\n", "utf-8");
			// }
			var des = "关卡id,点击次数,统计总人数," + list.length + "\n";
			for(var id in levels) {
				des += (id + "," + levels[id] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();


