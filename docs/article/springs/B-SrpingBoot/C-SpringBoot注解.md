---
title: "Spring Boot 注解"
shortTitle: "C-Spring Boot 注解"
description: "Spring Boot 注解"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-01-27
category: 
- "spring"
tag:
- "spring"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Spring Boot 注解"
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
  title: "Spring Boot 注解"
  description: "Spring Boot 注解"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring Boot 注解

[[toc]]

## 总览

| 注解                           | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| @SpringBootApplication         | Spring Boot应用的主配置类，用于开启自动配置和组件扫描        |
| @EnableAutoConfiguration       | 开启自动配置，根据依赖自动配置 Spring Boot 应用              |
| @ImportResource                | 加载XML配置文件                                              |
| @Value                         | 注入配置文件中的属性值                                       |
| @ConfigurationProperties       | 读取配置文件中以 person 开头的属性值                         |
| @EnableConfigurationProperties | 开启读取配置文件中的配置类                                   |
| @RestController                | SpringMVC注解，用于处理请求并生成JSON数据                    |
| @RequestMapping                | 声明控制器的请求映射，用于处理URI请求                        |
| @RequestParam                  | 注解绑定请求参数                                             |
| @ResponseBody                  | SpringMVC注解，用于将处理方法的返回值转换为JSON格式          |
| @Bean                          | 声明一个Bean，交给Spring容器管理                             |
| @Service                       | 服务层组件注解                                               |
| @Controller                    | 控制器组件注解                                               |
| @Repository                    | DAO层组件注解                                                |
| @Component                     | 通用组件注解                                                 |
| @PostConstruct                 | 在Bean初始化后执行的方法                                     |
| @PathVariable                  | 注解绑定URL中的占位符                                        |
| @ControllerAdvice              | 统一处理异常                                                 |
| @ComponentScan                 | 自动扫描指定包及其子包下的组件                               |
| @EnableZuulProxy               | 开启Zuul反向代理                                             |
| @Autowired                     | 自动装配Bean，将Bean注入到需要使用的类中                     |
| @Configuration                 | 声明配置类，相当于Spring的XML配置文件                        |
| @Import                        | 加载指定的配置类                                             |
| @Order                         | 配置Bean的加载顺序                                           |
| @ConditionalOnExpression       | 基于SpEL表达式的条件判断注解，只有当SpEL表达式为true时，才会加载相应的配置。 |
| @ConditionalOnProperty         | 基于配置文件属性值的条件判断注解，只有当配置文件中指定的属性名的属性值与指定的值匹配时，才会加载相应的配置。 |
| @ConditionalOnClass            | 基于类是否存在的条件判断注解，只有当指定的类存在于类路径中时，才会加载相应的配置。 |
| @ConditionalOnMisssingClass    | 基于类是否缺失的条件判断注解，只有当指定的类缺失于类路径中时，才会加载相应的配置。 |
| @ConditionOnMissingBean        | 基于Bean是否缺失的条件判断注解，只有当指定的Bean缺失于应用上下文中时，才会加载相应的配置。 |





## 启动类

### @SpringBootApplication

> 这个是 Spring Boot 的应用标注，被标注的类就是 Sring Boot 的主配置类，运行这个类的 main 方法就能启动应用
>
> 这是一个组合注解，由以下注解组成

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
```





### @SpringBootConfiguration

> 被标注的类就是 Spring Boot 的配置类 

由以下几个注解组成，其中 @Configuration 是 Spring 定义的注解

注意：配置类 （被 @Configuration 标注）也是容器中的一个组件（被 @Component 标注）

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
```



### @EnableAutoConfiguration

> 开启自动配置功能，Spring Boot 会帮我们自动配置

由以下几个注解组成

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
```

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration
```

**@AutoConfigurationPackage 自动配置包：**

- 通过 @Import(AutoConfigurationPackages.Registrar.class) 实现自动配置，这是 Spring Boot 的底层注解，这个注解会给容器导入指定的组件
- AutoConfigurationPackages.Registrar.clas 会将主配置类所在包及下面所有子包里面的所有组件扫描到 Spring 容器中

**@Import(AutoConfigurationImportSelector.class)：**

- 给容器导入组件，会给容器导入很多的自动配置类，即给容器导入这个场景所需要的所有组件并配置好这些组件





### @PostConstruct

spring容器初始化时，要执行注解标注的方法



### @ComponentScan

注解会告知Spring扫描指定的包来初始化Spring

```java
@ComponentScan(basePackages = "com.xxx.xx")
```



### @EnableZuulProxy

路由网关的主要目的是为了让所有的微服务对外只有一个接口，我们只需访问一个网关地址，即可由网关将所有的请求代理到不同的服务中。Spring Cloud是通过Zuul来实现的，支持自动路由映射到在Eureka Server上注册的服务。Spring Cloud提供了注解@EnableZuulProxy来启用路由代理





## 通用类

