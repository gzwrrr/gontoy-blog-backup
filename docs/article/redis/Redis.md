---
title: "Redis 简单使用"
shortTitle: "Redis 简单使用"
description: "Redis 简单使用"
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
timeline: true,
dir:
  text: "Redis 简单使用"
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
  title: "Redis 简单使用"
  description: "Redis 简单使用"
  author:
    name: gzw
    email: 1627121193@qq.com
---






# Redis 简单使用



# 1.Redis的相关问题

- redis是单线程的，是基于内存操作的，CPU不是redis的性能瓶颈，redis的瓶颈在于机器的内存和网络带宽，官方表示这可以使用单线程实现，便使用单线程了

- redis将所有的数据放在了内存中，使用单线程是最快的。倘若使用多线程，会在CPU中进行上下文切换，这是非常耗时的

## 1.1 Redis.conf

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

p28



# 2.性能测试

redis-benchmark 是 redis 官方自带的一个压力测试工具

## 2.1 redis-benchmark 命令参数

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
| 9    | -p    | 通过管道传输<numreq>请求                 | 1         |
| 10   | -q    | 强制退出redis，仅显示query/sec值         | /         |
| 11   | --csv | 以CSV格式输出                            | /         |
| 12   | -l    | 生成循环，永久执行测试                   | /         |
| 13   | -t    | 仅运行以逗号分隔的测试命令列表           | /         |
| 14   | -l    | Idle模式，仅打开N个idle连接并等待        | /         |



# 3.Redis的基础知识

redis默认有16个数据库，默认使用第0个

## 3.1  基础语法

| 序号 | 语法                 | 解释                               |
| ---- | -------------------- | ---------------------------------- |
| 1    | `select 0~15`        | 切换数据库                         |
| 2    | `dbsize`             | 查看当前数据库的空间大小           |
| 3    | `set 键 值`          | 储存数据                           |
| 4    | `get 键`             | 获取键对应的值                     |
| 5    | `keys *`             | 查看当前数据库中所有的键           |
| 6    | `flushdb`            | 清空当前数据库                     |
| 7    | `flushall`           | 清空所有数据库                     |
| 8    | `exists 键`          | 查看当前数据库是否存在这个键       |
| 9    | `move 键 值`         | 移除当前数据库中的指定键值对       |
| 10   | `expire 键 时间`     | 指定时间结束后过期，即删除该键值对 |
| 11   | `ttl 键`             | 查看指定键值对剩余存活时间         |
| 12   | `append 键 追加的值` | 向指定键的值后追加值               |



## 3.2 基本类型

### 3.2.1 String

- 相关的用法

| 序号 | 语法                            | 解释                                                         |
| ---- | ------------------------------- | ------------------------------------------------------------ |
| 1    | `strlen 键`                     | 查看对应值的长度                                             |
| 2    | `incr 键`                       | 让指定键的值自动加1，并显示                                  |
| 3    | `decr 键`                       | 让指定键的值自动减1，并显示                                  |
| 4    | `incrby 键 增量`                | 让指定键的值增加指定的增量                                   |
| 5    | `decrby 键 减量`                | 让指定键的值减少指定的减量                                   |
| 6    | `getrange 键 起始下标 结束下标` | 得到指定键中指定范围的值                                     |
| 7    | `setrange 键 起始下标 修改的值` | 替换指定键中起始下标及往后的值为指定修改的值                 |
| 8    | `setex 键 过期时间 值`          | setex : set with expire，存入键值对并指定过期时间            |
| 9    | `setnx 键 值`                   | setnx : set if not exist，如果不存在再添加（分布式锁中常用） |
| 10   | `mset 键1 值1 键2 值2 ...`      | 同时设置多个键值对                                           |
| 11   | `mget 键1 键2 ...`              | 同时获取多个值                                               |
| 12   | `msetnx 键1 值1 键2 值2`        | 不存在才添加，原子性操作，只有全部不存在才能成功             |
| 13   | `getset 键 新值`                | 如果存在值才获取对应的值，然后再设置新的值                   |



