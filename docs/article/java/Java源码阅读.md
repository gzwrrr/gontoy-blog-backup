---
index: true
order: 8
---

# Java源码阅读



# Java 源码阅读环境搭建

写在前面：

- 【注】Windows 10 环境下（与 Mac 没有什么不同，只是后续必须删除部分文件，否则会报错编译不通过） Java 源码阅读环境是跟着 codesheep 羊哥搭建的，[视频戳这里（Mac）](https://www.bilibili.com/video/BV1V7411U78L?spm_id_from=333.337.search-card.all.click&vd_source=e356fec025b50061af78324a814f8da0)。
- 搭建源码阅读环境主要是为了直观地了解源码的结构以及在源码上直接加上一些自己的理解（注释）





1. 第一步：找到本地 JDK 的安装路径，找到 src.zip 目录

![image-20220707113001091](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\1.png)





2. 第二步：新建一个 Java 的最普通的工程项目，这里编辑器使用的是 IDEA

![image-20220707113236655](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\3.png)

![image-20220707113301884](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\2.png)





3. 第三步：将 src.zip 目录解压，完成后将其中的文件放入新创建的项目下，目录结构如下

![image-20220707113523743](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\4.png)



4. 第四步：依次点击 File -> Setting -> Build, Execution, Deployment -> Complier，将 Build process heap size 改大一些，否则之后编译不通过

![image-20220707135309820](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\5.png)



5. 第五步：以此点击 File -> Setting -> Build, Execution, Deployment -> Debug -> Stepping，将 Do not step into the class 勾选去掉，如果不去掉则后续调试时会无法进入源码

![image-20220707135618956](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\7.png)



6. 第六步，以此点击 File -> Project Structure -> SDKs -> Sourcepath，将原本 src.zip 后缀的文件去除再添加项目中的源码的根目录，如下所示。如果不修改那么之后调试进入源码时还是会跟到 JDK 中的源码而不是自己项目中的，这也意味着不能修改不能加注释。

![image-20220707135958358](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\8.png)



7. 第七步：编写一个测试类，打上断点进行 Debug，如下所示。注意编译时 com.sun 包下的部分文件可能会爆红，这个貌似只会在 Windows 环境下出现，不过只要删除掉爆红的包和文件即可，主要的源码在 java 包下，所以直接删除掉 com.sun 包下的部分文件不会影响后续的阅读

![image-20220707140420168](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\9.png)

![image-20220707140444240](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\10.png)





8. java 包下主要阅读的包如下所示，即：io、lang、math、net、nio、time、util 这七个包

![image-20220707141130782](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Java\Java源码阅读.assets\11.png)