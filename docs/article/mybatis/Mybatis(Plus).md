---
title: "Mybatis(Plus)"
shortTitle: "Mybatis(Plus)"
description: "Mybatis(Plus)"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-06-08
category: 
- "数据库"
tag:
- "数据库"
sticky: 3
star: false
article: true
timeline: true
dir:
  text: "Mybatis(Plus)"
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
  title: "Mybatis(Plus)"
  description: "Mybatis(Plus)"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Mybatis(Plus)

[[toc]]





## Mybatis 注解

| 注解名称          | 主要用途                                                     | 示例                                                         |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `@Select`         | 用于配置查询语句                                             | `@Select("SELECT * FROM users WHERE id = #{id}")`            |
| `@Insert`         | 用于配置插入语句                                             | `@Insert("INSERT INTO users (id, name) VALUES (#{id}, #{name})")` |
| `@Update`         | 用于配置更新语句                                             | `@Update("UPDATE users SET name = #{name} WHERE id = #{id}")` |
| `@Delete`         | 用于配置删除语句                                             | `@Delete("DELETE FROM users WHERE id = #{id}")`              |
| `@Results`        | 用于配置结果集映射，通常与 `@Result` 注解一起使用            | `@Results({ @Result(property = "id", column = "user_id"), @Result(property = "name", column = "user_name") })` |
| `@Result`         | 用于配置单个结果集映射                                       | `@Result(property = "id", column = "user_id")`               |
| `@Options`        | 用于配置一些高级选项，如主键生成策略、缓存等                 | `@Options(useGeneratedKeys = true, keyProperty = "id")`      |
| `@Param`          | 用于给参数取别名，提供给 SQL 中引用参数的名称                | `List<User> selectByIdAndName(@Param("id") Long id, @Param("name") String name);` |
| `@ResultMap`      | 用于配置复杂的结果集映射，可以在 XML 文件中定义 resultMap，然后在注解中引用 | `@ResultMap("userResultMap")`                                |
| `@CacheNamespace` | 用于配置命名空间级别的缓存                                   | `@CacheNamespace(size = 512, flushInterval = 60000)`         |
| `@Flush`          | 用于配置执行更新操作后是否进行刷新缓存                       | `@Flush`                                                     |
| `@SelectProvider` | 用于配置动态 SQL 查询语句，通过指定一个动态 SQL 构建类       | `@SelectProvider(type = UserSqlProvider.class, method = "selectById")` |
| `@InsertProvider` | 用于配置动态 SQL 插入语句，通过指定一个动态 SQL 构建类       | `@InsertProvider(type = UserSqlProvider.class, method = "insertUser")` |
| `@UpdateProvider` | 用于配置动态 SQL 更新语句，通过指定一个动态 SQL 构建类       | `@UpdateProvider(type = UserSqlProvider.class, method = "updateUser")` |
| `@DeleteProvider` | 用于配置动态 SQL 删除语句，通过指定一个动态 SQL 构建类       | `@DeleteProvider(type = UserSqlProvider.class, method = "deleteUser")` |





### MybatisPlus 注解

| 注解名称       | 主要用途                                              | 示例                                              |
| -------------- | ----------------------------------------------------- | ------------------------------------------------- |
| `@TableName`   | 用于指定实体对应的数据库表名                          | `@TableName("user")`                              |
| `@TableId`     | 用于指定主键字段及其生成策略                          | `@TableId(value = "id", type = IdType.AUTO)`      |
| `@TableField`  | 用于指定实体字段与数据库字段的映射关系                | `@TableField("user_name")`                        |
| `@Version`     | 用于标识乐观锁字段                                    | `@Version`                                        |
| `@TableLogic`  | 用于标识逻辑删除字段                                  | `@TableLogic`                                     |
| `@KeySequence` | 用于指定序列，主要用于 Oracle 数据库                  | `@KeySequence("SEQ_USER")`                        |
| `@TableResult` | 用于复杂查询结果集映射，通常与 `@TableField` 一起使用 | `@TableResult(id = "user_id", type = User.class)` |
| `@SqlParser`   | 用于配置 SQL 解析规则，通常用于多租户场景             | `@SqlParser(filter = true)`                       |
| `@KeySequence` | 用于指定序列，主要用于 Oracle 数据库                  | `@KeySequence("SEQ_USER")`                        |



## MybatisPlus 接口

