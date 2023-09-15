---
title: "Redis 发布订阅"
shortTitle: "E-Redis 发布订阅"
description: "Redis 发布订阅"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-22
category: 
- "redis"
- "数据库"
- "缓存"
tag:
- "redis"
- "数据库"
- "缓存"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Redis 发布订阅"
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
  title: "Redis 发布订阅"
  description: "Redis 发布订阅"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Redis 发布订阅

[[toc]]

- redis 发布订阅（pub/sub）是一种消息通信模式
- Redis 客户端可以订阅任意数量的频道

| 序号 |                   命令                    |               说明               |
| :--: | :---------------------------------------: | :------------------------------: |
|  1   |          publish channel message          |      将消息发送到指定的频道      |
|  2   |    punsubscribe [pattern[pattern...]]     |      退订所有给定模式的频道      |
|  3   |      subscribe channel[channel...]]       | 订阅给定的一个或多发个频道的消息 |
|  4   |     unsubscribe [channel[channel...]]     |          指定退订的频道          |
|  5   | pubsub subcommand [argument[argument...]] |      查看订阅与发布系统状态      |
|  6   |      psubscribe pattern[pattern...]       | 订阅一个或多个符合给定模式的频道 |

**Redis有两种发布/订阅模式：**

基于频道(Channel)的发布/订阅：

- 发出去的消息不会被持久化，也就是有客户端订阅channel:1后只能接收到后续发布到该频道的消息，之前的就接收不到了
- 消息类型的取值可能是以下3个:
  - subscribe。表示订阅成功的反馈信息。第二个值是订阅成功的频道名称，第三个是当前客户端订阅的频道数量。
  - message。表示接收到的消息，第二个值表示产生消息的频道名称，第三个值是消息的内容。
  - unsubscribe。表示成功取消订阅某个频道。第二个值是对应的频道名称，第三个值是当前客户端订阅的频道数量，当此值为0时客户端会退出订阅状态，之后就可以执行其他非"发布/订阅"模式的命令了

基于模式(pattern)的发布/订阅：

- 如果有某个/某些模式和这个频道匹配的话，那么所有订阅这个/这些频道的客户端也同样会收到信息

<br/>

**订阅发布机制的底层原理：**

基于频道的原理：

- 通过 subscribe 订阅某频道后，redis-server 里会维护一个字典，键为 channel，值为链表，链表中保存了所有订阅这个 channel 的客户端，当客户护短订阅时就会将其添加到这个订阅链表中
- 通过 publish 向订阅者发送消息，redis-server 会使用给定的频道作为建，在所维护的链表中查找订阅了这个频道的客户端链表，遍历链表将消息发布给所有订阅者

基于模式的原理：

- 底层是pubsubPattern 节点的链表，链表中保存着所有和模式相关的信息
- pubsubPattern 节点中的 client 属性保存着订阅模式的客户端，而 pattern 属性则保存着被订阅的模式

