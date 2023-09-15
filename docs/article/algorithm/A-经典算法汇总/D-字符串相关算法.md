---
title: "字符串相关算法"
shortTitle: "D-字符串相关算法"
description: "字符串相关算法"
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
  text: "字符串相关算法"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 4
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "字符串相关算法"
  description: "字符串相关算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 字符串相关算法

[[toc]]





## KMP

> 寻找子串
>
> https://www.bilibili.com/video/BV1PD4y1o7nd/?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0
>
> https://mp.weixin.qq.com/s/MoRBHbS4hQXn7LcPdmHmIg

```java
/*
	时间复杂度：o(n)
	KMP 过程用到的 next 数组是优化的关键，所有优化的操作都是基于这个信息集合的
	使用 next 数组的过程需要转换视角理解，得到 next 数组的过程与使用的过程有相似之处，同样很巧妙
*/
public static int getIndexOf(String s, String m) {
    // 不符合情况就直接返回 -1 
    if (s == null || m == null || m.length() < 0 || s.length() < m.length()) {
        return -1;
    }
    // 将两个字符串转换成字符数组
    char[] str1 = s.toCharArray();
    char[] str2 = s.toCharArray();
    // 创建两个指针
    int i1 = 0;
    int i2 = 0;
    // 获取任意一个字符前字符串的最大前后缀相等的值
    int[] next = getNextArray(str2);
    // 指针不能越界，越界说明出了结果：找到/没找到
    while (i1 < str1.length && i2 < str2.length) {
        if (str1[i1] == str2[i2]) {
        	// 相等则两个指针同时前进
            i1++;
            i2++;
        } else if (next[i2] == -1) {
            // 说明 str1 第一次不等的位置和 str2 开始的位置不等，所以 i1 要往前走一步，继续比较后续的字符
            i1++;
        } else {
            // 说明加速检验到的位置 str1[i1] != str2[i2], 这时 str2 需要「往右推」，即 i2 「往回跳」
            i2 = next[i2];
        }
    }
    // 当 i2 == str2.length 说明找到了子串，否则直接返回 -1 
    return i2 == str2.length ? i1 - i2 : -1;
}

public static int[] getNextArray(char[] ms) {
    // 如果数组长度只有 1 ，那么直接返回 {-1}
    if (ms.length == 1) {
        return new int[] {-1};
    }
    // 创建 next 数组
    int[] next = new int[ms.length];
    // 认为规定 0 和 1 位置的值
    next[0] = -1;
    next[1] = 0;
 	// 创建指针，i为后缀最后一个字符的位置。cn为前缀最后一个字符的位置，注意理解，不知一层含义
    int i = 2;
    int cn = 0;
   	while (i < next.length) {
        if (ms[i - 1] == ms[cn]) {
            // 相等则说明，拿 2 位置距离，ms[0] == ms[1]，那么这样就要使 ms[2] == 1
            // 这一句其实进行了三项操作，可以拆开来理解
            next[i++] = ++cn;
        } else if (cn > 0) {
            // 说明两个指针指向的值不相等，但是还可以往前跳继续对比，那么就让 cn 跳到需要比对的位置，这一步和 KMP 相似
            cn = next[cn];
        } else {
            // 说明已经没有可以比较的位置了，直接将值设为 0 
            next[i++] = 0;
        }
    }
    return next;
}
```



<br/>

## Manacher

> 回文子串的最优解

**题目要求：**

- 返回字符串中最大回文字符串的字符数量，时间复杂度 o(n)

**相关概念：**

- 回文半径
- 回文直径
- 之前扩的所有位置中所到达的最右回文右边界 R（初始为 -1 ）
- 取得更远边界时中心点的位置 C （初始为 -1 ，R 更新 C 一定更新，否则都不更新）

**所有情况：**

1. 当前来到的中心位置 i 没有在右边界 R 里，暴力扩展无优化
2. 当前来到的中心位置 i 在右边界 R 里，则一定存在：[L ... i’ ... C ... i ... R]
   1. 以 i 为 C 的回文区域完全在 L -- R 里：[L... (L ... i ... R) ...R]，此时 i 的半径为原本的半径，不用扩展
   2. 以 i 为 C 的回文区域不完全在 L -- R 里：( ... [L ... i’ )... C ... ( i ... R] ... )，此时 i 的半径为 (R - I + 1)，不用扩展
   3. 以 i 为 C 的回文区域边界正好「压线」：[(L ... i’ ... ) ... C ... ( ... i ... R)]，此时需要扩展

```java
public static int maxLcpsLength(String s) {
    if (s == null || s.length == 0) {
        return 0;
    }
    // 将字符串转换成字符数组，1221 -> #1#2#2#1#
    char[] str = manacherString(s);
    // 创建回文半径数组
    int[] pArr = new int[str.length];
    // 中心
    int C = -1;
    // 回文右边界再往右一个位置，即最右的有效位置是 R - 1
    int R = -1;
	// 扩展出来的最大值
    int max = Integer.MAX_VALUE;
    // 每一个位置都需要求出回文半径
    for (int i = 0; i != str.length; i++) {
        // 以下的写法和分析情况中的不太一样，但是能减少代码量，而且本质是一样的
        // i 至少的回文区域，先赋值给 pArr[i]
        pArr[i] = R > i ? Math.min(pArr[2 * C - i], R - i) : 1;
        // 四种情况都往外检查，但是是左右都不越界才检查
        while (i + pArr[i] < str.length && i - pArr[i] > -1) {
            if (str[i + pArr[i]] == str[i - pArr[i]]) {
            	// 检查回文区域两边的字符是否相等，相等则半径+1
                pArr[i]++;
            } else {
                // 说明两边的字符不相等，半径不增加
                break;
            }
        }
        // 如果当前位置的半径大于了右边界，那么更新右边界 R 和 回文中心 C 
        if (i + pArr[i] > R) {
            R = i + pArr[i];
            C = i;
        }
        // 如果此位置的半径大于 max ，则更新 max 为该位置的半径
        max = Math.max(max, pArr[i]);
    }
    // 因为加了 # ，所以寻找规律后可以得出最大值为 max - 1
    return max - 1;
}

public static char[] manacherString(String s) {
    char[] charArr = s.toCharArray(s);
    char[] result = new int[2 * s.length + 1];
    int index = 0;
	for (int i = 0; i != result.length; i++) {
        // 0 2 4 ... 位置全是 '#'
        result[i] = (i & 1) == 0 ? '#' : charArr[index++]; 
    }
    return result;
}
```

