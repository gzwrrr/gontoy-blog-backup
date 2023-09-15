---
title: "暴力递归算法"
shortTitle: "B-暴力递归算法"
description: "暴力递归算法"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "算法"
tag:
- "算法"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "暴力递归算法"
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
  title: "暴力递归算法"
  description: "暴力递归算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 暴力递归算法

[[toc]]



:::info 说明

- 暴力递归就是不断分解问题，不断寻找子问题，直到到达不能分解的问题（base case）

- 暴力递归是动态规划的基础

:::



## 汉诺塔问题

```java
public static void hanoi(int n) {
    process(n, "左", "中", "右");
}

// 因为每个过程都是一样，都可以抽象成 from 到 to 的问题，所以只需考虑一个大的标准，只要每个过程都满足了，整个过程就是对的
public static void process(int n, String form, String end, String other) {
    if (n == 1) {
        // 这里就是 base case
        System.out.println("Move 1 from" + from + "to" + end);
    } else {
        process(n-1, from, other, end);
        System.out.println("Move" + n + "from" + from + "to" + end);
        process(n-1, other, end, from);
    }
}
```



<br/>

## 字符串全部子序列

```java
// i 表示当前来到的位置，str 中存着是否打印的信息
// 每到一个字母都会有两条路，取或不取
public static void process(char[] str, int i) {
    if (i == str.length) {
        System.out.println(String.valueOf(str));
        return;
    }
    // 下面的方法是充分利用了 str 的储存空间，没有增加额外的空间
    // 取当前的字符
    process(str, i + 1);
    char tmp = str[i];
    str[i] = 0;
    // 不取当前字符
    process(str, i + 1)；
    str[i] = tmp;
}
```









