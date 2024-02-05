---
title: "其他经典算法"
shortTitle: "Z-其他经典算法"
description: "其他经典算法"
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
sticky: 997
star: true
article: true
timeline: true
dir:
  text: "其他经典算法"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 30
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "其他经典算法"
  description: "其他经典算法"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 其他经典算法

[[toc]]



## 布隆过滤器

- 典型应用：网站链接黑名单，爬虫去重
- 操作只有增加、查询，没有删除
- 有一定程度的失误（不可避免，但是可以设计得很低）
- 使用「位图」（bit arr / bit map），用基础类型拼凑，与单样本大小无关
- 原理：对一个输入取 K 个哈希值，将位图（大小为 M）中对应的 bit 位「描黑」（置1/0），下次再判断输入是否在位图中即可（K 个哈希值有一个是「白」的就说明输入不在位图中）
- 具体实现时，需要考虑 K 和 M 的取值范围，K 太小太大或者 M 太小都会增加失误率（M 取值占主要）

经过数学证明的公式（N 为样本量，P 为失误率，均向上取整）：

> M = -(N * lnP / (ln2)^2)
>
> K = ln2 * M / N ≈ 0.7 * M / N
>
> P真 = (1 - e^(- N * K真 / M真))^K真





## 滑动窗口

> 滑动窗口是一种基于双指针的一种思想，两个指针指向的元素之间形成一个窗口

滑动窗口分为两类：

- 一种是固定大小类的窗口
- 一类是大小动态变化的窗口

滑动窗口初始指针一般是「左闭右开」的，即：[left, right)

滑动窗口一般是由两个「循环」组成：

```java
// 时间复杂度是 O(N)
int left = 0, right = 0;
while (right < s.size()) {
    // 增大窗口
    window.add(s[right]);
    right++;
    while (window needs shrink) {
        // 缩小窗口
        window.remove(s[left]);
        left++;
    }
}
```

**滑动窗口框架：**

```c
/* 滑动窗口算法框架 */
void slidingWindow(string s, string t) {
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;

    int left = 0, right = 0;
    int valid = 0; 
    while (right < s.size()) {
        // c 是将移入窗口的字符
        char c = s[right];
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        ...

        /*** debug 输出的位置 ***/
        printf("window: [%d, %d)\n", left, right);
        /********************/

        // 判断左侧窗口是否要收缩
        while (window needs shrink) {
            // d 是将移出窗口的字符
            char d = s[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            ...
        }
    }
}
```

**题目：最小覆盖子串，即寻找子序列（注意不是子串，二者有区别，有时候题目会说成子串，但是实际上是子序列），使用滑动窗口遍历一次：**

> 题目示例：S=ABNDHGDSN，T=HNG，那么最小覆盖子序列就是：NDHG（很明显是子序列）

流程大致为：使用两个指针 `left` 与 `right` 作为窗口，使用 `window` 哈希表记录窗口中每个字符的个数，使用 `need` 哈希表记录子串 `t` 中每个字符的个数。开始左右指针都在起始位置，右指针 `right` 先不断前进，前进时不断更新 `window` 中的字符的个数，并查看 `need` 中是否包含该字符并且 **该字符的数量也相等**，相等时使用一个变量 `valid` 记录 `window` 和 `need` 的字符及其数量都匹配的个数，当 `valid` 等于 `nedd.size()` 时，说明窗口中一定包含了子串中所有字符，并且需要的字符的个数也正确。

接下来要做的就是检验窗口中是否确实有需要的子串，做法就是让左指针 `left` 开始前进，前进时更新窗口中的字符个数以及 `valid` 变量，一旦  `valid` 小于了 `need.size()` 就说明窗口中已经没有了我们需要的字符或说有字符但是个数不对，此时左指针 `left` 就不需要再继续前进了，需要做的就是让右指针 `right` 继续前进直到再次满足 `valid`  等于 `need.size()`，不断这样操作直到遍历完成。

在左指针移动的过程中，还需要不断更新维护字符串中子串起始位置 `start`（其实就是不断更新到 `left` 的位置）以及窗口长度 `len`，因为左右指针的移动条件或说移动规则保证了需要的子串（如果确实有子串）一定在窗口内，所以更新起始位置变得很简单，遍历一遍便可以直接确定子串位置。

