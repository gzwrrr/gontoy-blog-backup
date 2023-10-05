---
title: "JVM 性能调优"
shortTitle: "H-JVM 性能调优"
description: "JVM 性能调优"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-06-11
category: 
- "java"
- "JVM"
- "虚拟机"
tag:
- "java"
- "JVM"
- "虚拟机"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "JVM 性能调优"
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
  title: "JVM 性能调优"
  description: "JVM 性能调优"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# JVM 性能调优

## 概述

### 常见问题

1. 生产环境出现 OOM 证明处理
2. 生产环境给服务器分配多少内存合适
3. 如何对垃圾回收器的性能进行调优
4. 生产环境 CPU 负载飙高如何处理
5. 生产环境应该给应用分配多少线程
6. 不加日志时如何确定请求是否执行了某一行代码
7. 不加日志时如何查看某个方法的入参和返回值



### 为什么调优

1. 防止或解决 OOM
2. 减少 Full GC 频率



### 监控的依据

1. 运行日志
2. 异常堆栈
3. GC 日志
4. 线程快照
5. 堆转储快照



### 性能优化三部曲

**性能监控（发现问题）：**

1. GC 频繁
2. CPU 负载过高
3. OOM
4. 内存泄露
5. 死锁
6. 程序响应时间过长

**性能分析（排查问题）：**

1. 使用工具分析日志
2. 灵活运用命令行工具，比如：jps、jstack、jmap、jinfo
3. dump 出堆文件，使用内存分析工具分析
4. 使用 Arthas、jconsole、jVisualVM 等图形化工具来查看 JVM 状态

**性能调优（解决问题）：**

1. 适当增加内存，根据业务选择垃圾回收器
2. 优化代码，控制内存使用
3. 横向扩展服务器资源，分散节点压力
4. 合理设置线程池线程数量
5. 使用中间件提高程序效率，比如：缓存、消息队列



### 性能指标

1. 停顿时间
2. 吞吐量
3. 并发数
4. 内存占用



### 补充

#### 对象回收

在分析 GC 时可回收对象有哪些时还涉及到一下概念：

1. 浅堆（Shallow Heap）：与浅拷贝对应；不计算当前对象中引用指向的对象的大小，即只包含了当前对象的值、引用、对象头的大小
2. 深堆（Retained Heap，保留集）：与深拷贝对应；在浅堆的基础上，加上「只能」由当前对象指向的对象的大小
3. 对象实际大小：在浅堆的基础上，加上由当前对象指向的对象的大小
4. 支配树：支配是指，如果访问 B 对象只能通过 A 对象，那么 A 对象支配 B 对象及 B 对象支配的对象，由此可以构成一棵支配树

分析出支配树后，可以很容易找到对象的深堆，深堆的大小就是对象回收后释放的总内存的大小



#### 内存泄露与溢出

要分清两个问题：

1. 是否被使用
2. 是否被需要

如果被使用中，但是不被需要，就代表可能存在不需要的对象引用未断开的情况，可能有内存泄露

内存泄露的一些情况：

1. 静态集合类：静态类指向局部变量
2. 单例模式：对象生命周期过长
3. 内部类持有外部类：内部类被其他类引用，这样会导致外部类无法释放
4. 各种连接：数据库连接、网络连接、IO 连接
5. 变量不合理的作用域：局部变量提升到全局变量后，只要对象不能被回收，那么该变量也不能被回收
6. 改变了哈希值：将对象放入 HashSet 之后，如果对象中的某些字段参与了哈希值的计算，并且之后使用中还修改了这些字段的值，那么 HashSet 中的该对象就不能再被使用了
7. 缓存泄露：本地缓存中的非必须的对象不能被及时清理，此时可以使用弱引用，当内存不足时将这些不是必须的对象回收
8. 监听器和回调：如果客户端在实现的 API 中注册回调，但是没有显示地取消，那么就会积聚，此时也可以使用弱引用解决





## 工具

基础工具：

1. jmap：`jmap -dump:format=b file=<filename.hprof> <pid>` 直接在控制台打印出信息。jmap是一个多功能的命令。它可以生成 java 程序的 dump 文件， 也可以查看堆内对象示例的统计信息、查看 ClassLoader 的信息以及 finalizer 队列
2. jconsole：JDK 自带的监控工具
3. jstack：线程堆栈分析工具（https://juejin.cn/post/6844904152850497543）
4. jps：查看运行中的 Java 应用的进程号
5. jinfo：用来查看正在运行的 java 应用程序的扩展参数
6. jstat：查看 JVM 内存状态
7. CHLSDB
8. jdb

