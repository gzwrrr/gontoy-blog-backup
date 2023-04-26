---
title: "K8S核心概念"
shortTitle: "B-K8S核心概念"
description: "K8S核心概念"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-01-13
category: 
- "运维"
- "K8S"
tag:
- "运维"
- "K8S"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "K8S核心概念"
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
  title: "K8S核心概念"
  description: "K8S核心概念"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# K8S 核心概念

## NameSpace

> 用来对集群资源进行隔离划分，默认只隔离资源，不隔离网络

K8S 自带的命名空间：

1. default
2. kube-node-lease
3. kube-public
4. kube-system
5. kubernates-dashboard

```shell
# 获取命名空间
kubectl get namespace
# 或者
kubectl get ns

# 注意下面只会获取 default 下的 pod
kubectl get pods
# 加上 -A 会获取全部的 pod 
kubectl get pods -A

# 查看指定命名空间下的 pod
kubectl get pod -n <namespace>

# 创建命名空间
kubectl create ns <namespace>

# 删除命名空间，会把该命名空间中的所有资源一并删除
kubectl delete ns <namespace>
```

使用配置文件创建命名空间：

```yaml
apiVersion: v1
kind: Namespace
metadata: 
  name: <namespace>
```

注意使用配置文件创建的资源一般也是用对应的配置文件删除的：

```shell
# 创建
kubectl apply -f <yamlfile>
# 删除
kubectl delete -f <yamlfile>
```





## Pod

> 运行中的一组容器，Pod 是 K8S 中应用的最小单位

1. 每一个 Pod 都有一个唯一 ID
2. Pod 内的所有容器共享网络空间以及存储资源

```shell
# 创建 pod，会分配给某一个工作节点
kubectl run <podname> --image=<imagename>

# 查看 pod 创建的信息
kubectl describe pod <podname>

# 删除 pod
kubectl delete pod <podname> -n <namespace>
# 强制删除
kubectl delete pod <podname> -n <namespace> --grace-period=0 --force

# 查看 pod 日志
kubectl logs <podname>

# 查看 pod 的 id
kubectl get pod -Owide

# 进入 pod
kubectl exec -it <podname> -- /bin/bash

# 查看 pod 的运行状态
kubectl describe pods -n <namespace>
```

使用配置文件创建 pod：

```yaml
apiVersion: v1
kind: Namespace
metadata: 
  name: <namespace>
  labels:
    app: <appname>
spec:
  containers:
  - image: <imagename>
    name: <podname>
```





## Deployment

> 控制 Pod，使得 Pod 拥有多个副本，可以自愈、扩容等

1. 使用 deployment 创建容器后，Pod 删除或者崩溃时 K8S 会自动再起 Pod
2. 注意，故障转移需要设置一个比较合理的时间，太短会占用其他机器的资源，太长时间服务不可用也不行
3. 更新应用时可以做到滚动更新，也可以进行版本回退

```shell
# 创建一次 deployment 部署，会创建一个或多个 Pod
kubectl create deployment <deployname> --image=<imagename>

# 注意：普通删除 Pod 的命令是不能删除 deployment 启动的 Pod 的，需要使用下面的命令
kubectl delete deployment <deployname>

# 指定副本的数量
kubectl create deployment --image=<imagename> --replicas=<num>

# 查看部署情况
kubectl get deploy

# 扩缩容
kubectl sacle --replicas=<num> deploy/<podname>

# 修改 deployment，下面的命令会直接修改对应的 yaml 文件
kubectl edit deploy <podname>

# 滚动更新
kubectl set image deploy/<podname> <imagename>=<newimagename> --record

# 查看历史记录
kubectl rollout history deploy/<podname>

# 查看某个历史记录
kubectl rollout history deploy/<podname> --revision=<num>

# 回退到上个版本
kubectl rollout undo deploy/<podname>

# 回退指定版本
kubectl rollout undo deploy/<podname> --to-version=<versionnum>
```

