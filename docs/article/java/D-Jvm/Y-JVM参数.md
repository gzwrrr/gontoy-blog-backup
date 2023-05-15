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

## 概述

JVM 参数选项类型：

1. `-` 标准参数选项：稳定的参数，后续版本基本不会变化，但是使用的较少
2. `-X` 参数选项：非标准参数，较为稳定，但是后续可能小概率变更，使用 `java -X` 可以查看该类型的所有参数选项，使用的也比较少
3. `-XX` 参数选项：非标准化参数，实验性参数不稳定，变动比较大，但是使用的最多；分为布尔型格式和非布尔型格式，前者表示开启与否，后者需要指定具体的值

补充：

1. Hotspot JVM 有两种模式：server 和 client，前者对服务器配置要求比较高，后者较低，通过标准参数选项 `-server` 和 `-client` 开启
2. 参数有三种设置方式：
   1. `-<type>:+<option>`
   2. `-<type>:<option><size>`
   3. `-<type>:<option>=<size>`



## 按类型分类

### 标准参数

> 命令行中输入：`java -help` 查看

| 序号 | 参数                                                         | 说明                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1    | `-d32`                                                       | 使用 32 位数据模型 (如果可用)                                |
| 2    | `-d64`                                                       | 使用 64 位数据模型 (如果可用)                                |
| 3    | `-server`                                                    | 选择 server 模式（默认）                                     |
| 4    | `-client`                                                    | 选择 client 模式                                             |
| 5    | `-cp <目录和 zip/jar 文件的类搜索路径>`<br/>`-classpath <目录和 zip/jar 文件的类搜索路径>` | 用 `;` 分隔目录，设置 JAR 档案 和 ZIP 档案列表, 用于搜索类文件 |
| 6    | `-D<名称>=<值>`                                              | 设置系统属性                                                 |
| 7    | `-verbose:[class/gc/jni]`                                    | 启用详细输出                                                 |
| 8    | `-version`                                                   | 输出产品版本并退出                                           |
| 9    | `-version:<值>`                                              | 警告: 此功能已过时，将在未来发行版中删除，需要指定的版本才能运行 |
| 10   | `-showversion`                                               | 输出产品版本并继续                                           |
| 11   | `-jre-restrict-search / -no-jre-restrict-search`             | 警告: 此功能已过时，将在未来发行版中删除，在版本搜索中包括/排除用户专用 JRE |
| 12   | `-? -help`                                                   | 输出此帮助消息                                               |
| 13   | `-X`                                                         | 输出非标准选项的帮助                                         |
| 14   | `-ea[:<packagename>.../:<classname>]`<br/>`-enableassertions[:<packagename>.../:<classname>]` | 按指定的粒度启用断言                                         |
| 15   | `-da[:<packagename>.../:<classname>]`<br/>`-disableassertions[:<packagename>.../:<classname>]` | 禁用具有指定粒度的断言                                       |
| 16   | `-esa / -enablesystemassertions`                             | 启用系统断言                                                 |
| 17   | `-dsa / -disablesystemassertions`                            | 禁用系统断言                                                 |
| 18   | `-agentlib:<libname>[=<选项>]`                               | 加载本机代理库 `<libname>`，例如 `-agentlib:hprof`，另请参阅 `-agentlib:jdwp=help` 和 `-agentlib:hprof=help` |
| 19   | `-agentpath:<pathname>[=<选项>]`                             | 按完整路径名加载本机代理库                                   |
| 20   | `-javaagent:<jarpath>[=<选项>]`                              | 加载 Java 编程语言代理，请参阅 `java.lang.instrument`        |
| 21   | `-splash:<imagepath>`                                        | 使用指定的图像显示启动屏幕                                   |





### 非标准 -X 参数

> 命令行中输入：`java -X` 查看

