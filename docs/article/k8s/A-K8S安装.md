---
title: "K8S安装"
shortTitle: "A-K8S安装"
description: "K8S安装"
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
timeline: true
dir:
  text: "K8S安装"
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
  title: "K8S安装"
  description: "K8S安装"
  author:
    name: gzw
    email: 1627121193@qq.com
---



  


# K8S 安装

## 预处理

> 先修改，否则之后会报错
>

需要降低 docker 的版本：

```shell
# 加入工作节点时卡住报错，相关文章：https://blog.csdn.net/qq_42910468/article/details/126037954
[WARNING SystemVerification]: this Docker version is not on the list of validated versions: 23.0.3. Latest validated version: 19.03

# 查看版本
yum list docker-ce --showduplicates | sort -r

# 降低版本
yum downgrade --setopt=obsoletes=0 -y docker-ce-18.09.9-3.el7 docker-ce-cli-18.09.9-3.el7 containerd.io

# 启动并查看版本
systemctl start docker
docker version
```

```shell
# 相关文章：https://blog.csdn.net/weixin_45054797/article/details/112159446
[WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/

# 修改文件
vim /etc/docker/daemon.json

# 添加下面一行配置
{
  "exec-opts": ["native.cgroupdriver=systemd"]
}

# 重启
service docker restart
```

关闭防火墙：

```shell
# 查看防火墙是否开启
firewall-cmd --state

# 关闭
systemctl stop firewalld.service

# 取消开机自启
systemctl disable firewalld.service
```





## 配置修改

1. 改主机名
2. 关闭安全组规则
3. 关闭 swap 分区
4. 配置统计

```shell
#各个机器设置自己的域名
hostnamectl set-hostname <name>


# 将 SELinux 设置为 permissive 模式（相当于将其禁用）
sudo setenforce 0
sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config

#关闭swap
swapoff -a  
sed -ri 's/.*swap.*/#&/' /etc/fstab

#允许 iptables 检查桥接流量
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system
```





## 安装 kubelet、kubeadm、kubectl

### 下载工具

```shell
# 配置下载信息、下载三大件
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
   http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF

# 下载 kubelet、kubeadm、kubectl
sudo yum install -y kubelet-1.20.9 kubeadm-1.20.9 kubectl-1.20.9 --disableexcludes=kubernetes

# 启动
sudo systemctl enable --now kubelet

# 查看 kubelet 的状态，此时应该时未启动，需要在下面 init 之后才会启动
systemctl status kubelet
```



### 引导集群

使用 kubeadm 引导集群：  

```shell
# 使用脚本下载所有需要的镜像
sudo tee ./images.sh <<-'EOF'
#!/bin/bash
images=(
kube-apiserver:v1.20.9
kube-proxy:v1.20.9
kube-controller-manager:v1.20.9
kube-scheduler:v1.20.9
coredns:1.7.0
etcd:3.4.13-0
pause:3.2
)
for imageName in ${images[@]} ; do
docker pull registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/$imageName
done
EOF

# 添加执行权限并执行
chmod +x ./images.sh && ./images.sh
```



### 初始化主节点

```shell
# 主节点地址
echo "192.168.30.211 cluster-endpoint" >> /etc/hosts

# 主节点初始化
# 注意所有网络范围必须不重叠
kubeadm init \
--apiserver-advertise-address=192.168.30.211 \
--control-plane-endpoint=cluster-endpoint \
--image-repository registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images \
--kubernetes-version v1.20.9 \
--service-cidr=10.96.0.0/16 \
--pod-network-cidr=192.168.0.0/16
```

```shell
# 成功后输出如下结果
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of control-plane nodes by copying certificate authorities
and service account keys on each node and then running the following as root:

  kubeadm join cluster-endpoint:6443 --token fsimgi.q1ad5l7cpcojgpa8 \
    --discovery-token-ca-cert-hash sha256:4fee369d3fb915ad0e5c64d9db6b4215675ab1a3c626e9800feb5f8478d8b174 \
    --control-plane 

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join cluster-endpoint:6443 --token fsimgi.q1ad5l7cpcojgpa8 \
    --discovery-token-ca-cert-hash sha256:4fee369d3fb915ad0e5c64d9db6b4215675ab1a3c626e9800feb5f8478d8b174
```

