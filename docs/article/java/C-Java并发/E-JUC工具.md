---
title: "JUC 工具"
shortTitle: "E-JUC 工具"
description: "JUC 工具"
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
  text: "JUC 工具"
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
  title: "JUC 工具"
  description: "JUC 工具"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# JUC 工具

## 1.AQS 原理

- 全称为 AbstractQueueSynchronizer，是阻塞式锁和相关的同步器工具的框架
- 用 state 属性来表示资源的状态（分独占模式和共享模式），子类需要定义如何维护这个状态，控制如何获得和释放锁
  - getState：获取 state 状态
  - setState：设置 state 状态
  - compareAndSetState: cas 机制设置 state 状态
  - 独占模式是只有一个线程能够访问资源，而共享模式允许多个线程访问资源
- 提供了基于 FIFO 的等待队列，类似于 Monitor 的 EntryList
- 使用条件变量来实现等待、唤醒机制，支持多个条件变量，类似于 Monitor 的 WaitSet

**自定义不可重入锁的简单实现：**

```java
public class AqsTest1 {
    private static final Logger logger = LoggerFactory.getLogger(AqsTest1.class);

    public static void main(String[] args) {
        MyLock lock = new MyLock();

        new Thread(() -> {
            lock.lock();
            try {
                logger.debug("加锁成功...");
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                logger.debug("解锁...");
                lock.unlock();
            }
        }, "t-1").start();

        new Thread(() -> {
            lock.lock();
            try {
                logger.debug("加锁成功...");
            } finally {
                logger.debug("解锁...");
                lock.unlock();
            }
        }, "t-2").start();
    }
}

// 自定义锁，不可重入
class MyLock implements Lock {

    // 实现独占锁
    class MySync extends AbstractQueuedSynchronizer {
        // 加锁
        @Override
        protected boolean tryAcquire(int arg) {
            if (compareAndSetState(0, 1)) {
                // 加上了锁，并设置当前线程为 owner
                setExclusiveOwnerThread(Thread.currentThread());
                return true;
            }
            return false;
        }

        // 释放锁
        @Override
        protected boolean tryRelease(int arg) {
            setExclusiveOwnerThread(null);
            setState(0);
            return true;
        }

        // 是否占有独占锁
        @Override
        protected boolean isHeldExclusively() {
            return getState() == 1;
        }

        public Condition newCondition() {
            return new ConditionObject();
        }
    }

    private MySync sync = new MySync();

    // 加锁，不成功则会进入等待队列中等待
    @Override
    public void lock() {
        // 只尝试一次
        sync.acquire(1);
    }

    // 加锁，可打断
    @Override
    public void lockInterruptibly() throws InterruptedException {
        sync.acquireInterruptibly(1);
    }

    // 尝试加锁（一次）
    @Override
    public boolean tryLock() {
        return sync.tryAcquire(1);
    }

    // 尝试加锁（带超时）
    @Override
    public boolean tryLock(long time, TimeUnit unit) throws InterruptedException {
        return sync.tryAcquireNanos(1, unit.toNanos(time));
    }

    // 解锁
    @Override
    public void unlock() {
        sync.release(1);
    }

    // 创建条件变量
    @Override
    public Condition newCondition() {
        return sync.newCondition();
    }
}
```





## 2.Reentrantlock

![image-20220705170923776](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/Reentrantlock%E7%BB%A7%E6%89%BF%E5%85%B3%E7%B3%BB.png)

### 2.1 加锁解锁流程

- 从构造器可以看出默认为非公平锁实现，即 NonfairSync，继承自 AQS
- 当没有竞争时：将当前线程设置为 owner 线程
- 第一个竞争出现时：
  - 调用 acquire 方法尝试加锁（1 次），如果加锁失败，会尝试创建一个节点对象，将该节点放入等待队列中
  - 等待队列是一个双向队列；节点状态为 0 时表示正常状态，节点的创建方式是懒惰的，其中队列中的第一个节点称为哑元或哨兵，用于占位（不关联线程）
  - 尝试获取锁时会调用 acquireQueued 方法，会在一个死循环中不断尝试获得锁，失败后会进入 park 阻塞，如果是紧邻头节点则会调用 tryAcquire 再次尝试获得锁，此时 state 仍然为 1 即失败。失败后会调用 shouldParkAfterFailedAcquire 方法将前驱节点即 head 的 WaitState 修改成 -1 并返回 true。之后会调用 parkAndCheckInterrupt 将当前线程 park
