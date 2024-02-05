---
title: "链路追踪-SkyWalking"
shortTitle: "C-链路追踪-SkyWalking"
description: "链路追踪-SkyWalking"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-06-01
category: 
- "分布式"
tag:
- "分布式"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "链路追踪-SkyWalking"
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
  title: "链路追踪-SkyWalking"
  description: "链路追踪-SkyWalking"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 链路追踪-SkyWalking



## 安装

:::info 相关文章

- [docker-compose 部署Skywalking 与 简单使用](https://blog.csdn.net/Ltp_Ltp/article/details/122173914)

- [docker-compose搭建Skywalking](https://blog.csdn.net/youlinhuanyan/article/details/120922729)（这个的配置文件有点错误，看下面的就行，其他步骤按照这篇文章的来就可以）

:::

```yaml
version: '3.3'
services:
  elasticsearch:
    image: elasticsearch:7.14.2
    container_name: elasticsearch
    restart: always
    ports:
      - 9200:9200
    environment:
      discovery.type: single-node
      TZ: Asia/Shanghai
    volumes:
      - /docker/elasticsearch/logs:/usr/share/elasticsearch/logs
      - /docker/elasticsearch/data:/usr/share/elasticsearch/data
  skywalking-oap:
    image: apache/skywalking-oap-server::8.9.1
    container_name: skywalking-oap
    depends_on:
      - elasticsearch
    links:
      - elasticsearch
    restart: always
    ports:
      - 11800:11800
      - 12800:12800
    environment:
      SW_STORAGE: elasticsearch # 指定ES
      SW_STORAGE_ES_CLUSTER_NODES: elasticsearch:9200
      TZ: Asia/Shanghai
  sykwolking-ui:
    image: apache/skywalking-ui:8.9.1
    container_name: sykwolking-ui
    depends_on:
      - skywalking-oap
    links:
      - skywalking-oap
    restart: always
    ports:
      - 8088:8080
    environment:
      SW_OAP_ADDRESS: skywalking-oap:12800
      TZ: Asia/Shanghai
```

Java 应用探针上报：

> [Java Agent 下载地址](https://skywalking.apache.org/downloads/#JavaAgent)

下载完成后修改 `conf/agent.config` 中的 `backend_service` 的地址

```shell
collector.backend_service=${SW_AGENT_COLLECTOR_BACKEND_SERVICES:<yourhost>:11800}
```

Java 程序启动时带上 JVM 参数：

```shell
-javaagent:<path>\skywalking-agent\skywalking-agent.jar -Dskywalking.agent.service_name=<servicename> -Dskywalking.logging.file_name=<logfilename>
```

全部服务启动成功后：

![image-20230429215629159](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//skywalking/20230429/skywalking%E9%9D%A2%E6%9D%BF.png)

![image-20230429215825844](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//skywalking/20230429/skywalking%E6%8B%93%E6%89%91%E5%9B%BE.png)

![image-20230429220053892](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//skywalking/20230429/skywalking%E9%93%BE%E8%B7%AF%E8%BF%BD%E8%B8%AA.png)