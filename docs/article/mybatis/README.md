---
notPage: true
---

# Mybatis

:::info 说明

Mybatis 学习

[Mybatis官网](https://mybatis.org/mybatis-3/zh/index.html)

:::



## 概述

Mybatis 中的核心类为 `SqlSession`

Mybatis 将所有 Xml 配置信息都封装到 All-ln-One 重量级对象 Configuration内部。
在Xml映射文件中：

1. `<parameterMap>` 标签会被解析为 `ParameterMap` 对象，其每个子元素会被解析为 `ParameterMapping` 对象
2. `<resultMap>` 标签会被解析为 `ResultMap` 对象，其每个子元素会被解析为 `ResultMapping` 对象
3. 每一个 `<select>、<insert>、<update>、<delete>` 标签均会被解析为 `MappedStatement` 对象，标签内的 SQL 会被解析为 `BoundSql` 对象





## 标签

`<select>、<insert>、<update>、<delete>`

`<resultMap>、<parameterMap>、<sql>、<include>、<selectKey>`

加上动态 SQL 的9个标签，`trim | where | set | foreach | if | choose | when |otherwise | bind` 等

其中 `<sql>` 为 SQL 片段标签，通过 `<include>` 标签引入 SQL 片段

`<selectKey>` 为不支持自增的主键生成策略标签





## 映射

### 映射对象类型

Mybatis 可以映射枚举类，不单可以映射枚举类，Mybatis 可以映射任何对象到表的一列上。映射方式为自定义一个 `typeHandler` ，实现 `TypeHandler` 的`setParameter` 和 `getResul` 接口方法
`TypeHandler` 有两个作用：

1. 一是完成从 `javaType` 至 `jdbcType` 的转换
2. 二是完成 `jdbcType` 至 `javaType` 的转换，体现为 `setParameter` 和 `getResult` 两个方法，分别代表设置 SQL 问号占位符参数和获取列查询结果



### 映射的参数

1. 单个参数时直接传递即可
2. 多个参数必须使用 `@param` 注解



## ResultType 与 ResultMap

1. 类名与数据库中的相同时，可以直接设置 ResultType 参数为 POJO

2. 若不相同，那么需要设置 ResultMap 将结果名字和 POJO 名字进行转换





## 执行器

有三种基本的 Executor：

1. SimpleExecutor：每执行一次 `update` 或 `select`，就开启一个 `Statement` 对象，用完立刻关闭 `Statement` 对象
2. ReuseExecutor：执行 `update` 或 `select` ，`以sql` 作为 `key` 查找 `Statement `对象，存在就使用，不存在就创建，用完后，不关闭 `Statement` 对象，而是放置于 `Map`
3. BatchExecutor：完成批处理

在配置文件中，可以指定默认的 `Executor` 下 `type` 执行器类型，也可以手动给 `DefaultSqlSessionFactory` 的创建 `SqlSession` 的方法传递 `Executor Type` 类型参数





## 其他

1. DAO 层的接口方法不能重载

2. XML 文件中如果有标签嵌套了，那么不同标签的定义位置是可以任意选择的，因为解析时发现有嵌套的标签还未加载，那么会先加载，后面的，最后再回头解析还未解析完的

3. 不同的 XML 映射文件中 ID 想要重复那么需要配置 Namespace
4. 批量插入可以返回列表的主键
5. 在配置文件中设置 `usegeneratedkeys` 为 `true`，可以自动获取生成的主键值





