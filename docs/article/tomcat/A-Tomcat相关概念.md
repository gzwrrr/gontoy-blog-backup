---
title: "Tomcat 相关概念"
shortTitle: "A-Tomcat 相关概念"
description: "Tomcat 相关概念"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-10-01
category: 
- "tomcat"
- "java"
tag:
- "tomcat"
- "java"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Tomcat 相关概念"
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
  title: "Tomcat 相关概念"
  description: "Tomcat 相关概念"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Tomcat 相关概念

[[toc]]

## 客户端与服务端交互

涉及到：

1. HTTP 协议
2. Socket 客户端套接字与 ServerSocket 服务端套接字，用于数据传输





## 基本组件

Web 容器必须包含的组件

1. Request：浏览器发起的 HTTP 请求
2. Response：处理请求后的响应，即服务器对 HTTP 请求的响应
3. HttpServer：服务端
4. ServletProcessor：对请求和响应进行加工





## 架构

![Tomcat架构](https://www.pdai.tech/images/tomcat/tomcat-x-design-2-1.jpeg)

从功能上划分出来的 Tomcat 的主要模块

1. Catalina 模块：包含应用服务器核心：Server、Service、Host、Connector、Context、Session及Cluster
2. Connector 模块：Web 模块
3. Resource 模块：包含资源文件，不包含 Java 源代码，但是是 Tomcat 运行必需的

绝大多数组件实现了Lifecycle接口，这也就是我们所说的基于生命周期。生命周期的各个阶段的触发又是基于事件的方式。





## 启动

![Tomcat启动](https://www.pdai.tech/images/tomcat/tomcat-x-start-1.png)

1. Tomcat 源码编译后 bin 目录下的 catalina.bat 最终会执行 Bootstrap 类中的main方法，以此启动参数
2. 我们可以通过设定不同的参数让tomcat以不同的方式运行









