---
title: "Uniapp 知识点"
shortTitle: "A-Uniapp 知识点"
description: "Uniapp 知识点"
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
timeline: true,
dir:
  text: "Uniapp 知识点"
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
  title: "Uniapp 知识点"
  description: "Uniapp 知识点"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# Uniapp 知识点

[[toc]]



## 概览

:::info 说明

下面的知识点会陆续补充上…

:::

1. 约定与项目结构
2. 全局配置、页面配置
3. 样式
4. 数据绑定
5. 事件触发
6. 生命周期
7. 状态管理
8. 组件、通信
9. 网络请求
10. 数据缓存
11. 上传下载
12. 图片、文件
13. 路由导航
14. 插件扩展
15. 调试与性能调优



## 约定与项目结构

:::info 规范

1. 页面文件遵循 Vue 单文件组件 (SFC) 规范
2. 组件标签靠近小程序规范，详见uni-app 组件规范
3. 接口能力（JS API）靠近微信小程序规范，但需将前缀 wx 替换为 uni，详见uni-app接口规范
4. 数据绑定及事件处理同 Vue.js 规范，同时补充了App及页面的生命周期
5. 为兼容多端运行，建议使用flex布局进行开发

:::

1. `pages.json` 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等
2. `manifest.json` 文件是应用的配置文件，用于指定应用的名称、图标、权限等。
3. `App.vue` 是我们的跟组件，所有页面都是在App.vue下进行切换的，是页面入口文件，可以调用应用的生命周期函数。
4. `main.js` 是我们的项目入口文件，主要作用是初始化vue实例并使用需要的插件。
5. `uni.scss` 文件的用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格，uni.scss文件里预置了一批scss变量预置。
6. `unpackage` 就是打包目录，在这里有各个平台的打包文件
7. `pages` 所有的页面存放目录
8. `static` 静态资源目录，例如图片等
9. `components` 组件存放目录





## 生命周期

| 函数名                 | 说明                                                      |
| :--------------------- | :-------------------------------------------------------- |
| `onLaunch`             | 当`uni-app`初始化完成时触发（局部只触发一次）             |
| `onOpen`               | 当`uni-app`启动，或从后台进入前台显示                     |
| `onHide`               | 当`uni-app`从前台进入后台                                 |
| `onError`              | 当`uni-app`报错时触发                                     |
| `onUniNViewMessage`    | 对`nvue`页面发送的数据进行监听，可参考`nvue `向`vue `通讯 |
| `onUnhandledRejection` | 对未处理的 Promise 拒绝事件监听函数（2.8.1+）             |
| `onPageNotFound`       | 页面不存在监听函数                                        |
| `onThemeChange`        | 监听系统主题变化                                          |



## 路由导航

框架以栈的形式管理当前所有页面，当发生路由切换的时候，页面栈的表现如下：

| 路由方式 | 页面栈表现                       | 触发时机                                                     |
| :------- | :------------------------------- | :----------------------------------------------------------- |
| 初始化   | 新页面入栈                       | uni-app：的第一个页面                                        |
| 新页面   | 新页面入栈                       | 调用API  `uni.navigateTo` ，使用组件  `<navigator open-type =“ navigate” />` |
| 页面重启 | 当前页面出栈，新页面入栈         | 调用API  `uni.redirectTo` ，使用组件 `<navigator open-type =“ redirectTo” />` |
| 页面返回 | 页面不断出栈，直到目标返回页     | 调用API  `uni.navigateBack`  ，使用组件 `<navigator open-type =“ navigateBack” />` ，用户按左上角返回按钮，安卓用户点击物理后退键 |
| 标签切换 | 页面全部出栈，只留下新的标签页面 | 调用API  `uni.switchTab`  ，使用组件 `<navigator open-type =“ switchTab” />`，用户切换 Tab |
| 重加载   | 页面全部出栈，只留下新的页面     | 调用API `uni.reLaunch`，使用组件 `<navigator open-type =“ reLaunch” />` |



