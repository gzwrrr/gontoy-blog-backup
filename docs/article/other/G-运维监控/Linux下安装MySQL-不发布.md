---
title: "Linux下安装MySQL"
shortTitle: "Linux下安装MySQL"
description: "Linux下安装MySQL"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-04-21
category: 
- "linux"
- "安装"
tag:
- "linux"
- "安装"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Linux下安装MySQL"
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
  title: "Linux下安装MySQL"
  description: "Linux下安装MySQL"
  author:
    name: gzw
    email: 1627121193@qq.com
---


# Linux下安装MySQL

[[toc]]


# 下载

```shell
# 进入官网下载
https://dev.mysql.com/downloads/mysql/
# 或者直接使用
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.20-linux-glibc2.12-x86_64.tar.xz
```



# 解压

```shell
# 确保安装了 tar，可以使用
yum install tar
# 解压
tar -xvJf mysql-8.0.21-linux-glibc2.12-x86_64.tar.xz
# 改名
mv mysql-8.0.21-linux-glibc2.12-x86_64 mysql8.0
```



# 创建存储文件

```shell
# 进入 mysql8.0
cd mysql8.0
# 创建 data 目录
mkdir data
```



# 创建用户组

```bash
groupadd mysql
useradd -g mysql mysql
# 赋予权限
chown -R mysql.mysql /usr/local/mysql/mysql8.0
```



# 初始化 MySQL

```shell
# 进入 bin 目录
cd bin
# 初始化基本信息
./mysqld --user=mysql --basedir=/usr/local/mysql/mysql8.0 --datadir=/usr/local/mysql/mysql8.0/data/ --initialize
# 如果报错可能是依赖库为下载
yum install -y libaio.so.1
yum install -y libaio
# 基本信息初始化完成后记下最后一行的临时密码
2022-08-26T09:55:28.807250Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: 9qwb/o;r!feD
```



# 添加服务到系统

```shell
# 进入 mysql8.0 后
cp -a ./support-files/mysql.server /etc/init.d/mysql
# 授权并添加服务
chmod +x /etc/init.d/mysql
chkconfig --add mysql
# 创建 my.cnf
vim my.cnf
# 设置权限
chmod 664 /etc/my.cnfs
# 进入 cd /etc/init.d，修改 mysql 文件
cd /etc/init.d
vim mysql
# 添加实际路径
basedir=/usr/local/mysql/mysql8.0
datadir=/usr/local/mysql/mysql8.0/data
```