- 释放锁的流程：
  - 调用 tryRelease 设置 exclusiveOwnerThread 为 null 并设置 state 为 0
  - 当前队不为 null 并且 head 的 WaitState 为 -1 时进入 unparkSuccessor，找到队列中离 head 最近的一个未取消的节点，unpark 恢复其运行，此时便回到了第一个竞争线程的 acquireQueued 方法

- 回到第一个竞争线程的 acquireQueued 方法后：
  - 如果加锁成功，会设置 exclusiveOwnerThread 为此线程并设置 state 为 1，head 的指向变为该线程所在的节点并清空该节点的线程，而原本的 head 会从链表中断开被垃圾回收
  - 如果此时有其他线程来竞争且竞争线程变成了 Owner（非公平锁的体现），则原本应该成功加锁的第一个竞争线程又会失败，重新进入 park 阻塞



### 2.2 可重入原理（略）

-  主要可以概括为加锁时让 state 自增，释放时让 state 自减





## 3.读写锁

- 当读操作远远写操作时，可以使用读写锁让读-读可以并发，以此提高性能

#### 3.1 ReentrantReadWriteLock

```java
public class ReadWriteLockTest {
    public static void main(String[] args) throws InterruptedException {
        DataContainer dataContainer = new DataContainer();
        new Thread(() -> {
            dataContainer.read();
        }, "t-1").start();

        Thread.sleep(500);

        new Thread(() -> {
            dataContainer.processCachedData();
        }, "t-2").start();
    }
}

class DataContainer {
    private final Logger logger = LoggerFactory.getLogger(DataContainer.class);

    private Object data;

    // 如果失效则需要重新计算 data
    private volatile boolean cacheValid;

    private ReentrantReadWriteLock rw = new ReentrantReadWriteLock();

    private ReentrantReadWriteLock.ReadLock r = rw.readLock();

    private ReentrantReadWriteLock.WriteLock w = rw.writeLock();

    public void processCachedData() {
        r.lock();
        if (!cacheValid) {
            // 获取读锁之前必须释放读锁
            r.unlock();
            w.lock();
            try {
                if (!cacheValid) {
                    logger.debug("write data...");
                    cacheValid = true;
                }
                // 降级为读锁，释放写锁，这样能够让其他线程读取缓存
                r.lock();
            } finally {
                w.unlock();
            }
        }
        // 自己用完数据释放读锁
        try {
            logger.debug("use data...");
        } finally {
            r.unlock();
        }
    }

    public Object read() {
        logger.debug("get read lock...");
        r.lock();
        try {
            logger.debug("read...");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return data;
        } finally {
            logger.debug("read release...");
            r.unlock();
        }
    }

    public void write() {
        logger.debug("get write lock...");
        w.lock();
        try {
            logger.debug("write...");
        } finally {
            logger.debug("write release...");
            w.unlock();
        }
    }
}
```





### 3.2 StampedLock

- 特点时在使用读锁、写锁时必须配合戳使用
- StampedLock 支持 tryOptimisticRead 方法（乐观读），读取完后需要做一次戳校验，如果戳校验通过，表示这期间确实没有写操作，数据可以安全使用；如果校验没有通过，需要重新获取读锁，保证数据安全
- StampedLock 不支持可重入和条件变量