| 序号 | 参数                                                 | 说明                                                         |
| ---- | ---------------------------------------------------- | ------------------------------------------------------------ |
| 1    | `-Xint`                                              | 禁用 JIT，所有字节码都被解释执行，该模式速度最慢             |
| 2    | `-Xcomp`                                             | 所有字节码第一次使用就被编译成本地代码，然后再执行           |
| 3    | `-Xmixed`                                            | 混合模式，也是默认模式，让 JIT 根据程序运行情况具体选择      |
| 4    | `-Xms`                                               | 堆最小值                                                     |
| 5    | `-Xmx`                                               | 堆最大值，通常 `-Xms` 和 `-Xmx`大小相同，这样就不会动态扩容  |
| 6    | `-Xmn`                                               | 新生代大小                                                   |
| 7    | `-Xss`                                               | 每个线程池的堆栈大小。在jdk5以上的版本，每个线程堆栈大小为1m，jdk5以前的版本是每个线程池大小为256k。一般在相同物理内存下，如果减少－xss值会产生更大的线程数，但不同的操作系统对进程内线程数是有限制的，是不能无限生成 |
| 8    | `-Xbootclasspath:<用; 分隔的目录和 zip/jar 文件>`    | 设置搜索路径以引导类和资源                                   |
| 9    | `-Xbootclasspath/a:<用 ;分隔的目录和 zip/jar 文件>`  | 附加在引导类路径末尾                                         |
| 10   | `-Xbootclasspath/p:<用 ; 分隔的目录和 zip/jar 文件>` | 置于引导类路径之前                                           |
| 11   | `-Xdiag`                                             | 显示附加诊断消息                                             |
| 12   | `-Xnoclassgc`                                        | 禁用类垃圾收集                                               |
| 13   | `-Xincgc`                                            | 启用增量垃圾收集                                             |
| 14   | `-Xloggc:<file>`                                     | 将 GC 状态记录在文件中 (带时间戳)                            |
| 15   | `-Xbatch`                                            | 禁用后台编译                                                 |
| 16   | `-Xms<size>`                                         | 设置初始 Java 堆大小                                         |
| 17   | `-Xmx<size>`                                         | 设置最大 Java 堆大小                                         |
| 18   | `-Xss<size>`                                         | 设置 Java 线程堆栈大小                                       |
| 19   | `-Xprof`                                             | 输出 cpu 配置文件数据                                        |
| 20   | `-Xfuture`                                           | 启用最严格的检查, 预期将来的默认值                           |
| 21   | `-Xrs`                                               | 减少 Java/VM 对操作系统信号的使用                            |
| 22   | `-Xcheck:jni`                                        | 对 JNI 函数执行其他检查                                      |
| 23   | `-Xshare:off`                                        | 不尝试使用共享类数据                                         |
| 24   | `-Xshare:auto`                                       | 在可能的情况下使用共享类数据 (默认)                          |
| 25   | `-Xshare:on`                                         | 要求使用共享类数据, 否则将失败                               |
| 26   | `-XshowSettings`                                     | 显示所有设置并继续                                           |
| 27   | `-XshowSettings:all`                                 | 显示所有设置并继续                                           |
| 28   | `-XshowSettings:vm`                                  | 显示所有与 vm 相关的设置并继续                               |
| 29   | `-XshowSettings:properties`                          | 显示所有属性设置并继续                                       |
| 30   | `-XshowSettings:locale`                              | 显示所有与区域设置相关的设置并继续                           |





### 非标准 -XX 参数

