---
title: "RabbitMQ 持久化"
shortTitle: "D-RabbitMQ 持久化"
description: "RabbitMQ 持久化"
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
  text: "RabbitMQ 持久化"
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
  title: "RabbitMQ 持久化"
  description: "RabbitMQ 持久化"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RabbitMQ 持久化

:::info 消息持久化

消息持久化是指在消息发送到 RabbitMQ 后，即使 RabbitMQ 服务重启或崩溃，消息也不会丢失，可以在重启或崩溃后重新加载到队列中。

:::



[[toc]]



## 前言

**消息持久化的作用：**

- 保障当 RabbitMQ 服务停止以后生成者发过来的消息不丢失
- 默认情况下 RabbitMQ 退出或由于某种原因崩溃时，会忽视队列和消息
- 确保消息不会丢失需要做两件事：将队列和消息都标记为持久化

<br/>



**需要注意的是：**

将消息设置为持久化并不是绝对可靠的，因为在消息投递到队列和存储到磁盘之间可能会存在短暂的时间窗口，在此期间，如果 RabbitMQ 宕机，则消息可能会丢失。因此，需要通过使用备份和镜像队列等机制来提高消息的可靠性。

消息持久化适用于以下场景：

- 消息重要性较高，不允许丢失。
- 消息过多时，需要做到 RabbitMQ 宕机后能够自动恢复。
- 消息处理时间较长，需要保证在消息处理过程中 RabbitMQ 不会丢失消息。





## 1.队列持久化

- 非持久化的队列在 RabbitMQ 重启后会被删除掉，持久化需要在声明队列时把 durable 参数设置为持久化
- 需要注意的是，如果之前声明的队列不是持久化的，需要把原先的队列先删除或者重新创建一个持久化的队列，否则会出现错误

```java
// 声明队列，设置持久化
boolean durable = true;
channel.queueDeclare(QUEUE_NAME, durable, false, false, null);
```



## 2.消息持久化

- 消息持久化需要修改生产者的代码，将 MessageProperties.PERSISTENCE_TEXT_PLAIN 加入声明中
- 将消息标记为持久化不能保证不会丢失消息，依然存在消息未存储进磁盘就挂掉的情况



## 3.不公平分发

- 轮询分发在消费者处理速度不等的情况下有效率低的弊端
- 可以通过在消费者处设置 channel.basicQos(1) 实现不公平分发

```java
// 设置不公平分发
int preFetchCount = 1;
channel.basicQos(preFetchCount);
channel.basicConsume(QUEUE_NAME, true, deliverCallback, cancelCallback);
```



## 4.预取值

- 属于不公平分发，通过设置 preFetchCount 的数量确定，设置为 1，即上面的情况是最保守的，这会使得吞吐量变得很低，特别是在消费者连接延迟严重或消费者连接等待时间较长的情况
- 消息和手动确认是异步发送的，存在一个未确认的消息缓冲区。需要限制此缓冲区的大小，避免里面有无限多的未确认消息，这时可以通过 basic.qos 设置预取值来完成
- 预取指定义通道上允许的未确认消息的最大数量，一旦数量达到配置的数量，RabbitMQ 就会停止在信道上传递更多的信息
- 消息应答和预取值对用户吞吐量有重大影响，通常增加预取指将提高消费者传递消息的速度
- 自动应答传输效率是最佳的，但是这种情况下未处理的消息数量也会增加，从而增加消费者的内存消耗
- 100 到 300 范围内的预取值通常可以提供最佳的吞吐量，并且不会给消费者带来太大的风险