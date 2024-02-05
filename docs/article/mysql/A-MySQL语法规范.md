---
title: "MySQL 语法规范"
shortTitle: "A-MySQL 语法规范"
description: "MySQL 语法规范"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2021-05-29
category: 
- "mysql"
- "数据库"
tag:
- "mysql"
- "数据库"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "MySQL 语法规范"
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
  title: "MySQL 语法规范"
  description: "MySQL 语法规范"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# MySQL 语法规范

[[toc]]

1. 不区分大小写，但是建议关键字大写，表名列名小写 
2. 每条命令用 “;” 结尾  
3. 根据每条命令的需要，可以进行换行或者缩进  
4. 注释：
   1. 单行注释：`#注释文字`   
   2. 单行注释：`--注释文字`  
   3. 多行注释：`/* 注释文字 */`



## 数据类型

| 数据类型  | 描述                                                  |
| --------- | ----------------------------------------------------- |
| INT       | 整型，用于存储整数值                                  |
| FLOAT     | 浮点型，用于存储浮点数值                              |
| DOUBLE    | 双精度浮点型，用于存储高精度浮点数值                  |
| DECIMAL   | 十进制数型，用于存储高精度数字                        |
| CHAR      | 固定长度字符串类型，最多可存储255个字符               |
| VARCHAR   | 可变长度字符串类型，最多可存储65535个字符             |
| TEXT      | 长文本类型，用于存储大文本数据，最多可存储65535个字符 |
| DATE      | 日期类型，用于存储日期值                              |
| TIME      | 时间类型，用于存储时间值                              |
| DATETIME  | 日期时间类型，用于存储日期和时间值                    |
| TIMESTAMP | 时间戳类型，用于存储时间戳值                          |
| BOOLEAN   | 布尔类型，用于存储true/false值                        |





## 显示数据库 

```mysql
show databases;
```



## 进入指定数据库

```mysql
use 指定数据库名;
```



## 显示表

```mysql
show tables;
```



## 直接查看指定数据库

```mysql
show tables from 指定数据库名;
```



## 查看当前处于哪个库(调用函数)

```mysql
select database();
```



## 创建表（需要指定有哪些列）

```mysql
create table 表名(
    列名 类型,
    id int,
    name varchar(20)
);
```



## 查看表的结构

```mysql
desc 表名
```



## 查看表中的数据

```mysql
select * from 表名
```



## 想表中插入数据

```mysql
insert into 表名 (列名,列名) values(数据,数据);
```



## 修改表中的数据

```mysql
update 表名 set 列名=值 where 限定条件（如id=1）
```

