---
title: "Linux 常用命令"
shortTitle: "Linux 常用命令"
description: "Linux 常用命令"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-03-24
category: 
- "linux"
- "运维"
tag:
- "linux"
- "运维"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Linux 常用命令"
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
  title: "Linux 常用命令"
  description: "Linux 常用命令"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Linux 常用命令

> TODO

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