---
title: "配置中心-Nacos"
shortTitle: "A-配置中心-Nacos"
description: "配置中心-Nacos"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-06-01
category: 
- "分布式"
tag:
- "分布式"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "配置中心-Nacos"
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
  title: "配置中心-Nacos"
  description: "配置中心-Nacos"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 配置中心-Nacos

> 相当于 Eureka + Config + Bus，Nacos 支持 AP、CP 的切换

## Nacos 配置中心

![Nacos命名空间](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E5%88%86%E5%B8%83%E5%BC%8F%E7%BB%84%E4%BB%B6/20230210/nacos%E9%85%8D%E7%BD%AE%E4%B8%AD%E5%BF%83.png)

- 配置中心使用 Namespace 命名空间隔离不同的配置，内部使用 Group 和 DataID 从逻辑上区分多个目标对象；默认的为：Namespace=public，Group=DEFAULT_GROUP，默认的集群是 DEFAULT
- 读取不同的配置有三种方式：
  - 通过 DataID 区分
  - 通过 Group 区分
  - 通过 Namespace 区分



## 持久化配置

- Nacos 默认使用的是嵌入式数据（derby）库实现数据的存储
- 集群模式下如果还使用默认持久化配置会存在数据一致性问题
- 集群模式下应该使用集中式存储的方式，目前只支持 MySQL

```properties
# 持久化配置
spring.datasource.platform=mysql
### Count of DB:
db.num=1
### Connect URL of DB:
db.url.0=jdbc:mysql://127.0.0.1:3306/nacos_config?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
db.user.0=root
db.password.0=123456
```



## Linux 集群搭建

1. 修改 `Nacos` 的 `conf` 文件夹下的 `cluster.conf` 为集群的 `ip:port`，注意 其中的 ip 必须为 `hostname -i` 或 `ip addr ens33`  中的：

```shell
192.168.30.100:3333
192.168.30.100:4444
192.168.30.100:5555
```



2. 修改 `nacos/bin/startup.sh`：

```sh
while getopts ":m:f:s:c:p:i:" opt
do
    case $opt in
        m)
            MODE=$OPTARG;;
        f)
            FUNCTION_MODE=$OPTARG;;
        s)
            SERVER=$OPTARG;;
        c)
            MEMBER_LIST=$OPTARG;;
        p)
            EMBEDDED_STORAGE=$OPTARG;;
        i)
        	# 主要是加上 i: 和下面这一行，就是配置不同的端口启动
            PORT=$OPTARG;;
        ?)
        echo "Unknown parameter"
        exit 1;;
    esac
done
# start
echo "$JAVA ${JAVA_OPT}" > ${BASE_DIR}/logs/start.out 2>&1 &
# 加上 -Dserver.port=${PORT}
nohup $JAVA -Dserver.port=${PORT}  ${JAVA_OPT} nacos.nacos >> ${BASE_DIR}/logs/start.out 2>&1 &
echo "nacos is starting，you can check the ${BASE_DIR}/logs/start.out"
```



3. 如果无法启动可能是内存分配过小，同样是修改 `nacos/bin/startup.sh`：

```sh
if [[ "${MODE}" == "standalone" ]]; then
	# 下面一行修改大一点，例如：
	JAVA_OPT="${JAVA_OPT} -Xms2g -Xmx2g -Xmn1g"
    JAVA_OPT="${JAVA_OPT} -Dnacos.standalone=true"
else
    if [[ "${EMBEDDED_STORAGE}" == "embedded" ]]; then
        JAVA_OPT="${JAVA_OPT} -DembeddedStorage=true"
    fi
    JAVA_OPT="${JAVA_OPT} -server -Xms2g -Xmx2g -Xmn1g -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=320m"
    JAVA_OPT="${JAVA_OPT} -XX:-OmitStackTraceInFastThrow -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=${BASE_DIR}/logs/java_heapdump.hprof"
    JAVA_OPT="${JAVA_OPT} -XX:-UseLargePages"
```



4. 启动集群：

注意：较高版本的 Nacos 可能无法在同一台机器的同一个目录下启动集群，此时只需要复制配置好的 Nacos 的整个目录即可

```sh
# 如果是复制了三份，就分别进入 bin 目录，然后分别运行对应的启动命令
./startup.sh -i 3333
./startup.sh -i 4444
./startup.sh -i 5555
```

![image-20221022172459669](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E5%88%86%E5%B8%83%E5%BC%8F%E7%BB%84%E4%BB%B6/20230210/nacos%E9%9B%86%E7%BE%A4.png)



5. 修改 `nginx`  配置文件后，进入 `nginx/sbin` 执行：`./nginx -c /usr/local/nginx/conf/nginx.conf`

```properties
upstream nacosCluster {
    server localhost:3333;
    server localhost:4444;
    server localhost:5555;
}

server {
    listen          1111;
    server_name     localhost;

    location / {
    	proxy_pass http://nacosCluster/;
    }
}
```



