
// 统计章节解锁

var shell = require("./shell.js");
var fs = require("fs");

var getChapterJson = function() {

	return function(next) {

		fs.readFile("./data/StageTemplateData.json", "utf-8", function(err, data) {
			next(null, JSON.parse(data) );
		});
	};
};

shell.addTask("unlock_chapter_log", function() {

	return function(next) {

		co(function* () {

			// var fileName = "./统计章节解锁数据.txt";
			var fileName = "./统计章节解锁数据.csv";
			console.log(fileName);
			
			var list = yield colls["unlock_chapter_log"].$findAll({}, {_id: 0, rid: 0});
			// var title = "当前统计总人数为：" + list.length;
			// fs.appendFileSync(fileName, title + "\n\n", "utf-8");
			
			// 遍历各章节数据
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

			// for(var id in chapters) {
			// 	var des = "章节" + id + "解锁总次数：" + chapters[id] + "\n";
			// 	fs.appendFileSync(fileName, des + "\n", "utf-8");
			// };
			
			var des = "章节id,解锁次数,统计总人数," + list.length + "\n";
			for(var id in chapters) {
				des += (id + "," + chapters[id] + "\n");
			};
			fs.appendFileSync(fileName, des + "\n", "utf-8");
		}).then(function() {
			next(null, null);
		});
	};
}).start();