### 3.2.2 List

注：在list中，值是可以重复的，左与前对应，右与后对应，带字母 “ l ” 的命令中的 “ l ” 含义有时是list，有时是left

| 序号 | 语法                                        | 解释                                                         |
| ---- | ------------------------------------------- | ------------------------------------------------------------ |
| 1    | `lpush list名 值`                           | 从左侧添加值（头部）                                         |
| 2    | `rpush list名 值`                           | 从右侧添加值（尾部）                                         |
| 3    | `lrange list名 起始下标 结束下标`           | 查看一定范围内list的值                                       |
| 4    | `lpop list名`                               | 移除list左侧第一个值                                         |
| 5    | `rpop list名`                               | 移除list右侧第一个值                                         |
| 6    | `lindex list名 index`                       | 获取index索引对应的值                                        |
| 7    | `llen list名`                               | 获取list的长度                                               |
| 8    | `lrem list名 数量 需要移除的值`             | 移除指定的值                                                 |
| 9    | `ltrim list名 起始下标 结束下标`            | 只保留范围内的值（删除其余的值）                             |
| 10   | `rpoplpush 被pop的list1名 被push的list2名`  | 将list1最右边值移除并添加到list2的最左边（这是一个组合命令 ） |
| 11   | `lset list名 index 新值`                    | 更新list里index索引对应的值为新值                            |
| 12   | `linsert list名 before|after 指定值 插入值` | 将插入值插入到指定值的前面/后面                              |



### 3.2.3 Set

注：set中的值是不可以重复的，也是无序的

| 序号 | 语法                                         | 解释                                           |
| ---- | -------------------------------------------- | ---------------------------------------------- |
| 1    | `sadd set名 值`                              | 添加值                                         |
| 2    | `smembers set名`                             | 查看值                                         |
| 3    | `sismember set名 被判断的值`                 | 判断set中是否有被判断的值，有则返回，否则返回0 |
| 4    | `scard set名`                                | 获取set集合中的元素个数                        |
| 5    | `srem set名 指定值`                          | 移除set中指定的值                              |
| 6    | `srandmember set名`                          | 从set中随机取出一个值                          |
| 7    | `spop set名`                                 | 从set中随机移除一个值                          |
| 8    | `smove 被移除的set1名 被移入的set2名 指定值` | 将set1中指定的值移入到set2中                   |
| 9    | `sdiff set1名 set2名`                        | 获得两个set的差集                              |
| 10   | `sinter set1名 set2名`                       | 获得两个set的交集                              |
| 11   | `sunion set1名 set2名`                       | 获得两个set的并集                              |



### 3.2.4 Hash

注：是一个Map集合（键值对key-value），本质和String没有太大区别，只不过hash更适合存储对象

| 序号 | 语法                               | 解释                                         |
| ---- | ---------------------------------- | -------------------------------------------- |
| 1    | `hset hash名 键 值`                | 添加键值对                                   |
| 2    | `hget hash名 指定键`               | 根据指定键得到值                             |
| 3    | `hmset hash名 键1 值1 键2 值2 ...` | 同时设置多个键值对                           |
| 4    | `hmget hash名 键1 键2 ...`         | 同时获取多个值                               |
| 5    | `hgetall hash名`                   | 获取全部的键值对                             |
| 6    | `hdel hash名 指定键`               | 删除指定键的键值对                           |
| 7    | `hlen hash名`                      | 获取hash的字段数量                           |
| 8    | `hexists hash名 指定键`            | 判断指定键对应的键值对是否存在               |
| 9    | `hkeys hash名`                     | 获取hash所有的键                             |
| 10   | `hvals hash名`                     | 获取hash所有的值                             |
| 11   | `hincrby hash名 指定键 增量`       | 将指定键的值增加对应增量（增量也可以是负的） |
| 12   | `hsetnx hash 键 值`                | 不存在则添加，否则不添加                     |



### 3.2.5 Zset

注：在set的基础上增加了一个score，zset是有序的

