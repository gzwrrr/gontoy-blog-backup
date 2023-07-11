---
title: "经典算法汇总"
shortTitle: "C-经典算法汇总"
description: "经典算法汇总"
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
  text: "经典算法汇总"
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
  title: "经典算法汇总"
  description: "经典算法汇总"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 经典算法汇总



[[toc]]

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







## 回溯算法

:::info 相关文章

[一文秒杀排列组合问题的 9 种题型](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247496080&idx=1&sn=a2ae8c8ebf13c7ea704ffb6b16018f08&scene=21#wechat_redirect)

:::

> 其实回溯也算是暴力递归，只不过有优化手段，比如剪枝



### 组合/排列/子集

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

## 并查集

> Union-Find 并查集，相关文章：https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247497087&idx=1&sn=6d68414edf4a19e2d1fba94210851eeb&scene=21#wechat_redirect

**连通与连通量：**

1. 连通：是指一个无向图或有向图中的所有顶点都可以通过路径相互到达。如果一个图不连通，那么它可以被分成若干个连通子图。
2. 连通量：是指无向图或有向图中的连通子图的个数。一个无向图或有向图中只有一个连通子图，那么它就是连通图，它的连通量为1。

「连通」是一种等价关系，也就是说具有如下三个性质：

1. **自反性**：节点`p`和`p`是连通的。
2. **对称性**：如果节点`p`和`q`连通，那么`q`和`p`也连通。
3. **传递性**：如果节点`p`和`q`连通，`q`和`r`连通，那么`p`和`r`也连通。

并查集的作用：

并查集是一种基于树型数据结构的算法，用于解决集合划分的问题。主要解决的问题是如何快速地判断两个元素是否属于同一集合，或者将两个集合合并为一个集合。在并查集中，每个元素都有一个父节点，相互处于一个集合中的元素具有相同的父节点。可以通过查找一个元素的根节点来判断两个元素是否处于同一个集合中。

并查集的应用场景比较广泛，例如：

1. 图的连通性问题：可以使用并查集来判断无向图是否连通。将图中的每个顶点看作一个元素，每个连通子图看作一个集合，将连通子图中的任意一个顶点作为代表元素，使用并查集来判断两个顶点是否在同一个连通子图中，如果不在，则将它们所在的连通子图合并。
2. 社交网络中的关系判断：可以使用并查集来判断两个人是否是朋友关系。将每个人看作一个元素，将朋友关系看作一个集合，使用并查集来判断两个人是否在同一个集合中，如果不在，则将它们所在的集合合并。
3. 计算机网络中的路由选择：可以使用并查集来实现网络中路由的选择。将网络中的每个路由器看作一个元素，将同一网络子网中的路由器看作一个集合，使用并查集来判断两个路由器是否在同一个网络子网中，如果不在，则将它们所在的集合合并。



### 核心 API

```java
class UF {
    /* 将 p 和 q 连接 */
    public void union(int p, int q);
    /* 判断 p 和 q 是否连通 */
    public boolean connected(int p, int q);
    /* 返回图中有多少个连通分量 */
    public int count();
}
```

Union-Find 算法的关键就在于`union`和`connected`函数的效率。

连通操作：如果两个节点连通，那么让一个节点的根节点连接到另一个节点的根节点，也就是说 **如果两个节点连通，那么他们一定有共同的根节点**

使用 `HashMap` 的解法：

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
    // value 为该节点的父节点，即 fatherMap.put(子节点, 父节点);
    public HashMap<Element<V>, Element<V>> fatherMap;
    // 如果 key 是代表元素（头结点），那么 value 就是代表结点下有几个元素，即 sizeMap.put(头节点, 节点下元素总数)
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



### 数组优化

使用数组优化的具体实现：

1. 使用森林（若干棵树）来表示图的动态连通性，用数组来具体实现这个森林。

2. 设定树的每个节点有一个指针指向其父节点，如果是根节点的话，这个指针指向自己。

```java
public void union(int p, int q) {
    int rootP = find(p);
    int rootQ = find(q);
    if (rootP == rootQ)
        return;
    // 将两棵树合并为一棵
    parent[rootP] = rootQ;
    // parent[rootQ] = rootP 也一样
    count--; // 两个分量合二为一
}

/* 返回某个节点 x 的根节点 */
private int find(int x) {
    // 根节点的 parent[x] == x
    while (parent[x] != x)
        x = parent[x];
    return x;
}

/* 返回当前的连通分量个数 */
public int count() { 
    return count;
}

public boolean connected(int p, int q) {
    int rootP = find(p);
    int rootQ = find(q);
    return rootP == rootQ;
}
```

`union` 和 `connected` 都依赖 `find` 方法，最坏情况下时间复杂度为：O(N)，所以每次查找都需要线性的时间复杂度

此时可以在每棵树上加上权重以实现自平衡的目的，即小树加在大树上：

```java
public void union(int p, int q) {
    int rootP = find(p);
    int rootQ = find(q);
    if (rootP == rootQ)
        return;

    // 小树接到大树下面，较平衡
    if (size[rootP] > size[rootQ]) {
        parent[rootQ] = rootP;
        size[rootP] += size[rootQ];
    } else {
        parent[rootP] = rootQ;
        size[rootQ] += size[rootP];
    }
    count--;
}
```

还可以在 `find` 的时候进行路径压缩：

```java
private int find(int x) {
    while (parent[x] != x) {
        // 进行路径压缩
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    return x;
}
```

高度压缩后的完整代码：

```java
class UF {
    // 连通分量个数
    private int count;
    // 存储一棵树
    private int[] parent;
    // 记录树的“重量”
    private int[] size;

    public UF(int n) {
        this.count = n;
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public void union(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        if (rootP == rootQ)
            return;

        // 小树接到大树下面，较平衡
        if (size[rootP] > size[rootQ]) {
            parent[rootQ] = rootP;
            size[rootP] += size[rootQ];
        } else {
            parent[rootP] = rootQ;
            size[rootQ] += size[rootP];
        }
        count--;
    }

    public boolean connected(int p, int q) {
        int rootP = find(p);
        int rootQ = find(q);
        return rootP == rootQ;
    }

    private int find(int x) {
        while (parent[x] != x) {
            // 进行路径压缩
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
```

注意：Union-Find 算法的复杂度可以这样分析：构造函数初始化数据结构需要 O(N) 的时间和空间复杂度；连通两个节点`union`、判断两个节点的连通性`connected`、计算连通分量`count`所需的时间跟树高有关，高度压缩后复杂度均为 O(1)。





### 最简模板

```java
int[] set;

public void init(int size) {
    set = new int[size];
    for (int i = 0; i < size; i++) {
        set[i] = i;
    }
}

public int find(int i) {
    return i == set[i] ? i : (set[i] = find(set[i]));
}

public void union(int i, int j) {
    set[find(i)] = find(j);
}

public boolean same(int i, int j) {
    return find(i) == find(j);
}
```







<br/>

## KMP

> 寻找子串
>

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

**题目：最小覆盖子串，即寻找子序列（注意不是子串，二者有区别，有时候题目会说成子串，但是实际上是子序列），使用滑动窗口遍历一次：**

> 题目示例：S=ABNDHGDSN，T=HNG，那么最小覆盖子序列就是：NDHG（很明显是子序列）

流程大致为：使用两个指针 `left` 与 `right` 作为窗口，使用 `window` 哈希表记录窗口中每个字符的个数，使用 `need` 哈希表记录子串 `t` 中每个字符的个数。开始左右指针都在起始位置，右指针 `right` 先不断前进，前进时不断更新 `window` 中的字符的个数，并查看 `need` 中是否包含该字符并且 **该字符的数量也相等**，相等时使用一个变量 `valid` 记录 `window` 和 `need` 的字符及其数量都匹配的个数，当 `valid` 等于 `nedd.size()` 时，说明窗口中一定包含了子串中所有字符，并且需要的字符的个数也正确。

接下来要做的就是检验窗口中是否确实有需要的子串，做法就是让左指针 `left` 开始前进，前进时更新窗口中的字符个数以及 `valid` 变量，一旦  `valid` 小于了 `need.size()` 就说明窗口中已经没有了我们需要的字符或说有字符但是个数不对，此时左指针 `left` 就不需要再继续前进了，需要做的就是让右指针 `right` 继续前进直到再次满足 `valid`  等于 `need.size()`，不断这样操作直到遍历完成。

在左指针移动的过程中，还需要不断更新维护字符串中子串起始位置 `start`（其实就是不断更新到 `left` 的位置）以及窗口长度 `len`，因为左右指针的移动条件或说移动规则保证了需要的子串（如果确实有子串）一定在窗口内，所以更新起始位置变得很简单，遍历一遍便可以直接确定子串位置。

```java
public String minWindow(String s, String t) {
    // 记录字符的个数与滑动窗口
    Map<Character, Integer> need = new HashMap<Character, Integer>(), window = new HashMap<Character, Integer>();

    // 初始化 need Map，所有需要的字符个数初始化为 0
    for (int i = 0; i < t.length(); i++) {
        need.put(t.charAt(i), need.getOrDefault(t.charAt(i), 0) + 1);
    }

    // 初始化左右指针，这个是需要滑动的窗口
    int left = 0, right = 0;
    // 初始化记录字串的起始指针与长度，这个是需要根据条件更新的数据
    int start = 0, length = Integer.MAX_VALUE;
    // 记录是否合法，当数量与 t 的长度一致时合法，此时找到了字串，但是可能不是最短的，需要继续更新
    int valid = 0;

    // 开始遍历
    while (right < s.length()) {
        // 取出一个字符后，right 指针后移一位
        char ch = s.charAt(right++);
        // 判断 ch 是否在 need 中，是的话 need 中对应的字符个数 + 1
        if (need.containsKey(ch)) {
            // 更新窗口的值
            window.put(ch, window.getOrDefault(ch, 0) + 1);
            // 需要的字符达到个数就让 valid + 1
            if (window.get(ch).equals(need.get(ch))) {
                valid++;
            }
        }

        // 当出现一个符合的字串时，左指针开始往后移
        while (valid == need.size()) {
            // 更新最小覆盖长度
            if (right - left < length) {
                start = left;
                length = right - left;
            }
            // 取出一个字符看是否让子串变得不符合要求
            char c = s.charAt(left++);
            if (window.containsKey(c)) {
                if (window.get(c).equals(need.get(c))) {
                    valid--;
                }
                window.put(c, window.getOrDefault(c, 0) - 1);
            }
        }
    }
    return length == Integer.MAX_VALUE ? "" : s.substring(start, length + start);
}
```

**题目：判断 S 是否包含 T 的排列，即 T 的排列是 S 的子串，这里很明显也是找子序列，和上面的寻找最小覆盖子串类似，只是左指针的移动条件有变化**

> 题目示例：S=ahdjbc，T=cb，此时返回的是 True，因为 T 的排列 bc 是 S 的子串

```java
public boolean checkInclusion(String s1, String s2) {
    // 存储 s1 中字符的个数，因为其中可能有重复的，所以 size 要额外注意
    Map<Character, Integer> need = new HashMap<>(), window = new HashMap<>();

    // 初始化 need 中的个数
    for (int i = 0; i < s1.length(); i++) {
        need.put(s1.charAt(i), need.getOrDefault(s1.charAt(i), 0) + 1);
    }

    // 初始化左右指针，均为 0
    int left = 0, right = 0;
    // 初始化是否合法的标识（是否有合法的字串）
    int valid = 0;

    // 开始遍历
    while (right < s2.length()) {
        // 取出一个字符，取出后右指针后移
        char ch = s2.charAt(right++);
        // 如果取出的 ch 是 need 中的一个字符，那么 window 中对应的字符个数 + 1，当 window 中字符个数等于 need 中对应的字符的个数时，valid + 1
        if (need.containsKey(ch)) {
            window.put(ch, window.getOrDefault(ch, 0) + 1);
            if (need.get(ch).equals(window.get(ch))) {
                valid++;
            }
        }

        // 判断窗口是否需要缩小
        while (right - left >= s1.length()) {
            // 这里先判断是否合法，即是否已经找到了字串
            if (valid == need.size()) {
                return true;
            }
            // 取出一个字符，并让左指针后移一位
            char c = s2.charAt(left++);
            // 更新状态
            if (need.containsKey(c)) {
                if (need.get(c).equals(window.get(c))) {
                    valid--;
                }
                window.put(c, window.getOrDefault(c, 0) - 1);
            }
        }
    }
    return false;
}
```

:::warning 注意

上面的解法是没有优化的版本，使用的存储的数据结构开销比较大，整体的效率比较低。

但是这里主要说的是思路，思路有了怎么改都行

:::

<br/>





## Dijkstra

:::info 相关文章

[我写了一个模板，把 Dijkstra 算法变成了默写题](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247492167&idx=1&sn=bc96c8f97252afdb3973c7d760edb9c0&scene=21#wechat_redirect)

:::

> 加权有向图，并且没有负权重时，可以求得某一点到其余点的最短距离

二叉树广度优先遍历：

```java
class State {
    // 记录 node 节点的深度
    int depth;
    TreeNode node;

    State(TreeNode node, int depth) {
        this.depth = depth;
        this.node = node;
    }
}

// 输入一棵二叉树的根节点，遍历这棵二叉树所有节点
void levelTraverse(TreeNode root) {
    if (root == null) return 0;
    Queue<State> q = new LinkedList<>();
    q.offer(new State(root, 1));

    // 遍历二叉树的每一个节点
    while (!q.isEmpty()) {
        State cur = q.poll();
        TreeNode cur_node = cur.node;
        int cur_depth = cur.depth;
        printf("节点 %s 在第 %s 层", cur_node, cur_depth);

        // 将子节点放入队列
        if (cur_node.left != null) {
            q.offer(new State(cur_node.left, cur_depth + 1));
        }
        if (cur_node.right != null) {
            q.offer(new State(cur_node.right, cur_depth + 1));
        }
    }
}
```

**过渡到 Dijkstra 模板（效率较低，但是通用）：**

```java
// 返回节点 from 到节点 to 之间的边的权重
int weight(int from, int to);

// 输入节点 s 返回 s 的相邻节点
List<Integer> adj(int s);

// 输入一幅图和一个起点 start，计算 start 到其他节点的最短距离
int[] dijkstra(int start, List<Integer>[] graph) {
    // 图中节点的个数
    int V = graph.length;
    // 记录最短路径的权重，你可以理解为 dp table
    // 定义：distTo[i] 的值就是节点 start 到达节点 i 的最短路径权重
    int[] distTo = new int[V];
    // 求最小值，所以 dp table 初始化为正无穷
    Arrays.fill(distTo, Integer.MAX_VALUE);
    // base case，start 到 start 的最短距离就是 0
    distTo[start] = 0;

    // 优先级队列，distFromStart 较小的排在前面
    Queue<State> pq = new PriorityQueue<>((a, b) -> {
        return a.distFromStart - b.distFromStart;
    });

    // 从起点 start 开始进行 BFS
    pq.offer(new State(start, 0));

    while (!pq.isEmpty()) {
        State curState = pq.poll();
        int curNodeID = curState.id;
        int curDistFromStart = curState.distFromStart;

        if (curDistFromStart > distTo[curNodeID]) {
            // 已经有一条更短的路径到达 curNode 节点了
            continue;
        }
        // 将 curNode 的相邻节点装入队列
        for (int nextNodeID : adj(curNodeID)) {
            // 看看从 curNode 达到 nextNode 的距离是否会更短
            int distToNextNode = distTo[curNodeID] + weight(curNodeID, nextNodeID);
            if (distTo[nextNodeID] > distToNextNode) {
                // 更新 dp table
                distTo[nextNodeID] = distToNextNode;
                // 将这个节点以及距离放入队列
                pq.offer(new State(nextNodeID, distToNextNode));
            }
        }
    }
    return distTo;
}
```









N 数之和

:::info 相关文章

[一个函数秒杀 2Sum 3Sum 4Sum 问题](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485789&idx=1&sn=efc1167b85011c019e05d2c3db1039e6&scene=21#wechat_redirect)

:::

```java
public List<List<Integer>> fourSum(int[] nums, int target) {
    Arrays.sort(nums);
    List<List<Integer>> res = nSum(nums, 4, 0, target);
    return res;
}

// N 数之和，通过递归和 base case（两数之和）得出，效率不是很高，但是通用
public List<List<Integer>> nSum(int[] nums, int n, int start, long target) {
    int len = nums.length;
    List<List<Integer>> res = new LinkedList<>();
    if (n < 2 || len < n) {
        return res;
    }
    if (n == 2) {
        int p1 = start, p2 = nums.length - 1;
        while (p1 < p2) {
            int left = nums[p1], right = nums[p2];
            int sum = right + left;
            if (sum < target) {
                p1++;
            } else if (sum > target){
                p2--;
            } else {
                List<Integer> item = new ArrayList<>();
                item.add(left);
                item.add(right);
                res.add(item);
                while (left == nums[p1] && p1 < p2) {
                    p1++;
                }
                while (right == nums[p2] && p1 < p2) {
                    p2--;
                }
            }
        }
    } else {
        for (int i = start; i < nums.length; i++) {
            int num = nums[i];
            List<List<Integer>> nSum = nSum(nums, n - 1, i + 1, target - num);
            for (List<Integer> item : nSum) {
                item.add(num);
                res.add(item);
            }
            // 跳过三个数字中第一个数字（防止重复）
            while (i < nums.length - 1 && nums[i] == nums[i + 1]) {
                i++;
            }
        }
    }
    return res;
}
```







## 前缀和

:::info 相关文章

[前缀和技巧：解决子数组问题](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484488&idx=1&sn=848f76e86fce722e70e265d0c6f84dc3&scene=21#wechat_redirect)

:::

前缀和 `preSum` 用于快速确定 `nums[i...j]` 区域的相加的值，例如要找到 `nums[i...j]` 区域相加的值，只需要 `sums[j + 1] - sum[i]`

```java
int[] scores; // 存储着所有同学的分数
// 试卷满分 150 分
int[] count = new int[150 + 1]
// 记录每个分数有几个同学
for (int score : scores)
    count[score]++
// 构造前缀和
for (int i = 1; i < count.length; i++)
    count[i] = count[i] + count[i-1];
```

例如题目：

> 和为 K 的子数组：给你一个整数数组 `nums` 和一个整数 `k` ，请你统计并返回 *该数组中和为 `k` 的连续子数组的个数* 。

```java
public int subarraySum(int[] nums, int k) {
    int len = nums.length;
    int[] sum = new int[len + 1];
    for (int i = 0; i < len; i++) {
        sum[i + 1] = sum[i] + nums[i];
    }
    int res = 0;
    for (int i = 0; i < len; i++) {
        for (int j = i; j < len; j++) {
            if (sum[j + 1] - sum[i] == k) {
                res++;
            }
        }
    }
    return res;
}
```

还可以使用哈希表优化（具体看上面的给出的原文章）：

```java
public int subarraySum(int[] nums, int k) {
    int len = nums.length;
    Map<Integer, Integer> map = new HashMap<>();
    int res = 0;
    int sum_i = 0;
    map.put(0, 1);

    for (int i = 0; i < len; i++) {
        sum_i += nums[i];
        int sum_j = sum_i - k;
        if (map.containsKey(sum_j)) {
            res += map.get(sum_j);
        }
        map.put(sum_i, map.getOrDefault(sum_i, 0) + 1);
    }
    return res;
}
```





## 差分数组

:::info 相关文章

[论那些小而美的算法技巧：差分数组/前缀和](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247487011&idx=1&sn=5e2b00c1c736fd7afbf3ed35edc4aeec&scene=21#wechat_redirect)

:::

> 差分数组用于对数组的某一个区域的所有数进行非常频繁的加减操作

具体实现（直接看文章就可以了，有图很清晰）：

```java
class Diff {
    int[] diff;

    public Diff(int[] nums) {
        this.diff = new int[nums.length];
        for (int i = 1; i < diff.length; i++) {
            diff[i] = nums[i] - nums[i - 1];
        }
    }

    public int[] getResult() {
        int[] res = new int[diff.length];
        res[0] = diff[0];
        for (int i = 1; i < diff.length; i++) {
            res[i] = diff[i] + res[i - 1];
        }
        return res;
    }

    public void increase(int i, int j, int val) {
        diff[i] +=val;
        if (j + 1 < diff.length) {
            diff[j + 1] -= val;
        }
    }
}
```





## 反转部分链表

节点结构：

```java
private class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
```

迭代版本：

```java
/**
 * 迭代解法
 * 使用四个指针切成三段，单独对中间的一段进行反转
 */
public ListNode reverseBetween01(ListNode head, int left, int right) {
    ListNode dummy = new ListNode(-1, head);
    ListNode pre = dummy;
    for (int i = 0; i < left - 1; i++) {
        pre = pre.next;
    }
    ListNode rNode = pre;
    for (int i = 0; i < right - left + 1; i++) {
        rNode = rNode.next;
    }
    ListNode lNode = pre.next, succ = rNode.next;
    pre.next = null;
    rNode.next = null;

    reverseList(lNode);

    pre.next = rNode;
    lNode.next = succ;
    return dummy.next;
}

public void reverseList(ListNode head) {
    if (head == null || head.next == null) {
        return;
    }
    ListNode pre = null, cur = head;
    while (cur != null) {
        ListNode next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
}
```

递归版本：

```java
/**
 * 递归反转 M ~ N 个
 */
public ListNode reverseBetween(ListNode head, int left, int right) {
    if (left == 1) {
        return reverseN(head, right);
    }
    head.next = reverseBetween(head.next, left - 1, right - 1);
    return head;
}


ListNode succ = null;

/**
 * 递归反转前 N 个
 */
public ListNode reverseN(ListNode head, int n) {
    if (n == 1) {
        succ = head.next;
        return head;
    }
    ListNode last = reverseN(head.next, n - 1);
    head.next.next = head;
    head.next = succ;
    return last;
}
```







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

> 相关文章：https://zhuanlan.zhihu.com/p/106118909

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





## 最近最少使用 （LRUCache）

:::info 相关文章

[Java集合之LinkedHashMap](https://www.cnblogs.com/xiaoxi/p/6170590.html)

[Leetcode 题解](https://leetcode.cn/problems/lru-cache/solutions/259678/lruhuan-cun-ji-zhi-by-leetcode-solution/)

:::

```java
class LRUCache {

    class DLinkedNode {
        int key;
        int value;
        DLinkedNode pre;
        DLinkedNode next;

        public DLinkedNode(int k, int v) {
            key = k;
            value = v;
        }
    }

    Map<Integer, DLinkedNode> cache;
    int capacity;
    int size;
    DLinkedNode head;
    DLinkedNode tail;

    public LRUCache(int cap) {
        capacity = cap;
        size = 0;
        head = new DLinkedNode(-1, -1);
        tail = new DLinkedNode(-1, -1);
        cache = new HashMap<>();
        head.next = tail;
        tail.pre = head;
    }

    public int get(int key) {
        DLinkedNode res = cache.get(key);
        if (res == null) {
            return -1;
        }
        moveToHead(res);
        return res.value;
    }

    public void put(int key, int value) {
        DLinkedNode res = cache.get(key);
        if (res == null) {
            DLinkedNode node = new DLinkedNode(key, value);
            cache.put(key, node);
            addToHead(node);
            size++;
            if (size > capacity) {
                DLinkedNode remove = removeTail();
                cache.remove(remove.key);
                size--;
            }
        } else {
            res.value = value;
            moveToHead(res);
        }
    }

    // 添加头节点
    public void addToHead(DLinkedNode node) {
        node.pre = head;
        node.next = head.next;
        head.next.pre = node;
        head.next = node;
    }

    // 将节点移动到头部
    public void moveToHead(DLinkedNode node) {
        removeNode(node);
        addToHead(node);
    }

    // 移除节点
    public void removeNode(DLinkedNode node) {
        node.pre.next = node.next;
        node.next.pre = node.pre;
    }

    // 移除尾节点
    public DLinkedNode removeTail() {
        DLinkedNode res = tail.pre;
        removeNode(res);
        return res;
    }
}

/**
 * 使用 LinkedHashMap 实现
 */
class LRUCache01 extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCache01(int capacity) {
        super(capacity, 0.75F, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}
```