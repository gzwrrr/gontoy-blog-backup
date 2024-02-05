---
title: "RabbitMQ Work Queues"
shortTitle: "A-RabbitMQ Work Queues"
description: "RabbitMQ Work Queues"
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
timeline: true
dir:
  text: "RabbitMQ Work Queues"
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
  title: "RabbitMQ Work Queues"
  description: "RabbitMQ Work Queues"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RabbitMQ Work Queues



[[toc]]





- 工作队列的主要思想是避免立即执行资源密集型任务 
- 不是等待任务，而是安排任务在之后执行
- 在后台运行的工作进程将弹出任务并最终执行作业
- 当有多个工作线程时，这些工作线程将一起处理这些任务
- 一个消息只能被一个线程处理一次





## 1.轮询接收

**使用轮询分发消息：**

```java
/**
 * 工作线程，相当于之前的消费者
 * 验证一个消息只能被一个线程消费一次
 */
public class Worker01 {
    private static final String QUEUE_NAME = "Hello";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        DeliverCallback deliverCallback = (consumerTag, message) -> {
            System.out.printf("接收到的消息：%s\n", new String(message.getBody()));
        };

        CancelCallback cancelCallback = (consumerTag) -> {
            System.out.printf("%s：消费者取消消费接口的逻辑", consumerTag);
        };

        // 接收消息
        System.out.println("c2 等待接收消息...");
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, cancelCallback);


    }
}
```

```java
/**
 * 任务线程
 * 发送大量的消息
 */
public class Task01 {
    private static final String QUEUE_NAME = "Hello";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        // 声明队列
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        // 从控制台中接收信息
        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNext()) {
            String msg = scanner.next();
            channel.basicPublish("", QUEUE_NAME, null, msg.getBytes());
        }
    }
}
```





## 2.消息应答

- 消费者完成一个任务可能需要一段时间，如果其中一个消费者处理一个长的任务并仅仅只完成了部分任务而中途挂掉，那么会造成不好的后果
- RabbitMQ 一旦向消费者传递一条消息，便立即将该消息标记为删除。在这种情况下，如果突然有某个消费者挂掉，就会丢失正在处理的消息，并且后续发给该消费者的消息都无法接收到
- 为了保证消息在发送过程中不丢失，RabbitMQ 引入消息应答机制，即：消费者在接收到消息并且处理该消息之后，告诉 RabbitMQ 它已经处理完毕，可以将该消息删除

**自动应答：**

- 消息发送后立即被认为已经传送成功，这种模式需要在高吞吐量和数据安全性方面做出权衡，因为如果在消息接收之前，消费者那边出现连接或者关闭信道，那么消息就会丢失；另一方面，这种模式可以传递过载的消息，没有对传递的消息数量进行限制，消费者可能由于接收太多来不及处理的消息，导致大量数据积压，最终使得内存耗尽，严重情况线程可能被操作系统杀死
- 这种模式仅适用于在消费者可以高效并且以某种速率正常处理这些消息的情况下使用

**消息应答的方法：**

- Channel.basicAck（用于肯定应答，RabbitMQ 已经知道该消息被成功处理，可以将其丢弃）
- Channel.basicNack（用于否定确认）
- Channel.basicReject（用于否定确认，相比 basicNack 少一个参数（是否批量应答），不处理该消息直接拒绝，可以将其丢弃）

**Multple 批量应答：**

- true 时代表批量应答 channel 上未应答的消息
- false 时只应答当前的消息
- 一般不使用批量应答

**消息自动重新入队：**

- 消费者由于某些原因失去连接，如信道关闭、连接关闭、TCP 连接丢失等，导致消息未发送 ACK 确认
- RabbitMQ 了解到消息未完全处理后，将消息重新排队，如果此时消费者可以处理，那么会很快分配给一个消费者
- 这样可以保证消息不丢失

**消息手动应答：**

- 消息默认是采用自动应答的，要保证消息不丢失需要先改成手动应答

```java
/**
 * 工作线程，相当于之前的消费者
 * 在消息手动应答时不丢失，放回队列中重新消费
 * @author gzw
 */
public class Worker021 {
    private static final String QUEUE_NAME = "ACK";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        DeliverCallback deliverCallback = (consumerTag, message) -> {
            SleepUtils.sleep(1);
            System.out.printf("接收到的消息：%s\n", new String(message.getBody(), "UTF-8"));
            /**
             * ACK 应答参数的含义：
             *  1.消息的标记 tag
             *  2.是否应该批量应答，此处不应自动应答
             */
            channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
        };

        CancelCallback cancelCallback = (consumerTag) -> {
            System.out.printf("%s：消费者取消消费接口的逻辑", consumerTag);
        };

        // 接收消息，采用手动应答
        System.out.println("c1 等待接收消息的时间较短...");
        boolean autoAck = false;
        channel.basicConsume(QUEUE_NAME, autoAck, deliverCallback, cancelCallback);
    }
}
```



