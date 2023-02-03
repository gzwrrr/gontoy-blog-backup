# Spring Cloud 简单使用



![springCloud](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Springs\SpringCloud\SpringCloudAlibaba.assets\springCloud.png)

![image-20220212202341628](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Springs\SpringCloud\SpringCloudAlibaba.assets\image-20220212202341628.png)



# 概述

- [Spring Cloud 官网](https://spring.io/projects/spring-cloud)

## 生态

1. Spring Cloud NetFlix —— 旧一站式解决方案
2. Apache Dubbo Zookeeper（注册与发现） —— 半自动解决方案
3. ***Spring Cloud Alibaba —— 新一站式解决方案**

**重点关注的问题：**

1. 服务注册和发现：
   - ~~eureka~~ √
   - Zookeeper √
   - Consul √
   - Nacos √
2. 服务负载均衡与调用：
   - ~~ribbon~~ / LoadBalancer
   - ~~Feign~~ / OpenFeign
3. 服务熔断与降级：
   - ~~hystrix~~
   - ~~resilience4j~~
   - sentienl
4. 服务消息队列
5. 配置中心管理：
   - ~~Spring Cloud Config~~
   - Nacos
6. 服务网关：
   - ~~Zuul~~
   - gateway
7. 服务总线
   - ~~Bus~~
   - Nacos
8. 服务监控
9. 全链路追踪
10. 自动化构建部署
11. 服务定时任务调度操作



# 工程构建

## 1.父项目

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>org.gontoy</groupId>
  <artifactId>SpringCloudAlibaba</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>pom</packaging>

  <modules>
    <module>cloud-provider-payment-8001</module>
      <module>cloud-consumer-order7999</module>
      <module>cloud-api-commons</module>
    <module>cloud-eureka-server7001</module>
  </modules>

  <!--统一管理jar包版本-->
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>12</maven.compiler.source>
    <maven.compiler.target>12</maven.compiler.target>
    <junit.version>4.12</junit.version>
    <lombok.version>1.18.10</lombok.version>
    <log4j.version>1.2.17</log4j.version>
    <mysql.version>8.0.18</mysql.version>
    <druid.version>1.1.16</druid.version>
    <mybatis.spring.boot.version>2.1.1</mybatis.spring.boot.version>
  </properties>

  <dependencyManagement>
    <dependencies>
      <!--spring boot 2.2.2-->
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-dependencies</artifactId>
        <version>2.2.2.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>

      <!--spring cloud Hoxton.SR1-->
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-dependencies</artifactId>
        <version>Hoxton.SR1</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>

      <!--spring cloud alibaba 2.1.0.RELEASE-->
      <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-alibaba-dependencies</artifactId>
        <version>2.1.0.RELEASE</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>

      <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>${mysql.version}</version>
      </dependency>
      <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>${druid.version}</version>
      </dependency>
      <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>${mybatis.spring.boot.version}</version>
      </dependency>

      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>${junit.version}</version>
      </dependency>
      <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>${log4j.version}</version>
      </dependency>

      <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>${lombok.version}</version>
        <optional>true</optional>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
          <fork>true</fork>
          <addResources>true</addResources>
        </configuration>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.6.1</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```



## 2.工具类

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-api-commons</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.4</version>
        </dependency>
    </dependencies>

</project>
```



## 3.Eureka 服务

**虽然之后不使用 Eureka，但是也需要了解**

![image-20220930170624591](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Springs\SpringCloud\SpringCloudAlibaba.assets\image-20220930170624591.png)

主启动类加上 `@EnableEurekaServer`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-eureka-server7001</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>

    </dependencies>

</project>
```

```yaml
server:
  port: 7011

eureka:
  instance:
    hostname: localhost
  client:
    # 不需要将自己注册进Eureka注册中心
    register-with-eureka: false
    # 表示自己就是服务中心,职责是维护服务实例,并不需要检索服务
    fetch-registry: false
    service-url:
      #设置与eureka server交互的地址查询服务和注册服务都需要依赖这个地址
      defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```





## 4.Payment 模块

主启动类加上 `@EnableEurekaClient`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-provider-payment-8001</artifactId>

    <dependencies>
        <!--Eureka-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 8001

spring:
  application:
    name: cloud-payment-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
#    url: jdbc:mysql://localhost:3306/springcloud_db_01?useUnicode=true&characterEncoding=utf-8&useSSL=false
    url: jdbc:mysql://localhost:3306/springcloud_db_01?characterEncoding=utf-8&useUnicode=true&useSSL=false&serverTimezone=UTC
    username: root
    password: 123456

eureka:
  client:
    # 是否从EurekaServer抓取已有的注册信息，默认为true，单节点无所谓
    # 集群必须设置为 true，才能配置ribbon使用
    fetch-registry: true
    register-with-eureka: true
    service-url:
      defaultZone: http://localhost:7011/eureka

mybatis:
  mapperLocations: classpath:mapper/*.xml
  type-aliases-package: com.gontoy.springcloud.entities
```



## 5.Consumer 模块

主启动类加上 `@EnableEurekaClient`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumer-order7999</artifactId>


    <dependencies>
        <!--Eureka-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 7999

eureka:
  client:
    # 是否从EurekaServer抓取已有的注册信息，默认为true，单节点无所谓
    # 集群必须设置为 true，才能配置ribbon使用
    fetch-registry: true
    register-with-eureka: true
    service-url:
      defaultZone: http://localhost:7011/eureka
```

**远程调用的配置类:**

```java
/**
 * 远程调用配置类
 */
@Configuration
public class ApplicationContextConfig {
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

**远程调用示例：**

```java
@Slf4j
@RestController
@RequestMapping("/consumer/payment")
public class ConsumerController {
    public static final String PAYMENT_URL = "http://localhost:8001";
    
    @Resource
    private RestTemplate restTemplate;

    @GetMapping(value = "/getPayment/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id")  Long id) {
        log.info("ConsumerController getPaymentById | id:{}", id);
        return restTemplate.getForObject(String.format("%s/payment/getPayment/%d", PAYMENT_URL, id), CommonResult.class);
    }

    @GetMapping(value = "/create")
    public CommonResult<Integer> create(Payment payment) {
        log.info("ConsumerController create | payment:{}", payment);
        return restTemplate.postForObject(String.format("%s/payment/create", PAYMENT_URL), payment, CommonResult.class);
    }
}
```



## 6.Zookeeper 模块

主启动类上加上 `@EnableDiscoveryClient`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-provider-payment-8003</artifactId>


    <dependencies>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 8003

spring:
  application:
    name: cloud-payment-service
  cloud:
    zookeeper:
      connect-string: 192.168.30.100:2181
```



## 7.Consul 模块

主启动类上加上 `@EnableDiscoveryClient`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-provider-payment-8004</artifactId>

    <dependencies>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 8004

spring:
  application:
    name: cloud-payment-service
  cloud:
    zookeeper:
      connect-string: ${spring.application.name}
```





## 8.OpenFeign 模块

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumer-feign-order-7996</artifactId>


    <dependencies>
        <!-- OpenFeign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!--Eureka-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 7996

spring:
  application:
    name: cloud-consumer-order

eureka:
  client:
    # 是否从EurekaServer抓取已有的注册信息，默认为true，单节点无所谓
    # 集群必须设置为 true，才能配置ribbon使用
    fetch-registry: true
    register-with-eureka: true
    service-url:
      defaultZone: http://eureka7001.com:7011/eureka/,http://eureka7002.com:7012/eureka/
```





## 9.Hystrix 模块

### 9.1 Hystrix 服务模块

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-provider-hystrix-payment-8005</artifactId>

    <dependencies>
        <!--Eureka-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 8005

spring:
  application:
    name: cloud-payment-service

eureka:
  client:
    # 是否从EurekaServer抓取已有的注册信息，默认为true，单节点无所谓
    # 集群必须设置为 true，才能配置ribbon使用
    fetch-registry: true
    register-with-eureka: true
    service-url:
      defaultZone: http://eureka7001.com:7011/eureka/
```

**主启动类上加上服务发现和服务熔断的注解：**

```java
@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker
public class HystrixApplication8005 {
    public static void main(String[] args) {
        SpringApplication.run(HystrixApplication8005.class, args);
    }
}
```



### 9.2 Hystrix  消费模块

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumer-feign-hystrix-order-7995</artifactId>


    <dependencies>
        <!-- OpenFeign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!-- hystrix -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>


</project>
```

```yaml
server:
  port: 7995

spring:
  application:
    name: cloud-consumer-order

eureka:
  client:
    # 是否从EurekaServer抓取已有的注册信息，默认为true，单节点无所谓
    # 集群必须设置为 true，才能配置ribbon使用
    fetch-registry: true
    register-with-eureka: true
    service-url:
      defaultZone: http://eureka7001.com:7011/eureka/

feign:
  hystrix:
    enabled: true
```

**主启动类上加上服务调用和服务降级的注解：**

```java
@SpringBootApplication
@EnableFeignClients
@EnableHystrix
public class ConsumerApplication7995 {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication7995.class, args);
    }
}
```



### 9.3 Hystrix Dashboard

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumer-hystrix-dashboard-9001</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>

    </dependencies>

</project>
```

