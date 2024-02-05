---
title: "Android 线程"
shortTitle: "Android 线程"
description: "Android 线程"
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
  text: "Android 线程"
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
  title: "Android 线程"
  description: "Android 线程"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 线程

[[toc]]



## 基础知识

线程分为主线程和子线程，主线程主要处理和界面相关的事情，而子线程则往往用于执行耗时操作。

在主线程中执行耗时操作那么就会导致程序无法及时地响应，因此耗时操作必须放在子线程中去执行。

除了Thread本身以外，在Android中可以扮演线程角色的还有很多（表现与传统线程有别，但本质仍然是传统的线程），比如：

- AsyncTask（底层用到了线程池）：AsyncTask封装了线程池和Handler，它主要是为了方便开发者在子线程中更新UI。
- IntentService（直接使用线程）：一个服务，系统对其进行了封装使其可以更方便地执行后台任务，IntentService内部采用HandlerThread来执行任务，当任务执行完毕后IntentService会自动退出。
- HandlerThread（一种特殊的线程，直接使用线程）：是一种具有消息循环的线程，在它的内部可以使用Handler。

:::warning 注意

从任务执行的角度来看，IntentService的作用很像一个后台线程，但是IntentService是一种服务，它不容易被系统杀死从而可以尽量保证任务的执行，而如果是一个后台线程，由于这个时候进程中没有活动的四大组件，那么这个进程的优先级就会非常低，会很容易被系统杀死，这就是IntentService的优点。

:::

Android沿用了Java的线程模型，其中的线程也分为主线程和子线程，其中主线程也叫UI线程。主线程的作用是运行四大组件以及处理它们和用户的交互，而子线程的作用则是执行耗时任务，比如网络请求、I/O操作等。

从Android 3.0开始系统要求网络访问必须在子线程中进行，否则网络访问将会失败并抛出NetworkOnMainThreadException这个异常，这样做是为了避免主线程由于被耗时操作所阻塞从而出现ANR现象。





## AsyncTask

:::warning 注意

为了简化在子线程中访问UI的过程，系统提供了AsyncTask，AsyncTask经过几次修改，导致了对于不同的API版本AsyncTask具有不同的表现，尤其是多任务的并发执行上。由于这个原因，很多开发者对AsyncTask的使用上存在误区。

:::

AsyncTask是一种轻量级的异步任务类，它可以在线程池中执行后台任务，然后把执行的进度和最终结果传递给主线程并在主线程中更新UI。

从实现上来说，AsyncTask封装了Thread和Handler，通过AsyncTask可以更加方便地执行后台任务以及在主线程中访问UI，但是AsyncTask并不适合进行特别耗时的后台任务，对于特别耗时的任务来说，建议使用线程池。

```java
/**
 * Params：参数的类型
 * Progress：后台任务的执行进度的类型
 * Result：后台任务的返回结果的类型
 * 如果AsyncTask确实不需要传递具体的参数，那么这三个泛型参数可以用Void来代替。
 */
public abstract class AsyncTask<Params,Progress,Result>
```

AsyncTask提供了5个核心方法：

| 方法                                  | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| `onPreExecute()`                      | 在主线程中执行，在异步任务执行之前，此方法会被调用，一般可以用于做一些准备工作。 |
| `doInBackground(Params...params)`     | 在线程池中执行，此方法用于执行异步任务，params参数表示异步任务的输入参数。<br />在此方法中可以通过`publishProgress`方法来更新任务的进度，`publishProgress`方法会调用`onProgressUpdate`方法。另外此方法需要返回计算结果给`onPostExecute`方法。 |
| `onProgressUpdate(Progress...values)` | 在主线程中执行，当后台任务的执行进度发生改变时此方法会被调用。 |
| `onPostExecute(Result result)`        | 在主线程中执行，在异步任务执行之后，此方法会被调用，其中`result`参数是后台任务的返回值，即`doInBackground`的返回值。 |
| `onCancelled()`                       | 在主线程中执行，当异步任务被取消时，`onCancelled`方法会被调用，这个时候`onPostExecute`则不会被调用。 |

AsyncTask在具体的使用过程中也是有一些条件限制的，主要有如下几点：

1. AsyncTask的类必须在主线程中加载，这就意味着第一次访问AsyncTask必须发生在主线程，当然这个过程在Android 4.1及以上版本中已经被系统自动完成。在Android 5.0的源码中，可以查看ActivityThread的main方法，它会调用AsyncTask的init方法，这就满足了AsyncTask的类必须在主线程中进行加载这个条件了。
2. AsyncTask的对象必须在主线程中创建。
3. execute方法必须在UI线程调用。
4. 不要在程序中直接调用`onPreExecute`、`onPostExecute`、`doInBackground`和`onProgressUpdate`方法。
5. 一个AsyncTask对象只能执行一次，即只能调用一次`execute`方法，否则会报运行时异常。

