---
title: "小程序学习路线"
shortTitle: "A-小程序学习路线"
description: "小程序学习路线"
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
  text: "小程序学习路线"
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
  title: "小程序学习路线"
  description: "小程序学习路线"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 小程序学习路线



[[toc]]



:::warning 注意

- Vue3/Vite版要求 node 版本`^14.18.0 || >=16.0.0`
- 如果使用 HBuilderX（3.6.7以下版本）运行 Vue3/Vite 创建的最新的 cli 工程，需要在 HBuilderX 运行配置最底部设置 node路径 为自己本机高版本 node 路径（注意需要重启 HBuilderX 才可以生效）

:::



## 前期准备

1. 前端三大件基础、[尚硅谷 vue2 + vue3 视频教程](https://www.bilibili.com/video/BV1Zy4y1K7SH/?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0) （vue2 必须，vue3 拓展）
2. 构建工具（了解即可）：vue-cli、vite
3. 开发工具：[Hbuilder](https://dcloud.io/hbuilderx.html) + [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
4. [微信公众平台注册账号](https://mp.weixin.qq.com/)，了解平台内的配置

5. 参考相关文章了解：项目配置（包括微信公众平台的配置，不了解可能导致请求失败等）、目录结构及含义、部署上线流程
6. 小程序发展、小程序平台、小程序与 uniapp 的关系
7. [白话 Uniapp](https://uniapp.dcloud.net.cn/vernacular.html#) 配合视频 [Uniapp 与 Vue 合作教程（简单介绍）](https://learning.dcloud.io/#/)（简单过一遍即可）



## Uniapp 学习

1. 基础：
   1. 项目配置、全局配置、页面配置
   2. 页面代码构成：标签变化（对比 vue）、js 部分变化（对比 vue 的生命周期）、样式导入的变化
   3. 路由导航、事件触发、状态管理、网络请求、数据缓存、上传下载、图片文件等
   4. 常用组件或组件库学习（前期熟悉内置组件就行，后续建议看看 [Grace UI](https://www.graceui.com/)、[uView](https://www.uviewui.com/)、[ThorUI](https://thorui.cn/doc/)）、自定义组件与组件间通信、页面适配
   5. Uniapp 常用 API 学习，调用小程序原生 API
   6. 个人认证、权限管理、第三方接入（短信、支付等）
2. 进阶：
   1. 插件扩展（遇到需求再调研就行，没有最后才自己实现）
   2. 运行调试开源项目（推荐：[mall-app-web](https://github.com/macrozheng/mall-app-web)（简单）、[前端铺子-uniapp移动端](https://gitee.com/kevin_chou/qdpz)（较难））
   3. [APP 原生渲染](https://nativesupport.dcloud.net.cn/#)
   4. 调试与性能优化
   5. 云存储、uniCloud、云函数（个人认为没什么必要…不过可以作为拓展或者暴露一些自己的小服务之类的）





## 建议

1. 最好是自己构建起整个框架再填充内容
2. 可以先看 uniapp 再看小程序的原生实现，这样会比较容易上手
3. 如果已经有不错的前端基础，建议直接看官方文档，信息密度大一点（但是需要注意官方文档有点乱，必须要自己总结）
4. 如果是按[黑马程序员前端微信小程序开发教程](https://www.bilibili.com/video/BV1834y1676P?p=114&vd_source=e356fec025b50061af78324a814f8da0)学习的，可以直接从 **95** 集看起，就是先看 uniapp，遇到问题再按视频目录往回找对应的微信小程序对应的内容
5. 如果是看视频的话，建议过程中或者看完后过一遍的官方文档，大致有个印象就行，之后可能经常查
   1. [官方教程](https://uniapp.dcloud.net.cn/tutorial/)
   2. [内置组件](https://uniapp.dcloud.net.cn/component/)
   3. [官方 API 文档](https://uniapp.dcloud.net.cn/api/)





## 视频目标

:::info 说明

下面是 [黑马程序员前端微信小程序开发教程](https://www.bilibili.com/video/BV1834y1676P?p=114&vd_source=e356fec025b50061af78324a814f8da0) 的课程目标速查

先 uniaap 再微信小程序，或者反过来都可以

:::



### uniapp 目标速查（95~192）

#### Step01（95~107）

1. 如何配置uni-app的开发环境
2. 如何把uni-app项目运行到微信开发者工具
3. 如何在uni-app中配置tabBar效果
4. 如何在 uni-app中配置分包并创建分包页面
5. 如何在uni-app项目中发起网络数据请求

<br/>

#### Step02（108~124）

1. 使用scroll-view实现cate分类页面的开发
2. 在uni-app中自定义my-search组件
3. 使用CSS实现吸顶的样式效果
4. 使用CSS实现单行文本溢出时显示为省略号的效果
5. 实现搜索框防抖的功能
6. 使用Set对象解决搜索关键词重复的问题

<br/>

#### Step03（125~145）

1. 如何实现商品列表页面的下拉刷新和上拉加载更多
2. 如何使用rich-text组件渲染富文本内容
3. 如何在uni-app项目中配置和使用vuex
4. Vue的watch侦听器中immediate属性的作用
5. 如何把设置tabBar徽标的代码抽离为mixins

<br/>

#### Step04（146~162）

1. 如何为my-goods组件封装radio勾选状态
2. 如何为my-goods组件封装NumberBox
3. 如何实现购物车滑动删除的效果
4. 如何封装收货地址组件
5. 如何实现收货地址重新授权的功能

<br/>

#### Step05（163~192）

1. 如何实现购物车结算区域的功能开发
2. 如何如何实现微信登录的功能
3. 如何实现3秒倒计时导航跳转的功能
4. 如何实现微信支付的功能
5. 如何把uni-app项目发布为小程序和安卓App





### 小程序目标速查（1~94）

#### Step01（1~17）

1. 如何创建小程序项目
2. 小程序项目的基本组成结构
3. 小程序页面由几部分组成
4. 小程序中常见的组件如何使用
5. 小程序如何进行协同开发和发布

<br/>

#### Step02（18~37）

1. WXML 模板语法渲染页面结构
2. WXSS 样式美化页面结构
3. app.json 对小程序进行全局性配置
4. page.json 对小程序页面进行个性化配置
5. 如何发起网络数据请求

<br/>

#### Step03（38~59）

1. 如何实现页面之间的导航跳转
2. 如何实现下拉刷新效果
3. 如何实现上拉加载更多效果
4. 小程序中常用的生命周期函数

<br/>

#### Step04（60~76）

1. 创建并引用组件
2. 如何修改组件的样式隔离选项
3. 如何定义和使用数据监听器
4. 如何定义和使用纯数据字段
5. 实现组件父子通信有哪3种方式
6. 如何定义和使用behaviors

<br/>

#### Step05（77~94）

1. 如何安装和配置 vant-weapp 组件库
2. 如何使用 MobX 实现全局数据共享
3. 如何对小程序的 API 进行 Promise 化
4. 如何实现自定义 tabBar 的效果