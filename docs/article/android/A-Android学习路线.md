---
title: "Android 学习路线"
shortTitle: "A-Android 学习路线"
description: "Android 学习路线"
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
sticky: 10
star: true
article: true
timeline: true
dir:
  text: "Android 学习路线"
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
  title: "Android 学习路线"
  description: "Android 相关资源"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 学习路线

[[toc]]



## 前言

> 引用自徐公公众号文章

1. 学习编程基础：作为一名安卓开发者，首先需要掌握编程基础知识，包括算法、数据结构和面向对象编程等。建议选择一种主流编程语言，如Java或Kotlin，并熟悉其语法和基本概念。
2. 学习安卓开发基础：掌握安卓开发的基本知识和技能是至关重要的。
   1. 学习如何使用Android SDK和开发工具，如Android Studio，以及掌握调试技巧和应用发布过程。
   2. 学习安卓的核心组件，如Activity、Fragment、Intent、布局等，并了解它们之间的交互方式。
3. 掌握用户界面设计：学习如何创建具有吸引力和易用性的用户界面是安卓开发的重要组成部分。
4. 了解安卓的UI组件库，如RecyclerView、ListView、Toolbar等，并学习如何使用XML和代码来创建布局和界面元素。
5. 数据存储和管理：学习如何在安卓应用中有效地存储和管理数据是必不可少的。了解SQLite数据库和Shared Preferences等常用的数据存储方式，并学习如何使用它们来实现数据持久化和数据管理。
6. 网络和后端集成：掌握与后端服务器进行通信的技术对于开发许多实用的安卓应用至关重要。学习如何使用HTTP请求、处理JSON数据和与RESTful API进行交互。熟悉常用的网络库，如OkHttp和Retrofit，并了解如何处理网络请求的异步操作。
7. 增加功能和性能优化：学习如何添加各种功能到安卓应用中，如摄像头、地理位置、传感器等。同时，了解如何进行应用性能优化，包括内存管理、多线程处理和电池寿命优化等。
8. 学习最新的安卓开发技术和趋势：安卓开发领域不断演变和更新，因此要保持学习的态度。了解最新的安卓开发技术和框架，如Jetpack、Kotlin Coroutines、Compose等，并学会如何在项目中应用它们。
9. 实践项目和持续学习：最重要的是通过实践项目来巩固所学知识，并不断扩展自己的技能。参与开源项目、开发个人应用或尝试解决实际问题，同时阅读博客、文档和参与开发者社区，以保持与其他开发者的交流和学习。



## 个人思路

> 每日积累：算法、设计模式、Kotlin、Java 底层

思路：自顶向下（自底向上时间方面代价太大，目前的目标是尽快投入生产）

1. 语言方面：Kotlin 以使用为主、Java 以底层原理为主
2. 基础方面：快速过掉，搭建持续学习扩展的框架，不断积累（靠书籍/公众号/博客/视频/开源项目/常见考点）
3. 熟悉开发框架、第三方依赖，从开源项目下手，在实践中学习，总结出现的核心技术点
4. 后续发展/持续学习：
   1. 纵向：着重 Framework 及更下层（内核）、性能优化
   2. 横向：关注大前端（Flutter、H5、小程序、ReactNative、鸿蒙等）



短期计划（一个月，**重在搭建持续学习的环境**，构建好整个知识体系的框架）：

> 已经掌握了大部分通用的技术，重新过一遍会比较快

1. 基础 + 项目管理（7）
2. 数据持久层（2）
3. 权限管理（2）
4. 自定义控件、项目实战进阶、发布分发（4）
5. 常用开发库、开发框架（7）
6. 底层原理、开源项目源码（3）
7. Framework、性能优化、内核（3）



学习资源：

1. 书籍：疯狂Android讲义、深入理解Android、Android源码设计模式、Android框架揭秘、深入理解Android 系列
2. 公众号（相关10+，其他领域40+）
3. 博客（相关8，其他领域20+）、视频博主（1）、线上课程（1）
4. 开发框架、开源项目（5）
5. 交流群（3） + 常见问题（PDF 总结）



