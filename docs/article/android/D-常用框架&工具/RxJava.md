---
title: "RxJava"
shortTitle: "RxJava"
description: "RxJava"
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
  text: "RxJava"
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
  title: "RxJava"
  description: "RxJava"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RxJava

:::info 相关文档

[RxJava](https://github.com/ReactiveX/RxJava)

[RxAndroid](https://github.com/ReactiveX/RxAndroid)

[RxJava 中文文档](https://mcxiaoke.gitbooks.io/rxdocs/content/)

:::



核心是异步数据流和响应式编程

1. 为异步而生，无需手动创建线程，具备线程切换能力
2. 支持链式调用
3. 具有各种操作符
4. 简化了异常处理

使用场景：

1. 网络请求
2. 数据库读写
3. 文件读写
4. 定时任务





## 核心概念

1. 观察者：观察事件并做出响应
2. 被观察者（可以互相转换）：触发事件并确定何时发送事件。
   1. Observable
   2. Flowable
   3. Single
   4. Completable
   5. Maybe
3. 订阅：观察者与被观察者建立连接（与正常逻辑相反，RxJava 中是被观察者订阅观察者）





## 相关文章

1. http://futurice.com/blog/tech-pick-of-the-week-rx-for-net-and-rxjava-for-android
2. http://futurice.com/blog/top-7-tips-for-rxjava-on-android
3. https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
4. http://futurice.com/blog/android-development-has-its-own-swift