---
title: "树相关算法"
shortTitle: "F-树相关算法"
description: "树相关算法"
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
  text: "树相关算法"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 6
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "树相关算法"
  description: "树相关算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 树相关算法

[[toc]]



## 树状数组

```java
public class BitArray {
    /**
     * 树状数组
     */
    int[] array;

    public BitArray(int length) {
        int len = length + 1;
        this.array = new int[len];
    }

    /**
     * 初始化
     */
    public void init(int[] nums) {
        int len = nums.length + 1;
        this.array = new int[len];
        for (int i = 1; i < len; i++) {
            update(i, nums[i - 1]);
        }
    }

    /**
     * 获取 index 最低位 1
     * @param index 索引
     * @return index 最低位 1
     */
    public int lowbit(int index) {
        return (index) & (-index);
    }

    /**
     * 单点修改
     * @param index 目标左营
     * @param num 操作数
     */
    public void update(int index, int num) {
        for (int pos = index; pos < array.length; pos += lowbit(pos)) {
            array[pos] += num;
        }
    }

    /**
     * 前 N 项和
     * @param index 右边界
     * @return 前 N 项和
     */
    public int query(int index) {
        int res = 0;
        for (int pos = index; pos > 0; pos -= lowbit(pos)) {
            res += array[pos];
        }
        return res;
    }

    /**
     * 区间查询
     * @param l 左边界
     * @param r 右边界
     * @return 区间和
     */
    public int query(int l, int r) {
        return query(r) - query(l - 1);
    }

}
```





## 线段树

:::info 相关资源

文章：https://zhuanlan.zhihu.com/p/106118909

视频：https://www.bilibili.com/video/BV1yF411p7Bt/?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0

:::

:::info 说明

线段树是平衡二叉树

使用小区间更新大区间，问题需要满足：区间加法

对于区间 [L, R]，答案可以通过 [L, M] + [M+1, R] 求出

可以求解的问题：

1. 区间求和
2. 区间最大/小值

不可以求解的问题：

1. 区间的众数
2. 区间最长连续问题
3. 最长不下降问题

数据结构：

一般是用数组，以堆的方式存储数据，注意线段树的数组要开到 4 * N 大小才不会出现越界访问

:::



线段树涉及的操作：

1. 单点修改：
   1. 深搜，如果当前节点的左儿子的区间 [L, R] 包含了 i，那么就访问左儿子，否则访问右儿子
   2. 当搜索到需要修改的数据后（L = R），修改数据，之后将包含该数据的大区间的值更新
2. 区间求和：
   1. 如果需要查询的区间完全覆盖当前区间，直接返回当前区间的值
   2. 如果查询区间与左儿子有交集，搜索左儿子，否则右儿子
   3. 最后合并处理两边搜索结果
3. 区间修改，lazy 标记（表示区间的值已经更新，但是子区间还没有更新，更新的信息存储在标记中）：
   1. 如果需要修改的区间完全覆盖当前的区间，那么直接更新这个区间，打上 lazy 标记
   2. 如果没有完全覆盖，并且当前区间有 lazy 标记，那么先下传 lazy 标记到子区间，再清除当前区间的 lazy 标记
   3. 如果修改区间和左儿子有交集，搜索左儿子，否则搜索右儿子
   4. 最后将当前区间的值更新
4. 区间查询：
   1. 如果需要查询的区间完全覆盖当前区间，直接返回当前区间的值，如果没有完全覆盖，下传 lazy 标记
   2. 如果查询区间与左儿子有交集，搜索左儿子，否则右儿子
   3. 最后合并处理两边搜索结果