| 接口                                         | 功能                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| **`BaseMapper<T>`**                          | 提供了基础的增删改查方法，通常用于继承。包括：`insert`、`insertBatch`、`updateById`、`deleteById`、`selectById`、`selectBatchIds`、`selectList` 等。 |
| **`IService<T>`**                            | Service 接口的顶级接口，定义了一些通用的 CRUD 方法，包括：`save`、`saveBatch`、`updateById`、`removeById`、`getById`、`listByIds`、`list` 等。 |
| **`IService<T>`** 的实现类 **`ServiceImpl`** | Service 接口的默认实现，提供了通用的 CRUD 操作，可以通过继承该实现类来简化 Service 层的代码。 |
| **`IPage<T>`**                               | 分页查询结果的接口，提供了获取分页数据、总记录数等方法。     |
| **`QueryWrapper<T>`**                        | 查询条件的封装类，用于构建查询条件。包括：`eq`、`ne`、`like`、`in`、`orderBy`、`groupBy` 等。 |
| **`UpdateWrapper<T>`**                       | 更新操作的查询条件封装类，用于构建更新条件。包括：`set`、`eq`、`ne`、`like`、`in` 等。 |
| **`LambdaQueryWrapper<T>`**                  | 使用 Lambda 表达式构建查询条件的封装类，继承自 `QueryWrapper`。 |
| **`LambdaUpdateWrapper<T>`**                 | 使用 Lambda 表达式构建更新条件的封装类，继承自 `UpdateWrapper`。 |
| **`QueryChainWrapper<T>`**                   | 链式调用方式构建查询条件的封装类，用于简化构建多条件查询。   |
| **`Condition`**                              | MyBatis-Plus 中提供的静态方法类，用于构建动态查询条件。      |
| **`EntityWrapper<T>`**                       | 旧版的查询条件封装类，现在已被 `QueryWrapper` 和 `LambdaQueryWrapper` 替代。 |
| **`SqlRunner`**                              | 提供了对 SQL 语句的直接执行操作，包括：`select`、`insert`、`update`、`delete` 等。 |
| **`MetaObject`**                             | MyBatis-Plus 提供的元对象操作工具类，用于处理对象的属性、字段等元信息。 |
| **`OptimisticLockerInterceptor`**            | 乐观锁的拦截器，用于在更新时自动处理乐观锁字段。             |
| **`PaginationInterceptor`**                  | 分页插件，用于自动进行分页查询。                             |
| **`PerformanceInterceptor`**                 | 性能分析插件，用于打印 SQL 执行的时间。                      |
| **`IllegalSQLInterceptor`**                  | 防止全表更新和删除的拦截器，用于保护数据库。                 |



### BaseMapper

| 方法                                                        | 描述                     | 例子                                    |
| ----------------------------------------------------------- | ------------------------ | --------------------------------------- |
| `insert(T entity)`                                          | 插入一条记录             | `baseMapper.insert(user);`              |
| `insertBatch(Collection<T> entities)`                       | 批量插入记录             | `baseMapper.insertBatch(users);`        |
| `updateById(T entity)`                                      | 根据 ID 更新记录         | `baseMapper.updateById(user);`          |
| `deleteById(Serializable id)`                               | 根据 ID 删除记录         | `baseMapper.deleteById(1);`             |
| `selectById(Serializable id)`                               | 根据 ID 查询记录         | `User user = baseMapper.selectById(1);` |
| `selectBatchIds(Collection<? extends Serializable> idList)` | 根据 ID 集合批量查询记录 |                                         |

1. 插入记录：

   ```java
   User user = new User();
   user.setName("John");
   user.setAge(25);
   baseMapper.insert(user);
   ```

2. 批量插入记录：

   ```java
   List<User> users = Arrays.asList(user1, user2, user3);
   baseMapper.insertBatch(users);
   ```

3. 根据 ID 更新记录：

   ```java
   User user = new User();
   user.setId(1L);
   user.setName("UpdatedName");
   baseMapper.updateById(user);
   ```

4. 根据 ID 删除记录：

   ```java
   baseMapper.deleteById(1L);
   ```

5. 根据 ID 查询记录：

   ```java
   User user = baseMapper.selectById(1L);
   ```

6. 根据 ID 集合批量查询记录：

   ```java
   List<Long> idList = Arrays.asList(1L, 2L, 3L);
   List<User> userList = baseMapper.selectBatchIds(idList);
   ```





### IService

