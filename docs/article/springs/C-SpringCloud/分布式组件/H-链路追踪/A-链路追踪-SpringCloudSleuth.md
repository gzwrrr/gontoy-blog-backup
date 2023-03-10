---
title: "链路追踪-SpringCloudSleuth"
shortTitle: "A-链路追踪-SpringCloudSleuth"
description: "链路追踪-SpringCloudSleuth"
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
timeline: true,
dir:
  text: "链路追踪-SpringCloudSleuth"
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
  title: "链路追踪-SpringCloudSleuth"
  description: "链路追踪-SpringCloudSleuth"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 链路追踪-SpringCloudSleuth

- 在微服务框架中，一个由客户端发起的请求在后台系统中会经过多个不同的服务节点来协同产生最后的请求结果
- 每一个请求都会形成一条复杂的分布式服务调用链路，链路中的任何一环出现高延时或错误都会引起整个请求的失败
- Spring Cloud Sleuth（用于收集）提供了一套完整的服务追踪的解决方案，并且兼容了 zipkin（用于展示）
- Sleuth 中一条请求链路通过 Trace Id 唯一标识，用 Span 标识发起的请求消息，各个 Span 通过 Parent Id 关联起来
  - Trace：类似于树结构的 Span 集合，表示一条调用链路，存在唯一标识
  - Span：表示调用链路的来源，可以理解成一次请求信息