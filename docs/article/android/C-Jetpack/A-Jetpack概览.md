---
title: "Jetpack 概览"
shortTitle: "A-Jetpack 概览"
description: "Jetpack 概览"
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
  text: "Jetpack 概览"
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
  title: "Jetpack 概览"
  description: "Jetpack 概览"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Jetpack 概览

[[toc]]



:::info 相关文章

- [Jetpack 官方文档](https://developer.android.google.cn/jetpack?hl=zh-cn)

- [Jetpack 是什么？](https://zhuanlan.zhihu.com/p/334350927)

:::

| 组件                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`activity`](https://developer.android.google.cn/jetpack/androidx/releases/activity?hl=zh-cn) | 访问基于 `activity `构建的可组合 API。                       |
| [`appcompat`](https://developer.android.google.cn/jetpack/androidx/releases/appcompat?hl=zh-cn) | 允许在平台的旧版 API 上访问新 API（很多使用 `Material Design`）。 |
| [`appsearch`](https://developer.android.google.cn/jetpack/androidx/releases/appsearch?hl=zh-cn) | 为用户构建自定义应用内搜索功能。                             |
| [`camera`](https://developer.android.google.cn/jetpack/androidx/releases/camera?hl=zh-cn) | 构建移动相机应用。                                           |
| [`compose`](https://developer.android.google.cn/jetpack/androidx/releases/compose?hl=zh-cn) | `Jetpack Compose`是一种声明式的UI框架，用于构建安卓应用的用户界面。它通过使用`Kotlin`语言来定义应用的界面结构和外观，取代了传统的XML布局和编程方式。`Compose`简化了UI开发过程，提供了更简洁、直观和灵活的方式来构建应用界面 |
| [`databinding`](https://developer.android.google.cn/jetpack/androidx/releases/databinding?hl=zh-cn) | `Data Binding`是一种用于实现数据和界面绑定的库。它允许开发者在布局文件中直接绑定数据对象，使数据的变化能够自动反映在界面上，减少了手动更新界面的工作，即使用声明性格式将布局中的界面组件绑定到应用中的数据源。 |
| [`fragment`](https://developer.android.google.cn/jetpack/androidx/releases/fragment?hl=zh-cn) | 将您的应用细分为在一个 Activity 中托管的多个独立屏幕。       |
| [`hilt`](https://developer.android.google.cn/jetpack/androidx/releases/hilt?hl=zh-cn) | 扩展了 `Dagger Hilt `的功能，以实现 `androidx `库中某些类的依赖项注入。 |
| [`lifecycle`](https://developer.android.google.cn/jetpack/androidx/releases/lifecycle?hl=zh-cn) | 构建生命周期感知型组件，这些组件可以根据 `activity `或 `fragment` 的当前生命周期状态调整行为。 |
| [`Material Design 组件`](https://material.io/develop/android) | 适用于 `Android` 的模块化、可自定义 `Material Design` 界面组件。 |
| [`navigation`](https://developer.android.google.cn/jetpack/androidx/releases/navigation?hl=zh-cn) | 构建和组织应用内界面，处理深层链接以及在屏幕之间导航。       |
| [`paging`](https://developer.android.google.cn/jetpack/androidx/releases/paging?hl=zh-cn) | 在页面中加载数据，并在 `RecyclerView `中呈现。               |
| [`room`](https://developer.android.google.cn/jetpack/androidx/releases/room?hl=zh-cn) | 创建、存储和管理由 `SQLite `数据库支持的持久性数据。         |
| [`test`](https://developer.android.google.cn/jetpack/androidx/releases/test?hl=zh-cn) | 在 `Android `中进行测试。                                    |
| [`work`](https://developer.android.google.cn/jetpack/androidx/releases/work?hl=zh-cn) | 调度和执行可延期且基于约束条件的后台任务。                   |
| [`ads`](https://developer.android.google.cn/jetpack/androidx/releases/ads?hl=zh-cn) | 获取广告 ID（无论是否通过 Play 服务）。                      |
| [`annotation`](https://developer.android.google.cn/jetpack/androidx/releases/annotation?hl=zh-cn) | 公开元数据，帮助工具开发者和其他开发者了解您的应用代码。     |
| `ViewModel`                                                  | `ViewModel`是一种用于管理UI相关数据的架构组件。它可以存储和管理与界面相关的数据，并在配置变化（如旋转屏幕）时保持数据的一致性，以避免数据的丢失和重新加载 |
| `LiveData`                                                   | `LiveData`是一种可观察的数据持有者类，它可以感知生命周期并提供数据的更新和通知机制。`LiveData`可以与`ViewModel`一起使用，以实现数据的观察和响应 |



## 前言

:::info 说明

Jetpack 非常庞大，主要由基础、架构、行为、界面这4个部分组成。

能够帮助开发者更好更方便地构建应用程序的组件，Google都将其纳入了Jetpack

:::



## ViewModel

```groovy
// 引入依赖
implementation "androidx.lifecycle:lifecycle-extensions:2.2.0"
```

![image-20230928160334188](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231001/viewmodel%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)



## Lifecycles

在编写Android应用程序的时候，可能会经常遇到需要感知Activity生命周期的情况。比如说，某个界面中发起了一条网络请求，但是当请求得到响应的时候，界面或许已经关闭了，这个时候就不应该继续对响应的结果进行处理。

因此，我们需要能够时刻感知到Activity的生命周期，以便在适当的时候进行相应的逻辑控制。

> TODO



## LiveData

> 此外还应该关注：RxJava、Flow

1. LiveData是Jetpack提供的一种响应式编程组件，它可以包含任何类型的数据，并在数据发生变化的时候通知给观察者。LiveData特别适合与ViewModel结合在一起使用，虽然它也可以单独用在别的地方，但是在绝大多数情况下，它是使用在ViewModel当中的

2. 千万不可以把Activity的实例传给ViewModel，ViewModel的生命周期是长于Activity的，如果把Activity的实例传给ViewModel，就很有可能会因为Activity无法释放而造成内存泄漏
3. LiveData可以包含任何类型的数据，并在数据发生变化的时候通知给观察者。
4. 如果你需要在子线程中给LiveData设置数据，一定要调用postValue()方法，而不能再使用setValue()方法，否则会发生崩溃。

> TODO



### map 和 switchMap

LiveData的基本用法虽说可以满足大部分的开发需求，但是当项目变得复杂之后，可能会出现一些更加特殊的需求。

LiveData为了能够应对各种不同的需求场景，提供了两种转换方法：`map()`和`switchMap()`方法。

`switchMap()`的使用场景非常固定：如果ViewModel中的某个LiveData对象是调用另外的方法获取的，那么我们就可以借助`switchMap()`方法，将这个LiveData对象转换成另外一个可观察的LiveData对象。

> TODO



### 感知组件生命周期

1. LiveData之所以能够成为Activity与ViewModel之间通信的桥梁，并且还不会有内存泄漏的风险，靠的就是Lifecycles组件。LiveData在内部使用了Lifecycles组件来自我感知生命周期的变化，从而可以在Activity销毁的时候及时释放引用，避免产生内存泄漏的问题。
2. 由于要减少性能消耗，当Activity处于不可见状态的时候（比如手机息屏，或者被其他的Activity遮挡），如果LiveData中的数据发生了变化，是不会通知给观察者的。只有当Activity重新恢复可见状态时，才会将数据通知给观察者，而LiveData之所以能够实现这种细节的优化，依靠的还是Lifecycles组件。
3. 如果在Activity处于不可见状态的时候，LiveData发生了多次数据变化，当Activity恢复可见状态时，只有最新的那份数据才会通知给观察者，前面的数据在这种情况下相当于已经过期了，会被直接丢弃。

> TODO



## Room

:::info 相关文章

[Room 官方文档](https://developer.android.google.cn/topic/libraries/architecture/room?hl=zh-cn)

:::

> 主要由Entity、Dao和Database这3部分组成，每个部分都有明确的职责
>
> TODO



## WorkManager

:::info 相关文章

[WorkManager 官方文档](https://developer.android.google.cn/reference/androidx/work/WorkManager?hl=zh-cn) 

:::

```groovy
// 引入依赖
implementation "androidx.work:work-runtime:2.2.0"
```

1. 为了解决频繁的功能和API变更，Google推出了WorkManager组件。WorkManager很适合用于处理一些要求定时执行的任务，它可以根据操作系统的版本自动选择，底层是使用AlarmManager实现还是JobScheduler实现，从而降低了我们的使用成本。另外，它还支持周期性任务、链式任务处理等功能，是一个非常强大的工具。
2. 适合用于持久性工作的推荐解决方案。如果工作始终要通过应用重启和系统重新启动来调度，便是持久性的工作。由于大多数后台处理操作都是通过持久性工作完成的，因此 WorkManager 是适用于后台处理操作的主要推荐 API。
3. WorkManager和Service并不相同，也没有直接的联系。Service是Android系统的四大组件之一，它在没有被销毁的情况下是一直保持在后台运行的。而WorkManager只是一个处理定时任务的工具，它可以保证即使在应用退出甚至手机重启的情况下，之前注册的任务仍然将会得到执行，因WorkManager很适合用于执行一些定期和服务器进行交互的任务，比如周期性地同步数据等等。
4. 使用WorkManager注册的周期性任务不能保证一定会准时执行，这并不是bug，而是系统为了减少电量消耗，可能会将触发时间临近的几个任务放在一起执行，这样可以大幅度地减少CPU被唤醒的次数，从而有效延长电池的使用时间。WorkManager的基本用法其实非常简单，主要分为以下3步：

<br/>

**一般步骤：**

1.  定义一个后台任务，并实现具体的任务逻辑；
2. 配置该后台任务的运行条件和约束信息，并构建后台任务请求；
3. 将该后台任务请求传入WorkManager的enqueue()方法中，系统会在合适的时间运行。

<br/>

后台任务的写法非常固定，也很好理解。首先每一个后台任务都必须继承自Worker类，并调用它唯一的构造函数。然后重写父类中的`doWork()`方法，在这个方法中编写具体的后台任务逻辑即可。

1. `doWork()`方法不会运行在主线程当中，因此可以放心地在这里执行耗时逻辑
2. `doWork()`方法要求返回一个`Result`对象，用于表示任务的运行结果，成功就返回`Result.success()`，失败就返回`Result.failure()`。除此之外，还有一个`Result.retry()`方法，它其实也代表着失败，只是可以结合`WorkRequest.Builder`的`setBackoffCriteria()`方法来重新执行任务
3. 如果后台任务的doWork()方法中返回了Result.retry()，那么是可以结合setBackoffCriteria()方法来重新执行任务的
4. 可以借助链式编程来实现多个独立的后台任务的调度