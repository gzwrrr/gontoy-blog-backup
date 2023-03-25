---
notPage: true
---



# RabbitMQ

:::info 说明

本文章为学习 RabbitMQ 的笔记，根据视频教程记录：[尚硅谷 RabbitMQ 教程](https://www.bilibili.com/video/BV1cb4y1o7zz?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0)

:::





[[toc]]



## 什么是 MQ？

**概要：**

- 本质是队列
- FIFO：先入先出，队列中存放的内容是 message，是一种跨进程的通信机制，用于上下游传递信息
- MQ 是一种非常常见的上下游【逻辑解耦】与【物理解耦】的消息通信服务
- 使用 MQ 之后，消息发送上游只需要依赖 MQ，不需要依赖其他服务





## MQ 的分类

- ActiveMQ：
  - Java 语言实现，现在使用较少，JMS 规范，支持 XA 协议，没有在生产上大规模使用
  - 优点：单机吞吐量万级，时效性 ms 级别，可用性高，基于主从架构实现高可用，较低概率丢失数据
  - 缺点：官方社区维护越来越少，高吞吐量场景较少使用
- Kafka：
  - Scala 语言实现，高性能高可用，适合处理大数据，吞吐量单机百万
  - 大数据领域的绕不开的消息传输工具，百万级的 TPS（系统的吞吐量）
  - 优点：性能卓越，最大优点就是吞吐量高；分布式高可用；能保证消息仅被消费一次；有第三方管理界面（Kafka-Manager）；日志领域比较成熟，再大数据领域的实时计算以及日志采集中被大规模使用
  - 缺点：Kafka 单机超过 64 个队列/分区，Load 会发生明显的飙高显效，队列越多 Load 越高，发送消息相应时间变长；使用短轮询方式，实时性取决于轮询间隔时间；消费失败不支持重试；支持消息顺序，但那时一台代理宕机后，会产生消息乱序；社区更新较慢
- RocketMQ：
  - Java 语言开发，参考 Kafaka 设计，吞吐量单机十万
  - 阿里巴巴的开源产品，使用 Java 实现，在设计时参考了 Kafka，并做出了一定的优化
  - 优点：单机吞吐量 十万级，分布式高可用；消息可以做到 0 丢失，MQ 的功能较为完善；支持 10 亿级别的消息堆积，不会因为堆积导致性能下降
  - 缺点：支持的客户端语言不多，目前只支持 Java 和 C++；社区活跃度一般；没有在 MQ 核心中实现  JMS 等接口，有些系统如果要迁移需要修改大量代码
- RabbitMQ：
  - Erlang 语言开发，性能好，高并发，吞吐量单机万级
  - 在 AMQP（高级消息队列协议）基础上完成的，可复用的企业消息系统，时当前最主流的消息中间件之一
  - 优点：由于 erlang 语言的高并发特性，性能较好；吞吐量达到万级；MQ 的功能较为完备、健壮、稳定、易用、跨平台、支持多种语言、支持 AJAX、文档齐全；开源的管理界面好用、社区活跃度高、更新频率高
  - 缺点：商业版需要收费，学习成本较高

<br/>



**比较：**

Kafka、RabbitMQ和RocketMQ是三个主流的消息队列中间件，在单机吞吐量上有一定的差异，造成差异的原因主要有以下几个方面：

1. 底层架构设计：Kafka是采用分布式的、基于磁盘的存储方式，利用零拷贝技术提高吞吐量；RabbitMQ和RocketMQ都是采用基于内存的存储方式，适合低延迟和高吞吐量的场景。
2. 消息持久化机制：Kafka的消息持久化采用顺序写磁盘的方式，可以在高负载情况下提供更高的性能；RabbitMQ和RocketMQ都采用了内存缓存和磁盘持久化相结合的方式。
3. 网络传输协议：Kafka采用的是自定义的二进制协议，RabbitMQ和RocketMQ采用的是AMQP和自定义的协议，各自在传输效率和兼容性上有所差异。
4. 数据处理能力：Kafka具有非常强的批量处理和数据分片的能力，适合于大规模的数据处理；RabbitMQ和RocketMQ则更加适合高吞吐量的消息传输和处理。

<br/>



**主要使用场景：**

- Kafka：适用于高吞吐量的数据处理场景，例如日志处理、流式处理、事件处理等。Kafka 具有高效的消息处理机制和可靠的数据传输能力，并且可以在多个节点之间水平扩展，具有高可用性和容错性。
- RabbitMQ：适用于高可靠性和灵活性的应用程序场景，例如消息队列和任务队列等。RabbitMQ 提供了多种消息传递模式，例如工作队列、发布/订阅、路由、主题等，具有可靠的消息传递能力和高度的灵活性。
- RocketMQ：适用于大规模分布式应用场景，例如电子商务、金融等领域。RocketMQ 具有高度的可靠性、可扩展性和高吞吐量，支持多租户、延迟消息、定时消息等特性，非常适合构建大规模分布式应用。



## RabbitMQ

:::note RabbitMQ

RabbitMQ是一个开源的消息中间件，用于在应用程序之间传递消息，提供可靠性、可扩展性和可维护性。它实现了高级消息队列协议（AMQP），但也支持其他协议，例如消息队列标准协议（MQTT）和简单文本协议（STOMP）。RabbitMQ的基本思想是生产者将消息发送到队列中，然后消费者从队列中获取消息并处理它们。通过使用RabbitMQ，可以在分布式系统中实现异步通信，解耦应用程序之间的关系，以及实现高可靠性和高可扩展性的系统。

:::

![分布式系统消息中间件——RabbitMQ的使用基础篇 -架构](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//rabbitmq/20230308/RabbitMQ%E6%9E%B6%E6%9E%84%E5%9B%BE.png)

### RabbitMQ 概要

- 是一个消息中间件，接收并转发消息
- 四大核心概念：
  - 生产者：产生数据发送的程序
  - 交换机：非常重要的部件，一方面接收来自生产者的消息，另一方面他将消息推送到队列中；交换机必须确切知道如何处理它所接收到的消息，这由交换机的类型决定；交换机可以绑定多个队列
  - 队列：是内部使用的一种数据结构，消息只能存储在队列中；队列仅受主机的内存和磁盘限制的约束，本质上是一个大的消息缓冲区
  - 消费者：队列与消费者是一对一的关系；消费与接收具有相似的关系；消费者大多时候是一个等待接收消息的程序；生产者消费者和消息中间件很多时候并不在一个机器上；同一个应用程序既可以是生产者又可以是消费者
- 其他概念：
  - Connection：publisher / consumer 和 broker 之间的 TCP 连接
  - Channel：即信道，是建立在 Connection 之上的虚拟连接，当程序与 Broker 建立 TCP 连接时，
  - Broker：RabbitMQ 的服务节点，接收和分发消息的应用，RabbitMQ Server 就是 Message Broker
  - RoutingKey：生产者发送消息给交换机时会指定一个 RoutingKey，即用于匹配交换机
  - Binding：通过绑定将交换机和队列绑定起来，这样可以正确选择路由到的队列（交换机和队列是 **多对多** 的关系，通过 BindingKey 进行关联）



### RabbitMQ 相关概念

**名词解释：**

- AMQP（Advanced Message Queuing Protocol）：
  - 是一种开放标准的消息传递协议，它是一个异步通信协议，支持消息的可靠传递和可靠排队，以及发布和订阅模式。AMQP协议最初由RabbitMQ公司开发，目前已成为ISO标准。
  - AMQP协议定义了消息的格式、传递方式和路由规则。消息由消息头、消息体和属性组成。消息头包含消息类型、路由信息和传递模式等信息；消息体是实际的消息内容；属性则提供了一些额外的元数据。
  - AMQP支持多种传输协议，包括TCP、TLS和WebSockets等。AMQP还支持多种编程语言，如Java、C++、Python、Node.js和.NET等，使得开发者可以使用各自熟悉的编程语言进行开发。
- Virtual host：一个 RabbitMQ 服务器上可以有多个虚拟主机，用于隔离不同的应用或环境。AMQP 的基本组件划分到一个虚拟的分组中（出于多租户和安全因素设计），类似于网络中的 namespace 概念；当多个不同的用户使用同一个 RabbitMQ Server 提供的服务时，可以划分出多个 vhost，每个用户在自己的 vhost 创建 exchange / queue 等
- ACK（Acknowledgment）：消息的确认机制，消费者处理完消息后，需要向 RabbitMQ 确认消息已被正确处理。
- TTL（Time-To-Live）：消息的过期时间，一旦超过过期时间，消息将被 RabbitMQ 自动清除。



### RabbitMQ 优缺点

优点：

- 可靠性高：RabbitMQ 采用了多种机制来确保消息的可靠传输，如持久化、消息确认机制等，保证了消息不会丢失。
- 可扩展性好：RabbitMQ 采用了 AMQP 协议，通过集群来实现高可用，同时也支持分布式部署，可实现无缝扩容。
- 灵活性强：RabbitMQ 提供了丰富的消息模型和交换机类型，能够满足各种场景下的消息传递需求。
- 性能较高：RabbitMQ 的消息传递性能较好，能够处理大量的消息。

缺点：

- 部署和维护复杂：相比于其他消息中间件，RabbitMQ 的部署和维护较为复杂，需要了解 AMQP 协议，还需要针对不同的场景进行配置。
- 性能有限：尽管 RabbitMQ 的性能较好，但在高并发、大量消息的情况下，性能可能会受到一定的影响。



### RabbitMQ 使用场景&比较

适用场景：

- 异步处理：RabbitMQ 适用于异步处理，如异步任务调度、消息通知、日志收集等。
- 任务队列：RabbitMQ 可以作为任务队列，实现任务的异步处理和解耦。
- 应用解耦：子系统要是耦合在一起，那么其中一个出故障整条链都会受影响，MQ 可以单独监控其中的子系统。
- 发布订阅模式：RabbitMQ 支持多个消费者订阅同一个队列，适用于发布订阅模式。
- 微服务：RabbitMQ 可以作为微服务架构中的消息中间件，实现微服务之间的异步通信。
- 流量消峰：消息过多时排队，保护系统

同类型框架对比：

- Apache ActiveMQ：与 RabbitMQ 相比，ActiveMQ 支持的协议更多，如 AMQP、JMS 等，但是在性能和可靠性方面不如 RabbitMQ。
- Apache Kafka：与 RabbitMQ 相比，Kafka 适用于大规模的实时数据处理，具有更高的吞吐量和更低的延迟，但是不适用于任务队列和消息通知等场景。
- ZeroMQ：与 RabbitMQ 相比，ZeroMQ 更轻量级，不需要中间件服务器，但是需要在应用程序中实现消息传递逻辑，适用于内部通信和高性能的消息传递场景。





## RabbitMQ 核心部分

<iframe
  :src="$withBase('/markmap/html/rabbitmq/核心内容.html')"
  width="100%"
  height="400"
  frameborder="0"
  scrolling="No"
  leftmargin="0"
  topmargin="0"
/>

### 六大模式

- 简单模式（Simple Mode）：最简单的模式，也是最常见的模式。一个生产者发送一条消息，一个消费者接收一条消息。
- 工作模式（Work Queue Mode）：也称为任务队列模式，一个生产者发送一条消息到队列，多个消费者竞争获取消息进行处理。每个消息只会被一个消费者处理。
- 发布/订阅模式（Publish/Subscribe Mode）：生产者将消息发布到交换机（Exchange）上，多个消费者绑定到交换机上进行订阅，每个消息将被交换机转发给所有绑定的队列。适用于广播消息的场景。
- 路由模式（Routing Mode）：生产者将消息发送到指定的交换机上，并且设置了路由键（Routing Key）。消费者根据自己绑定的路由键，从交换机中获取消息进行处理。
- 主题模式（Topic Mode）：是路由模式的一种扩展，支持使用通配符匹配路由键。生产者将消息发送到交换机上，消费者根据自己绑定的路由键通配符，从交换机中获取匹配的消息进行处理。
- 发布确认模式（Publish Confirm Mode）：用于确保消息成功发送到RabbitMQ服务端。生产者发送消息后，等待RabbitMQ服务端的确认回执，如果收到了回执则表示消息已经被确认发送，否则则需要重发消息。

**补充：**还可以使用 RPC 模式。RPC模式与其他模式的区别在于其强调请求和响应之间的关联性，通常用于需要同步处理的场景，例如需要等待服务端返回结果的任务。其他模式则更适用于异步处理的场景，例如事件处理、日志记录等。

<br/>



### 交换机的类型

1. Direct（直接连接）：将消息直接路由到对应的队列中。
2. Fanout（扇出（发布/订阅））：将消息广播到所有绑定的队列中。
3. Topic（主题）：将消息按照匹配规则路由到对应的队列中。
4. Headers（头交换机）：将消息按照消息头中的键值对进行匹配，匹配成功后路由到对应的队列中。

<br/>



### 队列的类型

1. 工作队列
2. 死信队列
3. 延迟队列
4. 镜像队列

<br/>



### 事务&消息确认机制

> 事务和消息确认都能提高消息的可靠性，事务对性能影响较大，一般情况使用确认机制。消息确认包括 ack、nack、reject 等，以及如何选择合适的确认方式。

- 生产者消息确认
  - 生产者确认模式
  - 事务机制
- 消费者消息确认
  - 手动确认模式
  - 自动确认模式

<br/>



### 消息持久化

> 包括如何将消息持久化到磁盘，以及如何设置 TTL（Time to Live）等属性来控制消息的生命周期。

1. 消息持久化
2. 消息确认与持久化的关系
3. 持久化交换机与队列

<br/>



### 集群和高可用

> 包括镜像队列、镜像节点、负载均衡等，以及如何配置和使用。

1. 集群模式
2. 高可用模式
3. 镜像队列与集群

<br/>



### 核心对象和方法

| 对象       | 方法               | 描述                                                         |
| ---------- | ------------------ | ------------------------------------------------------------ |
| Connection | open()             | 打开与 RabbitMQ 服务器的 TCP 连接。连接成功后，可以创建一个或多个通道。 |
| Connection | close()            | 关闭连接。                                                   |
| Connection | channel()          | 创建一个新的通道，用于执行 AMQP 操作。                       |
| Channel    | queue_declare()    | 声明一个队列。如果队列不存在，则会创建一个新队列。如果队列已存在，则检查队列的参数是否与声明的参数匹配。 |
| Channel    | queue_bind()       | 将队列绑定到一个交换器。消息通过交换器路由到队列。           |
| Channel    | basic_publish()    | 将消息发布到一个交换器。消息必须包含一个路由键，用于将消息路由到正确的队列。 |
| Channel    | basic_consume()    | 注册一个消费者，开始消费消息。消费者会从指定的队列接收消息，直到取消注册或通道关闭。 |
| Channel    | basic_ack()        | 确认消息已被消费。消费者在成功处理消息后，应该发送 ACK 给 RabbitMQ。 |
| Channel    | close()            | 关闭通道。                                                   |
| Exchange   | exchange_declare() | 声明一个交换器。交换器接收生产者发布的消息，并将其路由到绑定的队列。 |
| Exchange   | exchange_bind()    | 将一个交换器绑定到另一个交换器。可以使用此方法将一个交换器路由到另一个交换器。 |
| Exchange   | exchange_unbind()  | 解绑一个交换器。                                             |
| Exchange   | exchange_delete()  | 删除一个交换器。                                             |
| Queue      | queue_declare()    | 声明一个队列。如果队列不存在，则会创建一个新队列。如果队列   |
| Queue      | queue_bind()       | 将队列绑定到一个交换器。消息通过交换器路由到队列。           |
| Queue      | queue_unbind()     | 解绑一个队列。                                               |
| Queue      | queue_delete()     | 删除一个队列。                                               |
| Queue      | basic_get()        | 从队列中获取消息。如果队列为空，则返回 None。                |
| Queue      | basic_consume()    | 注册一个消费者开始消费消息。                                 |
| Message    | /                  | 消息对象是由生产者发布到交换器的数据单元，包含消息头和消息体。消息头包含元数据，如路由键、消息 ID、时间戳等。消息体包含实际的数据。 |

<br/>



### 其他

> 插件机制等… TODO







## Linux 上安装 RabbitMQ

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

## Quick start

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

