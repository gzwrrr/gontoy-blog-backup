---
title: "Vue3 基础知识"
shortTitle: "Vue3 基础知识"
description: "Vue3 基础知识"
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
  text: "Vue3 基础知识"
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
  title: "Vue3 基础知识"
  description: "Vue3 基础知识"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Vue3 基础知识

[[toc]]

Vue 实例是用来在应用中注册“全局”组件的

```js
const app = Vue.createApp({})
app.component('SearchInput', SearchInputComponent)
app.directive('focus', FocusDirective)
app.use(LocalePlugin)
```

或者：

```js
Vue.createApp({})
  .component('SearchInput', SearchInputComponent)
  .directive('focus', FocusDirective)
  .use(LocalePlugin)
```



## Vue Data

:::info 说明

组件的 `data` 选项是一个函数。Vue 在创建新组件实例的过程中调用此函数。它应该返回一个对象，然后 Vue 会通过响应性系统将其包裹起来，并以 `$data` 的形式存储在组件实例中

Vue 使用 `$` 前缀通过组件实例暴露自己的内置 API。它还为内部 property 保留 `_` 前缀。你应该避免使用这两个字符开头的的顶级 `data` property 名称

:::

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})
const vm = app.mount('#app')
console.log(vm.$data.count) // => 4
console.log(vm.count)       // => 4
// 修改 vm.count 的值也会更新 $data.count
vm.count = 5
console.log(vm.$data.count) // => 5
// 反之亦然
vm.$data.count = 6
console.log(vm.count) // => 6
```





## Vue Method

:::info 说明

Vue 自动为 `methods` 绑定 `this`，以便于它始终指向组件实例。这将确保方法在用作事件监听或回调时保持正确的 `this` 指向。在定义 `methods` 时应避免使用箭头函数，因为这会阻止 Vue 绑定恰当的 `this` 指向

:::

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
  methods: {
    increment() {
      // `this` 指向该组件实例
      this.count++
    }
  }
})
const vm = app.mount('#app')
console.log(vm.count) // => 4
vm.increment()
console.log(vm.count) // => 5
```





## 计算属性

```vue
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // 计算属性的 getter
    publishedBooksMessage() {
      // `this` points to the vm instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}).mount('#computed-basics')
```