| 方法                                                   | 描述                                                         | 例子                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `save(T entity)`                                       | 保存一条记录，根据是否存在主键判断插入或更新                 | `userService.save(user);`                                    |
| `saveBatch(Collection<T> entities)`                    | 批量保存记录，根据是否存在主键判断插入或更新                 | `userService.saveBatch(users);`                              |
| `updateById(T entity)`                                 | 根据 ID 更新记录                                             | `userService.updateById(user);`                              |
| `removeById(Serializable id)`                          | 根据 ID 删除记录                                             | `userService.removeById(1L);`                                |
| `getById(Serializable id)`                             | 根据 ID 查询记录                                             | `User user = userService.getById(1L);`                       |
| `listByIds(Collection<? extends Serializable> idList)` | 根据 ID 集合批量查询记录                                     | `List<User> userList = userService.listByIds(idList);`       |
| `list(QueryWrapper<T> queryWrapper)`                   | 根据条件查询记录列表                                         | `List<User> userList = userService.list(queryWrapper);`      |
| `page(IPage<T> page, QueryWrapper<T> queryWrapper)`    | 根据条件分页查询记录列表                                     | `IPage<User> userPage = userService.page(page, queryWrapper);` |
| `count(QueryWrapper<T> queryWrapper)`                  | 根据条件统计记录数                                           | `int count = userService.count(queryWrapper);`               |
| `chainQuery()`                                         | 创建一个 `QueryChainWrapper<T>` 对象，用于链式调用查询条件构造器 | `QueryChainWrapper<User> queryWrapper = userService.chainQuery();` |

1. 保存记录：

   ```java
   User user = new User();
   user.setName("John");
   user.setAge(25);
   userService.save(user);
   ```

2. 批量保存记录：

   ```java
   List<User> users = Arrays.asList(user1, user2, user3);
   userService.saveBatch(users);
   ```

3. 根据 ID 更新记录：

   ```java
   User user = new User();
   user.setId(1L);
   user.setName("UpdatedName");
   userService.updateById(user);
   ```

4. 根据 ID 删除记录：

   ```java
   userService.removeById(1L);
   ```

5. 根据 ID 查询记录：

   ```java
   User user = userService.getById(1L);
   ```

6. 根据 ID 集合批量查询记录：

   ```java
   List<Long> idList = Arrays.asList(1L, 2L, 3L);
   List<User> userList = userService.listByIds(idList);
   ```

7. 根据条件查询记录列表：

   ```java
   QueryWrapper<User> queryWrapper = new QueryWrapper<>();
   queryWrapper.eq("age", 25);
   List<User> userList = userService.list(queryWrapper);
   ```

8. 根据条件分页查询记录列表：

   ```java
   QueryWrapper<User> queryWrapper = new QueryWrapper<>();
   queryWrapper.eq("age", 25);
   IPage<User> userPage = userService.page(new Page<>(1, 10), queryWrapper);
   ```

9. 根据条件统计记录数：

   ```java
   QueryWrapper<User> queryWrapper = new QueryWrapper<>();
   queryWrapper.eq("age", 25);
   int count = userService.count(queryWrapper);
   ```

10. 创建 `QueryChainWrapper` 对象：

    ```java
    QueryChainWrapper<User> queryWrapper = userService.chainQuery();
    ```





### ServiceImpl

`ServiceImpl` 是 `IService<T>` 的默认实现类，提供了通用的 CRUD 操作。

| 方法                                                   | 描述                                                         | 例子                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `save(T entity)`                                       | 保存一条记录，根据是否存在主键判断插入或更新                 | `userService.save(user);`                                    |
| `saveBatch(Collection<T> entities)`                    | 批量保存记录，根据是否存在主键判断插入或更新                 | `userService.saveBatch(users);`                              |
| `updateById(T entity)`                                 | 根据 ID 更新记录                                             | `userService.updateById(user);`                              |
| `removeById(Serializable id)`                          | 根据 ID 删除记录                                             | `userService.removeById(1L);`                                |
| `getById(Serializable id)`                             | 根据 ID 查询记录                                             | `User user = userService.getById(1L);`                       |
| `listByIds(Collection<? extends Serializable> idList)` | 根据 ID 集合批量查询记录                                     | `List<User> userList = userService.listByIds(idList);`       |
| `list(QueryWrapper<T> queryWrapper)`                   | 根据条件查询记录列表                                         | `List<User> userList = userService.list(queryWrapper);`      |
| `page(IPage<T> page, QueryWrapper<T> queryWrapper)`    | 根据条件分页查询记录列表                                     | `IPage<User> userPage = userService.page(new Page<>(1, 10), queryWrapper);` |
| `count(QueryWrapper<T> queryWrapper)`                  | 根据条件统计记录数                                           | `int count = userService.count(queryWrapper);`               |
| `chainQuery()`                                         | 创建一个 `QueryChainWrapper<T>` 对象，用于链式调用查询条件构造器 | `QueryChainWrapper<User> queryWrapper = userService.chainQuery();` |

