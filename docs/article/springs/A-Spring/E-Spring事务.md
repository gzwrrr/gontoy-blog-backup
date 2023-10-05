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
timeline: true
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

Spring事务传播机制是指在多个事务方法相互调用时，不同事务方法之间事务如何传播的机制。Spring中定义了七种事务传播行为，可以通过设置 @Transactional注解或者TransactionDefinition对象来指定。

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





## 事务源码

:::info 相关文章

1. [可能是最漂亮的 Spring 事务管理详解](https://mp.weixin.qq.com/s?__biz=MzUzMTA2NTU2Ng==&mid=2247484702&idx=1&sn=c04261d63929db09ff6df7cadc7cca21&chksm=fa497aafcd3ef3b94082da7bca841b5b7b528eb2a52dbc4eb647b97be63a9a1cf38a9e71bf90&token=165108535&lang=zh_CN#rd)

:::

:::note 说明

**Spring并不直接管理事务，而是提供了多种事务管理器** ，他们将事务管理的职责委托给Hibernate或者JTA等持久化机制所提供的相关平台框架的事务来实现。 Spring事务管理器的接口是： **org.springframework.transaction.PlatformTransactionManager** ，通过这个接口，Spring为各个平台如JDBC、Hibernate等都提供了对应的事务管理器，但是具体的实现就是各个平台自己的事情了。

:::



### PlatformTransactionManager

PlatformTransactionManager 中包含三个方法：

```java
public interface PlatformTransactionManager ... {
    // 根据指定的传播行为，返回当前活动的事务或创建一个新事务
    TransactionStatus getTransaction(TransactionDefinition definition) throws TransactionException;
    // 使用事务目前的状态提交事务
    Void commit(TransactionStatus status) throws TransactionException;
    // 对执行的事务进行回滚
    Void rollback(TransactionStatus status) throws TransactionException;
}
```

各个事务管理器的具体实现：

| 序号 | 事务管理器实现类                                             | 说明                                                    |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------- |
| 1    | `orgspringframeworkjdbc.datasource.DataSourceTransactionManager` | 使用SpringJDBC或者iBatis进行持久化数据时使用            |
| 2    | `org.springframeworkorm.hibernate3.HibernateTransactionManager` | 使用Hibernate3.0版本进行持久化数据时使用                |
| 3    | `org.springframework.ormjpa.JpaTransactionManager`           | 使用JPA进行数据持久化时使用                             |
| 4    | `org.springframework.transaction.jta.JtaTransactionManager`  | 使用一个JTA实现来管理事务，在一个事务跨越多个资源时使用 |



### TransactionDefinition

> TransactionDefinition 是事务管理器 getTransaction 方法的入参，该对象内部定义了一些事务的属性

```java
public interface TransactionDefinition ... {
    // 返回事务的隔离级别，事务管理器根据它来控制另外一个事务可以看到本事务内的哪些数据
    int getIsolationLevel();
    // 使用后端数据库默认的隔离级别，Mysql 默认采用的 REPEATABLE_READ隔离级别 Oracle 默认采用的 READ_COMMITTED隔离级别
    int ISOLATION_DEFAULT = -1;
    // 最低的隔离级别，允许读取尚未提交的数据变更，可能会导致脏读、幻读或不可重复读
    int ISOLATION_READ_UNCOMMITTED = 1;
    // 允许读取并发事务已经提交的数据，可以阻止脏读，但是幻读或不可重复读仍有可能发生
    int ISOLATION_READ_COMMITTED = 2;
    // 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，可以阻止脏读和不可重复读，但幻读仍有可能发生
    int ISOLATION_REPEATABLE_READ = 4;
    // 最高的隔离级别，完全服从ACID的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰
    // 也就是说，该级别可以防止脏读、不可重复读以及幻读。但是这将严重影响程序的性能。通常情况下也不会用到该级别
    int ISOLATION_SERIALIZABLE = 8; 
    
    
    // 返回事务的传播行为
    // 当事务方法被另一个事务方法调用时，必须指定事务应该如何传播。例如：方法可能继续在现有事务中运行，也可能开启一个新事务，并在自己的事务中运行
    int getPropagationBehavior();
    // 下面前 6 个是与 EJB 共享的，最后 1 个是 Spring 特有的嵌套事务（保存点的应用）
    // 如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务
    int PROPAGATION_REQUIRED = 0;
    // 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行
    int PROPAGATION_SUPPORTS = 1;
    // 如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常
    int PROPAGATION_MANDATORY = 2;
    // 创建一个新的事务，如果当前存在事务，则把当前事务挂起
    int PROPAGATION_REQUIRES_NEW = 3;
    // 以非事务方式运行，如果当前存在事务，则把当前事务挂起
    int PROPAGATION_NOT_SUPPORTED = 4;
    // 以非事务方式运行，如果当前存在事务，则抛出异常
    int PROPAGATION_NEVER = 5;
    // 如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于TransactionDefinition.PROPAGATION_REQUIRED
    int PROPAGATION_NESTED = 6;
    
    
    // 返回事务必须在多少秒内完成
    // 所谓事务超时，就是指一个事务所允许执行的最长时间，如果超过该时间限制但事务还没有完成，则自动回滚事务。
    // 在 TransactionDefinition 中以 int 的值来表示超时时间，其单位是秒。
    int getTimeout();
    int TIMEOUT_DEFAULT = -1;
    
    
    // 返回是否优化为只读事务
    // 所谓事务性资源就是指那些被事务管理的资源，比如数据源、 JMS 资源，以及自定义的事务性资源等等
    boolean isReadOnly();

	
    // 返回事务的名字
    String getName();
}
```





### TransactionStatus

> TransactionStatus 接口用来记录事务的状态，该接口定义了一组方法，用来获取或判断事务的相应状态信息

```java
public interface TransactionStatus ... {
    // 是否是新的事务
    boolean isNewTransaction();
    // 是否有恢复点
    boolean hasSavepoint();
    // 设置为只回滚
    void setRollbackOnly();  
    // 是否为只回滚
    boolean isRollbackOnly(); 
    // 是否已完成
    boolean isCompleted; 
}
```





## 事务实战

> Spring 支持编程式事务与声明式事务

:::info 相关文章

1. [可能是最漂亮的Spring事务管理详解](https://juejin.cn/post/6844903608224333838)

:::



### 编程式事务

> 可以使用 TransactionTemplate 或者 PlatformTransactionManager 管理事务

```java
@Autowired
private TransactionTemplate transactionTemplate;
public void testTransaction() {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus transactionStatus) {
                try {
                    // 业务代码
                } catch (Exception e){
                    // 回滚
                    transactionStatus.setRollbackOnly();
                }
            }
        });
}

@Autowired
private PlatformTransactionManager transactionManager;
public void testTransaction() {
  TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
          try {
              // 业务代码
              transactionManager.commit(status);
          } catch (Exception e) {
              // 回滚
              transactionManager.rollback(status);
          }
}
```





### 声明式事务

> 实际开发中使用基于注解 @Transaction 的声明式事务用到比较多

```java
@Transactional(propagation=propagation.PROPAGATION_REQUIRED)
public void someService() {
  // 业务代码
  // ...
}
```





