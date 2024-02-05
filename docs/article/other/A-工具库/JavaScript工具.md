---
title: "JavaScript 工具"
shortTitle: "JavaScript 工具"
description: "JavaScript 工具"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "知识点"
- "工具"
tag:
- "知识点"
- "工具"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "JavaScript 工具"
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
  title: "JavaScript 工具"
  description: "JavaScript 工具"
  author:
    name: gzw
    email: 1627121193@qq.com
---







## JavaScript 工具

[[toc]]




### 节流

```js
function throttle(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn();
            timer = null;
        }, delay);
    }
}
```



### 防抖

```js
debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay)
    }
}
```





### 获取页面宽高

| 属性           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| `offsetWidth`  | 元素的整体宽度，包括元素的宽度、水平内边距、水平边框。不包括垂直滚动条（如果有的话）、外边距和 `::before` 或 `::after` 等伪元素的宽度。 |
| `offsetHeight` | 元素的整体高度，包括元素的高度、垂直内边距、垂直边框。不包括水平滚动条（如果有的话）、外边距和 `::before` 或 `::after` 等伪元素的高度。 |
| `clientWidth`  | 元素的可视宽度，包括元素的宽度和水平内边距。不包括水平边框、垂直滚动条（如果有的话）和外边距。 |
| `clientHeight` | 元素的可视高度，包括元素的高度和垂直内边距。不包括垂直边框、水平滚动条（如果有的话）和外边距。 |
| `scrollWidth`  | 元素的滚动宽度，包括元素的宽度和溢出内容的宽度。不包括水平边框、垂直滚动条（如果有的话）和外边距。 |
| `scrollHeight` | 元素的滚动高度，包括元素的高度和溢出内容的高度。不包括垂直边框、水平滚动条（如果有的话）和外边距。 |

涵盖所有浏览器：  

```js
var w=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
```

