---
title: "Spring 基础知识"
shortTitle: "Spring 基础知识"
description: "Spring 基础知识"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "spring"
- "原理"
tag:
- "spring"
- "原理"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Spring 基础知识"
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
  title: "Spring 基础知识"
  description: "Spring 基础知识"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring 基础知识

1. 依赖注入：Spring框架通过依赖注入（Dependency Injection，DI）来管理Java对象之间的依赖关系，使得程序的耦合度降低，更易于测试和维护。Spring提供了多种方式来实现依赖注入，包括基于构造函数的注入、基于Setter方法的注入、基于注解的注入等。
2. AOP：Spring框架提供了AOP（Aspect-Oriented Programming，面向切面编程）的支持，通过AOP可以实现日志记录、事务管理、性能监控、安全控制等功能，将应用程序的业务逻辑与系统级服务解耦。Spring的AOP采用了基于代理的方式实现，支持JDK动态代理和CGLIB动态代理两种方式。
3. IOC容器：Spring的核心是IOC（Inversion of Control，控制反转）容器，它通过配置文件或注解来管理Java对象的生命周期和依赖关系。Spring提供了多种类型的IOC容器，包括BeanFactory、ApplicationContext、WebApplicationContext等。
4. 事务管理：Spring框架提供了声明式事务管理和编程式事务管理两种方式，支持多种事务管理器，包括JDBC事务管理器、Hibernate事务管理器、JTA事务管理器等。
5. Web MVC框架：Spring MVC是Spring框架的一个模块，提供了一个基于MVC架构的Web应用程序开发框架，它将控制器、模型和视图分离，通过注解和XML配置来映射请求和响应，支持多种视图技术，包括JSP、Velocity、Freemarker等。
6. Spring Boot：Spring Boot是基于Spring框架的快速开发框架，它提供了自动配置、快速开发、无需XML配置等特性，使得开发者可以更加方便地创建独立的、可运行的、生产级别的Spring应用程序。
7. Spring Cloud：Spring Cloud是一个构建分布式系统的开发工具箱，它基于Spring Boot框架，提供了多种微服务组件，包括服务注册与发现、配置中心、路由网关、断路器等，可以快速搭建分布式系统。
8. Spring Security：Spring Security是一个基于Spring框架的安全框架，提供了认证、授权、加密、访问控制等功能，可以保护Web应用程序的安全性。



### Spring 中的核心对象

| 核心对象           | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| ApplicationContext | 应用上下文，是 Spring 应用程序中最常用的接口之一。在 Spring 应用程序中，我们通常从 ApplicationContext 中获得 Spring Bean 的实例。ApplicationContext 不仅包括了 Bean 的定义，还负责解析这些 Bean 之间的依赖关系。 |
| BeanFactory        | Bean 工厂，是 Spring 框架最基础的接口之一。BeanFactory 是 Spring Bean 容器的基本实现，提供了 Bean 实例化、配置和管理等功能。 |
| BeanPostProcessor  | Bean 后置处理器，是一个接口，它允许我们在 Spring 容器实例化 Bean 并配置好之后，对 Bean 实例进行一些自定义处理。BeanPostProcessor 可以在 Bean 初始化前后进行一些特殊操作。 |
| BeanDefinition     | Bean 定义，是 Spring Framework 中的一个重要的接口。BeanDefinition 定义了一个 Bean 实例的所有属性，包括属性名、属性类型、属性值、依赖关系等。 |
| ApplicationEvent   | 应用事件，是 Spring Framework 提供的一个事件发布、监听机制。ApplicationEvent 可以由应用程序的任何地方发布，ApplicationContext 将会把该事件传递给所有注册的监听器。 |
| ResourceLoader     | 资源加载器，是一个可以加载外部资源的抽象接口。Spring 应用程序可以使用 ResourceLoader 来加载资源，比如文件、图片、XML 配置文件等。 |
| Resource           | 资源，是 Spring 中的一个接口，用于抽象底层的资源，比如文件、URL、classpath 等。Resource 接口提供了一些方法，使得我们可以对底层资源进行读取、写入、判断等操作。 |



## Spring Bean

### 作用域

| 作用域         | 描述                                                         |
| :------------- | :----------------------------------------------------------- |
| singleton      | 在spring IoC容器仅存在一个Bean实例，Bean以单例方式存在，默认值 |
| prototype      | 每次从容器中调用Bean时，都返回一个新的实例，即每次调用getBean()时，相当于执行newXxxBean() |
| request        | 每次HTTP请求都会创建一个新的Bean，该作用域仅适用于WebApplicationContext环境 |
| session        | 同一个HTTP Session共享一个Bean，不同Session使用不同的Bean，仅适用于WebApplicationContext环境 |
| global-session | 一般用于Portlet应用环境，该作用域仅适用于WebApplicationContext环境 |



