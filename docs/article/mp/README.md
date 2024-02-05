---
title: "Uniapp"
shortTitle: "Uniapp"
description: "Uniapp"
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
  text: "Uniapp"
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
  title: "Uniapp"
  description: "Uniapp"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Uniapp



[[toc]]



## 简介



![img](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//uniapp/20230920/uniapp%E6%9E%B6%E6%9E%84%E5%9B%BE.png)

1. DCloud 公司研发，跨平台框架，开发者编写一套代码，可发布到iOS，Android，H5，以及各种小程序（微信/支付宝/百度/头条/ QQ /钉钉）等多个平台
2. 在跨端的同时，通过条件编译+平台特有API调用，可以优雅的为某平台写个性化代码，调用专有能力而不影响其他平台
3. 支持原生代码混写和原生SDK集成
4. App端支持weex原生渲染，可支持更流畅的用户体验
5. vue语法 + 微信小程序api
6. uni-app 提供了两种 App 渲染模式，一种是 基于 weex 的 .nvue, 一种是 基于webview 的 .vue。对于后者，还有一个类似的平台：[apicloud](https://www.zhihu.com/search?q=apicloud&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2450229554})，俩平台很类似，都是给webview提供常用的接口，让h5页面具备调用系统api能力。区别在于 uni 使用了vue而已
7. uni-app是[mpvue](http://mpvue.com/)的超集



### webview

WebView是一种用于在移动应用中嵌入Web内容的组件或控件。它允许开发者在原生移动应用中显示Web页面，以便将Web内容与原生应用的功能和界面无缝整合在一起。WebView通常由操作系统提供，开发者可以在应用中使用它来加载和显示HTML、CSS和JavaScript等Web技术创建的内容。

1. **原生应用嵌入Web内容**：WebView允许开发者将Web页面嵌入到原生移动应用中的特定区域，用户可以在应用内部访问Web内容，而无需离开应用。
2. **与原生应用交互**：WebView不仅可以显示静态Web页面，还可以与原生应用的功能进行交互。这意味着开发者可以使用JavaScript与原生代码通信，实现诸如打开相机、发送通知、访问设备传感器等功能。
3. **渲染引擎**：WebView使用浏览器内核或渲染引擎来解析和渲染Web内容。不同的移动操作系统使用不同的内核，如Android使用[WebKit](https://webkit.org/)或[Chromium](https://www.chromium.org/Home/)，iOS使用WebKit。
4. **性能和安全性**：WebView的性能和安全性与所使用的渲染引擎和操作系统有关。为了确保用户安全，开发者需要小心处理来自WebView的外部Web内容，以防止潜在的安全漏洞。
5. **适用场景**：WebView通常用于以下场景：
   - 在应用中显示帮助文档或用户协议。
   - 显示新闻文章、博客或其他在线内容。
   - 集成第三方Web服务，如社交媒体登录、支付、地图等。
   - 在原生应用中展示Web视图，以实现动态内容和用户互动。
6. **跨平台开发**：许多跨平台移动应用框架，如React Native、Flutter和Xamarin，也提供了WebView的封装组件，使开发者能够在不同平台上使用相同的Web内容。



### weex

[Weex](https://github.com/alibaba/weex)是一个开源的跨平台移动应用开发框架，它由阿里巴巴集团开发并开源，旨在帮助开发者构建高性能的移动应用，同时实现跨平台的开发和发布。Weex允许开发者使用一套代码，将应用程序同时发布到多个移动平台，如iOS、Android和Web。

1. **跨平台开发**：Weex的主要目标是支持一次开发，多平台发布。开发者可以使用Vue.js或Rax等框架编写一套代码，然后将其发布到iOS、Android和Web等平台上。
2. **组件化开发**：Weex使用组件化的开发模式，允许开发者构建可重用的UI组件。这些组件可以跨平台使用，并且在不同平台上具有相似的行为和外观。
3. **原生渲染引擎**：Weex应用程序的UI组件由原生渲染引擎来渲染，以保证高性能和原生应用的体验。这意味着Weex应用的性能可以与原生应用媲美。
4. **热更新支持**：Weex支持热更新，允许开发者在不重新发布应用的情况下，实时更新应用内容和功能。
5. **生态系统**：Weex拥有丰富的生态系统，包括一系列的UI组件库、插件和工具，帮助开发者更轻松地构建应用。
6. **开放性和扩展性**：Weex是一个开放的框架，允许开发者扩展和定制其功能。你可以编写自定义的Weex组件和模块，以满足特定需求。
7. **支持多语言**：Weex支持多种前端开发语言，包括Vue.js、Rax（类React框架）、Angular等，让开发者可以使用熟悉的技术栈来开发应用。



### uniapp 与 vue

1. **跨平台 vs 单平台**：
   - UniApp是一个跨平台开发框架，可以将代码发布到多个平台，如iOS、Android、Web、微信小程序、支付宝小程序等。
   - Vue.js主要用于单页面应用（SPA）的开发，通常在Web浏览器上运行，虽然也可以通过一些工具将其用于移动应用开发，但不具备UniApp的跨平台特性。
2. **API和组件的差异**：
   - UniApp提供了一套内置的API和组件，用于访问不同平台的设备功能和UI元素，这些API和组件在不同平台上有一定的差异。
   - Vue.js并不直接提供设备访问功能或跨平台UI组件，它更侧重于构建Web应用，通常需要第三方库或插件来实现设备功能和UI组件。
3. **项目结构**：
   - UniApp的项目结构通常包括不同平台的代码目录，如`/pages`用于存放页面，`/components`用于存放组件，以及平台特定的配置文件。
   - Vue.js项目结构更加自由，可以根据需要组织代码，但通常包括`/src`用于存放Vue组件和应用代码。
4. **路由管理**：
   - UniApp使用自带的路由管理机制，类似于Vue Router，但需要处理不同平台的路由差异。
   - Vue.js也可以使用Vue Router进行路由管理，但通常需要额外配置来适应移动应用或跨平台应用的需求。
5. **打包和发布**：
   - UniApp具有特定于每个平台的打包和发布工具，可以轻松将应用程序发布到不同的应用商店或Web服务器。
   - Vue.js在移动应用或跨平台开发时需要使用其他工具，如Cordova、Ionic等，来打包和发布应用。
6. **生态系统**：
   - Vue.js拥有庞大的生态系统，有丰富的第三方库、插件和社区支持，适用于Web应用开发。
   - UniApp的生态系统相对较小，主要集中在移动应用和小程序开发领域。



<br/>

<br/>

## 相关资源

### 官方文档

1. [Uniapp 官方教程](https://uniapp.dcloud.net.cn/tutorial/)
2. [Uniapp 官方推荐](https://uniapp.dcloud.net.cn/resource.html#%E4%B8%89%E6%96%B9%E5%9F%B9%E8%AE%AD%E6%9C%BA%E6%9E%84%E8%A7%86%E9%A2%91)
3. [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/)
4. [Uniapp Gitee 仓库](https://gitee.com/dcloud/uni-app)



### 视频教程

1. [黑马程序员前端微信小程序开发教程](https://www.bilibili.com/video/BV1834y1676P?p=114&vd_source=e356fec025b50061af78324a814f8da0)
2. [Uni-App从入门到实战](https://www.bilibili.com/video/BV1BJ411W7pX/?spm_id_from=333.788.recommend_more_video.0&vd_source=e356fec025b50061af78324a814f8da0)
3. [Uniapp 与 Vue 合作教程（简单介绍）](https://learning.dcloud.io/#/)



### 相关文章

1. [W3C 速查](https://www.w3cschool.cn/uni_app/uni_app-k8zg370b.html)
2. [2023最新最全uniapp入门学习](https://blog.csdn.net/qiushi_1990/article/details/127675537)
3. [uniapp学习笔记之知识点大总结](https://blog.csdn.net/Qiuxuntao/article/details/126420043)
4. [uniapp基础知识—大总结](https://blog.csdn.net/john_QY/article/details/109440641)
5. [小程序的生命周期、数据绑定、事件处理、组件与通信](https://segmentfault.com/a/1190000015684864)
6. [组件/标签、js、css 等的变化](https://ask.dcloud.net.cn/article/35657)



### 开源项目

1. [mall-app-web](https://github.com/macrozheng/mall-app-web)、[mall-app-admin](https://gitee.com/macrozheng/mall)、[mall-app 文档](https://www.macrozheng.com/)
2. [前端铺子-uniapp移动端](https://gitee.com/kevin_chou/qdpz)
3. [微同商城](https://gitee.com/fuyang_lipengjun/platform)



### 在线书籍/文档

[书栈网 - 移动端](https://www.bookstack.cn/explore?tab=popular&cid=152)



### 其他

[建议看看做好心理准备（被坑过几次了…）](https://www.zhihu.com/question/444976489)



<br/>

## 常用组件库

:::info 官方推荐

1. [uni-app 中可使用的 UI 框架](https://ask.dcloud.net.cn/article/35489)

2. [uni-app 导航栏开发指南](https://ask.dcloud.net.cn/article/34921)

3. [uni-app 实现全局变量](https://ask.dcloud.net.cn/article/35021)

4. [uni-app 引用 npm 第三方库](https://ask.dcloud.net.cn/article/19727)

5. [uni-app 中使用微信小程序第三方 SDK 及资源汇总](https://ask.dcloud.net.cn/article/35070)

6. [原生控件层级过高无法覆盖的解决方案](https://uniapp.dcloud.io/component/native-component)

7. [国际化/多语言/i18n方案](https://ask.dcloud.net.cn/article/35872)

8. [本地存储详解](https://ask.dcloud.net.cn/article/166)

:::

* [Grace UI](https://www.graceui.com/)
* [uView](https://www.uviewui.com/)
* [ThorUI](https://thorui.cn/doc/)
* [ColorUI](https://ext.dcloud.net.cn/plugin?id=239)
* [Vant](https://vant-contrib.gitee.io/vant/#/zh-CN)
* [FirstUI](https://www.firstui.cn/)
* [NutUI](https://nutui.jd.com/#/)
* [Varlet](https://varlet.gitee.io/varlet-ui/#/zh-CN/home)
* [nutui-bingo](https://nutui.jd.com/bingo/#/)
* [uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html)





<br/>

## 插件

:::info 文档

- [微信小程序开发资源汇总](https://www.runoob.com/w3cnote/wx-xcx-repo.html)

- [插件市场](https://ext.dcloud.net.cn/)

:::

- [uni-request](https://uniapp.dcloud.net.cn/api/request/request.html)：发起HTTP请求
- [uni-simple-router-v3](https://ask.dcloud.net.cn/article/40621)：vue3 + vite 路由
- [uniapp-router-patch](https://www.npmjs.com/package/uniapp-router-patch)：路由兼容插件
- [uni-icons](https://ext.dcloud.net.cn/plugin?id=28)：丰富图标集
- [popup](https://ext.dcloud.net.cn/plugin?id=11792)：弹出框和提示框
- [uni-calendar](https://ext.dcloud.net.cn/plugin?id=56)：日历组件
- [uni-datetime-picker](https://ext.dcloud.net.cn/plugin?id=3962)：日期选择器
- [uni-file-picker](https://ext.dcloud.net.cn/plugin?id=4079)：文件选择器
- [uni-data-picker](https://ext.dcloud.net.cn/plugin?id=3796)：数据驱动的picker选择器
- [richtext-editor](富文本编辑器)：富文本编辑器插件
- [z-paging](https://z-paging.zxlee.cn/)：上拉加载下拉刷新组件
- [z-tabs](https://ext.dcloud.net.cn/plugin?id=8308)：tab栏组件库
- [uni-composition-api](https://github.com/hairyf/uni-composition-api)：Composition API 插件
- [uni-simple-router](https://github.com/SilurianYang/uni-simple-router)：路由扩展库



<br/>

## 其他问题

:::warning 说明

可能会踩的一些坑…

1. [官方说明，遇到问题可以先看这](https://uniapp.dcloud.net.cn/matter.html)

2. [官方总结](https://uniapp.dcloud.net.cn/faq.html)

:::



**各端的管理规则需要耐心学习**

每个端，有每个端的管理规则，这不是uni-app在技术上上可以抹平的：

- 例如H5端的浏览器有跨域限制
- 例如微信小程序会强制要求https链接，并且所有要联网的服务器域名都要配到微信的白名单中
- 例如App端，iOS对隐私控制和虚拟支付控制非常严格
- 例如App端，Android，国产rom各种兼容性差异，尤其是因为谷歌服务被墙，导致的push，定位等开发混乱的坑
- 如果App要使用三方sdk，进行定位，地图，支付，推送...还要遵守他们的规则和限制



<br/>

**文档混乱**

由于为了宣传的支持多平台，文档中接口也为了做到统一，所以经常会看到这样的情况：

1. 找到一个api 接口
2. 拿来测试一遍
3. 怎么跑都跑不动
4. 文档往下翻，翻到最后，发现不支持这个平台

另外还有很多 uni app 自己都解决不了的问题，只能自己修修补补…
