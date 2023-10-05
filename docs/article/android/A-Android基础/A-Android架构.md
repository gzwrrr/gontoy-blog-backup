---
title: "Android 架构"
shortTitle: "B-Android 架构"
description: "Android 架构"
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
  text: "Android 架构"
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
  title: "Android 架构"
  description: "Android 架构"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Android 架构

[[toc]]



## 前言

Android系统架构分为五层：

1. 从上到下依次是应用层（System Apps）
2. 应用框架层（Java API Framework）
3. 系统运行库层（Native）
4. 硬件抽象层(HAL)和Linux内核层。
5. AF就是其中的System **Apps**和Java API **Framework**，这两层都是使用Java语言开发的。



## 架构设计原则

三大原则：

1. 关注点分离
2. （持久）数据模型驱动界面
3. 单一数据源（SSOT）与单向数据流（UDF）

三层架构：

1. UI，界面层由以下两部分组成：
   - 在屏幕上呈现数据的界面元素。您可以使用 View 或 [Jetpack Compose](https://developer.android.google.cn/jetpack/compose?hl=zh-cn) 函数构建这些元素。
   - 用于存储数据、向界面提供数据以及处理逻辑的状态容器（如 [ViewModel](https://developer.android.google.cn/topic/libraries/architecture/viewmodel?hl=zh-cn) 类）。
2. 领域层（网域）
3. 数据层：
   - 应用的数据层包含*业务逻辑*。业务逻辑决定应用的价值，它包含决定应用如何创建、存储和更改数据的规则。
   - 数据层由多个仓库组成，其中每个仓库都可以包含零到多个数据源。您应该为应用中处理的每种不同类型的数据分别创建一个存储库类。例如，您可以为与电影相关的数据创建一个 `MoviesRepository` 类，或者为与付款相关的数据创建一个 `PaymentsRepository` 类。

此*现代应用架构*鼓励采用以下方法及其他一些方法：

- 反应式分层架构。
- 应用的所有层中的单向数据流 (UDF)。
- 包含状态容器的界面层，用于管理界面的复杂性。
- 协程和数据流。
- 依赖项注入最佳实践。

存储库类负责以下任务：

- 向应用的其余部分公开数据。
- 集中处理数据变化。
- 解决多个数据源之间的冲突。
- 对应用其余部分的数据源进行抽象化处理。
- 包含业务逻辑。

每个数据源类应仅负责处理一个数据源，数据源可以是文件、网络来源或本地数据库。数据源类是应用与数据操作系统之间的桥梁。

此层中的类通常称为“用例”或“交互方”。每个用例都应仅负责单个功能。例如，如果多个 ViewModel 依赖时区在屏幕上显示适当的消息，则您的应用可能具有 `GetTimeZoneUseCase` 类。



### 系统架构

![image-20230922143831716](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231002/android%E7%B3%BB%E7%BB%9F%E7%BB%93%E6%9E%84.png)

分为四层：

1. 应用层：所有安装在手机上的应用程序都是属于这一层的，比如系统自带的联系人、短信等程序，或者是你从Google Play上下载的小游戏，当然还包括你自己开发的程序。
2. 应用框架层：这一层主要提供了构建应用程序时可能用到的各种API，Android自带的一些核心应用就是使用这些API完成的，开发者可以使用这些API来构建自己的应用程序。
3. 系统运行库层
   1. 这一层通过一些C/C++库为Android系统提供了主要的特性支持。如SQLite库提供了数据库的支持，OpenGL|ES库提供了3D绘图的支持，Webkit库提供了浏览器内核的支持等。
   2. 在这一层还有Android运行时库，它主要提供了一些核心库，允许开发者使用Java语言来编写Android应用。
   3. 另外，Android运行时库中还包含了Dalvik虚拟机（5.0系统之后改为ART运行环境），它使得每一个Android应用都能运行在独立的进程中，并且拥有一个自己的虚拟机实例。相较于Java虚拟机，Dalvik和ART都是专门为移动设备定制的，它针对手机内存、CPU性能有限等情况做了优化处理。
4. Linux内核层：Android系统是基于Linux内核的，这一层为Android设备的各种硬件提供了底层的驱动，如：
   1. 显示驱动
   2. 音频驱动
   3. 照相机驱动
   4. 蓝牙驱动
   5. Wi-Fi驱动
   6. 电源管理



### 设计模式

应用中的类要依赖其他类才能正常工作。可以使用以下任一设计模式来收集特定类的依赖项：

- [依赖注入 (DI)](https://developer.android.google.cn/training/dependency-injection?hl=zh-cn)：依赖注入使类能够定义其依赖项而不构造它们。在运行时，另一个类负责提供这些依赖项。
- [服务定位器](https://en.wikipedia.org/wiki/Service_locator_pattern)：服务定位器模式提供了一个注册表，类可以从中获取其依赖项而不构造它们。

Android 中有两种主要的依赖项注入方式：

- **构造函数注入**：这就是上面描述的方式。您将某个类的依赖项传入其构造函数。
- **字段注入（或 setter 注入）**：某些 Android 框架类（如 activity 和 fragment）由系统实例化，因此无法进行构造函数注入。使用字段注入时，依赖项将在创建类后实例化。

:::note 说明

[Dagger](https://dagger.dev/) 是适用于 Java、Kotlin 和 Android 的热门依赖项注入库，由 Google 进行维护。Dagger 为您创建和管理依赖关系图，从而便于您在应用中使用 DI。它提供了完全静态和编译时依赖项，解决了基于反射的解决方案（如 [Guice](https://en.wikipedia.org/wiki/Google_Guice)）的诸多开发和性能问题。

[Hilt](https://developer.android.google.cn/training/dependency-injection/hilt-android?hl=zh-cn) 是推荐用于在 Android 中实现依赖项注入的 Jetpack 库。Hilt 通过为项目中的每个 Android 类提供容器并自动为您管理其生命周期，定义了一种在应用中执行 DI 的标准方法。

Hilt 在热门 DI 库 [Dagger](https://developer.android.google.cn/training/dependency-injection/dagger-basics?hl=zh-cn) 的基础上构建而成，因而能够受益于 Dagger 提供的编译时正确性、运行时性能、可伸缩性和 Android Studio 支持。（[参考]([使用 Hilt 实现依赖项注入](https://developer.android.google.cn/training/dependency-injection/hilt-android?hl=zh-cn))）

**官方建议在 Android 应用中采用依赖项注入模式并使用 [Hilt 库](https://developer.android.google.cn/training/dependency-injection/hilt-android?hl=zh-cn)。**Hilt 通过遍历依赖项树自动构造对象，为依赖项提供编译时保证，并为 Android 框架类创建依赖项容器。

:::



### 最佳实践

:::info 说明

[Android 开发最佳实践，让你少走弯路](https://mp.weixin.qq.com/s/p811AN6BnYkYpHVuS0Adaw)

:::

1. 不要将数据存储在应用组件中
2. 减少对 Android 类的依赖
3. 尽量少公开每个模块中的代码
4. 专注于应用的独特核心，以使其从其他应用中脱颖而出
5. 考虑如何使应用的每个部分可独立测试
6. 保留尽可能多的相关数据和最新数据



