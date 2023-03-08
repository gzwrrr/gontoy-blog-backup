---
title: "JS 模块化"
shortTitle: "JS 模块化"
description: "JS 模块化"
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
  text: "JS 模块化"
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
  title: "JS 模块化"
  description: "JS 模块化"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# JS 模块化

[[toc]]

## CommonJS 和 ES6

CommonJS和ES6都是JavaScript的模块规范，用于管理JavaScript代码的组织和导入/导出
CommonJS是一种用于服务器端JavaScript的模块规范，它最初由Node.js采用并使用。它通过定义 module.exports 和 require 函数来导出和导入模块。在CommonJS中，每个文件都是一个模块，文件中定义的变量和函数只能在该模块中使用

```js
// 导出模块
module.exports = {
  foo: function () {
    console.log('foo');
  },
  bar: function () {
    console.log('bar');
  }
}

// 导入模块
const module = require('./module');
module.foo();
module.bar();
```

ES6是JavaScript的下一代标准，它也有自己的模块规范。ES6模块使用 `export` 和 `import` 语句来导出和导入模块。ES6模块支持静态分析和静态编译，可以进行编译时优化

```js
// 导出模块
export function foo() {
  console.log('foo');
}
export function bar() {
  console.log('bar');
}

// 导入模块
import {foo, bar} from './module';
foo();
bar();
```

相比之下，ES6模块具有以下优势：

- 支持静态分析和静态编译，可以进行编译时优化
- 支持异步加载模块
- 可以在运行时动态生成模块名称
- ES6模块默认使用严格模式，不支持CommonJS的一些特性，例如 `module.exports` 和 `require` 函数

总的来说，ES6模块相比于CommonJS模块更加现代化和高效，但是由于历史原因和兼容性问题，目前在一些环境中仍然使用CommonJS模块





### CommonJS

在 CommonJS 中，通过 `require` 导入模块，通过 `module.exports` 或 `exports` 导出模块

**导入模块：**

```js
// 导入整个模块
const module1 = require('./module1');

// 导入部分内容
const { func1, var1 } = require('./module1');

// 导入默认内容
const module2 = require('./module2').default;
```

**导出模块：**

```js
// 导出一个函数
module.exports = function() {};

// 导出一个对象
module.exports = { func1, var1 };

// 导出默认内容
module.exports.default = function() {};
```





### ES6

在 ES6 中，通过 `import` 导入模块，通过 `export` 导出模块

**导入模块：**

```js
// 导入整个模块
import module1 from './module1';

// 导入部分内容
import { func1, var1 } from './module1';

// 导入默认内容
import module2 from './module2';
```

**导出模块：**

```js
// 导出一个函数
export function func1() {}

// 导出一个对象
export const var1 = {};

// 导出默认内容
export default function() {}
```