**使用例子：**与 `IService` 中的使用例子相同，因为 `ServiceImpl` 是 `IService` 的默认实现，提供了相同的通用 CRUD 方法。





### IPage

| 方法            | 描述                 | 例子                                            |
| --------------- | -------------------- | ----------------------------------------------- |
| `getRecords()`  | 获取分页记录列表     | `List<User> userList = userPage.getRecords();`  |
| `getTotal()`    | 获取总记录数         | `long total = userPage.getTotal();`             |
| `getSize()`     | 获取每页显示的记录数 | `long size = userPage.getSize();`               |
| `getPages()`    | 获取总页数           | `long pages = userPage.getPages();`             |
| `getCurrent()`  | 获取当前页码         | `long current = userPage.getCurrent();`         |
| `hasPrevious()` | 是否有上一页         | `boolean hasPrevious = userPage.hasPrevious();` |
| `hasNext()`     | 是否有下一页         | `boolean hasNext = userPage.hasNext();`         |

**使用例子：**

假设有以下分页查询的场景：

```java
IPage<User> userPage = userService.page(new Page<>(1, 10), queryWrapper);
```

通过 `IPage` 接口的方法可以获取分页的相关信息：

```java
List<User> userList = userPage.getRecords();  // 获取分页记录列表
long total = userPage.getTotal();             // 获取总记录数
long size = userPage.getSize();               // 获取每页显示的记录数
long pages = userPage.getPages();             // 获取总页数
long current = userPage.getCurrent();         // 获取当前页码
boolean hasPrevious = userPage.hasPrevious(); // 是否有上一页
boolean hasNext = userPage.hasNext();         // 是否有下一页
```





### Condition

`Condition` 是 MyBatis-Plus 提供的静态方法类，用于构建动态查询条件。

| 方法                                                         | 描述                                                         | 例子                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `create()`                                                   | 创建一个空的 `QueryWrapper` 对象                             | `QueryWrapper<User> queryWrapper = Condition.create();`      |
| `isNotNull(Object value)`                                    | 判断值是否不为空，不为空时返回 `QueryWrapper` 对象           | `Condition.isNotNull("name").eq("age", 25);`                 |
| `isNull(Object value)`                                       | 判断值是否为空，为空时返回 `QueryWrapper` 对象               | `Condition.isNull("name").eq("age", 25);`                    |
| `allEq(Map<R, Object> params)`                               | 所有条件相等时返回 `QueryWrapper` 对象                       | `Condition.allEq(Collections.singletonMap("age", 25));`      |
| `allEq(BiPredicate<R, Object> filter, Map<R, Object> params)` | 使用自定义过滤条件判断所有条件相等时返回 `QueryWrapper` 对象 | `Condition.allEq((k, v) -> k.equals("age"), Collections.singletonMap("age", 25));` |
| `anyEq(Map<R, Object> params)`                               | 任意条件相等时返回 `QueryWrapper` 对象                       | `Condition.anyEq(Collections.singletonMap("age", 25));`      |
| `ne(Object value)`                                           | 不等于条件时返回 `QueryWrapper` 对象                         | `Condition.ne("age", 25);`                                   |
| `apply(String applySql, Object... params)`                   | 自定义 SQL 片段                                              | `Condition.apply("age > 18");`                               |

**使用例子：**

1. 创建一个空的 `QueryWrapper` 对象：

   ```java
   QueryWrapper<User> queryWrapper = Condition.create();
   ```

2. 判断值是否不为空：

   ```java
   queryWrapper = Condition.isNotNull("name").eq("age", 25);
   ```

3. 判断值是否为空：

   ```java
   queryWrapper = Condition.isNull("name").eq("age", 25);
   ```

4. 所有条件相等时返回 `QueryWrapper` 对象：

   ```java
   queryWrapper = Condition.allEq(Collections.singletonMap("age", 25));
   ```

