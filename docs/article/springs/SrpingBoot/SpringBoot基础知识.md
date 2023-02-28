---
title: "Spring Boot 基础知识"
shortTitle: "Spring Boot 基础知识"
description: "Spring Boot 基础知识"
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
timeline: true,
dir:
  text: "Spring Boot 基础知识"
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
  title: "Spring Boot 基础知识"
  description: "Spring Boot 基础知识"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring Boot 基础知识

Spring Boot 是基于 Spring 框架的一个全新的框架，它主要对 Spring 框架做了以下封装：

1. 自动化配置

Spring Boot 提供了一系列的 Starter 依赖，可以根据项目的需求自动加载所需要的依赖，从而减少了开发人员在配置文件中手动添加各种依赖的繁琐工作。此外，Spring Boot 还提供了一个注解 @EnableAutoConfiguration，它会自动根据项目所依赖的 Starter 来进行自动化配置，使得开发者不需要关心底层框架的配置。

1. 嵌入式 Web 容器

Spring Boot 内置了 Tomcat、Jetty 和 Undertow 等多种嵌入式 Web 容器，可以在运行时快速启动一个 Web 服务。在开发阶段，开发人员可以在 IDE 中直接运行 Spring Boot 项目，无需手动安装和配置 Web 服务器。

1. 简化的 Maven/Gradle 配置

Spring Boot 通过提供约定大于配置的方式，简化了 Maven 和 Gradle 的配置。在 Maven 中，只需要添加一个 Starter 依赖，即可实现对应功能的开发。在 Gradle 中，可以通过 Groovy 语言编写 Gradle 配置文件，非常简洁易懂。

1. 简化的 Spring 开发

Spring Boot 还提供了大量的快捷开发工具，如自动扫描、自动注入、自动配置等，开发者可以专注于业务逻辑的开发，而不需要花费大量时间在繁琐的配置上。

1. 多种方式的配置

Spring Boot 提供了多种配置方式，包括 YAML、Properties、XML 和 Java 等多种配置方式，开发者可以根据自己的习惯选择适合自己的配置方式。此外，Spring Boot 还支持外部配置，可以将配置信息独立出来，以便于在不同环境下进行管理。

总之，Spring Boot 对 Spring 框架进行了封装，使得开发者可以更加方便快捷地进行应用程序的开发和部署。





## 1.搭建一个项目

1. 导入 Spring Boot 的依赖

   ```xml
   <!-- 导入依赖 -->
   <!-- 它的父依赖是 Spring Boot 的版本仲裁中心，已存在的依赖不需要手动写入版本号 -->
   <parent>
       <artifactId>spring-boot-starter-parent</artifactId>
       <groupId>org.springframework.boot</groupId>
       <version>2.5.3</version>
   </parent>
   <!-- spring-boot-starter 是场景启动器，帮我们导入了 web 模块正常运行所依赖的组件 -->
   <dependencies>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-web</artifactId>
       </dependency>
   </dependencies>
   ```

2. 编写一个主程序类

   ```java
   package com.gzw;
   
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   
   /*
   *   @SpringBootApplication 标注此类是主程序类，这是一个 Spring Boot 应用
   * */
   @SpringBootApplication
   public class MainApplication {
       public static void main(String[] args) {
           // 启动应用
           SpringApplication.run(MainApplication.class, args);
       }
   } 
   ```

3. 编写业务逻辑

   ```java
   package com.gzw.Controller;
   
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.ResponseBody;
   
   /*
   *   标注这个类是一个 Controller
   * */
   // @ResponseBody 若是加在这里，就是标注这个类下的所有方法
   @Controller
   // @RestController 是上面两个注解的组合
   public class HelloController {
       // 标注接收前端传递过来的 /hello 请求
       @RequestMapping("/hello")
       // 将返回值写到浏览器上
       @ResponseBody
       public String hello() {
           return "Hello World!";
       }
   
   }
   ```
   
4. 应用打包

   > 在命令行中进入 jar 包所在的目录，使用 `java -jar jar包路径` 就能运行 jar 包

   ```xml
   <!-- 添加打包需要的插件 -->
   <build>
       <plugins>
           <plugin>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-maven-plugin</artifactId>
               <version>2.3.7.RELEASE</version>
           </plugin>
       </plugins>
   </build>
   ```



## 2.核心注解解释



### 2.1 @SpringBootApplication

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





#### 2.1.1 @SpringBootConfiguration

> 被标注的类就是 Spring Boot 的配置类 

由以下几个注解组成，其中 @Configuration 是 Spring 定义的注解

