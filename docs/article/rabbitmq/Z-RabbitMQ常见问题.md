---
title: "RabbitMQ 常见问题"
shortTitle: "Z-RabbitMQ 常见问题"
description: "RabbitMQ 常见问题"
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
  text: "RabbitMQ 常见问题"
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
  title: "RabbitMQ 常见问题"
  description: "RabbitMQ 常见问题"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RabbitMQ 常见问题



[[toc]]



1. RabbitMQ 的基本概念：包括消息、队列、交换机、绑定等概念，以及它们之间的关系和作用。
2. RabbitMQ 的使用场景：在哪些场景下适合使用 RabbitMQ，以及与其他消息中间件的比较。
3. RabbitMQ 的高可用：如何实现 RabbitMQ 的高可用，包括镜像队列、集群等方案。
4. RabbitMQ 的性能优化：如何提高 RabbitMQ 的性能，包括队列、消息、交换机等的配置。
5. RabbitMQ 的安全机制：包括用户认证、权限控制等。
6. RabbitMQ 的消息确认机制：如何保证消息的可靠性，包括 ACK 确认、TTL、DLX 等机制。
7. RabbitMQ 的消息传输协议：AMQP 是什么，与其它传输协议的区别和优缺点。
8. RabbitMQ 的管理和监控：如何通过 RabbitMQ 的 Web 界面管理和监控 RabbitMQ，以及如何通过插件进行监控。





## 如何保证幂等性？

- 用户对同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生副作用
- 消息重复消费：消费者在消费 MQ 中的消息时，MQ 已经把消息发送给消费者，消费者在给 MQ 返回 ack 时网络中断，此时 MQ 未受到确认信息，该消息会重新发给其他消费者，或者在网络重连后再次发送给该消费者，但是实际上该消费者已经成功消费了该消息，这就会造成重复消费消息
- 解决方案：一般使用全局 ID 或写一个唯一标识，比如时间戳、UUID；消费者消费消息时也可以利用 id，在每次消费前都判断一次是否已经消费过
- 消费端的幂等性保障：在业务高峰期，生产端可能有重复消息，这时消费端就需要实现幂等性，这意味着消息不会被消费多次；主流的幂等性操作有两种：
  - 唯一 ID + 指纹码机制，利用数据库逐渐去重。这里的指纹码是指：一些规则或者时间戳加背的服务给到的唯一信息码，不一定是系统生成的，基本都是由业务规则拼接而来的，但是一定要保证唯一性；之后使用查询语句判断这个 ID 是否存在于数据库中。优势是实现简单（拼接即可），劣势就是高并发时数据库压力会很高
  - 利用 Redis 的原子性实现：执行 setnx 命令，天然具有幂等性（推荐）





## 如何保证消息可靠传输？

1. 使用事务消息

2. 使用消息确定机制：

   发送方确认：Channel 设置为 `confirm` 模式，则每条消息会被分配唯一 ID

   1. 消息投递成功后信道就会发送 `ack` 给生产者，其中包含了分配的 ID，接着回调 `ComfirmCallback` 接口
   2. 如果发生错误导致消息丢失，那么就发送 `nack` 给生产者，回调 `ReturnCallback` 接口
   3. 两种情况只能触发其中一个，并且是 **异步触发**，之后可以继续发送消息

   接收方确认：

   1. 声明队列时，指定 `noack=false`，broker 会等待消费者手动返回 `ack`
   2. broker 的 `ack` 没有超时机制，只会判断链接是否断开，如果断开了，消息就会被重新发送





