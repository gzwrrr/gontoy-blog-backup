---
title: "Android 工程结构"
shortTitle: "B-Android 工程结构"
description: "Android 工程结构"
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
  text: "Android 工程结构"
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
  title: "Android 工程结构"
  description: "Android 工程结构"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 工程结构

[[toc]]



## 项目层次

两个层次（一个项目中有多个模块）：项目、模块；项目结构如下：

**app：**

1. manifests：AndroidManifest.xml
2. java：源码 + 单元测试
3. res：当前模块的资源文件
   1. drawable：绘制的图像、可以适配
   2. layout：项目布局
   3. mipmap：存放 APP 图标（矢量图标）
   4. values：颜色值、主题

**gradle script：**

1. `build.gradle`：分为项目和模块，用于描述 APP 工程的编译规则
2. `proguard-rules.pro`：混淆规则
3. `gradle.properties`：环境变量
4. `settings.gradle`：配置需要编译的模块，初始内容为 `include ':app'`，表示只编译 APP 模块
5. `local.properties`：项目的本地配置文件，在项目编译时自动生成，描述了本地开发环境的配置信息



## 编译打包

注意点：编译工具版本需要和构建工具版本匹配

应用元数据（defaultConfig）

1. `applicationId`：APP 包名
2. `minSdkVersion`：最小版本号
3. `targetSdkVersion`：期望运行版本号
4. `versionCode`：APP 应用的版本号
5. `versionName`：APP 应用的版本名称





## 模块化

:::info 相关文章

