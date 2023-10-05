---
title: "Redis 其他"
shortTitle: "Z-Redis 其他"
description: "Redis 其他"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-22
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
  text: "Redis 其他"
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
  title: "Redis 其他"
  description: "Redis 其他"
  author:
    name: gzw
    email: 1627121193@qq.com
---


# Redis 其他


[[toc]]


## Jedis

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>Jedis</artifactId>
    <version>3.2.0</version>
</dependency>
```



## Spring Boot 整合 Redis

本地缓冲，是对于单体应用而言的

分布式系统中不要使用本地缓冲，而是要对应使用分布式缓存



```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <exclusions>
        <exclusion>
            <groupId>io.lettuce</groupId>
            <artifactId>lettuce-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```


注意点：

Spring Boot 2.0 之后默认使用 lettuce 作为操作 Redis 的客户端，而 lettuce 是使用 Netty 进行网络通信的，lettuce 的某些 bug 会导致 Netty 堆外内存溢出

Netty 启动时不指定堆外内存时，就会默认使用服务启动时指定的 `-Xmx=...` 作为堆外内存

可以升级 lettuce 客户端或者切换为 Jedis 作为客户端解决上述提到的问题




```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

- Spring Boot 2.x 的 redis 整合 没有使用 Jedis 而是 lettuce
- Jedis 采用了智联，多线程操作是不安全的，如果需要避免不安全需要使用 Jedis pool 连接池，更像 BIO 模式
- lettuce 采用 netty，实例可以在多个线程中进行共享，不存在线程不安全的请路况，可以减少线程数据，更像 NIO 模式

**简单的自定义配置：**

```java
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) throws UnknownHostException {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);

        // 序列化配置
        Jackson2JsonRedisSerializer<Object> objectJackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        objectJackson2JsonRedisSerializer.setObjectMapper(om);
        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();

        // key 采用 String 的序列化方式
        template.setKeySerializer(stringRedisSerializer);
        // hash 的 key 也采用 String 的序列化方式
        template.setHashKeySerializer(stringRedisSerializer);
        // value 序列化方式采用 jackson
        template.setValueSerializer(objectJackson2JsonRedisSerializer);
        // hash 的 value 序列化方式采用 jackson
        template.setHashKeySerializer(objectJackson2JsonRedisSerializer);
        template.afterPropertiesSet();

        return template;
    }
}
```



## 运维监控

**可视化监控工具：**

1. redis-stat
2. RedisLive
3. redmon
4. redis

**监控必须考虑的点：**

1. 指标**采集**，即采集redis提供的metric指标，所以方案中有时候会出现Agent，比如metricBeat；
2. 监控的数据**持久化**，只有将监控数据放到数据库，才能对比和长期监控；
3. **时序化**，因为很多场景都会按照时间序列去展示 - 所以通常是用时序库或者针对时间列优化；
4. **可视化**，比如常见的kibana，grafana等
5. 按条件**报警**，因为运维不可能盯着看，只有引入报警配置，触发报警条件时即发出报警，比如短息提醒等；基于不同报警方式，平台可以提供插件支持等；

**成熟监控方案：**

1. ELK Stack：
   1. 采集agent: metricBeat
   2. 收集管道：logstash
   3. DB: elasticSearch
   4. view和告警: kibana及插件
2. fluent + Prometheus + Grafana
   1. 采集指标来源: redis-export
   2. 收集管道：fluentd
   3. DB: Prometheus
   4. view和告警: Grafana及插件





## Lua 脚本

Redis使用Lua脚本主要是为了实现原子性操作，保证多个命令的原子性执行。这是因为Redis的单个命令是原子性的，但是多个命令的组合则不是原子性的，因此在一些特定场景下，使用Lua脚本可以实现多个命令的原子性操作。

另外，使用Lua脚本还可以将多个Redis命令通过网络一次性传输到Redis服务器端执行，减少了网络传输的开销，提高了Redis的性能。此外，Lua脚本在Redis服务器端预编译并缓存，因此重复使用同一脚本可以减少解析和编译的开销，进一步提升Redis的性能。

总之，Redis使用Lua脚本可以提供原子性操作和性能优化的效果，适用于需要高性能、高可靠性的应用场景。