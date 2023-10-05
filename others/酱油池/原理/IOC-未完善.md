---
title: "IOC"
shortTitle: "IOC"
description: "IOC"
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
timeline: true
dir:
  text: "IOC"
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
  title: "IOC"
  description: "IOC"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# IOC

容器概念、控制反转、依赖注入

ioc容器：实际上就是个map（key，value），里面存的是各种对象（在xml里配置的bean节点、@repository、@service、@controller、@component），在项目启动的时候会读取配置文件里面的bean节点，根据全限定类名使用反射创建对象放到map里、扫描到打上上述注解的类还是通过反射创建对象放到map里。

这个时候map里就有各种对象了，接下来我们在代码里需要用到里面的对象时，再通过DI注入（autowired、resource等注解，xml里bean节点内的ref属性，项目启动的时候会读取xml节点ref属性

根据id注入，也会扫描这些注解，根据类型或id注入；id就是对象名）。

**控制反转：**

没有引入IOC容器之前，对象A依赖于对象B，那么对象A在初始化或者运行到某一点的时候，自己必须主动去创建对象B或者使用已经创建的对象B。无论是创建还是使用对象B，控制权都在自己手上。

引入IOC容器之后，对象A与对象B之间失去了直接联系，当对象A运行到需要对象B的时候，IOC容器会主动创建一个对象B注入到对象A需要的地方。

通过前后的对比，不难看出来：对象A获得依赖对象B的过程,由主动行为变为了被动行为，控制权颠倒过来了，这就是“控制反转”这个名称的由来。

全部对象的控制权全部上缴给“第三方”IOC容器，所以，IOC容器成了整个系统的关键核心，它起到了一种类似“粘合剂”的作用，把系统中的所有对象粘合在一起发挥作用，如果没有这个“粘合剂”，对象与对象之间会彼此失去联系，这就是有人把IOC容器比喻成“粘合剂”的由来。

**依赖注入：**

“获得依赖对象的过程被反转了”。控制被反转之后，获得依赖对象的过程由自身管理变为了由IOC容器主动注入。依赖注入是实现IOC的方法，就是由IOC容器在运行期间，动态地将某种依赖关系注入到对象之中





## IoC Servive Provider

> 理念是：让别人为你服务



### 三种注入方式

**1.构造方法注入（construct injection）**

> 进酒吧就有酒送上

- 被注入对象可以通过在其构造方法中声明依赖对象的参数列表，让外部（通常是IoC容器）知道它需要哪些依赖对象

- IoC Service Provider会检查被注入对象的构造方法，取得它所需要的依赖对象列表，进而为其注

  入相应的对象

- 同一个对象是不可能被构造两次的，因此，被注入对象的构造乃至其整个生命周期，应该是由IoC Service Provider来管理的

优点：

- 方便，开箱即用

缺点：

- 注入的方法太多，构造方法参数会过长
- 使用反射创建该对象时可能会很麻烦
- 构造方法无法继承，无法设置默认值
- 对于非必要的依赖，如果使用构造方法进行依赖注入可能需要构建多个不同参数的构造方法，对之后的维护不利



**2.setter 方法注入（setter injection）**

> 进酒吧先选择喝什么

- 象只要为其依赖对象所对应的属性添加setter方法，就可以通过setter方法将相应的依赖对象设置到被注入对象中

优点：

- 可以被继承
- 可以设置默认值

缺点：

- 不能立即使用



**3.接口注入（interface injection）**

> 你不是来喝酒的

- 如果需要注入依赖对象，被注入对象就必须声明和实现另外的接口。
- 接口注入是现在不甚提倡的一种方式，基本处于“退役状态”。因为它强制被注入对象实现不必要的接口，带有侵入性。而构造方法注入和setter方法注入则不需要如此



### 职责

- 业务对象的构建管理
- 业务对象间的依赖绑定



### 管理依赖的方法

- 直接编码
- 编写配置文件（早期常使用 XML 配置文件的方式）
- 元数据方式（通过注解说明依赖关系，可以看作编码方式的一种特殊情况）



## IoC Container

> IoC 容器除了是一个 IoC Servive Provider 外，还提供了其他服务（衍生的高级特性），如：AOP 支持、对象生命周期管理、线程管理、查找服务...
>
> Spring 的 IoC 容器提供了两种容器：BeanFactory 和 ApplicationContext



### BeanFactory

- 基础类型容器，提供基本的但完整的 IoC 服务
- 采用延迟初始化策略（lazy-load），即：需要使用时才初始化并注入依赖
- 可以完成作为 IoC Servive Provider 的所有职责，包括了对象的注册和对象间依赖关系的绑定



**依赖管理：**

XML 依赖管理（使用 Properties 配置文件管理的与 xml 类似）：

