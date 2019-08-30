
//========================
//========================
//========================
//======   定时发送奖励
//======   定时重置数据库
//========================
//========================
//========================

global.co = require("co");
var mongodb = require("mongodb");

var argv = (function () {
    var arg = {};
    var args = process.argv;
    for (var i = 0; i < args.length; i++) {
        var tmp = args[i].split("=");
        arg[tmp[0]] = tmp[1];
    };

    return arg;
})();

//========================
//========================
//========================
//======     全局函数
//========================
//========================
//========================

// 捕获异常，输出。
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
    console.log(process.env.NODE_ENV);
    var url = "";
    if (process.env.NODE_ENV == "production") {
        url = "mongodb://zhiyule:Fenliemofang2018@dds-2zec1e43dc2f61c41.mongodb.rds.aliyuncs.com:3717,dds-2zec1e43dc2f61c42.mongodb.rds.aliyuncs.com:3717/game?replicaSet=mgset-4843727";
    } else if (process.env.NODE_ENV == "dev_test") {
        url = "mongodb://39.106.101.80:27017/game";
    } else {
        url = "mongodb://192.168.1.114:27017/game";
    }
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
                next(null, err || db);// next第一个参数必须为null？
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

    // 将需要操作的集合加入进来
    this["pve"] = yield DB.connectCollection("pve");
    this["user_sign"] = yield DB.connectCollection("user_sign");
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