5. 使用自定义过滤条件判断所有条件相等时返回 `QueryWrapper` 对象：

   ```java
   queryWrapper = Condition.allEq((k, v) -> k.equals("age"), Collections.singletonMap("age", 25));
   ```

6. 任意条件相等时返回 `QueryWrapper` 对象：

   ```java
   queryWrapper = Condition.anyEq(Collections.singletonMap("age", 25));
   ```

7. 不等于条件时返回 `QueryWrapper` 对象：

   ```java
   queryWrapper = Condition.ne("age", 25);
   ```

8. 自定义 SQL 片段：

   ```java
   queryWrapper = Condition.apply("age > 18");
   ```

`Condition` 提供了一系列静态方法，用于创建动态查询条件，可以根据不同的需求选择不同的方法进行条件构造。





### SqlRunner

| 方法                                     | 描述                         | 例子                                                         |
| ---------------------------------------- | ---------------------------- | ------------------------------------------------------------ |
| `selectList(String sql, Object... args)` | 执行查询操作，返回结果集列表 | `List<Map<String, Object>> resultList = SqlRunner.selectList("SELECT * FROM user WHERE age > ?", 18);` |
| `selectOne(String sql, Object... args)`  | 执行查询操作，返回单个结果   | `Map<String, Object> result = SqlRunner.selectOne("SELECT * FROM user WHERE id = ?", 1);` |
| `insert(String sql, Object... args)`     | 执行插入操作，返回插入记录数 | `int insertedRows = SqlRunner.insert("INSERT INTO user (name, age) VALUES (?, ?)", "John", 25);` |
| `update(String sql, Object... args)`     | 执行更新操作，返回更新记录数 | `int updatedRows = SqlRunner.update("UPDATE user SET age = ? WHERE name = ?", 30, "John");` |
| `delete(String sql, Object... args)`     | 执行删除操作，返回删除记录数 | `int deletedRows = SqlRunner.delete("DELETE FROM user WHERE id = ?", 1);` |

**使用例子：**

1. 执行查询操作，返回结果集列表：

   ```java
   List<Map<String, Object>> resultList = SqlRunner.selectList("SELECT * FROM user WHERE age > ?", 18);
   ```

2. 执行查询操作，返回单个结果：

   ```java
   Map<String, Object> result = SqlRunner.selectOne("SELECT * FROM user WHERE id = ?", 1);
   ```

3. 执行插入操作，返回插入记录数：

   ```java
   int insertedRows = SqlRunner.insert("INSERT INTO user (name, age) VALUES (?, ?)", "John", 25);
   ```

4. 执行更新操作，返回更新记录数：

   ```java
   int updatedRows = SqlRunner.update("UPDATE user SET age = ? WHERE name = ?", 30, "John");
   ```

5. 执行删除操作，返回删除记录数：

   ```java
   int deletedRows = SqlRunner.delete("DELETE FROM user WHERE id = ?", 1);
   ```

`SqlRunner` 提供了对 SQL 语句的直接执行操作，可以用于执行原生 SQL，返回结果集或影响记录数。注意，使用时应谨慎防止 SQL 注入攻击。





### MetaObject

`MetaObject` 是 MyBatis-Plus 提供的元对象操作工具类，用于处理对象的属性、字段等元信息。

| 方法                                  | 描述                                          | 例子                                                         |
| ------------------------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| `forObject(Object object)`            | 根据对象创建 `MetaObject` 实例                | `MetaObject metaObject = MetaObject.forObject(user, new DefaultObjectFactory(), new DefaultObjectWrapperFactory(), new DefaultReflectorFactory());` |
| `getValue(String name)`               | 根据属性名获取属性值                          | `Object value = metaObject.getValue("name");`                |
| `setValue(String name, Object value)` | 根据属性名设置属性值                          | `metaObject.setValue("name", "John");`                       |
| `getSetterNames()`                    | 获取所有可写属性的名称列表                    | `List<String> setterNames = metaObject.getSetterNames();`    |
| `getGetterNames()`                    | 获取所有可读属性的名称列表                    | `List<String> getterNames = metaObject.getGetterNames();`    |
| `getOriginalObject()`                 | 获取原始对象（即传入 `forObject` 方法的对象） | `Object originalObject = metaObject.getOriginalObject();`    |

**使用例子：**

