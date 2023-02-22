---
title: "基础排序"
shortTitle: "D-基础排序"
description: "基础排序"
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
sticky: 996
star: true
article: true
timeline: true,
dir:
  text: "基础排序"
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
  title: "基础排序"
  description: "基础排序"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 基础排序

![排序算法的时空复杂度比较](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95/20230208/%E5%9F%BA%E7%A1%80%E6%8E%92%E5%BA%8F%E6%97%B6%E9%97%B4%E5%A4%8D%E6%9D%82%E5%BA%A6.png)

**到目前为止：**

- 基于比较的	排序，时间复杂度无法做到 O(n*log_2n) 以下

- 时间复杂度 O(n*log_2n) 的排序，空间复杂度在 O(n) 以下时，无法做到稳定 

**各个排序时空复杂度：**

注：稳定性是指排序后相同的元素能否保持原本的顺。下面的 K 指的是桶的数量

| 序号 | 排序方法名     | 时间复杂度     | 空间复杂度 | 稳定性 |
| ---- | -------------- | -------------- | ---------- | ------ |
| 1    | 选择排序       | O(n^2)         | O(1)       | 不稳定 |
| 2    | 冒泡排序       | O(n^2)         | O(1)       | 稳定   |
| 3    | 插入排序       | O(n) ~  o(n^2​) | O(1)       | 稳定   |
| 4    | 快速排序 (3.0) | O(n*log_2n​​)    | O(log_2n​)  | 不稳定 |
| 5    | 归并排序       | O(n*log_2n)    | O(n)       | 稳定   |
| 6    | 堆排序         | O(n*log_2n​)    | O(1)       | 不稳定 |
| 7    | 基数排序       | O(n*log_2n​)    | O(n)       | 稳定   |
| 8    | 希尔排序       | O(n*log_2n​)    | O(1)       | 不稳定 |
| 9    | 计数排序       | O(n + k)       | O(k)       | 稳定   |
| 10   | 桶排序         | O(n^2)         | O(n + k)   | 稳定   |

注：快速排序最快，但是不稳定也消耗空间；堆排不消耗空间但是较慢；归并消耗空间但是稳定



<br/>

## 1.选择排序

```java
public static void select(int[] arr) {
    int len = arr.length;
 	if (arr == null || len < 2){
        return;
    }
    for (int i = 0; i < len - 1; i++) {
        int min = i;
        for (int j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min != i) {
            Common.swap(arr, min, i);
        }
    }
}
```



<br/>

## 2.冒泡排序

**算法描述：**

- 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
- 针对所有的元素重复以上的步骤，除了最后一个；
- 重复步骤1~3，直到排序完成。

![img](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015223238449-2146169197.gif)

```java
public static void bubble(int[] arr) {
    int len = arr.length;
    if (arr == null || len < 2){
        return;
    }
    for (int i = 0; i < len - 1; i++) {
        for (int j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                Common.swap(arr, j, j + 1);
            }
        }
    }
}
```



<br/>

## 3.插入排序

```java
public static void insert(int[] arr){
    int len = arr.length;
    if (arr == null || len < 2){
        return;
    }

    for (int i = 1; i < len; i++) {
        for (int j = i - 1; j >= 0 && arr[j] > arr[j+1]; j--){
            swap(arr, j, j+1);
        }
    }
}

public static void swap(int[] arr, int i, int j){
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```



<br/>

## 4.归并排序

```java
public static void merger(int[] arr, int l, int r){
    if (l == r) {
        return;
    }
    int mid = l + ((r - l) >> 1);
    merger(arr, l, mid);
    merger(arr, mid+1, r);
    combine(arr, l, mid, r);
}

public static void combine(int[] arr, int l, int mid, int r) {
    int[] helpArr = new int[r - l + 1];
    int p = 0;
    int p1 = l;
    int p2 = mid + 1;
    while(p1 <= mid && p2 <= r){
        helpArr[p++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
    }
    while (p1 <= mid) {
        helpArr[p++] = arr[p1++];
    }
    while (p2 <= r) {
        helpArr[p++] = arr[p2++];
    }
    for (int i = 0; i < helpArr.length; i++) {
        arr[l + i] = helpArr[i];
    }
}
```



