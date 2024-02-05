---
title: "RabbitMQ 客户端"
shortTitle: "Z-RabbitMQ 客户端"
description: "RabbitMQ 客户端"
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
  text: "RabbitMQ 客户端"
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
  title: "RabbitMQ 客户端"
  description: "RabbitMQ 客户端"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RabbitMQ 客户端



:::info 说明

相关文章：

- [Spring AMQP](https://docs.spring.io/spring-amqp/reference/)

:::



## 概述

在 Java Spring Boot 中，您可以使用多种方式集成 RabbitMQ，以实现消息传递和处理。以下是一些常见的使用 RabbitMQ 的方式：

1. **Spring AMQP：** Spring Boot 提供了 Spring AMQP 模块，它是 Spring 框架对 AMQP（Advanced Message Queuing Protocol）的抽象。您可以使用 `RabbitTemplate` 发布消息和接收消息，使用 `@RabbitListener` 注解创建消息监听器，以便处理接收到的消息。
2. **Spring Cloud Stream with RabbitMQ Binder：** 如果您正在构建微服务应用程序，并且使用 Spring Cloud 技术栈，可以使用 Spring Cloud Stream 来集成 RabbitMQ。Spring Cloud Stream 提供了更高级的抽象，让您能够通过定义消息通道和绑定来实现消息的发布和订阅。
3. **Spring Integration with RabbitMQ：** Spring Integration 是用于构建企业集成应用的 Spring 模块，它可以与 RabbitMQ 集成，实现消息的传递、转换和路由。您可以使用 Spring Integration 来构建复杂的消息处理流程。
4. **使用 `amqp` Starter：** 在 Spring Boot 中，您可以使用名为 `spring-boot-starter-amqp` 的 Starter，它包含了 Spring AMQP 相关的依赖和配置。通过添加这个 Starter，您可以轻松地开始使用 RabbitMQ。
5. **使用 RabbitMQ Java Client：** 如果您更倾向于直接使用 RabbitMQ 官方提供的 Java 客户端，您可以在 Spring Boot 项目中添加相关的依赖，并编写代码来创建连接、通道，发送和接收消息。



## spring-boot-starter-amqp 核心对象

### 核心对象

| 类名                              | 包名                                       | 描述                                               |
| --------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| `RabbitTemplate`                  | `org.springframework.amqp.rabbit.core`     | 发送和接收消息的模板类                             |
| `AmqpAdmin`                       | `org.springframework.amqp.core`            | 声明交换机、队列和绑定的接口                       |
| `SimpleMessageListenerContainer`  | `org.springframework.amqp.rabbit.listener` | 消息监听容器，用于启动消费者监听指定队列的消息     |
| `RabbitListenerEndpointRegistrar` | `org.springframework.amqp.rabbit.config`   | 注册`@RabbitListener`注解方法的类                  |
| `RabbitListenerContainerFactory`  | `org.springframework.amqp.rabbit.config`   | 创建`MessageListenerContainer`的工厂接口           |
| `RabbitMessagingTemplate`         | `org.springframework.amqp.rabbit.core`     | 在`RabbitTemplate`基础上支持Spring消息转换的模板类 |

| 交换机类型          | 特点和用途                                                   |
| ------------------- | ------------------------------------------------------------ |
| **DirectExchange**  | - 根据消息的路由键将消息直接路由到与之绑定且具有相同路由键的队列。<br/>- 一对一的路由关系。 |
| **FanoutExchange**  | - 将消息广播到与之绑定的所有队列，忽略消息的路由键。<br/>- 适用于消息广播到多个队列的场景。 |
| **TopicExchange**   | - 根据消息的路由键模式匹配将消息路由到与之绑定的队列。<br/>- 支持通配符的路由匹配，更灵活的路由规则。 |
| **HeadersExchange** | - 根据消息的头部属性进行匹配将消息路由到与之绑定的队列。<br/>- 路由规则基于消息头的键值对。 |
| **DefaultExchange** | - 默认交换机，直接根据队列名称将消息路由到与之同名的队列。<br/>- 不需要声明，可以直接使用。 |

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



### Message

在Spring AMQP中，`Message`是表示消息的核心对象。它包含了消息的实际内容和元数据。以下是`Message`类的主要属性和方法：

```java
public interface Message {

    /**
     * 返回消息的消息体（payload）。
     */
    byte[] getBody();

    /**
     * 返回消息的消息头（header）。
     */
    MessageProperties getMessageProperties();
}
```

- `getBody()`: 返回消息的实际内容，通常是字节数组形式。
- `getMessageProperties()`: 返回`MessageProperties`对象，该对象包含了消息的元数据，如消息头（header）、消息ID、时间戳、内容类型等信息。

`Message`接口的实现通常是`org.springframework.amqp.core.Message`类。以下是一个简单的示例，演示如何创建一个消息：

```java
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;

public class MessageExample {

    public static void main(String[] args) {
        // 创建消息体
        byte[] messageBody = "Hello, RabbitMQ!".getBytes();

        // 创建消息属性
        MessageProperties messageProperties = new MessageProperties();
        messageProperties.setContentType("text/plain");
        messageProperties.setMessageId("123456");

        // 创建消息
        Message message = new Message(messageBody, messageProperties);

        // 访问消息的内容和属性
        byte[] body = message.getBody();
        String contentType = message.getMessageProperties().getContentType();
        String messageId = message.getMessageProperties().getMessageId();

        // 打印消息信息
        System.out.println("Message Body: " + new String(body));
        System.out.println("Content Type: " + contentType);
        System.out.println("Message ID: " + messageId);
    }
}
```

在上述示例中，首先创建了消息体（即实际内容）和消息属性，然后使用它们创建了一个`Message`对象。通过访问`Message`对象的`getBody()`和`getMessageProperties()`方法，可以获取消息的内容和属性。



### RabbitTemplate

以下是`RabbitTemplate`类的一些主要方法，使用Markdown表格形式总结如下：

| 方法签名                                                     | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `void convertAndSend(String exchange, String routingKey, Object message)` | 将消息对象发送到指定的交换机和路由键。                       |
| `void convertAndSend(String routingKey, Object message)`     | 将消息对象发送到默认交换机，并指定路由键。                   |
| `void convertAndSend(Object messagePostProcessor)`           | 使用`MessagePostProcessor`修改消息后发送到默认交换机和路由键。 |
| `void convertAndSend(String exchange, String routingKey, Object message, MessagePostProcessor messagePostProcessor)` | 将消息对象发送到指定的交换机和路由键，并使用`MessagePostProcessor`修改消息。 |
| `void send(String exchange, String routingKey, Message message)` | 发送原始`Message`对象到指定的交换机和路由键。                |
| `void send(String routingKey, Message message)`              | 发送原始`Message`对象到默认交换机，并指定路由键。            |
| `Object convertSendAndReceive(String exchange, String routingKey, Object message)` | 将消息对象发送到指定的交换机和路由键，并接收同步响应消息。   |
| `Object convertSendAndReceive(String routingKey, Object message)` | 将消息对象发送到默认交换机，并指定路由键，同时接收同步响应消息。 |
| `Object convertSendAndReceive(Object messagePostProcessor)`  | 使用`MessagePostProcessor`修改消息后发送到默认交换机和路由键，并接收同步响应消息。 |
| `Object convertSendAndReceive(String exchange, String routingKey, Object message, MessagePostProcessor messagePostProcessor)` | 将消息对象发送到指定的交换机和路由键，并使用`MessagePostProcessor`修改消息，同时接收同步响应消息。 |
| `Message sendAndReceive(String exchange, String routingKey, Message message)` | 发送原始`Message`对象到指定的交换机和路由键，并接收同步响应消息。 |
| `Message sendAndReceive(String routingKey, Message message)` | 发送原始`Message`对象到默认交换机，并指定路由键，同时接收同步响应消息。 |
| `Message sendAndReceive(Message message)`                    | 发送原始`Message`对象到默认交换机和路由键，并接收同步响应消息。 |
| `ListenableFuture<SendResult<String, T>> send(String exchange, String routingKey, Message message)` | 发送原始`Message`对象到指定的交换机和路由键，返回异步`ListenableFuture`以便处理发送结果。 |
| `ListenableFuture<SendResult<String, T>> send(String routingKey, Message message)` | 发送原始`Message`对象到默认交换机，并指定路由键，返回异步`ListenableFuture`以便处理发送结果。 |
| `ListenableFuture<SendResult<String, T>> send(Message message)` | 发送原始`Message`对象到默认交换机和路由键，返回异步`ListenableFuture`以便处理发送结果。 |
| `void setExchange(String exchange)`                          | 设置默认交换机的名称。                                       |
| `void setRoutingKey(String routingKey)`                      | 设置默认路由键。                                             |
| `void setDefaultReceiveQueue(String defaultReceiveQueue)`    | 设置默认接收队列。                                           |
| `void setConfirmCallback(CorrelationData.ConfirmCallback confirmCallback)` | 设置发送消息的确认回调。                                     |
| `void setReturnCallback(ReturnCallback returnCallback)`      | 设置消息发送失败时的返回回调。                               |
| `void setChannelTransacted(boolean channelTransacted)`       | 设置是否启用通道事务。默认为`false`。                        |
| `void setMandatory(boolean mandatory)`                       | 设置是否要求消息发送到交换机，如果消息无法路由到队列则返回失败。默认为`false`。 |
| `void setUsePublisherConnection(boolean usePublisherConnection)` | 设置是否使用发布者的连接。默认为`false`，即每次发送消息都创建新的连接。 |
| `void setConfirmTimeout(long confirmTimeout)`                | 设置发送消息的确认超时时间。默认为0（即无限等待）。          |
| `void setBeforePublishPostProcessors(MessagePostProcessor... beforePublishPostProcessors)` | 设置在消息发送之前应用的`MessagePostProcessor`列表。         |





### MessagePostProcessor

`MessagePostProcessor`是Spring AMQP框架中的一个接口，用于在将消息发送到消息队列之前对消息进行后处理。它允许您对消息的属性或内容进行修改，以便在发送到消息代理之前进行最终的调整。

在使用`RabbitTemplate`发送消息时，您可以通过调用`convertAndSend`方法的重载之一，将一个或多个`MessagePostProcessor`实例传递给消息。这些`MessagePostProcessor`实例将按照传递的顺序应用于消息。

以下是`MessagePostProcessor`接口的核心方法：

```java
public interface MessagePostProcessor {
    Message postProcessMessage(Message message) throws AmqpException;
}
```

`MessagePostProcessor`接口只定义了一个方法 `postProcessMessage`，该方法接收一个`Message`对象并返回一个经过处理的`Message`对象。您可以在该方法中修改消息的属性或内容。

使用`MessagePostProcessor`的一个常见用例是在消息发送之前为消息设置额外的属性，例如设置消息的过期时间、优先级等。以下是一个简单的例子：

```java
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessagePostProcessor;
public class MyMessagePostProcessor implements MessagePostProcessor {
    private final long expiration;
    public MyMessagePostProcessor(long expiration) {
        this.expiration = expiration;
    }
    @Override
    public Message postProcessMessage(Message message) {
        // 在消息中设置过期时间
        message.getMessageProperties().setExpiration(String.valueOf(expiration));
        return message;
    }
}
```

然后，您可以将`MyMessagePostProcessor`实例传递给`RabbitTemplate`的`convertAndSend`方法：

```java
MyMessagePostProcessor messagePostProcessor = new MyMessagePostProcessor(10000); // 设置过期时间为10秒
rabbitTemplate.convertAndSend("exchange", "routingKey", "Hello, RabbitMQ!", messagePostProcessor);
```

在上述示例中，`MyMessagePostProcessor`类将消息的过期时间设置为10秒，并通过`convertAndSend`方法将消息发送到指定的交换机和路由键。这样，您可以在发送消息之前动态调整消息的属性。









### CorrelationData

`CorrelationData`是Spring AMQP中的一个接口，用于关联生产者发送的消息和消息代理（如RabbitMQ）的确认（acknowledgement）。通过`CorrelationData`，您可以在发送消息时关联一个唯一的标识符，以便在接收到消息代理的确认时，能够识别并处理相应的确认信息。

以下是`CorrelationData`接口的定义：

```java
public interface CorrelationData {
    
    /**
     * 返回与此`CorrelationData`相关联的唯一标识符。
     */
    String getId();

    /**
     * 返回与此`CorrelationData`相关联的对象。
     */
    Object getReturnedMessage();

    /**
     * 返回是否已经确认。
     */
    boolean isConfirmed();

    /**
     * 设置确认状态。
     */
    void setConfirmed(boolean confirmed);

    /**
     * 返回确认时的原因。
     */
    String getCause();
}
```

- `getId()`: 返回与`CorrelationData`相关联的唯一标识符。通常，这是消息的唯一标识符。
- `getReturnedMessage()`: 返回与`CorrelationData`相关联的对象。通常，这是发送的消息对象。
- `isConfirme`d: 返回是否已经确认。确认是指消息代理已经成功接收并处理了生产者发送的消息。
- `setConfirmed(boolean confirmed)`: 设置确认状态。
- `getCause()`: 返回确认时的原因。通常，如果消息发送失败，可以通过此方法获取失败的原因。

`CorrelationData`通常与`RabbitTemplate`一起使用，以便在发送消息时提供关联数据，以及在异步确认时处理相关的确认回调。以下是一个简单的示例：

```java
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.support.CorrelationData;

public class CorrelationDataExample {

    public static void main(String[] args) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate();

        // 创建CorrelationData对象，关联消息的唯一标识符
        CorrelationData correlationData = new CorrelationData("123456");

        // 发送消息，并提供CorrelationData
        rabbitTemplate.convertAndSend("exchange", "routingKey", "Hello, RabbitMQ!", correlationData);

        // 设置确认回调
        rabbitTemplate.setConfirmCallback((correlation, ack, cause) -> {
            if (ack) {
                System.out.println("Message with correlation id " + correlation.getId() + " has been confirmed");
            } else {
                System.out.println("Message with correlation id " + correlation.getId() + " failed with cause: " + cause);
            }
        });
    }
}
```

在上述示例中，通过创建`CorrelationData`对象并将其传递给`convertAndSend`方法，将消息的唯一标识符与消息关联。之后，通过设置`ConfirmCallback`来处理消息的确认状态。



### Channel

`Channel`是Spring AMQP中的一个接口，代表了一个与消息代理（例如RabbitMQ）的通信通道。通常，一个应用程序可以创建多个`Channel`来进行并发的、独立的消息通信。`Channel`提供了在通信通道上进行消息发布（生产者）和消费（消费者）的方法。

以下是`Channel`接口的主要方法：

```java
public interface Channel extends Closeable {

    /**
     * 获取通道的编号。
     */
    int getChannelNumber();

    /**
     * 声明一个交换机。
     */
    void exchangeDeclare(String exchange, String type, boolean durable, boolean autoDelete, Map<String, Object> arguments) throws IOException;

    /**
     * 删除一个交换机。
     */
    void exchangeDelete(String exchange, boolean ifUnused) throws IOException;

    /**
     * 声明一个队列。
     */
    DeclareOk queueDeclare(String queue, boolean durable, boolean exclusive, boolean autoDelete, Map<String, Object> arguments) throws IOException;

    /**
     * 删除一个队列。
     */
    DeleteOk queueDelete(String queue, boolean ifUnused, boolean ifEmpty) throws IOException;

    /**
     * 绑定一个队列到交换机。
     */
    void queueBind(String queue, String exchange, String routingKey, Map<String, Object> arguments) throws IOException;

    /**
     * 解绑一个队列和交换机之间的绑定关系。
     */
    void queueUnbind(String queue, String exchange, String routingKey, Map<String, Object> arguments) throws IOException;

    /**
     * 发布一条消息到指定的交换机和路由键。
     */
    void basicPublish(String exchange, String routingKey, BasicProperties props, byte[] body) throws IOException;

    /**
     * 获取一个消费者标记（consumer tag）。
     */
    String basicConsume(String queue, boolean autoAck, String consumerTag, boolean noLocal, boolean exclusive, Map<String, Object> arguments, Consumer callback) throws IOException;

    /**
     * 取消一个消费者。
     */
    void basicCancel(String consumerTag) throws IOException;

    /**
     * 关闭通道。
     */
    void close() throws IOException, TimeoutException;
}
```

- `getChannelNumber()`: 获取通道的编号。
- `exchangeDeclare()`: 声明一个交换机。
- `exchangeDelete()`: 删除一个交换机。
- `queueDeclare()`: 声明一个队列。
- `queueDelete()`: 删除一个队列。
- `queueBind()`: 绑定一个队列到交换机。
- `queueUnbind()`: 解绑一个队列和交换机之间的绑定关系。
- `basicPublish()`: 发布一条消息到指定的交换机和路由键。
- `basicConsume()`: 启动一个消费者。
- `basicCancel()`: 取消一个消费者。
- `close()`: 关闭通道。

`Channel`接口的实现通常由底层的消息代理提供。在使用`RabbitTemplate`或者`@RabbitListener`等高级抽象时，`Channel`通常由Spring AMQP框架自动管理，无需手动创建和操作。





### DeliverCallback

`DeliverCallback`是一个函数式接口，用于处理从消息代理（如RabbitMQ）接收到的消息。它允许您定义一个回调方法，该方法在接收到消息时被执行。在Spring AMQP中，`DeliverCallback`通常用于设置消费者的消息处理逻辑。

以下是`DeliverCallback`接口的定义：

```java
@FunctionalInterface
public interface DeliverCallback {
    
    /**
     * 处理接收到的消息。
     *
     * @param consumerTag 消费者标识符
     * @param delivery    传递的消息
     * @throws IOException 如果处理消息时发生异常
     */
    void handle(String consumerTag, Delivery delivery) throws IOException;
}
```

`handle`方法接受两个参数：

- `consumerTag`: 消费者的标识符，用于标识具体的消费者。
- `delivery`: 传递的消息对象，包含了消息的内容、元数据等信息。`Delivery`是一个包含了消息体和消息属性的对象，它是消息传递的基本单位。

在使用`DeliverCallback`时，您可以定义一个处理接收到消息的逻辑，并将该逻辑传递给消息代理。在Spring AMQP中，使用`@RabbitListener`注解时，您可以将一个实现了`DeliverCallback`接口的Lambda表达式或方法引用传递给`listener`属性，以定义消息的处理逻辑。

以下是一个简单的示例，演示如何使用`DeliverCallback`：

```java
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class DeliverCallbackExample {

    public static void main(String[] args) throws IOException, TimeoutException {
        String queueName = "myQueue";

        // 创建连接和通道
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {

            // 声明队列
            channel.queueDeclare(queueName, false, false, false, null);

            // 定义DeliverCallback处理接收到的消息
            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
                System.out.println("Received message: " + message);
            };

            // 启动消费者，将DeliverCallback传递给basicConsume方法
            channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
            
            // 等待接收消息，此处可以添加逻辑来保持程序运行
            System.out.println("Waiting for messages. To exit press Ctrl+C");
            System.in.read();
        }
    }
}
```

在上述示例中，通过创建一个`DeliverCallback`实例并将其传递给`channel.basicConsume`方法，定义了接收到消息时的处理逻辑。这是一个基本的手动消费消息的例子，通常在真实的应用中，使用Spring的`@RabbitListener`注解更为方便。





### DefaultExchange

`DefaultExchange`并不是一个独立的交换机类型，而是RabbitMQ中的默认交换机。默认交换机是一个直连交换机（Direct Exchange），其名称是空字符串("")。

以下是`DefaultExchange`的一些特点和用途：

- **直连交换机：** 默认交换机的类型是直连交换机，根据消息的路由键将消息直接路由到与之同名的队列。
- **自动绑定：** 默认交换机会自动将队列与交换机绑定，绑定的规则是队列的名称与路由键相同。因此，当使用默认交换机时，不需要显式地声明和绑定队列。
- **简化配置：** 默认交换机简化了配置，适用于简单的生产者-消费者场景，其中消息的路由规则是直接根据队列名称进行匹配。

以下是一个使用默认交换机的简单示例：

```java
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public Queue myQueue() {
        return new Queue("myQueue");
    }
}
```

在上述示例中，通过`@Bean`注解创建了一个名为`myQueue`的队列。由于没有显式声明交换机，将使用默认交换机，并且队列`myQueue`将自动与默认交换机绑定，绑定的规则是队列的名称与路由键相同。在生产者发送消息到默认交换机时，消息将被路由到与之同名的队列，即`myQueue`。



### DirectExchange

`DirectExchange`是RabbitMQ中的一种交换机类型。在RabbitMQ中，交换机（Exchange）负责将消息路由到一个或多个队列。`DirectExchange`是其中一种常见的交换机类型，它根据消息的路由键（Routing Key）将消息直接路由到与之绑定且具有相同路由键的队列。

以下是`DirectExchange`的一些特点和用法：

1. **路由键匹配：** `DirectExchange`使用消息的路由键和队列的绑定键进行匹配。当消息发送到`DirectExchange`时，消息的路由键将与与之绑定的队列的绑定键进行精确匹配。只有匹配的队列才会接收到消息。
2. **一对一路由：** 一个`DirectExchange`通常与多个队列绑定，每个队列都有一个特定的绑定键。消息的路由键与绑定键精确匹配时，消息将被路由到对应的队列，实现了一对一的路由关系。
3. **创建方式：** 在RabbitMQ中，可以通过声明一个`DirectExchange`来创建它。通常在生产者和消费者之间约定好使用的交换机类型，然后声明交换机。

以下是使用Spring Boot和Spring AMQP声明`DirectExchange`的简单示例：

```java
import org.springframework.amqp.core.DirectExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange("myDirectExchange");
    }
}
```

在上述示例中，通过`@Bean`注解创建了一个名为`myDirectExchange`的`DirectExchange`实例。这个实例可以在其他组件中引用，例如在声明队列时与队列进行绑定。

在使用`DirectExchange`时，需要在生产者和消费者之间协商好交换机的名称和路由键的使用规则，以确保消息能够被正确路由到目标队列。







### FanoutExchange

`FanoutExchange`是RabbitMQ中的一种交换机类型。它是一种广播（Broadcast）模式的交换机，将消息广播到所有与之绑定的队列，无视消息的路由键。

以下是`FanoutExchange`的主要特点和用途：

- **消息广播：** `FanoutExchange`会将发送到它的消息广播到与之绑定的所有队列，而不考虑消息的路由键。这种广播模式适用于多个消费者都需要接收相同消息的场景。
- **适用场景：** 适用于一条消息需要被多个消费者同时处理的情况。例如，在发布-订阅模式中，多个订阅者订阅了同一个`FanoutExchange`，当生产者发布一条消息到该交换机时，所有订阅者都会收到相同的消息。
- **无路由键匹配：** 由于`FanoutExchange`忽略消息的路由键，消息会被广播到所有与之绑定的队列，无论队列的绑定键是什么。

以下是使用Spring Boot和Spring AMQP声明`FanoutExchange`的简单示例：

```java
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public FanoutExchange fanoutExchange() {
        return new FanoutExchange("myFanoutExchange");
    }
}
```

在上述示例中，通过`@Bean`注解创建了一个名为`myFanoutExchange`的`FanoutExchange`实例。该实例可以在其他组件中引用，并与需要接收广播消息的队列进行绑定。在生产者发送消息到`FanoutExchange`时，消息将被广播到所有与之绑定的队列。





### TopicExchange

`TopicExchange`是RabbitMQ中的一种交换机类型。它使用消息的路由键与队列的绑定键进行模式匹配，将消息路由到一个或多个与之绑定且符合匹配规则的队列。

以下是`TopicExchange`的主要特点和用途：

- **路由键模式匹配：** `TopicExchange`使用消息的路由键和队列的绑定键进行模式匹配。路由键可以包含通配符（`*`和`#`），使得路由规则更加灵活。
- **支持通配符：** `*`匹配一个单词，`#`匹配零个或多个单词。例如，路由键模式`"animal.*"`可以匹配`"animal.rabbit"`，而路由键模式`"animal.#"`可以匹配`"animal.rabbit.white"`。
- **灵活的路由规则：** `TopicExchange`提供了一种更为灵活的路由规则，可以根据生产者和消费者之间定义的通配符规则，实现更复杂的消息路由。

以下是使用Spring Boot和Spring AMQP声明`TopicExchange`的简单示例：

```java
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange("myTopicExchange");
    }
}
```

在上述示例中，通过`@Bean`注解创建了一个名为`myTopicExchange`的`TopicExchange`实例。这个实例可以在其他组件中引用，并与需要接收特定模式消息的队列进行绑定。在生产者发送消息到`TopicExchange`时，消息将被路由到与之绑定且符合模式匹配规则的队列。





### HeadersExchange

`HeadersExchange`是RabbitMQ中的一种交换机类型。它使用消息的头部属性与队列的绑定头部属性进行匹配，将消息路由到一个或多个与之绑定且符合匹配规则的队列。

以下是`HeadersExchange`的主要特点和用途：

- **头部属性匹配：** `HeadersExchange`使用消息的头部属性和队列的绑定头部属性进行匹配。消息头部属性是键值对的集合，每个键值对表示一个属性。只有当消息头部属性与队列的绑定头部属性完全匹配时，消息才会被路由到对应的队列。
- **复杂匹配规则：** `HeadersExchange`支持复杂的匹配规则，可以通过定义多个键值对进行精确匹配。这使得`HeadersExchange`适用于根据消息的特定属性来进行路由的场景。

以下是使用Spring Boot和Spring AMQP声明`HeadersExchange`的简单示例：

```java
import org.springframework.amqp.core.HeadersExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class RabbitMqConfig {

    @Bean
    public HeadersExchange headersExchange() {
        return new HeadersExchange("myHeadersExchange");
    }
}
```

在上述示例中，通过`@Bean`注解创建了一个名为`myHeadersExchange`的`HeadersExchange`实例。这个实例可以在其他组件中引用，并与需要根据头部属性进行匹配的队列进行绑定。在生产者发送消息到`HeadersExchange`时，消息将根据头部属性与绑定规则匹配，被路由到符合条件的队列。





### Queue

> 一般会使用QueueBuilder建造者

在RabbitMQ中，队列（Queue）是消息的缓冲区，用于存储生产者发送的消息，并在合适的时候将消息传递给消费者。队列是消息传递的终点，生产者将消息发送到队列，而消费者则从队列中获取消息进行处理。

以下是队列的主要特点和用途：

- **消息存储：** 队列用于存储消息，使得生产者和消费者可以解耦。生产者将消息发送到队列，而不需要知道哪个消费者将接收到消息。
- **FIFO顺序：** 队列通常遵循先进先出（FIFO）的原则，即先发送的消息会先被消费。消息在队列中排队等待消费者处理。
- **生产者-消费者解耦：** 队列实现了生产者和消费者之间的解耦。生产者只关注将消息发送到队列，而消费者只关注从队列中获取消息进行处理。
- **消息持久化：** 队列可以配置为持久化，以确保在RabbitMQ服务器重启时消息不会丢失。持久化的队列将消息存储到磁盘上，而非仅保存在内存中。

以下是使用Spring Boot和Spring AMQP声明队列的简单示例：

```java
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public Queue myQueue() {
        return new Queue("myQueue");
    }
}
```

在上述示例中，通过`@Bean`注解创建了一个名为`myQueue`的队列。这个队列可以在其他组件中引用，并用于生产者将消息发送到队列，以及消费者从队列中获取消息进行处理。如果队列不存在，它将在声明时被创建。





### Binding

> 一般会使用BindingBuilder建造者

在RabbitMQ中，绑定（Binding）是交换机（Exchange）和队列之间的关系，定义了消息如何从交换机路由到队列。绑定规定了消息的路由键、交换机和队列之间的关系，确保消息能够按照预期的方式被路由到目标队列。

以下是绑定的主要特点和用途：

- **交换机与队列之间的桥梁：** 绑定连接了交换机和队列，充当了它们之间的桥梁。消息从交换机发送到队列，必须通过绑定来指定路由规则。
- **路由规则定义：** 绑定规定了消息的路由键（Routing Key）和交换机的绑定键（Binding Key）之间的匹配规则。只有当消息的路由键与绑定键匹配时，消息才会被路由到相应的队列。
- **多队列绑定一个交换机：** 一个交换机可以与多个队列进行绑定，允许消息被同时发送到多个队列。

以下是使用Spring Boot和Spring AMQP声明绑定的简单示例：

```java
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public DirectExchange myDirectExchange() {
        return new DirectExchange("myDirectExchange");
    }

    @Bean
    public Queue myQueue() {
        return new Queue("myQueue");
    }

    @Bean
    public Binding binding() {
        return BindingBuilder.bind(myQueue()).to(myDirectExchange()).with("routingKey");
    }
}
```

在上述示例中，通过`@Bean`注解创建了一个名为`myDirectExchange`的`DirectExchange`实例和一个名为`myQueue`的`Queue`实例。然后，通过`BindingBuilder`创建了一个绑定，将`myQueue`与`myDirectExchange`绑定，绑定的路由键是`"routingKey"`。这样，当消息通过`myDirectExchange`的`"routingKey"`路由键发送时，会被路由到`myQueue`队列。





## spring-boot-starter-amqp 注解

| 注解              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| `@RabbitListener` | 用于标注一个方法，指定该方法为一个消息监听器。可以配置监听的队列、交换机等信息，以及消费者的其他属性。 |
| `@RabbitHandler`  | 用于标注在`@RabbitListener`注解的方法上，指定该方法处理接收到的消息。 |
| `@EnableRabbit`   | 在Spring Boot应用的配置类上使用，启用RabbitMQ相关的配置和功能，如`@RabbitListener`的自动注册等。 |
| `@QueueBinding`   | 用于标注在配置类的方法上，定义队列与交换机之间的绑定关系。   |
| `@Headers`        | 用于标注在方法参数上，用于提取消息的头部属性。               |
| `@Payload`        | 用于标注在方法参数上，用于提取消息的消息体。                 |
| `@Exchange`       | 用于标注在配置类的方法上，定义交换机。                       |
| `@Queue`          | 用于标注在配置类的方法上，定义队列。                         |
| `@Binding`        | 用于标注在配置类的方法上，定义绑定，指定队列与交换机之间的绑定关系。 |



### `@RabbitListener` 和 `@RabbitHandler`

```java
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "myQueue")
public class MyMessageListener {

    @RabbitHandler
    public void handleMessage(String message) {
        System.out.println("Received message: " + message);
    }
}
```



### `@EnableRabbit`

```java
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitMqConfig {
    // RabbitMQ相关的配置可以放在这里
}
```



### `@QueueBinding`

```java
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public Queue myQueue() {
        return new Queue("myQueue");
    }

    @RabbitListener(bindings = @QueueBinding(value = @org.springframework.amqp.rabbit.annotation.Queue("myQueue"), exchange = @org.springframework.amqp.rabbit.annotation.Exchange("myDirectExchange"), key = "routingKey"))
    public void handleMessage(String message) {
        System.out.println("Received message: " + message);
    }
}
```



### `@Headers` 和 `@Payload`

```java
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RabbitListener(queues = "myQueue")
public class MyMessageListener {

    @RabbitHandler
    public void handleMessage(@Payload String message, @Headers Map<String, Object> headers) {
        System.out.println("Received message: " + message);
        System.out.println("Received headers: " + headers);
    }
}
```



### `@Exchange` 和 `@Queue`

```java
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    @Bean
    public DirectExchange myDirectExchange() {
        return new DirectExchange("myDirectExchange");
    }

    @Bean
    public Queue myQueue() {
        return new Queue("myQueue");
    }

    @Bean
    public Binding binding() {
        return BindingBuilder.bind(myQueue()).to(myDirectExchange()).with("routingKey");
    }
}
```



