---
title: "Java 并发（其他）"
shortTitle: "Y-Java 并发（其他）"
description: "Java 并发（其他）"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-07
category: 
- "java"
- "并发"
tag:
- "java"
- "并发"
sticky: 998
star: true
article: true
timeline: true
dir:
  text: "Java 并发（其他）"
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
  title: "Java 并发（其他）"
  description: "Java 并发（其他）"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 并发（其他）

[[toc]]

## 实现了 Condition 接口的类

Java中实现了`Condition`接口的类有：

| 类名                                                       | 描述                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| `AbstractQueuedSynchronizer.ConditionObject`               | `AbstractQueuedSynchronizer`中的内部类，用于支持`ReentrantLock`中的`Condition`对象 |
| `JUC$ConditionObject`                                      | `ConcurrentHashMap`中的内部类，用于支持`ConcurrentHashMap`的条件等待操作 |
| `LinkedBlockingQueue.Node`                                 | `LinkedBlockingQueue`中的内部类，用于支持`LinkedBlockingQueue`的条件等待操作 |
| `LinkedTransferQueue.Node`                                 | `LinkedTransferQueue`中的内部类，用于支持`LinkedTransferQueue`的条件等待操作 |
| `SynchronousQueue.WaitQueueNode`                           | `SynchronousQueue`中的内部类，用于支持`SynchronousQueue`的条件等待操作 |
| `AbstractQueuedLongSynchronizer.ConditionObject`           | `AbstractQueuedLongSynchronizer`中的内部类，用于支持`LongAdder`中的`Condition`对象 |
| `AbstractQueuedSynchronizer.ConditionObject.Node`          | `AbstractQueuedSynchronizer`中的内部类，用于支持`AbstractQueuedSynchronizer`中的条件等待操作 |
| `AbstractQueuedSynchronizer.ConditionObject.WaitQueueNode` | `AbstractQueuedSynchronizer`中的内部类，用于支持`AbstractQueuedSynchronizer`中的条件等待操作 |
| `CountDownLatch.Sync`                                      | `CountDownLatch`中的内部类，用于支持`CountDownLatch`的条件等待操作 |
| `FutureTask.Sync`                                          | `FutureTask`中的内部类，用于支持`FutureTask`的条件等待操作   |
| `ReentrantLock.ConditionObject`                            | `ReentrantLock`中的内部类，用于支持`ReentrantLock`的条件等待操作 |
| `Semaphore.Sync`                                           | `Semaphore`中的内部类，用于支持`Semaphore`的条件等待操作     |
| `ThreadPoolExecutor.Worker`                                | `ThreadPoolExecutor`中的内部类，用于支持`ThreadPoolExecutor`的条件等待操作 |





## CAS

CAS（Compare And Swap）是一种基于原子操作的并发编程技术，用于实现多线程之间的同步。在Java中，CAS是由sun.misc.Unsafe类提供支持的。CAS操作由三个操作数组成：内存位置V，旧的预期值A，要修改的新值B。CAS操作执行时，当且仅当内存位置V的值等于预期值A时，才会将内存位置V的值修改为新值B，否则不做任何操作。

Java中的Atomic类和AtomicInteger等原子类就是基于CAS操作实现的，提供了一组原子性的操作方法，这些方法保证了多线程对变量的读取和修改都是原子性的。

以下是Java中基于CAS操作的一个示例代码：

```java
javaCopy codeimport java.util.concurrent.atomic.AtomicInteger;

public class CASDemo {
    private static AtomicInteger count = new AtomicInteger(0);

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                int currentCount;
                int newCount;
                do {
                    currentCount = count.get();
                    newCount = currentCount + 1;
                } while (!count.compareAndSet(currentCount, newCount));
                System.out.println(Thread.currentThread().getName() + " count is " + newCount);
            }).start();
        }
    }
}
```

在这个示例中，使用了AtomicInteger类来保证count变量的原子性，使用了compareAndSet方法实现了基于CAS的自增操作。在多线程环境下，由于CAS操作是原子性的，因此不会出现数据冲突等问题，可以保证数据的正确性。



## AQS

> AQS 详解，直接上文章：https://blog.csdn.net/mulinsen77/article/details/84583716

CAS（Compare and Swap）是一种乐观锁实现的原子操作，用于实现多线程并发控制，保证线程安全。CAS 的核心思想是通过比较内存中的值与期望的值是否相同，如果相同则将新的值写入内存中，否则重新读取内存中的值并再次尝试写入。Java 中的 `Atomic` 类就是通过 CAS 实现的。

AQS（AbstractQueuedSynchronizer）是一个抽象类，是实现锁、同步器等并发控制类的基础，其核心思想是基于等待队列实现线程的阻塞与唤醒。AQS 提供了基于模板方法模式的编程接口，派生类只需要实现一些抽象方法就可以使用 AQS 提供的同步机制。Java 中的 `ReentrantLock`、`CountDownLatch` 等同步类就是基于 AQS 实现的。

AQS 的实现中使用 CAS 作为底层原子操作，通过 CAS 原子地修改内存中的状态来实现线程安全。因此可以说，CAS 是 AQS 实现同步的基础。





## ThreadLocal

在多线程并发的场景下，ThreadLocal 用于：

1. 传递数据：可以通过 ThreadLocal 在同一线程的不同组件之间传递公共变量
2. 线程隔离：每个线程的变量都是独立的，不会互相影响

```java
public class MyThreadLocal {
    public static void main(String[] args) {
        Demo2 demo = new Demo2();
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                demo.setContent(Thread.currentThread().getName() + "的数据");
                System.out.println("--------------------------");
                System.out.println(Thread.currentThread().getName() + " --------> " + demo.getContent());
            }, String.valueOf(i)).start();
        }
    }
}
class Demo1 {
    String content;
    public String getContent() {
          return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
}
class Demo2 {
    ThreadLocal<String> t = new ThreadLocal();
    public String getContent() {
        return t.get();
    }
    public void setContent(String content) {
        t.set(content);
    }
}
```







