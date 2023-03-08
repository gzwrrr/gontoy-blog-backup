---
title: "Tomcat 基本知识"
shortTitle: "B-Tomcat 基本知识"
description: "Tomcat 基本知识"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-10-01
category: 
- "tomcat"
- "java"
tag:
- "tomcat"
- "java"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Tomcat 基本知识"
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
  title: "Tomcat 基本知识"
  description: "Tomcat 基本知识"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Tomcat 基本知识


[[toc]]


## Tomcat 类加载机制

**类加载器：**

1. CommonClassloader：加载 Tomcat 专用的类以及 Web 应用的类
2. CataLinaLoader：加载 Tomcat 专用的类
3. SharedLoader：加载 Web 应用的类（还有两个子类：WebAppLoader 和 JasperLoader）

注：CommonClassloader 是后两个的父加载器



### Catalina

:::info 说明

Catalina 类承接了 Bootstrap 类的 load 和 start 方法，然后根据配置初始化了 Tomcat 的组件，并调用了 Server 类的 init 和 start 方法来启动 Tomcat。

:::

**加载：**

1. `initDirs()`
2. `initNaming()`
3. 解析 Server.xml
4. `initStreams()`

**启动：**调用 `getServer().start()`

**关闭：**调用 `((ClassLoaderLogManager) logManager).shutdown()`





## 生命周期

> LifecycleBase是使用了 **状态机** + **模板模式** 来实现的

