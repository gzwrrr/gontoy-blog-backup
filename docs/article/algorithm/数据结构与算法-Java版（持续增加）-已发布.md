---
title: "数据结构与算法-Java版"
shortTitle: "数据结构与算法-Java版"
description: "数据结构与算法-Java版"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "算法"
- "Java"
tag:
- "算法"
- "Java"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "数据结构与算法-Java版"
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
  title: "数据结构与算法-Java版"
  description: "数据结构与算法-Java版"
  author:
    name: gzw
    email: 1627121193@qq.com
---




# 数据结构与算法-Java版



# 写在前面

## 什么是算法？

算法是对特定问题求解步骤的一种描述，它是指令的优先序列，其中每一条指令表示一个或多个操作，此外，一个算法还有以下五个重要特性：
- 有穷性
- 确定性
- 可行性
- 输入
- 输出

**一个好的算法应该具有：**

- 正确性
- 健壮性
- 可读性
- 效率与地存储量需求

**算法效率的度量：**

- 事后统计的方法
- 事前分析估算的方法

**高级语言所消耗的时间取决于：**

- 依据的算法采用何种策略
- 问题的规模
- 书写程序的语言
- 编译程序所产生的机器代码的质量
- 机器指令运行的速度

**相关名词：**

- 时间复杂度
- 频度：语句重复执行的次数
- 空间复杂度
- 常用的时间复杂度所耗费的时间从小到大依次是：`O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^n)`

<br/>



## 八大数据结构

- 数组（Array）
- 链表（LinkedList）
- 队列（Queue）
- 栈（Stack）
- 堆（Heap）
- 散列表（Hash）
- 树（Tree）
- 图（Graph）

<br/>



## 八大常用算法思想

- 枚举/穷举
- 递推
- 递归
- 分治
- 动态规划
- 贪心算法
- 回溯算法
- 模拟算法

<br/>



---



<br/>


# java 中的数据结构
## java 中的容器
> 容器主要包括 Collection 和 Map 两种，Collection 存储着对象的集合，而 Map 存储着键值对（两个对象）的映射表

### 1.Collection

**1.Set：**

 - `TreeSet`：基于红黑树实现，支持有序性操作，例如根据一个范围查找元素的操作。但是查找效率不如 HashSet，HashSet 查找的时间复杂度为 O(1)，`TreeSet` 则为 O(logN)。
 - `HashSet`：基于哈希表实现，支持快速查找，但不支持有序性操作。并且失去了元素的插入顺序信息，也就是说使用 Iterator 遍历 HashSet 得到的结果是不确定的。
 - `LinkedHashSet`：具有 HashSet 的查找效率，并且内部使用双向链表维护元素的插入顺序。  

**2.List：**

- `ArrayList`：基于动态数组实现，支持随机访问。
- `Vector`：和 `ArrayList` 类似，但它是线程安全的。
- `LinkedList`：基于双向链表实现，只能顺序访问，但是可以快速地在链表中间插入和删除元素。不仅如此，LinkedList 还可以用作栈、队列和双向队列。  

**3.Queue：**

- `LinkedList`：可以用它来实现双向队列。
- `PriorityQueue`：基于堆结构实现，可以用它来实现优先队列。



<br/>


### 2.Map
- `TreeMap`：基于红黑树实现。
- `HashMap`：基于哈希表实现。
- `HashTable`：和 HashMap 类似，但它是线程安全的，这意味着同一时刻多个线程同时写入 HashTable 不会导致数据不一致。它是遗留类，不应该去使用它，而是使用 ConcurrentHashMap 来支持线程安全，ConcurrentHashMap 的效率会更高，因为 ConcurrentHashMap 引入了分段锁。
- `LinkedHashMap`：使用双向链表来维护元素的顺序，顺序为插入顺序或者最近最少使用（LRU）顺序。



<br/>

## Java 容器的相关知识点

### 1.Arraylist
因为 `ArrayList` 是基于数组实现的，所以支持快速随机访问：

```java
public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```
数组的默认大小为 10：

```java
private static final int DEFAULT_CAPACITY = 10;
```



<br/>

### 2.Vector

它的实现与 `ArrayList` 类似，但是使用了 `synchronized` 进行同步：

```java
public synchronized boolean add(E e) {
     modCount++;
     ensureCapacityHelper(elementCount + 1);
     elementData[elementCount++] = e;
     return true;
} 
public synchronized E get(int index) {
    if (index >= elementCount) {
        throw new ArrayIndexOutOfBoundsException(index);
	}    
	return elementData(index);
}
```
与 ArrayList 的比较：

- Vector 是同步的，因此开销就比 ArrayList 要大，访问速度更慢。最好使用 ArrayList 而不是 Vector，因为同步操作完全可以由程序员自己来控制；
- Vector 每次扩容请求其大小的 2 倍（也可以通过构造函数设置增长的容量），而 ArrayList 是 1.5 倍。



<br/>

### 3. LinkedList

基于双向链表实现，使用 Node 存储链表节点信息：

```java
private static class Node<E> {
	E item;
	Node<E> next;
	Node<E> prev;
}
```
每个链表存储了 first 和 last 指针：

```java
	transient Node<E> first;
	transient Node<E> last;
```
与 ArrayList 的比较：

- ArrayList 基于动态数组实现，LinkedList 基于双向链表实现。ArrayList 和 LinkedList 的区别可以归结为数组和链表的区别：

- 数组支持随机访问，但插入删除的代价很高，需要移动大量元素；
- 链表不支持随机访问，但插入删除只需要改变指针。



<br/>

### 4 HashMap
**HashMap 的底层实现是「数组」+「链表」**

存储结构：

- 内部包含了一个 Entry 类型的数组 table。
- Entry 存储着键值对。它包含了四个字段，从 next 字段我们可以看出 Entry 是一个链表。即数组中的每个位置被当成一个桶，一个桶存放一个链表
- HashMap 使用拉链法来解决冲突，同一个链表中存放哈希值和散列桶取模运算结果相同的 Entry。

<br/>



---



<br/>

# 数据结构知识点
**线性结构的特点：**

1. 存在唯一的一个被称作「第一个」的数据元素
2. 存在唯一的一个被称作「最后一个」的数据元素
3. 除第一个元素外，集合中的每个数据元素均只有一个「前驱」
4. 除最后一个元素外，集合中的每个数据元素均只有一个「后继」

**线性表：**

1. 线性表是最常用且最简单的一种数据结构
2. 一个线性表就是 n 个数据元素的优先序列

**线性表的顺序表示：**

1. 指的是用一组地址连续的存储单元依次 线性表的数据元素
2. 只要确定了存储线性表的起始位置，线性表中任意数据元素都可以随机存取，所以线性表的顺序存储结构是一种随机存取的存储结构
3. 各种操作的时间复杂度：
   1. 插入操作：O(n)
   2. 删除操作：O(n)
   3. 合并操作：O(La.length * Lb.length)



<br/>

## 1.哈希表（无序表）

1. 哈希表在使用层面上可以理解为一种集合结构
2. 如果只有 key，没有伴随数据 value，可以使用 HashSet 结构
3. 如果既有 key，也有 value，可以使用 HashMap 结构
4. 两个结构的底层实际上是一回事
5. 使用哈希表进行增删改查的操作，可以认为时间复杂度为 O(1)，但是常数时间较大
6. 放入哈希表的东西，如果是基础类型，内部按值传递，内存占用就是这东西的大小
7. 放入哈希表的大小，如果不是基础类型，内部按引用传递，内存占用是这个东西的内存地址的大小（一律8字节）

### 哈希函数

> 类似提取指纹

- 输入可以无限，但是输出有穷，这样就导致即便是不同的输入，也可能出现相同的输出（哈希碰撞/冲突，较低）
- 无随机成分，即相同的输入必定返回相同的输出
- 哈希函数有离散性和均匀性，这是评判一个哈希函数好坏的重要依据
- 经典的一个应用是：布隆过滤器
- 相关的概念有：一致性哈希（可以实现分布式负载均衡）



<br/>

## 2.有序表

1. 有序表在使用层面上可以理解为一种集合结构
2. 如果只有 key，没有伴随数据 value，可以使用 TreeSet 结构
3. 如果既有 key，也有 value，可以使用 TreeMap 结构
4. 两个结构的底层实际上是一回事
5. 有序表和哈希表的区别是，有序表把 key 按照顺序组织起来，而哈希表完全不组织
6. 红黑树、AVL数、size-balance-tree 和调表等都属于有序表结构，只是底层具体实现不同
7. 放入有序的东西，如果是基础类型，内部按值传递，内存占用就是这东西的大小
8. 放入有序表的大小，如果不是基础类型，必须提供比较器，内部按引用传递，内存占用是这个东西的内存地址的大小（一律8字节）
9. 有序表的所有操作时间复杂度都是 (log N​) 级别的



<br/>

## 3.单/双链表

链表的类型：

- 单向链表
- 双向链表
- 循环链表

```java
// 单链表和双链表结构只需给定一个头部节点 head 就可以找到剩下的所有节点
// 单链表节点结构
class SingleNode<V> {
    V value;
    Node next;
}

// 双链表节点结构
class DoubleNode<V> {
    V value;
    Node pre;
    Node next;
}
```



<br/>

## 4.二叉树

- 树里的每一个节点有一个值和一个包含所有子节点的列表
- 从图的观点来看，树可以视为一个 N 个节点和 N -1 条边的有向无环图
- 二叉树是树的更为典型的结构，每个节点最多有两个子树结构



### 二叉树遍历

