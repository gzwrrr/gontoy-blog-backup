---
title: "Java Stream"
shortTitle: "Java Stream"
description: "Java Stream"
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
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Java Stream"
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
  title: "Java Stream"
  description: "Java Stream"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java Stream

[[toc]]





## 概览

| 方法                                                | 描述                                                   |
| --------------------------------------------------- | ------------------------------------------------------ |
| `filter(Predicate<T> predicate)`                    | 过滤满足条件的元素。                                   |
| `map(Function<T, R> mapper)`                        | 对每个元素执行映射操作。                               |
| `flatMap(Function<T, Stream<R>> mapper)`            | 将每个元素映射为一个 `Stream`，然后连接这些 `Stream`。 |
| `distinct()`                                        | 去除重复的元素。                                       |
| `sorted()`                                          | 对元素进行自然排序。                                   |
| `sorted(Comparator<T> comparator)`                  | 使用自定义比较器对元素进行排序。                       |
| `peek(Consumer<T> action)`                          | 对每个元素执行操作，但保持流的状态不变。               |
| `limit(long maxSize)`                               | 截取流的前 N 个元素。                                  |
| `skip(long n)`                                      | 跳过流的前 N 个元素。                                  |
| `forEach(Consumer<T> action)`                       | 对每个元素执行指定的操作。                             |
| `collect(Collector<T, A, R> collector)`             | 将流元素转换成集合、映射等。                           |
| `reduce(T identity, BinaryOperator<T> accumulator)` | 对元素进行归约操作，得到一个结果。                     |
| `anyMatch(Predicate<T> predicate)`                  | 判断流中是否有任意一个元素满足指定条件。               |
| `allMatch(Predicate<T> predicate)`                  | 判断流中的所有元素是否都满足指定条件。                 |
| `noneMatch(Predicate<T> predicate)`                 | 判断流中是否没有元素满足指定条件。                     |
| `findFirst()`                                       | 返回流中的第一个元素。                                 |
| `findAny()`                                         | 返回流中的任意一个元素。                               |
| `count()`                                           | 返回流中的元素数量。                                   |
| `min(Comparator<T> comparator)`                     | 返回流中的最小元素。                                   |
| `max(Comparator<T> comparator)`                     | 返回流中的最大元素。                                   |
| `toArray()`                                         | 将流元素转换为数组。                                   |