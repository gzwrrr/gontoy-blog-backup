---
title: "Android 性能优化"
shortTitle: "Android 性能优化"
description: "Android 性能优化"
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
  text: "Android 性能优化"
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
  title: "Android 性能优化"
  description: "Android 性能优化"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Android 性能优化

[[toc]]



## 基础知识

:::info 说明

[官方性能优化视频](https://www.youtube.com/playlist?list=PLWz5rJ2EKKc9CBxr3BVjPTPoDPLdPIFCE)

:::

优化一般包括：

- 布局优化
- 绘制优化
- 内存泄露优化
- 响应速度优化
- ListView优化
- Bitmap优化
- 线程优化





## 布局优化

> 布局优化的思想很简单，就是尽量减少布局文件的层级。
>

- 首先删除布局中无用的控件和层级，其次有选择地使用性能较低的ViewGroup，比如RelativeLayout。
- 如果布局中既可以使用LinearLayout也可以使用RelativeLayout，那么就采用LinearLayout，这是因为RelativeLayout的功能比较复杂，它的布局过程需要花费更多的CPU时间。
- FrameLayout和LinearLayout一样都是一种简单高效的ViewGroup，因此可以考虑使用它们，但是很多时候单纯通过一个LinearLayout或者FrameLayout无法实现产品效果，需要通过嵌套的方式来完成。这种情况下还是建议采用RelativeLayout，因为ViewGroup的嵌套就相当于增加了布局的层级，同样会降低程序的性能。

布局优化的另外一种手段是采用`<include>`标签、`<merge>`标签和`ViewStub`。

`<include>`标签主要用于布局重用，`<merge>`标签一般和`<include>`配合使用，它可以降低减少布局的层级，而ViewStub则提供了按需加载的功能，当需要时才会将ViewStub中的布局加载到内存，这提高了程序的初始化效率。





## 绘制优化

> 绘制优化是指View的onDraw方法要避免执行大量的操作

- `onDraw`中不要创建新的局部对象，这是因为onDraw方法可能会被频繁调用，这样就会在一瞬间产生大量的临时对象，这不仅占用了过多的内存而且还会导致系统更加频繁gc，降低了程序的执行效率。
- `onDraw`方法中不要做耗时的任务，也不能执行成千上万次的循环操作，尽管每次循环都很轻量级，但是大量的循环仍然十分抢占CPU的时间片，这会造成View的绘制过程不流畅。

:::info 说明

按照Google官方给出的性能优化典范中的标准，View的绘制帧率保证60fps是最佳的，这就要求每帧的绘制时间不超过16ms（16ms = 1000 / 60），虽然程序很难保证16ms这个时间，但是尽量降低onDraw方法的复杂度总是切实有效的。

:::





## 内存泄露优化

内存泄露的优化分为两个方面：

1. 避免写出有内存泄露的代码。
2. 通过一些分析工具比如MAT来找出潜在的内存泄露继而解决。

一般内存泄露的情况有：

- 静态变量导致内存泄露
- 单例模式导致内存泄露
- 属性动画导致内存泄露





## 响应速度优化

> 响应速度优化的核心思想是避免在主线程中做耗时操作

:::info 说明

响应速度过慢更多地体现在Activity的启动速度上面，如果在主线程中做太多事情，会导致Activity启动时出现黑屏现象，甚至出现ANR。

Android规定，Activity如果5秒钟之内无法响应屏幕触摸事件或者键盘输入事件就会出现ANR，而BroadcastReceiver如果10秒钟之内还未执行完操作也会出现ANR。

当一个进程发生ANR了以后，系统会在`/data/anr`目录下创建一个文件`traces.txt`，通过分析这个文件就能定位出ANR的原因

:::





## ListView 与 Bitmap 优化

ListView 主要分为三个方面：

1. 要采用ViewHolder并避免在getView中执行耗时操作。
2. 要根据列表的滑动状态来控制任务的执行频率，比如当列表快速滑动时显然是不太适合开启大量的异步任务的。
3. 后可以尝试开启硬件加速来使Listview的滑动更加流畅。

Listview的优化策略完全适用于GridView。

Bitmap的优化主要通过`BitmapFactory.Options`来根据需要对图片进行采样，采样过程中主要用到了`BitmapFactory.Options`的`inSampleSize`参数。





## 线程优化

> 线程优化的思想是采用线程池，避免程序中存在大量的Thread。

线程池可以重用内部的线程，从而避免了线程的创建和销毁所带来的性能开销，同时线程池还能有效地控制线程池的最大并发数，避免大量的线程因互相抢占系统资源从而导致阻塞现象的发生。





## 性能优化建议

1. 避免创建过多的对象。
2. 不要过多使用枚举，枚举占用的内存空间要比整型大。
3. 常量使用static final来修饰。
4. 使用一些Android特有的数据结构，比如SparseArray和Pair等，它们都具有更好的性能。
5. 适当使用软引用和软引用。
6. 采用内存缓存和磁盘缓存。
7. 尽量采用静态内部类，这样可以避免潜在的由于内部类而导致的内存泄露。



