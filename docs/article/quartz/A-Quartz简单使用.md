---
title: "Quartz 简单使用"
shortTitle: "A-Quartz 简单使用"
description: "Quartz 简单使用"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-11-07
category: 
- "定时任务"
- "中间件"
tag:
- "定时任务"
- "中间件"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Quartz 简单使用"
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
  title: "Quartz 简单使用"
  description: "Quartz 简单使用"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Quartz 简单使用



[[toc]]





## Quick Start

```xml
<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz</artifactId>
    <version>2.3.2</version>
</dependency>
<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz-jobs</artifactId>
    <version>2.3.2</version>
</dependency>
```

```java
/**
 * 任务实例
 */
public class HelloJob implements Job {

    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        // 输出当前时间
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = format.format(date);
        System.out.printf("正在进行数据库的备份，备份时间为：%s\n", dateString);
    }
}
```

```java
/**
 * 调度器
 */
public class HelloScheduler {
    public static void main(String[] args) throws SchedulerException {
        // 调度器
        Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

        // 任务实例；withIdentity 的第一个参数为任务的名称，第二个参数为任务组的名称
        JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
                .withIdentity("Job-1", "Group-1")
                .build();

        // 触发器；withIdentity 的第一个参数为触发器的名称，第二个参数为触发器组的名称
        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity("Trigger-1", "Group-1")
                .withSchedule(SimpleScheduleBuilder.repeatSecondlyForever(5))
                .build();

        // 让调度器关联任务和触发器
        scheduler.scheduleJob(jobDetail, trigger);

        // 启动调度器
        scheduler.start();
    }
}
```



## Quartz 的使用

### Job 和 JobDetail

- Job：
  - 工作任务调度的接口，任务类需要实现该接口
  - 该接口中定义的 execute 方法，类似于 JDK 提供的 TimeTask 类的 run 方法

- Job 实例在 Quartz 中的生命周期：
  - 每次调度器执行 Job 时，它在调用 execute 方法前会创建一个新的 Job 实例
  - 当调用完成后，关联的 Job 对象实例会被释放，释放的实例会被垃圾回收机制回收
- JobDetail：
  - 为 Job 提供了许多设置属性，以及 JobDateMap 曾元变量属性
  - 用来存储特定的 Job 实例的状态信息，调度器需要借助 JobDatail 对象来添加 Job 实例
  - 重要属性：name、group、jobClass、jobDataMap



### JobExecuteContext

- 当 Scheduler 调用一个 Job 时，会将 JobExecutionContext 传递给 Job 的 execute 方法
- Job 能通过 JobExecutionContext 对象访问到 Quartz 运行时环境以及 Job 本身的数据



### JobDataMap

- 在进行任务调度的时候，JobDataMap 存储在 JobExecutionContext 中，容易获取
- JobDataMap 可以用来装载任何可序列化的数据对象，当 Job 实例对象被执行时这些参数对象会传递给它
- JobDataMap 实现了 JDK 的 Map 接口，并且添加了非常方便的方法来存取基本数据类型

```java
/**
 * 调度器
 */
public class HelloScheduler {
    public HelloScheduler() {
        System.out.println("访问 HelloScheduler");
    }

    public static void main(String[] args) throws SchedulerException {
        // 调度器
        Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

        // 任务实例；withIdentity 的第一个参数为任务的名称，第二个参数为任务组的名称
        JobDetail jobDetail = JobBuilder.newJob(HelloJob.class)
                .withIdentity("Job-1", "Group-1")
                .usingJobData("message", "打印日志")
                .build();

        // 打印信息
        System.out.println("\n====================== HelloScheduler ======================");
        System.out.printf("名称：%s\n", jobDetail.getKey().getName());
        System.out.printf("组名称：%s\n", jobDetail.getKey().getGroup());
        System.out.printf("任务类名称：%s\n", jobDetail.getJobClass().getName());
        System.out.println("====================== HelloScheduler ======================\n");


        // 触发器；withIdentity 的第一个参数为触发器的名称，第二个参数为触发器组的名称
        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity("Trigger-1", "Group-1")
                .withSchedule(SimpleScheduleBuilder.repeatSecondlyForever(5))
                .usingJobData("message", "simple 触发器")
                .build();

        // 让调度器关联任务和触发器
        scheduler.scheduleJob(jobDetail, trigger);

        // 启动调度器
        scheduler.start();
    }
}
```

```java
public class HelloJob implements Job {
    public HelloJob() {
        System.out.println("访问 HelloJob");
    }

    public void execute(JobExecutionContext context) throws JobExecutionException {
        // 输出当前时间
        Date date = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = format.format(date);

        System.out.println("============================================ 任务开始执行 ============================================");
        System.out.println("====================== HelloJob ======================");

        // 从 JobExecutionContext 获取调度器传递过来的信息
        System.out.println("[jobKey 中的信息]：");
        JobKey jobKey = context.getJobDetail().getKey();
        System.out.printf("工作任务的名称：%s；工作任务的组：%s\n", jobKey.getName(), jobKey.getGroup());
        System.out.printf("任务类的名称（带路径）：%s\n", context.getJobDetail().getJobClass().getName());
        System.out.printf("任务类的名称：%s\n\n", context.getJobDetail().getJobClass().getSimpleName());

        System.out.println("[triggerKey 中的信息]：");
        TriggerKey triggerKey = context.getTrigger().getKey();
        System.out.printf("触发器的名称：%s；触发器的组：%s\n\n", triggerKey.getName(), triggerKey.getGroup());

        // 从 JobDetail 中获取 JobDataMap 数据
        System.out.println("[jobDataMap 中的信息]：");
        JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();
        String jobDataMessage = jobDataMap.getString("message");
        System.out.printf("任务数据的参数值：%s\n\n", jobDataMessage);

        // 获取 Trigger 对象的 JobDataMap 的数据
        System.out.println("[jobDataMap 中的信息]：");
        JobDataMap triggerDataMap = context.getTrigger().getJobDataMap();
        String triggerDataMessage = triggerDataMap.getString("message");
        System.out.printf("触发器数据的参数值：%s\n\n", jobDataMessage);

        // 其他信息
        System.out.println("[JobExecutionContext 中的其他信息]：");
        System.out.printf("当前任务的执行时间：%s\n", format.format(context.getFireTime()));
        System.out.printf("下次任务的执行时间：%s\n\n", format.format(context.getNextFireTime()));

        // 执行具体的业务
        System.out.println("[执行任务]：");
        System.out.printf("正在进行数据库的备份，备份时间为：%s\n", dateString);
        System.out.println("====================== HelloJob ======================");
        System.out.println("============================================ 任务执行完毕 ============================================\n");
    }
}
```



### 有状态 Job 和无状态 Job

- 有状态可以理解为多次 Job 调用期间可以持有一些状态信息，这些信息存储在 JobDataMap 中
- 默认的无状态 Job 每次调用时都会创建一个新的 JobDataMap

- 类注解 `@PersistJobDataAfterExecution` 可以让任务 Job 在调用的时候进行持久化，即会保存状态信息



### Trigger

![image-20220820155844402](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//quartz/20230209/trigger.png)