---
title: "算法-其他"
shortTitle: "Z-算法-其他"
description: "算法-其他"
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
sticky: 990
star: true
article: true
timeline: true
dir:
  text: "算法-其他"
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
  title: "算法-其他"
  description: "算法-其他"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 算法-其他

[[toc]]



## 位运算

- 与：&
- 或：|
- 非：~
- 异或：^

<br/>



### 取 1

```java
// n = n & (n - 1) 会去除 n 最低位的 1，比如：0110 -> 0100
// n = n & (~n + 1) 或者 n = n & -n 会取出 n 最低位的 1，比如：0110 -> 0010
```



### 异或

**二进制，异或的性质**

0 ^ N = N; 

N ^ N = 0;

异或运算满足：结合律、交换律（与顺序无关，可以用无进位相加理解）

**二进制，无进位相加表格理解**

|  a   |  b   |  c   | result |
| :--: | :--: | :--: | :----: |
|  1   |  0   |  1   |   0    |
|  1   |  1   |  1   |   1    |
|  1   |  0   |  0   |   1    |

```java
int a = 1;
int b = 2;

// 大前提：a 和 b 的值可以一样，但是分别指向的内存是不同的
// 因为本质上是内存地址进行了交换，如果地址一样则异或成0
// 两数交换，无需额外空间，且由于是位运算，所以速度较快
a = a ^ b; // a = a ^ b;  b = b;
b = a ^ b; // a = a ^ b;  b = a ^ b ^ b = a;
a = a ^ b; // a = a ^ b ^ a = b;  b = a;
```

**巧用异或的例子：**

```java
/*
*  要求：o(n),n(1)
* （1）有一个数组，奇数个的相同数字只有一个，打印出该数字
* （2）有一个数组，奇数个的相同数字只有两个，打印出该数字
* */

public static void printOneOdd(int[] arr){
    int eor = 0;
    for (int num : arr) {
        eor ^= num;
    }
    System.out.println(eor);
}

public static void printTwoOddNum(int[] arr){
    int eor = 0;
    for (int num : arr) {
        eor ^= num;
    }
	
    // 取出最右边的1
    int rightOne = eor & (~eor + 1);

    int onlyOne = 0;
    for (int num : arr) {
        if ((num & rightOne) == 0) {
            onlyOne ^= num;
        }
    }
    System.out.println(onlyOne + " " + (eor ^ onlyOne));
}
```



<br/>

### 不使用判断返回大值

```java
/**
 * 不使用「判断语句」返回两个有符号整数中较大的数字
 * @author gzw
 */
public class GetMax {
    /**
     * 上游函数保证传入的参数 num 只会是 1 或者 0
     * 该函数的功能是将 num 从 1 变为 0，将 0 变为 1
     * 这样做可以得到两个互斥的条件，条件用 1 或 0 的形式代表，意义自行定义
     * @param num 0 或 1
     */
    public int flip(int num) {
        return num ^ 1;
    }

    /**
     * 获取传入的数字的符号
     * 为 1 代表正数，为 0 代表负数
     */
    public int sign(int num) {
        return flip((num >> 31) & 1);
    }

    /**
     * 使用加法与互斥条件返回两数中的大数
     * 但是这个方法是问题的，因为在求差值时可能溢出
     */
    public int getMax1(int a, int b) {
        // 这里是有可能溢出的
        int c = a - b;
        // c 为正数说明 a >= b，此时 sA = 1，sB = 0，否则 a < b，此时 sA = 0，sB = 1
        int sA = sign(c);
        int sB = flip(sA);
        // 因为是互斥条件，所以只可能返回加号两边的其中一项
        return sA * a + sB * b;
    }

    /**
     * 使用加法与互斥条件返回两数中的大数
     * 这个方法就算差值溢出也能返回正确的结果
     */
    public int getMax2(int a, int b) {
        // 这里是有可能溢出的
        int c = a - b;
        // 求出三个值的符号
        int sA = sign(a);
        int sB = sign(b);
        int sC = sign(c);
        // 当 sA 与 sB 符号相同，difSab = 0，sameSab = 1，否则相反
        int difSab = sA ^ sB;
        int sameSab = flip(difSab);
        // 判断是该返回 a 还是 b
        // 加号左边的含义：两个数符号不相同时，如果 sA 是正数，那么就一定返回 a，因为此时 b 为负数一定小，否则返回 b，所以此处直接用 sA 的状态即可
        // 加号右边的含义：两个数符号相同时，绝对不可能溢出，此时直接用 sC 的结果即可
        int returnA = difSab * sA + sameSab * sC;
        // 与返回 A 的条件互斥
        int returnB = flip(returnA);
        // 因为是互斥条件，所以只可能返回加号两边的其中一项
        return returnA * a + returnB * b;
    }

    public static void main(String[] args) {
        System.out.println(Integer.MIN_VALUE);
        System.out.println(Integer.MAX_VALUE);
        int a = 2147483647, b = -2147480000;
        System.out.println(a - b);
        GetMax getMax = new GetMax();
        System.out.println(getMax.getMax1(a, b)); // 返回错误
        System.out.println(getMax.getMax2(a, b)); // 返回正确
    }
}
```



