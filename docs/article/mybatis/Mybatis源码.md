---
title: "Mybatis 源码"
shortTitle: "Mybatis 源码"
description: "Mybatis 源码"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-03
category: 
- "数据库"
tag:
- "数据库"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Mybatis 源码"
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
  title: "Mybatis 源码"
  description: "Mybatis 源码"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Mybatis 源码





## 解析配置

配置文件解析：SqlSessionFactory -> SqlSessionFactoryBuilder -> XMLConfigBuilder，XMLConfigBuilder 核心方法为：`parseConfiguration`：

```java
private void parseConfiguration(XNode root) {
    try {
        // issue #117 read properties first
        // properties 只能放在最前面
        propertiesElement(root.evalNode("properties"));
        Properties settings = settingsAsProperties(root.evalNode("settings"));
        loadCustomVfs(settings);
        loadCustomLogImpl(settings);
        typeAliasesElement(root.evalNode("typeAliases"));
        pluginElement(root.evalNode("plugins"));
        objectFactoryElement(root.evalNode("objectFactory"));
        objectWrapperFactoryElement(root.evalNode("objectWrapperFactory"));
        reflectorFactoryElement(root.evalNode("reflectorFactory"));
        settingsElement(settings);
        // read it after objectFactory and objectWrapperFactory issue #631
        environmentsElement(root.evalNode("environments"));
        databaseIdProviderElement(root.evalNode("databaseIdProvider"));
        typeHandlerElement(root.evalNode("typeHandlers"));
        mapperElement(root.evalNode("mappers"));
    } catch (Exception e) {
        throw new BuilderException("Error parsing SQL Mapper Configuration. Cause: " + e, e);
    }
}
```

还可以使用 JavaConfig 创建配置

```java
DataSource dataSource = BlogDataSourceFactory.getBlogDataSource();
TransactionFactory transactionFactory = new JdbcTransactionFactory();
Environment environment = new Environment("development", transactionFactory, dataSource);
Configuration configuration = new Configuration(environment);
configuration.addMapper(BlogMapper.class);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);
```







## 执行 SQL

SqlSessionFactory 可以获取到 SqlSession，SqlSession 提供了在数据库执行 SQL 命令所需的所有方法，可以通过 SqlSession 实例来直接执行已映射的 SQL 语句

```java
try (SqlSession session = sqlSessionFactory.openSession()) {
  Blog blog = (Blog) session.selectOne("org.mybatis.example.BlogMapper.selectBlog", 101);
}

try (SqlSession session = sqlSessionFactory.openSession()) {
  BlogMapper mapper = session.getMapper(BlogMapper.class);
  Blog blog = mapper.selectBlog(101);
}
```

:::info 说明

SqlSessionFactory 用于获取 SqlSession，有两个实现类：

1. DefaultSqlSessionFactory
2. SqlSessionManager

SqlSession 中定义了所有操作 SQL 的方法，有两个实现类：

1. DefaultSqlSession
2. SqlSessionManager

DefaultSqlSessionFactory，DefaultSqlSession 是具体的实现

:::

使用代理获取 SqlSession：

```java
private SqlSessionManager(SqlSessionFactory sqlSessionFactory) {
    this.sqlSessionFactory = sqlSessionFactory;
    this.sqlSessionProxy = (SqlSession) Proxy.newProxyInstance(SqlSessionFactory.class.getClassLoader(),
                                                               new Class[] { SqlSession.class }, new SqlSessionInterceptor());
}
```

:::warning 注意点（SqlSession）

​	每个线程都应该有它自己的 SqlSession 实例。SqlSession 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域。 绝对不能将 SqlSession 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。 也绝不能将 SqlSession 实例的引用放在任何类型的托管作用域中，比如 Servlet 框架中的 HttpSession。 如果你现在正在使用一种 Web 框架，考虑将 SqlSession 放在一个和 HTTP 请求相似的作用域中。 换句话说，每次收到 HTTP 请求，就可以打开一个 SqlSession，返回一个响应后，就关闭它。 这个关闭操作很重要，为了确保每次都能执行关闭操作，你应该把这个关闭操作放到 finally 块中,在所有代码中都遵循这种使用模式，可以保证所有数据库资源都能被正确地关闭。

:::

:::warning 注意点（Mapper）

​	映射器是一些绑定映射语句的接口。映射器接口的实例是从 SqlSession 中获得的。虽然从技术层面上来讲，任何映射器实例的最大作用域与请求它们的 SqlSession 相同。但方法作用域才是映射器实例的最合适的作用域。 也就是说，映射器实例应该在调用它们的方法中被获取，使用完毕之后即可丢弃。 映射器实例并不需要被显式地关闭。尽管在整个请求作用域保留映射器实例不会有什么问题，但是你很快会发现，在这个作用域上管理太多像 SqlSession 的资源会让你忙不过来。 因此，最好将映射器放在方法作用域内

:::







## 映射 SQL

1. XML 映射
2. 注解映射