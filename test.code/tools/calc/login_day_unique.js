
// 跑每天登录游戏设备数(每台设备每天最多只能记录1次)
// 计算每日留存
// 计算次日留存
// 计算3日留存

var shell = require("./shell.js");
var fs = require("fs");

function getBeginTime(d) {
	// console.log(d);
	return new Date(d).getTime();
};
function getEndTime(d) {
	var time = getTimeByCount(d, 1);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var nextDate = year + "-" + month + "-" + date + " 00:04:59";
	// console.log(nextDate);
	return new Date(nextDate).getTime();
};
function isInTime(d, time) {

	var beginTime = getBeginTime(d);
	var endTime = getEndTime(d);
	if (time >= beginTime && time <= endTime) {
		return 1;
	}
	return 0;
};
function isIn00To05(time) {

	var ct = new Date(time).getHours();
	if (ct > 0 && ct <= 5) {
		return 1;
	}
	return 0;
};

// 明天/昨天---用js的setDate方法处理天数
function getTimeByCount(d, count) {
	// console.log(d);
	var time = new Date(d);
	var date = time.getDate();
	if (!count) {
		g_logger.print.error("参数错误");
		return date;
	}
    time.setDate(date + count);
    return time;
};

shell.addTask("player_login", function() {

	return function(next) {

		co(function* () {

			var fileName = "./去重统计登录数据.csv";
			console.log(fileName);
			
			var list = yield colls["player_login"].$findAll();
			var title = "当前统计总人数为：" + list.length;
			fs.appendFileSync(fileName, title + "\n", "utf-8");

			var today = "2017-12-4 05:00:00";// 统计那天的日期
			var time = new Date(today);
			var date = time.getDate();

			var day = 0;// 与统计那天相差天数，正整数
			var count = 0;// 统计出来的数量
			for (var i = 0; i < list.length; i++) {
				
				var logs = list[i].logs;
				if (!logs || !logs.length) continue;

				// 找出注册时间
				var registTime = 0;
				for (var n = 0; n < logs.length; n++) {

					if (logs[n].type == 1) {
						registTime = logs[n].time;
						continue;
					}
				}
				if (!registTime) {
					console.log("出问题了");
					continue;
				}

				// 注册日期
				var registDate = new Date(registTime).getDate();
				if (isIn00To05(registTime) ) {
					registDate--;
				}

				for (var j = 0; j < logs.length; j++) {

					if (isInTime(today, logs[j].time) && logs[j].type == 2 && (date - registDate == day) ) {
						count++;
						continue;
					}
				}
			}
			var des = (date - day) + "号注册" + date + "号登录人数：" + count;
			fs.appendFileSync(fileName, des + "\n", "utf-8");

		}).then(function() {
			next(null, null);
		});
	};
}).start();











