
/**
 * Windows系统中直接运行脚本(vb,js,.....)
 * 脚本解释器Windows Script Host(WSH)
 *
 * WScript对象(这个对象能够访问各种信息的属性和方法)
 */

// 属性
// WScript.Echo ("Hello World");
// WScript.Echo (WScript.Argument);// 一个参数集合
// WScript.Echo (WScript.Path);// 当前脚本解释器所在的目录
// WScript.Echo (WScript.ScriptFullName);// 脚本文件的完整路径
// WScript.Echo (WScript.ScriptName);// 脚本的文件名
/**
 * 方法
 * CreateObject(ID)创建一个COM对象 ID:创建对象的标识符
 * GetObject(path,ID)根据ID获取已存在的对象，或创建一个新对象 path:将对象保存到磁盘所用的完整路径
 */





/**
 * WshShell对象对象
 * Windows脚本宿主提供了一种便捷的方式，
 * 可以用于获取系统环境变量的访问、创建快捷方式、访问Windows的特殊文件夹，如Windows Desktop，
 * 以及添加或删除注册表条目。
 * 还可以使用Shell对象的功能创建更多的定制对话框以进行用户交互
 * 属性：
 * CurrentDirectory(当前活动目录)
 * Environment(一个环境变量集合)
 */

var wshShell = WScript.CreateObject("WScript.Shell");
var wshSysEnv = wshShell.Environment("SYSTEM");

WScript.Echo (wshSysEnv("PATH"));
WScript.Echo (wshSysEnv("NUMBER_OF_PROCESSORS"));






/**
 * 写入系统变量用例
 */
// function GetCurrPath ()
// { 
//     var fso = new ActiveXObject("Scripting.FileSystemObject");
//     var currFolder = fso.GetFolder(".");
//     return currFolder.path;
// }
// WScript.Echo (GetCurrPath());


//取得当前路径 
// MINGW_PATH = GetCurrPath ();

// C_INCLUDE_PATH = "%MINGW_PATH%//include;%MINGW_PATH%//lib//gcc//mingw32//3.4.5//include " ;

// CPLUS_INCLUDE_PATH = "%MINGW_PATH%//include//c++//3.4.5;%MINGW_PATH%//include//c++//3.4.5//mingw32;%MINGW_PATH%//include//c++//3.4.5//backward;%C_INCLUDE_PATH% " ;

// LIBRARY_PATH = "%MINGW_PATH%//lib;%MINGW_PATH%//lib//gcc//mingw32//3.4.5" ;

// PATH = "%MINGW_PATH%//bin;%MINGW_PATH%//libexec//gcc//mingw32//3.4.5;" ;

// var WshShell = WScript . CreateObject ("WScript.Shell" );
// var WshSysEnv =   WshShell . Environment ("SYSTEM" );
// WshSysEnv ("MINGW_PATH" ) = MINGW_PATH ;
// WshSysEnv ("C_INCLUDE_PATH" ) = C_INCLUDE_PATH ;
// WshSysEnv ("CPLUS_INCLUDE_PATH" ) = CPLUS_INCLUDE_PATH ;
// WshSysEnv ("LIBRARY_PATH" ) = LIBRARY_PATH ;
// PATH = PATH + WshSysEnv ("PATH" );
// WshSysEnv ("PATH" ) = PATH ;
// WScript . Echo ("MinGW done" );