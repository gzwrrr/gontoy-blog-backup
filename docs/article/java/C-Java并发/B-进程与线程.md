---
title: "进程与线程"
shortTitle: "B-进程与线程"
description: "进程与线程"
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
  text: "进程与线程"
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
  title: "进程与线程"
  description: "进程与线程"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 进程与线程

[[toc]]

## 1.进程

- 加载指令、管理内存、管理 IO
- 当程序代码从磁盘加载到内存便开启了一个进程
- 进程是一个程序的实例，大多数程序可以同时运行多个进程
- 进程拥有共享的资源：内存、空间等，共其内部的线程共享
- 进程间的通信较为复杂，同一台计算机的进程通信成为 IPC；不同计算机之间的进程通信需要通过网络并遵守共同的协议（如：HTTP）





## 2.线程

- 一个进程内可以分为多个线程
- 一个线程就是一个指令流，线程会将这个指令流中的命令一条条地交给 CPU 执行
- Java 中，线程作为最小的调度单位，进程作为资源分配的最小单位
- 在 Windows 中，进程是不活动的，只是作为线程的容器

- 多个线程可以访问同一个共享变量
- 线程的上下文切换的成本一般比进程的上下文切换低





## 3.多线程

**1.值得注意的是：**

- IO 操作是不占用 CPU 的，只是我们拷贝文件使用的是阻塞 IO，这时即使不占用 CPU 也还是要等待 IO 结束，没有充分利用到线程
- 这种情况下可以使用非阻塞 IO 或异步 IO 解决

**2.优势：**

- 可以实现异步操作，避免阻塞
- 在 CPU 是多核的情况下可以提高程序的效率
- 单核 CPU 下多线程一般会比单线程慢，因为多线程还要切换不同线程，这也是一个耗时的操作。但是这不意味着单核下多线程没有用，因为轮流切换线程可以任务使不同任务得以进行，不至于让单个程序一直占用 CPU





## 4.创建线程

**三种方式创建线程：**

1. 继承Thread 类

2. 实现 Runnable 接口

3. 实现 `Callable<T>` 接口，配合 `FutureTask<V>` 类

   - FutureTask 实现了 RunnableFuture 接口，而 RunnableFuture 继承了 `Runnable` 接口和 `Future<V>` 接口（==接口可以多继承，类不行==），这可以返回一个任务的执行结果（Runnable 没有返回值），多线程操作间更加方便
   - FutureTask 可以接收 Callable 类型的参数（Callable 与 Runnable 类似，前者比后者多了返回值并且可以抛出异常），以此来处理有返回值的情况
   - Callable 接口中只有一个 call 方法，并且使用了 @FunctionalInterface 注解

   **【注意】手动创建线程时，一般更推荐使用 Runnable 接口的创建方式，，因为这让 Runnable 任务脱离了 Thread 的继承体系，即：使得任务和线程创建分开（意味着更灵活），并且常常使用 lambda 表达式简化。此外，使用 Runnable 还更容易与线程池等高级 API 结合**

4. 使用 **线程池** 创建线程，这也是实际生产中的一般选择





### 4.1 Thread

**直接使用 Thread 创建线程：**

缺点：Java 中只能单继承，不够灵活

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





### 4.2 Runnable

**1.使用 Runnable 接口创建线程：**

优点：使用接口的形式提高了灵活度

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



### 4.3 FutureTask 

**使用 FutureTask 方式创建：**

Callable 和 Runnable 的区别是：可以获取返回值

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





### 4.4 线程池创建线程

Executors 中还包含了很多类型的线程池。一般实际生产中不会直接使用 Executors 来创建线程池，因为容易增大开销（这里不展开）

```java
public class Thread implements Runnable {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        executorService.execute(new Thread());
    }
    @Override
    public void run() {
        System.out.println("thread run...");
    }
}
```







## 5.线程运行原理

### 5.1 栈与栈帧

- JVM 由堆、栈、方法区组成，其中栈内存就是给线程用的，每启动一个线程，虚拟机就会为其分配一块栈内存
- 每个栈由多个栈帧（Frame）组成，对应着每次方法调用时所占的内存
- 每个线程只能有一个活动栈帧，对应着当前执行的方法
- 不同的线程间的栈内存是互不干扰的





### 5.2 线程上下文切换

**1.切换时机：**

- 线程的 CPU 时间片用完
- 执行垃圾回收时
- 有更高优先级的线程需要运行
- 线程自己调用了 sleep、yield、wait、join、park、synchronized、lock等方法

