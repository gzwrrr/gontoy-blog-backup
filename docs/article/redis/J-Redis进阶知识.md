---
title: "Redis 进阶知识"
shortTitle: "J-Redis 进阶知识"
description: "Redis 进阶知识"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-22
category: 
- "redis"
- "数据库"
- "缓存"
tag:
- "redis"
- "数据库"
- "缓存"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Redis 进阶知识"
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
  title: "Redis 进阶知识"
  description: "Redis 进阶知识"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Redis 进阶知识

[[toc]]

## 对象机制

Redis 对键的处理占了大部分，Redis 必须让每个键都带有类型信息, 使得程序可以检查键的类型, 并为它选择合适的处理方式

操作数据类型的命令除了要对键的类型进行检查之外, 还需要根据数据类型的不同编码进行多态处理，为此**Redis 构建了自己的类型系统：**

- redisObject 对象.
- 基于 redisObject 对象的类型检查.
- 基于 redisObject 对象的显式多态函数.
- 对 redisObject 进行分配、共享和销毁的机制.

redis使用自己实现的对象机制（redisObject)来实现类型判断、命令多态和基于引用次数的垃圾回收；

redis会预分配一些常用的数据对象，并通过共享这些对象来减少内存占用，和避免频繁的为小对象分配内存。



### RedisObject

```c
/*
 * Redis 对象
 */
typedef struct redisObject {
    // 类型
    unsigned type:4;
    // 编码方式
    unsigned encoding:4;
    // LRU - 24位, 记录最末一次访问时间（相对于lru_clock）; 或者 LFU（最少使用的数据：8位频率，16位访问时间）
    unsigned lru:LRU_BITS; // LRU_BITS: 24
    // 引用计数
    int refcount;
    // 指向底层数据结构实例
    void *ptr;
} robj;
```

**lru属性: 记录了对象最后一次被命令程序访问的时间**

- **空转时长**：当前时间减去键的值对象的lru时间，就是该键的空转时长。Object idletime命令可以打印出给定键的空转时长

- 如果服务器打开了maxmemory选项，并且服务器用于回收内存的算法为volatile-lru或者allkeys-lru，那么当服务器占用的内存数超过了maxmemory选项所设置的上限值时，空转时长较高的那部分键会优先被服务器释放，从而回收内存

<br/>

**type 常量如下：**

```c
/*
* 对象类型
*/
#define OBJ_STRING 0 // 字符串
#define OBJ_LIST 1 // 列表
#define OBJ_SET 2 // 集合
#define OBJ_ZSET 3 // 有序集
#define OBJ_HASH 4 // 哈希表
```

**对象保存的值的编码：**

```c
/*
* 对象编码
*/
#define OBJ_ENCODING_RAW 0     /* Raw representation */
#define OBJ_ENCODING_INT 1     /* Encoded as integer */
#define OBJ_ENCODING_HT 2      /* Encoded as hash table */
#define OBJ_ENCODING_ZIPMAP 3  /* 注意：版本2.6后不再使用. */
#define OBJ_ENCODING_LINKEDLIST 4 /* 注意：不再使用了，旧版本2.x中String的底层之一. */
#define OBJ_ENCODING_ZIPLIST 5 /* Encoded as ziplist */
#define OBJ_ENCODING_INTSET 6  /* Encoded as intset */
#define OBJ_ENCODING_SKIPLIST 7  /* Encoded as skiplist */
#define OBJ_ENCODING_EMBSTR 8  /* Embedded sds string encoding */
#define OBJ_ENCODING_QUICKLIST 9 /* Encoded as linked list of ziplists */
#define OBJ_ENCODING_STREAM 10 /* Encoded as a radix tree of listpacks */
```



### 对象共享

> redis一般会把一些常见的值放到一个共享对象中，这样可使程序避免了重复分配的麻烦，也节约了一些CPU时间

注意：共享对象只能被字典和双向链表这类能带有指针的数据结构使用。像整数集合和压缩列表这些只能保存字符串、整数等自勉之的内存数据结构

**为什么redis不共享列表对象、哈希对象、集合对象、有序集合对象，只共享字符串对象**？

