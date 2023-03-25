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

![集合框架](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E7%AE%97%E6%B3%95/20230314/java%E9%9B%86%E5%90%88%E6%A1%86%E6%9E%B6%E6%9E%B6%E6%9E%84.png)

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







### 队列

在 Java 中，「队列接口」主要有以下几种：

1. `Queue<E>`: Queue 是 Java 集合框架中的队列接口，它表示一个典型的队列结构，即具有先进先出（FIFO）特点的数据结构，可以存储一系列元素（可重复或不可重复），支持在队列的尾部添加元素、在队列的头部获取并删除元素、获取但不删除队头元素等操作。Queue 是一个接口，它有多个实现类，包括 LinkedList、PriorityQueue 等。
2. `Deque<E>`: Deque 是 Queue 的子接口，它是一个双端队列，支持在队列的两端添加和删除元素。Deque 提供了一系列的方法，可以允许在队列的头部和尾部进行插入、删除等操作。Deque 也是一个接口，它有多个实现类，包括 ArrayDeque、LinkedList 等。
3. `BlockingQueue<E>`: BlockingQueue 是一个支持线程安全的队列接口，它继承自 Queue 接口。它提供了一些阻塞操作，当队列为空时会阻塞获取元素的线程，当队列已满时会阻塞添加元素的线程。BlockingQueue 是一个接口，它有多个实现类，包括 ArrayBlockingQueue、LinkedBlockingQueue、PriorityBlockingQueue、SynchronousQueue 等。
4. `TransferQueue<E>`: TransferQueue 是 BlockingQueue 的子接口，它提供了一些扩展的方法，允许在队列中传输元素，即生产者可以将元素传输给消费者，而不是将元素放在队列中等待消费者取走。TransferQueue 是一个接口，目前只有一个实现类 SynchronousQueue。



在Java中，常见的队列实现有以下几种：

1. LinkedList

   LinkedList是Java集合框架中的一个双向链表实现，也可以用作队列的实现。由于LinkedList实现了Queue接口，所以可以通过调用Queue中的方法来进行队列操作，如offer()和poll()。

2. ArrayDeque

   ArrayDeque是Java集合框架中的一个双端队列实现，同时也可以用作队列的实现。ArrayDeque使用可调整大小的数组来存储元素，并提供了高效的添加和删除元素的方法。由于ArrayDeque同样实现了Queue接口，所以也可以通过Queue中的方法来进行队列操作。

3. PriorityQueue

   PriorityQueue是Java集合框架中的一个优先队列实现，它可以按照元素的优先级进行排序。PriorityQueue通过二叉堆来实现，每次插入元素时会进行自动排序，可以使用Comparator来指定元素的排序方式。虽然PriorityQueue同样实现了Queue接口，但由于其内部是有序的，所以使用peek()方法查看队列头部元素并不一定返回队列中最先插入的元素，而是最小的元素。

4. ConcurrentLinkedQueue

   ConcurrentLinkedQueue是Java集合框架中的一个线程安全的队列实现，可以用于多线程环境下的并发操作。ConcurrentLinkedQueue的内部实现是基于链表的，每个节点包含一个元素和一个指向下一个节点的引用。由于其采用了无锁的CAS算法实现，因此能够保证在多线程并发操作下的线程安全性。

5. LinkedBlockingQueue

   LinkedBlockingQueue是Java集合框架中的一个阻塞队列实现，可以用于在多线程环境下进行数据传输。它使用链表来存储元素，并提供了阻塞的插入和移除元素的方法，即在队列为空或已满时会阻塞等待。LinkedBlockingQueue中的put()和take()方法会阻塞调用线程，直到队列不为空或不满。

6. ArrayBlockingQueue

   ArrayBlockingQueue是Java集合框架中的一个阻塞队列实现，它使用数组来存储元素。与LinkedBlockingQueue不同，ArrayBlockingQueue的容量是有限的，因此在创建ArrayBlockingQueue对象时需要指定容量。与LinkedBlockingQueue一样，ArrayBlockingQueue也提供了阻塞的插入和移除元素的方法，即在队列为空或已满时会阻塞等待。







### Stack

数组实现栈（注意栈满栈空的情况）：

```java
public class ArrayStack<T> {
    private T[] arr;
    private int top;

    public ArrayStack(int capacity) {
        arr = (T[]) new Object[capacity];
        top = -1;
    }

    public void push(T element) {
        if (isFull()) {
            throw new RuntimeException("Stack is full");
        }
        arr[++top] = element;
    }

    public T pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return arr[top--];
    }

    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return arr[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public boolean isFull() {
        return top == arr.length - 1;
    }
}
```

使用链表实现栈：