### 创建的生命周期步骤

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









## Spring5 的核心注解

| 注解            | 描述                           |
| --------------- | ------------------------------ |
| @Autowired      | 根据类型自动装配依赖对象       |
| @Component      | 将类交给 Spring 管理           |
| @Configuration  | 标记当前类为配置类             |
| @Controller     | 标记当前类为 Spring MVC 控制器 |
| @RequestMapping | 处理 HTTP 请求                 |
| @Repository     | 标记当前类为数据仓库           |
| @Service        | 标记当前类为业务逻辑组件       |
| @Value          | 将属性注入值                   |
| @Aspect         | 声明一个切面                   |
| @Transactional  | 标记当前方法或类是事务性的     |





## Spring 的事件处理

| 序号 | Spring 内置事件 & 描述                                       |
| :--- | :----------------------------------------------------------- |
| 1    | **ContextRefreshedEvent**：ApplicationContext 被初始化或刷新时，该事件被发布。这也可以在 ConfigurableApplicationContext 接口中使用 refresh() 方法来发生。 |
| 2    | **ContextStartedEvent**：当使用 ConfigurableApplicationContext 接口中的 start() 方法启动 ApplicationContext 时，该事件被发布。你可以调查你的数据库，或者你可以在接受到这个事件后重启任何停止的应用程序。 |
| 3    | **ContextStoppedEvent**：当使用 ConfigurableApplicationContext 接口中的 stop() 方法停止 ApplicationContext 时，发布这个事件。你可以在接受到这个事件后做必要的清理的工作。 |
| 4    | **ContextClosedEvent**：当使用 ConfigurableApplicationContext 接口中的 close() 方法关闭 ApplicationContext 时，该事件被发布。一个已关闭的上下文到达生命周期末端；它不能被刷新或重启。 |
| 5    | **RequestHandledEvent**：这是一个 web-specific 事件，告诉所有 bean HTTP 请求已经被服务。 |





## Spring 事务

Spring 事务实现方式有：**编程式事务** 和 **声明式事务**



### 传播机制

Spring事务传播机制是指在多个事务方法相互调用时，不同事务方法之间事务如何传播的机制。Spring中定义了七种事务传播行为，可以通过设置@Transactional注解或者TransactionDefinition对象来指定。

下表是七种事务传播行为以及对应的描述：

| 传播行为                        | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| Propagation.REQUIRED            | 如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入这个事务中。这是默认值。 |
| Propagation.SUPPORTS            | 支持当前事务，如果当前没有事务，就以非事务方式执行。         |
| Propagation.MANDATORY           | 使用当前的事务，如果当前没有事务，就抛出异常。               |
| Propagation.REQUIRES_NEW        | 新建事务，如果当前存在事务，把当前事务挂起。                 |
| Propagation.NOT_SUPPORTED       | 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。   |
| Propagation.NEVER               | 以非事务方式执行，如果当前存在事务，则抛出异常。             |
| Propagation.NESTED (Spring 3.0) | 如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与Propagation.REQUIRED类似的操作。 |

举个例子，假设有方法A和方法B，方法A调用了方法B。同时，方法A和方法B都被@Transactional注解标注了，且方法A的传播行为为Propagation.REQUIRED。

- 如果方法B的传播行为为Propagation.REQUIRED，那么方法B将加入到方法A的事务中，和方法A一起提交。
- 如果方法B的传播行为为Propagation.REQUIRES_NEW，那么方法B将新建一个事务，和方法A的事务并行执行，各自提交。
- 如果方法B的传播行为为Propagation.NESTED，那么方法B将在方法A的事务中嵌套一个子事务，如果发生异常，子事务将回滚，否则子事务和主事务一起提交。注意，这种传播行为只有在当前事务存在的情况下才会生效。

总之，事务传播机制可以保证多个事务方法之间的事务处理的正确性和一致性。





### 事务失效

:::info 说明

Spring 事务使用了 AOP，即进行了切面增强，所以失效的根本原因就是 AOP 失效

:::

Spring事务可以在多个层级的方法中嵌套使用，但是在某些情况下会导致事务失效，主要有以下几种情况：