| 序号 | 语法                                        | 解释                                                         |
| ---- | ------------------------------------------- | ------------------------------------------------------------ |
| 1    | `zadd zset名 score 值`                      | 添加值                                                       |
| 2    | `zadd zset名 score1 值1 score2 值2 ...`     | 同时添加多个值                                               |
| 3    | `zrangebyscore zset名 -inf +inf withscores` | 根据score的大小从小到大排序排序查询，查询结果的score范围无穷小到无穷大 |
| 4    | `zrevrange zset 0 -1`                       | 同上类似，由大到小排序查询                                   |
| 5    | `zrange zset名 起始下标结束下标`            | 查看范围内的值                                               |
| 6    | `zrem zset名 指定值`                        | 删除指定的值                                                 |
| 7    | `zcard zset名`                              | 获取元素个数                                                 |
| 8    | `zcount zset名 起始下标 结束下标`           | 统计符合范围的score对应的值的总数                            |



## 3.3 特殊类型

**三种特殊类型**

- geospatial
- hyperloglog
- bitmaps

### 3.3.1 geospatial

注：底层实现原理是zset，所以能用zset的命令操作

| 序号 | 语法                                         | 解释                                     |
| ---- | -------------------------------------------- | ---------------------------------------- |
| 1    | `geoadd  键 值（经度 纬度 名称）`            | 添加地理位置                             |
| 2    | `geopos 键 值的名称`                         | 获取经纬度                               |
| 3    | `geodist 键 名称1 名称2 单位`                | 获取两地之间的直线距离                   |
| 4    | `georadius 键 值（经度 纬度） 半径 单位 ...` | 查询出在半径内的所有已存储的地理位置     |
| 5    | `georadiusbymember 键 名称 半径 单位 ...`    | 以地理位置为中心搜寻半径内的其他地理位置 |
| 6    | `geohash 键 名称1 名称2 ...`                 | 将地理位置转换成11位的 `geohash` 字符串  |



### 3.3.2 hyperloglog

注：这是一个基数统计（相同元素只记作一个）算法，相较于set的优点事hyperloglog占用的内存是固定的且较小的，2^64的不同元素只占 12 KB，且这种统计法是允许误差的

| 序号 | 语法                   | 解释             |
| ---- | ---------------------- | ---------------- |
| 1    | `pfadd 键 值1 值2 ...` | 创建集合         |
| 2    | `pfcount 键`           | 统计集合里的基数 |
| 3    | `pfmerge 键1 键2`      | 合并两个集合     |



### 3.3.3 bitmaps

注：位存储，位图，也是一种数据结构

| 序号 | 语法                    | 解释     |
| ---- | ----------------------- | -------- |
| 1    | `setbit 键 当前序号 值` | 添加元素 |
| 2    | `getbit 键 序号`        | 获取值   |
| 3    | `bitcount 键`           | 统计值   |



# 4.事务

注：redis 单条命令是保证原子性的，但是 redis 的事务不保证原子性，redis 事务的本质可以理解成一组命令的集合，同时也没有隔离级别的概念

**redis的事务：**

- 开启事务（multi）
- 命令入队（ ... ），期间可以放弃事务，放弃之后队列中的命令都不会被执行
- 执行事务（exec）；取消事务（discard）

- 编译型异常，即代码本身有问题，那么事务中的所有命令都不会被执行
- 运行时异常 ( 如：1/0 )，即如果事务队列中存在语法性错误，那么执行命令的时候其他的命令还是可以执行的，只有错误命令才会抛出异常，所以说单条保证原子性，但事务不保证原子性

- 监控（watch）：悲观锁和乐观锁，乐观锁由于不会主动加锁，所以需要判断数据是否修改，将判断结果存入 version 中，执行命令时先获取 version，根据version 决定是否更新数据



# 5.Jedis

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>Jedis</artifactId>
    <version>3.2.0</version>