## 时间安排

> 重新巩固 + 搭建持续学习的环境
>
> 估计 1 个月过一遍，目的在于应用并搭建起持续学习的环境。后续再用若干月巩固深入

1. 基础 + 项目管理（7）
   - [x] 开发环境（开发、测试、模拟生产）
   - [x] Activity、Service、BroadcastReceiver、ContentProvider
   - [x] 布局：XML、View、Layout Manager
   - [x] 资源管理：图像、字符串、颜色、样式主题
   - [x] Fragment
   - [x] Intent
   - [x] UI 组件：RecyclerView、ListView、Toolbar、Compose…
2. 数据持久化（2）
   - [x] SQLite
   - [x] Shared Preferences
   - [x] 文件存储
   - [x] 网络数据交互
3. 权限管理（2）
   - [x] 权限申请
   - [x] 权限检查
4. 自定义控件、项目实战、发布分发（4）
5. 常用开发库、开发框架、原理（7）
   - [x] OkHttp
   - [x] Retrofit
   - [x] Jetpack
   - [x] Kotlin Coroutines
   - [x] MVVM
   - [x] 依赖注入
   - [x] SDK
   - [x] 打包发布
6. 开源项目（3）
7. Framework、性能优化、内核（3）

:::note 说明（参考）

除了：开源项目、Framework、性能优化、内核

其余部分实际用时：一周

工作包括：视频（137集）+《第一行代码——Android（第3版）》+ 笔记

:::



## Java 与 Kotlin

1. 语法风格：Java是一种面向对象的编程语言，语法相对严格和冗长。而Kotlin是一种现代化的编程语言，旨在提供更简洁、易读和表达力强的语法。Kotlin的语法更加紧凑，减少了Java中一些冗余的代码，提供了更多的语法糖和便捷的特性。
2. 空安全和类型推断：Kotlin在语言层面上支持空安全，即在类型系统中区分可为空和非空的引用类型，以减少空指针异常的风险。另外，Kotlin具有更强大的类型推断能力，可以自动推断变量和表达式的类型，减少类型声明的冗余。
3. 扩展函数和属性：Kotlin引入了扩展函数和属性的概念，可以在不修改原始类的情况下，为已有的类添加新的函数和属性。这样可以使代码更加模块化和灵活，便于对现有类进行功能扩展。
4. 空安全和异常处理：在Java中，空指针异常是一个常见的问题，需要开发者显式地检查和处理空引用。而Kotlin通过类型系统的空安全特性，在编译阶段就能检测到可能的空引用，并强制开发者采取相应的处理措施。此外，Kotlin还引入了更简洁的异常处理语法，使得异常处理更加简便。
5. 互操作性：Kotlin是为了与Java无缝互操作而设计的。这意味着Kotlin可以与现有的Java代码进行互操作，可以直接调用Java类和方法，并且Java代码也可以调用Kotlin代码。这种互操作性使得在现有的Java项目中引入Kotlin变得相对容易。





## 相关概念

:::info 说明

安卓开发中的常见概念，持续补充…

:::



### 概览

安卓开发包含了以下几个主要的部分：

1. 应用组件（Application Components）：安卓应用由多个独立的组件组成，每个组件具有特定的功能和生命周期。常见的应用组件包括：
   - Activity（活动）：用户界面的展示和交互的单个屏幕。
   - Service（服务）：在后台执行长时间运行的操作，而不提供用户界面。
   - BroadcastReceiver（广播接收器）：接收和响应系统或应用中的广播消息。
   - ContentProvider（内容提供器）：用于应用之间共享数据，提供数据访问接口。
2. 用户界面（User Interface）：安卓应用的用户界面由布局和控件组成。用户界面开发包括以下内容：
   - XML布局：使用XML定义应用界面的结构和外观。
   - 视图（View）：安卓提供了各种预定义的视图（如按钮、文本框、图像视图等）用于构建用户界面。
   - 布局管理器（Layout Manager）：用于在屏幕上定位和排列视图。