使用配置文件创建 deployment：

```yaml
apiVersion: v1
kind: Namespace
metadata: 
  name: <namespace>
  labels:
    app: <appname>
spec:
  replicas: 3
  selector:
  	matchLabels: <appname>
  template:
    metadata:
      labels:
        app: <appname>
    spec:
      containers:
      - image: <imagename>
        name: <podname>
```

其他工作负载：

1. Deployment：无状态部署，比如微服务，提供多副本等功能
2. StatefulSet：有状态部署，比如 redis，提供稳定的存储以及网络等功能
3. DaemonSet：守护型部署，比如日志收集组件，可以在每个机器都运行一遍
4. Job/CronJob：定时任务部署，比如垃圾清理组件，可以在指定时间运行





## Service

> 将一组 Pod 公开为网络服务的抽象方法，能进行服务发现与负载均衡

服务类型：

1. ClusterIP：集群内访问
2. NodePort：集群外也可访问，默认范围是：30000~32767

```shell
# 创建并暴露服务，可以使用 <podname>.<namespace>.svc:<port> 进行访问，类型默认是集群内访问
kubectl expose deploy <podname> --port=<port> --target-port=<insideport> --type=ClusterIP

# 获取所有服务
kubectl get service
# 或者
kubectl get svc
```

使用配置文件创建服务：

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: <appname>
  name: <namespace>
spec:
  selector:
    app: <appname>
  ports:
  - port: 8000
    protocol: TCP
    targetPort: 80
  # 或者 type: NodePort
  type: ClusterIP
```





## Ingress

:::info 参考文章

1. [Ingress安装部署](https://blog.csdn.net/heiwa110/article/details/127773889) （主要参考文章）
2. [k8s学习--ingress-nginx所遇问题小记](https://blog.csdn.net/qq_45433707/article/details/127153578)（这个配置文件也可以）
3. [记安装ingress-nginx遇到的一些坑](https://blog.csdn.net/weixin_38797137/article/details/124251698)
4. [K8S集群中Pod资源处于Pending状态排查思路](https://bbs.huaweicloud.com/blogs/359655#:~:text=K8S%E9%9B%86%E7%BE%A4%E4%B8%ADPod%E8%B5%84%E6%BA%90%E5%A4%84%E4%BA%8EPending%E7%8A%B6%E6%80%81%E6%8E%92%E6%9F%A5%E6%80%9D%E8%B7%AF%201%201.Pod%E8%B5%84%E6%BA%90%E5%A4%84%E4%BA%8EPending%E7%8A%B6%E6%80%81%E7%9A%84%E5%8E%9F%E5%9B%A0,2%202.Pod%E8%B5%84%E6%BA%90%E5%A4%84%E4%BA%8EPending%E7%8A%B6%E6%80%81%E7%9A%84%E6%8E%92%E6%9F%A5%E6%80%9D%E8%B7%AF%203%203.%E7%94%B1%E4%BA%8E%E8%B5%84%E6%BA%90%E9%85%8D%E9%A2%9D%E8%AE%BE%E7%BD%AE%E9%97%AE%E9%A2%98%E5%AF%BC%E8%87%B4Pod%E5%A4%84%E4%BA%8EPending%E7%8A%B6%E6%80%81%E7%9A%84%E6%8E%92%E6%9F%A5%E8%BF%87%E7%A8%8B)
5. [(k8s) 1 node(s) had taints that the pod didn't tolerate](https://blog.csdn.net/erhaiou2008/article/details/103907289)
6. [k8s（kubernetes）拉取本地镜像部署节点](https://blog.csdn.net/weixin_41803458/article/details/113243115)
7. [k8s使用本地镜像](https://blog.csdn.net/u010039418/article/details/86578420)

:::

> 服务网关，统一入口

运行逻辑：

1. 网络组织方式：使用 Deployment 部署一组 Pod 之后，在上层建立一个 Service 用于服务间或者说不同 Deployment 或 Pod 间的互相调用，这样就组成了一层 Service 网络
2. 在服务网络上再加一层，统一处理外部请求，并转发到对应的服务上

这里因为以下一些原因一直无法启动 ingress（调试了好久…）：

1. 服务器不可达（token 过期）
2. 服务器资源不足（CPU、内存等不满足要求）
3. 节点有污点，需要按具体情况配置
4. 容器无法拉取，这里使用其他人 dockerHub 上的镜像，然后在 yaml 文件上配置启动不拉去镜像，即使用本地镜像，特别注意：本地镜像要每个节点上都有，否则还是会无法拉取

```shell
# 用于代替的镜像以及配置文件用的都是上面的主要参考文章
# 启动 ingress 服务
kubectl apply -f ingress.yaml

