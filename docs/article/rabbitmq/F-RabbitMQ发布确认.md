---
title: "RabbitMQ 发布确认"
shortTitle: "F-RabbitMQ 发布确认"
description: "RabbitMQ 发布确认"
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
  text: "RabbitMQ 发布确认"
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
  title: "RabbitMQ 发布确认"
  description: "RabbitMQ 发布确认"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RabbitMQ 发布确认



[[toc]]



## 基础

:::note 事务与确认机制

事务消息在 RabbitMQ 中的性能较差，因为它们需要使用额外的服务器资源来维护事务的完整性。为了提高性能，RabbitMQ 提供了一种名为“确认模式”的机制，它可以在不使用事务的情况下保证消息的完整性和可靠性。在确认模式下，生产者发送一条消息后会等待来自 RabbitMQ 服务器的确认消息，确认消息表示 RabbitMQ 已经成功接收了生产者发送的消息。如果 RabbitMQ 不能成功处理消息，则会通知生产者发送失败。

使用事务消息可以保证消息的一致性和可靠性，但是性能较差，而使用确认模式则可以保证消息的可靠性，且性能较高。选择使用哪种方式，需要根据具体的场景和需求来决定。

:::



:::info 确认机制

RabbitMQ消息确认机制：包括publisher confirm和consumer ack两种机制，用于保证消息发送和接收的可靠性。

**生产者消息确认：**

1. 生产者确认模式
2. 事务机制

**消费者消息确认：**

1. 手动确认模式
2. 自动确认模式

发布确认是确保消息持久化过程中不丢失的重要环节，即在队列和消息设置持久化后，再设置发布确认即可保证数据持久化成功

发布确认是默认关闭的，开启需要调用 confirmSelect 方法，每当需要使用发布确认时都需要在 channel 上调用该方法

:::



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







## 进阶

- 在生产环境中由于一些不明原因导致 RabbitMQ 重启，在重启期间生产者消息投递失败，导致数据丢失时，需要手动处理和恢复
- 在极端情况下，还有可能出现 RabbitMQ 集群不可用
- 加入缓存，定时任务对未成功发送的消息进行重新投递，解决交换机无法使用的情况



### 简单案例

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



### 问题

- 在仅开启生产确认机制的情况下，交换机接收到消息后，会直接给消息生产者发送确认消息
- 如果发现该消息不可路由（就是上面 key-2 的情况），消息会被直接丢弃，此时生产者是不知道消息被丢失这个事件的
- 解决方案：设置 mandatory 参数，当消息传递过程中不可达时将消息返回给生产者



### 改善

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



### 备份与报警交换机

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



