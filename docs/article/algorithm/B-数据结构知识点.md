---
title: "数据结构知识点"
shortTitle: "B-数据结构知识点"
description: "数据结构知识点"
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
sticky: 998
star: true
article: true
timeline: true
dir:
  text: "数据结构知识点"
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
  title: "数据结构知识点"
  description: "数据结构知识点"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 数据结构知识点

[[toc]]

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
- 相关的概念有：[致性哈希](https://zhuanlan.zhihu.com/p/129049724)（可以实现分布式负载均衡）









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





### 链表技巧

:::info 相关文章

[单链表的六大解题套路](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247492022&idx=1&sn=35f6cb8ab60794f8f52338fab3e5cda5&scene=21#wechat_redirect)

:::

链表涉及到大量的双指针优化（同向而行或者相向而行）

> 删除链表中的某个节点只需要找到这个节点的上一个节点即可

<br/>

**以下示例代码的链表节点结构如下：**

```java
private class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
```

<br/>

**虚拟节点：**合并两个或者多个有序链表：使用虚拟节点可以很好规避空节点可能带来的问题，对于多链表可以使用「分治法」或者「优先队列」快速解决

```java
ListNode mergeKLists(ListNode[] lists) {
    if (lists.length == 0) return null;
    // 虚拟头结点
    ListNode dummy = new ListNode(-1);
    ListNode p = dummy;
    // 优先级队列，最小堆
    PriorityQueue<ListNode> pq = new PriorityQueue<>(
        lists.length, (a, b)->(a.val - b.val));
    // 将 k 个链表的头结点加入最小堆
    for (ListNode head : lists) {
        if (head != null)
            pq.add(head);
    }

    while (!pq.isEmpty()) {
        // 获取最小节点，接到结果链表中
        ListNode node = pq.poll();
        p.next = node;
        if (node.next != null) {
            pq.add(node.next);
        }
        // p 指针不断前进
        p = p.next;
    }
    return dummy.next;
}
```

<br/>

**快慢指针：**快慢指针在许多情况下可以做到只用遍历一次链表就找到想要的节点，例如慢指针每次走一步，快指针每次走两步，这样就能在一次遍历中找到中点

```java
public ListNode middleNode(ListNode head) {
    ListNode fast = head;
    ListNode slow = head;
    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
}
```

或者是找到第 K 个节点，下面就是先让快指针走 K 步，之后慢指针再同步走，这样快慢指针之间就有一个固定间隔，当快指针到队尾时，慢指针就找到了倒数第 K 个，这样就在一次遍历中找到了想要的节点

```java
public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(-1, head);
    ListNode p1 = dummy;
    for (int i = 0; i < n; i++) {
        p1 = p1.next;
    }
    ListNode p2 = dummy, pre = p2;
    while (p1 != null) {
        pre = p2;
        p2 = p2.next;
        p1 = p1.next;
    }
    pre.next = pre.next.next;
    return dummy.next;
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

**判断链表中是否包含环：**

使用快慢指针即可，相遇说明有环

```java
// 单纯判断是否有环
boolean hasCycle(ListNode head) {
    // 快慢指针初始化指向 head
    ListNode slow = head, fast = head;
    // 快指针走到末尾时停止
    while (fast != null && fast.next != null) {
        // 慢指针走一步，快指针走两步
        slow = slow.next;
        fast = fast.next.next;
        // 快慢指针相遇，说明含有环
        if (slow == fast) {
            return true;
        }
    }
    // 不包含环
    return false;
}
```

给出环的初始节点，代码也比较简单，但是理解看图比较好，这里就直接说结论（具体看上面给出的文章）：使用快慢指针，慢指针每次走一步，快指针每次走两步，当两个指针相遇时，让快慢指针其中一个再次指向头节点，此时让两个指针每次都只走一步，再次相遇时就恰好到达了环的初始节点处

```java
ListNode detectCycle(ListNode head) {
    ListNode fast, slow;
    fast = slow = head;
    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast == slow) break;
    }
    // 上面的代码类似 hasCycle 函数
    if (fast == null || fast.next == null) {
        // fast 遇到空指针说明没有环
        return null;
    }

    // 重新指向头结点
    slow = head;
    // 快慢指针同步前进，相交点就是环起点
    while (slow != fast) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
}
```

<br/>

**判断两个环是否相交：**

因为两个链表不一定等长，所以两个指针同时走不一定能同时到达交汇处，这里也直接说解决方案：P1 指针遍历完 A 链表后接着遍历 B 链表；P2 指针遍历完 B 链表后接着遍历 A 链表（这样做可以让两个指针走过的最终长度相等，看图就很容易理解），当两个指针指向的节点相同时就找到交汇点了

```java
ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    // p1 指向 A 链表头结点，p2 指向 B 链表头结点
    ListNode p1 = headA, p2 = headB;
    while (p1 != p2) {
        // p1 走一步，如果走到 A 链表末尾，转到 B 链表
        if (p1 == null) p1 = headB;
        else            p1 = p1.next;
        // p2 走一步，如果走到 B 链表末尾，转到 A 链表
        if (p2 == null) p2 = headA;
        else            p2 = p2.next;
    }
    return p1;
}
```





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

![满二叉树与完全二叉树](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/20230208/%E6%BB%A1%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%8E%E5%AE%8C%E5%85%A8%E4%BA%8C%E5%8F%89%E6%A0%91.png)

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
    return data.nodes == (1 << data.height - 1);
}

public static ReturnType process(Node x) {
    if (x == null) {
        return new ReturnType(0, 0);
    }
    ReturnType left = process(x.left);
    ReturnType right = process(x.right);
    int height = Math.max(left.height, right.height) + 1;
    int nodes = left.nodes + right.nodes + 1;
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

<img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/20230208/%E6%99%AE%E9%80%9A%E9%98%9F%E5%88%97.png" alt="simple-queue_0" style="zoom:50%;" />

<img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/20230208/%E4%BC%98%E5%85%88%E9%98%9F%E5%88%97.png" alt="priority-queue" style="zoom: 50%;" />

<img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/20230208/%E5%8F%8C%E7%AB%AF%E9%98%9F%E5%88%97.png" alt="double-ended-queue" style="zoom:50%;" />

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

