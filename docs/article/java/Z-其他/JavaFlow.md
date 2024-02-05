---
title: "Java Flow"
shortTitle: "Java Flow"
description: "Java Flow"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-04-06
category: 
- "java"
- "异步"
tag:
- "java"
- "异步"
sticky: 3
star: false
article: true
timeline: true
dir:
  text: "Java Flow"
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
  title: "Java Flow"
  description: "Java Flow"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java Flow

[[toc]]





## 核心对象

Java 9 中的 Flow API 包含了一些核心对象，用于定义异步数据流的发布者-订阅者模式。这些核心对象包括以下几种：

1. **Publisher（发布者）：** Publisher 是一个接口，用于定义数据流的发布者。它可以向订阅者发布数据，并且可以处理订阅者的订阅请求和取消订阅请求。
2. **Subscriber（订阅者）：** Subscriber 是一个接口，用于定义数据流的订阅者。它可以订阅一个或多个发布者的数据流，并且可以处理发布者发送的数据和完成通知。
3. **Subscription（订阅）：** Subscription 是一个接口，用于表示订阅者和发布者之间的订阅关系。它可以处理订阅者的请求，并且可以取消发布者对订阅者的数据发布。
4. **Processor（处理器）：** Processor 是一个接口，用于表示数据流的处理器。它可以同时充当发布者和订阅者的角色，可以对接收到的数据进行处理，并且可以将处理后的数据发送给下一个订阅者。





### Publisher

在 Java 9 的 Flow API 中，Publisher 接口代表了一个数据流的发布者。虽然 Publisher 接口本身并没有明确定义生命周期方法，但是其实现类可能会在其生命周期中涉及一些生命周期管理的方法或事件。

1. **发布数据（onNext）：** Publisher 可以通过调用订阅者的 onNext 方法来发布数据流中的数据。
2. **完成数据流（onComplete）：** 当数据流处理完成时，Publisher 可以通过调用订阅者的 onComplete 方法来通知订阅者数据流已经完成。
3. **处理错误（onError）：** 如果在数据流处理过程中发生错误，Publisher 可以通过调用订阅者的 onError 方法来通知订阅者处理错误的情况。



### SubmissionPublisher

SubmissionPublisher 是 Java 9 中实现了 Publisher 接口的一个类，它扩展了 Publisher 接口的功能，并提供了一些额外的方法用于管理数据流的发布和订阅过程。SubmissionPublisher 的生命周期和核心方法包括以下几个方面：

1. **构造方法：** SubmissionPublisher 类有多个构造方法，用于创建 SubmissionPublisher 的实例。你可以通过不同的构造方法来创建具有不同配置和参数的 SubmissionPublisher 对象。
2. **发布数据项（submit）：** 该方法用于向订阅者发布数据项，将数据项发送给订阅者。调用 submit 方法可以将数据项发送给订阅者，让订阅者处理接收到的数据。
3. **订阅数据流（subscribe）：** 该方法用于订阅一个数据流，建立订阅者与发布者之间的订阅关系。调用 subscribe 方法可以启动数据流的传输和处理过程。
4. **关闭（close）：** 该方法用于关闭 SubmissionPublisher，结束数据流的发布和订阅过程。调用 close 方法可以通知订阅者数据流处理已经结束，并清理资源。
5. **处理错误（getExecutor）：** 该方法用于获取 SubmissionPublisher 使用的执行器（Executor），用于处理数据流的发布和订阅过程。调用 getExecutor 方法可以获取 SubmissionPublisher 使用的执行器。



### Subscriber

在 Java 9 的 Flow API 中，Subscriber 接口代表了一个数据流的订阅者，它在订阅一个或多个 Publisher 的数据流时会涉及一些生命周期相关的方法或事件。

1. **订阅数据流（onSubscribe）：** 当订阅者订阅一个 Publisher 的数据流时，Publisher 会调用订阅者的 onSubscribe 方法，提供一个表示订阅关系的 Subscription 对象。
2. **接收数据（onNext）：** 当订阅者接收到数据流中的数据时，Publisher 会调用订阅者的 onNext 方法，订阅者可以在该方法中处理接收到的数据。
3. **完成数据流（onComplete）：** 当数据流处理完成时，Publisher 可以调用订阅者的 onComplete 方法，通知订阅者数据流已经完成。
4. **处理错误（onError）：** 如果在数据流处理过程中发生错误，Publisher 可以调用订阅者的 onError 方法，通知订阅者处理错误的情况。



### Subscription

在 Java 9 的 Flow API 中，Subscription 接口表示订阅者和发布者之间的订阅关系，它定义了一些核心方法用于管理订阅过程和处理背压。Subscription 接口的核心方法包括以下几个：

1. **请求数据（request）：** 该方法用于向发布者请求指定数量的数据项，从而控制数据流的传输速率。调用 request 方法可以告知发布者订阅者的处理能力，以便发布者根据订阅者的请求来发送相应数量的数据项。
2. **取消订阅（cancel）：** 该方法用于取消订阅者与发布者之间的订阅关系，结束数据流的传输。调用 cancel 方法可以通知发布者订阅者不再需要接收数据项，并且取消之前建立的订阅关系。



### Processor

在 Java 9 的 Flow API 中，Processor 接口表示一个数据流的处理器，它充当了发布者和订阅者的角色，并可以对接收到的数据进行处理，然后将处理后的数据发送给下一个订阅者。Processor 接口包含了一些核心方法，用于处理数据流的传输和处理过程。Processor 接口的核心方法包括以下几个：

1. **订阅数据流（subscribe）：** 该方法用于订阅一个数据流，并建立发布者和订阅者之间的订阅关系。调用 subscribe 方法可以启动数据流的传输和处理过程。
2. **发布数据项（onNext）：** 该方法用于向订阅者发送数据流中的数据项，将处理后的数据项发送给订阅者。调用 onNext 方法可以将处理后的数据项发送给下一个订阅者。
3. **完成数据流（onComplete）：** 该方法用于通知订阅者数据流已经处理完成，数据流传输过程结束。调用 onComplete 方法可以通知订阅者数据流处理已经完成。
4. **处理错误（onError）：** 该方法用于处理数据流传输过程中的错误情况，向订阅者发送错误信息。调用 onError 方法可以通知订阅者数据流处理过程中发生了错误。