进阶工具：

1. jprofile
2. btrace
3. Greys
4. Arthas
5. javOSizez
6. dmesg

常见的日志分析工具：

1. GCViewer：离线工具，比较老
2. GCEasy：在线工具，官网 https://gceasy.io/
3. GCHisto：和 GCViewer 类似，不怎么维护了
4. GCLogViewer
5. Hpjmeter
6. garbagecat

其他工具：

1. Flame Graphs 火焰图：查看方法占用 CPU 的情况
2. Tprofiler
3. Btrace
4. YourKit
5. JProbe
6. Spring Insight



### 命令行工具

jstat

> jstat 命令结构：`jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]`

1. `option`：可选参数
2. `interval`：用于指定输出统计数据的周期，单位为毫秒
3. `count`：用于指定查询的总次数
4. `-t`：可以在输出信息前加上一个 Timestamp 列，显示程序运行的时间，单位为秒
5. `-h`：可以在周期性数据输出时，输出多少行数据后输出一个表头信息
6. `vmid`：进程号

其中重点为 `option` 参数，其余参数可由下面的例子解释：

```shell
# -t 加上 Timestamp 列，-h3 表示每输出三行再打印一次表头，1688 表示进程号，1000 表示每隔 1 秒输出一次，10 代表一共输出 10 次
jstat -class -t -h3 16788 1000 10

# 输出如下：
Timestamp  Loaded  Bytes  Unloaded  Bytes     Time   
423.1   	1001  2247.3        0     0.0       0.07
424.1   	1001  2247.3        0     0.0       0.07
425.1   	1001  2247.3        0     0.0       0.07
Timestamp  Loaded  Bytes  Unloaded  Bytes     Time   
426.1	   	1001  2247.3        0     0.0       0.07
427.1   	1001  2247.3        0     0.0       0.07
428.1   	1001  2247.3        0     0.0       0.07
Timestamp  Loaded  Bytes  Unloaded  Bytes     Time   
429.1  		1001  2247.3        0     0.0       0.07
430.2   	1001  2247.3        0     0.0       0.07
431.2   	1001  2247.3        0     0.0       0.07
Timestamp  Loaded  Bytes  Unloaded  Bytes     Time   
432.2   	1001  2247.3        0     0.0       0.07
```

| 序号 | option              | 说明                                       |
| ---- | ------------------- | ------------------------------------------ |
| 1    | `-class`            | 显示类装载的相关信息                       |
| 2    | `-gc`               | 显示 GC 相关信息                           |
| 3    | `-gccapacity`       | 与 `-gc` 类似，但是更关注堆区最大/最小内存 |
| 4    | `-gcutil`           | 与 `-gc` 类似，但是更关注已使用空间        |
| 5    | `-gccause`          | 与 `-gcutil` 一样，但是还会额外打印原因    |
| 6    | `-gcnew`            | 显示新生代 GC 情况                         |
| 7    | `-gcnewcapacity`    | 与 `-gccapacity` 类似                      |
| 8    | `-gcold`            | 显示老年代 GC 情况                         |
| 9    | `-gcoldcapacity`    | 与 `-gccapacity` 类似                      |
| 10   | `-gcpermcapacity`   | 与 `-gccapacity` 类似（显示永久代）        |
| 11   | `-compiler`         | 显示  JIT 编译器编译过的方法、耗时等信息   |
| 12   | `-printcompilation` | 输出已经被 JIT 编译的方法                  |

补充：jstatd 可以用于监控远程程序，本质是一个 RMI 服务端程序，作用相当于代理服务器，可以建立本地计算机与远程监控工具的通信，然后将本地 Java 程序信息传递到远程计算机



#### jinfo

> 查看虚拟机配置参数相关信息，命令结构较为简单：`jinfo <option> <pid>`，主要分为查看和修改信息

