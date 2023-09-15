---
title: "Java 基础常见问题"
shortTitle: "Z-Java 基础常见问题"
description: "Java 基础常见问题"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-01-11
category: 
- "java"
- "注解与反射"
tag:
- "java"
- "注解与反射"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Java 基础常见问题"
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
  title: "Java 基础常见问题"
  description: "Java 基础常见问题"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 基础常见问题

[[toc]]

## JDK、JRE、JVM 的区别
1. JDK：Java Develpment Kit java 开发工具
2. JRE：Java Runtime Environment java运行时环境
3. JVM：java Virtual Machine java 虚拟机




## hashcode 与 equals 的关系
举例说明：  

- 对象加入 HashSet 时，HashSet 会先计算对象的 hashcode 值来判断对象加入的位置，看该位置是否有值，如果没有、HashSet 会假设对象没有重复出现。

- 但是如果发现有值，这时会调用 `equals()` 方法来检查两个对象是否真的相同。如果两者相同，HashSet 就不会让其加入操作成功。如果不同的话，就会重新散列到其他位置。这样就大大减少了 equals 的次数，相应就大大提高了执行速度。

- 如果两个对象相等，则hashcode一定也是相同的两个对象相等,对两个对象分别调用equals方法都返回 true

- 两个对象有相同的hashcode值，它们也不一定是相等的，因此，equals方法被覆盖过，则hashCode方法也必须被覆盖

- `hashCode()` 的默认行为是对堆上的对象产生独特值。如果没有重写 hashCode()，则该 class 的两个对象无论如何都不会相等（即使这两个对象指向相同的数据）





## String、StringBuilder、StringBuffer 的区别
- String是final修饰的，不可变，每次操作都会产生新的String对象
- StringBuffer和StringBuilder都是在原对象上操作
- StringBuffer是线程安全的，StringBuilder线程不安全的
- StringBuffer方法都是synchronized修饰的
性能：StringBuilder > StringBuffer > String
场景：经常需要改变字符串内容时使用后面两个：优先使用StringBuilder，多线程使用共享变量时使用StringBuffer





## equals 与 == 的区别

1. `==`：对于普通类型，比较的是值；对应引用类型来说，比较的是引用地址
2. `equals`：主要看对象重写了 equals 和 hashcode 后的具体操作，首先还是先使用 == 比较，如果相等那么对象一定相等；如果不相等就看 equals 实现的比较方法





## 重载和重写的区别

1. 重载：发生在同一个类中，方法名相同时，参数类型、个数、顺序不同就发生重载，**但是注意**，单单是返回值和访问修饰符不同不算是重载。重载发生在 ==编译期==
2. 重写：发生在父子类中，方法名、参数列表必须相同，返回值范围小于等于父类，抛出的异常范围小于父类，访问修饰符范围大于等于父类，**但是注意**，如果父类方法访问修饰符是 `private` 则子类不能重写该方法





## List 和 Set 的区别

1. List 是有序的，按照元素进入的顺序存储，允许存储多个 null 值。可以使用 `Iterator` 取出所有元素逐一遍历，还可以使用 `get(int index)` 获取指定下标的元素，比较适合随机访问
2. Set：是无序的，只能存储一个 null 值，只能使用 `Iterator` 取出所有对象逐一遍历





## ArrayList 和 LinkedList 的区别

1. 底层结构不同：ArrayList 底层使用数组实现；LinkedList 底层使用链表实现
2. ArrayList 比较适合 **随机查找**；LinkedList 更适合 **查询** 和 **删除**，CRUD 的时间复杂度各不相同
3. 二者都是实现了 `List` 接口，但是 LinkedList 还而外实现了 `Deque` 接口，所以 LinkedList 还可以当作队列来使用





## ConcurrentHashMap 的扩容机制

:::info 相关文章

