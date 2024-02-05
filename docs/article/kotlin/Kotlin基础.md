---
title: "Kotlin 基础"
shortTitle: "Kotlin 基础"
description: "Kotlin 基础"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-10-08
category: 
- "kotlin"
tag:
- "kotlin"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Kotlin 基础"
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
  title: "Kotlin 基础"
  description: "Kotlin 基础"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Kotlin 基础

[[toc]]



## 基础类型

> Java 基本类型在 Kotlin 中都是类，编译后会重新转换成基本类型
>
> 类型判断（使用 is 关键字），类型转换（使用 as 关键字），智能类型推断

数据类型分为不同的组：

- 数字：
  - 整型：`Byte`、`Short`、`Int`、`Long`
  - 浮点：`Float` 、`Double`
- 字符：`Char`
- 字符串：`String`
- 布尔值：`Boolean`





## 运算符

| 语法糖表达式                   | 实际调用函数     |
| ------------------------------ | ---------------- |
| `a + b`                        | `a.plus(b)`      |
| `a - b`                        | `a.minus(b)`     |
| `a * b`                        | `a.times(b)`     |
| `a / b`                        | `a.div(b)`       |
| `a % b`                        | `a.rem(b)`       |
| `a++`                          | `a.inc()`        |
| `a--`                          | `a.dec()`        |
| `+a`                           | `a.unaryPlus()`  |
| `-a`                           | `a.unaryMinus()` |
| `!a`                           | `a.not()`        |
| `a == b`                       | `a.equals(b)`    |
| `a > b、a < b、a >= b、a <= b` | `a.compareTo(b)` |
| `a..b`                         | `a.rangeTo(b)`   |
| `a[b]`                         | `a.get(b)`       |
| `a[b] = c`                     | `a.set(b, c)`    |
| `a in b`                       | `b.contains(a)`  |





## 数组

空数组：

```kotlin
val empty = emptyArray<Int>()
```

创建数组：`xxxarrayOf`：

```kotlin
val arr = arrayOf(1, 2, 3)
val intArr: IntArray = intArrayOf(1,2,3)
val longArr: LongArray = longArrayOf(1L,2L,3L)
val floatArr: FloatArray = floatArrayOf(1.0f,2.0f,3.0f)
val doubleArr: DoubleArray = doubleArrayOf(1.0,2.02,3.03333)
val booleanArr: BooleanArray = booleanArrayOf(false,true,false)
```

指定长度：

```kotlin
val fixedSizeArr = arrayOfNulls<Int>(6) 
```

遍历：

```kotlin
val intArr = intArrayOf(1,2,3)
    for(item in intArr){
        //遍历intArr里面的元素，item就是元素本身
        println(item)
    }
for (index in intArr.indices){
    //遍历initArr索引的元素，从0开始
    println(intArr[index])
    //可以通过get(索引)来获取元素
    println(intArr.get(index))
}
```

修改数组（语法糖）：

```kotlin
val intArr = intArrayOf(1,2,3)
for (index in intArr.indices){
    intArr[index] = 0
    intArr.set(index,1)
}
```

多维数组：

```kotlin
// 三维数组
val arrA = Array<Array<IntArray>>(3){Array<IntArray>(3){IntArray(3)}}

// 或者
val arrB = Array(3){Array(3){IntArray(3)}}
for (one in arrB)
    for (two in one)
        for (three in two)
       		println(three)
```



## 集合

:::info 相关文章

