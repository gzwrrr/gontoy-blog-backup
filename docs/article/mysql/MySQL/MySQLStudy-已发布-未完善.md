---
title: "MySQL 基础"
shortTitle: ""
description: ""
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
timeline: true,
dir:
  text: "MySQL 基础"
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
  title: "MySQL 基础"
  description: "MySQL 基础"
  author:
    name: gzw
    email: 1627121193@qq.com
---

# 数据库及其语言

注：中文括号（）代表补充说明，英文括号()是语句的内容，不是补充不可省略。

## 一、数据库的优点：
1. 可以持久化数据到本地  
2. 结构化查询



## 二、数据库的常见概念：  

1. DB：数据库，存储数据的仓库  
2. DBMS：数据库管理系统，又称为数据库软件或数据库产品，用于创建与管理数据库  
3. SQL：结构化查询语言，用于和数据库通讯的语言，不是某个数据库软件特有的，而是几乎所有的主流数据库软件的通用语言  



## 三、数据库存储数据的特点：  

1. 数据存放到表中，然后表再放到库中  
2. 一个库中可以有多张表，每张表具有唯一的表名来表示自身  
3. 表中有一个或多个列，列又被称为“字段”，相当于Java中的“属性”  
4. 表中的每一行数据，相当于Java中的“对象”  



## 四、常见的数据库管理系统  

1.MySQL
2.Oracle  
3.DB2  
4.SQLserver  



## 五、MySQL的背景  

- 前身属于瑞典的一家公司，MySQL AB，后被Sun公司收购，最后Sun公司被Oracle收购  



## 六、MySQL的优点  

- 开源、免费、成本低  
- 性能高、移植性好  
- 体积小，便于安装  



## 七、MySQL的安装  

>属于c/s架构的软件，既有服务端又有客户端，一般安装服务端  


## 八、相关命令

| 序号 |                             命令                             |      解释      |
| :--: | :----------------------------------------------------------: | :------------: |
|  1   |                       net start mysql                        |   启动 mysql   |
|  2   |                        net stop mysql                        |   关闭 mysql   |
|  3   | mysql -uroot -p / mysql -h localhost -P 3306 -u root -p (+password) |   登入 MySQL   |
|  4   |                  mysql --version / mysql -V                  | 查看数据库版本 |
|  5   |                        exit / ctrl+c                         |   退出 MySQL   |



## 事务四大特性与隔离级别

- 原子性
- 一致性
- 隔离性
- 持久性

| 隔离级别（Isolation Level） | 脏读（Dirty Reads） | 不可重复读（Nonrepeatable Reads） | 幻读（Phantoms） |
| :-------------------------: | :-----------------: | :-------------------------------: | :--------------: |
|          读未提交           |        允许         |               允许                |       允许       |
|          读已提交           |       不允许        |               允许                |       允许       |
|          可重复读           |       不允许        |              不允许               |       允许       |
|           串行化            |       不允许        |              不允许               |      不允许      |



## 数据库的备份（命令行方式）

### 备份

- 进入 `mysql` 的 `bin` 目录，输入如下命令
- 将其中的 `username` 替换成 `root` 或其他用户，`password` 替换成数据库的真实密码，`databasename` 替换成需要备份的数据库名

```sql
mysqldump -u username -ppassword databasename > databasename.sql
```

### 恢复

- 进入 `mysql` 的 `bin` 目录，再登入mysql，输入如下命令

- 将其中的 `databasename` 更换成对应的备份文件的名称

```sql
source databasename.sql;
```





## MySQL中的注意点

1. MySQL中没有字符串的概念，只有字符，用‘’单引号表示（不区分单双引号，一般用单引号）  
2. MySQL中+只是运算符，若字符相加则先将字符转化成数值再相加，若是转化失败，则将字符直接转换成数值0再相加；若用+的表达式中有一个值为null，结果一定为null
3. MySQL中为了区别特殊字段和关键字时，有时会将特殊字段用双引号区别开来
4. 着重符号为：``  
5. 转义符为：\ 或者自己指定转义符（见下面的模糊查询）

