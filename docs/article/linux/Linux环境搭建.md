---
title: "Linux 环境搭建"
shortTitle: "Linux 环境搭建"
description: "Linux 环境搭建"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-04-27
category: 
- "linux"
- "运维"
tag:
- "linux"
- "运维"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Linux 环境搭建"
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
  title: "Linux 环境搭建"
  description: "Linux 环境搭建"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Linux 环境搭建





## 搭建虚拟机

[VMware 打开运行一段时间后卡死，CPU占比增至100%](https://blog.csdn.net/hxinyu6666/article/details/127893227)

[Centos7修改IP地址](https://blog.csdn.net/WeiHao0240/article/details/121076163#:~:text=Centos7%E4%BF%AE%E6%94%B9IP%E5%9C%B0%E5%9D%80%201%201.%20%E6%9F%A5%E7%9C%8B%E6%9C%AC%E5%9C%B0ip%20ifconfig%201%202%202.,%E9%87%8D%E5%90%AF%E7%BD%91%E7%BB%9C%E6%9C%8D%E5%8A%A1%E5%8D%B3%E5%8F%AF%20service%20network%20restart%201%20%E5%A6%82%E6%9E%9C%E6%B2%A1%E6%9C%89%E9%87%8D%E5%90%AF%EF%BC%8C%E8%A6%81%E6%89%8B%E5%8A%A8%E9%87%8D%E5%90%AF%E4%B8%80%E4%B8%8B%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8D%B3%E5%8F%AF%E3%80%82%20%E6%B3%A8%E6%84%8F%EF%BC%9A%20%E5%A6%82%E6%9E%9C%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%B2%A1%E6%9C%89%E6%98%BE%E7%A4%BA%E5%99%A8%EF%BC%8C%E9%82%A3%E5%B0%B1%E7%99%BB%E5%BD%95%E5%88%B0%E8%B7%AF%E7%94%B1%E5%99%A8%E9%87%8C%E9%9D%A2%E6%9F%A5%E7%9C%8B%E5%9C%A8%E7%BA%BF%E4%B8%BB%E6%9C%BA%E7%9A%84ip%E8%BF%9B%E8%A1%8C%E6%8E%A8%E6%B5%8B%E3%80%82)



[linux yum install **** 提示：Loaded plugins: fastestmirror](https://blog.csdn.net/qcsdn123/article/details/120087514)
[centos安装docker显示 No package docker-ce available](https://blog.csdn.net/qq_25760623/article/details/88657491)
[【Bug解决】yum提示Another app is currently holding the yum lock； waiting for it to exit...](https://blog.csdn.net/Dan1374219106/article/details/112450922)

[Centos7下yum安装软件报错解决办法](https://www.cnblogs.com/HByang/p/9198712.html)
[centos安装docker显示 No package docker-ce available](https://blog.csdn.net/qq_25760623/article/details/88657491)

```shell
cd /etc/sysconfig/network-scripts
vim ifcfg-ens33
vim /etc/sysconfig/network-scripts/ifcfg-ens33
service network restart
```



```shell
ONBOOT="yes"
IPADDR=192.168.30.100
NETMASK=255.255.255.0
GATEWAY=192.168.30.2
DNS1=8.8.8.8
NM_CONTROLLED=no
```



Java 环境

```shell
yum install -y java-1.8.0-openjdk-devel
# 查看存放的位置，找到：jre-1.8.0-openjdk-1.8.0.362.b08-1.el7_9.x86_64
cd /usr/lib/jvm
```

`/etc/profile` 文件中：

```shell
export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk-1.8.0.362.b08-1.el7_9.x86_64
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar
```



xshell 上传下载文件：

```shell
# 安装 lrzsz
yum install lrzsz

# 上传文件
rz

# 保存文件
sz <文件路径>
```





sdkman jdk 管理工具

```shell
curl -s "https://get.sdkman.io" | bash
```







## 报错

1. [Centos /lib64/libc.so.6: version `GLIBC_2.28‘ not found (required by](https://blog.csdn.net/NinjaKilling/article/details/125979091)







## 容器

### Docker-compose 安装

```shell
yum install -y yum-utils device-mapper-persistent-data lvm2 \
&& yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo \
&& yum install  -y docker-ce docker-ce-cli containerd.io \
&& systemctl start docker \
&& yum -y install epel-release \
&& yum -y install python-pip \
&& pip install --upgrade pip \
&& pip install docker-compose
```





## 包管理器

CentOS 安装 pip：

> [Centos下安装pip命令](https://blog.csdn.net/linchare/article/details/105008530)

```shell
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo

yum -y install python-pip

python -m pip install --upgrade pip==20.3.4

pip list
```



安装 runlike，查看 docker 启动参数

```shell
pip install runlike

runlike -p <container_name>
```



`apt-get` 是 Debian 和 Ubuntu 等基于 Debian 的 Linux 发行版中的包管理器，CentOS 则使用的是 `yum` 包管理器。









## MySQL 安装

### 下载

```shell
# 进入官网下载
https://dev.mysql.com/downloads/mysql/
# 或者直接使用
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.20-linux-glibc2.12-x86_64.tar.xz
```



### 解压

```shell
# 确保安装了 tar，可以使用
yum install tar
# 解压
tar -xvJf mysql-8.0.21-linux-glibc2.12-x86_64.tar.xz
# 改名
mv mysql-8.0.21-linux-glibc2.12-x86_64 mysql8.0
```



### 创建存储文件

```shell
# 进入 mysql8.0
cd mysql8.0
# 创建 data 目录
mkdir data
```



### 创建用户组

```bash
groupadd mysql
useradd -g mysql mysql
# 赋予权限
chown -R mysql.mysql /usr/local/mysql/mysql8.0
```



### 初始化 MySQL

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



### 添加服务到系统

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

