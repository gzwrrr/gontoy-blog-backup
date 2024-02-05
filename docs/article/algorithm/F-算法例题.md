---
title: "算法例题"
shortTitle: "F-算法例题"
description: "算法例题"
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
sticky: 994
star: true
article: true
timeline: true
dir:
  text: "算法例题"
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
  title: "算法例题"
  description: "算法例题"
  author:
    name: gzw
    email: 1627121193@qq.com
---



# 算法例题





[[toc]]





## 1.递归类

### 1.1 小和问题

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

### 1.2 反转单链表

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

## 2.堆类

### 2.1 几乎有序数组

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

### 2.2 给出中位数

陆续输入数字，以较小的代价较快地给出中位数，利用大小根堆配合，维持堆顶是中位数就行



<br/>

## 3.迭代类

### 3.1 反转单链表

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

### 3.2 求素数

只需要任何一个非质素肯定能拆出一个比该数的根号还小的数，所以只需要看 2 ~ 根号下该数范围内的数是否能整除该数即可。

```java
public static boolean isPrime(int num) {
    if (num < 2) {
        return false;
    }
    boolean flag = true;
    for (int i = 2; i < Math.sqrt(num); i++) {
        if (num % i == 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
```





### 3.3 约瑟夫环

```java
/**
 * 使用数组实现，增删操作比较耗时
 */
public int lastRemaining(int n, int m) {
    List<Integer> list = new ArrayList<Integer>(n);
    for (int i = 0; i < n; i++) {
        list.add(i);
    }
    int index = 0;
    while (list.size() > 1) {
        index = (index + m - 1) % list.size();
        list.remove(index);
    }
    return list.get(0);
}

/**
 * 直接利用递推式
 */
public int lastRemaining02(int n, int m) {
    int[] dp = new int[n + 1];
    dp[1] = 0;
    for (int i = 2; i <= n; i++) {
        dp[i] = (dp[i - 1] + m) % i;
    }
    return dp[n];
}

/**
 * 递推式空间优化
 */
public int lastRemaining03(int n, int m) {
    int dp = 0;
    for (int i = 2; i <= n; i++) {
        dp = (dp + m) % i;
    }
    return dp;
}
```