```yaml
server:
  port: 9001
```

```java
@SpringBootApplication
@EnableHystrixDashboard
public class HystrixDashboardApplication9001 {
    public static void main(String[] args) {
        SpringApplication.run(HystrixDashboardApplication9001.class, args);
    }
}
```

**确保在需要监控的服务上的 Pom 文件中加上：**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

**然后在主启动类上加上：**

```java
@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker
public class HystrixApplication8005 {
    public static void main(String[] args) {
        SpringApplication.run(HystrixApplication8005.class, args);
    }

    /**
     * 下面的配置是为了让服务监控生效而配置的，与服务容错本身无关，这是 Spring Cloud 升级后的问题
     * ServletRegistrationBean 在 Spring Boot 的默认路径不是 "/hystrix.stream"
     * 只要配置下面的 servlet 即可
     */
    @Bean
    public ServletRegistrationBean getServlet() {
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }
}
```





## 10.Gateway 模块

```yaml
server:
  port: 9527

eureka:
  client:
    # 是否从EurekaServer抓取已有的注册信息，默认为true，单节点无所谓
    # 集群必须设置为 true，才能配置ribbon使用
    fetch-registry: true
    register-with-eureka: true
    service-url:
      defaultZone: http://localhost:7345/eureka


spring:
  application:
    name: cloud-gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true
      routes:
        - id: payment_routh
          uri: lb://CLOUD-PAYMENT-SERVICE
          predicates:
            - Path=/payment/hystrix/success/**

        - id: payment_routh2
          uri: lb://CLOUD-PAYMENT-SERVICE
          predicates:
            - Path=/payment/hystrix/fail/**
```