3. 资源管理（Resource Management）：安卓应用使用资源文件来存储非代码相关的内容，如图像、字符串、颜色等。资源管理包括以下方面：
   - 图像资源：应用中使用的图像文件，可以是PNG、JPEG等格式。
   - 字符串资源：应用中使用的文本字符串，用于支持国际化和本地化。
   - 颜色和尺寸资源：定义应用中使用的颜色值和尺寸规格。
   - 样式和主题资源：定义应用的样式和主题，包括字体、颜色、背景等。
4. 数据存储和管理（Data Storage and Management）：安卓应用需要存储和管理数据。常见的数据存储和管理方式包括：
   - SQLite数据库：用于在应用中创建、读取、更新和删除结构化数据。
   - 文件存储：用于在设备上存储和读取文件。
   - SharedPreferences：用于存储简单的键值对数据。
   - 网络数据交互：通过与服务器进行通信来获取和发送数据。
5. 权限管理（Permission Management）：安卓应用需要申请和管理权限以访问设备功能和用户数据。权限管理涉及以下方面：
   - 权限申请：应用在运行时向用户请求权限。
   - 权限检查：应用在使用敏感功能或访问用户数据之前检查是否获得了相应的权限。
6. 调试和测试（Debugging and Testing）：为确保应用质量和稳定性，安卓开发包括以下方面：
   - 日志记录和调试：使用日志记录系统输出信息，以及使用调试器进行代码调试。
   - 单元测试和集成测试：编写测试用例来验证应用的各个部分的功能和逻辑。
7. 发布和分发（Publishing and Distribution）：在应用开发完成后，需要发布和分发给用户。这包括以下内容：
   - 应用签名：为应用生成数字签名，以确保应用的完整性和安全性。
   - 应用商店：将应用提交到应用商店（如Google Play）以供用户下载和安装。
   - 更新和版本管理：发布应用的更新版本，并进行版本管理和维护。



### 四大组件

:::info 说明

1. 应用组件是 Android 应用的基本构建块。每个组件都是一个入口点，系统或用户可通过该入口点进入您的应用。有些组件会依赖于其他组件。
2. 每种类型都有不同的用途和生命周期（定义如何创建和销毁组件）
3. 启动组件：在四种组件类型中，有三种（Activity、服务和广播接收器）均通过异步消息 Intent 进行启动。Intent 会在运行时对各个组件进行互相绑定。可以将 Intent 视为从其他组件（无论该组件是属于您的应用还是其他应用）请求操作的信使。

:::

共有四种不同的应用组件类型：

- `Activity`：前台
- `Service`：后台
- `BroadcastReceiver`：广播接收器
- `ContentProvider`：内容提供程序



### 数据存储和管理

1. `Room Persistence Library`：Room是Android Jetpack组件之一，提供了一个更高级别的抽象层，用于在SQLite数据库上进行数据访问和管理。它简化了数据库操作的代码编写，并提供了更强大的查询功能。
2. `Firebase Realtime Database`：Firebase是Google提供的一套云服务工具，其中包括实时数据库（Realtime Database）。它是一种基于NoSQL的云数据库，提供实时数据同步和实时更新的功能，使应用能够快速响应数据变化。
3. `Firebase Firestore`：Firestore是Firebase提供的另一种云数据库，采用了文档模型（document-based model）。它具有实时更新、离线支持、强大的查询能力和可扩展性等特性，适用于构建实时和可扩展的应用。
4. `Network-based Data Storage`：许多应用需要通过网络获取和存储数据，例如使用Web API进行数据交互。安卓应用可以使用网络库（如OkHttp和Retrofit）来处理网络请求和数据解析，以便与服务器进行数据交互。
5. `External Storage`：安卓应用可以使用设备的外部存储（如SD卡）来存储和读取文件。这对于需要在应用之间共享数据或处理大量媒体文件的应用非常有用。
6. `ContentProvider`：ContentProvider是安卓的一个组件，用于提供应用之间共享数据的机制。它可以将应用的数据暴露给其他应用，并提供数据的增删改查接口。
7. `SharedPreferences`：除了之前提到的使用SharedPreferences存储简单的键值对数据外，还可以使用SharedPreferences来存储应用的偏好设置、用户首选项等。





