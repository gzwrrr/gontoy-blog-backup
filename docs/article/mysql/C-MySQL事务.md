---
title: "MySQL 事务"
shortTitle: "C-MySQL 事务"
description: "MySQL 事务"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2021-05-29
category: 
- "mysql"
- "数据库"
tag:
- "mysql"
- "数据库"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "MySQL 事务"
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
  title: "MySQL 事务"
  description: "MySQL 事务"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# MySQL 事务

[[toc]]

## 事务的基本特性 ACID

| 中文名 | 英文名      | 解释                                                         |
| ------ | ----------- | ------------------------------------------------------------ |
| 原子性 | Atomicity   | 事务是一个原子操作单元，不可再分割，要么全部执行成功，要么全部不执行 |
| 一致性 | Consistency | 事务执行前后，数据库的完整性约束没有被破坏                   |
| 隔离性 | Isolation   | 并发执行的事务之间是隔离的，一个事务的执行不应影响其他事务的执行 |
| 持久性 | Durability  | 事务完成后，对数据库的修改是永久的，即使系统故障也不会丢失   |

==特别说明：==

在数据库中，完整性约束是指数据库中数据的正确性、有效性、一致性等方面的限制条件，用来保证数据的正确性。例如，主键约束保证每行数据都具有唯一标识符，外键约束保证表与表之间的数据关系正确等。

事务的一致性特性指的是，在事务执行前后，数据库中的完整性约束没有被破坏。也就是说，在一个事务执行前，数据库中的完整性约束已经被满足，事务执行后，数据库中的完整性约束仍然得到保持。

例如，如果一个事务包含了多个操作，其中包括插入、更新、删除等操作，如果这些操作执行后，数据库中的主键、唯一约束、外键等完整性约束仍然被满足，那么就可以认为这个事务是满足一致性特性的。

如果在一个事务中，某个操作破坏了数据库中的完整性约束，那么这个事务就不能满足一致性特性，事务必须被回滚，所有的操作都要撤销，直到数据库中的完整性约束再次被满足。因此，保证数据的完整性约束是非常重要的，事务的一致性特性也是保证数据完整性约束的重要保障之一。





## InnoDB 事务实现

InnoDB 是通过 `Buffer Pool`、`LogBuffer`、`RedoLog`、`UndoLog` 来实现事务的：

1. InnoDB 在收到一个更新语句时，回先根据条件找到数据所在项，并将该也缓存在 Buffer Pool 中
2. 执行更新语句时，会改 Buffer Pool 中的数据，也就是内存中的数据
3. 针对更新语句生成一个 `RedoLog` 对象，并存入 `LogBuffer` 中
4. 针对更新语句生成 `UndoLog` 日志，用于事务回滚
5. 如果事务提交，那么就把 `RedoLog` 对象进行持久化，后续还有其他机制将 `Buffer Pool` 中修改的数据页持久化到磁盘中
6. 如果事务回滚，那么就利用 `UndoLog` 日志进行回滚





## Spring 事务注解

:::info 相关文章

1. [带你读懂Spring 事务——事务的传播机制](https://zhuanlan.zhihu.com/p/148504094)

2. https://mp.weixin.qq.com/s/LbyGTAiCmFy4esNdCJREJQ
3. https://mp.weixin.qq.com/s/mdqVNmPfFphagrrB7EMegA

:::

事务传播行为：所谓事务的传播行为是指，如果在开始当前事务之前，一个事务上下文已经存在，此时有若干选项可以指定一个事务性方法的执行行为。在`TransactionDefinition`定义中包括了如下几个表示传播行为的常量：

| 常量                        | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `PROPAGATION_REQUIRED`      | 如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。这是默认值。 |
| `PROPAGATION_REQUIRES_NEW`  | 创建一个新的事务，如果当前存在事务，则把当前事务挂起。       |
| `PROPAGATION_MANDATORY`     | 如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。 |
| `PROPAGATION_NESTED`        | 如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于`TransactionDefinition.PROPAGATION_REQUIRED`。 |
| `PROPAGATION_SUPPORTS`      | 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。 |
| `PROPAGATION_NOT_SUPPORTED` | 以非事务方式运行，如果当前存在事务，则把当前事务挂起。       |
| `PROPAGATION_NEVER`         | 以非事务方式运行，如果当前存在事务，则抛出异常。             |

