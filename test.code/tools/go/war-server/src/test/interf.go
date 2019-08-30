package test

import (
	"fmt"
)

func TestInterf() {
	fmt.Println("测试接口")
}

// 测试go接口类型
type Interf interface {
	Func1()
	Func2(a int, b string) bool
}

// 定义结构体
// go没有类，可以使用结构体模拟类
type T1 struct {
	A int    "this is tag" // 属性与方法如果首字母是小写在go语言中为私有属性，只能是本文件中使用
	B string // 如果要在非本文件中操作该属性或方法，首字母要大写
}

type T2 struct {
	C int
	D string
}

// 定义结构体对应的成员函数
// T1: Func1函数名与定义的接口内声明的方法名一致
// 目的是为了复用接口
func (t *T1) Func1() {
	fmt.Println("T1结构体成员方法Func1")
}
func (t *T1) Func2(a int, b string) bool {
	fmt.Println("T1结构体成员方法Func2")
	t.A = a
	t.B = b // go是强类型语言，类型要保证一致
	return true
}

func (t *T2) Func1() {
	fmt.Println("T2结构体成员方法Func1")
}
func (t *T2) Func2(a int, b string) bool {
	fmt.Println("T2结构体成员方法Func2")
	t.C = a
	t.D = b
	return false
}
