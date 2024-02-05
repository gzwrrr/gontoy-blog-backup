---
title: "Android 四大组件工作过程"
shortTitle: "Android 四大组件工作过程"
description: "Android 四大组件工作过程"
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
  text: "Android 四大组件工作过程"
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
  title: "Android 四大组件工作过程"
  description: "Android 四大组件工作过程"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 四大组件工作过程



## 基本概念

> Android的四大组件中除了BroadcastReceiver以外，其他三种组件都必须在Android-Manifest中注册，对于BroadcastReceiver来说，它既可以在AndroidManifest中注册也可以通过代码来注册。在调用方式上，Activity、Service和BroadcastReceiver需要借助Intent，而ContentProvider则无须借助Intent。



### Activity

Activity是一种展示型组件，用于向用户直接地展示一个界面，并且可以接收用户的输入信息从而进行交互。

Activity是最重要的一种组件，对用户来说，Activity就是一个Android应用的全部，这是因为其他三大组件对用户来说都是不可感知的。

Activity的启动由Intent触发，其中Intent可以分为显式Intent和隐式Intent，显式Intent可以明确地指向一个Activity组件，隐式Intent则指向一个或多个目标Activity组件，当然也可能没有任何一个Activity组件可以处理这个隐式Intent。



### Service

Service是一种计算型组件，用于在后台执行一系列计算任务。

由于Service组件工作在后台，因此用户无法直接感知到它的存在。Service组件和Activity组件略有不同，Activity组件只有一种运行模式，即Activity处于启动状态，但是Service组件却有两种状态：

- 启动状态：当Service组件处于启动状态时，这个时候Service内部可以做一些后台计算，并且不需要和外界有直接的交互。尽管Service组件是用于执行后台计算的，但是它本身是运行在主线程中的，因此耗时的后台计算仍然需要在单独的线程中去完成。
- 绑定状态：当Service组件处于绑定状态时，这个时候Service内部同样可以进行后台计算，但是处于这种状态时外界可以很方便地和Service组件进行通信。

Service组件也是可以停止的，停止一个Service组件稍显复杂，需要灵活采用stopService和unBindService这两个方法才能完全停止一个Service组件。



### BroadcastReceiver

BroadcastReceiver是一种消息型组件，用于在不同的组件乃至不同的应用之间传递消息。

BroadcastReceiver同样无法被用户直接感知，因为它工作在系统内部。BroadcastReceiver也叫广播，广播的注册有两种方式：

- 静态注册：指在AndroidManifest中注册广播，这种广播在应用安装时会被系统解析，此种形式的广播不需要应用启动就可以收到相应的广播。
- 动态注册：需要通过Context.registerReceiver()来实现，并且在不需要的时候要通过Context.unRegisterReceiver()来解除广播，此种形态的广播必须要应用启动才能注册并接收广播，因为应用不启动就无法注册广播，无法注册广播就无法收到相应的广播。

在实际开发中通过Context的一系列send方法来发送广播，被发送的广播会被系统发送给感兴趣的广播接收者，发送和接收过程的匹配是通过广播接收者的`<intent-filter>`来描述的。

BroadcastReceiver组件可以用来实现低耦合的观察者模式，观察者和被观察者之间可以没有任何耦合。

由于BroadcastReceiver的特性，它不适合用来执行耗时操作。BroadcastReceiver组件一般来说不需要停止，它也没有停止的概念。



### ContentProvider

ContentProvider是一种数据共享型组件，用于向其他组件乃至其他应用共享数据。

和BroadcastReceiver一样，ContentProvider同样无法被用户直接感知。

对于一个ContentProvider组件来说，它的内部需要实现增删改查这四种操作，在它的内部维持着一份数据集合，这个数据集合既可以通过数据库来实现，也可以采用其他任何类型来实现，比如List和Map，ContentProvider对数据集合的具体实现并没有任何要求。

需要注意的是，ContentProvider内部的insert、delete、update和query方法需要处理好线程同步，因为这几个方法是在Binder线程池中被调用的，另外ContentProvider组件也不需要手动停止。





## Activity 工作过程

### startActivityForResult

startActivity方法有好几种重载方式，但它们最终都会调用startActivityForResult方法

```java
public void startActivityForResult(Intent intent,int requestCode,@Nullable Bundle options) {
    if (mParent == null) {
        Instrumentation.ActivityResult ar = mInstrumentation.execStartActivity(
            this,mMainThread.getApplicationThread(),mToken,this,
            intent,requestCode,options
        );
    
        if (ar != null) {
            mMainThread.sendActivityResult(
                mToken,mEmbeddedID,requestCode,ar.getResultCode(),
                ar.getResultData());
        }
        if (requestCode => 0) {
            // If this start is requesting a result,we can avoid making
            // the activity visible until the result is received. Setting
            // this code during onCreate(Bundle savedInstanceState) or onResume() will keep the
            // activity hidden during this time,to avoid flickering.
            // This can only be done when a result is requested because
            // that guarantees we will get information back when the
            // activity is finished,no matter what happens to it.
            mStartedActivity = true;
        }

        final View decor = mWindow != null ? mWindow.peekDecorView() : null;
        if (decor != null) {
            decor.cancelPendingInputEvents();
        }
        // TODO Consider clearing/flushing other event sources and events for child windows.
    } else {
        if (options != null) {
            mParent.startActivityFromChild(this,intent,requestCode,options);
        } else {
            // Note we want to go through this method for compatibility with
            // existing applications that may have overridden it.
            mParent.startActivityFromChild(this,intent,requestCode);
        }
    }
    if (options != null && !isTopOfTask()) {
        mActivityTransitionState.startExitOutTransition(this,options);
    }
}
```

mParent代表的是ActivityGroup，ActivityGroup最开始被用来在一个界面中嵌入多个子Activity，但是其在API 13中已经被废弃了，系统推荐采用Fragment来代替ActivityGroup。

注意mMainThread.getApplicationThread()这个参数，它的类型是ApplicationThread，ApplicationThread是ActivityThread的一个内部类ApplicationThread和ActivityThread在Activity的启动过程中发挥着很重要的作用。



### execStartActivity

```java
public ActivityResult execStartActivity(
    Context who,IBinder contextThread,IBinder token,Activity target,
    Intent intent,int requestCode,Bundle options) {
    IApplicationThread whoThread = (IApplicationThread) contextThread;
    if (mActivityMonitors != null) {
        synchronized (mSync) {
            final int N = mActivityMonitors.size();
            for (int i=0; i<N; i++) {
                final ActivityMonitor am = mActivityMonitors.get(i);
                if (am.match(who,null,intent)) {
                    am.mHits++;
                    if (am.isBlocking()) {
                        return requestCode => 0 ? am.getResult() : null;
                    }
                    break;
                }
            }
        }
    }
    try {
        intent.migrateExtraStreamToClipData();
        intent.prepareToLeaveProcess();
        int result = ActivityManagerNative.getDefault()
            .startActivity(whoThread,who.getBasePackageName(),intent,
                           intent.resolveTypeIfNeeded(who.getContentResolver()),
                           token,target != null ? target.mEmbeddedID : null,
                           requestCode,0,null,options);
        checkStartActivityResult(result,intent);
    } catch (RemoteException e) {
    }
    return null;
}
```

