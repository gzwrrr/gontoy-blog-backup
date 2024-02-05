---
title: "Uniapp API"
shortTitle: "C-Uniapp API"
description: "Uniapp API"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-09-15
category: 
- "移动端"
- "小程序"
tag:
- "移动端"
- "小程序"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Uniapp API"
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
  title: "Uniapp API"
  description: "Uniapp API"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Uniapp API



[[toc]]



:::info 说明

[Uniapp 官方 API 文档](https://uniapp.dcloud.net.cn/api/)

相关的 API 会陆续补充完整…（还会补上微信小程序原生的 API）

:::



## 概览

小程序中分为三类 API：

1. 事件监听类 API
2. 同步 API
3. 异步 API



## 常用

发送请求：uni.request

选择图片：uni.chooseImage

上传文件：uni.uploadFile

弹框提示：uni.showToast

下载文件：uni.downloadFile

跳转：uni.navigateTo(object)

重定向：uni.redirectTo(object)

重新加载：uni.reLaunch(object)

切换TAB：uni.switchTab(object)

返回：uni.navigateBack(object)





## WebSocket

1. SocketTask.onMessage
2. SocketTask.send(object)
3. SocketTask.close(object)
4. SocketTask.onOpen(callback)
5. SocketTask.onClose(callback)
6. SocketTask.onError(callback)





## 缓存

1. 设置缓存：uni.setStorage(object)
2. uni.setStorageSync(key,data)
3. uni.getStorage(object)
4. uni.getStorageSync(key)
5. uni.getStorageInfo(object)
6. uni.getStorageInfoSync()
7. uni.removeStorage(object)
8. uni.removeStorageSync(key)
9. uni.clearStorage()
10. uni.clearStorageSync()





## 位置

1. uni.getLocation(object)
2. uni.chooseLocation(object)
3. uni.openLocation(OBJECT)

