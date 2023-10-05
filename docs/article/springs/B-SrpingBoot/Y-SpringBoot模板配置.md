---
title: "Spring boot 配置整合"
shortTitle: "Y-Spring boot 配置整合"
description: "Spring boot 配置整合"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-07-14
category: 
- "spring"
- "配置"
tag:
- "spring"
- "配置"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Spring boot 配置整合"
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
  title: "Spring boot 配置整合"
  description: "Spring boot 配置整合"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Spring boot 配置整合

[[toc]]

## 日志

:::info 说明

日志系统是一种记录应用程序在运行过程中所产生事件和状态信息的技术，用于在应用程序运行过程中定位和解决问题。而日志门面（Logging Facade）是一种编程接口，可以隐藏底层日志系统的细节，提供一致的API供应用程序使用，一般是编译时静态绑定真正的日志库

:::

**日志系统：**

1. java.util.logging (JUL)：官方自带
2. Log4j：Apache 开源，性能较低，一般不再使用（改成Logback 或者 Log4j2）
3. Logback：Log4j 同一创始人，有更好的特性
4. Log4j2：维护 Log4j 的团队为了改善性能而出的（性能最好，但是生态上 Logback+SLF4J 比较好）

**日志门面：**

1. common-logging
2. slf4j

**配置日志的注意点：**

- 支持日志路径，日志level等配置
- 日志控制配置通过application.yml下发
- 按天生成日志，当天的日志>50MB回滚
- 最多保存10天日志
- 生成的日志中Pattern自定义
- Pattern中添加用户自定义的MDC字段，比如用户信息(当前日志是由哪个用户的请求产生)，request信息。此种方式可以通过AOP切面控制，在MDC中添加requestID，在spring-logback.xml中配置Pattern。
- 根据不同的运行环境设置Profile - dev，test，product
- 对控制台，Err和全量日志分别配置
- 对第三方包路径日志控制

注：首选 **slf4j + logback**，另外这里还有 **桥接** 等用于迁移的概念，提一下，不展开说



### slf4j+logback

```xml
<!-- 开启日志 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
    <version>2.5.3</version>
</dependency>
```

```properties
# 修改日志级别为 trace
logging.level.com.xxx=trace
# 在当前项目下生成 springboot.log 日志文件
logging.file=springboot.log
# 这项设置与上一项只能同时存在一个，会在当前磁盘的根路径下创建 /spring/log 二级目录，并使用默认的 spring.log 作为日志文件
logging.path=/spring/log
```

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

**logback.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
	<!-- 日志存放路径 -->
	<property name="log.path" value="./logs" />
	<!-- 日志输出格式 -->
	<property name="log.pattern"
			  value="%d{HH:mm:ss.SSS} --- [%thread] %-5level %logger{20} - [%method,%line] - %msg%n" />

	<!-- 控制台输出 -->
	<appender name="console"
			  class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>${log.pattern}</pattern>
		</encoder>
	</appender>

	<!-- 系统日志输出 -->
	<appender name="file_info"
			  class="ch.qos.logback.core.rolling.RollingFileAppender">
		<file>${log.path}/sys-info.log</file>
		<!-- 循环政策：基于时间创建日志文件 -->
		<rollingPolicy
				class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<!-- 日志文件名格式 -->
			<fileNamePattern>${log.path}/sys-info.%d{yyyy-MM-dd}.log</fileNamePattern>
			<!-- 日志最大的历史 60天 -->
			<maxHistory>60</maxHistory>
		</rollingPolicy>
		<encoder>
			<pattern>${log.pattern}</pattern>
		</encoder>
		<filter class="ch.qos.logback.classic.filter.LevelFilter">
			<!-- 过滤的级别 -->
			<level>INFO</level>
			<!-- 匹配时的操作：接收（记录） -->
			<onMatch>ACCEPT</onMatch>
			<!-- 不匹配时的操作：拒绝（不记录） -->
			<onMismatch>DENY</onMismatch>
		</filter>
	</appender>

	<appender name="file_error"
			  class="ch.qos.logback.core.rolling.RollingFileAppender">
		<file>${log.path}/sys-error.log</file>
		<!-- 循环政策：基于时间创建日志文件 -->
		<rollingPolicy
				class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<!-- 日志文件名格式 -->
			<fileNamePattern>${log.path}/sys-error.%d{yyyy-MM-dd}.log</fileNamePattern>
			<!-- 日志最大的历史 60天 -->
			<maxHistory>60</maxHistory>
		</rollingPolicy>
		<encoder>
			<pattern>${log.pattern}</pattern>
		</encoder>
		<filter class="ch.qos.logback.classic.filter.LevelFilter">
			<!-- 过滤的级别 -->
			<level>ERROR</level>
			<!-- 匹配时的操作：接收（记录） -->
			<onMatch>ACCEPT</onMatch>
			<!-- 不匹配时的操作：拒绝（不记录） -->
			<onMismatch>DENY</onMismatch>
		</filter>
	</appender>

	<!-- 用户访问日志输出 -->
	<appender name="sys-user"
			  class="ch.qos.logback.core.rolling.RollingFileAppender">
		<file>${log.path}/sys-user.log</file>
		<rollingPolicy
				class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
			<!-- 按天回滚 daily -->
			<fileNamePattern>${log.path}/sys-user.%d{yyyy-MM-dd}.log</fileNamePattern>
			<!-- 日志最大的历史 60天 -->
			<maxHistory>60</maxHistory>
		</rollingPolicy>
		<encoder>
			<pattern>${log.pattern}</pattern>
		</encoder>
	</appender>

	<!-- 系统模块日志级别控制 -->
	<logger name="cn.xscrum" level="info" >
		<appender-ref ref="file_info" />
		<appender-ref ref="console" />
	</logger>
	<!-- Spring日志级别控制 -->
	<logger name="org.springframework" level="warn" />


	<!--系统操作日志 -->
	<root level="info">
		<appender-ref ref="file_info" />
		<appender-ref ref="file_error" />
		<appender-ref ref="console" />
	</root>

	<!--系统用户操作日志 -->
	<logger name="sys-user" level="info">
		<appender-ref ref="sys-user" />
	</logger>
