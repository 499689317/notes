
// 关卡详情

var shell = require("./shell.js");
var fs = require("fs");

var getLevelJson = function() {

	return function(next) {

		fs.readFile("./data/LevelTemplateData.json", "utf-8", function(err, data) {
			next(null, JSON.parse(data) );
		});
	};
};

shell.addTask("level", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计关卡数据.txt";
			var fileName = "./统计关卡数据.csv";
			console.log(fileName);
			
			var list = yield colls["level"].$findAll({}, {_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n\n", "utf-8");
			
			// 遍历各关卡数据
			var levelJson = yield getLevelJson();
			var levelList = levelJson.RECORDS;
			var des = "统计总人数," + list.length + "\n" + "关卡id,游戏总次数,游戏总人数,一星通关次数,二星通关次数,三星通关次数,通关总次数,通关平均时间,失败总次数\n";
			for (var i = 0; i < levelList.length; i++) {

				var lvJson = levelList[i];
				var id = lvJson.ID;// 关卡id
				var name = lvJson.levelname;// 关卡名称
				
				var totalPerson = 0;// 当前关卡总人数
				var totalBattle = 0;// 当前关卡被玩次数
				var oneStar = 0;// 1星次数
				var twoStar = 0;// 2星次数
				var threeStar = 0;// 3星次数
				var winBattle = 0;// 关卡总胜利次数
				var totalTime = 0;// 通关总时间
				var totalLost = 0;// 失败次数
				// console.log(list);
				var winPerson = 0;// 当前关卡通关人次
				for (var j = 0; j < list.length; j++) {
					// console.log(list[j].levels);
					for(var sid in list[j].levels ) {
						var cHData = list[j].levels[sid];
						if (!cHData) continue;
						for(var lid in cHData ) {
							if (!cHData[lid] ) continue;
							if (lid == id) {
								// 玩家每一关卡过关数据
								var data = cHData[lid];

								// 统计每一关卡数据
								totalBattle += data.total;
								oneStar += data.oneStar;
								twoStar += data.twoStar;
								threeStar += data.threeStar;
								totalTime += data.time;
								if (totalBattle > 0) {
									totalPerson++;
								}

								// 通关人次
								if (oneStar > 0 || twoStar > 0 || threeStar > 0) {
									winPerson++;
								}
							}
						};
					};
				}

				// 当前关卡总胜利次数
				winBattle = oneStar + twoStar + threeStar;
				totalLost = totalBattle - winBattle;

				if (totalLost < 0) {// 离线数据影响
					totalLost = 0;
				}

				var pJTime = 0;
				if (winPerson) {
					pJTime = Math.round(totalTime/winPerson);
				}
				
				// 输出每一关数据
				// var des = "关卡名字：" + name
				// 		+ ",关卡id：" + id
				// 		+ ",游戏总次数：" + totalBattle
				// 		+ ",游戏总人数：" + totalPerson
				// 		+ ",一星通关次数：" + oneStar
				// 		+ ",二星通关次数：" + twoStar
				// 		+ ",三星通关次数：" + threeStar
				// 		+ ",通关总次数：" + winBattle
				// 		+ ",通关平均时间：" + pJTime
				// 		+ ",失败总次数：" + totalLost;

				// console.log(des);
				// 输出到文件中
				// fs.appendFileSync(fileName, des + "\n", "utf-8");
				
				des += (id + "," + totalBattle + "," + totalPerson + "," + oneStar + "," + twoStar + "," + threeStar + "," + winBattle + "," + pJTime + "," + totalLost + "\n");

			}
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();








