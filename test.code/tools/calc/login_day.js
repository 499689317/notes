
// 每日注册人数统计

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

			var fileName = "./统计注册数据.csv";
			console.log(fileName);
			
			var list = yield colls["player_login"].$findAll();
			var title = "当前统计总人数为：" + list.length;
			fs.appendFileSync(fileName, title + "\n", "utf-8");

			var today = "2017-12-1 05:00:00";// 统计那天的日期
			var time = new Date(today);
			var date = time.getDate();
			var regist = 0;
			for (var i = 0; i < list.length; i++) {
				
				var logs = list[i].logs;
				if (!logs || !logs.length) continue;
				for (var m = 0; m < logs.length; m++) {
					
					if (isInTime(today, logs[m].time) && logs[m].type == 1) {
						regist++;
						continue;
					}
				}
			}
			
			var reg = date + "号注册人数" + regist;
			console.log("reg : " + reg);
			fs.appendFileSync(fileName, reg + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();