</configuration> 
```





### log4j

> templates 包下的 log4j.properties

```properties
log4j.rootLogger=warn,CONSOLE,File

#Console
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
log4j.appender.CONSOLE.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss SSS} [%t] [%c] [%p] - %m%n

#File  DailyRollingFileAppender
log4j.logger.File=info
log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
log4j.appender.File.layout=org.apache.log4j.PatternLayout
log4j.appender.File.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss SSS} [%t] [%c] [%p] - %m%n
log4j.appender.File.datePattern='.'yyyy-MM-dd
log4j.appender.File.Threshold = info
log4j.appender.File.append=true
log4j.appender.File.File=d://AB-Pool-EN-Code-NA/AA-Area-EN-Java-NA/AB-Multi-EN-MyProject-YA/ResourceIntegrationTemplate/logs
```

```xml
<!-- log4j 日志 -->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.17.1</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.17.1</version>
</dependency>
```





### starter-logging

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
</dependency>
```

```yaml
# 修改日志级别为 trace
logging.level.com.xxx=trace
# 在当前项目下生成 springboot.log 日志文件
logging.file=springboot.log
# 这项设置与上一项只能同时存在一个，会在当前磁盘的根路径下创建 /spring/log 二级目录，	并使用默认的 spring.log 作为日志文件
logging.path=/spring/log
```

```java
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







## 安全

### Validation（入参校验）

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

:::info 说明

spring validation对hibernate validation进行了二次封装，在springmvc模块中添加了自动校验，并将校验信息封装进了特定的类中

:::

**JSR303/JSR-349**: JSR303是一项标准,只提供规范不提供实现，规定一些校验规范即校验注解，如@Null，@NotNull，@Pattern，位于javax.validation.constraints包下。**JSR-349是其的升级版本，添加了一些新特性**。

```java
@AssertFalse            被注释的元素只能为false
@AssertTrue             被注释的元素只能为true
@DecimalMax             被注释的元素必须小于或等于{value}
@DecimalMin             被注释的元素必须大于或等于{value}
@Digits                 被注释的元素数字的值超出了允许范围(只允许在{integer}位整数和{fraction}位小数范围内)
@Email                  被注释的元素不是一个合法的电子邮件地址
@Future                 被注释的元素需要是一个将来的时间
@FutureOrPresent        被注释的元素需要是一个将来或现在的时间
@Max                    被注释的元素最大不能超过{value}
@Min                    被注释的元素最小不能小于{value}
@Negative               被注释的元素必须是负数
@NegativeOrZero         被注释的元素必须是负数或零
@NotBlank               被注释的元素不能为空
@NotEmpty               被注释的元素不能为空
@NotNull                被注释的元素不能为null
@Null                   被注释的元素必须为null
@Past                   被注释的元素需要是一个过去的时间
@PastOrPresent          被注释的元素需要是一个过去或现在的时间
@Pattern                被注释的元素需要匹配正则表达式"{regexp}"
@Positive               被注释的元素必须是正数
@PositiveOrZero         被注释的元素必须是正数或零
@Size                   被注释的元素个数必须在{min}和{max}之间
```

**hibernate validation**：hibernate validation是对这个规范的实现，并增加了一些其他校验注解，如@Email，@Length，@Range等等

```java
@CreditCardNumber       被注释的元素不合法的信用卡号码
@Currency               被注释的元素不合法的货币 (必须是{value}其中之一)
@EAN                    被注释的元素不合法的{type}条形码
@Email                  被注释的元素不是一个合法的电子邮件地址  (已过期)
@Length                 被注释的元素长度需要在{min}和{max}之间
@CodePointLength        被注释的元素长度需要在{min}和{max}之间
@LuhnCheck              被注释的元素${validatedValue}的校验码不合法, Luhn模10校验和不匹配
@Mod10Check             被注释的元素${validatedValue}的校验码不合法, 模10校验和不匹配
@Mod11Check             被注释的元素${validatedValue}的校验码不合法, 模11校验和不匹配
@ModCheck               被注释的元素${validatedValue}的校验码不合法, ${modType}校验和不匹配  (已过期)
@NotBlank               被注释的元素不能为空  (已过期)
@NotEmpty               被注释的元素不能为空  (已过期)
@ParametersScriptAssert 被注释的元素执行脚本表达式"{script}"没有返回期望结果
@Range                  被注释的元素需要在{min}和{max}之间
@SafeHtml               被注释的元素可能有不安全的HTML内容
@ScriptAssert           被注释的元素执行脚本表达式"{script}"没有返回期望结果
@URL                    被注释的元素需要是一个合法的URL
@DurationMax            被注释的元素必须小于${inclusive == true ? '或等于' : ''}${days == 0 ? '' : days += '天'}${hours == 0 ? '' : hours += '小时'}${minutes == 0 ? '' : minutes += '分钟'}${seconds == 0 ? '' : seconds += '秒'}${millis == 0 ? '' : millis += '毫秒'}${nanos == 0 ? '' : nanos += '纳秒'}
@DurationMin            被注释的元素必须大于${inclusive == true ? '或等于' : ''}${days == 0 ? '' : days += '天'}${hours == 0 ? '' : hours += '小时'}${minutes == 0 ? '' : minutes += '分钟'}${seconds == 0 ? '' : seconds += '秒'}${millis == 0 ? '' : millis += '毫秒'}${nanos == 0 ? '' : nanos += '纳秒'}
```





### Shiro

```xml
<!-- shiro -->
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring</artifactId>
    <version>1.5.2</version>
