---
title: "Zookeeper"
shortTitle: "Zookeeper"
description: "Zookeeper"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-08-05
category: 
- "分布式"
tag:
- "分布式"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Zookeeper"
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
  title: "Zookeeper"
  description: "Zookeeper"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Zookeeper

Zookeeper是一个开源的分布式协调服务框架，旨在提供高效、可靠的分布式协调服务。Zookeeper提供了一个分布式的协调服务，包括数据管理、集群管理、配置管理、服务发现和命名等功能。它的特点是高可靠性、高性能、可扩展性好、易于开发和部署。

Zookeeper的核心是一个基于内存的数据模型，采用类似文件系统的层次结构（节点），每个节点可以存储数据。Zookeeper将所有的数据存储在内存中，提供了高效的数据读写操作。同时，Zookeeper的数据模型是一种发布/订阅模型，支持Watcher机制，客户端可以通过注册Watcher来监听节点数据的变化，当节点数据发生变化时，Zookeeper会通知相关的客户端。

Zookeeper还提供了一种分布式锁的机制，称为Zookeeper锁。它基于Zookeeper的数据模型和Watcher机制，可以实现分布式环境下的互斥访问，从而保证数据的一致性。

除了分布式协调服务和分布式锁，Zookeeper还可以用于实现分布式队列、分布式命名服务、分布式配置管理等功能。由于其高性能、高可靠性、易于扩展等特点，在分布式系统中被广泛应用。

需要注意的是，Zookeeper的性能和可用性非常依赖于其所在的网络环境和硬件环境。为了保证高可用性，通常会使用多个Zookeeper节点组成Zookeeper集群，采用选举算法选出一个节点作为主节点，其余节点作为从节点，主节点负责处理所有的写请求和一部分读请求，从节点只负责处理读请求。当主节点失效时，从节点会通过选举算法重新选出一个节点作为主节点，保证系统的可用性。





### ZAB 协议

ZAB（ZooKeeper Atomic Broadcast）是ZooKeeper使用的协议，它是一种原子广播协议。ZooKeeper是一种分布式协调服务，它可以用于分布式应用程序的协调和管理。在ZooKeeper中，客户端可以创建，读取和更新存储在ZooKeeper中的数据。ZooKeeper使用ZAB协议来保证在集群中不同服务器上的数据的一致性。

ZAB协议是一种基于Paxos算法的协议，它使用一个称为Leader的特殊节点来管理集群中的状态。Leader负责协调集群中所有节点的操作，并将结果广播到所有节点。当一个客户端连接到集群中的任何一个节点时，它都可以向Leader提交一个请求。Leader将请求转发给所有的节点，并等待大多数节点的响应。如果大多数节点都响应了请求，Leader就会将结果广播到所有的节点，从而保证数据的一致性。

ZAB协议主要有两个阶段：崩溃恢复和消息广播。在崩溃恢复阶段，ZAB协议通过选举Leader来恢复集群的状态。在消息广播阶段，Leader将客户端请求广播给所有节点，并等待大多数节点的响应，然后将结果广播给所有节点。ZAB协议还通过写操作和读操作的不同处理方式，保证了数据的一致性。

在ZooKeeper中，ZAB协议实现了一个分布式的事务日志，用于存储所有操作的序列。这个日志可以在节点崩溃后恢复集群的状态。同时，ZooKeeper还使用ZAB协议来维护所有节点之间的数据一致性，保证数据的可靠性和一致性。

总的来说，ZAB协议是ZooKeeper使用的一种基于Paxos算法的原子广播协议，用于保证分布式系统中数据的一致性。ZAB协议通过选举Leader来管理集群中的状态，并通过写操作和读操作的不同处理方式，保证了数据的一致性（尽量达到强一致性，但实际上仍然是最终一致性）。





### Zookeeper 作为注册中心

可以使用 Zookeeper 中的临时节点和 watch 机制来实现自动注册和发现。

Zookeeper 中的数据都是存在内存中的，底层使用了 NIO，是多线程模型。