```java
@SpringBootApplication
@EnableEurekaClient
public class GatewayApplication9527 {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication9527.class, args);
    }
}
```

**过滤器配置示例：**

```java
@Slf4j
@Component
public class GatewayFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("GatewayFilter:{}", new Date());
        String uName = exchange.getRequest().getQueryParams().getFirst("uname");
        if (uName == null) {
            log.info("非法用户");
            exchange.getResponse().setStatusCode(HttpStatus.NOT_ACCEPTABLE);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 0;
    }
}
```





## 11.Config 模块

### 11.1 配置总控中心

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-config-center-3344</artifactId>


    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>

        <!--Eureka-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 3344

spring:
  application:
    name: cloud-config-center
  cloud:
    config:
      server:
        git:
          uri: https://github.com/xxx/SpringCloudConfig.git
          search-paths:
            - SpringCloudConfig
      label: master

eureka:
  client:
    service-url:
      defaultZone: http://localhost:7011/eureka
```

```java
@SpringBootApplication
@EnableConfigServer
public class ConfigCenterApplication3344 {
    public static void main(String[] args) {
        SpringApplication.run(ConfigCenterApplication3344.class, args);
    }
}
```



### 11.2 配置客户端

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-config-client-3355</artifactId>


    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-config</artifactId>
        </dependency>

        <!--Eureka-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

**bootstrap.yml：**

```yml
server:
  port: 3355

spring:
  application:
    name: cloud-config-client
  cloud:
    config:
      label: master
      name: config
      profile: dev
      uri: http://localhost:3344


eureka:
  client:
    service-url:
      defaultZone: http://localhost:7011/eureka

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

```java
@EnableEurekaClient
@SpringBootApplication
public class ConfigClientApplication3355 {
    public static void main(String[] args) {
        SpringApplication.run(ConfigClientApplication3355.class, args);
    }
}
```

**测试读取配置：**

```java
@RestController
// 动态读取的注解
@RefreshScope
public class ConfigClientController {
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/configInfo")
    public String getConfigInfo() {
        return configInfo;
    }
}
```

**注：更改完仓库的配置后需要发送一个 POST 请求才能动态读取配置，这里使用 curl 发送 POST 请求：**

```bash
curl -X POST "http://localhost:3355/actuator/refresh"
```



## 12.Bus 模块

注：需要有 RabbitMQ 的环境，这里环境配置不是重点就不赘述了

**在 Config 服务端和客户端的 pom.xml 中都加入 RabbitMQ 的支持：**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
```

**服务端配置文件修改如下：**

```yaml
server:
  port: 3344

spring:
  application:
    name: cloud-config-center
  cloud:
    config:
      server:
        git:
          uri: https://github.com/xxx/SpringCloudConfig.git
          search-paths:
            - SpringCloudConfig
      label: master
  rabbitmq:
    host: xxx.xxx.xxx.xxx
    port: 5672
    username: xxx
    password: xxx


eureka:
  client:
    service-url:
      defaultZone: http://localhost:7011/eureka

# rabbitmq 相关的配置，暴露 bus 刷新配置的断点
management:
  endpoints:
    web:
      exposure:
        include: "bus-refresh"
```

**客户端的配置修改如下：**

```yaml
server:
  port: 3355

spring:
  application:
    name: cloud-config-client
  cloud:
    config:
      label: master
      name: config
      profile: dev
      uri: http://localhost:3344
  rabbitmq:
    host: xxx.xxx.xxx.xxx
    port: 5672
    username: xxx
    password: xxx


