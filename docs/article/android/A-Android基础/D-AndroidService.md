---
title: "Android Service"
shortTitle: "D-Android Service"
description: "Android Service"
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
  text: "Android Service"
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
  title: "Android Service"
  description: "Android Service"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android Service

[[toc]]

> 在很早之前，Android系统的后台功能是非常开放的，Service的优先级也很高，仅次于Activity，那个时候可以在Service中做很多事情。但由于后台功能太过于开放，每个应用都想无限地占用后台资源，导致手机的内存越来越紧张，耗电越来越快，也变得越来越卡。为了解决这些情况，基本上Android系统每发布一个新版本，后台权限都会被进一步收紧。

核心方法：

1. `onBind()`

2. `onCreate()`

3. `onStartCommand()`

4. `onDestroy()`



### 异步消息处理

![image-20230922154930504](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231002/android%E5%BC%82%E6%AD%A5%E6%B6%88%E6%81%AF%E5%8E%9F%E7%90%86.png)

Android中的异步消息处理主要由4个部分组成：Message、Handler、MessageQueue和Looper：

1. **Message**：Message是在线程之间传递的消息，它可以在内部携带少量的信息，用于在不同线程之间传递数据。上一小节中我们使用到了Message的what字段，除此之外还可以使用arg1和arg2字段来携带一些整型数据，使用obj字段携带一个Object对象。
2. **Handler**：Handler顾名思义也就是处理者的意思，它主要是用于发送和处理消息的。发送消息一般是使用Handler的sendMessage()方法、post()方法等，而发出的消息经过一系列地辗转处理后，最终会传递到Handler的handleMessage()方法中。
3. **MessageQueue**：MessageQueue是消息队列的意思，它主要用于存放所有通过Handler发送的消息。这部分消息会一直存在于消息队列中，等待被处理。每个线程中只会有一个MessageQueue对象。
4. **Looper**：Looper 是每个线程中的MessageQueue的管家，调用Looper的loop()方法后，就会进入一个无限循环当中，然后每当发现MessageQueue中存在一条消息时，就会将它取出，并传递到Handler的handleMessage()方法中。每个线程中只会有一个Looper对象。



### 前台 Service

Service中的代码都是默认运行在主线程当中的，如果直接在Service里处理一些耗时的逻辑，就很容易出现ANR（Application Not Responding）的情况。

从Android 8.0系统开始，只有当应用保持在前台可见状态的情况下，Service才能保证稳定运行，一旦应用进入后台之后，Service随时都有可能被系统回收。而如果你希望Service能够一直保持运行状态，就可以考虑使用前台Service。

前台Service和普通Service最大的区别就在于，它一直会有一个正在运行的图标在系统的状态栏显示，下拉状态栏后可以看到更加详细的信息，非常类似于通知的效果。