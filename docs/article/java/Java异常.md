---
index: true
order: 7
---

# Java异常


# Java 异常

![异常的继承结构图](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java 异常.assets\异常的继承结构图.png)

- 不管是错误还是异常，都是可抛出的
- Exception 分为两类：编译时异常和运行时异常。这两个异常都是发生在运行阶段，编译阶段异常是不会发生的
- 编译时异常是表示必须在编写程序的时候预先对这种异常进行处理，否则编译器会报错（并不是在编译阶段发生的）；运行时异常在编写程序阶段可以选择处理也可以选择不处理
- Error 一旦发生，Java 程序便会终止执行，退出 JVM，即错误时不能处理的



java 中对异常的处理包括两种方式：

1. 在方法声明式使用 throws 关键字，即抛给上一级
2. 使用 try ... catch 语句进行异常捕获

【注意】如果 Java 中异常发生之后一直上抛，最终抛给 main 方法且 main 继续上抛至调用者 JVM，这时只有一个结果，即终止 Java 程序的执行