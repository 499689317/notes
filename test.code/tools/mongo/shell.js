
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
    var url = "mongodb://101.201.234.73:3717,101.201.239.241:3717,39.106.112.199:3717/log?replicaSet=zhiyule";
    console.log(url);
    return url;
};
function getDbOpt() {
    return {
        "poolSize": 10,
        "connectTimeoutMS": 30000,
        "socketTimeoutMS": 500,
        "w": 1,
        "wtimeout": 500,
        "j": true
    };
};
// 连接数据库
DB.init = function(cb) {
    
    if (!DB.db) {
        var mongoClient = mongodb.MongoClient;
        mongoClient.connect(getDbUrl(), getDbOpt(), function(err, db) {
            if (err) {
                console.log("数据库连接失败", err);
            } else {
                console.log("数据库连接成功");
                // 初始化数据
                DB.db = db;
                DB.db.on('error', function(error) {
                    console.log("数据库发送错误", error);
                });

                DB.db.on('close', function() {
                    console.log("数据库链接断开。");
                });

                DB.db.on('reconnect', function() {
                    console.log("数据库重连成功。");
                });
                cb && cb();
            }
        });
    }
    // return function(next) {
    //     if (!DB.db) {
    //         var mongoClient = mongodb.MongoClient;
    //         mongoClient.connect(getDbUrl(), getOpt(), function(err, db) {
    //             console.log("连接数据库成功");
    //             next(null, err || db);
    //         });
    //     }
    // }
};
function find(coll, params, cb) {

    if (!coll || !params) {
        cb && cb(new Error() );
        return;
    }
    var where = params[0];
    var filter = params[1] || {};
    var collection = DB.db.collection(coll);
    collection.find(where, filter).toArray(function(err, result) {

        if (err) {
            cb && cb(err);
            return;
        }
        cb && cb(err, result);
    });
};
function findOne(coll, params, cb) {

    if (!coll || !params) {
        cb && cb(new Error() );
        return;
    }
    
    var where = params[0];
    var filter = params[1] || {};
    var collection = DB.db.collection(coll);
    collection.findOne(where, filter, function(err, result) {

        if (err) {
            cb && cb(err);
            return;
        }
        cb && cb(err, result);
    });
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
    this["2017-12"] = yield DB.connectCollection("2017-12");
};

//========================
//========================
//========================
//======     对外接口
//========================
//========================
//========================


exports.test = function() {

    DB.init(function() {

        // 连接成功后。。。
        var st = Date.now();
        console.log(st);
        find("2017-12", [{logId: "online-6"},{_id: 0}], function(err, ret) {

            var et = Date.now();
            console.log(et);
            console.log("find耗时xxxx：", et - st);
            // console.log(ret);
        });

        var st2 = Date.now();
        console.log(st2);
        findOne("2017-12", [{logId: "online-6"},{_id: 0}], function(err, ret) {


            var et2 = Date.now();
            console.log(et2);
            console.log("findOne耗时xxxx：", et2 - st2);
            // console.log(ret);
        });
    });
};


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