```shell
# 设置配置文件
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
  
#查看集群所有节点
kubectl get nodes

#根据配置文件，给集群创建资源
kubectl apply -f xxxx.yaml

#查看集群部署了哪些应用？
docker ps   ===   kubectl get pods -A
# 运行中的应用在docker里面叫容器，在k8s里面叫Pod
kubectl get pods -A
```





### 安装网络组件

> 安装网络组件后主节点才能准备好

```shell
# calico 跟版本有关，需要多试几次，下面是可能使用的几个
curl https://docs.projectcalico.org/manifests/calico.yaml -O
# 或者
curl https://docs.projectcalico.org/v3.7/manifests/calico.yaml -O
# 或者
wget https://docs.projectcalico.org/v3.20/manifests/calico.yaml --no-check-certificate
# calico.yaml 文件
https://blog.csdn.net/moyuanbomo/article/details/123092448

# 启动 calico
kubectl apply -f calico.yaml

# 查看 pod 情况
kubectl get pods -A
# 如果以上都没有问题，那么结果应该如下
NAMESPACE     NAME                                      READY   STATUS              RESTARTS   AGE
kube-system   calico-kube-controllers-bcc6f659f-b4hkm   0/1     ContainerCreating   0          57s
kube-system   calico-node-z28h5                         0/1     Init:2/3            0          62s
kube-system   coredns-5897cd56c4-k2qsj                  0/1     ContainerCreating   0          12m
kube-system   coredns-5897cd56c4-rgr62                  0/1     ContainerCreating   0          12m
kube-system   etcd-k8s1                                 1/1     Running             0          12m
kube-system   kube-apiserver-k8s1                       1/1     Running             0          12m
kube-system   kube-controller-manager-k8s1              1/1     Running             0          12m
kube-system   kube-proxy-mflmv                          1/1     Running             0          12m
kube-system   kube-scheduler-k8s1                       1/1     Running             0          12m

# 查看节点情况
kubectl get nodes
# 如果一切正常，那么主节点应该显示就绪
NAME   STATUS   ROLES                  AGE   VERSION
k8s1   Ready    control-plane,master   15m   v1.20.9	


# 在其他机器上输入以下命令，用以加入集群
# 坑：如果之前使用过 minikube，可能配置文件会有冲突的情况，或者是主机地址不可达，导致无法加入工作节点
kubeadm join cluster-endpoint:6443 --token 37pgy0.l0j1471q4rq1yul7 \
    --discovery-token-ca-cert-hash sha256:752d1e7c2e41b6e59f4c7706e0c65cb33fd67c3746ae33c4d13e27e8f1b26981 


# 如果一切正常，那么应该看到
kubectl get nodes
NAME   STATUS     ROLES                  AGE     VERSION
k8s1   Ready      control-plane,master   15m     v1.20.9
k8s2   NotReady   <none>                 8m17s   v1.20.9
k8s3   NotReady   <none>                 8m17s   v1.20.9


# 额外补充
# 重新生成 token，注意 token 是 24 小时有效的
kubeadm token create --ttl 0 --print-join-command

# 清除非主节点上的 token
kubeadm reset
```

成功搭建起集群：

