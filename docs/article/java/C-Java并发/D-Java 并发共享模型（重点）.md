---
title: "Java 并发共享模型（重点）"
shortTitle: "D-Java 并发共享模型（重点）"
description: "Java 并发共享模型（重点）"
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
  text: "Java 并发共享模型（重点）"
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
  title: "Java 并发共享模型（重点）"
  description: "Java 并发共享模型（重点）"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Java 并发共享模型（重点）

## 1.管程

### 1.1 共享带来的问题

- 一个程序运行多个线程本身是没有问题的，问题在于多个线程访问共享资源，但这是对多个线程对共享资源读写操作时发生指令交错情况而言的
- 临界区：一段代码块内如果存在对共享资源的多线程读写操作，那么称这段代码块为临界区
- 竞态条件：多个线程在临界区内执行，由于代码的执行序列不同而导致结果无法预测，那么就称发生了竞态条件





## 2.Synchronized

### 2.1 基本用法

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





### 2.2 方法上的 synchronized

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





## 3.变量的线程安全分析

### 3.1 成员变量和静态变量

- 如果它们没有共享，则是线程安全的
- 如果它们共享，那么要根据它们的状态是否能够被改变来判断
  - 如果只有读操作，则是线程安全的
  - 如果有读写操作，则这段代码是临界区，需要考虑线程安全





### 3.2 局部变量

- 局部变量是线程安全的
- 但是局部变量引用的对象未必是线程安全的
  - 如果该对象没有逃离方法的作用范围，则是线程安全的
  - 如果该对象逃离了方法的作用范围，则需要考虑线程安全
- 父类的局部变量要是暴露引用，其子类使用时可能会有线程安全问题（子类覆盖了父类的方法，并且在其中创建了新线程并使用了某个变量的引用），此时应该将父类方法从 public 改成 private 防止父类方法被覆盖。此外还可以考虑在方法上加上 final 关键字防止子类覆盖





### 3.3 线程安全类

- 线程安全类中的方法大多数时线程安全的。不可变类（如：String、Integer）时线程安全的，因为其内部的状态（属性）是不可变的
- 但是这些线程安全的方法组合在一起时可能出现线程安全问题
- 例如 Hashtable 的 get 和 put 方法都是线程安全的，但是先判断 get 的 key 是否为空再 put 的话，此时倘若有两个线程，一个先 get，另一个 get 后未等到 先前的线程 put 就先把自己的结果 put，就会导致之后第一个 put 后会把第二个先 put 的覆 盖掉，从而导致线程安全问题





## 4.对象头 

### 4.1 普通对象头

![image-20220701093956420](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/%E6%99%AE%E9%80%9A%E5%AF%B9%E8%B1%A1%E5%A4%B4.png)





### 4.2 数组对象头

![image-20220701094022990](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E5%A4%B4.png)





### 4.3 Mark Word

![image-20220701094445330](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E5%B9%B6%E5%8F%91/20230209/MarkWord.png)





## 5.Monitor/轻量级锁/偏向锁

### 5.1 Monitor（重量级锁）

- Monitor 操作系统层面实现的锁，称为监视器或管程
- Java 中的 synchronized 在上锁时会关联 Monitor，成为 Monitor 的 owner
- 其他线程想要获取共享资源时就会访问 Monitor，查看其是否有 owner，如果有则进入 blocked 状态，进入阻塞队列
- 锁释放掉后阻塞队列中的线程才能成为 Monitor 的 owner





### 5.2 轻量级锁

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





### 5.3 偏向锁

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





### 5.4 锁消除

- JIT 即时编译器会优化字节码中不需要加的锁，即去除加锁的操作。
- JIT 是默认开启的，禁用可以加入 VM 参数：-XX:-EliminateLocks





## 6.Java 内存模型

- JMM 定义了主存、工作内存等的抽象概念，底层对应着 CPU、寄存器、缓存、硬件内存、CPU 指令优化等
- JMM 体现在以下几个方面：
  - 可见性：保证指令不会受 CPU 缓存的影响
  - 原子性：保证指令不会受到线程上下文切换的影响
  - 有序性：保证指令不会受 CPU 指令并行优化的影响





### 6.1 可见性

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





### 6.2 原子性

- volatile 只能保证可见性但是不能保证没有指令交错，即在多个线程同时修改一个变量时，还是有可能读到未修改前的值
- volatile 适用于一个线程修改变量而多个线程读取的情况
- synchronized 可以同时保证原子性和可见性





### 6.3 有序性

- JVM 会在不影响正确性的前提下，调整语句的执行顺序，这也称为指令重排
- 多线程下的指令重排会影响正确性
- 使用 volatile 修饰变量可以避免这个变量之前的指令重排序
- synchronized 只有在完全保护一个变量的情况下才能保证逻辑上的有序性（即实际上还是重排了，但是被同步块保护了，从最终结果来说还是有序的），如果一个变量在同步代码块之外被修改了，还是有可能出现指令重排的情况





### 6.4 double-checked locking

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





### 6.5 happens-before