1. [关于Android模块化我有一些话不知当讲不当讲](https://github.com/LiushuiXiaoxia/AndroidModular/blob/master/README2.md#关于android模块化我有一些话不知当讲不当讲)

2. [天猫模块化](https://www.51cto.com/article/523490.html)

:::

1. MVP模式、MVVM模式
2. 模块化、插件化、独立发布

3. 相关库：[Beehive](https://github.com/alibaba/BeeHive)：Beehive是一个运行时框架，主要解决依赖耦合和工程耦合

:::details Beehive

Beehive的原理是，每一个对外提供服务的模块，需要注册一个抽象接口到Beehive提供的Interfaces(接口池)。注意，在这个池子里只有抽象接口。

开发阶段，调用方依赖接口池中响应的接口，并以接口为参数，通过Beehive提供的工厂方法获取一个服务实例，这个实例可以正常进行服务。

运行时阶段，Beehive工厂方法根据服务的注册配置，构造服务实例。若：当前的运行环境没有依赖提供服务的模块，则返回空;若：当前运行环境依赖关系完整，则开始构造服务，并返回。 

:::



### 拆分

**整个模式升级基本上经历了这样几个阶段：**

- 代码独立，先从形式上解耦
- 独立代码工程化，为独立运行打下基础
- 梳理依赖关系，独立工程可编译
- 放弃源码依赖，提速集成编译

<br/>

**把耦合分成三类：**

1. 界面耦合，就是用户操作流程里，从首页-到搜索-到详情-再进店，这些界面的跳转是硬编码的
2. 依赖耦合，顾名思义，两个模块之间的有依赖，就是耦合
3. 工程耦合，每个模块有自己的生命周期和运行时，每个模块在生产环境里又需要依赖主工程的运行时

<br/>

**有问题的依赖基本有这样几种：**

1. 模块循环依赖
2. 层间反向依赖
3. 非强功能依赖

<br/>

**统跳协议 & Rewrite引擎：**

统调协议是一个基于URL的跳转方案，配合Rewrite引擎实现全App调用解耦（[相关文章 – 苹果核](http://pingguohe.net/2015/11/24/Navigator-and-Rewrite.html)）



### Library Module 开发问题

:::note 说明

当把个模块分开以后，每个人就可以单独分组对应的模块就行了，不过会有资源冲突问题，建议是对各个模块的资源名字添加前缀，比如user模块中的登录界面布局为`activity_login.xml`，那么可以写成这样`us_activity_login.xml`。这样就可以避免资源冲突问题。同时Gradle也提供的一个字段`resourcePrefix`，确保各个资源名字正确，具体用法可以参考官方文档。

:::

在把代码抽取到各个单独的Library Module中，会遇到各种问题，最常见的就是R文件问题，Android开发中，各个资源文件都是放在res目录中，在编译过程中，会生成R.java文件。R文件中包含有各个资源文件对应的id，这个id是静态常量，但是在Library Module中，这个id不是静态常量，那么在开发时候就要避开这样的问题。解决方案有下面几种：

1. 重新一个Gradle插件，生成一个R2.java文件，这个文件中各个id都是静态常量，这样就可以正常使用了。

2. 使用Android系统提供的最原始的方式，直接用`findViewById`以及`setOnClickListener`方式。

3. 设置项目支持Databinding，然后使用Binding中的对象，但是会增加不少方法数，同时Databinding也会有编译问题和学习成本，但是这些也是小问题，个人觉的问题不大。

:warning:上面是主流的解决方法，推荐的使用优先级为 3 > 2 > 1。



### 依赖管理

随着对代码的分割，主项目app的依赖变多了，如果修改了lib中的代码，那么编译时间是很恐怖的，如果原先在同一个模块的时候，编译时间大概需要2-3min，那么分开以后大概需要5-6min，这个是绝对无法忍受的。

可以这样解决：把各个子module分别使用单独的一个git仓库，这样每个人也只需要关注自己需要的git仓库即可，主仓库使用git submodule的方式，分别依赖各个子模块。



### 数据通信

当一个大项目拆成若干小项目时候，数据通信大概有如下几种方式：

:::tabs#fruit



@tab 页面跳转

问题：比如在订单页面下单时候，需要判断用户是否登录，如果没有则需要跳到登录界面。

方案：直接指定某个页面的`ActivityClass`，然后通过`Intent`跳转即可，也可以使用`Router`路由跳转

**Router方式：**

- 优点：不需要高难度的技术点，使用方便，直接使用字符串定义跳转，可以好的往后兼容
- 缺点：因为使用的是字符串配置，如果字符输入字符，则很难发现bug，同时也很难知道某个参数对应的含义



@tab 主动获取数据

问题：比如在下单时候，用户已经登录，下单需要传递用户的基本信息。

方案：所有需要的操作，定义成接口放在Service中。

**仿Retrofit方式：**

- 因为是Java接口定义，所以可以很简单找到对应的跳转方法，参数定义也很明确，可以直接写在接口定义处，方便查阅。
- 同样因为是Java接口定义，那么如果需要扩展参数，只能重新定义新方法，这样会出现多个方法重载，如果在原先接口上修改，对应的原先调用方也要做响应的修改，比较麻烦。

**Interface和Implement：**

- 每次调用都是用反射生成新的对象，实际应用中可能与IoC工具结合使用，比如Dagger2



@tab 被动获得数据

问题：比如在切换用户的时候，有时候需要更新数据，如订单页面，需要把原先用户的购物车数据给清空。

方案：针对事件变化提供回调接口，需要监听某个事件时候，设置回调即可（把回调接口定义到对应的service接口中）

**EventBus：**

利用观察者模式，对事件进行监听，是设置回调更优雅方式的实现。

- 优点：不需要定义很多个回调接口，只需要定义事件Class，然后通过Claas的唯一性来进行事件匹配。

- 缺点：需要定义很多额外的类来表示事件，同时也需要关注EventBus的生命周期，在不需要使用事件时候，需要注销事件绑定，不然容易发生内存泄漏。



:::



### 映射匹配

**解决方案：**

1. Map register：全局定义一个Map，各个模块在初始化的时候，分别在初始化的时候注册映射关系。
2. APT：使用注解的方式配置映射信息，然后生成一个类似Database一样的文件，然后Database文件中包含一个Map字段，Map中记录各个映射信息。
3. Gradle Transform：这是Android Gradle编译提供的一个接口，可以供开发自定义一些功能，而我们就可以根据这个功能生成映射匹配，这种方式和APT类似，APT是运行在代码编译时期，而且Transform是直接扫描class，然后再生成新的class，class中包含Map映射信息。修改class文件，使用的是javassist一个第三方库。

**优点:**

- Map：简单明了，很容易入手，不会对编译时间产生任何影响，不会随着Gradle版本的升级而受影响，代码混淆时候不会有影响，无需配置混淆文件。
- APT：使用简单，使用注解配置，代码优雅，原理是用代码生成的方式生成新的文件。
- Transform：使用简单，使用注解配置，代码优雅，原理是用代码生成的方式生成新的文件，不过生成的文件的时期和APT不同，会编译时间产生少许影响。

**缺点:**

- Map：在需要新添加映射的时候，需要手动添加，不然不会生效，代码不优雅。
- APT：在编译时期生成文件，会编译时间产生少许影响，同时在不同的Gradle的版本中可能会产生错误或者兼容问题。需要配置混淆设置，不然会丢失文件。技术实现复杂，较难维护。
- Transform：在编译时期生成文件，会编译时间产生少许影响，同时在不同的Gradle的版本中可能会产生错误或者兼容问题。需要配置混淆设置，不然会丢失文件。技术实现复杂，较难维护。

:::note 对比

从技术复杂性以及维护性来看，Map > APT = Transform

从使用复杂性以及代码优雅性来看，Transform > APT > Map

:::



### 容器设计

可以做一个简单的类似主app模块一样的模块。比如我是负责某个模块的开发者，那么我只要调试我这个模块就行了，如果需要其他的模块，可以简单的做一个mock，不是把其他的模块直接依赖过来，这样可以起到调试作用。

另外，可能有时候还是需要单独的运行环境，Android中的编译方式有2中，一种是debug，一种是release。当打包成aar的时候，使用的是release方式，可以把需要调试的代码全部放到debug中，这样打包的时候就不会把调试的文件发布到aar中。不过这种实现方式，需要对Android项目的目录有较高的认识，才可以熟练使用。





## 相关文章

1. [天猫手机解耦之路](http://mobile.51cto.com/app-show-523490.htm)

2. [iOS 模块化BeeHive](https://github.com/alibaba/BeeHive)

3. [蘑菇街 App 的组件化之路](http://limboy.me/tech/2016/03/10/mgj-components.html)

4. [蘑菇街 App 的组件化之路·续](http://limboy.me/tech/2016/03/14/mgj-components-continued.html)
5. [iOS应用架构谈 组件化方案](https://casatwy.com/iOS-Modulization.html)
6. [javassist资料](http://jboss-javassist.github.io/javassist/)
7. [iOS组件化方案调研](http://www.jianshu.com/p/34f23b694412)
8. [安居客Android项目架构演进](http://www.cnblogs.com/baronzhang/p/6442047.html)
9. [关于Android模块化我有一些话不知当讲不当讲](https://github.com/LiushuiXiaoxia/AndroidModular/)