eureka:
  client:
    service-url:
      defaultZone: http://localhost:7011/eureka

# 暴露监控端点
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

**注：更改完仓库的配置后需要发送一个 POST 请求给服务端才能让客户端动态读取配置，这里使用 curl 发送 POST 请求；这样与上面对比就只用发送一次请求就能修改所有的配置：**

```bash
curl -X POST "http://localhost:3344/actuator/bus-refresh"
```

**定点通知某一个客户端（port 替换成对应的端口，cloud-config-client 是对应微服务的名称）：**

```bash
curl -X POST "http://localhost:3344/actuator/bus-refresh/cloud-config-client:port"
```



## 13.Stream 模块

> 这里使用的消息中间件是 RabbitMQ

**服务端搭建：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-stream-rabbitmq-provider-8006</artifactId>



    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
</project>
```

```yml
server:
  port: 8006

spring:
  application:
    name: cloud-stream-provider
  # 设置 rabbitmq 的相关的环境配置
  rabbitmq:
    host: xxx.xxx.xxx.xxx
    port: 5672
    username: xxx
    password: xxx
  cloud:
    stream:
      # 配置要绑定的 rabbitmq 的服务信息
      binders:
        # 表示定义的名称，用于 binding 整合
        defaultRabbit:
          # 消息组件类型
          type: rabbit
      # 服务整合处理
      bindings:
        # 这是一个通道的名称
        output:
          # 表示要使用的 Exchange 的名称
          destination: studyExchange
          # 设置消息类型
          content-type: application/json
          # 设置要绑定的消息服务的具体设置
          binder: defaultRabbit

eureka:
  client:
    service-url:
      defaultZone: http://localhost:7011/eureka
#  instance:
#    # 设置心跳的时间间隔（默认是30秒）
#    lease-renewal-interval-in-seconds: 2
#    # 如果现在超过了5秒的间隔（默认是90秒）
#    lease-expiration-duration-in-seconds: 5
#    # 在信息列表时显示主机名称
#    instance-id: send-8801.com
#    # 访问的路径变为IP地址
#    prefer-ip-address: true
```

```java
@SpringBootApplication
@EnableEurekaClient
public class StreamMQApplication8006 {
    public static void main(String[] args) {
        SpringApplication.run(StreamMQApplication8006.class, args);
    }
}
```

```java
/**
 * @EnableBinding(Source.class) 定义消息的推送管道
 */
@Slf4j
@EnableBinding(Source.class)
public class MessageProviderServiceImpl implements MessageProviderService {

    /**
     * 消息发送的管道
     */
    @Resource
    private MessageChannel output;


    @Override
    public String send() {
        String serial = UUID.randomUUID().toString();
        output.send(MessageBuilder.withPayload(serial).build());
        log.info("MessageProviderServiceImpl send | serial:" + serial);
        return null;
    }
}
```

```java
@RestController
public class SendMessageController {
    @Resource
    private MessageProviderService messageProviderService;

    @GetMapping(value = "/sendMessage")
    public String sendMessage() {
        return messageProviderService.send();
    }
}
```

**客户端搭建（集群直接复制即可）：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-stream-rabbitmq-consumer-8007</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 8007

spring:
  application:
    name: cloud-stream-provider
  # 设置 rabbitmq 的相关的环境配置
  rabbitmq:
    host: xxx.xxx.xxx.xxx
    port: 5672
    username: xxx
    password: xxx
  cloud:
    stream:
      # 配置要绑定的 rabbitmq 的服务信息
      binders:
        # 表示定义的名称，用于 binding 整合
        defaultRabbit:
          # 消息组件类型
          type: rabbit
      # 服务整合处理
      bindings:
        # 这是一个通道的名称
        input:
          # 表示要使用的 Exchange 的名称
          destination: studyExchange
          # 设置消息类型
          content-type: application/json
          # 设置要绑定的消息服务的具体设置
          binder: defaultRabbit
          # 设置分组，如果不是同一个组会出现重复消费的问题，还可以起到持久化的作用，故障停机再重启还是能消费之前未消费的信息，所以一定要配置分组
          group: gontoyA

eureka:
  client:
    service-url:
      defaultZone: http://localhost:7011/eureka
#  instance:
#    # 设置心跳的时间间隔（默认是30秒）
#    lease-renewal-interval-in-seconds: 2
#    # 如果现在超过了5秒的间隔（默认是90秒）
#    lease-expiration-duration-in-seconds: 5
#    # 在信息列表时显示主机名称
#    instance-id: send-8801.com
#    # 访问的路径变为IP地址
#    prefer-ip-address: true
```

```java
@SpringBootApplication
@EnableEurekaClient
public class StreamMQApplication8007 {
    public static void main(String[] args) {
        SpringApplication.run(StreamMQApplication8007.class, args);
    }
}
```

