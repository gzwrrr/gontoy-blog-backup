---
title: "Android 进阶相关文章"
shortTitle: "Android 进阶相关文章"
description: "Android 进阶相关文章"
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
  text: "Android 进阶相关文章"
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
  title: "Android 进阶相关文章"
  description: "Android 进阶相关文章"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 进阶相关文章

1. [3分钟看懂Activity启动流程](https://www.jianshu.com/p/9ecea420eb52)
2. [用两张图告诉你，为什么你的App会卡顿?](https://mp.weixin.qq.com/s/zNXi6g7AAWz3lzxocXwZyg)
3. [简书 – Season_zlc](https://www.jianshu.com/u/c50b715ccaeb) – [RxJava入门系列](https://mp.weixin.qq.com/s/5_59HK4ktvgkum8hac3xDQ)
4. [2017腾讯实习生Android客户端开发面试总结](https://mp.weixin.qq.com/s/lSg6EFcaSoVtlLcpfTBedA)
5. [把公众号推送的文章干货，整理了一波！！](https://mp.weixin.qq.com/s/0HefjPhItpwyLU_93Uc5aA)



## 其他

1. 如果 ViewModel 执行长时间运行的操作，则还要负责将相应逻辑移至后台线程。Kotlin 协程是管理并发操作的绝佳方式，Jetpack 架构组件则为其提供内置支持。如需详细了解如何在 Android 应用中使用协程，请参阅 [Android 上的 Kotlin 协程](https://developer.android.google.cn/kotlin/coroutines?hl=zh-cn)。
2. 公开 API
   1. 一次性操作：在 Kotlin 中，数据层应公开挂起函数；对于 Java 编程语言，数据层应公开用于提供回调来通知操作结果的函数，或公开 RxJava `Single`、`Maybe` 或 `Completable` 类型。
   2. 接收关于数据随时间变化的通知：在 Kotlin 中，数据层应公开[数据流](https://developer.android.google.cn/kotlin/flow?hl=zh-cn)；对于 Java 编程语言，数据层应公开用于发出新数据的回调，或公开 RxJava `Observable` 或 `Flowable` 类型。
3. 线程处理
   1. 请注意，大部分数据源都已提供具有主线程安全性的 API，例如 [Room](https://developer.android.google.cn/training/data-storage/room?hl=zh-cn)、[Retrofit](https://square.github.io/retrofit/) 或 [Ktor](https://ktor.io/) 提供的挂起方法调用。在这些 API 可用时，您的仓库可以充分利用它们。
   2. 如需详细了解线程处理，请参阅[后台处理指南](https://developer.android.google.cn/guide/background?hl=zh-cn)。对于 Kotlin 用户，建议使用[协程](https://developer.android.google.cn/kotlin/coroutines?hl=zh-cn)。如需了解针对 Java 编程语言的推荐选项，请参阅[在后台线程中运行 Android 任务](https://developer.android.google.cn/guide/background/threading?hl=zh-cn)。
4. paging：Paging 库可帮助您加载和显示来自本地存储或网络中更大的数据集中的数据页面。此方法可让您的应用更高效地利用网络带宽和系统资源。Paging 库的组件旨在契合推荐的 [Android 应用架构](https://developer.android.google.cn/jetpack/docs/guide?hl=zh-cn)，流畅集成其他 [Jetpack](https://developer.android.google.cn/jetpack?hl=zh-cn) 组件，并提供一流的 Kotlin 支持。
5. 可能是史上最简单的！一张图3分钟让你明白Activity启动流程，不看后悔！[3分钟看懂Activity启动流程 - 简书](http://www.jianshu.com/p/9ecea420eb52)
6. 开源项目：干货来袭，推荐几款开源的Kotlin的Android项目https://mp.weixin.qq.com/s/RV8kj1ZnFd35ZmGBwdxAxw、https://mp.weixin.qq.com/s/x4zMgl7wRRVurAWSa4GqHQ