递归遍历：每个节点都可以回到自己三次（会有递归序，自己推），回到自己的三次都可以进行一定的操作。其中又分为先序、中序、后序遍历

- 先序（头左右）：1 2 4 5 3 6 7
- 中序（左头右）：4 2 5 1 6 3 7
- 后序（左右头）：4 5 2 6 7 3 1

```java
// 二叉树节点结构
class Node<V> {
    V value;
	Node left;
    Node right;
}

// 递归遍历，每个“序”的区域都可以做一定的操作，例如打印
public void f(Node head) {
    if (head == null) {
        return null;
    }
    /*
    	先序区域
    */
    f (head.left);
    /*
    	中序区域
    */
    f (head.right);
    /*
    	后序区域
    */
}

// 非递归遍历，用栈实现
// 先序遍历
public void noF(Node head) {
    if (head != null) {
        Stack<Node> stack = new Stack<Node>();
        stack.push(head);
        while (!stack.isEmpty()) {
            head = stack.pop();
            System.out.print(head.value + " ");
        	if (head.right != null) {
                stack.push(head.right);
            }
            if (head.left != null) {
                stack.push(head.left);
            }
        }
    }
}

// 中序遍历
public void noF(Node head) {
    if (head != null) {
        Stack<Node> stack = new Stack<Node>();
        while (!stack.isEmpty() || root != null) {
            if (head != null) {
                stack.push(head);
                head = head.left;
            } else {
                head = stack.pop();
                System.out.print(head.value + " ");
                head = head.right;
            }
        }
    }
}

// 后序遍历
public void noF(Node head) {
    if (head != null) {
        Stack<Node> stackOne = new Stack<Node>();
        Stack<Node> stackTwo = new Stack<Node>();
    	stackOne.push(head);
        while (!stackOne.isEmpty) {
            head = stackOne.pop();
            stackTwo.push(head);
            if (head.left != null) {
                stackOne.push(head.left);
            }
            if (head.right != null) {
                stackOne.push(head.right);
            }
        }
        while (!stackTwo.isEmpty) {
            System.out.pint(stackTwo.pop().value + " ");
        }
    }
       
}
```

**值得注意的是：**当删除二叉树中的一个节点时，删除过程将按照「后序遍历」的顺序进行



<br/>

### 二叉树层序遍历

```java
/**
 * BFS 广度优先遍历
 */
class LevelOrder {
    public List<List<Integer>> levelOrder(TreeNode root) {
        if (root == null) {
            return new ArrayList<List<Integer>>();
        }
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        Queue<TreeNode> queue = new LinkedList();
        queue.add(root);
        while (!queue.isEmpty()) {
            int levelNum = queue.size();
            List<Integer> subList = new ArrayList<Integer>();
            for (int i = 0; i < levelNum; i++) {
                TreeNode cur = queue.poll();
                subList.add(cur.val);
                if (cur.left != null) {
                    queue.add(cur.left);
                }
                if (cur.right != null) {
                    queue.add(cur.right);
                }
            }
            res.add(subList);
        }
        return res;
    }
}

```

```java
/**
 * 虽然层序遍历正常是用广度优先遍历，但是这里也可以使用 DFS 深度优先遍历
 */
class LevelOrder {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        leverHelper(res, root, 0);
        return res;
    }

    private void leverHelper(List<List<Integer>> res, TreeNode root, int level) {
        if (root == null) {
            return;
        }
        if (level >= res.size()) {
            res.add(new ArrayList<Integer>());
        }
        res.get(level).add(root.val);
        leverHelper(res, root.left, level + 1);
        leverHelper(res, root.right, level + 1);
    }
}
```



<br/>

### Morris 遍历

时间复杂度：O(N)，额外空间复杂度：O(1)，这种遍历方式是利用原树中最底层大量的空闲指针来节省空间的

该遍历需要遵循以下规则：假设来到当前节点 cur，开始是 cur 为头节点：

1. 如果 cur 没有左孩子，cur 向右移动
2. 如果 cur 有左孩子，那么要找到左子树的最右节点 mostRight
   1. 如果 mostRight 的右指针指向空，说明第一次访问 cur，此时让右指针指向 cur
   2. 如果 mostRight 的右指针指向 cur，说明第二次访问 cur，此时右指针指向空，即恢复现场，然后 cur 向右移动
3. cur 为空时停止遍历

根据规则可以发现：有左子树的节点能回到自己 2 次，没有的只能访问 1 次

使用 Morris 遍历的「中序遍历」可以用「极小的代价」判断一棵树是否为「搜索二叉树」

```java
/**
 * Morris 遍历，利用线索二叉树进行遍历
 */
public class Morris {
    public static class Node {
        public int value;
        public Node left;
        public Node right;

        public Node(int value) {
            this.value = value;
        }
    }
    public static void morris(Node head) {
        if (head == null) {
            return;
        }
        Node cur = head;
        Node mostRight = null;
        while (cur != null) {
            mostRight = cur.left;
            if (mostRight != null) {
                // 找到最右节点
                while (mostRight.right != null && mostRight.right != cur) {
                    mostRight = mostRight.right;
                }
                // mostRight 此时就是 cur 上的最右的节点，如果这个节点的右节点为空，那么就要指向 cur
                if (mostRight.right == null) {
                    mostRight.right = cur;
                    // 当前节点往左子树上移动
                    cur = cur.left;
                    continue;
                } else {
                    // 有节点说明已经来过 cur 一次了，此时要断开 mostRight 的连接，即恢复到没有添加线索前
                    mostRight.right = null;
                }
            }
            // 当前节点往右子树移动
            cur = cur.right;
        }
    }
}
```

使用 Morris 遍历进行先序遍历：在到达一个节点的第一次进行操作即可：

```java
public static void morrisPre(Node head) {
    if (head == null) {
        return;
    }
    Node cur = head;
    Node mostRight = null;
    while (cur != null) {
        mostRight = cur.left;
        if (mostRight != null) {
            // 找到最右节点
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right;
            }
            // mostRight 此时就是 cur 上的最右的节点，如果这个节点的右节点为空，那么就要指向 cur
            if (mostRight.right == null) {
                // 先序遍历操作时机
                System.out.println(cur.value);
                mostRight.right = cur;
                // 当前节点往左子树上移动
                cur = cur.left;
                continue;
            } else {
                // 有节点说明已经来过 cur 一次了，此时要断开 mostRight 的连接，即恢复到没有添加线索前
                mostRight.right = null;
            }
        } else {
            // 先序遍历操作时机
            System.out.println(cur.value);
        }
        // 当前节点往右子树移动
        cur = cur.right;
    }
}
```

使用 Morris 遍历进行中序遍历：只能到达一次的节点，在到达时直接操作；能到达两次的节点，在第二次到达时进行操作：

```java
public static void morrisMid(Node head) {
    if (head == null) {
        return;
    }
    Node cur = head;
    Node mostRight = null;
    while (cur != null) {
        mostRight = cur.left;
        if (mostRight != null) {
            // 找到最右节点
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right;
            }
            // mostRight 此时就是 cur 上的最右的节点，如果这个节点的右节点为空，那么就要指向 cur
            if (mostRight.right == null) {
                mostRight.right = cur;
                // 当前节点往左子树上移动
                cur = cur.left;
                continue;
            } else {
                // 有节点说明已经来过 cur 一次了，此时要断开 mostRight 的连接，即恢复到没有添加线索前
                mostRight.right = null;
            }
        }
        // 中序遍历操作时机
        System.out.println(cur.value);
        // 当前节点往右子树移动
        cur = cur.right;
    }
}
```

使用 Morris 遍历进行后序遍历：由于任意一个节点都不能第三次回到自己，所以需要特殊的处理，这里的处理是：只在能回到自己两次的节点，且在第二次回到自己的时候进行操作，操作必须遵循：在没有到达最后一步时，逆序打印左子树的右边界；在到达最后一步时，单独逆序打印整个树的右边界

```java
public static void morrisPost(Node head) {
    if (head == null) {
        return;
    }
    Node cur = head;
    Node mostRight = null;
    while (cur != null) {
        mostRight = cur.left;
        if (mostRight != null) {
            // 找到最右节点
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right;
            }
            // mostRight 此时就是 cur 上的最右的节点，如果这个节点的右节点为空，那么就要指向 cur
            if (mostRight.right == null) {
                mostRight.right = cur;
                // 当前节点往左子树上移动
                cur = cur.left;
                continue;
            } else {
                // 有节点说明已经来过 cur 一次了，此时要断开 mostRight 的连接，即恢复到没有添加线索前
                mostRight.right = null;
                // 后序遍历的操作时机，逆序打印左子树的右边界
                printEdge(cur.left);
            }
        }
        // 当前节点往右子树移动
        cur = cur.right;
    }
    // 后序遍历的操作时机，单独逆序打印整个树的右边界
    printEdge(head);
}

/**
 * 逆序打印以 x 为头的树的有边界
 */
public static void printEdge(Node x) {
    Node tail = reverseEdge(x);
    Node cur = tail;
    while (cur != null) {
        // 后续遍历的操作时机
        System.out.println(cur.value);
        cur = cur.right;
    }
    // 还原整个二叉树
    reverseEdge(tail);
}

/**
 * 反转单链表
 */
private static Node reverseEdge(Node from) {
    Node pre = null;
    Node next = null;
    while (from != null) {
        next = from.right;
        from.right = pre;
        pre = from;
        from = next;
    }
    return pre;
}
```



<br/>

### 二叉树的最大深度

