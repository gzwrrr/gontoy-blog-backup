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

|     锁类型     | 特点                                                         |
| :------------: | :----------------------------------------------------------- |
|  synchronized  | 内置锁，只有一个条件队列，可以使用 wait() 和 notify()        |
| ReentrantLock  | 可重入锁，性能较 synchronized 更好，可以设置公平性，可中断、可限时等待 |
| ReadWriteLock  | 读写锁，可以实现读写分离，多个线程同时读取，只有写入时需要互斥 |
|  StampedLock   | 乐观读写锁，读锁不阻塞写锁，写锁独占                         |
|   Semaphore    | 信号量，可以用来限制同时访问某些资源的线程数                 |
| CountDownLatch | 倒计时计数器，一个或多个线程等待多个线程执行完毕后才继续执行 |
| CyclicBarrier  | 循环栅栏，多个线程互相等待到达某个屏障点，然后一起执行       |
|   Exchanger    | 线程间交换数据的工具类                                       |



## 自旋锁

自旋锁是一种基于忙等待的锁，当线程请求锁时，如果锁已被其他线程持有，请求线程将不断地循环等待，直到锁被释放。在自旋锁中，线程不会进入睡眠状态，因此响应速度更快，但同时也会占用CPU资源，因此自旋锁一般适用于锁保持时间短的情况。

自旋锁的实现方式一般是使用一个共享变量作为锁，请求线程会不断地在循环中尝试获取锁，直到成功为止。具体而言，自旋锁通常会使用CAS（Compare-and-Swap）操作来实现锁的获取和释放。

在Java中，自旋锁的实现方式主要有两种：基于synchronized关键字的自旋锁和基于java.util.concurrent.atomic包的自旋锁。基于synchronized关键字的自旋锁实现简单，但性能相对较低，适用于锁竞争不激烈的情况；而基于java.util.concurrent.atomic包的自旋锁则性能更高，适用于锁竞争激烈的情况。

总的来说，自旋锁是一种高效的锁实现方式，它可以避免线程进入睡眠状态，从而提高系统的响应速度。但同时也要注意自旋锁可能会占用大量的CPU资源，因此在使用自旋锁时需要根据具体的情况进行权衡和选择。



## 偏向锁

偏向锁是Java虚拟机为了提升线程竞争锁的效率而引入的一种锁优化技术。偏向锁默认是开启的，它的思想是如果一个线程获得了一个锁，那么在接下来的一段时间内，该线程再次请求该锁的概率很大。基于这个思想，虚拟机假设这种情况会发生，会在对象头中记录当前线程ID，如果之后该线程再次请求该锁，那么就不需要进行任何同步操作，从而提高了程序的运行效率。

偏向锁在对象创建时默认是未被偏向的，只有当对象被一个线程持有时，虚拟机才会将该锁转换为偏向锁，此时对象头中记录了持有锁的线程ID。如果其他线程尝试获取这个锁，会发现对象头中记录的线程ID是自己的，说明该锁被偏向了，那么就可以直接获取锁而不用像普通锁一样自旋等待。

但是如果其他线程尝试获取这个锁时，发现对象头中记录的线程ID不是自己的，说明锁被偏向的线程持有，这时候就需要撤销偏向锁，转换成普通锁，这个过程叫做锁撤销。

偏向锁在多线程并发访问下并不适用，因为每次判断锁的状态都需要读取对象头中的信息，增加了锁的访问成本，如果锁的竞争非常激烈，那么偏向锁的撤销和重偏向也会频繁发生，降低了程序的效率。所以在多线程并发访问的情况下，虚拟机会自动关闭偏向锁。



## 轻量级锁

轻量级锁（Lightweight Locking）是Java虚拟机为了减少传统的重量级锁（Synchronized）操作的性能消耗而引入的一种优化手段。在JDK6中引入了这个概念。

轻量级锁是基于CAS操作和自旋锁实现的。当线程获取锁时，JVM会先在当前线程的栈帧中创建一个锁记录（Lock Record），用于存储锁对象的Mark Word的拷贝，同时在锁对象的Mark Word中记录当前线程的ID。这个过程是通过CAS操作完成的。

在后续的执行过程中，如果线程需要再次获取同一个锁对象，JVM会通过比较当前线程ID和锁对象的Mark Word中记录的线程ID是否相同来判断当前线程是否已经获取了该锁。如果相同，说明线程已经获取了该锁，可以直接进入临界区。如果不同，说明该锁已经被其他线程占用，当前线程则通过自旋等待锁的释放。

相比于传统的重量级锁，轻量级锁的性能更好，因为它减少了线程进入内核态和用户态之间的切换。但是轻量级锁只对短时间的锁操作有效，当锁操作时间过长时，锁会升级为重量级锁。



## 重量级锁

重量级锁是一种同步机制，也称为互斥锁。在Java中，重量级锁是通过`synchronized`关键字实现的。当多个线程访问共享资源时，会有一个线程持有锁，而其他线程必须等待该线程释放锁之后才能继续执行。在实现中，重量级锁使用了操作系统提供的互斥量（mutex）实现，这种实现方式效率较低，因为需要不断地进行用户态和内核态之间的切换，而这种切换是非常耗时的。

重量级锁的优点是能够保证线程安全，缺点是效率较低，特别是在多线程并发访问共享资源时，容易出现线程饥饿、死锁等问题。

在JDK 1.6中，Java对`synchronized`进行了优化，引入了偏向锁和轻量级锁，从而提高了锁的效率。但是，当竞争激烈时，仍然会转为重量级锁来保证线程安全。











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

:::info 可重入的含义

可重入是指一个线程在持有锁的情况下，能够再次获得该锁而不会被阻塞。简单来说，就是锁可重入的意思

例如，一个线程在执行某个同步方法时，已经获取了该方法所在对象的锁，此时该线程如果再次执行该方法，不需要再次获取锁，因为该线程已经持有该锁，可以直接进入方法体

:::

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

ReentrantLock可打断的特性指的是在使用ReentrantLock加锁的时候，如果一个线程获取锁后，如果另一个线程请求锁并且在等待锁的过程中，如果中断了等待线程的等待状态，那么等待线程就会抛出InterruptedException异常并退出等待状态，而不是一直等待下去。

这个特性对于某些多线程场景是很有用的，比如等待超时、响应中断等。下面是一个简单的例子，演示了ReentrantLock可打断的特性：

```java
javaCopy codeimport java.util.concurrent.locks.ReentrantLock;

public class InterruptibleLockDemo {
    static ReentrantLock lock = new ReentrantLock();

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            try {
                lock.lockInterruptibly();
                System.out.println("线程1获取了锁");
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                System.out.println("线程1被中断了");
            } finally {
                lock.unlock();
            }
        });

        Thread t2 = new Thread(() -> {
            try {
                lock.lockInterruptibly();
                System.out.println("线程2获取了锁");
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                System.out.println("线程2被中断了");
            } finally {
                lock.unlock();
            }
        });

        t1.start();
        t2.start();

        try {
            Thread.sleep(1000);
            t2.interrupt();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

在这个例子中，我们创建了两个线程t1和t2，它们都需要获取ReentrantLock对象的锁。在t1获取锁的时候，我们让它休眠5秒钟，这样我们就有足够的时间来中断t2的等待状态。

在主线程中，我们让它等待1秒钟之后，就中断了t2的等待状态。此时t2就会抛出InterruptedException异常并退出等待状态，这样就实现了可打断的特性。



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





