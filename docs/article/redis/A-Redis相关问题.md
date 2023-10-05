---
title: "Redis 相关问题"
shortTitle: "A-Redis 相关问题"
description: "Redis 相关问题"
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
  text: "Redis 相关问题"
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
  title: "Redis 相关问题"
  description: "Redis 相关问题"
  author:
    name: gzw
    email: 1627121193@qq.com
---

# Redis 相关问题

[[toc]]

## 1.Redis的相关问题

- redis是单线程的，是基于内存操作的，CPU不是redis的性能瓶颈，redis的瓶颈在于机器的内存和网络带宽，官方表示这可以使用单线程实现，便使用单线程了

- redis将所有的数据放在了内存中，使用单线程是最快的。倘若使用多线程，会在CPU中进行上下文切换，这是非常耗时的

### 1.1 Redis.conf

**【】中的为具体的自定义配置**

| 序号 |                   参数                    |                             说明                             |
| :--: | :---------------------------------------: | :----------------------------------------------------------: |
|  1   |                   unit                    |                     单位，对大小写不敏感                     |
|  2   |             include 【path】              |               可以将多个配置文件引入组合成一个               |
|  3   |                bind 【ip】                |                           绑定 ip                            |
|  4   |       pretected-mode 【yes \| no】        |                是否开启受保护模式，默认为 yes                |
|  5   |               port 【port】               |                           设置端口                           |
|  6   |          daemonize 【yes \| no】          |             是否以守护进程的方式运行，默认是 no              |
|  7   |             pidfile 【path】              |              指定 pid 文件，让 redis 在后台运行              |
|  8   |            loglevel 【level】             |                         指定日志级别                         |
|  9   |             logfile 【path】              |                        日志文件的位置                        |
|  10  |             database 【sum】              |                   数据库的数量，默认为 16                    |
|  11  |      always-show-logo 【yes \| no】       |                      是否总是显示 logo                       |
|  12  |         save 【time】 【keyNum】          | 在 time 时间（单位为：s）内修改了 keyNum 个 key 就将数据持久化到 .rdb/.aof 文件 |
|  13  | stop-writes-on-bgsave-error 【yes \| no】 |         如果持久化出错，是否还需要继续工作，默认 yes         |
|  14  |       rdbcompression 【yes \| no】        |                 是否压缩 rdb 文件，默认 yes                  |
|  15  |               dir 【path】                |                      rdb 文件的保存目录                      |
|  16  |            requirepass 【pwd】            |                      设置密码，默认为空                      |
|  17  |            maxclients 【sum】             |                         最大连接数量                         |
|  18  |            maxmemory 【size】             |            redis 配置的最大内存容量，单位为 byte             |
|  19  |        maxmemory-policy noeviction        |                  内存达到上限之后的处理策略                  |
|  20  |         appendonly 【yes \| no】          |        是否使用 aof 持久化模式，默认为 no，即使用 rdb        |
|  21  |        appendfilename 【filename】        |                       持久化文件的名称                       |
|  22  |            appendsync everysec            |                 每秒都执行一次同步数据的操作                 |



### 1.2 为什么要使用Redis

1. 读写性能优异：Redis 读取速度是 110000 次/s,写的速度是 81000 次/s
2. 数据类型丰富：Redis支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作
3. 原子性：Redis 所有操作都是原子性的，同时 Redis 还支持对几个操作合并后执行原子性操作
4. 支持发布/订阅模式、通知、key 过期等特性
5. 支持使用 RDB 或者 AOF 进行持久化
6. 分布式，可以使用集群





### 1.3 Redis 单线程快的原因

Redis基于Reactor模式开发了网络事件处理器，这个处理器叫做文件事件处理器 file event handler。

这个文件事件处理器，它是单线程的，所以 Redis 才叫做单线程的模型，它采用IO多路复用机制来同时监听多个Socket，根据Socket上的事件类型来选择对应的事件处理器来处理这个事件。

可以实现高性能的网络通信模型，又可以跟内部其他单线程的模块进行对接，保证了 Redis 内部的线程模型的简单性。

1. 文件事件处理器的结构包含4个部分：多个Socket、IO多路复用程序、文件事件分派器以及事件处理器（命令请求处理器、命令回复处理器、连接应答处理器等）
2. 多个 Socket 可能并发的产生不同的操作，每个操作对应不同的文件事件，但是IO多路复用程序会监听
3. 多个 Socket，会将 Socket 放入一个队列中排队，每次从队列中取出一个 Socket 给事件分派器，事件分派器把 Socket 给对应的事件处理器。
4. 然后一个 Socket 的事件处理完之后，IO多路复用程序才会将队列中的下一个 Socket 给事件分派器。文件事件分派器会根据每个 Socket 当前产生的事件，来选择对应的事件处理器来处理。

单线程快的原因：