<br/>

## 5.快速排序

**代码（3.0 版 随机取值做划分）：**

```java
public static void quick(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    quick(arr, 0, arr.length - 1);
}

public static void quick(int[] arr, int l, int r) {
    if (l < r) {
        // 随机选出一个数放在最右边
        Common.swap(arr, (l + (int)(Math.random() * (r - l +1))), r);
        // 得到相同数字区域的下标，这是一个固定长度为2的数组
        int[] p = partition(arr, l, r);
        // 左边区域开始递归
        quick(arr, l, p[0] - 1);
        // 右边区域开始递归
        quick(arr, p[1] + 1, r);
    }
}

private static int[] partition(int[] arr, int l, int r) {
    // 小于区域右边界
    int less = l - 1
    // 大于区域左边界，不用+1是因为最后一位数不在比较范围内
    int more = r;
    // 当小于指针不越过大于区域左边界时
    while(l < more) {
        // arr[r]是用于比较的值，小于时放在小于区域
        // less 永远比 l 小 1，所以下边是让相邻两个数做交换
        if (arr[l] < arr[r]){
            // 如果小于，相当于执行了swap(arr, x, x)，即自己和自己交换，并且让 less 和 l 都向前移
            Common.swap(arr, ++less, l++);
            // 也可以写成下面的形式 
            // less++;
            // l++;
        } else if (arr[l] > arr[r]) {
            // 大于则交换，但是 l 不用前移，因为交换过来的数还不知道大小
            Common.swap(arr, --more, l);
        } else {
            // 等于直接跳过
            l++;
        }
    }
    // 最后需要将最右侧的数放到大于区域的左边界，保证下一次入栈后的过程一致
    Common.swap(arr, more, r);
    // 返回中间区域的左右下标
    return new int[]{ less+1, more };
}
```



<br/>

## 6.堆排序 

```java
public static void heapSort(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    for (int i = 0; i < arr.length; i++) {
        heapInsert(arr, i);
    }
    // 如果只是想单纯地让数组变成大跟堆，那么下面的方法较快
    // for (int i = arr.length - 1; i >= 0; i--) {
    // heapify(arr, i , arr.length);
    // }
    
    int heapSize  = arr.length;
    Common.swap(arr, 0, --heapSize);
    while (heapSize > 0) {
        heapify(arr, 0, heapSize);
        Common.swap(arr, 0, --heapSize);
    }
}

public static void heapInsert(int[] arr, int index) {
    while (arr[index] > arr[(index - 1) / 2]) {
        Common.swap(arr, index, (index - 1) / 2);
        index = (index - 1) / 2;
    }
}

public static void heapify(int[] arr, int index, int heapSize) {
    // 左孩子的下标
    int left = index * 2 + 1;
    while(left < heapSize) {
        // arr[left + 1] > arr[left] ? left + 1 : left 不能反过来
        int largest = left + 1 < heapSize && arr[left + 1] > arr[left]
                ? left + 1 : left;

        largest = arr[largest] > arr[index] ? largest : index;
        if (largest == index) {
            break;
        }
        Common.swap(arr, index, largest);
        index = largest;
        left = index * 2 + 1;
    }
}
```



<br/>

## 7.基数排序

注：基数排序是基于桶排序的，而桶排序是不基于比较的排序，不仅可用于数字的排序，这就使得桶排序需要根据数据状况设计，基数排序就是专门设计用于数字排序的，且比记数排序（也基于桶排序）好