Zookeeper 注重的是数据一致性，所以数据不一致时服务会不可用，从这一层来说使用 Eureka 或者 Nacos 作为注册中心更为合适







### Zookeeper 领导者选举流程

ZooKeeper 集群中有一个 Leader 节点，它是整个集群的核心，负责维护数据的一致性。在 ZooKeeper 集群中，如果 Leader 节点宕机，需要选举出一个新的 Leader 节点，以保证集群的正常运转。以下是 ZooKeeper 领导者选举的流程：

1. 节点状态

   ZooKeeper 集群中的每个节点都有自己的状态，其中包括 LOOKING、FOLLOWING、LEADING 三种状态。LOOKING 状态表示该节点正在寻找 Leader 节点，FOLLOWING 状态表示该节点正在跟随 Leader 节点，LEADING 状态表示该节点是 Leader 节点。

2. 选举过程

   当一个节点宕机时，其他节点会进入 LOOKING 状态，开始选举新的 Leader 节点。选举过程如下：

   - 所有节点向集群中的其他节点发送选举请求，请求中包括自己的 ID 和 zxid（ZooKeeper 中用于标识事务的唯一编号）。
   - 收到选举请求的节点比较自己的 zxid 和请求中的 zxid，选择 zxid 最大的节点作为自己的候选 Leader 节点。
   - 如果选出的候选 Leader 节点得到超过一半节点的同意，那么它就成为新的 Leader 节点，并向其他节点发送成为 Leader 的消息。
   - 如果没有一个节点得到超过一半节点的同意，那么这个选举过程失败，节点会重新进入 LOOKING 状态，重新开始选举。

3. 避免“脑裂”问题

   在 ZooKeeper 集群中，如果同时存在两个 Leader 节点，就会产生“脑裂”问题，导致数据的一致性受到影响。为了避免这个问题，ZooKeeper 引入了“投票机制”。选举过程中，每个节点会向集群中的其他节点发送投票请求，如果一个节点收到了来自超过一半节点的投票，则认为当前选举成功，否则认为选举失败。这个机制能够有效避免“脑裂”问题的发生。





### Zookeeper 节点数据同步

在Zookeeper中，节点之间的数据同步主要是通过ZAB协议实现的。ZAB（Zookeeper Atomic Broadcast）是Zookeeper使用的一种协议，它主要用于实现Zookeeper的分布式一致性。

ZAB协议将Zookeeper集群中的节点分为两种角色：Leader和Follower。Leader负责处理客户端请求，Follower则负责向Leader同步数据。在Zookeeper中，每个节点都会保存自己的状态（包括数据、版本号等），节点之间的数据同步主要是通过以下几个步骤实现的：

1. 选举Leader：Zookeeper集群中的节点通过选举产生一个Leader节点，Leader节点负责处理客户端请求和数据同步。
2. 发送数据变更：当客户端向Leader发送数据变更请求时，Leader会将数据变更请求广播给所有Follower。
3. Follower处理数据变更请求：Follower节点接收到Leader广播的数据变更请求后，会对数据进行处理并返回结果给Leader。
4. 确认数据变更：Leader收到多数Follower节点返回的结果后，会确认数据变更请求，将数据变更结果广播给所有Follower。
5. Follower更新数据：Follower节点接收到Leader广播的数据变更结果后，会更新自己的状态，以便与Leader保持一致。

在Zookeeper中，每个节点都会维护一个类似日志的数据结构，称为事务日志（Transaction Log），用于记录每个节点的状态变化。当节点与Leader同步数据时，Leader会向Follower发送数据快照或增量数据来更新Follower的状态。如果Follower节点与Leader不一致，Leader会将最新的数据版本号（ZXID）告诉Follower，并要求Follower根据ZXID来获取缺失的数据。

总的来说，Zookeeper节点之间的数据同步是通过ZAB协议实现的，它主要通过选举Leader、广播数据变更、确认数据变更和更新节点状态等步骤来实现数据的一致性。

