---
title: "Android SDK"
shortTitle: "Android SDK"
description: "Android SDK"
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
article: false
timeline: false
dir:
  text: "Android SDK"
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
  title: "Android SDK"
  description: "Android SDK"
  author:
    name: gzw
    email: 1627121193@qq.com
---





## Android SDK

> TODO 无论是否开源，只要是编写一个库提供给其他的项目去使用，就可以统称为SDK开发



## 其他

Fragment并不像Activity那样必须有界面，我们完全可以向Activity中添加一个隐藏的Fragment，然后在这个隐藏的Fragment中对运行时权限的API进行封装。这是一种非常轻量级的做法，不用担心隐藏Fragment会对Activity的性能造成什么影响

```groovy
dependencies {
 implementation project(':library')
}
```

google和jcenter两个仓库。其中google仓库中包含的主要是Google自家的扩展依赖库，而jcenter仓库中包含的大多是一些第三方的开源库，比如Retrofit、Glide等知名的开源库都是发布到jcenter仓库上的。