- happens-before 规定了对共享变量的写操作对其他线程的读操作可见，它是可加性与有序性的一套规则总结。抛开此规则时，JMM 不能保证一个线程对共享变量的写对于其他线程对该共享变量的读可见
- 线程解锁之前对变量的写，对于接下来加锁的线程对该变量的读可见
- 线程对 volatile 变量的写，对于接下来其他线程对该变量的读可见
- 线程 start 前对变量的写，对该线程开始之后对该变量的读可见
- 线程结束前对变量的写，对于其他线程得知它结束后的读可见（比如其他线程调用 t1.Alive() 或 t1.join() 等待他结束）
- 线程 t1 打断 t2（interrupt）前对变量的写，对于其他线程得知 t2 被打断后对该变量的读可见
- 对变量的默认值（0，false，null）的写，对于其他线程对该变量的读可见





## 7.无锁并发

###  7.1 cas 与 volatile

- cas 即 compare and set，这必须是原子性的操作，cas 必须借助 volatile 才能读取到共享变量的最新值来实现比较-交换的效果
- cas 的底层是 lock cmpxchg 指令（x86 架构），在单核 CPU 和多核 CPU 下都能保证比较-交换的原子性。在多核状态下，某个核执行到带 lock 的指令时，CPU 会让总线锁住，当这个核把此指令执行完毕再开启总线，这个过程中不会被线程的调度机制所打断，保证了多个线程对内存操作的准确性（原子性）
- cas 是基于乐观锁的思想，即用最乐观的估计，不怕其他线程修改共享变量，即使修改了也是重试；synchronized 是基于悲观锁的思想，即用最悲观的估计，防范这其他线程修改共享变量，只有解开了锁才能有机会修改
- cas 体现的是无锁并发、无阻塞并发。因为没有使用 synchronized，所以先成功不会陷入阻塞，这是提高效率的因素之一。但是如果竞争激烈，重试必要频繁发生，这时反而会影响效率

**为什么无锁（乐观锁）效率高一些？**

- 无锁情况下，即使重试失败，线程始终再高速运行，而 synchronized 会让线程在没有获得锁时发生上下文切换进入阻塞
- 但是无锁情况下，因为要保持线程运行，需要 CPU 的额外支持，虽然没有阻塞，但是会因为没有分到时间片而进入可运行状态，最终还是会导致线程上下文切换。故线程数少于核心数时使用 cas 是合适的，但是当线程多起来后效率就低了





### 7.2 原子类

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





### 7.3 Unsafe

- 只能通过反射获取
- 由于能够直接操作内存，所以有可能出现不安全的操作，故称为 Unsafe
- Unsafe 是原子类中大量使用到的类 





## 8.不可变

### 8.1 享元模式

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





## 9.线程池

### 9.1 自定义线程池

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





### 9.2 ThreadPoolExecutor

:::info 说明

原理简单来说就是一个 **线程集合 WorkerSet** 和一个 **阻塞队列 WorkQueue** 相互配合

线程会将 **任务** 放到 WorkQueue 中，WorkerSet 中的线程会不断地从队列中获取任务并执行

:::



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

|           类型            |      参数       |                说明                |
| :-----------------------: | :-------------: | :--------------------------------: |
|            int            |  corePoolSize   |  核心线程数目（最多保留的线程数）  |
|            int            | maximumPoolSize |             最大线程数             |
|           long            |  keepAliveTime  |      生存时间（针对急救线程）      |
|         TimeUnit          |      unit       |      时间单位（针对急救线程）      |
| `BlockingQueue<Runnable>` |    workQueue    |              阻塞队列              |
|       ThreadFactory       |  threadFactory  | 线程工厂（可以为线程创建时起名字） |
| RejectedExecutionHandler  |     handler     |              拒绝策略              |





#### 3.常用工厂方法

**三种类型：**

1. newFixedThreadPool
   - 核心线程数等于最大线程数，即没有救急线程，因此也无需超时时间
   - 阻塞队列时无界的，可以放任意数量的任务。适用于任务量已知但相对耗时的任务

2. newCachedThreadPool
   - 核心线程数为 0，最大线程数为 Integer.MAX_VALUE，救急线程的空闲生存时间是 60s。这意味着全部都是救急线程且 60s 后回收，救急线程可以无限创建
   - 队列采用了 synchronousQueue 实现，特点是没有容量，没有线程来取是放不进去的（一手交钱，一首交货）
   - 整个线程池表现为线程数会根据任务量不断增长没有上限，当任务执行完毕并空闲 1 分钟后释放线程。适合任务数比较密集但是每个任务执行时间较短的情况

3. newSingleThreadExecutor
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





#### 6.小结

:::warning 注意

不推荐使用 Executors 直接创建线程，因为内部的 BlockingQueue 默认实现可能会导致 OOM

:::

**推荐创建线程池的方式：**

1. 直接使用 ThreadPoolExecutor 自定义线程池，注意要规避无限创建线程或者频繁创建与销毁线程的问题
2. 使用工具库，比如：
   1. commons-lang3
   2. guava
   3. Spring 配置线程池

**配置线程池时注意：**

1. CPU密集型: 尽可能少的线程，Ncpu+1
2. IO密集型: 尽可能多的线程, Ncpu*2，比如数据库连接池
3. 混合型: CPU密集型的任务与IO密集型任务的执行时间差别较小，拆分为两个线程池；否则没有必要拆分。







### 9.3 Tomcat 线程池

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





### 9.4 Fork/Join 线程池

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
