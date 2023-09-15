---
title: "ElasticSearch 客户端"
shortTitle: "X-ElasticSearch 客户端"
description: "ElasticSearch 客户端"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-04-23
category: 
- "中间件"
- "elasticsearch"
tag:
- "中间件"
- "elasticsearch"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "ElasticSearch 客户端"
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
  title: "ElasticSearch 客户端"
  description: "ElasticSearch 客户端"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# ElasticSearch 客户端



[[toc]]



:::info 说明

相关文档：

1. https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/current/getting-started-java.html
2. https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#reference

:::



## 概述

在 Java 中使用 Elasticsearch 有多种方式，Elasticsearch 是一个开源的分布式搜索和分析引擎，用于存储和检索大量的数据。以下是在 Java 中使用 Elasticsearch 的一些常见方式：

1. **Elasticsearch Java High-Level REST Client：** 这是官方提供的高级 REST 客户端，通过 HTTP 与 Elasticsearch 集群进行交互。它提供了与 Elasticsearch API 对应的 Java 方法，使得编写 Java 代码与 Elasticsearch 进行数据的索引、检索、删除等操作非常方便。
2. **Elasticsearch Java Low-Level REST Client：** 这也是官方提供的 REST 客户端，与上述高级客户端相比，它提供了更底层的访问方式，更接近 Elasticsearch 的原生 REST API。适用于那些需要更精细控制的情况。
3. **Spring Data Elasticsearch：** 如果您使用 Spring 框架，可以使用 Spring Data Elasticsearch 模块来集成 Elasticsearch。它提供了与 Spring Data JPA 类似的仓库接口和查询构建方式，让您能够通过编写简洁的代码与 Elasticsearch 进行交互。
4. **Native Java API：** Elasticsearch 提供了原生的 Java API，您可以使用它来构建各种与 Elasticsearch 集群交互的代码。这需要更多的配置和处理，但提供了更高的灵活性。
5. **Elasticsearch Transport Client（已弃用）：** Elasticsearch 早期提供了 Transport Client，用于与 Elasticsearch 集群建立连接，但在较新的版本中已被弃用，不再推荐使用。
6. **第三方库：** 除了官方提供的方式外，还有一些第三方的 Elasticsearch 客户端库，例如 Jest、Elasticsearch RestHighLevelClient 等，它们也提供了在 Java 中与 Elasticsearch 集群进行交互的能力。