# 验证是否开启
kubectl get pod,svc -n ingress-nginx

# 成功启动
# 下面前两个 Completed 是正常的
NAME                                            READY   STATUS      RESTARTS   AGE
pod/ingress-nginx-admission-create-s2fsm        0/1     Completed   0          14m
pod/ingress-nginx-admission-patch-rtctp         0/1     Completed   0          14m
pod/ingress-nginx-controller-67cfb7d9c6-bp4rw   1/1     Running     0          14m

NAME                                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
service/ingress-nginx-controller             NodePort    10.96.238.236   <none>        80:32069/TCP,443:30934/TCP   14m
service/ingress-nginx-controller-admission   ClusterIP   10.96.2.231     <none>        443/TCP                      14m
```

成功访问（http://192.168.30.211:32069/）：

![image-20230426174712399](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//k8s/20230426/K8S%E7%BD%91%E5%85%B3ingress%E6%88%90%E5%8A%9F%E5%90%AF%E5%8A%A8.png)



### 测试 Ingress

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-server
  template:
    metadata:
      labels:
        app: hello-server
    spec:
      containers:
      - name: hello-server
        image: registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/hello-server
        ports:
        - containerPort: 9000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-demo
  name: nginx-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-demo
  template:
    metadata:
      labels:
        app: nginx-demo
    spec:
      containers:
      - image: nginx
        name: nginx
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx-demo
  name: nginx-demo
spec:
  selector:
    app: nginx-demo
  ports:
  - port: 8000
    protocol: TCP
    targetPort: 80
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: hello-server
  name: hello-server
spec:
  selector:
    app: hello-server
  ports:
  - port: 8000
    protocol: TCP
    targetPort: 9000
```

```shell
# 启动
kubectl apply -f test.yaml

# 查看服务情况：kubectl get svc -A
default         hello-server                         ClusterIP   10.96.247.209   <none>        8000/TCP
default         nginx-demo                           ClusterIP   10.96.82.28     <none>        8000/TCP

# 访问 curl 10.96.82.28:8000：输出 nginx 默认页面
# 访问 curl 10.96.247.209:8000，输出：Hello World!
```



### 域名访问规则

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress  
metadata:
  name: ingress-host-bar
spec:
  ingressClassName: nginx
  rules:
  - host: "hello.gontoy.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: hello-server
            port:
              number: 8000
  - host: "demo.gontoy.com"
    http:
      paths:
      - pathType: Prefix
        path: "/nginx"  # 把请求会转给下面的服务，下面的服务一定要能处理这个路径，不能处理就是404
        backend:
          service:
            name: nginx-demo  ## java，比如使用路径重写，去掉前缀nginx
            port:
              number: 8000
```

```shell
# 部署上面的转发规则
kubectl apply -f domain.yaml

# 查看是否创建
kubectl get ingress
# 或者
kubectl get ing

# 输出如下结果：
NAME               CLASS   HOSTS                              ADDRESS          PORTS   AGE
ingress-host-bar   nginx   hello.gontoy.com,demo.gontoy.com   192.168.30.212   80      80s

