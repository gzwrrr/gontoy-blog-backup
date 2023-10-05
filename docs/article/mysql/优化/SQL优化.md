---
title: "MySQL 优化"
shortTitle: "MySQL 优化"
description: "MySQL 优化"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-12-22
category: 
- "数据库"
- "优化"
tag:
- "数据库"
- "优化"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "MySQL 优化"
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
  title: "MySQL 优化"
  description: "MySQL 优化"
  author:
    name: gzw
    email: 1627121193@qq.com
---


# MySQL 本身的优化

[[toc]]

- MySQL 内核优化
- SQL 优化
- MySQL 服务器配置优化
- 参数常量设置优化
- 主从复制
- 容灾备份

 



## 慢 SQL 优化

1. 检查是否走索引
2. 检查是否是最优索引
3. 检查所查的字段是否都是必须查询的
4. 检查表中的数据是否过多，过多应该进行分库分表
5. 检查数据库实例所在及其的性能配置