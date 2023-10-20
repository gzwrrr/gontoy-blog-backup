---
title: "Android 消息机制"
shortTitle: "Android 消息机制"
description: "Android 消息机制"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-10-01
category: 
- "Android"
- "移动端"
tag:
- "Android"
- "移动端"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Android 消息机制"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 1
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "Android 消息机制"
  description: "Android 消息机制"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 消息机制

[[toc]]



## 基础概念

:::info 为什么子线程不能更新UI

为Android的UI控件不是线程安全的，如果在多线程中并发访问可能会导致UI控件处于不可预期的状态。

而如果对UI控件的访问加上锁机制，会有两个缺点：

1. 锁机制会让UI访问的逻辑变得复杂
2. 锁机制会降低UI访问的效率，因为锁机制会阻塞某些线程的执行。

鉴于这两个缺点，最简单且高效的方法就是采用单线程模型来处理UI操作。

:::

Handler是Android消息机制的上层接口，这使得在开发过程中只需要和Handler交互即可。

Handler的使用过程很简单，通过它可以轻松地将一个任务切换到Handler所在的线程中去执行。

有时候需要在子线程中进行耗时的I/O操作，可能是读取文件或者访问网络等，当耗时操作完成以后可能需要在UI上做一些改变，由于Android开发规范的限制，我们并不能在子线程中访问UI控件，否则就会触发程序异常，这个时候通过Handler就可以将更新UI的操作切换到主线程中执行。

更新UI仅仅是Handler的一个特殊的使用场景，Handler并不是专门用于更新UI的，它只是常被开发者用来更新UI。

Android的消息机制主要是指Handler的运行机制，Handler的运行需要底层的MessageQueue和Looper的支撑。

![image-20230922154930504](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231002/android%E5%BC%82%E6%AD%A5%E6%B6%88%E6%81%AF%E5%8E%9F%E7%90%86.png)



## Handler 原理

Handler的主要作用是将一个任务切换到某个指定的线程中去执行。

Handler创建时会采用当前线程的Looper来构建内部的消息循环系统，如果当前线程没有Looper，那么就会报错（只需要为当前线程创建Looper即可，或者在一个有Looper的线程中创建Handler也行）

Handler创建完毕后，这个时候其内部的Looper以及MessageQueue就可以和Handler一起协同工作了，然后通过Handler的`post`方法将一个Runnable投递到Handler内部的Looper中去处理，也可以通过Handler的`send`方法发送一个消息（其实post方法最终也是通过send方法来完成的），这个消息同样会在Looper中去处理。

当Handler的`send`方法被调用时，它会调用MessageQueue的`enqueueMessage`方法将这个消息放入消息队列中，然后Looper发现有新消息到来时，就会处理这个消息，最终消息中的Runnable或者Handler的`handleMessage`方法就会被调用。

Looper是运行在创建Handler所在的线程中的，这样一来Handler中的业务逻辑就被切换到创建Handler所在的线程中去执行了。



## ThreadLocal 原理

ThreadLocal是一个线程内部的数据存储类，通过它可以在指定的线程中存储数据，数据存储以后，只有在指定线程中可以获取到存储的数据，对于其他线程来说则无法获取到数据。

Looper、ActivityThread以及AMS中都用到了ThreadLocal。

当某些数据是以线程为作用域并且不同线程具有不同的数据副本的时候，就可以考虑采用ThreadLocal。

ThreadLocal另一个使用场景是复杂逻辑下的对象传递，比如监听器的传递，有些时候一个线程中的任务过于复杂，这可能表现为函数调用栈比较深以及代码入口的多样性，在这种情况下，又需要监听器能够贯穿整个线程的执行过程，这时就可以采用ThreadLocal。

采用ThreadLocal可以让监听器作为线程内的全局对象而存在，在线程内部只要通过get方法就可以获取到监听器。

如果不采用ThreadLocal，那么我们能想到的可能是如下两种方法：

1. 将监听器通过参数的形式在函数调用栈中进行传递。
2. 将监听器作为静态变量供线程访问。

主要关注ThreadLocal的`set`和`get`方法：