# 修改配置
kubectl edit ing <ingressname>
```

注意：由于不是真的域名，所以本地也要配置 host 域名转发

```shell
# host 文件中添加：
192.168.30.211 hello.gontoy.com
192.168.30.211 demo.gontoy.com
```

访问成功：

1. https://demo.gontoy.com:30934/
2. https://hello.gontoy.com:30934/

![image-20230426181153185](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//k8s/20230426/K8S%E7%BD%91%E5%85%B3ingress%E5%9F%9F%E5%90%8D%E8%BD%AC%E5%8F%911.png)

![image-20230426181250639](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//k8s/20230426/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//k8s/20230426/K8S%E7%BD%91%E5%85%B3ingress%E5%9F%9F%E5%90%8D%E8%BD%AC%E5%8F%912.png)



### 路径重写

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress  
metadata:
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  name: ingress-host-bar
spec:
  ingressClassName: nginx
  rules:
  - host: "hello.gontoy.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: hello-server
            port:
              number: 8000
  - host: "demo.gontoy.com"
    http:
      paths:
      - pathType: Prefix
        path: "/nginx(/|$)(.*)"  # 把请求会转给下面的服务，下面的服务一定要能处理这个路径，不能处理就是404
        backend:
          service:
            name: nginx-demo  ## java，比如使用路径重写，去掉前缀nginx
            port:
              number: 8000
```



### 流量限制

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-limit-rate
  annotations:
    nginx.ingress.kubernetes.io/limit-rps: "1"
spec:
  ingressClassName: nginx
  rules:
  - host: "limit.gontoy.com"
    http:
      paths:
      - pathType: Exact
        path: "/"
        backend:
          service:
            name: nginx-demo
            port:
              number: 8000
```





## NFS 存储抽象

> 直接使用挂在卷的方式会难以管理

存储层可以使用：

1. NFS
2. Glusterfs
3. CephFS

主节点配置：

```shell
# 文件存储
yum install -y nfs-utils

# nfs 主节点输入：
echo "/nfs/data/ *(insecure,rw,sync,no_root_squash)" > /etc/exports

# 创建目录
mkdir -p /nfs/data
systemctl enable rpcbind --now
systemctl enable nfs-server --now

# 配置生效
exportfs -r

# 确认生效
exportfs
# 输出：
/nfs/data     	<world>
```

从节点配置：

```shell
# 指定主节点
showmount -e 192.168.30.211

# 执行以下命令挂载 nfs 服务器上的共享目录到本机路径 /root/nfsmount
mkdir -p /nfs/data

# 同步
mount -t nfs 192.168.30.211:/nfs/data /nfs/data

# 撤销挂载
umount -f /nfs/data

# 写入一个测试文件
echo "hello nfs server" > /nfs/data/test.txt
```



### 原生挂载 + NFS 同步

> 注意，使用这种方式，将 Pod 删除后同步的目录并不会一同删除，当系统大了之后会产生很多问题

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-pv-demo
  name: nginx-pv-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-pv-demo
  template:
    metadata:
      labels:
        app: nginx-pv-demo
    spec:
      containers:
      - image: nginx
        name: nginx
        volumeMounts:
        - name: html
          mountPath: /usr/share/nginx/html
      volumes:
        - name: html
          nfs:
            server: 172.31.0.4
            path: /nfs/data/nginx-pv
```



### PV 与 PVC

> 多个服务器上的 PV 会组成 PV 池，当需要挂在卷时，通过 PVC 挂载到 PV 池中

1. PV：PersistentVolume 持久卷
2. PVC：PersistentVolumeClaim 持久卷声明

```shell
# 主节点创建文件夹：
mkdir -p /nfs/data/01
mkdir -p /nfs/data/02
mkdir -p /nfs/data/03
```

