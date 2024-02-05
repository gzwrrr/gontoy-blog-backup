---
title: "Java Optional"
shortTitle: "Java Optional"
description: "Java Optional"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-09-04
category: 
- "java"
tag:
- "java"
sticky: 2
star: false
article: true
timeline: true
dir:
  text: "Java Optional"
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
  title: "Java Optional"
  description: "Java Optional"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java Optional

[[toc]]





## 概览

:::info 相关资源

- [Java 8 - Optional类深度解析](https://www.pdai.tech/md/java/java8/java8-optional.html)
- [还在使用If语句判空？快来试试Optional | 语法糖 | JDK8 新特性 | lambda 表达式 | 链式编程 | 高级玩法](https://www.bilibili.com/video/BV1H3411Q7q6/?spm_id_from=333.788)

:::

| 方法                                                   | 描述                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| `empty()`                                              | 创建一个空的 Optional 对象。                                 |
| `of(value)`                                            | 创建一个包含指定值的 Optional 对象，如果指定值为 null，则抛出 `NullPointerException` 异常。 |
| `ofNullable(value)`                                    | 创建一个包含指定值的 Optional 对象，如果指定值为 null，则创建一个空的 Optional 对象。 |
| `isPresent()`                                          | 如果存在值，则返回 `true`；否则返回 `false`。                |
| `ifPresent(Consumer<T> c)`                             | 如果存在值，则使用该值调用指定的 Consumer；否则什么也不做。  |
| `get()`                                                | 如果存在值，返回该值；否则抛出 `NoSuchElementException` 异常。 |
| `orElse(T other)`                                      | 如果存在值，返回该值；否则返回指定的默认值。                 |
| `orElseGet(Supplier<? extends T> other)`               | 如果存在值，返回该值；否则使用指定的 Supplier 生成一个值。   |
| `orElseThrow(Supplier<? extends X> exceptionSupplier)` | 如果存在值，返回该值；否则使用指定的 Supplier 生成一个异常并抛出。 |
| `filter(Predicate<? super T> predicate)`               | 如果存在值并且满足指定条件，则返回包含该值的 Optional；否则返回一个空的 Optional。 |
| `map(Function<? super T, ? extends U> mapper)`         | 如果存在值，则对其进行映射并返回一个包含映射结果的 Optional；否则返回一个空的 Optional。 |
| `flatMap(Function<? super T, Optional<U>> mapper)`     | 如果存在值，则对其进行映射并返回由映射结果包装的 Optional；否则返回一个空的 Optional。 |
| `equals(Object obj)`                                   | 判断与其他对象是否相等。                                     |
| `hashCode()`                                           | 返回 Optional 对象的哈希码。                                 |
| `toString()`                                           | 返回包含当前值的字符串表示形式，或字符串 "Optional.empty"（如果没有值）。 |