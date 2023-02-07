---
title: "Go 简单使用"
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
2. `var arr[]int` 是声明了一个切片而不是数组
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

切片是数组的一个引用，因此切片是引用类型，在进行传递时遵守引用传递机制

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

































