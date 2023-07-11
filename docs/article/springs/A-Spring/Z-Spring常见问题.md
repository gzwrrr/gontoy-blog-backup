---
title: "Spring 常见问题"
shortTitle: "Z-Spring 常见问题"
description: "Spring 常见问题"
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
  text: "Spring 常见问题"
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
  title: "Spring 常见问题"
  description: "Spring 常见问题"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring 常见问题


[[toc]]


## Spring 容器是怎么启动的？

Spring容器启动的流程主要分为三个阶段：加载、实例化、初始化。

1. 加载阶段

   Spring容器的加载阶段是指容器读取并解析配置文件，根据配置文件创建BeanDefinition对象的过程。Spring容器支持多种配置方式，包括XML、Java注解和Java代码等方式。无论使用哪种配置方式，Spring容器都会将配置文件解析为BeanDefinition对象，并将这些对象存储在内存中，供后续使用。

2. 实例化阶段

   Spring容器的实例化阶段是指根据BeanDefinition对象创建Bean实例的过程。在这个阶段，Spring容器会根据BeanDefinition对象中的信息，创建Bean实例并将其保存到容器中。对于每一个Bean实例，Spring容器都会检查其是否有依赖关系，并根据依赖关系自动注入所需的依赖对象。如果有必要，Spring容器还会创建代理对象，以实现AOP等功能。

3. 初始化阶段

   Spring容器的初始化阶段是指调用Bean实例的初始化方法的过程。在这个阶段，Spring容器会根据配置文件中的信息，为每个Bean实例调用其初始化方法。此外，Spring容器还会为每个Bean实例应用各种AOP切面、拦截器和事件监听器等增强功能。完成初始化后，Spring容器就将Bean实例放入容器中，供应用程序使用。

总之，Spring容器启动的流程主要包括加载、实例化和初始化三个阶段，其中加载阶段是将配置文件解析为BeanDefinition对象的过程，实例化阶段是根据BeanDefinition对象创建Bean实例的过程，初始化阶段是为每个Bean实例调用初始化方法并应用各种增强功能的过程。





## Spring 中的 Bean 是线程安全的吗？

Spring 本身其实并没有对 Bean 做线程安全处理：

1. 如果 Bean 是无状态的，那么 Bean 就是线程安全的
2. 如果 Bean 是有状态的，那么 Bean 就不是线程安全的

另外：Bean 是否是线程安全的，跟 Bean 本身的作用域没有关系。Bean 的作用域只是表示 Bean 的生命周期范围，对于任何生命周期的 Bean 都是一个对象，这个线程是不是线程安全的，还是的看这个 Bean 对象本身是怎么实现的







## ApplicationContext 和 BeanFactory 的区别

ApplicationContext 继承了 BeanFactory，即前者拥有后者的所有特点，并且前者还继承了其他类和实现了其他接口，拥有更为丰富的配置和功能

它们之间的主要区别在于：

1. 初始化时间：BeanFactory是懒加载的，也就是说只有在获取bean时才会进行初始化，而ApplicationContext是在容器启动时就会进行初始化。
2. 功能：ApplicationContext除了具有BeanFactory的所有功能外，还提供了更多的企业级功能，例如国际化支持、事件发布、AOP等。
3. 配置文件：ApplicationContext支持更多种类的配置文件，例如XML、Java Config、注解等，而BeanFactory仅支持XML格式的配置文件。
4. 执行效率：由于BeanFactory是懒加载的，所以在容器启动时的执行效率较高，而ApplicationContext的初始化过程比BeanFactory更复杂，执行效率相对较低。
5. 作用域：BeanFactory只支持单例和原型两种作用域，而ApplicationContext支持更多种作用域，例如会话作用域和请求作用域等。

综上所述，如果需要使用Spring框架的高级功能，或者需要较快的执行效率，建议使用ApplicationContext；如果只是需要基本的bean管理功能，或者需要减少启动时间，可以考虑使用BeanFactory。





## Spring 中的事务是如何实现的？

在Spring中，事务的实现主要基于Spring事务管理器（Transaction Manager）和AOP（Aspect-Oriented Programming）技术。

Spring事务管理器是一个接口，定义了一些对事务进行管理的方法，如开始事务、提交事务、回滚事务等，其实现类可以支持不同的事务管理技术，如JDBC、Hibernate、JPA等。Spring中提供了多个实现类，包括JDBC的DataSourceTransactionManager、Hibernate的HibernateTransactionManager、JPA的JpaTransactionManager等。

AOP技术则用于将事务管理器的功能与业务逻辑解耦。Spring提供了声明式事务管理和编程式事务管理两种方式。

声明式事务管理是通过在配置文件中声明事务的属性来实现的，例如设置哪些方法需要开启事务、设置事务隔离级别、设置事务超时时间等。声明式事务管理可以基于XML配置、Java注解或者Java Config进行配置。Spring会在AOP切面中对事务进行管理，当目标方法执行时，AOP会对其进行拦截，然后将事务管理器与目标方法织入到一起，实现对事务的管理。

编程式事务管理则需要在代码中手动进行事务的开启、提交和回滚等操作。虽然编程式事务管理更加灵活，但也更加繁琐。