```java
/**
 * 二叉树的最大深度
 * 深度优先遍历，自定向下
 * 时间复杂度：O(N)
 * 空间复杂度：O(height)
 */
class MaxDepth {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return maxDepth(root, 0);
    }

    public int maxDepth(TreeNode root, int deep) {
        if (root == null) {
            return deep;
        }
        int left = maxDepth(root.left, deep + 1);
        int right = maxDepth(root.right, deep + 1);
        return Math.max(left, right);
    }
}
```

```java
/**
 * 深度优先遍历，自底向上
 * 时间复杂度：O(N)
 * 空间复杂度：O(height)
 */
class MaxDepth {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return Math.max(left, right) + 1;
    }
}

```

```java
/**
 * 广度优先遍历
 * 时间复杂度：O(N)
 * 空间复杂度：O(N)
 */
class MaxDepth {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.add(root);
        int res = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                root = queue.poll();
                if (root.left != null) {
                    queue.add(root.left);
                }
                if (root.right != null) {
                    queue.add(root.right);
                }
            }
            res++;
        }
        return res;
    }
}
```



<br/>

### 满二叉树/完全二叉树

![满二叉树与完全二叉树](C:\MyDisk\B-Data\Excalidraw\算法\二叉树\满二叉树与完全二叉树.png)

- 一棵深度为 k 且有 `2^k-1` 个结点的二叉树称为满二叉树。

- 根据二叉树的性质，满二叉树每一层的结点个数都达到了最大值, 即满二叉树的第 `i` 层上有 `2^{i-1}` 个结点 ( i ≥1) 

- 如果对满二叉树的结点进行编号，约定编号从根结点起, 自上而下, 自左而右。则深度为 k 的, 有 n 个结点的二叉树, 当且仅当其每一个结点都与深度为k的满二叉树中编号从1至n的结点一一对应时, 称之为完全二叉树

- 从满二叉树和完全二叉树的定义可以看出，满二叉树是完全二叉树的特殊形态，即如果一棵二叉树是满二叉树, 则它必定是完全二叉树

**完全二叉树宽度优先遍历：**

- 任一结点，有右无左返回 false

- 满足第一个条件下，如果遇到了第一个左右不双全的情况，那么接下来遇到的所有结点都必须是叶节点，否则返回 false

```java
 
    Node r;
    queue.add(head);
    while(!queue.isEmpty()) {
        head = queue.poll();
        l = head.left;
        r = head.right;
        // 第一个判断就是上面的两个条件
        if ((l == null && right != null) || (leaf && (l != null && r != null))) {
            return false;
        }
        if (head.left != null) {
            queue.add(l);
        }
        if (head.right != null) {
            queue.add(r);
        }
        if (l == null && r == null) {
            leaf = true;
        }
    }
    return true;
}

```



<br/>


### 大/小根堆

最大堆，又称大根堆（大顶堆）是指根结点（亦称为堆顶）的关键字是堆里所有结点关键字中最大者，属于二叉堆的两种形式之一

要求：① 根节点的关键字既大于或等于左子树的关键字值，又大于或等于右子树的关键字值；② 为完全二叉树



<br/>

### 搜索二叉树

> 使用中序遍历一颗二叉树，若是升序则一定是搜索二叉树

二叉搜索树（BTS）是二叉树的一中特殊形式：

- 二叉搜索树中的每个节点中的值必须「大于或等于」存储在其「左侧子树」中的任何值
- 二叉搜索树中的每个节点中的值必须「小于或等于」存储在其「右侧子树」中的任何值

```java
public static boolean preValue = Integer.MIN_VALUE;
public static boolean checkBST(Node head) {
    if (head == null) {
        return true;
    }
    boolean isLeftBST = checkBST(head.left);
    // 中序遍历的打印时机就是比较的时机
    if (!isLeftBST) {
    	return false;
    }
    if (head.value <= preValue) {
      return false;  
    } else {
      preValue = head.value;
    }
    return checkBST(head.right);
}
```



<br/>

### 平衡二叉树

> 平衡二叉树是二叉搜索树的特殊表现形式，旨在提高二叉搜索树的性能

**相关的术语：**

- 节点深度：从树的「根节点」到「该节点」的「边数」
- 节点高度：「该节点」和「叶节点」之间最长路径上的「边数」
- 树的高度：树的「根节点」的高度



**什么是高度平衡的二叉搜索树：**

- 平衡二叉树又称为高度平衡的「搜索二叉树」
- 平衡二叉树再「插入」和「删除」任何节点之后，可以自动保持「高度最小」
- 如果该平衡二叉树有 N 个节点，那么他的高度是 logN
- 平衡二叉树的每个节点的两个「子树」的高度相差不会超过 1



**验证平衡二叉树：**

- 可以通过计算「节点总数」和树的「高度」以确定是否平衡
- 还可以通过验证每个节点的子树高度是否超过 1 来递归检验是否平衡



**实现平衡二叉树的目标：**

- 使用的数据结构应该满足「二分查找」和「高度平衡」
- 采用的数据结构应该支持二叉搜索树的基本操作，包括在 O(logN) 时间内完成「搜索」、「插入」、「删除」



**常见的平衡二叉树实现：**

- 红黑树
- AVL 树
- 伸展树
- 树堆

```java
/*
	递归套路（前提是每一个分支都可以视为同一个，即进行的操作都是一样的）：
	1. 一个函数调用递归函数
	2. 封装一个包含全部需要获取的属性的内部类
    3. 使用黑盒以及拆黑盒
*/
class ReturnType{
    public boolean isBalance;
    public int height;
    
    public ReturnTpye(boolean isBalance, int height) {
        this.isBalance = isBalance;
        this.height = height;
    }
}

public static boolean isBalance(Node head) {
    return process(head).isBalance;
}

public static ReturnType process(Node head) {
    if (head == null) {
        return new ReturnType(true, 0);
    }
    // 默认左右递归都是可以返回信息的黑盒，具体操作在下面进行，因为不管哪个递归操作都是一样的
    ReturnType left = process(head.left);
    ReturnType right = process(head.right);
    // 开始进行具体的操作
    // 得到整颗树的高度
    int height = Math.max(left.height, right.height) + 1;
    int boolean isBalance = left.isBalance && right.isBalance 
        && Math.abs(left.height - right.height) < 2;
    return new ReturnType(isBalance, height);
}
```



<br/>

### 递归套路

> 递归套路可以解决大多数树形 dp 的问题

##### 套路解搜索二叉树

```java
/*
	递归套路（前提是每一个分支都可以视为同一个，即进行的操作都是一样的）：
	1. 一个函数调用递归函数
	2. 封装一个包含全部需要获取的属性的内部类
    3. 使用黑盒以及拆黑盒
*/
public class ReturnType{
    int min;
    int max;
    boolean isBST;
    
    public ReturnType(int min, int max, boolean isBST) {
        this.min = min;
        this.max = max;
        this.isBST = isBST;
    }
}

public static boolean isBST(Node x) {
    return process(x).isBST;
}

public static ReturnType process(Node x) {
    if (x == null) {
        // 因为为空时 min 和 max 返回什么都不合适，所以返回空，在下面的过程判断就行
        return null;
    }
    // 使用黑盒
    ReturnType left = process(x.left);
    ReturnType right = process(x.right);
    
    // 拆黑盒
    int min = x.value;
    int max = x.value;
    if (x.left != null) {
        min = Math.min(min, left.min);
        max = Math.min(max, left.max);
    }
    if (x.right != null) {
        min = Math.min(min, right.min);
        max = Math.min(max, right.max);
    }
    boolean isBST = true;
    if (left != null && (!left.isBST || left.max => x.max)) {
        isBST = false;
    }
    if (right != null && (!right.isBST || x.max >= right.max)) {
        isBST = false;
    }
    return new ReturnType(min, max, isBST);
}
```



<br/>

##### 套路解满二叉树

```java
public class RrturnType {
	int nodes;
    int height;
    
    public ReturnType(int nodes, int height) {
    	this.nodes = nodes;
        this.height = height;
    }
}

public static boolean isFull(Node x) {
    if (x == null) {
        return true;
    }
    ReturnType data = process(x);
    return data.nodes = (1 << data.height - 1);
}

public static ReturnType process(Node x) {
    if (x == null) {
        return new ReturnType(0, 0);
    }
    ReturnType left = process(x.left);
    ReturnType right = process(x.right);
    int height = Math.max(left.height, right.height) + 1;
    int nodes left.nodes + right.nodes + 1;
    return new ReturnType(nodes, height);
}
```



<br/>

### 最低公共祖先

```java
/*
	这个案例的代码有点抽象
	代码很精妙，用最少的代码覆盖了全部情况
	所以最好画图理解
	类似下面的这种 code 一定是做了很多优化才最终演变成这种难以理解的形式的，所以需要不断复习
*/
public static Node lowestAncestor(Node head, Node o1, Node 02) {
    // o1 和 o2 其中一个是另外一个的父节点的情况，但这样说不完全对，因为拆黑盒的时候还会用上，所以要画图理解
    if (head == null || head == o1 || head == o2) {
        return head;
    }
    // 除上面以外的情况
    // 使用黑盒
    Node l = lowestAncestor(head.left, o1, o2);
    Ndoe r = lowestAncestor(head.right, o1, o2);
    // 两个结点都不为空，此时的 head 就是他们的最低公共祖先
    // 虽然下面的代码看似没做什么操作，但是实际上是遍历左右分支时，不断将 o1 与 o2 本身不断返回直到汇聚到一点上，这一点就是需要求得的结点
    if (l != null && r != null) {
        return head;
    }
    // 两棵树并不都有返回值，将有返回值的一个返回
    return left != null ? left : right;
}
```



<br/>

### 寻找后继