```java
public class SegmentTree {
    /**
     * 原数组长度
     */
    int len;

    /**
     * 原数组
     */
    int[] nums;

    /**
     * 线段树
     */
    int[] array;

    /**
     * 懒标记
     */
    int[] mark;

    public SegmentTree(int length) {
        this.len = length;
        this.array = new int[len << 2];
        this.mark = new int[len << 2];
    }

    /**
     * 初始化
     */
    public void init(int[] nums) {
        this.len = nums.length;
        this.nums = nums;
        this.array = new int[len << 2];
        this.mark = new int[len << 2];
        // 初始化
        build();
    }

    /**
     * 打印
     */
    public void print() {
        System.out.println(Arrays.toString(array));
    }

    /**
     * 向下更新懒标
     * @param index 当前索引
     * @param len 目标区间长度
     */
    public void pushDown(int index, int len) {
        // 更新子区间的标记
        mark[index << 1] = mark[index];
        mark[index << 1 | 1] = mark[index];
        // 更新区间的值
        array[index << 1] += mark[index] * (len - (len >> 1));
        array[index << 1 | 1] += mark[index] * (len >> 1);
        // 更新完当前的区间就把懒标记清除
        mark[index] = 0;
    }

    /**
     * 默认构建
     */
    public void build() {
        /**
         * index: 当前索引(1)
         * 目标左边界(1)
         * 目标右边界(len)
         */
        build(1, 1, len);
    }

    /**
     * 构建
     * @param index 当前索引
     * @param l 目标左边界
     * @param r 目标有边界
     */
    public void build(int index, int l, int r) {
        if (l == r) {
            array[index] = nums[l - 1];
            return;
        }
        int mid = l + ((r - l) >> 1);
        build(index << 1, l, mid);
        build(index << 1 | 1, mid + 1, r);
        array[index] = array[index << 1] + array[index << 1 | 1];
    }


    /**
     * 区间更新
     * @param l 目标左边界
     * @param r 目标右边界
     * @param num 操作数
     */
    public void update(int l, int r, int num) {
        /**
         * cl: 当前左边界(1)
         * cr: 当前右边界(len)
         * index: 当前索引(1)
         */
        update(l, r, 1, len, 1, num);
    }

    /**
     * 更新区间值
     * @param l 目标左边界
     * @param r 目标右边界
     * @param cl 当前左边界
     * @param cr 当前右边界
     * @param index 当前索引
     * @param num 操作数
     */
    public void update(int l, int r, int cl, int cr, int index, int num) {
        if (cl > r || cr < l) {
            return;
        }
        if (cl >= l && cr <= r) {
            array[index] += (cr - cl + 1) * num;
            // 非叶子节点更新
            if (cr > cl) {
                mark[index] += num;
            }
            return;
        }
        int mid = cl + ((cr - cl) >> 1);
        pushDown(index, cr - cl + 1);
        update(l, r, cl, mid, index << 1, num);
        update(l, r, mid + 1, cr, index << 1 | 1, num);
        array[index] = array[index << 1] + array[index << 1 | 1];
    }

    /**
     * 单点查询
     * @param index 目标
     * @return 区间查询结果
     */
    public int query(int index) {
        /**
         * cl: 当前左边界(1)
         * cr: 当前右边界(len)
         * index: 当前索引(1)
         */
        return query(index, index, 1, len, 1);
    }

    /**
     * 区间查询
     * @param l 目标左边界
     * @param r 目标右边界
     * @return 区间查询结果
     */
    public int query(int l, int r) {
        /**
         * cl: 当前左边界(1)
         * cr: 当前右边界(len)
         * index: 当前索引(1)
         */
        return query(l, r, 1, len, 1);
    }

    /**
     * 查询
     * @param l 目标左边界
     * @param r 目标有边界
     * @param cl 当前左边界
     * @param cr 当前右边界
     * @param index 当前索引
     * @return 区间查询结果
     */
    public int query(int l, int r, int cl, int cr, int index) {
        if (cl >= l && cr <= r) {
            return array[index];
        }
        int mid = cl + ((cr - cl) >> 1);
        int res = 0;
        // 更新懒标记
        pushDown(index, cr - cl + 1);
        if (mid >= l) {
            res += query(l, r, cl, mid, index << 1);
        }
        if (mid < r) {
            res += query(l, r, mid + 1, cr, index << 1 | 1);
        }
        return res;
    }
}
```