</dependency>
```



### JWT

```xml
<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```







## 数据库

### 前置知识

`driver-class-name`用于指定JDBC驱动程序的类名，以便JVM能够加载并创建对应的数据库驱动程序实例。每个数据库厂商都会提供自己的JDBC驱动程序，因此每个驱动程序类名都可能不同。

以下是一些常见的JDBC驱动程序的`driver-class-name`名称：

- MySQL: `com.mysql.cj.jdbc.Driver`
- Oracle: `oracle.jdbc.driver.OracleDriver`
- PostgreSQL: `org.postgresql.Driver`
- SQL Server: `com.microsoft.sqlserver.jdbc.SQLServerDriver`

需要注意的是，不同版本的JDBC驱动程序的类名也可能会有所不同，因此在使用时应该根据具体的驱动程序版本来确定`driver-class-name`。





### JPA

:::info 说明

JPA（Java Persistence API）是Java的一种标准ORM（对象关系映射）规范。

JPA规范并不依赖于具体的数据库实现，而是依赖于JDBC（Java Database Connectivity）来访问数据库，因此JPA可以操作任何兼容JDBC的关系型数据库，包括但不限于MySQL、Oracle、SQL Server、PostgreSQL等。不同的数据库厂商会提供不同的JDBC驱动，开发人员可以根据实际情况选择相应的驱动使用。

:::

![SpringBootDataJPA](https://www.pdai.tech/images/db/mongo/mongo-x-usage-spring-5.png)

> H2是一个基于Java的嵌入式关系型数据库，支持标准的SQL语法和JDBC API。
>
> 在Spring Boot中，我们可以使用JPA来操作H2数据库。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
```

```yaml
spring:
  datasource:
    data: classpath:db/data.sql
    driverClassName: org.h2.Driver
    password: sa
    platform: h2
    schema: classpath:db/schema.sql
    url: jdbc:h2:mem:dbtest
    username: sa
  h2:
    console:
      enabled: true
      path: /h2
      settings:
        web-allow-others: true
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

```java
// 实体类
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    // getters and setters
}
```

```java
// 仓库
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
```

```java
// 使用
@SpringBootApplication
public class DemoApplication implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        userRepository.save(new User("Alice", "alice@example.com"));
        userRepository.save(new User("Bob", "bob@example.com"));
    }
}
```





### JPA – H2

**好处：**

1. 纯 Java 编写，只有一个 jar 包，适合作为嵌入式数据库
2. 支持标准的 SQL 和 JDBC
3. 支持服务器模式和集群
4. 可以做为缓存，作为 NoSQL 的补充，可以拿它当Memcached使，作为后端MySQL/Oracle的一个缓冲层

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <scope>runtime</scope>
</dependency>
```

```properties
# H2 Database Configuration
spring.h2.console.enabled=true
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
```

启动应用程序，访问 `http://localhost:8080/h2-console` 可以进入H2数据库控制台，进行数据库的操作。

