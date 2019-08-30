
global.co = require("co");
var mongodb = require("mongodb");

// 捕获异常，输出
process.on('uncaughtException', function (err) {
    console.log(err.stack);
    process.exit();
});
global.isError = function (err) {
    return err instanceof Error;
};

//=========================
//=========================
//=========================
//========    数据库类
//=========================
//=========================
//=========================

var DB = {
    db: null
};
function getDbUrl() {
    var url = "mongodb://192.168.1.114:27017/game-20171214";
    console.log(url);
    return url;
};
// 连接数据库
DB.init = function() {
    
    // 返回thunk函数
    return function(next) {
        if (!DB.db) {
            var mongoClient = mongodb.MongoClient;
            mongoClient.connect(getDbUrl(), function(err, db) {
                console.log("连接数据库成功");
                next(null, err || db);
            });
        }
    }
};
// 连接到操作的集合
DB.connectCollection = function(col_name) {

    var self = this;
    return function(next) {

        self.db.collection(col_name, function(err, col) {

            if (col) {

                // 封装各种方法
                col.$update = function (a,b,c,d,e) {
                    return function (next) {
                        col.update(a,b,c,function (err, ret) {
                            next(null, err || ret)
                        })
                    }
                }
                col.$findOneAndUpdate = function (a,b,c,d,e) {
                    return function (next) {
                        col.findOneAndUpdate(a,b,c,function (err, ret) {
                            next(null, err || ret)
                        })
                    }
                }
                col.$findOne = function (a,b,c,d,e) {
                    return function (next) {
                        col.findOne(a,b,function (err, ret) {
                            next(null, err || ret)
                        })
                    }
                }
                col.$findAll = function (a,b,c,d,e) {
                    return function (next) {
                        col.find(a,b).toArray(function (err, ret) {
                            next(null, err || ret)
                        })
                    }
                }
                col.$remove = function (a,b,c,d,e) {
                    return function (next) {
                        col.deleteMany(a,b,function (err, ret) {
                            next(null, err || ret)
                        })
                    }
                }
            }
            next(null, err || col);
        });
    }
};

//========================
//========================
//========================
//======     集合管理
//========================
//========================
//========================

global.colls = {};
colls.init = function* () {

    // log数据库数据
    // this["all_player_login"] = yield DB.connectCollection("all_player_login");
    // this["battle_offline_log"] = yield DB.connectCollection("battle_offline_log");
    // this["clear_log"] = yield DB.connectCollection("clear_log");
    // this["click_item_log"] = yield DB.connectCollection("click_item_log");
    // this["click_level_log"] = yield DB.connectCollection("click_level_log");
    // this["cost_chip_log"] = yield DB.connectCollection("cost_chip_log");
    // this["end_daypve_log"] = yield DB.connectCollection("end_daypve_log");
    // this["end_game_log"] = yield DB.connectCollection("end_game_log");
    // this["enter_daypve_log"] = yield DB.connectCollection("enter_daypve_log");
    // this["enter_game_log"] = yield DB.connectCollection("enter_game_log");
    // this["first_back_level_log"] = yield DB.connectCollection("first_back_level_log");
    // this["first_enter_battle_log"] = yield DB.connectCollection("first_enter_battle_log");
    // this["first_enter_layer_log"] = yield DB.connectCollection("first_enter_layer_log");
    // this["game_perf_log"] = yield DB.connectCollection("game_perf_log");
    // this["guide_log"] = yield DB.connectCollection("guide_log");
    // this["load_log"] = yield DB.connectCollection("load_log");
    // this["login_log"] = yield DB.connectCollection("login_log");
    // this["player_login"] = yield DB.connectCollection("player_login");
    // this["sign_log"] = yield DB.connectCollection("sign_log");
    // this["ten_level_log"] = yield DB.connectCollection("ten_level_log");
    // this["unlock_chapter_log"] = yield DB.connectCollection("unlock_chapter_log");
    // this["update_version_log"] = yield DB.connectCollection("update_version_log");
    
    // game数据库数据
    this["level"] = yield DB.connectCollection("level");
};

//========================
//========================
//========================
//======     对外接口
//========================
//========================
//========================

var tasks = [];
exports.addTask = function(nm, fn) {
    tasks.push({
        nm: nm,
        fn: fn
    });
    return this;
}
exports.start = function() {
    
    co(function* () {
        console.log("开始执行任务");

        // 连接数据库
        var db = yield DB.init();
        if (isError(db) ) {
            console.log("数据库连接失败");
            return;
        }
        DB.db = db;

        // 连接数据库集合
        yield colls.init();

        // 开始执行任务
        var startTime = Date.now();
        for (var i = 0; i < tasks.length; i++) {
            var st = Date.now();

            // 执行thunk函数
            var flag = yield tasks[i].fn();
            if (isError(flag) ) {
                // 任务执行失败
                console.log(flag);
                return;
            }
            var ct = Date.now() - st;
            console.log("任务" + tasks[i].nm + "耗时 : ", ct);
        }
        var costTime = Date.now() - startTime;
        console.log("任务总耗时 : ", costTime);
    }).then(function() {
        console.log("退出任务");
        process.exit();
    });
};




