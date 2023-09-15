---
notPage: true
---





# Quartz

:::info 说明

Quartz 简单使用

:::

:::info 相关文章

[springboot的schedule和quartz到底怎么选以及如何支持并发和避坑](https://blog.csdn.net/qq_35808136/article/details/89704539)

[简洁明了看懂cron表达式](https://zhuanlan.zhihu.com/p/437328366)

:::



[[toc]]





## Quartz 概述

- Quartz 是开源且具有丰富特性的任务调度库

- 能够集成于任何的 Java 应用
- 能够创建简单或复杂的调度，执行上百上千甚至上万的任务
- 任务 Job 被定义为标准的 Java 组件，能够执行任何想要的功能
- Quartz 调度框架包含许多企业级的特性，如 JTA 事务、集群的支持

**定时任务的实现方式：**

**定时任务基础**

- Cron表达式
- Linux定时任务工具crontb

**JDK内置**

- Timer
- ScheduleExecutorService

**Netty**

- HashedWheelTimer

**Spring**

- Spring自带Schedule
- Spring集成Quartz

**分布式集群**

- Quartz持久化JDBC方式
- Elastic-job
- xxl-job





## Quartz 运行环境

- 可以运行嵌入在一个独立的应用中
- 可以在应用程序服务器内被实例化，并且参与事务
- 可以作为一个独立的程序运行，可以通过 RMI 调用
- 可以被实例化，作为独立的项目集群（负载均衡和故障转移）



## Quartz 设计模式

- Builder 模式
- Factory 模式
- 组件模式
- 链式编程



## Quartz 的核心概念

- 任务 Job：
  - 就是想要实现的任务类
  - 每个 Job 都必须实现 `org.quartz.job` 接口，且只需要实现接口定义的 `execute` 方法
- 触发器 Trigger：
  - 为执行任务的触发器
  - 主要包含两种：SimpleTrigger 和 CronTrigger
- 调度器 Scheduler：
  - 为任务的调度器
  - 会将任务 Job 以及 Trigger 整合起来，负责基于 Trigger 设定的时间来执行 Job



## Quartz 的体系结构

![image-20220818193350723](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//quartz/20230209/Quartz%E7%9A%84%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84.png)



## 常用的 API

| 序号 |                      名称                       |                             说明                             |
| :--: | :---------------------------------------------: | :----------------------------------------------------------: |
|  1   |                    Scheduler                    | 用于与调度程序交互的主程序接口；调度程序-任务执行任务计划表，只有安排进执行计划的 Job 才会在指定时间执行 |
|  2   |                       Job                       | 预先定义的希望在位来某个时间点能被调度程序执行的任务类，可以自定义 |
|  3   |                    JobDetail                    |        定义定时任务的实例。是通过 JobBuilder 类创建的        |
|  4   |                   JobDataMap                    | 可以包含不限量的（序列化的）数据对象；在 Job 实例执行时可以使用其中的数据；是 Java Map 接口的一个实现，额外增加了一些便于存取基本类型的数据的方法 |
|  5   |                     Trigger                     | 用于触发执行 Job 任务；当调度一个 Job 时，要创建一个触发器然后调整它的属性来满足 Job 执行的条件；定义一个已经被安排的任务将在什么时候执行的条件 |
|  6   |                   JobBuilder                    | 用于声明一个任务实例，也可以定义关于任务的详情，比如任务名、组名等，这个实例将会作为一个实际执行的任务 |
|  7   |                 TriggerBuilder                  |               触发器创建器。用于创建触发器实例               |
|  8   | JobListener、TriggerListener、SchedulerListener |                   监听器，用于对组件的监听                   |