```java
/*
	后继就是用中序遍历后得到的结点的后一个结点，注意，后继不只是左孩子的父节点，画图分析
	本题可以用中序遍历直接得到，但是时间复杂度为 o(n)
	此时，若是 Node 有一个指向父节点的指针，那么此时为 o(k)，即直接从结点出发寻找后继
	这题在理解的时候很容易想反，所以最好是画图理解
*/
public class Node {
    int value;
    Node left;
    Node right;
    Node parent;
    public Node(int value) {
        this.value = value;
    }
}

public static Node getSuccessorNode(Node node) {
    if (node == null) {
        return node;
    }
    // 如果有右子树，那么就得到右子树的最左结点
    if (node.right != null) {
        return getMostLeft(node.right);
    } else { // 没有右子树的情况
        Node parent = node.parent;
        // 当 node 不是其 parent 的左节点时，parent 就不是 node 的后继
        // 当 parent 为 null 时，说明一开始丢进来的 node 是整棵树最右的结点，此时这个结点没有后继，返回 null
        while (parent.left != node && parent != null) {
        	// 当 node 是其 parent 的右孩子时，不断地往上寻找 node 的后继
            node = parent;
            parent = node.parent;
        }
        // 一旦发现 node 变成了 parent 的左孩子，就说明 parent 就是需要得到的后继
        // 一旦发现 parent 为空，则说明 node 是整颗树最右的孩子，没有后继，依旧是返回 parent，即 null
        return parent;
    }
}

// 得到右子树的最左结点
public static Node getMostLeft(Node node) {
    if (node == null) {
        return node;
    }
    while (node.left != null) {
        node = node.left;
    }
    return node;
}
```



<br/>

### 序列化与反序列化

```java
// 这个题目使用先序遍历就可以及其简单地实现
public static String serialByPre(Node head) {
	if (head == null) {
        return "#_";
    }
    String res = head.value + "_";
    res += serialByPre(head.left);
    res += serialByPre(head.right);
    return res;
}

// 将字符串里的内容放进队列中，这一步可以简化下面反序列化的递归操作
public static Node reconPreOrder(String perStr) {
    String[] values = preStr.split("_");
    Queue<String> queue = new Queue<String>();
    for (int i = 0; i < values.length; i++) {
		queue.add(value[i]);
    }
    return reconPreOrder(queue);
}

// 反序列化，依旧使用先序遍历
public static Node reconPreOrder(Queue<String> queue) {
	String value = queue.poll();
    if (value.equals"#") {
        return null;
    }
    Node head = new Node(Integer.valueOf(value));
    head.left = reconPreOrder(queue);
    head.right = reconPreOrder(queue);
    return head;
}
```



<br/>

### 打印纸条凹凸情况

```java
// 在一颗并不存在的二叉树上做中序遍历即可
public static void printAllFolds(int N) {
    printProcess(1, N, true);
}

// 其中直接用 down 表示凹折痕（true），这就是可以用一颗不存在的二叉树的原因
public static void printProcess(int i, int N, boolean down) {
	// 如果超出了所给的层数 N，那么直接返回
    if (i > N ) {
        return;
    }
    // 左孩子全是凹折痕，设为 true
   	printProcess(i + 1, N, true)
    System.out.println(down ? "凹" : "凸");
    // 右孩子全是凸折痕，设为 false
    printProcess(i + 1, N, false);
}
```



<br/>

## 5.前缀树

```java
/*
	前缀树实现
*/
class TrieNode {
	public int pass;
    public int end;
    public TrieNode[] nexts;
    
    public TrieNode() {
        this.pass = 0;
    	this.end = 0;
        /*
        	TrieNode[0] == null --> 没有走向 'a' 的路
        	TrieNode[0] != null --> 有走向 'a' 的路
        	...
        	TrieNode[25] != null --> 有走向 'z' 的路
        */
        this.nexts = new TrieNode[26];
    }
}

class Trie {
    private TrieNode root;
    
    public Trie() {
        this.root = new TrieNode();
    }
    
    // 增加单词
    public void insert(String word) {
        if (word == null) {
            return;
        }
        
        // 将字符串转换成字符数组
        char[] chars = word.toCharArray();
        TrieNode node = root;
        node.pass++;
        int index = 0;
        for (int i = 0; i < chars.length; i++) {
            index = chars[i] - 'a';
            // 如果没有走向 chars[i] 的路，就新建出来
            if (root.nexts[index] == null) {
                root.nexts[index] = new TrieNode();
            }
            // 指针指向下一个
            node = root.nexts[index];
            node.pass++;
        }
        // 单词结尾，end++
        node.end++;
    }
    
    // 查询单词被加入过几次
    public int search(String word) {
        if (word == null) {
            return 0;
        }
        char[] chars = word.toCharArray();
        TrieNode node = root;
        int index = 0;
        for (int i = 0; i < chars.length; i++) {
            index = chars[i] - 'a';
            if (node.nexts[index] == null) {
                return 0;
            }
            // 如果存在路，向下走
            node = node.nexts[index];
        }
        // 走到结尾后，将此时 node 的 end 值返回就得到这个单词加入过几次
        return node.end;
    }
    
    // 查看有多少个单词是以 pre 这个字符串为前缀的
    public int preFixNumber(String pre) {
        if (pre == null) {
            return 0;
        }
        char[] chars = pre.toCharArray();
        TrieNode node = root;
        int index = 0;
        for (int i = 0; i < chars.length; i++) {
            index = chars[i] - 'a';
            if (node.nexts[index] == null) {
                return 0;
            }
            // 如果存在路，向下走
            node = node.nexts[index];
        }
        // 走到结尾后，将此时 node 的 end 值返回就得到这个单词加入过几次
        return node.pass;
    }
    
    // 删除单词
    public void delete(String word) {
        if (search(word) != 0) {
        	char[] chars = word.toCharArray();
            TrieNode node = root;
            node.pass--;
            int index = 0;
            for (int i = 0; i < chars.length; i++) {
                index = chars[i] - 'a';
                // 如果某一结点的 pass 变成了 0 
                if (--node.nexts[index].pass == 0) {
                    // 说明此结点之后的所有信息都没用了，直接标记为空
                    node.nexts[index] = null;
                    // 删除完成直接返回
                    return;
                }
                // 往下走一步，上一步判断时已经将 pass-- 了
                node = node.nexts[index];
            }
            // 沿途的 pass 都减一后，把 end 也减一
            node.end--;
        }
    } 
}
```



<br/>

## 6.图

- 邻接表法

- 领接矩阵法

```java
/*
	下面的结构可以视为最基础的结构
	其他不同的表示图的结构都可以转化成下面的基础结构
	这样做的好处是用下面的结构实现了一个算法后
	遇到新的结构时不用重新设计一个算法
*/
// 临接矩阵
class Graph {
    // 点集
	public HashMap<Integer, Node> nodes;
    // 边集
    public HashSet<Edge> edges;
    
    public Graph() {
        this.nodes = new HashMap<>();
        this.edges = new HashSet<>();
    }
}

// 图中的点
class Node {
	// 值
    int value;
    // 入度
    public int in;
    // 出度
    public int out;
    // 直接临接点
    public ArrayList<Node> nexts;
	// 直接临接边
    public ArrayList<Edge> edges;
    
    public Node(int value) {
        this.value = value;
        this.in = 0;
        this.out = 0;
        this.nexts = new ArrayList<>();
        this.edges = new ArrayList<>();
    }
}

// 图中的边
class Edge {
    public int weight;
    public Node from;
    public Node to;
    
    public Edge(int weight, Node from, Node to) {
		this.weight = weight;
        this.from = from;
        this.to = to;
    }
}
```



<br/>

### 6.1 图的宽度优先遍历

```java
/*
	图的深度优先遍历就是：
	对于每一个点，打印其本身，保证点不重复打印的前提下，再打印该点所有的临接点
*/
public static void bfs(Node node) {
    if (node == null) {
		return;
    }
    // 准备一个队列，用于遍历图
    Queue<Node> queue = new LinkedList<>();
    // 准备一个 Set，作为注册表，保证图里的每一个点都不会被重复遍历
    HashSet<Node> set = new HashSet<>();
    // 将 node 放进 queue
    queue.add(node);
    // 将 node 进行注册
    set.add(node);
    while (!queue.isEmpty) {
        Node cur = queue.poll();
        System.out.println(cur.value);
    	for (Node next : cur.nexts) {
            if (!set.contains(next)) {
				queue.add(next);
                set.add(next);
            }
        }
    }
}
```



<br/>

#### 6.2 图的深度优先遍历

```java
/*
	深度优先遍历会沿着一个点延伸出的一条路线遍历，完成后再遍历其他的路线
	下面的代码最好是画图理解
*/
public static void dfs(Node node) {
	if (node == node) {
        return;
    }
	// 准备一个 Stack 遍历图
    Stack<Node> stack = new Stack<>();
    // 准备一个 Set 注册点
    HashSet<Node> set = new HashSet<>();
   	// 将 node 放进 stack
    stack.push(node);
    // 将 node 放进 set 注册
    set.add(node);
    // 打印 node 
    System.out.println(node.value);
    while (!stack.isEmpty) {
		Node cur = stack.pop();
        for (Node next : cur.nexts) {
            if (!set.contains(cur)) {
				stack.push(cur);
                stack.push(next);
                set.add(next);
                System.out.println(next.value);
                break;
            }
        }
    }
}
```



<br/>

#### 6.3 图的拓扑排序