- 启动Activity真正的实现由`ActivityManagerNative.getDefault()`的`startActivity`方法来完成。
- ActivityManagerService（简称AMS）继承自ActivityManagerNative，而ActivityManagerNative继承自Binder并实现了IActivityManager这个Binder接口，因此AMS也是一个Binder，它是IActivityManager的具体实现。
- 由于`ActivityManagerNative.getDefault()`其实是一个IActivityManager类型的Binder对象，因此它的具体实现是AMS。
- 在ActivityManagerNative中，AMS这个Binder对象采用单例模式对外提供，Singleton是一个单例的封装类，第一次调用它的`get`方法时它会通过`create`方法来初始化AMS这个Binder对象，在后续的调用中则直接返回之前创建的对象（懒汉式单例）
- `checkStartActivityResult(result,intent)`，直观上看起来这个方法的作用像是在检查启动Activity的结果。当无法正确地启动一个Activity时，这个方法会抛出异常信息，其中最熟悉不过的就是`“Unable to find explicitactivity class; have you declared this activity in your AndroidManifest.xml?”`这个异常了，当待启动的Activity没有在AndroidManifest中注册时，就会抛出这个异常。



### AMS 的 startActivity

```java
public final int startActivity(IApplicationThread caller,String callingPackage,
                               Intent intent,String resolvedType,IBinder resultTo,String resultWho,int requestCode,
                               int startFlags,ProfilerInfo profilerInfo,Bundle options) {
    return startActivityAsUser(caller,callingPackage,intent,resolved-Type,resultTo,
                               resultWho,requestCode,startFlags,profilerInfo,options,
                               UserHandle.getCallingUserId());
}
public final int startActivityAsUser(IApplicationThread caller,String callingPackage,
                                     Intent intent,String resolvedType,IBinder resultTo,String resultWho,int requestCode,
                                     int startFlags,ProfilerInfo profilerInfo,Bundle options,int userId) {
    enforceNotIsolatedCaller("startActivity");
    userId = handleIncomingUser(Binder.getCallingPid(),Binder.getCalling-Uid(),userId,
                                false,ALLOW_FULL_ONLY,"startActivity",null);
    // TODO: Switch to user app stacks here.
    return mStackSupervisor.startActivityMayWait(caller,-1,calling Package,intent,
                                                 resolvedType,null,null,resultTo,resultWho,requestCode,startFlags,
                                                 profilerInfo,null,null,options,userId,null,null);
}
```

Activity的启动过程又转移到了ActivityStackSupervisor的`startActivity-MayWait`方法中了，在`startActivityMayWait`中又调用了`startActivityLocked`方法，然后`startActivityLocked`方法又调用了`startActivityUncheckedLocked`方法，接着`startActivityUncheckedLocked`又调用了ActivityStack的`resumeTopActivitiesLocked`方法，这个时候启动过程已经从ActivityStackSupervisor转移到了ActivityStack。

![image-20231016164656580](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231016/activity%E5%90%AF%E5%8A%A8%E8%BF%87%E7%A8%8B%E4%BC%A0%E9%80%92%E9%A1%BA%E5%BA%8F.png)



### ActivityStackSupervisor 的 realStartActivityLocked

```java
// 部分代码
app.thread.scheduleLaunchActivity(new Intent(r.intent),r.appToken,
                                  System.identityHashCode(r),r.info,new Configuration(mService.mConfiguration),
                                  r.compat,r.task.voiceInteractor,app.repProcState,r.icicle,r.persistentState,
                                  results,newIntents,!andResume,mService.isNextTransitionForward(),
                                  profilerInfo);
```

其中app.thread的类型为IApplicationThread，继承了IInterface接口，所以它是一个Binder类型的接口。

IApplicationThread声明的接口方法可以看出，其内部包含了大量启动、停止Activity的接口，此外还包含了启动和停止服务的接口。从接口方法的命名可以猜测，IApplicationThread这个Binder接口的实现者完成了大量和Activity以及Service==启动/停止==相关的功能。

IApplicationThread的实现类是ActivityThread中的内部类ApplicationThread：

```java
private class ApplicationThread extends ApplicationThreadNative
public abstract class ApplicationThreadNative extends Binder implements IApplicationThread
```

ApplicationThread继承了ApplicationThreadNative，而ApplicationThreadNative则继承了Binder并实现了IApplicationThread接口。

ApplicationThreadNative的作用其实和系统为AIDL文件生成的类是一样的。

在ApplicationThreadNative的内部，还有一个ApplicationThreadProxy类，其实这个内部类也是系统为AIDL文件自动生成的代理类。

```java
class ApplicationThreadProxy implements IApplicationThread {
    private final IBinder mRemote;
    public ApplicationThreadProxy(IBinder remote) {
        mRemote = remote;
    }
    public final IBinder asBinder() {
        return mRemote;
    }
    public final void schedulePauseActivity(IBinder token,boolean finished,
                                            boolean userLeaving,int configChanges,boolean dontReport)
        throws RemoteException {
        Parcel data = Parcel.obtain();
        data.writeInterfaceToken(IApplicationThread.descriptor);
        data.writeStrongBinder(token);
        data.writeInt(finished ? 1 : 0);
        data.writeInt(userLeaving ? 1 :0);
        data.writeInt(configChanges);
        data.writeInt(dontReport ? 1 : 0);
        mRemote.transact(SCHEDULE_PAUSE_ACTIVITY_TRANSACTION,data,null,
                         IBinder.FLAG_ONEWAY);
        data.recycle();
    }
    public final void scheduleStopActivity(IBinder token,boolean showWindow,
                                           int configChanges) throws RemoteException {
        Parcel data = Parcel.obtain();
        data.writeInterfaceToken(IApplicationThread.descriptor);
        data.writeStrongBinder(token);
        data.writeInt(showWindow ? 1 : 0);
        data.writeInt(configChanges);
        mRemote.transact(SCHEDULE_STOP_ACTIVITY_TRANSACTION,data,null,
                         IBinder.FLAG_ONEWAY);
        data.recycle();
    }
    ...
}
```

种种迹象表明，ApplicationThreadNative就是IApplicationThread的实现者，由于ApplicationThreadNative被系统定义为抽象类，所以ApplicationThread就成了IApplicationThread最终的实现者。

Activity的启动过程最终回到了ApplicationThread中，ApplicationThread通过`scheduleLaunchActivity`方法来启动Activity。

```java
public final void scheduleLaunchActivity(Intent intent,IBinder token,int ident,
                                         ActivityInfo info,Configuration curConfig,CompatibilityInfo compatInfo,
                                         IVoiceInteractor voiceInteractor,int procState,Bundle state,
                                         PersistableBundle persistentState,List<ResultInfo> pendingResults,
                                         List<Intent> pendingNewIntents,boolean notResumed,boolean isForward,
                                         ProfilerInfo profilerInfo) {
    updateProcessState(procState,false);
    ActivityClientRecord r = new ActivityClientRecord();
    r.token = token;
    r.ident = ident;
    r.intent = intent;
    r.voiceInteractor = voiceInteractor;
    r.activityInfo = info;
    r.compatInfo = compatInfo;
    r.state = state;
    r.persistentState = persistentState;
    r.pendingResults = pendingResults;
    r.pendingIntents = pendingNewIntents;
    r.startsNotResumed = notResumed;
    r.isForward = isForward;
    r.profilerInfo = profilerInfo;
    updatePendingConfiguration(curConfig);
    sendMessage(H.LAUNCH_ACTIVITY,r);
}
```

