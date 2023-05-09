---
title: "JVM 参数调优"
shortTitle: "Y-JVM 参数调优"
description: "JVM 参数调优"
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
  text: "JVM 参数调优"
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
  title: "JVM 参数调优"
  description: "JVM 参数调优"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# JVM 参数调优



## 参数

### 内存设置

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



### 错误处理

OOM：

1. java.lang.OutOfMemoryError: Metaspace
2. OutOfMemoryError: GC overhead limit exceeded
3. OutOfMemoryError: Java heap space

|      | 参数                                 | 说明                                                         |
| ---- | ------------------------------------ | ------------------------------------------------------------ |
|      | `-XX:+HeapDumpOutofMemoryErorr`      | 当发生 OOM 时会自动 dump 堆栈到文件中                        |
|      | `-XX:-UseGCOverheadLimit`            | 会将 OutOfMemoryError: GC overhead limit exceeded 延迟到 OutOfMemoryError: Java heap space |
|      | `-XX:+HeapDumpOnOutOfMemoryError`    | 在 OutOfMemoryError 后获取一份 HPROF 二进制 Heap Dump 文件   |
|      | `-XX:+HeapDumpOnCtrlBreak`           | Ctrl + Break 组合键即可获取一份 Heap Dump                    |
|      | `-agentlib:hprof=heap=dump,format=b` | 在程序执行结束时或受到 SIGOUT 信号时生成 Dump 文件           |





## 工具

基础工具：

1. jmap：`jmap -dump:format=b file=<filename.hprof> <pid>` 直接在控制台打印出信息。jmap是一个多功能的命令。它可以生成 java 程序的 dump 文件， 也可以查看堆内对象示例的统计信息、查看 ClassLoader 的信息以及 finalizer 队列
2. jconsole：JDK 自带的监控工具
3. jstack：线程堆栈分析工具（https://juejin.cn/post/6844904152850497543）
4. jps：查看进程
5. jinfo：用来查看正在运行的 java 应用程序的扩展参数
6. jstat：查看 JVM 内存状态
7. CHLSDB
8. jdb

进阶工具：

1. jprofile
2. btrace
3. Greys
4. Arthas
5. javOSize
6. dmesg