```java
@Slf4j
@Component
@EnableBinding(Sink.class)
public class ReceiveMessageListenerController {

    @Value("${server.port}")
    private String serverPort;

    @StreamListener(Sink.INPUT)
    public void receiveMessage(Message<String> message) {
        log.info("ReceiveMessageListenerController 消费者-1 | message:" + message.getPayload() + " | port:" + serverPort);
    }
}
```





## 14.Sleuth/Zinkin 模块

**在 Payment 客户端和服务端模块的 Pom.xml 中加上：**

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

**在 Payment 客户端和服务端模块的 application.yml 中加上：**

```yaml
spring:
  zipkin:
    base-url: http://localhost:9411
  sleuth:
    sampler:
      # 采样率，介于 0 和 1 之间，1 表示全部采集
      probability: 1
```

**在服务端的 Controller 加上下面的代码测试：**

```java
/**
 * 测试 zipkin
 */
@GetMapping(value = "/zipkin")
public String zipkin() {
    return "Hello zipkin";
}
```

**在客户端的 Controller 加上下面的代码测试：**

```java
/**
 * 测试 zipkin
 */
@GetMapping(value = "/zipkin")
public String zipkin() {
    String result = restTemplate.getForObject(String.format("%s/payment/zipkin", PAYMENT_URL), String.class);
    return "Hello zipkin";
}
```



## 15.Nacos 模块

### 15.1 服务注册

**服务端：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-alibaba-provider-payment-9001</artifactId>


    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>

    </dependencies>

</project>
```

```yaml
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848

management:
  endpoints:
    web:
      exposure:
        include: "*"
```

```java
@EnableDiscoveryClient
@SpringBootApplication
public class AlibabaProviderPaymentApplication9001 {

    public static void main(String[] args) {
        SpringApplication.run(AlibabaProviderPaymentApplication9001.class, args);
    }

}
```

```java
@RestController
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id) {
        return "getPayment | nacos registry | serverPort: " + serverPort + " | id:" + id;
    }
}
```

**客户端：**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-alibaba-consumer-order-9101</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>

    </dependencies>

</project>
```

```yaml
server:
  port: 9101

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848

# 这个是消费者需要访问的微服务名称
service-url:
  nacos-user-service: http://nacos-payment-provider
```

```java
@EnableDiscoveryClient
@SpringBootApplication
public class AlibabaConsumerOrderApplication9101 {

    public static void main(String[] args) {
        SpringApplication.run(AlibabaConsumerOrderApplication9101.class, args);
    }

}
```

```java
/**
 * 配置类
 */
@Configuration
public class ApplicationContextConfig {
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

```java
/**
 * 控制器
 */
@Slf4j
@RestController
@RequestMapping("/consumer/payment")
public class OrderNacosController {

    @Value("${service-url.nacos-user-service}")
    private String serverUrl;

    @Resource
    private RestTemplate restTemplate;

    @GetMapping(value = "/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id) {
        return restTemplate.getForObject(serverUrl + "/payment/nacos/" + id, String.class);
    }
}
```



<br/>

### 15.2 配置中心

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-alibaba-config-nacos-client-3377</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>

    </dependencies>

</project>
```

```yaml
# application.yml
spring:
  profiles:
    active: dev
```

```yaml
# bootstrap.yml
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
      config:
        server-addr: localhost:8848
        file-extension: yaml
        group: DEV_GROUP
        namespace: 1f1da0d7-da89-4cd7-9b58-959dd8ca9ec7

# 读取配置文件的规则
# ${prefix}-${spring.profile.active}.${file-extension}
# prefix：默认为 spring.application.name
# spring.profile.active 是使用的环境，可以为空但是不建议
# file-extension 是配置文件的后缀名（文件格式），支持 yaml 和 properties
# 例如这里想要读取 Nacos 上的 dev 配置文件，那么 Nacos 就要命名为：nacos-config-client-dev.yaml
```

```java
@SpringBootApplication
@EnableDiscoveryClient
public class NacosConfigClientApplication3377 {
    public static void main(String[] args) {
        SpringApplication.run(NacosConfigClientApplication3377.class, args);
    }
}
```

```java
/**
 * @RefreshScope 用于开启 Nacos 支持的动态刷新功能
 */
@RestController
@RefreshScope
public class ConfigClientController {
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }
}
```



<br/>

## 16.Sentinel 模块

### 16.1 降级熔断

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-alibaba-sentinel-service-3355</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba.csp</groupId>
            <artifactId>sentinel-datasource-nacos</artifactId>
        </dependency>

        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>

    </dependencies>

</project>
```

```yaml
server:
  port: 3355

spring:
  application:
    name: cloud-sentinel-service
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    sentinel:
      transport:
        # 说明 3355 会被 8080 的 sentinel 监控
        dashboard: localhost:8080
        # 默认 8719 端口，如果没有找到就一直 +1 直到找到未占用的端口
        port: 8719

