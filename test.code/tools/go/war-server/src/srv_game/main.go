package main

import (
	"fmt"
	"reflect"
	"test"
)

func main() {
	fmt.Println("test package")
	test.TestInterf()

	// 实例化go结构体常用的两种方法
	// 方法一：指针实例化
	// t1 := &test.T1{}
	// t2 := &test.T2{}
	// 方法二：对象实例化
	t1 := test.T1{}
	// t2 := test.T2{}

	var interf test.Interf = &t1
	interf.Func1()
	interf.Func2(1, "2saf")
	fmt.Println(t1)

	// interf = &t2
	// interf.Func1()
	// interf.Func2(3, "2sfsa")

	// 取结构体属性时可以直接使用操作符.来获取属性或方法
	// 也可以通过go语言反射机制来获取
	// fmt.Println(t2.C, t2.D)

	// 反射机制
	pType := reflect.TypeOf(t1) // 获取t1实例
	fmt.Println(pType)
	pField := pType.Field(0)
	fmt.Printf("v%\n", pField.Tag)

	// 利用反射机制读属性get
	pValue := reflect.ValueOf(t1)
	fmt.Println(pValue)
	val := pValue.FieldByName("A")
	val2 := pValue.FieldByName("B")
	fmt.Println(val, val2)

	// 利用反射机制写属性set
	pValue2 := reflect.ValueOf(&t1).Elem() // 这里只能传指针进去
	fmt.Println(pValue2)
	pValue2.FieldByName("A").SetInt(1000)
	fmt.Println(pValue2.FieldByName("A"))
	pValue2.FieldByName("B").SetString("反射修改后字符串")
	fmt.Println(pValue2.FieldByName("B"))

	// 继承测试
	son1 := &test.TSon1{}
	son1.Func()
	son1.Func2()
}