1. 根据对象创建 `MetaObject` 实例：

   ```java
   MetaObject metaObject = MetaObject.forObject(user, new DefaultObjectFactory(), new DefaultObjectWrapperFactory(), new DefaultReflectorFactory());
   ```

2. 根据属性名获取属性值：

   ```java
   Object value = metaObject.getValue("name");
   ```

3. 根据属性名设置属性值：

   ```java
   metaObject.setValue("name", "John");
   ```

4. 获取所有可写属性的名称列表：

   ```java
   List<String> setterNames = metaObject.getSetterNames();
   ```

5. 获取所有可读属性的名称列表：

   ```java
   List<String> getterNames = metaObject.getGetterNames();
   ```

6. 获取原始对象：

   ```java
   Object originalObject = metaObject.getOriginalObject();
   ```

`MetaObject` 提供了方便的方法来操作对象的属性，包括获取、设置属性值，获取可写属性和可读属性的名称列表等。



`MetaObject` 主要用于处理 MyBatis-Plus 框架中的实体对象，通过它可以方便地获取和设置对象的属性值。一般来说，使用场景包括：

1. **动态 SQL 构建：** 在动态 SQL 构建的过程中，可以使用 `MetaObject` 获取对象的属性值，并根据不同的条件进行动态拼接 SQL。
2. **字段策略处理：** 处理对象的字段策略，例如在插入记录时，自动填充创建时间和更新时间等字段。
3. **自定义操作对象属性：** 在某些场景下，需要对对象的属性进行自定义处理，例如字符串拼接、格式化日期等。

下面是一个结合 MyBatis-Plus 和 `MetaObject` 的例子：

假设有一个 `User` 实体类：

```java
public class User {
    private Long id;
    private String name;
    private Integer age;
    // getters and setters
}
```

**动态 SQL 构建：**

在使用 MyBatis-Plus 进行动态 SQL 构建时，可以使用 `MetaObject` 来获取对象属性值，根据条件动态拼接 SQL。例如，在根据条件查询用户列表的场景中：

```java
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
MetaObject metaObject = MetaObject.forObject(user, new DefaultObjectFactory(), new DefaultObjectWrapperFactory(), new DefaultReflectorFactory());

// 判断条件，根据不同情况动态构建 SQL
if (metaObject.hasGetter("name") && StringUtils.isNotBlank((String) metaObject.getValue("name"))) {
    queryWrapper.like("name", metaObject.getValue("name"));
}

if (metaObject.hasGetter("age") && (Integer) metaObject.getValue("age") != null) {
    queryWrapper.eq("age", metaObject.getValue("age"));
}

// 执行查询
List<User> userList = userMapper.selectList(queryWrapper);
```

**字段策略处理：**

在插入记录时，自动填充创建时间和更新时间字段：

```java
// 使用 MyBatis-Plus 提供的自动填充注解
@TableField(fill = FieldFill.INSERT)
private Date createTime;

@TableField(fill = FieldFill.INSERT_UPDATE)
private Date updateTime;

// 在插入时，使用 MetaObject 自动填充时间字段
@Override
public void insertFill(MetaObject metaObject) {
    Date now = new Date();
    this.setCreateTime(now);
    this.setUpdateTime(now);
}
```

**自定义操作对象属性：**

在一些特殊场景下，需要对对象的属性进行自定义操作，例如字符串拼接：

```java
// 自定义操作对象属性，例如将名字和年龄拼接成一个字符串
public String getFullName() {
    MetaObject metaObject = MetaObject.forObject(this, new DefaultObjectFactory(), new DefaultObjectWrapperFactory(), new DefaultReflectorFactory());
    String name = (String) metaObject.getValue("name");
    Integer age = (Integer) metaObject.getValue("age");
    return name + " - " + age + " years old";
}
```

总的来说，`MetaObject` 提供了灵活的对象属性操作方式，结合 MyBatis-Plus 的注解和框架特性，可以在不侵入业务代码的情况下，方便地对对象进行处理。







### OptimisticLockerInterceptor

`OptimisticLockerInterceptor` 是 MyBatis-Plus 提供的乐观锁插件，用于在进行更新操作时实现乐观锁的机制。乐观锁是一种通过版本号（或者其他方式）实现的并发控制机制，用于处理多用户同时修改同一数据的情况。

作用：

- **乐观锁机制：** 在进行数据更新时，通过版本号判断数据是否被其他线程修改，从而避免数据冲突问题。
- **自动维护版本号：** 插件会自动处理实体对象的版本号，无需手动设置。

