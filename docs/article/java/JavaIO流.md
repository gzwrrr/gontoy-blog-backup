---
index: true
order: 1
---

# JavaIO流



IO 流继承结构

![IO流继承结构](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\JavaIO流.assets\IO流继承结构.png)



File 的构造方法

![image-20220708020022650](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\JavaIO流.assets\File实现的接口.png)

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

p9