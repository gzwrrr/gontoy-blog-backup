---
title: "基础查找"
shortTitle: "E-基础查找"
description: "基础查找"
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
sticky: 995
star: true
article: true
timeline: true,
dir:
  text: "基础查找"
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
  title: "基础查找"
  description: "基础查找"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# 基础查找

**各个查找时空复杂度**

| 序号 | 查找方法名 | 时间复杂度 | 空间复杂度 |
| :--: | ---------- | ---------- | ---------- |
|  1   | 二分查找   | O(log_2n​)  | O(n)       |



## 1.二分查找

**还可以解决：**

在有序数组中，找出大于等于某个数的最左位置或小于等于某个数的最右位置

**二分查找框架：**

```java
int binarySearch(int[] nums, int target) {
    int left = 0, right = ...;
    while(...) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            ...
        } else if (nums[mid] < target) {
            left = ...
        } else if (nums[mid] > target) {
            right = ...
        }
    }
    return ...;
}
```

**基础二分查找：**

```java
int binarySearch(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1; // 注意
    while(left <= right) {
        int mid = left + (right - left) / 2;
        if(nums[mid] == target)
            return mid;
        else if (nums[mid] < target)
            left = mid + 1; // 注意
        else if (nums[mid] > target)
            right = mid - 1; // 注意
    }
    return -1;
}
```

**寻找左边界的二分查找：**

`left` 的含义是 `nums` 数组中小于 `target` 的数的个数

```java
int left_bound(int[] nums, int target) {
    if (nums.length == 0) return -1;
    int left = 0;
    int right = nums.length; // 注意
    while (left < right) { // 注意
        int mid = (left + right) / 2;
        if (nums[mid] == target) {
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid; // 注意
        }
    }
    if (left >= nums.length || nums[left] != target) {
        return -1;        
    }
    return left;
}

// 第二种写法
int left_bound(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    // 搜索区间为 [left, right]
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            // 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else if (nums[mid] > target) {
            // 搜索区间变为 [left, mid-1]
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 收缩右侧边界
            right = mid - 1;
        }
    }
    // 检查出界情况
    if (left >= nums.length || nums[left] != target) {
        return -1;        
    }
    return left;
}
```

`right` 的含义是 `nums` 数组中大于 `target` 的数的个数

```java
int right_bound(int[] nums, int target) {
    if (nums.length == 0) return -1;
    int left = 0, right = nums.length;
    while (left < right) {
        int mid = (left + right) / 2;
        if (nums[mid] == target) {
            left = mid + 1; // 注意
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid;
        }
    }
    if (left == 0) {
        return -1;
    }
	return nums[left - 1] == target ? (left - 1) : -1;
}

// 第二种写法
int right_bound(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 这⾥改成收缩左侧边界即可
            left = mid + 1;
        }
    }
    // 这⾥改为检查 right 越界的情况，⻅下图
    if (right < 0 || nums[right] != target) {
        return -1;        
    }
    return right;
}
```





## 2.斐波那契查找



## 3.插值查找



## 4.线性查找