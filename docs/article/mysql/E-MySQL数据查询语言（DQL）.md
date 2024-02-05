---
title: "MySQL 数据查询语言"
shortTitle: "E-MySQL 数据查询语言"
description: "MySQL 数据查询语言"
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
  text: "MySQL 基础知识"
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
  title: "MySQL 数据查询语言"
  description: "MySQL 数据查询语言"
  author:
    name: gzw
    email: 1627121193@qq.com
---









# MySQL 数据查询语言（DQL）

[[toc]]



基础查询（注意：查询的表格是一个虚拟的表格） 
查询的列表可以是：  

1. 表中的字段  
2. 常量值  
3. 表达式  
4. 函数 

:::info 语法

select 查询列表  

from 查询的表名  

:::



### 查询表中的单个字段

```mysql
select 单个字段名 from 表名;  
```



### 查询表中的多个字段

```mysql
select 字段名,字段名,... from 表名;
```



### 查询表中的全部字段

```mysql
select * from 表名;
```



### 查询表中的常量

```mysql
select 常量;
```



### 查询表达式（表达式如：100*10）

```mysql
select 表达式;
```



### 查询函数

```mysql
select 函数名();
```



### 查询数据时起别名（便于理解，如果要查询的字段有重名的情况，使用别名可以区分开来）

```mysql
1、select 表达式 as 别名, 表达式 as 别名,... from 表名;
2、select 表达式 别名, 表达式 别名,... from 表名;
```



### 去除重复的数据

```mysql
select distinct 字段 from 表名;
```



### mysql中的+只是运算符，字段拼接则需要：

```mysql
select concat(字段，字段，字段) as 结果 from 表名;
```



### 判断是否为null，如果是则给出其他结果

```mysql
select ifnull(可能为空的字段,希望的输出的结果) as 字段的别名 （可加原来的字段做对比） from 表名;
```





:::info 语法 

select 查询列表 from 表名 where 筛选条件;  

:::

  

:::info 分类

分类： 

1. 按条件表达式筛选:  
2. 条件运算符：`> < = （不等于）<> >= <= （安全等于）<=>`
3. 按逻辑表达式筛选  
4. 逻辑运算符：`（&& || ! ） 标准的是：and or not`  
5. 模糊查询，涉及的关键词：`like (between and) in (is null)`  
   1. 通配符：  
   2. `%` 代表任意多个字符（包含0个字符）  
   3. `_` 代表任意单个字符  
   4. 转义符可以为：`\`  或者指定任意字符为转义符（以指定 `#` 为转义符为例），语法：... like '任意通配符#任意通配符' escape '#';  

:::



### 按条件表达式筛选

```mysql
select 查询列表 from 表名 where 条件表达式语句（包含但不全有：`> < = <> >= <= <=>`）;
```



### 按逻辑表达式子

```mysql
select 查询列表 from 表名 where 逻辑表达式语句（包含但不全有：`and or not > < = <> >= <= <=>`）;
```



### 模糊查询（%为通配符；注意：like后的模糊匹配字符必须用单引号）

```mysql
（1）like（一般和通配符一起使用）：  
    select 查询列表 from 表名 where 字段名 like '%包含的字符%'（用通配符筛选出字段应该包含的内容）;  
（2）between .. and .. （包含临界值，相当于：字段名>=条件1 and 字段名<=条件2）：  
    select 查询列表 from 表名 where 字段名 between 条件 and 条件;  
（3）in（注意：不支持通配符，且相当于：字段名=字段1 or 字段名=字段2 or ...）：  
     select 查询列表 from 表名 where 字段名 in(字段,字段,...);  
（4）is null：  
    select 查询列表 from 表名 where 字段名 is （not） null;  
    注：用`<=>`表示判断是否等于（既可以判断null又可以判断具体的值，但可读性较差），返回true或false，如：  
    select 查询列表 from 表名 where 字段名 `<=>` 值;
```



