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
timeline: true
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

[[toc]]


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





## Window 对象

所有浏览器都支持 window 对象。它表示浏览器窗口

所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员

1. 全局变量是 window 对象的属性（甚至 HTML DOM 的 document 也是 window 对象的属性之一）

2. 全局函数是 window 对象的方法

### Window 子对象

Window的子对象主要有如下几个：

1. JavaScript document 对象
2. JavaScript frames 对象
3. JavaScript history 对象
4. JavaScript location 对象
5. JavaScript navigator 对象
6. JavaScript screen 对象

### Window 尺寸

有三种方法能够确定浏览器窗口的尺寸（浏览器的窗口，不包括工具栏和滚动条）。

对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：

- window.innerHeight - 浏览器窗口的内部高度
- window.innerWidth - 浏览器窗口的内部宽度

对于 Internet Explorer 8、7、6、5：

- document.documentElement.clientHeight
- document.documentElement.clientWidth

或者

- document.body.clientHeight
- document.body.clientWidth

实用的 JavaScript 方案（涵盖所有浏览器）：

```js
var w=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
```



### Window Screen

**window.screen**对象在编写时可以不使用 window 这个前缀。

一些属性：

- screen.availWidth - 可用的屏幕宽度
- screen.availHeight - 可用的屏幕高度



### Window Location

**window.location** 对象在编写时可不使用 window 这个前缀。 一些例子：

一些实例:

- [location.hostname](https://www.w3cschool.cn/jsref/prop-loc-hostname.html) 返回 web 主机的域名
- [location.pathname](https://www.w3cschool.cn/jsref/prop-loc-pathname.html) 返回当前页面的路径和文件名
- [location.port](https://www.w3cschool.cn/jsref/prop-loc-port.html) 返回 web 主机的端口 （80 或 443）
- [location.protocol](https://www.w3cschool.cn/jsref/prop-loc-protocol.html) 返回所使用的 web 协议（http:// 或 https://）



### Window Location Href

location.href 属性返回当前页面的 URL





### Window History

**window.history**对象在编写时可不使用 window 这个前缀。

为了保护用户隐私，对 JavaScript 访问该对象的方法做出了限制。

一些方法：

- [history.back()](https://www.w3cschool.cn/jsref/met-his-back.html) - 与在浏览器点击后退按钮相同
- [history.forward()](https://www.w3cschool.cn/jsref/met-his-forward.html) - 与在浏览器中点击向前按钮向前相同



### Window Navigator

```js
txt = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
txt+= "<p>Browser Name: " + navigator.appName + "</p>";
txt+= "<p>Browser Version: " + navigator.appVersion + "</p>";
txt+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
txt+= "<p>Platform: " + navigator.platform + "</p>";
txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";
txt+= "<p>User-agent language: " + navigator.systemLanguage + "</p>";
document.getElementById("example").innerHTML=txt;
```

来自 navigator 对象的信息具有误导性，不应该被用于检测浏览器版本，这是因为：

- navigator 数据可被浏览器使用者更改
- 一些浏览器对测试站点会识别错误
- 浏览器无法报告晚于浏览器发布的新操作系统

由于 navigator 可误导浏览器检测，使用对象检测可用来嗅探不同的浏览器

由于不同的浏览器支持不同的对象，您可以使用对象来检测浏览器。例如，由于只有 Opera 支持属性 "window.opera"，您可以据此识别出 Opera。

例子：if (window.opera) {...some action...}









## JavaScript 计时事件

通过使用 JavaScript，我们有能力做到在一个设定的时间间隔之后来执行代码，而不是在函数被调用后立即执行。我们称之为计时事件。

在 JavaScritp 中使用计时事件是很容易的，两个关键方法是:

- [setInterval() ](https://www.w3cschool.cn/jsref/met-win-setinterval.html)- 间隔指定的毫秒数不停地执行指定的代码。
- [setTimeout() ](https://www.w3cschool.cn/jsref/met-win-settimeout.html)- 暂停指定的毫秒数后执行指定的代码

**Note:** setInterval() 和 setTimeout() 是 HTML DOM Window对象的两个方法

clearInterval() 方法用于停止 setInterval() 方法执行的函数代码

```js
window.clearInterval(intervalVariable)
```

clearTimeout() 方法用于停止执行setTimeout()方法的函数代码

```js
window.clearTimeout(timeoutVariable)
```





## JavaScript Cookies

Cookies 是一些数据, 存储于你电脑上的文本文件中

当 web 服务器向浏览器发送 web 页面时，在连接关闭后，服务端不会记录用户的信息

Cookies 的作用就是用于解决 "如何记录客户端的用户信息":

- 当用户访问 web 页面时，他的名字可以记录在 cookie 中
- 在用户下一次访问该页面时，可以在 cookie 中读取用户访问记录

JavaScript 可以使用 **document.cookie** 属性来创建 、读取、及删除 cookies

```js
document.cookie="username=John Doe";
```



## 其他

javascript:void(0);代表什么都不执行，其实就是不返回任何值，但是 void 中的内容还是会执行的，比如 javascript:void(alert('点击')); 就会弹出提示 





### HTML 语义化

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

