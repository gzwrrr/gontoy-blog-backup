---
title: "Android 数据存储"
shortTitle: "F-Android 数据存储"
description: "Android 数据存储"
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
  text: "Android 数据存储"
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
  title: "Android 数据存储"
  description: "Android 数据存储"
  author:
    name: gzw
    email: 1627121193@qq.com
---



## Android 数据存储

[[toc]]



:::note 数据格式

1. 关系型数据
2. 文本文件

:::



### SharePreference

> 轻量级的存储工具，键值对形式

适用于：

1. 简单且孤立的数据
2. 文本格式的数据
3. 需要持久化存储的数据

**Context**类中的**getSharedPreferences()**方法：

1. 第一个参数用于指定SharedPreferences文件的名称，如果指定的文件不存在则会创建一个，SharedPreferences文件都是存放在`/data/data/<packagename>/shared_prefs/`目录下的；
2. 第二个参数用于指定操作模式，目前只有默认的MODE_PRIVATE这一种模式可选，它和直接传入0的效果是相同的，表示只有当前的应用程序才可以对这个SharedPreferences文件进行读写。

:::warning 注意

其他几种操作模式均已被废弃，MODE_WORLD_READABLE和MODE_WORLD_WRITEABLE这两种模式是在Android 4.2版本中被废弃的，MODE_MULTI_PROCESS模式是在Android 6.0版本中被废弃的s**Activity**类中的**getPreferences()**方法

:::



### LiveData

[`LiveData`](https://developer.android.google.cn/reference/androidx/lifecycle/LiveData?hl=zh-cn) 是一种可观察的数据存储器类。与常规的可观察类不同，LiveData 具有生命周期感知能力，意指它遵循其他应用组件（如 activity、fragment 或 service）的生命周期。这种感知能力可确保 LiveData 仅更新处于活跃生命周期状态的应用组件观察者。



### SQLite

> TODO SQLiteDatabase、SQLiteOpenHelper



### Jetpack Room

> TODO 基于注解简化 SQLite

可能需要亲自写一些解析代码去从Sqlite读取数据对象，或者进行相反的操作。如果可以序列化数据对象，例如通过Gson，只持久化存储最终是字符串。通过这种方式虽然会降低性能，但是从另一个角度来讲，你不需要为每一个数据结构声明表结构。

使用ORM我们通常不推荐使用对象关系映射第三方库除非你有非常复杂的数据结构，并且你确定你真的需要它。他们通常比较复杂，并且需要时间去学习。如果你决定了在你的应用中使用ORM，你应该注意它是否是线程安全的，而对于目前大多数ORM解决方案都是非线程安全的。

使用StethoStetho 是一个Facebook 开源的Android调试工具，它是Chrome Developer Tools的扩展。通过它可以检测应用的网络情况。它也允许你可以检测应用的数据库，shared preferences。但是，你应该确保Stetho只有在Debug状态下得以开启，而不是在正式发布版本中。

使用LeakCanaryLeakCanary 是可以在应用运行中检测，定位内存泄露的Java库。使用它应是你开发应用过程中的一部分。更多详细的配置和使用情况请参照wiki。你只需要记得它在你的正式版本中你是不需要配置的。



### 内外存储

内部存储（内存）

外部存储分为：公共控件和私有空间



### 文件操作

Context类中提供了一个openFileOutput()方法，可以用于将数据存储到指定的文件中。这个方法接收两个参数：

1. 第一个参数是文件名，在文件创建的时候使用，注意这里指定的文件名不可以包含路径，因为所有的文件都默认存储到`/data/data/<package name>/files/`目录下；
2. 第二个参数是文件的操作模式，主要有MODE_PRIVATE和MODE_APPEND两种模式可选，默认是MODE_PRIVATE，表示当指定相同文件名的时候，所写入的内容将会覆盖原文件中的内容，而MODE_APPEND则表示如果该文件已存在，就往文件里面追加内容，不存在就创建新文件。

:::warning 注意

其实文件的操作模式本来还有另外两种：MODE_WORLD_READABLE和MODE_WORLD_WRITEABLE。这两种模式表示允许其他应用程序对我们程序中的文件进行读写操作，不过由于这两种模式过于危险，很容易引起应用的安全漏洞，已在Android 4.2版本中被废弃。

:::



### 其他存储方式

1. 可以通过 Application 对象存储数据。

2. 如果SharedPreferences不足以满足你的需求，那么你可以使用平台标准的ContentProviders，它不仅快速，并且线程安全。使用ContentProviders的唯一问题是建立他们需要大量的模板代码，并且少有高质量的教程。如果可以，我们可以通过使用第三方库Schematic，极大降低了冗余操作，去生ContentProviders。