```java
public static List<Node> sortedTopology(Graph graph) {
    // key 是某一个 node，value 是 node 的入度
    HashMap<Node, Integer> inMap = new HaspMap<>();
    // 入度为 0 的 node 才能进这个队列
    Queue<Node> zeroInQueue = new LinkedList<>();
    for(Node node : graph.nodes.values()) {
		inMap.put(node, node.in);
        if (node.in == 0) {
            zeroInQueue.add(node);
        }
    }
    // 拓扑排序的结果依次加入 result 中
    List<Node> result = new ArrayList<>();
    while(!zeroInQueue.isEmpty) {
		Node cur = zeroInQueue.poll();
        result.add(cur);
        for (Node next : cur.nexts) {
            inMap.put(next, inMap.get(next) - 1);
            if (inMap.get(next) == 0) {
                zeroInQueue.add(next);
            }
        }
    }
    return result;
}
```



<br/>

#### 6.4 关于无向图的算法

##### Kruskal 算法:

```java
/*
	Kruskal 算法生成最小生成树
	这是一个考察边的算法
*/
public static Set<Edge> KruskalMST(Graph graph) {
	// 并查集，实现可以自行查找，只有判断是否有环和合并集合的两个功能
    UnionFind unionFind = new UnionFind();
    // 将所有的点都放进只存在它自身的集合中
    unionFind.makeSets(graph.nodes.values);
    // 创建一个以边为排序依据的堆
    PriorityQueue<Edge> priorityQueue = new PriorityQueue<>(new EdgeComparator);
    // 将 edge 放进堆里
    for(Edge edge : graph.edges) {
		prioityQueue.add(edge);
    }
    // 存储结果的边集
    Set<Edge> result = new HashSet<>();
    while(!prioityQueue.isEmpty) {
        Edge edge = prioityQueue.poll();
        // 如果 edge 这个边的两个点不在同一个集合里，说明还没有形成一个环
        if (!unionFind.isSameSet(edge.from, edge.to)) {
            resule.add(edge);
            unionFind.union(edge.from, edge.to);
        }
    }
    return result;
}
```



<br/>

##### Prim 算法

```java
/*
	Prim 算法生成最小生成树
	这是一个考察点的算法
*/
public static Set<Edge> primMST(Graph graph) {
    // 解锁的边放进小根堆中
    PrioityQueue<Edge> prioityQueue = new PrioityQueue<>(new EdgeComparator);
	// 点集
    HashSet<Node> set = new HashSet();
    // 边集，结果集
    Set<Edge> result = new HashSet();
    // 处理森林，倘若连同则不需要这个循环
    for (Node node : graph.nodes.values) {
        // node 是任意的一个起始点
        // 如果集合里没有这个 node
        if (!set.contains(node)) {
            // 集合里加入这个 node
            set.add(node);
            // 由这个点出发，解锁所有的临接边，放进小根堆里
            for (Edge edge : node.edges) {
                prioityQueue.add(edge);
            }
            // 当小跟堆不为空时
            while (!prioityQueue.isEmpty) {
            	// 弹出解锁的边中最小的边
                Edge edge = prioityQueue.poll();
                // 可能的一个心的点
                Node toNode = edge.to;
                // 不含有则这个点就是新的点
                if (!set.contains(toNode)) {
                    // 点集里加入这个 toNode
                    set.add(toNode);
                    // 结果集中加入对应的最小边
                    result.add(edge);
                    // 再把新点周围的临接边解锁，放入小根堆里
                    // 这一步有可能将一个边重复放入，但是不会改变时间复杂度的等级，只会增加一点常数时间
                   	for (Edge edge : toNode.nexts) {
                        prioityQueue.add(edge);
                    }
                }
            }
            return result;
        }
    }
}

```



<br/>

##### Dijkstra 算法

```java
/*
	算出某一个出发点，到任意一点的路径的最小权重和
	适用范围：可以出现有负数边，但是不可以有权值累加和为负数的环
*/
public static HashMap<Node, Integer> dijkstra(Node head) {
    // 从 head 出发到任意点的最小距离
    // key : 从 head 出发到达的 key
    // value : 从 head 出发到达 key 的最小距离
    // 如果表中没有到一个 key 的记录，那么表示这个点到 head 的距离是正无穷
    HashMap<Node, Integer> distanceMap = new HashMap<>();
    // 放入起始结点
    distanceMap.put(head, 0);
	// 将已经求过距离的结点放在 selectedNodes 中，之后再也不改变其值
    HashSet<Node> selectedNodes = new HashSet<>();
    // 选取一个 distanceMop 中距离最小的 node，放进 minNode 中
    Node minNode = getMinDistanceAndUnselectedNode(distanceMap, selectedNodes);
	// 当得到的距离最小的点不为 null 时
    while (minNode != null) {
        int distance = distanceMap.get(minNode);
        // 遍历 minNode 的临接边
        for (Edge edge : minNodes.edges) {
        	// 得到边对应的终止结点
            Node toNode = edge.to;
            // 如果 distanceMap 不包含这个结点，那么把它放进去
            if (!distanceMap.containsKey(toNode)) {
                distanceMap.put(toNode, diatance + edge.wight);
            }
            // 如果已经存在于 distanceMap 中，则将更新后的最小距离赋给 toNode 所在的边
            distanceMap.put(edge.to, Math.min(distanceMap.get(toNode), distance + edge.weight);
        }
        // 将处理完的点放进 selectedNodes 中
        selectedNodes.add(minNode);
        // 进入下一轮循环前把 minNode 更新
        minNode = getMinDistanceAndUnselectedNode(distanceMap, selectedNodes);
    }
    return distanceMap;
}

public static Node getMinDistanceAndUnselectedNode(HashMap<Node, Integer> distanceMap, HashSet<Node> selectedNodes) {
    Node minNode = null;
    int minDistance = Integer.MAX_VALUE;
    for (Entry<Node, Integer> entry : distanceMap.entrySet()) {
        Node node = entry.getKey();
        int distance = entry.getValue();
        // 如果被锁定的点没有再 selectedNodes 中
        if (!selectedNodes.contains(node) && distance < minDistance) {
            minNode = node;
            minDistance = distance;
        }
    }
    return minNode;
}
```



<br/>

## 7.队列

**队列可以分为四种类型：**普通队列、循环队列、优先级队列、双端队列，如下所示：

<img src="C:\MyDisk\C-Photos\Code\Java\Queue\simple-queue_0.png" alt="simple-queue_0" style="zoom:50%;" />

<img src="C:\MyDisk\C-Photos\Code\Java\Queue\circular-queue.png" alt="circular-queue" style="zoom:50%;" />

<img src="C:\MyDisk\C-Photos\Code\Java\Queue\priority-queue.png" alt="priority-queue" style="zoom: 50%;" />

<img src="C:\MyDisk\C-Photos\Code\Java\Queue\double-ended-queue.png" alt="double-ended-queue" style="zoom:50%;" />

**循环队列：**

可以使用数组实现（最简单），增删的时间复杂度都是 O(1)

可以用作：

- CPU scheduling
- Memory management
- Traffic Management



**优先级队列：**

优先级队列的实现方式可以有：

- 数组
- 链表
- 大/小顶堆（通常会使用堆）
- 二叉树

| 实现方式 |  peek  |   insert   |   delete   |
| :------: | :----: | :--------: | :--------: |
|   链表   | `O(1)` |   `O(n)`   |   `O(1)`   |
|    堆    | `O(1)` | `O(log n)` | `O(log n)` |
|  二叉树  | `O(1)` | `O(log n)` | `O(log n)` |

可以用作：

- Dijkstra's algorithm
- for implementing stack
- for load balancing and interrupt handling in an operating system
- for data compression in Huffman code



**双端队列**

双端队列一般也使用数组实现（也可以使用链表），增删的时间复杂度都是 O(1)

双端队列有两种类型：

- 输入受限：只允许从一端插入数据，但是允许从两端删除数据
- 输出受限：只允许从一端删除数据，但是允许从两端插入数据

可以用作：

