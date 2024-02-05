---
notPage: true
---


#  Kafaka

> 使用 Scala 编写

:::info 相关资源

- [Kafaka 官网](https://kafka.apache.org/documentation/)

- [kafka一小时入门精讲课程（高清重制无废话版）](https://www.bilibili.com/video/BV1h94y1Q7Xg?p=7&spm_id_from=pageDriver&vd_source=e356fec025b50061af78324a814f8da0)

- [Kafka3.x教程（从入门到调优，深入全面）](https://www.bilibili.com/video/BV1vr4y1677k?p=11&vd_source=e356fec025b50061af78324a814f8da0)

:::

![image-20230731192719833](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//kafaka/20230731/kafaka%E6%9E%B6%E6%9E%84.png)

**相关概念：**

1. Producer：生产者即数据的发布者，该角色将消息发布到 Kafka 的 topic 中。broker 接收到生产者发送的消息后，broker将该消息追加到当前用于追加数据的 segment 文件中。生产者发送的消息，存储到一个 partition 中，生产者也可以指定数据存储的 partition
2. Consumer：消费者可以从broker中读取数据，消费者可以消费多个topic中的数据
3. Topic：在Kafka中，使用一个类别属性来划分数据的所属类，划分数据的这个类称为 topic。如果把 Kafka 看做为一个数据库，topic可以理解为数据库中的一张表，topic 的名字即为表名
4. Partition：topic 中的数据分割为一个或多个 partition。每个 topic 至少有一个 partition。每个 partition 中的数据使用多个 segment 文件存储。partition中的数据是有序的，partition 间的数据丢失了数据的顺序。如果 topic 有多个 partition，消费数据时就不能保证数据的顺序。在需要严格保证消息的消费顺序的场景下，需要将 partition 数目设为 1
5. Partition offset：每条消息都有一个当前 Partition 下唯一的 64 字节的 offset，它指明了这条消息的起始位置
6. Replicas of partition：副本是一个分区的备份。副本不会被消费者消费，副本只用于防止数据丢失，即消费者不从为 follower 的 partition 中消费数据，而是从为 leader 的 partition 中读取数据。副本之间是一主多从的关系
7. Leader：每个 partition 有多个副本，其中有且仅有一个作为 Leader，Leader 是当前负责数据的读写的 partition
8. Follower：Follower 跟随 Leader，所有写请求都通过 Leader 路由，数据变更会广播给所有 Follower，Follower 与 Leader 保持数据同步。如果Leader失效，则从 Follower 中选举出一个新的 Leader，当 Follower 与 Leader 挂掉、卡住或者同步太慢，leader 会把这个 follower，从 "in sync replicas" （ISR）列表中则除，重新创建一个Follower
9. Zookeeper：Zookeeper 负责维护和协调 broker。当 Kafka 系统中新增了 broker 或者某个 broker 发生故障失效时，由 ZooKeeper 通知生产者和消费者。生产者和消费者依据 Zookeeper 的 broker 状态信息与 broker 协调数据的发布和订阅任务。
10. AR（Assigned Replicas）：分区中的所有的副本
11. ISR（In-Sync Replicas）：所有与 Leader 部分保持一定程度的副本组成 ISR（包括 Leader 副本在内）
12. OSR（Out-of-Sync-Replicas）：与 Leader 副本同步滞后过多的副本
13. HW（High Watermark）：高水位，标识了一个特定的 offset，消费者只能拉取到这个 offset 之前的消息
14. LEO（Log End Offset）：即日志未端位移（log end offset），记录了该副本底层日志中下一条消息的位移值，注意是下一条消息！也就是
    说，如果 LEO = 10，那么表示该副本保存了 10 条消息，位移值范围是 [0,9]

**Kafaka 特点：**

1. 多副本提交日志
2. 分布式
3. 分区
4. 流式处理平台
5. 发布订阅

**优势：**

1. 吞吐量高
2. 伸缩性好
3. 容错性和可靠性高
4. 与大数据生态紧密结合，可以无缝对接 hadoop、strom、spark 等

**发行版本：**

1. Confluent Platform
2. Cloudera Kafaka
3. Hortonworks Kafaka

**相关的消息模型/协议：**

1. JMS 规范（限于 Java）
2. AMQP 协议（例如 RabbitMQ）
3. MQTT



## 主题

**主题 Topic：**

数据存储在 Topic 中，Topic 类似数据库中的表

通常将同一类型的数据存储到同一个 Topic 中

Topic 半结构化



## 分区

Topic 中可以包含多个分区 Partition

不同的分区在不同的服务器上

分区是一个线性增长的不可变的提交日志，数据存储到分区后就不可变更



分区中每一条数据都有一个对应的 offset，kafaka 可以通过 offet 提取出数据，但是无法对消息的内容进行检索或者查询

 同一分区中偏移量不可重复且是递增的，不同分区之间偏移量可以重复



可以通过 `replication-factor` 来设置分区副本的数量

分区集群有一个 leader 和若干个 follower

所有数据的读写都是由 leader 进行，follower 只负责复制，保证数据的一致性

`ISR` 列表中保存同步的节点，当节点数据落后到一定程度就会从该队列中剔除，直到该节点追赶上其他节点，此时再重新加入



## 记录

消息记录 Record 以键值对形式存储，不指定 key 时为空

当 key 为空时发送消息，kafaka 会以轮询的方式将消息发送到不同的分区中

如果 key 存在，那么相同 key 的消息会被写到同一个分区中





## 消息代理

Kafaka 集群由多个消息代理 Broker 组成

Broker 负责消息的读写请求，并将数据写入到磁盘中





## 集群搭建

Kafaka 目录包括：bin  config  libs  LICENSE  licenses  NOTICE  site-docs

Kafaka 依赖 Zookeeper，执行下面的命令进行配置：

```shell
# 在 kafaka 根目录执行
mkdir etc
cp config/zookeeper.properties etc/
cd etc
```

Zookeeper 配置如下：

```properties
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
# 
#    http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# the directory where the snapshot is stored.
dataDir=/tmp/zookeeper
# the port at which the clients will connect
clientPort=2181
# disable the per-ip limit on the number of connections since this is a non-production config
maxClientCnxns=0
# Disable the adminserver by default to avoid port conflicts.
# Set the port to something non-conflicting if choosing to enable this
admin.enableServer=false
# admin.serverPort=8080
```

下面搭建三个节点的伪分布式集群：

```shell
# 在 kafaka 根目录执行
# 复制 Broker 配置文件，需要复制三份
cp config/server.properties etc/server-0.properties
cp config/server.properties etc/server-1.properties
cp config/server.properties etc/server-2.properties
cd etc

# 更改 server.properties 配置，主要修改下面几个参数：
broker.id=0
listeners=PLAINTEXT://:9092
log.dirs=/tmp/kafka-logs

# 修改完成后就可以启动，首先启动 Zookeeper
# 启动脚本全部放在 bin 目录下
cd ../bin
nohup ./zookeeper-server-start.sh ../etc/zookeeper.properties &

# 启动 kafaka 实例
nohup ./kafka-server-start.sh ../etc/server-0.properties &
nohup ./kafka-server-start.sh ../etc/server-1.properties &
nohup ./kafka-server-start.sh ../etc/server-2.properties &

# 查看主题启动参数
./kafka-topics.sh
# 创建主题，主题名称 test，分区数 3，副本数 2
./kafka-topics.sh --zookeeper localhost:2181 --create --topic test --partitions 3 --replication-factor 2

# 查看分区状态
./kafka-topics.sh --zookeeper localhost:2181 --describe --topic test
Topic: test	TopicId: AT0BOovLTkyBHJ0B1LkGCQ	PartitionCount: 3	ReplicationFactor: 2	Configs: 
	Topic: test	Partition: 0	Leader: 0	Replicas: 0,2	Isr: 0,2
	Topic: test	Partition: 1	Leader: 1	Replicas: 1,0	Isr: 1,0
	Topic: test	Partition: 2	Leader: 2	Replicas: 2,1	Isr: 2,1
	
# 生产者消费者测试
# 启动消费者
./kafka-console-consumer.sh --bootstrap-server localhost:9092,localhost:9093,localhost:9094 --topic test
# 启动生产者
./kafka-console-producer.sh --broker-list localhost:9092,localhost:9093,localhost:9094 --topic test
# 启动成功后就可以进行消息的发送和接收
```





## 监听器

listeners：指定 broker 启动时本机的监听名称和端口，给服务端使用

```properties
# 有四种指定方式
listeners=PLAINTEXT://:9092
listeners=PLAINTEXT://hostname:9092
listeners=PLAINTEXT://0.0.0.0:9092
listeners=PLAINTEXT://192.168.1.10:9092
```

advertised.listeners 对外发布的访问 IP 和端口，注册到 Zookeeper 中，给客户端使用s





## 消息模型

1. 点对点
2. 发布订阅
3. 分区与消息顺序
4. 消息传递语义（需要生产者和消费者共同保证）：
   1. 至少一次：消息可能会丢失，永远不会重复发送
   2. 最多一次：消息不会丢失，但是可能会重复
   3. 精确一次：保证消息被传递到的服务端且服务端不重复



分区是最小的并行单位

一个消费者可以消费多个分区

一个分区可以被多个消费者组中的消费者消费，但是不能同时被同一个消费者组中的多个消费者消费



发布订阅模式中

每个消费者都属于同一个消费者组中



点对点模式中

全部消费者放在同一个组中



分区与消息顺序

1. 同一个生产者发送到同一个分区的消息，先发送的 offet 比后发送的 offset 小
2. 同一个生产者发送到不同分区的消息，消息顺序是无法保证的



分区与消费顺序

1. 消费者按照消息在分区中存放的顺序进行消费
2. Kafaka 只保证分区内的消息顺序，不能保证分区间的消息顺序



如果想要保证所有消息都有顺序，那么可以设置一个分区，但是这样就失去了扩展性和性能

通过设置消息的 key，相同的 key 的消息会发送到同一个分区，这样也可以保证同一个类型的消息的顺序





## 序列化

序列化可以使用：

1. Avro：Hadoop、Hive 支持好，一般自定义序列化也使用 Avro
2. Protobuf













