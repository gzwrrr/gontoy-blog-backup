---
title: "Android Activity"
shortTitle: "C-Android Activity"
description: "Android Activity"
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
  text: "Android Activity"
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
  title: "Android Activity"
  description: "Android Activity"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android Activity

[[toc]]



## 启动模式

:::info 相关视频

[Android 面试黑洞——当我按下 Home 键再切回来，会发生什么？](https://www.bilibili.com/video/BV1CA41177Se/?spm_id_from=333.999.0.0&vd_source=e356fec025b50061af78324a814f8da0)（讲得很好，推荐看看~）

:::

> 当多次启动同一个Activity的时候，系统会创建多个实例并把它们一一放入「任务栈」中，当单击back键，会发现这些Activity会一一回退。
>
> 任务栈是一种「后进先出」的栈结构，每按一下back键就会有一个Activity出栈，直到栈空为止，当栈中无任何Activity的时候，系统就会「回收」这个任务栈。

**启动模式 LaunchMode：**

1. `standard`：先进后出
2. `singleTop`：栈顶复用
3. `singleInstance`：全局唯一
4. `singleTask`：栈顶复用并清空目标活动上面的所有活动

**Flags 启动标志（在 intent 种设置）：**

1. `FLAG_ACTIVITY_SINGLE_TOP`：当栈顶为待跳转的活动时，重用该活动
2. `FLAG_ACTIVITY_CLEAR_TOP`：创建新的活动并销毁
3. `FLAG_ACTIVITY_CLEAR_TASK`：跳转到新活动中时，将栈中所有的任务清除
4. `FLAG_ACTIVITY_NEW_TASK`：开启新的任务栈
5. `FLAG_ACTIVITY_NO_HISTORY`：栈中不保存新启动的实例
6. 如要启动 Activity，可以向 `startActivity()` 或 `startActivityForResult()` 传递 `Intent`（想让 Activity 返回结果时），或者为其安排新任务。
7. 在 Android 5.0（API 级别 21）及更高版本中，可以使用 `JobScheduler` 类来调度操作。对于早期 Android 版本，可以通过向 `startService()` 传递 `Intent` 来启动服务（或对执行中的服务下达新指令）。也可通过向将 `bindService()` 传递 `Intent` 来绑定到该服务。
8. 可以通过向 `sendBroadcast()`、`sendOrderedBroadcast()` 或 `sendStickyBroadcast()` 等方法传递 `Intent` 来发起广播。
9. 可以通过在 `ContentResolver` 上调用 `query()`，对内容提供程序执行查询。



### 启动过程

- Activity启动过程的源码相当复杂，涉及Instrumentation、ActivityThread和ActivityManagerService（简称AMS）。
- 在新Activity启动之前，桟顶的Activity需要先onPause后，新Activity才能启动。

 

## Intent

:::info 说明

[常用 Intent](https://developer.android.google.cn/guide/components/intents-common?hl=zh-cn)

:::

> 意图：分为显式和隐式

1. 表明本次通信的请求方向
2. 存储通信所需的数据
3. 接收应答方的响应数据

显式意图：直接指定来源与目标，数据精确匹配

1. 直接创建
2. 调用 `setClass`
3. 调用 `setComponent`

隐式意图：没有明确指定，只给出一个动作字符串让系统自行匹配，属于模糊匹配

1. 通过 `setAction` 

注意点：

1. 根据 Activity 是否希望从即将启动的新 Activity 中获取返回结果，可以使用 `startActivity()` 或  `startActivityForResult()` 方法启动新 Activity。这两种方法都需要传入一个 `Intent` 对象。
2. `Intent` 对象指定要启动的具体 Activity，或描述要执行的操作类型（系统选择相应的 Activity，该 Activity 甚至可以来自不同应用）。`Intent` 对象还可以携带由已启动的 Activity 使用的少量数据。（[Intent 和 Intent 过滤器](https://developer.android.google.cn/guide/components/intents-filters?hl=zh-cn)）
3. 与 Activity、服务和广播接收器不同，内容提供程序并非由 Intent 启动。相反，它们会在成为 `ContentResolver` 的请求目标时启动。
4. 通过将收到的 Intent 与设备上其他应用的清单文件中提供的 *Intent 过滤器*进行比较，系统便可识别能响应 Intent 的组件。
5. 在应用的清单文件中声明 Activity 时，可以选择性地加入声明 Activity 功能的 Intent 过滤器，以便响应来自其他应用的 Intent。

| Intent 常用动作名 | 常量值                         | 说明             |
| ----------------- | ------------------------------ | ---------------- |
| ACTION_MAIN       | `android.intent.action.MAIN`   | APP 启动时的入口 |
| ACTION_VIEW       | `android.intent.action.VIEW`   | 向用户显示数据   |
| ACTION_SEND       | `android.intent.action.SEND`   | 分享内容         |
| ACTION_CALL       | `android.intent.action.CALL`   | 直接拨号         |
| ACTION_DIAL       | `android.intent.action.DIAL`   | 间接拨号         |
| ACTION_SENDTO     | `android.intent.action.SENDTO` | 发送短信         |
| ACTION_ANSWER     | `android.intent.action.ANSWER` | 接听电话         |

| 元素名称  | 设置方法       | 说明                           |
| --------- | -------------- | ------------------------------ |
| Component | `setComponent` | 组件，指定 intent 的来源与目标 |
| Action    | `setAction`    | 行为，指定意图的动作行为       |
| Data      | `setData`      | URI，指定动作要操作的数据路径  |
| Category  | `addCategory`  | 类别，指定 intent 的操作类别   |
| Type      | `setType`      | 数据类型，指定消息的数据类型   |
| Extras    | `putExtras`    | 扩展信息，指定装载的包裹信息   |
| Flags     | `setFlags`     | 标志位，指定活动的启动标志     |



## IntentFilter

> 显式调用需要明确地指定被启动对象的组件信息，包括包名和类名，而隐式调用则不需要明确指定组件信息。
>
> 原则上一个Intent不应该既是显式调用又是隐式调用，如果二者共存的话以显式调用为主。

隐式调用需要Intent能够匹配目标组件的IntentFilter中所设置的过滤信息，如果不匹配将无法启动目标Activity。IntentFilter中的过滤信息有：

1. `action`
2. `category`
3. `data`

**注意点：**

- 为了匹配过滤列表，需要同时匹配过滤列表中的action、category、data信息，否则匹配失败。一个过滤列表中的action、category和data可以有多个，所有的action、category、data分别构成不同类别，同一类别的信息共同约束当前类别的匹配过程。
- 只有一个Intent同时匹配`action`类别、`category`类别、`data`类别才算完全匹配，只有完全匹配才能成功启动目标Activity。
- 一个Activity中可以有多个IntentFilter，一个Intent只要能匹配任何一组IntentFilter即可成功启动对应的Activity。

<br/>

当我们通过隐式方式启动一个Activity的时候，可以做一下判断，看是否有Activity能够匹配我们的隐式Intent，如果不做判断就有可能出现上述的错误了。判断方法有两种：

1. 采用`PackageManager`的`resolveActivity`方法或者`Intent`的`resolveActivity`方法，如果它们找不到匹配的Activity就会返回null，我们通过判断返回值就可以规避上述错误了。
2. 采用`PackageManager`的`queryIntentActivities`方法，这个方法和`resolveActivity`方法不同的是：它不是返回最佳匹配的Activity信息而是返回所有成功匹配的Activity信息。

```java
/**
 * 第二个参数需要注意，要使用MATCH_DEFAULT_ONLY这个标记位，这个标记位的含义是仅仅匹配那些在intent-filter中声明了		      
 * <categoryandroid:name="android.intent.category.DEFAULT"/>这个category的Activity。
 *
 * 使用这个标记位的意义在于，只要上述两个方法不返回null，那么startActivity一定可以成功。
 * 如果不用这个标记位，就可以把intent-filter中category不含DEFAULT的那些Activity给匹配出来，从而导致startActivity可能失败。
 * 因为不含有DEFAULT这个category的Activity是无法接收隐式Intent的。
 *
 * 针对Service和BroadcastReceiver，PackageManager同样提供了类似的方法去获取成功匹配的组件信息。
 */
public abstract List<ResolveInfo> queryIntentActivities(Intent intent,intflags);
public abstract ResolveInfo resolveActivity(Intent intent,int flags);
```

<br/>

在action和category中，有一类action和category比较重要：

```xml
<action android:name="android.intent.action.MAIN" />
<category android:name="android.intent.category.LAUNCHER" />
```

这二者共同作用是用来标明这是一个入口Activity并且会出现在系统的应用列表中，少了任何一个都没有实际意义，也无法出现在系统的应用列表中，也就是二者缺一不可。



### Action 匹配规则

> action的匹配要求Intent中的action存在且必须和过滤规则中的其中一个action相同

1. 系统预定义了一些action，同时我们也可以在应用中定义自己的action。
2. action的匹配规则是Intent中的action必须能够和过滤规则中的action匹配，这里说的匹配是指action的字符串值完全一样。
3. 一个过滤规则中可以有多个action，那么只要Intent中的action能够和过滤规则中的任何一个action相同即可匹配成功。Intent中如果没有指定action，那么匹配失败。
4. action区分大小写，大小写不同字符串相同的action会匹配失败。



### Category 匹配规则

1. 系统预定义了一些category，同时我们也可以在应用中定义自己的category。
2. category的匹配规则和action不同，它要求Intent中如果含有category，那么所有的category都必须和过滤规则中的其中一个category相同。换句话说，Intent中如果出现了category，不管有几个category，对于每个category来说，它必须是过滤规则中已经定义了的category。
3. action是要求Intent中必须有一个action且必须能够和过滤规则中的某个action相同；而category要求Intent可以没有category，但是如果你一旦有category，不管有几个，每个都要能够和过滤规则中的任何一个category相同。
4. category 可以为空的原因：系统在调用`startActivity`或者`startActivityForResult`的时候会默认为Intent加上`android.intent. category.DEFAULT`这个category（当然，为了activity能够接收隐式调用，就必须在intent-filter中指定`android.intent.category.DEFAULT`这个category）



### Data 匹配规则

> data的匹配规则和action类似，如果过滤规则中定义了data，那么Intent中必须也要定义可匹配的data。

```xml
<!-- data 的结构 -->
<data android:scheme="string"
      android:host="string"
      android:port="string"
      android:path="string"
      android:pathPattern="string"
      android:pathPrefix="string"
      android:mimeType="string" />

<!-- url 的结构 -->
<scheme>://<host>:<port>/[<path>|<pathPrefix>|<pathPattern>]
```

Data由两部分组成：

- `mimeType`：指媒体类型，比如`image/jpeg`、 `audio/mpeg4-generic`、`video/*`等，可以表示图片、文本、视频等不同的媒体格式
- `URI`：
  - `Scheme`：`URI`的模式，比如`http`、`file`、`content`等，如果URI中没有指定`scheme`，那么整个`URI`的其他参数无效，这也意味着`URI`是无效的。
  - `Host`：`URI`的主机名，比如`www.baidu.com`，如果host未指定，那么整个`URI`中的其他参数无效，这也意味着`URI`是无效的。
  - `Port`：`URI`中的端口号，比如`80`，仅当`URI`中指定了`scheme`和`host`参数的时候port参数才是有意义的。
  - `Path`、`PathPattern`、`PathPrefix`：`path`表示完整的路径信息；`pathPattern`也表示完整的路径信息，但是它里面可以包含通配符`*`，`*`表示0个或多个任意字符，需要注意的是，由于正则表达式的规范，如果想表示真实的字符串，那么`*`要写成`\\*`，`\`要写成`\\\\`；`pathPrefix`表示路径的前缀信息。

:::warning 注意

如果要为Intent指定完整的data，必须要调用`setDataAndType`方法，不能先调用`setData`再调用`setType`，因为这两个方法彼此会清除对方的值，这个看源码就很容易理解。

:::







## Bundle

1. [`Bundle`](https://developer.android.google.cn/reference/android/os/Bundle?hl=zh-cn) 对象并不适合保留大量数据，因为它需要在主线程上进行序列化处理并占用系统进程内存。如需保存大量数据，您应组合使用持久性本地存储、[`onSaveInstanceState()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onSaveInstanceState(android.os.Bundle)) 方法和 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 类来保存数据
2. 重建先前被销毁的 Activity 后，您可以从系统传递给 Activity 的 [`Bundle`](https://developer.android.google.cn/reference/android/os/Bundle?hl=zh-cn) 中恢复保存的实例状态。[`onCreate()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onCreate(android.os.Bundle)) 和 [`onRestoreInstanceState()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onRestoreInstanceState(android.os.Bundle)) 回调方法均会收到包含实例状态信息的相同 [`Bundle`](https://developer.android.google.cn/reference/android/os/Bundle?hl=zh-cn)。





## 生命周期

:::info 相关文章

[官方文档](https://developer.android.google.cn/guide/components/activities/activity-lifecycle?hl=zh-cn#java)

:::

为了在 Activity 生命周期的各个阶段之间导航转换，Activity 类提供六个核心回调：`onCreate()`、`onStart()`、`onResume()`、`onPause()`、`onStop()` 和 `onDestroy()`。当 Activity 进入新状态时，系统会调用其中每个回调。

![img](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231005/androidActivity%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

### onCreate

1. 在系统首次创建 Activity 时触发。Activity 会在创建后进入“已创建”状态。
2. 在 `onCreate()` 方法中，您需执行基本应用启动逻辑，该逻辑在 Activity 的整个生命周期中**只应发生一次**。
3. 例如，`onCreate()` 的实现可能会将数据绑定到列表，将 `Activity` 与 `ViewModel` 相关联，并实例化某些类作用域变量。此方法会接收 `savedInstanceState` 参数，后者是包含 Activity 先前保存状态的 `Bundle` 对象。如果 Activity 此前未曾存在，`Bundle` 对象的值为 null。
4. 还可以在 Activity 代码中新建 `View` 对象，并将新建的 `View` 插入到 `ViewGroup` 中，以构建视图层次结构。然后，将根 `ViewGroup` 传递给 `setContentView()` 以使用该布局（[参考](https://developer.android.google.cn/guide/topics/ui?hl=zh-cn)）
5. `onCreate()` 方法完成执行后，Activity 进入“已开始”状态，系统会相继调用 `onStart()` 和 `onResume()` 方法。



### onStart

1. 当 Activity 进入“已开始”状态时，系统会调用此回调。`onStart()` 调用使 Activity 对用户可见，因为应用会为 Activity 进入前台并支持互动做准备。
2. 当 Activity 进入已开始状态时，与 Activity 生命周期相关联的所有生命周期感知型组件都将收到 [`ON_START`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle.Event?hl=zh-cn#ON_START) 事件。
3. `onStart()` 方法会非常快速地完成，并且与“已创建”状态一样，Activity 不会一直处于“已开始”状态。一旦此回调结束，Activity 便会进入“已恢复”状态，系统将调用 `onResume()` 方法。



### onResume

:::warning 注意

事件在何时触发需要慎重，会影响用户体验（[参考](https://developer.android.google.cn/guide/components/activities/activity-lifecycle?hl=zh-cn#java)）

:::

1. Activity 会在进入“已恢复”状态时来到前台，然后系统调用 `onResume()` 回调。这是应用与用户互动的状态。
2. 应用会一直保持这种状态，直到某些事件发生，让焦点远离应用。此类事件包括接到来电、用户导航到另一个 Activity，或设备屏幕关闭。
3. 当 Activity 进入已恢复状态时，与 Activity 生命周期相关联的所有生命周期感知型组件都将收到 [`ON_RESUME`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle.Event?hl=zh-cn#ON_RESUME) 事件。
4. 当发生中断事件时，Activity 进入“已暂停”状态，系统调用 `onPause()` 回调。如果 Activity 从“已暂停”状态返回“已恢复”状态，系统将再次调用 `onResume()` 方法。
5. 应实现 `onResume()`，以初始化在 [`onPause()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onPause()) 期间释放的组件，并执行每次 Activity 进入“已恢复”状态时必须完成的任何其他初始化操作。
6. 无论选择在哪个构建事件中执行初始化操作，都务必使用相应的生命周期事件来释放资源：
   1. 如果在收到 ON_START 事件后初始化某些内容，那么就在收到 ON_STOP 事件后释放或终止相应内容
   2. 如果在收到 ON_RESUME 事件后初始化某些内容，那么就在收到 ON_PAUSE 事件后将其释放

:::warning 注意

可以将组件初始化代码放置在生命周期感知型组件中，也可以直接将此代码放入 Activity 生命周期回调（例如 [`onStart()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onStart()) 和 [`onStop()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onStop())），但官方不建议这样做。

通过将此逻辑添加到独立的生命周期感知型组件中，可以对多个 Activity 重复使用该组件，而无需复制代码（参阅：[使用生命周期感知型组件处理生命周期](https://developer.android.google.cn/topic/libraries/architecture/lifecycle?hl=zh-cn)）

:::



### onPause

1. 系统将此方法视为用户将要离开 Activity 的第一个标志（尽管这并不总是意味着 Activity 会被销毁）
2. 此方法表示 Activity 不再位于前台（尽管在用户处于多窗口模式时 Activity 仍然可见）
3. 在此方法中，**暂停或调整**处于**暂停状态**时，不应该继续或者应该尽量少调用或者希望快速恢复的操作
4. 进入暂停状态的原因包括：
   1. 某个事件会中断应用执行（最常见的情况）
   2. 在 Android 7.0（API 级别 24）或更高版本中，有多个应用在多窗口模式下运行。无论何时，都只有一个应用（窗口）可以拥有焦点，因此系统会暂停所有其他应用。
   3. 有新的半透明 Activity（例如对话框）处于开启状态。只要 Activity 仍然部分可见但并未处于焦点之中，它便会一直暂停。
   4. 当 Activity 进入已暂停状态时，与 Activity 生命周期相关联的所有生命周期感知型组件都将收到 [`ON_PAUSE`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle.Event?hl=zh-cn#ON_PAUSE) 事件。这时，生命周期组件可以停止在组件未位于前台时无需运行的任何功能，例如停止相机预览。
5. `onPause()` 执行非常简单，而且不一定要有足够的时间来执行保存操作。因此，**不应使用** `onPause()` 来保存应用或用户数据、进行网络调用或执行数据库事务。因为在该方法完成之前，此类工作可能无法完成（应在 `onStop()` 期间执行高负载的关闭操作。[参阅 onStop()](https://developer.android.google.cn/guide/components/activities/activity-lifecycle?hl=zh-cn#onstop)。如需详细了解如何保存数据（参阅：[保存和恢复 Activity 状态](https://developer.android.google.cn/guide/components/activities/activity-lifecycle?hl=zh-cn#saras)））

:::warning 注意

还可以使用 [`onPause()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onPause()) 方法释放系统资源、传感器（例如 GPS）手柄，或当 Activity 暂停且用户不需要它们时仍然可能影响电池续航时间的任何资源。

然而，如果处于多窗口模式，“已暂停”的 Activity 仍完全可见。因此，应该考虑使用 onStop() 而非 onPause() 来完全释放或调整与界面相关的资源和操作，以便更好地支持多窗口模式。

:::



### onStop

1. 如果 Activity 不再对用户可见，说明其已进入“已停止”状态，因此系统将调用 `onStop()` 回调。
2. 当 Activity 进入已停止状态时，与 Activity 生命周期相关联的所有生命周期感知型组件都将收到 [`ON_STOP`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle.Event?hl=zh-cn#ON_STOP) 事件。这时，生命周期组件可以停止在组件未显示在屏幕上时无需运行的任何功能。
3. 在 `onStop()` 方法中，应用应释放或调整在应用对用户不可见时的无用资源。
4. 使用 `onStop()` 而非 `onPause()` 可确保与界面相关的工作继续进行，即使用户在多窗口模式下查看您的 Activity 也能如此。
5. 还应使用 `onStop()` 执行 CPU 相对密集的关闭操作。例如，如果您无法找到更合适的时机来将信息保存到数据库，可以在 `onStop()` 期间执行此操作。
6. 当您的 Activity 进入“已停止”状态时，`Activity` 对象会继续驻留在内存中：该对象将维护所有状态和成员信息，但不会附加到窗口管理器。Activity 恢复后，Activity 会重新调用这些信息。您无需重新初始化在任何回调方法导致 Activity 进入“已恢复”状态期间创建的组件。
7. 系统还会追踪布局中每个 `View` 对象的当前状态，如果用户在 `EditText` 微件中输入文本，系统将保留文本内容，因此您无需保存和恢复文本。
8. 进入“已停止”状态后，Activity 要么返回与用户互动，要么结束运行并消失。如果 Activity 返回，系统将调用 `onRestart()`。如果 `Activity` 结束运行，系统将调用 `onDestroy()`。

:::warning 注意

Activity 停止后，如果系统需要恢复内存，可能会销毁包含该 Activity 的进程。即使系统在 Activity 停止后销毁相应进程，系统仍会保留 `Bundle`（键值对的 blob）中 `View` 对象（例如 `EditText` 微件中的文本）的状态，并在用户返回 Activity 时恢复这些对象。

:::



### onDestroy

1. 调用该方法可能的原因（可以使用 [`isFinishing()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#isFinishing()) 方法区分这两种情况）：
   1. Activity 即将结束（由于用户彻底关闭 Activity 或由于系统为 Activity 调用 [`finish()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#finish())）
   2. 由于配置变更（例如设备旋转或多窗口模式），系统暂时销毁 Activity
2. 当 Activity 进入已销毁状态时，与 Activity 生命周期相关联的所有生命周期感知型组件都将收到 [`ON_DESTROY`](https://developer.android.google.cn/reference/androidx/lifecycle/Lifecycle.Event?hl=zh-cn#ON_DESTROY) 事件。这时，生命周期组件可以在 Activity 被销毁之前清理所需的任何数据。
3. 应使用 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 对象来包含 Activity 的相关视图数据，而不是在 Activity 中加入逻辑来确定 Activity 被销毁的原因。这样做之后，如果因配置变更而重新创建 Activity，ViewModel 不必执行任何操作，因为系统将保留 ViewModel 并将其提供给下一个 Activity 实例。如果不重新创建 Activity，ViewModel 将调用 [`onCleared()`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn#onCleared()) 方法，以便在 Activity 被销毁前清除所需的任何数据。
4. 如果 Activity 即将结束，onDestroy() 是 Activity 收到的最后一个生命周期回调。如果由于配置变更而调用 onDestroy()，系统会立即新建 Activity 实例，然后在新配置中为新实例调用 [`onCreate()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onCreate(android.os.Bundle))。





### 正常情况重建 Activity

1. 针对一个特定的Activity，第一次启动，回调如下：`onCreate `-> `onStart `-> `onResume`。
2. 当用户打开新的Activity或者切换到桌面的时候，回调如下：`onPause `-> `onStop`。这里有一种特殊情况，如果新Activity采用了透明主题，那么当前Activity不会回调`onStop`。
3. 当用户再次回到原Activity时，回调如下：`onRestart `-> `onStart `-> `onResume`。
4. 当用户按back键回退时，回调如下：`onPause `-> `onStop `-> `onDestroy`。
5. 当Activity被系统回收后再次打开，生命周期方法回调过程和第一种一样，注意只是生命周期方法一样，不代表所有过程都一样，这个问题在下一节会详细说明。
6. 从整个生命周期来说，`onCreate`和`onDestroy`是配对的，分别标识着Activity的创建和销毁，并且只可能有一次调用。从Activity是否可见来说，`onStart`和`onStop`是配对的，随着用户的操作或者设备屏幕的点亮和熄灭，这两个方法可能被调用多次；从Activity是否在前台来说，`onResume`和`onPause`是配对的，随着用户操作或者设备屏幕的点亮和熄灭，这两个方法可能被调用多次。

:::info onStart/onStop 与 onResume/onPause

onStart和onStop是从Activity是否可见这个角度来回调的，而onResume和onPause是从Activity是否位于前台这个角度来回调的，除了这种区别，在实际使用中没有其他明显区别。

:::

<br/>

### 异常情况重建 Activity

> Activity除了受用户操作所导致的正常的生命周期方法调度，还有一些异常情况，比如当资源相关的系统配置发生改变以及系统内存不足时，Activity就可能被杀死。



#### 配置变更

- 当系统配置发生改变后，Activity会被销毁，其`onPause`、`onStop`、`onDestroy`均会被调用，同时由于Activity是在异常情况下终止的，系统会调用`onSaveInstanceState`来保存当前Activity的状态。

- 这个方法的调用时机是在`onStop`之前，它和`onPause`没有既定的时序关系，它既可能在`onPause`之前调用，也可能在`onPause`之后调用。

<br/>

**需要强调的一点是：**

- `onSaveInstanceState`只会出现在Activity被异常终止的情况下，正常情况下系统不会回调这个方法。
- 当Activity被重新创建后，系统会调用`onRestoreInstanceState`，并且把Activity销毁时`onSaveInstanceState`方法所保存的Bundle对象作为参数同时传递给`onRestoreInstanceState`和`onCreate`方法。
- 因此，可以通过`onRestoreInstanceState`和`onCreate`方法来判断Activity是否被重建了，如果被重建了，那么我们就可以取出之前保存的数据并恢复
- 从时序上来说，`onRestoreInstanceState`的调用时机在`onStart`之后。

<br/>

:::note 系统做的额外工作

- 在`onSaveInstanceState`和`onRestoreInstanceState`方法中，系统自动为我们做了一定的恢复工作。当Activity在异常情况下需要重新创建时，系统会默认为我们保存当前Activity的视图结构，并且在Activity重启后为我们恢复这些数据，比如文本框中用户输入的数据、ListView滚动的位置等，这些View相关的状态系统都能够默认为我们恢复。

- 具体针对某一个特定的View系统能为我们恢复哪些数据，我们可以查看View的源码。和Activity一样，每个View都有`onSaveInstanceState`和`onRestoreInstanceState`这两个方法，看一下它们的具体实现，就能知道系统能够自动为每个View恢复哪些数据。

:::

<br/>

**关于保存和恢复View层次结构，系统的工作流程是这样的：**

- 首先Activity被意外终止时，Activity会调用`onSaveInstanceState`去保存数据，然后Activity会委托Window去保存数据，接着Window再委托它上面的顶级容器去保存数据。
- 顶层容器是一个ViewGroup，一般来说它很可能是DecorView。最后顶层容器再去一一通知它的子元素来保存数据，这样整个数据保存过程就完成了。
- 这是一种典型的委托思想，上层委托下层、父容器委托子元素去处理一件事情，这种思想在Android中有很多应用，比如View的绘制过程、事件分发等都是采用类似的思想。

<br/>

**注意点：**

- 针对`onSaveInstanceState`方法还有一点需要说明，那就是系统只会在Activity即将被销毁并且有机会重新显示的情况下才会去调用它。考虑这么一种情况，当Activity正常销毁的时候，系统不会调用`onSaveInstanceState`，因为被销毁的Activity不可能再次被显示。
- 可以对比一下旋转屏幕所造成的Activity异常销毁，这个过程和正常停止Activity是不一样的，因为旋转屏幕后，Activity被销毁的同时会立刻创建新的Activity实例，这个时候Activity有机会再次立刻展示，所以系统要进行数据存储。
- 这里可以简单地这么理解，系统只在Activity异常终止的时候才会调用`onSaveInstanceState`和`onRestoreInstanceState`来存储和恢复数据，其他情况不会触发这个过程。



#### 资源内存不足

> 这种情况不好模拟，但是其数据存储和恢复过程和由配置变更引起的完全一致

当系统内存不足时，系统就会按照下述优先级去杀死目标Activity所在的进程，并在后续通过`onSaveInstanceState`和`onRestoreInstanceState`来存储和恢复数数据，Activity的优先级情况（从高到低）：

1. 前台Activity（正在和用户交互的Activity）
2. 可见但非前台Activity（比如Activity中弹出了一个对话框，导致Activity可见但是位于后台无法和用户直接交互）
3. 后台Activity（已经被暂停的Activity，比如执行了onStop）

:::warning 注意

如果一个进程中没有四大组件在执行，那么这个进程将很快被系统杀死，因此，一些后台工作不适合脱离四大组件而独自运行在后台中，这样进程很容易被杀死。

比较好的方法是将后台工作放入Service中从而保证进程有一定的优先级，这样就不会轻易地被系统杀死。

:::



### 改变重建 Activity 行为

系统配置中有很多内容，如果当某项内容发生改变后，我们不想系统重新创建Activity，可以给Activity指定`configChanges`属性。比如不想让Activity在屏幕旋转的时候重新创建，就可以给`configChanges`属性添加`orientation`这个值。

如果我们想指定多个值，可以用`|`连接起来，比如`android:configChanges="orientation|keyboardHidden"`。可选项如下：

| 项目                 | 含义                                                         |
| -------------------- | ------------------------------------------------------------ |
| `mcc`                | SIM卡唯一标识IMSI（国际移动用户识别码中的国家代码），由三位数字组成，中国为460 |
| `mnc`                | SIM卡唯一标识IMSI（国际移动用户识别码）中的运营商代码，由两位数字组成，中国移动TD系统为00，中国联通为01，中国电信为03 |
| `locale`             | 设备的本地位置发生了变化，一般指切换了系统语言               |
| `touchscreen`        | 触摸屏发生了改变，正常情况下不发生，可以忽略                 |
| `keyboard`           | 键盘类型发生了改变，比如用户使用了外插键盘                   |
| `keyboardHidden`     | 键盘的可访问性发生了改变，比如用户调出了键盘                 |
| `navigation`         | 系统导航方式发生了改变，比如采用了轨迹球导航，正常情况下很难发生，可以忽略 |
| `screenLayout`       | 屏幕布局发生了改变，比如用户激活了另外一个显示设备           |
| `fontScale`          | 系统字体缩放比例发生了改变，比如用户选择了一个新字号         |
| `uiMode`             | 用户界面模式发生了改变，比如开启了夜间模式                   |
| `orientation`        | 屏幕方向发生了改变，这个最常使用                             |
| `screenSize`         | 屏幕的尺寸信息发生了改变，当旋转设备屏幕时，屏幕尺寸会发生变化<br />和编译选项有关，当编译选项中的 `minSdkVersion` 和 `targetSdkVersion` 均低于 13 时，此选项不会导致重建 Activity |
| `smallestScreenSize` | 设别的物理屏幕尺寸发生改变，这个和屏幕的方向没有关系，仅仅表示在实际的物理屏幕的尺寸改变时发生，比如用户用户切换到了外部的显示设备<br />和编译选项有关，当编译选项中的 `minSdkVersion` 和 `targetSdkVersion` 均低于 13 时，此选项不会导致重建 Activity |
| `layoutDirection`    | 布局方向发生变化，用的比较少，正常情况下无需修改布局的 `layoutDirection` 属性 |

:::warning 注意

当Activity的确没有重新创建，并且也没有调用`onSaveInstanceState`和`onRestoreInstanceState`来存储和恢复数据，那么系统会调用Activity的`onConfigurationChanged`方法，这个时候就可以做一些自己的特殊处理了。

:::







## 生命周期事件

| 事件         | 说明             |
| :----------- | ---------------- |
| `ON_ANY`     | 所有事件         |
| `ON_CREATE`  | `onCreate` 事件  |
| `ON_DESTROY` | `onDestroy` 事件 |
| `ON_PAUSE`   | `onPause` 事件   |
| `ON_RESUME`  | `onResume` 事件  |
| `ON_START`   | `onStart` 事件   |
| `ON_STOP`    | `onStop` 事件    |

:::hide

| 公共方法                           | 说明                                                         |
| :--------------------------------- | ------------------------------------------------------------ |
| `static final Lifecycle.Event`     | `downFrom(@NonNull Lifecycle.State state)`Returns the `Lifecycle.Event` that will be reported by a `Lifecycle` leaving the specified `Lifecycle.State` to a lower state, or `null` if there is no valid event that can move down from the given state. |
| `static final Lifecycle.Event`     | `downTo(@NonNull Lifecycle.State state)`Returns the `Lifecycle.Event` that will be reported by a `Lifecycle` entering the specified `Lifecycle.State` from a higher state, or `null` if there is no valid event that can move down to the given state. |
| `final @NonNull Lifecycle.State`   | `getTargetState()`Returns the new `Lifecycle.State` of a `Lifecycle` that just reported this `Lifecycle.Event`. |
| `static final Lifecycle.Event`     | `upFrom(@NonNull Lifecycle.State state)`Returns the `Lifecycle.Event` that will be reported by a `Lifecycle` leaving the specified `Lifecycle.State` to a higher state, or `null` if there is no valid event that can move up from the given state. |
| `static final Lifecycle.Event`     | `upTo(@NonNull Lifecycle.State state)`Returns the `Lifecycle.Event` that will be reported by a `Lifecycle` entering the specified `Lifecycle.State` from a lower state, or `null` if there is no valid event that can move up to the given state. |
| `final @NonNull Lifecycle.Event`   | `valueOf(@NonNull String value)`Returns the enum constant of this type with the specified name. |
| `final @NonNull Lifecycle.Event[]` | `values()`Returns an array containing the constants of this enum type, in the order they're declared. |

:::



## 处理生命周期

> 基于观察者模式/监听器模式

1. 核心类：`Lifecycle`、`DefaultLifecycleObserver`、`LifecycleOwner`

- 使界面控制器（activity 和 fragment）尽可能保持精简。它们不应试图获取自己的数据，而应使用 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 执行此操作，同时应观测 [`LiveData`](https://developer.android.google.cn/reference/androidx/lifecycle/LiveData?hl=zh-cn) 对象以在视图中体现相应变化。
- 设法编写数据驱动型界面，在此类界面中，界面控制器负责随着数据的更改更新视图，或者向 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 通知用户的操作。
- 将数据逻辑放在 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 类中。[`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 应充当界面控制器与应用其余部分之间的连接器。不过要注意，[`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 不负责提取数据（例如，从网络提取）。但是，[`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 应调用相应的组件来提取数据，然后将结果提供给界面控制器。
- 使用[数据绑定](https://developer.android.google.cn/topic/libraries/data-binding?hl=zh-cn)在视图与界面控制器之间维持干净的接口。这样可以让视图更具声明性，并尽量减少需要在 activity 和 fragment 中编写的更新代码。如果您更愿意使用 Java 编程语言来达成此目的，请使用 [Butter Knife](http://jakewharton.github.io/butterknife/) 之类的库，以避免样板代码并实现更好的抽象化。
- 如果界面很复杂，不妨考虑创建 [presenter](http://www.gwtproject.org/articles/mvp-architecture.html#presenter) 类来处理界面的修改。这可能是一项艰巨的任务，但这样做可使界面组件更易于测试。
- 避免在 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 中引用 `View` 或 `Activity` 上下文。如果 `ViewModel` 存在的时间比 activity 更长（在配置更改的情况下），activity 将泄漏并且不会获得垃圾回收器的妥善处置。
- 使用 [Kotlin 协程](https://developer.android.google.cn/topic/libraries/architecture/coroutines?hl=zh-cn)管理长时间运行的任务和其他可以异步运行的操作。



## 状态变更

> TODO

1. 配置发生了更改
2. Activity 或对话框显示在前台
3. 用户点按“返回”按钮
4. 系统终止应用进程



## ViewModel

1. [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 类是一种[业务逻辑或屏幕级状态容器](https://developer.android.google.cn/topic/architecture/ui-layer/stateholders?hl=zh-cn)。

2. 它用于将状态公开给界面，以及封装相关的业务逻辑。

3. 它的主要优点是，它可以缓存状态，并可在配置更改后持久保留相应状态。这意味着在 activity 之间导航时或进行配置更改后（例如旋转屏幕时），界面将无需重新提取数据。



## 生命周期感知型组件

:::info 说明

生命周期感知型组件可执行操作来响应另一个组件（如 activity 和 fragment）的生命周期状态的变化。

这些组件有助于编写出更有条理且往往更精简的代码，此类代码更易于维护。

:::



## 配置变更

当发生配置变更时，系统会重新创建 `Activity`。为此，系统会调用 [`onDestroy()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onDestroy()) 并销毁现有的 `Activity` 实例。随后，系统会使用 [`onCreate()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onCreate(android.os.Bundle)) 创建一个新实例，并且这个新的 `Activity` 实例会使用更新后的新配置进行初始化。这也意味着，系统还会使用新配置重新创建界面。

重新创建过程还会清除您在 `Activity` 或其包含的 `Fragment`、`View` 或其他对象中，以字段形式保留的任何状态。这是因为 `Activity` 重新创建过程会创建 `Activity` 和界面的全新实例。此外，之前的旧 `Activity` 不再可见或不再有效，因此对该 activity 或其所含对象的任何其余引用都已过时。它们会导致 bug、内存泄漏和崩溃。

1. 变更时发生了什么？
2. 保持用户期望
3. 限制 Activity 重新创建

如需验证应用中是否保留了状态，您可以在应用处于前台和后台时执行会导致配置变更的操作。这些操作包括：

- 旋转设备
- 进入多窗口模式
- 在多窗口模式或自由窗口模式下调整应用大小
- 折叠具有多个显示屏的可折叠设备
- 更改系统主题，例如深色模式与浅色模式
- 更改字体大小
- 更改系统或应用语言
- 连接或断开硬件键盘
- 连接或断开基座

可以采用三种主要方法在重新创建 `Activity` 的过程中保留相关状态。采用哪种方法取决于要保留的状态类型：

- [本地持久性存储](https://developer.android.google.cn/topic/libraries/architecture/saving-states?hl=zh-cn#local)可用于处理复杂或大型数据的进程终止。持久性本地存储包括数据库或 [`DataStore`](https://developer.android.google.cn/topic/libraries/architecture/datastore?hl=zh-cn)。
- [保留的对象](https://developer.android.google.cn/topic/libraries/architecture/saving-states?hl=zh-cn#viewmodel)（如 [`ViewModel`](https://developer.android.google.cn/reference/androidx/lifecycle/ViewModel?hl=zh-cn) 实例）可在用户正在使用应用时，处理内存中与界面相关的状态。
- [已保存的实例状态](https://developer.android.google.cn/topic/libraries/architecture/saving-states?hl=zh-cn#onsaveinstancestate)可用于处理系统发起的进程终止，并根据用户输入或导航情况保留瞬时状态。

如需详细了解各个 API 以及各自适用的使用场景，请参阅[保存界面状态](https://developer.android.google.cn/topic/libraries/architecture/saving-states?hl=zh-cn)。

在 `View` 系统中，如果发生配置变更并且已停用 `Activity` 重新创建功能，activity 会收到对 [`Activity.onConfigurationChanged()`](https://developer.android.google.cn/reference/android/app/Activity?hl=zh-cn#onConfigurationChanged(android.content.res.Configuration)) 的调用。任何关联的视图也会收到对 [`View.onConfigurationChanged()`](https://developer.android.google.cn/reference/kotlin/android/view/View?hl=zh-cn#onconfigurationchanged) 的调用。对于尚未添加到 `android:configChanges` 的配置变更，系统会照常重新创建 activity。

`onConfigurationChanged()` 回调方法会收到一个 [`Configuration`](https://developer.android.google.cn/reference/android/content/res/Configuration?hl=zh-cn) 对象，其中指定了新的设备配置。请读取 `Configuration` 对象中的字段来确定您的新配置。如需进行后续更改，请更新您在接口中使用的资源。当系统调用此方法时，activity 的 `Resources` 对象会相应地进行更新，并根据新配置返回资源。这样一来，您就可以在系统不重启 activity 的情况下轻松重置界面元素。

在处理配置变更时，需要了解以下关键概念：

- **配置：**设备配置用于定义界面如何向用户显示内容，例如应用显示大小、语言区域或系统主题。
- **配置变更：**配置会根据用户互动发生变更。例如，用户可能会更改设备设置或与设备的物理互动方式。您无法阻止配置变更。
- **`Activity` 重新创建：**默认情况下，配置变更会导致重新创建 `Activity`。这是为新配置重新初始化应用状态的内置机制。
- **`Activity` 销毁：**`Activity` 重新创建会导致系统销毁旧的 `Activity` 实例，并创建一个新实例来代替它。旧实例现已过时。对该实例的任何其余引用都会导致内存泄漏、bug 或崩溃。
- **状态：**旧 `Activity` 实例中的状态不存在于新 `Activity` 实例中，因为它们是两个不同的对象实例。请按照[保存界面状态](https://developer.android.google.cn/topic/libraries/architecture/saving-states?hl=zh-cn)中描述的方法保留应用和用户状态。
- **停用：**为某种类型的配置变更停用 activity 重新创建功能是一种潜在的优化方案。您需要确保应用根据新配置进行正确更新。

为了提供良好的用户体验，遵循以下最佳实践：

- **为配置频繁变更做好准备**：不要认为配置变更会很少发生或从不发生过，无论 API 级别、外形规格或界面工具包如何。当用户导致配置变更时，他们会希望应用进行更新，并继续使用新配置正常运行。
- **保留状态：**在重新创建 `Activity` 时，不要丢失用户的状态。请按照[保存界面状态](https://developer.android.google.cn/topic/libraries/architecture/saving-states?hl=zh-cn)中描述的方法保留状态。
- **避免停用快速修复功能：**不要停用 `Activity` 重新创建功能，这样可以轻松避免丢失状态。停用 activity 重新创建功能需要实现处理变更的承诺，而您可能会因为其他配置变更、进程终止或应用关闭所带来的 `Activity` 重新创建而丢失状态。因此，您无法完全停用 `Activity` 重新创建功能。请按照[保存界面状态](https://developer.android.google.cn/topic/libraries/architecture/saving-states?hl=zh-cn)中描述的方法保留状态。
- **不要回避配置变更：**不要为了回避配置变更和 `Activity` 重新创建，而对屏幕方向、宽高比或尺寸可调整性施加限制。这会对想要按照自己首选方式使用应用的用户产生负面影响。



## Fragment

| 函数钩子              | 说明                                             |
| --------------------- | ------------------------------------------------ |
| `onAttach()`          | 当Fragment和Activity建立关联时调用               |
| `onCreateView()`      | 为Fragment创建视图（加载布局）时调用             |
| `onActivityCreated()` | 确保与Fragment相关联的Activity已经创建完毕时调用 |
| `onDestroyView()`     | 当与Fragment关联的视图被移除时调用               |
| `onDetach()`          | 当Fragment和Activity解除关联时调用               |

![image-20230922154152968](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231002/androidFragment%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

Fragments应该作为实现UI界面默认选择。可以重复使用Fragments用户接口来组合成应用。官方强烈推荐使用Fragments而不是activity来呈现UI界面，理由如下：

- 提供多窗格布局解决方案 Fragments 的引入主要将手机应用延伸到平板电脑，所以在平板电脑上你可能有A、B两个窗格，但是在手机应用上A、B可能分别充满 整个屏幕。如果应用在最初就使用了fragments，那么以后应用适配到其他不同尺寸屏幕就会非常简单。
- 屏幕间数据通信从一个Activity发送复杂数据(例如Java对象)到另外一个Activity，Android的API并没有提供合适的方法。不过使用Fragment，你可以使用 一个activity实例作为这个activity子fragments的通信通道。即使这样比Activity与Activity间的通信好，你也想考虑使用Event Bus架构，使用如 Otto 或者 greenrobot EventBus作为更简洁的实现。 如果你希望避免添加另外一个类库，RxJava同样可以实现一个Event Bus。
- Fragments 一般通用的不只有UI 你可以有一个没有界面的fragment作为Activity提供后台工作。 进一步你可以使用这个特性来创建一个fragment 包含改变其它fragment的逻辑而不是把这个逻辑放在activity中。
- 甚至ActionBar 都可以使用内部fragment来管理 你可以选择使用一个没有UI界面的fragment来专门管理ActionBar,或者你可以选择使用在每个Fragment中 添加它自己的action 来作为父Activity的ActionBar（[参考](http://www.grokkingandroid.com/adding-action-items-from-within-fragments/)）

很不幸，我们不建议广泛的使用嵌套的fragments，因为 有时会引起matryoshka bugs。我们只有当它有意义(例如，在水平滑动的ViewPager在 像屏幕一样fragment中)或者他的确是一个明智的选择的时候才广泛的使用fragment。

在一个架构级别，你的APP应该有一个顶级的activity来包含绝大部分业务相关的fragment。你也可能还有一些辅助的activity ，这些辅助的activity与主activity 通信很简单限制在这两种方法 `Intent.setData()` 或 `Intent.setAction()`或类似的方法。



