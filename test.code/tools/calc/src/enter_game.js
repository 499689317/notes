
// 进入游戏数据分析

var shell = require("./shell.js");
var fs = require("fs");
var roleList = [];
var roleInfo = {};
var fileName = "./统计玩家行为数据.csv";
function getTimeKey(t) {
	// console.log(t)
	var time = new Date(Number(t));
	// console.log(time)
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hour = time.getHours();
	var minu = time.getMinutes();
	var sec  = time.getSeconds();
	return year + "/" + month + "/" + date + "-" + hour + ":" + minu + ":" + sec;
};
shell.addTask("player_login", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["player_login"].$findAll({}, {_id: 0});
			// console.log(list.length);
			// 随机筛选50个人
			var count = 0;
			for (var i = 0; i < list.length; i++) {
				
				if (count < 50) {

					var random = Math.floor(Math.random() * list.length);
					// console.log(random);
					roleList.push(list[random]);
					count++;
					list.splice(i,1);
					i--;
				}
			}
			// console.log(roleList);
			// console.log(list.length);
			var typeMap = {
				"1": "注册游戏",
				"2": "登录游戏",
				"3": "退出游戏"
			};
			for (var i = 0; i < roleList.length; i++) {
				var rid = roleList[i].rid;
				var logs = roleList[i].logs;
				roleInfo[rid] = {};
				for (var j = 0; j < logs.length; j++) {
					
					var time = logs[j].time;
					var type = logs[j].type;
					// var key = getTimeKey(time);
					roleInfo[rid][time] = typeMap[type];
				}
			}
			console.log(Object.keys(roleInfo).length );

		}).then(function() {
			next(null, null);
		});
	};
}).addTask("battle_offline_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["battle_offline_log"].$findAll({}, {_id: 0});
			// console.log(list);
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						
						for(var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "战斗内掉线";
						}
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("clear_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["clear_log"].$findAll({}, {_id: 0});
			// console.log(list)
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = list[i][t].state.LevelID + "关卡点击" + list[i][t].state.EventName;
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("click_item_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["click_item_log"].$findAll({}, {_id: 0});
			// console.log(list)
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "点击道具" + list[i][t].state.ButtonName;
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("click_level_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["click_level_log"].$findAll({}, {_id: 0});
			// console.log(list)
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "点击关卡" + list[i][t].state.LevelID;
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("cost_chip_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["cost_chip_log"].$findAll({}, {_id: 0});
			// console.log(list)
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "消耗" + list[i][t].state.ItemID + "道具" + list[i][t].state.Amount + "个";
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("end_daypve_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["end_daypve_log"].$findAll({}, {_id: 0});
			// console.log(list)
			var levelMap = {
				"1": "简单",
				"2": "普通",
				"3": "困难"
			};
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "开始" + levelMap[list[i][t].state.Level] + "每日挑战";
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("end_game_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["end_game_log"].$findAll({}, {_id: 0});
			// console.log(list)
			var resMap = {
				"Success": "成功",
				"Failed": "失败",
			};
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "关卡" + list[i][t].state.LevelID + resMap[list[i][t].state.Result];
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("guide_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["guide_log"].$findAll({}, {_id: 0});
			// console.log(list)
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "新手引导第" + list[i][t].state.Step + "步";
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("load_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["load_log"].$findAll({}, {_id: 0});
			// console.log(list)
			var loadMap = {
				"LoadSuccess": "成功"
			};
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "加载游戏资源" + loadMap[list[i][t].state.LoadResult];
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("sign_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["sign_log"].$findAll({}, {_id: 0});
			// console.log(list)
			var signMap = {
				"Success": "成功"
			};
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "签到" + signMap[list[i][t].state.Result];
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("update_version_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["update_version_log"].$findAll({}, {_id: 0});
			// console.log(list)
			var updateMap = {
				"NeedUpdate": "准备更新",
				"CancelUpdate": "取消更新",
				"UpDateSuccess": "更新成功"
			};
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "新版本apk" + updateMap[list[i][t].state.UpDateResult];
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("unlock_chapter_log", function() {

	return function(next) {

		co(function* () {
			
			var list = yield colls["unlock_chapter_log"].$findAll({}, {_id: 0});
			// console.log(list)
			for(var rid in roleInfo) {
				for (var i = 0; i < list.length; i++) {
					
					if (rid == list[i].rid) {
						for (var t in list[i]) {
							if (typeof list[i][t] != "object") continue;
							// var key = getTimeKey(t);
							var time = new Date(t).getTime();
							roleInfo[rid][time] = "解锁章节" + list[i][t].state.StageID;
						};
					}
				}
			};
			// console.log(roleInfo);
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("calc", function() {

	return function(next) {

		co(function* () {
			
			// console.log(roleInfo);
			console.log(Object.keys(roleInfo).length );
			var info = {};
			for(var rid in roleInfo) {

				if (!info[rid]) {
					info[rid] = [];
				}
				for(var t in roleInfo[rid]) {

					info[rid].push({
						time: t,
						con: roleInfo[rid][t]
					});
				};
			};

			for(var rid in info) {

				info[rid].sort(function(a, b) {
					return a.time - b.time;
				});
			};

			// console.log(info);
			var des = "";
			for(var rid in info) {
				// console.log(des)
				des += "角色id," + rid + "\n日期,操作\n";
				for (var i = 0; i < info[rid].length; i++) {
					des += getTimeKey(info[rid][i].time) + "," + info[rid][i].con + "\n";
				}
			};
			// console.log(des);
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();






