```shell
# 打印参数
-XX:+PrintCommandLineFlags 程序运行时JVM默认设置或用户手动设置的XX选项
-XX:+PrintFlagsInitial 打印所有XX选项的默认值
-XX:+PrintFlagsFinal 打印所有XX选项的实际值
-XX:+PrintVMOptions 打印JVM的参数

# 栈
-Xss128k <==> -XX:ThreadStackSize=128k 设置线程栈的大小为128K

# 堆
-Xms2048m <==> -XX:InitialHeapSize=2048m 设置JVM初始堆内存为2048M
-Xmx2048m <==> -XX:MaxHeapSize=2048m 设置JVM最大堆内存为2048M
-Xmn2g <==> -XX:NewSize=2g -XX:MaxNewSize=2g 设置年轻代大小为2G
-XX:SurvivorRatio=8 设置Eden区与Survivor区的比值，默认为8
-XX:NewRatio=2 设置老年代与年轻代的比例，默认为2
-XX:+UseAdaptiveSizePolicy 设置大小比例自适应，默认开启
-XX:PretenureSizeThreadshold=1024 设置让大于此阈值的对象直接分配在老年代，只对Serial、ParNew收集器有效
-XX:MaxTenuringThreshold=15 设置新生代晋升老年代的年龄限制，默认为15
-XX:TargetSurvivorRatio 设置MinorGC结束后Survivor区占用空间的期望比例

# 方法区
-XX:MetaspaceSize / -XX:PermSize=256m 设置元空间/永久代初始值为256M
-XX:MaxMetaspaceSize / -XX:MaxPermSize=256m 设置元空间/永久代最大值为256M
-XX:+UseCompressedOops 使用压缩对象
-XX:+UseCompressedClassPointers 使用压缩类指针
-XX:CompressedClassSpaceSize 设置Klass Metaspace的大小，默认1G

# 直接内存
-XX:MaxDirectMemorySize 指定DirectMemory容量，默认等于Java堆最大值

# GC 信息
-XX:+HeapDumpOnOutMemoryError 内存出现OOM时生成Heap转储文件，两者互斥
-XX:+HeapDumpBeforeFullGC 出现FullGC时生成Heap转储文件，两者互斥
-XX:HeapDumpPath=<path> 指定heap转储文件的存储路径，默认当前目录
-XX:OnOutOfMemoryError=<path> 指定可行性程序或脚本的路径，当发生OOM时执行脚本

# Serial回收器
-XX:+UseSerialGC  年轻代使用Serial GC， 老年代使用Serial Old GC

# ParNew回收器
-XX:+UseParNewGC  年轻代使用ParNew GC
-XX:ParallelGCThreads  设置年轻代并行收集器的线程数。一般地，最好与CPU数量相等，以避免过多的线程数影响垃圾收集性能
	
# Parallel回收器
-XX:+UseParallelGC  年轻代使用 Parallel Scavenge GC，互相激活
-XX:+UseParallelOldGC  老年代使用 Parallel Old GC，互相激活
-XX:MaxGCPauseMillis  设置垃圾收集器最大停顿时间（即STW的时间），单位是毫秒。
	为了尽可能地把停顿时间控制在MaxGCPauseMills以内，收集器在工作时会调整Java堆大小或者其他一些参数
	对于用户来讲，停顿时间越短体验越好；但是服务器端注重高并发，整体的吞吐量
	所以服务器端适合Parallel，进行控制。该参数使用需谨慎。
-XX:GCTimeRatio  垃圾收集时间占总时间的比例（1 / (N＋1)），用于衡量吞吐量的大小
	取值范围（0,100），默认值99，也就是垃圾回收时间不超过1％。
	与前一个-XX：MaxGCPauseMillis参数有一定矛盾性。暂停时间越长，Radio参数就容易超过设定的比例。
-XX:+UseAdaptiveSizePolicy  设置Parallel Scavenge收集器具有自适应调节策略。
	在这种模式下，年轻代的大小、Eden和Survivor的比例、晋升老年代的对象年龄等参数会被自动调整，以达到在堆大小、吞吐量和停顿时间之间的平衡点。
	在手动调优比较困难的场合，可以直接使用这种自适应的方式，仅指定虚拟机的最大堆、目标的吞吐量（GCTimeRatio）和停顿时间（MaxGCPauseMills），让虚拟机自己完成调优工作。
		
# CMS回收器
-XX:+UseConcMarkSweepGC  年轻代使用CMS GC。
	开启该参数后会自动将-XX：＋UseParNewGC打开。即：ParNew（Young区）+ CMS（Old区）+ Serial Old的组合
-XX:CMSInitiatingOccupanyFraction  设置堆内存使用率的阈值，一旦达到该阈值，便开始进行回收。JDK5及以前版本的默认值为68，DK6及以上版本默认值为92％。
	如果内存增长缓慢，则可以设置一个稍大的值，大的阈值可以有效降低CMS的触发频率，减少老年代回收的次数可以较为明显地改善应用程序性能。
	反之，如果应用程序内存使用率增长很快，则应该降低这个阈值，以避免频繁触发老年代串行收集器。
	因此通过该选项便可以有效降低Fu1l GC的执行次数。
-XX:+UseCMSInitiatingOccupancyOnly  是否动态可调，使CMS一直按CMSInitiatingOccupancyFraction设定的值启动
-XX:+UseCMSCompactAtFullCollection  用于指定在执行完Full GC后对内存空间进行压缩整理
	以此避免内存碎片的产生。不过由于内存压缩整理过程无法并发执行，所带来的问题就是停顿时间变得更长了。
-XX:CMSFullGCsBeforeCompaction  设置在执行多少次Full GC后对内存空间进行压缩整理。
-XX:ParallelCMSThreads  设置CMS的线程数量。
	CMS 默认启动的线程数是(ParallelGCThreads＋3)/4，ParallelGCThreads 是年轻代并行收集器的线程数。
	当CPU 资源比较紧张时，受到CMS收集器线程的影响，应用程序的性能在垃圾回收阶段可能会非常糟糕。
-XX:ConcGCThreads  设置并发垃圾收集的线程数，默认该值是基于ParallelGCThreads计算出来的
-XX:+CMSScavengeBeforeRemark  强制hotspot在cms remark阶段之前做一次minor gc，用于提高remark阶段的速度
-XX:+CMSClassUnloadingEnable  如果有的话，启用回收Perm 区（JDK8之前）
-XX:+CMSParallelInitialEnabled  用于开启CMS initial-mark阶段采用多线程的方式进行标记
	用于提高标记速度，在Java8开始已经默认开启
-XX:+CMSParallelRemarkEnabled  用户开启CMS remark阶段采用多线程的方式进行重新标记，默认开启
-XX:+ExplicitGCInvokesConcurrent
-XX:+ExplicitGCInvokesConcurrentAndUnloadsClasses
	这两个参数用户指定hotspot虚拟在执行System.gc()时使用CMS周期
-XX:+CMSPrecleaningEnabled  指定CMS是否需要进行Pre cleaning阶段

# G1回收器
-XX:+UseG1GC 手动指定使用G1收集器执行内存回收任务。
-XX:G1HeapRegionSize 设置每个Region的大小。
	值是2的幂，范围是1MB到32MB之间，目标是根据最小的Java堆大小划分出约2048个区域。默认是堆内存的1/2000。
-XX:MaxGCPauseMillis  设置期望达到的最大GC停顿时间指标（JVM会尽力实现，但不保证达到）。默认值是200ms
-XX:ParallelGCThread  设置STW时GC线程数的值。最多设置为8
-XX:ConcGCThreads  设置并发标记的线程数。将n设置为并行垃圾回收线程数（ParallelGCThreads）的1/4左右。
-XX:InitiatingHeapOccupancyPercent 设置触发并发GC周期的Java堆占用率阈值。超过此值，就触发GC。默认值是45。
-XX:G1NewSizePercent  新生代占用整个堆内存的最小百分比（默认5％）
-XX:G1MaxNewSizePercent  新生代占用整个堆内存的最大百分比（默认60％）
-XX:G1ReservePercent=10  保留内存区域，防止 to space（Survivor中的to区）溢出

# 日志
-XX:+PrintGC <==> -verbose:gc  打印简要日志信息
-XX:+PrintGCDetails            打印详细日志信息
-XX:+PrintGCTimeStamps  打印程序启动到GC发生的时间，搭配-XX:+PrintGCDetails使用
-XX:+PrintGCDateStamps  打印GC发生时的时间戳，搭配-XX:+PrintGCDetails使用
-XX:+PrintHeapAtGC  打印GC前后的堆信息，如下图
-Xloggc:<file> 输出GC导指定路径下的文件中
-XX:+TraceClassLoading  监控类的加载
-XX:+PrintGCApplicationStoppedTime  打印GC时线程的停顿时间
-XX:+PrintGCApplicationConcurrentTime  打印垃圾收集之前应用未中断的执行时间
-XX:+PrintReferenceGC 打印回收了多少种不同引用类型的引用
-XX:+PrintTenuringDistribution  打印JVM在每次MinorGC后当前使用的Survivor中对象的年龄分布
-XX:+UseGCLogFileRotation 启用GC日志文件的自动转储
-XX:NumberOfGCLogFiles=1  设置GC日志文件的循环数目
-XX:GCLogFileSize=1M  设置GC日志文件的大小

# 其他
-XX:+DisableExplicitGC  禁用hotspot执行System.gc()，默认禁用
-XX:ReservedCodeCacheSize=<n>[g|m|k]、-XX:InitialCodeCacheSize=<n>[g|m|k]  指定代码缓存的大小
-XX:+UseCodeCacheFlushing  放弃一些被编译的代码，避免代码缓存被占满时JVM切换到interpreted-only的情况
-XX:+DoEscapeAnalysis  开启逃逸分析
-XX:+UseBiasedLocking  开启偏向锁
-XX:+UseLargePages  开启使用大页面
-XX:+PrintTLAB  打印TLAB的使用情况
-XX:TLABSize  设置TLAB大小
```





