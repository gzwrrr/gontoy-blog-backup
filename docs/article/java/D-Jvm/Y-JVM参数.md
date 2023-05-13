---
title: "JVM 参数"
shortTitle: "Y-JVM 参数"
description: "JVM 参数"
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
timeline: true,
dir:
  text: "JVM 参数"
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
  title: "JVM 参数"
  description: "JVM 参数"
  author:
    name: gzw
    email: 1627121193@qq.com
---






# JVM 参数



## 内存设置

|      | 参数                       | 说明                                                         |
| ---- | -------------------------- | ------------------------------------------------------------ |
|      | `-Xms`                     | 堆最小值                                                     |
|      | `-Xmx`                     | 堆最大值，通常 `-Xms` 和 `-Xmx`大小相同，这样就不会动态扩容  |
|      | `-Xmn`                     | 新生代大小                                                   |
|      | `-Xss`                     | 每个线程池的堆栈大小。在jdk5以上的版本，每个线程堆栈大小为1m，jdk5以前的版本是每个线程池大小为256k。一般在相同物理内存下，如果减少－xss值会产生更大的线程数，但不同的操作系统对进程内线程数是有限制的，是不能无限生成 |
|      | `-XX:NewRatio`             | 设置新生代与老年代比值，-XX:NewRatio = 4 表示新生代与老年代所占比例为 1 : 4 ，新生代占比整个堆的五分之一。如果设置了 `-Xmn` 的情况下，该参数是不需要在设置的 |
|      | `-XX:MaxTenuringThreshold` | 新生代对象的存活次数，默认为 15                              |
|      | `-XX:SurvivorRatio`        | 存活区与伊甸园区的比例，默认为 2 : 8                         |
|      | `-XX:MaxMetaspaceSize`     | 元数据区大小。`PermSize` 和 `MaxPermSize` （永久代）已经不能使用了，在 JDK8 中配置这两个参数将会发出警告。 |

1. Xmn用于设置新生代的大小。过小会增加Minor GC频率，过大会减小老年代的大小。一般设为整个堆空间的1/4或1/3.
2. XX:SurvivorRatio用于设置新生代中survivor空间(from/to)和eden空间的大小比例； XX:TargetSurvivorRatio表示，当经历Minor GC后，survivor空间占有量(百分比)超过它的时候，就会压缩进入老年代(当然，如果survivor空间不够，则直接进入老年代)。默认值为50%。
3. 为了性能考虑，一开始尽量将新生代对象留在新生代，避免新生的大对象直接进入老年代。因为新生对象大部分都是短期的，这就造成了老年代的内存浪费，并且回收代价也高(Full GC发生在老年代和方法区Perm).
4. 当Xms=Xmx，可以使得堆相对稳定，避免不停震荡
5. 一般来说，MaxPermSize设为64MB可以满足绝大多数的应用了。若依然出现方法区溢出，则可以设为128MB。若128MB还不能满足需求，那么就应该考虑程序优化了，减少**动态类**的产生。





## 错误处理

OOM：

1. java.lang.OutOfMemoryError: Metaspace
2. OutOfMemoryError: GC overhead limit exceeded
3. OutOfMemoryError: Java heap space

| 序号 | 参数                                 | 说明                                                         |
| ---- | ------------------------------------ | ------------------------------------------------------------ |
|      | `-XX:+HeapDumpOutofMemoryErorr`      | 当发生 OOM 时会自动 dump 堆栈到文件中                        |
|      | `-XX:HeapDumpPath`                   | 指定 dump 文件的保存路径                                     |
|      | `-XX:-UseGCOverheadLimit`            | 会将 OutOfMemoryError: GC overhead limit exceeded 延迟到 OutOfMemoryError: Java heap space |
|      | `-XX:+HeapDumpOnOutOfMemoryError`    | 在 OutOfMemoryError 后获取一份 HPROF 二进制 Heap Dump 文件   |
|      | `-XX:+HeapDumpOnCtrlBreak`           | Ctrl + Break 组合键即可获取一份 Heap Dump                    |
|      | `-agentlib:hprof=heap=dump,format=b` | 在程序执行结束时或受到 SIGOUT 信号时生成 Dump 文件           |





