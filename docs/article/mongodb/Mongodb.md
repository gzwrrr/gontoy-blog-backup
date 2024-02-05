---
title: "Mongodb 简单使用"
shortTitle: "Mongodb 简单使用"
description: "Mongodb 简单使用"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-07-15
category: 
- "mongodb"
- "数据库"
tag:
- "mongodb"
- "数据库"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Mongodb 简单使用"
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
  title: "Mongodb 简单使用"
  description: "Mongodb 简单使用"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Mongodb 简单使用

[[toc]]

# 插入文档

当向集合中插入文档时，如果没有指定文档的 `_id` 属性，数据库会自动为文档添加 `_id`，以此确保数据的唯一性

```mariadb
/* 插入方法 */
db.<collection>.insert([{<JSON>}]);
db.<collection>.insertOne({<JSON>});
db.<collection>.insertMany([{<JSON>}]);
/* 例子 */
db.test_collections_1.insert([{name: 'zhangsan', age: 18}]);
/* 结果 */
/* 1 createdAt:2022/9/10 下午4:34:17*/
{
	"_id" : ObjectId("631c4c09ea305672f7f3ff3f"),
	"name" : "zhangsan",
	"age" : 18
}
```



<br/>



# 查询文档

```mariadb
/* 查询方法 */
/* 
find() 方法可以查询集合中所有符合条件的文档
也可以传递一个对象作为条件参数，使用 find({}) 和 find() 是同样的效果 
*/
db.<collection>.find({});

/* 查询属性为固定值的文档，返回的是一个数组，以下查询会将所有符合条件的文档都查询出来 */
db.<collection>.find({属性: 值});

/* 查询第一个符合条件的文档，返回的是一个对象 */
db.<collection>.findOne({属性: 值});

/* 查询所有文档的数量 */
db.<collection>.find({}).count();
```



<br/>



# 修改文档

```mariadb
/* 修改方法，默认会用新对象替换查询到的旧对象 */
db.<collection>.update(查询条件，新对象);
 
/* 例子，下面修改后新文档中只有一个属性 age */
db.test_collections_1.update({age: 19}, {age: 20});

/* 修改匹配到的第一个文档的指定的属性，$set 可以修改指定的属性，$unset 可以删除指定的属性 */
db.test_collections_1.update(查询条件, {$set: {需要修改的属性: 值}});
/* 例子 */
db.test_collections_1.update({age: 21}, {$unset: {age: 21}});

/* 修改全部符合条件的文档，用法与只修改第一个文档的一样 */
db.test_collections_1.updateMany(...)

/* 
相对应还有 updateOne 方法，这与 update 方法的默认方法是一样的
但是实际上 update 方法是 updateOne 与 updateMany 的综合，可以通过修改属性将 update 改成修改多个
*/
db.test_collections_1.update(查询条件, {$set: {需要修改的属性: 值}}, {multi: true});
```



<br/>



# 删除文档

```mariadb
/* 删除方法和查询方法的使用相似，remove 方法可以指定删除一个还是全部，但是注意 remove 必须传参 */
db.<collection>.remove([{<JSON>}], true/false);
db.<collection>.deleteOne({<JSON>});
db.<collection>.deleteMany({<JSON>});

/* 删除整个集合的所有文档如果使用 remove 性能会较差，因为是匹配后再删，直接删除集合性能会好些 */
db.<collection>.remove({}); 
db.<collection>.drop();

/* 删除数据库 */
db.dropDatabase();
```



<br/>



# Mongoose

mongoose 中提供了几个对象：

- Schema：模式对象，定义约束数据库中的文档结构
- Model：作为集合中的所有文档的表示，相当于数据库中的 Collection
- Document：表示集合中的具体文档，相当于集中的一个具体的文档