```java
public String minWindow(String s, String t) {
    // 记录字符的个数与滑动窗口
    Map<Character, Integer> need = new HashMap<Character, Integer>(), window = new HashMap<Character, Integer>();

    // 初始化 need Map，所有需要的字符个数初始化为 0
    for (int i = 0; i < t.length(); i++) {
        need.put(t.charAt(i), need.getOrDefault(t.charAt(i), 0) + 1);
    }

    // 初始化左右指针，这个是需要滑动的窗口
    int left = 0, right = 0;
    // 初始化记录字串的起始指针与长度，这个是需要根据条件更新的数据
    int start = 0, length = Integer.MAX_VALUE;
    // 记录是否合法，当数量与 t 的长度一致时合法，此时找到了字串，但是可能不是最短的，需要继续更新
    int valid = 0;

    // 开始遍历
    while (right < s.length()) {
        // 取出一个字符后，right 指针后移一位
        char ch = s.charAt(right++);
        // 判断 ch 是否在 need 中，是的话 need 中对应的字符个数 + 1
        if (need.containsKey(ch)) {
            // 更新窗口的值
            window.put(ch, window.getOrDefault(ch, 0) + 1);
            // 需要的字符达到个数就让 valid + 1
            if (window.get(ch).equals(need.get(ch))) {
                valid++;
            }
        }

        // 当出现一个符合的字串时，左指针开始往后移
        while (valid == need.size()) {
            // 更新最小覆盖长度
            if (right - left < length) {
                start = left;
                length = right - left;
            }
            // 取出一个字符看是否让子串变得不符合要求
            char c = s.charAt(left++);
            if (window.containsKey(c)) {
                if (window.get(c).equals(need.get(c))) {
                    valid--;
                }
                window.put(c, window.getOrDefault(c, 0) - 1);
            }
        }
    }
    return length == Integer.MAX_VALUE ? "" : s.substring(start, length + start);
}
```

**题目：判断 S 是否包含 T 的排列，即 T 的排列是 S 的子串，这里很明显也是找子序列，和上面的寻找最小覆盖子串类似，只是左指针的移动条件有变化**

> 题目示例：S=ahdjbc，T=cb，此时返回的是 True，因为 T 的排列 bc 是 S 的子串

```java
public boolean checkInclusion(String s1, String s2) {
    // 存储 s1 中字符的个数，因为其中可能有重复的，所以 size 要额外注意
    Map<Character, Integer> need = new HashMap<>(), window = new HashMap<>();

    // 初始化 need 中的个数
    for (int i = 0; i < s1.length(); i++) {
        need.put(s1.charAt(i), need.getOrDefault(s1.charAt(i), 0) + 1);
    }

    // 初始化左右指针，均为 0
    int left = 0, right = 0;
    // 初始化是否合法的标识（是否有合法的字串）
    int valid = 0;

    // 开始遍历
    while (right < s2.length()) {
        // 取出一个字符，取出后右指针后移
        char ch = s2.charAt(right++);
        // 如果取出的 ch 是 need 中的一个字符，那么 window 中对应的字符个数 + 1，当 window 中字符个数等于 need 中对应的字符的个数时，valid + 1
        if (need.containsKey(ch)) {
            window.put(ch, window.getOrDefault(ch, 0) + 1);
            if (need.get(ch).equals(window.get(ch))) {
                valid++;
            }
        }

        // 判断窗口是否需要缩小
        while (right - left >= s1.length()) {
            // 这里先判断是否合法，即是否已经找到了字串
            if (valid == need.size()) {
                return true;
            }
            // 取出一个字符，并让左指针后移一位
            char c = s2.charAt(left++);
            // 更新状态
            if (need.containsKey(c)) {
                if (need.get(c).equals(window.get(c))) {
                    valid--;
                }
                window.put(c, window.getOrDefault(c, 0) - 1);
            }
        }
    }
    return false;
}
```

:::warning 注意

上面的解法是没有优化的版本，使用的存储的数据结构开销比较大，整体的效率比较低。

但是这里主要说的是思路，思路有了怎么改都行

:::

<br/>







## N 数之和

:::info 相关文章