## 垃圾收集

| 序号 | 参数                                 | 说明                                                         |
| ---- | ------------------------------------ | ------------------------------------------------------------ |
|      | `-XX:+PrintGC`                       | 输出 GC 日志                                                 |
|      | `-XX:+PrintGCDetails`                | 打印 GC 详细日志                                             |
|      | `-XX:+PrintGCTimeStamps`             | 输出 GC 的时间戳（以基准时间的形式）                         |
|      | `-XX:+PrintGCDateStamps`             | 输出 GC 的时间戳（以日期的形式）                             |
|      | `-XX:+PrintHeapAtGC`                 | 在进行 GC 的前后打印出堆的信息                               |
|      | `-Xloggc:../logs/gc.log`             | 日志文件的输出路径                                           |
|      | `-XX:+PrintCommandLineFlags`         | 查看垃圾回收器                                               |
|      | `-XX:+UseSerialGC`                   | 使用 Serial GC 和 Serial Old GC                              |
|      | `-XX:+UseParNewGC`                   | 使用 ParNew GC                                               |
|      | `-XX:+UseParallelGC`                 | 使用 Parallel GC 和 Parallel Old GC                          |
|      | `-XX:ParallelGCThreads`              | 使用多线程垃圾收集器时指定最大线程数，默认为 CPU 核数        |
|      | `-XX:MaxGCPauseMillis`               | 设置垃圾回收的暂停时间，该参数会影响吞吐量，要谨慎修改       |
|      | `-XX:GCTimeRatio`                    | 垃圾收集时间占总时间的比例，默认 99，表示垃圾收集时间不大于 1 %，计算为 1 / (1 + N)，此处 N = 99，得出 1 % |
|      | `-XX:+UseConcMarkSwapGC`             | 使用 CMS GC 和 ParNew GC，某些情况下 CMS GC 无法工作会使用 Serial Old GC |
|      | `-XX:ParallelCMSThreads`             | 使用 CMS 时的线程数量限制                                    |
|      | `-XX:+UseCMSCompactAtFullCollection` | 使用 CMS 时，进行完 Full GC 后进行内存碎片整理               |
|      | `-XX:CMSFullGCsBeforeCompaction`     | 使用 CMS 时，设置在多少次 Full GC 后进行内存碎片的整理       |
|      | `-XX:CMSInitiatingOccupanyFraction`  | 设置堆内存使用率的阈值，超过就进行 CMS GC 的垃圾收集，JDK 6 之后默认为 92% |
|      | `-XX:+UseG1GC`                       | 使用 G1 垃圾回收器                                           |
|      | `-XX:G1HeapRegionSize`               | 使用 G1 GC 时设置 Region 大小，每个 Region 范围为 1MB ~ 32MB（ 2 的幂），分为 2048 个 Region，对应的堆内存为 2GB ~ 64 GB，Region 的大小默认为堆内存的 1/2000 |
|      | `-XX:ConcGCThreads`                  | 设置并发标记的线程数，一般为 `ParallelGCThreads` 的 1/4      |
|      | `-XX:InitiatingHeapOccupancyPercent` | 设置并发线程 GC 发生时堆内存的阈值，即超过该阈值就进行 GC    |





## 其他

| 序号 | 参数                         | 说明                                                      |
| ---- | ---------------------------- | --------------------------------------------------------- |
|      | `-XX:+PrintFlagsInitial`     | 查看所有 JVM 启动参数的初始值                             |
|      | `-XX:+PrintFlagsFinal`       | 查看所有 JVM 参数的最终值                                 |
|      | `-XX:+PrintCommandLineFlags` | 查看已经被 JVM 或者用户设置过的详细的带有 `XX` 的参数和值 |

