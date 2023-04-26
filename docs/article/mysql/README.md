---
notPage: true
---



# MySQL

[[toc]]

:::info 相关文章
[sql语句的执行顺序以及流程（分分钟掌握版）](https://blog.csdn.net/qq_26442553/article/details/79467243)
[mysql 内连接、自然连接、外连接的区别](https://blog.csdn.net/weter_drop/article/details/84729822)
:::

## 数据库的优点

1. 可以持久化数据到本地  
2. 结构化查询



## 数据库的常见概念

1. DB：数据库，存储数据的仓库  
2. DBMS：数据库管理系统，又称为数据库软件或数据库产品，用于创建与管理数据库  
3. SQL：结构化查询语言，用于和数据库通讯的语言，不是某个数据库软件特有的，而是几乎所有的主流数据库软件的通用语言  



## 数据库存储数据的特点 

1. 数据存放到表中，然后表再放到库中  
2. 一个库中可以有多张表，每张表具有唯一的表名来表示自身  
3. 表中有一个或多个列，列又被称为“字段”，相当于Java中的“属性”  
4. 表中的每一行数据，相当于Java中的“对象”  



## 常见的数据库管理系统  

1. MySQL
2. Oracle
3. DB2
4. SQLserver  



## MySQL的背景  

- 前身属于瑞典的一家公司，MySQL AB，后被Sun公司收购，最后Sun公司被Oracle收购  



## MySQL的优点  

- 开源、免费、成本低  
- 性能高、移植性好  
- 体积小，便于安装  



## MySQL的安装  

>属于c/s架构的软件，既有服务端又有客户端，一般安装服务端  

**相关命令：**

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

**备份：**

- 进入 `mysql` 的 `bin` 目录，输入如下命令
- 将其中的 `username` 替换成 `root` 或其他用户，`password` 替换成数据库的真实密码，`databasename` 替换成需要备份的数据库名

```sql
mysqldump -u username -ppassword databasename > databasename.sql
```

**恢复：**

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





## MySQL 中四种语言

1. DQL语言（Data Query Language）
2. DML语言（Data Manipulation Language）
3. DDL语言（Data Define Language）
4. TCL语言（Transaction Control Language）