配置方式：在 MyBatis-Plus 的配置文件（通常是 `mybatis-config.xml` 或者 `mybatis-plus-config.xml`）中配置乐观锁插件：

```xml
<plugins>
    <!-- 乐观锁插件 -->
    <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.OptimisticLockerInterceptor"/>
</plugins>
```



使用示例：假设有一个 `User` 实体类：

```java
public class User {
    private Long id;
    private String name;
    private Integer age;
    private Integer version; // 乐观锁版本号
    // getters and setters
}
```

- 在实体类中添加一个 `version` 字段作为版本号。

- 在进行更新操作时，插件会自动判断版本号，如果版本号匹配则执行更新操作，否则抛出 `OptimisticLockException` 异常。

```java
User user = userMapper.selectById(1L);
user.setName("UpdatedName");

int updatedRows = userMapper.updateById(user);
if (updatedRows == 0) {
    // 更新失败，抛出乐观锁异常
    throw new OptimisticLockException("Data has been modified by others, please refresh and try again.");
}
```

在上述例子中，当执行 `updateById` 操作时，乐观锁插件会自动判断 `version` 字段的值，如果版本号匹配，则更新成功，否则抛出异常。

:::warning 注意事项

通过配置 `OptimisticLockerInterceptor`，可以简化乐观锁的使用，提高系统的并发处理能力。

- 乐观锁插件需要数据库表中存在版本号字段，通常命名为 `version`。
- 实体类中需要包含版本号字段，并提供相应的 getter 和 setter 方法。
- 更新操作时，版本号字段的值会自动加一，无需手动设置。

:::





### PaginationInterceptor

`PaginationInterceptor` 是 MyBatis-Plus 提供的分页插件，用于自动处理分页查询的逻辑。它可以拦截 SQL 语句，自动在 SQL 后添加分页的语句，从而实现分页查询的功能。

作用：

- **自动分页：** 在执行查询操作时，插件会自动添加分页的语句，无需手动编写分页 SQL。
- **物理分页：** 通过修改 SQL 语句实现分页，避免了在内存中进行分页，提高了查询效率。
- **支持多种数据库：** 插件对多种数据库的分页语法进行了支持。

配置方式：在 MyBatis-Plus 的配置文件（通常是 `mybatis-config.xml` 或者 `mybatis-plus-config.xml`）中配置分页插件：

```xml
<plugins>
    <!-- 分页插件 -->
    <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor">
        <!-- 开启 count 的 join 优化, 只针对部分 left join -->
        <property name="countOptimize" value="true"/>
    </plugin>
</plugins>
```

在进行分页查询时，无需手动编写分页 SQL，插件会自动处理分页逻辑。

```java
// 构建分页对象
Page<User> page = new Page<>(1, 10);

// 执行分页查询
IPage<User> userPage = userMapper.selectPage(page, null);

// 获取分页结果
List<User> userList = userPage.getRecords();
long total = userPage.getTotal();
long current = userPage.getCurrent();
long size = userPage.getSize();
```

分页插件对多表关联查询的 count 语句进行了优化，默认开启。可以通过配置 `countOptimize` 属性进行关闭。

```xml
<plugin interceptor="com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor">
    <!-- 关闭 count 的 join 优化 -->
    <property name="countOptimize" value="false"/>
</plugin>
```

在使用 `selectPage` 方法时，传入的第二个参数是查询条件，可以根据具体业务需求设置相应的查询条件。

通过配置 `PaginationInterceptor`，可以简化分页查询的操作，提高开发效率。插件会在执行查询操作时自动处理分页逻辑，无需手动编写分页 SQL。





### PerformanceInterceptor

`PerformanceInterceptor` 是 MyBatis-Plus 提供的性能分析插件，用于分析 SQL 执行性能，包括 SQL 执行时间、SQL 执行耗时、慢 SQL 监控等。它可以帮助开发人员优化 SQL 查询语句，提高系统性能。

- **SQL 性能监控：** 可以监控 SQL 执行时间，帮助发现慢 SQL，优化数据库查询性能。
- **SQL 执行分析：** 提供了 SQL 执行计划和 SQL 格式化的功能，方便开发人员分析和优化 SQL 语句。
- **慢 SQL 打印：** 当 SQL 执行时间超过指定阈值时，会打印慢 SQL 信息。

配置方式：在 MyBatis-Plus 的配置文件（通常是 `mybatis-config.xml` 或者 `mybatis-plus-config.xml`）中配置性能分析插件：

