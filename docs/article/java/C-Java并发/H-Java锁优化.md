---
title: "Java 锁优化"
shortTitle: "H-Java 锁优化"
description: "Java 锁优化"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-08-03
category: 
- "java"
- "锁"
- "优化"
tag:
- "java"
- "锁"
- "优化"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Java 锁优化"
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
  title: "Java 锁优化"
  description: "Java 锁优化"
  author:
    name: gzw
    email: 1627121193@qq.com
---






# Java锁优化

[[toc]]


# Java 主流锁体系

- 乐观锁、悲观锁
- 读锁（共享锁）、写锁（排他锁）
- 自旋锁、非自旋锁
- 无锁、偏向锁、轻量级锁、重量级锁
- 分布式锁
- 区间锁（分段锁）
- 重入锁、非重入锁
- 公平锁、非公平锁



**线程是否要锁住同步资源：**

- 锁住：悲观锁
- 不锁住：乐观锁



**锁住同步资源失败线程是否要阻塞：**

- 阻塞
- 不阻塞：
  - 自旋锁
  - 适应性自旋锁



**多个线程竞争同步资源的流程细节：**

- 不锁住资源，多个线程只有一个能修改资源成功，其他线程会重试——无锁
- 同一个线程执行同步资源时自动获得资源——偏向锁
- 多个线程竞争同步资源时，没有获取资源的线程自旋等待锁释放——轻量级锁
- 多个线程竞争同步资源时，没有获取资源的线程阻塞等待唤醒——总量级锁



**多个线程竞争锁时是否要排队：**

- 排队：公平锁

- 不排队：非公平锁，先尝试插队，插队失败再排队



**一个线程的多个流程能不能获取同一把锁：**

- 能：可重入锁
- 不能：不可重入锁



**多个线程能不能共享一把锁：**

能：共享锁

不能：排他锁





# 自旋锁

- 指当一个线程在获得锁时，如果锁已经被其他线程获取，那么该线程将循环等待
- 然后不断判断锁是否能被成功获取，自旋直到获取到锁后才退出循环

**自旋锁的意义与使用场景：**

- 不是用 cas 时：阻塞与唤醒线程需要操作系统切换 CPU 状态，需要消耗一定的时间
- 场景：同步代码块逻辑简单，执行时间很短

**自适应自旋：**

- 假定不同线程持有同一个锁对象的时间基本相当
- 竞争度趋于稳定，可以根据上一次自旋的时间与结果调整下一次自旋的时间