1. In undo operations on software.
2. To store history in browsers.
3. For implementing both [stacks](https://www.programiz.com/dsa/stack) and [queues](https://www.programiz.com/dsa/queue).



### 7.1 双端队列

- 给出一数组和一个窗口，窗口大小固定，每次移动一格，找出每次的最大值

- 使用双端队列实现，能把时间复杂度降至 o(n) 
- 双端队列维持的状态就是由头至尾数字的大小依次减小
- 数组大小为 n ，窗口大小为 w ，那么最后每次窗口最大值的数量就是 n - w + 1
- 将每个最大值放进数组中返回

```java
public static int[] getMaxArrFromWindow(int[] arr, int w) {
    if (arr == null || w < 1 || arr.length < w) {
        return null;
    }
    // 使用链表模拟双端队列
    LinkedList<Integer> qMax = new LinkedList<Integer>();
    int[] result = new int[arr.length - w + 1];
    int index = 0;
    for (int i = 0; i < arr.length; i++) {
        // 更新双端队列的状态
    	while (!qMax.isEmpty() && arr.peekLast() <= arr[i]) {
            qMax.pollLast();
        }
        // 将所有小于 arr[i] 的值从尾部弹出后加入 arr[i] 的下标
        qMax.addLast(i);
        // 过期的值从头部弹出
        if (qMax.peekFirst() == i - w) {
            qMax.pollFirst();
        }
        // 窗口形成后将最大值放到数组中
        if (i >= w - 1) {
        	result[index++] = arr[qMax.peekFirst()];
        }
    }
    return result;
}
```

<br/>



---



<br/>

# 基础排序

![排序算法的时空复杂度比较](C:\MyDisk\B-Data\Excalidraw\算法\基础排序\排序算法的时空复杂度比较.png)

**到目前为止：**

- 基于比较的	排序，时间复杂度无法做到 O(n*log_2n) 以下

- 时间复杂度 O(n*log_2n) 的排序，空间复杂度在 O(n) 以下时，无法做到稳定 

**各个排序时空复杂度：**

注：稳定性是指排序后相同的元素能否保持原本的顺。下面的 K 指的是桶的数量

| 序号 | 排序方法名     | 时间复杂度     | 空间复杂度 | 稳定性 |
| ---- | -------------- | -------------- | ---------- | ------ |
| 1    | 选择排序       | O(n^2)         | O(1)       | 不稳定 |
| 2    | 冒泡排序       | O(n^2)         | O(1)       | 稳定   |
| 3    | 插入排序       | O(n) ~  o(n^2​) | O(1)       | 稳定   |
| 4    | 快速排序 (3.0) | O(n*log_2n​​)    | O(log_2n​)  | 不稳定 |
| 5    | 归并排序       | O(n*log_2n)    | O(n)       | 稳定   |
| 6    | 堆排序         | O(n*log_2n​)    | O(1)       | 不稳定 |
| 7    | 基数排序       | O(n*log_2n​)    | O(n)       | 稳定   |
| 8    | 希尔排序       | O(n*log_2n​)    | O(1)       | 不稳定 |
| 9    | 计数排序       | O(n + k)       | O(k)       | 稳定   |
| 10   | 桶排序         | O(n^2)         | O(n + k)   | 稳定   |

注：快速排序最快，但是不稳定也消耗空间；堆排不消耗空间但是较慢；归并消耗空间但是稳定



<br/>

### 1.1 选择排序

```java
public static void select(int[] arr) {
    int len = arr.length;
 	if (arr == null || len < 2){
        return;
    }
    for (int i = 0; i < len - 1; i++) {
        int min = i;
        for (int j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min != i) {
            Common.swap(arr, min, i);
        }
    }
}
```



<br/>

### 1.2 冒泡排序

**算法描述：**

- 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
- 针对所有的元素重复以上的步骤，除了最后一个；
- 重复步骤1~3，直到排序完成。

![img](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015223238449-2146169197.gif)

```java
public static void bubble(int[] arr) {
    int len = arr.length;
    if (arr == null || len < 2){
        return;
    }
    for (int i = 0; i < len - 1; i++) {
        for (int j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                Common.swap(arr, j, j + 1);
            }
        }
    }
}
```



<br/>

### 1.3 插入排序

```java
public static void insert(int[] arr){
    int len = arr.length;
    if (arr == null || len < 2){
        return;
    }

    for (int i = 1; i < len; i++) {
        for (int j = i - 1; j >= 0 && arr[j] > arr[j+1]; j--){
            swap(arr, j, j+1);
        }
    }
}

public static void swap(int[] arr, int i, int j){
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```



<br/>

### 1.4 归并排序

```java
public static void merger(int[] arr, int l, int r){
    if (l == r) {
        return;
    }
    int mid = l + ((r - l) >> 1);
    merger(arr, l, mid);
    merger(arr, mid+1, r);
    combine(arr, l, mid, r);
}

public static void combine(int[] arr, int l, int mid, int r) {
    int[] helpArr = new int[r - l + 1];
    int p = 0;
    int p1 = l;
    int p2 = mid + 1;
    while(p1 <= mid && p2 <= r){
        helpArr[p++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
    }
    while (p1 <= mid) {
        helpArr[p++] = arr[p1++];
    }
    while (p2 <= r) {
        helpArr[p++] = arr[p2++];
    }
    for (int i = 0; i < helpArr.length; i++) {
        arr[l + i] = helpArr[i];
    }
}
```



<br/>

### 1.5 快速排序

**代码（3.0 版 随机取值做划分）：**

```java
public static void quick(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    quick(arr, 0, arr.length - 1);
}

public static void quick(int[] arr, int l, int r) {
    if (l < r) {
        // 随机选出一个数放在最右边
        Common.swap(arr, (l + (int)(Math.random() * (r - l +1))), r);
        // 得到相同数字区域的下标，这是一个固定长度为2的数组
        int[] p = partition(arr, l, r);
        // 左边区域开始递归
        quick(arr, l, p[0] - 1);
        // 右边区域开始递归
        quick(arr, p[1] + 1, r);
    }
}

private static int[] partition(int[] arr, int l, int r) {
    // 小于区域右边界
    int less = l - 1
    // 大于区域左边界，不用+1是因为最后一位数不在比较范围内
    int more = r;
    // 当小于指针不越过大于区域左边界时
    while(l < more) {
        // arr[r]是用于比较的值，小于时放在小于区域
        // less 永远比 l 小 1，所以下边是让相邻两个数做交换
        if (arr[l] < arr[r]){
            // 如果小于，相当于执行了swap(arr, x, x)，即自己和自己交换，并且让 less 和 l 都向前移
            Common.swap(arr, ++less, l++);
            // 也可以写成下面的形式 
            // less++;
            // l++;
        } else if (arr[l] > arr[r]) {
            // 大于则交换，但是 l 不用前移，因为交换过来的数还不知道大小
            Common.swap(arr, --more, l);
        } else {
            // 等于直接跳过
            l++;
        }
    }
    // 最后需要将最右侧的数放到大于区域的左边界，保证下一次入栈后的过程一致
    Common.swap(arr, more, r);
    // 返回中间区域的左右下标
    return new int[]{ less+1, more };
}
```



<br/>

### 1.6 堆排序 

```java
public static void heapSort(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    for (int i = 0; i < arr.length; i++) {
        heapInsert(arr, i);
    }
    // 如果只是想单纯地让数组变成大跟堆，那么下面的方法较快
    // for (int i = arr.length - 1; i >= 0; i--) {
    // heapify(arr, i , arr.length);
    // }
    
    int heapSize  = arr.length;
    Common.swap(arr, 0, --heapSize);
    while (heapSize > 0) {
        heapify(arr, 0, heapSize);
        Common.swap(arr, 0, --heapSize);
    }
}

public static void heapInsert(int[] arr, int index) {
    while (arr[index] > arr[(index - 1) / 2]) {
        Common.swap(arr, index, (index - 1) / 2);
        index = (index - 1) / 2;
    }
}

public static void heapify(int[] arr, int index, int heapSize) {
    // 左孩子的下标
    int left = index * 2 + 1;
    while(left < heapSize) {
        // arr[left + 1] > arr[left] ? left + 1 : left 不能反过来
        int largest = left + 1 < heapSize && arr[left + 1] > arr[left]
                ? left + 1 : left;

        largest = arr[largest] > arr[index] ? largest : index;
        if (largest == index) {
            break;
        }
        Common.swap(arr, index, largest);
        index = largest;
        left = index * 2 + 1;
    }
}
```



<br/>

### 1.7 基数排序

注：基数排序是基于桶排序的，而桶排序是不基于比较的排序，不仅可用于数字的排序，这就使得桶排序需要根据数据状况设计，基数排序就是专门设计用于数字排序的，且比记数排序（也基于桶排序）好

```java
public static void radix(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    radix(arr, 0, arr.length - 1, getMaxDigit(arr));
}

private static int getMaxDigit(int[] arr) {
    int max = Integer.MIN_VALUE;
    for (int i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
    }
    int res = 0;
    // 数出最大的数一共有多少位
    while (max != 0) {
        res++;
        max /= 10;
    }
    return res;
}

// 传入 l 和 r 是为了指定排序的范围，增加灵活性
public static void radix(int[] arr, int l, int r, int digit) {
    // 为了优化代码，不会出现实际的“桶”，而是用记数表数组 count 和辅助数组 bucket 实现进出桶的操作
    final int radix = 10;
    int i = 0;
    int j = 0;
    // 有多少个数就准备多少空间
    int[] bucket = new int[r - l + 1];
    // 进出桶的总次数 / 2 为循环总数，因为进循环一次就完成了一次进出桶操作
    for (int d = 1; d <= digit; d++) {
        /*
         count 最初是记录一个数的某个位上数字相等的数有几个（词频）
         因为一个数某位上的数只能是 0 ~ 9 ，所以 count 固定长度为10，数组下标便是位数，数组内存放的是词频
         然后要将词频表转化成记录：某位上小于或等于 i 的数一共有几个，这是为方便存入 bucket 准备的
         因为这样一来，进出桶的操作就抽象成了两步完成：
         （1）找出一个数对应的词频，词频 - 1 便是存入 bucket 时对应的下标
         （2）count 中相应词频 - 1，因为词频表做了转换变成了小于等于的总次数，
         所以只需关注对应的词频就行，其他数不处理也不会有覆盖的问题
         完成上述两步之后就相当于完成了一次进出桶，比较抽象，不理解可以画图
         其中还有许多细节没有描述，例如进出桶顺序，这些点靠画图才好理解
         总之，下面的代码是经过优化的，比较抽象难懂，单纯看代码很难理解
         */
        // count 长度固定为10，count[i] 表示当前位（d位）是 i 的数字有多少个
        int[] count = new int[radix];
        // 统计词频
        for (i = l; i <= r; i++) {
            j = getDigit(arr[i], d);
            count[j]++;
        }
        // 词频转换成前缀和
        for (i = 1; i < radix; i++) {
            // 第一位（0位）不用加，所以从第二位（1位）开始
            count[i] = count[i] + count[i - 1];
        }
        // 从右往左取出数字放入 bucket 中，完成这步就相当于完成了一次进出桶操作
        for (i = r; i >= l; i--) {
            // 得到 d 位上的数字
            j = getDigit(arr[i], d);
            // 得到前缀和 count[j]，并将 arr[i] 上的数存入 bucket中
            bucket[count[j] - 1] = arr[i];
            // 最后相应的前缀和减1
            count[j]--;
        }
        // 将 bucket 中的数复制进 arr 里，以便进行下一组排序，直到整体排完需序为止
        for (i = l, j = 0; i < r; i++, j++) {
            arr[i] = bucket[j];
        }
    }

}

public static int getDigit(int num, int digit) {
    // 比如：15求个位数字，则 digit = 1，15 / 10 % 10 = 5
    return ((num /((int) Math.pow(10, digit - 1))) % 10);
}
```



<br/>

### 1.8 希尔排序

```java
public static void shell(int[] arr) {
    int len = arr.length;
    if (arr == null || len < 2) {
        return;
    }
    int gap = len / 2;
    while (gap > 0) {
        for (int i = gap; i < len; i++) {
            int temp = arr[i];
            int index = i - gap;
            while (index >= 0 && arr[index] > temp) {
                arr[index + gap] = arr[index];
                index -= gap;
            }
            arr[index + gap] = temp;
        }
        gap /= 2;
    }
}
```



<br/>

### 1.9 计数排序

```java
public static void count(int[] arr) {
    int len = arr.length;
    if (arr == null || len < 2) {
        return;
    }

    int max = arr[0], min = arr[0];
    for (int i = 0; i < len; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    int bias = 0 - min;
    int[] bucket = new int[max - min + 1];
    for (int i = 0; i < len; i++) {
        bucket[arr[i] + bias] += 1;
    }

    int index = 0;
    for (int i = 0; i < bucket.length; i++) {
        int length = bucket[i];
        while(length > 0) {
            arr[index++] = i - bias;
            length--;
        }
    }

}
```

<br/>



---



<br/>

# 基础查找(待补充)

**各个查找时空复杂度**

| 序号 | 查找方法名 | 时间复杂度 | 空间复杂度 |
| :--: | ---------- | ---------- | ---------- |
|  1   | 二分查找   | O(log_2n​)  | O(n)       |



### 1.二分查找

**还可以解决：**

在有序数组中，找出大于等于某个数的最左位置或小于等于某个数的最右位置

**二分查找框架：**

```java
int binarySearch(int[] nums, int target) {
    int left = 0, right = ...;
    while(...) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            ...
        } else if (nums[mid] < target) {
            left = ...
        } else if (nums[mid] > target) {
            right = ...
        }
    }
    return ...;
}
```

**基础二分查找：**

```java
int binarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1; // 注意
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target)
            return mid;
        else if (nums[mid] < target)
            left = mid + 1; // 注意
        else if (nums[mid] > target)
            right = mid - 1; // 注意
    }
    return -1;
}
```

**寻找左边界的二分查找：**

`left` 的含义是 `nums` 数组中小于 `target` 的数的个数

```java
int left_bound(int[] nums, int target) {
    if (nums.length == 0) return -1;
    int left = 0;
    int right = nums.length; // 注意
    while (left < right) { // 注意
        int mid = (left + right) / 2;
        if (nums[mid] == target) {
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid; // 注意
        }
    }
    if (left >= nums.length || nums[left] != target) {
        return -1;        
    }
    return left;
}

// 第二种写法
int left_bound(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    // 搜索区间为 [left, right]
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            // 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else if (nums[mid] > target) {
            // 搜索区间变为 [left, mid-1]
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 收缩右侧边界
            right = mid - 1;
        }
    }
    // 检查出界情况
    if (left >= nums.length || nums[left] != target) {
        return -1;        
    }
    return left;
}
```

`right` 的含义是 `nums` 数组中大于 `target` 的数的个数

```java
int right_bound(int[] nums, int target) {
    if (nums.length == 0) return -1;
    int left = 0, right = nums.length;
    while (left < right) {
        int mid = (left + right) / 2;
        if (nums[mid] == target) {
            left = mid + 1; // 注意
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid;
        }
    }
    if (left == 0) {
        return -1;
    }
	return nums[left - 1] == target ? (left - 1) : -1;
}

// 第二种写法
int right_bound(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 这⾥改成收缩左侧边界即可
            left = mid + 1;
        }
    }
    // 这⾥改为检查 right 越界的情况，⻅下图
    if (right < 0 || nums[right] != target) {
        return -1;        
    }
    return right;
}
```





### 2.斐波那契查找



### 3.插值查找



### 4.线性查找

<br/>



---



<br/>

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



---



<br/>

# 例题

### 1.递归类

#### 1.1 小和问题

```java
/*
小和问题：
给出一个组，对于其中任意一个数
计算出该数左侧小于该数的所有数的和
将所有和累加得到最终答案

思路：
（1）注意到：我们可以将获得每个数左边有几个小于该数转化成：从整体上看，计算每个数（num）参与计算的个数（times），那么每个数都会有对应的一个 num * times 值，将所有值累加就得到了“小和”
（2）注意到：如果用递归，每次入栈都将数组分为左右两组，那么就可以遍历对比左右两组的数数出 times 
此外如果保证右边的数是由小到大排序的，我们数次数就可以直接通过数下标的方式得到 times 在以上基础上，遍历时发现左组的数比右组小，那么就得到一个 num * times，后续合并左右两边数组，出栈并返回各个部分的“小和”
（3）和一般归并排序不同的是，在排序时，遇到左右相等的情况要先将右侧的数加到数组中，这样做是为了让右侧的指针后移，保证遍历过程既不重算也不漏算
*/

public static int smallSum(int[] arr) {
    if (arr == null || arr.length < 2) {
        return 0;
    }
    return process(arr, 0, arr.length - 1);
}


public static int process(int[] arr, int l, int r) {
    if (l == r) {
        return 0;
    }
    int mid = l + ((r - l) >> 1);

    // 先得到左边的值
    return process(arr, l, mid)
            // 再得到右边的值
            + process(arr, mid + 1, r)
            // 最终得到左右两边合并的值
            + merger(arr, l, mid, r);
}

private static int merger(int[] arr, int l, int mid, int r) {
    int len = r - l + 1;
    int[] helpArr = new int[len];
    int p = 0;
    int p1 = l;
    int p2 = mid + 1;
    int res = 0;
    while(p1 <= mid && p2 <= r) {
        res += arr[p1] < arr[p2] ? (r - p2 + 1) * arr[p1] : 0;
        helpArr[p++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
    }
    while(p1 <= mid){
        helpArr[p++] = arr[p1++];
    }
    while(p2 <= r){
        helpArr[p++] = arr[p2++];
    }
    for (int i = 0; i < len; i++) {
        arr[l + i] = helpArr[i];
    }
    return res;
}
```



<br/>

#### 1.2 反转单链表

```java
// 递归反转单链表，只需要传入链表的头节点
public static SingleNode reverseLinkedListByRecursion(SingleNode cur) {
    // 递归结束的条件：发现当前节点（最后一个节点）的下一个结点为空，直接把最后一个节点（新的头节点p）返回
    if (cur.next == null) {
        return cur;
    }

    // 创建一个节点传递新的头节点p,此处也是“递”的过程
    SingleNode p = reverseLinkedListByRecursion(cur.next);
    // “归”的过程
    // 使当前节点的下一个结点指向当前节点，这样就实现了指针反转，而且由于递归的特性，所以不需要保存节点位置信息
    cur.next.next = cur;
    // 此步不可省略，否则会出现死循环，因为省略这步到最后尾结点和倒数第二个结点会相互指向对方
    cur.next = null;
    return p;
}
```



<br/>

### 2.堆类

#### 2.1 几乎有序数组

```java
/*
    题目：
    给出一个几乎有序的数组，几乎有序指的是将数组排完序
    每个元素所要移动的距离小于 K
    K 是一个较小的数，且 K 可以作为一个参数传入

    思路：
    这是一个可以用小根堆实现的算法
    且可以用系统默认的小根堆 -> 优先队列
*/
public static void process(int[] arr, int k) {
    PriorityQueue<Integer> smallHeap = new PriorityQueue<>();
    int index = 0;
    for (; index <= Math.min(arr.length, k); index++) {
        smallHeap.add(arr[index]);
    }
    int i = 0;
    for (; index < arr.length; i++, index++) {
        smallHeap.add(arr[index]);
        arr[i] = smallHeap.poll();
    }
    while(!smallHeap.isEmpty()) {
        arr[i++] = smallHeap.poll();
    }
}
```



<br/>

#### 2.2 给出中位数

陆续输入数字，以较小的代价较快地给出中位数，利用大小根堆配合，维持堆顶是中位数就行



<br/>

### 3.迭代类

#### 3.1 反转单链表

```java
// 迭代反转法，只需要传入链表的头节点
public static SingleNode reverseLinkedList(SingleNode cur) {
    // 记录当前结点的前一个节点，而传进来的 cur 就是当前节点
    SingleNode pre = null;
    // 指向当前结点的下一个节点
    SingleNode next = null;

    while (cur != null) {
        // 存储当前节点的下一个节点的地址，因为下面的步骤会让 cur 与 cur.next 断开，所以必须把 cur.next 的地址记录下来
        next = cur.next;
        // 让当前节点指向前一个节点
        cur.next = pre;
        // 让 pre 向前移动一位
        pre = cur;
        // 让 cur 当前节点向前移动一位
        cur = next;
    }
    // 完成上述操作使得指针方向反转，此时 pre 位于原链表的最后一个节点，至此反转完成
    return pre;
}
```

<br/>



---



<br/>

# 其他

## 位运算

- 与：&
- 或：|
- 非：~
- 异或：^



<br/>

### 异或

**二进制，异或的性质**

0 ^ N = N; 

N ^ N = 0;

异或运算满足：结合律、交换律（与顺序无关，可以用无进位相加理解）

**二进制，无进位相加表格理解**

|  a   |  b   |  c   | result |
| :--: | :--: | :--: | :----: |
|  1   |  0   |  1   |   0    |
|  1   |  1   |  1   |   1    |
|  1   |  0   |  0   |   1    |

```java
int a = 1;
int b = 2;

// 大前提：a 和 b 的值可以一样，但是分别指向的内存是不同的
// 因为本质上是内存地址进行了交换，如果地址一样则异或成0
// 两数交换，无需额外空间，且由于是位运算，所以速度较快
a = a ^ b; // a = a ^ b;  b = b;
b = a ^ b; // a = a ^ b;  b = a ^ b ^ b = a;
a = a ^ b; // a = a ^ b ^ a = b;  b = a;
```

**巧用异或的例子：**

```java
/*
*  要求：o(n),n(1)
* （1）有一个数组，奇数个的相同数字只有一个，打印出该数字
* （2）有一个数组，奇数个的相同数字只有两个，打印出该数字
* */

public static void printOneOdd(int[] arr){
    int eor = 0;
    for (int num : arr) {
        eor ^= num;
    }
    System.out.println(eor);
}

public static void printTwoOddNum(int[] arr){
    int eor = 0;
    for (int num : arr) {
        eor ^= num;
    }
	
    // 取出最右边的1
    int rightOne = eor & (~eor + 1);

    int onlyOne = 0;
    for (int num : arr) {
        if ((num & rightOne) == 0) {
            onlyOne ^= num;
        }
    }
    System.out.println(onlyOne + " " + (eor ^ onlyOne));
}
```



<br/>

### 不使用判断返回大值

```java
/**
 * 不使用「判断语句」返回两个有符号整数中较大的数字
 * @author gzw
 */
public class GetMax {
    /**
     * 上游函数保证传入的参数 num 只会是 1 或者 0
     * 该函数的功能是将 num 从 1 变为 0，将 0 变为 1
     * 这样做可以得到两个互斥的条件，条件用 1 或 0 的形式代表，意义自行定义
     * @param num 0 或 1
     */
    public int flip(int num) {
        return num ^ 1;
    }

    /**
     * 获取传入的数字的符号
     * 为 1 代表正数，为 0 代表负数
     */
    public int sign(int num) {
        return flip((num >> 31) & 1);
    }

    /**
     * 使用加法与互斥条件返回两数中的大数
     * 但是这个方法是问题的，因为在求差值时可能溢出
     */
    public int getMax1(int a, int b) {
        // 这里是有可能溢出的
        int c = a - b;
        // c 为正数说明 a >= b，此时 sA = 1，sB = 0，否则 a < b，此时 sA = 0，sB = 1
        int sA = sign(c);
        int sB = flip(sA);
        // 因为是互斥条件，所以只可能返回加号两边的其中一项
        return sA * a + sB * b;
    }

    /**
     * 使用加法与互斥条件返回两数中的大数
     * 这个方法就算差值溢出也能返回正确的结果
     */
    public int getMax2(int a, int b) {
        // 这里是有可能溢出的
        int c = a - b;
        // 求出三个值的符号
        int sA = sign(a);
        int sB = sign(b);
        int sC = sign(c);
        // 当 sA 与 sB 符号相同，difSab = 0，sameSab = 1，否则相反
        int difSab = sA ^ sB;
        int sameSab = flip(difSab);
        // 判断是该返回 a 还是 b
        // 加号左边的含义：两个数符号不相同时，如果 sA 是正数，那么就一定返回 a，因为此时 b 为负数一定小，否则返回 b，所以此处直接用 sA 的状态即可
        // 加号右边的含义：两个数符号相同时，绝对不可能溢出，此时直接用 sC 的结果即可
        int returnA = difSab * sA + sameSab * sC;
        // 与返回 A 的条件互斥
        int returnB = flip(returnA);
        // 因为是互斥条件，所以只可能返回加号两边的其中一项
        return returnA * a + returnB * b;
    }

    public static void main(String[] args) {
        System.out.println(Integer.MIN_VALUE);
        System.out.println(Integer.MAX_VALUE);
        int a = 2147483647, b = -2147480000;
        System.out.println(a - b);
        GetMax getMax = new GetMax();
        System.out.println(getMax.getMax1(a, b)); // 返回错误
        System.out.println(getMax.getMax2(a, b)); // 返回正确
    }
}
```



<br/>

### 判断是否为 2 或 4 的次幂

```java
public class IsPower {
    /**
     * 判断某个数是否是 2 的次幂
     */
    public boolean is2Power(int n) {
        return (n & (n - 1)) == 0;
    }
    /**
     * 判断某个数是否是 4 的次幂
     * 前提就是该数是 2 的次幂
     */
    public boolean is4Power(int n) {
        // 0x55555555 是 01010101...0101
        return (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
    }
}
```



<br/>

### 实现加减乘除

```java
public class ArithmeticOperation {
    /**
     * 前提是 a + b 本身不溢出
     * 溢出是不管是系统还是该方法都不保证计算结果正确
     */
    public int add(int a, int b) {
        int sum = a;
        while (b != 0) {
            // 异或运算本身就是无进位相加
            sum = a ^ b;
            // 与运算能求出进位的结果，当进位为 0 时，此时的 sum 就是最终结果
            b = (a & b) << 1;
            a = sum;
        }
        return sum;
    }
    /**
     * 取反加 1
     */
    public int negNum(int n) {
        return add(~n, 1);
    }
    /**
     * 减法
     */
    public int minus(int a, int b) {
        return add(a, negNum(b));
    }
    /**
     * 乘法
     */
    public int multi(int a, int b) {
        int res = 0;
        while (b != 0) {
            if ((b & 1) != 0) {
                add(res, a);
            }
            a <<= 1;
            // 这里主要要用逻辑右移，否则当 b 是负数时高位会补 1
            b >>>= 1;
        }
        return res;
    }
    /**
     * 判断是否为负数
     */
    public boolean isNeg(int n) {
        return n < 0;
    }
    /**
     * 除法
     */
    public int div(int a, int b) {
        int x = isNeg(a) ? negNum(a) : a;
        int y = isNeg(b) ? negNum(b) : b;
        int res = 0;
        for (int i = 31; i > -1; i = minus(i, 1)) {
            if ((x >> i) >= y) {
                res |= (1 << i);
                x = minus(x, y << i);
            }
        }
        return isNeg(a) ^ isNeg(b) ? negNum(res) : res;
    }
}
```



<br/>

## 优化

**入手点：**

（1）根据数据状况优化

（2）根据问题描述优化

**例如：**

二分查找一般用于有序数组中查找某一个值，无序数组中很少用到，无序列表应用二分法查找的一个例子是寻找局部最小

```java
/*
	1.局部最小的定义：
	（1）在 0 ~ 1 位置上 arr[0] < arr[1]，0位置局部最小
	（2）在 n-2 ~ n-1 位置上 arr[n-1] < arr[n-2]，n-1 位置局部最小 
	（3）在 i-1 ~ i ~ i+1 位置上 arr[i-1] > arr[i] < arr[i+1]，i 位置局部最小
	
	2.问题描述：
	（1）数组无序
	（2）任意相邻数之间不重复
	（3）在 时间复杂度 < o(n) 的情况下找出一个局部最小的位置
	
	以上的数据与题目描述适合用二分法，这就是一个根据数况与问题优化解题的例子 
*/
```



<br/>

## 对数器

**对数器的概念：**

- 方法 A：优化后的解法，但不知道是否正确

- 方法 B：相对容易的实现的解法，已知正确

- 随机生成两个相同的数组，分别放入 A 和 B 测试 N 次比对结果是否一致，当 N 足够大时就能保		  证 A  方法是正确的，这就是对数器的基础理解

**优点：**

- 保证优化后的代码正确

- 不用依赖线上测试平台

**缺点：**

- 需要实现两种解法



<br/>

## 比较器

- 比较器的是指就是重载比较运算符

- 比较器可以很好地应用在特殊标准的排序上

- 比较器可以很好地应用在根据特殊标准排序的结构上



<br/>

## 小技巧

###  求中点

```java
int l = 0;
int r = 100;
int mid = 0;

// 用此方法可能会有溢出问题
mid = (l + r) / 2;

// 所以用位运算，且速度较快
mid = l + ((r - l) >> 1);
```



### 等概率返回

```java
/**
 * 自己改造随机
 * 例如：17 ~ 56 等概率返回，39 = 56 - 17 + 1
 *   f(): 0/1        6 位最大 64         超出 39 就重做    最后得到 0 ~ 39 再加上 17 即可
 * 获得 01 发生器 -> 看看需要几个二进制位 -> 超出范围就重做 -> 最后加回去
 */
public class randomTest {
    // 最终等概率返回函数
    public static int g() {
        return f06() + 1;
    }

    public static int f06() {
        int ans = 0;
        do {
            ans = f07();
        } while (ans == 7);
        return ans;
    }

    // 使用 0 1 等概率发生器随机出等概率的 [0, 7]
    public static int f07() {
        return (f01() << 2) + (f01() << 1) + f01();
    }

    // 只能用 randomf 获得等概率的 0 和 1
    public static int f01() {
        int ans = 0;
        do {
            ans = f();
        } while (ans == 3);
        return ans < 3 ? 0 : 1;
    }

    // 下面的函数不能改变
    // [1, 5] 等概率返回
    public static int f() {
        return (int)(Math.random() * 5) + 1;
    }
}
```







​	
