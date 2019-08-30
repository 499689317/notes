
// 碎片消耗去向

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("cost_chip_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计碎片消耗去向数据.txt";
			console.log(fileName);

			var list = yield colls["cost_chip_log"].$findAll();
			var title = "当前统计总人数为：" + list.length;
			fs.appendFileSync(fileName, title + "\n", "utf-8");

			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					// mongodb中_id是一个对象
					if (typeof list[i][key] === "object" && list[i][key].state) {
						var itemId = list[i][key].state.ItemID;
						var num = list[i][key].state.Amount;
						if (level == 1) {
							s1++;
						} else if (level == 2) {
							s2++;
						} else if (level == 3) {
							s3++;
						}
					}
				};
			}
			
		}).then(function() {
			next(null, null);
		});
	};
}).start();