## 按功能分类

### 内存设置

| 序号 | 参数                       | 说明                                                         |
| ---- | -------------------------- | ------------------------------------------------------------ |
| 1    | `-Xms`                     | 堆最小值                                                     |
| 2    | `-Xmx`                     | 堆最大值，通常 `-Xms` 和 `-Xmx`大小相同，这样就不会动态扩容  |
| 3    | `-Xmn`                     | 新生代大小                                                   |
| 4    | `-Xss`                     | 每个线程池的堆栈大小。在jdk5以上的版本，每个线程堆栈大小为1m，jdk5以前的版本是每个线程池大小为256k。一般在相同物理内存下，如果减少－xss值会产生更大的线程数，但不同的操作系统对进程内线程数是有限制的，是不能无限生成 |
| 5    | `-XX:NewRatio`             | 设置新生代与老年代比值，-XX:NewRatio = 4 表示新生代与老年代所占比例为 1 : 4 ，新生代占比整个堆的五分之一。如果设置了 `-Xmn` 的情况下，该参数是不需要在设置的 |
| 6    | `-XX:MaxTenuringThreshold` | 新生代对象的存活次数，默认为 15                              |
| 7    | `-XX:SurvivorRatio`        | 存活区与伊甸园区的比例，默认为 2 : 8                         |
| 8    | `-XX:MaxMetaspaceSize`     | 元数据区大小。`PermSize` 和 `MaxPermSize` （永久代）已经不能使用了，在 JDK8 中配置这两个参数将会发出警告。 |