![生命周期状态转换](https://www.pdai.tech/images/tomcat/tomcat-x-lifecycle-4.jpeg)

```java
public enum LifecycleState {
    NEW(false, null),
    INITIALIZING(false, Lifecycle.BEFORE_INIT_EVENT),
    INITIALIZED(false, Lifecycle.AFTER_INIT_EVENT),
    STARTING_PREP(false, Lifecycle.BEFORE_START_EVENT),
    STARTING(true, Lifecycle.START_EVENT),
    STARTED(true, Lifecycle.AFTER_START_EVENT),
    STOPPING_PREP(true, Lifecycle.BEFORE_STOP_EVENT),
    STOPPING(false, Lifecycle.STOP_EVENT),
    STOPPED(false, Lifecycle.AFTER_STOP_EVENT),
    DESTROYING(false, Lifecycle.BEFORE_DESTROY_EVENT),
    DESTROYED(false, Lifecycle.AFTER_DESTROY_EVENT),
    FAILED(false, null);

    private final boolean available;
    private final String lifecycleEvent;

    private LifecycleState(boolean available, String lifecycleEvent) {
        this.available = available;
        this.lifecycleEvent = lifecycleEvent;
    }
}

public interface Lifecycle {
    /** 第1类：针对监听器 **/
    // 添加监听器
    public void addLifecycleListener(LifecycleListener listener);
    // 获取所以监听器
    public LifecycleListener[] findLifecycleListeners();
    // 移除某个监听器
    public void removeLifecycleListener(LifecycleListener listener);
    
    /** 第2类：针对控制流程 **/
    // 初始化方法
    public void init() throws LifecycleException;
    // 启动方法
    public void start() throws LifecycleException;
    // 停止方法，和start对应
    public void stop() throws LifecycleException;
    // 销毁方法，和init对应
    public void destroy() throws LifecycleException;
    
    /** 第3类：针对状态 **/
    // 获取生命周期状态
    public LifecycleState getState();
    // 获取字符串类型的生命周期状态
    public String getStateName();
}
```

注：Tomcat 中的监听器使用了观察者模式。观察者模式(observer pattern): 在对象之间定义一对多的依赖, 这样一来, 当一个对象改变状态, 依赖它的对象都会收到通知, 并自动更新









## JMX 与 MBean

> Tomcat 使用 JMX 实现组件的管理
>
> 其中两个核心的实现为：StardardServer 和 StardardService

![Tomcat组件管理](https://www.pdai.tech/images/tomcat/tomcat-x-jmx-1.jpg)

JMX（Java Management Extensions）是Java平台提供的一种管理和监控Java应用程序的方式。它通过MBean（Managed Bean）来管理Java应用程序，使得Java应用程序可以被监控和管理。

MBean是一种特殊的Java对象，它提供了一组操作和属性，这些操作和属性可以被JMX代理所调用和监控。MBean是JMX的基本构建单元，可以使用JMX来管理和监控Java应用程序的各种方面，比如应用程序的状态、性能、资源使用情况等。

在JMX中，MBean分为两种类型：标准MBean和动态MBean。标准MBean是一种Java类，它实现了一个MBean接口，MBean接口定义了一组操作和属性。动态MBean是一种在运行时动态创建的MBean，它允许应用程序动态地创建和注册MBean。

JMX提供了一种标准的API，用于访问和管理MBean。JMX的核心是由三个部分组成：MBeanServer、MBean和JMX代理。

- MBeanServer：是一个管理和监控MBean的容器。它提供了MBean的注册、注销和查询等管理和监控操作。每个Java应用程序可以有一个或多个MBeanServer。
- MBean：是一种特殊的Java对象，它提供了一组操作和属性，这些操作和属性可以被JMX代理所调用和监控。
- JMX代理：是一种可以代理和访问MBeanServer上的MBean的客户端。

JMX的应用场景比较广泛，例如Java应用程序的监控、管理、诊断等方面。在Web应用程序中，JMX可以被用来监控和管理Tomcat、Jetty等Web容器的运行状态、线程池、数据库连接池等资源的使用情况。

总之，JMX提供了一种方便的方式，用于管理和监控Java应用程序，它是Java平台中的一项重要技术。

使用JMX的好处如下：

1. 监控和管理：JMX提供了一种标准的方式来监控和管理应用程序和服务，包括监控运行状况、收集性能数据、配置参数和管理资源等。
2. 可扩展性：JMX提供了一种可扩展的架构，使得开发人员可以通过实现自定义MBean来增强应用程序的管理和监控功能。
3. 标准化：JMX是Java平台的一部分，因此具有良好的跨平台性和兼容性，可以与各种不同的Java应用程序和服务集成。
4. 可插拔性：JMX提供了一个标准的插件机制，可以通过插件来扩展和增强JMX的功能。
5. 简单易用：JMX提供了一个统一的编程接口，使得开发人员可以轻松地编写和管理MBean，并且可以使用各种不同的JMX工具来管理和监控应用程序。







## 线程池

> Tomcat 中的 Executor 接口也纳入了 Tomcat 的 Lifecycle 中管理

1. 继承了 Java 中的 `ThreadPoolExecutor`，并且加入了超时机制，超过指定时间之后会调用拒绝策略并抛出异常

2. StandardThreadExecutor 是 Executor 的一个具体实现，此外还实现了 ResizeableExecutor 接口，可以动态调整线程池的大小
3. Tomcat 自己加一层是为了让线程池更容易使用（最少知道原则，体现了外观模式），并且对 `ThreadPoolExecutor` 进行一定的加强







## 容器

> Tomcat 的容器顶层也是基于 Tomcat 的 Lifecycle 组件设计的

主要的容器的具体实现有四个：

1. `StandarEngine`：表示 Tomcat 的 Servlet 引擎，包含多个容器（Context 容器或者 Host 容器）
2. `StandarHost`：包含多个 Context 容器
3. `StandarContext`：表示一个 ServletContext 或者 WebApp，通常包含多个 Wrapper
4. `StandarWapper`：表示一个由 Servlet 定义的 WebApp

除了上述四个主要的容器外，含包含：

1. Realm
2. Cluster
3. Listeners
4. Pipleline
5. Loader
6. Management
7. Logger





## 管道

:::info 说明

管道就是采用了职责链模式

在一个比较复杂的大型系统中，如果一个对象或数据流需要进行繁杂的逻辑处理，我们可以选择在一个大的组件中直接处理这些繁杂的业务逻辑， 这个方式虽然达到目的，但扩展性和可重用性较差， 因为可能牵一发而动全身。更好的解决方案是采用管道机制，**用一条管道把多个对象(阀门部件)连接起来，整体看起来就像若干个阀门嵌套在管道中一样，而处理逻辑放在阀门上**。

:::

![Tomcat管道](https://www.pdai.tech/images/tomcat/tomcat-x-pipline-7.jpg)

与过滤器的比较：

| 管道/阀门                                            | 过滤器链/过滤器                                |
| ---------------------------------------------------- | ---------------------------------------------- |
| 管道（Pipeline）                                     | 过滤器链（FilterChain）                        |
| 阀门（Valve）                                        | 过滤器（Filter）                               |
| 底层实现为具有头（first）、尾（basic）指针的单向链表 | 底层实现为数组                                 |
| Valve的核心方法invoke(request,response)              | Filter核心方法doFilter(request,response,chain) |
| pipeline.getFirst().invoke(request,response)         | filterchain.doFilter(request,response)         |

