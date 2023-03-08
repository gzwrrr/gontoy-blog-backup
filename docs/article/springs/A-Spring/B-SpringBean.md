---
title: "Spring Bean"
shortTitle: "B-Spring Bean"
description: "Spring Bean"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "spring"
tag:
- "spring"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Spring Bean"
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
  title: "Spring Bean"
  description: "Spring Bean"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring Bean

[[toc]]

## 作用域

| 作用域         | 描述                                                         |
| :------------- | :----------------------------------------------------------- |
| singleton      | 在spring IoC容器仅存在一个Bean实例，Bean以单例方式存在，默认值 |
| prototype      | 每次从容器中调用Bean时，都返回一个新的实例，即每次调用getBean()时，相当于执行newXxxBean() |
| request        | 每次HTTP请求都会创建一个新的Bean，该作用域仅适用于WebApplicationContext环境 |
| session        | 同一个HTTP Session共享一个Bean，不同Session使用不同的Bean，仅适用于WebApplicationContext环境 |
| global-session | 一般用于Portlet应用环境，该作用域仅适用于WebApplicationContext环境 |



## 创建的生命周期步骤

大概分为 7 个步骤：

1. 推断构造方法
2. 实例化
3. 填充属性，也就是依赖注入
4. 处理 Aware 回调
5. 初始化前，处理 @PostConstruct 注解
6. 初始化时，处理 InitalizingBean 接口
7. 初始化后，进行 AOP

```sequence
用户->Spring容器: 请求获取Bean
Spring容器->BeanFactory: 是否存在该Bean？
BeanFactory-->Spring容器: 存在
Spring容器->BeanFactory: 是否为单例模式？
BeanFactory-->Spring容器: 是单例模式
Spring容器->SingletonBeanRegistry: 是否存在该Bean的实例？
SingletonBeanRegistry-->Spring容器: 存在该Bean的实例
Spring容器->用户: 返回该Bean的实例
用户->Spring容器: 修改Bean的属性值
Spring容器->BeanFactory: 调用该Bean的setter方法注入新值
用户->Spring容器: 请求获取Bean
Spring容器->BeanFactory: 是否存在该Bean？
BeanFactory-->Spring容器: 存在
Spring容器->BeanFactory: 是否为单例模式？
BeanFactory-->Spring容器: 是单例模式
Spring容器->SingletonBeanRegistry: 是否存在该Bean的实例？
SingletonBeanRegistry-->Spring容器: 存在该Bean的实例
Spring容器->用户: 返回该Bean的实例
```

注解：

- `用户`：请求获取 Bean 的用户
- `Spring容器`：Spring 容器，即 ApplicationContext
- `BeanFactory`：Bean 工厂，即 DefaultListableBeanFactory
- `SingletonBeanRegistry`：单例 Bean 注册表，即 DefaultSingletonBeanRegistry

上述序列图展示了一个典型的 Spring Bean 的创建过程。当用户请求获取一个 Bean 时，Spring 容器首先判断该 Bean 是否存在。如果存在，Spring 容器接着判断该 Bean 是否为单例模式。如果是单例模式，Spring 容器再判断该 Bean 是否已经被实例化过。如果已经被实例化过，Spring 容器直接返回该 Bean 的实例，否则 Spring 容器会实例化该 Bean，并将其注册到单例 Bean 注册表中，然后再返回该 Bean 的实例。如果该 Bean 不是单例模式，Spring 容器每次都会创建一个新的实例并返回。

当用户修改单例 Bean 的属性值时，Spring 容器会调用该 Bean 的 setter 方法注入新值。

总的来说，Spring Bean 的创建过程包括 Bean 实例化、Bean 属性注入和 Bean 初始化三个阶段。当用户请求获取 Bean 时，Spring 容器会自动完成这些操作并返回该 Bean 的实例。