### Jetpack 全家桶

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



### MVVM 架构

在安卓开发中，MVVM的基本概念如下：

- Model（模型）：代表应用的数据模型和业务逻辑。它负责处理数据的获取、处理和存储。
- View（视图）：负责展示用户界面，并与用户进行交互。它通常是Activity、Fragment或View的一部分。
- ViewModel（视图模型）：连接Model和View的中间层。它负责将数据从Model转换为View可使用的形式，并暴露可供View绑定的可观察数据和命令。

<br/>

MVVM的关键概念是数据绑定（Data Binding），它通过观察ViewModel中的数据变化，自动更新与之绑定的视图。这种绑定使得数据的更新和界面的刷新更加自动化和简化，减少了手动的UI更新代码。

与前端的MVVM框架相比，安卓的MVVM在实现细节上有所不同。在安卓中，常用的MVVM实现方式是结合Jetpack库中的ViewModel和LiveData来管理数据和实现观察。ViewModel用于存储和管理与界面相关的数据，LiveData用于通知数据的变化并更新界面。

<br/>

此外，安卓开发中的MVVM还可以进行一些扩展和改进，例如：

- 使用第三方的数据绑定库，如Data Binding Library或Butter Knife，以简化数据绑定的实现。
- 结合使用RxJava或Kotlin Coroutines，使得异步任务的处理更加方便和优雅。
- 使用依赖注入（Dependency Injection）框架，如Dagger或Koin，以实现组件之间的解耦和依赖管理。





### 其他概念

1. 响应式UI开发：采用Jetpack Compose等现代化UI框架，通过声明式编程方式构建响应式的用户界面。使用观察者模式、数据绑定和状态管理等技术，实现数据驱动的界面更新和交互。
2. 移动端架构：采用现代化的架构模式和框架，如MVVM（Model-View-ViewModel）、MVP（Model-View-Presenter）、Clean Architecture等，以实现可维护、可扩展和高效的应用架构。
3. 数据持久化和管理：使用Room Persistence Library或Firebase等库，处理数据的持久化存储和管理。采用合适的数据库技术、数据缓存和远程数据同步等，以满足应用的数据存储和访问需求。
4. 网络和后端集成：与后端服务器进行数据交互和集成，通过HTTP请求、RESTful API或GraphQL等技术实现数据的获取和发送。使用网络库（如OkHttp、Retrofit）和身份验证机制，确保网络通信的安全性和可靠性。
5. 用户体验优化：关注用户体验，通过使用动画、过渡效果、触摸反馈、主题和样式等手段，提供出色的用户界面和交互体验。遵循安卓的设计准则和最佳实践，以确保应用的易用性和一致性。
6. 测试和调试：编写单元测试、集成测试和UI测试，以确保应用的质量和稳定性。使用调试器、日志记录和性能分析工具等，辅助应用的调试和性能优化。
7. 安全和隐私保护：保护应用和用户数据的安全性，实施适当的数据加密、用户认证、授权和权限管理。遵循隐私法规和最佳实践，保护用户的个人信息和隐私。
8. 多平台开发：考虑在不同平台上进行应用开发，如安卓、iOS、Web等。使用跨平台框架（如Flutter、React Native）或共享代码库（如Kotlin Multiplatform）等，实现跨平台的应用开发和代码共享。
9. 远程通知和推送：通过使用Firebase Cloud Messaging（FCM）或其他推送服务，实现应用的远程通知、消息推送和实时通信功能。
10. 数据分析和应用性能监控：使用应用性能监控工具（如Firebase Performance Monitoring、Crashlytics）和数据分析工具（如Firebase Analytics、Google Analytics），收集应用使用数据、错误报告和性能指标，以优化应用性能和用户体验。