management:
  endpoints:
    web:
      exposure:
        include: "*"
```

```java
@EnableDiscoveryClient
@SpringBootApplication
public class SentinelServiceApplication3355 {
    public static void main(String[] args) {
        SpringApplication.run(SentinelServiceApplication3355.class, args);
    }
}
```

```java
@Slf4j
@RestController
@RequestMapping("/sentinel")
public class FlowLimitController {
    @GetMapping("/flowLimit")
    public String flowLimit() {
        return "FlowLimitController | Flow Limit";
    }
}
```



<br/>

# 知识点

## 1.Eureka 集群

> 防止单点故障

在 windows 上，修改 hosts 文件，用不同域名区分不同的 eureka 服务，不修改配置也行

修改 yml 配置，让不同的 eureka 服务相互绑定

```yaml
# 服务端 eureka7002.com 的操作类似
server:
  port: 7011

eureka:
  instance:
    hostname: eureka7001.com
  client:
    # 不需要将自己注册进Eureka注册中心
    register-with-eureka: false
    # 表示自己就是服务中心,职责是维护服务实例,并不需要检索服务
    fetch-registry: false
    service-url:
      #设置与eureka server交互的地址查询服务和注册服务都需要依赖这个地址
      defaultZone: http://eureka7002.com:7012/eureka/
```

**改变客户端的配置：**

```yaml
# 其他客户端配置类似 
server:
  port: 7999

spring:
  application:
    name: cloud-consumer-order

eureka:
  client:
    # 是否从EurekaServer抓取已有的注册信息，默认为true，单节点无所谓
    # 集群必须设置为 true，才能配置ribbon使用
    fetch-registry: true
    register-with-eureka: true
    service-url:
      # 注册进两个服务端
      defaultZone: http://eureka7001.com:7011/eureka/,http://eureka7002.com:7012/eureka/
```

**两台集群搭建完的效果：**

- 注：客户端也搭建集群，但是客户端只需要修改端口号即可

![image-20220930174429748](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Springs\SpringCloud\SpringCloudAlibaba.assets\image-20220930174429748.png)

**负载均衡：**

注：如果想要请求实现负载均衡，那么请求地址不能写死（不能指定特定的端口），请求地址要写 eureka 上的服务名称

```java
public static final String PAYMENT_URL = "http://CLOUD-PAYMENT-SERVICE";
```

修改 RestTemplate 的配置

```java
/**
 * 远程调用配置类
 */
@Configuration
public class ApplicationContextConfig {
    @Bean
    // 负载均衡的注解
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

**开启服务发现：**

在主启动类上加上 `@EnableDiscoveryClient`

```java
@Slf4j
@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Resource
    private DiscoveryClient discoveryClient;

    @GetMapping(value = "/discovery")
    public Object discovery() {
        List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");
        for (ServiceInstance instance : instances) {
            log.info("ServerId:{} | Host:{} | Port:{} | Uri:{}", instance.getInstanceId(), instance.getHost(), instance.getPort(), instance.getUri());
        }
        return discoveryClient;
    }
}
```

**故障保护机制：**

- 属于 CAP 里面的 AP 分支
- 某时某个微服务不可用后，不会立即清理，而是依旧保留该微服务的信息



## 2.客户端连接 Zookeeper

主启动类加上 `@EnableDiscoveryClient`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumerzk-order7998</artifactId>

    <dependencies>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 7998

spring:
  application:
    name: cloud-consumer-order
  cloud:
    zookeeper:
      connect-string: 192.168.30.100:2181
```

**填写配置：**

```java
@Configuration
public class ApplicationContextConfig {
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

**测试接口：**

```java
@Slf4j
@RestController
@RequestMapping("/consumer")
public class OrderZookeeperController {
    public static final String INVOKE_URL = "http://cloud-payment-service";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping(value = "/payment/zookeeper")
    public String paymentInfo() {
        return restTemplate.getForObject(String.format("%s/payment/zookeeper", INVOKE_URL), String.class);
    }
}
```





## 3.客户端连接 Consul

主启动类加上 `@EnableDiscoveryClient`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>SpringCloudAlibaba</artifactId>
        <groupId>org.gontoy</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloud-consumercs-order-7997</artifactId>


