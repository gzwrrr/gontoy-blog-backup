---
title: "ADB"
shortTitle: "ADB"
description: "ADB"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-10-01
category: 
- "Android"
- "移动端"
tag:
- "Android"
- "移动端"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "ADB"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 1
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "ADB"
  description: "ADB"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# ADB

1. 普通型
2. Shell型（ROOT）
   1. 非交互式
   2. 交互式



## 普通型常用命令

1. `adb devices`：查看设备
2. `adb install <args> <path>`：安装 APK
   1. `-r`：强制替换已存在的应用程序
   2. `-d`：允许降级安装
   3. `-t`：允许安装 debug 版测试包
   4. `-l`：锁定应用程序
   5. `-s`：将应用程序安装到 SD 卡上
   6. `-g`：安装后自动授权所有权限
3. `adb uninstall <packagename>`：卸载
4. `adb push/pull`：推送接收文件
5. `adb reboot <args>`：
   1. 默认是重启
   2. `recovery`：重启到恢复模式
   3. `bootloader`：重启到 `fastboot` 模式
   4. `edl`：重启到 9008 串口模式
   5. `download`：重启到挖煤模式
   6. `-p`：关机



## Shell 型

1. am 命令（Activity Manager）
2. pm 命令（Package Manager）
3. wm 命令（Window Manager）