```java
public class StampedLockTest {
    public static void main(String[] args) throws InterruptedException {
        DataContainerStamped containerStamped = new DataContainerStamped(1);
        new Thread(() -> {
            containerStamped.read(1);
        }, "t-1").start();

        Thread.sleep(500);

        new Thread(() -> {
            containerStamped.write(2);
        }, "t-2").start();
    }
}

class DataContainerStamped {
    private final Logger logger = LoggerFactory.getLogger(DataContainerStamped.class);

    private int data;

    private final StampedLock lock = new StampedLock();

    public DataContainerStamped(int data) {
        this.data = data;
    }

    public int read(int readTime) {
        long stamp = lock.tryOptimisticRead();
        logger.debug("optimistic read lock {}", stamp);
        try {
            Thread.sleep(readTime * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if (lock.validate(stamp)) {
            logger.debug("read finish...");
            return data;
        }
        // 锁升级 - 读锁
        logger.debug("update to read lock...{}", stamp);
        try {
            stamp = lock.readLock();
            logger.debug("read lock {}", stamp);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            logger.debug("read finish {}", stamp);
            return data;
        } finally {
            logger.debug("release read lock {}", stamp);
            lock.unlockRead(stamp);
        }
    }

    public void write(int newData) {
        long stamp = lock.writeLock();
        logger.debug("write lock {}", stamp);
        try {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            this.data = newData;
        } finally {
          logger.debug("release lock...");
          lock.unlockWrite(stamp);
        }
    }
}
```





## 4.Semaphore 原理

- Semaphore（信号量）用来限制能够同时访问资源的线程上限

- 可以使用 Semaphore 限流，在访问高峰时让请求线程阻塞，高峰期过去再释放许可。只适合限制单机线程，并且仅是限制线程数而不是限制资源数
- 用 Semaphore 实现简单连接池，对比享元模式下的实现（用 wait notify），性能和可读性较好

```java
public class SemaphoreTest2 {
    private static final Logger logger = LoggerFactory.getLogger(SemaphoreTest2.class);

    public static void main(String[] args) {
        Pool pool = new Pool(2);
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                Connection connection = pool.borrow();
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                pool.free(connection);
            }, String.format("t-%d", i + 1)).start();
        }
    }
}

class Pool {
    private final Logger logger = LoggerFactory.getLogger(Pool.class);

    // 连接池的大小
    private final int poolSize;

    // 连接数组对象
    private Connection[] connections;

    // 连接数组状态，0 表示空闲；1 表示 繁忙
    private AtomicIntegerArray states;

    private Semaphore semaphore;


    Pool(int poolSize) {
        this.poolSize = poolSize;
        this.semaphore = new Semaphore(poolSize);
        this.connections = new Connection[poolSize];
        this.states = new AtomicIntegerArray(new int[poolSize]);
        for (int i = 0; i < poolSize; i++) {
            // MockConnection 实现了 Connection 接口
            connections[i] = new MockConnection(String.format("连接-%d", i + 1));
        }
    }

    // 借连接
    public Connection borrow() {
        // 如果有许可才进入
        try {
            semaphore.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        for (int i = 0; i < poolSize; i++) {
            if (states.get(i) == 0) {
                if (states.compareAndSet(i, 0, 1)) {
                    logger.debug("获取连接：{}", connections[i]);
                    return connections[i];
                }
            }
        }
        // 这行代码永远不会执行，但是不写会有语法错误
        return null;
    }

    // 还连接
    public void free(Connection connection) {
        for (int i = 0; i < poolSize; i++) {
            if (connections[i] == connection) {
                logger.debug("归还连接：{}", connection);
                states.set(i, 0);
                logger.debug("有空闲连接了...");
                semaphore.release();
                break;
            }
        }
    }
}
```





## 5.CountdownLatch

- 用来进行线程同步协作，等待所有线程完成倒计时
- 其中构造参数用来初始化等待计数值，await 用来等待计数归零，countDown 用来让计数减一