:::warning 注意

在Android 1.6之前，AsyncTask是串行执行任务的，Android 1.6的时候AsyncTask开始采用线程池里处理并行任务。

但是从Android 3.0开始，为了避免AsyncTask所带来的并发错误，AsyncTask又采用一个线程来串行执行任务。

尽管如此，在Android 3.0以及后续的版本中，我们仍然可以通过AsyncTask的executeOnExecutor方法来并行地执行任务。

:::



### AsyncTask#execute

```java
public final AsyncTask<Params,Progress,Result> execute(Params... params) {
    // sDefaultExecutor实际上是一个串行的线程池
    return executeOnExecutor(sDefaultExecutor,params);
}
public final AsyncTask<Params,Progress,Result> executeOnExecutor(Executor exec,
                                                                 Params... params) {
    if (mStatus != Status.PENDING) {
        switch (mStatus) {
            case RUNNING:
                throw new IllegalStateException("Cannot execute task:"
                                                + " the task is already running.");
            case FINISHED:
                throw new IllegalStateException("Cannot execute task:"
                                                + " the task has already been executed "
                                                + "(a task can be executed only once)");
        }
    }
    mStatus = Status.RUNNING;
    onPreExecute();
    mWorker.mParams = params;
    exec.execute(mFuture);
    return this;
}
```



### AsyncTask 的线程池

```java
public static final Executor SERIAL_EXECUTOR = new SerialExecutor();
private static volatile Executor sDefaultExecutor = SERIAL_EXECUTOR;

private static class SerialExecutor implements Executor {
    final ArrayDeque<Runnable> mTasks = new ArrayDeque<Runnable>();
    Runnable mActive;
    public synchronized void execute(final Runnable r) {
        mTasks.offer(new Runnable() {
            public void run() {
                try {
                    r.run();
                } finally {
                    scheduleNext();
                }
            }
        });
        if (mActive == null) {
            scheduleNext();
        }
    }
    protected synchronized void scheduleNext() {
        if ((mActive = mTasks.poll()) != null) {
            THREAD_POOL_EXECUTOR.execute(mActive);
        }
    }
}
```

- AsyncTask中有两个线程池（SerialExecutor和THREAD_POOL_EXECUTOR）和一个Handler（InternalHandler）。
- 其中线程池SerialExecutor用于任务的排队，而线程池THREAD_POOL_EXECUTOR用于真正地执行任务。
- InternalHandler用于将执行环境从线程池切换到主线程。

在AsyncTask的构造方法中有如下这么一段代码，由于FutureTask的run方法会调用mWorker的call方法，因此mWorker的call方法最终会在线程池中执行：

```java
mWorker = new WorkerRunnable<Params,Result>() {
    public Result call() throws Exception {
        // true 表示任务已经调用过了
        mTaskInvoked.set(true);
        Process.setThreadPriority(Process.THREAD_PRIORITY_BACKGROUND);
        //noinspection unchecked
        return postResult(doInBackground(mParams));
    }
};
```

postResult方法会通过sHandler发送一个MESSAGE_POST_RESULT的消息，这个sHandler的定义如下所示：

```java
private static final InternalHandler sHandler = new InternalHandler();
private static class InternalHandler extends Handler {
    @SuppressWarnings({"unchecked","RawUseOfParameterizedType"})
    @Override
    public void handleMessage(Message msg) {
        AsyncTaskResult result = (AsyncTaskResult) msg.obj;
        switch (msg.what) {
            case MESSAGE_POST_RESULT:
                // There is only one result
                result.mTask.finish(result.mData[0]);
                break;
            case MESSAGE_POST_PROGRESS:
                result.mTask.onProgressUpdate(result.mData);
                break;
        }
    }
}
```

可以发现，sHandler是一个静态的Handler对象，为了能够将执行环境切换到主线程，这就要求sHandler这个对象必须在主线程中创建。

由于静态成员会在加载类的时候进行初始化，因此这就变相要求AsyncTask的类必须在主线程中加载，否则同一个进程中的AsyncTask都将无法正常工作。

sHandler收到MESSAGE_POST_RESULT这个消息后会调用AsyncTask的`finish`方法：

```java
private void finish(Result result) {
    if (isCancelled()) {
        onCancelled(result);
    } else {
        onPostExecute(result);
    }
    mStatus = Status.FINISHED;
}
```

:::warning 注意

