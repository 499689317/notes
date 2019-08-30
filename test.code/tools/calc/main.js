
var shell = require("./shell.js");
var fs = require("fs");
var getLevelJson = function() {

	return function(next) {

		fs.readFile("./data/LevelTemplateData.json", "utf-8", function(err, data) {
			next(null, JSON.parse(data) );
		});
	};
};
var getChapterJson = function() {

	return function(next) {

		fs.readFile("./data/StageTemplateData.json", "utf-8", function(err, data) {
			next(null, JSON.parse(data) );
		});
	};
};

shell.addTask("battle_offline_log", function() {

	return function(next) {

		co(function* () {

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
					var k = year + "/" + month + "/" + date + "号" + hour + "点";
					if (!dates[k]) {
						dates[k] = 0;
					}
					dates[k]++;
				};
			}
			
			var des = "掉线总次数," + list.length + "\n" + "日期,掉线次数\n";
			for(var d in dates) {
				des += (d + "," + dates[d] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("clear_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计完成关卡后玩家去向数据.csv";
			console.log(fileName);
			
			var list = yield colls["clear_log"].$findAll({}, {_id: 0, rid: 0});
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
			
			var des = "统计总人数," + list.length + "\n" + "关卡id,点击退出次数,点击下一关次数,点击重玩次数\n";
			for(var id in levels) {
				des += (id + "," + levels[id][0] + "," + levels[id][1] + "," + levels[id][2] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("click_item_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计点击道具数据.csv";
			console.log(fileName);

			var list = yield colls["click_item_log"].$findAll({},{_id: 0, rid: 0});
			var items = {};
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					var iid = list[i][key].state.ButtonName;
					if (!items[iid]) {
						items[iid] = 0;
					}
					items[iid]++;
				};
			}
			
			var des = "统计总人数," + list.length + "\n" + "道具id,点击次数\n";
			for(var id in items) {
				des += (id + "," + items[id] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("click_level_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计点击关卡数据.csv";
			console.log(fileName);

			var list = yield colls["click_level_log"].$findAll({},{_id: 0, rid: 0});
			var levels = {};
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					var id = list[i][key].state.LevelID;
					if (!levels[id]) {
						levels[id] = 0;
					}
					levels[id]++;
				};
			}
			var des = "统计总人数," + list.length + "\n" + "关卡id,点击次数\n";
			for(var id in levels) {
				des += (id + "," + levels[id] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("end_daypve_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计每日挑战胜利数据.csv";
			console.log(fileName);

			var list = yield colls["end_daypve_log"].$findAll({}, {_id: 0, rid: 0});
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
			
			var des = "统计总人数," + list.length + "\n" + "简单胜利次数,普通胜利次数,困难胜利次数\n";
			des += (s1 + "," + s2 + "," + s3);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("enter_daypve_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计每日挑战开始数据.csv";
			console.log(fileName);

			var list = yield colls["enter_daypve_log"].$findAll({}, {_id: 0, rid: 0});
			var s1 = 0, s2 = 0, s3 = 0;
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					var level = list[i][key].state.Level;
					if (level == 1) {
						s1++;
					} else if (level == 2) {
						s2++;
					} else if (level == 3) {
						s3++;
					}
				};
			}
			
			var des = "统计总人数," + list.length + "\n" + "简单总次数,普通总次数,困难总次数\n";
			des += (s1 + "," + s2 + "," + s3);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("first_enter_battle_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计首次进入战斗数据.csv";
			console.log(fileName);

			var list = yield colls["first_enter_battle_log"].$findAll({},{_id: 0, rid: 0});
			var dates = {};
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					var time = new Date(key);
					var year = time.getFullYear();
					var month = time.getMonth() + 1;
					var date = time.getDate();
					var hour = time.getHours();
					var minu = time.getMinutes();
					var k = year + "/" + month + "/" + date + "号" + hour + "点";
					if (!dates[k]) {
						dates[k] = 0;
					}
					dates[k]++;
				};
			}
			
			var des = "统计总人数," + list.length + "\n" + "时间,首次进入战斗人数\n";
			for(var d in dates) {
				des += (d + "," + dates[d] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("first_enter_layer_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计首次进入场景数据.csv";
			console.log(fileName);

			var list = yield colls["first_enter_layer_log"].$findAll({},{_id: 0, rid: 0});
			var dates = {};
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					var time = new Date(key);
					var year = time.getFullYear();
					var month = time.getMonth() + 1;
					var date = time.getDate();
					var hour = time.getHours();
					var minu = time.getMinutes();
					var k = year + "/" + month + "/" + date + "号" + hour + "点";
					if (!dates[k]) {
						dates[k] = 0;
					}
					dates[k]++;
				};
			}
			
			var des = "统计总人数," + list.length + "\n" + "时间,首次进入场景人数\n";
			for(var d in dates) {
				des += (d + "," + dates[d] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("game_perf_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计客户端状态数据.csv";
			console.log(fileName);

			var list = yield colls["game_perf_log"].$findAll({}, {_id: 0, rid: 0});
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
			var des = "统计总人数," + list.length + "\n" + "战斗外fps平均值,战斗外内存占用平均值,战斗外网络延时平均值\n";
			des += (f + "," + m + "," + p + "\n");
			des += "战斗内fps平均值,战斗内内存占用平均值,战斗内网络延时平均值\n";
			des += (f2 + "," + m2 + "," + p2);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("guide_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计新手引导数据.csv";
			console.log(fileName);

			var list = yield colls["guide_log"].$findAll({}, {_id: 0, rid: 0});
			var steps = {};
			for (var i = 0; i < list.length; i++) {
				
				var unique = {};
				for(var key in list[i]) {
					var step = list[i][key].state.Step;
					if (!unique[step]) {
						unique[step] = 1;
					}
				};
				for(var key in unique) {
					var k = (Number(key) + 1);
					if (!steps[k]) {
						steps[k] = 0;
					}
					steps[k]++;
				};
			}
			
			var des = "统计总人数," + list.length + "\n" + "新手引导步数,完成人数\n";
			for(var s in steps) {
				des += (s + "," + steps[s] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("load_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计用户登录加载数据.csv";
			console.log(fileName);

			var list = yield colls["load_log"].$findAll({}, {_id: 0, rid: 0});
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
			
			var des = "统计总人数," + list.length + "\n" + "加载成功次数,加载失败次数\n";
			des += (count + "," + count2);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
			
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("sign_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计签到数据.csv";
			console.log(fileName);

			var list = yield colls["sign_log"].$findAll({},{_id: 0, rid: 0});
			var dates = {};
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					var time = new Date(key);
					var year = time.getFullYear();
					var month = time.getMonth() + 1;
					var date = time.getDate();
					var hour = time.getHours();
					var minu = time.getMinutes();
					var k = year + "/" + month + "/" + date + "号" + hour + "点";
					if (!dates[k]) {
						dates[k] = 0;
					}
					dates[k]++;
				};
			}
			
			var des = "统计总人数," + list.length + "\n" + "时间,签到人数\n";
			for(var d in dates) {
				des += (d + "," + dates[d] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("ten_level_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计打完第10关后玩家数据.csv";
			console.log(fileName);

			var list = yield colls["ten_level_log"].$findAll({},{_id: 0, rid: 0});
			var count = 0;
			var count2 = 0;
			var count3 = 0;
			var count4 = 0;
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
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
			
			var des = "统计总人数," + list.length + "\n" + "第10关战斗总次数,点击下一关次数,点击退出次数,点击重玩次数\n";
			des += (count + "," + count2 + "," + count3 + "," + count4);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("unlock_chapter_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计章节解锁数据.csv";
			console.log(fileName);
			
			var list = yield colls["unlock_chapter_log"].$findAll({}, {_id: 0, rid: 0});
			var chapterJson = yield getChapterJson();
			var chapterList = chapterJson.RECORDS;
			var chapters = {};
			for (var i = 0; i < chapterList.length; i++) {
				var sid = chapterList[i].ID;
				if (!chapters[sid]) {
					chapters[sid] = 0;
				}
				for (var j = 0; j < list.length; j++) {
					
					for(var key in list[j]) {
						var d = list[j][key];
						if (sid == d.state.StageID) {
							chapters[sid]++;
						}
					};
				}
			}
			var des = "统计总人数," + list.length + "\n" + "章节id,解锁次数\n";
			for(var id in chapters) {
				des += (id + "," + chapters[id] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("update_version_log", function() {

	return function(next) {

		co(function* () {

			var fileName = "./统计升级版本用户数据.csv";
			console.log(fileName);

			var list = yield colls["update_version_log"].$findAll({},{_id: 0, rid: 0});
			var count = 0;
			for (var i = 0; i < list.length; i++) {

				for(var key in list[i]) {
					
					if (list[i][key].state.UpDateResult == "UpDateSuccess") {
						count++;
					}
				};
			}
			
			var des = "统计总人数," + list.length + "\n" + "更新成功,更新失败\n";
			des += (count + "," + (list.length - count) );
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();






