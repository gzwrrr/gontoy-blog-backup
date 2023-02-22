---
title: "算法知识点"
shortTitle: "C-算法知识点"
description: "算法知识点"
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
sticky: 997
star: true
article: true
timeline: true,
dir:
  text: "算法知识点"
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
  title: "算法知识点"
  description: "算法知识点"
  author:
    name: gzw
    email: 1627121193@qq.com
---

# 算法知识点

## 贪心算法

- 在某一个标准下，优先考虑最满足标准的样本，最后考虑最不满足标准的样本，最终得到一个答案

- 也就是不从整体上寻找最优解，而是做出某种意义上的局部最优解

- 有时可由局部最优得到整体最优

**注意：**贪心策略都是需要证明的，但是一般数学证明会非常难，所以在时间不允许的情况下使用对数器暴力验证是否正确

**最常用的做法：**堆和排序



### 1.1 开会排序（待补充）

> 以结束时间排序能得到最优解



### 1.2 拼接字符串字典序最小（待补充）

> 以 a · b <= b · a 比较能得到最优解



### 1.3 切分金条得到最小代价（哈夫曼编码问题，由局部最小得到整体最小）（待补充）

> 利用小根堆排序累加能得到最优解



### 1.4 做最多的项目（待补充）

> 利用大小根堆配合，按花费排序的小根堆，按利用排序的大根堆



### 1.5 n 皇后问题

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



<br/>

## 暴力递归

- 暴力递归就是不断分解问题，不断寻找子问题，直到到达不能分解的问题（base case）

- 暴力递归是动态规划的基础

### 2.1 汉诺塔问题

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

### 2.2 字符串全部子序列

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



<br/>

## 布隆过滤器

- 典型应用：网站链接黑名单，爬虫去重
- 操作只有增加、查询，没有删除
- 有一定程度的失误（不可避免，但是可以设计得很低）
- 使用「位图」（bit arr / bit map），用基础类型拼凑，与单样本大小无关
- 原理：对一个输入取 K 个哈希值，将位图（大小为 M）中对应的 bit 位「描黑」（置1/0），下次再判断输入是否在位图中即可（K 个哈希值有一个是「白」的就说明输入不在位图中）
- 具体实现时，需要考虑 K 和 M 的取值范围，K 太小太大或者 M 太小都会增加失误率（M 取值占主要）

经过数学证明的公式（N 为样本量，P 为失误率，均向上取整）：

> M = -(N * lnP / (ln2)^2)
>
> K = ln2 * M / N ≈ 0.7 * M / N
>
> P真 = (1 - e^(- N * K真 / M真))^K真



<br/>

## 并查集

```java
public static class Element<V> {
    public V value;
    public Element(V value) {
        this.value = value;
    }
}


public static class UnionFindSet<V> {
    // 映射 a -> Element(a)
    public HashMap<V, Element<V>> elementMap;
    // value 为该节点的父节点
    public HashMap<Element<V>, Element<V>> fatherMap;
    // 如果 key 是代表元素（头结点），那么 value 就是代表结点下有几个元素
    public HashMap<Element<V>, Integer> sizeMap;
	
    public UnionFindSet(List<V> list) {
        for (V value : list) {
            // 给元素包上一个「圈」
            Element<V> element = new Element<V>(value);
            elementMap.put(value, element);
            fatherMap.put(element, element);
            sizeMap.put(element, 1);
        }
    }

    // 找到元素的头节点（代表元素）
    public Element<V> findHead(Element<V> element) {
        Stack<Element<V>> path = new Stack<Element<V>>;
        while (element != fatherMap.get(element)) {
            path.push(element);
            element = fatherMap.get(element);
        }
        // 将一条链上的所有结点直接挂在头节点（代表结点）下
        while (!path.isEmpty) {
            fatherMap.put(path.pop(), element);
        }
        return element;
    }
    
	// 判断两个元素是否在同一个集合里
    public boolean isSame(V a, V b) {
        if (elementMap.contains(a) && elementMap.contains(b)) {
            // 找到该元素对应的代表元素，只有两个元素的代表元素都相等，才是存在与同一个集合里
            return findHead(elementMap.get(a)) == findHead(elementMap.get(b));
        }
        return false;
    }
    
    // 合并两个集合
    public void union(V a, V b) {
        // 只有注册过的元素才能合并
        if (elementMap.contains(a) && elementMap.contains(b)) {
			// 找到两个元素的代表元素，头结点
            Element<V> aHead = findHead(elementMap.get(a));
			Element<V> bHead = findHead(elementMap.get(b));
        	if (aHead != bHead) {
                // 找出大小代表元素
                Element<V> bigHead = sizeMap.get(aHead) >= sizeMap.get(bHead) ? ahead : bHead;
                Element<V> smallHead = big == ahead ? bHead : aHead;
                // 将小的结点挂到大的结点下面
                fatherMap.put(smallHead, bigHead);
                // 因为小的结点挂到了大的结点上，所以更新大结点的大小，并在 elementMap 中删除小的结点
                sizeMap(bigHead, sizeMap.get(bigHead) + sizeMap.get(smallHead));
                elementMap.remove(smallHead);
            }
        }
    }
}
```



<br/>

## KMP

寻找子串

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

## manacher

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

<br/>



## 滑动窗口

> 滑动窗口是一种基于双指针的一种思想，两个指针指向的元素之间形成一个窗口

滑动窗口分为两类：

- 一种是固定大小类的窗口
- 一类是大小动态变化的窗口

滑动窗口初始指针一般是「左闭右开」的，即：[left, right)

滑动窗口一般是由两个「循环」组成：

```java
// 时间复杂度是 O(N)
int left = 0, right = 0;
while (right < s.size()) {
    // 增大窗口
    window.add(s[right]);
    right++;
    while (window needs shrink) {
        // 缩小窗口
        window.remove(s[left]);
        left++;
    }
}
```

**滑动窗口框架：**

```c
/* 滑动窗口算法框架 */
void slidingWindow(string s, string t) {
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;

    int left = 0, right = 0;
    int valid = 0; 
    while (right < s.size()) {
        // c 是将移入窗口的字符
        char c = s[right];
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        ...

        /*** debug 输出的位置 ***/
        printf("window: [%d, %d)\n", left, right);
        /********************/

        // 判断左侧窗口是否要收缩
        while (window needs shrink) {
            // d 是将移出窗口的字符
            char d = s[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            ...
        }
    }
}
```

<br/>