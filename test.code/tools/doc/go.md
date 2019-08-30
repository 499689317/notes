

## go语言学习笔记

github代码：https://github.com/3workman?tab=repositories

+ sublime text 3安装go运行环境，在preferences/package settings/gosublime/settings-user下加入环境变量配置
{
    "env": {
        "GOPATH": "E:/dev/tools/go",
        "GOROOT": "D:/Go"
    }
}


+ go package包import引入
	包名与文件名可以不一样，但使用import引入包时必须与包名一致
	. packeage 包名

+ go的单元测试引入testing模块
+ go的tcp连接中，客户端发送EOF信号会强制断开tcp连接
+ go语言在保持连接socket连时,需要用无限循环保持客户端活跃，否则会自动调用conn.Close()方法强制断开tcp连接，这里与nodejs的事件订阅方式很不一样，需要注意

+ 消息序列化：json/protobuf
+ rpc机制：指远程过程调用
	. a,b两台服务器有两个应用进程，由于a,b不在同一个内存空间，所以a进程不能直接调用b进程中的方法，需要通过网络来表达调用的语义和传达调用的数据。
	. 为什么RPC呢？就是无法在一个进程内，甚至一个计算机内通过本地调用的方式完成的需求，比如比如不同的系统间的通讯，甚至不同的组织间的通讯。由于计算能力需要横向扩展，需要在多台机器组成的集群上部署应用
+ ipc机制：单机中运行的进程之间的相互通信
+ 序列化与反序列化：客户端把参数先转成一个字节流，传给服务端后，再把字节流转成自己能读取的格式。同理，从服务端返回的值也需要序列化反序列化的过程。




## go基础

1.基本概念和语法
golang中，如果一个名字的首字母大写，代表词名字将被导出。

golang程序由包（package）组成，程序从main包开始运行，多个源文件可以属于同一个包，但是一个目录中只放置一个包。通常而言，目录名与包名一致。package main    定义一个包main。 导入代码包形式如下：
import "fmt	
import"math/rand"
或写为如下形式：
import(
	"fmt"
	"math/rand"
)



函数：定义变量时，变量名在类型之前，这与很多语言不一致。且x int,y int可以表示为x,y int。 定义一个函数形式如下：
func add(x int,y int)int{
	return x+y
}


函数可以返回多个值：
package main
import "fmt"
func swap(x,y string)(string,string){
	return y,x
}
func main(){
	a,b:= swap("hello","world")
	fmt.Println(a,b)
}
注：返回值可以指定变量名，并且像变量一样使用。
func (p myType) funcName (a,b int, c string) (r,s int){
	return
}
func->关键字
funcName->方法名
a,b int,c string->传入参数
r,s int->返回值
{}->函数体
函数的定义可以使用var：var m int = 10
或者，var i,j,k = 1,2,3
函数内变量赋值使用:=操作符



函数也是一个类型，函数类型是go语言中一个重要的类型。
var recorder func(name string,age int,seniority int)(done bool)
//后面所有符合这个函数类型的实现都可以赋给变量recorder，如下
recorder = func(name string,age int,seniority int)(done bool){
	//相应语句
	return
}　
上述中，我们将一个函数字面上赋给了变量recorder，我们可以在一个函数类型的变量上直接应用调用表达式来调用它，如下：

done ：= recorder("Harry",32,10)




type Encipher func(planintext string)[]byte //type专门用于声明自定义类型，此处声明的
Encipher实际上就是函数类型func(planintext string)[]byte的一个别名类型。