<br/>

### 判断是否为 2 或 4 的次幂

```java
public class IsPower {
    /**
     * 判断某个数是否是 2 的次幂
     */
    public boolean is2Power(int n) {
        return (n & (n - 1)) == 0;
    }
    /**
     * 判断某个数是否是 4 的次幂
     * 前提就是该数是 2 的次幂
     */
    public boolean is4Power(int n) {
        // 0x55555555 是 01010101...0101
        return (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
    }
}
```



<br/>

### 实现加减乘除

```java
public class ArithmeticOperation {
    /**
     * 前提是 a + b 本身不溢出
     * 溢出是不管是系统还是该方法都不保证计算结果正确
     */
    public int add(int a, int b) {
        int sum = a;
        while (b != 0) {
            // 异或运算本身就是无进位相加
            sum = a ^ b;
            // 与运算能求出进位的结果，当进位为 0 时，此时的 sum 就是最终结果
            b = (a & b) << 1;
            a = sum;
        }
        return sum;
    }
    /**
     * 取反加 1
     */
    public int negNum(int n) {
        return add(~n, 1);
    }
    /**
     * 减法
     */
    public int minus(int a, int b) {
        return add(a, negNum(b));
    }
    /**
     * 乘法
     */
    public int multi(int a, int b) {
        int res = 0;
        while (b != 0) {
            if ((b & 1) != 0) {
                add(res, a);
            }
            a <<= 1;
            // 这里主要要用逻辑右移，否则当 b 是负数时高位会补 1
            b >>>= 1;
        }
        return res;
    }
    /**
     * 判断是否为负数
     */
    public boolean isNeg(int n) {
        return n < 0;
    }
    /**
     * 除法
     */
    public int div(int a, int b) {
        int x = isNeg(a) ? negNum(a) : a;
        int y = isNeg(b) ? negNum(b) : b;
        int res = 0;
        for (int i = 31; i > -1; i = minus(i, 1)) {
            if ((x >> i) >= y) {
                res |= (1 << i);
                x = minus(x, y << i);
            }
        }
        return isNeg(a) ^ isNeg(b) ? negNum(res) : res;
    }
}
```



<br/>

### 大小写转换

利用或操作 `|` 和空格将英文字符转换为小写

```java
('a' | ' ') = 'a'
('A' | ' ') = 'a'
```

利用与操作 `&` 和下划线将英文字符转换为大写

```java
('b' & '_') = 'B'
('B' & '_') = 'B'
```

利用异或操作 `^` 和空格进行英文字符大小写互换

```java
('d' ^ ' ') = 'D'
('D' ^ ' ') = 'd'
```





### 判断两个数是否异号

```java
int x = -1, y = 2;
bool f = ((x ^ y) < 0); // true

int x = 3, y = 2;
bool f = ((x ^ y) < 0); // false
```



### 加减

```java
int n = 1;
n = -~n;
// 现在 n = 2

int n = 2;
n = ~-n;
// 现在 n = 1
```







## 优化

**入手点：**

（1）根据数据状况优化

（2）根据问题描述优化

**例如：**

