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



![请求处理过程](https://www.pdai.tech/images/spring/springframework/spring-springframework-mvc-5.png)

Spring MVC 是一种用于构建 Web 应用程序的框架，它的处理流程涉及到多个组件和阶段。下面是 Spring MVC 接收到一个请求后的完整处理流程：

1. **请求到达 DispatcherServlet：** 当客户端发送一个 HTTP 请求到应用程序，请求首先到达 DispatcherServlet。DispatcherServlet 是 Spring MVC 的核心控制器，它负责拦截所有的请求并将其分发到适当的处理器（Controller）。
2. **处理器映射器（Handler Mapping）：** DispatcherServlet 使用处理器映射器来确定请求应该由哪个 Controller 处理。处理器映射器将请求的 URL 映射到相应的处理器类。
3. **执行处理器（Controller）：** 一旦确定了请求应该由哪个 Controller 处理，DispatcherServlet 会调用相应的 Controller 的方法来处理请求。Controller 执行逻辑，可能包括业务处理、数据获取等。
4. **模型与视图的准备：** Controller 处理请求后，会产生一个包含模型数据的数据结构。这个模型数据将被传递给视图，用于渲染页面。Controller 还要选择一个视图来展示模型数据。
5. **视图解析器（View Resolver）：** 视图解析器将逻辑视图名解析为实际的视图。它将根据视图名找到合适的视图模板，并返回给 DispatcherServlet。
6. **视图渲染：** 一旦找到视图模板，DispatcherServlet 将模型数据传递给视图，并调用视图的渲染方法。视图将模型数据填充到模板中，生成最终的 HTML 页面。
7. **响应发送给客户端：** 渲染后的 HTML 页面将作为 HTTP 响应返回给客户端。这个响应包含了生成的页面内容以及适当的 HTTP 状态码。

总结：Spring MVC 的处理流程从请求到达 DispatcherServlet 开始，然后经过处理器映射器、Controller 处理、模型与视图准备、视图解析器、视图渲染，最终将响应发送给客户端。这个过程中涉及多个组件的协作，用于处理客户端的请求并生成响应。



也可以理解为：

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





## 组件说明

**RequestCondition**

RequestCondition是Spring MVC中的一个组件，它用于定义请求匹配规则，包括请求的路径、请求方法、请求参数等信息。它属于Spring MVC的控制层，用于处理Web请求。

RequestCondition是一个接口，它继承了springframework的Conditional接口，提供了方法用于判断当前请求是否符合指定的条件。在Spring MVC中，RequestCondition的实现类会被注册到RequestMappingHandlerMapping中，用于处理请求匹配逻辑。

另外，RequestCondition有多个子接口，包括RequestCondition、HeadersRequestCondition、ParamsRequestCondition、ConsumesRequestCondition、ProducesRequestCondition、RequestMethodRequestCondition、NameValueExpressionRequestCondition等，它们用于定义不同类型的请求匹配规则。这些子接口的实现类会被注册到RequestMappingInfo中，用于存储请求匹配规则的相关信息。

总的来说，RequestCondition在Spring MVC中扮演着重要的角色，用于处理请求匹配逻辑。同时，它还有多个子接口，用于定义不同类型的请求匹配规则。

<br/>

**HttpServletRequest**

:::info 相关文章

http://c.biancheng.net/servlet2/httpservletrequest.html

:::

<br/>

**WebMvcConfigurer**

:::info 相关文章

[SpringBoot---WebMvcConfigurer详解](https://blog.csdn.net/zhangpower1993/article/details/89016503)

:::



## 过滤器与拦截器

过滤器（Filter）和拦截器（Interceptor）是在 Spring MVC 处理流程的不同阶段执行的。它们都用于在请求进入 Controller 之前或之后执行一些逻辑。

**过滤器（Filter）：** 过滤器是 Java Servlet 规范中定义的一种组件，可以在请求进入 Servlet 或 JSP 之前、之后，对请求进行预处理或后处理。过滤器是在 Servlet 容器层面执行的，与 Spring MVC 框架本身独立，也可以在 Spring MVC 中使用。

过滤器在整个请求处理流程中的位置是在 DispatcherServlet 之前，即请求还未进入 Spring MVC 框架之前执行。过滤器可以用来进行请求和响应的处理、修改请求头、编码解码等操作。过滤器是 Web 应用程序级别的。

**拦截器（Interceptor）：** 拦截器是 Spring MVC 框架提供的一种拦截请求和响应的机制。拦截器是在 Spring MVC 的上下文中执行的，它们更具备对 Spring 的感知能力，可以访问 Spring 容器中的 Bean。拦截器主要用于对 Controller 的请求进行预处理和后处理。

拦截器在 Spring MVC 处理流程中的位置是在请求进入 Controller 之前和之后，可以分别对应请求的预处理和后处理。拦截器可以用来进行权限验证、日志记录、性能监控等操作。拦截器是 Spring MVC 框架级别的。

总结：

- 过滤器是在 Servlet 容器层面执行的，位于请求进入 Spring MVC 之前。
- 拦截器是在 Spring MVC 框架层面执行的，位于请求进入 Controller 之前和之后。



:::info 相关文章

https://blog.csdn.net/Herishwater/article/details/103544342

:::

自定义 Interceptor 的话必须实现 `org.springframework.web.servlet.HandlerInterceptor` 接口或继承 `org.springframework.web.servlet.handler.HandlerInterceptorAdapter` 类，并且需要重写下面下面 3 个方法：

1. `preHandler(HttpServletRequest request, HttpServletResponse response, Object handler)` 方法在请求处理之前被调用。该方法在 Interceptor 类中最先执行，用来进行一些前置初始化操作或是对当前请求做预处理，也可以进行一些判断来决定请求是否要继续进行下去。该方法的返回至是 Boolean 类型，当它返回 false 时，表示请求结束，后续的 Interceptor 和 Controller 都不会再执行；当它返回为 true 时会继续调用下一个 Interceptor 的 preHandle 方法，如果已经是最后一个 Interceptor 的时候就会调用当前请求的 Controller 方法。
2. `postHandler(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)` 方法在当前请求处理完成之后，也就是 Controller 方法调用之后执行，但是它会在 DispatcherServlet 进行视图返回渲染之前被调用，所以我们可以在这个方法中对 Controller 处理之后的 ModelAndView 对象进行操作。
3. `afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handle, Exception ex)` 方法需要在当前对应的 Interceptor 类的 postHandler 方法返回值为 true 时才会执行。顾名思义，该方法将在整个请求结束之后，也就是在 DispatcherServlet 渲染了对应的视图之后执行。此方法主要用来进行资源清理。





## 参数解析

对请求参数进行解析、转换等步骤是在 Spring MVC 的处理器方法执行之前的阶段执行的，主要涉及到拦截器和参数解析器。

具体来说，在 Spring MVC 的处理流程中，这些步骤是在以下位置执行的：

1. **拦截器（Interceptor）的预处理阶段：** 在拦截器中，你可以对请求进行预处理，包括对请求参数的解析、转换等操作。拦截器的 `preHandle` 方法会在请求进入 Controller 之前被调用，因此你可以在这个方法中对请求参数进行预处理。
2. **参数解析器（HandlerMethodArgumentResolver）：** 参数解析器是一种机制，用于在处理器方法执行前，将请求中的参数解析并转换成方法的参数类型。Spring MVC 内置了许多参数解析器，用于处理不同类型的参数，如请求参数、路径变量、请求体等。参数解析器会在拦截器的 `preHandle` 方法之后执行，处理器方法执行之前。

综合来说，对请求参数的解析、转换等步骤主要涉及到拦截器的预处理阶段和参数解析器，在请求进入 Controller 之前进行。这样可以确保在处理器方法执行之前，请求参数已经被正确解析和转换成处理器方法的参数类型。





## 处理器

在 Spring MVC 中，"handler" 是一个通用的术语，用于指代处理请求的组件。主要的 handler 包括 Controller、处理器方法、处理器适配器和视图解析器等。下面是这些 handler 的具体内容、作用以及常用的一些实现：

1. **Controller：** Controller 是 Spring MVC 中处理请求的核心组件。它负责处理特定请求，并返回适当的视图或数据。Controller 可以是类级别的，也可以是方法级别的。通常，Controller 类包含多个处理器方法，每个方法处理一个具体的请求。
2. **处理器方法（Handler Method）：** 处理器方法是 Controller 类中的方法，用于处理特定的请求。每个处理器方法负责执行相应的业务逻辑，并返回数据模型和逻辑视图名。处理器方法的参数可以通过参数解析器来获取。
3. **处理器适配器（Handler Adapter）：** 处理器适配器是用来将不同类型的 handler（例如 Controller、处理器方法等）适配到 Spring MVC 的处理器链中。处理器适配器根据 handler 的类型执行相应的处理逻辑，使得不同类型的 handler 可以无缝地与 Spring MVC 集成。
4. **视图解析器（View Resolver）：** 视图解析器负责将逻辑视图名解析为实际的视图对象。视图解析器在处理器方法返回逻辑视图名后，根据配置来找到对应的视图模板。它是将数据模型和视图进行结合的关键一步。

常用的处理器有：

- **`@Controller` 类：** 这是常见的 Controller，用于处理请求并返回视图或数据。通常使用 `@RequestMapping` 等注解来映射请求路径到处理器方法。
- **`@RequestMapping` 注解：** 用于将请求路径映射到特定的处理器方法。可以用于类级别和方法级别，方便指定不同的路径。
- **`@RestController` 类：** 这是 Spring 4.0 以后引入的注解，结合了 `@Controller` 和 `@ResponseBody`，用于处理 RESTful 请求，直接将方法的返回值序列化为 JSON 或其他格式的数据。
- **`HandlerInterceptor` 接口：** 这是拦截器的接口，用于在处理器方法执行前后执行自定义的逻辑。常用于权限验证、日志记录等。
- **`HandlerMethodArgumentResolver` 接口：** 参数解析器，用于将请求参数解析为处理器方法的参数类型，方便在处理器方法中获取请求参数。

使用场景：

- `@Controller` 和 `@RestController` 用于处理 Web 请求，返回视图或数据，适用于构建 Web 应用程序和 RESTful API。
- `@RequestMapping` 用于映射请求路径到处理器方法，定制化请求的处理流程。
- `HandlerInterceptor` 用于拦截请求并执行预处理和后处理操作，例如权限验证、日志记录等。
- `HandlerMethodArgumentResolver` 用于处理参数解析，将请求参数转换为处理器方法的参数类型。

不同的 handler 用于不同的场景和需求，它们共同构成了 Spring MVC 处理请求的灵活机制。