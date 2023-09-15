---
title: "Spring Boot 基础知识"
shortTitle: "A-Spring Boot 基础知识"
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

:::info 说明

约定大于配置，开箱即用，无需过度配置，但是要改也能完全自定义，改善 Spring Framework 框架轻但是配置重的问题

SpringBoot不是对Spring功能上的增强，而是提供了一种快速使用Spring的方式

:::

[[toc]]



:::info 相关资源

[Spring 官网](https://spring.io/)

[Spring Boot 教程](https://www.w3schools.cn/spring_boot/index.html)

:::




Spring Boot 是基于 Spring 框架的一个全新的框架，它主要对 Spring 框架做了以下封装：

1. 自动化配置

   Spring Boot 提供了一系列的 Starter 依赖，可以根据项目的需求自动加载所需要的依赖，从而减少了开发人员在配置文件中手动添加各种依赖的繁琐工作。此外，Spring Boot 还提供了一个注解 @EnableAutoConfiguration，它会自动根据项目所依赖的 Starter 来进行自动化配置，使得开发者不需要关心底层框架的配置。

2. 嵌入式 Web 容器

   Spring Boot 内置了 Tomcat、Jetty 和 Undertow 等多种嵌入式 Web 容器，可以在运行时快速启动一个 Web 服务。在开发阶段，开发人员可以在 IDE 中直接运行 Spring Boot 项目，无需手动安装和配置 Web 服务器。

3. 简化的 Maven/Gradle 配置

   Spring Boot 通过提供约定大于配置的方式，简化了 Maven 和 Gradle 的配置。在 Maven 中，只需要添加一个 Starter 依赖，即可实现对应功能的开发。在 Gradle 中，可以通过 Groovy 语言编写 Gradle 配置文件，非常简洁易懂。

4. 简化的 Spring 开发

   Spring Boot 还提供了大量的快捷开发工具，如自动扫描、自动注入、自动配置等，开发者可以专注于业务逻辑的开发，而不需要花费大量时间在繁琐的配置上。

5. 多种方式的配置

   Spring Boot 提供了多种配置方式，包括 YAML、Properties、XML 和 Java 等多种配置方式，开发者可以根据自己的习惯选择适合自己的配置方式。此外，Spring Boot 还支持外部配置，可以将配置信息独立出来，以便于在不同环境下进行管理。

总之，Spring Boot 对 Spring 框架进行了封装，使得开发者可以更加方便快捷地进行应用程序的开发和部署。







## Spring Boot Starter

在Spring Boot中，Starter是一种依赖管理的方式，可以简化Spring Boot应用程序的依赖管理，并将相关依赖项整合在一起。Starter包含了一组预配置的依赖，可以通过引入Starter来自动配置Spring Boot应用程序的特定功能。

Spring Boot的Starter通常包括以下几个方面的功能：

- 自动配置类：Spring Boot会根据应用程序的依赖关系自动配置应用程序，因此可以免去手动配置的麻烦。
- 必需依赖：Starter包含了应用程序必需的依赖项，这样开发人员就不必在项目中手动引入这些依赖项了。
- 推荐依赖：Starter中可能会包含一些推荐的依赖项，这些依赖项可以帮助开发人员快速实现某些功能，但并不是必需的。

通过自定义Starter，可以将某些功能封装起来，让其他开发人员可以更轻松地使用这些功能，同时也可以使应用程序更加模块化、解耦合。自定义Starter可以通过创建一个Maven项目，然后在该项目中编写自定义Starter的自动配置类、必需依赖和推荐依赖等内容，最后将该项目打包为一个JAR文件即可。

使用Spring Boot的Starter可以带来以下好处：

- 简化依赖管理：Starter包含了一组预配置的依赖项，这些依赖项可以自动配置应用程序，简化了依赖管理的过程。
- 快速开发：通过引入Starter，可以快速实现一些常用的功能，从而加速开发过程。
- 代码解耦：Starter可以将某些功能封装起来，使得应用程序中的各个模块之间更加解耦合。
- 统一依赖版本：由于Starter会统一依赖的版本，因此可以避免不同依赖项之间版本冲突的问题。

**Spring Boot 中提供的 Starter 包括但不限于：**

| 名称                             | 说明                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| spring-boot-starter              | 核心 POM，包含自动配置支持、日志库和对 YAML 配置文件的支持。 |
| spring-boot-starter-web          | 支持 Web 应用开发，包含 Tomcat 和 spring-mvc。               |
| spring-boot-starter-tomcat       | 使用 Spring Boot 默认的 Tomcat 作为应用服务器。              |
| spring-boot-starter-amqp         | 通过 spring-rabbit 支持 AMQP。                               |
| spring-boot-starter-aop          | 包含 spring-aop 和 AspectJ 来支持面向切面编程（AOP）。       |
| spring-boot-starter-batch        | 支持 Spring Batch，包含 HSQLDB。                             |
| spring-boot-starter-data-jpa     | 包含 spring-data-jpa、spring-orm 和 Hibernate 来支持 JPA。   |
| spring-boot-starter-data-mongodb | 包含 spring-data-mongodb 来支持 MongoDB。                    |
| spring-boot-starter-data-rest    | 通过 spring-data-rest-webmvc 支持以 REST 方式暴露 Spring Data 仓库。 |
| spring-boot-starter-jdbc         | 支持使用 JDBC 访问数据库。                                   |
| spring-boot-starter-security     | 包含 spring-security。                                       |
| spring-boot-starter-test         | 包含常用的测试所需的依赖，如 JUnit、Hamcrest、Mockito 和 spring-test 等。 |
| spring-boot-starter-velocity     | 支持使用 Velocity 作为模板引擎。                             |
| spring-boot-starter-websocket    | 支持使用 Tomcat 开发 WebSocket 应用。                        |
| spring-boot-starter-ws           | 支持 Spring Web Services。                                   |
| spring-boot-starter-actuator     | 添加适用于生产环境的功能，如性能指标和监测等功能。           |
| spring-boot-starter-remote-shell | 添加远程 SSH 支持。                                          |
| spring-boot-starter-jetty        | 使用 Jetty 而不是默认的 Tomcat 作为应用服务器。              |
| spring-boot-starter-log4j        | 添加 Log4j 的支持。                                          |
| spring-boot-starter-logging      | 使用 Spring Boot 默认的日志框架 Logback。                    |









## 搭建一个项目

导入 Spring Boot 的依赖

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

编写一个主程序类

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

编写业务逻辑

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

应用打包：在命令行中进入 jar 包所在的目录，使用 `java -jar jar包路径` 就能运行 jar 包

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







<br/>

