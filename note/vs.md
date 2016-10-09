

## 

* Visual Studio
* VC(Visual C++)
* C++




node-canvas模块安装

安装python环境
node.js环境
npm环境：安装node-gyp


下载cairo图形处理库的GTK+包(gtk+-bundle)
GTK包解压后放到C:\GTK\目标下(目标名最好为GTK)
配置windows环境变量PATH: C:\GTK\bin,以供canvas运行时调用cairo的动态链接库存

npm安装canvas：npm install canvas（安装过程会编译cairo图形库与v8的c++代码，所以须要支持vs2013以上版本）

安装完成后测试：
cmd下进入canvas\build\Release目录运行node测试canvas是否安装成功
var canvas = require('./canvas');


Electron桌面应用程序开发环境(node.js与原生javascript)

node.js runtime
javascript runtime

github地址：https://github.com/atom/electron
文档地址：https://github.com/atom/electron/tree/master/docs-translations/zh-CN
