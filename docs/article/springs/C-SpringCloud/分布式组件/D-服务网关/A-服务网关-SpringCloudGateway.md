---
title: "服务网关-SpringCloudGateway"
shortTitle: "A-服务网关-SpringCloudGateway"
description: "服务网关-SpringCloudGateway"
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
  text: "服务网关-SpringCloudGateway"
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
  title: "服务网关-SpringCloudGateway"
  description: "服务网关-SpringCloudGateway"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 服务网关-SpringCloudGateway

- 基于 Spring + S pring Boot 和 Project Reator 等技术开发的网关，为微服务架构提供一种简单有效的统一的 API 路由管理方式
- 基于 WebFlux 框架实现的，底层使用了高性能的 Reactor 模式通信框架 Netty，所以 Gateway 是异步非阻塞模型
- 目标是提供统一的路由方式，且是基于 Filter 链的方式提供的网关的基本功能（如：安全、监控、指标、限流）
- Route 路由：构建网关的基本模块，由 ID、目标 URI 、一系列的断言和过滤器组成，如果断言为真就匹配该路由
- Filter 过滤：GatewayFilter 实例，可以在请求前后做一些操作