:::warning 警告

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的反应依赖关系缓存的**。计算属性只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `author.books` 还没有发生改变，多次访问 `publishedBookMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 Date.now () 不是响应式依赖：

:::

```js
computed: {
  now() {
    return Date.now()
  }
}
```

计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：

```js
computed: {
  fullName: {
    // getter
    get() {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set(newValue) {
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```







## 监听器

:::info

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的

:::

```js
data() {
    return {
        question: '',
        answer: 'Questions usually contain a question mark. ;-)'
    }
},
watch: {
   // whenever question changes, this function will run
   question(newQuestion, oldQuestion) {
       if (newQuestion.indexOf('?') > -1) {
           this.getAnswer()
       }
   }
}
```







## Class与Style绑定

**绑定 Class：**

```vue
<!-- 直接写入对象 -->
<div :class="{ active: isActive }"></div>

<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>

<!-- 抽离对象 -->
<div :class="classObject"></div>
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
<div class="static active"></div>

<!-- 或者使用计算属性 -->
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}

<!-- 数组写法 -->
<div :class="[activeClass, errorClass]"></div>
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
<div class="active text-danger"></div>

<!-- 三元表达式 -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>

<!-- 数组 + 对象 -->
<div :class="[{ active: isActive }, errorClass]"></div>
```

**绑定 Style：**

```vue
<!-- 直接写入对象 -->
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<!-- 绑定对象 -->
<div :style="styleObject"></div>
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}

<!-- 使用数组 -->
<div :style="[baseStyles, overridingStyles]"></div>
```





## 条件渲染

:::warning 警告

不推荐同时使用 `v-if` 和 `v-for`。请查阅[风格指南](https://www.w3cschool.cn/vuejs3/vuejs3-z5mf3f4f.html)以获取更多信息。

当 `v-if` 与 `v-for` 一起使用时，`v-if` 具有比 `v-for` 更高的优先级。请查阅[列表渲染指南](https://www.w3cschool.cn/vuejs3/vuejs3-5vla3f23.html)以获取详细信息。

:::

```vue
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh</h1>

<!-- 包裹多个元素使用 template -->
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

<!-- 多条件 -->
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>

<!-- 单条件 -->
<h1 v-show="ok">Hello!</h1>
```

:::warning 警告

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

:::





## 列表渲染

:::warning 警告

`v-if` 的优先级比 `v-for` 更高，这意味着 `v-if` 将没有权限访问 `v-for` 里的变量

:::

```vue
<ul id="array-with-index">
  <li v-for="(item, index) in items" :key="item.id" >
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```vue
<!-- 是在需要 if 和 for 一起用时应该这样 -->
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo }}
  </li>
</template>
```





## 事件处理

我们可以使用 `v-on` 指令 (通常缩写为 `@` 符号) 来监听 DOM 事件，并在触发事件时执行一些 JavaScript。用法为 `v-on:click="methodName"` 或使用快捷方式 `@click="methodName"`

```vue
<div id="basic-event">
  <button @click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

事件处理程序中可以有多个方法，这些方法由逗号运算符分隔：

```vue
<!-- 这两个 one() 和 two() 将执行按钮点击事件 -->
<button @click="one($event), two($event)">
  Submit
</button>
```

<br/>



在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```vue
<!-- 阻止单击事件继续传播 -->
<a @click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form @submit.prevent></form>
<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div @click.capture="doThis">...</div>
<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div @click.self="doThat">...</div>

<!-- 点击事件将只会触发一次 -->
<a @click.once="doThis"></a>
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发   -->
<!-- 而不会等待 `onScroll` 完成                   -->
<!-- 这其中包含 `event.preventDefault()` 的情况   -->
<div @scroll.passive="onScroll">...</div>
```

<br/>

:::info 提示

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击

:::

```vue
<!-- 点击事件将只会触发一次 -->
<a @click.once="doThis"></a>
```

<br/>

**按键：**

Vue 为最常用的键提供了别名：

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器：

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

鼠标按钮修饰符：

- `.left`
- `.right`
- `.middle`

```vue
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input @keyup.enter="submit" />

<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件:

```vue
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```







## 表单

对于单选按钮，复选框及选择框的选项，`v-model` 绑定的值通常是静态字符串 (对于复选框也可以是布尔值)：

```vue
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a" />
<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle" />
<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

但是有时我们可能想把值绑定到当前活动实例的一个动态 property 上，这时可以用 `v-bind` 实现，此外，使用 `v-bind` 可以将输入值绑定到非字符串

<br/>

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了上述输入法组织文字时)。你可以添加 `lazy` 修饰符，从而转为在 `change` 事件_之后_进行同步：

```vue
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" />
```

<br/>

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：

```vue
<input v-model.number="age" type="number" />
```

<br/>

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

```vue
<input v-model.trim="msg" />
```





## 组件

定义一个全局组件

```js
// 创建一个Vue 应用
const app = Vue.createApp({})
// 定义一个名为 button-counter 的新全局组件
app.component('button-counter', {
  props: ['title'],
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
})
```

使用事件抛出一个值：

```vue
<button @click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>

<!-- 父组件通过 $event 访问到被抛出的这个值 -->
<blog-post ... @enlarge-text="postFontSize += $event"></blog-post>
```

<br/>

自定义事件也可以用于创建支持 `v-model` 的自定义输入组件。记住：

```vue
<input v-model="searchText" />
```

等价于：

```vue
<input :value="searchText" @input="searchText = $event.target.value" />
```

当用在组件上时，`v-model` 则会这样：

```vue
<custom-input  :model-value="searchText"  @update:model-value="searchText = $event"></custom-input>
```

```js
app.component('custom-input', {
  props: ['modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `
})
```

<br/>

**插槽：**

```js
app.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

<br/>

**动态组件：**

`currentTabComponent` 可以包括：

- 已注册组件的名字，或
- 一个组件的选项对象

```vue
<!-- 组件会在 currentTabComponent 改变时改变 -->
<component :is="currentTabComponent"></component>
```

<br/>

:::warning 警告

有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部

:::

```vue
<!-- 不会正确渲染 -->
<table>
  <blog-post-row></blog-post-row>
</table>

<!-- 需要这样写，注意 v-is 值应为 JavaScript 字符串文本，即 'blog-post-row' 这里的单引号不能去掉 -->
<table>
  <tr v-is="'blog-post-row'"></tr>
</table>
```