![image-20220930085813531](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//ioc/20230210/%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86.png)

```cml
<beans> 
	<bean id="djNewsProvider" class="..FXNewsProvider"> 
 		<constructor-arg index="0"> 
 			<ref bean="djNewsListener"/> 
 		</constructor-arg> 
		<constructor-arg index="1"> 
 			<ref bean="djNewsPersister"/> 
 		</constructor-arg> 
 	</bean> 
 	... 
</beans>
```

```java
ApplicationContext container =
new ClassPathXmlApplicationContext("配置文件路径"); 
FXNewsProvider newsProvider = (FXNewsProvider)container.getBean("djNewsProvider"); newsProvider.getAndPersistNews();
```

直接编码依赖管理：

![image-20220930083408110](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//ioc/20230210/%E7%9B%B4%E6%8E%A5%E7%BC%96%E7%A0%81%E4%BE%9D%E8%B5%96%E7%AE%A1%E7%90%86.png)

- BeanFactory 是图书管理员
- BeanDefinitionRegistry 是书架
- BeanDefinition 是书，每一个受管的对象，容器内都有一个对应的 BeanDefinition 实例

```java
public static BeanFactory bindViaCode(BeanDefinitionRegistry registry) { 
 AbstractBeanDefinition newsProvider =
 new RootBeanDefinition(FXNewsProvider.class,true); 
 AbstractBeanDefinition newsListener =
 new RootBeanDefinition(DowJonesNewsListener.class,true); 
 AbstractBeanDefinition newsPersister =
 new RootBeanDefinition(DowJonesNewsPersister.class,true); 
 // 将bean定义注册到容器中
 registry.registerBeanDefinition("djNewsProvider", newsProvider); 
 registry.registerBeanDefinition("djListener", newsListener); 
 registry.registerBeanDefinition("djPersister", newsPersister); 
// 指定依赖关系
 // 1. 可以通过构造方法注入方式
 ConstructorArgumentValues argValues = new ConstructorArgumentValues(); 
 argValues.addIndexedArgumentValue(0, newsListener); 
 argValues.addIndexedArgumentValue(1, newsPersister); 
 newsProvider.setConstructorArgumentValues(argValues); 
 // 2. 或者通过setter方法注入方式
    MutablePropertyValues propertyValues = new MutablePropertyValues(); 
 propertyValues.addPropertyValue(new ropertyValue("newsListener",newsListener)); 
 propertyValues.addPropertyValue(new PropertyValue("newPersistener",newsPersister)); 
 newsProvider.setPropertyValues(propertyValues); 
 // 绑定完成
 return (BeanFactory)registry; 
}
```

注解管理方式（spring 2.5 之后才支持）：

```java
// @Autowired 告知容器为当前对象注入哪些依赖对象 
// @Component 配合 classpath-scanning 标注需要被注入的对象
```

classpath-scanning 触发器

```XML
<?xml version="1.0" encoding="UTF-8"?> 
<beans xmlns="http://www.springframework.org/schema/beans" ➥
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ➥
xmlns:context="http://www.springframework.org/schema/context" ➥
xmlns:tx="http://www.springframework.org/schema/tx" ➥
xsi:schemaLocation="http://www.springframework.org/schema/beans ➥
http://www.springframework.org/schema/beans/spring-beans-2.5.xsd ➥
http://www.springframework.org/schema/context ➥
http://www.springframework.org/schema/context/spring-context-2.5.xsd ➥
http://www.springframework.org/schema/tx ➥
http://www.springframework.org/schema/tx/spring-tx-2.5.xsd">
<context:component-scan base-package="cn.spring21.project.base.package"/> 
</beans>
```



**BeanFactory 的 Bean scope：**

- BeanFactory 作为轻量级的 IoC 容器，还可以管理对象的生命周期
- scope 有 5 种范围（后三种是 2.0 之后引入的，只能在 Web 容器中使用）：
  - singleton：同一个容器中只存在一个共享实例（不要和单例模式弄混，单例模式是保证在同一个 ClassLoader 中只存在一个这样的实例），初始化后一直存活到容器退出
  - prototype：每次接收到请求后都生成一个新的对象实例给请求方，容器没有该实例的引用，即需要请求方自己管理该实例的声明周期
  - request：为每个 HTTP 请求创建一个全新的对象，当请求结束之后，这个实例的生命周期即告结束，可以看作是 prototype 的特例（场景更加具体，但是语义差不多）
  - session：经常将用户的登录信息放到 session 中。容器会为每个 session 创建数据它的全新的对象实例，存活的时间比使用 request 范围的对象长，其余的差不多
  - global session：只有应用在基于 pertlet 的 Web 应用程序中才有意义，它映射到 portlet 的 global 范围的 session；如果在普通的基于 servlet 的 Web 应用中使用这个类型的话，容器会将其作为普通的 session 类型对待
- scope 属性只能在 XSD 哥哥是的文档声明中使用
- scope 属性可以自定义，这里省略不谈

p69







### ApplicationContext

- 在 BeanFactory 的基础上构建（间接继承 BeanFactory，还额外继承了几个接口），是高级的容器实现
- 提供了其他的高级特性
- 管理的对象在容器启动后全部初始化完毕并绑定完成