数据类型：数据类型的转换表达式为T(v），含义将v转换为类型T。数据类型包含如下形式：
1.bool  2.string 3.int int8 int16 int32 int64
4.uint uint8 unint16 uint32 uint64
5.uintptr 6.byte(等价于uint8)
7.rune(等价于int32，用于表示一个unicode code point)
8.float32，float64 9.complex64，complex128
注：使用constant来定义常量，constant Pi= 3.14




控制语句：
for语句　golang中使用（且只使用）for来进行循序（没有while语句）
package main
func main(){
sum := 0
for i := 0;i < 10;i++{
	sum += i
}
//下述写法等价于C/C++等语言中的while语句
for sum < 1000{
	 sum + =sum
}
}
注：for循环语句不需要（）且{}是必须要使用的，if、switch语法处理与此一样。若使用无限循环，则可使用：
for{
}



2. if语句，if语句可以在执行条件判断前带一个语句（这常被叫做if带上一个短语句），词语句中变量的生命周期在if语句结束后结束，如下。
package main
import(
  "fmt"
  "math/rand"
)

func main(){
  if n := rand.Intn(6);n <= 2{
    fmt.Println("[0,2]",n)
}else{
	fmt.Println("[3,5]",n)
}

//此处开始无法使用变量n
}



3. switch语句，golang中不需要使用break语句来跳出switch，且switch中可以没有条件。
package mian
import(
  "fmt"
  "runtime"
)

func main(){
  fmt.Print("Go runs on")
  //switch类似于if可以带上一个短语句
  switch os := runtime.GOOS;os{
  case "darwin":
	fmt.Println("OS X.")
  case "linux":
	fmt.Println("Liunx.")
  default:
	//others
	fmt.Printf("%s.",os)
  }
}

//无条件使用switc语句
func main(){
  t := time.Now()
  switch{
  case t.Hour() < 12:
	fmt.Println("Good morning!")
  case t.Hour() < 17:
	fmt.Println("Good afternoon.")
  default:
	fmt.Println("Good eventing.")
  }
}



4. defer,defer语句能够将一个函数调用加入一个列表中（这个函数调用被叫做deferred函数调用），在当前函数调用结束时调用列表中的函数。如下：
func CopyFile(dstName, srcName string)(written int64,err error){
  src,err := os.Open(srcName)
  if err != nil{
	return
  }
  defer src.Close()

  dst,err := os.Create(dstName)
  if err !=nil{
    return
  }
  defer dst.close()

 return io.Copy(dst,src)
}

//注：deferred函数调用按先进后出的顺序执行：
func main(){
  //输出43210
  defer fmt.Print(i)
}



其他数据类型

1.  结构，（structs），结构是一个域的集合：
type Vertex struct{
  X int
  Y int
}

func main(){
 v := Vertex{1,2}
  v.X = 4
  fmt.Println(v)
}



2. 数组，[n]T在golang中是一个类型（像*T一样），表示一个长度为n的数组其元素类型为T，数组长度无法改变
func main(){
  var a[2]string
  a[0] = "hello"
  a[1] = "world"
  fmt.println(a[0],a[1])
  fmt.println(a)
}



3.指针，golang中的指针不支持算术运算：
p ：= Vertex{X,Y} //{x,y}为struct literal
q ：= &p //q类型为*Vertex
q.X = 2  //直接访问区域X
struct的literal由{}包裹，实际过程我们可以使用Name:这样的语法为特定域值设置值：
type Vertex struct{
  X,Y int
}

r := Vertex{X:3}  //此时Y的值为0


4.slice，slice是可变长，其是一个指针而不是一个值。[]T为slice类型，其中元素类型为T:
p := []int{2,3,4,7,11,13}
fmt.Println("p==",p)
for i := 0;i < len(p);i++{
  fmt.Printf("p[%d] == %d\n",i,p[i])
  }
}
注：表达式s[lo:hi]用于创建一个slice，新创建的slice的元素为s中的[lo，hi）位置的元素。
创建slice使用make函数，（不用new了创建）如
a := make([]int,5) //len(a)为5
此处make函数创建一个数组（元素初始化为0）且返回一个slice指向词数组。make可以带三个参数，用于指定容量：
b := make([]int,0,5) //len(b)=0，cap(b)=5
一个没有值的slice是nil，长度和容量都为0
var z[]int
fmt.Println(z,len(z),cap(z))
if z == nil{
  fmt.Println("nil!")
}


5.map，用于映射key到value（值），map可以通过make来创建，而不是new
type Vertex Struct{
  Lat,Long float64
}

var m map[string]Vertex

func main(){
  m = make(map[string]Vertex)
  m["Bell Labs"] = Vertex{
	40.23332,-31.32143,
  }
  fmt.Println(m["Bell Labs"])
}
//注：使用[]访问map中的值，使用delete删除map中的值
m[key] = elem //访问
delete(m,key) //删除
var m = map[string]Vertex{
//此处Vertex可以省略不写
  "Bell Labs":Vertex{
   34.34345,53,32123
  },
   "google Labs":Vertex{
   34.34345,53,32123
  },
}
//若需要检查map中的key是否存在
//elem ,ok = m[key] //elem表示key的值（key不存在时，elem为0），ok表示key是否存在
　

6.range，用于在for中迭代一个slice或者一个map
var s = []int{1,2,3}
func main(){
  for i,v := range s{
	fmt.Println(i,v)
  }
  //只需要值，使用_忽略索引
  for _,v := range s{
	fmt.Println(v)
  }
  //只需要索引
  for i := range s{
	fmt.Println(i)
  }
}



7.闭包，golang中函数也是一个值（就像int值一样），且函数可以是一个闭包。闭包是一个引用了外部变量的函数。
package mian
import "fmt"

func adder()func(int)int{
  sum := 0
  //返回一个闭包，此闭包引用了外部变量sum
  return func(x int)int{
    sum += x
	return sum
  }
}

func main(){
  a := adder()
  fmt.Println(a(9527))
}



2.方法与接口
方法，方法是附属于某个自定义的数据类型的函数，具体而言，一个方法就是一个与某个接收者关联的函数。因此，在方法的签名中不但包含了函数签名，还包含了一个与接收者有关的声明，也即是，方法的声明中包含关键字func、接收者声明、方法名称、参数声明列表、结果声明列表和方法体。在golang中没有类，可以为结构体定义方法，实例如下:
package main
import(
  "fmt"
  "math"
)

type Vertex struct{
  X,Y float64
}

//结构体Vertex的方法
//此处的方法接收者v的类型为 *Vertex
func（v *Vertex)Abs()float64{
	return math.Sqrt(v.X*v.X+v.Y*v.Y)
}

