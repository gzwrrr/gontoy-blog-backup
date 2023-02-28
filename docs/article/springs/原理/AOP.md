---
title: "AOP"
shortTitle: "AOP"
description: "AOP"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-03-01
category: 
- "spring"
- "原理"
tag:
- "spring"
- "原理"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "AOP"
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
  title: "AOP"
  description: "AOP"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# AOP

AOP（Aspect-Oriented Programming，面向切面编程）是一种编程范式，它是对面向对象编程的一种补充和扩展。它通过在程序运行期间动态地将代码织入到应用程序中的某些关键点上，从而实现对程序行为的监控和控制，以实现一些通用的、横切性的需求，比如日志记录、事务管理、安全控制、异常处理等。在AOP中，这些通用需求被称为切面（Aspect），而程序中的关键点被称为连接点（Join Point），切面可以通过连接点进行织入，从而实现对程序行为的干预。

AOP的主要思想是将程序中的不同关注点分离出来，然后将这些关注点分别进行处理，最后再将它们组合在一起。它采用了面向对象编程的一些思想，比如封装、继承和多态等，但同时也提供了一些新的概念和机制，比如切点（Pointcut）、通知（Advice）、切面（Aspect）等。

AOP的实现通常使用动态代理技术和字节码操作技术。在Java中，常用的AOP框架有Spring AOP和AspectJ等。其中，Spring AOP基于动态代理技术实现，支持基于方法拦截的AOP；而AspectJ则是基于字节码操作技术实现的，支持更为灵活和强大的AOP功能，但同时也更为复杂和难以使用。



对 AOP 的理解：

系统是由许多不同的组件所组成的，每一个组件各负责一块特定功能。除了实现自身核心功能之外，这

些组件还经常承担着额外的职责。例如日志、事务管理和安全这样的核心服务经常融入到自身具有核心

业务逻辑的组件中去。这些系统服务经常被称为横切关注点，因为它们会跨越系统的多个组件。

当我们需要为分散的对象引入公共行为的时候，OOP则显得无能为力。也就是说，OOP允许你定义从

上到下的关系，但并不适合定义从左到右的关系。例如日志功能。

日志代码往往水平地散布在所有对象层次中，而与它所散布到的对象的核心功能毫无关系。

在OOP设计中，它导致了大量代码的重复，而不利于各个模块的重用。

AOP：将程序中的交叉业务逻辑（比如安全，日志，事务等），封装成一个切面，然后注入到目标对象

（具体业务逻辑）中去。AOP可以对某个对象或某些对象的功能进行增强，比如对象中的方法进行增

强，可以在执行某个方法之前额外的做一些事情，在某个方法执行之后额外的做一些事情