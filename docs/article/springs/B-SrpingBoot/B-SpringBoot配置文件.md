---
title: "Spring Boot 配置"
shortTitle: "B-Spring Boot 配置"
description: "Spring Boot 配置"
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
  text: "Spring Boot 配置"
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
  title: "Spring Boot 配置"
  description: "Spring Boot 配置"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Spring Boot 配置


[[toc]]


Spring Boot 的两个配置文件是：

- application.properties

- application.yml



## 1.YAML/YML 

> 以数据为中心，更适合做配置文件

例子：配置端口

```yaml
server:
	port: 8081
```

例子：朋友对象

```yaml
friends:
	lastName: zhangsan
	age: 20
	
# 行内写法
friends: {lastName: zhangsan, age: 20}
```

例子：动物数组

```yaml
pets:
 - dog
 - cat
 - pig
 
 # 行内写法
 pet: [dog, cat, pig]
```



### 1.1 基本语法

1. `k: v` : 表示一对键值对（其中空格一定要有）
2. 以空格的缩进来控制层级关系
3. 属性和值大小写敏感



### 1.2 值的写法

1. 字面量：普通的值（数字、字符串、布尔），写法如上面 “配置端口” 的例子
   1. 字符串默认不加上 ‘单引号’ 或者 “双引号”
   2. “”：双引号不会转义字符串中特殊的字符
   3. ‘ ’：会转义特殊字符，最终得到的是一个普通的字符串
2. 对象、Map（属性和值：键值对），写法如上面 “朋友对象 “ 的例子
3. 数组、集合（List、Set），写法如上面 “” 的例子



### 1.3 数据绑定

引入依赖：

```xml
<!-- 导入配置文件处理器，配置文件进行绑定后就会有提示 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```



编写实体类（加上注解）：

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



配置文件设置属性：

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



进行单元测试：

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



## 2.Profile

### 2.1 多 Profile 文件

需要编写多个配置文件

在主配置名编写的时候，文件名可以是：`application-{profile}.properties/yaml/yml`

- application-dev.properties
- application-prod.properties



### 2.2 激活指定的 profile

1. 在配置文件中指定：`spring.profiles.active=dev`
2. 用命令行参数指定配置文件：`--spring.profiles.active=dev`
3. 使用虚拟机参数：`-Dspring.profiles.active=dev`



### 2.3 yaml/yml 支持多文档块方式

> 不需要编写多个配置文件
>
> 用 `---` 区分开不同的文档块，示例如下

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







## 3.配置文件的位置

下面优先级「由高到低」：

1. file: ./config/
2. file: ./
3. classpath: ./config/
4. classpath: ./

- 高优先级的配置会覆盖低优先级的配置（重复的部分）

- Spring Boot 会从这四个位置加载全部的配置文件，会有「互补配置」的效果



### 3.1 静态资源

**访问路径：**

- “classpath:META-INF/resources/”
- “classpath:/resources/”
- “classpath:/static/”
- “classpath:/public/”
- “/”：当前项目的根路径 



