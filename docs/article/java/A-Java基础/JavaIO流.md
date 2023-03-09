---
title: "JavaIO流"
shortTitle: "JavaIO流"
description: "JavaIO流"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-10-05
category: 
- "java"
- "io流"
tag:
- "java"
- "io流"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "JavaIO流"
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
  title: "JavaIO流"
  description: "JavaIO流"
  author:
    name: gzw
    email: 1627121193@qq.com
---






# JavaIO流

[[toc]]

IO 流继承结构

![IO流继承结构](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//javaio/20230209/IO%E6%B5%81%E7%BB%A7%E6%89%BF%E7%BB%93%E6%9E%84.png)



File 的构造方法

![image-20220708020022650](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//javaio/20230209/file%E7%9A%84%E6%9E%84%E9%80%A0%E6%96%B9%E6%B3%95.png)

```java
// 根据路径构造一个 File 对象
new File(String pathname);

// 根据父目录文件 + 子路径构建
new File(File parent, String child);

// 根据父目录 + 子目录构建
new File(String parent, String child);
```



File 创建方法

```java
public class CreateFile01 {
    public static void create1() {
        String path = "路径\\test1.txt";

        File file = new File(path);

        try {
            file.createNewFile();
            System.out.println("文件创建成功！");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void create2() {
        File parent = new File("路径\\");
        String fileName = "test2.txt";
        File file = new File(parent, fileName);

        try {
            file.createNewFile();
            System.out.println("文件创建成功！");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void create3() {
        String parentPath = "路径\\";

        String fileName = "test3.txt";

        File file = new File(parentPath, fileName);

        try {
            file.createNewFile();
            System.out.println("文件创建成功！");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```



File 的常用方法

```java
public class FileInfo01 {
    public static void main(String[] args) {
        File file = new File("路径\\test1.txt");
        System.out.printf("文件名：%s\n", file.getName());
        System.out.printf("文件绝对路径：%s\n", file.getAbsolutePath());
        System.out.printf("文件父级目录：%s\n", file.getParent());
        System.out.printf("文件大小（字节）：%s\n", file.length());
        System.out.printf("文件是否存在：%s\n", file.exists());
        System.out.printf("是否为文件：%s\n", file.isFile());
        System.out.printf("是否为目录：%s\n", file.isDirectory());
    }
}
```