---



## MySQL的语法规范

1、不区分大小写，但是建议关键字大写，表名列名小写  
2、每条命令用 “;” 结尾  
3、根据每条命令的需要，可以进行换行或者缩进  
4、注释：

>（1） 单行注释：#注释文字   
>（2） 单行注释：--注释文字  
>（3） 多行注释：/* 注释文字 */

---

### 1、显示数据库 
    show databases;
### 2、进入指定数据库
    use 指定数据库名;
### 3、显示表
    show tables;
### 4、直接查看指定数据库
    show tables from 指定数据库名;
### 5、查看当前处于哪个库(调用函数)
    select database();
### 6、创建表（需要指定有哪些列）
    create table 表名(
        列名 类型,
        id int,
        name varchar(20)
    );
### 7、查看表的结构
    desc 表名
### 8、查看表中的数据
    select * from 表名
### 9、想表中插入数据
    insert into 表名 (列名,列名) values(数据,数据);
### 10、修改表中的数据
    update 表名 set 列名=值 where 限定条件（如id=1）

---


# 1、DQL语言（Data Query Language）

>1.基础查询（注意：查询的表格是一个虚拟的表格）  
查询的列表可以是：  
>（1）表中的字段  
>（2）常量值  
>（3）表达式  
>（4）函数 
>>语法：   
>>select 查询列表  
>>from 查询的表名  

### 1、查询表中的单个字段
    select 单个字段名 from 表名;  

### 2、查询表中的多个字段
    select 字段名,字段名,... from 表名;

### 3、查询表中的全部字段
    select * from 表名;

### 4、查询表中的常量
    select 常量;

### 5、查询表达式（表达式如：100*10）
    select 表达式;

### 5、查询函数
    select 函数名();

### 6、查询数据时起别名（便于理解，如果要查询的字段有重名的情况，使用别名可以区分开来）
    1、select 表达式 as 别名, 表达式 as 别名,... from 表名;
    2、select 表达式 别名, 表达式 别名,... from 表名;

### 7、去除重复的数据
    select distinct 字段 from 表名;

### 8、mysql中的+只是运算符，字段拼接则需要：
    select concat(字段，字段，字段) as 结果 from 表名;

### 9、判断是否为null，如果是则给出其他结果
    select ifnull(可能为空的字段,希望的输出的结果) as 字段的别名 （可加原来的字段做对比） from 表名;

---

>2.条件查询  
>分类：  
>1.按条件表达式筛选:  
>条件运算符：`> < = （不等于）<> >= <= （安全等于）<=>`
>2.按逻辑表达式筛选  
>逻辑运算符：（&& || ! ） 标准的是：and or not  
>3.模糊查询：  
>涉及的关键词：like (between and) in (is null)  
>> 通配符：  
>> （1）% 代表任意多个字符（包含0个字符）  
>> （2）_ 代表任意单个字符  
>> （3）转义符可以为：\ 或者指定任意字符为转义符（以指定#为转义符为例）：  
>>
>> >语法：... like '任意通配符#任意通配符' escape '#';  


>>语法：  
>>select 查询列表 from 表名 where 筛选条件;  

### 1、按条件表达式筛选：
    select 查询列表 from 表名 where 条件表达式语句（包含但不全有：`> < = <> >= <= <=>`）;

### 2、按逻辑表达式子：
    select 查询列表 from 表名 where 逻辑表达式语句（包含但不全有：`and or not > < = <> >= <= <=>`）;

### 3、模糊查询（%为通配符；注意：like后的模糊匹配字符必须用单引号）：
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


---
# 2、DML语言（Data Manipulation Language）

---
# 3、DDL语言（Data Define Language）

---
# 4、TCL语言（Transaction Control Language）