```java
public static void radix(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }
    radix(arr, 0, arr.length - 1, getMaxDigit(arr));
}

private static int getMaxDigit(int[] arr) {
    int max = Integer.MIN_VALUE;
    for (int i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
    }
    int res = 0;
    // 数出最大的数一共有多少位
    while (max != 0) {
        res++;
        max /= 10;
    }
    return res;
}

// 传入 l 和 r 是为了指定排序的范围，增加灵活性
public static void radix(int[] arr, int l, int r, int digit) {
    // 为了优化代码，不会出现实际的“桶”，而是用记数表数组 count 和辅助数组 bucket 实现进出桶的操作
    final int radix = 10;
    int i = 0;
    int j = 0;
    // 有多少个数就准备多少空间
    int[] bucket = new int[r - l + 1];
    // 进出桶的总次数 / 2 为循环总数，因为进循环一次就完成了一次进出桶操作
    for (int d = 1; d <= digit; d++) {
        /*
         count 最初是记录一个数的某个位上数字相等的数有几个（词频）
         因为一个数某位上的数只能是 0 ~ 9 ，所以 count 固定长度为10，数组下标便是位数，数组内存放的是词频
         然后要将词频表转化成记录：某位上小于或等于 i 的数一共有几个，这是为方便存入 bucket 准备的
         因为这样一来，进出桶的操作就抽象成了两步完成：
         （1）找出一个数对应的词频，词频 - 1 便是存入 bucket 时对应的下标
         （2）count 中相应词频 - 1，因为词频表做了转换变成了小于等于的总次数，
         所以只需关注对应的词频就行，其他数不处理也不会有覆盖的问题
         完成上述两步之后就相当于完成了一次进出桶，比较抽象，不理解可以画图
         其中还有许多细节没有描述，例如进出桶顺序，这些点靠画图才好理解
         总之，下面的代码是经过优化的，比较抽象难懂，单纯看代码很难理解
         */
        // count 长度固定为10，count[i] 表示当前位（d位）是 i 的数字有多少个
        int[] count = new int[radix];
        // 统计词频
        for (i = l; i <= r; i++) {
            j = getDigit(arr[i], d);
            count[j]++;
        }
        // 词频转换成前缀和
        for (i = 1; i < radix; i++) {
            // 第一位（0位）不用加，所以从第二位（1位）开始
            count[i] = count[i] + count[i - 1];
        }
        // 从右往左取出数字放入 bucket 中，完成这步就相当于完成了一次进出桶操作
        for (i = r; i >= l; i--) {
            // 得到 d 位上的数字
            j = getDigit(arr[i], d);
            // 得到前缀和 count[j]，并将 arr[i] 上的数存入 bucket中
            bucket[count[j] - 1] = arr[i];
            // 最后相应的前缀和减1
            count[j]--;
        }
        // 将 bucket 中的数复制进 arr 里，以便进行下一组排序，直到整体排完需序为止
        for (i = l, j = 0; i < r; i++, j++) {
            arr[i] = bucket[j];
        }
    }

}

public static int getDigit(int num, int digit) {
    // 比如：15求个位数字，则 digit = 1，15 / 10 % 10 = 5
    return ((num /((int) Math.pow(10, digit - 1))) % 10);
}
```



<br/>

## 8.希尔排序

```java
public static void shell(int[] arr) {
    int len = arr.length;
    if (arr == null || len < 2) {
        return;
    }
    int gap = len / 2;
    while (gap > 0) {
        for (int i = gap; i < len; i++) {
            int temp = arr[i];
            int index = i - gap;
            while (index >= 0 && arr[index] > temp) {
                arr[index + gap] = arr[index];
                index -= gap;
            }
            arr[index + gap] = temp;
        }
        gap /= 2;
    }
}
```



<br/>

## 9.计数排序

```java
public static void count(int[] arr) {
    int len = arr.length;
    if (arr == null || len < 2) {
        return;
    }

    int max = arr[0], min = arr[0];
    for (int i = 0; i < len; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    int bias = 0 - min;
    int[] bucket = new int[max - min + 1];
    for (int i = 0; i < len; i++) {
        bucket[arr[i] + bias] += 1;
    }

    int index = 0;
    for (int i = 0; i < bucket.length; i++) {
        int length = bucket[i];
        while(length > 0) {
            arr[index++] = i - bias;
            length--;
        }
    }

}
```

<br/>