1. 纯内存操作
2. 核心是基于非阻塞的IO多路复用机制
3. 单线程反而避免了多线程的频繁上下文切换带来的性能问题





### 1.4 使用场景

1. 热点数据缓存：一般有两种保存数据的方式：
   1. 读取前，先去读Redis，如果没有数据，读取数据库，将数据拉入Redis，此时要注意缓存击穿，而且数据的实时性会相对较差，适用于对于数据实时性要求不是特别高的场景
   2. 插入数据时，同时写入Redis，这样实时性相对较强，但是开发时不便于统一处理，适用于字典表、数据量不大的数据存储
2. 延时任务，限时业务，例如订单支付、限时优惠活动。另外：延时操作还可以使用rabbitmq、activemq 等消息中间件来实现
3. redis由于 `incrby` 命令可以实现原子性的递增，所以可以运用于高并发的秒杀活动、分布式序列号的生成、具体业务还体现在比如限制一个手机号发多少条短信、一个接口一分钟限制多少请求、一个接口一天限制调用多少次等等
4. 可以实现 **分布式锁**：这个主要利用redis的setnx命令进行，setnx："set if not exists"就是如果不存在则成功设置缓存同时返回1，否则返回0 ，这个特性在很多后台中都有所运用，因为我们服务器是集群的，定时任务可能在两台机器上都会运行，所以在定时任务中首先 通过setnx设置一个lock， 如果成功设置则执行，如果没有成功设置，则表明该定时任务已执行。 当然结合具体业务，我们可以给这个lock加一个过期时间，比如说30分钟执行一次的定时任务，那么这个过期时间设置为小于30分钟的一个时间就可以，这个与定时任务的周期以及定时任务执行消耗时间相关。在分布式锁的场景中，主要用在比如秒杀系统等
5. 可以实现排行榜、点赞、求出共同好友等并存储
6. 实现队列：由于Redis有list push和list pop这样的命令，所以能够很方便的执行队列操作





### 1.5 相关框架

1. Redission（分布式锁/分布式服务）：Redission是一个基于Redis的Java分布式对象和服务框架，它提供了分布式锁、分布式对象、分布式限流、分布式集合等功能。在分布式系统中，分布式锁是非常重要的一种机制，用来保证多个进程或线程访问共享资源的安全性。Redission提供了多种分布式锁实现方式，例如可重入锁、公平锁、联锁、红锁等。Redission还支持异步和反应式编程模型，可以帮助我们实现高效的分布式应用程序。
2. lettuce（Redis客户端）：lettuce是一个高性能的Redis客户端库，它提供了同步、异步和反应式编程模型，支持集群、哨兵和单机部署模式。lettuce可以与Spring等常见框架集成，使我们的开发变得更加便捷。
3. Jedis（Redis客户端）：Jedis是一个广泛使用的Java Redis客户端，它提供了比较完整的Redis操作接口，可以实现数据读写、事务、发布订阅等操作。与lettuce不同的是，Jedis只支持同步操作，不支持异步和反应式编程模型。Jedis可以与Spring等框架集成，使我们的开发变得更加简单。
4. Spring Data Redis（数据访问）：Spring Data Redis是Spring Data家族的一部分，提供了对Redis的支持。它提供了一个强大的RedisTemplate，可以方便地进行数据读写、事务、发布订阅等操作。Spring Data Redis还支持对Redis集群和哨兵模式的访问，并提供了基于注解和XML的配置方式，可以轻松实现与Spring框架的集成。







### 1.6 性能测试  

redis-benchmark 是 redis 官方自带的一个压力测试工具

redis-benchmark 命令参数：

| 序号 | 选项  | 描述                                     | 默认值    |
| ---- | :---- | :--------------------------------------- | :-------- |
| 1    | -h    | 指定服务器主机名                         | 127.0.0.1 |
| 2    | -p    | 指定服务器端口                           | 6379      |
| 3    | -s    | 指定服务器socket                         | /         |
| 4    | -c    | 指定并发连接数                           | 50        |
| 5    | -n    | 指定请求数                               | 10000     |
| 6    | -d    | 以字节的形式指定SET/GET值的数据大小      | 2         |
| 7    | -k    | 1=keep alive 0 = reconnect               | 1         |
| 8    | -r    | SET/GET/INCR 使用随机key，SADD使用随机值 | /         |
| 9    | -p    | 通过管道传输`<numreq>`请求               | 1         |
| 10   | -q    | 强制退出redis，仅显示query/sec值         | /         |
| 11   | --csv | 以CSV格式输出                            | /         |
| 12   | -l    | 生成循环，永久执行测试                   | /         |
| 13   | -t    | 仅运行以逗号分隔的测试命令列表           | /         |
| 14   | -l    | Idle模式，仅打开N个idle连接并等待        | /         |