补充说明：

1. Xmn用于设置新生代的大小。过小会增加Minor GC频率，过大会减小老年代的大小。一般设为整个堆空间的1/4或1/3.
2. XX:SurvivorRatio用于设置新生代中survivor空间(from/to)和eden空间的大小比例； XX:TargetSurvivorRatio表示，当经历Minor GC后，survivor空间占有量(百分比)超过它的时候，就会压缩进入老年代(当然，如果survivor空间不够，则直接进入老年代)。默认值为50%。
3. 为了性能考虑，一开始尽量将新生代对象留在新生代，避免新生的大对象直接进入老年代。因为新生对象大部分都是短期的，这就造成了老年代的内存浪费，并且回收代价也高(Full GC发生在老年代和方法区Perm).
4. 当Xms=Xmx，可以使得堆相对稳定，避免不停震荡
5. 一般来说，MaxPermSize设为64MB可以满足绝大多数的应用了。若依然出现方法区溢出，则可以设为128MB。若128MB还不能满足需求，那么就应该考虑程序优化了，减少**动态类**的产生。





### 错误处理

| 序号 | 参数                                 | 说明                                                         |
| ---- | ------------------------------------ | ------------------------------------------------------------ |
| 1    | `-XX:+HeapDumpOutofMemoryErorr`      | 当发生 OOM 时会自动 dump 堆栈到文件中                        |
| 2    | `-XX:HeapDumpPath`                   | 指定 dump 文件的保存路径                                     |
| 3    | `-XX:-UseGCOverheadLimit`            | 会将 OutOfMemoryError: GC overhead limit exceeded 延迟到 OutOfMemoryError: Java heap space |
| 4    | `-XX:+HeapDumpOnOutOfMemoryError`    | 在 OutOfMemoryError 后获取一份 HPROF 二进制 Heap Dump 文件   |
| 5    | `-XX:+HeapDumpOnCtrlBreak`           | Ctrl + Break 组合键即可获取一份 Heap Dump                    |
| 6    | `-agentlib:hprof=heap=dump,format=b` | 在程序执行结束时或受到 SIGOUT 信号时生成 Dump 文件           |