二分查找一般用于有序数组中查找某一个值，无序数组中很少用到，无序列表应用二分法查找的一个例子是寻找局部最小

```java
/*
	1.局部最小的定义：
	（1）在 0 ~ 1 位置上 arr[0] < arr[1]，0位置局部最小
	（2）在 n-2 ~ n-1 位置上 arr[n-1] < arr[n-2]，n-1 位置局部最小 
	（3）在 i-1 ~ i ~ i+1 位置上 arr[i-1] > arr[i] < arr[i+1]，i 位置局部最小
	
	2.问题描述：
	（1）数组无序
	（2）任意相邻数之间不重复
	（3）在 时间复杂度 < o(n) 的情况下找出一个局部最小的位置
	
	以上的数据与题目描述适合用二分法，这就是一个根据数况与问题优化解题的例子 
*/
```



<br/>

## 对数器

**对数器的概念：**

- 方法 A：优化后的解法，但不知道是否正确

- 方法 B：相对容易的实现的解法，已知正确

- 随机生成两个相同的数组，分别放入 A 和 B 测试 N 次比对结果是否一致，当 N 足够大时就能保		  证 A  方法是正确的，这就是对数器的基础理解

**优点：**

- 保证优化后的代码正确

- 不用依赖线上测试平台

**缺点：**

- 需要实现两种解法



<br/>

## 比较器

- 比较器的是指就是重载比较运算符

- 比较器可以很好地应用在特殊标准的排序上

- 比较器可以很好地应用在根据特殊标准排序的结构上



<br/>

##  求中点

```java
int l = 0;
int r = 100;
int mid = 0;

// 用此方法可能会有溢出问题
mid = (l + r) / 2;

// 所以用位运算，且速度较快
mid = l + ((r - l) >> 1);
```



## 等概率返回

```java
/**
 * 自己改造随机
 * 例如：17 ~ 56 等概率返回，39 = 56 - 17 + 1
 *   f(): 0/1        6 位最大 64         超出 39 就重做    最后得到 0 ~ 39 再加上 17 即可
 * 获得 01 发生器 -> 看看需要几个二进制位 -> 超出范围就重做 -> 最后加回去
 */
public class randomTest {
    // 最终等概率返回函数
    public static int g() {
        return f06() + 1;
    }

    public static int f06() {
        int ans = 0;
        do {
            ans = f07();
        } while (ans == 7);
        return ans;
    }

    // 使用 0 1 等概率发生器随机出等概率的 [0, 7]
    public static int f07() {
        return (f01() << 2) + (f01() << 1) + f01();
    }

    // 只能用 randomf 获得等概率的 0 和 1
    public static int f01() {
        int ans = 0;
        do {
            ans = f();
        } while (ans == 3);
        return ans < 3 ? 0 : 1;
    }

    // 下面的函数不能改变
    // [1, 5] 等概率返回
    public static int f() {
        return (int)(Math.random() * 5) + 1;
    }
}
```



## 取模 & 快速幂

防止乘法溢出

```java
// (a * b) % k = (a % k) * (b % k) % k
    
int base = 1337;

// 计算 a 的 k 次方然后与 base 求模的结果
int mypow(int a, int k) {
    // 对因子求模
    a %= base;
    int res = 1;
    for (int _ = 0; _ < k; _++) {
        // 这里有乘法，是潜在的溢出点
        res *= a;
        // 对乘法结果求模
        res %= base;
    }
    return res;
}
```

快速幂，相关文章：https://mp.weixin.qq.com/s?__biz=MzA5MTM1NTc2Ng==&mid=2458321758&idx=1&sn=e92e7a72d245831c29acb3d2a29607da&scene=21#wechat_redirect

```java
int base = 1337;

int mypow(int a, int k) {
    if (k == 0) return 1;
    a %= base;

    if (k % 2 == 1) {
        // k 是奇数
        return (a * mypow(a, k - 1)) % base;
    } else {
        // k 是偶数
        int sub = mypow(a, k / 2);
        return (sub * sub) % base;
    }
}

// 递推
int qpow(int x, int n) {
    int res = 1;
    while (n) {
        if (n & 1) res *= x;
        x *= x;
        n >>= 1;
    }
    return res;
}
```

