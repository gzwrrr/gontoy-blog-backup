---
title: "Redis 事务"
shortTitle: "C-Redis 事务"
description: "Redis 事务"
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
  text: "Redis 事务"
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
  title: "Redis 事务"
  description: "Redis 事务"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Redis 事务


[[toc]]

:::info 警告

- Redis 不能保证持久性，因为不管是 RDB 还是 AOF，都是使用异步处理的，这是处于性能方面的考虑
- redis 单条命令是保证原子性的，但是 redis 的事务不保证原子性，redis 事务的本质可以理解成一组命令的集合，同时也没有隔离级别的概念
- Redis 中不支持回滚，但是它会检查每一个事务中的命令是否错误，这样能保证 Redis 执行效率最高。执行事务失败后会继续执行剩余代码，为了不影响生成环境，所有的语法、类型错误等造成的事务失败都必须保证在开发中解决
- 但是，Redis 事务不支持检查那些程序员自己逻辑错误。例如对 String 类型的数据库键执行对 HashMap 类型的操作

:::

**redis的事务：**

- 开启事务（multi），*MULTI* 命令会将客户端状态的 flags 属性中打开 REDIS_MULTI 标识
- 命令入队（ ... ），期间可以放弃事务，放弃之后队列中的命令都不会被执行，如果客户端发送的命令为*MULTI*、*EXEC*、*WATCH*、*DISCARD*中的一个，立即执行这个命令，否则将命令放入一个事务队列里面，然后向客户端返回 QUEUED 回复。事务队列是按照FIFO的方式保存入队的命令
- 执行事务（exec）；取消事务（discard）
- 编译型异常，即代码本身有问题，那么事务中的所有命令都不会被执行
- 运行时异常 ( 如：1/0 )，即如果事务队列中存在语法性错误，那么执行命令的时候其他的命令还是可以执行的，只有错误命令才会抛出异常，所以说单条保证原子性，但事务不保证原子性
- 监控（watch）：悲观锁和乐观锁，乐观锁由于不会主动加锁，所以需要判断数据是否修改，将判断结果存入 version 中，执行命令时先获取 version，根据version 决定是否更新数据

**补充：**

1. WATCH 命令是一个乐观锁，可以为 Redis 事务提供 check-and-set （CAS）行为。可以监控一个或多个键，一旦其中有一个键被修改（或删除），之后的事务就不会执行，监控一直持续到EXEC命令
2. MULTI命令用于开启一个事务，它总是返回OK。MULTI执行之后，客户端可以继续向服务器发送任意多条命令，这些命令不会立即被执行，而是被放到一个队列中，当EXEC命令被调用时，所有队列中的命令才会被执行
3. EXEC：执行所有事务块内的命令。返回事务块内所有命令的返回值，按命令执行的先后顺序排列。当操作被打断时，返回空值 nil
4. 通过调用DISCARD，客户端可以清空事务队列，并放弃执行事务， 并且客户端会从事务状态中退出。
5. UNWATCH命令可以取消watch对所有key的监控