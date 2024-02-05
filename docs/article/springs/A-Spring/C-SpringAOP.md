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
timeline: true
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

- [SpringBoot使用AOP，PointCut表达式详解以及使用](https://blog.csdn.net/LuQiaoYa/article/details/88233846)

- [SpringBoot整合AOP超详细教程](https://blog.csdn.net/XiongHuyi/article/details/118417301)

- [Spring Validation最佳实践及其实现原理，参数校验没那么简单！](https://www.cnblogs.com/chentianming/p/13424303.html)

:::



## 前言

Spring AOP 的底层默认实现是基于动态代理。Spring 使用动态代理技术来实现面向切面编程（AOP），并提供了两种主要的代理机制：JDK 动态代理和CGLIB（Code Generation Library）动态代理。

1. JDK 动态代理：
   - JDK 动态代理是基于接口的代理，它要求目标对象必须实现一个或多个接口。
   - Spring AOP 默认使用 JDK 动态代理来代理那些实现了接口的目标对象。
   - JDK 动态代理使用 Java 的反射机制来创建代理对象，该代理对象实现了与目标对象相同的接口，并将方法调用委托给实际的目标对象，同时可以在方法调用前后添加横切关注点（Advice）。
2. CGLIB 动态代理（基于 ASM）：
   - CGLIB 动态代理是基于继承的代理，它可以代理那些没有实现接口的目标对象。
   - 如果目标对象没有实现任何接口，Spring AOP 会使用 CGLIB 动态代理来创建代理对象。
   - CGLIB 动态代理通过创建目标对象的子类来实现代理，然后在子类中重写需要拦截的方法，并在这些方法中添加横切关注点。

注意：Spring AOP 会根据目标对象是否实现了接口来选择使用哪种代理方式，默认情况下，它会尽量使用 JDK 动态代理，但如果目标对象没有实现接口，它将使用 CGLIB 动态代理。



### AspectJ

​	Spring AOP 具有与 AspectJ 集成的能力，允许你在 Spring 应用程序中使用 AspectJ 来定义和管理切面。AspectJ 是一个功能强大的切面编程框架，它提供了更灵活和强大的切面编程功能，相对于 Spring AOP 而言，它更加全面。

​	AspectJ 是一种功能强大的切面编程框架，它的底层是基于 Java 编程语言和字节码操作的。AspectJ 使用了 Java 语言的扩展性和灵活性，以及对字节码的操作，来实现切面编程的各种功能。

具体来说，AspectJ 的底层基于以下几个关键技术和原理：

1. **字节码操作（Bytecode Manipulation）**：AspectJ 使用字节码操作库，如ASM或cglib，来修改编译后的类文件的字节码。这使得它能够在编译后的类文件中插入切面代码，从而实现切面功能。AspectJ 通过在目标类的字节码中插入字节码指令来实现方法拦截和切面逻辑的织入。
2. **编译时织入（Compile-Time Weaving）**：AspectJ 提供了编译器，它能够在编译阶段将切面代码织入到目标类中。这种织入方式称为编译时织入，它确保了切面代码与目标类的字节码紧密结合，从而提供了高性能的切面功能。
3. **运行时织入（Runtime Weaving）**：AspectJ 也支持在运行时动态地织入切面代码。这种方式称为运行时织入，它允许在不修改编译后的类文件的情况下添加切面功能。AspectJ 使用类加载器和代理对象来实现运行时织入。
4. **切面表达式语言（AspectJ Expression Language）**：AspectJ 提供了一种强大的切面表达式语言，用于定义切点和切面。这个表达式语言允许你指定在哪些方法或代码段上应用切面，以及切面的行为。





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

- [彻底征服 Spring AOP 之 理论篇](https://segmentfault.com/a/1190000007469968)

- [彻底征服 Spring AOP 之 实战篇](https://segmentfault.com/a/1190000007469982)

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







## Advisor

在Spring AOP中，`AbstractPointcutAdvisor`是一个抽象基类，用于实现通用的切面（Aspect）功能。它实现了`PointcutAdvisor`接口，该接口是Advisor的子接口。Advisor是Spring AOP中的一个概念，表示一个切面，它包含了一个切入点（Pointcut）和一个通知（Advice）。

`AbstractPointcutAdvisor`的主要目的是简化切面的创建过程，提供一些通用的功能。它包含以下主要属性和方法：

1. **pointcut（切入点）：** 通过`getPointcut()`方法获取切入点对象。切入点定义了在何处应该应用通知。
2. **advice（通知）：** 通过`getAdvice()`方法获取通知对象。通知是在切入点处执行的具体逻辑，例如在方法执行前后执行的代码。
3. **order（顺序）：** 可以通过`setOrder(int order)`方法设置切面的执行顺序。执行顺序用于确定多个切面的执行顺序。
4. **advice bean名称：** 通过`setAdviceBeanName(String adviceBeanName)`方法设置通知bean的名称。

`AbstractPointcutAdvisor`的子类可以通过继承并实现相应的方法，或者直接实例化并设置切入点和通知，来创建特定的切面。它提供了一些基本的功能，同时也允许用户在子类中添加特定的定制逻辑。在Spring AOP中，切面是通过Advisor配置的，而`AbstractPointcutAdvisor`是其中的一个实现辅助类。

<br/>

在Spring AOP中，Advisor是通过`AdvisorAutoProxyCreator`这个后置处理器（BeanPostProcessor）来自动创建的。

Spring会自动检测`AbstractPointcutAdvisor`的实现，并且会在适当的时机（通常在应用上下文初始化完成后）通过`AdvisorAutoProxyCreator`来自动创建相应的代理。

在代理创建的过程中，`AdvisorAutoProxyCreator`会扫描容器中的`Advisor`，然后，它会检查实现类中的`Pointcut`和`Advice`，将它们应用到符合`Pointcut`定义的切入点的bean上，生成代理对象。

<br/>

使用`@Aspect`注解和使用`Advisor`的方式都是Spring AOP提供的切面创建方式，它们有一些区别，而选择使用哪一种方式通常取决于个人或团队的偏好以及项目需求。

使用`@Aspect`注解创建切面：

1. **声明式：** 使用`@Aspect`注解是一种声明式的方式，可以将切面逻辑与业务逻辑分离，增强了代码的可读性和可维护性。
2. **更灵活的切入点表达式：** `@Aspect`注解允许使用更灵活的切入点表达式，支持AspectJ表达式语言，可以更精确地定义切入点。
3. **自动代理创建：** Spring会自动检测使用`@Aspect`注解的类，并在运行时自动创建代理对象。

使用`Advisor`的方式：

1. **编程式：** 使用`Advisor`是一种编程式的方式，需要通过Java代码显式地创建`Advisor`对象，定义`Advice`和`Pointcut`。
2. **更多控制：** 使用`Advisor`的方式提供了更多的控制权，可以在代码中直接定义`Advice`和`Pointcut`的实现，更容易进行动态的配置。
3. **适用于复杂场景：** 对于一些复杂的场景，可能需要更灵活的配置和动态的切面逻辑，使用`Advisor`的方式更为适用。

选择的依据：

- **简单场景：** 如果项目中的切面逻辑比较简单，而且使用AspectJ表达式能够满足需求，那么使用`@Aspect`注解通常更为方便。
- **复杂场景：** 如果有复杂的业务需求，需要更灵活的控制，或者需要在运行时动态地添加或修改切面，那么使用`Advisor`的方式可能更合适。
- **个人偏好：** 有些开发者更喜欢声明式的方式，而有些开发者可能更倾向于编程式的方式。选择哪种方式通常也取决于开发者个人的偏好和习惯。









:::info 参考

原文连接在这：[Java 全栈知识体系](https://pdai.tech/md/spring/spring-x-framework-aop.html)

:::