AsyncTask的`executeOnExecutor`方法可以并行，但是这个方法是Android 3.0新添加的方法，并不能在低版本上使用。

:::



## HandlerThread

HandlerThread继承了Thread，它是一种可以使用Handler的Thread，它的实现也很简单，就是在`run`方法中通过Looper.prepare()来创建消息队列，并通过Looper.loop()来开启消息循环，这样在实际的使用中就允许在HandlerThread中创建Handler了。

```java
public void run() {
    mTid = Process.myTid();
    Looper.prepare();
    synchronized (this) {
        mLooper = Looper.myLooper();
        notifyAll();
    }
    Process.setThreadPriority(mPriority);
    onLooperPrepared();
    Looper.loop();
    mTid = -1;
}
```

- HandlerThread在内部创建了消息队列，外界需要通过Handler的消息方式来通知HandlerThread执行一个具体的任务。
- HandlerThread是一个很有用的类，它在Android中的一个具体的使用场景是IntentService。
- 由于HandlerThread的run方法是一个无限循环，因此当明确不需要再使用HandlerThread时，可以通过它的quit或者quitSafely方法来终止线程的执行。





## IntentService

IntentService是一种特殊的Service，它继承了Service并且它是一个抽象类，因此必须创建它的子类才能使用IntentService。

IntentService可用于执行后台耗时的任务，当任务执行后

它会自动停止，同时由于IntentService是服务的原因，这导致它的优先级比单纯的线程要高很多，所以IntentService比较适合执行一些高优先级的后台任务，因为它优先级高不容易被系统杀死。

IntentService封装了HandlerThread和Handler：

```java
public void onCreate() {
    // TODO: It would be nice to have an option to hold a partial wakelock
    // during processing,and to have a static startService(Context,Intent)
    // method that would launch the service & hand off a wakelock.
    super.onCreate();
    HandlerThread thread = new HandlerThread("IntentService[" + mName + "]");
    thread.start();
    mServiceLooper = thread.getLooper();
    mServiceHandler = new ServiceHandler(mServiceLooper);
}
```

每次启动IntentService，它的`onStartCommand`方法就会调用一次，IntentService在`onStartCommand`中处理每个后台任务的Intent。`onStartCommand`调用了onStart：

```java
public void onStart(Intent intent,int startId) {
    Message msg = mServiceHandler.obtainMessage();
    msg.arg1 = startId;
    msg.obj = intent;
    mServiceHandler.sendMessage(msg);
}
```

IntentService仅仅是通过mServiceHandler发送了一个消息，这个消息会在HandlerThread中被处理。mServiceHandler收到消息后，会将Intent对象传递给`onHandleIntent`方法去处理。

注意这个Intent对象的内容和外界的`startService(intent)`中的intent的内容是完全一致的，通过这个Intent对象即可解析出外界启动IntentService时所传递的参数，通过这些参数就可以区分具体的后台任务，这样在`onHandleIntent`方法中就可以对不同的后台任务做处理了。

当`onHandleIntent`方法执行结束后，IntentService会通过`stopSelf(int startId)`方法来尝试停止服务。这里之所以采用`stopSelf(int startId)`而不是`stopSelf()`来停止服务，那是因为`stopSelf()`会立刻停止服务，而这个时候可能还有其他消息未处理，`stopSelf(int startId)`则会等待所有的消息都处理完毕后才终止服务。

`stopSelf(int startId)`在尝试停止服务之前会判断最近启动服务的次数是否和startId相等，如果相等就立刻停止服务，不相等则不停止服务，这个策略可以从AMS的`stopServiceToken`方法的实现中找到依据。

```java
private final class ServiceHandler extends Handler {
    public ServiceHandler(Looper looper) {
        super(looper);
    }
    @Override
    public void handleMessage(Message msg) {
        onHandleIntent((Intent)msg.obj);
        stopSelf(msg.arg1);
    }
}
```

IntentService的`onHandleIntent`方法是一个抽象方法，它需要我们在子类中实现，它的作用是从Intent参数中区分具体的任务并执行这些任务。

- 如果目前只存在一个后台任务，那么`onHandleIntent`方法执行完这个任务后，`stopSelf(intstartId)`就会直接停止服务。
- 如果目前存在多个后台任务，那么当onHandleIntent方法执行完最后一个任务时，stopSelf(intstartId)才会直接停止服务。

由于每执行一个后台任务就必须启动一次IntentService，而IntentService内部则通过消息的方式向HandlerThread请求执行任务，Handler中的Looper是顺序处理消息的，这就意味着IntentService也是顺序执行后台任务的，当有多个后台任务同时存在时，这些后台任务会按照外界发起的顺序排队执行。

