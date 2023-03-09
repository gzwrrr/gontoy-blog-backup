---
title: "RabbitMQ 事务"
shortTitle: "F-RabbitMQ 事务"
description: "RabbitMQ 事务"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-09
category: 
- "通信"
- "中间件"
- "rabbitmq"
tag:
- "通信"
- "中间件"
- "rabbitmq"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "RabbitMQ 事务"
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
  title: "RabbitMQ 事务"
  description: "RabbitMQ 事务"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# RabbitMQ 事务





事务消息的原理如下：

1. 开启事务：使用 Connection 对象的 `txSelect()` 方法开启事务。
2. 发送消息：使用 Channel 对象的 `basicPublish()` 方法发送消息。
3. 提交事务：使用 Channel 对象的 `txCommit()` 方法提交事务。在提交事务之前，所有的消息都会存储在 RabbitMQ 中，并且不会被消费者获取。
4. 回滚事务：使用 Channel 对象的 `txRollback()` 方法回滚事务。在回滚事务之后，之前发送的消息都会被撤回，并且不会被消费者获取。

事务消息的机制能够确保消息的可靠性，但是同时也会影响消息的性能。因此，在使用事务消息时需要注意，尽量减少事务的使用，提高消息的吞吐量。