总的来说，Spring的事务管理机制使得开发者可以更加方便地对事务进行管理，从而降低了开发复杂度。同时，Spring提供了多种事务管理器的实现和多种事务管理方式的选择，可以根据具体的业务需求进行选择。



==要点如下：==

1. Spring 事务底层是基于 **数据库事务** 和 **AOP** 机制的
2. 使用 `@Transactional` 注解的 Bean，Spring 会为其创建一个代理对象作为 Bean
3. 当调用代理对象的方法时，会先判断该方法上是否加上了 `@Transactional`  注解：如果加了那么会利用事务管理器创建一个数据库连接，并且禁止此连接的自动提交，执行方法后没有异常就提交，如果出现了需要回滚的异常就不提交事务
4. Spring 的事务的隔离级别就是对应数据库的隔离级别
5. Spring 事务的传播机制是 Spring 事务自己实现的，也是 Spring 事务最复杂的部分
6. Spring 事务的传播机制是基于数据库连接来做的，一个数据库连接一个事务。如果传播机制配置为需要新开一个事务，那么就是先建立一个数据库连接再执行 SQL









## Spring 中的设计模式有哪些？

Spring 框架中应用了多种设计模式，下面是一些常见的设计模式：

1. 依赖注入（Dependency Injection，DI）模式

   Spring 框架的核心思想就是依赖注入（DI）模式，即对象之间的依赖关系不再由程序员手动创建和管理，而是由 Spring 容器负责创建和管理，Spring 容器会将依赖的对象注入到需要它们的对象中，以此来解耦和简化应用程序的开发。

2. 控制反转（Inversion of Control，IoC）模式

   依赖注入（DI）模式是控制反转（IoC）模式的一种实现方式。控制反转模式是指将对象的控制权从应用程序代码转移到了外部容器，Spring 容器负责创建和管理对象，并将它们注入到需要它们的对象中，这样就实现了对象之间的松耦合和可扩展性。

3. 工厂模式

   Spring 框架中的 BeanFactory 接口和 ApplicationContext 接口都是工厂模式的应用。BeanFactory 接口是一个工厂接口，它负责创建和管理 Bean 对象，而 ApplicationContext 接口则是 BeanFactory 接口的子接口，提供了更多的功能和特性，如国际化、资源管理和 AOP 等。

4. 模板模式

   Spring 框架中的 JdbcTemplate 和 HibernateTemplate 等模板类都是基于模板模式实现的。模板模式是指将一个算法的骨架固定下来，将一些步骤的具体实现交给子类来完成，从而使得算法的框架不会改变，但是具体实现可以根据需要灵活变化。

5. 装饰器模式

   Spring 框架中的 AOP 模块就是基于装饰器模式实现的。装饰器模式是指动态地给一个对象添加一些额外的职责，从而扩展其功能和特性。在 Spring AOP 中，切面（Aspect）就是一个装饰器，它可以动态地为目标对象添加额外的行为。

6. 观察者模式

   Spring 框架中的事件（Event）机制就是基于观察者模式实现的。观察者模式是指对象之间的一种一对多的依赖关系，当一个对象状态发生改变时，它所依赖的所有对象都会收到通知并自动更新。在 Spring 中，事件源（Event Source）负责发布事件，观察者（Observer）负责订阅事件，并在事件发生时执行相应的逻辑。





## Spring 中如何解决循环依赖?

:::info 相关文章

1. [spring 循环依赖以及解决方案(吊打面试官)](https://mp.weixin.qq.com/s?__biz=MzA5MTkxMDQ4MQ==&mid=2648934322&idx=1&sn=647edffeedeb8978c18ad403b1f3d8d7&chksm=88621f8cbf15969af1c5396903dcce312c1f316add1af325327d287e90be49bbeda52bc1e736&token=718443976&lang=zh_CN&scene=21#wechat_redirect)
2. [年薪50万的一个面试题，看着不难，却刷掉了99%的人！](https://mp.weixin.qq.com/s/pQaX2-BqFsO3pzPELWIDfQ)

:::

Spring 中只是解决了单例 Bean 循环依赖的问题，解决方案是三级缓存

**第一层缓存（singletonObjects）**：单例对象缓存池，已经实例化并且属性赋值，这里的对象是**成熟对象**；

**第二层缓存（earlySingletonObjects）**：单例对象缓存池，已经实例化但尚未属性赋值，这里的对象是**半成品对象**；

**第三层缓存（singletonFactories）**: 单例工厂的缓存





### 那么其它循环依赖如何解决？

> 那么实际开发中，类似的依赖是如何解决？

- **生成代理对象产生的循环依赖**

这类循环依赖问题解决方法很多，主要有：

1. 使用@Lazy注解，延迟加载
2. 使用@DependsOn注解，指定加载先后关系
3. 修改文件名称，改变循环依赖类的加载顺序

- **使用@DependsOn产生的循环依赖**

这类循环依赖问题要找到@DependsOn注解循环依赖的地方，迫使它不循环依赖就可以解决问题。

- **多例循环依赖**

这类循环依赖问题可以通过把bean改成单例的解决。

- **构造器循环依赖**

这类循环依赖问题可以通过使用@Lazy注解解决。



