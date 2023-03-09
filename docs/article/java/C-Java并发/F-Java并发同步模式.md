---
title: "Java 并发同步模式"
shortTitle: "F-Java 并发同步模式"
description: "Java 并发同步模式"
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
  text: "Java 并发同步模式"
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
  title: "Java 并发同步模式"
  description: "Java 并发同步模式"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 并发同步模式


[[toc]]

## 1.保护性暂停

即 Guarded Suspension，用在一个线程等待另一个线程的执行结果，要点如下：

- 有一个结果要从一个线程传递到另一个线程，让它们关联同一个 GuardedObject
- 如果有结果不断从一个线程到拎一个线程，那么可以使用消息队列（生产者/消费者）
- JDK 中，join 和 Future 的实现就是采用此模式，因为要等到另一方的结果，所以归类到同步模式





### 1.1 实例

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





### 1.2 优化

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





## 2.顺序控制

### 2.1 wait

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





### 2.2 park

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





## 3.交替输出

### 3.1 标记

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





### 3.2 await 和 signal

:::info wait 和 await 的区别

在Java中，wait和await都是用于并发编程中的线程间通信的关键字，但是它们的具体用法和作用略有不同。

**wait：**

wait()是Object类中定义的方法，它会让当前线程释放对象的锁，并进入等待状态，直到其他线程调用notify()或notifyAll()方法唤醒它，才会重新竞争对象的锁并继续执行。wait()必须在同步方法或同步块中使用，因为它要求线程持有对象的锁。

**await：**

await()是Condition接口中定义的方法，它需要与Lock配合使用。一个Lock对象可以有多个与之对应的Condition对象，用于唤醒不同的等待线程。当一个线程调用await()方法时，它会释放当前持有的锁并进入等待状态，直到其他线程调用Condition对象的signal()或signalAll()方法唤醒它，才会重新竞争锁并继续执行。

可以看到，wait()和await()都能让线程进入等待状态，但是它们的作用对象和使用方式不同。wait()需要在同步方法或同步块中使用，而await()需要先获取一个Lock对象，并且需要和对应的Condition对象一起使用。

另外，wait()和await()方法都可以被中断，即在等待过程中可以被其他线程打断，抛出InterruptedException异常。不同的是，wait()方法会自动重新获得对象的锁，而await()方法需要在被唤醒后重新竞争Lock对象的锁。

:::



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





### 3.3 park 和 unpark

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