创建 PV：

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv01-10m
spec:
  capacity:
    storage: 10M
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /nfs/data/01
    server: 192.168.30.211
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv02-1gi
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /nfs/data/02
    server: 192.168.30.211
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv03-3gi
spec:
  capacity:
    storage: 3Gi
  accessModes:
    - ReadWriteMany
  storageClassName: nfs
  nfs:
    path: /nfs/data/03
    server: 192.168.30.211
```

```shell
# 创建 PV
kubectl apply -f pv.yaml
# 输出：
persistentvolume/pv01-10m created
persistentvolume/pv02-1gi created
persistentvolume/pv03-3gi created

# 验证
kubectl get persistentvolume
# 输出：
NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
pv01-10m   10M        RWX            Retain           Available           nfs                     84s
pv02-1gi   1Gi        RWX            Retain           Available           nfs                     84s
pv03-3gi   3Gi        RWX            Retain           Available           nfs                     84s
```

创建 PVC：

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: nginx-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 200Mi
  storageClassName: nfs
```

```shell
# 创建 pvc
kubectl apply -f pvc.yaml
# 输出：
persistentvolumeclaim/nginx-pvc created

# 查看绑定情况
kubectl get pv
# 输出：
NAME       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM               STORAGECLASS   REASON   AGE
pv01-10m   10M        RWX            Retain           Available                       nfs                     5m45s
pv02-1gi   1Gi        RWX            Retain           Bound       default/nginx-pvc   nfs                     5m45s
pv03-3gi   3Gi        RWX            Retain           Available                       nfs                     5m45s
```

但是注意，一般 pvc 不会单独创建，而是与 Pod 配置一并写入：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx-deploy-pvc
  name: nginx-deploy-pvc
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-deploy-pvc
  template:
    metadata:
      labels:
        app: nginx-deploy-pvc
    spec:
      containers:
      - image: nginx
        name: nginx
        volumeMounts:
        - name: html
          mountPath: /usr/share/nginx/html
      volumes:
        - name: html
          persistentVolumeClaim:
            claimName: nginx-pvc
```





## ConfigMap 配置文件挂载

```shell
# 创建配置，redis 保存到 k8s 的 etcd；
kubectl create cm redis-conf --from-file=redis.conf
# 输出：
configmap/redis-conf created

# 查看配置集
kubectl get cm
# 输出：
NAME               DATA   AGE
kube-root-ca.crt   1      47h
redis-conf         1      43s
```

配置文件形式：

```yaml
apiVersion: v1
data:    #data是所有真正的数据，key：默认是文件名   value：配置文件的内容
  redis.conf: |
    appendonly yes
kind: ConfigMap
metadata:
  name: redis-conf
  namespace: default
```

与 Pod 一起创建：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
spec:
  containers:
  - name: redis
    image: redis
    command:
      - redis-server
      - "/redis-master/redis.conf"  #指的是redis容器内部的位置
    ports:
    - containerPort: 6379
    volumeMounts:
    - mountPath: /data
      name: data
    - mountPath: /redis-master
      name: config
  volumes:
    - name: data
      emptyDir: {}
    - name: config
      configMap:
        name: redis-conf
        items:
        - key: redis.conf
          path: redis.conf
```



## Secret 敏感信息

> Secret 对象类型用来保存敏感信息，例如密码、OAuth 令牌和 SSH 密钥。 将这些信息放在 secret 中比放在 [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) 的定义或者 [容器镜像](https://kubernetes.io/zh/docs/reference/glossary/?all=true#term-image) 中来说更加安全和灵活。

```shell
# 命令格式
kubectl create secret docker-registry <任意标识> \
  --docker-server=<你的镜像仓库服务器> \
  --docker-username=<你的用户名> \
  --docker-password=<你的密码> \
  --docker-email=<你的邮箱地址>
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: private-nginx
spec:
  containers:
  - name: private-nginx
    image: <imagename>
  imagePullSecrets:
  - name: <上面的任意标识>
```
