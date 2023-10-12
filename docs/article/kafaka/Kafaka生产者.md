---
title: "Kafaka 生产者"
shortTitle: "Kafaka 生产者"
description: "Kafaka 生产者"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-01-13
category: 
- "中间件"
- "消息队列"
tag:
- "中间件"
- "消息队列"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Kafaka 生产者"
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
  title: "Kafaka 生产者"
  description: "Kafaka 生产者"
  author:
    name: gzw
    email: 1627121193@qq.com
---

# Kafaka 生产者


## 发送流程

![生产者发送流程](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//kafaka/20230731/%E7%94%9F%E4%BA%A7%E8%80%85%E5%8F%91%E9%80%81%E6%B5%81%E7%A8%8B.png)





## 异步发送

1. 普通异步发送
2. 回调异步发送

```java
public class CustomProducer {
    public static void main(String[] args) throws InterruptedException {
        Properties properties = new Properties();

        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "192.168.30.201:9092,192.168.30.201:9093,192.168.30.201:9094");
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        KafkaProducer<String, String> kafkaProducer = new KafkaProducer<>(properties);
        
        for (int i = 0; i < 1000; i++) {
            kafkaProducer.send(new ProducerRecord<>("test", "test" + i), (recordMetadata, e) -> {
                if (e == null) {
                    System.out.println("主题：" + recordMetadata.topic() + " 分区：" + recordMetadata.partition());
                }
            });
        }
        kafkaProducer.close();
    }
}
```

**分区的好处：**

1. 便于合理使用存储资源，每个分区在一个 Broker 上存储，可以把海量的数据按照分区切割成一块一块数据存储在多台 Broker 上，合理控制分区的任务，可以实现负载均衡的效果
2. 提高并行度：生产者可以以分区为单位发送数据，消费者可以以分区为单位消费数据

<br/>

**默认分区规则：**

1. 指定分区时直接将指明的值作为分区的值
2. 没有指明分区值，但是有 key 的情况下，将 key 的 hash 值与 topic 的分区数进行取余得到分区值
3. 既没有分区值也没有 key 时，采用 Sticky Partiton（黏性分区器），随机选择一个分区，并尽可能一直使用该分区，待该分区的 batch 已满或者已完成，再随机选择一个分区进行使用（和上一次的分区不一样）

<br/>

**自定义分区：**

实现 Partitioner 接口

```java
// properties.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, "xxx.xxx.xxx.CustomerPartition")
public class CustomerPartition implements Partitioner {
    @Override
    public int partition(String s, Object o, byte[] bytes, Object o1, byte[] bytes1, Cluster cluster) {
        return 0;
    }
    @Override
    public void close() {
    }
    @Override
    public void configure(Map<String, ?> map) {
    }
}
```

<br/>

**生产者提高吞吐量：**

1. 改变 batch.size 大小，默认是 16 k
2. 改变等待时间 linger.ms，可以修改为 5 ~ 100ms
3. 改变 compression.type，压缩 snappy
4. 改变 RecordAccumulator 缓冲区大小，可以修改为 64M



**ack 应答级别：**

> 从上到下可靠性上升，效率下降

1. 级别 0：生产者发送过来的数据，不需要等待数据落盘应答
2. 级别 1：生产者发送过来的数据，Leader 收到数据后应答
3. 级别 -1（all）：生产者发送过来的数据，Leader 和 ISR 队列里面的所有节点收齐数据后应答





## 事务

> 注意：开启事务，必须开启幂等性

Producer 在使用事务功能之前，必须先自定义一个唯一的 transactional.id，有了该 ID 后即使客户端挂掉了，重启后也能继续处理未完成的事务

事务信息存储在一个特定的分区中：

1. 默认有50个分区，每个分区负责一部分事务。
2. 事务划分是根据 transactional.id 的 hashcode 值 %50，计算出该事务属于哪个分区。
3. 该分区 Leader 副本所在的 broker 节点即为这个 transactional.id 对应的 Transaction Coordinator 节点。

```java
// 1.初始化事务
void initTransactions();

// 2.开启事务
void beginTransaction() throws ProducerFencedException;

// 3.在事务内提交已经消费的偏移量（主要用于消费者）
void sendOffsetsToTransaction(Map<TopicPartition, OffsetAndMetadata> offsets,
                              String consumerGroupId) throws ProducerFencedException;

// 4.提交事务
void commitTransaction() throws ProducerFencedException;

// 5.放弃事务（类似于回滚事务的操作）
void abortTransaction() throws ProducerFencedException;
```





## 数据去重

**幂等性原理：**

值 Producer 不论向 Broker 发送多少次重复数据，Broker 端都只会持久化一条，保证了不重复

重复数据的判断标准：具有 `<PID, Partition, SeqNumber>` 相同主键的消息提交时，Broker 只会持久化一条，其中 PID 是 Kafka 每次重启都会分配的 ID，Partition 表示分区号，Sequence Number 是单调自增的

所以幂等性只能保证再「单分区单会话」内不会重复

1. 精确一次：幂等性 + 至少一次（ack = -1 + 分区副本数 》= 2 + ISR 最小副本数 >= 2）



## 数据有序

1. 单分区内有序
2. 多分区时分区与分区无序

Broker 默认最多缓存 5 个请求

kafka 1.x 之前无法保证单分区有序，需要单分区有序可以将 max.in.flight.requests.per.connection = 1（不需要考虑是否开启幂等性 ）

kafka 1.x 之后保证单分区有序可以使用：

1. 未开启幂等性：max.in.flight.requests.per.connection = 1
2. 开启幂等性：max.in.flight.requests.per.connection <= 5





https://www.bilibili.com/video/BV1vr4y1677k?p=22&vd_source=e356fec025b50061af78324a814f8da0