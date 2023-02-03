# Spring Cloud 概述

![springCloud](http://gitee.com/gzwrrr/typora-img/raw/master/images/springCloud.png)

[Spring Cloud 官网](https://spring.io/projects/spring-cloud)

![image-20220212202341628](http://gitee.com/gzwrrr/typora-img/raw/master/images/image-20220212202341628.png)

## 1.生态

1. Spring Cloud NetFlix —— 旧一站式解决方案
2. Apache Dubbo Zookeeper（注册与发现） —— 半自动解决方案
3. ***Spring Cloud Alibaba —— 新一站式解决方案**

**重点关注的问题：**

1. 服务注册和发现：
   - ~~eureka~~
   - Zookeeper
   - Consul
   - Nacos
2. 服务负载均衡与调用：
   - ~~ribbon~~ / LoadBalancer
   - ~~Feign~~ / OpenFeign
3. 服务熔断与降级：
   - ~~hystrix~~
   - ~~resilience4j~~
   - sentienl
4. 服务消息队列
5. 配置中心管理：
   - ~~Spring Cloud Config~~
   - Nacos
6. 服务网关：
   - ~~Zuul~~
   - gateway
7. 服务总线
   - ~~Bus~~
   - Nacos
8. 服务监控
9. 全链路追踪
10. 自动化构建部署
11. 服务定时任务调度操作



## 2.Eureka 服务注册与发现

> Eureka 是 C/S 模式的，包含两个组件：
>
> 1. Eureka Server：提供服务注册服务，节点启动后，会在 Eureka Server 中进行注册，这样服务注册表中就会存储所有可用的服务节点信息，服务节点信息可在界面中直观地看到
> 2. Eureka Client：是一个 Java 客户端，用于简化 Eureka Server 的交互，客户端具备一个内置的负载均衡器（轮询负载）。在应用启动后，将向 Eureka Server 发送心跳（默认周期 30 秒）。如果 Eureka Server 在多个心跳周期中没有接收到某个节点的心跳，Eeruka Server 就会将这个服务节点移除（默认周期为 90 秒）
> 3. 三大角色：
>    1. Eureka Server：提供服务注册与发现
>    2. Server Provider：将自身服务注册到 Eureka 中，从而使消费者能找到
>    3. Server Consumer：服务消费者从 Eureka 中获取服务注册列表从而找到服务

### 2.1 Eureka 服务端配置

> 需要在主启动类中加入 @EnableEurekaServer 注解开启服务

**pom.xml**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka-server</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>
```

**application.yml**

```yml
server:
  port: 8003
# Eureka 配置
eureka:
  # 实例化
  instance:
    hostname: localhost
  client:
    # 服务端不需要将自己注册
    register-with-eureka: false
    # 表示自己是注册中心
    fetch-registry: false
    service-url:
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```

## 2.2 Eureka 客户端配置

> 需要在主启动类中加入 @EnableEurekaClient 注解注册服务

**pom.xml**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka</artifactId>
    <version>1.4.6.RELEASE</version>
</dependency>
<!-- 完善监控信息 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**application.yml**

```yml
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8003/eureka/
# 监控信息配置
info:
  app.name: springcloud-provider-dept
  company.name: xxx.gzw.com
```





下次开始 p10
