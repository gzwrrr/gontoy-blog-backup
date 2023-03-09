---
title: "RabbitMQ 队列"
shortTitle: "C-RabbitMQ 队列"
description: "RabbitMQ 队列"
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
  text: "RabbitMQ 队列"
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
  title: "RabbitMQ 队列"
  description: "RabbitMQ 队列"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RabbitMQ 队列



[[toc]]



## 死信队列

:::warning 注意

死信队列只是绑定在死信交换机上的队列，是一个普通的队列，交换机可以是任何类型的（Direct、Fanout、Topic）

:::

- 死信：无法被消费的消息，即由于某些特定的原因导致 queue 中的某些消息无法被消费，这些消息如果没有后续的处理，就变成了死信
- 如何配置了死信队列，那么死信消息就会被放入死信队列中，如果没有配置，那么就会直接丢弃该消息
- 有死信自然有死信队列，应用场景：为了保证订单业务的数据不丢失，需要使用到死信队列机制，即当消息发生异常情况时，将消息投入死信队列中。如用户在商城下单成功并点击支付后未在一定时间内支付，此时可以让其自动失效
- 可以给每个死信业务队列配备一个死信交换机，同一个项目的死信交换机可以共用一个，然后为每一个业务队列分配一个 routing key
- 死信的来源：
  - 消息 TTL 过期（这里需要注意，消息和队列都可以设置 TTL，同时配置会使用 TTL 较小的值）
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

```java
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



## 延迟队列

- 延迟队列内部是有序的，最重要的特性就体现在延迟属性上
- 延迟队列就是用来存放需要在指定时间被处理的元素的队列
- 延迟队列的使用场景：
  - 订单在十分钟之内为支付则自动取消
  - 新创建的店铺，如果在十天内都没有上传过商品，则自动发消息提醒
  - 用户注册成功后，如果三天内没有登录则进行短信提醒
  - 用户发起退款，如果大田内没有得到处理的消息则通知相关的运营人员
  - 预定会议后，需要在预定的时间点前十分钟通知各个与会人员参加会议



### 简单案例

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



### 简单案例的问题

**使用死信队列做延迟队列时：**

- 即在消息属性上设置 TTL，消息并不会按时死亡
- 因为 RabbitMQ 只会检查第一个消息是否过期，如果过期则进入死信队列
- 如果第一个消息的延时时间很长而第二个消息的延迟时间很短，那么第二个消息也不会优先得到执行
- 需要安装 rabbitmq_delayed_message_exchange 插件解决（[Github 下载](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases)），安装好后延时是在交换机延时的（原本是在队列中延时）
  - 将下载后的 .ez 文件上传至 /usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8/plugins
  - 使用 `rabbitmq-plugins enable rabbitmq_delayed_message_exchange` 安装插件
  - 使用 `systemctl restart rabbitmq-server` 重启
  - 成功后可以在新建交换机处看到延迟交换机的选项



### 改进案例

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



### 小结

- 使用 RabbitMQ 实现延迟队列可以很好例如其特性，如：
  - 消息可靠发送
  - 消息可靠投递
  - 死信队列保障消息至少被消费一次
  - 未被正确处理的消息不会被丢弃
  - 还可以通过集群的特性解决单点故障问题，避免单个节点挂掉导致延时队列不可用或者消息丢失
- 延时队列还可以使用：
  -  Java 的 DelayedQueue
  -  Redis 的 zset
  -  Quartz
  -  Kafka 的时间轮





## 优先级队列

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



## 惰性队列

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