在ApplicationThread中，scheduleLaunchActivity的实现很简单，就是发送一个启动Activity的消息交由Handler处理（具体的名称为H）。

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
    ...
        public void handleMessage(Message msg) {
        if (DEBUG_MESSAGES) Slog.v(TAG,">>> handling: " + codeToString(msg.what));
        switch (msg.what) {
            case LAUNCH_ACTIVITY: {
                Trace.traceBegin(Trace.TRACE_TAG_ACTIVITY_MANAGER,"activityStart");
                final ActivityClientRecord r = (ActivityClientRecord) msg.obj;
                r.packageInfo = getPackageInfoNoCheck(
                    r.activityInfo.applicationInfo,r.compatInfo);
                handleLaunchActivity(r,null);
                Trace.traceEnd(Trace.TRACE_TAG_ACTIVITY_MANAGER);
            } break;
            case RELAUNCH_ACTIVITY: {
                Trace.traceBegin(Trace.TRACE_TAG_ACTIVITY_MANAGER,"activityRestart");
                ActivityClientRecord r = (ActivityClientRecord)msg.obj;
                handleRelaunchActivity(r);
                Trace.traceEnd(Trace.TRACE_TAG_ACTIVITY_MANAGER);
            } break;
            case PAUSE_ACTIVITY:
                Trace.traceBegin(Trace.TRACE_TAG_ACTIVITY_MANAGER,"activityPause");
                handlePauseActivity((IBinder)msg.obj,false,(msg.arg1&1) != 0,msg.arg2,
                                    (msg.arg1&2) != 0);
                maybeSnapshot();
                Trace.traceEnd(Trace.TRACE_TAG_ACTIVITY_MANAGER);
                break;
                ...
        }
        if (DEBUG_MESSAGES) Slog.v(TAG,"<<< done: " + codeToString(msg.what));
    }
}
```

从Handler H对`LAUNCH_ACTIVITY`这个消息的处理可以知道，Activity的启动过程由ActivityThread的`handleLaunchActivity`方法来实现。

```java
private void handleLaunchActivity(ActivityClientRecord r,Intent customIntent){
    ...
        if (localLOGV) Slog.v(
            TAG,"Handling launch of " + r);
    Activity a = performLaunchActivity(r,customIntent);
    if (a != null) {
        r.createdConfig = new Configuration(mConfiguration);
        Bundle oldState = r.state;
        handleResumeActivity(r.token,false,r.isForward,
                             !r.activity.mFinished && !r.startsNotResumed);
        ...
    }
    ...
}
```

`performLaunchActivity`方法最终完成了Activity对象的创建和启动过程，并且ActivityThread通过`handleResumeActivity`方法来调用被启动Activity的`onResume`这一生命周期方法。

`performLaunchActivity`这个方法主要完成了如下几件事：

1. 从ActivityClientRecord中获取待启动的 中获取待启动的Activity的组件信息。
2. 通过Instrumentation的`newActivity`方法使用类加载器创建对象。
3. 通过LoadedApk的`makeApplication`方法来尝试创建Application对象。
4. 创建ContextImpl对象并通过Activity的`attach`方法来完成一些重要数据的初始化。
5. 调用Activity的`onCreate`方法





## Service 工作过程

> Service分为两种工作状态，一种是启动状态，主要用于执行后台计算；另一种是绑定状态，主要用于其他组件和Service的交互。
>
> Service的这两种状态是可以共存的，即Service既可以处于启动状态也可以同时处于绑定状态。



### Service 启动过程

#### ContextWrapper 的 startService

```java
public ComponentName startService(Intent service) {
    return mBase.startService(service);
}
```

Activity被创建时会通过attach方法将一个ContextImpl对象关联起来，这个ContextImpl对象就是上述代码中的mBase。从ContextWrapper的实现可以看出，其大部分操作都是通过mBase来实现的，在设计模式中这是一种典型的桥接模式。

```java
public ComponentName startService(Intent service) {
    warnIfCallingFromSystemProcess();
    return startServiceCommon(service,mUser);
}
private ComponentName startServiceCommon(Intent service,UserHandle user) {
    try {
        validateServiceIntent(service);
        service.prepareToLeaveProcess();
        ComponentName cn = ActivityManagerNative.getDefault().startService(
            mMainThread.getApplicationThread(),service,
            service.resolveTypeIfNeeded(getContentResolver()),user.get-Identifier());
        if (cn != null) {
            if (cn.getPackageName().equals("!")) {
                throw new SecurityException(
                    "Not allowed to start service " + service
                    + " without permission " + cn.getClassName());
            } else if (cn.getPackageName().equals("!!")) {
                throw new SecurityException(
                    "Unable to start service " + service
                    + ": " + cn.getClassName());
            }
        }
        return cn;
    } catch (RemoteException e) {
        return null;
    }
}
```

在ContextImpl中，`startService`方法会调用`startServiceCommon`方法，而`startService-Common`方法又会通过`ActivityManagerNative.getDefault()`这个对象来启动一个服务。

需要注意的是，在上述代码中通过AMS来启动服务的行为是一个远程过程调用。



#### AMS 的 startService

```java
public ComponentName startService(IApplicationThread caller,Intent service,
                                  String resolvedType,int userId) {
    enforceNotIsolatedCaller("startService");
    // Refuse possible leaked file descriptors
    if (service != null && service.hasFileDescriptors() == true) {
        throw new IllegalArgumentException("File descriptors passed in Intent");
    }
    if (DEBUG_SERVICE)
        Slog.v(TAG,"startService: " + service + " type=" + resolvedType);
    synchronized(this) {
        final int callingPid = Binder.getCallingPid();
        final int callingUid = Binder.getCallingUid();
        final long origId = Binder.clearCallingIdentity();
        ComponentName res = mServices.startServiceLocked(caller,service,
                                                         resolvedType,callingPid,callingUid,userId);
        Binder.restoreCallingIdentity(origId);
        return res;
    }
}
```

AMS会通过mServices这个对象来完成Service后续的启动过程，mServices对象的类型是ActiveServices，ActiveServices是一个辅助AMS进行Service管理的类，包括Service的==启动、绑定和停止==等。

在ActiveServices的startServiceLocked方法的尾部会调用startServiceInnerLocked方法。

```java
ComponentName startServiceInnerLocked(ServiceMap smap,Intent service,
                                      ServiceRecord r,boolean callerFg,boolean addToStarting) {
    ProcessStats.ServiceState stracker = r.getTracker();
    if (stracker != null) {
        stracker.setStarted(true,mAm.mProcessStats.getMemFactorLocked(),r.lastActivity);
    }
    r.callStart = false;
    synchronized (r.stats.getBatteryStats()) {
        r.stats.startRunningLocked();
    }
    String error = bringUpServiceLocked(r,service.getFlags(),callerFg,false);
    if (error != null) {
        return new ComponentName("!!",error);
    }
    if (r.startRequested && addToStarting) {
        boolean first = smap.mStartingBackground.size() == 0;
        smap.mStartingBackground.add(r);
        r.startingBgTimeout = SystemClock.uptimeMillis() + BG_START_TIMEOUT;
        if (DEBUG_DELAYED_SERVICE) {
            RuntimeException here = new RuntimeException("here");
            here.fillInStackTrace();
            Slog.v(TAG,"Starting background (first=" + first + "): " + r,here);
        } else if (DEBUG_DELAYED_STARTS) {
            Slog.v(TAG,"Starting background (first=" + first + "): " + r);
        }
        if (first) {
            smap.rescheduleDelayedStarts();
        }
    } else if (callerFg) {
        smap.ensureNotStartingBackground(r);
    }
    return r.name;
}
```

ServiceRecord描述的是一个Service记录，ServiceRecord一直贯穿着整个Service的启动过程。

`startServiceInnerLocked`方法并没有完成具体的启动工作，而是把后续的工作交给了`bringUpServiceLocked`方法来处理，在`bringUpServiceLocked`方法中又调用了`realStartServiceLocked`方法。从名字上来看，这个方法应该是真正地启动一个Service。

```java
private final void realStartServiceLocked(ServiceRecord r,
                                          ProcessRecord app,boolean execInFg) throws RemoteException {
    ...
        boolean created = false;
    try {
        String nameTerm;
        int lastPeriod = r.shortName.lastIndexOf('.');
        nameTerm = lastPeriod => 0 ? r.shortName.substring(lastPeriod) : r.shortName;
        if (LOG_SERVICE_START_STOP) {
            EventLogTags.writeAmCreateService(
                r.userId,System.identityHashCode(r),nameTerm,r.app.uid,r.app.pid);
        }
        synchronized (r.stats.getBatteryStats()) {
            r.stats.startLaunchedLocked();
        }
        mAm.ensurePackageDexOpt(r.serviceInfo.packageName);
        app.forceProcessStateUpTo(ActivityManager.PROCESS_STATE_SERVICE);
        app.thread.scheduleCreateService(r,r.serviceInfo,
                                         mAm.compatibilityInfoForPackageLocked(r.serviceInfo.applicationInfo),
                                         app.repProcState);
        r.postNotification();
        created = true;
    } catch (DeadObjectException e) {
        Slog.w(TAG,"Application dead when creating service " + r);
        mAm.appDiedLocked(app);
    } finally {
        if (!created) {
            app.services.remove(r);
            r.app = null;
            scheduleServiceRestartLocked(r,false);
            return;
        }
    }
    requestServiceBindingsLocked(r,execInFg);
    updateServiceClientActivitiesLocked(app,null,true);
    // If the service is in the started state,and there are no
    // pending arguments,then fake up one so its onStartCommand() will
    // be called.
    if (r.startRequested && r.callStart && r.pendingStarts.size() == 0) {
        r.pendingStarts.add(new ServiceRecord.StartItem(r,false,r.make-NextStartId(),
                                                        null,null));
    }
    sendServiceArgsLocked(r,execInFg,true);
    ...
}
```

在`realStartServiceLocked`方法中，首先通过`app.thread`的`scheduleCreateService`方法来创建Service对象并调用其`onCreate`，接着再通过`sendServiceArgsLocked`方法来调用Service的其他方法，比如`onStartCommand`，这两个过程均是进程间通信。

`app.thread`对象是`IApplicationThread`类型，它实际上是一个Binder，它的具体实现是ApplicationThread和ApplicationThreadNative。

由于ApplicationThread继承了ApplicationThreadNative，因此只需要看ApplicationThread对Service启动过程的处理即可，这对应着它`scheduleCreateService`方法

```java
public final void scheduleCreateService(IBinder token,
                                        ServiceInfo info,CompatibilityInfo compatInfo,int processState) {
    updateProcessState(processState,false);
    CreateServiceData s = new CreateServiceData();
    s.token = token;
    s.info = info;
    s.compatInfo = compatInfo;
    sendMessage(H.CREATE_SERVICE,s);
}
```

这个过程和Activity的启动过程是类似的，都是通过发送消息给Handler H来完成的。H会接收这个`CREATE_SERVICE`消息并通过ActivityThread的`handleCreateService`方法来完成Service的最终启动。

```java
private void handleCreateService(CreateServiceData data) {
    // If we are getting ready to gc after going to the background,well
    // we are back active so skip it.
    unscheduleGcIdler();
    LoadedApk packageInfo = getPackageInfoNoCheck(
        data.info.applicationInfo,data.compatInfo);
    Service service = null;
    try {
        java.lang.ClassLoader cl = packageInfo.getClassLoader();
        service = (Service) cl.loadClass(data.info.name).newInstance();
    } catch (Exception e) {
        if (!mInstrumentation.onException(service,e)) {
            throw new RuntimeException(
                "Unable to instantiate service " + data.info.name
                + ": " + e.toString(),e);
        }
    }
    try {
        if (localLOGV) Slog.v(TAG,"Creating service " + data.info.name);
        ContextImpl context = ContextImpl.createAppContext(this,packageInfo);
        context.setOuterContext(service);
        Application app = packageInfo.makeApplication(false,mInstrumen-tation);
        service.attach(context,this,data.info.name,data.token,app,
                       ActivityManagerNative.getDefault());
        service.onCreate();
        mServices.put(data.token,service);
        try {
            ActivityManagerNative.getDefault().serviceDoneExecuting(
                data.token,0,0,0);
        } catch (RemoteException e) {
            // nothing to do.
        }
    } catch (Exception e) {
        if (!mInstrumentation.onException(service,e)) {
            throw new RuntimeException(
                "Unable to create service " + data.info.name
                + ": " + e.toString(),e);
        }
    }
}
```

handleCreateService主要完成了如下几件事：

1. 通过类加载器创建Service的实例。
2. 创建Application对象并调用其onCreate，当然Application的创建过程只会有一次。
3. 着创建ConTextImpl对象并通过Service的attach方法建立二者之间的关系，这个过程和Activity实际上是类似的，毕竟Service和Activity都是一个Context。
4. 调用Service的onCreate方法并将Service对象存储到ActivityThread中的一个列表中（ActivityThread 列表为：`final ArrayMap<IBinder,Service> mServices = new ArrayMap<IBinder,Service>()`）

ActivityThread中还会通过handleServiceArgs方法调用Service的onStartCommand方法：

```java
private void handleServiceArgs(ServiceArgsData data) {
    Service s = mServices.get(data.token);
    if (s != null) {
        try {
            if (data.args != null) {
                data.args.setExtrasClassLoader(s.getClassLoader());
                data.args.prepareToEnterProcess();
            }
            int res;
            if (!data.taskRemoved) {
                res = s.onStartCommand(data.args,data.flags,data.startId);
            } else {
                s.onTaskRemoved(data.args);
                res = Service.START_TASK_REMOVED_COMPLETE;
            }
            QueuedWork.waitToFinish();
            try {
                ActivityManagerNative.getDefault().serviceDoneExecuting(
                    data.token,1,data.startId,res);
            } catch (RemoteException e) {
                // nothing to do.
            }
            ensureJitEnabled();
        } catch (Exception e) {
            if (!mInstrumentation.onException(s,e)) {
                throw new RuntimeException(
                    "Unable to start service " + s
                    + " with " + data.args + ": " + e.toString(),e);
            }
        }
    }
}
```



### Service 绑定过程

和Service的启动过程一样，Service的绑定过程也是从ContextWrapper开始的。

过程和Service的启动过程是类似的，mBase同样是ContextImpl类型的对象。ContextImpl的bindService方法最终会调用自己的bindServiceCommon方法。

```java
private boolean bindServiceCommon(Intent service,ServiceConnection conn,int flags,
                                  UserHandle user) {
    IServiceConnection sd;
    if (conn == null) {
        throw new IllegalArgumentException("connection is null");
    }
    if (mPackageInfo != null) {
        sd = mPackageInfo.getServiceDispatcher(conn,getOuterContext(),
                                               mMainThread.getHandler(),flags);
    } else {
        throw new RuntimeException("Not supported in system context");
    }
    validateServiceIntent(service);
    try {
        IBinder token = getActivityToken();
        if (token == null && (flags&BIND_AUTO_CREATE) == 0 && mPackageInfo !=null
            && mPackageInfo.getApplicationInfo().targetSdkVersion
            < android.os.Build.VERSION_CODES.ICE_CREAM_SANDWICH) {
            flags |= BIND_WAIVE_PRIORITY;
        }
        service.prepareToLeaveProcess();
        int res = ActivityManagerNative.getDefault().bindService(
            mMainThread.getApplicationThread(),getActivityToken(),
            service,service.resolveTypeIfNeeded(getContentResolver()),
            sd,flags,user.getIdentifier());
        if (res < 0) {
            throw new SecurityException(
                "Not allowed to bind to service " + service);
        }
        return res != 0;
    } catch (RemoteException e) {
        return false;
    }
}
```

将客户端的ServiceConnection对象转化为ServiceDispatcher.InnerConnection对象。之所以不能直接使用ServiceConnection对象，这是因为服务的绑定有可能是跨进程的，因此ServiceConnection对象必须借助于Binder才能让远程服务端回调自己的方法，而ServiceDispatcher的内部类InnerConnection刚好充当了Binder这个角色（ServiceDispatcher起着连接ServiceConnection和InnerConnection的作用。这个过程由LoadedApk的`getServiceDispatcher`方法来完成）

```java
public final IServiceConnection getServiceDispatcher(ServiceConnection c,
                                                     Context context,Handler handler,int flags) {
    synchronized (mServices) {
        LoadedApk.ServiceDispatcher sd = null;
        ArrayMap<serviceConnection,LoadedApk.ServiceDispatcher> map = mServices.get(context);
        if (map != null) {
            sd = map.get(c);
        }
        if (sd == null) {
            sd = new ServiceDispatcher(c,context,handler,flags);
            if (map == null) {
                map = new ArrayMap<serviceConnection,LoadedApk.Service-Dispatcher>();
                mServices.put(context,map);
            }
            map.put(c,sd);
        } else {
            sd.validate(context,handler);
        }
        return sd.getIServiceConnection();
    }
}
```

mServices是一个ArrayMap，它存储了一个应用当前活动的ServiceConnection和ServiceDispatcher的映射关系：

```java
private final ArrayMap<Context,ArrayMap<serviceConnection,LoadedApk.ServiceDispatcher>> mServices = new ArrayMap<Context,ArrayMap <serviceConnection,LoadedApk.ServiceDispatcher>>();
```

系统首先会查找是否存在相同的ServiceConnection，如果不存在就重新创建一个ServiceDispatcher对象并将其存储在mServices中，其中映射关系的key是ServiceConnection，value是ServiceDispatcher。

在ServiceDispatcher的内部又保存了ServiceConnection和InnerConnection对象。当Service和客户端建立连接后，系统会通过InnerConnection来调用ServiceConnection中的onServiceConnected方法，这个过程有可能是跨进程的。当ServiceDispatcher创建好了以后，getServiceDispatcher会返回其保存的InnerConnection对象。

接着bindServiceCommon方法会通过AMS来完成Service的具体的绑定过程：

```java
public int bindService(IApplicationThread caller,IBinder token,
                       Intent service,String resolvedType,
                       IServiceConnection connection,int flags,int userId) {
    enforceNotIsolatedCaller("bindService");
    // Refuse possible leaked file descriptors
    if (service != null && service.hasFileDescriptors() == true) {
        throw new IllegalArgumentException("File descriptors passed in Intent");
    }
    synchronized(this) {
        return mServices.bindServiceLocked(caller,token,service,resolvedType,
                                           connection,flags,userId);
    }
}
```

AMS会调用ActiveServices的`bindServiceLocked`方法，`bindServiceLocked`再调用`bringUpServiceLocked`，`bringUpServiceLocked`又会调用`realStartServiceLocked`方法（和 Service 启动过程类似，最终都是通过ApplicationThread来完成Service实例的创建并执行其onCreate方法）

和启动Service不同的是，Service的绑定过程会调用`app.thread`的`scheduleBindService`方法，这个过程的实现在ActiveServices的`requestServiceBindingLocked`方法中。

```java
private final boolean requestServiceBindingLocked(ServiceRecord r,
                                                  IntentBindRecord i,boolean execInFg,boolean rebind) {
    if (r.app == null || r.app.thread == null) {
        // If service is not currently running,can't yet bind.
        return false;
    }
    if ((!i.requested || rebind) && i.apps.size() > 0) {
        try {
            bumpServiceExecutingLocked(r,execInFg,"bind");
            r.app.forceProcessStateUpTo(ActivityManager.PROCESS_STATE_SERVICE);
            r.app.thread.scheduleBindService(r,i.intent.getIntent(),rebind,
                                             r.app.repProcState);
            if (!rebind) {
                i.requested = true;
            }
            i.hasBound = true;
            i.doRebind = false;
        } catch (RemoteException e) {
            if (DEBUG_SERVICE) Slog.v(TAG,"Crashed while binding " + r);
            return false;
        }
    }
    return true;
}
```

`app.thread`实际上就是ApplicationThread。ApplicationThread的一系列以`schedule`开头的方法，其内部都是通过Handler H来中转的，对于`scheduleBindService`方法来说也是如此

```java
public final void scheduleBindService(IBinder token,Intent intent,
                                      boolean rebind,int processState) {
    updateProcessState(processState,false);
    BindServiceData s = new BindServiceData();
    s.token = token;
    s.intent = intent;
    s.rebind = rebind;
    if (DEBUG_SERVICE)
        Slog.v(TAG,"scheduleBindService token=" + token + " intent=" + intent + " uid="
               + Binder.getCallingUid() + " pid=" + Binder.getCallingPid());
    sendMessage(H.BIND_SERVICE,s);
}
```

在H内部，接收到`BIND_SERVICE`这类消息时，会交给ActivityThread的`handleBind-Service`方法来处理。

在handleBindService中，首先根据Service的token取出Service对象，然后调用Service的`onBind`方法，Service的`onBind`方法会返回一个Binder对象给客户端使用。

原则上来说，Service的`onBind`方法被调用以后，Service就处于绑定状态了，但是`onBind`方法是Service的方法，这个时候客户端并不知道已经成功连接Service了，所以还必须调用客户端的ServiceConnection中的`onServiceConnected`，这个过程是由`ActivityManagerNative.getDefault()`的`publishService`方法来完成的，而前面多次提到，`ActivityManagerNative.getDefault()`就是AMS。

```java
private void handleBindService(BindServiceData data) {
    Service s = mServices.get(data.token);
    if (DEBUG_SERVICE)
        Slog.v(TAG,"handleBindService s=" + s + " rebind=" + data.rebind);
    if (s != null) {
        try {
            data.intent.setExtrasClassLoader(s.getClassLoader());
            data.intent.prepareToEnterProcess();
            try {
                if (!data.rebind) {
                    IBinder binder = s.onBind(data.intent);
                    ActivityManagerNative.getDefault().publishService(
                        data.token,data.intent,binder);
                } else {
                    s.onRebind(data.intent);
                    ActivityManagerNative.getDefault().serviceDoneExecuting(
                        data.token,0,0,0);
                }
                ensureJitEnabled();
            } catch (RemoteException ex) {
            }
        } catch (Exception e) {
            if (!mInstrumentation.onException(s,e)) {
                throw new RuntimeException(
                    "Unable to bind to service " + s
                    + " with " + data.intent + ": " + e.toString(),e);
            }
        }
    }
}
```

Service有一个特性，当多次绑定同一个Service时，Service的onBind方法只会执行一次，除非Service被终止了。

当Service的`onBind`执行以后，系统还需要告知客户端已经成功连接Service了。根据上面的分析，这个过程由AMS的publishService方法来实现：

```java
public void publishService(IBinder token,Intent intent,IBinder service) {
    // Refuse possible leaked file descriptors
    if (intent != null && intent.hasFileDescriptors() == true) {
        throw new IllegalArgumentException("File descriptors passed in Intent");
    }
    synchronized(this) {
        if (!(token instanceof ServiceRecord)) {
            throw new IllegalArgumentException("Invalid service token");
        }
        mServices.publishServiceLocked((ServiceRecord)token,intent,service);
    }
}
```

AMS的`publishService`方法将具体的工作交给了ActiveServices类型的mServices对象来处理。ActiveServices的`publishServiceLocked`方法看起来很复杂，但其实核心代码就只有一句话：`c.conn.connected(r.name,service)`，其中c的类型是ConnectionRecord，c.conn的类型是ServiceDispatcher.InnerConnection，service就是Service的`onBind`方法返回的Binder对象。

```java
private static class InnerConnection extends IServiceConnection.Stub {
    final WeakReference<LoadedApk.ServiceDispatcher> mDispatcher;
    InnerConnection(LoadedApk.ServiceDispatcher sd) {
        mDispatcher = new WeakReference<LoadedApk.ServiceDispatcher>(sd);
    }
    public void connected(ComponentName name,IBinder service) throws RemoteException {
        LoadedApk.ServiceDispatcher sd = mDispatcher.get();
        if (sd != null) {
            sd.connected(name,service);
        }
    }
}
```

从InnerConnection的定义可以看出，它的`connected`方法又调用了ServiceDispatcher的`connected`方法：

```java
public void connected(ComponentName name,IBinder service) {
    if (mActivityThread != null) {
        mActivityThread.post(new RunConnection(name,service,0));
    } else {
        doConnected(name,service);
    }
}
```

对于Service的绑定过程来说，ServiceDispatcher的mActivityThread是一个Handler，其实它就是ActivityThread中的H，从前面ServiceDispatcher的创建过程来说，mActivityThread不会为null，这样一来，RunConnection就可以经由H的post方法从而运行在主线程中，因此，客户端ServiceConnection中的方法是在主线程被回调的：

```java
private final class RunConnection implements Runnable {
    RunConnection(ComponentName name,IBinder service,int command) {
        mName = name;
        mService = service;
        mCommand = command;
    }
    public void run() {
        if (mCommand == 0) {
            doConnected(mName,mService);
        } else if (mCommand == 1) {
            doDeath(mName,mService);
        }
    }
    final ComponentName mName;
    final IBinder mService;
    final int mCommand;
}
```

RunConnection的run方法也是简单调用了ServiceDispatcher的`doConnected`方法，由于ServiceDispatcher内部保存了客户端的ServiceConnection对象，因此它可以很方便地调用ServiceConnection对象的`onServiceConnected`方法：

```java
if (service != null) {
    mConnection.onServiceConnected(name,service);
}
```





## BroadcastReceiver 工作过程

> BroadcastReceiver的工作过程，主要包含两方面的内容，一个是广播的注册过程，另一个是广播的发送和接收过程。
>
> 广播接收者，注册分为两种方式，既可以在AndroidManifest文件中静态注册，也可以通过代码动态注册。



### BroadcastReceiver 注册过程

:::warning 注意

静态注册的广播在应用安装时由系统自动完成注册，具体来说是由PMS（PackageManagerService）来完成整个注册过程的，除了广播以外，其他三大组件也都是在应用安装时由PMS解析并注册的（此处不再讨论静态注册）

:::

动态注册的过程是从ContextWrapper的registerReceiver方法开始的，和Activity以及Service一样。ContextWrapper并没有做实际的工作，而是将注册过程直接交给了ContextImpl来完成。

```java
public Intent registerReceiver(
    BroadcastReceiver receiver,IntentFilter filter) {
    return mBase.registerReceiver(receiver,filter);
}
```

ContextImpl的registerReceiver方法调用了自己的registerReceiverInternal方法：

```java
private Intent registerReceiverInternal(BroadcastReceiver receiver,int userId,
                                        IntentFilter filter,String broadcastPermission,
                                        Handler scheduler,Context context) {
    IIntentReceiver rd = null;
    if (receiver != null) {
        if (mPackageInfo != null && context != null) {
            if (scheduler == null) {
                scheduler = mMainThread.getHandler();
            }
            rd = mPackageInfo.getReceiverDispatcher(
                receiver,context,scheduler,
                mMainThread.getInstrumentation(),true);
        } else {
            if (scheduler == null) {
                scheduler = mMainThread.getHandler();
            }
            rd = new LoadedApk.ReceiverDispatcher(
                receiver,context,scheduler,null,true).getIIntent-Receiver();
        }
    }
    try {
        return ActivityManagerNative.getDefault().registerReceiver(
            mMainThread.getApplicationThread(),mBasePackageName,
            rd,filter,broadcastPermission,userId);
    } catch (RemoteException e) {
        return null;
    }
}
```

系统首先从mPackageInfo获取IIntentReceiver对象，然后再采用跨进程的方式向AMS发送广播注册的请求。

之所以采用IIntentReceiver而不是直接采用BroadcastReceiver，这是因为上述注册过程是一个进程间通信的过程，而BroadcastReceiver作为Android的一个组件是不能直接跨进程传递的，所以需要通过IIntentReceiver来中转一下。

IIntentReceiver必须是一个Binder接口，它的具体实现是LoadedApk.Receiver-Dispatcher.InnerReceiver，ReceiverDispatcher的内部同时保存了BroadcastReceiver和InnerReceiver，这样当接收到广播时，ReceiverDispatcher可以很方便地调用BroadcastReceiver的`onReceive`方法。

BroadcastReceiver的这个过程和Service的实现原理类似，Service也有一个叫ServiceDispatcher的类，并且其内部类InnerConnection也是一个Binder接口，作用同样也是为了进程间通信。

注册广播的真正实现过程是在AMS中，会把远程的InnerReceiver对象以及IntentFilter对象存储起来，这样整个广播的注册过程就完成了。

```java
public Intent registerReceiver(IApplicationThread caller,String callerPackage,
                               IIntentReceiver receiver,IntentFilter filter,String permission,int userId) {
    ...
        mRegisteredReceivers.put(receiver.asBinder(),rl);
    BroadcastFilter bf = new BroadcastFilter(filter,rl,callerPackage,
                                             permission,callingUid,userId);
    rl.add(bf);
    if (!bf.debugCheck()) {
        Slog.w(TAG,"==> For Dynamic broadast");
    }
    mReceiverResolver.addFilter(bf);
    ...
}
```



### BroadcastReceiver 发送和接收

当通过send方法来发送广播时，AMS会查找出匹配的广播接收者并将广播发送给它们处理。

广播的发送有几种类型：

- 普通广播
- 有序广播
- 粘性广播

有序广播和粘性广播与普通广播相比具有不同的特性，但是它们的发送/接收过程的流程是类似的。

广播的发送和接收，其本质是一个过程的两个阶段。

广播的发送仍然开始于ContextWrapper的sendBroadcast方法，之所以不是Context，那是因为Context的sendBroadcast是一个抽象方法。和广播的注册过程一样，ContextWrapper的sendBroadcast方法仍然什么都不做，只是把事情交给ContextImpl去处理。

```java
public void sendBroadcast(Intent intent) {
    warnIfCallingFromSystemProcess();
    String resolvedType = intent.resolveTypeIfNeeded(getContentResolver());
    try {
        intent.prepareToLeaveProcess();
        // 看下面的具体实现
        ActivityManagerNative.getDefault().broadcastIntent(
            mMainThread.getApplicationThread(),intent,resolvedType,null,
            Activity.RESULT_OK,null,null,null,AppOpsManager.OP_NONE,false,false,
            getUserId());
    } catch (RemoteException e) {
    }
}

