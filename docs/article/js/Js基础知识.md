---
title: "JS 基础知识"
shortTitle: "JS 基础知识"
description: "JS 基础知识"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-07-12
category: 
- "js"
tag:
- "js"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "JS 基础知识"
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
  title: "JS 基础知识"
  description: "JS 基础知识"
  author:
    name: gzw
    email: 1627121193@qq.com
---

# JS 基础知识


## Dom 和 BOM
1. DOM（文档对象模型）和 BOM（浏览器对象模型）是 Web 前端开发中两个非常重要的概念。

2. DOM 指的是浏览器中渲染出来的 HTML 页面和其中的元素节点，提供了一种访问和操作这些节点的标准化方式，包括了节点的增删改查、样式的修改、事件的监听等等。DOM 操作主要通过 JavaScript 来完成。

3. BOM 指的是浏览器提供的一些对象和方法，包括浏览器窗口、浏览器历史记录、浏览器地址栏、浏览器的前进和后退按钮等等，它们都是通过 JavaScript 来访问和操作的。BOM 中常用的对象有 window、location、history、navigator 等等。

4. DOM 和 BOM 的区别在于它们的对象不同，DOM 操作的对象是网页中的文档内容，而 BOM 操作的对象是浏览器窗口和其他浏览器提供的功能。但是由于它们都是通过 JavaScript 来访问和操作的，因此它们之间的区别也不是非常明显，有时候也会有重叠和交互的情况。





## Windows 和 Document

在Web开发中，window和document是两个非常重要的对象：
1. window对象表示当前浏览器窗口，它是BOM（浏览器对象模型）的一部分，提供了很多与浏览器窗口相关的属性和方法，如：window.innerWidth、window.innerHeight、window.open()等  
2. document对象表示当前页面，它是DOM（文档对象模型）的一部分，提供了很多与页面内容相关的属性和方法，如：document.getElementById()、document.querySelector()等  



## Js 数据类型

| 变量类型  | 描述                                   |
| --------- | -------------------------------------- |
| Undefined | 变量未定义或未声明                     |
| Null      | 空值                                   |
| Boolean   | 布尔值，只有两个取值：true 和 false    |
| Number    | 数值类型，包括整数和浮点数             |
| String    | 字符串类型                             |
| Object    | 对象类型，包括数组、函数、正则表达式等 |
| Symbol    | 符号类型，表示唯一的标识符             |



## Js 对象类型

可以使用 **typeof** 操作符来查看 JavaScript 变量的数据类型

**constructor** 属性返回所有 JavaScript 变量的构造函数

| 类型     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| Object   | JavaScript 中的一切都是对象，可以是内置对象、宿主对象或自定义对象。 |
| Array    | 一种用于存储多个值的有序集合。                               |
| Function | 一种可调用对象，它可以被执行并且有自己的作用域。             |
| Date     | 一种表示日期和时间的对象。                                   |
| RegExp   | 一种用于匹配字符串的对象。                                   |
| Error    | 一种表示运行时错误的对象。                                   |
| Math     | 用于执行数学任务的内置对象。                                 |
| JSON     | 一种用于处理 JSON 数据的对象。                               |



## HTML 事件

HTML 事件可以是浏览器行为，也可以是用户行为。

HTML 网页中的每个元素都可以产生某些可以触发 JavaScript 函数的事件。

以下是 HTML 事件的实例：

- HTML 页面完成加载
- HTML input 字段改变时
- HTML 按钮被点击

**常见的HTML事件：**

下面是一些常见的HTML事件的列表:

| 事件        | 描述                         |
| :---------- | :--------------------------- |
| onchange    | HTML 元素改变                |
| onclick     | 用户点击 HTML 元素           |
| onmouseover | 用户在一个HTML元素上移动鼠标 |
| onmouseout  | 用户从一个HTML元素上移开鼠标 |
| onkeydown   | 用户按下键盘按键             |
| onload      | 浏览器已完成页面的加载       |





## Arguments 对象

JavaScript 函数有个内置的对象 arguments 对象.

argument 对象包含了函数调用的参数数组。

通过这种方式你可以很方便的找到最后一个参数的值：

```js
x = findMax(1, 123, 500, 115, 44, 88);
function findMax() {
    var i, max = arguments[0];
    if(arguments.length < 2)return max;
    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}
```





## 调用 JavaScript 函数

