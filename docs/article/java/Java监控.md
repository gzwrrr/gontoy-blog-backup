---
title: "Java 监控"
shortTitle: "Java 监控"
description: "Java 监控"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-04-06
category: 
- "java"
- "监控"
tag:
- "java"
- "监控"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Java 监控"
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
  title: "Java 监控"
  description: "Java 监控"
  author:
    name: gzw
    email: 1627121193@qq.com
---








# Java监控



# Java 远程监控



## 写在前面

> 本文对 Java 程序进行远程监控的简单记录（使用虚拟机模拟远程服务器）





## 1.准备步骤

1. 在虚拟机上安装 Linux（选用 CentOS7），使用最小安装，最小安装后会缺少很多常用的工具，需要用 yum 包管理工具下载
2. 在系统上配置 Java 环境，首先需要将 JDK 传输到虚拟机中，有两种方法：
   - 一是使用虚拟机自带的共享目录功能：[引用 CSND 用户：twilight1999（https://blog.csdn.net/twilight1999）的文章](https://blog.csdn.net/twilight1999/article/details/123867565?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165640311216782388096841%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=165640311216782388096841&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~pc_rank_34-5-123867565-null-null.142^v24^pc_rank_34,157^v15^new_3&utm_term=centos7%E4%BC%A0%E8%BE%93%E6%96%87%E4%BB%B6%E6%98%BE%E7%A4%BA%E9%94%99%E8%AF%AF&spm=1018.2226.3001.4187)
   - 二是直接下载 Linux 自带的上传下载工具：`yum install -y lrzsz`
3. 编辑环境变量需要下载文本编辑器（选用 vim）：`yum -y install vim`
4. 编辑 `/etc/profile` 文件：`vim /etc/profile`，在文件最后加入路径
5. 安装 Java 环境后报错找不到文件，需要下载相应工具：`yum install glibc.i686`
6. 检查 Java 环境配置完成：`java -version`

【补充】配置文件中的 JDK 路径

```bash
export JAVA_HOME=/usr/local/java（包名随意改，能对应上就行，其中应该包含 JDK 的 bin、lib 等目录文件，剩下的无需更改）
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JRE_HOME=$JAVA_HOME/jre
```





## 2.远程监控

1. 将测试代码上传到 Linux 上，测试代码如下。注意不要加上包名，如果加上则参照：[CSDN 用户：su371128017（https://blog.csdn.net/su371128017）的文章](https://blog.csdn.net/su371128017/article/details/111059302)，此外，Java 环境路径中 CLASSPATH 一定要配置，否则编译后运行可能会报找不到执行文件的错误

   ```java
   public class RemoteMonitorTest {
       public static void main(String[] args) {
           // 测试线程1
           new Thread(() -> {
               while(true) {
                   try {
                       Thread.sleep(500);
                   } catch (InterruptedException e) {
                       e.printStackTrace();
                   }
               }
           }, "t1");
   
           // 测试线程2
           new Thread(() -> {
               while(true) {
                   try {
                       Thread.sleep(500);
                   } catch (InterruptedException e) {
                       e.printStackTrace();
                   }
               }
           }, "t2");
       }
   }
   ```

2. 在本地主机（windows）上键入 `win + R`，输入 `jconsole` 打开 Java 自带的监控工具，如果没有要检查 Java 环境是否配置好了

![image-20220628181250186](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java监控.assets\image-20220628181250186.png)

![image-20220628181330428](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java监控.assets\image-20220628181330428.png)

2. 在 Linux 服务器（CentOS7）上输入以下命令允许远程连接，输入命令时要在测试文件所在的目录下（或者在命令的最后写上全路径），并且要确保已存在测试文件的字节码文件

   ```bash
   java -Djava.rmi.server.hostname=Linux主机ip -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=任意端口（用于远程连接） -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false 程序名
   ```

   ![image-20220628181512365](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java监控.assets\image-20220628181512365.png)

3. 在本地主机的 `jconsole` 中输入 `主机ip:端口` 进行连接

4. 如果发现连接不上先检查防火墙是否未关闭，如果没关闭则使用命令：`systemctl stop firewalld` （不同版本 CentOS 的防火墙命令不太一样，根据版本找到对应的即可），再重新输入第二点的命令

5. 如果还是不能连接，可能是 Linux 服务器的 ip 地址出错，参照：[ CSDN 用户：mortimer_c（https://blog.csdn.net/cyq1984）的文章](https://blog.csdn.net/cyq1984/article/details/5766776)

6. 连接成功后观测一段时间便得到了如下结果

   ![image-20220628183243643](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java监控.assets\image-20220628183243643.png)