```java
public void set(T value) {
    Thread currentThread = Thread.currentThread();
    // 每个线程中都有一个localValues，类型为ThreadLocal.Values（Map），key的类型为ThreadLocal，value为指定的类型（ThreadLocal<T>中的T）
    Values values = values(currentThread);
    if (values == null) {
        values = initializeValues(currentThread);
    }
    values.put(this,value);
}

void put(ThreadLocal<?> key,Object value) {
    cleanUp();
    // Keep track of first tombstone. That's where we want to go back
    // and add an entry if necessary.
    int firstTombstone = -1;
    for (int index = key.hash & mask;; index = next(index)) {
        Object k = table[index];
        if (k == key.reference) {
            // Replace existing entry.
            table[index + 1] = value;
            return;
        }
        if (k == null) {
            if (firstTombstone == -1) {
                // Fill in null slot.
                table[index] = key.reference;
                table[index + 1] = value;
                size++;
                return;
            }
            // Go back and replace first tombstone.
            table[firstTombstone] = key.reference;
            table[firstTombstone + 1] = value;
            tombstones--;
            size++;
            return;
        }
        // Remember first tombstone.
        if (firstTombstone == -1 && k == TOMBSTONE) {
            firstTombstone = index;
        }
    }
}

public T get() {
    // Optimized for the fast path.
    Thread currentThread = Thread.currentThread();
    Values values = values(currentThread);
    if (values != null) {
        Object[] table = values.table;
        int index = hash & values.mask;
        if (this.reference == table[index]) {
            return (T) table[index + 1];
        }
    } else {
        values = initializeValues(currentThread);
    }
    return (T) values.getAfterMiss(this);
}
```





## MessageQueue 原理

MessageQueue主要包含两个操作：插入和读取。

读取操作本身会伴随着删除操作，插入和读取对应的方法分别为enqueueMessage和next，其中enqueueMessage的作用是往消息队列中插入一条消息，而next的作用是从消息队列中取出一条消息并将其从消息队列中移除。

MessageQueue的内部实现并不是用的队列，实际上它是通过一个单链表的数据结构来维护消息列表，单链表在插入和删除上比较有优势。

主要关注`enqueueMessage`和`next`方法的实现：

```java
boolean enqueueMessage(Message msg,long when) {
    ...
        synchronized (this) {
        ...
            msg.markInUse();
        msg.when = when;
        Message p = mMessages;
        boolean needWake;
        if (p == null || when == 0 || when < p.when) {
            // New head,wake up the event queue if blocked.
            msg.next = p;
            mMessages = msg;
            needWake = mBlocked;
        } else {
            // Inserted within the middle of the queue. Usually we don't have to wake
            // up the event queue unless there is a barrier at the head of the queue
            // and the message is the earliest asynchronous message in the queue.
            needWake = mBlocked && p.target == null && msg.isAsynchronous();
            Message prev;
            for (;;) {
                prev = p;
                p = p.next;
                if (p == null || when < p.when) {
                    break;
                }
                if (needWake && p.isAsynchronous()) {
                    needWake = false;
                }
            }
            msg.next = p; // invariant: p == prev.next
            prev.next = msg;
        }
        // We can assume mPtr != 0 because mQuitting is false.
        if (needWake) {
            nativeWake(mPtr);
        }
    }
    return true;
}

Message next() {
    ...
        int pendingIdleHandlerCount = -1; // -1 only during first iteration
    int nextPollTimeoutMillis = 0;
    for (;;) {
        if (nextPollTimeoutMillis != 0) {
            Binder.flushPendingCommands();
        }
        nativePollOnce(ptr,nextPollTimeoutMillis);
        synchronized (this) {
            // Try to retrieve the next message. Return if found.
            final long now = SystemClock.uptimeMillis();
            Message prevMsg = null;
            Message msg = mMessages;
            if (msg != null && msg.target == null) {
                // Stalled by a barrier. Find the next asynchronous message in the queue.
                do {
                    prevMsg = msg;
                    msg = msg.next;
                } while (msg != null && !msg.isAsynchronous());
            }
            if (msg != null) {
                if (now < msg.when) {
                    // Next message is not ready. Set a timeout to wake up when it is ready.
                    nextPollTimeoutMillis = (int) Math.min(msg.when -now,Integer.MAX_VALUE);
                } else {
                    // Got a message.
                    mBlocked = false;
                    if (prevMsg != null) {
                        prevMsg.next = msg.next;
                    } else {
                        mMessages = msg.next;
                    }
                    msg.next = null;
                    if (false) Log.v("MessageQueue","Returning message: " + msg);
                    return msg;
                }
            } else {
                // No more messages.
                nextPollTimeoutMillis = -1;
            }
            ...
        }
        ...
    }
}
```

从enqueueMessage的主要操作其实就是单链表的插入操作。next方法是一个无限循环的方法，如果消息队列中没有消息，那么next方法会一直阻塞在这里。当有新消息到来时，next方法会返回这条消息并将其从单链表中移除。



## Looper 原理

```java
private Looper(boolean quitAllowed) {
    mQueue = new MessageQueue(quitAllowed);
    mThread = Thread.currentThread();
}
```

