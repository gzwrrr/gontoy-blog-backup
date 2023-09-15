---
「」title: "Go 简单使用"
shortTitle: "Go 简单使用"
description: "Go 简单使用"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-01-20
category: 
- "go"
- "编程"
tag:
- "go"
- "编程"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Go 简单使用"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 2
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "Go 简单使用"
  description: "Go 简单使用"
  author:
    name: gzw
    email: 1627121193@qq.com
---




# Go 简单使用

[[toc]]

## Go 的特点

- 犹如 C + Python，具有垃圾回收机制，是强类型语言，也是静态语言，编译型语言
- 天然支持并发
- 管道通信机制
- 支持返回多值

GO 中没有 `public` 或者 `private` 等关键字，作为代替的是：如果变量名、函数名、常量名的「首字母大写」，则表明可以被其他的包访问；如果「首字母小写」，则表明只能在本包中使用

注意：GO 有很强的语法规范，设计理念是一种事情有且只有一种方法完成，目的是让代码不产生太多歧义，比如 GO 中不支持「三目运算符」

【补充】

GO 语言中有跳转控制语句 `goto`，可以无条件的转移到程序中指定的行

该语句通常与条件语句配合使用，实现跳转转移，跳出循环等功能

虽然有该特性，但是 GO 官方不建议使用 goto 语句，这样可以避免程序流程的混乱

GO 的优势：

- 易上手，有丰富的标准库
- 基于 goroutines 和 channels 的简单并发编程
- 性能优越（与 Java 相比 Go 打败 Java 地方是内存使用和垃圾回收）
- 在语言层面定义了源码的格式化
- 有标准化的测试框架
- defer 延时处理
- 有垃圾回收机制（这点有些人也认为是缺点，因为有经验的工程师宁愿掌握对内存的管理；另外一点就是 Rust 也有内存管理机制，但是并没有使用 GC）

GO 的缺陷：

- 目前还没有泛型、枚举、函数式编程（2022 之后就有了）
- 忽略现代语言设计需要的进步，可能导致少即是多的情况
- 异常处理比较复杂且痛苦（Rust 中也没有真正的异常，但是通过泛型和宏规避了这一点）
- 依赖管理痛苦（2022 及之后就改善了）
- 结构体易变，需要使用到深拷贝
- 除了 map 和 slice 之外几乎没有其他的数据结构





## 生态