[一个函数秒杀 2Sum 3Sum 4Sum 问题](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485789&idx=1&sn=efc1167b85011c019e05d2c3db1039e6&scene=21#wechat_redirect)

:::

```java
public List<List<Integer>> fourSum(int[] nums, int target) {
    Arrays.sort(nums);
    List<List<Integer>> res = nSum(nums, 4, 0, target);
    return res;
}

// N 数之和，通过递归和 base case（两数之和）得出，效率不是很高，但是通用
public List<List<Integer>> nSum(int[] nums, int n, int start, long target) {
    int len = nums.length;
    List<List<Integer>> res = new LinkedList<>();
    if (n < 2 || len < n) {
        return res;
    }
    if (n == 2) {
        int p1 = start, p2 = nums.length - 1;
        while (p1 < p2) {
            int left = nums[p1], right = nums[p2];
            int sum = right + left;
            if (sum < target) {
                p1++;
            } else if (sum > target){
                p2--;
            } else {
                List<Integer> item = new ArrayList<>();
                item.add(left);
                item.add(right);
                res.add(item);
                while (left == nums[p1] && p1 < p2) {
                    p1++;
                }
                while (right == nums[p2] && p1 < p2) {
                    p2--;
                }
            }
        }
    } else {
        for (int i = start; i < nums.length; i++) {
            int num = nums[i];
            List<List<Integer>> nSum = nSum(nums, n - 1, i + 1, target - num);
            for (List<Integer> item : nSum) {
                item.add(num);
                res.add(item);
            }
            // 跳过三个数字中第一个数字（防止重复）
            while (i < nums.length - 1 && nums[i] == nums[i + 1]) {
                i++;
            }
        }
    }
    return res;
}
```







## 前缀和数组

:::info 相关文章

[前缀和技巧：解决子数组问题](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484488&idx=1&sn=848f76e86fce722e70e265d0c6f84dc3&scene=21#wechat_redirect)

:::

前缀和 `preSum` 用于快速确定 `nums[i...j]` 区域的相加的值，例如要找到 `nums[i...j]` 区域相加的值，只需要 `sums[j + 1] - sum[i]`

```java
int[] scores; // 存储着所有同学的分数
// 试卷满分 150 分
int[] count = new int[150 + 1]
// 记录每个分数有几个同学
for (int score : scores)
    count[score]++
// 构造前缀和
for (int i = 1; i < count.length; i++)
    count[i] = count[i] + count[i-1];
```

例如题目：

> 和为 K 的子数组：给你一个整数数组 `nums` 和一个整数 `k` ，请你统计并返回 *该数组中和为 `k` 的连续子数组的个数* 。

```java
public int subarraySum(int[] nums, int k) {
    int len = nums.length;
    int[] sum = new int[len + 1];
    for (int i = 0; i < len; i++) {
        sum[i + 1] = sum[i] + nums[i];
    }
    int res = 0;
    for (int i = 0; i < len; i++) {
        for (int j = i; j < len; j++) {
            if (sum[j + 1] - sum[i] == k) {
                res++;
            }
        }
    }
    return res;
}
```

还可以使用哈希表优化（具体看上面的给出的原文章）：

```java
public int subarraySum(int[] nums, int k) {
    int len = nums.length;
    Map<Integer, Integer> map = new HashMap<>();
    int res = 0;
    int sum_i = 0;
    map.put(0, 1);

    for (int i = 0; i < len; i++) {
        sum_i += nums[i];
        int sum_j = sum_i - k;
        if (map.containsKey(sum_j)) {
            res += map.get(sum_j);
        }
        map.put(sum_i, map.getOrDefault(sum_i, 0) + 1);
    }
    return res;
}
```





## 差分数组

:::info 相关文章

[论那些小而美的算法技巧：差分数组/前缀和](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247487011&idx=1&sn=5e2b00c1c736fd7afbf3ed35edc4aeec&scene=21#wechat_redirect)

:::

> 差分数组用于对数组的某一个区域的所有数进行非常频繁的加减操作

具体实现（直接看文章就可以了，有图很清晰）：

```java
class Diff {
    int[] diff;

    public Diff(int[] nums) {
        this.diff = new int[nums.length];
        for (int i = 1; i < diff.length; i++) {
            diff[i] = nums[i] - nums[i - 1];
        }
    }

    public int[] getResult() {
        int[] res = new int[diff.length];
        res[0] = diff[0];
        for (int i = 1; i < diff.length; i++) {
            res[i] = diff[i] + res[i - 1];
        }
        return res;
    }

    public void increase(int i, int j, int val) {
        diff[i] +=val;
        if (j + 1 < diff.length) {
            diff[j + 1] -= val;
        }
    }
}
```







## 最近最少使用 （LRUCache）

:::info 相关文章

[Java集合之LinkedHashMap](https://www.cnblogs.com/xiaoxi/p/6170590.html)

[Leetcode 题解](https://leetcode.cn/problems/lru-cache/solutions/259678/lruhuan-cun-ji-zhi-by-leetcode-solution/)

:::

```java
class LRUCache {

    class DLinkedNode {
        int key;
        int value;
        DLinkedNode pre;
        DLinkedNode next;

        public DLinkedNode(int k, int v) {
            key = k;
            value = v;
        }
    }

    Map<Integer, DLinkedNode> cache;
    int capacity;
    int size;
    DLinkedNode head;
    DLinkedNode tail;

    public LRUCache(int cap) {
        capacity = cap;
        size = 0;
        head = new DLinkedNode(-1, -1);
        tail = new DLinkedNode(-1, -1);
        cache = new HashMap<>();
        head.next = tail;
        tail.pre = head;
    }

    public int get(int key) {
        DLinkedNode res = cache.get(key);
        if (res == null) {
            return -1;
        }
        moveToHead(res);
        return res.value;
    }

    public void put(int key, int value) {
        DLinkedNode res = cache.get(key);
        if (res == null) {
            DLinkedNode node = new DLinkedNode(key, value);
            cache.put(key, node);
            addToHead(node);
            size++;
            if (size > capacity) {
                DLinkedNode remove = removeTail();
                cache.remove(remove.key);
                size--;
            }
        } else {
            res.value = value;
            moveToHead(res);
        }
    }

    // 添加头节点
    public void addToHead(DLinkedNode node) {
        node.pre = head;
        node.next = head.next;
        head.next.pre = node;
        head.next = node;
    }

    // 将节点移动到头部
    public void moveToHead(DLinkedNode node) {
        removeNode(node);
        addToHead(node);
    }

    // 移除节点
    public void removeNode(DLinkedNode node) {
        node.pre.next = node.next;
        node.next.pre = node.pre;
    }

    // 移除尾节点
    public DLinkedNode removeTail() {
        DLinkedNode res = tail.pre;
        removeNode(res);
        return res;
    }
}

/**
 * 使用 LinkedHashMap 实现
 */
class LRUCache01 extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCache01(int capacity) {
        super(capacity, 0.75F, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}
```





## 随机算法

:::info 相关文章

[说透游戏中常用的两种随机算法](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247498181&idx=1&sn=1e015d4bae3491beb1070c1105428577&scene=21#wechat_redirect)

:::

### 二维数组随机

降维成一维数组

```java
// 扫雷炸弹随机生成
class Game {
    int m, n;
    // 大小为 m * n 的二维棋盘
    // 值为 true 的地方代表有雷，false 代表没有雷
    boolean[][] board;
}

class Game {
    int m, n;
    // 长度为 m * n 的一维棋盘
    // 值为 true 的地方代表有雷，false 代表没有雷
    boolean[] board;

    // 将二维数组中的坐标 (x, y) 转化为一维数组中的索引
    int encode(int x, int y) {
        return x * n + y;
    }

    // 将一维数组中的索引转化为二维数组中的坐标 (x, y)
    int[] decode(int index) {
        return new int[] {index / n, index % n};
    }
}
```



### 洗牌算法

> 打乱数组

```java
class Solution {
    private int[] nums;
    private Random rand = new Random();
    
    public Solution(int[] nums) {
        this.nums = nums;
    }
    
    public int[] reset() {
        return nums;
    }
    
    // 洗牌算法
    public int[] shuffle() {
        int n = nums.length;
        int[] copy =  Arrays.copyOf(nums, n);
        for (int i = 0 ; i < n; i++) {
            // 生成一个 [i, n-1] 区间内的随机数
            int r = i + rand.nextInt(n - i);
            // 交换 nums[i] 和 nums[r]
            swap(copy, i, r);
        }
        return copy;
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```





### 水塘抽样法

> 抽取 K 个随机元素

```java
/* 返回链表中一个随机节点的值 */
int getRandom(ListNode head) {
    Random r = new Random();
    int i = 0, res = 0;
    ListNode p = head;
    // while 循环遍历链表
    while (p != null) {
        i++;
        // 生成一个 [0, i) 之间的整数
        // 这个整数等于 0 的概率就是 1/i
        if (0 == r.nextInt(i)) {
            res = p.val;
        }
        p = p.next;
    }
    return res;
}

/* 返回链表中 k 个随机节点的值 */
int[] getRandom(ListNode head, int k) {
    Random r = new Random();
    int[] res = new int[k];
    ListNode p = head;

    // 前 k 个元素先默认选上
    for (int i = 0; i < k && p != null; i++) {
        res[i] = p.val;
        p = p.next;
    }

    int i = k;
    // while 循环遍历链表
    while (p != null) {
        i++;
        // 生成一个 [0, i) 之间的整数
        int j = r.nextInt(i);
        // 这个整数小于 k 的概率就是 k/i
        if (j < k) {
            res[j] = p.val;
        }
        p = p.next;
    }
    return res;
}

// 在区间 [lo, hi) 中随机抽取 k 个数字
int[] sample(int lo, int hi, int k) {
    Random r = new Random();
    int[] res = new int[k];

    // 前 k 个元素先默认选上
    for (int i = 0; i < k; i++) {
        res[i] = lo + i;
    }

    int i = k;
    // while 循环遍历数字区间
    while (i < hi - lo) {
        i++;
        // 生成一个 [0, i) 之间的整数
        int j = r.nextInt(i);
        // 这个整数小于 k 的概率就是 k/i
        if (j < k) {
            res[j] = lo + i - 1;
        }
    }
    return res;
}
```





### 蒙特卡洛方法

> 测试次数越多，最终各个随机数出现的概率就几乎相等

```java
public static void main(String[] args) {
    // 在 [12, 22) 中随机选 3 个数
    int lo = 12, hi = 22, k = 3;
    // 记录每个元素被选中的次数
    int[] count = new int[hi - lo];
    // 重复 10 万次
    int N = 1000000;
    for (int i = 0; i < N; i++) {
        int[] res = sample(lo, hi, k);
        for (int elem : res) {
            // 对随机选取的元素进行记录
            count[elem - lo]++;
        }
    }
    System.out.println(Arrays.toString(count));
}
```







## 阶乘

阶乘后 0 的数量转化为 n 可以有多少个因子 5

```java
int trailingZeroes(int n) {
    int res = 0;
    long divisor = 5;
    while (divisor <= n) {
        res += n / divisor;
        divisor *= 5;
    }
    return res;
}

// 或者
long trailingZeroes(long n) {
    long res = 0;
    for (long d = n; d / 5 > 0; d = d / 5) {
        res += d / 5;
    }
    return res;
}
```







## 素数

:::info 相关文章

[如何用算法高效寻找素数](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484472&idx=1&sn=ab8e97d0211de37bf6770a63caacc630&scene=21&poc_token=HI-k02SjY1Utrdv7uy9aLPUekEtd6GnLhxqUXCn_)

:::

判断一个数是否是素数

```java
12 = 2 × 6
12 = 3 × 4
12 = sqrt(12) × sqrt(12)
12 = 4 × 3
12 = 6 × 2

boolean isPrime(int n) {
    for (int i = 2; i * i <= n; i++)
        ...
}
```

算出某个范围内的素数有多少个（Sieve of Eratosthenes），时间复杂度：O(N * loglogN)

```java
int countPrimes(int n) {
    boolean[] isPrim = new boolean[n];
    // 将数组都初始化为 true
    Arrays.fill(isPrim, true);

    for (int i = 2; i < n; i++) 
        if (isPrim[i]) 
            // i 的倍数不可能是素数了
            for (int j = 2 * i; j < n; j += i) 
                    isPrim[j] = false;

    int count = 0;
    for (int i = 2; i < n; i++)
        if (isPrim[i]) count++;

    return count;
}

// 改进
int countPrimes(int n) {
    boolean[] isPrim = new boolean[n];
    Arrays.fill(isPrim, true);
    for (int i = 2; i * i < n; i++) 
        if (isPrim[i]) 
            for (int j = i * i; j < n; j += i) 
                isPrim[j] = false;

    int count = 0;
    for (int i = 2; i < n; i++)
        if (isPrim[i]) count++;

    return count;
}
```

