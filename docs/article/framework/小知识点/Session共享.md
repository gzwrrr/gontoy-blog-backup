---
title: "Session 共享"
shortTitle: "Session 共享"
description: "Session 共享"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-10-09
category: 
- "小知识点"
tag:
- "小知识点"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Session 共享"
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
  title: "Session 共享"
  description: "Session 共享"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Session 共享

> 分布式环境下 Session 共享问题应该如何解决？

1. 采用无状态服务，抛弃 Session，使用 Token 等
2. 存入 Cookie 中，但是这样有安全风险
3. 服务器之间使用 Session 同步，但是当服务器数量较多时同步会延迟甚至失败
4. 使用 IP 绑定策略，即让一台机器只能由一个 IP 访问，但是这样就失去了负载均衡的意义，当一台服务器器挂掉会影响很多用户
5. 使用 Redis 存储 Session，会导致架构上变得复杂，但是好处就是可以实现水平扩展，而且还能跨服务器/跨平台共享 