![image-20230424225306121](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//k8s/20230426/K8S%E9%9B%86%E7%BE%A4%E5%90%AF%E5%8A%A8%E6%88%90%E5%8A%9F.png)

![image-20230424225805586](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//k8s/20230426/K8S%E9%9B%86%E7%BE%A4Pods.png)





### 安装可视化面板

```shell
# https://blog.csdn.net/zhangbaoxiang/article/details/107435424
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.3.1/aio/deploy/recommended.yaml

# 成功后看 Pods 应该有
kubernetes-dashboard   dashboard-metrics-scraper-79c5968bdc-jxn4x   1/1     Running   0          105s
kubernetes-dashboard   kubernetes-dashboard-658485d5c7-rdpjb        1/1     Running   0          105s

# 设置访问端口
kubectl edit svc kubernetes-dashboard -n kubernetes-dashboard
# 修改文件中的内容
type: NodePort

# 安全组放行
kubectl get svc -A |grep kubernetes-dashboard
# 结果如下，访问时需要使用 https，端口为如下，此处为 30317
kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   10.96.164.141   <none>        8000/TCP                 4m38s
kubernetes-dashboard   kubernetes-dashboard        NodePort    10.96.91.38     <none>        443:30317/TCP            4m38s
```

创建用户：

```shell
# 创建访问账号，准备一个yaml文件； vi dashUser.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
  
# 创建
kubectl apply -f dashUser.yaml

# 获取访问令牌
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
eyJhbGciOiJSUzI1NiIsImtpZCI6IjFvV2sxTVRUeFBjWExBSG5KNWw2RTlCTC1XSm1La1RheG5MeXlnYnI5cnMifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLWcyMnpqIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI0MTQwMDEwYi1iMDlmLTRlYjQtYTdiZS0xYWNmM2ZmNDYyY2QiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.wj8AxwfA0MpNK0pL0HXAlCJw-JFl6gm00EUyjdK1C_El-42xn97fsAy7SdOURNPkEjCXUIouzQZceQY78UIw9miyhR-4E0psLpZlcXsihZnCNlc34Sbc_a8EY79kZJZPoj6N96I3rAGktYerQTjVerqgpOWQvkQC4ORxQfHiuHl-NiaGZ9QqBo9IEOCGZaAS3f_J1GLelVR19WYWUaC3Pv3rvFjMN5kQJwV78oZRHXO2Ubg7lmhN6qCLbOw-SdPY9bA9_8Um-ExLQEHeSKIcQGXkDgDlvMDJPA3auTDgew9c3Omd4W1YHBkv2B-1YTUrGDF63bylR3eY7L_U5tY7mQ
```

成功登录：

![image-20230425003147047](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//k8s/20230426/K8S%E9%9D%A2%E6%9D%BF.png)







## 补充：官方安装

> 中文文档地址：https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/

### 下载 kubelet

```shell
# 安装最新版本
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# 下载 kubectl 校验和文件
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"

# 验证
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check

# 安装 kubelet
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# 查看版本号
kubectl version --client
kubectl version --client --output=yaml

# 通过获取集群状态的方法，检查是否已恰当地配置了 kubectl
kubectl cluster-info
kubectl cluster-info dump
```



### 下载 minikube

> 模拟集群，会自动下载 kubeadmin、kubelet、kubectl

```shell
# 下载并安装 minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
install minikube-linux-amd64 /usr/local/bin/minikube

# 开启集群
minikube start
# 强制启动
minikube start --force

# 如果下载慢那么使用
minikube delete
minikube start --force --image-mirror-country='cn'
```

编写 deployment.yaml 文件，设置配置信息：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: finance
spec:
  replicas: 3
  selector:
    matchLabels:
      app: finance
  template:
    metadata:
      labels:
        app: finance
    spec:
      containers:
        - name: finance
          image: rossning92/finance
          resources:
            limits:
              memory: "128Mi"
              cpu: "500m"
          ports:
            - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: finance-np-service
spec:
  selector:
    app: finance
  type: NodePort
  ports:
    - port: 5000
      targetPort: 5000
      nodePort: 30080
```

```shell
# 启动集群
kubectl apply -f deployment.yaml

# 查看 pods
kubectl get pods

# 查看服务
kubectl get service

# 使用 minikube 模拟
minikube service finance-np-service

# 移除集群
kubectl delete -f deployment.yaml
```





### 卸载

:::相关文章

[kubeadm、kubectl、kubelet彻底清理卸载](https://www.orchome.com/16614#:~:text=%E5%BD%BB%E5%BA%95%E6%B8%85%E7%90%86%E5%8D%B8%E8%BD%BD%20kubeadm%E3%80%81kubectl%E3%80%81kubeletDebian%20%2F%20Ubuntusudosudoapt-get%20remove%20%E4%BC%9A%E5%88%A0%E9%99%A4%E8%BD%AF%E4%BB%B6%E5%8C%85%E8%80%8C%E4%BF%9D%E7%95%99%E8%BD%AF%E4%BB%B6%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6apt-get,purge%20%E4%BC%9A%E5%90%8C%E6%97%B6%E6%B8%85%E9%99%A4%E8%BD%AF%E4%BB%B6%E5%8C%85%E5%92%8C%E8%BD%AF%E4%BB%B6%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6CentOS%20%2F%20RHEL%20%2F%20Fedorasudosudoautoremove%EF%BC%9A%E5%BD%93%E4%BD%BF%E7%94%A8yum%20install%E5%91%BD%E4%BB%A4%E5%AE%89%E8%A3%85%E4%B8%80%E6%9E%9A%E8%BD%AF%E4%BB%B6%E5%8C%85%E6%97%B6%EF%BC%8C)

[minikube 安装和删除](https://www.jianshu.com/p/1a57035ed451)

:::