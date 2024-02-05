---
title: "回溯算法"
shortTitle: "C-回溯算法"
description: "回溯算法"
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
  text: "回溯算法"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 3
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "回溯算法"
  description: "回溯算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 回溯算法

[[toc]]



:::info 相关文章

[一文秒杀排列组合问题的 9 种题型](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247496080&idx=1&sn=a2ae8c8ebf13c7ea704ffb6b16018f08&scene=21#wechat_redirect)

:::





> 其实回溯也算是暴力递归，只不过有优化手段，比如剪枝



## 组合/排列/子集

> 组合/排列/子集问题基本上都可以使用回溯剪枝来解决，本质上就是对决策树进行不同程度的剪枝

**要点：**

1. 子集问题和组合问题本质上是一样的，关键在于 base case 不太一样
2. 组合和排列只是在剪枝时不太一样，组合涉及的回溯不走回头路，而排列涉及的回溯要走回头路，因此还需要额外的数据结构存储是否访问过之类的

**表现形式：**

1. 元素无重复，不可重复选
2. 元素重复，不可重复选。先排序再进行剪枝
3. 元素无重复，可以重复选

**组合和排列的回溯框架：**

```java
/* 组合/子集问题回溯算法框架 */
void backtrack(int[] nums, int start) {
    // 回溯算法标准框架
    for (int i = start; i < nums.length; i++) {
        // 做选择
        track.addLast(nums[i]);
        // 注意参数
        backtrack(nums, i + 1);
        // 撤销选择
        track.removeLast();
    }
}

/* 排列问题回溯算法框架 */
void backtrack(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        // 剪枝逻辑
        if (used[i]) {
            continue;
        }
        // 做选择
        used[i] = true;
        track.addLast(nums[i]);

        backtrack(nums);
        // 取消选择
        track.removeLast();
        used[i] = false;
    }
}
```



