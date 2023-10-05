---
title: "Java 泛型"
shortTitle: "Java 泛型"
description: "Java 泛型"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-01-11
category: 
- "java"
tag:
- "java"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Java 泛型"
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
  title: "Java 泛型"
  description: "Java 泛型"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Java 泛型



## dddd





使用泛型需要注意以下几点：

1. 类型擦除：在Java中，泛型只是一种编译时的类型检查机制，在编译时会将所有泛型类型擦除，转换成其原始类型，因此在运行时无法获取泛型类型的具体信息。
2. 泛型通配符：泛型通配符用于表示不确定的类型参数，可以用在泛型类型、方法的参数类型和返回类型中，例如 `List<?>、Map<?, ?>、public void addAll(Collection<? extends T> c)` 等。
3. 泛型的上限和下限：上限表示泛型参数的类型必须是某个类或其子类，下限表示泛型参数的类型必须是某个类或其父类。例如，`List<? extends Number>` 表示 List 的元素类型是 Number 或其子类，而 `List<? super Integer>` 表示 List 的元素类型是 Integer 或其父类。
4. 泛型和数组：Java中不支持泛型数组，可以使用通配符和集合代替泛型数组。
5. 泛型和继承：子类可以重写父类的泛型方法，可以使用泛型通配符实现协变和逆变。
6. 泛型擦除带来的问题：由于类型擦除的存在，可能会出现泛型类型转换异常、类型安全问题等问题，需要在使用泛型时加以注意。
7. 泛型的性能：在某些情况下，使用泛型可能会对性能造成一定的影响，需要根据具体情况进行评估和优化。





## 注意点

Java 中数组是 **协变的**，是在运行期确定具体类型的

Java 中的泛型是 **不变的**，并且在运行期会被擦除泛型，所以不能确定具体的泛型信息

```java
// 编译错误，因为运行期下面的数据的具体类型因为泛型擦除而不能确定
List<String>[] lists = new List<String>[10]; 
```

为了解决这个问题，可以使用通配符和集合代替泛型数组。例如，可以使用`List<List<String>>`代替`List<String>[]`。

**泛型不是协变的，体现在：**

```java
class Animal {// ...}
class Dog extends Animal {// ...}

// Dog 继承于 Animal，但是
List<Animal> 与 List<Dog> 没有任何关系
```

此时可以使用泛型的 **协变** 和 **逆变** 使得泛型可以 **型变**：

```java
// 协变
List<? extends Animal>
// 逆变
List<? super Animal>
```

这样限定后会在编译器进行类型检查，即更加安全：

泛型协变后不能写入，因为此时写入可能造成编译器不报错但是运行期抛异常，例如数组就是 **协变的**，但是数组不会阻止写入，那么就可能写出如下危险的代码：

```java
Animal[] animals = new Cat[2];
animals[0] = new Cat();
// 编译器不会报错，但是下面这行代码会抛运行时异常
animals[1] = new Dog();
Animal animal = animal[0];
```

所以使用泛型协变就是用于 **只读不写** 的场景，或者换种说法：**只消费（获取元素消费）不生产（添加元素）** 的场景。**逆变** 和型变正好相反。

```java
List<? extends Animal> animals = new LinkedList<Cat>();
// 以下四行代码都不能编译通过
// animals.add(new Dog());
// animals.add(new Cat());
// animals.add(new Animal());
// animals.add(new Object());
// 可以添加null，但没意义
animals.add(null);
// 可以安全地取出来
Animal animal = animals.get(0);
```

```java
// 下面这行代码编译不通过
// List<? super Animal> animals = new LinkedList<Cat>();
// 下面都是OK的写法
// List<? super Animal> animals = new LinkedList<Object>();
// List<? super Animal> animals = new LinkedList<Animal>();
// 等价于上面一行的写法
List<? super Animal> animals = new LinkedList<>();
animals.add(new Cat());
animals.add(new Dog());
// 取出来一定是Object
Object object = animals.get(0);

// 这样写是OK的
List<? super Cat> cats = new LinkedList<Animal>();
```





另外还有上下界的概念：

```java
// X可以是Animal及其子类，Animal是X的上界
List<? extends Animal> animals = new LinkedList<X>();
// X可以是Cat及其父类，Cat是X的下界
List<? super Cat> cats = new LinkedList<X>();
```







**通配符：**

在Java代码中，你可能还看到这种写法：`<?>`，它代表任意类型通配符。老规矩，直接上代码：

