---
title: "Redis 客户端"
shortTitle: "K-Redis 客户端"
description: "Redis 客户端"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-22
category: 
- "redis"
- "数据库"
- "缓存"
tag:
- "redis"
- "数据库"
- "缓存"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Redis 客户端"
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
  title: "Redis 客户端"
  description: "Redis 客户端"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Redis 客户端

[[toc]]



:::info

相关文档：

1. https://springdoc.cn/spring-data-redis/#redis

:::



## 概述

Spring Boot 提供了多种方式来使用 Redis，以便在应用程序中进行缓存、存储和数据处理。以下是一些常见的 Spring Boot 使用 Redis 的方式：

1. **Spring Data Redis：** Spring Boot 集成了 Spring Data Redis，它简化了与 Redis 数据库的交互。通过定义 Repositories，您可以使用类似于 JPA 的方式来访问和操作 Redis 数据。Spring Data Redis 支持多种数据结构，如字符串、哈希、列表、集合和有序集合。
2. **RedisTemplate：** Spring Boot 通过 `RedisTemplate` 提供了一种编程式的方式来与 Redis 进行交互。它提供了一组方法来执行常见的 Redis 操作，如获取、设置、删除等。您可以通过 `RedisTemplate` 直接操作 Redis 数据结构。
3. **Spring Cache：** Spring Boot 提供了缓存抽象，允许您通过在方法上添加注解来轻松地将方法调用的结果缓存到 Redis 中。您可以使用 `@Cacheable`、`@CachePut` 和 `@CacheEvict` 等注解来控制缓存的行为。
4. **Message Queue 和 Pub/Sub：** Spring Boot 可以将 Redis 用作消息队列，实现异步消息传递。您可以使用 Spring 的 `RedisMessageListenerContainer` 来订阅和处理 Redis 发布/订阅消息。
5. **Spring Session：** Spring Session 是一个用于管理用户会话的项目，它可以将会话数据存储在 Redis 中。这使得应用程序可以在多个实例之间共享会话数据，从而实现更好的可伸缩性。
6. **Spring Integration with Redis：** Spring Boot 通过 Spring Integration 提供了集成 Redis 的能力，以实现企业集成模式。您可以使用 Spring Integration 来构建复杂的消息处理流程，将数据从一个系统传输到另一个系统。
7. **Spring Data Redis Reactive：** 如果您的应用程序采用了响应式编程模型，Spring Boot 也提供了与 Redis 进行响应式交互的能力。您可以使用 Spring Data Redis 的响应式 API 来实现异步和非阻塞的操作。

客户端包括：

1. **Lettuce：** Lettuce 是一个高性能、可扩展的 Redis 客户端库，支持异步和同步操作。它基于 Netty 构建，提供了可靠的连接池、集群支持以及响应式编程模型。在 Spring Boot 中，Lettuce 是默认的 Redis 客户端。
2. **Jedis：** Jedis 是一个流行的 Redis 客户端库，它提供了简单的 API 用于与 Redis 进行交互。Jedis 在多个版本的 Spring Boot 中都得到了支持，但在较新的版本中，Lettuce 更为推荐，因为它更加现代化且性能更好。
3. **Redisson：** Redisson 是一个基于 Redis 的分布式和高级 Java 数据结构库。它提供了许多高级特性，如分布式锁、分布式集合、分布式地图等。虽然 Redisson 可以用作 Redis 客户端，但它的重点更多地放在了分布式数据结构和功能之上。





## Jedis

最简单的引入

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>4.2.0</version>
</dependency>
```

:::info 说明

Jedis是Redis的Java客户端，在SpringBoot 1.x版本中也是默认的客户端。在SpringBoot 2.x版本中默认客户端是Lettuce。

:::

注意：现在不建议使用 Jedis，Jedis 性能差并且不能与 Spring Boot 2.3 以上的版本进行很好的整合，直接使用 lettuce 即可，即直接引入 spring-boot-starter-data-redis。如果需要使用 Jedis 必须找到支持的版本

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <exclusions>
        <exclusion>
            <artifactId>lettuce-core</artifactId>
            <groupId>io.lettuce</groupId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>2.9.0</version>
</dependency>
```

```yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    password: test
    jedis:
      pool:
        min-idle: 0
        max-active: 8
        max-idle: 8
        max-wait: -1ms
    connect-timeout: 30000ms
```

```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        template.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
        template.afterPropertiesSet();
        return template;
    }
}
```

整合 Jedis 与 Spring Boot 之后，可以配置 RedisTemplate 模板，同时需要注意：

1. 需要缓存到 Redis 中的实体类必须序列化
2. Spring Boot 启动类中要添加 @EnableCaching 注解
3. 查询方法上要添加 @Cacheable 注解
4. 对数据进行写操作的方法上需要添加 @CacheEvict 注解
5. 对于需要手工操作 Redis 的方法，需要通过 RedisTemplate 来获取操作对象





## Redission

> 中文文档：https://github.com/redisson/redisson/wiki/%E7%9B%AE%E5%BD%95

:::note 官方说明

Redisson是一个在Redis的基础上实现的Java驻内存数据网格（In-Memory Data Grid）。它不仅提供了一系列的分布式的Java常用对象，还提供了许多分布式服务。其中包括(`BitSet`, `Set`, `Multimap`, `SortedSet`, `Map`, `List`, `Queue`, `BlockingQueue`, `Deque`, `BlockingDeque`, `Semaphore`, `Lock`, `AtomicLong`, `CountDownLatch`, `Publish / Subscribe`, `Bloom filter`, `Remote service`, `Spring cache`, `Executor service`, `Live Object service`, `Scheduler service`) Redisson提供了使用Redis的最简单和最便捷的方法。Redisson的宗旨是促进使用者对Redis的关注分离（Separation of Concern），从而让使用者能够将精力更集中地放在处理业务逻辑上。

:::

依赖：

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.21.0</version>
</dependency>
```

实例：

> Redisson框架提供的几乎所有对象都包含了`同步`和`异步`相互匹配的方法。这些对象都可以通过`RedissonClient`接口获取。同时还为大部分Redisson对象提供了满足[`异步流处理标准`](http://reactive-streams.org/)的程序接口`RedissonReactiveClient`。除此外还提供了`RxJava2`规范的`RedissonRxClient`程序接口。这些对象实例均是线程安全的

1. RedissonClient
2. RedissonReactiveClient
3. RedissonRxClient



### 分布式锁

1. [可重入锁（Reentrant Lock）](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#81-可重入锁reentrant-lock)：加锁对象可重入访问共享资源
2. [公平锁（Fair Lock）](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#82-公平锁fair-lock)：默认是非公平锁，可以设置成公平锁，所有想要过的锁的线程进入队列
3. [联锁（MultiLock）](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#83-联锁multilock)：同时处理多个共享资源时可以使用联锁，即一次性申请多个锁（原子性操作），同时锁住多个共享资源，同时还能够预防死锁
4. [红锁（RedLock）](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#84-红锁redlock)：只有所有锁中的大部分申请成功才能加锁，一般用于解决 Redis 主从集群丢失锁的问题
5. [读写锁（ReadWriteLock）](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#85-读写锁readwritelock)：一个共享资源在没有写锁的情况下，可以添加多个读锁，一旦添加了写锁，就不能添加写锁或者读锁  
6. [信号量（Semaphore）](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#86-信号量semaphore)：无论谁添加的锁，其他线程都可以解锁；当一个线程需要一次性申请多个资源时，也可以使用信号量机制
7. [可过期性信号量（PermitExpirableSemaphore）](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#87-可过期性信号量permitexpirablesemaphore)：一次只能申请一个，每个信号量都有过期时间，且每个信号量可以通过独立的 ID 来识别和释放
8. [闭锁（CountDownLatch）](https://github.com/redisson/redisson/wiki/8.-分布式锁和同步器#88-闭锁countdownlatch)：一个线程或者多个线程，必须在其他某些任务执行完毕后执行，此时可以使用闭锁，比如说分布式计算，计算结果依赖于各个计算步骤的结果