public final int broadcastIntent(IApplicationThread caller,
                                 Intent intent,String resolvedType,IIntentReceiver resultTo,
                                 int resultCode,String resultData,Bundle map,
                                 String requiredPermission,int appOp,boolean serialized,boolean sticky,int userId) {
    enforceNotIsolatedCaller("broadcastIntent");
    synchronized(this) {
        intent = verifyBroadcastLocked(intent);
        final ProcessRecord callerApp = getRecordForAppLocked(caller);
        final int callingPid = Binder.getCallingPid();
        final int callingUid = Binder.getCallingUid();
        final long origId = Binder.clearCallingIdentity();
        int res = broadcastIntentLocked(callerApp,
                                        callerApp != null ? callerApp.info.packageName : null,
                                        intent,resolvedType,resultTo,
                                        resultCode,resultData,map,requiredPermission,appOp,serialized,sticky,
                                        callingPid,callingUid,userId);
        Binder.restoreCallingIdentity(origId);
        return res;
    }
}
```

:::warning 注意

Android 3.1中为Intent添加了两个标记位，分别是`FLAG_INCLUDE_STOPPED_PACKAGES`和`FLAG_EXCLUDE_STOPPED_PACKAGES`，用来控制广播是否要对处于停止状态的应用起作用：

1. `FLAG_INCLUDE_STOPPED_PACKAGES`：表示包含已经停止的应用，这时广播会发送给已经停止的应用。
2. `FLAG_EXCLUDE_STOPPED_PACKAGES`：表示不包含已经停止的应用，这个时候广播不会发送给已经停止的应用。

从Android 3.1开始，系统为所有广播默认添加了FLAG_EXCLUDE_STOPPED_PACKAGES标志，这样做是为了防止广播无意间或者在不必要的时候调起已经停止运行的应用。

一个应用处于停止状态分为两种情形：第一种是应用安装后未运行，第二种是应用被手动或者其他应用强停了。

:::

在broadcastIntentLocked的内部，会根据intent-filter查找出匹配的广播接收者并经过一系列的条件过滤，最终会将满足条件的广播接收者添加到BroadcastQueue中，接着BroadcastQueue就会将广播发送给相应的广播接收者。

```java
if ((receivers != null && receivers.size() > 0)
    || resultTo != null) {
    BroadcastQueue queue = broadcastQueueForIntent(intent);
    BroadcastRecord r = new BroadcastRecord(queue,intent,callerApp,
                                            callerPackage,callingPid,callingUid,resolvedType,
                                            requiredPermission,appOp,receivers,resultTo,resultCode,
                                            resultData,map,ordered,sticky,false,userId);
    if (DEBUG_BROADCAST) Slog.v(
        TAG,"Enqueueing ordered broadcast " + r
        + ": prev had " + queue.mOrderedBroadcasts.size());
    if (DEBUG_BROADCAST) {
        int seq = r.intent.getIntExtra("seq",-1);
        Slog.i(TAG,"Enqueueing broadcast " + r.intent.getAction() + " seq=" + seq);
    }
    boolean replaced = replacePending && queue.replaceOrderedBroadcast-Locked(r);
    if (!replaced) {
        queue.enqueueOrderedBroadcastLocked(r);
        queue.scheduleBroadcastsLocked();
    }
}

