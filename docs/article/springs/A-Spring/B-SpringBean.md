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
timeline: true
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

所以创建bean的整个步骤为：

1. 从配置文件中读取 `Bean` 配置并生成 `BeanDefinition`
2. 如果有 `BeanFactoryPostProcessor` 实现类，那么执行 `postProcessBeanFactory` 对 `BeanDefinition` 做出修改
3. 实例化 `Bean`
4. `Bean` 属性赋值，如果有 `InitializingBean` 实现类，那么执行 `@PostConstruct` 或者 `afterPropertiesSet` 方法对 `Bean` 做出修改
5. 初始化 `Bean`，如果有 `BeanPostProcessor` 实现类，执行 `postProcessBeforeInitialization` 和 `postProcessAfterInitialization`，用于在 `Bean` 初始化前后执行自定义的处理逻辑。它允许你在初始化阶段对 Bean 进行修改，例如代理对象、添加额外的处理等
6. 使用 `Bean`
7. 销毁 `Bean`，如果有 `DisposableBean` 实现类，那么先执行 `@PreDestroy` 或者 `destroy` 方法



### 概览

在 Spring Framework 中，每个 Bean 都有其生命周期，即它从被创建到被销毁的整个过程。Spring 提供了一系列回调方法，允许你在不同的生命周期阶段执行自定义的逻辑。以下是典型的 Spring Bean 生命周期阶段：

1. **实例化（Instantiation）：** 在这个阶段，容器根据配置元数据或编程方式创建 Bean 的实例。这可以通过构造函数或工厂方法来完成。
2. **属性赋值（Population）：** 在这个阶段，容器将依赖项和属性值注入到 Bean 实例中。这可以通过 setter 方法、字段注入或构造函数参数注入来完成。
3. **初始化（Initialization）：** 在这个阶段，容器对 Bean 进行初始化。这包括执行自定义的初始化逻辑，以及实现 `InitializingBean` 接口的 `afterPropertiesSet()` 方法或使用 `@PostConstruct` 注解。
4. **使用（In Use）：** 在这个阶段，Bean 已经初始化，可以正常使用。
5. **销毁（Destruction）：** 在容器关闭或显式调用销毁方法时，容器会触发 Bean 的销毁过程。这包括实现 `DisposableBean` 接口的 `destroy()` 方法、使用 `@PreDestroy` 注解以及在 XML 配置中指定销毁方法。

下面是一个简化的示例，展示了 Bean 生命周期的不同阶段：

```java
import javax.annotation.PreDestroy;

public class MyBean {

    public MyBean() {
        System.out.println("Bean instantiated");
    }

    // Property Injection
    
    // 也可以使用 InitializingBean
    @PostConstruct
    public void initMethod() {
        System.out.println("Bean initialized");
    }

    public void someBusinessLogic() {
        System.out.println("Bean in use");
    }

    // 也可以使用 InitializingBean
    @PreDestroy
    public void destroyMethod() {
        System.out.println("Bean destroyed");
    }
}
```

请注意，虽然这个示例使用了 `@PostConstruct` 和 `@PreDestroy` 注解，但 Spring 还支持使用接口实现和 XML 配置来定义初始化和销毁方法。



### 详细

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





## 其他

- [Bean 工厂后置处理器](https://muyinchen.github.io/2017/09/16/Spring5%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90-Spring%E4%B8%AD%E7%9A%84bean%E5%B7%A5%E5%8E%82%E5%90%8E%E7%BD%AE%E5%A4%84%E7%90%86%E5%99%A8/)