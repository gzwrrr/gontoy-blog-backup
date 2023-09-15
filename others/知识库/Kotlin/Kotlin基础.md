# Kotlin 基础



基础类型

Java 基本类型在 Kotlin 中都是类，编译后会重新转换成基本类型

类型判断（使用 is 关键字），类型转换（使用 as 关键字），智能类型推断



![image-20230914233149051](../../../../../../../../Users/gzw/AppData/Roaming/Typora/typora-user-images/image-20230914233149051.png)

函数

1. 函数定义

2. 函数作为参数、返回值

3. inline 关键字

4. lambda 定义以及调用（三种方式）
5. 函数引用
6. 内置函数：apply（返回本身）、run、let、also、takeIf、takeUnless、with
7. 泛型函数
8. 默认参数



数据结构的遍历（3种方式）：for-in、forEach

集合

1. 分为固定集合和动态集合（其中又分为两类 list 和 set）
2. 运算符重载，可以使用 `+/-` 操作元素

数组

2. 每个基本数据类型都有对应的数组

3. 对象数组使用 `Array<Object>`

映射

1. key to value、Pair
2. 运算符重载，可以使用 `map[key]` 取值 





类

1. Any 超类相当于 Object
2. 需要注意变量和代码块的顺序
3. 创建不需要 new 关键字
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



接口

1. 实现类需要重写方法和成员变量



其他

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

