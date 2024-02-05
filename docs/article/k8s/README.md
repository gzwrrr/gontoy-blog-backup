---
notPage: true
---





# Kubernetes



:::info 相关资源

1. Kubernetes 简单使用，[官网戳这](https://kubernetes.io/zh-cn/docs/home/)  

2. [云原生Java架构师的第一课K8s+Docker+KubeSphere+DevOps](https://www.bilibili.com/video/BV13Q4y1C7hS/?p=68&vd_source=e356fec025b50061af78324a814f8da0)

3. [云原生实战 k8s 语雀文档](https://www.yuque.com/leifengyang/oncloud/ghnb83#4d9Xi)

4. [K8S 官方文档](https://kubernetes.io/docs/home/)

:::



## 概述

1. Google 开源项目
2. 可移植的、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化





## 特性

1. 自动装箱
2. 自我修复
3. 水平扩展
4. 服务发现
5. 滚动更新
6. 版本回退
7. 密钥与配置管理
8. 存储编排
9. 批处理





## 架构

主控节点（master），节点中包括：

1. ApiServer：集群统一入口，以 restful 方式交给 etcd 存储
2. Scheduler：节点调度，选择 node 节点应用部署
3. ControllerManager：处理集群中常规后台任务，一个资源对应一个控制器
4. etcd：存储系统，用于保存集群相关的数据

工作节点（node），节点中包括：

1. Kubelet：master 节点派到 node 节点中的代表，用于管理本机容器操作
2. KubeProxy：提供网络代理，负载均衡等操作





## 核心概念

1. Pod：最小的部署单元，其中可以包含多个容器，这些容器是共享网络的，生命周期较短
2. Controller：可以保证预期的 Pod 副本的数量，可以进行有/无状态的应用部署，确保所有的 node 运行同一个 Pod，可以创建一次性任务或者定时任务
3. Service：定义一组 Pod 的访问规则



期间集群方式：

1. 单 master 集群
2. 多 master 集群

两种常见部署方式：

1. kubeadm：简单，比较常用
2. 二进制包部署：较难

