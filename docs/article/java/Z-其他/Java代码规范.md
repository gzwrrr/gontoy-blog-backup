---
title: "Java 代码规范"
shortTitle: "Java 代码规范"
description: "Java 代码规范"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-01-08
category: 
- "java"
tag:
- "java"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Java 代码规范"
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
  title: "Java 代码规范"
  description: "Java 代码规范"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 代码规范

详情参考 GitHub 原地址：[阿里巴巴 Java 开发手册](https://github.com/alibaba/p3c)



## 1.1 命名风格

1. 代码中的命名均不能以下划线或美元符号开始或结束；
2. 代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式；
3. 类名使用 UpperCamelCase 风格；
4. 方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格，必须遵从驼峰形式；
5. 常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长；
6. 抽象类命名使用 Abstract 或 Base 开头、异常类命名使用 Exception 结尾、测试类命名以它要测试的类的名称开始，以 Test 结尾；
7. 类型与中括号紧挨相连来表示数组；
8. Entity 类中布尔类型变量都不要加 is 前缀
9. 包名统一使用小写，点分隔符之间有且仅有一个自然语义的英语单词。包名统一使用单数形式，但是类名如果有复数含义，类名可以使用复数形式； 
10. 避免在子父类的成员变量之间、或者不同代码块的局部变量之间采用完全相同的命名，使可读性降低。 



## 1.2 代码格式

1. 如果大括号内为空，则简洁地写成 {} 即可，大括号中间无需换行和空格； 
2. 左右小括号和字符之间不能出现空格，而左大括号前必须出现空格；
3. If、for、while、switch、do 等保留字与括号之间都必须加空格；
4. 注释的双斜线与注释内容之间有且仅有一个空格；
5. 在进行类型强制转换时，右括号与强制转换值之间不需要任何空格隔开；
6. 单行字符数限制不超过 120 个，超出需要换行。



## 1.3 常量定义

1. 不允许任何魔法值（即未经预先定义的常量）直接出现在代码中； 
2. 在 long 或者 Long 赋值时，数值后只能使用大写的 L，小写容易跟数字 1 混淆，造成误解。



## 1.4 OOP（面向对象）

1. 直接用类名来访问即可，避免通过一个类的对象引用访问此类的静态变量或静态方法，无谓的增加编译器解析成本； 
2. 相同参数类型，相同业务含义，才可以使用 Java 的可变参数，避免使用 Object； 
3. 外部正在调用或者二方库依赖的接口，不允许修改方法签名，避免对接口调用方产生影响。接口过时必须加@Deprecated 注解，并清晰地说明采用的新接口或者新服务是什么；
4. 不能使用过时的类或方法（除非没有替代的依赖）；
5. Object 的 equals 方法容易抛空指针异常，应使用常量或确定有值的对象来调用；
6. 所有整型包装类对象之间值的比较，全部使用 equals 方法比较； 
7. 浮点数之间的等值判断，基本数据类型不能用 == 来比较，包装数据类型不能用 equals 来判断；
8. 为了防止精度损失，禁止使用构造方法 BigDecimal(double)；
9. 关于基本数据类型与包装数据类型的使用标准如下： 
   - 所有的 Entity 类属性必须使用包装数据类型； 
   - RPC 方法的返回值和参数必须使用包装数据类；
   - 所有的局部变量使用基本数据类型。 
10. 定义 DO/DTO/VO 等 Entity 类时，不要设定任何属性默认值；
11. 序列化类新增属性时，请不要修改 serialVersionUID 字段，避免反序列失败；如果完全不兼容升级，避免反序列化混乱，那么请修改 serialVersionUID 值；
12. 构造方法里面禁止加入任何业务逻辑，如果有初始化逻辑，请放在 init 方法中； 
13. Entity 类必须写 toString 方法。



## 1.5 控制语句

1. 在一个 switch 块内，每个 case 要么通过 continue/break/return 等来终止，要么注释说明程序将继续执行到哪一个 case 为止；在一个 switch 块内，都必须包含一个 default 语句并且放在最后，即使它什么代码也没有；

2. 当 switch 括号内的变量类型为 String 并且此变量为外部参数时，必须先进行 null 判断；
3. 在 if/else/for/while/do 语句中必须使用大括号；
4. 在高并发场景中，避免使用「等于」判断作为中断或退出的条件；



## 1.6 集合

1. 关于 hashCode 和 equals 的处理，遵循如下规则：
   - 只要覆写 equals，就必须覆写 hashCode； 
   - 因为 Set 存储的是不重复的对象，依据 hashCode 和 equals 进行判断，所以Set 存储的对象必须覆写这两个方法； 
   - 如果自定义对象作为 Map 的键，那么必须覆写 hashCode  和 equals。
2. ArrayList 的 subList 结果不可强转成 ArrayList，否则会抛ClassCastException 异常，即 java.util.RandomAccessSubList cannot be cast to java.util.ArrayList； 
3. 使用 Map 的方法 keySet()/values()/entrySet() 返回集合对象时，不可以对其进行添加元素操作，否则会抛出 UnsupportedOperationException 异常；
4. Collections 类返回的对象，如：emptyList()/singletonList() 等都是 immutable list，不可对其进行添加「或者」；
5. 在 subList 场景中，高度注意对原集合元素的增加或删除，均会导致子列表的遍历、增加、删除产 ConcurrentModificationException 异常； 
6. 使用集合转数组的方法，必须使用集合的 toArray(T[] array)，传入的是类型完全一致、长度为 0 的空数组；
7. 在使用 Collection 接口任何实现类的 addAll()方法时，都要对输入的集合参数进行NPE 判断；  
8. 使用工具类 Arrays.asList() 把数组转换成集合时，不能使用其修改集合相关的方法，它的 add/remove/clear 方法会抛出 UnsupportedOperationException 异常； 
9. 泛型通配符 <? extends T> 来接收返回的数据，此写法的泛型集合不能使用 add 方 法，而 <? super T> 不能使用 get 方法，作为接口调用赋值时易出错；
10. 在无泛型限制定义的集合赋值给泛型限制的集合时，在使用集合元素时，需要进行 instanceof 判断，避免抛出 ClassCastException 异常；
11. 不要在 foreach 循环里进行元素的 remove/add 操作。remove 元素请使用 Iterator 方式，如果并发操作，需要对 Iterator 对象加锁；



## 1.7 注释

> 注：IDEA 可以下载插件检查。建议包括：Alibaba Java Coding Guidelines、SonarLint、GokYapiUpload、Free Mybatis plugin

1、类、类属性、类方法的注释必须使用 Javadoc 规范，使用 /** 内容 */ 格式，不得使用 // xxx 方式；

2、所有的抽象方法（包括接口中的方法）必须要用 Javadoc 注释、除了返回值、参数、 异常说明外，还必须指出该方法做什么事情，实现什么功能； 

3、所有的类都必须添加创建者和创建日期；

4、方法内部单行注释，在被注释语句上方另起一行，使用//注释。方法内部多行注释使用 /* */ 注释，注意与代码对齐； 

5、所有的枚举类型字段必须要有注释，说明每个数据项的用途；

6、所有框架生成之外的代码必须加上 begin-end 注释并注明作者和日期；