也可以使用其他方式，如使用JPA配置等。引入H2数据库的好处是轻量级，适用于开发和测试环境，同时提供了方便的控制台工具，便于对数据库进行操作和管理。





### JPA – MySQL

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<!-- jpa-spec --->
<dependency>
    <groupId>com.github.wenhao</groupId>
    <artifactId>jpa-spec</artifactId>
    <version>3.1.0</version>
</dependency>
```

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test_db?useSSL=false&autoReconnect=true&characterEncoding=utf8
    driver-class-name: com.mysql.jdbc.Driver
    username: root
    password: xxxxxxxxx
    initial-size: 20
    max-idle: 60
    max-wait: 10000
    min-idle: 10
    max-active: 200
  jpa:
    generate-ddl: false
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true
        use-new-id-generator-mappings: false
```







### Druid

:::info 说明

Druid是一个高性能的数据库连接池，它能够提供很多有用的功能，如监控和统计功能、防御SQL注入攻击等，同时能够优化数据库的性能和可靠性。通过配置Druid，应用程序可以使用连接池来管理数据库连接，减少应用程序和数据库之间的连接开销，提高系统的响应速度和稳定性。

:::

```xml
<!-- Druid 数据源，场景启动 -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.18</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```

```yml
spring:
  datasource:
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      type: com.alibaba.druid.pool.DruidDataSource
      url: jdbc:mysql://localhost:3306/templates?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
      username: root
      password: 123456
      # 初始化时建立物理连接数的个数
      initialSize : 5
      # 最大连接池的个数
      maxActive: 20
      # 最小连接池的个数
      minIdle: 5
      # 获取连接时的最大等待时间，单位为毫秒
      maxWait: 60000
      # 配置间隔多久才进行以一次检测，检测时需要关闭的空闲连接，单位是毫秒
      timeBetweenEvictionRunsMillis: 60000
      # 连接保持空闲而不被驱逐的最小时间
      minEvictableIdleTimeMillis: 300000
      # 用来检测是否是是有效的 sql，要求是一个查询语句
      validationQuery: SELECT 1 FROM DUAL
      # 申请连接时检测，如果有空闲时间大于 timeBetweenEvictionRunsMillis 执行 validationQuery 检测连接是否有效。
      testWhileIdle: true
      # 申请连接时执行 validationQuery 检测连接是否有效，该配置会降低性能
      testOnBorrow: false
      # 归还连接时执行 validationQuery 检测连接是否有效，该配置会降低性能
      testOnReturn: false
      # 是否缓存 preparedStatement，也就是 PSCache。PSCache 对支持游标的数据库性能提升巨大，比如说 oracle。在 mysql 下建议关闭。
      poolPreparedStatements: true
      # 要启用 PSCache，必须配置大于 0，当大于 0 时，poolPreparedStatements 自动触发修改为 true。
      maxPoolPreparedStatementPerConnectionSize: 50
      # 配置监控统计拦截的 filters，去掉后监控界面 sql 无法统计.
      # stat: 监控统计  log4j: 日志记录  wall: 防御 sql 注入
      filters: stat,wall
      # 通过connectProperties属性来打开mergeSql功能；慢SQL记录
      connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
      # 合并多个 DruidDataSource 的监控数据
      useGlobalDataSourceStat: true

```

> DruidConfig.java

```java
package com.gzw.rit.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 16271
 */
@Configuration
public class DruidConfig {
    /**
     * 绑定数据源
     */
    @ConfigurationProperties(prefix = "spring.datasource.druid")
    @Bean
    public DataSource druid() {
        return new DruidDataSource();
    }

    /**
     * 配置 Druid 的监控
     * 配置一个管理后台的 servlet
     */
    @Bean
    public ServletRegistrationBean statViewServlet() {
        ServletRegistrationBean bean = new ServletRegistrationBean<>(new StatViewServlet(), "/druid/*");
        Map<String, String> initParams = new HashMap<>();
        initParams.put("loginUsername", "admin");
        initParams.put("loginPassword", "123456");
        // 默认全部允许访问
        initParams.put("allow", "");
        bean.setInitParameters(initParams);
        return bean;
    }

    /**
     * 配置一个 web 监控的 filter
     */
    @Bean
    public FilterRegistrationBean webStatFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new WebStatFilter());
        Map<String, String> initParams = new HashMap<>();
        initParams.put("exclusions", "*.js,*.css,/druid/*");
        bean.setInitParameters(initParams);
        bean.setUrlPatterns(Arrays.asList("/*"));
        return bean;
    }
}
```

除了Druid（当前最为全面）之外，还有其他的一些替代方案，如：