public void scheduleBroadcastsLocked() {
    if (DEBUG_BROADCAST) Slog.v(TAG,"Schedule broadcasts ["
                                + mQueueName + "]: current="
                                + mBroadcastsScheduled);
    if (mBroadcastsScheduled) {
        return;
    }
    // BroadcastQueue收到消息后会调用process-NextBroadcast方法
    mHandler.sendMessage(mHandler.obtainMessage(BROADCAST_INTENT_MSG,this));
    mBroadcastsScheduled = true;
}

// BroadcastQueue的processNextBroadcast方法对普通广播的处理
while (mParallelBroadcasts.size() > 0) {
    r = mParallelBroadcasts.remove(0);
    r.dispatchTime = SystemClock.uptimeMillis();
    r.dispatchClockTime = System.currentTimeMillis();
    final int N = r.receivers.size();
    if (DEBUG_BROADCAST_LIGHT) Slog.v(TAG,"Processing parallel broadcast ["
                                      + mQueueName + "] " + r);
    for (int i=0; i<N; i++) {
        Object target = r.receivers.get(i);
        if (DEBUG_BROADCAST) Slog.v(TAG,
                                    "Delivering non-ordered on["+mQueueName + "] to registered "
                                    + target + ": " + r);
        deliverToRegisteredReceiverLocked(r,(BroadcastFilter)target,false);
    }
    addBroadcastToHistoryLocked(r);
    if (DEBUG_BROADCAST_LIGHT) Slog.v(TAG,"Done with parallel broadcast ["
                                      + mQueueName + "] " + r);
}
```

无序广播存储在mParallelBroadcasts中，系统会遍历mParallelBroadcasts并将其中的广播发送给它们所有的接收者，具体的发送过程是通过`deliverToRegistered-ReceiverLocked`方法来实现的。`deliverToRegisteredReceiverLocked`方法负责将一个广播发送给一个特定的接收者，它内部调用了`performReceiveLocked`方法来完成具体的发送过程：

```java
performReceiveLocked(filter.receiverList.app,filter.receiverList.receiver,
                     new Intent(r.intent),r.resultCode,r.resultData,
                     r.resultExtras,r.ordered,r.initialSticky,r.userId);

