---
title: "Spring AOP"
shortTitle: "C-Spring AOP"
description: "Spring AOP"
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
  text: "Spring AOP"
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
  title: "Spring AOP"
  description: "Spring AOP"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Spring AOP

[[toc]]





:::info 说明

最早由 AOP 联盟提出的一套规范，Spring 引入后通过 **预编译** 和 **运行时动态代理** 实现了 **面向切面编程**

:::

:::info 相关文章

[SpringBoot使用AOP，PointCut表达式详解以及使用](https://blog.csdn.net/LuQiaoYa/article/details/88233846)

[SpringBoot整合AOP超详细教程](https://blog.csdn.net/XiongHuyi/article/details/118417301)

[Spring Validation最佳实践及其实现原理，参数校验没那么简单！](https://www.cnblogs.com/chentianming/p/13424303.html)

:::





## 概念

1. 连接点（Jointpoint）：表示在哪里切入，Spring 中只允许方法执行连接点
2. 切入点（PointCut）：可以认为是连接点的集合，即匹配所有符合的连接点，Spring支持perl5正则表达式和AspectJ切入点模式，Spring默认使用AspectJ语法
3. 通知（Advice）：包含三种通知，即前置通知、后置通知、环绕通知，Spring 中使用代理模式实现，通过 **拦截器模式** 以环绕连接点的 **拦截器链** 进行通知
4. 引入（inter-type declaration）：也称为内部类型声明，为已有的类添加额外新的字段或方法，Spring允许引入新的接口（必须对应一个实现）到所有被代理对象（目标对象）
5. 目标对象（Target Object）：被代理被切入的对象
6. 织入（Wearing）：把切面连接到其它的应用程序类型或者对象上，并创建一个被通知的对象。这些可以在编译时（例如使用AspectJ编译器），类加载时和运行时完成。Spring和其他纯Java AOP框架一样，在运行时完成织入
7. AOP代理（AOP Proxy）：AOP框架使用代理模式创建的对象，从而实现在连接点处插入通知（即应用切面），就是通过代理来对目标对象应用切面。在Spring中，AOP代理可以用JDK动态代理或CGLIB代理实现，而通过拦截器模型应用切面





## 通知类型

**前置通知（Before advice）**：在某连接点之前执行的通知，但这个通知不能阻止连接点之前的执行流程（除非它抛出一个异常）。

**后置通知（After returning advice）**：在某连接点正常完成后执行的通知：例如，一个方法没有抛出任何异常，正常返回。

**异常通知（After throwing advice）**：在方法抛出异常退出时执行的通知。

**最终通知（After (finally) advice）**：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）。

**环绕通知（Around Advice）**：包围一个连接点的通知，如方法调用。这是最强大的一种通知类型。环绕通知可以在方法调用前后完成自定义的行为。它也会选择是否继续执行连接点或直接返回它自己的返回值或抛出异常来结束执行。





## 配置方式

两种方式

1. XML 模式
2. 基于 AspectJ 的注解

一般都是使用注解方式，使用 execution 切入点指示符指定需要切入的目标对象，其余注解如下：

| 注解名称        | 解释                                                         |
| --------------- | ------------------------------------------------------------ |
| @Aspect         | 用来定义一个切面。                                           |
| @pointcut       | 用于定义切入点表达式。在使用时还需要定义一个包含名字和任意参数的方法签名来表示切入点名称，这个方法签名就是一个返回值为void，且方法体为空的普通方法。 |
| @Before         | 用于定义前置通知，相当于BeforeAdvice。在使用时，通常需要指定一个value属性值，该属性值用于指定一个切入点表达式(可以是已有的切入点，也可以直接定义切入点表达式)。 |
| @AfterReturning | 用于定义后置通知，相当于AfterReturningAdvice。在使用时可以指定pointcut / value和returning属性，其中pointcut / value这两个属性的作用一样，都用于指定切入点表达式。 |
| @Around         | 用于定义环绕通知，相当于MethodInterceptor。在使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。 |
| @After-Throwing | 用于定义异常通知来处理程序中未处理的异常，相当于ThrowAdvice。在使用时可指定pointcut / value和throwing属性。其中pointcut/value用于指定切入点表达式，而throwing属性值用于指定-一个形参名来表示Advice方法中可定义与此同名的形参，该形参可用于访问目标方法抛出的异常。 |
| @After          | 用于定义最终final 通知，不管是否异常，该通知都会执行。使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。 |
| @DeclareParents | 用于定义引介通知，相当于IntroductionInterceptor (不要求掌握)。 |





## AOP 实战

:::info 相关文章

1. [彻底征服 Spring AOP 之 理论篇](https://segmentfault.com/a/1190000007469968)
2. [彻底征服 Spring AOP 之 实战篇](https://segmentfault.com/a/1190000007469982)

:::

依赖如下：

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.4.0.RELEASE</version>
    <relativePath/>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

配置如下：

```yaml
server:
  port: 8080

spring:
  mvc:
    throw-exception-if-no-handler-found: true
  resources:
    add-mappings: false
```



### 认证

定义注解用于 AOP Ponit Cut：

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AuthChecker {
}
```

定义切面：

```java
@Component
@Aspect
public class HttpAopAdviseDefine {
    /**
     * 定义一个 Pointcut, 使用 切点表达式函数 来描述对哪些 Join point 使用 advise
     */
    @Pointcut("@annotation(com.gontoy.spring.annotation.AuthChecker)")
    public void pointcut() {}
    /**
     * 定义 advice
     */
    @Around("pointcut()")
    public Object checkAuth(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();

        // 检查用户所传递的 token 是否合法
        String token = getUserToken(request);
        if (!token.equalsIgnoreCase("userxxx")) {
            return "权限不合法!";
        }

        return joinPoint.proceed();
    }
    /**
     * 获取 Token
     */
    private String getUserToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return "";
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equalsIgnoreCase("user_token")) {
                return cookie.getValue();
            }
        }
        return "";
    }

}
```

暴露接口时加上注解即可：

```java
@RestController
@RequestMapping("/aop")
public class HttpController {
    @GetMapping("/userInfo")
    @AuthChecker
    public String getUserInfo() {
        return "获取用户信息...";
    }
    @GetMapping("/status")
    @AuthChecker
    public String getStatus() {
        return "服务正常运行...";
    }
}
```



### 日志

定义切面，对指定的 Service 输出额外日志：

```java
@Component
@Aspect
public class LogAopAdviseDefine {
    private Logger logger = LoggerFactory.getLogger(getClass());
    /**
     * 定义一个 Pointcut, 使用 切点表达式函数 来描述对哪些 Join point 使用 advise.
     */
    @Pointcut("within(com.gontoy.spring.service.NeedLogService)")
    public void pointcut() {
    }
    /**
     * 定义 advice
     */
    @Before("pointcut()")
    public void logMethodInvokeParam(JoinPoint joinPoint) {
        logger.info("--- Before method {} invoke, param: {} ---", 
                    joinPoint.getSignature().toShortString(), joinPoint.getArgs());
    }
    @AfterReturning(pointcut = "pointcut()", returning = "retVal")
    public void logMethodInvokeResult(JoinPoint joinPoint, Object retVal) {
        logger.info("--- After method {} invoke, result: {} ---", 
                    joinPoint.getSignature().toShortString(), joinPoint.getArgs());
    }
    @AfterThrowing(pointcut = "pointcut()", throwing = "exception")
    public void logMethodInvokeException(JoinPoint joinPoint, Exception exception) {
        logger.info("--- method {} invoke exception: {} ---", 
                    joinPoint.getSignature().toShortString(), exception.getMessage());
    }
}
```

Controller 和 Service 正常编写即可，无任何入侵：

```java
@Service
public class NeedLogService {
    private Logger logger = LoggerFactory.getLogger(getClass());
    private Random random = new Random(System.currentTimeMillis());
    public int logMethod(String someParam) {
        logger.info("--- NeedLogService: logMethod invoked, param: {} ---", someParam);
        return random.nextInt();
    }
    public void exceptionMethod() throws Exception {
        logger.info("--- NeedLogService: exceptionMethod invoked ---");
        throw new Exception("Something bad happened!");
    }
}
```





### 统计方法耗时

定义切面对指定的 Service 中的所有方法都统计方法耗时：

```java
@Component
@Aspect
public class ExpiredAopAdviseDefine {
    private Logger logger = LoggerFactory.getLogger(getClass());
    /**
     * 定义一个 Pointcut, 使用 切点表达式函数 来描述对哪些 Join point 使用 advise
     */
    @Pointcut("within(com.gontoy.spring.service.SomeService)")
    public void pointcut() {
    }
    /**
     * 定义 advise
     */
    @Around("pointcut()")
    public Object methodInvokeExpiredTime(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        // 开始统计
        Object retVal = pjp.proceed();
        stopWatch.stop();
        // 结束统计

        // 上报到公司监控平台
        reportToMonitorSystem(pjp.getSignature().toShortString(), stopWatch.getTotalTimeMillis());

        return retVal;
    }
    public void reportToMonitorSystem(String methodName, long expiredTime) {
        logger.info("--- method {} invoked, expired time: {} ms ---", methodName, expiredTime);
    }
}
```

Controller 和 Service 正常编写即可，也是没有任何入侵：

```java
@Service
public class SomeService {
    private Logger logger = LoggerFactory.getLogger(getClass());
    public void someMethod() {
        logger.info("--- someMethod invoke ---");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
```





























:::info 参考

原文连接在这：[Java 全栈知识体系](https://pdai.tech/md/spring/spring-x-framework-aop.html)

:::