OOM：

1. java.lang.OutOfMemoryError: Metaspace
2. OutOfMemoryError: GC overhead limit exceeded
3. OutOfMemoryError: Java heap space





### 垃圾收集

| 序号 | 参数                                 | 说明                                                         |
| ---- | ------------------------------------ | ------------------------------------------------------------ |
| 1    | `-XX:+PrintGC`                       | 输出 GC 日志                                                 |
| 2    | `-XX:+PrintGCDetails`                | 打印 GC 详细日志                                             |
| 3    | `-XX:+PrintGCTimeStamps`             | 输出 GC 的时间戳（以基准时间的形式）                         |
| 4    | `-XX:+PrintGCDateStamps`             | 输出 GC 的时间戳（以日期的形式）                             |
| 5    | `-XX:+PrintHeapAtGC`                 | 在进行 GC 的前后打印出堆的信息                               |
| 6    | `-Xloggc:../logs/gc.log`             | 日志文件的输出路径                                           |
| 7    | `-XX:+PrintCommandLineFlags`         | 查看垃圾回收器                                               |
| 8    | `-XX:+UseSerialGC`                   | 使用 Serial GC 和 Serial Old GC                              |
| 9    | `-XX:+UseParNewGC`                   | 使用 ParNew GC                                               |
| 10   | `-XX:+UseParallelGC`                 | 使用 Parallel GC 和 Parallel Old GC                          |
| 11   | `-XX:ParallelGCThreads`              | 使用多线程垃圾收集器时指定最大线程数，默认为 CPU 核数        |
| 12   | `-XX:MaxGCPauseMillis`               | 设置垃圾回收的暂停时间，该参数会影响吞吐量，要谨慎修改       |
| 13   | `-XX:GCTimeRatio`                    | 垃圾收集时间占总时间的比例，默认 99，表示垃圾收集时间不大于 1 %，计算为 1 / (1 + N)，此处 N = 99，得出 1 % |
| 14   | `-XX:+UseConcMarkSwapGC`             | 使用 CMS GC 和 ParNew GC，某些情况下 CMS GC 无法工作会使用 Serial Old GC |
| 15   | `-XX:ParallelCMSThreads`             | 使用 CMS 时的线程数量限制                                    |
| 16   | `-XX:+UseCMSCompactAtFullCollection` | 使用 CMS 时，进行完 Full GC 后进行内存碎片整理               |
| 17   | `-XX:CMSFullGCsBeforeCompaction`     | 使用 CMS 时，设置在多少次 Full GC 后进行内存碎片的整理       |
| 18   | `-XX:CMSInitiatingOccupanyFraction`  | 设置堆内存使用率的阈值，超过就进行 CMS GC 的垃圾收集，JDK 6 之后默认为 92% |
| 19   | `-XX:+UseG1GC`                       | 使用 G1 垃圾回收器                                           |
| 20   | `-XX:G1HeapRegionSize`               | 使用 G1 GC 时设置 Region 大小，每个 Region 范围为 1MB ~ 32MB（ 2 的幂），分为 2048 个 Region，对应的堆内存为 2GB ~ 64 GB，Region 的大小默认为堆内存的 1/2000 |
| 21   | `-XX:ConcGCThreads`                  | 设置并发标记的线程数，一般为 `ParallelGCThreads` 的 1/4      |
| 22   | `-XX:InitiatingHeapOccupancyPercent` | 设置并发线程 GC 发生时堆内存的阈值，即超过该阈值就进行 GC    |





### 其他

| 序号 | 参数                         | 说明                                                      |
| ---- | ---------------------------- | --------------------------------------------------------- |
| 1    | `-XX:+PrintFlagsInitial`     | 查看所有 JVM 启动参数的初始值                             |
| 2    | `-XX:+PrintFlagsFinal`       | 查看所有 JVM 参数的最终值                                 |
| 3    | `-XX:+PrintCommandLineFlags` | 查看已经被 JVM 或者用户设置过的详细的带有 `XX` 的参数和值 |