private static void performReceiveLocked(ProcessRecord app,IIntentReceiver
                                         receiver,
                                         Intent intent,int resultCode,String data,Bundle extras,
                                         boolean ordered,boolean sticky,int sendingUser) throws Remote-Exception {
    // Send the intent to the receiver asynchronously using one-way binder calls.
    if (app != null) {
        if (app.thread != null) {
            // If we have an app thread,do the call through that so it is
            // correctly ordered with other one-way calls.
            app.thread.scheduleRegisteredReceiver(receiver,intent,resultCode,
                                                  data,extras,ordered,sticky,sendingUser,app.repProcState);
        } else {
            // Application has died. Receiver doesn't exist.
            throw new RemoteException("app.thread must not be null");
        }
    } else {
        receiver.performReceive(intent,resultCode,data,extras,ordered,
                                sticky,sendingUser);
    }
}

public void scheduleRegisteredReceiver(IIntentReceiver receiver,Intent
                                       intent,
                                       int resultCode,String dataStr,Bundle extras,boolean ordered,
                                       boolean sticky,int sendingUser,int processState) throws RemoteException {
    updateProcessState(processState,false);
    receiver.performReceive(intent,resultCode,dataStr,extras,ordered,sticky,sendingUser);
}

public void performReceive(Intent intent,int resultCode,String data,
                           Bundle extras,boolean ordered,boolean sticky,int sendingUser) {
    if (ActivityThread.DEBUG_BROADCAST) {
        int seq = intent.getIntExtra("seq",-1);
        Slog.i(ActivityThread.TAG,"Enqueueing broadcast " + intent.getAction() + " seq=" + seq + " to " + mReceiver);
    }
    Args args = new Args(intent,resultCode,data,extras,ordered,
                         sticky,sendingUser);
    if (!mActivityThread.post(args)) {
        if (mRegistered && ordered) {
            IActivityManager mgr = ActivityManagerNative.getDefault();
            if (ActivityThread.DEBUG_BROADCAST) Slog.i(ActivityThread.TAG,
                                                       "Finishing sync broadcast to " + mReceiver);
            args.sendFinished(mgr);
        }
    }
}
```

上面创建了一个Args对象并通过mActivityThread的post方法来执行Args中的逻辑，而Args实现了Runnable接口。

mActivityThread是一个Handler，它其实就是ActivityThread中的mH，mH的类型是ActivityThread的内部类H。

Args的run方法：

```java
final BroadcastReceiver receiver = mReceiver;
receiver.setPendingResult(this);
receiver.onReceive(mContext,intent);
```

这个时候BroadcastReceiver的onReceive方法被执行了，也就是说应用已经接收到广播了，同时onReceive方法是在广播接收者的主线程中被调用的。



## ContentProvider 工作过程

ContentProvider是一种内容共享型组件，它通过Binder向其他组件乃至其他应用提供数据。

当ContentProvider所在的进程启动时，ContentProvider会同时启动并被发布到AMS中（注意：此时ContentProvider的onCreate要先于Application的onCreate而执行，这在四大组件中是一个少有的现象）

ContentProvider 的启动过程：

![image-20231017220738696](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231017/contentprovider%E5%90%AF%E5%8A%A8%E8%BF%87%E7%A8%8B.png)

ContentProvider中的insert、delete、update和query四个方法都是通过Binder来调用的，外界无法直接访问ContentProvider，它只能通过AMS根据Uri来获取对应的ContentProvider的Binder接口IConentProvider，然后再通过IConentProvider来访问ContentProvider中的数据源。

当android:multiprocess为false时，ContentProvider是单实例，这也是默认值；当android:multiprocess为true时，ContentProvider为多实例，这个时候在每个调用者的进程中都存在一个ContentProvider对象（一般来说都是使用单实例）

访问ContentProvider需要通过ContentResolver，ContentResolver是一个抽象类，通过Context的getContentResolver方法获取的实际上是ApplicationContentResolver对象，ApplicationContentResolver类继承了ContentResolver并实现了ContentResolver中的抽象方法。

当ContentProvider所在的进程未启动时，第一次访问它时就会触发ContentProvider的创建，当然这也伴随着ContentProvider所在进程的启动。通过ContentProvider的四个方法的任何一个都可以触发ContentProvider的启动过程。

ContentProvider的query方法中，首先会获取IContentProvider对象，不管是通过acquireUnstableProvider方法还是直接通过acquireProvider方法，它们的本质都是一样的，最终都是通过acquireProvider方法来获取ContentProvider。

```java
protected IContentProvider acquireProvider(Context context,String auth) {
    // 直接调用了ActivityThread的acquireProvider方法
    return mMainThread.acquireProvider(context,
                                       ContentProvider.getAuthorityWithoutUserId(auth),
                                       resolveUserIdFromAuthority(auth),true);
}

