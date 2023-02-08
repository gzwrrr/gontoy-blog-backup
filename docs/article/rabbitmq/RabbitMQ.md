---
title: "RabbitMQ 简单使用"
shortTitle: "RabbitMQ 简单使用"
description: "RabbitMQ 简单使用"
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
  text: "RabbitMQ 简单使用"
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
  title: "RabbitMQ 简单使用"
  description: "RabbitMQ 简单使用"
  author:
    name: gzw
    email: 1627121193@qq.com
---






# RabbitMQ 简单使用



# 写在前面

本文章为学习 RabbitMQ 的笔记，根据视频教程记录：[尚硅谷 RabbitMQ 教程](https://www.bilibili.com/video/BV1cb4y1o7zz?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0)



# MQ 相关概念

## 1.什么是 MQ

- 本质是队列
- FIFO：先入先出，队列中存放的内容是 message，是一种跨进程的通信机制，用于上下游传递信息
- MQ 是一种非常常见的上下游【逻辑解耦】与【物理解耦】的消息通信服务
- 使用 MQ 之后，消息发送上游只需要依赖 MQ，不需要依赖其他服务



## 2.为什么使用 MQ

- 流量消峰：消息过多时排队，保护系统
- 应用解耦：子系统要是耦合在一起，那么其中一个出故障整条链都会受影响，MQ 可以单独监控其中的子系统
- 异步处理：A 调用 B 的异步方法后，B 完成通知 MQ，MQ 再做出进一步处理



## 3.MQ 的分类

- ActiveMQ：
  - 优点：单机吞吐量万级，时效性 ms 级别，可用性高，基于主从架构实现高可用，较低概率丢失数据
  - 缺点：官方社区维护越来越少，高吞吐量场景较少使用
- Kafka：
  - 大数据领域的绕不开的消息传输工具，百万级的 TPS（系统的吞吐量）
  - 优点：性能卓越，最大优点就是吞吐量高；分布式高可用；能保证消息仅被消费一次；有第三方管理界面（Kafka-Manager）；日志领域比较成熟，再大数据领域的实时计算以及日志采集中被大规模使用
  - 缺点：Kafka 单机超过 64 个队列/分区，Load 会发生明显的飙高显效，队列越多 Load 越高，发送消息相应时间变长；使用短轮询方式，实时性取决于轮询间隔时间；消费失败不支持重试；支持消息顺序，但那时一台代理宕机后，会产生消息乱序；社区更新较慢
- RocketMQ：
  - 阿里巴巴的开源产品，使用 Java 实现，在设计时参考了 Kafka，并做出了一定的优化
  - 优点：单机吞吐量 十万级，分布式高可用；消息可以做到 0 丢失，MQ 的功能较为完善；支持 10 亿级别的消息堆积，不会因为堆积导致性能下降
  - 缺点：支持的客户端语言不多，目前只支持 Java 和 C++；社区活跃度一般；没有在 MQ 核心中实现  JMS 等接口，有些系统如果要迁移需要修改大量代码
- RabbitMQ：
  - 在 AMQP（高级消息队列协议）基础上完成的，可复用的企业消息系统，时当前最主流的消息中间件之一
  - 优点：由于 erlang 语言的高并发特性，性能较好；吞吐量达到万级；MQ 的功能较为完备、健壮、稳定、易用、跨平台、支持多种语言、支持 AJAX、文档齐全；开源的管理界面好用、社区活跃度高、更新频率高
  - 缺点：商业版需要收费，学习成本较高



## 4.RabbitMQ

- 是一个消息中间件，接收并转发消息

- 四大核心概念：
  - 生产者：产生数据发送的程序
  - 交换机：非常重要的部件，一方面接收来自生产者的消息，另一方面他将消息推送到队列中；交换机必须确切知道如何处理它所接收到的消息，这由交换机的类型决定；交换机可以绑定多个队列
  - 队列：是内部使用的一种数据结构，消息只能存储在队列中；队列仅受主机的内存和磁盘限制的约束，本质上是一个大的消息缓冲区
  - 消费者：队列与消费者是一对一的关系；消费与接收具有相似的关系；消费者大多时候是一个等待接收消息的程序；生产者消费者和消息中间件很多时候并不在一个机器上；同一个应用程序既可以是生产者又可以是消费者



## 5.RabbitMQ 的核心部分

**六大模式：**

- 简单模式
- 工作模式
- 发布/订阅模式
- 路由模式
- 主题模式
- 发布确认模式

**名词解释：**

- Broker：接收和分发消息的应用，RabbitMQ Server 就是 Message Broker
- Virtual host：AMQP 的基本组件划分到一个虚拟的分组中（出于多租户和安全因素设计），类似于网络中的 namespace 概念；当多个不同的用户使用同一个 RabbitMQ Server 提供的服务时，可以划分出多个 vhost，每个用户在自己的 vhost 创建 exchange / queue 等
- Connection：publisher / consumer 和 broker 之间的 TCP 连接
- Channel：如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大时建立 TCP 的开销是巨大的，效率也较低；Channel 是在 Connection 内部建立的逻辑连接，如果应用程序支持多线程，通常就是每个线程创建单独的 Channel 进行通讯；AMQP method 中包含了 Channel ID 帮助客户端和 message broker 识别 Channel，所以 Channel 之间是完全隔离的；Channel 作为 轻量级的 Connection 极大减少了操作系统建立 TCP 的开销
- Exchange：message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发消息到 queue 中去，常用类型有：direct（点对点）、topic（发布-订阅）、fanout（多播）
- Binding：exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key，binding 信息被保存到  exchange 中的查询表中，用于 message 的分发依据



## 6.Linux 上安装 RabbitMQ

- 进入 [RabbitMQ 官网](https://www.rabbitmq.com/)
- 创建 erlang 目录，在官网找到 erlang 的 rpm 安装包，使用 wget 命令下载，此处用的版本是：erlang-21.3.8.14-1.el7.x86_64.rpm
- 创建 rabbitmq 目录，在官网找到 rabbitmq-server 的 rpm 安装包，使用 wget 命令下载，此处用的版本是 rabbitmq-server-3.8.8-1.el7.noarch.rpm
- 下载完成后在对应的目录下安装：
  - rpm -ivh erlang-21.3.8.14-1.el7.x86_64.rpm
  - yum install socat -y（RabbitMQ 的依赖）
  - rpm -ivh rabbitmq-server-3.8.8-1.el7.noarch.rpm

- 启动服务：
  - chkconfig rabbitmq-server on（开机启动）
  - /sbin/service rabbitmq-server start（启动服务）
  - /sbin/service rabbitmq-server status（查看服务状态）

- 安装管理插件：
  - /sbin/service rabbitmq-server stop（停止服务）
  - rabbitmq-plugins enable rabbitmq_management（安装插件，默认端口：15672）
- 创建超级管理员权限：
  - rabbitmqctl add_user 名称 密码
  - rabbitmqctl set_user_tags 名称 administrator
  - rabbitmqctl set_permissions -p "/" 名称 " .* " " .* " " .* "
  - rabbitmqctl list_users（查看当前用户）






# Quick start

**引入相关依赖：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.xxx</groupId>
    <artifactId>RabbitMQ</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
            <version>5.8.0</version>
        </dependency>
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.6</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.10.1</version>
                <configuration>
                    <source>8</source>
                    <target>8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

**生产者代码：**

```java
public class Producer {
    public static final String QUEUE_NAME = "Hello";

    public static void main(String[] args) throws Exception {
        // 创建一个连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 工厂 ip，连接队列
        factory.setHost("xxx.xxx.xxx.xxx");

        // 设置用户名和密码
        factory.setUsername("xxx");
        factory.setPassword("xxx");

        // 创建连接，如果出现连接超时记得将服务器的 5672 端口打开
        Connection connection = factory.newConnection();
        // 获取信道
        Channel channel = connection.createChannel();

        /**
         * 生成一个队列，各个参数的含义：
         *  1.队列的名称
         *  2.队列中的消息是否持久化，默认情况是将消息存储在内存中
         *  3.该队列是否只供一个消费者进行消费，是否进行消息共享，false 代表只能一个消费者消费
         *  4.是否自动删除，最后一个消费者端开启连接之后，该队列是否自动删除，false 表示不自动删除
         *  5.其他参数
         */
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        // 发消息
        String message = "Hello World!";

        /**
         * 发送一个消息，参数的含义如下
         *  1.发送到那个交换机
         *  2.路由的 key 值是哪个，本次是队列的名称
         *  3.其他参数信息
         *  4.消息体，二进制形式
         */
        channel.basicPublish("", QUEUE_NAME, null, message.getBytes());

        System.out.println("消息发送完毕");
    }
}
```

**消费者代码：**

```java
public class Consumer {
    public static final String QUEUE_NAME = "Hello";

    public static void main(String[] args) throws Exception {
        // 创建连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        // 工厂 ip，连接队列
        factory.setHost("xxx.xxx.xxx.xxx");

        // 设置用户名和密码
        factory.setUsername("xxx");
        factory.setPassword("xxx");

        // 创建连接
        Connection connection = factory.newConnection();
        // 获取信道
        Channel channel = connection.createChannel();


        // 接收消息的回调
        DeliverCallback deliverCallback = (consumerTag, message) -> {
            System.out.println(new String(message.getBody()));
        };

        // 取消消息的回调
        CancelCallback cancelCallback = consumerTag -> {
            System.out.println("消费消息被中断");
        };

        /**
         * 消费者消费消息，参数的含义
         *  1.消费哪个队列
         *  2.消费成功之后是否要自动应答，true 代表自动应答
         *  3.消费者未成功消费的回调
         *  4.消费者取消消费的回调
         */
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, cancelCallback);
    }
}
```



# Work Queues

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



# RabbitMQ 持久化

- 保障当 RabbitMQ 服务停止以后生成者发过来的消息不丢失
- 默认情况下 RabbitMQ 退出或由于某种原因崩溃时，会忽视队列和消息
- 确保消息不会丢失需要做两件事：将队列和消息都标记为持久化



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



# 发布确认

- 发布确认是确保消息持久化过程中不丢失的重要环节，即在队列和消息设置持久化后，再设置发布确认即可保证数据持久化成功

- 发布确认是默认关闭的，开启需要调用 confirmSelect 方法，每当需要使用发布确认时都需要在 channel 上调用该方法

**1.单个确认发布：**

- 一种简单的同步确认发布方式，方法 waitForConfirmsOrDie() 只有在消息被确认后才会返回，如果在指定时间内没有被确认就会抛出异常
- 缺点是发布速度特别慢，因为没有确认发布的消息会阻塞后续的消息的发布，这种方法最多提供每秒不超过数百条发布消息的吞吐量

**2.批量确认发布：**

- 相比于单个确认稍快，可以提高吞吐量
- 但是当发生故障导致发布出现问题时，会不知道是那个消息出现了问题
- 必须把整个批量处理保存在内存中，记录重要的信息后重新发布消息
- 这种方法也是同步的，会阻塞消息的发布

**3.异步确认发布：**

- 编程逻辑上较为复杂，但是性价比最高，效率和可靠性较高
- 利用回调函数来达到消息的可靠传递

```java
/**
 * 发布确认模式
 *  1.单个确认发布：发布 1000 个单独确认消息，耗时：42600 ms、42154 ms
 *  2.批量确认：发布 1000 个批量确认消息，耗时：558 ms、526 ms
 *  3.异步批量确认：发布 1000 个异步确认消息，耗时：94 ms、99 ms
 * @author gzw
 */
public class ConfirmMessage {
    // 批量发送消息的个数
    public static final int MESSAGE_COUNT = 1000;

    public static void main(String[] args) throws Exception {
        // 单个确认
        // publishMessageIndividually();
        // 批量确认
        // publishMessageBatch();
        // 异步确认
        publishMessageAsync();
    }

    /**
     * 单个确认方法
     */
    public static void publishMessageIndividually() throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明队列
        String queueName = UUID.randomUUID().toString();
        channel.queueDeclare(queueName, false, false, false, null);
        // 开始发布确认
        channel.confirmSelect();

        // 开始的时间
        long begin = System.currentTimeMillis();

        // 批量发消息
        for (int i = 0; i < MESSAGE_COUNT; i++) {
            String message = String.valueOf(i);
            channel.basicPublish("", queueName, null, message.getBytes());
            // 单个确认
            boolean flag = channel.waitForConfirms();
            if (flag) {
                System.out.println("消息发送成功");
            }
        }

        // 结束的时间
        long end = System.currentTimeMillis();
        System.out.printf("发布 %d 个单独确认消息，耗时：%d ms", MESSAGE_COUNT, end - begin);
    }

    /**
     * 批量确认方法
     */
    public static void publishMessageBatch() throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明队列
        String queueName = UUID.randomUUID().toString();
        channel.queueDeclare(queueName, false, false, false, null);
        // 开始发布确认
        channel.confirmSelect();

        // 开始的时间
        long begin = System.currentTimeMillis();

        // 批量确认消息的大小
        int batchSize = 100;

        // 批量发消息
        for (int i = 0; i < MESSAGE_COUNT; i++) {
            String message = String.valueOf(i);
            channel.basicPublish("", queueName, null, message.getBytes());
            // 判断达到 100 条的时候批量确认一次
            if (i % batchSize == 0) {
                boolean flag = channel.waitForConfirms();
                if (flag) {
                    System.out.println("批量确认一次");
                }
            }
        }

        // 结束的时间
        long end = System.currentTimeMillis();
        System.out.printf("发布 %d 个批量确认消息，耗时：%d ms", MESSAGE_COUNT, end - begin);
    }

    /**
     * 异步确认方法
     */
    public static void publishMessageAsync() throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明队列
        String queueName = UUID.randomUUID().toString();
        channel.queueDeclare(queueName, false, false, false, null);
        // 开始发布确认
        channel.confirmSelect();

        /**
         * 线程安全有序的哈希表
         * 适用于高并发的情况
         *  1.可以轻松地将序号与消息进行关联
         *  2.可以轻松地删除条目
         *  3.支持多线程（高并发）
         */
        ConcurrentSkipListMap<Long, String> outstandingConfirms = new ConcurrentSkipListMap<>();

        // 开始的时间
        long begin = System.currentTimeMillis();

        // 发送消息成功的回调
        ConfirmCallback confirmCallback = (deliveryTag, multiple) -> {
            if (multiple) {
                System.out.printf("确认的消息：%s \n", deliveryTag);
                // 删除确认的信息，剩下的就是未确认的消息
                ConcurrentNavigableMap<Long, String> confirmed = outstandingConfirms.headMap(deliveryTag);
                confirmed.clear();
            } else {
                outstandingConfirms.remove(deliveryTag);
            }
        };
        // 发送消息失败的回调
        ConfirmCallback nackCallback = (deliveryTag, multiple) -> {
            // 打印未确认的信息
            String message = outstandingConfirms.get(deliveryTag);
            System.out.printf("未确认的消息：%s，tag 为：%s \n", message, deliveryTag);
        };

        // 消息监听器，监听那些消息成功或失败
        channel.addConfirmListener(confirmCallback, nackCallback);

        // 批量发消息
        for (int i = 0; i < MESSAGE_COUNT; i++) {
            String message = String.valueOf(i);
            channel.basicPublish("", queueName, null, message.getBytes());
            // 记录下要发送的全部信息
            outstandingConfirms.put(channel.getNextPublishSeqNo(), message);
        }

        // 结束的时间
        long end = System.currentTimeMillis();
        System.out.printf("发布 %d 个异步确认消息，耗时：%d ms", MESSAGE_COUNT, end - begin);
    }
}
```



# 交换机

- RabbitMQ 消息传递模型的核心思想：生产者产生的消息不会直接发送到队列，通常情况下，生成者不知道这些消息传递到了哪些队列中
- 生产者只能将消息发送到交换机中，不指定交换机会走默认交换机
- 交换机一方面接收来自生产者的消息，另一方面将它们推入队列
- 交换机必须确切知道如何处理受到的消息：是将这些消息放到特定队列、多个队列还是丢弃，这些由交换机的类型决定

- 交换机的类型：
  - 直接（direct）
  - 主题（topic）
  - 标题（headers）
  - 扇出（fanout，发布/订阅）

- binding 是交换机和队列之间的桥梁，它告诉我们和那个队列进行了绑定关系



## 1.Fanout（发布/订阅）

- 将接收到的所有消息广播到它知道的所有队列中

```java
/**
 * 生产者
 */
public class EmitLog {
    // 交换机的名称
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNext()) {
            String msg = scanner.next();
            channel.basicPublish(EXCHANGE_NAME, "", null, msg.getBytes(StandardCharsets.UTF_8));
        }
    }
}
```

```java
/**
 * 接收消息
 * 消费者
 */
public class ReceiveLogs01 {

    // 交换机的名称
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明一个交换机
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        /**
         * 生成一个临时队列，队列的名称是随机的
         * 当消费者断开于队列的连接时，队列自动删除
         */
        String queueName = channel.queueDeclare().getQueue();

        /**
         * 绑定交换机与队列
         */
        channel.queueBind(queueName, EXCHANGE_NAME, "");
        System.out.println("等待接收消息...");

        // 接收到消息的回调
        DeliverCallback deliverCallback = (deliveryTag, message) -> {
            System.out.printf("ReceiveLogs01 接收到消息：%s\n", new String(message.getBody(), StandardCharsets.UTF_8));
        };

        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```



## 2.Direct

- 消息只会发送到绑定了 routingKey 的队列中

- 支持多重绑定，这种情况下和扇出交换机类似

```java
/**
 * 生产者
 */
public class EmitLogDirect {
    // 交换机的名称
    public static final String EXCHANGE_NAME = "direct_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        Scanner scanner = new Scanner(System.in);

        while (scanner.hasNext()) {
            String msg = scanner.next();
            channel.basicPublish(EXCHANGE_NAME, "info", null, msg.getBytes(StandardCharsets.UTF_8));
        }
    }
}
```

```java
/**
 * 接收消息
 * 消费者
 */
public class ReceiveLogsDirect01 {

    // 交换机的名称
    public static final String EXCHANGE_NAME = "direct_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明一个交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);

        String queueName = "console";

        // 声明一个队列
        channel.queueDeclare(queueName, false, false, false, null);

        /**
         * 绑定交换机与队列
         */
        channel.queueBind(queueName, EXCHANGE_NAME, "info");
        channel.queueBind(queueName, EXCHANGE_NAME, "warning");
        System.out.println("等待接收消息...");

        // 接收到消息的回调
        DeliverCallback deliverCallback = (deliveryTag, message) -> {
            System.out.printf("ReceiveLogsDirect01 接收到消息：%s\n", new String(message.getBody(), StandardCharsets.UTF_8));
        };

        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}
```



## 3.Topic

- 使用 direct 交换机能改善系统，但是当消息类型有 info.base 和 info.advantage 等，而某个队列只想要 info.base 的消息时，direct 就办不到，这时候需要使用 topic 交换机
- 发送到 topic 交换机的 routingKey 必须满足一定要求：必须是一个单词列表，以点号分隔开，如：quick.orange.rabbit（最长不超过 255 个字节）

- 在这个规则列表中，其中有两个替换符是需要注意的：
  - 星号（*）可以代替一个单词，如：(\*.orange.\*) 匹配中间带 orange 的三个单词的字符串
  - 井号（#）可以代替零个或者多个单词，如：(lazy.#) 匹配第一个单词是 lazy 的多个单词
- 当一个队列绑定的键是 # 时，这个队列接收所有的消息，这时类似 fanout
- 如果队列绑定的键中没有 # 和 * 出现，那么该队列绑定的类型就是 direct

```java
/**
 * 接收消息
 * 消费者
 */
public class ReceiveLogsTopic01 {

    // 交换机的名称
    public static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明一个交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.TOPIC);

        String queueName = "topic_1";

        // 声明一个队列
        channel.queueDeclare(queueName, false, false, false, null);

        /**
         * 绑定交换机与队列
         */
        channel.queueBind(queueName, EXCHANGE_NAME, "*.orange.*");
        System.out.println("等待接收消息...");

        // 接收到消息的回调
        DeliverCallback deliverCallback = (deliveryTag, message) -> {
            System.out.printf("ReceiveLogsTopic01 接收到消息：%s\n", new String(message.getBody(), StandardCharsets.UTF_8));
        };

        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
    }
}

// ReceiveLogsTopic02 只需修改 channel.queueBind() 的内容
channel.queueBind(queueName, EXCHANGE_NAME, "*.*.rabbit");
channel.queueBind(queueName, EXCHANGE_NAME, "lazy.#");
```

```java
/**
 * 生产者
 */
public class EmitLogTopic {
    // 交换机的名称
    public static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.TOPIC);

        // map 绑定交换机
        Map<String, String> bindingKeyMap = new Hashtable<>();
        bindingKeyMap.put("quick.orange.rabbit", "被第 1、2个队列接收到");
        bindingKeyMap.put("quick.orange.fox", "被第 1 个队列接收到");
        bindingKeyMap.put("lazy.orange.rabbit.fox", "被第 2 个队列接收到");

        for (Map.Entry<String, String> bindingKeyEntry : bindingKeyMap.entrySet()) {
            String routingKey = bindingKeyEntry.getKey();
            String message = bindingKeyEntry.getValue();
            channel.basicPublish(EXCHANGE_NAME, routingKey, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.printf("生产者发出消息：%s\n", message);
        }
    }
}
```



# 死信队列

- 死信：无法被消费的消息，即由于某些特定的原因导致 queue 中的某些消息无法被消费，这些消息如果没有后续的处理，就变成了死信
- 有死信自然有死信队列，应用场景：为了保证订单业务的数据不丢失，需要使用到死信队列机制，即当消息发生异常情况时，将消息投入死信队列中。如用户在商城下单成功并点击支付后未在一定时间内支付，此时可以让其自动失效

- 死信的来源：
  - 消息 TTL 过期
  - 队列达到了最大长度（无法再添加数据到队列中）
  - 消息被拒绝并且 requeue = false

```java
/**
 * 死信队列
 * 生产者
 */
public class Producer {
    // 生产者只需要知道普通交换机
    public static final String NORMAL_EXCHANGE = "normal_exchange";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        // 死信消息，设置 TTL 时间
        AMQP.BasicProperties properties = new AMQP.BasicProperties().builder().expiration("10000").build();

        for (int i = 0; i < 10; i++) {
            String message = String.format("info：%d", i + 1);
            channel.basicPublish(NORMAL_EXCHANGE, "normal-routing", properties, message.getBytes());
        }
    }
}
```

```java
/**
 * 死信队列
 * 普通消费者
 * 当发生以下情况时，消息进入死信队列：
 *  1.消息被拒绝
 *  2.消息 TTL 过期
 *  3.队列达到最大长度
 */
public class Consumer01 {
    // 普通交换机的名称
    public static final String NORMAL_EXCHANGE = "normal_exchange";

    // 死信交换机的名称
    public static final String DEAD_EXCHANGE = "dead_exchange";

    // 普通队列的名称
    public static final String NORMAL_QUEUE = "normal_queue";

    // 死信队列的名称
    public static final String DEAD_QUEUE = "dead_queue";


    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        Map<String, Object> arguments = new Hashtable<>();
        // 设置过期时间，也可以不设置，因为一般是由生产者设置的
        // arguments.put("x-message-ttl", 100000);
        // 正常队列设置死信交换机
        arguments.put("x-dead-letter-exchange", DEAD_EXCHANGE);
        // 设置死信的 RoutingKey
        arguments.put("x-dead-letter-routing-key", "dead-routing");
        // 设置正常队列的长度的限制
        arguments.put("x-max-length", 6);

        // 声明死信和普通交换机，类型为 direct
        channel.exchangeDeclare(NORMAL_EXCHANGE, BuiltinExchangeType.DIRECT);
        channel.exchangeDeclare(DEAD_EXCHANGE, BuiltinExchangeType.DIRECT);

        // 声明普通队列，记得加上上面设置的参数
        channel.queueDeclare(NORMAL_QUEUE, false, false, false, arguments);

        // 声明死信队列
        channel.queueDeclare(DEAD_QUEUE, false, false, false, null);

        // 绑定普通的交换机和队列
        channel.queueBind(NORMAL_QUEUE, NORMAL_EXCHANGE, "normal-routing");

        // 绑定死信的交换机和队列
        channel.queueBind(DEAD_QUEUE, DEAD_EXCHANGE, "dead-routing");

        DeliverCallback deliverCallback = (consumerTag, message) -> {
            String msg = new String(message.getBody(), StandardCharsets.UTF_8);
            // 模拟消息被拒绝
            if (msg.equals("info：5")) {
                System.out.println("拒绝消息");
                channel.basicReject(message.getEnvelope().getDeliveryTag(), false);
            } else {
                System.out.printf("Consumer01 接收的消息是：%s\n", msg);
                channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
            }
        };

        // 记得开启手动应答，否则无法决绝消息
        channel.basicConsume(NORMAL_QUEUE, false, deliverCallback, consumerTag -> {});
    }
}
```

```
/**
 * 死信队列
 * 死信消费者
 */
public class Consumer02 {
    // 死信队列的名称
    public static final String DEAD_QUEUE = "dead_queue";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        DeliverCallback deliverCallback = (consumerTag, message) -> {
            System.out.printf("Consumer01 接收的消息是：%s\n", new String(message.getBody(), StandardCharsets.UTF_8));
        };

        channel.basicConsume(DEAD_QUEUE, true, deliverCallback, consumerTag -> {});
    }
}
```



# 延迟队列

- 延迟队列内部是有序的，最重要的特性就体现在延迟属性上
- 延迟队列就是用来存放需要在指定时间被处理的元素的队列
- 延迟队列的使用场景：
  - 订单在十分钟之内为支付则自动取消
  - 新创建的店铺，如果在十天内都没有上传过商品，则自动发消息提醒
  - 用户注册成功后，如果三天内没有登录则进行短信提醒
  - 用户发起退款，如果大田内没有得到处理的消息则通知相关的运营人员
  - 预定会议后，需要在预定的时间点前十分钟通知各个与会人员参加会议



## 1.简单案例

**死信队列实现延迟队列：**

- 配置类

```java
/**
 * 具有过期时间的队列
 */
@Configuration
public class TtlQueueConfig {
    /**
     * 普通交换机的名称
     */
    public static final String X_EXCHANGE = "X";

    /**
     * 死信交换机的名称
     */
    public static final String Y_DEAD_LETTER_EXCHANGE = "Y";

    /**
     * 普通队列的名称
     */
    public static final String QUEUE_A = "QA";
    public static final String QUEUE_B = "QB";
    public static final String QUEUE_C = "QC";

    /**
     * 死信队列的名称
     */
    public static final String DEAD_QUEUE = "QD";

    /**
     * 声明普通交换机 xExchange
     */
    @Bean("xExchange")
    public DirectExchange xExchange() {
        return new DirectExchange(X_EXCHANGE);
    }

    /**
     * 声明死信交换机 yExchange
     */
    @Bean("yExchange")
    public DirectExchange yExchange() {
        return new DirectExchange(Y_DEAD_LETTER_EXCHANGE);
    }

    /**
     * 声明普通队列 queueA，TTL 为 10s
     */
    @Bean("queueA")
    public Queue queueA() {
        final int TTL = 10000;
        Map<String, Object> arguments = new HashMap<>(3);
        arguments.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
        arguments.put("x-dead-letter-routing-key", "YD");
        arguments.put("x-message-ttl", TTL);
        return QueueBuilder.durable(QUEUE_A).withArguments(arguments).build();
    }

    /**
     * 声明普通队列 queueB，TTL 为 40s
     */
    @Bean("queueB")
    public Queue queueB() {
        final int TTL = 40000;
        Map<String, Object> arguments = new HashMap<>(3);
        arguments.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
        arguments.put("x-dead-letter-routing-key", "YD");
        arguments.put("x-message-ttl", TTL);
        return QueueBuilder.durable(QUEUE_B).withArguments(arguments).build();
    }

    /**
     * 声明普通队列 queueC，适用于任何延迟的队列，不需要设置延迟
     */
    @Bean("queueC")
    public Queue queueC() {
        Map<String, Object> arguments = new HashMap<>(3);
        arguments.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
        arguments.put("x-dead-letter-routing-key", "YD");
        return QueueBuilder.durable(QUEUE_C).withArguments(arguments).build();
    }

    /**
     * 声明死信队列 queueD
     */
    @Bean("queueD")
    public Queue queueD() {
        return QueueBuilder.durable(DEAD_QUEUE).build();
    }

    /**
     * 绑定 queueA 与 xExchange
     */
    @Bean
    public Binding queueABindingX(@Qualifier("queueA") Queue queueA,
                                  @Qualifier("xExchange") DirectExchange xExchange) {
        return BindingBuilder.bind(queueA).to(xExchange).with("XA");
    }

    /**
     * 绑定 queueB 与 xExchange
     */
    @Bean
    public Binding queueBBindingX(@Qualifier("queueB") Queue queueB,
                                  @Qualifier("xExchange") DirectExchange xExchange) {
        return BindingBuilder.bind(queueB).to(xExchange).with("XB");
    }

    /**
     * 绑定 queueB 与 xExchange
     */
    @Bean
    public Binding queueCBindingX(@Qualifier("queueC") Queue queueC,
                                  @Qualifier("xExchange") DirectExchange xExchange) {
        return BindingBuilder.bind(queueC).to(xExchange).with("XC");
    }

    /**
     * 绑定 queueD 与 yExchange
     */
    @Bean
    public Binding queueDBindingY(@Qualifier("queueD") Queue queueD,
                                  @Qualifier("yExchange") DirectExchange yExchange) {
        return BindingBuilder.bind(queueD).to(yExchange).with("YD");
    }
}
```

- 消费者

```java
/**
 * TTL 队列
 * 消费者
 */
@Slf4j
@Component
public class DeadLetterQueueConsumer {
    @RabbitListener(queues = "QD")
    public void receiveD(Message message, Channel channel) {
        String msg = new String(message.getBody());
        log.info("当前时间: {}，收到死信队列的消息: {}", new Date().toString(), msg);
    }
}
```

- 生产者（简单案例直接用 Controller）

```java
/**
 * 发送延迟消息
 */
@RestController
@RequestMapping("/ttl")
public class SendMessageController {
    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    RabbitTemplate rabbitTemplate;

    @GetMapping("sendMsg/{message}")
    public void sendMessage(@PathVariable String message) {
        logger.info("当前时间: {}，发送一条消息给两个 TTL 队列: {}", new Date().toString(), message);
        rabbitTemplate.convertAndSend("X", "XA", String.format("消息来自 TTL 为 10s 的队列：", message));
        rabbitTemplate.convertAndSend("X", "XB", String.format("消息来自 TTL 为 40s 的队列：", message));
    }

    @GetMapping("/sendExpirationMsg/{message}/{ttl}")
    public void sendMessage(@PathVariable String message, @PathVariable String ttl) {
        logger.info("当前时间: {}，发送一条延迟 {} ms 的消息给队列 QC: {}", new Date().toString(), ttl, message);
            rabbitTemplate.convertAndSend("X", "XC", message, msg -> {
            msg.getMessageProperties().setExpiration(ttl);
            return msg;
        });
    }
}
```



## 2.简单案例的问题

**使用死信队列做延迟队列时：**

- 即在消息属性上设置 TTL，消息并不会按时死亡
- 因为 RabbitMQ 只会检查第一个消息是否过期，如果过期则进入死信队列
- 如果第一个消息的延时时间很长而第二个消息的延迟时间很短，那么第二个消息也不会优先得到执行
- 需要安装 rabbitmq_delayed_message_exchange 插件解决（[Github 下载](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases)），安装好后延时是在交换机延时的（原本是在队列中延时）
  - 将下载后的 .ez 文件上传至 /usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8/plugins
  - 使用 `rabbitmq-plugins enable rabbitmq_delayed_message_exchange` 安装插件
  - 使用 `systemctl restart rabbitmq-server` 重启
  - 成功后可以在新建交换机处看到延迟交换机的选项



## 3.改进案例

- 配置类

```java
/**
 * 延时交换机的配置类
 */
@Configuration
public class DelayedQueueConfig {
    // 队列
    public static final String DELAYED_QUEUE_NAME = "delayed.queue";

    // 交换机
    public static final String DELAYED_EXCHANGE_NAME = "delayed.exchange";

    // routing key
    public static final String DELAYED_ROUTING_KEY = "delayed.routingkey";

    @Bean
    public Queue delayedQueue() {
        return new Queue(DELAYED_QUEUE_NAME);
    }

    @Bean
    public CustomExchange delayedExchange() {
        Map<String, Object> arguments = new HashMap<>(1);
        arguments.put("x-delayed-type", "direct");
        /**
         * 1.交换机的名称
         * 2.交换机的类型
         * 3.是否需要持久化
         * 4.是否需要自动删除
         * 5.其他参数
         */
        return new CustomExchange(DELAYED_EXCHANGE_NAME, "x-delayed-message", true, false, arguments);
    }

    @Bean
    public Binding delayedQueueBindingDelayedExchange(@Qualifier("delayedQueue") Queue delayedQueue,
                                                      @Qualifier("delayedExchange") CustomExchange delayedExchange) {
        return BindingBuilder.bind(delayedQueue).to(delayedExchange).with(DELAYED_ROUTING_KEY).noargs();
    }
}
```

- 消费者

```java
@Slf4j
@Component
public class DelayedQueueConsumer {
    @RabbitListener(queues = DelayedQueueConfig.DELAYED_QUEUE_NAME)
    public void receiveDelayQueue(Message message) {
        String msg = new String(message.getBody());
        log.info("当前时间: {}，收到延迟队列的消息: {}", new Date().toString(), msg);
    }
}
```

- 生产者

```java
/**
 * 发送延迟消息
 */
@RestController
@RequestMapping("/ttl")
public class SendMessageController {
    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    RabbitTemplate rabbitTemplate;

    @GetMapping("/sendDelayedMsg/{message}/{delay}")
    public void sendDelayMessage(@PathVariable String message, @PathVariable Integer delay) {
        logger.info("当前时间: {}，发送一条延迟 {} ms 的消息给延迟队列（由交换机延时）: {}", new Date().toString(), delay, message);
        rabbitTemplate.convertAndSend(DelayedQueueConfig.DELAYED_EXCHANGE_NAME, 
                                      DelayedQueueConfig.DELAYED_ROUTING_KEY, message, msg -> {
            msg.getMessageProperties().setDelay(delay);
            return msg;
        });
    }
}
```



## 4.小结

- 使用 RabbitMQ 实现延迟队列可以很好例如其特性，如：
  - 消息可靠发送
  - 消息可靠投递
  - 死信队列保障消息至少被消费一次
  - 未被正确处理的消息不会被丢弃
  - 还可以通过集群的特性解决单点故障问题，避免单个节点挂掉导致延时队列不可用或者消息丢失
- 延时队列还可以使用：
  -  Java 的 DelayedQueue
  - Redis 的 zset
  - Quartz
  - Kafka 的时间轮



# 发布确认（高级）

- 在生产环境中由于一些不明原因导致 RabbitMQ 重启，在重启期间生产者消息投递失败，导致数据丢失时，需要手动处理和恢复
- 在极端情况下，还有可能出现 RabbitMQ 集群不可用
- 加入缓存，定时任务对未成功发送的消息进行重新投递，解决交换机无法使用的情况



## 1.简单案例

**在配置文件中加入：**

```properties
# none：禁用发布确认模式，为默认值
# correlated：发布消息成功到交换器后触发回调方法
# simple：两种效果：一是和 correlated 一样会触发回调方法；二是在发布消息成功后使用 rabbitTemplate 调用 waitForConfirms 或 waitForConfirmsOrDie 方法等待 broke 节点返回发送结果，根据返回结果来判定下一步的逻辑；需要注意的是 waitForConfirmsOrDie 返回 false 时会关闭 channel，之后会无法发送消息到 broke
spring.rabbitmq.publisher-confirm-type=correlated
```

**配置类：**

```java
@Configuration
public class ConfirmConfig {
    // 队列
    public static final String CONFIRM_QUEUE_NAME = "confirm_queue";

    // 交换机
    public static final String CONFIRM_EXCHANGE_NAME = "confirm_exchange";

    // routing key
    public static final String CONFIRM_ROUTING_KEY = "confirm_routingkey";

    @Bean
    public DirectExchange confirmExchange() {
        return new DirectExchange(CONFIRM_EXCHANGE_NAME);
    }

    @Bean
    public Queue confirmQueue() {
        return QueueBuilder.durable(CONFIRM_QUEUE_NAME).build();
    }

    @Bean
    public Binding queueBindingExchange(@Qualifier("confirmQueue") Queue confirmQueue,
                                        @Qualifier("confirmExchange") DirectExchange confirmExchange) {
        return BindingBuilder.bind(confirmQueue).to(confirmExchange).with(CONFIRM_ROUTING_KEY);
    }
}
```

**处理异常情况的回调配置类：**

```java
@Slf4j
@Configuration
public class MyCallBack implements RabbitTemplate.ConfirmCallback {

    /**
     * 注入
     */
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init() {
        rabbitTemplate.setConfirmCallback(this);
    }

    /**
     * 交换机确认回调的方法
     * 1.发消息：交换机接收到了：
     *  - correlationData 保存回调消息的 ID 及相关信息
     *  - 交换机接收到消息 ack = true
     *  - cause null
     * 2.发消息：交换机接收失败了：
     *  - correlationData 保存回调消息的 ID 及相关信息
     *  - 交换机接收到消息 ack = false
     *  - cause 失败的原因
     * @param correlationData 保存回调消息的 ID 及相关信息
     * @param ack ack
     * @param cause cause
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        String id = correlationData != null ? correlationData.getId() : "";
        if (ack) {
            log.info("交换机已经收到 ID 为：{} 的消息", id);
        } else {
            log.info("交换机还未受到 ID 为：{} 的消息，原因：{}", id, cause);
        }
    }
}
```

**生产者：**

```java
@Slf4j
@RestController
@RequestMapping("/confirm")
public class ProducerController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("/sendMsg/{message}")
    public void sentMessage(@PathVariable String message) {
        CorrelationData correlationData1 = new CorrelationData("1");
        rabbitTemplate.convertAndSend(ConfirmConfig.CONFIRM_EXCHANGE_NAME, ConfirmConfig.CONFIRM_ROUTING_KEY, message, correlationData1);
        log.info("发送的消息内容为：{}", message + "(key-1)");

        /**
         * 当交换机找不到时会报错会触发回调
         * 但是当 routing key 找不到时不会触发回调，此时交换机能接收到消息，但是队列不能受到
         */
        CorrelationData correlationData2 = new CorrelationData("2");
        rabbitTemplate.convertAndSend(ConfirmConfig.CONFIRM_EXCHANGE_NAME, ConfirmConfig.CONFIRM_ROUTING_KEY + "(test)", message, correlationData2);
        log.info("发送的消息内容为：{}", message + "(key-2)");
    }
}
```

**消费者：**

```java
@Slf4j
@Component
public class Consumer {
    @RabbitListener(queues = ConfirmConfig.CONFIRM_QUEUE_NAME)
    public void receiveConfirmMessage(Message message) {
        String msg = new String(message.getBody());
        log.info("接收到队列 confirm_queue 的消息：{}", msg);
    }
}
```



## 2.问题

- 在仅开启生产确认机制的情况下，交换机接收到消息后，会直接给消息生产者发送确认消息
- 如果发现该消息不可路由（就是上面 key-2 的情况），消息会被直接丢弃，此时生产者是不知道消息被丢失这个事件的
- 解决方案：设置 mandatory 参数，当消息传递过程中不可达时将消息返回给生产者



## 3.改善

**在配置文件中加入：**

```properties
// 开启消息回退
spring.rabbitmq.publisher-returns=true
```

**修改处理异常情况的回调配置类：**

```java
@Slf4j
@Configuration
public class MyCallBack implements RabbitTemplate.ConfirmCallback, RabbitTemplate.ReturnCallback {

    /**
     * 注入
     */
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init() {
        rabbitTemplate.setConfirmCallback(this);
        rabbitTemplate.setReturnCallback(this);
    }

    /**
     * 交换机确认回调的方法
     * 1.发消息：交换机接收到了：
     *  - correlationData 保存回调消息的 ID 及相关信息
     *  - 交换机接收到消息 ack = true
     *  - cause null
     * 2.发消息：交换机接收失败了：
     *  - correlationData 保存回调消息的 ID 及相关信息
     *  - 交换机接收到消息 ack = false
     *  - cause 失败的原因
     * @param correlationData 保存回调消息的 ID 及相关信息
     * @param ack ack
     * @param cause cause
     */
    @Override
    public void confirm(CorrelationData correlationData, boolean ack, String cause) {
        String id = correlationData != null ? correlationData.getId() : "";
        if (ack) {
            log.info("交换机已经收到 ID 为：{} 的消息", id);
        } else {
            log.info("交换机还未受到 ID 为：{} 的消息，原因：{}", id, cause);
        }
    }

    @Override
    public void returnedMessage(Message message, int replyCode, String replyText, String exchange, String routingKey) {
        log.error("消息：{}，被交换机：{} 退回，退回原因：{}，路由 key：{}", new String(message.getBody()), exchange, replyText, routingKey);
    }
}
```



## 4.备份与报警交换机

**修改发布确认配置类：**

```java
/**
 * 发布确认（高级）配置类
 */
@Configuration
public class ConfirmConfig {
    // 队列
    public static final String CONFIRM_QUEUE_NAME = "confirm_queue";

    // 交换机
    public static final String CONFIRM_EXCHANGE_NAME = "confirm_exchange";

    // routing key
    public static final String CONFIRM_ROUTING_KEY = "confirm_routingkey";

    // 备份队列
    public static final String BACKUP_QUEUE_NAME = "backup_queue";

    // 备份交换机
    public static final String BACKUP_EXCHANGE_NAME = "backup_exchange";

    // 报警队列
    public static final String WARNING_QUEUE_NAME = "warning_queue";

    @Bean
    public DirectExchange confirmExchange() {
        // 备份到备份交换机
        return ExchangeBuilder
                .directExchange(CONFIRM_EXCHANGE_NAME)
                .durable(true)
                .withArgument("alternate-exchange", BACKUP_EXCHANGE_NAME)
                .build();
    }

    @Bean
    public Queue confirmQueue() {
        return QueueBuilder.durable(CONFIRM_QUEUE_NAME).build();
    }

    @Bean
    public Binding queueBindingExchange(@Qualifier("confirmQueue") Queue confirmQueue,
                                        @Qualifier("confirmExchange") DirectExchange confirmExchange) {
        return BindingBuilder.bind(confirmQueue).to(confirmExchange).with(CONFIRM_ROUTING_KEY);
    }

    /**
     * 备份交换机和警告交换机
     */
    @Bean
    public FanoutExchange backupExchange() {
        return new FanoutExchange(BACKUP_EXCHANGE_NAME);
    }

    @Bean
    public Queue backupQueue() {
        return QueueBuilder.durable(BACKUP_QUEUE_NAME).build();
    }

    @Bean
    public Queue warningQueue() {
        return QueueBuilder.durable(WARNING_QUEUE_NAME).build();
    }

    @Bean
    public Binding backupQueueBindingExchange(@Qualifier("backupQueue") Queue backupQueue,
                                              @Qualifier("backupExchange") FanoutExchange backupExchange) {
        return BindingBuilder.bind(backupQueue).to(backupExchange);
    }

    @Bean
    public Binding warningQueueBindingExchange(@Qualifier("warningQueue") Queue warningQueue,
                                              @Qualifier("backupExchange") FanoutExchange backupExchange) {
        return BindingBuilder.bind(warningQueue).to(backupExchange);
    }
}
```

**备份消费者和警告消费者：**

```java
/**
 * 发布确认（高级）
 * 备份，消费者
 */
@Slf4j
@Component
public class BackupConsumer {
    @RabbitListener(queues = ConfirmConfig.BACKUP_QUEUE_NAME)
    public void receiveWarningMsg(Message message) {
        String msg = new String(message.getBody());
        log.info("备份消息：{}", msg);
    }
}

/**
 * 发布确认（高级）
 * 报警，消费者
 */
@Slf4j
@Component
public class WarningConsumer {
    @RabbitListener(queues = ConfirmConfig.WARNING_QUEUE_NAME)
    public void receiveWarningMsg(Message message) {
        String msg = new String(message.getBody());
        log.error("警告，发现不可路由的消息：{}", msg);
    }
}
```



# 幂等性问题

- 用户对同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生副作用
- 消息重复消费：消费者在消费 MQ 中的消息时，MQ 已经把消息发送给消费者，消费者在给 MQ 返回 ack 时网络中断，此时 MQ 未受到确认信息，该消息会重新发给其他消费者，或者在网络重连后再次发送给该消费者，但是实际上该消费者已经成功消费了该消息，这就会造成重复消费消息
- 解决方案：一般使用全局 ID 或写一个唯一标识，比如时间戳、UUID；消费者消费消息时也可以利用 id，在每次消费前都判断一次是否已经消费过
- 消费端的幂等性保障：在业务高峰期，生产端可能有重复消息，这时消费端就需要实现幂等性，这意味着消息不会被消费多次；主流的幂等性操作有两种：
  - 唯一 ID + 指纹码机制，利用数据库逐渐去重。这里的指纹码是指：一些规则或者时间戳加背的服务给到的唯一信息码，不一定是系统生成的，基本都是由业务规则拼接而来的，但是一定要保证唯一性；之后使用查询语句判断这个 ID 是否存在于数据库中。优势是实现简单（拼接即可），劣势就是高并发时数据库压力会很高
  - 利用 Redis 的原子性实现：执行 setnx 命令，天然具有幂等性（推荐）



# 优先级队列

- 在【订单催付】场景中，订单会推送给用户，，如果用户在设定的时间内未付款那么就会给用户推送一天短信提醒
- 但是当用户量上来后需要区分大客户和小客户，大客户的订单需要优先处理
- 可以使用 Redis 定时轮询，用 List 做一个简单的消息队列，但是这样并不能实现优先级
- 当订单量上去后，可以使用 RabbitMQ 进行改造和优化，当发现是大客户时给一个相对较高的优先级，否则使用默认优先级

```java
public class Producer {
    private static final String QUEUE_NAME = "hello";
    public static void main(String[] args) throws Exception {
        try (Channel channel = RabbitMqUtils.getChannel();) {
            // 给消息赋予一个 priority 属性
            AMQP.BasicProperties properties = new AMQP.BasicProperties().builder().priority(5).build();
            // 设置优先级
            Map<String, Object> arguments = new HashMap<>();
            arguments.put("x-max-priority", 10);
            channel.queueDeclare(QUEUE_NAME, true, false, false, arguments);
            for (int i = 1; i < 11; i++) {
                String message = String.format("info: %s", i);
                if (i == 5) {
                    channel.basicPublish("", QUEUE_NAME, properties, message.getBytes());
                } else {
                    channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
                }
                System.out.printf("发送消息完成: %s\n", message);
            }
        }
    }
}
```

```java
public class Consumer {
    private static final String QUEUE_NAME = "hello";
    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 设置队列的最大优先级 最大可以设置到 255 官网推荐 1-10 如果设置太高比较吃内存和 CPU
        Map<String, Object> params = new HashMap();
        params.put("x-max-priority", 10);
        channel.queueDeclare(QUEUE_NAME, true, false, false, params);
        System.out.println("消费者启动等待消费..............");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String receivedMessage = new String(delivery.getBody());
            System.out.printf("接收到消息: %s\n", receivedMessage);
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, (consumerTag) -> {
            System.out.println("消费者无法消费消息时调用，如队列被删除");
        });
    }
}
```



# 惰性队列

- 队列具备两种模式：default 和 lazy。默认的为 default 模式。可以通过调用 channel.queueDeclare 方法的时候在参数中设置，也可以通过 Policy 的方式设置，如果一个队列同时使用这两种方式设置的话，那么 Policy 的方式具备更高的优先级
- 消息保存在内存中还是磁盘上：正常情况下，消息是保存在内存中的；惰性队列消息是保存在磁盘中的，在消费者消费相应信息时才会被加载到内存中
- 惰性队列一个重要的设计目标就是能够支持更长的队列，即支持更多的消息存储
- 当消费者由于各种各样的原因宕机而导致长时间不能消费消息时，惰性队列就很有必要
- 注：RabbitMQ 将内存中的消息写入磁盘中时，这个操作会耗费较长的时间，也会阻塞队列的操作，进而无法接收到新的消息；虽然一直有优化此问题，但是当消息量特别大时效果还是不太理想

```java
// 声明惰性队列
Map<String, Object> args = new HashMap<String, Object>();
args.put("x-queue-mode", "lazy");
channel.queueDeclare("myqueue", false, false, false, args);
```



# 集群（后续更新）