[ConcurrentHashMap 1.7和1.8区别](https://blog.csdn.net/xingxiupaioxue/article/details/88062163)

:::

:::tabs#fruit

@tab JDK7

1. 数据结构：ReentrantLock+Segment+HashEntry，一个Segment中包含一个HashEntry数组，每个HashEntry又是一个链表结构

2. 元素查询：二次hash，第一次Hash定位到Segment，第二次Hash定位到元素所在的链表的头部

3. 锁：Segment分段锁 Segment继承了ReentrantLock，锁定操作的Segment，其他的Segment不受影响，并发度为segment个数，可以通过构造函数指定，数组扩容不会影响其他的segment
4. get方法无需加锁，volatile保证

@tab JDK8

1. 数据结构：synchronized+CAS+Node+红黑树，Node的val和next都用volatile修饰，保证可见性
2. 查找，替换，赋值操作都使用CAS
3. 锁：锁链表的head节点，不影响其他元素的读写，锁粒度更细，效率更高，扩容时，阻塞所有的读写
4. 操作、并发扩容
5. 读操作无锁：Node的val和next使用volatile修饰，读写线程对该变量互相可见
6. 数组用volatile修饰，保证扩容时被读线程感知

:::





## HashMap 的 put 方法流程是怎么样的？

根据Ky通过哈希算法与与运算得出数组下标，然后判断数组下标位置是否为空：

:::tabs#fruit

 @tab 下标为空

如果数组下标位置元素为空，则将key和value封装为Enty对象(UDK1.7中是Entry对象，JDK1.8中是Node对象)并放入该位置

 @tab 下标不为空

如果数组下标位置元素不为空，则要分情况讨论：

1. 如果是 JDK1.7，则先判断是否需要扩容，如果要扩容就进行扩容，如果不用扩容就生成Etny对象，并使用头插法添加到当前位置的链表中
2. 如果是 JDK1.8，则会先判断当前位置上的Node的类型，看是红黑树Node，还是链表Node：
   1. 如果是红黑树Node，则将key和value封装为一个红黑树节点并添加到红黑树中去，在这个过程中会判断红黑树中是否存在当前key，如果存在则更新value
   2. 如果此位置上的Node对象是链表节点，则将key和vlue封装为一个链表Node并通过尾插法插入到链表的最后位置去，因为是尾插法，所以需要遍历链表，在遍历链表的过程中会判断是否存在当前key,如果存在则更新 value，当遍历完链表后，将新链表Node插入到链表中，插入到链表后，会看当前链表的节点个数，如果大于等于8，那么则会将该链表转成红黑树
   3. 将key和vlue封装为Node插入到链表或红黑树中后，再判断是否需要进行扩容，如果需要就扩容，如果不需要就结束 put 方法

:::

 



## 深拷贝和浅拷贝

都指对象的拷贝，而一个对象中可能存在两种类型的属性：基本数据类型或者示例对象的引用

1. 浅拷贝指：智慧拷贝基本数据类型的值，以及示例对象的引用地址，并不会复制一份新的引用地址指向对象，也就是说浅拷贝的对象内部的类属性都是指向同一个对象
2. 深拷贝指：既拷贝基本数据类型的值，也会对示例对象的引用地址指向的对象进行复制，深拷贝的对象内部属性指向的不是同一个对象

 



## HashMap 的扩容原理

:::tabs#fruit

 @tab JDK7

1. 先生成新数组
2. 遍历老数组中的每个位置上的链表的每个元素
3. 取出每个元素的 key，基于新数组的长度重新计算每个元素在新数组中的下标
4. 将元素添加到新数组中
5. 所有元素处理完成后，将新数组赋值给 HashMap 对象的 table 属性

 @tab JDK8

1. 先生成新数组
2. 遍历老数组中的每一个元素上的 **链表** 或者 **红黑树**
3. 如果是链表，那么就遍历链表中的所有元素，并重新计算每个元素的新下标，然后添加到数组中
4. 如果是红黑树，那么就先遍历红黑树，先计算出红黑树每个节点在新数组中对应的下标：
   1. 统计每个下标位置的元素个数
   2. 如果该位置下的元素个数超过了 8 个，则生成一个新的红黑树，并将节点添加到新数组的位置
   3. 如果该位置下的元素没有超过 8，那么生成一个链表，并将链表的头节点添加到数组的对应位置
5. 所有元素处理完成后，将新数组赋值给 HashMap 对象的 table 属性

:::





## CopyOnWriteArrayList 的底层原理是怎么样的？

1. 首先 `CopyOnWriteArrayList ` 内部也是通过数组来实现的，向其中添加元素时，会复制一个新的数组，**写操作** 在新数组上进行，**读操作** 在原数组上进行
2. 写操作时会加锁，防止出现并发写入丢失数据的问题
3. 写操作结束之后会把原数组指向新数组
4. `CopyOnWriteArrayList `  允许在写操作时读取数据，大大提高了读数据的性能，适合 **读多写少** 的应用场景，但是 `CopyOnWriteArrayList `  本身比较占用内存，而且可能读取到的数据不是最新的数据，所以不适合实时性要求很高的场景





## 什么是字节码？采用字节码的好处是什么？

1. Java语言通过字节码的方式，在一定程度上解决了传统解释型语言执行效率低的问题，同时又保留了解

2. 释型语言可移植的特点。所以Java程序运行时比较高效，而且，由于字节码并不专对一种特定的机器，因此，Java程序无须重新编译便可在多种不同的计算机上运行。





## Java 中的异常体系

Java中的所有异常都来自顶级父类Throwable，Throwable下有两个子类Exception和Error

1. Error是程序无法处理的错误，一旦出现这个错误，则程序将被迫停止运行
2. Exception不会导致程序停止，又分为两个部分RunTimeException运行时异常和CheckedException检查异常
3. RunTimeException常常发生在程序运行过程中，会导致程序当前线程执行失败。CheckedException常常发生在程序编译过程中，会导致程序编译不通过。





## Java 有几种类加载器？

三种类加载器，JDK自带有三个类加载器：bootstrap ClassLoader、ExtClassLoader、AppClassLoader：

1. BootStrapClassLoader是ExtClassLoader的父类加载器，默认负责加载%JAVA_HOME%lib下的jar包和class文件

2. ExtClassLoader是AppClassLoader的父类加载器，负责加载%JAVA_HOME%/lib/ext文件夹下的jar包和class类
3. AppClassLoader是自定义类加载器的父类，负责加载classpath下的类文件。系统类加载器，线程上下文加载器，继承ClassLoader实现自定义类加载器





## 类加载器的双亲委派机制

JVM 在加载一个类时，会先从 AppClassLoader -> ExtClassLoader -> bootstrap ClassLoader 的顺序一直找到最上层，如果到了 bootstrap ClassLoader 无法加载，就交给 ExtClassLoader，还处理不了就交给 AppClassLoader

所以双亲委派是指，在加载类时，先委派给 Ext 和 Bootstrap 进行加载，加载不了再自己加载





## 枚举类

:::info 相关文章

[枚举的底层原理是什么？](https://developer.aliyun.com/article/782278)

:::



## 集合框架

:::info 相关文章

[吃透Java集合框架！](https://zhuanlan.zhihu.com/p/143700575)

:::







## 对象锁和类锁的区别

https://blog.csdn.net/qq_45036591/article/details/105461253









## HashMap put get 过程

在Java中，`HashMap`是一种常用的哈希表实现，用于存储键值对。当你使用`put()`方法向`HashMap`中添加元素，以及使用`get()`方法获取元素时，会涉及以下过程：

**1. `put()`方法过程：**

当你调用`put(key, value)`方法将键值对添加到`HashMap`时，以下步骤会发生：

1. 计算键的哈希值：`HashMap`会调用键的`hashCode()`方法来计算哈希值，以确定键值对应的存储位置。
2. 根据哈希值找到存储位置：计算出的哈希值将被用来决定键值对应的桶（bucket）或索引位置。
3. 处理哈希冲突：由于不同键的哈希值可能相同，这就是哈希冲突。`HashMap`使用链表或红黑树来存储同一桶中的多个键值对。如果当前桶中已经有元素，`HashMap`会遍历链表或红黑树来检查是否已经存在相同的键，如果存在则更新值，如果不存在则在链表或树中添加新节点。
4. 如果链表变得太长：当链表的长度达到一定阈值（默认为8），`HashMap`会将链表转化为红黑树，以提高查找效率。

**2. `get()`方法过程：**

当你调用`get(key)`方法来获取值时，以下步骤会发生：

1. 计算键的哈希值：与`put()`方法相同，先计算键的哈希值。
2. 根据哈希值找到存储位置：根据哈希值找到对应的桶或索引位置。
3. 遍历链表或树：如果该桶中存在多个键值对，`HashMap`会遍历链表或红黑树来查找具有相同键的节点，然后返回相应的值。

总的来说，`HashMap`通过哈希值计算和桶的索引来实现快速的键值对查找。然而，当哈希冲突发生时，链表或红黑树的遍历会导致性能下降，因此，一个好的哈希函数和适当的装载因子（load factor）对于`HashMap`的性能非常重要。在实际应用中，你可以使用默认的哈希函数，也可以根据业务需求自定义哈希函数。



## 为什么HashMap要用红黑树，为什么不用二叉平衡树

1. **性能平衡：** 红黑树和AVL树都是自平衡的二叉搜索树，但是红黑树相对于AVL树来说，在插入和删除操作时对树的旋转操作较少，因此性能上更加平衡。AVL树的平衡要求更严格，可能会导致更频繁的旋转操作，影响性能。
2. **实现复杂性：** 红黑树相对于AVL树来说，实现起来相对简单。红黑树的平衡性要求比AVL树稍微宽松，这使得红黑树在实现时更加容易，也更适合应用于高频的插入和删除操作，如`HashMap`中的情况。
3. **内存占用：** 红黑树相对于AVL树来说，在保持相对平衡的前提下，高度可能会稍微更高一些，但这可能会带来更少的旋转操作，从而降低了内存占用和维护的成本。

总的来说，红黑树在实际应用中更适合作为一种自平衡的二叉搜索树结构。它在插入和删除操作时能够保持较好的性能，并且相对简单的实现使得它成为`HashMap`中处理哈希冲突的良好选择。





## 如果一个ConcurrentHashMap在被多个线程操作，在进行扩容操作时会有几个线程在处理

在Java的`ConcurrentHashMap`中，扩容操作不会阻塞所有线程。`ConcurrentHashMap`使用一种分段锁（Segment-Level Concurrency）的策略来实现高度的并发性，每个分段都维护自己的哈希表，当需要扩容时，只会对其中的一个分段进行扩容，而不是锁住整个哈希表。这使得多个线程可以同时在不同的分段上执行操作，从而减少了扩容时的竞争。

在进行扩容操作时，通常只有一个线程会负责对一个分段进行扩容，其他线程可以继续操作其他分段。因此，扩容操作通常不会对整个`ConcurrentHashMap`的性能产生严重影响。

需要注意的是，虽然`ConcurrentHashMap`的设计使得它能够在高度并发的情况下提供较好的性能，但具体的表现还是受到各种因素的影响，包括分段数、并发访问模式、哈希冲突等。在某些情况下，扩容操作可能会引起一些额外的开销，所以在使用`ConcurrentHashMap`时，需要根据实际情况进行性能测试和调优。