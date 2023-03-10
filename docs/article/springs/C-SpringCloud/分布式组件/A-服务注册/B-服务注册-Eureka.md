---
title: "服务注册-Eureka"
shortTitle: "B-服务注册-Eureka"
description: "服务注册-Eureka"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-28
category: 
- "分布式"
tag:
- "分布式"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "服务注册-Eureka"
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
  title: "服务注册-Eureka"
  description: "服务注册-Eureka"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 服务注册-Eureka

:::info 说明

Eureka是Netflix开源的一款RESTful的服务治理框架，实现了微服务架构中的服务注册与发现，主要用于AWS云中的定位中间层服务，以实现中间层服务的自动发现和注册。Eureka采用了CS架构，Eureka Server作为服务注册功能的服务器，它是服务注册中心。而系统中的其他微服务，使用Eureka的客户端连接到Eureka Server并维持心跳连接。在服务运行期间，微服务会通过心跳机制定期向Eureka Server更新自身的状态。

:::



Eureka包括两个组件：Eureka Server和Eureka Client。Eureka Server提供服务注册和发现功能，Eureka Client是一个Java客户端，用于简化与Eureka Server的交互，客户端同时也具备一个内置的、使用轮询负载算法的负载均衡器。Eureka支持将自身注册到其他的Eureka Server，形成一个互相依存的服务注册组群。

**Eureka的主要特点如下：**	

- 服务注册与发现机制：Eureka支持将所有的服务提供者的信息都集中到服务注册表中，消费者在消费时直接从服务注册表中获取服务提供者的信息，从而实现消费者与服务提供者之间的解耦。
- 自我保护机制：Eureka在运行过程中，如果某个服务的心跳连续多次失败，Eureka将会注销该服务。为了防止在一个网络分区故障的情况下，Eureka Client无法与Eureka Server正常通信，而发生误判注销正常的服务，Eureka引入了自我保护机制。当Eureka Server节点在短时间内丢失过多客户端时（默认为15分钟内超过85%的客户端断开连接），那么这个节点就会进入自我保护机制。一旦进入自我保护模式，Eureka Server在期间不会注销任何实例，直至收到的心跳数重新恢复到阈值以上。
- 高可用：Eureka的服务注册表中的服务注册信息是分布式存储的，即不同的Eureka Server实例会通过复制的方式来同步服务注册信息，从而达到高可用的目的。Eureka Server和Client的多实例部署可以保证在一个Eureka Server实例宕机的情况下，Eureka Client仍然可以通过其他的Eureka Server实例来获取服务提供者信息。

