**2.切换发生时：**

- 需要由操作系统保存当前线程的状态并恢复另一个线程的状态，Java 中对应的概念就是程序计数器，他的作用是记住下一条 jvm 指令的执行地址，这是线程私有的
- 状态包括程序计数器、虚拟机栈中每个栈帧的信息，如局部变量、操作数栈、返回地址等
- 线程上下文频繁地切换会影响性能





## 6.线程的主要方法

### 6.1 run 与 start

- 创建线程后可以直接调用 run 方法，但是这样执行者就变成了 main 线程，没有提高性能，只有使用 start 方法才能由创建的线程执行该任务
- start 方法是不能重复调用的





### 6.2 sleep 与 yield

- sleep 会让当前线程从 Runnable 进入 Time waiting 阻塞状态，其他线程可以使用 interrupt 方法打断正在睡眠的线程，这时 sleep 会抛出 InterruptException
- 睡眠结束后的线程未必会立刻得到执行；建议使用 TimeUnit 的 sleep 代替 Thread 的 sleep 来获得更好的可读性
- yield 会让当前线程从 Running 进入 Runnable 就绪状态，然后调度执行其他同优先级的线程，此时如果没有同优先级的线程，那么不能保证能让当前线程暂停的效果。yield 具体的实现依赖于操作系统的任务调度器
- 调度器只会把时间片分给 Runnable 状态的线程而不会分给 Time Waiting 状态的线程
- sleep 会有一个真正的休眠时间，yield 在没有其他线程的情况下还是会继续本线程
- 线程优先级会提示（hint）调度器优先调度优先级高的线程，但这仅仅是一个提示，调度器是可以忽略掉的。如果 CPU 比较忙，那么优先级高的线程会获得更加多的时间片，但 CPU 闲时，优先级几乎没作用





### 6.3 join

- 等待调用 join 的线程执行完成后再继续执行当前线程的
- join 是用来同步线程的
- join 可以带参数，倘若参数设置的时长小于线程的总时常，那么就会提前打断线程；倘若设置的时常大于线程的总时常，那么在线程任务完成后会直接结束而不是继续等待，这也是带参数时和 sleep 方法的区别 
- join 方法使用了保护性暂停模式（详见第三大点）





### 6.4 interrupt 与 park

- interrupt 方法用于打断线程，见 1.7 所示
- park 方法可以让线程停止，之后的代码不会执行，用 interrupt 可以打断这种状态
- 注意，在打断标记为 true 时，park 方法会失效，将打断标记置为真即可（使用interrupted，见 1.7 解释）





### 6.5 stop、suspend 与 resume

- 三个方法都不建议使用，已经过时，容易破坏同步代码块，造成线程死锁。其都有对应的解决方法
- stop 方法用于立即停止线程运行；suspend 方法用于挂起（暂停）线程运行；resume 方法用于恢复线程运行。





### 6.6 wait / notify

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





### 6.7 LockSupport 的 park 和 unpark

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





## 7.线程停止的方法

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





## 8.主线程与守护线程

- 默认情况下，Java 进程需要等待所有的线程都运行结束才会结束
- 有一种特殊的线程叫守护线程，只要其他非守护线程结束了，就会强制结束（即使守护线程的代码没有执行完也会强制结束）
- 使用 setDaemon 方法（参数为 true）可以将线程设置成守护线程
- 垃圾回收器线程就是一种守护线程。Tomcat 中的 Acceptor 和 Poller 线程都是守护线程，所以 Tomcat 在收到 shutdown 命令后，不会等待它们处理完当前请求





## 9.线程的状态

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



**3.线程池的状态：**

1. RUNNING：线程池正常运行，可以接受和处理任务
2. SHUTDOWN：当调用 `shutdown()` 方法时线程池就会进入该状态，表示线程池关闭，此时不会接受新的任务，但是会把队列中的任务处理完
3. STOP：当调用 `shutdownnow()` 方法时线程池就进入 STOP 状态，表示线程池处于停止状态，此状态下线程池不会接受新任务，也不会处理队列中的任务，并且正常运行的线程也会被中断
4. TIDYING：线程池中没有线程运行后，状态就会自动变成 TIDYING，并且会调用 `terminated()` 方法，该方法是空方法，需要自己实现
5. TERMINATED：`terminated()`  方法执行完后，线程池的状态就变成了 TERMINATED