- 列表对象、哈希对象、集合对象、有序集合对象，本身可以包含字符串对象，复杂度较高。
- 如果共享对象是保存字符串对象，那么验证操作的复杂度为O(1)
- 如果共享对象是保存字符串值的字符串对象，那么验证操作的复杂度为O(N)
- 如果共享对象是包含多个值的对象，其中值本身又是字符串对象，即其它对象中嵌套了字符串对象，比如列表对象、哈希对象，那么验证操作的复杂度将会是O(N的平方)

如果对复杂度较高的对象创建共享对象，需要消耗很大的CPU，用这种消耗去换取内存空间，是不合适的



### 引用计数

1. 每个redisObject结构都带有一个refcount属性，指示这个对象被引用了多少次；
2. 当新创建一个对象时，它的refcount属性被设置为1；
3. 当对一个对象进行共享时，redis将这个对象的refcount加一；
4. 当使用完一个对象后，或者消除对一个对象的引用之后，程序将对象的refcount减一；
5. 当对象的refcount降至0 时，这个RedisObject结构，以及它引用的数据结构的内存都会被释放





## 底层数据结构

- 简单动态字符串 - sds（Redis 自己实现的动态字符串）
- 压缩列表 - ZipList（双向链表，元素大小自适应）
- 快表 - QuickList（以ziplist为结点的双端链表结构. 宏观上, quicklist是一个链表, 微观上, 链表中的每个结点都是一个ziplist）
- 字典/哈希表 - Dict（本质上就是哈希表）
- 整数集 - IntSet（集合类型的底层实现之一，当一个集合只包含整数值元素，并且这个集合的元素数量不多时，Redis 就会使用整数集合作为集合键的底层实现）
- 跳表 - ZSkipList（跳跃表结构在 Redis 中的运用场景只有一个，那就是作为有序列表 (Zset) 的使用。占用空间较大，属于空间换时间）







## 基础类型与底层结构的对应

### 字符串

字符串对象的编码可以是==int，raw或者embstr==

- `int 编码`：保存的是可以用 long 类型表示的整数值
- `embstr 编码`：保存长度小于44字节的字符串（redis3.2版本之前是39字节，之后是44字节，使用redisObject和sds保存数据）
- `raw 编码`：保存长度大于44字节的字符串（redis3.2版本之前是39字节，之后是44字节，使用redisObject和sds保存数据）

==区别==：embstr的使用只分配一次内存空间（因此redisObject和sds是连续的），而raw需要分配两次内存空间（分别为redisObject和sds分配空间）。因此与raw相比，embstr的好处在于创建时少分配一次空间，删除时少释放一次空间，以及对象的所有数据连在一起，寻找方便。而embstr的坏处也很明显，如果字符串的长度增加需要重新分配内存时，整个redisObject和sds都需要重新分配空间，因此redis中的embstr实现为只读。

注意：

- Redis中对于浮点数类型也是作为字符串保存的，在需要的时候再将其转换成浮点数类型
- 当 int 编码保存的值不再是整数，或大小超过了long的范围时，自动转化为raw
- 对于 embstr 编码，由于 Redis 没有对其编写任何的修改程序（embstr 是只读的），在对embstr对象进行修改时，都会先转化为raw再进行修改，因此，只要是修改embstr对象，修改后的对象一定是raw的，无论是否达到了44个字节



### 列表对象

list 列表，它是简单的字符串列表，按照插入顺序排序，你可以添加一个元素到列表的头部（左边）或者尾部（右边），它的底层实际上是个链表结构

