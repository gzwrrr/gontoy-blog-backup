---
title: "消息总线-SpringCloudBus"
shortTitle: "A-消息总线-SpringCloudBus"
description: "消息总线-SpringCloudBus"
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
  text: "消息总线-SpringCloudBus"
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
  title: "消息总线-SpringCloudBus"
  description: "消息总线-SpringCloudBus"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 消息总线-SpringCloudBus

- 在微服务架构的系统中，通常会使用轻量级的消息代理来构建一个公用的消息主题，并让系统中所有微服务实例都链接上来。由于该主题中产生的消息会被所有实例监听和消费，所以称之为消息总线
- 基本原理是客户端实例都会监听消息队列中的同一个 `topic`（默认是 `Spring Cloud Bus`），当一个服务刷新数据时，它会把这个消息放到该主题中，这样其他监听同一个主题的服务就能得到新的通知，并更新自身的状态
- 可以配合 `Spring Cloud Config` 实现真正的动态配置刷新
- 支持两种消息代理：`RabbitMQ` 和 `Kafaka`
- `Spring Cloud Bus` 是将分布式系统的节点与轻量级消息系统链接起来的框架，整合了 Java 事件处理机制和消息中间件的功能
- 能够管理和传播分布式系统间的消息，就像一个分布式执行器，可以用于广播状态更改、事件推送等，也可以作为微服务间的通信通道

**两种触发方式：**

- 利用消息总线触发一个客户端 `/bus/refresh` 端点从而刷新所有客户端的配置
- 利用消息总线触发一个服务端  `/bus/refresh` 端点从而刷新所有客户端的配置

- 注意：需要给配置中心的服务端和客户端都加上消息总线的支持

**使用客户端通知的弊端：**

- 打破了微服务的职责单一性，因为客户端本身是业务模块，本就不应该承担配置刷新的职责
- 破坏了微服务个节点的平衡性
- 存在其他的局限性，如微服务在迁移的时候，网络地址是常常发生改变的，如果这时候想要刷新可能需要更多的修改