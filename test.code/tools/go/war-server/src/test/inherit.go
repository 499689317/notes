package test

import (
	"fmt"
)

type TBase struct {
	a int
	A int
	B int
}

func (t *TBase) Func() {
	fmt.Println("父类")
	fmt.Println("a: ", t.a)
	fmt.Println("A: ", t.A)
	fmt.Println("B: ", t.B)
}

type TSon1 struct {
	TBase // TSon1继承TBase结构
	b     string
	C     string
	D     string
}

func (t *TSon1) Func2() bool {
	fmt.Println("子类")
	fmt.Println("b: ", t.b)
	fmt.Println("C: ", t.C)
	fmt.Println("D: ", t.D)
	return false
}
