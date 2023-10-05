---
title: "图相关算法"
shortTitle: "G-图相关算法"
description: "图相关算法"
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
  text: "图相关算法"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 7
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "图相关算法"
  description: "图相关算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 图相关算法

[[toc]]



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





## FloodFill

> https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247492234&idx=1&sn=fef28b1ca7639e056104374ddc9fbf0b&scene=21#wechat_redirect

```java
public class ClosedIsland {

    public int row = 0;
    public int col = 0;

    public int closedIsland(int[][] grid) {
        row = grid.length;
        if (row == 0) {
            return 0;
        }
        col = grid[0].length;

        int res = 0;


        for (int i = 0; i < row; i++) {
            dfsFill(grid, i, 0);
            dfsFill(grid, i, col - 1);
        }

        for (int j = 0; j < col; j++) {
            dfsFill(grid, 0, j);
            dfsFill(grid, row - 1, j);
        }

        for (int i = 1; i < row - 1; i++) {
            for (int j = 1; j < col - 1; j++) {
                if (grid[i][j] == 0) {
                    res++;
                    dfsFill(grid, i, j);
                }
            }
        }

        return res;

    }

    public void dfsFill(int[][] grid, int i, int j) {
        if (i < 0 || i >= row || j < 0 || j >= col) {
            return;
        }
        if (grid[i][j] == 1) {
            return;
        }
        grid[i][j] = 1;
        dfsFill(grid, i - 1, j);
        dfsFill(grid, i + 1, j);
        dfsFill(grid, i, j - 1);
        dfsFill(grid, i, j + 1);
    }
}
```