---
title: "Mybatis 常见问题"
shortTitle: "Mybatis 常见问题"
description: "Mybatis 常见问题"
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
timeline: true
dir:
  text: "Mybatis 常见问题"
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
  title: "Mybatis 常见问题"
  description: "Mybatis 常见问题"
  author:
    name: gzw
    email: 1627121193@qq.com
---




# Mybatis 常见问题

## Mybatis 的优缺点

优点：

1. 与 JDBC 相比减少了大量不必要的代码，不需要手动开关连接，并且能够很好地与各种数据库兼容，和 Spring 也有很好的集成
2. 灵活性高：MyBatis 可以使用 SQL 语句或存储过程，也可以使用对象关系映射（ORM）来进行数据访问，这使得开发人员可以根据需要自由选择使用不同的方法。
3. 易于学习和使用：相对于其他 ORM 框架，MyBatis 学习曲线较平滑，使用起来相对简单，开发人员可以快速上手。
4. 定制化程度高：MyBatis 提供了大量的配置选项和插件，可以根据需要进行灵活的配置和扩展。
5. SQL 映射功能强大：MyBatis 提供了强大的 SQL 映射功能，可以灵活地进行 SQL 查询和更新，支持多表联合查询和复杂条件查询等。
6. 性能优越：MyBatis 相对于其他 ORM 框架，具有更高的性能和更低的资源消耗，尤其在高并发和大数据量情况下表现优异。

缺点：

1. SQL 语句需要手写：相对于其他 ORM 框架，MyBatis 需要手写 SQL 语句，这会增加一定的学习成本和开发成本。
2. 映射文件较多：在使用 MyBatis 进行 ORM 映射时，需要编写大量的 XML 映射文件，这会增加代码量和维护成本。
3. 命名规范不统一：MyBatis 没有统一的命名规范，导致开发人员可能会出现命名不一致的情况，增加代码可读性和维护难度。
4. 不适合复杂关系映射：相对于其他 ORM 框架，MyBatis 不太适合处理复杂的关系映射，例如多对多、多层次等情况，这会增加开发人员的工作量。





## #{} 和 ${} 的区别是什么？

1. #{} 是预编译处理，是占位符；${} 是字符串替换，是拼接符
2. Mybatis 在处理 \${} 时，会将 SQL 中的 \${} 替换成变量的值，调用 `Statement` 来赋值
3. Mybatis 在处理 \#{} 时，会将 SQL 中的 \#{} 替换成 ?，调用 `PreparedStatement` 来赋值

使用 #{} 可以有效防止 SQL 注入，提高系统的安全性