// 查找是否已经存在目标ContentProvider了，如果存在就直接返回。ActivityThread中通过mProviderMap来存储已经启动的ContentProvider对象
// final ArrayMap<providerKey,ProviderClientRecord> mProviderMap = new ArrayMap<providerKey,ProviderClientRecord>();
public final IContentProvider acquireProvider(
    Context c,String auth,int userId,boolean stable) {
    final IContentProvider provider = acquireExistingProvider(c,auth,userId,stable);
    if (provider != null) {
        return provider;
    }
    // There is a possible race here. Another thread may try to acquire
    // the same provider at the same time. When this happens,we want to ensure
    // that the first one wins.
    // Note that we cannot hold the lock while acquiring and installing the
    // provider since it might take a long time to run and it could also potentially
    // be re-entrant in the case where the provider is in the same process.
    IActivityManager.ContentProviderHolder holder = null;
    try {
        holder = ActivityManagerNative.getDefault().getContentProvider(
            getApplicationThread(),auth,userId,stable);
    } catch (RemoteException ex) {
    }
    if (holder == null) {
        Slog.e(TAG,"Failed to find provider info for " + auth);
        return null;
    }
    // Install provider will increment the reference count for us,and break
    // any ties in the race.
    holder = installProvider(c,holder,holder.info,
                             true /*noisy*/,holder.noReleaseNeeded,stable);
    return holder.provider;
}
```

如果目前ContentProvider没有启动，那么就发送一个进程间请求给AMS让其启动目标ContentProvider，最后再通过installProvider方法来修改引用计数。

ContentProvider被启动时会伴随着进程的启动，在AMS中，首先会启动ContentProvider所在的进程，然后再启动ContentProvider。

启动进程是由AMS的startProcessLocked方法来完成的，其内部主要是通过Process的start方法来完成一个新进程的启动，新进程启动后其入口方法为ActivityThread的main方法：

```java
public static void main(String[] args) {
    SamplingProfilerIntegration.start();
    // CloseGuard defaults to true and can be quite spammy. We
    // disable it here,but selectively enable it later (via
    // StrictMode) on debug builds,but using DropBox,not logs.
    CloseGuard.setEnabled(false);
    Environment.initForCurrentUser();
    // Set the reporter for event logging in libcore
    EventLogger.setReporter(new EventLoggingReporter());
    Security.addProvider(new AndroidKeyStoreProvider());
    // Make sure TrustedCertificateStore looks in the right place for CA certificates
    final File configDir = Environment.getUserConfigDirectory(User-Handle.myUserId());
    TrustedCertificateStore.setDefaultUserDirectory(configDir);
    Process.setArgV0("<pre-initialized>");
    Looper.prepareMainLooper();
    ActivityThread thread = new ActivityThread();
    thread.attach(false);
    if (sMainThreadHandler == null) {
        sMainThreadHandler = thread.getHandler();
    }
    AsyncTask.init();
    if (false) {
        Looper.myLooper().setMessageLogging(new
                                            LogPrinter(Log.DEBUG,"ActivityThread"));
    }
    Looper.loop();
    throw new RuntimeException("Main thread loop unexpectedly exited");
}
```

ActivityThread的main方法是一个静态方法，在它内部首先会创建Activity-Thread的实例并调用attach方法来进行一系列初始化，接着就开始进行消息循环了。ActivityThread的attach方法会将ApplicationThread对象通过AMS的attachApplication方法跨进程传递给AMS，最终AMS会完成ContentProvider的创建过程。

AMS的attachApplication方法调用了attachApplicationLocked方法，attachApplication-Locked中又调用了ApplicationThread的bindApplication，注意这个过程也是进程间调用：

```java
thread.bindApplication(processName,appInfo,providers,app.instrumen- tationClass,
                       profilerInfo,app.instrumentationArguments,app.instrumentation-Watcher,
                       app.instrumentationUiAutomationConnection,testMode,enableOpen-GlTrace,
                       isRestrictedBackupMode || !normalMode,app.persistent,
                       new Configuration(mConfiguration),app.compat,getCommonServices-Locked(),
                       mCoreSettingsObserver.getCoreSettingsLocked());
