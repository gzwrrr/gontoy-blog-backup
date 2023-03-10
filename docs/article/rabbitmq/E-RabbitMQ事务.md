---
title: "RabbitMQ 事务"
shortTitle: "E-RabbitMQ 事务"
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

:::info 事务

在 RabbitMQ 中，事务消息是指生产者将多条消息发送到 RabbitMQ 服务器，然后将它们视为一个单元，并将它们放在一个单独的事务中。如果这些消息不能全部成功写入 RabbitMQ 服务器，则会回滚整个事务，否则，将一次性写入所有消息。事务可以保证在所有消息都被写入队列之后，消费者才能消费这些消息。

:::



[[toc]]



事务消息的原理如下：

1. 开启事务：使用 Connection 对象的 `txSelect()` 方法开启事务。
2. 发送消息：使用 Channel 对象的 `basicPublish()` 方法发送消息。
3. 提交事务：使用 Channel 对象的 `txCommit()` 方法提交事务。在提交事务之前，所有的消息都会存储在 RabbitMQ 中，并且不会被消费者获取。
4. 回滚事务：使用 Channel 对象的 `txRollback()` 方法回滚事务。在回滚事务之后，之前发送的消息都会被撤回，并且不会被消费者获取。

事务消息的机制能够确保消息的可靠性，但是同时也会影响消息的性能。因此，在使用事务消息时需要注意，尽量减少事务的使用（可以使用消息确认机制代替），提高消息的吞吐量。





## 简单示例

```java
@Service
public class MyService {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Autowired
    private TransactionTemplate transactionTemplate;

    public void sendMessage() {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                try {
                    rabbitTemplate.convertAndSend("my.exchange", "my.routing.key", "Hello, RabbitMQ!");
                } catch (Exception e) {
                    status.setRollbackOnly();
                }
            }
        });
    }
    
    @RabbitListener(queues = "my.queue")
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message);
    }
}
```

解释：使用了Spring AMQP提供的`RabbitTemplate`发送消息，并使用了`TransactionTemplate`来管理事务。发送消息时，使用`transactionTemplate.execute()`方法包裹发送逻辑，在发送成功后自动提交事务，发送失败则回滚事务。接收消息时，使用了`@RabbitListener`注解标注方法，表示该方法监听名为`my.queue`的队列，当有消息到达时自动调用该方法进行处理。

使用场景：

- 对消息可靠性要求较高的业务场景，确保消息在发送成功后才被处理，避免消息丢失或重复处理。
- 对消息吞吐量要求较低的业务场景，因为事务会对性能产生一定影响。







:::info 相关文章（转）

[RabbitMQ事务性消息和确认模式 – 博客园 Qiao_Zhi](https://www.cnblogs.com/qlqwjy/p/13934573.html)

:::