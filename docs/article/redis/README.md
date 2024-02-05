---
notPage: true
---



# Redis



[[toc]]



:::info 什么是 Redis

Redis，**Remote Dictionary Server（远程数据服务）**，是一种支持key-value等多种数据结构的存储系统。可用于缓存，事件发布或订阅，高速队列等场景。支持网络，提供字符串，哈希，列表，队列，集合结构直接存取，基于内存，可持久化。

Redis是一种支持key-value等多种数据结构的存储系统。可用于缓存，事件发布或订阅，高速队列等场景。支持网络，提供字符串，哈希，列表，队列，集合结构直接存取，基于内存，可持久化。

:::

<iframe
  :src="$withBase('/markmap/html/redis/Redis知识图谱.html')"
  width="100%"
  height="400"
  frameborder="0"
  scrolling="No"
  leftmargin="0"
  topmargin="0"
/>
:::info 文章出处

Redis 相关的内容大部分内容来自狂神的 B 站视频

另外部分源自于「Java 全栈知识体系」，原文链接：https://pdai.tech/md/db/nosql-redis/db-redis-introduce.html

:::



## Redis IO 模型

> redis 3.0 之前是单线程模型

1. redis 单线程每秒可以处理  8w - 11w 的读写请求



### 单线程模型

![单线程模型](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//redis/20230504/redis%E5%8D%95%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%9E%8B.png)

1. 可维护性高
2. 不存在并发读写问题
3. 不存在线程切换的开销问题
4. 不存在加锁、解锁、死锁的问题



### 多线程模型

> 混合模型，只是在接收请求时使用多线程，处理命令时还是单线程

![多线程模型](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//redis/20230504/redis%E5%A4%9A%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%9E%8B.png)







## 配置文件

### redis.conf

模块划分：

1. INCLUDES
2. MODULES
3. NETWORK
4. GENERAL
5. SNAPSHOTTING
6. REPLICATION
7. SECURITY
8. LAZY FREEING
9. APPEND ONLY MODE
10. LUA SCRIPTING
11. SLOW LOG
12. LATENCY MONITOR
13. EVENT NOTIFICATION
14. ADVANCED CONFIG
15. ACTIVE DEFRAGMENTATION

| 序号 | 配置                                | 说明                                     |
| ---- | ----------------------------------- | ---------------------------------------- |
|      | `bind <IP>`                         | 绑定的 IP                                |
|      | `protected-mode yes`                | 开启保护模式                             |
|      | `port <port>`                       | 启动端口，默认为 6379                    |
|      | `daemonize yes`                     | 以守护线程的方式启动                     |
|      | `timeout <time>`                    | 空闲超时断开，默认不断开                 |
|      | `tcp-keepalive <time>`              | 检测是否存活                             |
|      | `tcp-backlog <queuelength>`         | tcp 连接队列，解决并发场景下的慢连接问题 |
|      | `pidfile <path>/redis_6379.pid`     | 以后台方式启动需要指定 PID 文件          |
|      | `loglevel notice`                   | 日志等级为 notice                        |
|      | `logfile <path>`                    | 日志文件的位置                           |
|      | `databases <num>`                   | 数据库的数量，默认为 16                  |
|      | `always-show-logo yes`              | 是否总是显示 LOGO                        |
|      | `stop-writes-on-bgsave-error yes`   | 持久化操作出错还是继续操作               |
|      | `appendonly no`                     | 关闭 aof 模式，即默认使用 rdb 持久化     |
|      | `appendfilename <filename>`         | aof 持久化文件名                         |
|      | `rdbcompression yes`                | 启用压缩 rdb 文件                        |
|      | `appendfsync everysec`              | 每一秒持久化一次                         |
|      | `no-appendfsync-on-rewrite no`      | 默认不开启重写                           |
|      | `rdbchecksum yes`                   | 保存 rdb 文件时进行错误校验              |
|      | `replicaof <masterip> <masterport>` | 主从的主节点 IP 和 Port                  |
|      | `masterauth <masterpassword>`       | 主机密码                                 |
|      | `requirepass <password>`            | 设置密码                                 |
|      | `maxclients <num>`                  | 客户端连接数最大数量                     |
|      | `maxmemory <bytes>`                 | 最大内存容量                             |
|      | `maxmemory-policy <policy>`         | 内存达到上限之后的处理策略               |

补充（policy）：

1. volatile-lru：只对设置了过期时间的key进行LRU（默认值）
2. allkeys-lru ： 删除lru算法的key
3. volatile-random：随机删除即将过期key
4. allkeys-random：随机删除
5. volatile-ttl ： 删除即将过期的
6. noeviction ： 永不过期，返回错误





### sentinel.conf

|      | 配置                                              | 说明                                                         |
| ---- | ------------------------------------------------- | ------------------------------------------------------------ |
|      | `sentinel down-after-milliseconds mymaster 30000` | sentinel 认为 master 主观下线需要经历的时间，注意这个对于 sentinel 之间也有作用 |
|      | `sentinel parallel-syncs mymaster 1`              | 能够与 master 节点同步的 slave 数量，这里体现了 redis 是保证 AP 的 |
|      | `sentinel failover-timeout mymaster 180000`       | 故障转移失败后重试的时长，注意，如果前一次对一个节点的尝试超时了，那么对下一个节点的尝试时长会翻倍 |
|      | `sentinel deny-scripts-reconfig yes`              | 运行期间不能修改用于故障转移的脚本                           |

注意：可以通过 `sentinel set` 命令来动态修改配置信息





## Java 客户端

> 一般使用 Lettuce + Redission

1. Jedis：使用阻塞 IO，方法都是同步的（不支持异步），客户端实例不是线程安全的，需要通过连接池来管理
2. Lettuce：底层基于 Netty，可扩展、线程安全、支持异步
3. Redission：关注分离，提供许多分布式相关操作