    <dependencies>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.gontoy</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>

</project>
```

```yaml
server:
  port: 7997

spring:
  application:
    name: cloud-consumer-order
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        service-name: ${spring.application.name}
```

**填写配置：**

```java
@Configuration
public class ApplicationContextConfig {
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }
}
```

**测试接口：**

```java
@Slf4j
@RestController
@RequestMapping("/consumer/payment")
public class ConsumerController {
    public static final String INVOKE_URL = "http://cloud-payment-service";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping(value = "/consul")
    public String paymentInfo() {
        return restTemplate.getForObject(String.format("%s/payment/consul", INVOKE_URL), String.class);
    }
}
```



## 4.Ribbon 负载均衡策略替换

**Ribbon 的负载均衡实现（7）：**

- RoundRobinRule：轮询

- RandomRule：随机
- RetryRule：获取服务失败时重试
- WeightedResponseTimeRule：响应速度快的服务权重大（更容易被选择）
- BestAvaliableRule：过滤掉由于多次访问故障而处于断路器跳闸状态的服务，之后选择一个并发量最小的服务
- AvaliablilityFilteringRule：先过滤掉故障实例，再选择并发较小的实例
- ZoneAvoidanceRule：默认规则，复合判断 server 所在区域的性能和 server 的可用性选择服务

**在消费者模块中加入以下配置以更改负载均衡策略（注册中心这里使用 Eureka）：**

```java
// 注意：配置类不能在主启动类能扫描到的包中，即不能在下面所示的 com.gontoy.springcloud 包中
package com.gontoy.myrule;

public class MyRibbonRule {
    @Bean
    public IRule myRule() {
        return new RandomRule();
    }
}
```

```java
package com.gontoy.springcloud;

@SpringBootApplication
@EnableEurekaClient
// 较新版的 Eureka 中自带了 Ribbon，Pom 可以不用修改
@RibbonClient(name = "CLOUD-PAYMENT-SERVICE", configuration = MyRibbonRule.class)
public class ConsumerApplication7999 {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication7999.class, args);
    }
}
```

p42 未学



## 5.OpenFeign 基本使用

主启动类加上 `@EnableFeignClients`

```java
@SpringBootApplication
@EnableFeignClients
public class ConsumerApplication7996 {
    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication7996.class, args);
    }
}
```

**Service 与服务提供方接口保持一致：**

```java
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE")
public interface PaymentFeignService {

    @GetMapping(value = "/payment/getPayment/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id")  Long id);

}
```

**控制层与之前一样：**

```java
@Slf4j
@RestController
@RequestMapping("/consumer/payment")
public class OrderFeignController {

    @Resource
    private PaymentFeignService paymentFeignService;

    @GetMapping(value = "/getPayment/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id")  Long id) {
        return paymentFeignService.getPaymentById(id);
    }
}
```

**配置日志级别：**

```java
@Configuration
public class FeignConfig {
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
```

```yaml
# yml 加入如下配置
logging:
  level: 
    com.gontoy.springcloud.service.PaymentFeignService: debug
```





## 6.Hystrix 服务降级

### 6.1 方法单独降级

**服务端：**

- 只要服务端的服务不可用了（超时、抛异常、宕机），就做服务降级
- 服务端使用注解配置：一旦服务调用失败抛出错误信息，就自动调用 `@HystrixCommand` 标注好的 `fallbackMethod` 方法
- 注意：主启动类上要加上注解：`@EnableCircuitBreaker`

```java
@Service
public class PaymentService {

    /**
     * 下面的注解表示：
     * 超过 3 秒就服务降级，调用 paymentInfoTimeoutHandler 方法
     */
    @HystrixCommand(fallbackMethod = "paymentInfoTimeoutHandler", commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
    })
    public String paymentInfoTimeout(Integer id) {
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Thread：" + Thread.currentThread().getName() + " paymentInfoTimeout | id:" + id;
    }

    /**
     * 服务超时时，服务降级，返回这个函数兜底
     */
    public String paymentInfoTimeoutHandler(Integer id) {
        return "Thread：" + Thread.currentThread().getName() + " paymentInfoTimeoutHandler | id:" + id;
    }
}
```

**客户端：**

- 客户端也可以做服务降级
- 注意：在主启动类上加上注解：`@EnableHystrix`
- 在客户端的配置文件加上

```yaml
feign:
  hystrix:
    enabled: true
```

- 修改客户端的控制层

```java
@Slf4j
@RestController
@RequestMapping("/consumer/payment")
public class PaymentHystrixController {
    @Resource
    private PaymentHystrixService paymentHystrixService;

    @Value("${server.port}")
    private String port;
    
    /**
     * 下面的注解表示：
     * 超过 1.5 秒就服务降级，调用 paymentInfoTimeoutHandler 方法
     */
    @GetMapping("/hystrix/fail/{id}")
    @HystrixCommand(fallbackMethod = "paymentInfoTimeoutHandler", commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "1500")
    })
    public String paymentInfoTimeout(@PathVariable("id") Integer id) {
        String result = paymentHystrixService.paymentInfoTimeout(id);
        log.info("PaymentHystrixController paymentInfoTimeout | result:{}", result);
        return result;
    }

    /**
     * 服务超时时，服务降级，返回这个函数兜底
     */
    public String paymentInfoTimeoutHandler(Integer id) {
        return "Thread：" + Thread.currentThread().getName() + " consumer paymentInfoTimeoutHandler | id:" + id;
    }
}
```



### 6.2 全局服务降级

- 注意：在主启动类上加上注解：`@EnableHystrix`
- 在客户端的配置文件加上

```yaml
feign:
  hystrix:
    enabled: true
