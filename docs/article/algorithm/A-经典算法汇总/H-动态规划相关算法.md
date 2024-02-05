---
title: "动态规划相关算法"
shortTitle: "H-动态规划相关算法"
description: "动态规划相关算法"
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
timeline: true
dir:
  text: "动态规划相关算法"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 8
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "动态规划相关算法"
  description: "动态规划相关算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 动态规划相关算法

[[toc]]



## 背包问题

:::info 相关文章

[听说背包问题很难？ 这篇总结篇来拯救你了](https://www.programmercarl.com/%E8%83%8C%E5%8C%85%E6%80%BB%E7%BB%93%E7%AF%87.html)

:::

分类：

1. 0-1 背包
2. 完全背包
3. 多重背包
4. 分组背包
5. 混合背包

> N个物品，背包最大重量为 W，v[1…N] 分别代表每个物品的价值，w[1….M] 代表每个物品的重量

背包问题的关键在于搞懂 dp 数组的含义：`dp[i][j]` 表示前 i 个物品在 j 的容量下的最大价值。

选择分为：放入当前物品和不放入，对应的状态转移方程为：

1. 装不下时：`dp[i][j] = dp[i][j - 1]`
2. 装得下时：`dp[i][j] = max(v[i - 1] + dp[i - 1][j - w[i - 1]], dp[i][j - 1])`



### 股票问题

:::info 相关文章

[团灭股票问题](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484508&idx=1&sn=42cae6e7c5ccab1f156a83ea65b00b78&chksm=9bd7fa54aca07342d12ae149dac3dfa76dc42bcdd55df2c71e78f92dedbbcbdb36dec56ac13b&scene=21#wechat_redirect)

:::

> 画出状态转换图后穷举，需要特别注意，一次交易是指买完再卖，只需要在买的时候或者卖的时候将最大将以次数减一即可

三种选择：

1. 买入
2. 卖出
3. 无操作

状态（画出状态转换图）：

![股票问题状态转换](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E7%AE%97%E6%B3%95/20230319/%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2.png)

状态转换方程：

![图片](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E7%AE%97%E6%B3%95/20230319/%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2%E6%96%B9%E7%A8%8B.jpeg)

Base case：

![图片](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E7%AE%97%E6%B3%95/20230319/%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98base%20case.jpeg)

综合：

![图片](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E7%AE%97%E6%B3%95/20230319/%E8%82%A1%E7%A5%A8%E9%97%AE%E9%A2%98%E7%8A%B6%E6%80%81%E6%B1%87%E6%80%BB.png)

