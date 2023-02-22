---
title: "Java 锁"
shortTitle: "C-Java 锁"
description: "Java 锁"
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
timeline: true,
dir:
  text: "Java 锁"
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
  title: "Java 锁"
  description: "Java 锁"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 锁

## 1.线程的活跃性

### 1.1 死锁

- 当一个线程需要同时获取多把锁时就容易出现死锁，如：
  - 线程 t1 需要获得对象 A 的锁，接下来想获得对象 B 的锁
  - 线程 t2 需要获得对象 B 的锁，接下来想获得对象 A 的锁

- 顺序加锁可以解决死锁，但是容易导致饥饿现象；可以使用 ReentrantLock 解决死锁问题



### 1.2 活锁（待补充）

- 出现在两个线程互相改变对方的结束条件，导致最后谁也无法结束



### 1.3 饥饿（待补充）

- 一个线程由于优先级太低，导致始终得不到 CPU 调度执行，不能够结束



## 2.ReentrantLock

**相较于 synchronized 它具备以下特点：**

- 可中断
- 可以设置超时时间
- 可以设置公平锁（先进先出）
- 支持多个条件变量（如 WaitSet 就是一个条件变量，多个意味着细分了）

**但与 synchronized 一样，都支持可重入：**

- 可重入是指同一个线程如果首次获得了这把锁，那么因为它是这把锁的拥有者，因此有权利再次获得这把锁
- 如果是不可重入锁，那么第二次获得锁时，自己也会被锁挡住



### 2.1 可重入

**可重入特性示例如下：**

```java
public class ReentrantLockTest1 {
    private static final Logger logger = LoggerFactory.getLogger(ReentrantLock.class);

    private static ReentrantLock lock = new ReentrantLock();

    public static void main(String[] args) {
        // 锁对象
        lock.lock();
        try {
            logger.debug("进入 main 方法...");
            m1();
        } finally {
            lock.unlock();
        }
    }

    public static void m1() {
        // 此次加锁要是成功则成为可重入
        lock.lock();
        try {
            logger.debug("进入 m1 方法...");
            m2();
        } finally {
            lock.unlock();
        }
    }

    public static void m2() {
        lock.lock();
        try {
            logger.debug("进入 m2 方法...");
        } finally {
            lock.unlock();
        }
    }
}
```





### 2.2 可打断

**可打断特性示例如下：**

```java
public class ReentrantLockTest1 {
    private static final Logger logger = LoggerFactory.getLogger(ReentrantLock.class);

    private static ReentrantLock lock = new ReentrantLock();

    public static void main(String[] args) {
        // 锁对象
        lock.lock();
        try {
            logger.debug("进入 main 方法...");
            m1();
        } finally {
            lock.unlock();
        }
    }

    public static void m1() {
        // 此次加锁要是成功则成为可重入
        lock.lock();
        try {
            logger.debug("进入 m1 方法...");
            m2();
        } finally {
            lock.unlock();
        }
    }

    public static void m2() {
        lock.lock();
        try {
            logger.debug("进入 m2 方法...");
        } finally {
            lock.unlock();
        }
    }
}
```





### 2.3 锁超时

**锁超时特性示例如下：**

```java
public class ReentrantLockTest3 {
    private static final Logger logger = LoggerFactory.getLogger(ReentrantLock.class);

    private static ReentrantLock lock = new ReentrantLock();

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(() -> {
            logger.debug("尝试获得锁...");
            try {
                if (!lock.tryLock(1, TimeUnit.SECONDS)) {
                    logger.debug("获取不到锁...");
                    return;
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
                logger.debug("获取不到锁...");
                // 被打断则直接返回
                return;
            }
            try {
                logger.debug("获得到锁...");
            } finally {
                lock.unlock();
            }
        }, "t1");

        lock.lock();
        logger.debug("获得到锁...");
        t1.start();
        Thread.sleep(800);
        lock.unlock();
    }
}
```





### 2.4 公平锁

- ReentrantLock 默认是不公平的，可以通过构造方法设置为公平锁
- 一般没有必要使用公平锁，这会降低并发度





### 2.5 条件变量

- synchronized 中也有条件变量，如 WaitSet，相当于休息室，当条件不满足时就进入休息室等待；而 ReentrantLock 支持多个条件变量，即支持多间休息室，这意味着更加细分
- 使用流程：
  - await 前需要获取锁
  - await 执行后会释放锁，进入 conditionObject 等待
  - await 的线程被唤醒（打断或超时）会重新竞争 lock 锁
  - 竞争 lock 锁成功后，从 await 后继续执行

