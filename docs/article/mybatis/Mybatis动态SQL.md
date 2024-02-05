---
title: "Mybatis 动态 SQL"
shortTitle: "Mybatis 动态 SQL"
description: "Mybatis 动态 SQL"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-07-03
category: 
- "数据库"
tag:
- "数据库"
sticky: 3
star: false
article: true
timeline: true
dir:
  text: "Mybatis 动态 SQL"
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
  title: "Mybatis 动态 SQL"
  description: "Mybatis 动态 SQL"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Mybatis 动态 SQL

[[toc]]



## XML标签

:::info 相关文档

- [Mybatis - Dynamic SQL](https://mybatis.org/mybatis-3/dynamic-sql.html)

:::



### where

- 用于将WHERE关键字添加到语句中，同时处理条件的连接。
- 语法`<where>...</where>`



### if

- 用于在SQL语句中包含条件判断。

- 语法`<if test="condition">...</if>`

  ```xml
  <select id="findActiveBlogWithTitleLike" resultType="Blog">
    SELECT * FROM BLOG
    WHERE state = ‘ACTIVE’
    <if test="title != null">
      AND title like #{title}
    </if>
  </select>
  
  <select id="findActiveBlogLike" resultType="Blog">
    SELECT * FROM BLOG WHERE state = ‘ACTIVE’
    <if test="title != null">
      AND title like #{title}
    </if>
    <if test="author != null and author.name != null">
      AND author_name like #{author.name}
    </if>
  </select>
  ```

  



### choose, when, otherwise

- 类似于Java中的switch语句，用于根据条件选择不同的分支。

- 语法

  ```xml
  <choose>
    <when test="condition">...</when>
    <otherwise>...</otherwise>
  </choose>
  
  <select id="findActiveBlogLike" resultType="Blog">
    SELECT * FROM BLOG WHERE state = ‘ACTIVE’
    <choose>
      <when test="title != null">
        AND title like #{title}
      </when>
      <when test="author != null and author.name != null">
        AND author_name like #{author.name}
      </when>
      <otherwise>
        AND featured = 1
      </otherwise>
    </choose>
  </select>
  ```



### trim

| 元素/属性         | 描述                                                        |
| ----------------- | ----------------------------------------------------------- |
| `<trim>`          | 用于处理SQL语句的前缀和后缀，可以根据条件去掉不必要的部分。 |
| `prefix`          | 在拼接条件时添加的前缀。                                    |
| `suffix`          | 在拼接条件时添加的后缀。                                    |
| `prefixOverrides` | 去除条件中可能存在的多余的前缀。                            |
| `suffixOverrides` | 去除条件中可能存在的多余的后缀。                            |

- 用于处理SQL语句的前缀和后缀，可以根据条件去掉不必要的部分。

- 语法

  ```xml
  <trim prefix="prefix" suffix="suffix" prefixOverrides="prefix1, prefix2" suffixOverrides="suffix1, suffix2">
    ...
  </trim>
  
  <select id="getUsers" parameterType="map" resultType="User">
    SELECT *
    FROM users
    <!-- 使用 <where> 元素包裹 <trim> 元素，方便在条件为空时生成空的 WHERE 子句 -->
    <where>
      <!-- 使用 <trim> 元素，设置前缀 "AND "，去除条件中的多余 "AND " -->
      <trim prefix="AND " suffix="AND " prefixOverrides="AND ">
        <!-- 使用 <if> 元素判断条件是否成立，如果为真，则拼接该条件 -->
        <if test="name != null and name != ''">
          name = #{name}
        </if>
        <!-- 使用 <if> 元素判断条件是否成立，如果为真，则拼接该条件 -->
        <if test="age != null">
          <!-- 使用 bind 元素将表达式的结果绑定到变量，以便在后续的 SQL 语句中使用 -->
          <bind name="_age" value="age * 2"/>
          AND age = #{_age}
        </if>
        <!-- 使用 <if> 元素判断条件是否成立，如果为真，则拼接该条件 -->
        <if test="gender != null and gender != ''">
          gender = #{gender}
        </if>
      </trim>
    </where>
  </select>
  ```



### set

- 用于将SET关键字添加到UPDATE语句中，同时处理更新的字段和值。

- 语法`<set>...</set>`

  ```xml
  <update id="updateUser" parameterType="User">
    UPDATE users
    <set>
      <!-- 使用 <if> 元素判断条件是否成立，如果为真，则拼接该更新语句 -->
      <if test="name != null and name != ''">
        name = #{name},
      </if>
      <!-- 使用 <if> 元素判断条件是否成立，如果为真，则拼接该更新语句 -->
      <if test="age != null">
        age = #{age},
      </if>
      <!-- 使用 <if> 元素判断条件是否成立，如果为真，则拼接该更新语句 -->
      <if test="gender != null and gender != ''">
        gender = #{gender},
      </if>
    </set>
    WHERE user_id = #{userId}
  </update>
  ```

  



### foreach

- 用于循环处理集合，生成对应的SQL片段。

- 语法

  ```xml
  <foreach collection="list" item="item" index="index" open="(" close=")" separator=",">
    #{item}
  </foreach>
  
  <select id="getUsersByIdList" parameterType="List" resultType="User">
    SELECT *
    FROM users
    WHERE user_id IN
    <foreach collection="idList" item="id" open="(" separator="," close=")">
      #{id}
    </foreach>
  </select>
  ```



### bind

- 用于将表达式的结果绑定到一个变量，以便在后续的SQL语句中使用。

- 语法`<bind name="variableName" value="expression"/>`

  ```xml
  <select id="getUsersByName" parameterType="String" resultType="User">
    <!-- 使用 <bind> 元素将表达式的结果绑定到变量，以便在后续的 SQL 语句中使用 -->
    <bind name="upperName" value="'%' + _parameter.toUpperCase() + '%'"/>
    
    SELECT *
    FROM users
    WHERE UPPER(name) LIKE #{upperName}
  </select>
  ```



### script

MyBatis-Plus 中的 `@org.apache.ibatis.annotations.Lang` 注解和 `@org.apache.ibatis.scripting.xmltags.LangDriver` 注解允许你使用 XML 或者其他自定义的脚本语言来构建动态 SQL。这种方式称为 "Scripting Language"。

以下是一个简单的例子，展示了如何在 MyBatis-Plus 中使用 XML 脚本构建动态 SQL：

```java
javaCopy code@Lang(XMLLanguageDriver.class)
public interface UserMapper extends BaseMapper<User> {

    @Select("<script>" +
            "SELECT * FROM users " +
            "<where> " +
            "  <if test='name != null and name != \"\"'>AND name = #{name}</if> " +
            "  <if test='age != null'>AND age = #{age}</if> " +
            "  <if test='gender != null and gender != \"\"'>AND gender = #{gender}</if> " +
            "</where>" +
            "</script>")
    List<User> selectUsers(User user);
}
```



### Multi-db vendor support

如果配置了databaseIdProvider，则“databaseId”变量可用于动态代码，因此您可以根据数据库供应商构建不同的语句。请看下面的例子:

```xml
<insert id="insert">
  <selectKey keyProperty="id" resultType="int" order="BEFORE">
    <if test="_databaseId == 'oracle'">
      select seq_users.nextval from dual
    </if>
    <if test="_databaseId == 'db2'">
      select nextval for seq_users from sysibm.sysdummy1"
    </if>
  </selectKey>
  insert into users values (#{id}, #{name})
</insert>
```





## 构造查询条件

:::info 相关文章

- [MyBatis-Plus码之重器 lambda 表达式使用指南,开发效率瞬间提升80%](https://zhuanlan.zhihu.com/p/372219078)

:::

> Mybatis-plus还支持在业务代码中直接构造查询条件



四种创建方式（实体类假设为`User`）：

```java
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
LambdaQueryWrapper<User> lambdaQueryWrapper = new QueryWrapper<User>().lambda();
LambdaQueryWrapper<User> lambdaQueryWrapper = Wrappers.lambdaQuery();
LambdaQueryChainWrapper<User> queryWrapper = new LambdaQueryChainWrapper<>(userMapper);
```

| 方法/属性                                                   | 描述                                                       |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| `eq(TFunction<R> column, Object val)`                       | 等于（=）条件，`column` 为 Lambda 表达式表示实体类的属性。 |
| `ne(TFunction<R> column, Object val)`                       | 不等于（!=）条件。                                         |
| `gt(TFunction<R> column, Object val)`                       | 大于（>）条件。                                            |
| `ge(TFunction<R> column, Object val)`                       | 大于等于（>=）条件。                                       |
| `lt(TFunction<R> column, Object val)`                       | 小于（<）条件。                                            |
| `le(TFunction<R> column, Object val)`                       | 小于等于（<=）条件。                                       |
| `like(TFunction<R> column, Object val)`                     | 模糊查询条件，`column` 为 Lambda 表达式表示实体类的属性。  |
| `notLike(TFunction<R> column, Object val)`                  | 模糊查询条件，排除指定值。                                 |
| `likeLeft(TFunction<R> column, Object val)`                 | 左模糊查询条件。                                           |
| `likeRight(TFunction<R> column, Object val)`                | 右模糊查询条件。                                           |
| `isNull(TFunction<R> column)`                               | 为空判断条件。                                             |
| `isNotNull(TFunction<R> column)`                            | 非空判断条件。                                             |
| `in(TFunction<R> column, Collection<?> coll)`               | 包含在集合中的条件。                                       |
| `notIn(TFunction<R> column, Collection<?> coll)`            | 不包含在集合中的条件。                                     |
| `between(TFunction<R> column, Object val1, Object val2)`    | 范围查询条件。                                             |
| `notBetween(TFunction<R> column, Object val1, Object val2)` | 不在范围内的查询条件。                                     |
| `orderByAsc(TFunction<R> column)`                           | 升序排序条件。                                             |
| `orderByDesc(TFunction<R> column)`                          | 降序排序条件。                                             |
| `groupBy(TFunction<R> column)`                              | 分组条件。                                                 |
| `having(String sqlHaving, Object... params)`                | Having 子句条件。                                          |
| `apply(String applySql, Object... params)`                  | 自定义 SQL 片段。                                          |
| `and(Consumer<LambdaQueryWrapper<T>> consumer)`             | 添加 AND 关系的嵌套条件。                                  |
| `or(Consumer<LambdaQueryWrapper<T>> consumer)`              | 添加 OR 关系的嵌套条件。                                   |
| `nested(Consumer<LambdaQueryWrapper<T>> consumer)`          | 添加括号包裹的嵌套条件。                                   |
| `select(TFunction<R>... columns)`                           | 指定查询的字段。                                           |
| `select(Class<T> entityClass, Function<T, R> mapper)`       | 指定查询的字段，并通过自定义映射函数处理结果。             |
| `select(Predicate isSelect, TFunction<R>... columns)`       | 根据条件动态选择查询的字段。                               |
| `select(String... columns)`                                 | 指定查询的字段，字符串形式。                               |





### QueryWrapper

- `QueryWrapper` 是 MyBatis-Plus 提供的查询条件构造器，可以通过链式调用的方式灵活构建查询条件。

```java
javaCopy codeQueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.eq("name", "John").ge("age", 18).orderByDesc("create_time");
List<User> userList = userMapper.selectList(queryWrapper);
```



### UpdateWrapper

- `UpdateWrapper` 类似于 `QueryWrapper`，但用于构建更新操作的查询条件。

```java
javaCopy codeUpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
updateWrapper.set("age", 20).eq("name", "John");
userMapper.update(null, updateWrapper);
```



### LambdaQueryWrapper

- `LambdaQueryWrapper` 基于 Lambda 表达式，更加类型安全，适用于实体类字段存在类型的情况。

```java
javaCopy codeLambdaQueryWrapper<User> lambdaQueryWrapper = Wrappers.lambdaQuery(User.class);
lambdaQueryWrapper.eq(User::getName, "John").ge(User::getAge, 18).orderByDesc(User::getCreateTime);
List<User> userList = userMapper.selectList(lambdaQueryWrapper);
```



### LambdaUpdateWrapper

- `LambdaUpdateWrapper` 类似于 `LambdaQueryWrapper`，用于构建更新操作的查询条件。

```java
javaCopy codeLambdaUpdateWrapper<User> lambdaUpdateWrapper = Wrappers.lambdaUpdate(User.class);
lambdaUpdateWrapper.set(User::getAge, 20).eq(User::getName, "John");
userMapper.update(null, lambdaUpdateWrapper);
```



### QueryChain

- `QueryChain` 是 MyBatis-Plus 新增的一种查询链方式，可以通过链式调用多个查询条件构造方法。

```java
javaCopy codeList<User> userList = new QueryChain<>(userMapper)
    .eq("name", "John")
    .ge("age", 18)
    .orderByDesc("create_time")
    .list();
```



### LambdaQueryChainWrapper

```java
// 假设有一个 UserMapper 接口
public interface UserMapper extends BaseMapper<User> {
}

// 在服务或其他类中使用 LambdaQueryChainWrapper 进行链式调用
public class UserService {

    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public List<User> getUsers() {
        LambdaQueryChainWrapper<User> queryWrapper = new LambdaQueryChainWrapper<>(userMapper);
        return queryWrapper.like(User::getName, "John").ge(User::getAge, 18).list();
    }
}
```



