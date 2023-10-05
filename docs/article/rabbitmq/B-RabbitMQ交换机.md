---
title: "RabbitMQ 交换机"
shortTitle: "B-RabbitMQ 交换机"
description: "RabbitMQ 交换机"
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
  text: "RabbitMQ 交换机"
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
  title: "RabbitMQ 交换机"
  description: "RabbitMQ 交换机"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RabbitMQ 交换机



[[toc]]



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

