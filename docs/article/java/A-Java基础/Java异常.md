---
title: "Java 异常"
shortTitle: "Java 异常"
description: "Java 异常"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-06-16
category: 
- "java"
- "异常"
tag:
- "java"
- "异常"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Java 异常"
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
  title: "Java 异常"
  description: "Java 异常"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 异常

[[toc]]

![异常的继承结构图](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%BC%82%E5%B8%B8/20230209/%E5%BC%82%E5%B8%B8%E7%9A%84%E7%BB%A7%E6%89%BF%E7%BB%93%E6%9E%84%E5%9B%BE.png)

- 不管是错误还是异常，都是可抛出的，同样也都可以捕获，但是注意错误抛出后一般不会进行捕获
- Exception 分为两类：编译时异常和运行时异常（受检异常和非受检异常）。这两个异常都是发生在运行阶段，编译阶段异常是不会发生的
- 编译时异常是表示必须在编写程序的时候预先对这种异常进行处理，否则编译器会报错（并不是在编译阶段发生的）；运行时异常在编写程序阶段可以选择处理也可以选择不处理
- Error 一旦发生，Java 程序便会终止执行，退出 JVM，即错误时不能处理的



## 受检异常和非受检异常

受检异常和非受检异常可以称为编译时异常（Checked Exceptions）和运行时异常（Runtime Exceptions）。



编译时异常（Checked Exceptions）是在编译时期由编译器强制检查的异常。这些异常通常表示程序中的外部条件可能导致异常情况，例如I/O错误、网络连接问题等。编译器要求程序员在方法签名中声明可能抛出的受检异常或在方法内部使用`try-catch`块进行处理。如果不处理或声明这些受检异常，编译器会报告编译错误。



运行时异常（Runtime Exceptions）是在运行时期抛出的异常，通常表示程序错误或逻辑错误，例如空指针引用、数组越界等。与受检异常不同，运行时异常在编译器不强制要求捕获或在方法签名中声明。这意味着程序员可以选择是否捕获和处理这些异常。运行时异常通常由程序的逻辑和设计问题引起，应该通过代码的质量保证和逻辑检查来避免它们的发生。

需要注意的是，Java的RuntimeException及其子类都属于运行时异常。它们在编译器不进行强制检查，因此可以在代码中选择是否处理。这为程序员提供了更大的自由度，但也要求程序员在设计和编码过程中更加小心，以避免潜在的运行时异常导致程序错误或不稳定性。



在Java中，常见的受检异常（Checked Exceptions）和非受检异常（Unchecked Exceptions）有以下几种：

常见的受检异常（Checked Exceptions）：

1. IOException：处理输入输出操作时可能抛出的异常，如文件读写错误、网络连接问题等。
2. SQLException：处理数据库操作时可能抛出的异常，如连接数据库失败、SQL查询错误等。
3. ClassNotFoundException：在使用反射时，如果找不到指定的类，就会抛出此异常。
4. InterruptedException：处理多线程操作时可能抛出的异常，如线程被中断等。
5. ParseException：处理日期时间格式化或解析时可能抛出的异常，如字符串无法解析为指定的日期格式等。

常见的非受检异常（Unchecked Exceptions）：

1. NullPointerException：当程序试图访问空对象时抛出的异常。
2. IllegalArgumentException：当传递给方法的参数不合法时抛出的异常。
3. IllegalStateException：当对象的状态不合法或不一致时抛出的异常。
4. ArrayIndexOutOfBoundsException：访问数组元素时下标越界时抛出的异常。
5. ArithmeticException：执行算术运算时发生错误时抛出的异常，如除数为零等。

需要注意的是，RuntimeException及其子类是一种特殊的非受检异常，它们通常表示程序错误或逻辑错误，如NullPointerException、ArrayIndexOutOfBoundsException等。与受检异常不同，对于RuntimeException及其子类，编译器不会强制要求捕获或在方法签名中声明。

受检异常和非受检异常的区别在于受检异常需要在方法签名中声明或捕获处理，而非受检异常可以选择是否捕获和处理。通常情况下，受检异常应该由程序员在代码中进行适当的处理，而非受检异常则更多地由程序的逻辑和设计来避免发生。





## 处理异常

java 中对异常的处理包括两种方式：

1. 在方法声明式使用 throws 关键字，即抛给上一级
2. 使用 try ... catch 语句进行异常捕获

【注意】如果 Java 中异常发生之后一直上抛，最终抛给 main 方法且 main 继续上抛至调用者 JVM，这时只有一个结果，即终止 Java 程序的执行







## RuntimeException

![image-20230224162650522](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%BC%82%E5%B8%B8/20230224/runtimeException.png)





## UncheckedException

![image-20230224162757266](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%BC%82%E5%B8%B8/20230224/uncheckedException.png)