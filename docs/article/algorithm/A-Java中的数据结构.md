---
title: "Java 中的数据结构"
shortTitle: "A-Java 中的数据结构"
description: "Java 中的数据结构"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "算法"
- "java"
tag:
- "算法"
- "java"
sticky: 999
star: true
article: true
timeline: true,
dir:
  text: "Java 中的数据结构"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 1
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "Java 中的数据结构"
  description: "Java 中的数据结构"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 中的数据结构

[[toc]]

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