---
title: "Spring 事务"
shortTitle: "E-Spring 事务"
description: "Spring 事务"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "spring"
tag:
- "spring"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Spring 事务"
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
  title: "Spring 事务"
  description: "Spring 事务"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring 事务


[[toc]]


Spring 事务实现方式有：**编程式事务** 和 **声明式事务**



## 传播机制

Spring事务传播机制是指在多个事务方法相互调用时，不同事务方法之间事务如何传播的机制。Spring中定义了七种事务传播行为，可以通过设置@Transactional注解或者TransactionDefinition对象来指定。

下表是七种事务传播行为以及对应的描述：

| 传播行为                        | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| Propagation.REQUIRED            | 如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入这个事务中。这是默认值。 |
| Propagation.SUPPORTS            | 支持当前事务，如果当前没有事务，就以非事务方式执行。         |
| Propagation.MANDATORY           | 使用当前的事务，如果当前没有事务，就抛出异常。               |
| Propagation.REQUIRES_NEW        | 新建事务，如果当前存在事务，把当前事务挂起。                 |
| Propagation.NOT_SUPPORTED       | 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。   |
| Propagation.NEVER               | 以非事务方式执行，如果当前存在事务，则抛出异常。             |
| Propagation.NESTED (Spring 3.0) | 如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与Propagation.REQUIRED类似的操作。 |

举个例子，假设有方法A和方法B，方法A调用了方法B。同时，方法A和方法B都被@Transactional注解标注了，且方法A的传播行为为Propagation.REQUIRED。

- 如果方法B的传播行为为Propagation.REQUIRED，那么方法B将加入到方法A的事务中，和方法A一起提交。
- 如果方法B的传播行为为Propagation.REQUIRES_NEW，那么方法B将新建一个事务，和方法A的事务并行执行，各自提交。
- 如果方法B的传播行为为Propagation.NESTED，那么方法B将在方法A的事务中嵌套一个子事务，如果发生异常，子事务将回滚，否则子事务和主事务一起提交。注意，这种传播行为只有在当前事务存在的情况下才会生效。

总之，事务传播机制可以保证多个事务方法之间的事务处理的正确性和一致性。





## 事务失效

:::info 说明

Spring 事务使用了 AOP，即进行了切面增强，所以失效的根本原因就是 AOP 失效

:::

Spring事务可以在多个层级的方法中嵌套使用，但是在某些情况下会导致事务失效，主要有以下几种情况：

1. 方法不是 public：@Transition 只能用于 public 修饰的方法上，否则就会失效；如果想用在非 public 方法上，可以开启 **AspectJ** 代理模式
2. 事务的传播行为设置不当：如果在事务嵌套的场景中，父方法和子方法的事务传播行为不同，那么就可能导致事务失效。
3. 异常被吞掉：如果在事务处理过程中，抛出的异常被捕获但没有被上抛，则会导致事务失效。因为Spring只会对未被捕获的异常进行回滚处理。
4. 非检查异常：如果在事务处理过程中抛出了非检查异常，比如NullPointerException、IndexOutOfBoundsException等，此时Spring事务无法捕获这些异常，也就无法进行回滚处理。
5. 同一个类中的方法调用：如果在同一个类中的方法之间进行相互调用，并且这些方法都使用了@Transactional注解声明了事务，但是并没有使用AOP代理实现事务控制（因为类中自调用 this 指向当前类，不是代理类，这样 AOP 就失效了），则会导致事务失效。
6. 多线程问题：如果在事务处理中涉及到多线程操作，则需要特别注意事务管理，否则可能会导致事务失效。
7. 数据库引擎不支持事务：如果使用的数据库引擎不支持事务，或者没有正确配置事务管理器，也会导致事务失效。
8. 数据库操作不符合事务要求：如果在事务处理中，进行了一些不符合事务要求的操作，比如DDL语句、存储过程调用等，则会导致事务失效。

总的来说，事务失效往往是由于代码实现问题或者环境配置问题导致的，需要仔细检查代码和环境配置，确保事务可以正确运行。

