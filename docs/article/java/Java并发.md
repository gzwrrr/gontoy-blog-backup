---
title: "Java 并发"
shortTitle: "Java 并发"
description: "Java 并发"
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
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Java 并发"
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
  title: "Java 并发"
  description: "Java 并发"
  author:
    name: gzw
    email: 1627121193@qq.com
---




# Java并发


# 写在前面

- 文章主要是本人在学习 Java 并发（[视频戳这里](https://www.bilibili.com/video/BV16J411h7Rd?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0)）时的笔记，主要用于速查
- 目前还有许多点未补全，且结构还未进行调整，阅读起来相对困难





# 1.进程和线程

## 1.1 进程

- 加载指令、管理内存、管理 IO
- 当程序代码从磁盘加载到内存便开启了一个进程
- 进程是一个程序的实例，大多数程序可以同时运行多个进程
- 进程拥有共享的资源：内存、空间等，共其内部的线程共享
- 进程间的通信较为复杂，同一台计算机的进程通信成为 IPC；不同计算机之间的进程通信需要通过网络并遵守共同的协议（如：HTTP）





## 1.2 线程

- 一个进程内可以分为多个线程
- 一个线程就是一个指令流，线程会将这个指令流中的命令一条条地交给 CPU 执行
- Java 中，线程作为最小的调度单位，进程作为资源分配的最小单位
- 在 Windows 中，进程是不活动的，只是作为线程的容器

- 多个线程可以访问同一个共享变量
- 线程的上下文切换的成本一般比进程的上下文切换低





## 1.3 多线程

**1.值得注意的是：**

- IO 操作是不占用 CPU 的，只是我们拷贝文件使用的是阻塞 IO，这时即使不占用 CPU 也还是要等待 IO 结束，没有充分利用到线程
- 这种情况下可以使用非阻塞 IO 或异步 IO 解决

**2.优势：**

- 可以实现异步操作，避免阻塞
- 在 CPU 是多核的情况下可以提高程序的效率
- 单核 CPU 下多线程一般会比单线程慢，因为多线程还要切换不同线程，这也是一个耗时的操作。但是这不意味着单核下多线程没有用，因为轮流切换线程可以任务使不同任务得以进行，不至于让单个程序一直占用 CPU





## 1.4 创建线程

**三种方式创建线程：**

- Thread 类
- Runnable 接口
- FutureTask`<V>` 类
  - FutureTask 实现了 RunnableFuture 接口，而 RunnableFuture 继承了 Runnable 接口和 Future`<V>` 接口（接口可以多继承，类不行），这可以返回一个任务的执行结果（Runnable 没有返回值），多线程操作间更加方便
  - FutureTask 可以接收 Callable 类型的参数（Callable 与 Runnable 类似，前者比后者多了返回值并且可以抛出异常），以此来处理有返回值的情况
  - Callable 接口中只有一个 call 方法，并且使用了 @FunctionalInterface 注解

**【注意】一般更推荐使用 Runnable 接口的创建方式，，因为这让 Runnable 任务脱离了 Thread 的继承体系，即：使得任务和线程创建分开（意味着更灵活），并且常常使用 lambda 表达式简化。此外，使用 Runnable 还更容易与线程池等高级 API 结合**





### 1.4.1  Thread

**直接使用 Thread 创建线程：**

```java
public class CreateByThread {

    private static final Logger logger = LoggerFactory.getLogger(CreateByThread.class);

    public static void main(String[] args) {
        Thread thread = new Thread() {
            @Override
            public void run() {
                super.run();
                logger.debug("通过 thread 直接创建线程...");
            }
        };

        // 给线程命名
        thread.setName("thread-1");

        // 启动线程
        thread.start();

        logger.debug("main方法...");
    }

}
```





### 1.4.2 Runnable

**1.使用 Runnable 接口创建线程：**

```java
public class CreateByRunnable {

    private static final Logger logger = LoggerFactory.getLogger(CreateByRunnable.class);

    public static void main(String[] args) {

        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                logger.debug("通过 runnable 接口创建线程...");
            }
        };

        // 创建线程，同时给线程命名
        Thread thread = new Thread(runnable, "thread-1");

        // 启动线程
        thread.start();

        logger.debug("main方法...");
    }
}
```



**2.使用 lambda 表达式的条件**

- 接口中只有一个方法
- 使用了 @FunctionalInterface 注解

```java
// 使用 lambda 表达式创建
Runnable runnable1 = () -> {
    logger.debug("通过 runnable 接口创建线程...");
};

// 当方法体只有一句话时可以去掉大括号
Runnable runnable2 = () -> logger.debug("通过 runnable 接口创建线程...");

// 最简化的线程创建方式，等价于：Thread thread1 = new Thread(runnable2, "thread-1");
Thread thread1 = new Thread(() -> logger.debug("通过 runnable 接口创建线程..."), "thread-1");
```





### 1.4.3 FutureTask 

**使用 FutureTask 方式创建：**

```java
public class CreateByFutureTask {

    private static final Logger logger = LoggerFactory.getLogger(CreateByFutureTask.class);

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 创建具有返回值的任务
        FutureTask<Integer> task = new FutureTask<>(new Callable<Integer>() {
            @Override
            public Integer call() throws Exception {
                logger.debug("创建任务...");
                Thread.sleep(1000);
                logger.debug("任务结束...");
                return 1000;
            }
        });

        // 创建线程
        Thread thread = new Thread(task, "thread-1");

        // 开启线程执行任务
        thread.start();

        // 下面的语句是等待线程结束并返回了结果才执行
        logger.debug("执行时间：{} ms", task.get());

    }
}
```





## 1.5 线程运行原理

### 1.5.1 栈与栈帧

- JVM 由堆、栈、方法区组成，其中栈内存就是给线程用的，每启动一个线程，虚拟机就会为其分配一块栈内存
- 每个栈由多个栈帧（Frame）组成，对应着每次方法调用时所占的内存
- 每个线程只能有一个活动栈帧，对应着当前执行的方法
- 不同的线程间的栈内存是互不干扰的





### 1.5.2 线程上下文切换

**1.切换时机：**

- 线程的 CPU 时间片用完
- 执行垃圾回收时
- 有更高优先级的线程需要运行
- 线程自己调用了 sleep、yield、wait、join、park、synchronized、lock等方法

**2.切换发生时：**

- 需要由操作系统保存当前线程的状态并恢复另一个线程的状态，Java 中对应的概念就是程序计数器，他的作用是记住下一条 jvm 指令的执行地址，这是线程私有的
- 状态包括程序计数器、虚拟机栈中每个栈帧的信息，如局部变量、操作数栈、返回地址等
- 线程上下文频繁地切换会影响性能





## 1.6 线程的主要方法

### 1.6.1 run 与 start

- 创建线程后可以直接调用 run 方法，但是这样执行者就变成了 main 线程，没有提高性能，只有使用 start 方法才能由创建的线程执行该任务
- start 方法是不能重复调用的





### 1.6.2 sleep 与 yield

- sleep 会让当前线程从 Runnable 进入 Time waiting 阻塞状态，其他线程可以使用 interrupt 方法打断正在睡眠的线程，这时 sleep 会抛出 InterruptException
- 睡眠结束后的线程未必会立刻得到执行；建议使用 TimeUnit 的 sleep 代替 Thread 的 sleep 来获得更好的可读性
- yield 会让当前线程从 Running 进入 Runnable 就绪状态，然后调度执行其他同优先级的线程，此时如果没有同优先级的线程，那么不能保证能让当前线程暂停的效果。yield 具体的实现依赖于操作系统的任务调度器
- 调度器只会把时间片分给 Runnable 状态的线程而不会分给 Time Waiting 状态的线程
- sleep 会有一个真正的休眠时间，yield 在没有其他线程的情况下还是会继续本线程
- 线程优先级会提示（hint）调度器优先调度优先级高的线程，但这仅仅是一个提示，调度器是可以忽略掉的。如果 CPU 比较忙，那么优先级高的线程会获得更加多的时间片，但 CPU 闲时，优先级几乎没作用





### 1.6.3 join

- 等待调用 join 的线程执行完成后再继续执行当前线程的
- join 是用来同步线程的
- join 可以带参数，倘若参数设置的时长小于线程的总时常，那么就会提前打断线程；倘若设置的时常大于线程的总时常，那么在线程任务完成后会直接结束而不是继续等待，这也是带参数时和 sleep 方法的区别 
- join 方法使用了保护性暂停模式（详见第三大点）





### 1.6.4 interrupt 与 park

- interrupt 方法用于打断线程，见 1.7 所示
- park 方法可以让线程停止，之后的代码不会执行，用 interrupt 可以打断这种状态
- 注意，在打断标记为 true 时，park 方法会失效，将打断标记置为真即可（使用interrupted，见 1.7 解释）





### 1.6.5 stop、suspend 与 resume

- 三个方法都不建议使用，已经过时，容易破坏同步代码块，造成线程死锁。其都有对应的解决方法
- stop 方法用于立即停止线程运行；suspend 方法用于挂起（暂停）线程运行；resume 方法用于恢复线程运行。





### 1.6.6 wait / notify

- Monitor 中的 Owner 线程发现条件不满足时，调用 wait 方法，即可让线程进入 WaitSet 变为 Waiting 状态
- Blocked 和 Waiting 的线程都会处于阻塞状态，不占用 CPU 时间片
- Blocked 线程会在 Owner 线程释放锁时唤醒
- Waiting 线程会在 Owner 线程调用 notify 或 notifyAll 时唤醒，但是唤醒后并不意味着立即获得锁，仍需要进入 EntryList 中重新竞争
- 上述方法都是线程之间进行协作的手段，都是属于 object 对象的方法。必须要获取对象的锁才能调用这几个方法



**1.相关 API**

- obj.wait：让进入 object monitor 的线程到 WaitSet 等待。不带参数或者参数为 0 的 wait 方法表示无限制等待下去，参数是用于设置超时时间的（timeout）。特别注意 wait 方法还有两个参数（另一个为 nanos）的重载，但是 nanos 参数并不能精确到纳秒，通过源码可以发现，当 nanos 大于 0 时会直接将 timeout 的值加一
- obj.notify：在 object 上正在 WaitSet 等待的线程中挑一个唤醒
- obj.notifyAll：让 object 上正在 WaitSet 等待的线程全部唤醒



**2.基本用法**

```java
public class BaseUsage {
    public static void main(String[] args) throws InterruptedException {
        Object o = new Object();
        Logger logger = LoggerFactory.getLogger(BaseUsage.class);

        new Thread(() -> {
            synchronized (o) {
                logger.debug("执行...");
                try {
                    // 进入 WaitSet 等待
                    o.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                // 唤醒后才执行的操作
                logger.debug("唤醒操作...");
            }
        }, "t1").start();

        new Thread(() -> {
            synchronized (o) {
                logger.debug("执行...");
                try {
                    // 进入 WaitSet 等待
                    o.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                // 唤醒后才执行的操作
                logger.debug("唤醒操作...");
            }
        }, "t2").start();

        // 主线程休息 1 秒后随机唤醒一个线程
        logger.debug("执行...");
        Thread.sleep(1000);
        synchronized (o) {
            o.notifyAll();
        }
    }

}
```



**3.sleep 和 wait 的区别**

- sleep 是 Thread 的方法，而 wait 是 Object 的方法
- sleep 不需要强制和 synchronized 配合使用，但是 wait 需要和 synchronized 一起使用
- sleep 在睡眠的同时不会释放对象锁，但是 wait 在等待时会释放对象锁





### 1.6.7 LockSupport 的 park 和 unpark

- LockSupport.park 用于暂停当前线程；LockSupport.unpark 用于恢复某个线程的运行
- 与 Object 的 wait 与 notify(All) 相比
  - wait，notify 和 notifyAll 必须配合 Object Monitor 一起使用，而 unpark 不需要
  - park 和 unpark 是以线程为单位来阻塞和唤醒线程，而 notify 只能随机唤醒一个等待线程，notifyAll 是唤醒所有的等待线程（不那么精确）
  - park 和 unpark 可以先 unpark，而 wait 和 notify 不能先 notify

**park 和 unpark 原理**

- 每个线程都有自己的一个 Parker 对象（有 C 实现，在 Java 中不可见），有三部分组成：_ count、_ cond、_ mutex（互斥锁）
- 线程就像一个旅人，Parker 就像他随身携带的背包，条件变量（_ cond）就好比背包中的帐篷；_ count 就好比背包中的备用干粮（0 为耗尽，1 为充足）
- 调用 park 就是要看需不需要停下来休息
  - 如果干粮耗尽，那么就钻进帐篷休息
  - 如果备用干粮充足，那么不需要停留，继续前进
- 调用 unpark 就好比令干粮充足
  - 如果此时线程还在帐篷中，就唤醒让他继续前进
  - 如果这时线程还在运行，那么下次他调用 park 时，仅是消耗掉备用干粮，不需要停留继续前进。因为背包空间有限，多次调用 unpark 仅会补充一份备用干粮





## 1.7 线程停止的方法

【注意】

- 抛出的异常被捕获处理后，之后的代码都可以正常执行，这就是为什么下面捕获异常后循环还在继续
- 但是如果将异常往上抛出，那么之后的代码就不可以继续执行

【注意】

- 下面使用的 isInterrupted 方法是用于判断线程是否被打断的，不会清除打断标记
- 而与之相像的另外一个方法 interrupted 也是判断线程是否被打断，但是会清除打断标记

```java
public class TwoPhaseTermination {
    public static void main(String[] args) throws InterruptedException {
        Termination t = new Termination();
        t.start();
        Thread.sleep(3000);
        t.stop();
    }
}

class Termination {
    private static final Logger logger = LoggerFactory.getLogger(Termination.class);
    private Thread monitor;

    /**
     * 启动线程
     * 在其中判断线程是否被打断
     * 打断则释放资源后再结束
     */
    public void start() {
        monitor = new Thread(() -> {
            while (true) {
                // 获取当前线程
                Thread cur = Thread.currentThread();
                if (cur.isInterrupted()) {
                    logger.debug("释放资源...");
                    // 结束线程
                    break;
                }
                try {
                    // 情况1：在该处被打断的话，interrupt 的状态会被重新置成 false，无法停止线程，类似的还有 wait、join
                    Thread.sleep(1000);
                    // 情况2：在该处被打断则 interrupt 状态为直接被置为 true
                    logger.debug("执行监控记录...");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    // 因为情况1在抛出异常后 interrupt 状态是 false，所以此处还需要重新置为 true
                    cur.interrupt();
                }
            }
        }, "t1");

        monitor.start();
    }

    /**
     * 不使用线程自带的 stop 方法
     * 因为停止后线程持有的资源可能释放不了
     * 应该使用 interrupt 方法代替
     */
    public void stop() {
        monitor.interrupt();
    }
}
```





## 1.8 主线程与守护线程

- 默认情况下，Java 进程需要等待所有的线程都运行结束才会结束
- 有一种特殊的线程叫守护线程，只要其他非守护线程结束了，就会强制结束（即使守护线程的代码没有执行完也会强制结束）
- 使用 setDaemon 方法（参数为 true）可以将线程设置成守护线程
- 垃圾回收器线程就是一种守护线程。Tomcat 中的 Acceptor 和 Poller 线程都是守护线程，所以 Tomcat 在收到 shutdown 命令后，不会等待它们处理完当前请求





## 1.9 线程的状态

**1.从操作系统层面描述（五种状态）**

- 初始状态：仅是在语言层面创建了线程对象，还未与操作系统线程关联
- 可运行状态（就绪状态）：指该线程已经被创建（与操作系统线程相关联），可以由 CPU 调度执行
- 运行状态：指获取了 CPU 时间片运行中的状态
- 阻塞状态：
  - 如调用了阻塞 API，如 BIO 读写文件，这时该线程实际上不会使用到 CPU，会导致线程上下文切换，进入阻塞状态
  - 等待操作完毕后，会由操作系统唤醒阻塞的线程，转换至可运行状态。
  - 阻塞与可运行状态的区别是，对阻塞的线程来说只要它们一直不被唤醒，那么调度器就一直不会考虑调度它们
- 终止状态：表示线程已经执行完毕，生命周期已经结束，不会再转换为其他状态



**2.从 Java API 层面描述（六种状态，按照 Thread.State 枚举分类）**

使用 getState 方法可以获取线程当前的状态

- NEW：线程刚被创建，但是还没有调用 start 方法
- RUNNABLE：当调用了 start 方法之后便进入可运行状态，涵盖了操作系统的：
  - 可运行状态
  - 运行状态（由于 BIO 导致的线程阻塞 Java 是无法区分的，仍然认为是可运行）
  - 阻塞状态
- TERMINATED：线程代码运行结束
- Java 中三种特殊的阻塞：
  - BLOCKED（如：加锁）
  - WAITING（如：join，wait）
  - TIMED_WAITING（如：sleep）



---



# 2.锁

## 2.1 线程的活跃性

### 2.1.1 死锁

- 当一个线程需要同时获取多把锁时就容易出现死锁，如：
  - 线程 t1 需要获得对象 A 的锁，接下来想获得对象 B 的锁
  - 线程 t2 需要获得对象 B 的锁，接下来想获得对象 A 的锁

- 顺序加锁可以解决死锁，但是容易导致饥饿现象；可以使用 ReentrantLock 解决死锁问题



### 2.1.2 活锁（待补充）

- 出现在两个线程互相改变对方的结束条件，导致最后谁也无法结束



### 2.1.3 饥饿（待补充）

- 一个线程由于优先级太低，导致始终得不到 CPU 调度执行，不能够结束



## 2.2 ReentrantLock

**相较于 synchronized 它具备以下特点：**

- 可中断
- 可以设置超时时间
- 可以设置公平锁（先进先出）
- 支持多个条件变量（如 WaitSet 就是一个条件变量，多个意味着细分了）

**但与 synchronized 一样，都支持可重入：**

- 可重入是指同一个线程如果首次获得了这把锁，那么因为它是这把锁的拥有者，因此有权利再次获得这把锁
- 如果是不可重入锁，那么第二次获得锁时，自己也会被锁挡住





### 2.2.1 可重入

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





### 2.2.2 可打断

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





### 2.2.3 锁超时

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





### 2.2.4 公平锁

- ReentrantLock 默认是不公平的，可以通过构造方法设置为公平锁
- 一般没有必要使用公平锁，这会降低并发度





### 2.2.5 条件变量

- synchronized 中也有条件变量，如 WaitSet，相当于休息室，当条件不满足时就进入休息室等待；而 ReentrantLock 支持多个条件变量，即支持多间休息室，这意味着更加细分
- 使用流程：
  - await 前需要获取锁
  - await 执行后会释放锁，进入 conditionObject 等待
  - await 的线程被唤醒（打断或超时）会重新竞争 lock 锁
  - 竞争 lock 锁成功后，从 await 后继续执行



---



# 3.共享模型（重点）

## 3.1 管程

### 3.1.1 共享带来的问题

- 一个程序运行多个线程本身是没有问题的，问题在于多个线程访问共享资源，但这是对多个线程对共享资源读写操作时发生指令交错情况而言的
- 临界区：一段代码块内如果存在对共享资源的多线程读写操作，那么称这段代码块为临界区
- 竞态条件：多个线程在临界区内执行，由于代码的执行序列不同而导致结果无法预测，那么就称发生了竞态条件





## 3.2 Synchronized

### 3.2.1 基本用法

- 为了避免临界区的竞态条件发生，可以采用：
  - 阻塞式方案：synchronized（对象锁，使用互斥的方法使同一时刻之多只有一个线程能够持有对象锁），lock
  - 非阻塞式方案：原子变量





**【注意】Java 中互斥和同步都可以采用 synchronized 关键字来完成，但是还是由区别的：**

- 互斥是保证临界区的竞态条件发生，同一时刻只能有一个线程执行临界区代码
- 同步是由于线程执行的先后顺序不同，需要一个线程等待其他线程运行到某个点





**【注意】加对象锁的原理大致可以理解成：**

- 一个线程在执行非原子性操作时，加锁会让这个操作变成原子性操作
- 这就意味着，当执行的线程在得到的时间片内没有完成整个操作，锁就不会解开，也即其他线程即使得到了时间片也无法对这个对象进行操作
- 只有等到未完成操作的线程再次得到自己加锁的对象并完成了整个操作，即使得非原子性操作在逻辑上变成原子性操作时，锁才会解开，其他线程才能访问这个对象，否则就得一直出现上述第二点的情况，这也会导致性能下降（还有线程上下文切换的开销）

```java
public class SynchronizedSolution {
    private static final Logger logger = LoggerFactory.getLogger(SynchronizedSolution.class);
    private static int count1 = 0;
    private static int count2 = 0;
    private static final Object lock = new Object();

    /**
     * 由于自增和自减操作不是原子性操作（因为编译得到的字节码中，自增自减各自都有四条语句），所以下面的代码不同步的话结果会出错
     * @param args
     * @throws InterruptedException
     */
    public static void main(String[] args) throws InterruptedException {

        long start = System.nanoTime();
        Thread t1 = new Thread(() -> {
            // 加锁需要额外传递一个 Object，因为 count 不是一个对象，而且不能将其改为 Integer，因为装箱和拆箱时会改变引用的对象导致锁失效
            // 即锁必须要对同一个对象才能生效
            synchronized (lock) {
                for (int i = 0; i < 5000; i++) {
                    count1++;
                }
            }
        }, "t1");
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 5000; i++) {
                // 也可以在这行加锁，即在非原子性操作处加锁即可
                synchronized (lock) {
                    count1--;
                }
            }
        }, "t2");
        t1.start();
        t2.start();
        // 一定要等待两个线程都结束才能读取 count 的值，否则可能没结束就读取了错误的值
        t1.join();
        t2.join();
        long end = System.nanoTime();
        logger.debug("count：{} -- time：{}ns", count1, end - start);


        start = System.nanoTime();
        for (int i = 0; i < 5000; i++) {
            count2++;
            count2--;
        }
        end = System.nanoTime();
        logger.debug("count：{} -- time：{}ns", count2, end - start);
    }
}
```





### 3.2.2 方法上的 synchronized

**1.以上述代码为例子，将其中的 count 封装成对象：**

```java
class Room {
    private int count;

    public void increment() {
        // this 是指锁住当前实例化的对象
        synchronized (this) {
            count++;
        }
    }

    public void decrement() {
        synchronized (this) {
            count--;
        } 
    }

    public int getCount() {
        synchronized (this) {
            return count;
        }
    }
}
```



**2.上述代码等价于下面的，即加在方法上的 synchronized 并不是锁方法（没有锁方法这个操作），而是锁住当前实例化的对象：**

```java
class Room {
    private int count;

    public synchronized void increment() {
        count++;
    }

    public synchronized void decrement() {
        count--;
    }

    public synchronized int getCount() {
        return count;
    }

}
```



**3.加在静态方法上的话是锁住类对象的，如下：**

```java
class Test {
    public synchronized static void test() {
        
    }
}
// 等价于下面的
class Test {
    public static void test() {
       	// 不是锁 this
        synchronized(Test.class) {
            
        }
    }
}
```





## 3.3 变量的线程安全分析

### 3.3.1 成员变量和静态变量

- 如果它们没有共享，则是线程安全的
- 如果它们共享，那么要根据它们的状态是否能够被改变来判断
  - 如果只有读操作，则是线程安全的
  - 如果有读写操作，则这段代码是临界区，需要考虑线程安全





### 3.3.2 局部变量

- 局部变量是线程安全的
- 但是局部变量引用的对象未必是线程安全的
  - 如果该对象没有逃离方法的作用范围，则是线程安全的
  - 如果该对象逃离了方法的作用范围，则需要考虑线程安全
- 父类的局部变量要是暴露引用，其子类使用时可能会有线程安全问题（子类覆盖了父类的方法，并且在其中创建了新线程并使用了某个变量的引用），此时应该将父类方法从 public 改成 private 防止父类方法被覆盖。此外还可以考虑在方法上加上 final 关键字防止子类覆盖





### 3.3.3 线程安全类

- 线程安全类中的方法大多数时线程安全的。不可变类（如：String、Integer）时线程安全的，因为其内部的状态（属性）是不可变的
- 但是这些线程安全的方法组合在一起时可能出现线程安全问题
- 例如 Hashtable 的 get 和 put 方法都是线程安全的，但是先判断 get 的 key 是否为空再 put 的话，此时倘若有两个线程，一个先 get，另一个 get 后未等到 先前的线程 put 就先把自己的结果 put，就会导致之后第一个 put 后会把第二个先 put 的覆 盖掉，从而导致线程安全问题





## 3.4 对象头 

### 3.4.1 普通对象头

![image-20220701093956420](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/%E6%99%AE%E9%80%9A%E5%AF%B9%E8%B1%A1%E5%A4%B4.png)





### 3.4.2 数组对象头

![image-20220701094022990](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E5%A4%B4.png)





### 3.4.3 Mark Word

![image-20220701094445330](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/MarkWord.png)





## 3.5 Monitor/轻量级锁/偏向锁

### 3.5.1 Monitor（重量级锁）

- Monitor 操作系统层面实现的锁，称为监视器或管程
- Java 中的 synchronized 在上锁时会关联 Monitor，成为 Monitor 的 owner
- 其他线程想要获取共享资源时就会访问 Monitor，查看其是否有 owner，如果有则进入 blocked 状态，进入阻塞队列
- 锁释放掉后阻塞队列中的线程才能成为 Monitor 的 owner





### 3.5.2 轻量级锁

- 轻量级锁对使用者是透明的，语法仍然是 synchronized
- 轻量级锁的使用场景：如果一个对象有对线程访问，但是多线程访问的时间是错开的（没有竞争），那么可以使用轻量级锁优化
- 轻量级锁的创建与解锁：
  - 创建锁记录 Lock Record 对象，每个线程的栈帧都会包含一个锁记录结构，内部可以存储锁定对象的 Mark Word
  - 让锁记录中的 Object reference 指向锁对象，并尝试用 cas 替换 Object 的 Mark Word，将 Mark Word 的值存入锁记录（即进行了数据交换）
  - 如果 cas 替换成功，对象头中就会存储锁记录地址和状态 00，表示由该线程给对象加锁（cas 是一个原子性的交换操作）
  - 如果 cas 替换失败，则有两种情况：如果是其他线程已经持有了该 Object 的轻量级锁，这时就表明有竞争，进入锁膨胀过程；如果是自己执行了 synchronized 锁重入，那么就再添加一条 Lock Record 作为重入的计数（值为 null）
  - 当退出 synchronized 代码块（解锁时）如果有取值为 null 的锁记录，表示有重入，这时重置锁记录（去除重入的锁记录），表示重入计数减一
  - 当退出 synchronized 代码块（解锁时）锁记录不为null，这时使用 cas 将 Mark Word 的值恢复给对象头。如果恢复成功，说明解锁成功；如果失败，说明轻量级锁进行了锁膨胀或已经升级成了重量级锁，进入重量级锁的解锁流程
- 锁膨胀过程
  -  如果在尝试加轻量级锁的过程中，cas 操作无法成功，这时一种情况就是有其他线程为此对象上了轻量级锁（即有竞争），这时需要进行锁膨胀，将轻量级锁变为重量级锁
  -  流程：在线程发现 Object 已经有轻量级锁时，该线程会为 Object 对象申请 Monitor 锁，让 Object 指向重量级锁地址，然后该线程会让自己进入 Monitor 的阻塞队列中（EntryList Blocked）解锁时，退出的线程会使用 cas 将 Mark Word 的值恢复给对象头，这时会进入重量级解锁流程，按照 Monitor 地址找到 Monitor 对象，设置 Owner 为 null，唤醒阻塞队列中的线程
- 自旋优化
  - 重量级锁竞争的时候，还可以使用自旋进行优化，如果当前线程自旋成功（即多次循环测试出当前持锁线程已经退出了同步块，释放了锁）这时当前线程就可以避免阻塞
  - 自旋会占用 CPU 时间，在单核 CPU 的情况下进行自旋就是浪费时间，只有多核 CPU 自旋才能发挥优势
  - 在 Java 6 之后自旋锁都是自适应的，比如对象刚刚的一次自旋操作成功过，那么认为这次自旋成功的可能性会较高，这样就会多自旋几次，反之就会少自旋几次。Java 7 之后不能控制是否开启自旋功能





### 3.5.3 偏向锁

- 轻量级锁在没有竞争时（只有自己一个单独的线程）每次重入仍然需要执行 cas 操作
- Java 6 中引入了偏向锁来进一步优化：只有第一次使用 cas 将线程 is 设置到对象的 Mark Word 中，之后发现这个线程 id 是自己就表示没有竞争，不用重新 cas，以后只要不发生竞争，这个对象就归该线程所有
- 当一个对象创建时：
  - 如果开启了偏向锁（默认开启），那么对象创建后，Mark Word 的值为 0x05 即后三位为 101，这时它的对象头中的 thread、epoch、age 都为 0
  - 偏向锁默认是延迟的，不会在程序启动时立即生效，如果想避免延迟，可以加入 VM 蚕食 -XX:BiasedLockingStartupDelay=0 来禁用延迟
  - 如果没有开启偏向锁，那么对象创建之后，Mark Word 值为 0x01 即最后三位为 001，这时它的对象头中的 hashcode、age 都为 0，第一次用到 hashcode 时才会赋值
  - 当创建对象后调用 hashcode 方法，会直接禁用掉偏向锁，因为偏向锁中没有存储 hashcode 的字段，只好使用轻量级锁，因此会禁用掉偏向锁

- 锁的撤销：使用 wait / notify 会撤销偏向锁或轻量级锁，因为只有重量级锁才可以调用这些方法
- 批量重偏向：如果对象被多个线程访问，但是没有竞争，这时偏向锁线程 t1 的对象仍然有机会重新偏向 t2，重偏向会重置对象恶的 Thread ID。当撤销偏向锁的阈值超过 20 次时，jvm 会认为偏向错误了，会在给这些对象加锁时重新偏向至当前加锁的线程
- 批量撤销：当撤销偏向锁阈值超过 40 次后，jvm 会认为确实偏向错误了（不应该偏向），于是整个类的所有对象都会变为不可偏向，新建的对象也是不可偏向的





### 3.5.4 锁消除

- JIT 即时编译器会优化字节码中不需要加的锁，即去除加锁的操作。
- JIT 是默认开启的，禁用可以加入 VM 参数：-XX:-EliminateLocks





## 3.6 Java 内存模型

- JMM 定义了主存、工作内存等的抽象概念，底层对应着 CPU、寄存器、缓存、硬件内存、CPU 指令优化等
- JMM 体现在以下几个方面：
  - 可见性：保证指令不会受 CPU 缓存的影响
  - 原子性：保证指令不会受到线程上下文切换的影响
  - 有序性：保证指令不会受 CPU 指令并行优化的影响





### 3.6.1 可见性

- 主存与工作内存之间还有缓存，JIT 会将主存中的变量优化，即存入缓存中提高效率，额外开辟的线程都将从缓存中读取数据
- 但是这样一来，即使修改了主存中的变量值，额外开辟的线程还是会读取缓存中的数据，即读取到的都是旧值

**1.使用 volatile 解决：**

- 在共享的变量上加上 volatile 关键字，使得变量不存如缓存
- volatile 可以用来修饰成员变量和静态成员变量，可以避免线程从自己的工作缓存中查找变量的值，即线程操作 volatile 变量都是直接操作内存的

**2.使用 synchronized 解决：**

- 在共享变量外使用 synchronized 可以使得变量对线程都是可见的
- 但是 synchronized 需要创建 Monitor，是个重量级的操作，开销比较大

**3.volatile 原理：**

- volatile 的底层实现原理是内存屏障
  - 对 volatile 变量的写指令后会加入写屏障，保证在该屏障之前的对共享变量的改动都能同步到主存中。写屏障会确保指令重排时不会将写屏障之前的代码排在写屏障之后
  - 对 volatile 变量的读指令后会加入读屏障，保证在该屏障之后的对共享变量的读取都是加载主存中的最新数据。读屏障会确保指令重排时不会将读屏障之后的代码排在读屏障之前





### 3.6.2 原子性

- volatile 只能保证可见性但是不能保证没有指令交错，即在多个线程同时修改一个变量时，还是有可能读到未修改前的值
- volatile 适用于一个线程修改变量而多个线程读取的情况
- synchronized 可以同时保证原子性和可见性





### 3.6.3 有序性

- JVM 会在不影响正确性的前提下，调整语句的执行顺序，这也称为指令重排
- 多线程下的指令重排会影响正确性
- 使用 volatile 修饰变量可以避免这个变量之前的指令重排序
- synchronized 只有在完全保护一个变量的情况下才能保证逻辑上的有序性（即实际上还是重排了，但是被同步块保护了，从最终结果来说还是有序的），如果一个变量在同步代码块之外被修改了，还是有可能出现指令重排的情况





### 3.6.4 double-checked locking

```java
public final class DoubleCheckLocking {
    private DoubleCheckLocking() {}
    // 饿汉式单例，使用 dcl 时必须加上 volatile 才能保证不会发生指令重排而导致返回 null 的错误
    private static volatile DoubleCheckLocking INSTANCE = null;

    public static DoubleCheckLocking getInstance() {
        // 此处 INSTANCE 不被 synchronized 保护，在没有使用 volatile 时可以直接被其他线程插入导致错误
        if (INSTANCE == null) {
            // 首次访问会同步，之后访问就没有了 synchronized
            synchronized (DoubleCheckLocking.class) {
                if (INSTANCE == null) {
                    // 此处可能会发生指令重排，即先赋值再调用构造方法。不使用 volatile 可能发生指令交错导致错误
                    INSTANCE = new DoubleCheckLocking();
                }
            }
        }
        return INSTANCE;
    }
}
```





### 3.6.5 happens-before

- happens-before 规定了对共享变量的写操作对其他线程的读操作可见，它是可加性与有序性的一套规则总结。抛开此规则时，JMM 不能保证一个线程对共享变量的写对于其他线程对该共享变量的读可见
- 线程解锁之前对变量的写，对于接下来加锁的线程对该变量的读可见
- 线程对 volatile 变量的写，对于接下来其他线程对该变量的读可见
- 线程 start 前对变量的写，对该线程开始之后对该变量的读可见
- 线程结束前对变量的写，对于其他线程得知它结束后的读可见（比如其他线程调用 t1.Alive() 或 t1.join() 等待他结束）
- 线程 t1 打断 t2（interrupt）前对变量的写，对于其他线程得知 t2 被打断后对该变量的读可见
- 对变量的默认值（0，false，null）的写，对于其他线程对该变量的读可见





## 3.7 无锁并发

###  3.7.1 cas 与 volatile

- cas 即 compare and set，这必须是原子性的操作，cas 必须借助 volatile 才能读取到共享变量的最新值来实现比较-交换的效果
- cas 的底层是 lock cmpxchg 指令（x86 架构），在单核 CPU 和多核 CPU 下都能保证比较-交换的原子性。在多核状态下，某个核执行到带 lock 的指令时，CPU 会让总线锁住，当这个核把此指令执行完毕再开启总线，这个过程中不会被线程的调度机制所打断，保证了多个线程对内存操作的准确性（原子性）
- cas 是基于乐观锁的思想，即用最乐观的估计，不怕其他线程修改共享变量，即使修改了也是重试；synchronized 是基于悲观锁的思想，即用最悲观的估计，防范这其他线程修改共享变量，只有解开了锁才能有机会修改
- cas 体现的是无锁并发、无阻塞并发。因为没有使用 synchronized，所以先成功不会陷入阻塞，这是提高效率的因素之一。但是如果竞争激烈，重试必要频繁发生，这时反而会影响效率

**为什么无锁（乐观锁）效率高一些？**

- 无锁情况下，即使重试失败，线程始终再高速运行，而 synchronized 会让线程在没有获得锁时发生上下文切换进入阻塞
- 但是无锁情况下，因为要保持线程运行，需要 CPU 的额外支持，虽然没有阻塞，但是会因为没有分到时间片而进入可运行状态，最终还是会导致线程上下文切换。故线程数少于核心数时使用 cas 是合适的，但是当线程多起来后效率就低了





### 3.7.2 原子类

**1.原子整数**

- AtomicBoolean
- AtomicInteger
- AtomicLong

**2.原子引用**

- AtomicReference
- AtomicMarkableReference（布尔值标记）
- AtomicStampedReference（版本号标记）

**3.原子数组** 

- AtomicIntegerArray
- AtomicLongArray
- AtomicReferenceArray

**4.字段更新器**

- AtomicReferenceFieldUpdater
- AtomicIntegerFieldUpdater
- AtomicLongFieldUpdater

**5.原子累加器**

- IntegerAdder
- LongAdder





### 3.7.3 Unsafe

- 只能通过反射获取
- 由于能够直接操作内存，所以有可能出现不安全的操作，故称为 Unsafe
- Unsafe 是原子类中大量使用到的类 





## 3.8 不可变

### 3.8.1 享元模式

- 当需要重用数量有限的同一类对象时使用
- 包装类提供了 valueOf 方法，在某个范围内会重用对象，超过了这个范围才会创建新的对象
- 创建连接池可以降低开销减小服务的压力

**简单连接池实现：**

```java
public class PoolTest {
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


    Pool(int poolSize) {
        this.poolSize = poolSize;
        this.connections = new Connection[poolSize];
        this.states = new AtomicIntegerArray(new int[poolSize]);
        for (int i = 0; i < poolSize; i++) {
            // MockConnection 实现了 Connection 接口
            connections[i] = new MockConnection(String.format("连接-%d", i + 1));
        }
    }

    // 借连接
    public Connection borrow() {
        while (true) {
            for (int i = 0; i < poolSize; i++) {
                if (states.get(i) == 0) {
                    if (states.compareAndSet(i, 0, 1)) {
                        logger.debug("获取连接：{}", connections[i]);
                        return connections[i];
                    }
                }
            }
            // 如果没有空闲连接
            synchronized (this) {
                try {
                    logger.debug("没有空闲连接...");
                    this.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    // 还连接
    public void free(Connection connection) {
        for (int i = 0; i < poolSize; i++) {
            if (connections[i] == connection) {
                logger.debug("归还连接：{}", connection);
                states.set(i, 0);
                synchronized (this) {
                    logger.debug("有空闲连接了...");
                    this.notifyAll();
                }
                break;
            }
        }
    }
}
```





## 3.9 线程池

### 3.9.1 自定义线程池

```java
public class ThreadPoolTest {
    private static final Logger logger = LoggerFactory.getLogger(ThreadPoolTest.class);

    public static void main(String[] args) {
        ThreadPool pool = new ThreadPool(1, 1000, TimeUnit.MILLISECONDS, 1, (queue, task) -> {
            // 死等
            // queue.put(task);
            // 带超时的等待
            queue.offer(task, 1500, TimeUnit.MILLISECONDS);
            // 抛出异常
            // throw new RuntimeException("任务执行失败：" + task);
        });
        for (int i = 0; i < 3; i++) {
            int id = i;
            pool.execute(() -> {
                try {
                    Thread.sleep(1000L);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                logger.debug("t-{}", id + 1);
            });
        }
    }
}

@FunctionalInterface
interface RejectPolicy<T> {
    void reject(BlockingQueue<T> queue, T task);
}

class ThreadPool {
    private final Logger logger = LoggerFactory.getLogger(ThreadPool.class);

    // 任务队列
    private BlockingQueue<Runnable> taskQueue;

    // 线程集合
    private HashSet<Worker> workers = new HashSet<>();

    // 核心线程数
    private int coreSize;

    // 获取任务的超时时间
    private long timeout;

    // 时间单位
    private TimeUnit timeUnit;

    // 拒绝策略
    private RejectPolicy<Runnable> rejectPolicy;

    public ThreadPool(int coreSize, long timeout, TimeUnit timeUnit, int capacity, RejectPolicy<Runnable> rejectPolicy) {
        this.taskQueue = new BlockingQueue<>(capacity);
        this.coreSize = coreSize;
        this.timeout = timeout;
        this.timeUnit = timeUnit;
        this.rejectPolicy = rejectPolicy;
    }

    // 执行任务
    public void execute(Runnable task) {
        synchronized (workers) {
            // 当任务数没有超过核心，直接交给 worker 执行；如果超过则加入队列暂存
            if (workers.size() < coreSize) {
                Worker worker = new Worker(task);
                logger.debug("新增 worker：{}", worker);
                workers.add(worker);
                worker.start();
            } else {
                // taskQueue.put(task);
                // 队列满后
                taskQueue.tryPut(rejectPolicy, task);
            }
        }
    }

    class Worker extends Thread {
        private Runnable task;

        public Worker(Runnable task) {
            this.task = task;
        }

        @Override
        public void run() {
            super.run();
            // 执行任务
            // 当 task 不为空则执行任务；当 task 执行完毕在从任务队列获取任务并执行
            while (task != null || (task = taskQueue.poll(timeout, timeUnit)) != null) {
                try {
                    task.run();
                    logger.debug("正在执行任务：{}", task);
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    task = null;
                }
            }
            synchronized (workers) {
                logger.debug("worker：{} 被移除...", this);
                workers.remove(this);
            }
        }

        @Override
        public String toString() {
            return "Worker{" +
                    "task=" + task +
                    '}';
        }
    }

    @Override
    public String toString() {
        return "ThreadPool{" +
                "workers=" + workers +
                ", coreSize=" + coreSize +
                ", timeout=" + timeout +
                ", timeUnit=" + timeUnit +
                '}';
    }
}

class BlockingQueue<T> {

    private final Logger logger = LoggerFactory.getLogger(BlockingQueue.class);

    // 任务队列
    private Deque<T> queue = new ArrayDeque<>();

    // 容量
    private int capacity;

    // 锁
    private ReentrantLock lock = new ReentrantLock();

    // 生产者条件变量
    private Condition fullWaitSet = lock.newCondition();

    // 消费者条件变量
    private Condition emptyWaitSet = lock.newCondition();

    public BlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    // 获取大小
    public int size() {
        lock.lock();
        try {
            return queue.size();
        } finally {
            lock.unlock();
        }
    }

    // 带超时的阻塞获取
    public T poll(long timeout, TimeUnit unit) {
        lock.lock();
        try {
            // 统一转换成纳秒
            long nanos = unit.toNanos(timeout);
            while(queue.isEmpty()) {
                try {
                    // 返回的是剩余时间
                    if (nanos <= 0) {
                        return null;
                    }
                    nanos = emptyWaitSet.awaitNanos(nanos);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            T t = queue.removeFirst();
            fullWaitSet.signal();
            return t;
        } finally {
            lock.unlock();
        }
    }

    // 阻塞获取
    public T take() {
        lock.lock();
        try {
            while(queue.isEmpty()) {
                try {
                    emptyWaitSet.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            T t = queue.removeFirst();
            fullWaitSet.signal();
            return t;
        } finally {
            lock.unlock();
        }
    }

    // 阻塞添加
    public void put(T element) {
        lock.lock();
        try {
            while(queue.size() == capacity) {
                try {
                    logger.debug("等待加入任务队列：{}", element);
                    fullWaitSet.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            queue.addLast(element);
            logger.debug("加入任务队列：{}", element);
            emptyWaitSet.signal();
        } finally {
            lock.unlock();
        }
    }

    // 带超时时间阻塞添加
    public boolean offer(T element, long timeout, TimeUnit timeUnit) {
        lock.lock();
        try {
            long nanos = timeUnit.toNanos(timeout);
            while(queue.size() == capacity) {
                try {
                    logger.debug("等待加入任务队列：{}", element);
                    if (nanos <= 0) {
                        return false;
                    }
                    nanos = fullWaitSet.awaitNanos(nanos);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            queue.addLast(element);
            logger.debug("加入任务队列：{}", element);
            emptyWaitSet.signal();
            return true;
        } finally {
            lock.unlock();
        }
    }

    public void tryPut(RejectPolicy<T> rejectPolicy, T element) {
        lock.lock();
        try {
            // 判断队列是否已满
            if (queue.size() == capacity) {
                rejectPolicy.rject(this, element);
            } else {
                queue.addLast(element);
                logger.debug("加入任务队列：{}", element);
                emptyWaitSet.signal();
            }
        } finally {
            lock.unlock();
        }
    }
}
```





### 3.9.2 ThreadPoolExecutor

#### 1.线程池状态

ThreadPoolExecutor 使用 int 的高 3 位来表示线程池的状态，低 29 位表示线程数量。这样做的目的是将线程池状态与线程个数合二为一，这样就可以用一次 cas 原子操作进行赋值

|   状态名   | 高 3 位 | 接受任务 | 处理阻塞队列任务 |                       说明                        |
| :--------: | :-----: | :------: | :--------------: | :-----------------------------------------------: |
|  RUNNING   |   111   |    Y     |        Y         |                         -                         |
|  SHUTDOWN  |   000   |    N     |        Y         | 不会接受新的i任务，但是会处理阻塞队列中的剩余任务 |
|    STOP    |   001   |    N     |        N         |   会中断正在执行的任务，并抛弃阻塞队列中的任务    |
|  TIDYING   |   010   |    -     |        -         |    任务全部执行完毕，活动线程为 0 即将进入终结    |
| TERMINATED |   011   |    -     |        -         |                     终结状态                      |





#### 2.构造方法

|           类型           |      参数       |                说明                |
| :----------------------: | :-------------: | :--------------------------------: |
|           int            |  corePoolSize   |  核心线程数目（最多保留的线程数）  |
|           int            | maximumPoolSize |             最大线程数             |
|           long           |  keepAliveTime  |      生存时间（针对急救线程）      |
|         TimeUnit         |      unit       |      时间单位（针对急救线程）      |
| `BlockingQueue<Runnable>`  |    workQueue    |              阻塞队列              |
|      ThreadFactory       |  threadFactory  | 线程工厂（可以为线程创建时起名字） |
| RejectedExecutionHandler |     handler     |              拒绝策略              |





#### 3.常用工厂方法

（1）newFixedThreadPool

- 核心线程数等于最大线程数，即没有救急线程，因此也无需超时时间
- 阻塞队列时无界的，可以放任意数量的任务。适用于任务量已知但相对耗时的任务

（2）newCachedThreadPool

- 核心线程数为 0，最大线程数为 Integer.MAX_VALUE，救急线程的空闲生存时间是 60s。这意味着全部都是救急线程且 60s 后回收，救急线程可以无限创建
- 队列采用了 synchronousQueue 实现，特点是没有容量，没有线程来取是放不进去的（一手交钱，一首交货）
- 整个线程池表现为线程数会根据任务量不断增长没有上限，当任务执行完毕并空闲 1 分钟后释放线程。适合任务数比较密集但是每个任务执行时间较短的情况

（3）newSingleThreadExecutor

- 希望多个任务排队执行，线程数固定为 1，任务数多于 1 时，会放入无界队列排队。任务执行完毕时这个唯一的线程也不会被释放
- 如果任务执行失败抛出异常且没有补救措施时，会创建一个新的线程保证池的正常工作
- newSingleThreadExecutor 的线程个数始终为 1 不可修改，因为 FinalizableDelegateExecutorService 应用的是装饰器模式，对外只暴露了 ExecutorService 接口，因此不能调用 ThreadPoolExecutor 中特有的方法；newFixedThreadPool(1) 初始为 1之后还可以修改，因为对外暴露的是 ThreadPoolExecutor 对象，可以强转后调用 setCorePoolSize 等方法进行修改





#### 4.提交方法

```java
// 执行任务
void execute(Runnable command);

// 提交任务 task，用返回值 Future 获得任务执行结果
<T> Future<T> submit(Callable<T> task);

// 提交 task 中所有任务
<T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> task) throws InterruptedException;

// 提交 task 中所有任务，带有超时时间
<T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> task, long timeout, TimeUnit unit) throws InterruptedException;

// 提交 task 中所有任务，哪个任务先执行完毕就先返回此任务的执行结果，其他任务取消
<T> T invokeAny(Collection<? extends Callable<T>> task) throws InterruptedException, ExecutionException;

// 提交 task 中所有任务，哪个任务先执行完毕就先返回此任务的执行结果，其他任务取消，带超时时间
<T> T invokeAny(Collection<? extends Callable<T>> task, long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException;
```





#### 5.关闭线程池

```java
void shutdown();

// 保存未执行完的任务
List<Runnable> shutdownNow();

// 不在 RUNNING 状态的线程池，此方法会返回 true
boolean isShutdown();

// 线程池状态是否是 TERMINATED
boolean isTerminated();

// 调用 shutdown 后，由于调用线程并不会等待所有任务运行结束，因此如果它想在线程池 TERMINATED 后做些事情，可以使用此方法等待
boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException;
```





### 3.9.3 Tomcat 线程池

![image-20220705154941172](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/tomcat%E7%BA%BF%E7%A8%8B%E6%B1%A0.png)

- Tomcat 使用 LimitLatch 来限流，可以控制最大连接个数，类似 JUC 中的 Semaphore。
- Tomcat 线程池扩展了 ThreadPoolExecutor，行为稍有不同
- Acceptor 只负责接收新的 socket 连接
- Poller 只负责监听 socket channel 是否有可读的 I/O 事件，一旦可读则封装一个任务对象（socketProcessor）提交给 Executor 线程池处理
- Executor 线程池中的工作线程最终负责处理请求



#### 1.Connector 配置

![image-20220705160156893](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/tomcatConnector%E9%85%8D%E7%BD%AE.png)





#### 2.Executor 线程配置

![image-20220705160323855](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/tomcatExecutor%E7%BA%BF%E7%A8%8B%E9%85%8D%E7%BD%AE.png)





### 3.9.4 Fork/Join 线程池

- Fork/Join 是 JDK 1.7 加入的新的线程池实现，体现了分治思想，适用于能够进行任务拆分的 CPU 密集型运算
- 所谓的任务拆分就是将一个大任务拆分成算法上相同的小任务，直至不能拆分而可以直接求解
- Fork/Join 在分治的基础上加入了多线程，可以把每个任务的分解和合并交给不同的线程来完成，进一步提升运算效率
- Fork/Join 默认会创建与 CPU 核心数大小相同的线程池
- 提交给 Fork/Join 线程池的任务需要继承 RecursiveTask（有返回值）或 RecursiveAction（无返回值）

**简单使用:**

```java
public class ForkTest1 {
    private static final Logger logger = LoggerFactory.getLogger(ForkTest1.class);

    public static void main(String[] args) {
        ForkJoinPool pool = new ForkJoinPool(4);
        logger.debug("{}", pool.invoke(new Task(5)));
    }
}

class Task extends RecursiveTask<Integer> {
    private int n;

    public Task(int n) {
        this.n = n;
    }

    @Override
    protected Integer compute() {
        if (n == 1) {
            return 1;
        }
        Task task = new Task(n - 1);
        // 让一个线程去执行任务
        task.fork();
        // 获取任务结果
        return n + task.join();
    }
}
```





## 3.10 JUC 工具

### 3.10.1 AQS 原理

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





### 3.10.2 Reentrantlock

![image-20220705170923776](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/Reentrantlock%E7%BB%A7%E6%89%BF%E5%85%B3%E7%B3%BB.png)

#### 1.加锁解锁流程

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



#### 2.可重入原理（略）

-  主要可以概括为加锁时让 state 自增，释放时让 state 自减





### 3.10.3 读写锁

- 当读操作远远写操作时，可以使用读写锁让读-读可以并发，以此提高性能

#### 1.ReentrantReadWriteLock

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





#### 2.StampedLock

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





### 3.10.4 Semaphore 原理

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





### 3.10.5 CountdownLatch

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





### 3.10.6 CyclicBarrier

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





### 3.10.7 ConcurrentHashMap

- JDK 7：在并发情况下，HashMap 在扩容时有可能会发生并发死链
- JDK 8：将扩容算法做了调整，不再将元素加入链表头，而是保持与扩容前一样的顺序，但不意味着能够在多线程环境下安全扩容（可能出现扩容丢数据）





### 3.10.8 Queue

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





### 3.10.9 线程安全集合类概述

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





---





# 4.同步模式

## 4.1 保护性暂停

即 Guarded Suspension，用在一个线程等待另一个线程的执行结果，要点如下：

- 有一个结果要从一个线程传递到另一个线程，让它们关联同一个 GuardedObject
- 如果有结果不断从一个线程到拎一个线程，那么可以使用消息队列（生产者/消费者）
- JDK 中，join 和 Future 的实现就是采用此模式，因为要等到另一方的结果，所以归类到同步模式





### 4.1.1 实例

**1.保护性暂停使用实例：**

```java
public class Guard {

    private static final Logger logger = LoggerFactory.getLogger(Guard.class);

    public static void main(String[] args) {
        GuardedObject guardedObject = new GuardedObject();
        new Thread(() -> {
            // 等待结果
            logger.debug("等待结果...");
            List<String> list = (List<String>) guardedObject.get(2000);
            logger.debug("结果为：{}", list);
        }, "thread-guard").start();

        new Thread(() -> {
            logger.debug("执行下载...");
            try {
                List<String> lines = Download.download();
                guardedObject.complete(lines);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }, "thread-download").start();
    }
}

/**
 * 保护性暂停
 */
class GuardedObject {
    private static final Logger logger = LoggerFactory.getLogger(GuardedObject.class);

    // 结果
    private Object response;

    // 获取结果
    public Object get(long timeout) {
        synchronized (this) {
            // 等待的起始时间
            long begin = System.currentTimeMillis();
            // 总共经历的时间
            long passTime = 0;

            // 没有结果时等待
            while(response == null) {
                // 这一轮应该等待的时间
                long waitTime = timeout - passTime;
                if (waitTime <= 0) {
                    logger.debug("等待超时！");
                    break;
                }
                try {
                    // 防止虚假唤醒后还是等待 timeout 才超时，使用 timeout - passTime 计算剩余等待的时间
                    this.wait(waitTime);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                passTime = System.currentTimeMillis() - begin;
            }
            return response;
        }
    }

    // 产生结果
    public void complete(Object response) {
        synchronized (this) {
            this.response = response;
            this.notifyAll();
        }
    }
}
```



**2.辅助以上代码的下载类**

```java
public class Download {
    public static void main(String[] args) throws IOException {
        System.out.println(download());
    }

    public static List<String> download() throws IOException {
        HttpURLConnection conn = (HttpURLConnection) new URL("https://www.baidu.com").openConnection();
        List<String> lines = new ArrayList<>();

        try(BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
            String line;

            while ((line = reader.readLine()) != null) {
                lines.add(line);
            }
        }
        return lines;
    }
}
```





### 4.1.2 优化

**保护性暂停改进，模拟送信过程**

```java
public class MessageMiddleware {
    public static void main(String[] args) throws InterruptedException {
        for (int i = 0; i < 3; i++) {
            new People().start();
        }
        Thread.sleep(1000);
        for (Integer id : MessageBox.getIds()) {
            new PostMan(id, String.format("内容：内容%d", id)).start();
        }
    }
}

/**
 * 用户
 */
class People extends Thread {
    private static final Logger logger = LoggerFactory.getLogger(People.class);

    @Override
    public void run() {
        super.run();
        // 收信
        GuardObject2 guardObject = MessageBox.createGuardedObject();
        logger.debug("收信 id ：{}", guardObject.getId());
        Object mail = guardObject.get(2000);
        logger.debug("收到信，内容为：{}", mail);
    }
}


/**
 * 快递员
 * 一个快递员对应一个用户（非一一对应需要使用生产者-消费者模式）
 */
class PostMan extends Thread {
    private static final Logger logger = LoggerFactory.getLogger(PostMan.class);

    private int id;
    private String message;

    public PostMan(int id, String message) {
        this.id = id;
        this.message = message;
    }

    @Override
    public void run() {
        super.run();
        GuardObject2 guardObject = MessageBox.getMessage(id);
        logger.debug("送信 id：{}，内容：{}", id, message);
        guardObject.complete(message);
    }
}


/**
 * 信箱
 */
class MessageBox {
    // 需要使用线程安全的实现，即 Hashtable
    private static Map<Integer, GuardObject2> boxes = new Hashtable<>();

    private static int id = 1;

    // 产生一个唯一的自增 id，由于自增不是原子性操作，所以要加上 synchronized 保证线程安全
    private static synchronized int generateId() {
        return id++;
    }

    public static GuardObject2 createGuardedObject() {
        GuardObject2 go = new GuardObject2(generateId());
        boxes.put(go.getId(), go);
        return go;
    }

    // 获取所有信件的 id
    public static Set<Integer> getIds() {
        return boxes.keySet();
    }

    // 通过 id 获取信件
    public static GuardObject2 getMessage(int id) {
        // 注意此处要用 remove 在返回结果的同时删除对应的信件
        return boxes.remove(id);
    }

}

/**
 * 保护性暂停
 */
class GuardObject2 {
    private static final Logger logger = LoggerFactory.getLogger(GuardedObject.class);

    // 标识 GuardObject2
    private final int id;

    public GuardObject2(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    // 结果
    private Object response;

    // 获取结果
    public Object get(long timeout) {
        synchronized (this) {
            // 等待的起始时间
            long begin = System.currentTimeMillis();
            // 总共经历的时间
            long passTime = 0;

            // 没有结果时等待
            while(response == null) {
                // 这一轮应该等待的时间
                long waitTime = timeout - passTime;
                if (waitTime <= 0) {
                    logger.debug("等待超时！");
                    break;
                }
                try {
                    // 防止虚假唤醒后还是等待 timeout 才超时，使用 timeout - passTime 计算剩余等待的时间
                    this.wait(waitTime);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                passTime = System.currentTimeMillis() - begin;
            }
            return response;
        }
    }

    // 产生结果
    public void complete(Object response) {
        synchronized (this) {
            this.response = response;
            this.notifyAll();
        }
    }
}
```





## 4.2 顺序控制

### 4.2.1 wait

**使用 wait 调整线程执行顺序：**

```java
public class SequentialControl1 {
    private static final Logger logger = LoggerFactory.getLogger(SequentialControl1.class);
    private static Object lock = new Object();
    private static boolean t2runned = false;

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            synchronized (lock) {
                while (!t2runned) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                logger.debug("t1...");
            }
        }, "t1");

        Thread t2 = new Thread(() -> {
            synchronized (lock) {
                logger.debug("t2...");
                t2runned = true;
                lock.notify();
            }
        }, "t2");

        t1.start();
        t2.start();
    }
}
```





### 4.2.2 park

**使用 park 调整线程执行顺序：**

```java
public class SequentialControl2 {
    private static final Logger logger = LoggerFactory.getLogger(SequentialControl2.class);
    private static Object lock = new Object();
    private static boolean t2runned = false;

    public static void main(String[] args) {
        Thread t1 = new Thread(() -> {
            LockSupport.park();
            logger.debug("t1...");
        }, "t1");

        Thread t2 = new Thread(() -> {
            logger.debug("t2...");
            LockSupport.unpark(t1);
        }, "t2");

        t1.start();
        t2.start();
    }
}
```





## 4.3 交替输出

### 4.3.1 标记

**使用标记实现交替输出：**

```java
public class AlternateControl {
    public static void main(String[] args) {
        WaitNotify waitNotify = new WaitNotify(1, 5);
        String[] array = {"a", "b", "c"};

        for (int i = 0; i < array.length; i++) {
            int id = i;
            new Thread(() -> {
                waitNotify.print(array[id], id + 1, (id + 1) % 3 + 1);
            }, String.format("t-%d", i+1)).start();
        }
    }
}

/**
 * 输出内容     等待标记    下个标记
 *    a           1         2
 *    b           2         3
 *    c           3         1
 */
class WaitNotify {
    private final Logger logger = LoggerFactory.getLogger(WaitNotify.class);

    // 等待标记
    private int flag;

    private int loopNum;

    public WaitNotify(int flag, int loopNum) {
        this.flag = flag;
        this.loopNum = loopNum;
    }

    public void print(String string, int waitFlag, int nextFlag) {
        for (int i = 0; i < loopNum; i++) {
            synchronized (this) {
                while(flag != waitFlag) {
                    try {
                        this.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                logger.debug(string);
                flag = nextFlag;
                this.notifyAll();
            }
        }
    }
}
```





### 4.3.2 await 和 signal

**使用 await 和 signal 实现交替输出：**

```java
public class AlternateControl2 {
    private static final Logger logger = LoggerFactory.getLogger(AlternateControl2.class);

    public static void main(String[] args) throws InterruptedException {
        AwaitSignal awaitSignal = new AwaitSignal(5);
        String[] array = {"a", "b", "c"};
        Map<String, Condition> map = new Hashtable<>();

        for (int i = 0; i < array.length; i++) {
            map.put(array[i], awaitSignal.newCondition());
            int id = i;
            new Thread(() -> {
                awaitSignal.print(array[id], map.get(array[id]), map.get(array[id == 2 ? 0 : id + 1]));
            }, String.format("t-%d", i+1)).start();
        }

        Thread.sleep(1000);
        awaitSignal.lock();
        try {
            logger.debug("开始...");
            map.get("a").signal();
        } finally {
            awaitSignal.unlock();
        }
    }
}

class AwaitSignal extends ReentrantLock {
    private final Logger logger = LoggerFactory.getLogger(WaitNotify.class);

    private int loopNum;

    public AwaitSignal(int loopNum) {
        this.loopNum = loopNum;
    }

    public void print(String string, Condition current, Condition next) {
        for (int i = 0; i < loopNum; i++) {
            lock();
            try {
                current.await();
                logger.debug(string);
                next.signal();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                unlock();
            }
        }
    }
}
```





### 4.3.3 park 和 unpark

**使用 park 和 unpark 实现交替输出：**

```java
public class AlternateControl3 {
    private static final Logger logger = LoggerFactory.getLogger(AlternateControl2.class);

    public static void main(String[] args) throws InterruptedException {
        ParkUnpark parkUnpark = new ParkUnpark(5);
        String[] array = {"a", "b", "c"};
        Map<String, Thread> map = new Hashtable<>();

        for (int i = 0; i < array.length; i++) {
            int id = i;
            Thread cur = new Thread(() -> {
                parkUnpark.print(array[id], map.get(array[id == 2 ? 0 : id + 1]));
            }, String.format("t-%d", i+1));
            map.put(array[i], cur);
            cur.start();
        }

        LockSupport.unpark(map.get("a"));
    }
}

class ParkUnpark {
    private final Logger logger = LoggerFactory.getLogger(WaitNotify.class);

    private int loopNum;

    public ParkUnpark(int loopNum) {
        this.loopNum = loopNum;
    }

    public void print(String string, Thread next) {
        for (int i = 0; i < loopNum; i++) {
            LockSupport.park();
            logger.debug(string);
            LockSupport.unpark(next);
        }
    }
}
```





---





# 5.异步模式

## 5.1 生产者-消费者

- 与前面同步模式中的保护性暂停不同，生产者-消费者不限制产生结果的线程和消费结果的线程一一对应
- 消费队列可以用来平衡生产和消费的线程资源
- 生产者仅仅负责产生数据结果，不关心数据应该如何处理，而消费者专心处理结果数据
- 消息队列时有容量限制的，满时不会再加入数据，空时不会再消耗数据，JDK 中各种阻塞队列就是采用的这种模式 

```java
public class ProducerConsumer {
    private static final Logger logger = LoggerFactory.getLogger(ProducerConsumer.class);

    public static void main(String[] args) {
        MessageQueue mq = new MessageQueue(2);

        for (int i = 0; i < 3; i++) {
            int id = i;
            new Thread(() -> {
                mq.put(new Message(id, String.format("value-%d", id)));
            }, String.format("生产者-%d", i+1)).start();
        }

        new Thread(() -> {
            while (true) {
                try {
                    Thread.sleep(1000);
                    Message message = mq.take();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "消费者").start();
    }
}

/**
 * 消息队列，java 线程间通信
 */
class MessageQueue {

    private static final Logger logger = LoggerFactory.getLogger(MessageQueue.class);

    // 消息队列的容量
    private int capacity;
    // 消息的队列集合
    private LinkedList<Message> list = new LinkedList<>();

    public MessageQueue(int capacity) {
        this.capacity = capacity;
    }

    // 获取消息
    public Message take() {
        // 检查队列是否为空
        synchronized (list) {
            while (list.isEmpty()) {
                try {
                    logger.debug("队列为空，消费者线程等待中...");
                    list.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            Message message = list.removeFirst();
            logger.debug("已经取得消息，内容：{}", message.toString());
            list.notifyAll();
            return message;
        }
    }

    // 存入消息
    public void put(Message message) {
        synchronized (list) {
            while(list.size() == capacity) {
                try {
                    logger.debug("队列已满，生产者线程等待...");
                    list.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            logger.debug("已经产生消息，内容：{}", message.toString());
            // 将消息加入队列尾部
            list.addLast(message);
            // 唤醒正在等待的线程
            list.notifyAll();
        }
    }
}

/**
 * 加入 final 保证这是线程安全的
 */
final class Message {
    private int id;
    private Object value;

    public Message(int id, Object value) {
        this.id = id;
        this.value = value;
    }

    public int getId() {
        return id;
    }

    public Object getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", value=" + value +
                '}';
    }
}
```





## 5.2 工作线程

- 让有限的工作线程来轮流异步处理无限多的任务。
- 也可以将其分类为分工模式，典型的实现就是线程池，体现了经典设计模式中的享元模式
- 固定大小的线程池会出现饥饿现象，不同的任务类型应该使用不同的线程池，这样能够避免饥饿且提升效率。
- 对于 CPU 密集型运算。通常使用 CPU 核数 + 1 能够实现最优的 CPU 利用率。加 1 是保证当前线程由于页缺失故障（操作系统）或其他原理导致暂停时，额外的线程能够补上保证 CPU 时钟周期不被浪费
- 对于 IO 密集型运算（包括远程 RPC 调用，数据库操作等），经验公式为线程数 = 核数 * 期望 CPU 利用率 * 总时间（CPU 计算时间 + 等待时间）/ CPU 计算时间





## 5.3 任务调度线程池

- 在任务调度线程池加入之前，可以使用 Timer 来实现定时功能，Timer 的优点在于简单易用，但是由于所有任务都是由一个线程来调度，因此所有任务都是串行的。同一时间只能有一个任务执行，异常或延迟都会影响后续任务
- 应当使用 Executors.newScheduledThreadPool 代替 Timer 实现任务调度线程池