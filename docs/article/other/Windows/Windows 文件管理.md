---
title: "Windows 文件管理"
shortTitle: "Windows 文件管理"
description: "Windows 文件管理"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-03-09
category: 
- "windows"
tag:
- "windows"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Windows 文件管理"
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
  title: "Windows 文件管理"
  description: "Windows 文件管理"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Windows 文件管理



:::info 说明
个人 Windows 上的文件管理方案，如果觉得不妥或者有更好的方案可以评论一下
:::



[[toc]]





## 为什么会考虑文件管理？

**起初：** 两年前刚开始学习编程时电脑都不太会用，对文件管理一点概念都没有，经常出现找不到文件或者 C 盘时常脸红

<br/>



**萌芽：** 随着编程需要的「环境/配置/依赖」越来越多，逐渐意识到不好好管理文件就可能每次需要时重新配置一下，非常打乱节奏，于是开始清理以及重装

<br/>



**曲折：** 最初的方案是根据 **带含义的长目录名** 管理，例如 `A-Multi-Software-N`（表示用于存放所有软件，目录不可移动，大概这种意思），当时一味地认为分层够多，层级够深就可以很好的管理，但实际上分层多分层深只会找得累，时间长了自己都不记得；目录名长则是新建时很折磨。之后甚至还因为文件路径太长导致系统环境变量满了（我还手残不小心删了，只能全部重新配置），折磨久了就完全放弃了这种冗长的方案。

<br/>



**如今：** 上面的经历提醒我做好文件管理，**分层不能太多，名称不能太长，但是含义必须明确**，当层级超过三层左右查找就变得吃力，此时应该考虑 **平铺** 管理。当前的理念或者目标就是：

1. **快捷**： 不要过分追求多层次的树状结构，超过一定层级后就开始平铺，一切都是为了 **快速查询** 而服务的
2. **规范**： 命名统一（我采用的是大驼峰命名），并且用尽可能少的单词解释含义，目的是在需要分类时能第一时间想到并找到对应的目录在哪
3. **易备份**： 每一类别集中管理，同时要方便备份（备份时直接压缩某一类的底层目录即可），目的是将数据迁移的成本降至最低，比如「软件安装路径及其数据等」与「软件安装包/压缩包」分离（我最初的方案是都放在一起，后来发现备份时很麻烦）









## 当前管理模式

> 先直接感受下是否整齐，第一个图片是 C 盘，第二个图片是 D 盘。
>
> 已经使用挺久了，过程没有什么大问题

:::note 话外音

C 盘其实不应该放这么多东西，太多会导致系统卡顿（即便是做好了管理），我这里主要是因为 D 盘是后来加的，当时 C 盘已经存了很多东西，迁移成本太大就保持这样了，我下面 C 盘中的所有分层其实都可以转移到 D 盘中。

有条件还是建议尽量存在系统盘之外的盘符中。

:::

:::details C 盘

![文件管理](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86/20230310/%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%861.png)

:::

:::details D 盘

![文件管理2](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86/20230310/%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%862.png)

:::



<br/>



**可以看到顶级目录主要有：**

静态（路径不能随意改变，不必迁移备份，例如软件不能随意移动，不需要备份管理）：

1. Software：全部软件
2. Config：全部配置/依赖

动态（路径可能随时修改，需要备份迁移等）：

1. Data：全部工作数据
2. Code：全部源码
3. Resoure：全部可用（有用）资源（例如特殊的软件安装包/破解，学习资料等）
4. Backup：非本地文件的备份（例如我云盘中的资源）
5. Photos：相册

可以发现有些是存在包含关系的（比如 Resoure 可以包含 Photos），我没有包含是因为我对于顶层目录的看法是：动静分离，习惯大于包含

<br/>



**动静分离**：这样做动态的资源备份或迁移打包即可

**习惯大于包含**：常常使用到的不必要非得包含在某一类中，可以按照使用频率平铺开来，自己习惯才最重要





### 对于软件的管理：

> 首先就是安装包与程序本身及其数据分离，程序本身及其数据集中管理

例如对虚拟机的管理：

1. Software：软件本体
2. Data：软件数据
3. Cache：缓存
4. VirtualMachines：不同虚拟机

![image-20230310003140802](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86/20230310/%E8%BD%AF%E4%BB%B6%E7%AE%A1%E7%90%861.png)

此外，超过三层后直接采用平铺，避免层级太深不好寻找

![image-20230310003521564](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86/20230310/%E8%BD%AF%E4%BB%B6%E7%AE%A1%E7%90%862.png)



> TODO 待补充……