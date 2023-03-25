---
title: "服务调用-Dubbo"
shortTitle: "C-服务调用-Dubbo"
description: "服务调用-Dubbo"
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
timeline: true,
dir:
  text: "服务调用-Dubbo"
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
  title: "服务调用-Dubbo"
  description: "服务调用-Dubbo"
  author:
    name: gzw
    email: 1627121193@qq.com

---





# 服务调用-Dubbo

> 提供 RPC 通信与服务治理两大能力，开箱即用，很好地支持 Java 和 Go（还有其他的语言）

Dubbo3 是在云原生背景下诞生的，使用 Dubbo 构建的微服务遵循云原生思想，能更好的复用底层云原生基础设施、贴合云原生微服务架构。这体现在：

- 服务支持部署在容器、Kubernetes（K8S）平台，服务生命周期可实现与平台调度周期对齐；
- 支持经典 Service Mesh （服务网格）微服务架构，引入了 Proxyless Mesh 架构，进一步简化 Mesh 的落地与迁移成本，提供更灵活的选择；
- 作为桥接层，支持与 SpringCloud、gRPC 等异构微服务体系的互调互通



Dubbo 从设计上是完全遵循云原生微服务开发理念的，这体现在多个方面，首先是对云原生基础设施与部署架构的支持，包括 Kubernetes、Service Mesh 等，另一方面，Dubbo 众多核心组件都已面向云原生升级，包括 Triple 协议、统一路由规则、对多语言支持。值得一提的是，如何使用 Dubbo 支持弹性伸缩的服务如 Serverless 也在未来计划之中，这包括利用 Native Image 提高 Dubbo 的启动速度与资源消耗等。

结合当前版本，本节主要从以下两点展开 Dubbo 的云原生特性

- 容器调度平台（Kubernetes）
- Service Mesh





## 架构设计

> 从抽象架构上分为两层：**服务治理抽象控制面（包含多个协调服务）** 和 **Dubbo 数据面（发起与接收 RPC 调用）**

