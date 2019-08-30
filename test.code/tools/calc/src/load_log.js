
// 用户登录加载

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("load_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计用户登录加载数据.txt";
			var fileName = "./统计用户登录加载数据.csv";
			console.log(fileName);

			var list = yield colls["load_log"].$findAll({}, {_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n", "utf-8");

			var count = 0;
			var count2 = 0;
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					if (list[i][key].state.LoadResult == "LoadSuccess") {
						count++;
					} else {
						count2++;
					}
				};
			}
			
			// var des = "用户登录加载成功总次数：" + count + "\n"
			// 			+ "用户登录加载失败总次数：" + count2;
			var des = "加载成功次数,加载失败次数,统计总人数," + list.length + "\n";
			des += (count + "," + count2);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
			
		}).then(function() {
			next(null, null);
		});
	};
}).start();