1. HikariCP（Spring Boot 的默认连接池）：一个轻量级的、高性能的JDBC连接池，它的特点是快速启动、低资源消耗和稳定性好。
2. Tomcat JDBC Pool：一个基于Tomcat连接池的JDBC连接池实现，具有高性能和高可靠性。
3. （淘汰）Apache Commons DBCP：一个开源的高性能的JDBC连接池实现，支持多种数据库和多种连接管理策略。
4. （淘汰）DBCP2：Apache Commons DBCP 的升级版，提供了更好的性能和更好的稳定性，支持多个关系型数据库。
5. （淘汰）BoneCP：另一个快速且轻量级的开源 JDBC 连接池库，可以与多个关系型数据库一起使用，包括 MySQL、Oracle、PostgreSQL、Microsoft SQL Server 等等。
6. （淘汰）C3P0 是一个开源的 JDBC 连接池库，它提供了连接池的实现和管理。它的数据源可以是各种关系型数据库。







### Mybatis

:::info 相关概念

简化对象关系映射（ORM），具体映射就是：

1. 数据库的表 –> Java
2. 记录（行数据）–> 对象
3. 字段 –> 对象的属性

:::

> 要在启动类上加 @MapperScan

```xml
<!-- Mybatis 场景启动 -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

<!-- 或者 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>
<!--pagehelper分页 -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.10</version>
</dependency>
```

> mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<settings>
		<setting name="cacheEnabled" value="true" />  <!-- 全局映射器启用缓存 -->
		<setting name="useGeneratedKeys" value="true" />  <!-- 允许 JDBC 支持自动生成主键 -->
		<setting name="defaultExecutorType" value="REUSE" /> <!-- 配置默认的执行器 -->
		<setting name="logImpl" value="SLF4J" /> <!-- 指定 MyBatis 所用日志的具体实现 -->
		<setting name="aggressiveLazyLoading" value="true" /> <!-- 指定 MyBatis 不启用延迟加载 -->
		 <setting name="mapUnderscoreToCamelCase" value="true"/> <!-- 驼峰式命名 -->
	</settings>
</configuration>
```

> mapper.xml 示例

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.gzw.rit.mapper.UserMapper">

    <resultMap id="UserResult" type="com.gzw.rit.domain.User">
        <result property="id" column="id" />
        <result property="username" column="username" />
        <result property="password" column="password" />
    </resultMap>

    <select id="getUserByName" parameterType="String" resultMap="UserResult">
        select username, password from test where username = #{username}
    </select>
</mapper>
```

```yml
# mybatis 的配置
mybatis:
  # 搜索指定包别名
  typeAliasesPackage: com.xxx.xxx.domain
  # mybatis 配置文件的位置
  config-location: classpath:mybatis/mybatis-config.xml
  # 映射文件的位置
  mapper-locations: classpath:mapper/**/*Mapper.xml
```

**补充：**

Mybatis 支持三种类型的数据源配置：

1. 没有数据库连接池的（UNPOOLED）
2. 有数据库连接池的（POOLED）
3. 使用JNDI实现的数据源





### Mybatis Plus+代码生成配置

| 功能                 | MyBatis                                           | MyBatis-Plus                                                 |
| -------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| 代码生成器           | ❌                                                 | ✔️ （支持生成 entity、mapper、service、controller、xml 等代码） |
| AR 模式              | ❌                                                 | ✔️ （ActiveRecord 模式，支持链式操作）                        |
| 分页插件             | ❌ （需要手动编写 SQL，调用分页插件 API 进行分页） | ✔️ （自动进行分页，支持多种数据库分页方式）                   |
| 条件构造器           | ❌ （需要手动拼接 SQL）                            | ✔️ （提供强大的条件构造器，支持链式操作）                     |
| SQL 注入器           | ❌                                                 | ✔️ （支持 SQL 防注入）                                        |
| 多租户支持           | ❌                                                 | ✔️ （支持多种租户模式）                                       |
| 元对象处理器         | ❌                                                 | ✔️ （支持自定义处理 entity 对象）                             |
| 全局配置             | ✔️ （全局配置文件 mybatis-config.xml）             | ✔️ （全局配置对象 GlobalConfig）                              |
| 映射器配置           | ✔️ （映射器配置文件 mapper.xml）                   | ❌                                                            |
| 自动填充             | ❌ （需要手动在 insert 和 update 语句中填充值）    | ✔️ （支持注解和接口方式的自动填充）                           |
| 乐观锁插件           | ❌ （需要手动在 update 语句中添加乐观锁判断）      | ✔️ （支持自动添加乐观锁判断）                                 |
| SQL 性能分析插件     | ❌                                                 | ✔️ （支持打印慢 SQL、动态 SQL 执行分析）                      |
| 动态表名支持         | ❌ （需要手动拼接 SQL）                            | ✔️ （支持动态替换表名）                                       |
| 复杂查询条件构造器   | ❌ （需要手动拼接 SQL）                            | ✔️ （支持嵌套查询、or 条件、and 条件等）                      |
| 根据 ID 集合批量查询 | ❌ （需要手动编写 SQL，使用 foreach 循环）         | ✔️ （支持根据 ID 集合批量查询）                               |
| 动态 SQL             | ✔️ （支持使用 XML 和注解方式编写动态 SQL）         | ✔️ （支持使用 Lambda 表达式和 Wrapper 来编写动态 SQL）        |
| 数据库字段名自动转换 | ❌ （需要手动在 resultMap 中进行字段映射）         | ✔️ （支持自动进行驼峰和下划线之间的转换）                     |
| 分页插件多租户支持   | ❌                                                 | ✔️ （支持多种租户模式）                                       |

