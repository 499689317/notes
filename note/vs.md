

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


/**
 * C/C++编译
 */

+ 对源代码进行编译时，第一个阶段就是进行预处理。以#开头的都是预处理指令(#include/#define)，都会被预处理器处理掉
+ 代码不是直接被编译，而是先被预处理器进行修改
	1. #include    #define  预处理指令的替换
	2. 删除注释

+ #define与typedef区别

#define D int*;(简单字符替换)
typedef int* T;(类型替换)

int main() {
	
	D p1, p2;
	T p3, p4;

	return 0;
}

D p1, p2语句的结果为:
int *p1;
int p2;

T p3, p4语句的结果为:
int *p3;
int *p4;

可以认为：typedef是将已存在的类型，包装成新的原子类型

C/C++头文件中一般存放如下内容:
1、类的声明
2、结构的声明
3、内敛函数的定义 和声明。内敛函数整体都放在头文件中。这样包含它的每个源文件才知道怎样展开。
4、模板
5、#define 宏 和  const 常量


+ 指针作用：
1. 通过动态申请的内存是匿名的，没有名字，只能通过指向这块内存的指针去使用
	new
    malloc();
    realloc();
    calloc();
2. 用函数交换2个变量的值

+ 对象的定义

class A {
	
};

A a;(如果在全局区的直接定义)
在内存的静态存储区上分配对象。通常会影响编译出来的程序的大小。

A a;(如果在函数中的直接定义)
则在栈上分配对象。分配和释放速度非常快，但栈空间相对有限，对于大量的对象，有可能造成栈溢出。
直接调用类的析构释放资源

A *a;
这只是定义了一个指针，没有创建对象也没有分配空间

A *a = new A();
出来的对象在堆中分配，分配释放速度较慢，但堆内存空间较大，可以充分利用内存。
需要delete a;释放资源
