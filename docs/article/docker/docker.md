---
title: "Docker"
shortTitle: "Docker"
description: "Docker 基本使用"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-13
category: 
- "运维"
- "docker"
tag:
- "运维"
- "docker"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Docker"
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
  title: "Docker"
  description: "Docker 基本使用"
  author:
    name: gzw
    email: 1627121193@qq.com
---




# Docker

<img src="http://gitee.com/gzwrrr/typora-img/raw/master/images/docker-16445930202595.png" alt="What is Docker?" style="zoom:50%;" />

# Docker 常用命令（持续更新...）

[官方文档地址](https://docs.docker.com/docker-hub/)



<img src="http://gitee.com/gzwrrr/typora-img/raw/master/images/docker.png" alt="docker" style="zoom:50%;" />


## 1.命令

**命令中带中文的都需要替换**

(除了括号前有 $ 符号的，括号中的内容都是可选项)

### 1.1 安装与启动

| 序号 |                         命令                         |       解释       | 
|:----:|:----------------------------------------------------:|:----------------:|
|  1   |                `yum remove docker \`                 |    卸载旧版本    |
|  2   |              `yum install -y yum-utils`              |    下载工具包    |
|  3   | `yum install docker-ce doceker-ce-cli containerd.io` |   安装 docker    |
|  4   |               `systemctl start docker`               |   启动 docker    |
|  5   |                   `docker version`                   |     查看版本     |
|  6   |               `docker run hello-world`               | 运行 hello-world |
|  7   |  `yum remove docker-ce docker-ce-cli containerd.io`  |   卸载 docker    |
|  8   |            `sudo systemctl daemon-reload`            | 重新加载守护进程 |
|  9   |           `sudo systemctl restart docker`            |   重启 docker    |

### 1.2 常用基本命令

| 序号 | 命令                 | 解释     |
| :--: | -------------------- | -------- |
|  1   | `docker info`        | 查看信息 |
|  2   | `docker 命令 --help` | 帮助文档 |

**常用镜像命令**

| 序号 | 命令                                            | 解释                                                         |
| :--: | ----------------------------------------------- | ------------------------------------------------------------ |
|  1   | `docker images`                                 | 查看镜像                                                     |
|  2   | `docker images -aq`                             | 列出所有的镜像（id）                                         |
|  3   | `docker search images名 (--filter=字段=限定值)` | 搜索镜像（如: --filter=STARS=300 指显示 stars 不小于 3000 的结果） |
|  4   | `docker pull 镜像(:版本)`                       | 下载镜像（默认下载最新版，下载指定版本如: docker pull mysql:5.7） |
|  5   | `docker rmi -f (id)`                            | 删除所有镜像（加上 id 则删除对应的镜像）                     |

**常用容器命令**

| 序号 | 命令                                                | 解释                                               |
| :--: | --------------------------------------------------- | -------------------------------------------------- |
|  1   | `docker run (可选参数，具体用 --help 查看) image名` | 运行容器                                           |
|  2   | `docker run -it 镜像名 /bin/bash`                   | 运行并进入该容器                                   |
|  3   | `exit`                                              | 容器停止并退出容器                                 |
|  4   | `快捷键[ctrl + p + q]`                              | 退出容器，但容器不停止                             |
|  4   | `docker ps`                                         | 查看正在运行的容器                                 |
|  5   | `docker rm -f $(docker ps -aq)`                     | 递归删除所有容器                                   |
|  6   | `docker ps -a -q|xargs docker rm`                   | 通过管道符删除所有的容器                           |
|  7   | `docker start 容器id`                               | 启动容器                                           |
|  8   | `docker restart 容器id`                             | 重启容器                                           |
|  9   | `docker stop 容器id`                                | 停止当前正在运行的容器                             |
|  10  | `docker kill 容器id`                                | 强制停止当前容器                                   |
|  11  | `docker run -d 镜像名`                              | 后台运行容器，但是如果没有前台，后台容器会直接结束 |
|  12  | `docker logs -f -t --tail 容器id`                   | 查看日志                                           |
|  13  | `docker top 容器id`                                 | 查看容器进程                                       |
|  14  | `docker inspect 容器id`                             | 查看容器的信息                                     |
|  15  | `docker exec -it 容器id bash路径`                   | 进入容器并开启了新的终端                           |
|  16  | `docker exec -it 容器id ip addr`                    | 查看容器的内部网络地址                             |
|  17  | `docker attach 容器id`                              | 进入容器但不会开启新的终端                         |
|  18  | `docker cp 容器id:容器内的路径 主机目录 `           | 拷贝文件到主机                                     |



## 2.容器数据卷

> docker 容器中的数据可以同步到本地，就是将容器内的目录挂载到 Linux 中

| 序号 | 命令                                                         | 解释                                        |
| ---- | ------------------------------------------------------------ | ------------------------------------------- |
| 1    | `docker run -it -v 本地目录:容器目录 镜像名 bash路径`        | 将容器中的目录挂载到本地目录上              |
| 2    | `docker run -it --name 容器名1 --volumes-from 容器名2 容器镜像(:版本)` | 相当于容器1继承容器二，数据共享（双向复制） |



## 3.dockerfile

> 脚本生成镜像

| 序号 | 命令       | 解释                                        |
| :--: | ---------- | ------------------------------------------- |
|  1   | FROM       | 指定镜像的基础镜像                          |
|  2   | MAINTAINER | 说明作者和邮箱                              |
|  3   | RUN        | 镜像运行执行的脚本                          |
|  4   | ADD        | 编译镜像时复制文件到镜像中                  |
|  5   | CMD        | 设置容器的启动命令                          |
|  6   | LABEL      | 添加镜像标签                                |
|  7   | ENV        | 设置容器的环境变量                          |
|  8   | EXPOESE    | 镜像暴露的端口                              |
|  9   | COPY       | 编译时复制文件到镜像中                      |
|  10  | ENTRYPOINT | 设置容器的入口程序                          |
|  11  | VOLUME     | 设置容器的挂载卷                            |
|  12  | USER       | 设置运行 RUN CMD ENTRYPOIN 的用户名         |
|  13  | WORKDIR    | 设置 RUN CMD ENTRYPOINT COPY ADD 的工作目录 |
|  14  | ARG        | 设置编译镜像时加入的参数                    |
|  15  | ONBUILD    | 设置镜像的构建命令                          |
|  16  | STOPSIGNAL | 设置容器的退出信号量                        |





## 4.docker 网络

> 1. 安装了 docker 后，主机上就会多出一个 docker0 网卡，该网卡是桥接模式，使用了 evth-pair 技术，相当于连通各个容器的路由器
> 2. 每启动一个 docker 容器，docker 就会给 docker 容器分配一个容器 ip，容器网卡都是成对出现的，因为 evth-pair 就是一对虚拟设备接口，一端连接协议，另一端成对的网卡彼此相连



### 4.1 自定义网络

> - 自己创建网络使用「桥接模式」
>
> - 自定义网络可以直接使用「容器名」ping 通其他容器

| 序号 | 命令                                                         | 解释                                                         |
| :--: | ------------------------------------------------------------ | ------------------------------------------------------------ |
|  1   | `docker network ls`                                          | 列出所有 docker 网络                                         |
|  2   | `docker network inspect 网络名`                              | 查看网络的配置信息                                           |
|  3   | `docker network create --driver bridge --subnet 自定ip --gateway 自定网关 网络名` | 自定义一个网络并指定 ip 、网关、网络名                       |
|  4   | `docker run -d -P --name 容器名 --net 网络名 镜像名`         | 在自定义网络中启动容器                                       |
|  5   | `docker network connect 网络名 容器名`                       | 将一个网络下的容器与另一个网络连通，这样命令中的容器就相当于到了指定的网络中，即一个容器两个 ip |



### 4.2 docker compose

> docker compose 可以管理编排容器
>
> 使用 yml 文件配置
>
> 三个步骤：
>
> 1. docker file
> 2. docker-compose.yml
> 3. docker-compose up



#### 4.2.1 安装步骤

1. 下载 docker-compose

> 官方下载地址，很慢，而且版本太高后续案例可能会启动失败

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

> 国内镜像地址，版本也比较低，推荐使用这个

```shell
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

2. 授权

```shell
 sudo chmod +x /usr/local/bin/docker-compose
```

3. 查看版本

```shell
docker-compose version
```



#### 4.2.2 测试案例（官网案例）

1. 创建并进入目录

```shell
 mkdir composetest
 cd composetest
```

2. 创建测试文件 ( python 应用 )

```shell
vim app.py
```

3. 在 app.py 中写入服务内容

```python
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
```

4. 创建 requirements.txt ，在其中说明使用到的依赖

```txt
flask
redis
```

5. 创建并编写 Dockerfile

```txt
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
```

6. 创建 docker-compose.yml 文件并定义服务

> version 版本过高，例如使用 3.9 ，之后 docker-compose up 可能会失败

```yml
version: "3"
services:
  web:
    build: .
    ports:
      - "5000:5000"
  redis:
    image: "redis:alpine"
```

7. 确认所有文件准备完毕

![image-20220319110958738](http://gitee.com/gzwrrr/typora-img/raw/master/images/image-20220319110958738.png)

8. 执行启动命令

> 这一步可能会特别慢，主要是拉取镜像的问题，就算可以科学上网也可能构建失败，需要多试几次

```shell
docker-compose up
```

9. 在 docker-compose 所在的目录下停止服务

```shell
docker-compose down
```



#### 4.2.3 docker-compose 编写规则

> docker-compose 核心概念：
>
> 1. 服务 service：一个个容器示例
> 2. 工程 project：由一组关联的应用容器组成的一个「完整业务单元」，在 docker-compose.yml 文件中定义
>
> docker-compose 核心配置有三层：
>
> 1. version: ‘xx’
> 2. services:
>    - ...
> 3. 其他：
>
> ​      volumes:
>
> ​	  networks:
>
> ​	  config:

**常用命令**：

| 序号 | 命令                                | 解释                                           |
| :--: | ----------------------------------- | ---------------------------------------------- |
|  1   | `docker-compose -h`                 | 查看帮助                                       |
|  2   | `docker-compose up`                 | 启动所有 docker-compose 服务                   |
|  3   | `docker-compose up -d`              | 启动所有 docker-compose 服务并在后台运行       |
|  4   | `docker-compose down`               | 停止并删除容器、网络、卷、镜像等               |
|  5   | `docker-compose exec yml里的服务id` | 进入容器示例内部                               |
|  6   | `docker-compose ps`                 | 展示当前 docker-compose 编排过的运行的所有容器 |
|  7   | `docker-compose top`                | 展示当前 docker-compose 编排过的容器进程       |
|  8   | `docker-compose logs yml里的服务id` | 查看容器输出日志                               |
|  9   | `docker-compose config`             | 检查配置                                       |
|  10  | `docker-compose config -q`          | 检查配置，有问题才输出                         |
|  11  | `docker-compose restart`            | 重启服务                                       |
|  12  | `docker-compose start`              | 启动服务                                       |
|  13  | `docker-compose stop`               | 停止服务                                       |







### 4.3 docker swarm

> 集群部署









