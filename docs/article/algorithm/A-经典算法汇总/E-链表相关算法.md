---
title: "链表相关算法"
shortTitle: "E-链表相关算法"
description: "链表相关算法"
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
  text: "链表相关算法"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 5
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "链表相关算法"
  description: "链表相关算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# 链表相关算法

[[toc]]





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



