---
title: "服务调用-Ribbon"
shortTitle: "A-服务调用-Ribbon"
description: "服务调用-Ribbon"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-06-01
category: 
- "分布式"
tag:
- "分布式"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "服务调用-Ribbon"
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
  title: "服务调用-Ribbon"
  description: "服务调用-Ribbon"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# 服务调用-Ribbon

> 已经进入维护阶段

- Spring Cloud Ribbon 是基于 Netflix Ribbon 实现的一套**客户端负载均衡工具**

- 主要功能是提供客户端软件**负载均衡算法**和**服务调用**
- Ribbon 客户端提供一系列完善的配置项：如连接超时、重试等
- 在配置文件中列出 LB（Load Balancer）后面所有的所有机器，Ribbon 都会自动基于某些规则（轮询，随机连接等）去连接这些机器



<br/>

## Load Balancer

- 将用户请求分摊到多个服务上，达到系统的高可用
- 常见的负载均衡工具还有 Nginx、LVS、硬件 F5 等
- Nginx 是服务器负载均衡，客户端所有请i去都会交给 Nginx，然后由 Nginx 实现转发请求
- Ribbon 是本地负载均衡，在调用微服务接口时，会在注册中心上在获取到注册信息服务列表后缓存到 JVM 本地，从而在本地实现 RPC 远程服务调用



<br/>

## 负载均衡类型

- 集中式：服务的消费方和提供方之间使用独立的 LB 设施（Nginx、F5 等），由该设施负责把请求通过某种策略发送给服务的提供方
- 进程内：将 LB 逻辑集成到消费方，消费方从服务注册中心获取可用的地址，然后从这些地址中选择出一台合适的服务器。Ribbon 就属于进程内 LB，它只是一个类库，集成于消费方进程，消费方通过它来获取服务提供方的地址



<br/>

## 总结

- Ribbon 是一个软负载均衡的客户端组件
- Ribbon 可以和其他所需请求的客户端结合使用，和 Eureka 结合就是其中一个实例（较新版的 Spring Cloud Eureka 自带了 Ribbon）