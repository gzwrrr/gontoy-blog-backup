---
title: "Spring Boot 常见问题"
shortTitle: "Z-Spring Boot 常见问题"
description: "Spring Boot 常见问题"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "spring"
- "原理"
tag:
- "spring"
- "原理"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Spring Boot 常见问题"
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
  title: "Spring Boot 常见问题"
  description: "Spring Boot 常见问题"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring Boot 常见问题

[[toc]]



## Spring Boot 如何启动 Tomcat？

1. 先创建一个 Spring 容器
2. 在创建 Spring 容器的过程中，会利用 `@ConditionOnClass` 来判断当前 classpath 中是否存在 Tomcat 依赖，如果存在则会生成一个启动 Tomcat 的 Bean
3. Spring 容器创建完成后，会获取启动 Tomcat 的 Bean，并创建 Tomcat 对象和绑定端口
4. 然后启动 Tomcat