1. 方法不是 public：@Transition 只能用于 public 修饰的方法上，否则就会失效；如果想用在非 public 方法上，可以开启 **AspectJ** 代理模式
2. 事务的传播行为设置不当：如果在事务嵌套的场景中，父方法和子方法的事务传播行为不同，那么就可能导致事务失效。
3. 异常被吞掉：如果在事务处理过程中，抛出的异常被捕获但没有被上抛，则会导致事务失效。因为Spring只会对未被捕获的异常进行回滚处理。
4. 非检查异常：如果在事务处理过程中抛出了非检查异常，比如NullPointerException、IndexOutOfBoundsException等，此时Spring事务无法捕获这些异常，也就无法进行回滚处理。
5. 同一个类中的方法调用：如果在同一个类中的方法之间进行相互调用，并且这些方法都使用了@Transactional注解声明了事务，但是并没有使用AOP代理实现事务控制（因为类中自调用 this 指向当前类，不是代理类，这样 AOP 就失效了），则会导致事务失效。
6. 多线程问题：如果在事务处理中涉及到多线程操作，则需要特别注意事务管理，否则可能会导致事务失效。
7. 数据库引擎不支持事务：如果使用的数据库引擎不支持事务，或者没有正确配置事务管理器，也会导致事务失效。
8. 数据库操作不符合事务要求：如果在事务处理中，进行了一些不符合事务要求的操作，比如DDL语句、存储过程调用等，则会导致事务失效。

总的来说，事务失效往往是由于代码实现问题或者环境配置问题导致的，需要仔细检查代码和环境配置，确保事务可以正确运行。





## Spring Web MVC

Spring Web MVC是Spring Framework的一个模块，它提供了一种基于MVC架构的Web应用程序开发方式。以下是Spring Web MVC的核心内容：

1. 控制器（Controller）：控制器是应用程序的核心，它接收和处理客户端的请求并产生相应的响应。在Spring Web MVC中，控制器通过注解或XML配置进行声明。
2. 模型（Model）：模型是应用程序的数据模型，它表示应用程序中的业务数据。在Spring Web MVC中，模型可以是POJO（Plain Old Java Object）或JavaBean，可以使用注解或XML配置进行声明。
3. 视图（View）：视图是应用程序中的用户界面，它显示模型的内容并与用户交互。在Spring Web MVC中，视图可以是JSP（Java Server Pages）、Thymeleaf、Velocity等模板引擎或者自定义视图。
4. 处理器映射（Handler Mapping）：处理器映射是将请求映射到控制器的过程。在Spring Web MVC中，可以使用注解或XML配置来定义处理器映射规则。
5. 视图解析器（View Resolver）：视图解析器是将逻辑视图名称映射到具体的视图技术的过程。在Spring Web MVC中，可以使用注解或XML配置来定义视图解析器。
6. 拦截器（Interceptor）：拦截器是在请求处理过程中拦截请求或响应，并执行一些操作的组件。在Spring Web MVC中，拦截器可以用于处理日志、安全性、性能优化等方面。
7. 数据绑定（Data Binding）：数据绑定是将客户端请求中的数据绑定到模型的过程。在Spring Web MVC中，数据绑定可以使用注解或XML配置进行声明。
8. 表单处理（Form Handling）：表单处理是将表单数据绑定到模型并进行验证和转换的过程。在Spring Web MVC中，表单处理可以使用注解或XML配置进行声明。
9. 异常处理（Exception Handling）：异常处理是在控制器中捕获异常并进行处理的过程。在Spring Web MVC中，可以使用注解或XML配置来定义异常处理器。

总之，Spring Web MVC提供了一个完整的Web应用程序开发框架，包括请求处理、模型管理、视图管理、拦截器、数据绑定、表单处理和异常处理等方面。





### 核心注解

| 注解                 | 用途                                 |
| -------------------- | ------------------------------------ |
| `@Controller`        | 声明一个控制器类                     |
| `@RequestMapping`    | 声明控制器处理的请求URL和请求方法    |
| `@PathVariable`      | 从请求URL中获取路径变量的值          |
| `@RequestParam`      | 从请求参数中获取参数的值             |
| `@ModelAttribute`    | 将请求参数绑定到模型属性上           |
| `@ResponseBody`      | 将响应内容直接作为响应体返回给客户端 |
| `@ResponseStatus`    | 指定控制器处理请求后返回的HTTP状态码 |
| `@ExceptionHandler`  | 声明异常处理方法                     |
| `@InitBinder`        | 声明数据绑定器的初始化方法           |
| `@SessionAttributes` | 声明模型属性需要存储到会话中         |
| `@CookieValue`       | 从请求中获取指定Cookie的值           |
| `@RequestHeader`     | 从请求头中获取指定的头信息           |