列表对象的编码是 ==quicklist==（ (之前版本中有 linked 和 ziplist 这两种编码）





### 哈希对象

哈希对象的键是一个字符串类型，值是一个键值对集合

哈希对象的编码可以是 ==ziplist 或者 hashtable==；对应的底层实现有两种, 一种是 ziplist, 一种是 dict

注意：当采用HT编码，即使用dict作为哈希对象的底层数据结构时，键与值均是以sds的形式存储的

<br/>

**编码转换：**

和上面列表对象使用 ziplist 编码一样，当同时满足下面两个条件时，使用ziplist（压缩列表）编码：

1. 列表保存元素个数小于512个
2. 每个元素长度小于64字节

不能满足这两个条件的时候使用 hashtable 编码。以上两个条件也可以通过Redis配置文件`zset-max-ziplist-entries` 选项和 `zset-max-ziplist-value` 进行修改





### 集合对象

集合对象 set 是 string 类型（整数也会转换成string类型进行存储）的无序集合

注意集合和列表的区别：集合中的元素是无序的，因此不能通过索引来操作元素；集合中的元素不能有重复

集合对象的编码可以是 ==intset 或者 hashtable==， 底层实现有两种, 分别是 intset 和 dict

**编码转换**

当集合同时满足以下两个条件时，使用 intset 编码：

1. 集合对象中所有元素都是整数

2. 集合对象所有元素数量不超过512

不能满足这两个条件的就使用 hashtable 编码。第二个条件可以通过配置文件的 `set-max-intset-entries` 进行配置





### 有序集合对象

与列表使用索引下标作为排序依据不同，有序集合为每个元素设置一个分数（score）作为排序依据

有序集合的底层实现依然有两种, 一种是使用 ==ziplist== 作为底层实现, 另外一种比较特殊, 底层使用了两种数据结构: ==dict 与 skiplist==. 前者对应的编码值宏为ZIPLIST, 后者对应的编码值宏为SKIPLIST

==注意：==

其实有序集合单独使用字典或跳跃表其中一种数据结构都可以实现，但是这里使用两种数据结构组合起来，原因是假如我们单独使用 字典，虽然能以 O(1) 的时间复杂度查找成员的分值，但是因为字典是以无序的方式来保存集合元素，所以每次进行范围操作的时候都要进行排序；假如我们单独使用跳跃表来实现，虽然能执行范围操作，但是查找操作有 O(1)的复杂度变为了O(logN)。因此Redis使用了两种数据结构来共同实现有序集合

**编码转换：**

当有序集合对象同时满足以下两个条件时，对象使用 ziplist 编码：

1、保存的元素数量小于128；

2、保存的所有元素长度都小于64字节。

不能满足上面两个条件的使用 skiplist 编码。以上两个条件也可以通过Redis配置文件`zset-max-ziplist-entries` 选项和 `zset-max-ziplist-value` 进行修改





## Redis 的事件机制

用于处理两类事件：

1. **文件事件**(file event)：用于处理 Redis 服务器和客户端之间的网络IO。

2. **时间事件**(time eveat)：Redis 服务器中的一些操作（比如serverCron函数）需要在给定的时间点执行，而时间事件就是处理这类定时操作的。



### 文件事件

:::info 网络事件处理器

Redis基于**Reactor模式**开发了自己的网络事件处理器，也就是文件事件处理器。文件事件处理器使用**IO多路复用技术**，同时监听多个套接字，并为套接字关联不同的事件处理函数。当套接字的可读或者可写事件触发时，就会调用相应的事件处理函数。

:::

基于多路复用的Redis高性能IO模型为了在请求到达时能通知到 Redis 线程，select/epoll 提供了基于事件的回调机制，即针对不同事件的发生，调用相应的处理函数。那么，回调机制是怎么工作的呢？

其实，select/epoll 一旦监测到 FD 上有请求到达时，就会触发相应的事件。这些事件会被放进一个事件队列，Redis 单线程对该事件队列不断进行处理。这样一来，Redis 无需一直轮询是否有请求实际发生，这就可以避免造成 CPU 资源浪费。同时，Redis 在对事件队列中的事件进行处理时，会调用相应的处理函数，这就实现了基于事件的回调。因为 Redis 一直在对事件队列进行处理，所以能及时响应客户端请求，提升 Redis 的响应性能。





### 时间事件

Redis 的时间事件分为以下两类：

- **定时事件**：让一段程序在指定的时间之后执行一次。
- **周期性事件**：让一段程序每隔指定时间就执行一次。

服务器所有的时间事件都放在一个无序链表中，每当时间事件执行器运行时，它就遍历整个链表，查找所有已到达的时间事件，并调用相应的事件处理器。正常模式下的Redis服务器只使用serverCron一个时间事件，而在benchmark模式下，服务器也只使用两个时间事件，所以不影响事件执行的性能。

















:::info 文章出处

出自「Java 全栈知识体系」，原文链接：https://www.pdai.tech/md/db/nosql-redis/db-redis-x-redis-object.html

:::

