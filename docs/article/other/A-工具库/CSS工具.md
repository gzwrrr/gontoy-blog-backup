---
title: "CSS 工具"
shortTitle: "CSS 工具"
description: "CSS 工具"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-12-04
category: 
- "css"
- "通用"
tag:
- "css"
- "通用"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "CSS 工具"
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
  title: "CSS 工具"
  description: "CSS 工具"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# CSS 工具

[[toc]]





## 样式/动画

### 滚动条样式修改

```css
.scrollStyle::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background-color: #F5F5F5;
}

.scrollStyle::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #F5F5F5;
}

.scrollStyle::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #72b5fb;
}
```



### 元素抖动动画

```css
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
```



### 元素同宽

```css
.sameWidth {
  display: inline-flex;
  flex-direction: column;
}
```



### 文字超出省略

```css
.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```





## Bug

### 基线对齐错位

```css
/* 变换基线对齐方式就可以解决错位问题 */
vertical-align: top;
```

