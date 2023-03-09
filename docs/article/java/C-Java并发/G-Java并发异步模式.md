---
title: "Java 并发异步模式"
shortTitle: "G-Java 并发异步模式"
description: "Java 并发异步模式"
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
  text: "Java 并发异步模式"
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
  title: "Java 并发异步模式"
  description: "Java 并发异步模式"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 并发异步模式


[[toc]]

## 1.生产者-消费者

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





## 2.工作线程

- 让有限的工作线程来轮流异步处理无限多的任务。
- 也可以将其分类为分工模式，典型的实现就是线程池，体现了经典设计模式中的享元模式
- 固定大小的线程池会出现饥饿现象，不同的任务类型应该使用不同的线程池，这样能够避免饥饿且提升效率。
- 对于 CPU 密集型运算。通常使用 CPU 核数 + 1 能够实现最优的 CPU 利用率。加 1 是保证当前线程由于页缺失故障（操作系统）或其他原理导致暂停时，额外的线程能够补上保证 CPU 时钟周期不被浪费
- 对于 IO 密集型运算（包括远程 RPC 调用，数据库操作等），经验公式为线程数 = 核数 * 期望 CPU 利用率 * 总时间（CPU 计算时间 + 等待时间）/ CPU 计算时间





## 3.任务调度线程池

- 在任务调度线程池加入之前，可以使用 Timer 来实现定时功能，Timer 的优点在于简单易用，但是由于所有任务都是由一个线程来调度，因此所有任务都是串行的。同一时间只能有一个任务执行，异常或延迟都会影响后续任务
- 应当使用 Executors.newScheduledThreadPool 代替 Timer 实现任务调度线程池