```java
public class LinkedStack<T> {
    private Node<T> top;

    private static class Node<T> {
        private T value;
        private Node<T> next;

        public Node(T value) {
            this.value = value;
        }
    }

    public void push(T element) {
        Node<T> newNode = new Node<>(element);
        if (top == null) {
            top = newNode;
        } else {
            newNode.next = top;
            top = newNode;
        }
    }

    public T pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        T value = top.value;
        top = top.next;
        return value;
    }

    public T peek() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return top.value;
    }

    public boolean isEmpty() {
        return top == null;
    }
}
```

Java 中提供了 `Stack` 类，但是在实际开发中并不常用，主要是因为以下几个原因：

1. `Stack` 继承自 `Vector` 类，而 `Vector` 是同步的，线程安全的。但是在实际开发中使用同步容器会影响性能。
2. `Stack` 的底层实现是基于数组，当元素数量超过数组大小时，需要重新分配内存并进行数据复制，这个过程比较耗时。
3. 在 JDK1.6 之后，Java 官方推出了新的数据结构 `Deque`，即双端队列，它继承自 `Queue` 接口，可以实现栈的功能，而且性能更好。因此，在实际开发中，更推荐使用 `Deque` 而不是 `Stack`。

Java中`Deque`接口有以下实现类：

- `ArrayDeque`: 基于数组实现的双端队列，可以当作栈使用；
- `LinkedList`: 基于链表实现的双端队列，可以当作栈使用。

除了以上两种实现类外，还有`ConcurrentLinkedDeque`和`LinkedBlockingDeque`，这两个类都是基于链表实现的并发队列，不适合用作栈。

总结来说，`ArrayDeque`和`LinkedList`可以用作栈的实现，但在性能和使用场景上存在一些差异。`ArrayDeque`基于数组实现，在频繁添加和删除元素时性能更好，适合用于需要高效的push和pop操作的场景；而`LinkedList`基于链表实现，在随机访问和迭代访问元素时性能更好，适合用于需要快速遍历栈内元素的场景。





### 数组与集合

#### 数组转成集合

循环遍历数组，将每个元素添加到集合中。

```java
javaCopy codeString[] array = {"apple", "banana", "orange"};
List<String> list = new ArrayList<>();
for (String item : array) {
    list.add(item);
}
```

<br/>

使用Arrays.asList()方法：将数组转换成List集合。需要注意的是，通过这种方式得到的List是不可变的，不能修改其大小，否则会抛出UnsupportedOperationException异常。

```java
javaCopy codeString[] array = {"apple", "banana", "orange"};
List<String> list = Arrays.asList(array);
```

:::warning 注意

Arrays.asList()返回的是一个固定大小的列表（ArrayList），不支持 `add()、remove()` 等修改操作。如果需要对该列表进行增删操作，可以将其复制到一个新的可修改列表中，例如 `new ArrayList<>(Arrays.asList(arr))`。

:::

```java
public static <T> List<T> asList(T... a) {
    return new ArrayList<>(a);
}
```

:::info 特别说明

上述参数中 `...` 被称为可变参数或者参数列表（varargs）。

当使用可变参数时，可以在方法中使用任意数量的相同类型的参数，这些参数将被封装为一个数组传递给方法。在上述代码中，T... a 表示这是一个可变参数，a是一个T类型的数组，它可以接受任意数量的T类型参数。

:::

<br/>

使用Collections.addAll()方法：可以将数组元素添加到任何实现了Collection接口的集合中。

```java
javaCopy codeString[] array = {"apple", "banana", "orange"};
List<String> list = new ArrayList<>();
Collections.addAll(list, array);
```

<br/>

使用`Arrays`类中的`stream()`方法可以将数组转换成流，然后使用`Stream`中的`collect()`方法可以将流转换成集合。例如：

```
javaCopy codeInteger[] array = {1, 2, 3};
List<Integer> list = Arrays.stream(array).collect(Collectors.toList());
```





#### 集合转换数组

:::warning 注意

从集合转换到数组，可以使用集合类的 `toArray()` 方法，但需要注意 `toArray()` 方法有多个重载，需要指定目标数组的类型。例如 `List<Integer> list = new ArrayList<>(); Integer[] arr = list.toArray(new Integer[0])`。

:::

```java
List<Integer> list = new ArrayList<>();
// 添加元素到list中
Integer[] arr = list.toArray(new Integer[0]); // 指定数组大小

// 或者
List<Integer> list = new ArrayList<>();
// 添加元素到list中
Integer[] arr = new Integer[list.size()];
arr = list.toArray(arr);

// 注意，toArray() 不指定的话返回的是一个 Object 数组
List<Integer> list = new ArrayList<>();
// 添加元素到list中，需要进行强制类型转换
Object[] arr = list.toArray();
```

也可以使用 Stream 进行转换：

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
Integer[] array = list.stream().toArray(Integer[]::new);
```