[Kotlin常用Collection集合操作整理](https://juejin.cn/post/7071068409793871885)

:::

> MutableXXX 才是可变的集合

List 默认实现是 ArrayList：

```kotlin
// 不可变
val numList = listOf("one", "two", "three")
// 可变
val mutableNumList = mutableListOf("one", "two", "three")
```

Set 内部使用 Map 实现：

```kotlin
val numSet = setOf("one", "two", "three")
val mutableNumSet = mutableSetOf("one", "two", "three")
```

Map：

```kotlin
val numMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3)
val mutableNumMap = mutableMapOf("key1" to 1, "key2" to 2, "key3" to 3)
```

Sequence：

```kotlin
val sequenceNum = sequenceOf("one", "two", "three", "four")

```





## 遍历

> 3种方式：for、for-in、forEach

集合：

1. 分为固定集合和动态集合（其中又分为两类 list 和 set）
2. 运算符重载，可以使用 `+/-` 操作元素

数组：

2. 每个基本数据类型都有对应的数组

3. 对象数组使用 `Array<Object>`

映射：

1. key to value、Pair
2. 运算符重载，可以使用 `map[key]` 取值 





## 函数

知识点：

- 函数定义
- 函数作为参数、返回值
- inline、crossinline 关键字
- lambda 定义以及调用（三种方式）
- 函数引用
- 内置函数：apply（返回本身）、run、let、also、takeIf、takeUnless、with
- 泛型函数
- 默认参数



## 内置扩展函数

`apply: info.apply`：

- `apply`函数返回类型，永远都是`info`本身 此条和`also`一模一样
- `apply`函数的 匿名函数里面持有的是`this == info`本身 此条和`run`一模一样

`let: 集合.let`：

- `let`函数返回类型，是根据匿名函数最后一行的变化而变化此条和`run`一模一样
- `let`函数的 匿名函数里面持有的是`it == 集合本身`此条和`also`一模一样

`run: str.run`：

- `run`函数返回类型，是根据匿名函数最后一行的变化而变化，此条和`let`一模一样
- `run`函数的 匿名函数里面持有的是`this == str`本身，此条和`apply`一模一样

`with: with(str)`：（with和run基本上一样，只不过就是使用的时候不同）

- `with`函数返回类型，是根据匿名函数最后一行的变化而变化，此条和`let`一模一样
- `with`函数的 匿名函数里面持有的是`this == str`本身此条和`apply`一模一样

`also: str.also`：

- `also`函数返回类型，永远都是`str`本身，此条和`apply`一模一样
- `also`函数的 匿名函数里面持有的是`it == str`，此条和`let`一模一样



## 类

知识点：

1. 创建不需要 new 关键字
2. Any 超类相当于 Object
3. 需要注意变量和代码块的顺序
4. get 和 set 隐式代码和 field 关键字
5. 计算属性、防范竞态条件（?.also）
6. 主构造函数（参数是临时的输入类型，必须接收成变量才能使用）、次构造函数（constructor 关键字，必须调用主构造）
7. 初始化代码块（init 关键字，属于主构造函数的代码块），执行任何构造函数都会执行初始化代码块
8. 延迟初始化（lateinit 关键字）、惰性自加载（by lazy）
9. 所有类和函数都是默认 final 的，open 移除 final 关键字
10. override 关键字用于重写方法
11. object 关键字创建单例实例，匿名对象表达式
12. 伴生对象（使用关键字 companion，与 static 功能类似）
13. 内部类与外部类可以互相访问（但是要使用 inner 关键字）
14. 数据类（使用 data 关键字修饰类）
15. copy 时只会调用主构造，次构造的数据会丢失
16. `operator fun component1()`，普通类声明解构函数（数据类默认会生成结构函数）
17. 内部类、抽象类、枚举类、密封类、泛型类（函数，约束、in逆变、out协变）
18. 修饰符：abstract、open、sealed、inner、inline



## 接口

> TODO

实现类需要重写方法和成员变量



## 其他

1. 空合并操作符 
2. if-else 是表达式，不是语句（Java 中是语句）
3. range in 表达式
4. util
5. Unit、Nothing、TODO
6. it、field
7. 运算符重载
8. 判空（?）、断言（!!）
9. 权限修饰符：public、private、protected、default、open
10. 动态参数（使用关键字 vararg）
11. 继承与实现都使用 `:`
12. 关键字 reified 对泛型进行判断、关键字 infix 中缀表达式
13. 扩展函数、超类扩展、泛型扩展、属性扩展、可空类型扩展、扩展文件
14. 重命名
15. DSL
16. 类似 Java 中的 Stream
17. Java 与 Kotlin 互操作，可空性
18. 委托 by
19. 注解：@JvmName、@JvmField、@JvmOverloads、@JvmStatic