| 软件       | 描述                         | 链接                                                         |
| ---------- | ---------------------------- | ------------------------------------------------------------ |
| docker     | 家喻户晓的容器技术           | [github.com/moby/moby](https://github.com/moby/moby)         |
| kubernetes | 容器编排引擎，google出品     | [github.com/kubernetes/kubernetes](https://github.com/kubernetes/kubernetes) |
| etcd       | 分布式服务注册发现系统       | [github.com/etcd-io/etcd](https://github.com/etcd-io/etcd)   |
| influxdb   | 时序数据库                   | [github.com/influxdata/influxdb](https://github.com/influxdata/influxdb) |
| grafana    | 数据监控可视化看板           | [github.com/grafana/grafana](https://github.com/grafana/grafana) |
| prometheus | 开源监控系统                 | [github.com/prometheus/prometheus](https://github.com/prometheus/prometheus) |
| consul     | 分布式服务发现系统           | [github.com/hashicorp/consul](https://github.com/hashicorp/consul) |
| nsq        | 亿级消息队列                 | [github.com/nsqio/nsq](https://github.com/nsqio/nsq)         |
| TiDB       | 分布式数据库, go + rust 打造 | [github.com/pingcap/tidb](https://github.com/pingcap/tidb)   |



## 常量

```go
// 常量配合 iota 关键字
const (
	a, b = iota + 1, iota + 2 // iota = 0, a = 1, b = 2
    c, d					  // iota = 1, c = 2, d = 3
    e, f					  // iota = 2, e = 3, f = 4
)
```







## 变量

**变量三种使用细节：**

1. 指定变量类型后不赋值，则会使用默认值
2. 根据值自行判断变量的类型，此时不用指定变量的类型
3. 定义变量时可以省略 `var`，可以使用 `i := 10` 的形式定义变量并自动进行类型推导

**基本数据类型：**

- 数值型
  - 整数类型（int，int8，int16，int32，int64，uint，uint8，uint16，uint32，byte）
  - 浮点类型（float32，float64）
- 字符型（没有专门的字符型，是使用 byte 来保存单个字符类型的，保存的是字符的码值，超过后应该用更大的整型保存）
- 布尔型
- 字符串（官方将字符串归属到基本数据类型...）

**派生类型/复杂类型：**

1. 指针
2. 数组
3. 结构体
4. 管道
5. 函数（也属于一种类型）
6. 切片
7. 接口
8. map

**类型转化：**

Go 中不同类型的变量之间需要进行「显式转化」，即 Go 中数据类型不能自动转换

任意数值类型都可以相互转换，但是当超出转换到的类型的范围时，会直接做溢出处理，即不会报错，但是结果不一定是期望得到的，所以转换时需要特别小心

数值型与字符串的相互转换需要使用到两个包：`fmt` 和 `strconv`

```go
package main

import (
	"fmt"
)

var (
	g1 = 10
	g2 = "heehh"
)

func main() {
	fmt.Println("hello world")
	fmt.Println("ahahhaa")

	var i int = 10
	fmt.Println(i)

	var str = "hello"
	fmt.Println(str)

	str2 := "hello2"
	fmt.Println(str2)

	n1, n2, n3 := 10, "str", "str2"
	fmt.Println("n1", n1, "n2", n2, "n3", n3)

	var f1 float32 = 32.32
	var f2 float64 = .32
	var f3 float64 = .32e2
	fmt.Println("f1", f1, "f2", f2, "f3", f3)

	var c1 byte = 'a'
	fmt.Println("c1", c1)

	var b1 bool = false
	fmt.Println("b1", b1)

	var int1 int32 = 32
	var float1 float32 = float32(int1)
	fmt.Println("int1", int1, "float1", float1)
}
```





## 指针

值类型：基本数据类型、数组、结构体

引用类型：指针、切片、map、管道、接口

值类型与引用类型的特点：

- 值类型：变量直接存储值，内存通常在栈中分配
- 引用类型：变量存储的是一个地址，这个地址对应的空间才是真正存储的数据，内存通常在堆上分配，当没有任何变量引用这个地址时，该地址对应的数据空间就变为了一个垃圾，在 GO 中由 GC 进行回收

```go
func main() {
	var i int = 10
	fmt.Println("i", i)
	fmt.Println("i 的地址", &i)
    
	var p *int = &i
	fmt.Println("p 的地址", &p)
	fmt.Println("p 指向的地址", p)
	// 解引用
	fmt.Println("p 的值", *p)

}
```



## 函数

GO 中的函数允许「多返回值」

在 GO 中使用函数脱离不了包的管理，包的规范包括：

- 对文件打包时，包对应着一个文件夹，文件的包名通常和文件所在的文件夹名称一致，一般包名为小写字母
- 当要使用其他包函数或者变量时，需要先引入对应的包
- 引入包时，路径是从 `$GOPATH` 的 `src` 下开始寻找的
- 同一个包中（同一个文件夹中），不允许有两个重名的函数或者变量名，也就是说 GO 中没有「函数重载」的概念（会有其他方式代替）



### 函数的简单使用

```go
package utils
// 函数名大写表示可以被其他包使用
func Add(n1 float64, n2 float64) (float64, bool) {
	return n1 + n2, true
}

// 在其他包中导入上面的包
package main
import (
	"fmt"
	"study_02/demo_03/utils"
)
func main() {
	var sum, flag = utils.Add(1.1, 2.2)
	fmt.Println("sum", sum, flag)
}
```

注意：GO 中函数也是一种数据类型，所以可以直接作为形参进行传递与调用

```go
package main

import "fmt"

func myFunc(myGetSum func(float64, float64) float64, num1 float64, num2 float64) float64 {
	return myGetSum(num1, num2)
}

func main() {
	fmt.Println("sum", myFunc(getSum, 2.2, 3.3))
}
```

为了简化数据类型定义，GO 支持自定义类型，并且函数支持为「函数返回值」命名

```go
package main

import "fmt"

type myGetSumType func(float64, float64) float64
func myFunc(myGetSum  myGetSumType, num1 float64, num2 float64) (sum float64) {
	sum = myGetSum(num1, num2)	
	return 
}

func main() {
	fmt.Println("sum", myFunc(getSum, 2.2, 3.3))
}
```

函数形参还可以使用可变参数，这个可变参数本质是切片（可变参数一定是形参列表中的最后一个）

```go
package main

import "fmt"

type myGetSumType func(float64, float64) float64
func myFunc(myGetSum  myGetSumType, args ...float64) (sum float64) {
	sum = myGetSum(args[0], args[1])	
	return 
}

func main() {
	fmt.Println("sum", myFunc(getSum, 2.2, 3.3))
}
```



### init 函数

每个源文件中都可以包含一个 init 函数，该函数会在 main 函数执行前被 GO 调用

如果还有全局变量的定义，那么初始化的顺序为：全局变量定义 -> init 函数 -> main 函数

如果是一个文件引入一个包，而这个包中有变量定义和 init 函数，且引入该包的文件也有变量定义和 init 函数，那么初始化的顺序为：被引用的包的全局变量定义 -> 被引用的包的 init 函数 -> 本文件的全局变量定义 -> 本文件的 init 函数

```go
func init() {
	fmt.Println("init....")
}
```



### 匿名函数

两种使用场景：

- 定义匿名函数时就直接调用，这种函数只能调用一次
- 将匿名函数赋值给一个变量，再通过该变量来调用匿名函数

```go
package main

import "fmt"

func main() {
	// 定义函数时就直接使用
	sum1 := func (n1 int, n2 int) int {
		return n1 + n2
	}(10, 20)
	fmt.Println("sum1", sum1)

	// 使用变量接收匿名函数
	getSum := func (n1 int, n2 int) int {
		return n1 + n2
	}
	fmt.Println("sum2", getSum(20, 20))
}
```



### 闭包

```go
package main

import "fmt"

func AddUpper() func(int) int {
	var n int = 10
	return func(x int) int {
		n = n + x
		return n
	}
}

func main() {
	f := AddUpper()
	fmt.Println("n", f(1)) // 11
	fmt.Println("n", f(1)) // 12
	fmt.Println("add", AddUpper()(1)) // 11
	fmt.Println("add", AddUpper()(1)) // 11
}
```



### defer

在函数执行中，经常需要创建资源（数据库连接、文件句柄等），为了能够在函数执行完后即使释放资源，提供了延时机制（defer）

defer 将语句放入栈时，会把相关的值同时拷贝到并入栈 

```go
package main

import "fmt"

func f() {
	// 当执行到 defer 时，暂时不会执行，会压入到一个独立的栈中
	// 当函数执行完毕后，defer 标识的操作会以先入后出的顺序执行
	defer fmt.Println("结束操作 2")
	defer fmt.Println("关闭资源 1")
	fmt.Println("执行操作...")
}

func main() {
	f()
}
```



## 异常处理

**简单使用：**

```go
package main

import "fmt"
import "errors"

func readConf(name string) (err error) {
	if name == "config.ini" {
		return nil
	} else {
		return errors.New("读取文件错误")
	}
}

func main() {
	err := readConf("cogfig.ini")
	fmt.Println("程序继续执行...")
	
	err = readConf("config.in");
	if err != nil {
		panic(err)
	}
	fmt.Println("程序继续执行...")
}
```



## 数组

数组的简单使用

```go
package main

import "fmt"

func arr() float64 {
	var hens [6]float64
	hens[0] = 1.0
	hens[1] = 1.0
	hens[2] = 1.0
	hens[3] = 1.0
	sum := 0.0
	for i := 0; i < 6; i++ {
		sum += hens[i]	
	}
	return sum
}

func printArrInfo() {
	var arr [3]int
	fmt.Println("arr", arr)
	// 数组的首地址与第一个元素的首地址一致
	fmt.Printf("arr 的首地址: %p, 第一个元素的地址: %p\n", &arr, &arr[0])
	
	// 指定下标
	var arr1 [3]int = [3]int{0: 1, 2: 2, 1: 3}
	fmt.Println("arr1", arr1)

    // for-range 遍历
	for index, value := range arr1 {
		fmt.Println("index: ", index, "value: ", value)
	}
}
```

数组的注意事项：

1. 数组是多个「相同类型」的数据的组合，一旦声明了数组的长度，之后就不能改变
2. `var arr[]int` 是声明了一个切片而不是数组（指定大小才是数组）
3. 数组中的元素可以是任意数据类型，包括值类型和引用类型，但是不能二者混用
4. 数组创建后，如果没有赋值则有默认零值
5. 特别注意：GO 的数组属于「值类型」，再默认情况下进行的是值传递，因此会进行值拷贝，所以数组之间不会互相影响
6. 如果想要在函数中修改原本的数组，需要使用「引用传递」

```GO
// 形参必须写清除长度，不写的话就是切片类型
func editArr(arr *[3]int) {
	// 通过引用传递就可以直接修改原数组
	arr[0] = 100
}
```



## 切片

切片（动态数组）是数组的一个引用，因此切片是引用类型，在进行传递时遵守引用传递机制

切片长度可变，可以理解成可以动态变化的数组

### 简单使用

```go
package main

import "fmt"

func main() {
   // make 是一个内置函数，可以分配并初始化一个类型为：切片、map、通道的对象，第一个参数为类型，该函数返回的并非是一个指针，而是和第一个参数相同的类型
   // 对于切片，必须 make 之后才可以使用
   var numbers = make([]int,3,5)
   printSlice(numbers)
}

func printSlice(x []int){
    // cap 是切片的容量，可以动态变化
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}
```

### 切片示例

将 arr 中从下标 `startIndex` 到 `endIndex-1` 下的元素创建为一个新的切片

```go
s := arr[startIndex:endIndex] 
```

默认 `endIndex` 时将表示一直到arr的最后一个元素

```go
s := arr[startIndex:] 
```

默认 `startIndex` 时将表示从 arr 的第一个元素开始

```go
s := arr[:endIndex] 
```

通过切片 s 初始化切片 s1

```go
s1 := s[startIndex:endIndex] 
```

通过内置函数 **make()** 初始化切片**s**，**[]int** 标识为其元素类型为 int 的切片

```go
s : = make([]int,len,cap) 
```

注：string 类型底层是 byte 数组，同样可以进行切片，但是注意，字符串是不可变的，不能直接通过下标直接修改







## Map

> Map 是一种无序的键值对的集合。Map 最重要的一点是通过 key 来快速检索数据，key 类似于索引，指向数据的值

```go
package main

import "fmt"

func main() {
   var countryCapitalMap map[string]string
   /* 创建集合 */
   countryCapitalMap = make(map[string]string)
   
   /* map 插入 key-value 对，各个国家对应的首都 */
   countryCapitalMap["France"] = "Paris"
   countryCapitalMap["Italy"] = "Rome"
   countryCapitalMap["Japan"] = "Tokyo"
   countryCapitalMap["India"] = "New Delhi"
   
   /* 使用 key 输出 map 值 */
   for country := range countryCapitalMap {
      fmt.Println("Capital of",country,"is",countryCapitalMap[country])
   }
   
   /* 查看元素在集合中是否存在 */
   captial, ok := countryCapitalMap["United States"]
   /* 如果 ok 是 true, 则存在，否则不存在 */
   if(ok){
      fmt.Println("Capital of United States is", captial)  
   }else {
      fmt.Println("Capital of United States is not present") 
   }
}
```





## 结构体

> 结构体没有构造函数，通常使用工厂模式解决
>
> 结构体中还有「标签」，可以描述字段的含义

```go
type Student struct {
    Name string `学生名称` // 标签
    Age int
}

// 和属性顺序无关
var stu1 = Student {
    Name: "zhangsan",
    Age: 10,
}

// 和属性顺序有关
var stu2 = Student {"lisi", 12,}

// 指针
var stu3 *Student = &Student {"wangwu", 14,}
// 也可以写成下面的形式
var stu4 = &Student {
    Name: "zhaoliu",
    Age: 10,
}
```

```go
type student struct {
    Name string
    Age int
}

// 工厂模式，只不过是创建单个
// 下面的函数可以看成是构造函数
func Student(name string, age int) *student {
    return &student {
        Name: "zhangsan",
    	Age: 10,
    }
}
```





### 方法

> 跟指定类型进行绑定，只能由指定的类型进行调用

```go
type A struct {
    Name string
}
// 和 A 类型绑定，只能由 A 类型调用
func (a A) test() {}

func mian() {
    var a A
    // 调用方法，a 的拷贝被传入方法中
    a.test()
}
```



## 面向对象

三大特性：

1. 封装
2. 继承
3. 多态

```go
type Student struct {
    Name string
    Age int
}

// * 传递引用，不加 * 则是拷贝值
func (stu *Student) ShowInfo() {...}
func (stu *Student) ShowDetails() {...}

type Pupil struct {
    // 继承，匿名结构体
    Student
}

type Graduate struct {
    // 继承，匿名结构体
    Student
}

func main() {
    pupil := &Pupil{
        &Student {
            Name: "zhangsan",
            Age: 18,
        },
    }
    // 通用调用写法
    pupil.Student.ShowInfo()
	// 也可以写成下面的形式
    pupil.ShowInfo()
}
```







## 接口

> Go 语言提供了另外一种数据类型即接口，它把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口

```go
package main

import (
    "fmt"
)

type Phone interface {
    call()
}

type NokiaPhone struct {
}

func (nokiaPhone NokiaPhone) call() {
    fmt.Println("I am Nokia, I can call you!")
}

type IPhone struct {
}

func (iPhone IPhone) call() {
    fmt.Println("I am iPhone, I can call you!")
}

func main() {
    var phone Phone

    phone = new(NokiaPhone)
    phone.call()

    phone = new(IPhone)
    phone.call()

}
```

注意：空接口称为万能数据类型，因为空接口可以是任意类型的父类型

```go
func myFunc(arg interface{}) {
    // 断言数据类型，断言该类型是一个 string 类型
    value, ok := arg.(string)
    if (ok) {
        fmt.Println("arg is string")
    }
}
```





## 反射

:::info 说明

Go 中每一个变量都对应一个 pair，存储了变量的「类型」和「值」，例如字符串为 `pair<type: string, value: "xxx">`

:::

```go
package main

import (
	"fmt"
	"reflect"
)

func reflectsetvalue1(x interface{}){
	value:=reflect.ValueOf(x)
	if value.Kind() == reflect.String{
		value.SetString("欢迎来到W3Cschool")
	}
} 
func reflectsetvalue2(x interface{}){
	value:=reflect.ValueOf(x)
    // 反射中使用Elem()方法获取指针所指向的值
	if value.Elem().Kind() == reflect.String{
		value.Elem().SetString("欢迎来到W3Cschool")
	}
} 

func main() {
	address := "www.w3cschool.cn"
	// reflectsetvalue1(address) 
    // 反射修改值必须通过传递变量地址来修改。若函数传递的参数是值拷贝，则会发生下述错误。
    // panic: reflect: reflect.Value.SetString using unaddressable value
	reflectsetvalue2(&address)
	fmt.Println(address)
}
```









## 并发

> Go语言中的并发程序主要是通过基于CSP（communicating sequential processes）的goroutine和channel来实现，当然也支持使用传统的多线程共享内存的并发方式
>
> Go语言中使用goroutine非常简单，只需要在函数或者方法前面加上go关键字就可以创建一个goroutine，从而让该函数或者方法在新的goroutine中执行
>
> 操作系统的线程一般都有固定的栈内存（通常为2MB），而 Go 语言中的 goroutine 非常轻量级，一个 goroutine 的初始栈空间很小（一般为2KB），所以在 Go 语言中一次创建数万个 goroutine 也是可能的。并且 goroutine 的栈不是固定的，可以根据需要动态地增大或缩小， Go 的 runtime 会自动为 goroutine 分配合适的栈空间。

![go的gpm](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//go/20230730/go%E7%9A%84gpm.png)

在经过数个版本迭代之后，目前Go语言的调度器采用的是GPM调度模型

- G: 表示goroutine，存储了goroutine的执行stack信息、goroutine状态以及goroutine的任务函数等；另外G对象是可以重用的。
- P: 表示逻辑processor，P的数量决定了系统内最大可并行的G的数量（前提：系统的物理cpu核数>=P的数量）；P的最大作用还是其拥有的各种G对象队列、链表、一些cache和状态。
- M: M代表着真正的执行计算资源。在绑定有效的p后，进入schedule循环；而schedule循环的机制大致是从各种队列、p的本地队列中获取G，切换到G的执行栈上并执行G的函数，调用goexit做清理工作并回到m，如此反复。M并不保留G状态，这是G可以跨M调度的基础。

```go
package main

import (
	"fmt"
	"sync"
)

var wg sync.WaitGroup

func hello(i int) {
	fmt.Printf("hello,欢迎来到编程狮%v\n", i)
	defer wg.Done()//goroutine结束计数器-1
}

func main() {
	for i := 0; i < 10; i++ {
		go hello(i)
		wg.Add(1)//启动一个goroutine计数器+1
	}
	wg.Wait()//等待所有的goroutine执行结束
}
```

GPM 的机制：

1. work stealing：可以偷取其他 P 中的 G

3. hand off：阻塞时分离 P 到其他的 M 中

调度器的设计策略：

1. 复用线程
2. 利用并行
3. 抢占
4. 全局队列（配合 work stealing）

 



### Channel

Channel 基本使用

```go
func NoBufferChannel() {
   c := make(chan int)
   go func() {
      defer fmt.Println("go finish")
      fmt.Println("go running...")

      // 同步阻塞发送数据
      c <- 1
   }()

   // 接收之后才能继续运行
   num := <- c

   fmt.Printf("num = %v", num)
}

func BufferChannel()  {
   // 带有缓存的 channel
   bc := make(chan int, 3)

   fmt.Printf("len = %v\n", len(bc))

   go func() {
      defer fmt.Println("go finish")
      for i := 0; i < 3; i++ {
         bc <- i
         fmt.Println("len = ", len(bc), "cap = ", cap(bc))
      }
   }()

   time.Sleep(1 * time.Second)

   for i := 0; i < 3; i++ {
      num := <- bc
      fmt.Println("num = ", num)
   }

   fmt.Println("func finish")
}

func CloseChannel()  {
   c := make(chan int)
   go func() {
      for i := 0; i < 5; i++ {
         c <- i
      }
      // 关闭 channel
      close(c)
   }()

   for i := 0; i < 5; i++ {
      if data, ok := <- c; ok {
         fmt.Println(data)
      } else {
         // channel 关闭之后就退出循环
         // 如果向一个已经关闭的 channel 写入数据则会抛异常
         break
      }
   }

   fmt.Println("main finish")
}
```

Channel 配合 range

```go
func ChannelWithRange()  {
   c := make(chan int)
   go func() {
      for i := 0; i < 5; i++ {
         c <- i
      }
      // 关闭 channel
      close(c)
   }()

   for data := range c {
      fmt.Println(data)
   }

   fmt.Println("main finish")
}
```

Channel 配合 select

```go
func ChannelWithSelect()  {
	c := make(chan int)
	quit := make(chan int)

	go func() {
		x, y := 1, 1
		for {
			select {
			case c <- x:
				x = y
				y = x + y
			case <- quit:
				fmt.Println("finish")
				return
			}

		}
	}()

	for i := 0; i < 6; i++ {
		fmt.Println(<-c)
	}
	quit <- 0

}
```







## 库

[中文文档](https://studygolang.com/pkgdoc)





## 其他

### 文章

[Go 学习路线（2022）](https://juejin.cn/post/7061980386640789540#heading-19)

[Go 语言设计与实现](https://draveness.me/golang)



### 注意点

1. 函数小写包私有，大写共有
2. go 有垃圾收集器
3. 自定义类型用 type 开头，函数也可以用 type 创建别名



### 项目管理

1. go path：无版本控制，无法同步第三方版本号，无法指定当前项目使用的第三方版本号
2. go mod：相比 go path 进行一定的改进

**go mod 命令：**

| 命令            | 说明                             |
| --------------- | -------------------------------- |
| go mod init     | 生成 go.mod 文件                 |
| go mod download | 下载 go.mod 文件中指定的所有依赖 |
| go mod tidy     | 整理现在所有依赖                 |
| go mod graph    | 查看现有的依赖结构               |
| go mod edit     | 编辑 go.mod 文件                 |
| go mod vendor   | 导出项目所有的依赖到 vendor 目录 |
| go mod verify   | 校验一个模块是否被篡改过         |
| go mod why      | 查看为什么需要依赖某模块         |

**查看环境变量：**

1. 只有当 GO111MODULE=on 时 go mod 才会生效
2. GOPROXY 代理，国内镜像常用：
   1. 阿里云：https://mirrors.aliyun.com/goproxy/,direct
   2. 七牛云：https://goproxy.cn,direct

```shell
# go env
set GO111MODULE=off
set GOARCH=amd64
set GOBIN=
set GOCACHE=C:\Users\gzw\AppData\Local\go-build
set GOENV=C:\Users\gzw\AppData\Roaming\go\env
set GOEXE=.exe
set GOEXPERIMENT=
set GOFLAGS=
set GOHOSTARCH=amd64
set GOHOSTOS=windows
set GOINSECURE=
set GOMODCACHE=C:\MyDisk\A-Code\Go\Study\pkg\mod
set GONOPROXY=
set GONOSUMDB=
set GOOS=windows
set GOPATH=C:\MyDisk\A-Code\Go\Study
set GOPRIVATE=
set GOPROXY=https://goproxy.io,direct
set GOROOT=C:\MyDisk\A-Config\Golang\1.17.7
set GOSUMDB=sum.golang.org
set GOTMPDIR=
set GOTOOLDIR=xxx
set GOVCS=
set GOVERSION=go1.17.7
set GCCGO=gccgo
set AR=ar
set CC=gcc
set CXX=g++
set CGO_ENABLED=1
set GOMOD=
set CGO_CFLAGS=-g -O2
set CGO_CPPFLAGS=
set CGO_CXXFLAGS=-g -O2
set CGO_FFLAGS=-g -O2
set CGO_LDFLAGS=-g -O2
set PKG_CONFIG=pkg-config
set GOGCCFLAGS=-m64 -mthreads -fmessage-length=0 -fdebug-prefix-map=xxxx -gno-record-gcc-switches
```

