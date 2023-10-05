---
title: "Android 项目日志"
shortTitle: "X-Android 项目日志"
description: "Android 项目日志"
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
  text: "Android 项目日志"
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
  title: "Android 项目日志"
  description: "Android 项目日志"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Android 项目日志

> 五个级别（Log）
>

APP 开发模式

1. 原生开发（Java + Kotlin）重用户体验
2. 混合开发（Flutter、前端）

也有可能使用 JNI 调用 C++ 的代码

| 调用      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| `Log.v()` | 用于打印那些最为琐碎的、意义最小的日志信息。对应级别verbose，是Android日志里面级别最低的一种 |
| `Log.d()` | 用于打印一些调试信息，这些信息对你调试程序和分析问题应该是有帮助的。对应级别debug，比verbose高一级 |
| `Log.i()` | 用于打印一些比较重要的数据，这些数据应该是你非常想看到的、可以帮你分析用户行为的数据。对应级别info，比debug高一级 |
| `Log.w()` | 用于打印一些警告信息，提示程序在这个地方可能会有潜在的风险，最好去修复一下这些出现警告的地方。对应级别warn，比info高一级 |
| `Log.e()` | 用于打印程序中的错误信息，比如程序进入了catch语句中。当有错误信息打印出来的时候，一般代表你的程序出现严重问题了，必须尽快修复。对应级别error，比warn高一级 |