| 序号 | option                          | 说明                                              |
| ---- | ------------------------------- | ------------------------------------------------- |
| 1    | `-sysprops`                     | 查看由 `System.getProperties()` 获取的参数        |
| 2    | `-flags`                        | 查看曾经赋值过的参数                              |
| 3    | `-flag <具体参数>`              | 查看某个进程的具体参数值                          |
| 4    | `-flag [+|-]<具体参数>`         | 修改某个进程的具体参数，针对于 boolean 类型的参数 |
| 5    | `-flag <具体参数>=<具体参数值>` | 修改某个进程的具体参数，针对非 boolean 类型的参数 |





#### jmap

> 导出内存映像文件（dump 文件）和内存使用情况

```shell
# 输出整个堆空间的详细信息，包括 GC 的使用、堆配置信息、内存的使用信息
jmap -histo[:[<histo-options>]] <pid>

# 生成转储快照，即 dump 文件
jmap -dump:<dump-options> <pid>

# 仅仅 linux/solaris 平台有效，显示再 F-Queue 队列中等待 Finalizer 线程执行 finalize 方法的对象
jmap -finalizerinfo <pid>

# 其他
jmap -? -h --help
jmap -clstats <pid>
```
```shell
# 生成 dump 文件
jmap -dump:format=b,file=<filename.hprof> <pid>

# 只将堆存活的对象放到 dump 文件中
jmap -dump:live,format=b,file=<filename.hprof> <pid>
```

注意：jmap 必须在安全点上进行操作，而 jstat 是可以实时获取数据的



#### jhat

> 与 jmap 搭配使用，用于分析 dump 文件。jhat 内置了 HTTP 服务器，用户可以在浏览器中查看分析结果，默认访问地址为：http://localhost:7000

注意：jhat 在 JDK 9 之后就被删除了，官方建议使用 Visual VM 代替





#### jstack

> 用于生成虚拟机指定进程当前时刻的线程快照 Thread Dump，命令结构为：`jstack -<option> <pid>`

| 序号 | option | 说明                                        |
| ---- | ------ | ------------------------------------------- |
| 1    | `-F`   | 当正常的请求不被响应时，强制输出线程堆栈    |
| 2    | `-l`   | 除堆栈外，显示关于锁的附加信息              |
| 3    | `-m`   | 如果调用的是本地方法，可以显示 C/C++ 的堆栈 |
| 4    | `-h`   | 查看帮助信息                                |





#### jcmd

> 多功能工具，可以实现之前的除了 jstat 之外的所有命令的功能，jcmd 有 jmap 的大部分功能，并且官方也建议使用 jcmd 代替 jmap

| 序号 | option             | 说明                                   |
| ---- | ------------------ | -------------------------------------- |
| 1    | `-l`               | 列出所有 JVM 进程                      |
| 2    | `<pid> help`       | 针对指定的进程列出支持的所有指令       |
| 3    | `<pid> <具体命令>` | 配合上面的命令，对指定进程执行具体命令 |







### 图形化工具

#### jConsole

JDK 自带的可视化监控工具，可以查看 Java 应用程序的运行情况、监控堆信息、元空间使用情况、类加载情况等



#### VisualVM

> 注意：分为 jVisualVM 和 VisualVM，都差不多，前者在 JDK 中就有，而后者需要单独下载

JDK 提供的可视化监控工具，用于查看虚拟机运行的应用程序的详细信息



#### JMC

内置了 Java Flight Recorder，能够以极低的开销收集 Java 虚拟机的性能数据



#### MAT

基于 Eclipse 的内存分析工具，是一个快速、功能丰富的堆分析工具，可以帮助查找内存泄露和减少内存消耗

MAT 功能较为强大，可以很容易看出内存情况，比如给出了支配树、分析报告等



#### JProfiler

与 Visual VM 类似，功能强大的商业软件，但是需要付费

1. 跨平台、使用简单、界面友好
2. 对分析的应用影响小
3. 对 CPU、线程、内存的分析功能强大
4. 对 JDBC、NoSQL、JSP、Servlet 等也提供分析功能
5. 支持在线和离线模式，可以监控本地、远程环境

包含的功能：

1. 遥感监测数据视图分析
2. 内存视图分析
3. Heap Walker
4. CPU 视图分析
5. 线程视图分析



#### Arthas

Alibaba 开源 Java 诊断工具（用的比较多）



#### Btrace

Java 运行时追踪工具，可以在不停机的情况下跟踪指定的方法调用、构造函数调用、系统内存信息等

