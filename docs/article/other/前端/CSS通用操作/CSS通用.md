# 组件

## vue

| 序号 |    名称    |          说明          |
| :--: | :--------: | :--------------------: |
|  1   | vue-tinder | 移动端卡片滑动隐藏组件 |





# Bug

### 基线对齐错位

```css
/* 变换基线对齐方式就可以解决错位问题 */
vertical-align: top;
```





# 样式/动画

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