```java
public class CountDownLatchTest {
    private static final Logger logger = LoggerFactory.getLogger(CountDownLatchTest.class);


    public static void main(String[] args) throws InterruptedException {
        test3();
    }

    private static void test3() throws InterruptedException {
        ExecutorService service = Executors.newFixedThreadPool(10);
        CountDownLatch countDownLatch = new CountDownLatch(10);
        Random r = new Random();
        String[] all = new String[10];
        for (int i = 0; i < 10; i++) {
            int id = i;
            service.submit(() -> {
                for (int j = 0; j <= 100; j++) {
                    all[id] = j + "%";
                    try {
                        Thread.sleep(r.nextInt(100));
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.print("\r" + Arrays.toString(all));
                }
                countDownLatch.countDown();
            });
        }
        countDownLatch.await();
        System.out.println("\n开始！！！");
        service.shutdown();
    }

    private static void test2() {
        CountDownLatch latch = new CountDownLatch(3);
        ExecutorService service = Executors.newFixedThreadPool(4);
        service.submit(() -> {
            logger.debug("begin...");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            latch.countDown();
            logger.debug("end...");
        });

        service.submit(() -> {
            logger.debug("begin...");
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            latch.countDown();
            logger.debug("end...");
        });

        service.submit(() -> {
            logger.debug("begin...");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            latch.countDown();
            logger.debug("end...");
        });

        service.submit(() -> {
            try {
                logger.debug("waiting...");
                latch.await();
                logger.debug("wait end...");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
    }

    private static void test1() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(3);

        new Thread(() -> {
            logger.debug("begin...");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            latch.countDown();
            logger.debug("end...");
        }, "t-1").start();

        new Thread(() -> {
            logger.debug("begin...");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            latch.countDown();
            logger.debug("end...");
        }, "t-2").start();

        new Thread(() -> {
            logger.debug("begin...");
            try {
                Thread.sleep(1500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            latch.countDown();
            logger.debug("end...");
        }, "t-3").start();

        logger.debug("waiting...");
        latch.await();
        logger.debug("wait end...");
    }
}
```





## 6.CyclicBarrier

- CyclicBarrier（循环栅栏）用来进行线程协作，等待线程满足某个计数。构造时设置计数个数，每个线程执行到某个要同步的时刻调用 await 方法进行等待，当等待的线程数满足计数个数时继续进行
- 注意：线程数要和计数一致，否则不能得出期望的结果（同一个线程有可能消耗完所有计数）

```java
public class CyclicBarrierTest {
    private static final Logger logger = LoggerFactory.getLogger(CyclicBarrierTest.class);

    public static void main(String[] args) {
        ExecutorService service = Executors.newFixedThreadPool(2);
        CyclicBarrier barrier = new CyclicBarrier(2, () -> {
            logger.debug("task-1, task-2 finish...");
        });

        for (int i = 0; i < 3; i++) {
            service.submit(() -> {
                logger.debug("task-1 start...");
                try {
                    Thread.sleep(1000);
                    barrier.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
            });

            service.submit(() -> {
                logger.debug("task-2 start...");
                try {
                    Thread.sleep(2000);
                    barrier.await();
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
            });
        }


    }
}
```





## 7.ConcurrentHashMap

- JDK 7：在并发情况下，HashMap 在扩容时有可能会发生并发死链
- JDK 8：将扩容算法做了调整，不再将元素加入链表头，而是保持与扩容前一样的顺序，但不意味着能够在多线程环境下安全扩容（可能出现扩容丢数据）





## 8.Queue

- LinkedBlockingQueue
  - 链表实现，支持有界
  - 懒惰创建，每次入队都会生成新 Node
  - 使用两把锁提高性能（锁住的范围更小）
- ArrayBlockingQueue
  - 数组实现，强制有界
  - 提前初始化 Node 数组
  - 使用一把锁性能较低
- ConcurrentLinkedQueue
  - 与 LinkedBlockingQueue 类似，使用了两把锁，同一时刻允许两个线程（生产者线程与消费者线程）执行
  - dummy 节点的引入让两把锁锁住的是不同对象，避免竞争
  - “锁” 使用 cas 实现的





## 9.线程安全集合类概述

![image-20220706192308478](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E9%9B%86%E5%90%88%E7%B1%BB.png)

**线程安全类（主要 3 类）：**

- 遗留的线程安全集合类（如：Hashtable，Vector），并发性不高，一般都有替代方案
- 使用 Collections 装饰的线程安全集合
- JUC 线程安全集合类：
  - Blocking 类的大部分实现基于锁，提供用来阻塞的方法
  - CopyOnWrite 类的容器修改开销较大
  - Concurrent 类的容器时重点内容：
    - 内部很多操作使用 cas 优化，一般可以提供较高的吞吐量
    - 遍历时有弱一致性，如当使用迭代器遍历时，如果容器发生修改，迭代器仍然可以进行遍历，但是这时的内容是旧的
    - 求大小弱一致性，即 size 操作未必是 100% 准确的
    - 读取弱一致性
    - 注意：遍历时如果发生了修改，对于非安全容器来讲，使用 fast-fail 机制，即让遍历立即失败，抛出 ConcurrentModificationException 异常，不在继续遍历

