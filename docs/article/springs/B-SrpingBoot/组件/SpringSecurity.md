---
notPage: true
---





# Spring Security

> 相关文章：
>
> - [【全网最细致】SpringBoot整合Spring Security + JWT实现用户认证](https://blog.csdn.net/qq_44709990/article/details/123082560)
>
> - [芋道 Spring Boot 安全框架 Spring Security 入门](https://www.iocoder.cn/Spring-Boot/Spring-Security/)
>
> 相关视频：[SpringSecurity框架教程-Spring Security+JWT实现项目级前端分离认证授权](https://www.bilibili.com/video/BV1mm4y1X7Hc/?p=17&spm_id_from=pageDriver&vd_source=e356fec025b50061af78324a814f8da0)

![认证授权流程](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//springsecurity/20231112/%E8%AE%A4%E8%AF%81%E6%8E%88%E6%9D%83%E6%B5%81%E7%A8%8B.png)



![image-20230617124448361](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//springsecurity/20231112/jwt.png)

```xml
<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>${jjwt.version}</version>
</dependency>


<!-- Hutool 工具类-->
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>${hutool.version}</version>
</dependency>
```

原理就是一个过滤链，内部提供了各种功能的过滤器：

过滤器（大致一共有 15个）：

1. UsernamePasswordAuthenticationFilter
2. ExceptionTranslationFilter
3. FilterSecurityInterceptor

1. WebAsyncManagerIntegrationFilter：将 Security 上下文与 Spring Web 中用于处理异步请求映射的 WebAsyncManager 进行集成。
2. SecurityContextPersistenceFilter：在每次请求处理之前将该请求相关的安全上下文信息加载到 SecurityContextHolder 中，然后在该次请求处理完成之后，将 SecurityContextHolder 中关于这次请求的信息存储到一个“仓储”中，然后将 SecurityContextHolder 中的信息清除，例如在Session中维护一个用户的安全信息就是这个过滤器处理的。
3. HeaderWriterFilter：用于将头信息加入响应中。
4. CsrfFilter：用于处理跨站请求伪造。
5. Logout Filter：用于处理退出登录。
6. UsernamePasswordAuthenticationFilter：用于处理基于表单的登录请求，从表单中获取用户名和密码。默认情况下处理来自 /login 的请求。从表单中获取用户名和密码时，默认使用的表单 name 值为 username 和 password，这两个值可以通过设置这个过滤器的usernameParameter 和 passwordParameter 两个参数的值进行修改。
7. DefaultLoginPageGeneratingFilter：如果没有配置登录页面，那系统初始化时就会配置这个过滤器，并且用于在需要进行登录时生成一个登录表单页面。
8. BasicAuthenticationFilter：检测和处理 http basic 认证。
9. RequestCacheAwareFilter：用来处理请求的缓存。
10. SecurityContextHolderAwareRequestFilter：主要是包装请求对象request。
11. AnonymousAuthenticationFilter：检测 SecurityContextHolder 中是否存在 Authentication 对象，如果不存在为其提供一个匿名 Authentication。
12. SessionManagementFilter：管理 session 的过滤器
13. ExceptionTranslationFilter：处理 AccessDeniedException 和 AuthenticationException 异常。
14. FilterSecurityInterceptor：可以看做过滤器链的出口
15. RememberMeAuthenticationFilter：当用户没有登录而直接访问资源时, 从 cookie 里找出用户的信息, 如果 Spring Security 能够识别出用户提供的remember me cookie, 用户将不必填写用户名和密码, 而是直接登录进入系统，该过滤器默认不开启。

基础接口：

1. Authentication：它的实现类表示当前访问系统的用户，即封装了用户相关信息
2. AuthenticationManager：定义了认证 Authentication 的方法
3. UserDetailsService：加载用户特定数据的核心接口，定义了一个根据用户名查询用户信息的方法
4. UserDetails：提供核心用户信息，通过 UserDetailsService 根据当前用户名获取处理的用户信息，返回 UserDetails 对象，然后将这些信息封装到 Authentication 对象中

大致分为两大部分：

1. 登录：
   1. 自定义登录接口，调用 ProviderManager 进行认证
   2. 自定义 UserDetailsService 实现从数据库中查询信息
   3. 认证通过则生成 JWT，随后可以存入 Redis 中
2. 校验：
   1. 定义 JWT 认证过滤器：获取 token，解析 token 中的 userId，从 Redis 中获取用户信息
   2. 存入 SecurityContextHolder