## 样式

uni-app 支持的通用 css 单位包括 px、rpx：

- px 即屏幕像素
- rpx 即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大。

<br/>

vue页面支持普通H5单位，但在nvue里不支持：

- rem 默认根字体大小为 屏幕宽度/20（微信小程序、字节跳动小程序、App、H5）
- vh viewpoint height，视窗高度，1vh等于视窗高度的1%
- vw viewpoint width，视窗宽度，1vw等于视窗宽度的1%

<br/>

nvue还不支持百分比单位。

App端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，只支持 px。注意此时不支持 rpx

nvue中，uni-app 模式（nvue 不同编译模式介绍）可以使用 px 、rpx，表现与 vue 中一致。weex 模式目前遵循weex的单位，它的单位比较特殊：

- px:，以750宽的屏幕为基准动态计算的长度单位，与 vue 页面中的 rpx 理念相同。（一定要注意 weex 模式的 px，和 vue 里的 px 逻辑不一样。）
- wx：与设备屏幕宽度无关的长度单位，与 vue 页面中的 px 理念相同

<br/>

下面对 rpx 详细说明：

- 设计师在提供设计图时，一般只提供一个分辨率的图。
- 严格按设计图标注的 px 做开发，在不同宽度的手机上界面很容易变形。
- 而且主要是宽度变形。高度一般因为有滚动条，不容易出问题。由此，引发了较强的动态宽度单位需求。
- 微信小程序设计了 rpx 解决这个问题，uni-app 在 App 端、H5 端都支持了 rpx。
- rpx 是相对于基准宽度的单位，可以根据屏幕宽度进行自适应。uni-app 规定屏幕基准宽度 750rpx。
- 开发者可以通过设计稿基准宽度计算页面元素 rpx 值，设计稿 1px 与框架样式 1rpx 转换公式如下：
- 设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx
- 换言之，页面元素宽度在 uni-app 中的宽度计算公式：750 * 元素在设计稿中的宽度 / 设计稿基准宽度

举例说明：

1. 若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：750 * 100 / 750，结果为：100rpx。
2. 若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 uni-app 里面的宽度应该设为：750 * 100 / 640，结果为：117rpx。
3. 若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 uni-app 里面的宽度应该设为：750 * 200 / 375，结果为：400rpx。

:::note Tips

- 注意 rpx 是和宽度相关的单位，屏幕越宽，该值实际像素越大。如不想根据屏幕宽度缩放，则应该使用 px 单位。
- 如果开发者在字体或高度中也使用了 rpx ，那么需注意这样的写法意味着随着屏幕变宽，字体会变大、高度会变大。如果你需要固定高度，则应该使用 px 。
- rpx不支持动态横竖屏切换计算，使用rpx建议锁定屏幕方向
- 设计师可以用 iPhone6 作为视觉稿的标准。
- 如果设计稿不是750px，HBuilderX提供了自动换算的工具，详见：https://ask.dcloud.net.cn/article/35445。
- App端，在 pages.json 里的 titleNView 或页面里写的 plus api 中涉及的单位，只支持 px，不支持 rpx。
- 早期 uni-app 提供了 upx ，目前已经推荐统一改为 rpx 了，[详见](http://ask.dcloud.net.cn/article/36130)

:::



### 样式导入

使用@import语句可以导入外联样式表，@import后跟需要导入的外联样式表的相对路径，用;表示语句结束。

```html
<style>
    @import "../../common/uni.css";
    .uni-card {
        box-shadow: none;
    }
</style>
```



### 内联样式

框架组件上支持使用 style、class 属性来控制组件的样式。

- style：静态的样式统一写到 class 中。style 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 style 中，以免影响渲染速度。`<view :style="{color:color}" />`
- class：用于指定样式规则，其属性值是样式规则中类选择器名(样式类名)的集合，样式类名不需要带上.，样式类名之间用空格分隔。`<view class="normal_view" />`

