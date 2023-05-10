---
title: "Spring 体系结构"
shortTitle: "A-Spring 体系结构"
description: "Spring 体系结构"
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
  text: "Spring 体系结构"
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
  title: "Spring 体系结构"
  description: "Spring 体系结构"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Spring 体系结构


[[toc]]

1. 依赖注入：Spring框架通过依赖注入（Dependency Injection，DI）来管理Java对象之间的依赖关系，使得程序的耦合度降低，更易于测试和维护。Spring提供了多种方式来实现依赖注入，包括基于构造函数的注入、基于Setter方法的注入、基于注解的注入等。
2. AOP：Spring框架提供了AOP（Aspect-Oriented Programming，面向切面编程）的支持，通过AOP可以实现日志记录、事务管理、性能监控、安全控制等功能，将应用程序的业务逻辑与系统级服务解耦。Spring的AOP采用了基于代理的方式实现，支持JDK动态代理和CGLIB动态代理两种方式。
3. IOC容器：Spring的核心是IOC（Inversion of Control，控制反转）容器，它通过配置文件或注解来管理Java对象的生命周期和依赖关系。Spring提供了多种类型的IOC容器，包括BeanFactory、ApplicationContext、WebApplicationContext等。
4. 事务管理：Spring框架提供了声明式事务管理和编程式事务管理两种方式，支持多种事务管理器，包括JDBC事务管理器、Hibernate事务管理器、JTA事务管理器等。
5. Web MVC框架：Spring MVC是Spring框架的一个模块，提供了一个基于MVC架构的Web应用程序开发框架，它将控制器、模型和视图分离，通过注解和XML配置来映射请求和响应，支持多种视图技术，包括JSP、Velocity、Freemarker等。
6. Spring Boot：Spring Boot是基于Spring框架的快速开发框架，它提供了自动配置、快速开发、无需XML配置等特性，使得开发者可以更加方便地创建独立的、可运行的、生产级别的Spring应用程序。
7. Spring Cloud：Spring Cloud是一个构建分布式系统的开发工具箱，它基于Spring Boot框架，提供了多种微服务组件，包括服务注册与发现、配置中心、路由网关、断路器等，可以快速搭建分布式系统。
8. Spring Security：Spring Security是一个基于Spring框架的安全框架，提供了认证、授权、加密、访问控制等功能，可以保护Web应用程序的安全性。



## Spring 中的核心对象

| 核心对象           | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| ApplicationContext | 应用上下文，是 Spring 应用程序中最常用的接口之一。在 Spring 应用程序中，我们通常从 ApplicationContext 中获得 Spring Bean 的实例。ApplicationContext 不仅包括了 Bean 的定义，还负责解析这些 Bean 之间的依赖关系。 |
| BeanFactory        | Bean 工厂，是 Spring 框架最基础的接口之一。BeanFactory 是 Spring Bean 容器的基本实现，提供了 Bean 实例化、配置和管理等功能。 |
| BeanPostProcessor  | Bean 后置处理器，是一个接口，它允许我们在 Spring 容器实例化 Bean 并配置好之后，对 Bean 实例进行一些自定义处理。BeanPostProcessor 可以在 Bean 初始化前后进行一些特殊操作。 |
| BeanDefinition     | Bean 定义，是 Spring Framework 中的一个重要的接口。BeanDefinition 定义了一个 Bean 实例的所有属性，包括属性名、属性类型、属性值、依赖关系等。 |
| ApplicationEvent   | 应用事件，是 Spring Framework 提供的一个事件发布、监听机制。ApplicationEvent 可以由应用程序的任何地方发布，ApplicationContext 将会把该事件传递给所有注册的监听器。 |
| ResourceLoader     | 资源加载器，是一个可以加载外部资源的抽象接口。Spring 应用程序可以使用 ResourceLoader 来加载资源，比如文件、图片、XML 配置文件等。 |
| Resource           | 资源，是 Spring 中的一个接口，用于抽象底层的资源，比如文件、URL、classpath 等。Resource 接口提供了一些方法，使得我们可以对底层资源进行读取、写入、判断等操作。 |





## Spring 中的核心容器

