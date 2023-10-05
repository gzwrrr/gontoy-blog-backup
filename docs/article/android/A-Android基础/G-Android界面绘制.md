---
title: "Android 界面绘制"
shortTitle: "G-Android 界面绘制"
description: "Android 界面绘制"
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
  text: "Android 界面绘制"
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
  title: "Android 界面绘制"
  description: "Android 界面绘制"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 界面绘制

[[toc]]



:::info 相关文章

[可绘制资源](https://developer.android.google.cn/guide/topics/resources/drawable-resource?hl=zh-cn#LayerList)

:::



> 控件都可以称为 View 或者视图

两种方式；

1. XML
2. 硬编码

两种 API：

1. View（自定义 View）
2. Compose

界面的构成（使用 UDF 管理，状态向下流动、事件向上流动的这种模式称为单向数据流 (UDF)）：

1. 元素
2. 状态

中级控件

高级控件

自定义控件



## UDF

状态向下流动、事件向上流动的这种模式称为单向数据流 (UDF)。这种模式对应用架构的影响如下：

- ViewModel 会存储并公开界面要使用的状态。界面状态是经过 ViewModel 转换的应用数据。
- 界面会向 ViewModel 发送用户事件通知。
- ViewModel 会处理用户操作并更新状态。
- 更新后的状态将反馈给界面以进行呈现。
- 系统会对导致状态更改的所有事件重复上述操作。

换句话说，UDF 有助于实现以下几点：

- **数据一致性**。界面只有一个可信来源。
- **可测试性**。状态来源是独立的，因此可独立于界面进行测试。
- **可维护性**。状态的更改遵循明确定义的模式，即状态更改是用户事件及其数据拉取来源共同作用的结果。

如需关于将 `LiveData` 用作可观察数据容器的介绍，请参阅[此 Codelab](https://developer.android.google.cn/codelabs/basic-android-kotlin-training-livedata?hl=zh-cn)。如需关于 Kotlin 数据流的类似介绍，请参阅 [Android 上的 Kotlin 数据流](https://developer.android.google.cn/kotlin/flow?hl=zh-cn)。



## 用户事件

如果用户事件与修改界面元素的状态（如可展开项的状态）相关，界面便可以直接处理这些事件。如果事件需要执行业务逻辑（如刷新屏幕上的数据），则应用由 ViewModel 处理此事件。



## 尺寸

:::info 相关文章

[Android中的常用尺寸单位（dp、sp）快速入门教程](https://www.jb51.net/article/113125.htm)

:::

| 单位/概念  | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| px         | 像素（Pixel），是屏幕上的最小可操作单元，通常用于表示图像或屏幕上的点 |
| resolution | 分辨率，表示屏幕上水平和垂直方向的像素数量，通常以宽x高的形式表示，例如1920x1080 |
| dpi        | 每英寸点数（Dots Per Inch），表示每英寸的线性像素密度，用于测量屏幕或图像的清晰度 |
| density    | 密度，通常指屏幕像素密度或显示设备的像素密度，通常以DPI（每英寸点数）表示 |
| inch       | 英寸，1 英寸约等于2.54厘米，主要用来描述手机屏幕的大小       |
| pt         | 通常用来作为字体的尺寸单位，1 pt相当于1/72英寸               |
| sp         | 大部分人只知道它通常用作字体的尺寸单位，实际大小还与具体设备上的用户设定有关 |
| dp（dip）  | 即设备无关像素（device independent pixels），这种尺寸单位在不同设备上的物理大小相同 |

- `dpi`：像素密度

- `ldpi`：对应的dpi范围为0 ~ 120，也就是说每英寸有0到120个像素点的屏幕的屏幕密度都属于
- `mdpi`：dpi范围为120 ~ 160
- `hdpi`：dpi范围为160 ~ 240
- `xhdpi`：dpi范围为240~320
- `xxhdpi`：dpi范围为320~480
- `px = dip x dpi / 160`

:::warning 注意

对于相同尺寸的手机，即使分辨率不一样，同 dp 的组件占用屏幕的比例也相同

:::



## 视图/布局

视图：

1. `ScrollView` 垂直滚动视图
2. `HorizontalScrollView` 水平滚动视图

布局（可以自定义后引入，组件化思想）：

1. `LinearLayout` 线性布局：水平、垂直、权重
2. `RelativeLayout` 相对布局：[相关文章](https://blog.csdn.net/ZQIR12/article/details/127822301)
3. `GridLayout` 网格布局
4. `FrameLayout`：帧布局（外加 Fragment）

其他：

1. layout_width、layout_height：wrap_content、match_parent、固定大小
2. ViewGroup、Context（Resource）
3. 对齐（layout_gravity、gravity）
4. orientation=vertical/horizontal





## 简单控件

:::info 相关文章

[Android 常用的控件总结](https://blog.csdn.net/weixin_49770443/article/details/117327634)

:::



:::note 说明（XML）

注意点：需要注意命名空间

代码中获取 XML 中的组件使用 R 类（gradle 自动生成）直接获取

层次结构：

1. layout
2. id

引用：

1. 唯一 ID：@+id/
2. 引用组件：@string/

:::



文本：设置文本的：内容、颜色、宽高

1. `TextView`（文本框）
2. `EditView`（输入框）
3. `AutoCompleteTextView`

选择框：

1. `RadioGroup`（单选）
2. `CheckBox`（多选）

按钮：

1. `Button`：由 `TextView` 派生而来
   1. `onClick `点击事件（不推荐直接使用，应当使用监听器）
   2. `setOnClickListener` 设置监听（实现 `View.onOnClickListener`）
   3. `setOnLongClickListener `长按点击事件
   4. 双击事件
   5. 可用/禁用
2. `ImageButton`（图像按钮）
3. `ToggleButton`（开关）
4. `RadioButtun`（单选按钮）

图像：

1. `ImageView`
2. `ImageButton`：继承于 `ImageView`
3. 同时展示文本和图像：`ImageView` + `TextView`、Button 的 drawable 属性
4. `ImageSwitcher` / `Gallery`

列表：

1. `Spinner`：下拉列表
2. `ListView`：列表（最常用）

日期/时间：

1. `DatePicker`：日期选择器
2. `TimePicker`：时间选择器

提示/对话框：

1. `Toast`：提示
2. `Dialog`：对话

进度条：

1. `ProgressBar`：进度条
2. `ProgressDialog`：对话框中的进度条

其他：

1. `SeekBar`：拖动条
2. `RatingBar`：评分组件





## 高级控件

适配器：

1. 数组适配器
2. 简单适配器
3. 基础适配器

控件：

1. 下拉列表
2. 列表类视图
   1. ListView
   2. RecyclerView
   3. GridView
3. 翻页类视图
   1. ViewPager（可以做引导页）
   2. PagerTabStrip
4. Fragment（处理适配）
   1. 生命周期
   2. 静态注册、动态注册
5. WebView 网页控件
6. Snackbar
7. DrawerLayout
8. NavigationView/circleimageview
9. FloatingActionButton
10. CoordinatorLayout/FrameLayout
11. MaterialCardView
12. AppBarLayout
13. SwipeRefreshLayout
14. CollapsingToolbarLayout





## 界面渲染

- 每一个Activity都拥有一个Window对象的实例。这个实例实际是PhoneWindow类型的。那么PhoneWindow从名字很容易看出，它应该是Window的儿子
- 每一个Activity都有一个PhoneWindow对象，通过setContentView()设置的布局是被放到DecorView中，DecorView是视图树的最顶层
- DecorView继承了FrameLayout，并且一般情况下，它会在先添加一个预设的布局。比如DecorCaptionView，它是从上到下放置自己的子布局的，相当于一个LinearLayout。通常它会有一个标题栏，然后有一个容纳内容的mContentRoot，这个布局的类型视情况而定。我们希望显示的布局就是放到了mContentRoot中。
- WindowManager是在Activity执行attach()时被创建的，attach()方法是在onCreate()之前被调用的。
- WindowManagerImpl持有了PhoneWindow的引用，因此它可以对PhoneWindow进行管理。同时它还持有一个非常重要的引用mGlobal。这个mGlobal指向一个WindowManagerGlobal类型的单例对象，这个单例每个应用程序只有唯一的一个。在图中，我说明了WindowManagerGlobal维护了本应用程序内所有Window的DecorView，以及与每一个DecorView对应关联的ViewRootImpl。这也就是为什么我前面提到过，WindowManager只是一个代理，实际的管理功能是通过WindowManagerGlobal实现的。
- WindowManagerImpl确实只是WindowManagerGlobal的一个代理而已。同时，上面这个方法在整个Android的视图框架流程中十分的重要。我们知道，在Activity执行onResume()后界面就要开始渲染了。原因是在onResume()时，会调用WindowManager的addView()方法(实际最后调用的是WindowManagerGlobal的addView()方法)，把视图添加到窗口上。