通过Looper.prepare()即可为当前线程创建一个Looper，接着通过Looper.loop()来开启消息循环：

```java
new Thread("Thread") {
    @Override
    public void run() {
        Looper.prepare();
        Handler handler = new Handler();
        Looper.loop();
    };
}.start();
```

此外`prepareMainLooper`方法主要是给主线程也就是ActivityThread创建Looper使用的，其本质也是通过`prepare`方法来实现的。

由于主线程的Looper比较特殊，所以Looper提供了一个getMainLooper方法，通过它可以在任何地方获取到主线程的Looper。

Looper也是可以退出的，Looper提供了`quit`和`quitSafely`来退出一个Looper（`quit`会直接退出Looper，而`quitSafely`只是设定一个退出标记，然后把消息队列中的已有消息处理完毕后才安全地退出）

Looper退出后，通过Handler发送的消息会失败，这个时候Handler的send方法会返回false。

在子线程中，如果手动为其创建了Looper，那么在所有的事情完成以后应该调用quit方法来终止消息循环，否则这个子线程就会一直处于等待的状态，而如果退出Looper以后，这个线程就会立刻终止，因此建议不需要的时候终止Looper。

只有调用了loop后，消息循环系统才会真正地起作用：

```java
public static void loop() {
    final Looper me = myLooper();
    if (me == null) {
        throw new RuntimeException("No Looper; Looper.prepare() wasn't called on this thread.");
    }
    final MessageQueue queue = me.mQueue;
    // Make sure the identity of this thread is that of the local process,
    // and keep track of what that identity token actually is.
    Binder.clearCallingIdentity();
    final long ident = Binder.clearCallingIdentity();
    for (;;) {
        Message msg = queue.next(); // might block
        if (msg == null) {
            // No message indicates that the message queue is quitting.
            return;
        }
        // This must be in a local variable,in case a UI event sets the logger
        Printer logging = me.mLogging;
        if (logging != null) {
            logging.println(">>>>> Dispatching to " + msg.target + " " +
                            msg.callback + ": " + msg.what);
        }
        msg.target.dispatchMessage(msg);
        if (logging != null) {
            logging.println("<<<<< Finished to " + msg.target + " " + msg.callback);
        }
        // Make sure that during the course of dispatching the
        // identity of the thread wasn't corrupted.
        final long newIdent = Binder.clearCallingIdentity();
        if (ident != newIdent) {
            Log.wtf(TAG,"Thread identity changed from 0x"
                    + Long.toHexString(ident) + " to 0x"
                    + Long.toHexString(newIdent)+" while dispatching to "
                    + msg.target.getClass().getName() + " "
                    + msg.callback + " what=" + msg.what);
        }
        msg.recycleUnchecked();
    }
}
```

loop方法是一个死循环，唯一跳出循环的方式是MessageQueue的next方法返回了null。

当Looper的quit方法被调用时，Looper就会调用MessageQueue的quit或者quitSafely方法来通知消息队列退出，当消息队列被标记为退出状态时，它的next方法就会返回null。也就是说，Looper必须退出，否则loop方法就会无限循环下去。

loop方法会调用MessageQueue的next方法来获取新消息，而next是一个阻塞操作，当没有消息时，next方法会一直阻塞在那里，这也导致loop方法一直阻塞在那里。

如果MessageQueue的next方法返回了新消息，Looper就会处理这条消息：msg.target.dispatchMessage(msg)，这里的msg.target是发送这条消息的Handler对象，这样Handler发送的消息最终又交给它的dispatchMessage方法来处理了。但是这里不同的是，Handler的dispatchMessage方法是在创建Handler时所使用的Looper中执行的，这样就成功地将代码逻辑切换到指定的线程中去执行了。





## Handler 原理

Handler的工作主要包含消息的发送和接收过程。消息的发送可以通过post的一系列方法以及send的一系列方法来实现，post的一系列方法最终是通过send的一系列方法来实现的。

```java
public final boolean sendMessage(Message msg) {
    return sendMessageDelayed(msg,0);
}

public final boolean sendMessageDelayed(Message msg,long delayMillis) {
    if (delayMillis < 0) {
        delayMillis = 0;
    }
    return sendMessageAtTime(msg,SystemClock.uptimeMillis() + delayMillis);
}

public boolean sendMessageAtTime(Message msg,long uptimeMillis) {
    MessageQueue queue = mQueue;
    if (queue == null) {
        RuntimeException e = new RuntimeException(
            this + " sendMessageAtTime() called with no mQueue");
        Log.w("Looper",e.getMessage(),e);
        return false;
    }
    return enqueueMessage(queue,msg,uptimeMillis);
}

private boolean enqueueMessage(MessageQueue queue,Message msg,long
                               uptimeMillis) {
    msg.target = this;
    if (mAsynchronous) {
        msg.setAsynchronous(true);
    }
    return queue.enqueueMessage(msg,uptimeMillis);
}
```

