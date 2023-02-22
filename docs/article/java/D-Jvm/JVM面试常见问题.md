---
title: "JVM 面试常见问题"
shortTitle: "Z-JVM 面试常见问题"
description: "JVM 面试常见问题"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-06-11
category: 
- "java"
- "JVM"
- "虚拟机"
tag:
- "java"
- "JVM"
- “虚拟机”
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "JVM 面试常见问题"
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
  title: "JVM 面试常见问题"
  description: "JVM 面试常见问题"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# JVM 面试常见问题



## Tomcat 中为什么使用自定义类加载器

`Tomcat` 中可以部署多个应用，每个应用中都存在许多类，并且各个应用中的类是独立的，但是其全类名是可以 **相同的**，使用自定义类加载器可以避免至加载一个类，做法就是为部署的 **每个应用都生成一个类加载器示例**，名称为 `WebAppClassLoader`

另外 `Tomcat` 还利用自定义加载器实现了 **热加载** 功能















