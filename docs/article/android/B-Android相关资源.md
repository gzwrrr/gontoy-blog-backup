---
title: "Android 相关资源"
shortTitle: "B-Android 相关资源"
description: "Android 相关资源"
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
  text: "Android 相关资源"
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
  title: "Android 相关资源"
  description: "Android 相关资源"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Android 相关资源

[[toc]]



## 官方资源

1. [谷歌官方文档](https://developer.android.google.cn/about?hl=zh-cn)

2. [Android Studio 下载文件归档（历史版本）](https://developer.android.google.cn/studio/archive?hl=zh-cn#android-studio-3-0?utm_source=androiddevtools&utm_medium=website)
3. [谷歌官方开源项目](https://opensource.google/projects)
4. [官方新特性 DEMO](https://github.com/googlesamples)



## 版本问题

1. [百度百科-历史版本](https://baike.baidu.com/item/Android%E5%8E%86%E5%8F%B2%E7%89%88%E6%9C%AC/1578450)
2. [Android studio 和 gradle插件版本对应关系（最新 2023年）](https://blog.csdn.net/dongxin214/article/details/100726807)
3. [Android各版本对应的SDK及JDK版本要求](https://blog.csdn.net/j086924/article/details/122866386)
4. [官方版本相关解释](https://developer.android.google.cn/studio/releases/gradle-plugin?hl=zh-cn#groovy)
5. [Gradle 下载文件归档（历史版本）](https://gradle.org/releases/)
6. [kotlin 历史版本版本](https://kotlinlang.org/docs/releases.html#release-details)
7. [gradle插件与gradle版本对应表](https://blog.csdn.net/u011897062/article/details/109357551)

**项目版本管理：**

1. jdk 版本
2. 项目构建版本
3. 项目编译版本
4. 安卓 SDK 版本
5. 安卓 Plugin 版本



:::details 相关概念

在安卓开发中，"compileSdkVersion"、"buildToolsVersion"、"sourceCompatibility" 和 "targetCompatibility" 都是与 Android 应用程序的构建和兼容性相关的重要配置参数。它们各自有不同的作用，不能完全统一管理，因为它们涉及到不同的方面和需求。

1. **compileSdkVersion（编译 SDK 版本）**：
   - `compileSdkVersion` 是指定用于编译应用程序的 Android SDK 版本的参数。
   - 这个版本应该是你的应用程序代码所使用的 Android API 的版本。它包括了 Android 平台的类和方法，以及用于构建应用程序的工具和资源。
   - 应用程序编译时，会使用这个版本的 Android SDK 来检查和验证你的代码，确保它们与该版本的 API 兼容。
2. **buildToolsVersion（构建工具版本）**：
   - `buildToolsVersion` 指定了用于编译和构建应用程序的构建工具的版本。
   - 这个版本的构建工具包括了用于编译、打包、签名和生成 APK 文件等任务的工具。
   - 不同版本的构建工具可能支持不同的功能或任务，因此你需要根据你的需求选择合适的构建工具版本。
3. **sourceCompatibility（源代码兼容性）**：
   - `sourceCompatibility` 用于指定 Java 源代码的兼容性级别。
   - 这个参数决定了你可以在你的代码中使用的 Java 语言特性的版本。
   - 通常，它应该与你的代码中使用的语言特性相匹配，以确保编译器可以正确理解和处理你的代码。
4. **targetCompatibility（目标兼容性）**：
   - `targetCompatibility` 用于指定生成的字节码文件的兼容性级别。
   - 这个参数决定了你的应用程序生成的字节码应该与哪个版本的 Android 运行时兼容。
   - 通常，它应该与 `compileSdkVersion` 一致，以确保你的应用程序可以在目标设备上正确运行。

:::

相关的构建工具：

- gradle
- gradle plugin 
- gradle wrapper
- kotlin_version
- SDK Version 
- Android Studio Version

在Android项目中，Gradle Wrapper是一个用于管理Gradle版本的工具，它允许您指定项目使用的Gradle版本，而不必手动安装该版本。当您使用Android Studio导入项目时，Gradle Wrapper会自动下载指定版本的Gradle，将其存储在项目目录中的`gradle/wrapper`文件夹中。



在`gradle/wrapper`文件夹中，您将找到以下文件：

1. `gradle-wrapper.jar`：这是Gradle Wrapper的主要jar文件，它包含用于下载和运行指定Gradle版本的逻辑。
2. `gradle-wrapper.properties`：这个属性文件包含有关Gradle版本和下载链接的配置信息。

1. **Gradle** 是一个通用的构建工具，用于构建各种类型的项目。它使用基于 Groovy 或 Kotlin 的 DSL（Domain Specific Language）来定义项目的构建逻辑和依赖关系。
2. **Gradle Plugin** 是针对特定的软件或框架的扩展，用于与 Gradle 一起构建特定类型的项目。在 Android 开发中，Gradle 插件是与 Android 项目构建和管理相关的扩展。它提供了用于构建、打包、测试和发布 Android 应用的特定任务和功能。
3. **Gradle Wrapper** 是一个用于管理 Gradle 版本的工具，它允许您在项目中指定所需的 Gradle 版本，而不必全局安装该版本。Gradle Wrapper 可以帮助确保项目成员在使用相同版本的 Gradle 时具有一致的构建环境。

在 Android 项目中，您需要确保 Gradle、Gradle 插件和 Gradle Wrapper 的版本彼此兼容。Gradle 插件与 Gradle 版本相关联，因此您需要使用与您的 Gradle 插件兼容的 Gradle 版本。同时，Gradle Wrapper 用于确保项目成员能够使用正确版本的 Gradle 来构建项目。



要确保 Gradle、Gradle 插件和 Gradle Wrapper 之间的兼容性，您可以遵循以下几个最佳实践：

1. **查看官方文档**：查阅 Gradle、Gradle 插件和 Android Studio 的官方文档，了解它们之间的兼容性要求。这些文档通常会提供关于每个版本之间兼容性的信息，以及建议使用的最佳配置。
2. **使用推荐配置**：使用官方文档中推荐的配置，例如使用与您的 Android Studio 版本配套的 Gradle 插件版本，并使用与 Gradle 插件版本兼容的 Gradle 版本。
3. **更新插件和依赖**：定期更新您的 Gradle 插件、Gradle 和其他依赖项的版本，以确保您能够获得最新的功能和修复的 bug。请注意，在升级任何依赖项之前，务必仔细查阅相应的更新说明和文档，以了解可能的更改和影响。
4. **遵循构建警告和错误**：如果您在构建过程中遇到有关版本不兼容的警告或错误，请务必查看并解决它们。这些警告和错误可能会提供有关如何解决版本不兼容性的有用信息。
5. **团队协作和沟通**：如果您是在团队中开发项目，请确保团队成员之间进行良好的沟通，以便协调使用的工具版本。定期讨论并共享最佳实践，以确保团队成员都在同一版本下工作。



## 学习路线

1. [发展趋势](https://www.zhihu.com/question/497900925)
2. [有哪些高质量的值得关注的关于Android开发的微信公众号？](https://www.zhihu.com/question/39706821)
3. [安卓学习之路](https://mp.weixin.qq.com/s?__biz=MzUzODQxMzYxNQ==&mid=2247485229&idx=1&sn=decb80fd2a5870764e954b2419f0e599&chksm=fad9586dcdaed17b9ca091578f156c80cc84238c742cbfbef0a7d959528e72ff9286e1bee079#rd)



## 书籍

:::info 相关文章

1. [10本Android开发入门学习书籍推荐](https://www.zhihu.com/tardis/zm/art/608516462?source_id=1005)
2. [Android开发书籍推荐：从入门到精通系列学习路线书籍介绍](https://www.zhihu.com/tardis/zm/art/25843565?source_id=1005)

:::

入门：

1. **第一行代码（郭霖）**
2. Android 开发艺术探索（任玉刚）
3. **疯狂Android讲义**
4. Android4高级编程
5. Android编程权威指南

进阶：

1. App研发录
2. Android群英传
3. **深入理解Android**
4. **Android开发艺术探索**
5. Android系统源代码情景分析

底层：

1. 深入理解Android 系列书籍（邓凡平）
2. [《Android源码设计模式》](https://link.zhihu.com/target=http%3A//item.jd.com/11793928.html)（结合设计模式分析源码）
3. [《Android框架揭秘》](https://link.zhihu.com/?target=http%3A//item.jd.com/10002153064.html)（底层架构的一本好书）
4. Linux内核设计与实现
5. 深入理解Linux内核


积累/优化：

1. HeadFirst设计模式
2. 重构：改善既有代码的设计
3. Clean Code
4. Clean Coder



## 公众号

1. 玉刚说
2. 终端研发部
3. 徐公
4. 鸿洋
5. 郭霖
6. 百度APP官方技术号
7. Android订阅、Android每日一讲、Android开发技术前线、Android技术干货铺
8. stormzhang



## 博主

:::info 相关文章

[Android 程序员不得不收藏的 90+ 个人博客(持续更新...)](https://juejin.cn/post/6844904031698026504)

:::



### 博客

优先：

1. [Android Developers Blog](http://android-developers.blogspot.com/)
2. [徐公](https://www.zhihu.com/people/chi-meng-15-86/posts)
3. [郭霖](https://blog.csdn.net/guolin_blog?type=blog)
4. [鸿洋](https://blog.csdn.net/lmj623565791?type=blog)
5. [开源实验室](https://kymjs.com/)
6. [任玉刚](http://blog.csdn.net/singwhatiwanna)
7. [农民伯伯](http://over140.cnblogs.com/)
8. [罗升阳](http://blog.csdn.net/Luoshengyang)
9. [大头鬼](http://blog.csdn.net/lzyzsd/)
10. [张兴业](http://blog.csdn.net/xyz_lmn)
11. [Trinea](http://www.trinea.cn/)
12. [代码家](http://blog.daimajia.com/)

其次：

1. [MrSimp1e](https://blog.csdn.net/bboyfeiyu?type=blog)
2. [兰亭风雨](https://blog.csdn.net/ns_code?type=blog)
3. [阿拉神农](https://blog.csdn.net/innost?type=blog)
4. [android_tutor](https://blog.csdn.net/android_tutor?type=blog)

其他：

1. https://www.trinea.cn/
2. https://kaedea.com/
3. https://www.gcssloop.com/
4. http://gityuan.com/
5. https://typeblog.net/
6. https://mrfu.me/



### 视频

**B 站：**

- [扔物线](https://space.bilibili.com/27559447?spm_id_from=333.337.0.0)

- [晨钟酱Official](https://space.bilibili.com/251013709?spm_id_from=333.337.0.0)

**Youtube：**

- [Android Developers](https://www.youtube.com/@AndroidDevelopers)

**其他：**

- [谷歌开发者中文视频](http://boolan.com/gdg)



## 常用网站

:::warning

部分网站需要科学上网

:::

:::info 相关文章

1. [整理的常用的Android资源站](https://zhuanlan.zhihu.com/p/24365329)
2. [Android开发常用网站推荐](https://juejin.cn/post/7090041676445515813)

:::



### 文档

1. [Android官方开发指南中文站](https://link.zhihu.com/?target=http%3A//developer.android.google.cn/)
2. [中文 API 文档](https://www.android-doc.com/androiddocs/)
3. [Gradle 使用文档](http://rinvay.github.io/android/2015/03/26/Gradle-Plugin-User-Guide%28Translation%29/#102)



### 论坛/博客/社区/月刊

1. [开源中国Android专区](https://www.oschina.net/android)
2. [ChinaGDG](https://gdg.community.dev/)
3. [V2EX Android 论坛](https://www.v2ex.com/go/android)
4. [Android Weekly](https://androidweekly.net/)
5. [SDK CN 社区](https://www.sdk.cn/new)
6. [Android-Notes 个人笔记](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2F733gh%2Fxiongfan)



### 工具/库

1. [Android Dev Tools](https://www.androiddevtools.cn/)
2. [Android开源项目源码解析站](https://p.codekk.com/)
3. [APKBUS安卓巴士 – APK 下载](https://link.zhihu.com/?target=http%3A//www.apkbus.com/)
4. [API 接口](https://www.juhe.cn/docs)
5. [百度智能云 API](https://apis.baidu.com/)
6. [Zeef 国外资源站](https://awesome-awesomeness.zeef.com/alexander.bayandin)
7. [Proguard文件生成](https://www.heroku.com/home)
8. [Linux 命令](https://explainshell.com/)
9. [tabnine 代码补全](https://www.tabnine.com/install/intellij)
10. [Android 在线源码查看](http://androidxref.com/)
11. [codeKK – 开源项目收集](https://p.codekk.com/)
12. [开源软件开发者进行开发管理的集中式场所](https://sourceforge.net/)
13. [Jdax – APK反编译](https://github.com/skylot/jadx/)
14. [生成应用图标](http://romannurik.github.io/AndroidAssetStudio/)



### 代码片段

1. [Java 代码片段搜索](http://www.javased.com/)
2. [android-arsenal – 国外搜集的Android实例站点](https://android-arsenal.com/)
3. [UI 设计片段](https://dribbble.com/search/material-design-card)



### 教学

4. [Groovy – W3C](https://www.w3cschool.cn/groovy/groovy_overview.html)
5. [Gradle – W3C](https://www.w3cschool.cn/gradle/3miy1htt.html)
6. [Codelabs – 谷歌代码学习指南](https://codelabs.developers.google.com/)
7. [RxMarbles 更好的理解RxJava操作符](https://rxmarbles.com/#from)
8. [Android 设计模式](https://www.androiddesignpatterns.com/archives/)
9. [知乎专栏 Android Weekly 中文翻译版](https://zhuanlan.zhihu.com/android-weekly)
10. [极客学院](https://www.jikexueyuan.com/)
11. [tutorialspoint Android 教学网站](https://www.tutorialspoint.com/android/index.htm)
12. [慕课网 – Android](http://www.imooc.com/course/list?c=android)
13. [国外Android开发者学习站](https://www.vogella.com/tutorials/android.html)
14. [Kotlin 中文学习站](https://www.kotlincn.net/docs/reference/)



### 组件库

1. [material-design](https://m2.material.io/design/introduction#principles)
2. [Awesome-MaterialDesign](https://github.com/lightSky/Awesome-MaterialDesign)
3. [awesome-android-ui](https://github.com/wasabeef/awesome-android-ui)
4. [拉窗帘效果](https://github.com/7heaven/bitmapMesh)
5. [ObservableScrollView](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fksoichiro%2FAndroid-ObservableScrollView)：在滚动的视图观测滚动事件的Android库 它易于与在Android 5.0 Lollipop中引入的工具条Toolbar相交互，并能够帮助实现Material Design apps的外观。
6. [iconify](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FJoanZapata%2Fandroid-iconify)：iconify 图片与文字同一行显示。

7. [MaterialList](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fdexafree%2FMaterialList)：MaterialList 。

8. [InstaMaterial](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ffrogermcs%2FInstaMaterial)：InstalMaterial 项目(非常多的UI样式：ViewAnimator、RecyclerView、拍照)

9. [NavigationDrawer-MaterialDesign](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fzirouan%2FNavigationDrawer-MaterialDesign)：一个Material Design的抽屉模板库，分分钟搭起一个程序框架。

10. [SearchMenuAnim](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fkongnanlive%2FSearchMenuAnim)：一个很棒的带动画的搜索框。

11. [Context-Menu.Android](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FYalantis%2FContext-Menu.Android)：可以方便快速集成漂亮带有动画效果的上下文菜单。

12. [Droppy](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fshehabic%2FDroppy)：简洁好看的 Dropdown 菜单。

13. [FilterMenu](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flinroid%2FFilterMenu)：这是一个自定义的圆形菜单，效果非常酷。

14. [AndroidSwipeLayout](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fdaimajia%2FAndroidSwipeLayout)：滑动Layout，支持单个View，ListView，GridView，demo-apk。

15. [Android Typeface Helper](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnorbsoft%2Fandroid-typeface-helper)：可以帮你轻松实现自定义字体的库。

16. [ToggleButton](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fzcweng%2FToggleButton)：状态切换的 Button，类似 iOS，用 View 实现。

17. [CardView ](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fchiemy%2FCardView)：3d卡片效果

18. [GridPasswordView](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FJungerr%2FGridPasswordView)：类似微信，支付宝支付时候的输入密码页面效果，带格子的密码输入框。

19. [BlurLockView](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FNightonke%2FBlurLockView)：毛玻璃效果的密码解锁界面, 支持简单定制。

20. [UltimateRecyclerView](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fcymcsg%2FUltimateRecyclerView)：这是一个终极的 RecyclerView，有下拉刷新、滑动删除、拖拽、加载更多、丰富动画等功能。

21. [PagerBottomTabStrip](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftyzlmjj%2FPagerBottomTabStrip)：一个基本按谷歌Material Design规范完成的安卓底部导航栏控件。

22. [Android MatchView](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FRogero0o%2FMatchView)：电影级TextView动画效果，绝对惊艳你的双眼！



## 开源项目

:::info 相关文章

[干货来袭，推荐几款开源的Kotlin的Android项目](https://mp.weixin.qq.com/s/RV8kj1ZnFd35ZmGBwdxAxw)

:::

1. [开源中国 Android 客户端](https://gitee.com/oschina/android-app/tree/v4.1.7/)
2. [Android自定义控件](https://gitee.com/zftlive/zftlive)
3. [视频播放器](https://github.com/CarGuo/GSYVideoPlayer)
4. [Android open source project analysis](https://github.com/sucese/android-open-source-project-analysis)
5. [awesome-android](https://github.com/JStumpp/awesome-android)
6. [新版高仿微信](https://gitee.com/GitLqr/LQRWeChat)



## 开发框架/工具库

:::info 相关文章

1. [现在android开发都会用到那些快速开发框架或者第三库？](https://zhuanlan.zhihu.com/p/438958248)
2. [Android 开发一般都使用什么框架？](https://www.zhihu.com/question/37160415)
3. [Android开发常用框架汇总](https://cloud.tencent.com/developer/article/1477604)

:::

4. 响应式编程
   1. [RxJava](https://github.com/ReactiveX/RxJava)
   2. [RxAndroid](https://github.com/ReactiveX/RxAndroid)
5. 依赖注入
   1. [Dagger](https://github.com/google/dagger)
   2. [Hilt](https://dagger.dev/hilt/quick-start)
6. 消息通信
   1. [EventBus](https://github.com/greenrobot/EventBus)
   2. [Otto](https://github.com/square/otto)
7. 网络请求
   1. [OkHttp](https://github.com/square/okhttp)
   2. [Retrofit](https://github.com/square/retrofit)
   3. [AndroidAsyncHttp](https://github.com/android-async-http/android-async-http)
8. 数据库
   1. [SQLite](https://www.sqlite.org/index.html)
   2. [Realm](https://github.com/realm/realm-java)
   3. [ActiveAndroid](https://github.com/pardom-zz/ActiveAndroid)
   4. [GreenDAO](https://github.com/greenrobot/greenDAO)
9. 数据解析
   1. [GSON](https://github.com/google/gson)
   2. [Fastjson](https://github.com/alibaba/fastjson)
   3. [Jackson](https://github.com/FasterXML/jackson)
7. 图片下载缓存
   1. [Android-Universal-Image-Loader](https://github.com/nostra13/Android-Universal-Image-Loader)
   2. [Picasso](https://github.com/square/picasso)
      3. [Glide](https://github.com/bumptech/glide)
      4. [Fresco](https://github.com/facebook/fresco)
   8. 媒体（图片、视频、文件、音乐、通讯录选择器）
         1. [Android-Image-Cropper](https://github.com/ArthurHub/Android-Image-Cropper)
         2. [uCrop](https://github.com/Yalantis/uCrop)
         3. [PhotoView ](https://github.com/Baseflow/PhotoView)
         4. [android-multipicker-library](https://github.com/coomar2841/android-multipicker-library)
         5. [Android-UniversalMusicPlayer](https://github.com/android/uamp)
9. 其他：
      1. [Guava](https://github.com/google/guava)：工具库
      2. [Zxing](https://github.com/zxing/zxing)、[ZBar](https://github.com/ZBar/ZBar)、[Barcodescanner](https://github.com/dm77/barcodescanner)：二维码
      3. [Leakcanary ](https://github.com/square/leakcanary)：内存检测
      4. [logger](https://github.com/orhanobut/logger)：日志
      5. [ButterKnife](https://github.com/JakeWharton/butterknife)：视图绑定与回调
      6. [Retrolambda](https://github.com/luontola/retrolambda)：将Java 8的lambda表达式移植到Java 7、6和5
      7. Android Jetpack Compose
   8. Kotlin Multiplatform
   9. MvRx



## 常见问题

1. 汇总1：https://zhuanlan.zhihu.com/p/143024974
2. 汇总2：https://www.wanandroid.com/article/list/0?cid=73
3. 总结1：https://github.com/LRH1993/android_interview
4. 总结2：https://github.com/francistao/LearningNotes
5. 总结3：https://juejin.cn/post/6844903669998026766
6. 优化1：https://mp.weixin.qq.com/s/UQQdOcPOT8kS82Wh383nPA
7. 优化2：https://juejin.cn/post/6844903565576634375
8. 总结4：https://juejin.cn/post/6844903432772386830



## 其他

3. [7个最佳的Android模拟器](https://www.jianshu.com/p/e3c9b2999eef)
2. [Android 开发艺术探索 – singwhatiwanna](https://blog.csdn.net/singwhatiwanna)
5. [Android-CleanArchitecture – mvp架构学习实例](https://github.com/android10/Android-CleanArchitecture)
6. [官方mvp架构学习实例](https://github.com/android/architecture-samples)
7. [框架/博客汇总](https://github.com/Android-campus/akr)
8. HTTP Proxy：mirrors.neusoft.edu.cn:80（建议能科学上网就尽量别用代理，代理虽然能快一点但是会有其他问题）
