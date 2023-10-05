---
title: "JVM 对象创建与直接内存"
shortTitle: "E-JVM 对象创建与直接内存"
description: "JVM 对象创建与直接内存"
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
  text: "JVM 对象创建与直接内存"
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
  title: "JVM 对象创建与直接内存"
  description: "JVM 对象创建与直接内存"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# JVM 对象创建与直接内存



[[toc]]





## 对象创建

![image-20230201143457614](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//JVM/20230201/%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA%E6%96%B9%E5%BC%8F%E4%B8%8E%E6%AD%A5%E9%AA%A4.png)



### 判断对象对应的类是否加载、链接、初始化

虚拟机遇到一条new指令，首先去检查这个指令的参数能否在Metaspace的常量池中定位到一个类的符号引用，并且检查这个符号引用代表的类是否已经被加载，解析和初始化（即判断类元信息是否存在）

如果没有，那么在双亲委派模式下，使用当前类加载器以ClassLoader + 包名 + 类名为key进行查找对应的 .class文件；

- 如果没有找到文件，则抛出ClassNotFoundException异常

- 如果找到，则进行类加载，并生成对应的Class对象



### 为对象分配内存

首先计算对象占用空间的大小，接着在堆中划分一块内存给新对象。如果实例成员变量是引用变量，仅分配引用变量空间即可，即4个字节大小

**如果内存规整**：虚拟机将采用的是指针碰撞法（Bump The Point）来为对象分配内存。

- 意思是所有用过的内存在一边，空闲的内存放另外一边，中间放着一个指针作为分界点的指示器，分配内存就仅仅是把指针指向空闲那边挪动一段与对象大小相等的距离罢了。如果垃圾收集器选择的是Serial ，ParNew这种基于压缩算法的，虚拟机采用这种分配方式。一般使用带Compact（整理）过程的收集器时，使用指针碰撞

**如果内存不规整**：虚拟机需要维护一个空闲列表（Free List）来为对象分配内存

- 已使用的内存和未使用的内存相互交错，那么虚拟机将采用的是空闲列表来为对象分配内存。意思是虚拟机维护了一个列表，记录上那些内存块是可用的，再分配的时候从列表中找到一块足够大的空间划分给对象实例，并更新列表上的内容

选择哪种分配方式由Java堆是否规整所决定，而Java堆是否规整又由所采用的垃圾收集器是否带有压缩整理功能决定



### 处理并发问题

- 采用CAS失败重试、区域加锁保证更新的原子性

- 每个线程预先分配一块TLAB：通过设置 `-XX:+UseTLAB`参数来设定



### 初始化分配到的内存

所有属性设置默认值，保证对象实例字段在不赋值时可以直接使用



### 设置对象的对象头

将对象的所属类（即类的元数据信息）、对象的HashCode和对象的GC信息、锁信息等数据存储在对象的对象头中。这个过程的具体设置方式取决于JVM实现。



### 执行init方法进行初始化

在Java程序的视角看来，初始化才正式开始。初始化成员变量，执行实例化代码块，调用类的构造方法，并把堆内对象的首地址赋值给引用变量。

因此一般来说（由字节码中跟随invokespecial指令所决定），new指令之后会接着就是执行方法，把对象按照程序员的意愿进行初始化，这样一个真正可用的对象才算完成创建出来。

**给对象属性赋值的操作**

- 属性的默认初始化

- 显式初始化

- 代码块中初始化

- 构造器中初始化



## 对象的内存布局

![image-20230201144300272](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//JVM/20230201/%E5%AF%B9%E8%B1%A1%E5%86%85%E5%AD%98%E5%B8%83%E5%B1%80.png)

### 对象头（Header）

对象头包含了两部分，分别是运行时元数据（Mark Word）和类型指针。如果是数组，还需要记录数组的长度

**运行时元数据**

- 哈希值（HashCode）

- GC分代年龄

- 锁状态标志

- 线程持有的锁

- 偏向线程ID

- 偏向时间戳

**类型指针**

指向类元数据InstanceKlass，确定该对象所属的类型。



### 实例数据（Instance Data）

它是对象真正存储的有效信息，包括程序代码中定义的各种类型的字段（包括从父类继承下来的和本身拥有的字段）

- 相同宽度的字段总是被分配在一起

- 父类中定义的变量会出现在子类之前

- 如果CompactFields参数为true（默认为true）：子类的窄变量可能插入到父类变量的空隙



### 对齐填充（Padding）

不是必须的，也没有特别的含义，仅仅起到占位符的作用





## 对象访问

一般有两种方式：

1. 句柄访问
2. 直接访问（Hotspot 采用的方式）

### 句柄访问

![image-20230201145812633](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//JVM/20230201/%E5%8F%A5%E6%9F%84%E8%AE%BF%E9%97%AE%E5%AF%B9%E8%B1%A1.png)

### 直接访问

![image-20230201145915472](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//JVM/20230201/%E7%9B%B4%E6%8E%A5%E8%AE%BF%E9%97%AE%E5%AF%B9%E8%B1%A1.png)





## 直接内存

不是虚拟机运行时数据区的一部分，也不是《Java虚拟机规范》中定义的内存区域。直接内存是在Java堆外的、直接向系统申请的内存区间。来源于NIO，通过存在堆中的DirectByteBuffer操作Native内存。通常，访问直接内存的速度会优于Java堆，即读写性能高

- 因此出于性能考虑，读写频繁的场合可能会考虑使用直接内存

- Java的NIO库允许Java程序使用直接内存，用于数据缓冲区

**非直接缓冲区：**

使用IO读写文件，需要与磁盘交互，需要由用户态切换到内核态。在内核态时，需要两份内存存储重复数据，效率低。

**直接缓冲区：**

使用NIO时，操作系统划出的直接缓存区可以被java代码直接访问，只有一份。NIO适合对大文件的读写操作

由于直接内存在Java堆外，因此它的大小不会直接受限于-Xmx指定的最大堆大小，但是系统内存是有限的，Java堆和直接内存的总和依然受限于操作系统能给出的最大内存。

- 分配回收成本较高

- 不受JVM内存回收管理

直接内存大小可以通过`MaxDirectMemorySize`设置。如果不指定，默认与堆的最大值-Xmx参数值一致