```js
function myFunction(a, b) {
    return a * b;
}
myFunction(10, 2);           // myFunction(10, 2) 返回 20
```

以上函数不属于任何对象。但是在 JavaScript 中它始终是默认的全局对象。

在 HTML 中默认的全局对象是 HTML 页面本身，所以函数是属于 HTML 页面。

在浏览器中的页面对象是浏览器窗口(window 对象)。以上函数会自动变为 window 对象的函数。

myFunction() 和 window.myFunction() 是一样的：







## 作为函数方法调用函数

在 JavaScript 中, 函数是对象。JavaScript 函数有它的属性和方法。

**call()** 和 **apply()** 是预定义的函数方法。 两个方法可用于调用函数，两个方法的第一个参数必须是对象本身

```js
function myFunction(a, b) {
    return a * b;
}
myFunction.call(myObject, 10, 2);      // 返回 20
```

```js
function myFunction(a, b) {
    return a * b;
}
myArray = [10,2];
myFunction.apply(myObject, myArray);   // 返回 20
```

两个方法都使用了对象本身作为第一个参数。 两者的区别在于第二个参数： apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）。

在 JavaScript 严格模式(strict mode)下, 在调用函数时第一个参数会成为 **this** 的值， 即使该参数不是一个对象。

在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。







## onload 和 onunload 事件

1. onload 和 onunload 事件会在用户进入或离开页面时被触发
2. onload 事件可用于检测访问者的浏览器类型和浏览器版本，并基于这些信息来加载网页的正确版本
3. onload 和 onunload 事件可用于处理 cookie







## HTML DOM 事件监听器

1. addEventListener() 方法用于向指定元素添加事件句柄。
2. addEventListener() 方法添加的事件句柄不会覆盖已存在的事件句柄。
3. 你可以向一个元素添加多个事件句柄。
4. 你可以向同个元素添加多个同类型的事件句柄，如：两个 "click" 事件。
5. 你可以向任何 DOM 对象添加事件监听，不仅仅是 HTML 元素。如： window 对象。
6. addEventListener() 方法可以更简单的控制事件（冒泡与捕获）。
7. 当你使用 addEventListener() 方法时, JavaScript 从 HTML 标记中分离开来，可读性更强， 在没有控制HTML标记时也可以添加事件监听。
8. 你可以使用 removeEventListener() 方法来移除事件的监听。

```js
 element.addEventListener(event, function, useCapture);
```

第一个参数是事件的类型 (如 "click" 或 "mousedown")

第二个参数是事件触发后调用的函数

第三个参数是个布尔值用于描述事件是冒泡还是捕获。该参数是可选的

注意:不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"





## 创建 JavaScript 对象

通过 JavaScript，您能够定义并创建自己的对象。

创建新对象有两种不同的方法：

- 定义并创建对象的实例
- 使用函数来定义对象，然后创建新的对象实例





## 其他

javascript:void(0);代表什么都不执行，其实就是不返回任何值，但是 void 中的内容还是会执行的，比如 javascript:void(alert('点击')); 就会弹出提示 





## HTML 语义化

| 标签            | 描述                                       |
| --------------- | ------------------------------------------ |
| `<header>`      | 定义页面的页眉，通常包含网站的标题和导航栏 |
| `<nav>`         | 定义页面的导航链接                         |
| `<main>`        | 定义页面的主要内容区域                     |
| `<article>`     | 定义一篇独立的文章或内容块                 |
| `<section>`     | 定义文档中的一个章节                       |
| `<aside>`       | 定义页面的侧边栏内容                       |
| `<footer>`      | 定义页面的页脚，通常包含版权信息和联系方式 |
| `<h1>` - `<h6>` | 定义标题，从大到小表示标题的级别           |
| `<p>`           | 定义一个段落                               |
| `<ul>`          | 定义一个无序列表                           |
| `<ol>`          | 定义一个有序列表                           |
| `<li>`          | 定义列表中的一项                           |
| `<img>`         | 定义一个图像                               |
| `<a>`           | 定义一个链接                               |
| `<strong>`      | 定义加粗文本                               |
| `<em>`          | 定义强调文本                               |
| `<blockquote>`  | 定义一个长的引用                           |
| `<cite>`        | 定义一段引文                               |
| `<code>`        | 定义计算机代码                             |
| `<pre>`         | 定义预格式文本                             |

