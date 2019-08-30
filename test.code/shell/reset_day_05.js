
var shell = require("./shell.js");

shell.addTask("pve", function() {

	// 必需为thunk函数
	return function(next) {

		// 每日挑战置为可挑战状态
		var con = {
			pveDayTime: 0,
			pveDayCount: 0
		};
		co(function* () {

			yield colls["pve"].$update({}, {"$set": con}, {multi: true});
		}).then(function() {
			next(null, null);
		});
	};
}).addTask("user_sign", function() {

	return function(next) {

		// 每日挑战置为可挑战状态
		co(function* () {

			yield colls["user_sign"].$update({}, {"$set": {"isDaySign": 1}}, {multi: true});

			// 如果是周一的凌晨5点钟，重置玩家的签到数据
			var day = new Date().getDay();
			if (day == 1) {

				var con = {
					signNum: 0,
					loseSignNum: 0,
					list: null
				};
				yield colls["user_sign"].$update({}, {"$set": con}, {multi: true});
			}
		}).then(function() {
			next(null, null);
		});
	};
}).start();




