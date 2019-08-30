
// 统计打完第10关后玩家数据

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("ten_level_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计打完第10关后玩家数据.txt";
			var fileName = "./统计打完第10关后玩家数据.csv";
			console.log(fileName);

			var list = yield colls["ten_level_log"].$findAll({},{_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n", "utf-8");
			// console.log(list);

			var count = 0;// 第10关总战斗次数
			var count2 = 0;
			var count3 = 0;
			var count4 = 0;
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					// var time = new Date(key);
					// var year = time.getFullYear();
					// var month = time.getMonth() + 1;
					// var date = time.getDate();
					// var hour = time.getHours();
					// var minu = time.getMinutes();
					// var k = year + "/" + month + "/" + date + "号" + hour + "点"// +minu;
					count++;
					if (list[i][key].state.EventName == "下一关") {
						count2++;
					} else if (list[i][key].state.EventName == "退出") {
						count3++;
					} else if (list[i][key].state.EventName == "重玩") {
						count4++;
					}
				};
			}
			// var des = "第10关总战斗次数：" + count + "\n完成关卡点击下一关总次数：" + count2 + 
			// 	"\n完成关卡点击退出总次数：" + count3 + "\n完成关卡点击重玩总次数：" + count4;
			var des = "第10关战斗总次数,点击下一关次数,点击退出次数,点击重玩次数,统计总人数," + list.length + "\n";
			des += (count + "," + count2 + "," + count3 + "," + count4);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();


