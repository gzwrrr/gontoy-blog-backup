---
title: "TOPSIS 法"
shortTitle: "TOPSIS 法"
description: "TOPSIS 法"
icon: ""
author: 
  name: gzw
  url: https://www.gzw-icu.com
  email: 1627121193@qq.com
isOriginal: false
date: 2022-11-20
category: 
- "数学建模"
tag:
- "数学建模"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "TOPSIS 法"
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
  title: "TOPSIS 法"
  description: "TOPSIS 法"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# TOPSIS 法

逼近理想解排序法/优劣解距离法

指标：

- 越大越好，极大型指标（效益型指标）
- 越小越好，极小型指标（成本型指标）
- 中间型指标，越接近某个值越好
- 区间型指标，落在某个区间最好

将所有的指标转换为极大型为：指标正向化（最常用）

极小型指标转换成极大型指标的公式：max - x

正向化后的指标一般都要进行「标准化处理」，以此消除量纲，这样不同指标之间才能求和

所谓的将原式矩阵正向化，即使将所有的指标类型统一转换为极大型指标

基本流程：

矩阵正向化 -> 标准化 -> 计算得分并归一化

改进：

基于「熵权法」对该模型的修正是一种较为客观的赋权方法

熵权法依据：

指标的的变异程度越小，所反映的信息量越小，其对应的权值就越小（数据本身就可以告诉我们权重）