```java
List<?> anyOne = new LinkedList<Animal>();
List<?> anyTwo = new LinkedList<Cat>();
List<?> anyThree = new LinkedList<Object>();
// anyFour等价于anyThree的写法
List<?> anyFour = new LinkedList<>();
// 这种写法编译不通过
// List<?> anyFive = new LinkedList<?>();

// 具有extends和super的性质
// 这种写法编译不通过
// anyOne.add(new Cat());
// anyOne.add(new Object());
// 能取出来Object类型
Object o = anyOne.get(0);
复制代码
```

也就是说，它是“无界”的，对于任意类型`X`，`List<X>`都是`List<?>`的子类型。但`List<?>`不能add，get出来也是Object类型。它同时具有协变和逆变的两种性质，上界是Object，但不能调用add方法。

那它与`List<Object>`有什么区别呢？根据前面的推断，有两个比较明显的区别：

- `List<Object>`可以调用add方法，但`List<?>`不能。
- `List<?>`可以协变，上界是Object，但`List<Object>`不能协变。



### 小结

泛型是不变的，具有继承关系的父子类在使用泛型时没有任何关系，这样会有很大限制，所以需要型变，即使得泛型支持协变和逆变，使得泛型下父子类具有关系，但是这样做可能有安全问题，所以使用协变或者逆变时会有不同的限制。

通配符 `<?>` 具有协变和逆变的性质，即所有类都是其子类，但是获取到的对象一定是 Object，但是这样与直接使用`<Object>` 不同，因为这样不可以发生型变





## 泛型数组

由于泛型擦除的缘故，泛型数组理应是不存在的：

```java
// 这样会报错
List<double[]>[] graph = new LinkedList<double[]>[n];
```

但是可以换种方式创建，如下：

```java
List<double[]>[] graph = new LinkedList[n];
for (int i = 0; i < n; i++) {
    graph[i] = new LinkedList<>();
}
```

上面的完整写法应该是

```java
// new LinkedList[n] 由于泛型擦除实际上是创建了一个 Object 数组，需要强制转换成 List<double[]> 数组
// 这里需要特别注意，泛型数组是指泛型类数组，而不是数组作为泛型的具体类型，即 List<>[] 称为泛型数组，这里是使用 double[] 作为泛型的具体类型。数组之所以能这样，是因为 java 中的数组也是对象
List<double[]>[] graph = (List<double[]>[]) new LinkedList[n];
for (int i = 0; i < n; i++) {，
    // 这里不要弄混，这里初始化的是整个 List<double[]>，而不是 double[]
    graph[i] = new LinkedList<>();
}
```

这里需要补充一下：

1. 数组支持协变，所以 `LinkedList[]` 是 `Object[]` 的子类
2. 泛型不支持协变，所以 `LinkedList<Double>[]` 不是 `Object[]` 的子类

所以上面的：

```java
List<double[]>[] graph = (List<double[]>[]) new LinkedList[n];
```

不能写成：

```java
List<double[]>[] graph = (List<double[]>[]) new Object[n];
```

因为 `List<double[]>` 不是 `Object` 的子类，不能强制转换（不安全）





### 注意

> 长度不定推荐用 `List<List<Integer>>`，长度固定推荐使用 `List<int[]>`

`List<List<Integer>>` 和 `List<int[]>`  都可以用来存储一组整数列表，但它们的底层数据结构是不同的。

`List<List<Integer>>` 中的每个元素都是一个 `List<Integer>` 对象，它在内存中的结构类似于一个链表，其中每个节点都是一个整数值。由于 `List<Integer>` 是一个对象类型，因此它可以存储 null 值，并且可以使用 List 的各种方法（例如 add、get、remove 等）来操作它。

`List<int[]>` 中的每个元素都是一个 int[] 数组对象，它在内存中的结构类似于一个连续的整数数组。由于 int[] 是一个原始数据类型，因此它不能存储 null 值，并且不能使用 List 的各种方法来操作它。如果需要对其中的元素进行操作，需要使用类似于 for 循环这样的语句来遍历数组。

在实际使用中，如果每个整数列表的长度不一致，或者需要在每个整数列表中存储 null 值，或者需要使用 List 的各种方法来操作其中的元素，那么更推荐使用 `List<List<Integer>>`。否则，如果每个整数列表的长度固定且相等，并且不需要存储 null 值或使用 List 的各种方法来操作其中的元素，那么使用 `List<int[]>` 可以获得更好的性能。











:::info 相关文章

[协变与逆变1](https://www.jianshu.com/p/90948ff4a940)

[协变与逆变2](https://juejin.cn/post/6911302681583681544)

:::

