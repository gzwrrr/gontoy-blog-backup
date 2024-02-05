---
title: "Android ContentProvider"
shortTitle: "F-Android ContentProvider"
description: "Android ContentProvider"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-10-01
category: 
- "Android"
- "移动端"
tag:
- "Android"
- "移动端"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Android ContentProvider"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 1
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "Android ContentProvider"
  description: "Android ContentProvider"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android ContentProvider

[[toc]]



## ContentResolver

对于每一个应用程序来说，如果想要访问ContentProvider中共享的数据，就一定要借助ContentResolver类，可以通过Context中的getContentResolver()方法获取该类的实例。

ContentResolver中提供了一系列的方法用于对数据进行增删改查操作，其中insert()方法用于添加数据，update()方法用于更新数据，delete()方法用于删除数据，query()方法用于查询数据。有没有似曾相识的感觉？没错，SQLiteDatabase中也是使用这几个方法进行增删改查操作的，只不过它们在方法参数上稍微有一些区别。

不同于SQLiteDatabase，ContentResolver中的增删改查方法都是不接收表名参数的，而是使用一个Uri参数代替，这个参数被称为内容URI。

内容URI给ContentProvider中的数据建立了唯一标识符，它主要由两部分组成：authority和path。

1. authority是用于对不同的应用程序做区分的，一般为了避免冲突，会采用应用包名的方式进行命名。比如某个应用的包名是com.example.app，那么该应用对应的authority就可以命名为com.example.app.provider。
2. path则是用于对同一应用程序中不同的表做区分的，通常会添加到authority的后面。

| **query()**方法参数 | 对应**SQL**部分             | 描述                             |
| ------------------- | --------------------------- | -------------------------------- |
| `uri`               | `from table_name`           | 指定查询某个应用程序下的某一张表 |
| `projection`        | `select column1, column2`   | 指定查询的列名                   |
| `selection`         | `where column = value`      | 指定where的约束条件              |
| `selectionArgs`     | `-`                         | 为where中的占位符提供具体的值    |
| `sortOrder`         | `order by column1, column2` | 指定查询结果的排序方式           |

getType()方法。它是所有的ContentProvider都必须提供的一个方法，用于获取Uri对象所对应的MIME类型。一个内容URI所对应的MIME字符串主要由3部分组成，Android对这3个部分做了如下格式规定。

1. 必须以`vnd`开头。
2. 如果内容URI以路径结尾，则后接`android.cursor.dir/`；如果内容URI以id结尾，则后接`android.cursor.item/`。
3. 最后接上`vnd.<authority>.<path>`。