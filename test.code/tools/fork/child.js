

// 子进程
var interval = null;
var timeout = null;
; (function() {

    init();
    interval = setInterval(function() {

        sendMsg(process.pid + "子进程消息来了");
        
    }, 1000);

    var ttl = getTtlTime();
    // console.log(ttl);
    timeout = setTimeout(function() {
        destroy();
    }, ttl);
})();

function init() {

    // 与父进程通信事件
    process.on("message", function(msg) {
        
    });
};
function getTtlTime() {
    return Math.floor(Math.random() * 20) + 1000;
};
function destroy() {
    console.log("退出子进程：" + process.pid);
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    process.exit(0);
};

// 发送消息给父进程
function sendMsg(msg) {
    if (msg === undefined) {
        console.log("msg为空");
        return;
    }
    process.send(msg);
};



