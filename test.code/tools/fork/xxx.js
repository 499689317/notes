

// 主进程
// fork子进程
var child_process = require('child_process');
var workers = {};// 子进程容器


// 模拟创建大量的子进程
; (function() {

    for (var i = 0; i < 100; i++) {

        var worker = createWorker();
        workers[worker.pid] = worker;


    }
    
    setInterval(function() {
        console.log("主进程状态");
        // console.log(workers);
    }, 5000);
})();

// 创建子进程
function createWorker() {

    var worker = child_process.fork("./child.js", [], "utf-8");
    // console.log(worker);

    // 接收子进程消息事件
    worker.on("message", function(msg) {
        
        // console.log("接受" + worker.pid + "子进程消息: " + msg);


    });

    // 子进程退出事件
    worker.on("exit", function(msg) {

        console.error("子进程退出，看看原因是什么：" + msg);
        worker.removeAllListeners();
        // 重启子进程
        if (workers[worker.pid]) {
            workers[worker.pid] = null;
            delete workers[worker.pid];
        }
    });
    return worker;
};







