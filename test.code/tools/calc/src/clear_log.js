
// 统计完成关卡后玩家去向

var shell = require("./shell.js");
var fs = require("fs");

var getLevelJson = function() {

	return function(next) {

		fs.readFile("./data/LevelTemplateData.json", "utf-8", function(err, data) {
			next(null, JSON.parse(data) );
		});
	};
};

shell.addTask("clear_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计完成关卡后玩家去向数据.txt";
			var fileName = "./统计完成关卡后玩家去向数据.csv";
			console.log(fileName);
			
			var list = yield colls["clear_log"].$findAll({}, {_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n\n", "utf-8");
			
			// 遍历各关卡数据
			var levelJson = yield getLevelJson();
			var levelList = levelJson.RECORDS;
			var levels = {};
			for (var i = 0; i < levelList.length; i++) {
				var jid = levelList[i].ID;
				if (!levels[jid]) {
					levels[jid] = {
						"0": 0,
						"1": 0,
						"2": 0
					};
				}
				for (var j = 0; j < list.length; j++) {
					
					for(var key in list[j]) {
						var d = list[j][key];
						if (jid == d.state.LevelID) {
							if (d.state.EventName == "退出") {
								levels[jid]["0"]++;
							} else if (d.state.EventName == "下一关") {
								levels[jid]["1"]++;
							} else if (d.state.EventName == "重玩") {
								levels[jid]["2"]++;
							}
						}
					};
				}
				
			}
			
			// for(var id in levels) {
			// 	var des = "关卡" + id + "完成后：" +
			// 		levels[id][0] + "次点退出按钮" +
			// 		"||" + levels[id][1] + "次点下一关按钮" +
			// 		"||" + levels[id][2] + "次点重玩按钮\n"
			// 	fs.appendFileSync(fileName, des + "\n", "utf-8");
			// };

			var des = "关卡id,点击退出次数,点击下一关次数,点击重玩次数,统计总人数," + list.length + "\n";
			for(var id in levels) {
				des += (id + "," + levels[id][0] + "," + levels[id][1] + "," + levels[id][2] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();








