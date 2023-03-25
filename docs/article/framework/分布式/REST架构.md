---
title: "REST架构"
shortTitle: "REST架构"
description: "REST架构"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-09-01
category: 
- "分布式"
- "小知识点"
tag:
- "分布式"
- "小知识点"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "REST架构"
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
  title: "REST架构"
  description: "REST架构"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# REST 架构



## 简介

REST架构是Representational State Transfer的缩写，它是一种用于构建分布式系统和应用程序的架构风格。REST的主要原则是将应用程序建模为由资源组成的集合，这些资源可以通过URI进行唯一标识，通过HTTP协议中的标准方法（如GET、POST、PUT、DELETE等）对资源进行操作，通过使用标准的数据格式（如JSON、XML等）来表示资源的状态以及与客户端进行交互。

RESTful是基于REST架构的Web服务实现，它遵循REST架构的原则，提供了一组通用的规范和标准来构建Web服务。使用RESTful风格的Web服务，可以通过HTTP协议的标准方法和标准数据格式来实现客户端和服务器之间的交互，同时也能够利用HTTP的缓存机制、安全机制和其他特性。

总的来说，REST是一种架构风格，而RESTful则是基于REST的Web服务实现。





## RESTful API

RESTful API是基于REST架构风格的API设计，它是一种使用HTTP协议进行网络通信，通过HTTP请求访问和操作资源的Web API。RESTful API具有以下特点：

1. 基于HTTP协议：RESTful API使用HTTP协议中的GET、POST、PUT、DELETE等请求方法，用于获取、创建、更新和删除资源。
2. 资源和URI：RESTful API中的资源以URI的方式进行访问，每个资源都有唯一的URI标识符。
3. 统一接口：RESTful API采用统一的接口风格，即使用HTTP请求方法表示对资源的操作，使用HTTP状态码表示请求结果。
4. 无状态：RESTful API中的请求是无状态的，每个请求都是独立的，服务器不会保存请求的状态信息。
5. 可缓存：RESTful API支持缓存，提高了响应速度和系统的可扩展性。

在设计RESTful API时，需要遵循以下几个原则：

1. 明确资源：每个资源都应该有一个唯一的URI标识符。
2. 使用HTTP请求方法：HTTP请求方法表示对资源的操作，例如使用GET请求获取资源，使用POST请求创建资源，使用PUT请求更新资源，使用DELETE请求删除资源。
3. 返回资源的表现形式：RESTful API中，每个资源都可以有多种表现形式，例如XML、JSON等。
4. 不要使用动词：在URI中不要使用动词，而是使用名词表示资源。
5. 使用HTTP状态码：使用HTTP状态码表示请求的结果，例如200表示请求成功，404表示资源不存在，500表示服务器错误等。

综上所述，RESTful API是一种使用HTTP协议进行网络通信的Web API设计风格，具有简洁、灵活、可扩展等特点。





## 其他

URI（Uniform Resource Identifier）是一种用于唯一标识某一互联网资源的标识符。它可以是URL（Uniform Resource Locator）或URN（Uniform Resource Name）的一种。

URL是URI的一种，它表示了一个互联网资源的位置，并且可以用来访问这个资源。URL由协议、主机名、端口号和路径组成。

URN也是URI的一种，它是一种独特的名字，用于标识资源，不考虑它在哪里，也不考虑如何访问它。URN的例子包括ISBN号、UUID等。