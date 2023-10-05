---
title: "Java 基础错题集"
shortTitle: "Y-Java 基础错题集"
description: "Java 基础错题集"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-01-09
category: 
- "java"
- "错题集"
tag:
- "java"
- "错题集"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Java 基础错题集"
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
  title: "Java 基础错题集"
  description: "Java 基础错题集"
  author:
    name: gzw
    email: 1627121193@qq.com
---






# Java基础错题集


[[toc]]

# Day 1

1. 【重载】对于同一类中的两个方法 , 在判断它们是不是重载方法时 , 肯定不考虑：返回值类型

2. 【运算符】`>>` 算术右移，高位补符号位，`>>>` 逻辑右移，高位补 0

3. 【switch】switch 穿透：没有break，发生case穿透现象，程序会继续向下执行，直到遇到break或者结束switch语句的大括号为止

   ```java
   public static int getValue(int i) {
       int result = 0;
       switch (i) {
           case 1:
               result = result + i;
           case 2:
               result = result + i * 2;
           case 3:
               result = result + i * 3;
       }
       // 当输入 2 时，结果为 10
       return result;
   }
   ```

4. 【Servlet】Servlet的生命周期可以分为初始化阶段，运行阶段和销毁阶段三个阶段，以下过程属于初始化阶段是:

   1. 加载Servlet类及.class对应的数据
   2. 创建 ServletConfig 对象
   3. 创建 Servlet 对象

   解释：Servlet的生命周期一般可以用三个方法来表示： 

   - init()：仅执行一次，负责在装载Servlet时初始化Servlet对象 
   - service() ：核心方法，一般HttpServlet中会有get,post两种处理方式。在调用doGet和doPost方法时会构造servletRequest和servletResponse请求和响应对象作为参数。 
   - destory()：在停止并且卸载Servlet时执行，负责释放资源 初始化阶段：Servlet启动，会读取配置文件中的信息，构造指定的Servlet对象，创建ServletConfig对象，将ServletConfig作为参数来调用init()方法

5. 【finally】如无必要，不要在 finally 语句块中写 `return` 或 `throws`，因为这样会让 try 或 catch 语句块中的  `return` 或 `throws` 失效

6. 【JVM 垃圾回收】以下哪些 JVM 的垃圾回收方式采用的是复制算法回收：

   1. 新生代串行收集器
   2. 新生代并行回收收集器

   解释：两个最基本的 Java 回收算法：复制算法和标记清理算法：

   - 复制算法：两个区域A和B，初始对象在A，继续存活的对象被转移到B。此为新生代最常用的算法
   - 标记清理：一块区域，标记可达对象（可达性分析），然后回收不可达对象，会出现碎片，那么引出
   - 标记-整理算法：多了碎片整理，整理出更大的内存放更大的对象

   额外内容：

   - Serial New 收集器是针对新生代的收集器，采用的是复制算法  
   - Serial Old（串行）收集器，新生代采用复制，老年代采用标记整理   
   - Parallel New（并行）收集器，新生代采用复制算法，老年代采用标记整理  
   - Parallel  Scavenge（并行）收集器，针对新生代，采用复制收集算法  
   - Parallel  Old（并行）收集器，针对老年代，标记整理  
   - CMS 收集器，基于标记清理  
   - G1 收集器：整体上是基于标记 整理 ，局部采用复制

7. 【for 循环】for(条件1;条件2;条件3) {   //语句 } 执行顺序是条件1->条件2->语句->条件3->条件2->语句->条件3->条件2........ 如果条件2为true，则一直执行。如果条件2位false，则for循环结束

8. 服务器简介：
   - LVS是Linux Virtual Server的简写，意即Linux虚拟服务器，是一个虚拟的服务器集群系统。
   - Nginx ("engine x") 是一个高性能的 HTTP 和 反向代理 服务器，也是一个 IMAP/POP3/SMTP 代理服务器。
   - Lighttpd 是一个德国人领导的开源Web服务器软件，其根本的目的是提供一个专门针对高性能网站，安全、快速、兼容性好并且灵活的web server环境。具有非常低的内存开销、cpu占用率低、效能好以及丰富的模块等特点。
   - Apache是世界使用排名第一的Web服务器软件。它可以运行在几乎所有广泛使用的计算机平台上，由于其跨平台和安全性被广泛使用，是最流行的Web服务器端软件之一。

9. 【Java 容器】容器的继承关系：

   ![Java容器继承关系-1](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E9%94%99%E9%A2%98%E9%9B%86/20230209/java%E5%AE%B9%E5%99%A8%E7%BB%A7%E6%89%BF%E5%85%B3%E7%B3%BB-1.png)

![Java容器继承关系-2](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//java%E9%94%99%E9%A2%98%E9%9B%86/20230209/java%E5%AE%B9%E5%99%A8%E7%BB%A7%E6%89%BF%E5%85%B3%E7%B3%BB-2.png)

10. 【初始化】初始化顺序：静态变量和静态初始化块谁先声明谁先初始化。原因穷根究底，**是因为在类加载机制中，初始化阶段产生`<clinit>`()的时候，编译器收集的顺序是由语句在源文件中出现的顺序决定的。**

    初始化顺序解释（从上到下初始化）：

    - 父类静态成员和静态初始化块，按在代码中出现的顺序依次执行。 
    - 子类静态成员和静态初始化块，按在代码中出现的顺序依次执行。 
    - 父类实例成员和实例初始化块，按在代码中出现的顺序依次执行。 
    - 执行父类构造方法。
    - 子类实例成员和实例初始化块，按在代码中出现的顺序依次执行。 
    - 执行子类构造方法。

11. 枚举类中有几个成员变量，其构造方法就执行几次：

    ```java
    enum AccountType
    {
      SAVING, FIXED, CURRENT;
      // 下面的输出语句会执行 3 次
      private AccountType() {
        System.out.println("It is a account type");
      }
    }
    class EnumOne
    {
      public static void main(String[]args) {
        System.out.println(AccountType.FIXED);
      }
    }
    ```