```xml
<plugins>
    <!-- 性能分析插件 -->
    <plugin interceptor="com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor">
        <!-- SQL 格式化 -->
        <property name="format" value="true"/>
        <!-- SQL 执行分析开关 -->
        <property name="sqlAnalysis" value="true"/>
        <!-- 慢 SQL 执行时间阈值，单位毫秒，默认 50 -->
        <property name="maxTime" value="100"/>
    </plugin>
</plugins>
```

使用示例：通过配置 `PerformanceInterceptor` 插件，可以在控制台输出 SQL 执行信息，包括执行时间、执行计划等。

```java
// 构建分页对象
Page<User> page = new Page<>(1, 10);

// 执行分页查询
IPage<User> userPage = userMapper.selectPage(page, null);
```

在控制台输出信息如下：

```sh
2024-02-03 16:50:39.106  INFO 2972 --- [io-8080-exec-10] com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor : Execute SQL total time: 143 ms
2024-02-03 16:50:39.106  INFO 2972 --- [io-8080-exec-10] com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor : SQL: 
SELECT *
FROM user
LIMIT 0, 10
2024-02-03 16:50:39.106  INFO 2972 --- [io-8080-exec-10] com.baomidou.mybatisplus.extension.plugins.PerformanceInterceptor : ===============================================================================
```

:::warning 注意事项

通过配置 `PerformanceInterceptor`，可以在开发和调试阶段方便地监控 SQL 执行性能，帮助开发人员优化 SQL 查询语句，提高系统性能。

- `format` 属性：配置是否格式化 SQL，默认为 `true`，可以在控制台输出格式化后的 SQL 语句。
- `sqlAnalysis` 属性：配置是否开启 SQL 执行分析，默认为 `true`，可以在控制台输出 SQL 执行计划等信息。
- `maxTime` 属性：配置慢 SQL 执行时间阈值，单位毫秒，默认为 50 毫秒，超过该阈值的 SQL 将会被打印出来。

:::





## MybatisPlus 插件

:::info 相关文档

- [官方文档 - 插件说明](https://baomidou.com/pages/6b03c5)

:::

官方目前已有：

- 自动分页: PaginationInnerInterceptor
- 多租户: TenantLineInnerInterceptor
- 动态表名: DynamicTableNameInnerInterceptor
- 乐观锁: OptimisticLockerInnerInterceptor
- sql 性能规范: IllegalSQLInnerInterceptor
- 防止全表更新与删除: BlockAttackInnerInterceptor



## MybatisPlus 扩展

:::info 相关文档

- [官方文档 - 扩展说明](https://baomidou.com/pages/6b03c5)

:::

主要有：

- 逻辑删除
- 通用枚举
- 字段类型处理器
- 自动填充



## 其他

- [MybatisX (opens new window)](https://github.com/baomidou/MybatisX)- 一款全免费且强大的 IDEA 插件，支持跳转，自动补全生成 SQL，代码生成。
- [Mybatis-Mate (opens new window)](https://gitee.com/baomidou/mybatis-mate-examples)- 为 MyBatis-Plus 企业级模块，支持分库分表、数据审计、字段加密、数据绑定、数据权限、表结构自动生成 SQL 维护等高级特性。
- [Dynamic-Datasource (opens new window)](https://gitee.com/baomidou/dynamic-datasource-spring-boot-starter)- 基于 SpringBoot 的多数据源组件，功能强悍，支持 Seata 分布式事务。
- [Shuan (opens new window)](https://gitee.com/baomidou/shaun)- 基于 Pac4J-JWT 的 WEB 安全组件, 快速集成。
- [Kisso (opens new window)](https://github.com/baomidou/kisso)- 基于 Cookie 的单点登录组件。
- [Lock4j (opens new window)](https://gitee.com/baomidou/lock4j)- 基于 SpringBoot 同时支持 RedisTemplate、Redission、Zookeeper 的分布式锁组件。
- [Kaptcha (opens new window)](https://gitee.com/baomidou/kaptcha-spring-boot-starter)- 基于 SpringBoot 和 Google Kaptcha 的简单验证码组件，简单验证码就选它。
- [Aizuda 爱组搭 (opens new window)](https://gitee.com/aizuda)- 低代码开发平台组件库。
- [Easy-Retry (opens new window)](https://www.easyretry.com/)- 分布式重试服务平台