```

ActivityThread的bindApplication会发送一个BIND_APPLICATION类型的消息给mH，mH是一个Handler，它收到消息后会调用ActivityThread的handleBindApplication方法：

```java
AppBindData data = new AppBindData();
data.processName = processName;
data.appInfo = appInfo;
data.providers = providers;
data.instrumentationName = instrumentationName;
data.instrumentationArgs = instrumentationArgs;
data.instrumentationWatcher = instrumentationWatcher;
data.instrumentationUiAutomationConnection = instrumentationUiConnection;
data.debugMode = debugMode;
data.enableOpenGlTrace = enableOpenGlTrace;
data.restrictedBackupMode = isRestrictedBackupMode;
data.persistent = persistent;
data.config = config;
data.compatInfo = compatInfo;
data.initProfilerInfo = profilerInfo;
sendMessage(H.BIND_APPLICATION,data);
```

ActivityThread的handleBindApplication则完成了Application的创建以及Content-Provider的创建，可以分为如下四个步骤：

1. 创建ContextImpl和Instrumentation
2. 创建Application对象
3. 启动当前进程的ContentProvider并调用`onCreate`方法
4. 调用Application的`onCreate`方法

经过上面的四个步骤，ContentProvider已经成功启动，并且其所在进程的Application也已经启动，这意味着ContentProvider所在的进程已经完成了整个的启动过程，然后其他应用就可以通过AMS来访问这个ContentProvider了。

需要注意的是，这里的ContentProvider并不是原始的ContentProvider，而是ContentProvider的Binder类型的对象IContentProvider，IContentProvider的具体实现是ContentProviderNative和ContentProvider.Transport，其中ContentProvider.Transport继承了ContentProviderNative。

其他应用会通过

AMS获取到ContentProvider的Binder对象即IContentProvider，而IContentProvider的实现者实际上是ContentProvider.Transport。因此其他应用调用IContentProvider的query方法时最终会以进程间通信的方式调用到ContentProvider.Transport的query方法。