</dependency>
```



# 6.Spring Boot 整合 redis

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



# 7.Redis 持久化

- rdb 保存的文件是 dump.rdb，aof 保存的文件是 appendonly.aof 文件
- redis 会在指定的时间间隔内将内存中的数据集快照写入磁盘，它恢复时时将快照文件直接读到内存中
- redis 会单独创建（fork）一个子进程来进行持久化，先将数据写到一个临时文件中，待持久化过程都结束了，再用这个零食文件替换上吃持久化好的文件
- 上述过程中，主进程不进行任何 IO 操作，这确保了极高的性能。
- 如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那么 rdb 的方式要比 aof 的方式更加高效，但是 rdb 有可能会将最后一次持久化后的数据丢失

## 7.1 rdb

**1.rdb 文件保存的触发规则：**

- 配置文件中 save 的规则满足的情况下会触发
- 执行 flushall 命令会触发 
- 退出 redis 时会触发
- 备份会触发

**2.恢复 rdb 文件：**

- 只需要将 rdb 文件放在 redis 的启动目录即可

**3.优缺

- 适合大规模的数据恢复
- 对数据的完整性要求不高
- 需要一定时间进行进程操作，如果中途出意外，那么最后一次修改的数据可能丢失
- fork 进行的时候会占用一定的空间



## 7.2 aof

- 将所有命令都记录下来，恢复时会把这个文件的命令全部执行一遍
- 以日志的形式记录每个写操作，将 redis 执行过的所有命令都记录下来（读操作不记录）
- 只能追加文件，不能改写文件
- 默认不开启，开启将 appendonly 改为 yes 即可

**1.优缺点：**

- 每次修改都会同步，文件完整性更好
- 默认每秒同步一次，可能丢失疫苗数据
- 不同步效率更高
- 相对于数据文件来说，aof 远远大于 rdb，修复的速度也比 rdb 慢
- aof 的运行效率也比 rdb 低



# 8.Redis 的发布订阅

- redis 发布订阅（pub/sub）是一种消息通信模式
- Redis 客户端可以订阅任意数量的频道
- 订阅发布机制的底层原理：
  - 通过 subscribe 订阅某频道后，redis-server 里会维护一个字典，建为 channel，值为链表，链表中保存了所有订阅这个 channel 的客户端，当客户护短订阅时就会将其添加到这个订阅链表中
  - 通过 publish 向订阅者发送消息，redis-server 会使用给定的频道作为建，在所维护的链表中查找订阅了这个频道的客户端链表，遍历链表将消息发布给所有订阅者

| 序号 |                   命令                    |               说明               |
| :--: | :---------------------------------------: | :------------------------------: |
|  1   |          publish channel message          |      将消息发送到指定的频道      |
|  2   |    punsubscribe [pattern[pattern...]]     |      退订所有给定模式的频道      |
|  3   |      subscribe channel[channel...]]       | 订阅给定的一个或多发个频道的消息 |
|  4   |     unsubscribe [channel[channel...]]     |          指定退订的频道          |
|  5   | pubsub subcommand [argument[argument...]] |      查看订阅与发布系统状态      |
|  6   |      psubscribe pattern[pattern...]       | 订阅一个或多个符合给定模式的频道 |



# 9.Redis 主从复制

- 将一台 redis 服务器的数据复制到其他 redis 服务器。前者称为主节点 master/leader，后者称为从节点 slave/follower
- 数据的复制时单向的，只有由主节点到从节点。master 以写为主，slave 以读为主
- 默认情况下，每台 redis 服务器都是主节点，一个主节点可以有多个从节点，但一个从节点只能有一个主节点
- 主从复制的作用主要包括：
  - 数据冗余：主从复制实现了数据的热备份，时持久化之外的一种数据冗余方式
  - 故障恢复：当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复，这是一种服务的冗余
  - 负载均衡：在主从复制的基础上，配合读写分离，可以由主节点提供写服务，由从节点提供读服务，分担服务器的压力
  - 高可用：主从复制还是哨兵和集群能够实施的基础，因此也是高可用的基础
- 主从复制实现读写分离一般都是使用一主二从
- 当 slave 成功连接到 master 后会发送一个 sync 同步命令，master 接收命令后会启动后台的存盘进程，同时收集所有接收到的用于修改数据集的命令，在后台程序执行完毕之后 master 将传送整个数据文件到 slave 并完成一次同步（只要是连接到主机就会进行一次全量复制）
  - 全量复制：slave 服务在接收到数据库文件后将其存盘并加载到内存中
  - 增量复制：master 继续将新的收集到的修改命令传给 slave 完成同步

| 序号 |       命令       |         说明         |
| :--: | :--------------: | :------------------: |
|  1   | info replication |     查看主从信息     |
|  2   | slaveof ip port  |      指定主节点      |
|  3   |  slaveof no one  | 让当前节点成为主节点 |



## 9.1 哨兵模式

- 主从切换：当主服务器宕机后，使用哨兵模式会根据投票数自动将某一个从节点变成主节点
- 哨兵是 redis提供的一种特殊的模式，是一个独立的进程。原理是哨兵通过发送命令等待 redis 服务相应从而监控运行的多个 redis 实例是否可用
- 哨兵的作用：
  - 通过发送命令监控 redis 集群的状态
  - 当哨兵检测到 master 宕机时会将 slave 切换成 master，然后通过发布订阅模式通知其他的从服务器修改配置文件，以此让它们自动切换主节点
- 通常哨兵也会搭建一个集群形成多哨兵模式保证高可用

- 在多哨兵模式下，要是其中一个哨兵检测到主节点宕机，并不会立即执行 failover（故障转移）过程，因为这仅仅是这个哨兵认为主节点不可用，这称为主观下线。之后的哨兵也检测到主节点不可用并且达到一定数量时，哨兵之间会进行一次投票，投票结果由一个哨兵发起并进行 failover 操作。切换成功后就会通过发布订阅模式让各个哨兵切换主节点，这个过程称为客观下线



# 10.Redis 缓存穿透、击穿、雪崩

**3.缓存穿透：**

- 当用户查询数据时，要是 redis 中没有，即缓存没命中，就会到数据库中查询，要是在数据库中也没有，那么本次查询失败
- 当用户很多或者有人恶意执行上述查询失败的操作时，就会造成数据库压力很大，此时就相当于出现了缓存穿透
- 解决方案：
  - redis 存储空对象：当存储层没命中时，将返回的空对象也存入 redis 中，同时设置一个过期时间，之后再访问这个数据时就避免了直接访问数据库。但这种方法会浪费很多空间存储空值的键，并且即使设置了过期时间，缓存层和存储层还是会有一段时间窗口不一致，这对于需要保持一致性的业务会产生影响
  - 布隆过滤器：是一种数据结构，对所有可能查询的参数以 hash 形式存储，在控制层先进行校验，不符合则直接丢弃，避免了对底层存储系统的压力

**2.缓存击穿：**

- 是指某个键在扛着高并发时可能会出现失效的情况
- 当这个键被击穿或缓存过期后会有大量请求打入数据库，并且还会写回缓存，这会导致数据库和服务器压力过大
- 解决方案：
  - 设置热点数据不过期
  - 加互斥锁：使用分布式锁保证对于每个 key 同时只有一个线程查询，其他线程在没有获得锁时只能等待，从而降低压力，但是这样会将压力转移到分布式锁上，所以分布式锁必须设计好

**3.缓存雪崩：**

- 是指在某个时间段缓存集中过期失效，或是 redis 服务不可用

- 解决方案：
  - 增设多几个 redis，即将 redis 集群扩容，保证服务高可用（搭建异地多活）
  - 限流降级：在缓存失效后，通过加锁或队列来控制读数据库和写缓存得线程数量
  - 数据预热：就是在正式部署之前见吧可能查询的数据预先访问一遍，这样部分可能大量访问的数据就会先加载到缓存中。在即将发生高并发访问前手动触发加载缓存并设置不同的过期时间，让缓存失效的时间点不会集中在一起