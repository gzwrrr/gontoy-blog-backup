---
title: "Android Window"
shortTitle: "Android Window"
description: "Android Window"
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
  text: "Android Window"
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
  title: "Android Window"
  description: "Android Window"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android Window

[[toc]]



## 基本概念

Window表示一个窗口的概念，在日常开发中直接接触Window的机会并不多，但是在某些特殊时候我们需要在桌面上显示一个类似悬浮窗的东西，那么这种效果就需要用到Window来实现。

Window是一个抽象类，它的具体实现是PhoneWindow。

创建一个Window是很简单的事，只需要通过WindowManager即可完成。WindowManager是外界访问Window的入口，Window的具体实现位于WindowManagerService中，WindowManager和Window-ManagerService的交互是一个IPC过程。

Android中所有的视图都是通过Window来呈现的，不管是Activity、Dialog还是Toast，它们的视图实际上都是附加在Window上的，因此Window实际是View的直接管理者。

View的事件分发机制也可以知道，单击事件由Window传递给DecorView，然后再由DecorView传递给我们的View，就连Activity的设置视图的方法setContentView在底层也是通过Window来完成的。

```java
mFloatingButton = new Button(this);
mFloatingButton.setText("button");
mLayoutParams = new WindowManager.LayoutParams(LayoutParams.WRAP_CONTENT,LayoutParams.WRAP_CONTENT,0,0,PixelFormat.TRANSPARENT);
mLayoutParams.flags = LayoutParams.FLAG_NOT_TOUCH_MODAL
    | LayoutParams.FLAG_NOT_FOCUSABLE
    | LayoutParams. FLAG_SHOW_WHEN_LOCKED
mLayoutParams.gravity = Gravity.LEFT | Gravity.TOP;
mLayoutParams.x = 100;
mLayoutParams.y = 300;
mWindowManager.addView(mFloatingButton,mLayoutParams);
```

WindowManager. LayoutParams中的flags和type这两个参数比较重要



### Flags

Flags参数表示Window的属性，它有很多选项，通过这些选项可以控制Window的显示特性，常用的有：

- `FLAG_NOT_FOCUSABLE`：表示Window不需要获取焦点，也不需要接收各种输入事件，此标记会同时启用FLAG_NOT_TOUCH_MODAL，最终事件会直接传递给下层的具有焦点的Window。
- `FLAG_NOT_TOUCH_MODAL`：在此模式下，系统会将当前Window区域以外的单击事件传递给底层的Window，当前Window区域以内的单击事件则自己处理。这个标记很重要，一般来说都需要开启此标记，否则其他Window将无法收到单击事件。
- `FLAG_SHOW_WHEN_LOCKED`：开启此模式可以让Window显示在锁屏的界面上。



### Type

Type参数表示Window的类型，Window有三种类型：

- 应用 Window：应用类Window对应着一个Activity。
- 子 Window：子Window不能单独存在，它需要附属在特定的父Window之中，比如常见的一些Dialog就是一个子Window。
- 系统 Window：系统Window是需要声明权限在能创建的Window，比如Toast和系统状态栏这些都是系统Window。



### Window

Window是分层的，每个Window都有对应的z-ordered，层级大的会覆盖在层级小的Window的上面，这和HTML中的z-index的概念是完全一致的。

在三类Window中，应用Window的层级范围是1~99，子Window的层级范围是1000～1999，系统Window的层级范围是2000～2999，这些层级范围对应着WindowManager.LayoutParams的type参数。

系统Window的层级是最大的，而且系统层级有很多值，一般我们可以选用：

- `TYPE_SYSTEM_OVERLAY`
- `TYPE_SYSTEM_ERROR`

如果采用TYPE_SYSTEM_ERROR，只需要为type参数指定这个层级即可：`mLayoutParams.type = LayoutParams.TYPE_SYSTEM_ERROR`；同时声明权限：`<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />`。因为系统类型的Window是需要检查权限的，如果不在AndroidManifest中使用相应的权限，那么创建Window的时候就会报错。



### WindowManager

WindowManager所提供的功能很简单，常用的只有三个方法，即添加View、更新View和删除View，这三个方法定义在ViewManager中，而WindowManager继承了ViewManager。

对开发者来说，WindowManager常用的就只有这三个功能而已，但是这三个功能已经足够我们使用了。它可以创建一个Window并向其添加View，还可以更新Window中的View，另外如果想要删除一个Window，那么只需要删除它里面的View即可。由此来看，WindowManager操作Window的过程更像是在操作Window中的View。我们时常见到那种可以拖动的Window效果，其实是很好实现的，只需要根据手指的位置来设定LayoutParams中的x和y的值即可改变Window的位置。



## Window 内部机制

Window是一个抽象的概念，每一个Window都对应着一个View和一个ViewRootImpl，Window和View通过ViewRootImpl来建立联系，因此Window并不是实际存在的，它是以View的形式存在。

View是Android中的视图的呈现方式，但是View不能单独存在，它必须附着在Window这个抽象的概念上面，因此有视图的地方就有Window。

这点从WindowManager的定义也可以看出，它提供的三个接口方法：

- `addView`
- `updateViewLayout`
- `removeView`

三个方法都是针对View的，这说明View才是Window存在的实体。

在实际使用中无法直接访问Window，对Window的访问必须通过WindowManager。为了分析Window的内部机制，这里从Window的添加、删除以及更新说起。

WindowManagerImpl并没有直接实现Window的三大操作，而是全部交给了WindowManagerGlobal来处理，WindowManagerGlobal以工厂的形式向外提供自己的实例（通过桥接模式的思想将全部操作委托给WindowManagerGlobal）

Android中可以提供视图的地方有Activity、Dialog、Toast，除此之外，还有一些依托Window而实现的视图，比如PopUpWindow、菜单，它们也是视图，有视图的地方就有Window，因此Activity、Dialog、Toast等视图都对应着一个Window。





