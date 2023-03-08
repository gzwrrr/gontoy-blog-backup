---
notPage: true
---



# RabbitMQ

:::info 说明

本文章为学习 RabbitMQ 的笔记，根据视频教程记录：[尚硅谷 RabbitMQ 教程](https://www.bilibili.com/video/BV1cb4y1o7zz?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0)

:::


[[toc]]


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

![分布式系统消息中间件——RabbitMQ的使用基础篇 -架构](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//rabbitmq/20230308/RabbitMQ%E6%9E%B6%E6%9E%84%E5%9B%BE.png)

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





## 7.Quick start

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

