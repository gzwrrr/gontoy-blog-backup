---
title: "Arthas"
shortTitle: "Arthas"
description: "Arthas"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-01-05
category: 
- "监控"
tag:
- "监控"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Arthas"
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
  title: "Arthas"
  description: "Arthas"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Arthas

:::info 官方文档

https://arthas.aliyun.com/doc/

:::



## 下载

```shell
# 下载
curl -O https://arthas.aliyun.com/arthas-boot.jar
# 或者
java -jar arthas-boot.jar --repo-mirror aliyun --use-http

# 运行，当有 Java 程序时才可以启动监控
java -jar arthas-boot.jar

# 打印帮助信息
java -jar arthas-boot.jar -h
```

成功启动后如下所示：

> 输入 exit 命令可以退出 arthas

![image-20230423154813929](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//arthas/20230426/%E5%90%AF%E5%8A%A8Arthas.png)





## 简单使用

### Dashboard

输入 dashboard 命令查看 Arthas 相关信息：

![image-20230423155034421](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//arthas/20230426/ArthasDashboard.png)



### thread

输入 thread 命令查看运行中的 Java 线程信息：![image-20230423155337647](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//arthas/20230426/Arthas%E6%9F%A5%E7%9C%8BJava%E7%BA%BF%E7%A8%8B%E4%BF%A1%E6%81%AF.png)



### 反编译

```shell
# jad + 类的全限定类名，我这里的是 demo.MathGame
jad demo.MathGame
```

![image-20230423155735042](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//arthas/20230426/Arthas%E5%8F%8D%E7%BC%96%E8%AF%91.png)



### IDEA 相关插件

idea 可以安装 arthas idea 这个插件，安装后可以通过右键菜单生成一些监控命令

![image-20230423160942323](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//arthas/20230426/ArthasIdea%E6%8F%92%E4%BB%B6.png)

```shell
# 监控 demo.MathGame 中的 primeFactors 方法
watch demo.MathGame primeFactors '{params,returnObj,throwExp}'  -n 5  -x 3

# 追踪方法
trace demo.MathGame primeFactors  -n 5 --skipJDKMethod false

# 查看调用方法的地方
stack demo.MathGame primeFactors  -n 5

# 监控方法运行情况
monitor demo.MathGame primeFactors  -n 10  --cycle 10 
```

thread 指令使用：

```shell
# 查看占用最高的 5 个线程
thread -n 5

# 查看死锁
thread -b
```

时空隧道：

```shell
# 时空隧道，监控调用情况
tt -t demo.MathGame primeFactors -n 5

# 查看第 1000 次时调用的情况
tt -p -i 1000
```

热力图：

```shell
# 开始监控
profiler start

# 结束监控
profiler stop

# 结束监控后，会得到一个 html 文件
/usr/local/arthas/arthas-output/20230423-013250.html
```







