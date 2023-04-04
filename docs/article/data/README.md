---
notPage: true
---





# 大数据



:::info 说明
大数据学习笔记，准备中...

[大数据入门指南（Github 项目）](https://github.com/heibaiying/BigData-Notes)
:::



## 大数据组件

> 基础部分的知识和后端开发很相似，不同的地方就在于海量数据的采集、存储、计算、管理



### 离线框架

1. Hadoop：最早期的 MapReduce 就是 Hadoop 提供的分布式计算框架，可以用来统计和分析 HDFS 上的海量数据，适合于速度不敏感的**离线批处理**；后来出现的内存计算框架 Spark 则更加适合做迭代运算
2. Hive：大数据系统的数据仓库（可以理解为让开发人员可以使用 SQL 来操作 HDFS 上的数据，适用于离线批量数据的处理）
3. Sqoop：数据采集和传输工具（比如将 MySQL 数据迁移到 Hive）
4. DataX：淘宝开源，与 Sqoop 是同类型工具
5. Impala/Presto
6. HBase
7. Oozie/Azkaban/海豚调度





### 实时框架

1. Flume：分布式数据采集和聚合框架，最典型的应用就是日志数据的收集。可以定制各类数据发送方并聚合数据，同时提供对数据的简单处理，并写到各种数据接受方，完成数据传输。（此外 Logstash 也比较常用）
2. Canal/Maxwell
3. Kafka
4. Flink
5. Clickhosue





### 一般步骤

> 下面各部分组成的整体可以称之为大数据引擎

1. 数据采集：收集、聚合、迁移

2. 数据存储：
   1. 关系型：MySQL、SQL Server、Oracle
   2. 非关系型：ElasticSearch、Redis、MongoDB、HBase（基于 HDFS 分布式文件系统）、Neo4J、InfluxDB
   3. 数据仓库：Hive、Clickhouse、Pig、Kylin、Presto
3. 数据处理：
   1. 离线计算：Hadoop、Spark
   2. 在线（流式）计算：Storm、Flink
4. 管理工具：
   1. 集群部署、管理、监控：Ambari、Cloudera Manager
   2. 资源管理框架：YARN
   3. 任务调度：Azkaban、Oozie
   4. 协调服务：Zookeeper
   5. 消息中间件：Kafka





## 基础项目

1. 离线数仓
2. 实时数仓
3. 实时大屏
4. 推荐系统











