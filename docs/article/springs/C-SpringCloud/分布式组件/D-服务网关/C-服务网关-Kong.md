---
title: "服务网关-Kong"
shortTitle: "C-服务网关-Kong"
description: "服务网关-Kong"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-01-20
category: 
- "分布式"
tag:
- "分布式"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "服务网关-Kong"
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
  title: "服务网关-Kong"
  description: "服务网关-Kong"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 服务网关-Kong

> [Kong API 练习](https://mockbin.org/)（需要科学上网）
>
> [Kong 官方文档](https://docs.konghq.com/gateway/3.2.x/get-started/services-and-routes/)

:::info 相关文章

[网关神器Kong（一）：介绍](https://cloud.tencent.com/developer/article/1938873#:~:text=Kong%20%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%9E%B6%E6%9E%84%201%20Kong%20%E4%BD%BF%E7%94%A8%20PostgreSQL%20%E6%88%96%20Cassandra,%E6%8F%90%E4%BE%9B%E4%BA%86%E6%8F%92%E4%BB%B6%E6%A8%A1%E5%9E%8B%EF%BC%8C%E4%BD%BF%E7%94%A8%20Lua%20%E8%84%9A%E6%9C%AC%E6%9D%A5%E5%AF%B9%20Nginx%20%E6%95%B4%E4%B8%AA%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%BF%9B%E8%A1%8C%E6%89%A9%E5%B1%95%E3%80%82%20%E5%AE%9E%E7%8E%B0%E4%BA%86%E4%B8%80%E4%BA%9B%E5%B8%B8%E7%94%A8%E6%8F%92%E4%BB%B6%EF%BC%88%20%E9%99%90%E6%B5%81%E3%80%81%E7%86%94%E6%96%AD%E3%80%81%E9%AA%8C%E6%9D%83%E7%AD%89%20%EF%BC%89%E3%80%82)

[网关服务Kong和konga介绍安装使用教程](https://zhuanlan.zhihu.com/p/421894560)

[KONG网关 — 介绍安装](https://zhuanlan.zhihu.com/p/109720608)

[使用Kong作为微服务网关](https://zhuanlan.zhihu.com/p/268012199)

:::





## 简介

![img](https://ask.qcloudimg.com/http-save/yehe-2680217/b7da51903ec5a93effa2acb11046e95f.png?imageView2/2/w/2560/h/7000)

> Kong 是由 Mashape 开源的一款具有高性能、高可用特点的云原生架构下的分布式 API 网关。基于 Nginx 和 OpenResty 的 Kong 获得了非常高的性能。Lua 脚本的插件系统架构设计也使得其具有高扩展性的能力后并不会丢失性能。
>
> Kong = Nginx + Lua + OpenResty 
>
> 契约式编程，由于无法像正常开发团队一样拥有那么多的机会沟通与交流。所以核心服务就会对外定义一些规范与接口，用于提供扩展能里。而开发者只需要按照规范进行遵守即可。这样保证了插件开发流程的简洁与高效。

优势：

- 插件市场丰富，很多插件可以降低开发成本；

- 可扩展性，可以编写lua脚本来定制自己的参数验证权限验证等操作；

- 基于openResty，openResty基于Nginx保障了强劲的性能；

- 便捷性能扩容，只需要水平增加服务器资源性能就能提升；

- 负载均衡健康检查

- Cloud-Native：与平台无关，Kong可以在任何平台上运行-从裸机到容器-并且可以在本机上的每个云上运行。
- Kubernetes-Native：使用官方的Ingress Controller通过本地Kubernetes CRD声明性地配置Kong，以路由和连接所有L4 + L7通信。
- 动态负载平衡：跨多个上游服务对流量进行负载平衡。
- 基于哈希的负载平衡：具有一致的哈希/粘性会话的负载平衡。
- 熔断器：智能跟踪不健康的上游服务。
- 运行状况检查：主动和被动监视您的上游服务。
- 服务发现：在第三方DNS解析器（例如Consul）中解析SRV记录。
- 无服务器：直接从Kong调用和保护AWS Lambda或OpenWhisk功能。
- WebSockets：通过WebSockets与您的上游服务进行通信。
- gRPC：与gRPC服务进行通信，并通过日志记录和可观察性插件观察流量
- OAuth2.0：轻松将OAuth2.0身份验证添加到您的API。
- 日志记录：通过HTTP，TCP，UDP或磁盘记录对系统的请求和响应。
- 安全性：ACL，僵尸程序检测，允许/拒绝IP等…
- Syslog：登录到系统日志。
- SSL：为基础服务或API设置特定的[SSL证书](https://cloud.tencent.com/product/ssl?from=20065&from_column=20065)。
- 监视：实时监视提供关键的负载和性能服务器指标。
- 转发代理：使Kong连接到中间透明HTTP代理。
- 认证：HMAC，JWT，基本等。
- 速率限制：基于许多变量来阻止和限制请求。
- 转换：添加，删除或处理HTTP请求和响应。
- 缓存：在代理层缓存并提供响应。
- CLI：从命令行控制Kong群集。
- REST API：Kong可以使用其[RESTful API](https://cloud.tencent.com/product/slshttp?from=20065&from_column=20065)进行操作，以实现最大的灵活性。
- 地理复制：跨不同区域的配置始终是最新的。
- 故障检测和恢复：如果您的Cassandra节点之一发生故障，则Kong不会受到影响。
- 集群：所有Kong节点自动加入集群，并在各个节点之间更新其配置。
- 可扩展性：Kon本质上是分布式的，只需添加节点即可水平扩展。
- 性能：Kong通过扩展和使用NGINX作为核心轻松处理负载。
- 插件：可扩展的体系结构，用于向Kong和API添加功能。

![img](https://ask.qcloudimg.com/http-save/yehe-2680217/96ab8b6804809563de779bc759f8f6c3.png?imageView2/2/w/2560/h/7000)

- Kong 提供了 Http/Rest 的接口来实现配置 ，使得其可以更简单的构建图形化界面进行动态配置。
- OpenResty 是一个基于 Nginx 的库，它将 Nginx 进行封装，并提供了整个生命周期的 Hook（ 钩子 ），使得开发者可以通过 Lua 脚本对 Nginx 进行插件化管理。

- Kong 使用PostgreSQL 或 Cassandra 来对其配置文件进行持久化存储，使得可以进行集群管理。
- Kong 提供了插件模型，使用 Lua 脚本来对 Nginx 整个生命周期进行扩展。实现了一些常用插件（ 限流、熔断、验权等 ）。

网关架构：

1. RESTful API
2. 插件层
3. 集群、数据存储
4. OpenResty
5. Nginx





## Docker 安装 Kong

:::info 参考文章

[kong/kongA docker部署+汉化](https://blog.csdn.net/qq_16174727/article/details/122614066)

:::

```shell
# 创建网络
docker network create kong-net

# 启动 PostgreSQL
sudo docker run -d --name kong-database \
 --network=kong-net \
 -v /opt/pgdata:/var/lib/postgresql/data \
 -p 5432:5432 \
 -e "POSTGRES_USER=kong" \
 -e "POSTGRES_DB=kong" \
 -e "POSTGRES_PASSWORD=kong" \
 --restart always \
 postgres:9.6
 
 
 # 准备 Kong 数据库
 docker run --rm \
 --network=kong-net \
 -e "KONG_DATABASE=postgres" \
 -e "KONG_PG_HOST=kong-database" \
 -e "KONG_PG_USER=kong" \
 -e "KONG_PG_PASSWORD=kong" \
 -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
 kong:latest kong migrations bootstrap


# 启动 Kong
 docker run -d --name kong \
 --network=kong-net \
 -e "KONG_DATABASE=postgres" \
 -e "KONG_PG_HOST=kong-database" \
 -e "KONG_PG_USER=kong" \
 -e "KONG_PG_PASSWORD=kong" \
 -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
 -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
 -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
 -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
 -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
 -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
 -p 80:8000 \
 -p 443:8443 \
 -p 8001:8001 \
 -p 8444:8444 \
 --restart always \
 kong:latest
 
 
 # 启动 KongA
  docker run -d -p 1337:1337 \
 --network=kong-net \
 -e "KONG_DATABASE=postgres" \
 -e "KONG_PG_HOST=kong-database" \
 -e "KONG_PG_USER=kong" \
 -e "KONG_PG_PASSWORD=kong" \
 -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
 -e "DB_DATABASE=konga_db" \
 -e "KONGA_HOOK_TIMEOUT=120000" \
 --name konga \
 pantsel/konga

     
# 创建一个临时目录
mkdir dockertmp
cd dockertmp

# 查找konga的容器 id
docker ps -a     
# 停止正在运行的容器
docker stop <konga容器id>
# 将容器的文件复制到本地
docker cp <konga容器id>:/app/assets ./            
 
# 拉取语言插件镜像
docker pull jsonljd/konga-lang-plugin:latest
 
# 拉取镜像，需要设置逻辑目录
docker run -d --name konga-lang-plugin \
 -v ./assets:/app/assets \
 jsonljd/konga-lang-plugin                       
 
# 覆盖
docker cp ./assets <konga容器id>:/app
# 启动容器
docker start <konga容器id>
```



## 简单使用

> 服务管理和路由管理



管理服务：

添加一个服务：

```shell
curl -i -s -X POST http://localhost:8001/services \
  --data name=example_service \
  --data url='http://mockbin.org'
```

查看服务的状态：

```shell
# /services/{service name or id}
curl -X GET http://localhost:8001/services/example_service
```

更新服务的配置，比如将服务的请求重试次数从 5 改到 6：

```shell
curl --request PATCH \
  --url localhost:8001/services/example_service \
  --data retries=6
```

查看所有的服务：

```shell
curl -X GET http://localhost:8001/services
```





管理路由：

创建路由：

```shell
curl -i -X POST http://localhost:8001/services/example_service/routes \
  --data 'paths[]=/mock' \
  --data name=example_route
```

查看服务的路由：

```shell
# /services/{service name or id}/routes/{route name or id}
# /routes/{route name or id}
curl -X GET http://localhost:8001/services/example_service/routes/example_route
```

更新路由信息：

```shell
curl --request PATCH \
  --url localhost:8001/services/example_service/routes/example_route \
  --data tags="tutorial"
```

查看所有路由：

```shell
curl http://localhost:8001/routes
```







## 限流插件

限流，每分钟五次

```shell
curl -i -X POST http://localhost:8001/plugins \
  --data name=rate-limiting \
  --data config.minute=5 \
  --data config.policy=local
```

验证五次过后就限制：

```shell
for _ in {1..6}; do curl -s -i localhost:8000/mock/request; echo; sleep 1; done
```

服务水平的限流：

```shell
curl -X POST http://localhost:8001/services/example_service/plugins \
   --data "name=rate-limiting" \
   --data config.minute=5 \
   --data config.policy=local
```

路由水平的限流：

```shell
curl -X POST http://localhost:8001/routes/example_route/plugins \
   --data "name=rate-limiting" \
   --data config.minute=5 \
   --data config.policy=local
```

消费者水平的限流：

> Consumers are created using the [consumer object](https://docs.konghq.com/gateway/latest/admin-api/#consumer-object) in the Admin API.

```shell
curl -X POST http://localhost:8001/consumers/ \
  --data username=jsmith
  
curl -X POST http://localhost:8001/plugins \
   --data "name=rate-limiting" \
   --data "consumer.username=jsmith" \
   --data "config.second=5"
```





