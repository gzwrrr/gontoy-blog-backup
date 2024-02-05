---
title: "服务调用-OpenFeign"
shortTitle: "B-服务调用-OpenFeign"
description: "服务调用-OpenFeign"
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
  text: "服务调用-OpenFeign"
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
  title: "服务调用-OpenFeign"
  description: "服务调用-OpenFeign"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# 服务调用-OpenFeign

- 一个声明式 WebServeice 客户端，使用 Feign 编写可以让客户端更加简单
- 使用方法式定义一个服务接口然后再上面添加注解
- Feign 支持可插拔式的编码器和解码器
- Spring Cloud 对 Feign 进行了封装，即 OpenFeign，使得其支持了 Spring MVC 标准注解和 HttpMessageConverters
- OpenFiegn 可以与 Eureka 和 Ribbon 组合使用以支持负载均衡



<br/>

## Feign 的作用

- 使用 Ribbon 时要和 RestTemplate 一起使用，即使用 RestTemplate 对 http 请求进行封装，形成一套模板化的调用方法
- 但是在实际开发中，对服务依赖的调用可能不止一处，往往是一个接口会被多出调用，所以通常会对每个微服务自行封装一些客户端类来包装这些依赖服务的调用
- Feign 在上述基础上做了进一步封装，由它来定义和实现依赖服务接口的定义
- 在 Feign 的是线下，我们只需要创建一个接口并使用注解的方式来配置它；以前是在 Mapper 接口上标注 Mapper 接口，现在是在一个微服务接口上标注一个 Feign 注解即可完成对服务提供方的接口绑定，即简化了 Ribbon 的使用
- Feign 已经集成了 Ribbon，自带负载均衡