
// 新手引导步骤

var shell = require("./shell.js");
var fs = require("fs");

shell.addTask("guide_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计新手引导数据.txt";
			var fileName = "./统计新手引导数据.csv";
			console.log(fileName);

			var list = yield colls["guide_log"].$findAll({}, {_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n", "utf-8");

			// var s1 = 0, s2 = 0, s3 = 0, s4 = 0, s5 = 0, s6 = 0, s7 = 0, s8 = 0, s9 = 0, s10 = 0, s0 = 0;
			var steps = {};
			for (var i = 0; i < list.length; i++) {
				
				var unique = {};
				for(var key in list[i]) {
					// mongodb中_id是一个对象
					var step = list[i][key].state.Step;
					// 先对Step去重
					if (!unique[step]) {
						unique[step] = 1;
					}
				};

				// 对去重后的数据操作
				for(var key in unique) {

					if (key == 1) {
						// s1++;
						if (!steps[2]) {
							steps[2] = 0;
						}
						steps[2]++;
					} else if (key == 2) {
						// s2++;
						if (!steps[3]) {
							steps[3] = 0;
						}
						steps[3]++;
					} else if (key == 3) {
						// s3++;
						if (!steps[4]) {
							steps[4] = 0;
						}
						steps[4]++;
					} else if (key == 4) {
						// s4++;
						if (!steps[5]) {
							steps[5] = 0;
						}
						steps[5]++;
					} else if (key == 5) {
						// s5++;
						if (!steps[6]) {
							steps[6] = 0;
						}
						steps[6]++;
					} else if (key == 6) {
						// s6++;
						if (!steps[7]) {
							steps[7] = 0;
						}
						steps[7]++;
					} else if (key == 7) {
						// s7++;
						if (!steps[8]) {
							steps[8] = 0;
						}
						steps[8]++;
					} else if (key == 8) {
						// s8++;
						if (!steps[9]) {
							steps[9] = 0;
						}
						steps[9]++;
					} else if (key == 9) {
						// s9++;
						if (!steps[10]) {
							steps[10] = 0;
						}
						steps[10]++;
					} else if (key == 0) {
						// s0++;
						if (!steps[1]) {
							steps[1] = 0;
						}
						steps[1]++;
					}
				};
			}
			// var stepTxt = "\n通过新手引导第1步玩家人数 : " + s0 +
			// 			"\n通过新手引导第2步玩家人数 : " + s1 +
			// 			"\n通过新手引导第3步玩家人数 : " + s2 +
			// 			"\n通过新手引导第4步玩家人数 : " + s3 +
			// 			"\n通过新手引导第5步玩家人数 : " + s4 +
			// 			"\n通过新手引导第6步玩家人数 : " + s5 +
			// 			"\n通过新手引导第7步玩家人数 : " + s6 +
			// 			"\n通过新手引导第8步玩家人数 : " + s7 +
			// 			"\n通过新手引导第9步玩家人数 : " + s8 +
			// 			"\n通过新手引导第10步玩家人数 : " + s9;
			// console.log("新手引导情况：" + stepTxt);
			// fs.appendFileSync(fileName, stepTxt + "\n", "utf-8");
			
			var des = "新手引导步数,完成人数,统计总人数," + list.length + "\n";
			for(var s in steps) {
				des += (s + "," + steps[s] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();





