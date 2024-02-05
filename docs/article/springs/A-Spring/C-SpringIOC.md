---
title: "Spring IOC"
shortTitle: "C-Spring IOC"
description: "Spring IOC"
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
  text: "Spring IOC"
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
  title: "Spring IOC"
  description: "Spring IOC"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring IOC



[[toc]]



:::info 相关文章

- [面试问烂的 Spring IOC 过程](https://www.iocoder.cn/Fight/Interview-poorly-asked-Spring-IOC-process-1/)

:::



核心概念：控制反转、依赖注入

1. **控制反转：**对象或资源交由 IOC 容器管理，以此反转对对象的控制权（没有反转时控制权在我们开发者手中）
2. **依赖注入：**依赖注入就是控制反转的一种具体实现，即控制反转是一种思想，依赖注入是这种思想的具体实现方式

Spring 中的 IoC 实现简单说就是「工厂模式」+「反射机制」



## IOC 容器的配置方式

1. XML 配置
2. Java 硬编码配置，配合 `@Configuration` 注解
3. 注解配置，例如加上 `@Component，@Controller，@Service，@Repository` 等注解直接将类托管给容器





## 依赖注入的方式

1. 构造方法注入
2. Setter 注入
3. 接口注入（Spring 中没有提供）

推荐使用 **构造器** 的注入方式，这样能够保证注入的组件不变，而且也能确保需要的依赖不为空

开发中一般基于注解注入（以@Autowired（自动注入）注解注入为例，修饰符有三个属性：Constructor，byType，byName。默认按照byType注入）



### @Autowired、@Resource、@Inject

```java
// @Autowired
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD, ElementType.PARAMETER, ElementType.FIELD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Autowired {
  boolean required() default true;
}

// @Resource
@Target({TYPE, FIELD, METHOD})
@Retention(RUNTIME)
public @interface Resource {
    String name() default "";
}

// @Inject
@Target({ METHOD, CONSTRUCTOR, FIELD })
@Retention(RUNTIME)
@Documented
public @interface Inject {}
```

1. `@Autowired`：可以加在构造方法、方法、方法参数、字段上，默认是根据类型（byType）进行自动装配。如果需要 byName，则需要配合 `@Qualifier`
2. `@Resource`：可以加在字段、方法、接口、类上，可以指定注入对象的名称
3. `@Inject`：可以加在构造函数、方法、字段上，默认根据类型装配，指定名称需要配合 `@Named`（类似于 `@Qualifier`）

**区别：**

1. `@Autowired` 是 Spring 自带的，`@Resource` 是 JSR250 规范实现的，`@Inject` 是 JSR330 规范实现的
2. `@Autowired`、`@Inject` 用法基本一样，不同的是 `@Inject` 没有 required 属性
3. `@Autowired`、`@Inject` 是默认按照类型匹配的，`@Resource` 是按照名称匹配的
4. `@Autowired` 如果需要按照名称匹配需要和 `@Qualifier` 一起使用，`@Inject` 和 `@Named` 一起使用，`@Resource` 则通过name进行指定





## BeanFactory 和 BeanRegistry

BeanFactory： 工厂模式定义了IOC容器的基本功能规范，其下的子类或者接口：

1. ListableBeanFactory：该接口定义了访问容器中 Bean 基本信息的若干方法，如查看Bean 的个数、获取某一类型 Bean 的配置名、查看容器中是否包括某一 Bean 等方法
2. HierarchicalBeanFactory：可以访问父容器接口
3. ConfiguarableBeanFactory：是一个重要的接口，增强了 IoC 容器的可定制性，它定义了设置类装载器、属性编辑器、容器初始化后置处理器等方法
4. AutowireCapableBeanFactory：定义了按某种规则进行自动装配的方法

注：ApplicationCentext 也实现了 BeanFactory（这是 Spring 中的两种 IoC 容器），因为上下文对象对资源、应用事件等的控制也必须遵守 BeanFactory 的 Bean 规范

| BeanFactory                | ApplicationContext       |
| :------------------------- | :----------------------- |
| 它使用懒加载               | 它使用即时加载           |
| 它使用语法显式提供资源对象 | 它自己创建和管理资源对象 |
| 不支持国际化               | 支持国际化               |
| 不支持基于依赖的注解       | 支持基于依赖的注解       |

BeanFactory 最常用的是 XmlBeanFactory 。它可以根据 XML 文件中定义的内容，创建相应的 Bean

ApplicationContext 最常用的是：ClassPathXmlApplicationContext、FileSystemXmlApplicationContext、XmlWebApplicationContext、ConfigServletWebServerApplicationContext（Spring Boot 中使用，也最常用）



<br/>

BeanRegistry： 向IOC容器手工注册 BeanDefinition 对象的方法

> Spring 配置文件中每一个`<bean>`节点元素在 Spring 容器里都通过一个 BeanDefinition 对象表示，它描述了 Bean 的配置信息。而 BeanDefinitionRegistry 接口提供了向容器手工注册 BeanDefinition 对象的方法。

BeanDefinition 定义了 Bean 对象之间的关系，BeanDefinitionReader 用于解析 BeanDefinition。BeanDefinitionHolder  是 BeanDefination 的包装类，用来存储BeanDefinition，name以及aliases等。











## 小结

- Spring 容器使用**依赖注入**来管理组成应用程序的 Bean 对象
- 容器通过读取提供的**配置元数据** Bean Definition 来接收对象进行实例化，配置和组装的指令
- 该配置元数据 Bean Definition 可以通过 XML，Java 注解或 Java Config 代码**提供**

**总览：**

![IOC容器](https://www.pdai.tech/images/spring/springframework/spring-framework-ioc-source-71.png)

**初始化过程：**

![IOC初始化过程](https://www.pdai.tech/images/spring/springframework/spring-framework-ioc-source-9.png)