Handler发送消息的过程仅仅是向消息队列中插入了一条消息，MessageQueue的next方法就会返回这条消息给Looper，Looper收到消息后就开始处理了，最终消息由Looper交由Handler处理，即Handler的dispatchMessage方法会被调用，这时Handler就进入了处理消息的阶段：

```java
public void dispatchMessage(Message msg) {
    if (msg.callback != null) {
        handleCallback(msg);
    } else {
        if (mCallback != null) {
            if (mCallback.handleMessage(msg)) {
                return;
            }
        }
        handleMessage(msg);
    }
}

private static void handleCallback(Message message) {
    message.callback.run();
}

public interface Callback {
    public boolean handleMessage(Message msg);
}
```

通过Callback可以采用如下方式来创建Handler对象：`Handler handler = new Handler(callback)`（可以用来创建一个Handler的实例但并不需要派生Handler的子类）

创建Handler最常见的方式就是派生一个Handler的子类并重写其`handleMessage`方法来处理具体的消息，而Callback给我们提供了另外一种使用Handler的方式，当我们不想派生子类时，就可以通过Callback来实现。

Handler还有一个特殊的构造方法，那就是通过一个特定的Looper来构造Handler：

```java
public Handler(Looper looper) {
    this(looper,null,false);
}
```

Handler的默认构造方法`public Handler()`会调用下面的构造方法。如果当前线程没有Looper的话，就会抛出`Can't create handler inside thread that has not called Looper.prepare()`这个异常，这也解释了在没有Looper的子线程中创建Handler会引发程序异常的原因。

```java
public Handler(Callback callback,boolean async) {
    ...
        mLooper = Looper.myLooper();
    if (mLooper == null) {
        throw new RuntimeException(
            "Can't create handler inside thread that has not called Looper.prepare()");
    }
    mQueue = mLooper.mQueue;
    mCallback = callback;
    mAsynchronous = async;
}
```





## 主线程消息循环

Android的主线程就是ActivityThread，主线程的入口方法为`main`，在`main`方法中系统会通过`Looper.prepareMainLooper()`来创建主线程的Looper以及MessageQueue，并通过Looper.loop()来开启主线程的消息循环：

```java
public static void main(String[] args) {
    ...
    Process.setArgV0("<pre-initialized>");
    Looper.prepareMainLooper();
    ActivityThread thread = new ActivityThread();
    thread.attach(false);
    if (sMainThreadHandler == null) {
        sMainThreadHandler = thread.getHandler();
    }
    AsyncTask.init();
    if (false) {
        Looper.myLooper().setMessageLogging(new LogPrinter(Log.DEBUG,"ActivityThread"));
    }
    Looper.loop();
    throw new RuntimeException("Main thread loop unexpectedly exited");
}
```

主线程的消息循环开始了以后，ActivityThread还需要一个Handler来和消息队列进行交互，这个Handler就是ActivityThread.H，它内部定义了一组消息类型，主要包含了四大组件的启动和停止等过程：

```java
private class H extends Handler {
    public static final int LAUNCH_ACTIVITY = 100;
    public static final int PAUSE_ACTIVITY = 101;
    public static final int PAUSE_ACTIVITY_FINISHING = 102;
    public static final int STOP_ACTIVITY_SHOW = 103;
    public static final int STOP_ACTIVITY_HIDE = 104;
    public static final int SHOW_WINDOW = 105;
    public static final int HIDE_WINDOW = 106;
    public static final int RESUME_ACTIVITY = 107;
    public static final int SEND_RESULT = 108;
    public static final int DESTROY_ACTIVITY = 109;
    public static final int BIND_APPLICATION = 110;
    public static final int EXIT_APPLICATION = 111;
    public static final int NEW_INTENT = 112;
    public static final int RECEIVER = 113;
    public static final int CREATE_SERVICE = 114;
    public static final int SERVICE_ARGS = 115;
    public static final int STOP_SERVICE = 116;
    ...
}
```

ActivityThread通过ApplicationThread和AMS进行进程间通信，AMS以进程间通信的方式完成ActivityThread的请求后会回调ApplicationThread中的Binder方法，然后ApplicationThread会向H发送消息，H收到消息后会将ApplicationThread中的逻辑切换到ActivityThread中去执行，即切换到主线程中去执行，这个过程就是主线程的消息循环模型。





## 相关文章

- [Android消息机制全面解析](https://blog.csdn.net/sam0750/article/details/84976396)