```xml
<!-- Mybatis Plus 场景启动 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.1</version>
</dependency>

<!-- velocity 模板引擎，用于 Mybatis Plus 生成代码 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.4.1</version>
</dependency>
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.3</version>
</dependency>
```

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test_db?useSSL=false&autoReconnect=true&characterEncoding=utf8
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: bfXa4Pt2lUUScy8jakXf

mybatis-plus:
  configuration:
    cache-enabled: true
    use-generated-keys: true
    default-executor-type: REUSE
    use-actual-param-name: true
```

> CodeGenerator.java

```java
package com.gzw.rit.generator;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import org.junit.jupiter.api.Test;


/**
 * @author
 * @since 2018/12/13
 */
public class CodeGenerator {

    @Test
    public void run() {

        // 1、创建代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 2、全局配置
        GlobalConfig gc = new GlobalConfig();
        gc.setOutputDir("D:\\AB-Pool-EN-Code-NA\\AA-Area-EN-Java-NA\\AB-Multi-EN-MyProject-YA\\ResourceIntegrationTemplate" + "/src/main/java/com/gzw/rit");
        gc.setAuthor("testJava");
        gc.setOpen(false); //生成后是否打开资源管理器
        gc.setFileOverride(false); //重新生成时文件是否覆盖
        gc.setServiceName("%sService");	//去掉Service接口的首字母I
        gc.setIdType(IdType.ID_WORKER); //主键策略
        gc.setDateType(DateType.ONLY_DATE);//定义生成的实体类中日期类型
        gc.setSwagger2(true);//开启Swagger2模式

        mpg.setGlobalConfig(gc);

        // 3、数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/templates?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8");
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("123456");
        dsc.setDbType(DbType.MYSQL);
        mpg.setDataSource(dsc);

        // 4、包配置
        PackageConfig pc = new PackageConfig();
        pc.setModuleName(""); //模块名
        pc.setParent("");
        pc.setController("controller");
        pc.setEntity("domain");
        pc.setService("service");
        pc.setMapper("mapper");
        mpg.setPackageInfo(pc);

        // 5、策略配置
        StrategyConfig strategy = new StrategyConfig();
        strategy.setInclude("test");
        strategy.setNaming(NamingStrategy.underline_to_camel);//数据库表映射到实体的命名策略
        strategy.setTablePrefix(pc.getModuleName() + "_"); //生成实体时去掉表前缀

        strategy.setColumnNaming(NamingStrategy.underline_to_camel);//数据库表字段映射到实体的命名策略
        strategy.setEntityLombokModel(true); // lombok 模型 @Accessors(chain = true) setter链式操作

        strategy.setRestControllerStyle(true); //restful api风格控制器
        strategy.setControllerMappingHyphenStyle(true); //url中驼峰转连字符

        mpg.setStrategy(strategy);


        // 6、执行
        mpg.execute();
    }
}
```





### Sharding JDBC

:::info 说明

Sharding-JDBC是ShardingSphere的第一个产品，也是ShardingSphere的前身。 它定位为轻量级Java框架，在Java的JDBC层提供的额外服务。它使用客户端直连数据库，以jar包形式提供服务，无需额外部署和依赖，可理解为增强版的JDBC驱动，完全兼容JDBC和各种ORM框架。

1. 适用于任何基于Java的ORM框架，如：JPA, Hibernate, Mybatis, Spring JDBC Template或直接使用JDBC。

2. 基于任何第三方的数据库连接池，如：DBCP, C3P0, BoneCP, Druid, HikariCP等。

3. 支持任意实现JDBC规范的数据库。目前支持MySQL，Oracle，SQLServer和PostgreSQL。

:::



```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.10</version>
</dependency>
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
    <version>4.1.1</version>
</dependency>
```

```yaml
spring:
  shardingsphere:
    datasource:
      names: ds
      ds:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/test_db_sharding?allowPublicKeyRetrieval=true&useSSL=false&autoReconnect=true&characterEncoding=utf8
        username: test
        password: bfXa4Pt2lUUScy8jakXf
    sharding:
      tables:
        tb_user:
          actual-data-nodes: ds.tb_user_$->{0..1}
          table-strategy:
            inline:
              sharding-column: id
              algorithm-expression: tb_user_$->{id % 2}
          key-generator:
            column: id
            type: SNOWFLAKE
            props:
              worker:
                id: 123
      binding-tables: tb_user
      broadcast-tables: t_address
