---
title: "PWA 基本介绍"
shortTitle: "PWA 基本介绍"
description: "PWA 基本介绍"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-02-03
category: 
- "优化"
- "缓存"
- "通用"
tag:
- "优化"
- "缓存"
- "通用"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "PWA 基本介绍"
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
  title: "PWA 基本介绍"
  description: "PWA 基本介绍"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# PWA 基本介绍


[[toc]]



PWA 的优势：

- 渐进式
- 流畅
- 可安装
- 原生体验
- 用户粘性





# 核心技术

## Web app manifest

[配置清单](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)

- 可以添加到主屏幕
- 启动时可以有过渡图标
- 隐藏浏览器 UI



## Service worker

HTML5 API，主要用来做离线缓存

前端有很多需要联网才能使用的优化：

- CDN
- CSS Sprite
- 文件的合并压缩
- 异步加载
- 资源缓存

在断网的情况下：

1. Service worker 可以极大提升用户体验
2. Service worker 是一个独立的 worker 线程，独立于当前网页进程，可以操作缓存，是一种特殊的 Web worker（不能操作 DOM 和 BOM）



Service worker 的生命周期事件：

1. `install` 事件会在注册成功时触发，主要用于缓存资源；文件发生改变时会触发该事件
2. `active` 事件会在激活的时候触发，主要用于删除旧的资源；会在 `install` 事件后触发，但是如果已经存在 Service worker 了，就不会触发直到其终止（这里可以跳过等待）
3. `fetch` 事件会在发送请求的时候触发，主要用于操作缓存或者读取网络资源



## Cache API

`cacheStorage` 接口表示 Cache 对象的存储，配合 Service worker 操作缓存，和操作数据库类似