注意：配置类 （被 @Configuration 标注）也是容器中的一个组件（被 @Component 标注）

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
```



#### 2.1.2 @EnableAutoConfiguration

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

- @AutoConfigurationPackage 自动配置包

  > 通过 @Import(AutoConfigurationPackages.Registrar.class) 实现自动配置，这是 Spring Boot 的底层注解，这个注解会给容器导入指定的组件
  >
  > AutoConfigurationPackages.Registrar.clas 会将主配置类所在包及下面所有子包里面的所有组件扫描到 Spring 容器中

- @Import(AutoConfigurationImportSelector.class)

  > 给容器导入组件，会给容器导入很多的自动配置类，即给容器导入这个场景所需要的所有组件并配置好这些组件



## 3.配置文件

> Spring Boot 的两个配置文件是：
>
> - application.properties
>
> - application.yml



### 3.1 YAML/YML 

> 以数据为中心，更适合做配置文件

-  例子：配置端口

  ```yaml
  server:
  	port: 8081
  ```

- 例子：朋友对象

  ```yaml
  friends:
  	lastName: zhangsan
  	age: 20
  	
  # 行内写法
  friends: {lastName: zhangsan, age: 20}
  ```

- 例子：动物数组

  ```yaml
  pets:
   - dog
   - cat
   - pig
   
   # 行内写法
   pet: [dog, cat, pig]
  ```

  

#### 3.1.1 基本语法

1. `k: v` : 表示一对键值对（其中空格一定要有）
2. 以空格的缩进来控制层级关系
3. 属性和值大小写敏感



#### 3.1.2 值的写法

1. 字面量：普通的值（数字、字符串、布尔），写法如上面 “配置端口” 的例子
   1. 字符串默认不加上 ‘单引号’ 或者 “双引号”
   2. “”：双引号不会转义字符串中特殊的字符
   3. ‘ ’：会转义特殊字符，最终得到的是一个普通的字符串
2. 对象、Map（属性和值：键值对），写法如上面 “朋友对象 “ 的例子
3. 数组、集合（List、Set），写法如上面 “” 的例子



#### 3.1.3 数据绑定

1. 引入依赖

   ```xml
   <!-- 导入配置文件处理器，配置文件进行绑定后就会有提示 -->
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-configuration-processor</artifactId>
       <optional>true</optional>
   </dependency>
   ```

   

2. 编写实体类（加上注解）

   ```java
   /*
   	@ConfigurationProperties(prefix = "person") 告诉 Spring Boot 将这个类和配置文件中的 person 属性一一对应
   	@Component 将这个类标注为容器中的组件，只有这样才能使用组件提供的功能，即绑定数据
   */
   @Component
   @ConfigurationProperties(prefix = "person")
   public class Person {
       String name;
       Integer age;
       Boolean boss;
       Date birthday;
       Map<String, Object> map;
       List<Object> list;
       Dog dog;
   }
   
   public class Dog {
       String name;
       int age;
   }
   ```

   

3. 配置文件设置属性

   ```yaml
   # 这是 yaml 的写法
   person:
     name: zhangsan
     age: 20
     boss: false
     birithday: 2000/2/2
     map: {k1: v1, k2: v2}
     list: [dog, cat, pig]
     dog: {name: kali, age: 2}
   
   # 下面是用 properties 的写法
   person.name = zhangSan
   person.age = 20
   person.boss = false
   person.map.k1 = v1
   person.list = a, b, c
   person.dog.name = kali
   person.dog.age = 2
   ```

   

4. 进行单元测试

   ```java
   @SpringBootTest
   class SpringBootTestApplicationTests {
   // 管理组件
   	@Autowired
   	Person person;
   
   	@Test
   	void contextLoads() {
       	System.out.println(person);
   	}
   }
   ```



### 3.2 Profile

#### 1.多 Profile 文件

> 需要编写多个配置文件
>
> 在主配置名编写的时候，文件名可以是：`application-{profile}.properties/yaml/yml`
>
> - application-dev.properties
> - application-prod.properties



#### 2.激活指定的 profile

> 1. 在配置文件中指定：`spring.profiles.active=dev`
> 2. 用命令行参数指定配置文件：`--spring.profiles.active=dev`
> 3. 使用虚拟机参数：`-Dspring.profiles.active=dev`



#### 3.yaml/yml 支持多文档块方式

> - 不需要编写多个配置文件
>
> - 用 `---` 区分开不同的文档块，示例如下

```yaml
server:
  port: 8081
spring:
 profiles:
 	active: dev
 	
---
server:
  port: 8082
spring:
  profiles: dev
   
---
server:
  port: 8083
spring:
  profiles: prod
```



### 3.3 配置文件的位置

> 下面优先级「由高到低」：
>
> 1. file: ./config/
> 2. file: ./
> 3. classpath: ./config/
> 4. classpath: ./
>
> - 高优先级的配置会覆盖低优先级的配置（重复的部分）
>
> - Spring Boot 会从这四个位置加载全部的配置文件，会有「互补配置」的效果





## 4.其他注解

#### 4.1 @PropertySource

> - 在实体类中绑定指定的配置文件



#### 4.2 @ImportResource

> - 将配置文件放入 IOC 容器中



#### 4.3 @Configuration

> - 指明当前类是一个配置类，相当于配置文件，这样就省去了写配置文件的繁琐步骤



#### 4.4 @bean

> - 将方法的返回值添加到容器中
> - 容器中这个组件默认的 id 就是方法名



## 5.开启日志

```xml
<!-- 开启日志 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
    <version>2.5.3</version>
</dependency>
```



### 5.1 打印日志

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SpringBootTestApplicationTests {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Test
    void contextLoads() {
        // 日志的级别，由低到高；调整级别可以输出高于或等于高级别的日志信息
        logger.trace("这是 trace 日志...");
        logger.debug("这是 debug 日志...");
        // Spring Boot 默认的级别是 info
        logger.info("这是 info 日志...");
        logger.warn("这是 warn 日志...");
        logger.error("这是 error 日志...");
    }

}
```



### 5.2 日志的相关配置

```properties
# 修改日志级别为 trace
logging.level.com.xxx=trace
# 在当前项目下生成 springboot.log 日志文件
logging.file=springboot.log
# 这项设置与上一项只能同时存在一个，会在当前磁盘的根路径下创建 /spring/log 二级目录，并使用默认的 spring.log 作为日志文件
logging.path=/spring/log
```



## 6.静态资源

> **访问路径：**
>
> - “classpath:META-INF/resources/”
> - “classpath:/resources/”
> - “classpath:/static/”
> - “classpath:/public/”
> - “/”：当前项目的根路径 



## 7.模板引擎

