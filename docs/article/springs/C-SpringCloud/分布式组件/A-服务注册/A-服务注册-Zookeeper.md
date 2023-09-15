---
title: "服务注册-Zookeeper"
shortTitle: "A-服务注册-Zookeeper"
description: "服务注册-Zookeeper"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-28
category: 
- "分布式"
tag:
- "分布式"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "服务注册-Zookeeper"
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
  title: "服务注册-Zookeeper"
  description: "服务注册-Zookeeper"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 服务注册-Zookeeper

:::info 相关资源

官方文档：https://cwiki.apache.org/confluence/display/ZOOKEEPER/Index

下载地址：https://zookeeper.apache.org/releases.html

分布式锁框架 Curator 官网：https://curator.apache.org/

相关视频：https://www.bilibili.com/video/BV1to4y1C7gw/?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0

相关文章：[zookeeper架构简介](https://www.cnblogs.com/arjenlee/articles/9224366.html#:~:text=Zookpeeper%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%9E%B6%E6%9E%84%201%20%E6%AF%8F%E4%B8%AAServer%E5%9C%A8%E5%86%85%E5%AD%98%E4%B8%AD%E5%AD%98%E5%82%A8%E4%BA%86%E4%B8%80%E4%BB%BD%E6%95%B0%E6%8D%AE%EF%BC%9B%202,Zookeeper%E5%90%AF%E5%8A%A8%E6%97%B6%EF%BC%8C%E5%B0%86%E4%BB%8E%E5%AE%9E%E4%BE%8B%E4%B8%AD%E9%80%89%E4%B8%BE%E4%B8%80%E4%B8%AAleader%EF%BC%88Paxos%E5%8D%8F%E8%AE%AE%EF%BC%89%EF%BC%9B%203%20Leader%E8%B4%9F%E8%B4%A3%E5%A4%84%E7%90%86%E6%95%B0%E6%8D%AE%E6%9B%B4%E6%96%B0%E7%AD%89%E6%93%8D%E4%BD%9C%EF%BC%88Zab%E5%8D%8F%E8%AE%AE%EF%BC%89%EF%BC%9B%204%20%E4%B8%80%E4%B8%AA%E6%9B%B4%E6%96%B0%E6%93%8D%E4%BD%9C%E6%88%90%E5%8A%9F%EF%BC%8C%E5%BD%93%E4%B8%94%E4%BB%85%E5%BD%93%E5%A4%A7%E5%A4%9A%E6%95%B0Server%E5%9C%A8%E5%86%85%E5%AD%98%E4%B8%AD%E6%88%90%E5%8A%9F%E4%BF%AE%E6%94%B9)

相关文章：[基本架构](https://blog.csdn.net/weixin_45366499/article/details/106899924)

:::



:::info 说明

ZooKeeper是一个分布式协调服务，主要用于处理分布式应用程序的一些问题，例如命名、配置管理、分布式锁、领导者选举等。

本质是一个文件系统，数据模型的结构与 Unix 文件系统类似

:::



## 简介

Zookeeper是一个开源的分布式协调服务框架，旨在提供高效、可靠的分布式协调服务。Zookeeper提供了一个分布式的协调服务，包括数据管理、集群管理、配置管理、服务发现和命名等功能。它的特点是高可靠性、高性能、可扩展性好、易于开发和部署。

Zookeeper的核心是一个基于内存的数据模型，采用类似文件系统的层次结构（节点），每个节点可以存储数据。Zookeeper将所有的数据存储在内存中，提供了高效的数据读写操作。同时，Zookeeper的数据模型是一种发布/订阅模型，支持Watcher机制，客户端可以通过注册Watcher来监听节点数据的变化，当节点数据发生变化时，Zookeeper会通知相关的客户端。

Zookeeper还提供了一种分布式锁的机制，称为Zookeeper锁。它基于Zookeeper的数据模型和Watcher机制，可以实现分布式环境下的互斥访问，从而保证数据的一致性。

除了分布式协调服务和分布式锁，Zookeeper还可以用于实现分布式队列、分布式命名服务、分布式配置管理等功能。由于其高性能、高可靠性、易于扩展等特点，在分布式系统中被广泛应用。

需要注意的是，Zookeeper的性能和可用性非常依赖于其所在的网络环境和硬件环境。为了保证高可用性，通常会使用多个Zookeeper节点组成Zookeeper集群，采用选举算法选出一个节点作为主节点，其余节点作为从节点，主节点负责处理所有的写请求和一部分读请求，从节点只负责处理读请求。当主节点失效时，从节点会通过选举算法重新选出一个节点作为主节点，保证系统的可用性。

![ZooKeeper的架构](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//zookeeper/20230314/zookeeper%E6%9E%B6%E6%9E%84.jpeg)

| 组件             | 描述                                                         |
| :--------------- | :----------------------------------------------------------- |
| Client（客户端） | 客户端，我们的分布式应用集群中的一个节点，从服务器访问信息。对于特定的时间间隔，每个客户端向服务器发送消息以使服务器知道客户端是活跃的。类似地，当客户端连接时，服务器发送确认码。如果连接的服务器没有响应，客户端会自动将消息重定向到另一个服务器。 |
| Server（服务器） | 服务器，我们的ZooKeeper总体中的一个节点，为客户端提供所有的服务。向客户端发送确认码以告知服务器是活跃的。 |
| Ensemble         | ZooKeeper服务器组。形成ensemble所需的最小节点数为3。         |
| Leader           | 服务器节点，如果任何连接的节点失败，则执行自动恢复。Leader在服务启动时被选举。 |
| Follower         | 跟随leader指令的服务器节点。                                 |

**ZooKeeper的主要特点如下：**

- 分布式：ZooKeeper使用分布式架构，能够处理大规模集群中的节点管理。
- 高可用：ZooKeeper使用多台服务器构成一个集群，提供了高可用的服务。
- 数据一致性（CP）：ZooKeeper提供了强一致性的数据访问，保证了数据的一致性。
- 低延迟：ZooKeeper能够快速地进行状态更新，支持高并发的访问请求。
- 一主多从：一个领导者多个跟随者组成集群
- 半数以上存活就可以正常工作，所以适合安装奇数台服务器

**ZooKeeper提供了一些核心概念，包括：**

- 节点（ZNode）：ZooKeeper的最小数据单元，每个节点都有一个路径，类似于文件系统中的路径，默认存储 1 MB 数据，每个节点通过路径唯一标识
- 会话（Session）：ZooKeeper客户端与服务端的连接，包含一个唯一的Session ID。
- Watcher：客户端可以向ZooKeeper注册一个Watcher，当该节点发生变化时，ZooKeeper会通知客户端。

**Zookeeper提供的服务：**

1. 统一命名服务：暴露域名，通过负载均衡转发到不同的主机上
2. 统一配置管理：所有配置节点的信息是一致的，修改后能够快速同步
3. 统一集群管理：实时监听节点的状态
4. 软负载均衡：





## 配置参数

LF：Leader 和 Follower

| 序号 | 参数       | 解释                          |
| ---- | ---------- | ----------------------------- |
| 1    | tickTime   | 心跳时间                      |
| 2    | initLimit  | LF 初始通信时限               |
| 3    | syncLimit  | LF 同步通信实现               |
| 4    | dataDir    | 保存 Zookeeper 中的数据       |
| 5    | clientPort | 客户端连接端口号（默认 2181） |

   



## ZAB 协议

ZAB（ZooKeeper Atomic Broadcast）是ZooKeeper使用的协议，它是一种**原子广播协议**。ZooKeeper是一种分布式协调服务，它可以用于分布式应用程序的协调和管理。在ZooKeeper中，客户端可以创建，读取和更新存储在ZooKeeper中的数据。ZooKeeper使用ZAB协议来保证在集群中不同服务器上的数据的一致性。

ZAB协议是一种基于Paxos算法的协议，它使用一个称为Leader的特殊节点来管理集群中的状态。Leader负责协调集群中所有节点的操作，并将结果广播到所有节点。当一个客户端连接到集群中的任何一个节点时，它都可以向Leader提交一个请求。Leader将请求转发给所有的节点，并等待大多数节点的响应。如果大多数节点都响应了请求，Leader就会将结果广播到所有的节点，从而保证数据的一致性。

ZAB协议主要有两个阶段：崩溃恢复和消息广播。在崩溃恢复阶段，ZAB协议通过选举Leader来恢复集群的状态。在消息广播阶段，Leader将客户端请求广播给所有节点，并等待大多数节点的响应，然后将结果广播给所有节点。ZAB协议还通过写操作和读操作的不同处理方式，保证了数据的一致性。

在ZooKeeper中，ZAB协议实现了一个分布式的事务日志，用于存储所有操作的序列。这个日志可以在节点崩溃后恢复集群的状态。同时，ZooKeeper还使用ZAB协议来维护所有节点之间的数据一致性，保证数据的可靠性和一致性。

总的来说，ZAB协议是ZooKeeper使用的一种基于Paxos算法的原子广播协议，用于保证分布式系统中数据的一致性。ZAB协议通过选举Leader来管理集群中的状态，并通过写操作和读操作的不同处理方式，保证了数据的一致性（尽量达到强一致性，但实际上仍然是最终一致性）。

**补充：**

ZAB 有两种模式：

1. 恢复模式（选主）
2. 广播模式（同步）

ZAB 协议四阶段：

1. 选举阶段：Leader 确定
2. 发现阶段：接收提议、生成 epoch、接受 epoch
3. 同步阶段：Leader 同步集群中所有的副本，只有大多数节点都同步完成，准 Leader 才能成为真正的 Leader
4. 广播阶段：准 Leader 成为真正的 Leader，集群正式对外提供事务服务，Leader 可以进行消息广播，如果有新节点加入还需要同步信息

注意：ZAB 提交事务并不像 2PC 一样需要全部 follower 都 ACK，只需要得到超过半数的节点的 ACK 就可以了





## 文件系统 & 命名空间

> Zookeeper 维护着一个文件系统（树形结构），其中的节点称为 Znode

1. 根目录 `/` 下有两个逻辑命名空间 `config` 和 `workers`，前者用于集中配置，后者用于命名
2. Znode兼具文件和目录两种特点。既像文件一样维护着数据长度、元信息、ACL、时间戳等数据结构，又像目录一样可以作为路径标识的一部分。每个Znode由三个部分组成：
   - **stat**：此为状态信息，描述该Znode版本、权限等信息。
   - **data**：与该Znode关联的数据
   - **children**：该Znode下的节点
3. Znode被分为持久（persistent）节点，顺序（sequential）节点和临时（ephemeral）节点。





## 作为注册中心

可以使用 Zookeeper 中的临时节点和 watch 机制来实现自动注册和发现。

Zookeeper 中的数据都是存在内存中的，底层使用了 NIO，是多线程模型。

Zookeeper 注重的是数据一致性，所以数据不一致时服务会不可用，从这一层来说使用 Eureka 或者 Nacos 作为注册中心更为合适





## 领导者选举流程

ZooKeeper 集群中有一个 Leader 节点，它是整个集群的核心，负责维护数据的一致性。在 ZooKeeper 集群中，如果 Leader 节点宕机，需要选举出一个新的 Leader 节点，以保证集群的正常运转。以下是 ZooKeeper 领导者选举的流程：

1. 节点状态

   ZooKeeper 集群中的每个节点都有自己的状态，其中包括 LOOKING、FOLLOWING、LEADING、OBSERVER 四种状态。LOOKING 状态表示该节点正在寻找 Leader 节点，FOLLOWING 状态表示该节点正在跟随 Leader 节点，LEADING 状态表示该节点是 Leader 节点。

2. 选举过程（启动时选举或者运行期间选举）

   启动时选举：先投给自己，再对比其他节点，将票给 myid 大的节点，如果超过半数直接称为 Leader，否则继续投票

   非第一次启动：当一个节点宕机时，其他节点会进入 LOOKING 状态，开始选举新的 Leader 节点。选举过程如下：

   - 所有节点向集群中的其他节点发送选举请求，请求中包括自己的 ID 和 zxid（ZooKeeper 中用于标识事务的唯一编号）。
   - 收到选举请求的节点比较自己的 zxid 和请求中的 zxid，选择 zxid 最大的节点作为自己的候选 Leader 节点。
   - 如果选出的候选 Leader 节点得到超过一半节点的同意，那么它就成为新的 Leader 节点，并向其他节点发送成为 Leader 的消息。
   - 如果没有一个节点得到超过一半节点的同意，那么这个选举过程失败，节点会重新进入 LOOKING 状态，重新开始选举。

3. 避免“脑裂”问题

   在 ZooKeeper 集群中，如果同时存在两个 Leader 节点，就会产生“脑裂”问题，导致数据的一致性受到影响。为了避免这个问题，ZooKeeper 引入了“投票机制”。选举过程中，每个节点会向集群中的其他节点发送投票请求，如果一个节点收到了来自超过一半节点的投票，则认为当前选举成功，否则认为选举失败。这个机制能够有效避免“脑裂”问题的发生。

**相关的概念：**

| 序号 | 标识  | 解释                                          |
| ---- | ----- | --------------------------------------------- |
| 1    | zxid  | 每次操作都有的事务 id                         |
| 2    | sid   | 服务器 id，用于唯一标识一台机器，与 myid 一致 |
| 3    | epoch | 每个 leader 任期的代号                        |





## 节点数据同步

在Zookeeper中，节点之间的数据同步主要是通过ZAB协议实现的。ZAB（Zookeeper Atomic Broadcast）是Zookeeper使用的一种协议，它主要用于实现Zookeeper的分布式一致性。

ZAB协议将Zookeeper集群中的节点分为两种角色：Leader和Follower。Leader负责处理客户端请求，Follower则负责向Leader同步数据。在Zookeeper中，每个节点都会保存自己的状态（包括数据、版本号等），节点之间的数据同步主要是通过以下几个步骤实现的：

1. 选举Leader：Zookeeper集群中的节点通过选举产生一个Leader节点，Leader节点负责处理客户端请求和数据同步。
2. 发送数据变更：当客户端向Leader发送数据变更请求时，Leader会将数据变更请求广播给所有Follower。
3. Follower处理数据变更请求：Follower节点接收到Leader广播的数据变更请求后，会对数据进行处理并返回结果给Leader。
4. 确认数据变更：Leader收到多数Follower节点返回的结果后，会确认数据变更请求，将数据变更结果广播给所有Follower。
5. Follower更新数据：Follower节点接收到Leader广播的数据变更结果后，会更新自己的状态，以便与Leader保持一致。

在Zookeeper中，每个节点都会维护一个类似日志的数据结构，称为事务日志（Transaction Log），用于记录每个节点的状态变化。当节点与Leader同步数据时，Leader会向Follower发送数据快照或增量数据来更新Follower的状态。如果Follower节点与Leader不一致，Leader会将最新的数据版本号（ZXID）告诉Follower，并要求Follower根据ZXID来获取缺失的数据。

总的来说，Zookeeper节点之间的数据同步是通过ZAB协议实现的，它主要通过选举Leader、广播数据变更、确认数据变更和更新节点状态等步骤来实现数据的一致性。





## 读写操作

| 组件                              | 描述                                                         |
| :-------------------------------- | :----------------------------------------------------------- |
| 写入（write）                     | 写入过程由leader节点处理。leader将写入请求转发到所有znode，并等待znode的回复。如果一半的znode回复，则写入过程完成。如果写入请求打到follower，那么会先转到leader，最后应答时再由follower发回 |
| 读取（read）                      | 读取由特定连接的znode在内部执行，因此不需要与集群进行交互。  |
| 复制数据库（replicated database） | 它用于在zookeeper中存储数据。每个znode都有自己的数据库，每个znode在一致性的帮助下每次都有相同的数据。 |
| 领导者（Leader）                  | Leader是负责处理写入请求的Znode。                            |
| 跟随者（Follower）                | follower从客户端接收写入请求，并将它们转发到leader znode。   |
| 请求处理器（request processor）   | 只存在于leader节点。它管理来自follower节点的写入请求。       |
| 原子广播（atomic broadcasts）     | 负责广播从leader节点到follower节点的变化。                   |





## Sessions（会话）

会话对于ZooKeeper的操作非常重要。会话中的请求按FIFO顺序执行。一旦客户端连接到服务器，将建立会话并向客户端分配**会话ID** 。

客户端以特定的时间间隔发送**心跳**以保持会话有效。如果ZooKeeper集合在超过服务器开启时指定的期间（会话超时）都没有从客户端接收到心跳，则它会判定客户端死机。

会话超时通常以毫秒为单位。当会话由于任何原因结束时，在该会话期间创建的临时节点也会被删除。





## Watches（监视） 

监视是一种简单的机制，使客户端收到关于ZooKeeper集合中的更改的通知。客户端可以在读取特定znode时设置Watches。Watches会向注册的客户端发送任何znode（客户端注册表）更改的通知。

Znode更改是与znode相关的数据的修改或znode的子项中的更改。只触发一次watches。如果客户端想要再次通知，则必须通过另一个读取操作来完成。当连接会话过期时，客户端将与服务器断开连接，相关的watches也将被删除。





## 客户端命令

| 序号 | 命令                           | 解释                       |
| ---- | ------------------------------ | -------------------------- |
| 1    | `ls -s`                        | 查看目录下节点详细信息     |
| 2    | `get -s 节点路径`              | 查看节点详细信息           |
| 3    | `create 节点路径 "节点值"`     | 创建永久节点，节点不带序号 |
| 4    | `create -es 节点路径 "节点值"` | 创建临时节点，节点带序号   |
| 5    | `set 节点路径 "新值"`          | 修改节点值                 |
| 6    | `get -w 节点路径`              | 监听节点                   |
| 7    | `delete 节点路径`              | 删除系欸但                 |
| 8    | `deleteall 节点路径`           | 删除节点及节点所有节点     |

目录节点形式：

| 序号 | 目录节点              | 解释                            |
| ---- | --------------------- | ------------------------------- |
| 1    | PERSISTENT            | 持久的节点                      |
| 2    | EPHEMERAL             | 暂时的节点（`-e`）              |
| 3    | PERSISTENT_SEQUENTIAL | 持久化顺序编号目录节点（`-s`）  |
| 4    | EPHEMERAL_SEQUENTIAL  | 暂时化顺序编号目录节点（`-es`） |



