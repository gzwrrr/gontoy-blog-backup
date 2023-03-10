---
title: "消息驱动-SpringCloudStream"
shortTitle: "A-消息驱动-SpringCloudStream"
description: "消消息驱动-SpringCloudStream"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-06-01
category: 
- "分布式"
tag:
- "分布式"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "消息驱动-SpringCloudStream"
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
  title: "消息驱动-SpringCloudStream"
  description: "消息驱动-SpringCloudStream"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# 消息驱动-SpringCloudStream

> Spring Cloud Stream，Binder 对象是关键

- 构建消息驱动微服务的框架，屏蔽底层消息中间件的差异，降低切换成本，统一消息的编程模型
- 应用程序通过 inputs 或者 outputs 来与 Spring Cloud Strem 中的 binder 对象交互
- binder 对象负责与消息中间件交互，我们只需要配置绑定即可，即只需要搞清楚如何与 Stream 交互就可以方便使用消息驱动的方式
- 通过 Spring Integration 来连接消息代理中间件以实现消息事件驱动
- Stream 为一些供应商的消息中间件产品提供了个性化的自动化配置实现，引用了发布-订阅、消费组、分区的三个核心概念

**引入了 Stream 之后：**

- Stream 完成了大一统的任务（虽然现在只能选择 RabbitMQ 或者 Kafaka）
- 绑定器作为中间层能够完美实现应用程序与消息中间件之间细节的隔离，通过向应用程序暴露统一的 Channel，使得应用程序之间不需要再考虑各种不同的消息中间件的实现

**Stream 标准流程：**

- Binder：方便连接中间件，可以屏蔽差异
- Channel：对 Queue 的一种抽象，在消息通讯系统中就是实现存储和转发的媒介，通过 Channel 对队列进行配置
- Source 和 Sink：可以理解为参照对象是 Stream 自身，从 Stream 发布消息就是输出，接收消息就是输入

