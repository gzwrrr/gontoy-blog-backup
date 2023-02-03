# Quartz 简单使用



# 概述

- Quartz 是开源且具有丰富特性的任务调度库

- 能够集成于任何的 Java 应用
- 能够创建简单或复杂的调度，执行上百上千甚至上万的任务
- 任务 Job 被定义为标准的 Java 组件，能够执行任何想要的功能
- Quartz 调度框架包含许多企业级的特性，如 JTA 事务、集群的支持



## 1.Quartz 运行环境

- 可以运行嵌入在一个独立的应用中
- 可以在应用程序服务器内被实例化，并且参与事务
- 可以作为一个独立的程序运行，可以通过 RMI 调用
- 可以被实例化，作为独立的项目集群（负载均衡和故障转移）



## 2.Quartz 设计模式

- Builder 模式
- Factory 模式
- 组件模式
- 链式编程



## 3.Quartz 的核心概念

- 任务 Job：
  - 就是想要实现的任务类
  - 每个 Job 都必须实现 `org.quartz.job` 接口，且只需要实现接口定义的 `execute` 方法
- 触发器 Trigger：
  - 为执行任务的触发器
  - 主要包含两种：SimpleTrigger 和 CronTrigger
- 调度器 Scheduler：
  - 为任务的调度器
  - 会将任务 Job 以及 Trigger 整合起来，负责基于 Trigger 设定的时间来执行 Job



## 4.Quartz 的体系结构

![image-20220818193350723](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Quartz\Quartz.assets\image-20220818193350723.png)



## 5.常用的 API

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



# Quick Start

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



# Quartz 的使用

## 1.Job 和 JobDetail

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



## 2.JobExecuteContext

- 当 Scheduler 调用一个 Job 时，会将 JobExecutionContext 传递给 Job 的 execute 方法
- Job 能通过 JobExecutionContext 对象访问到 Quartz 运行时环境以及 Job 本身的数据



## 3.JobDataMap

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



## 4.有状态 Job 和无状态 Job

- 有状态可以理解为多次 Job 调用期间可以持有一些状态信息，这些信息存储在 JobDataMap 中
- 默认的无状态 Job 每次调用时都会创建一个新的 JobDataMap

- 类注解 `@PersistJobDataAfterExecution` 可以让任务 Job 在调用的时候进行持久化，即会保存状态信息



## 5.Trigger

![image-20220820155844402](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Quartz\Quartz.assets\image-20220820155844402.png)