![architecture](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//dubbo/20230315/dubbo%E6%9E%B6%E6%9E%84.png)

Dubbo 是一个高性能、轻量级的开源 RPC 框架，主要用于构建分布式服务应用。它支持多种协议、多种序列化方式和多种注册中心，提供了丰富的功能，包括负载均衡、容错、路由、服务降级等。Dubbo 的架构设计具有以下几个方面的特点：

1. 服务治理架构：Dubbo 的架构设计采用了服务治理的思想，将分布式服务治理问题抽象成了统一的架构模型。它提供了注册中心、配置中心、路由中心等多个核心组件，支持服务的注册与发现、配置管理、负载均衡等功能，大大简化了分布式服务治理的复杂度。
2. 高度可扩展性：Dubbo 的架构设计具有高度可扩展性，支持多种协议、多种序列化方式和多种注册中心，可以根据应用需求进行自由选择和配置。此外，Dubbo 还支持自定义协议、序列化方式和注册中心，可以快速扩展和定制化。
3. 面向接口设计：Dubbo 的架构设计采用了面向接口设计的思想，提供了统一的服务接口定义和服务提供方、消费方的契约协议，将服务接口、参数、返回值等信息进行了封装和统一管理。这种设计思想降低了服务间的耦合度，提高了服务的灵活性和可复用性。
4. 服务端异步处理：Dubbo 的架构设计采用了服务端异步处理的思想，支持异步调用和响应处理，提高了服务的并发性和吞吐量。此外，Dubbo 还支持多线程模型和线程池调度，可以快速响应大量并发请求。
5. 多种容错机制：Dubbo 的架构设计具有多种容错机制，包括服务降级、失败重试、熔断器等，可以有效提高服务的可用性和稳定性。此外，Dubbo 还支持多种负载均衡策略和路由策略，可以根据不同的应用场景进行灵活配置。

**不同层次的方案：**

1. Proxy 服务代理层：支持 JDK 动态代理、javassist 等代理机制
2. Registry 注册中心层：支持 Zookeeper 、Redis 等作为注册中心
3. Protocal 远程过程调用：支持 Dubbo、Http 等调用协议
4. Transport 网络传输层：支持 Netty、Mina 等网络传输框架
5. Serialize 数据序列化层：支持 JSON、Hessian 等序列化机制





### 部署架构

![//imgs/v3/concepts/threecenters.png](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//dubbo/20230319/%E9%83%A8%E7%BD%B2%E6%9E%B6%E6%9E%84.png)

作为一个微服务框架，Dubbo sdk 跟随着微服务组件被部署在分布式集群各个位置，为了在分布式环境下实现各个微服务组件间的协作， Dubbo 定义了一些中心化组件，这包括：

1. 注册中心：协调消费者与生产者的地址注册和发现
2. 配置中心：存储 Dubbo 启动阶段的全局配置，保证个环境配置一致；还负责服务治理规则（路由、动态配置）的存储和推送
3. 元数据中心：接收生产者上报的服务接口的元数据，相当于注册中心的额外扩展







## 通信协议

> Dubbo3 提供了 Triple(Dubbo3)、Dubbo2 协议，这是 Dubbo 框架的原生协议。除此之外，Dubbo3 也对众多第三方协议进行了集成，并将它们纳入 Dubbo 的编程与服务治理体系， 包括 gRPC、Thrift、JsonRPC、Hessian2、REST 等。

Dubbo 对通信协议的支持具有以下特点：

- 不绑定通信协议
- 提供高性能通信协议实现
- 支持流式通信模型
- 不绑定序列化协议
- 支持单个服务的多协议暴露
- 支持单端口多协议发布
- 支持一个应用内多个服务使用不同通信协议

RPC 协议的设计需要考虑以下内容：

- 通用性： 统一的二进制格式，跨语言、跨平台、多传输层协议支持
- 扩展性： 协议增加字段、升级、支持用户扩展和附加业务元数据
- 性能：As fast as it can be
- 穿透性：能够被各种终端设备识别和转发：网关、代理服务器等 通用性和高性能通常无法同时达到，需要协议设计者进行一定的取舍。





### 通信模型

Dubbo 提供更丰富的通信模型：

- 消费端异步请求(Client Side Asynchronous Request-Response)
- 提供端异步执行（Server Side Asynchronous Request-Response）
- 消费端请求流（Request Streaming）
- 提供端响应流（Response Streaming）
- 双向流式通信（Bidirectional Streaming）





### Triple 协议

> Triple 兼容 gRPC ，以 HTTP2 作为传输层构建新的协议

:::note 补充

自从 2017 年 gRPC 协议成为 CNCF 的项目后，包括 k8s、etcd 等越来越多的基础设施和业务都开始使用 gRPC 的生态，作为云原生的微服务化框架， Dubbo 的新协议也完美兼容了 gRPC。并且，对于 gRPC 协议中一些不完善的部分， Triple 也将进行增强和补充。

:::

自从 2017 年 gRPC 协议成为 CNCF 的项目后，包括 k8s、etcd 等越来越多的基础设施和业务都开始使用 gRPC 的生态，作为云原生的微服务化框架， Dubbo 的新协议也完美兼容了 gRPC。并且，对于 gRPC 协议中一些不完善的部分， Triple 也将进行增强和补充。

基于 grpc 协议进行进一步扩展

- Service-Version → “tri-service-version” {Dubbo service version}
- Service-Group → “tri-service-group” {Dubbo service group}
- Tracing-ID → “tri-trace-traceid” {tracing id}
- Tracing-RPC-ID → “tri-trace-rpcid” {_span id _}
- Cluster-Info → “tri-unit-info” {cluster infomation}





## 服务治理能力

![governance](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//dubbo/20230315/dubbo%E6%9C%8D%E5%8A%A1%E6%B2%BB%E7%90%86%E8%83%BD%E5%8A%9B.png)

1. **地址发现**：Dubbo 服务发现具备高性能、支持大规模集群、服务级元数据配置等优势，默认提供 Nacos、Zookeeper、Consul 等多种注册中心适配，与 Spring Cloud、Kubernetes Service 模型打通，支持自定义扩展。
2. **负载均衡**：Dubbo 默认提供加权随机、加权轮询、最少活跃请求数优先、最短响应时间优先、一致性哈希和自适应负载等策略
3. **流量路由**：Dubbo 支持通过一系列流量规则控制服务调用的流量分布与行为，基于这些规则可以实现基于权重的比例流量分发、灰度验证、金丝雀发布、按请求参数的路由、同区域优先、超时配置、重试、限流降级等能力。
4. **链路追踪**：Dubbo 官方通过适配 OpenTelemetry 提供了对 Tracing 全链路追踪支持，用户可以接入支持 OpenTelemetry 标准的产品如 Skywalking、Zipkin 等。另外，很多社区如 Skywalking、Zipkin 等在官方也提供了对 Dubbo 的适配。
5. **可观测性**：Dubbo 实例通过 Prometheus 等上报 QPS、RT、请求次数、成功率、异常次数等多维度的可观测指标帮助了解服务运行状态，通过接入 Grafana、Admin 控制台帮助实现数据指标可视化展示。

Dubbo 服务治理生态还提供了对 **API 网关**、**限流降级**、**数据一致性**、**认证鉴权**等场景的适配支持。





## 服务发现

> 服务发现，即消费端自动发现服务地址列表的能力，是微服务框架需要具备的关键能力，借助于自动化的服务发现，微服务之间可以在无需感知对端部署位置与 IP 地址的情况下实现通信。

![img](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//dubbo/20230318/%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0.png)

:::note 3.x 与 2.x

相比于 2.x 版本中的基于接口粒度的服务发现机制，3.x 引入了全新的基于应用粒度的服务发现机制。

就使用方式上而言，Dubbo3 与 Dubbo2 的服务发现配置是完全一致的，不需要改动什么内容。但就实现原理上而言，Dubbo3 引入了全新的服务发现模型 - 应用级服务发现， 在工作原理、数据格式上已完全不能兼容老版本服务发现。

:::

Dubbo 的服务发现机制，让微服务组件之间可以独立演进并任意部署，消费端可以在无需感知对端部署位置与 IP 地址的情况下完成通信。Dubbo 提供的是 Client-Based 的服务发现机制，使用者可以有多种方式启用服务发现：

- 使用独立的注册中心组件，如 Nacos、Zookeeper、Consul、Etcd 等。
- 将服务的组织与注册交给底层容器平台，如 Kubernetes，这被理解是一种更云原生的方式



**注册中心：**

服务发现的一个核心组件是注册中心，Provider 注册地址到注册中心，Consumer 从注册中心读取和订阅 Provider 地址列表。





## 服务网格

Service Mesh 在业界得到了广泛的传播与认可，并被认为是下一代的微服务架构，这主要是因为它解决了很多棘手的问题，包括透明升级、多语言、依赖冲突、流量治理等。	



Service Mesh 的典型架构是通过部署独立的 Sidecar 组件来拦截所有的出口与入口流量，并在 Sidecar 中集成丰富的流量治理策略如负载均衡、路由等，除此之外，Service Mesh 还需要一个控制面（Control Panel）来实现对 Sidecar 流量的管控，即各种策略下发。我们在这里称这种架构为经典 Mesh。



然而任何技术架构都不是完美的，经典 Mesh 在实施层面也面临成本过高的问题

1. 需要运维控制面（Control Panel）
2. 需要运维 Sidecar
3. 需要考虑如何从原有 SDK 迁移到 Sidecar
4. 需要考虑引入 Sidecar 后整个链路的性能损耗

为了解决 Sidecar 引入的相关成本问题，Dubbo 引入了另一种变相的 Mesh 架构 - Proxyless Mesh，顾名思义，Proxyless Mesh 就是指没有 Sidecar 的部署，转而由 Dubbo SDK 直接与控制面交互。



可以设想，在不同的组织、不同的发展阶段，未来以 Dubbo 构建的微服务将会允许有三种部署架构：传统 SDK、基于 Sidecar 的 Service Mesh、脱离 Sidecar 的 Proxyless Mesh。







## 负载均衡策略

1. Random Load Balance 随机负载均衡策略：随机选择一个可用的服务提供者。
2. Round Robin Load Balance 轮询负载均衡策略：按照顺序轮询选择可用的服务提供者。
3. Least Active Load Balance 最小活跃数负载均衡策略：选择当前活跃数最少的可用服务提供者，活跃数指当前处理请求的线程数。
4. Consistent Hash Load Balance 一致性哈希负载均衡策略：将每个服务提供者映射到一个哈希环上，根据请求的哈希值选择距离该哈希值最近的服务提供者。
5. Weighted Random Load Balance 加权随机负载均衡策略：在随机负载均衡策略的基础上，根据每个服务提供者的权重进行加权选择。
6. Weighted Round Robin Load Balance 加权轮询负载均衡策略：在轮询负载均衡策略的基础上，根据每个服务提供者的权重进行加权选择。
7. Sticky Load Balance 粘滞会话负载均衡策略：将同一个消费者的请求路由到同一个服务提供者，实现会话粘滞。





## 服务引入

Dubbo完成服务引入的过程如下：

1. 消费者引入依赖：在消费者端的项目中，需要引入 Dubbo 相关依赖，如 dubbo、dubbo-spring-boot-starter 等。
2. 配置消费者信息：在消费者端的项目中，需要配置 Dubbo 的消费者信息，包括注册中心地址、服务超时时间、服务调用重试次数等等。
3. 编写消费者代码：编写调用 Dubbo 服务的消费者代码，一般可以通过 @Reference 注解注入服务代理对象，然后像调用本地方法一样调用服务即可。
4. 启动消费者应用：启动消费者应用，Dubbo 将自动从注册中心订阅服务提供者的地址列表，并建立连接。
5. 远程调用：Dubbo 将消费者的请求通过网络协议发送给服务提供者，服务提供者接收请求并返回响应结果，Dubbo 再将响应结果返回给消费者端。

总的来说，Dubbo完成服务引入的过程就是将服务的代理对象注入到消费者的代码中，并通过网络协议实现远程调用。





## 服务导出

在Dubbo中，服务的导出是通过`Protocol`和`Exporter`两个关键组件来实现的。

首先，`Protocol`是Dubbo的核心组件之一，它定义了服务协议和网络传输方式，并通过`export`方法将服务导出为一个或多个`Exporter`对象，同时通过`refer`方法引入远程服务。Dubbo内置了多种协议，如Dubbo协议、RMI协议、Hessian协议、HTTP协议等，其中Dubbo协议是Dubbo的默认协议。

而`Exporter`则是一个代理对象，用于暴露服务接口，并负责接收和处理客户端请求。在Dubbo中，`Exporter`通常由`Protocol`的实现类来创建，它会将服务接口实现包装成一个`Invoker`对象，并将其绑定到一个网络端口上，以接收客户端请求。

具体的服务导出流程如下：

1. 首先，`Protocol`根据配置文件中指定的协议类型和端口号创建一个对应的实例，例如Dubbo协议的`DubboProtocol`实例；
2. 然后，`Protocol`通过`export`方法将服务接口和服务实现绑定到创建的实例上，并返回一个或多个`Exporter`对象；
3. `Exporter`负责将服务接口实现包装成一个`Invoker`对象，并将其绑定到指定的协议和端口上，等待客户端请求；
4. 客户端通过`ProxyFactory`创建一个远程服务代理对象，并发起远程调用请求；
5. `Invoker`接收到请求后，根据请求信息和服务接口实现执行相应的方法，并将结果返回给客户端。

需要注意的是，Dubbo支持多协议、多注册中心和多集群等场景，因此，在服务导出时，需要根据实际情况进行配置，以满足不同的业务需求。





## 流量管理

> 流量管理的本质是将请求根据制定好的路由规则分发到应用服务上

1. 应用实例可以是单例，也可以是集群
2. 路由规则可以有多个，不同的路由规则之间存在优先级
3. 多个不同的路由规则可以到同一个服务；一个路由也可以到不同服务；路由也可以不路由到任何服务

Dubbo提供了支持mesh方式的流量管理策略，可以很容易实现 [A/B测试](https://www.w3cschool.cn/dubbo/ab-testing-deployment.html)、[金丝雀发布](https://www.w3cschool.cn/dubbo/canary-deployment.html)、[蓝绿发布](https://www.w3cschool.cn/dubbo/blue-green-deployment.html)等能力。







## 配置管理

1. API 配置
2. XML 配置
3. Annotation 配置
4. 属性配置





## 生命周期

Dubbo 微服务要支持 Kubernetes 平台调度，最基础的就是实现 dubbo 服务生命周期与容器生命周期的对齐，这包括 Dubbo 的启动、销毁、服务注册等生命周期事件。

相比于以往 Dubbo 自行定义生命周期事件，并要求开发人员在运维实践过程中遵守约定，Kubernetes 底层基础设施定义了严格的组件生命周期事件(probe)，转而要求 Dubbo 去按约定适配。