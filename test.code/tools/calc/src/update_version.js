
// 版本升级用户

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("update_version_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计升级版本用户数据.txt";
			var fileName = "./统计升级版本用户数据.csv";
			console.log(fileName);

			var list = yield colls["update_version_log"].$findAll({},{_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n", "utf-8");
			// console.log(list);
			var count = 0;
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					// var time = new Date(key);
					// var year = time.getFullYear();
					// var month = time.getMonth() + 1;
					// var date = time.getDate();
					// var hour = time.getHours();
					// var minu = time.getMinutes();
					// var k = year + "/" + month + "/" + date + "号" + hour + "点"// +minu;
					if (list[i][key].state.UpDateResult == "UpDateSuccess") {
						count++;
					}
				};
			}
			
			// var des = "更新版本成功用户人数：" + count + "\n"
			// 			+ "更新版本失败用户人数：" + (list.length - count);
			var des = "更新成功,更新失败,统计总人数," + list.length + "\n";
			des += (count + "," + (list.length - count) );
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();


