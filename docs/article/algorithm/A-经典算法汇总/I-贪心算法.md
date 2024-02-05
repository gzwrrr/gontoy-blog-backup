---
title: "贪心算法"
shortTitle: "I-贪心算法"
description: "贪心算法"
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
  text: "贪心算法"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 9
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "贪心算法"
  description: "贪心算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 贪心算法

[[toc]]



:::info 说明

在某一个标准下，优先考虑最满足标准的样本，最后考虑最不满足标准的样本，最终得到一个答案

也就是不从整体上寻找最优解，而是做出某种意义上的局部最优解

有时可由局部最优得到整体最优

**注意：**贪心策略都是需要证明的，但是一般数学证明会非常难，所以在时间不允许的情况下使用对数器暴力验证是否正确

**最常用的做法：**堆和排序

:::





## N 皇后问题

1. 在 N * N 的棋盘上要摆 N 个皇后，要求任意两个皇后不同行、不同列、不在任何一条斜线上

2. 给定一个 N，返回 N 皇后的摆法一共有多少种

```java
public static int NQueen(int N) {
    // N 代表棋盘是 N * N 的
    if (N < 1) {
        return 0;
    }
    // 创建一个一维数组，数组下标就是行，value 就是第几列，这样就避免了创建二维数组浪费空间
    int[] record = new int[N];
    // i 代表第 i 行，record 是棋盘，N 表示有几行
    return process(int i, record, N);
}

// 这是一个递归方法，有点抽象，可以画图理解
public static int process(int i, int[] recrord, int N) {
    // 这个是终止的条件，即一旦越界即完成了一次摆放，即当前的这种方法可行，返回发现了 1 种解决方案，此时开始“归”
    if (i == N) {
        return 1;
    }
    // 函数内的操作一直都是维持在 i 行的，需要做的就是判断每一列是否能放下皇后
    // 创建一个变量来记录一共有多少种解法
    int result = 0;
    // 依次检查每一列
    // 在第 0 行时，会检查 0 ... j-1 列，而每检查一列就会进行依次深度优先遍历
    for (int j = 0; j < N; j++) {
        if (isValid(i, j, record)) {
            // 在这一列合法就放下皇后
            record[i] = j;
            // 此处开始深度优先遍历，比较抽象，多加思考
            result += process(i+1, record, N);
        }
    }  
    return result;
}

public static boolean isValid(int i, int j, int[] record) {
    // 因为只有 0 ... i-1 行有数据，所以只用检查这些行就可以
    // i 是当前判断是否合法的元素所在的行
    for (int k = 0; k < i; k++) {
    	// 合不合法的条件
        // 1.不能同一行，天然符合，因为用的是递归且是深度优先遍历，不会有在同一行的情况，此处一定要多加理解
        // 2.不能同一列：j == record[k]
        // 3.不能共斜线，即“行与行”相减不能和“列与列”相减相同：
        if (j == record[k] || Math.abs(i - k) == Math.abs(record[k] - j)) {
        	return false;	
    	}    
    }
    return true;
}
```

注：常数优化后的方案在一定范围内时间会少很多，实现方法是改用位运算

```java
// 不要超过 32 位皇后
public static int NQueen(int N) {
    if (N < 1 || N > 32) {
        return 0;
    }
    // 此时的 limit 是 N 位 1 
   	int limit = N == 32 ? -1 : (1 << N) - 1;
	// 后三个 0 分别表示列限制、左对角线限制、右对角线限制
    return process(limit, 0, 0, 0);
}
	
public static int process(int limit, int colLim, int leftDiaLim, int rightDiaLim) {
    // 如果列限制满了，说明找到了一种解决方法，开始“归”
    if (colLim == limit) {
        return 1;
    }
    // 最右的 1
    int mostRightOne = 0;
    // 可以放下皇后的所有位置，位运算有点抽象，画图理解
    int pos = limit & (~(colLim | leftDiaLim | rightDiaLim));
    // 创建一个变量存放结果数量
    int result = 0;
   	while (pos != 0) {
        mostRightOne = pos & (~pos + 1);
        // 相当于把皇后放下了
        pos = pos - mostRightOne;
        // 下面参数位置分别把三个限制都更新了
        // colLim | mostRightOne 皇后放下后的列限制
        // leftDiaLim << 1 左对角线限制左移就是下一行的限制
        // rightDiaLim >>> 1 右对角线限制右移就是下一行的限制
        res += process(limit, colLim | mostRightOne, (leftDiaLim << 1), (rightDiaLim >>> 1));
    }
    return result;
}
```





## 开会排序

> 以结束时间排序能得到最优解



## 拼接字符串字典序最小

> 以 a · b <= b · a 比较能得到最优解



## 切分金条最小代价

切分金条得到最小代价（哈夫曼编码问题，由局部最小得到整体最小）

> 利用小根堆排序累加能得到最优解



### 做最多的项目

> 利用大小根堆配合，按花费排序的小根堆，按利用排序的大根堆



