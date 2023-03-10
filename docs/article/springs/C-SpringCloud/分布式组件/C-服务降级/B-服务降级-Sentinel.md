---
title: "服务降级-Sentinel"
shortTitle: "B-服务降级-Sentinel"
description: "服务降级-Sentinel"
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
  text: "服务降级-Sentinel"
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
  title: "服务降级-Sentinel"
  description: "服务降级-Sentinel"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 服务降级-Sentinel

> 独立的组件，有 Web 界面，可以更加细粒度地配置

![image-20221023112720793](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E5%88%86%E5%B8%83%E5%BC%8F%E7%BB%84%E4%BB%B6/20230210/sentinel.png)

流控规则

| 序号 |       属性        | 说明                                                         |
| :--: | :---------------: | :----------------------------------------------------------- |
|  1   |      资源名       | 唯一名称，默认为请求路径                                     |
|  2   |     针对来源      | Sentinel 可以针对调用者进行限流，填写微服务名称，默认为 default（不区分来源） |
|  3   | 阈值类型/单机阈值 | 1. QPS（每秒请求数量）：当调用该 API 的 QPS 达到阈值时进行限流<br />2. 线程数：当调用该 API 的线程数达到阈值时进行限流 |
|  4   |     是否集群      | 不需要集群                                                   |
|  5   |     流控模式      | 1. 直接：API 达到限流条件时直接限流<br />2. 关联：当关联的资源达到阈值时，限流自己（A 关联 B，B 达到阈值，A 挂）<br />3. 链路：只记录指定链路上的流量（API 级别），即指定资源入口进来的流量，如果达到阈值就进行限流 |
|  6   |     流控效果      | 1. 快速失败：直接失败抛异常<br />2. Warm up：根据 codeFactor（冷加载因子，默认 3）的值，从阈值/codeFactor，进过预热时长才达到设置的 QPS 阈值<br />3. 排队等待：让请求匀速通过，阈值类型必须设置成 QPS 否则无效 |



## 降级规则

> Sentinel 熔断降级会在调用链路中某个资源出现不稳定时，对这个资源的调用进行限制，让请求快速失败，避免影响到其他的资源二导致级联错误；当资源被降级后，在接下来的降级时间窗口内，对该资源的调用都自动熔断（默认是抛出 DegradeException）

| 序号 |           属性           |                             说明                             |
| :--: | :----------------------: | :----------------------------------------------------------: |
|  1   | RT（平均响应时间，秒级） | 超出阈值且在时间窗口内通过的请求大于等于 5 时，触发降级<br />窗口期过后关闭断路器<br />RT 最大为 4900（更大的需要设置 -Dcsp.sentinel.statistic.max.rt=xxx） |
|  2   |     异常比例（秒级）     | QPS 大于等于 5 且异常比例（秒级统计）超过阈值时，触发降级<br />时间窗口结束后，关闭降级 |
|  3   |     异常数（分钟级）     | 异常数（分钟统计）超过阈值时，触发降级<br />时间窗口结束后，关闭降级 |



<br/>

## 热点规则

> TODO