---
title: "Spring Web MVC"
shortTitle: "F-Spring Web MVC"
description: "Spring Web MVC"
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
  text: "Spring Web MVC"
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
  title: "Spring Web MVC"
  description: "Spring Web MVC"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring Web MVC

[[toc]]

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

![请求处理过程](https://www.pdai.tech/images/spring/springframework/spring-springframework-mvc-5.png)





## 核心注解

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





## 核心处理流程

1. `DispatcherServlet` 负责接收以及响应请求
2. 交给 `HandlerMapping` 映射处理器处理，返回 `HandlerExecutionChain` 对象，该对象包含：
   1. `Handler` 页面控制器
   2. `HandlerInterceptor` 拦截器对象
3. 交给 `HandlerAdapter` 会把 `Handler` 包装成 **适配器**，找到对应的处理器，最终返回 `ModelAndView`
4. 解析视图并渲染，返回响应

此外流程中还会有：

1. 过滤器，如 `ServletFilter`，对请求进行过滤，故有前置过滤器和后置过滤器
2. 解析器，如 `LocaleResolver` 国际化解析器，`MultipartResolver` 文件解析器





## RequestCondition

RequestCondition是Spring MVC中的一个组件，它用于定义请求匹配规则，包括请求的路径、请求方法、请求参数等信息。它属于Spring MVC的控制层，用于处理Web请求。

RequestCondition是一个接口，它继承了springframework的Conditional接口，提供了方法用于判断当前请求是否符合指定的条件。在Spring MVC中，RequestCondition的实现类会被注册到RequestMappingHandlerMapping中，用于处理请求匹配逻辑。

另外，RequestCondition有多个子接口，包括RequestCondition、HeadersRequestCondition、ParamsRequestCondition、ConsumesRequestCondition、ProducesRequestCondition、RequestMethodRequestCondition、NameValueExpressionRequestCondition等，它们用于定义不同类型的请求匹配规则。这些子接口的实现类会被注册到RequestMappingInfo中，用于存储请求匹配规则的相关信息。

总的来说，RequestCondition在Spring MVC中扮演着重要的角色，用于处理请求匹配逻辑。同时，它还有多个子接口，用于定义不同类型的请求匹配规则。

