// =====================
// =====================
// =====================
// ====   go语言学习笔记
// =====================
// =====================
// =====================

/**
 * 1. 标识符
 * 2. 变量/常量
 * 3. 数据类型
 * 4. 操作符
 * 5. 语句(循环/条件)
 * 6. 函数
 * 7. 作用域(函数作用域，)
 */
// 第一行代码 package main 定义了包名。
// 你必须在源文件中非注释的第一行指明这个文件属于哪个包，如：package main。package main表示一个可独立执行的程序，每个 Go 应用程序都包含一个名为 main 的包。
// 下一行 import "fmt"
// 告诉 Go 编译器这个程序需要使用 fmt 包（的函数，或其他元素），fmt 包实现了格式化 IO（输入/输出）的函数。
// 下一行 func main() 是程序开始执行的函数。
// main 函数是每一个可执行程序所必须包含的，一般来说都是在启动后第一个执行的函数（如果有 init() 函数则会先执行该函数）。
// 下一行 /*...*/ 是注释
// 在程序执行时将被忽略。单行注释是最常见的注释形式，你可以在任何地方使用以 // 开头的单行注释。
// 多行注释也叫块注释，均已以 /* 开头，并以 */ 结尾，且不可以嵌套使用，多行注释一般用于包的文档描述或注释成块的代码片段。
// 下一行 fmt.Println(...) 可以将字符串输出到控制台，并在最后自动增加换行字符 \n。
// 使用 fmt.Print("hello, world\n") 可以得到相同的结果。 Print 和 Println 这两个函数也支持使用变量
// 如：fmt.Println(arr)。如果没有特别指定，它们会以默认的打印格式将变量 arr 输出到控制台。
// 当标识符（包括常量、变量、类型、函数名、结构字段等等）以一个大写字母开头，
// 如：Group1，那么使用这种形式的标识符的对象就可以被外部包的代码所使用（客户端程序需要先导入这个包），
// 这被称为导出（像面向对象语言中的 public）；标识符如果以小写字母开头，则对包外是不可见的，
// 但是他们在整个包的内部是可见并且可用的（像面向对象语言中的 protected ）。

package main

import (
	"fmt"
	"log"
	"net"
)

// var i int = 6
// var n float
var m float32 = 2
var k float64 = 2
var ok bool

var str string = "Hello"
var str2 string = "World"

// var a, b, c int

var (
	global_a int
	global_b float32
	global_c float64
)

const STATIC_A int = 1
const STATIC_B string = "hello world"
const STATIC_C float32 = 3.14
const STATIC_D = 0

const (
	STATIC_E = iota
	STATIC_F = iota
	STATIC_G = iota
)

func main() {
	fmt.Println("Hello, World!")
	// var i int
	// fmt.Println(i)
	// fmt.Println(n)
	// fmt.Println(m, k, ok)
	// fmt.Println(str + str2)
	// a, b, c = 2, 2, 2
	// var a, b, c = 3, 4, 5
	// a, b, c := 6, 7, 8
	// fmt.Println(a, b, c)
	// fmt.Println(global_a, global_b, global_c)
	// fmt.Print(STATIC_A, STATIC_B, STATIC_C, STATIC_D)
	// fmt.Println(STATIC_E, STATIC_F, STATIC_G)

	var url string = "127.0.0.1:8000"
	listener, err := net.Listen("tcp", url)
	defer listener.Close()
	if err != nil {
		log.Fatal("listener初始化错误")
		return
	}

	for {

		conn, err := listener.Accept()
		if err != nil {
			log.Fatal("conn初始化错误")
			continue
		}
		log.Fatal("连接成功", conn.RemoteAddr().String())

	}
}
