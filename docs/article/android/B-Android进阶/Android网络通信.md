---
title: "Android 网络通信"
shortTitle: "Android 网络通信"
description: "Android 网络通信"
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
  text: "Android 网络通信"
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
  title: "Android 网络通信"
  description: "Android 网络通信"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 网络通信

[[toc]]



## 异步消息

**四大组件：**

1. `Message`
2. `MessageQueue`
3. `Handler`
4. `Looper`



### AsyncTask

重写AsyncTask中的几个方法才能完成对异步任务的定制。经常需要重写的方法有以下4个：

1. `onPreExecute()`：这个方法会在后台任务开始执行之前调用，用于进行一些界面上的初始化操作，比如显示一个进度条对话框等

2. `doInBackground(Params...)`：这个方法中的所有代码都会在子线程中运行，我们应该在这里去处理所有的耗时任务。任务一旦完成，就可以通过return语句将任务的执行结果返回，如果AsyncTask的第三个泛型参数指定的是Unit，就可以不返回任务执行结果。注意，在这个方法中是不可以进行UI操作的，如果需要更新UI元素，比如说反馈当前任务的执行进度，可以调用`publishProgress (Progress...)`方法来完成。

3. `onProgressUpdate(Progress...)`：当在后台任务中调用了`publishProgress(Progress...)`方法后，`onProgressUpdate (Progress...)`方法就会很快被调用，该方法中携带的参数就是在后台任务中传递过来的。在这个方法中可以对UI进行操作，利用参数中的数值就可以对界面元素进行相应的更新。

4. `onPostExecute(Result)`：当后台任务执行完毕并通过return语句进行返回时，这个方法就很快会被调用。返回的数据会作为参数传递到此方法中，可以利用返回的数据进行一些UI操作，比如说提醒任务执行的结果，以及关闭进度条对话框等。



## 网络请求

在过去，Android上发送HTTP请求一般有两种方式：`HttpURLConnection`和`HttpClient`。不过由于HttpClient存在API数量过多、扩展困难等缺点，Android团队越来越不建议我们使用这种方式。

在Android 6.0系统中，HttpClient的功能被完全移除了，标志着此功能被正式弃用，因此本小节我们就学习一下现在官方建议使用的`HttpURLConnection`的用法。

如今一般采用：

1. OkHttp
2. Retrofit



## 并发

Kotlin 中线程参数主要有以下3种值可选：

1. `Dispatchers.Default`
2. `Dispatchers.IO`
3. `Dispatchers.Main`

`suspendCoroutine`函数必须在协程作用域或挂起函数中才能调用，它接收一个Lambda表达式参数，主要作用是将当前协程立即挂起，然后在一个普通的线程中执行Lambda表达式中的代码。Lambda表达式的参数列表上会传入一个Continuation参数，调用它的`resume()`方法或`resumeWithException()`可以让协程恢复执行

