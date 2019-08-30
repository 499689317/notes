
// 客户端网络延时
// 客户端内存占用
// 客户端fps

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("game_perf_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计客户端状态数据.txt";
			var fileName = "./统计客户端状态数据.csv";
			console.log(fileName);

			var list = yield colls["game_perf_log"].$findAll({}, {_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n", "utf-8");
			
			var count = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0, count7 = 0, count8 = 0;
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					var fps = Number(list[i][key].state.FPS);
					var mem = Number(list[i][key].state.Memory);
					var ping = Number(list[i][key].state.Ping);
					if (list[i][key].state.isFighting == "False") {
						count++;
						count2 += fps;
						count3 += mem;
						count4 += ping;
					} else {
						count5++;
						count6 += fps;
						count7 += mem;
						count8 += ping;
					}
				};
			}
			var f = count2 / count;
			var m = count3 / count;
			var p = count4 / count;
			var f2 = count6 / count5;
			var m2 = count7 / count5;
			var p2 = count8 / count5;
			// console.log(count);
			// console.log(count2);
			// console.log(count3);
			// console.log(count4);
			// console.log(count5);
			// console.log(count6);
			// console.log(count7);
			// console.log(count8);
			// var des = "战斗外fps平均值：" + f + "\n战斗外内存占用平均值：" + m + "\n战斗外网络延时平均值：" + p +
			// 	"\n战斗内fps平均值：" + f2 + "\n战斗内内存占用平均值：" + m2 + "\n战斗内网络延时平均值：" + p2;
			
			var des = "战斗外fps平均值,战斗外内存占用平均值,战斗外网络延时平均值,统计总人数," + list.length + "\n";
			des += (f + "," + m + "," + p + "\n");
			des += "战斗内fps平均值,战斗内内存占用平均值,战斗内网络延时平均值\n";
			des += (f2 + "," + m2 + "," + p2);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();