**Beans 模块**：提供了框架的基础部分，包括控制反转和依赖注入。

**Core 核心模块**：封装了 Spring 框架的底层部分，包括资源访问、类型转换及一些常用工具类。

**Context 上下文模块**：建立在 Core 和 Beans 模块的基础之上，集成 Beans 模块功能并添加资源绑定、数据验证、国际化、Java EE 支持、容器生命周期、事件传播等。ApplicationContext 接口是上下文模块的焦点。

**SpEL 模块**：提供了强大的表达式语言支持，支持访问和修改属性值，方法调用，支持访问及修改数组、容器和索引器，命名变量，支持算数和逻辑运算，支持从 Spring 容器获取 Bean，它也支持列表投影、选择和一般的列表聚合等。





## Spring 数据访问与集成

**JDBC 模块**：提供了一个 JDBC 的样例模板，使用这些模板能消除传统冗长的 JDBC 编码还有必须的事务控制，而且能享受到 Spring 管理事务的好处。

**ORM 模块**：提供与流行的“对象-关系”映射框架无缝集成的 API，包括 JPA、JDO、Hibernate 和 MyBatis 等。而且还可以使用 Spring 事务管理，无需额外控制事务。

**OXM 模块**：提供了一个支持 Object /XML 映射的抽象层实现，如 JAXB、Castor、XMLBeans、JiBX 和 XStream。将 Java 对象映射成 XML 数据，或者将XML 数据映射成 Java 对象。

**JMS 模块**：指 Java 消息服务，提供一套 “消息生产者、消息消费者”模板用于更加简单的使用 JMS，JMS 用于用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。

**Transactions 事务模块**：支持编程和声明式事务管理。





## Spring Web

- **Web 模块**：提供了基本的 Web 开发集成特性，例如多文件上传功能、使用的 Servlet 监听器的 IOC 容器初始化以及 Web 应用上下文。
- **Servlet 模块**：提供了一个 Spring MVC Web 框架实现。Spring MVC 框架提供了基于注解的请求资源注入、更简单的数据绑定、数据验证等及一套非常易用的 JSP 标签，完全无缝与 Spring 其他技术协作。
- **WebSocket 模块**：提供了简单的接口，用户只要实现响应的接口就可以快速的搭建 WebSocket Server，从而实现双向通讯。
- **Webflux 模块**： Spring WebFlux 是 Spring Framework 5.x中引入的新的响应式web框架。与Spring MVC不同，它不需要Servlet API，是完全异步且非阻塞的，并且通过Reactor项目实现了Reactive Streams规范。Spring WebFlux 用于创建基于事件循环执行模型的完全异步且非阻塞的应用程序。

此外Spring4.x中还有Portlet 模块，在Spring 5.x中已经移除。





## Spring 切面

**AOP 模块**：提供了面向切面编程实现，提供比如日志记录、权限控制、性能统计等通用功能和业务逻辑分离的技术，并且能动态的把这些功能添加到需要的代码中，这样各司其职，降低业务逻辑和通用功能的耦合。

**Aspects 模块**：提供与 AspectJ 的集成，是一个功能强大且成熟的面向切面编程（AOP）框架。

**Instrumentation 模块**：提供了类工具的支持和类加载器的实现，可以在特定的应用服务器中使用。

**messaging 模块**：Spring 4.0 以后新增了消息（Spring-messaging）模块，该模块提供了对消息传递体系结构和协议的支持。

**jcl 模块**： Spring 5.x中新增了日志框架集成的模块。





## Spring 各版本侧重点

1. Spring 1.x：提出整体框架，简化传统开发
2. Spring 2.x：xml 配置为主，提供注解和反射的初步支持
3. Spring 3.x：确定 Spring Framework的内核，包括注解驱动，事件驱动，注解支持
4. Spring 4.x：注解配置称为主流
5. Spring 5.x：函数式 + 异步响应式编程





## Spring 设计模式

1. 解释器模式：SpEL 模块
2. 建造者模式：BeanDefinitionBuilder，Bean 工厂后置处理器中有使用到
3. 工厂模式：可以指定对象的静态方法进行构造
4. 抽象工厂：BeanFoctory