```

- 控制器上加上注解：`@DefaultProperties(defaultFallback = "paymentInfoGlobalHandler")`
- 需要使用全局服务降级方法的接口加上注解：`@HystrixCommand`

```java
@Slf4j
@RestController
@RequestMapping("/consumer/payment")
@DefaultProperties(defaultFallback = "paymentInfoGlobalHandler")
public class PaymentHystrixController {
    @Resource
    private PaymentHystrixService paymentHystrixService;

    @Value("${server.port}")
    private String port;

    /**
     * 下面的注解表示：
     * 服务不可用时使用全局的服务降级方法
     */
    @GetMapping("/hystrix/fail2/{id}")
    @HystrixCommand
    public String paymentInfoTimeoutTwo(@PathVariable("id") Integer id) {
        String result = paymentHystrixService.paymentInfoTimeout(id);
        log.info("PaymentHystrixController paymentInfoTimeout | result:{}", result);
        return result;
    }

    /**
     * 全局的服务降级对应的方法
     */
    public String paymentInfoGlobalHandler() {
        return "Global 全局异常处理，请稍后再试";
    }
}
```

- 可以看出，使用上面的全局降级会使配置混杂在业务中，此时也可以使用实现类的方式实现服务降级

- 修改服务接口的注解，添加：`fallback = PaymentHystrixServiceImpl.class`，注意这里是写**实现类**

```java
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE", fallback = PaymentHystrixServiceImpl.class)
public interface PaymentHystrixService {
    @GetMapping(value = "/payment/hystrix/success/{id}")
    public String paymentInfo(@PathVariable("id") Integer id);

    @GetMapping(value = "/payment/hystrix/fail/{id}")
    public String paymentInfoTimeout(@PathVariable("id") Integer id);
}
```

- 增加这个服务接口的实现类

```java
@Component
public class PaymentHystrixServiceImpl implements PaymentHystrixService {

    @Override
    public String paymentInfo(@PathVariable("id") Integer id) {
        return "paymentInfo | 使用实现类的方式实现服务降级 | id:" + id;
    }

    @Override
    public String paymentInfoTimeout(@PathVariable("id") Integer id) {
        return "paymentInfoTimeout | 使用实现类的方式实现服务降级 | id:" + id;
    }
}
```



## 7.Hystrix 服务熔断

```java
@Service
public class PaymentService {
    /**
     * 开启服务熔断
     */
    @HystrixCommand(fallbackMethod = "paymentCircuitBreakerFallback", commandProperties = {
            // 是否开启断路器
            @HystrixProperty(name = "circuitBreaker.enabled", value = "true"),
            // 请求次数
            @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
            // 时间窗口期
            @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000"),
            // 失败率到达多少时跳闸
            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "60")
    })
    public String paymentCircuitBreakerk(@PathVariable("id") Integer id) {
        if (id < 0) {
            throw new RuntimeException("id 不能为负数");
        }
        // 这里使用到了 hutool
        String serialNumber = IdUtil.simpleUUID();
        return Thread.currentThread().getName() + " 调用成功 | 流水号：" + serialNumber;
    }

    public String paymentCircuitBreakerFallback(@PathVariable("id") Integer id) {
        return "paymentCircuitBreakerFallback | id 不能为负数，请稍后再试";
    }
}
```





## 8.消息驱动集群搭建

**存在的问题：**

- 在 Stream 中处于同一个 group 中的多个消费者是竞争关系时，才能保证消息只被消费一次
- 不同组是可以全面消费的（重复消费）
- 默认不同的消费者分组时不同的（组流水号不同），也就是可以重复消费，所以需要配置消费者在同一个分组

pass



# 对比

![image-20221019154657051](C:\Users\gzw\AppData\Roaming\Typora\typora-user-images\image-20221019154657051.png)

CAP：Consistency（一致性）、Availability（可用性）、Partition Tolerance（分区容错性）

| 名称      | 实现语言 | CAP   | 服务健康检查 | 对外暴露接口 | SpringCloud 集成 |
| --------- | -------- | ----- | ------------ | ------------ | ---------------- |
| Eureka    | Java     | AP    | 支持         | HTTP         | 已集成           |
| Zookeeper | Java     | CP    | 不支持       | 客户端       | 已集成           |
| Consul    | Go       | CP    | 支持         | HTTP/DNS     | 已集成           |
| Nacos     | Java     | AP/CP | 支持         | HTTP         | 已集成           |

p107