### @Autowired

在默认情况下使用 @Autowired 注释进行自动注入时，Spring 容器中匹配的候选 Bean 数目必须有且仅有一个。当找不到一个匹配的 Bean 时，Spring 容器将抛出 BeanCreationException 异常，并指出必须至少拥有一个匹配的 Bean。

当不能确定 Spring 容器中一定拥有某个类的 Bean 时，可以在需要自动注入该类 Bean 的地方可以使用 @Autowired(required = false)，这等于告诉 Spring: 在找不到匹配 Bean 时也不报错



### @Component

泛指组件，当组件不好归类的时候，我们可以使用这个注解进行标注。



### @Order

@Order(1)，值越小优先级超高，越先运行





## 控制类

### @Controller

用于标注控制层组件



### @ResponseBody

支持将返回值放在response体内，而不是返回一个页面。比如Ajax接口，可以用此注解返回数据而不是页面。此注解可以放置在返回值前或方法前。



### @RestController

组合@Controller和@ResponseBody



### @RequestMapping

映射 Web 请求

```java
@RequestMapping(value="/api2/copper",produces="application/json;charset=UTF-8",method = RequestMethod.POST)
```



### @RequestParam

获取request请求的参数值

```java
public List<CopperVO> getOpList(HttpServletRequest request,
                                    @RequestParam(value = "pageIndex", required = false) Integer pageIndex,
                                    @RequestParam(value = "pageSize", required = false) Integer pageSize) {}
```



### @PathVariable

用来获得请求url中的动态参数

```java
public String getLogin(@PathVariable("userId") String userId,  
         @PathVariable("roleId") String roleId){}
```





### @ControllerAdvice

统一处理异常







## 业务类

### @Service

用于标注业务层组件



## 持久层类

### @Repository

用于标注数据访问组件，即DAO组件





## 存取类

### @bean

- 将方法的返回值添加到容器中
- 容器中这个组件默认的 id 就是方法名

```java
@Bean(name="bean的名字",initMethod="初始化时调用方法名字",destroyMethod="close")
```





### @Value

application.properties定义属性，直接使用@Value注入即可

```java
// 缺失则默认为 0
@Value("${push.start:0}")
private Long  id;
```







## 配置类

### @Configuration

指明当前类是一个配置类，相当于配置文件，这样就省去了写配置文件的繁琐步骤



### @ConditionalOnProperty

基于配置文件属性值的条件判断注解，只有当配置文件中指定的属性名的属性值与指定的值匹配时，才会加载相应的配置。



### @ConditionalOnClass  

基于类是否存在的条件判断注解，只有当指定的类存在于类路径中时，才会加载相应的配置。  

```java
@Configuration
@ConditionalOnClass({Gson.class})
public class GsonAutoConfiguration {
    public GsonAutoConfiguration() {
    }

    @Bean
    @ConditionalOnMissingBean
    public Gson gson() {
        return new Gson();
    }
}
```







### @ConditionalOnMisssingClass  

基于类是否缺失的条件判断注解，只有当指定的类缺失于类路径中时，才会加载相应的配置。 



### @ConditionOnMissingBean  

基于Bean是否缺失的条件判断注解，只有当指定的Bean缺失于应用上下文中时，才会加载相应的配置。



### @PropertySource

在实体类中绑定指定的配置文件



### @ImportResource

将配置文件放入 IOC 容器中，加载xml配置，一般是放在启动main类上

```java
@ImportResource("classpath*:/spring/*.xml")
@ImportResource({"classpath*:/spring/1.xml","classpath*:/spring/2.xml"})
```



### @ConfigurationProperties

可以新建一个properties文件，ConfigurationProperties的属性prefix指定properties的配置的前缀，通过location指定properties文件的位置





### @EnableConfigurationProperties

用 @EnableConfigurationProperties注解使 @ConfigurationProperties生效，并从IOC容器中获取bean。





### @Import(Config.class)

```java
@Configuration
public class CDConfig {

    @Bean   // 将SgtPeppers注册为 SpringContext中的bean
    public CompactDisc compactDisc() {
        return new CompactDisc();  // CompactDisc类型的
    }
}

@Configuration
@Import(CDConfig.class)  //导入CDConfig的配置
public class CDPlayerConfig {

    @Bean(name = "cDPlayer")
    public CDPlayer cdPlayer(CompactDisc compactDisc) {  
         // 这里会注入CompactDisc类型的bean
         // 这里注入的这个bean是CDConfig.class中的CompactDisc类型的那个bean
        return new CDPlayer(compactDisc);
    }
}
```





### @ConditionalOnExpression

开关为true的时候才实例化bean

```java
@Configuration
@ConditionalOnExpression("${enabled:false}")
public class BigpipeConfiguration {
    @Bean
    public OrderMessageMonitor orderMessageMonitor(ConfigContext configContext) {
        return new OrderMessageMonitor(configContext);
    }
}
```





