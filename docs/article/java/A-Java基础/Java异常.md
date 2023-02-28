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
timeline: true,
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

![异常的继承结构图](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%BC%82%E5%B8%B8/20230209/%E5%BC%82%E5%B8%B8%E7%9A%84%E7%BB%A7%E6%89%BF%E7%BB%93%E6%9E%84%E5%9B%BE.png)

- 不管是错误还是异常，都是可抛出的
- Exception 分为两类：编译时异常和运行时异常。这两个异常都是发生在运行阶段，编译阶段异常是不会发生的
- 编译时异常是表示必须在编写程序的时候预先对这种异常进行处理，否则编译器会报错（并不是在编译阶段发生的）；运行时异常在编写程序阶段可以选择处理也可以选择不处理
- Error 一旦发生，Java 程序便会终止执行，退出 JVM，即错误时不能处理的



java 中对异常的处理包括两种方式：

1. 在方法声明式使用 throws 关键字，即抛给上一级
2. 使用 try ... catch 语句进行异常捕获

【注意】如果 Java 中异常发生之后一直上抛，最终抛给 main 方法且 main 继续上抛至调用者 JVM，这时只有一个结果，即终止 Java 程序的执行







## RuntimeException

![image-20230224162650522](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%BC%82%E5%B8%B8/20230224/runtimeException.png)





## UncheckedException

![image-20230224162757266](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%BC%82%E5%B8%B8/20230224/uncheckedException.png)