mybatis:
  type-aliases-package: xxx.xxx.xxxx.shardingjdbc.mybatis.tables.entity
  configuration:
    cache-enabled: true
    use-generated-keys: true
    default-executor-type: REUSE
    use-actual-param-name: true
```





### Jedis

:::info 说明

Jedis是Redis的Java客户端，在SpringBoot 1.x版本中也是默认的客户端。在SpringBoot 2.x版本中默认客户端是Luttuce。

:::

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <exclusions>
        <exclusion>
            <artifactId>lettuce-core</artifactId>
            <groupId>io.lettuce</groupId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>2.9.0</version>
</dependency>
```

```yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    password: test
    jedis:
      pool:
        min-idle: 0
        max-active: 8
        max-idle: 8
        max-wait: -1ms
    connect-timeout: 30000ms
```

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        template.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
        template.afterPropertiesSet();
        return template;
    }
}
```







### Lettuce

:::info 说明

Lettuce 是一个可伸缩线程安全的 Redis 客户端。多个线程可以共享同一个 RedisConnection。它利用优秀 netty NIO 框架来高效地管理多个连接。

:::

Jedis 是直连模式，在多个线程间共享一个 Jedis 实例时是线程不安全的，如果想要在多线程环境下使用 Jedis，需要使用连接池，每个线程都去拿自己的 Jedis 实例，当连接数量增多时，物理连接成本就较高了。

Lettuce 是基于 netty 的，连接实例可以在多个线程间共享，所以，一个多线程的应用可以使用一个连接实例，而不用担心并发线程的数量。

```xml
<dependency>
  <groupId>io.lettuce</groupId>
  <artifactId>lettuce-core</artifactId>
  <version>x.y.z.BUILD-SNAPSHOT</version>
</dependency>

<!-- Spring Boot 2.x 默认使用了 lettuce -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>2.9.0</version>
</dependency>
```

```yaml
spring:
  redis:
    database: 0
    host: 127.0.0.1
    port: 6379
    password: test
    lettuce:
      pool:
        min-idle: 0
        max-active: 8
        max-idle: 8
        max-wait: -1ms
    connect-timeout: 30000ms
```

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        template.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
        template.afterPropertiesSet();
        return template;
    }
}
```





### Redission

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.21.0</version>
</dependency>
```







### ElasticSearch

下面一定要指定版本，Spring Boot 的默认版本是 6.8.5

```xml
<properties>
    <java.version>1.8</java.version>
    <elasticsearch.version>7.5.1</elasticsearch.version>
</properties>

<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch-rest-high-level-client</artifactId> 
    <version>7.5.1</version>
</dependency>
```

**配置类：**

```java
@Configuration
public class ElasticSearchConfig {
    public static final RequestOptions COMMON_OPTIONS;
    static {
        RequestOptions.Builder builder = RequestOptions.DEFAULT.toBuilder();
        // TODO 加入自定义配置
        COMMON_OPTIONS = builder.build();
    }
    @Bean
    public RestHighLevelClient esRestClient() {
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("192.168.30.100", 9200, "http"))
        );
        return client;
    }
}

```

**测试：**

```java
void indexData() throws IOException {
    IndexRequest indexRequest = new IndexRequest("users");
    indexRequest.id("1");
    User user = new User();
    user.setId(1);
    String json = JSON.toJSONString(user);
    indexRequest.source(json, XContentType.JSON);
    IndexResponse index = client.index(indexRequest, ElasticSearchConfig.COMMON_OPTIONS);
    System.out.println(index);
}
```



<br/>





### 补充

**多租户：**

多租户模式指的是在一个系统中支持多个租户（Tenant）共享相同的系统资源，每个租户都有自己独立的数据和业务逻辑。租户可以是企业、组织、团队等，租户之间相互隔离，彼此独立，互不干扰。

多租户模式的应用场景非常广泛，尤其在SaaS（Software as a Service）等云服务领域得到广泛应用。例如，一个在线会议系统可以为多个企业提供会议服务，每个企业都有自己的会议数据和配置信息，但是它们共享同一个会议系统，这时就需要使用多租户模式来实现租户之间的数据隔离和业务逻辑隔离。

在使用 MyBatis-Plus 进行多租户开发时，可以使用以下两种租户模式：

1. 数据库隔离：每个租户有自己独立的数据库，系统在访问数据库时需要根据租户信息动态切换数据库连接。
2. 表隔离：所有租户共享一个数据库，但是每个租户有自己独立的数据表。系统在访问数据时需要动态替换表名。





## 缓存







## 文件

### POI – Word/PDF/Excel

```xml
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.2</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.2</version>
</dependency>
```





### Easy Excel

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>3.1.1</version>
</dependency>


<!-- 或者直接使用启动器 -->
<dependency>
    <groupId>cn.afterturn</groupId>
    <artifactId>easypoi-spring-boot-starter</artifactId>
    <version>4.4.0</version>
</dependency>
```