func main(){
  v := &Vertex{3,4}
  fmt.Println(v.Abs())
}
　　
注：此处方法的接收者使用指针类型而非值类型的原因如下：

  1.避免方法每次调用时，对接收者的不必要拷贝
  2.在方法内可以修改接收者的值
我们可以为任意类型定义方法，但以下情况除外：
  1.如果类型定义在其他包中，不能为其定义方法
  2.如果类型是基础类型，不能为其定义方法。




接口，接口也是一种类型（像结构体一样）。一个接口类型包含了一组方法，一个接口类型能够持有那些实现了这些方法的值，如下：
//定义接口Abser
type Abser interface{
  Abs() float
}

//定义结构体Vertex
type Vertex struct{
  X,Y float64
}

//实现方法Abs
func(v *Vertex)Abs()float64{
  return math.Sqrt(v.X*v.X+v.Y+v.Y)
}

func main(){
  v := Vertex{3,4}
  //成功，能够持有*Vertex类型的值
  var a Abser = &v
  //出错，不能持有Vertex类型的值
  //因为在*Vertex上定义了方法Abs，而在Vertex上未定义
  var b Abser = v
}




匿名域，结构体中可以存在只有类型而没有名字的域，它们被叫做匿名域。如：
struct{
  T1
  *T2
}
一个结构体中的匿名域中的域或者方法可以被此结构体实例直接访问：
package main
import "fmt"
type Car struct{
  wheelCount int
}

func(car *Car)numberofWheels()int{
  return car.wheelCount
}

type Ferrari struct{
  Car
}

func main(){
  f := Ferrari{Car{4}}
  fmt.Println("A Ferrari has this many wheels:",f.numberOfWheels())
}



3.并发支持
golang在运行时（runtime）管理了一种轻量级线程，被称为goroutime。创建数十万级的goroutine没有问题。使用go 关键字就开启了一个线程示例如下：
　　　　package main

	import(
	  "fmt"
	  "time"
	)

	func say(s string){
	  for i := 0;i < 5;i++{
		time.Sleep(100 * time.Millesecond)
		fmt.Println(s)
	  }
	}

	func main(){
	  //开启一个goroutine执行say函数
	  go say("world")
	  say("hello")
	}
　　4 其他

panic
panic 是用来表示非常严重的不可恢复的错误的。在Go语言中这是一个内置函数，接收一个interface{}类型的值（也就是任何值了）作为参数。panic的作用就像我们平常接触的异常。不过Go可没有try…catch，所以，panic一般会导致程序挂掉（除非recover）。所以，Go语言中的异常，那真的是异常了。你可以试试，调用panic看看，程序立马挂掉，然后Go运行时会打印出调用栈。 但是，关键的一点是，即使函数执行的时候panic了，函数不往下走了，运行时并不是立刻向上传递panic，而是到defer那，等defer的东西都跑完了，panic再向上传递。所以这时候 defer 有点类似 try-catch-finally 中的 finally。 panic就是这么简单。抛出个真正意义上的异常。

recover
上面说到，panic的函数并不会立刻返回，而是先defer，再返回。这时候（defer的时候），如果有办法将panic捕获到，并阻止panic传递，那就异常的处理机制就完善了。Go语言提供了recover内置函数，前面提到，一旦panic，逻辑就会走到defer那，那我们就在defer那等着，调用recover函数将会捕获到当前的panic（如果有的话），被捕获到的panic就不会向上传递了，于是，世界恢复了和平。你可以干你想干的事情了。不过要注意的是，recover之后，逻辑并不会恢复到panic那个点去，函数还是会在defer之后返回。

//go实现类似try catch的事情
package main
func Try(fun func(),handler func(interface{})){
	defer func(){
		if err := recover();err != nil{
			handler(err)
		}
	}()
	fun()
}

func main(){
	Try(func(){
		panic("foo")
},func(e interface{}){
	print(e)
})
}




