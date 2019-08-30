
// ============================
// ============================
// ============================
// =======   转化json格式文件
// ============================
// ============================
// ============================

/**
 * 读取文件夹下所有json文件
 * 将所有文件的内容读取出来
 * 将内容输出到新json文件中
 */
var fs = require("fs");
var path = require("path");
var exec = require('child_process').exec;// 引入目的是为了执行系统cmd命令
function sortFiles(list) {
    list.sort(function (a, b) {
        var s1 = getNum(a);
        var s2 = getNum(b);
        if (s1 < s2) {
            return -1;
        }else if (s1 > s2) {
            return 1;
        }else{
            return 0;
        }
    });
}
function getNum (str) {
    str = str.split(".");
    str = str[str.length - 2];
    if (!str) {throw new Error('文件名不对')};
    var arr = [];
    for (var i = str.length - 1; i >= 0; i--) {
        if (isNaN(parseInt(str[i]))) {
            break;
        }else{
            arr.unshift(str[i]);
        }
    };
    return parseInt(arr.join(""),10);
}
function getCurPath() {
    return "./xxx/";
}
function getDirList(path) {

    var array = fs.readdirSync(path);
    for (var i = 0; i < array.length; i++) {
        
        if (array[i][0] == "." || array[i][0] == "_") {

            delFolder(path + "/" + array[i]);
            array.splice(i, 1);
            i--;
        };
    };
    return array;
}

function delFolder(path) {
    
    if (!fs.existsSync(path)) return;
    if (!fs.statSync(path).isDirectory()) {
        fs.unlinkSync(path);
        return;
    };
    var dir = fs.readdirSync(path);
    dir.forEach(function(file, index) {
        var cp = path + "/" + file;
        if (fs.statSync(cp).isDirectory()) {
            delFolder(cp);
        } else {
            fs.unlinkSync(cp);
        }
    });
    fs.rmdirSync(path);
}

// var url = getCurPath();
// console.log(url);

// var dirs = getDirList(url);
// console.log(dirs);

var files = {};
var ascii_files = {};
var outpath = "./data/aaa/";// 文件输出路径
function control() {
    
	for (var i = 0; i < dirs.length; i++) {

        var file = dirs[i];
        var suffix = path.extname(path.basename(file) );// 读取文件名后缀
        var name = path.basename(file, suffix);
		files[name] = fs.readFileSync(url + dirs[i], "ascii");
	}
}
// control();
// console.log(files);

function update() {
    
    for(var key in files) {

        var str = files[key];
        var strs = str.replace("o;?", "");
        ascii_files[key] = strs;
    }
}
// update();
// console.log(ascii_files);

function pipe(tag) {

	for(var key in ascii_files) {

        var str = ascii_files[key];
		var p = outpath + key + ".json";
		console.log(p);
		fs.writeFileSync(p, str, "ascii");
	}
}
// pipe();