### Itext – PDF

> 要特别注意协议问题，商用要收费

```xml
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itextpdf</artifactId>
    <version>5.5.13.3</version>
</dependency>
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itext-asian</artifactId>
    <version>5.2.0</version>
</dependency>
```







## 打包部署

### Docker

```xml
<build>
    <!-- 固定的jar的名字，这样Dockerfile可以固定写 -->
    <finalName>springboot-demo-helloworld</finalName>
    <!-- 构建的插件 -->
    <plugins>
        <!-- springboot构建jar -->
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
        <!-- 构建docker镜像 -->
        <plugin>
            <groupId>com.spotify</groupId>
            <artifactId>docker-maven-plugin</artifactId>
            <version>1.2.2</version>
            <executions>
                <execution>
                    <id>build-image</id>
                    <phase>package</phase>
                    <goals>
                        <goal>build</goal>
                    </goals>
                </execution>
            </executions>
            <configuration>
                <!-- image 的名字 -->
                <imageName>${project.build.finalName}</imageName>
                <!-- image 的tag, 可以是多个 -->
                <imageTags>
                    <imageTag>latest</imageTag>
                    <imageTag>${project.version}</imageTag>
                </imageTags>
                <!-- Dockerfile所在的目录 -->
                <dockerDirectory>${project.basedir}</dockerDirectory>
                <!-- 复制jar到docker的位置 -->
                <resources>
                    <resource>
                        <targetPath>/</targetPath>
                        <!--jar 包所在的路径，对应target目录-->
                        <directory>${project.build.directory}</directory>
                        <!-- 包含的jar　-->
                        <include>${project.build.finalName}.jar</include>
                    </resource>
                </resources>
            </configuration>
        </plugin>
    </plugins>
</build>
```









## 其他

### 热重启

> https://www.cnblogs.com/pkukhq/p/17202760.html

```xml
<!-- 热部署 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <version>2.3.7.RELEASE</version>
    <!-- 启用 -->
    <optional>true</optional>
</dependency>
```

```yml
spring:
  # 应用名称
  application:
    name: xxx
  # 热重启
  thymeleaf:
    cache: false
# 应用服务 WEB 访问端口
server:
  port: 8080
```





### thymeleaf

> https://www.cnblogs.com/pkukhq/p/17202760.html

```xml
<!-- thymeleaf 场景启动 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

```yml
spring:
  # 热重启
  thymeleaf:
    cache: false
    check-template: true
    check-template-location: true
    #开启MVC thymeleaf 视图解析
    enabled: true
    encoding: utf-8
    mode: HTML5
    prefix: classpath:/templates/
    suffix: .html
```



### lombok

```xml
<!-- lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```





### Swagger

```xml
<!--swagger-->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>

<!--或者-->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
public Docket webApiConfig(){
    return new Docket(DocumentationType.SWAGGER_2)
            .groupName("webApi")
            .apiInfo(webApiInfo())
            .select()
            .build();
    }

    private ApiInfo webApiInfo(){
        return new ApiInfoBuilder()
                .title("xxx 接口文档")
                .description("本文档描述了 xxx 微服务接口定义")
                .version("1.0")
                .contact(new Contact("xxx", "http://xxx.com", "xxx@qq.com"))
                .build();
    }
}
```

或者

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

```yaml
server:
  port: 8080
knife4j:
  enable: true
  documents:
    - group: Test Group
      name: My Documents
      locations: classpath:wiki/*
  setting:
    # default lang
    language: en-US
    # footer
    enableFooter: false
    enableFooterCustom: true
    footerCustomContent: MIT
    # header
    enableHomeCustom: true
    homeCustomLocation: classpath:wiki/README.md
    # models
    enableSwaggerModels: true
    swaggerModelName: My Models
```





### Jetty

> Jetty 更加轻量，更符合分布式环境的需求，可以将默认的 Tomcat 替换成 Jetty

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <groupId>org.springframework.boot</groupId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```





### Undertow

> Undertow 性能方面比 Jetty 和 Tomcat 好，同样可以将默认的 Tomcat 替换成 Undertow

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <groupId>org.springframework.boot</groupId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>
```



### Actuator

> 监控工具

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- 或者 -->
<!-- 需要在启动类上加上 @EnableAdminServer -->
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
    <version>2.5.3</version>
</dependency>
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.5.3</version>
</dependency>
```

```yaml
spring:
  boot:
    admin:
      client:
        url: 'http://localhost:8080'
management:
  endpoints:
    enabled-by-default: true
    web:
      base-path: /manage
      exposure:
        include: '*'
```

加上 JMX：

```xml
<dependency>
    <groupId>org.jolokia</groupId>
    <artifactId>jolokia-core</artifactId>
</dependency>
```

```yaml
spring:
  jmx:
    enabled: true
```

