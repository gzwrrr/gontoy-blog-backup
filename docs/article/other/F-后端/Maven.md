---
title: "Maven"
shortTitle: "Maven"
description: "Maven"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-01
category: 
- "Java"
- "通用"
tag:
- "Java"
- "通用"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Maven"
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
  title: "Maven"
  description: "Maven"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Maven

:::info 相关文章

[Maven 高手系列](https://mp.weixin.qq.com/mp/homepage?__biz=MzA5MTkxMDQ4MQ==&hid=3&sn=eebd634372eda11880ba859ee011942d&scene=1&devicetype=Windows+7+x64&version=63020184&lang=zh_CN&nettype=WIFI&ascene=1&session_us=gh_6a32bacc9543&uin=&key=&fontgear=2)

:::



## 配置

启动文件设置：

上面提到了`mvn`运行的时候，会加载启动的配置文件`settings.xml`，这个文件默认在`M2_HOME/conf`目录，一般我们会拷贝一个放在`~/.m2`目录中，前者是全局范围的配置文件，整个机器上所有用户都会受到该配置的影响，而后者是用户范围级别的，只有当前用户才会受到该配置的影响。推荐使用用户级别的，将其放在`~/.m2`目录，而不去使用全局的配置，以免影响到其他用户的使用。还有这样使用方便日后maven版本升级，一般情况下maven整个安装目录我们都不要去动，升级的时候只需要替换一下安装文件就可以了，很方便。

配置本地缓存目录：

settings.xml中有个`localRepository`标签，可以设置本地缓存目录，maven从远程仓库下载下来的插件以及以后所有我们用到的jar包都会放在这个目录中，如下：

```xml
<localRepository>~/.m2/repository</localRepository>
```



### 约定配置

Maven 提倡使用一个共同的标准目录结构，Maven 使用约定优于配置的原则，大家尽可能的遵守这样的目录结构:

| 目录                               | 目的                               |
| ---------------------------------- | ---------------------------------- |
| ${basedir}                         | 存放pom.xml和所有的子目录          |
| ${basedir}/src/main/java           | 项目的Java源码                     |
| ${basedir}/src/main/resource       | 项目的资源目录                     |
| ${basedir}/src/test/java           | 项目的测试类                       |
| ${basedir}/src/test/resource       | 测试所用的资源                     |
| ${basedir}/src/main/webapp/WEN-INF | web应用文件目录，web项目的信息     |
| ${basedir}/target                  | 打包输出目录                       |
| ${basedir}/target/classes          | 编译输出目录                       |
| ${basedir}/target/test-classes     | 测试编译输出目录                   |
| Test.java                          | 只会自动运行符合该命名规则的测试类 |
| ~/.m2/repository                   | 默认的本地仓库目录位置             |

POM 中可以指定以下配置：

- 项目依赖
- 插件
- 执行目标
- 项目构件 profile
- 项目版本
- 项目开发者列表
- 相关邮件列表信息





### Maven坐标

- goupId：定义当前构件所属的组，通常与域名反向一一对应。
- artifactId：项目组中构件的编号。
- version：当前构件的版本号，每个构件可能会发布多个版本，通过版本号来区分不同版本的构件。
- package：定义该构件的打包方式，比如我们需要把项目打成jar包，采用`java -jar`去运行这个jar包，那这个值为jar；若当前是一个web项目，需要打成war包部署到tomcat中，那这个值就是war，可选（jar、war、ear、pom、maven-plugin），比较常用的是jar、war、pom，这些后面会详解。



### 仓库

在 Maven 中，任何一个依赖、插件或者项目构建的输出，都可以称之为构件。

在 Maven 中，仓库是一个位置，这个位置是用来存放各种第三方构件的，所有maven项目可以共享这个仓库中的构件。

Maven 仓库能帮助我们管理构件（主要是jar包），它就是放置所有jar文件（jar、war、zip、pom等等）的地方。

主要分为2大类：

1. 本地仓库
2. 远程仓库

而远程仓库又分为：中央仓库、私服、其他公共远程仓库



#### 远程仓库配置

在POM文件中：

```xml
<project>
    <repositories>
        <repository>
            <id>aliyun-releases</id>
            <url>https://maven.aliyun.com/repository/public</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
</project>
```

repository元素说明：

- id：远程仓库的一个标识，中央仓库的id是`central`，所以添加远程仓库的时候，id不要和中央仓库的id重复，会把中央仓库的覆盖掉
- url：远程仓库地址
- releases：主要用来配置是否需要从这个远程仓库下载稳定版本构建
- snapshots：主要用来配置是否需要从这个远程仓库下载快照版本构建

releases和snapshots中有个`enabled`属性，是个boolean值，默认为true，表示是否需要从这个远程仓库中下载稳定版本或者快照版本的构建，一般使用第三方的仓库，都是下载稳定版本的构建。

快照版本的构建以`-SNAPSHOT`结尾，稳定版没有这个标识。



镜像仓库：

如果仓库X可以提供仓库Y所有的内容，那么我们就可以认为X是Y的一个镜像，通俗点说，可以从Y获取的构件都可以从他的镜像中进行获取。

可以采用镜像的方式配置远程仓库，镜像在`settings.xml`中进行配置，对所有使用该配置的maven项目起效，配置方式如下：

```xml
<mirror>
  <id>mirrorId</id>
  <mirrorOf>repositoryId</mirrorOf>
  <name>Human Readable Name for this Mirror.</name>
  <url>http://my.repository.com/repo/path</url>
</mirror>
```

mirrors元素下面可以有多个mirror元素，每个mirror元素表示一个远程镜像，元素说明：

- id：镜像的id，是一个标识
- name：镜像的名称，这个相当于一个描述信息，方便大家查看
- url：镜像对应的远程仓库的地址
- mirrorOf：指定哪些远程仓库的id使用这个镜像，这个对应pom.xml文件中repository元素的id，就是表示这个镜像是给哪些pom.xml文章中的远程仓库使用的，这里面需要列出远程仓库的id，多个之间用逗号隔开，`*`表示给所有远程仓库做镜像

这里主要对mirrorOf再做一下说明，上面我们在项目中定义远程仓库的时候，pom.xml文件的repository元素中有个id，这个id就是远程仓库的id，而mirrorOf就是用来配置哪些远程仓库会走这个镜像去下载构件。

mirrorOf的配置有以下几种:

```xml
<mirrorOf>*</mirrorOf> 
```

上面匹配所有远程仓库id，这些远程仓库都会走这个镜像下载构件

```xml
<mirrorOf>远程仓库1的id,远程仓库2的id</mirrorOf> 
```

上面匹配指定的仓库，这些指定的仓库会走这个镜像下载构件

```xml
<mirrorOf>*,! repo1</mirrorOf> 
```

上面匹配所有远程仓库，repo1除外，使用感叹号将仓库从匹配中移除。

需要注意镜像仓库完全屏蔽了被镜像的仓库，所以当镜像仓库无法使用的时候，maven是无法自动切换到被镜像的仓库的，此时下载构件会失败，这个需要了解。



有3种专门的maven仓库管理软件可以用来帮助我们搭建私服：

1. Apache基金会的archiva

   ```
   http://archiva.apache.org/
   ```

2. JFrog的Artifactory

   ```
   https://jfrog.com/artifactory/
   ```

3. Sonatype的Nexus

   ```
   https://my.sonatype.com/
   ```

这些都是开源的私服软件，都可以自由使用。用的最多的是第三种Nexus，本文我们主要以这个来讲解，其他2种有兴趣的朋友可以去研究一下。





## 聚合与继承

对于聚合来说，聚合模块是知道被聚合模块的存在的，而被聚合模块是感知不到聚合模块的存在。

对于继承来说，父构件是感知不到子构件的存在，而子构件需要使用`parent`来引用父构件。



**聚合：**

父 Pom 文件

```xml
<!-- 表明这是一个用于聚合的 pom 文件，可以作为父 pom -->
<packaging>pom</packaging>
```



新的项目中执行任何`mvn`命令，都会`modules`中包含的所有模块执行同样的命令，而被包含的模块不需要做任何特殊的配置，正常的maven项目就行。

注意上面的`module`元素，这部分是被聚合的模块`pom.xml`所在目录的相对路径。

package的值必须为pom，这个需要注意。



**可以被子 pom 集成的属性：**

- groupId：项目组ID，项目坐标的核心元素
- version：项目版本，项目坐标的核心元素
- description：项目的描述信息
- organization：项目的组织信息
- inceptionYear：项目的创始年份
- url：项目的url地址
- developers：项目的开发者信息
- contributors：项目的贡献者信息
- distributionManagement：项目的部署配置信息
- issueManagement：项目的缺陷跟踪系统信息
- ciManagement：项目的持续集成系统信息
- scm：项目的版本控制系统信息
- mailingLists：项目的邮件列表信息
- properties：自定义的maven属性配置信息
- dependencyManagement：项目的依赖管理配置
- repositories：项目的仓库配置
- build：包括项目的源码目录配置、输出目录配置、插件管理配置等信息
- reporting：包括项目的报告输出目录配置、报告插件配置等信息





单继承可以用引入pom依赖解决





## 依赖

### 依赖构件

```xml
<project>
    <dependencies>
        <!-- 在这里添加你的依赖 -->
        <dependency>
            <groupId></groupId>
            <artifactId></artifactId>
            <version></version>
            <type></type>
            <scope></scope>
            <optional></optional>
            <exclusions>
                <exclusion></exclusion>
                <exclusion></exclusion>
            </exclusions>
        </dependency>
    </dependencies>
</project>
```

- dependencies元素中可以包含多个`dependency`，每个`dependency`就表示当前项目需要依赖的一个构件的信息
- dependency中groupId、artifactId、version是定位一个构件必须要提供的信息，所以这几个是必须的
- type：依赖的类型，表示所要依赖的构件的类型，对应于被依赖的构件的packaging。大部分情况下，该元素不被声明，默认值为jar，表示被依赖的构件是一个jar包。
- scope：依赖的范围
- option：标记依赖是否可选，后面详解
- exclusions：用来排除传递性的依赖



**dependencies 与 dependencyManagement：**

父 pom 中的 dependencies 会直接被子 pom 继承，如果不需要全部继承可以使用 dependencyManagement

maven提供的dependencyManagement元素既能让子模块继承到父模块的依赖配置，又能保证子模块依赖使用的灵活性，**在dependencyManagement元素下声明的依赖不会引入实际的依赖，他只是声明了这些依赖，不过它可以对`dependencies`中使用的依赖起到一些约束作用。**



**maven 是单继承的，如果需要引入其他依赖但是又不能继续继承，那么就需要换一种方法：**

当我们想在项目中使用另外一个构件中dependencyManagement声明的依赖，而又不想继承这个项目的时候，可以在我们的项目中使用加入下面配置：

```xml
<dependencyManagement>
    <dependencies>
        <!-- 下面的依赖会替换成对应 pom 中的 dependencyManagement 中的内容 -->
        <!-- 也就是不用继承就可以使用对应 pom 中声明的依赖 -->
        <dependency>
            <groupId>xxx</groupId>
            <artifactId>xxx</artifactId>
            <version>1.0-SNAPSHOT</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```



### 依赖范围

java中编译代码、运行代码都需要用到classpath变量，classpath用来列出当前项目需要依赖的jar包，这块不清楚的可以去看一下classpath和jar。

maven用到classpath的地方有：编译源码、编译测试代码、运行测试代码、运行项目，这几个步骤都需要用到classpath。

编译、测试、运行需要的classpath对应的值可能是不一样的，这个maven中的scope为我们提供了支持，可以帮我们解决这方面的问题，scope是用来控制被依赖的构件与classpath的关系（编译、打包、运行所用到的classpath），scope有以下几种值：

- compile：编译依赖范围，如果没有指定，默认使用该依赖范围，**对于编译源码、编译测试代码、测试、运行4种classpath都有效**，比如上面的spring-web。
- test：测试依赖范围，使用此依赖范围的maven依赖，**只对编译测试、运行测试的classpath有效，在编译主代码、运行项目时无法使用此类依赖**。比如junit，它只有在编译测试代码及运行测试的时候才需要。
- provide：已提供依赖范围。表示项目的运行环境中已经提供了所需要的构件，对于此依赖范围的maven依赖，**对于编译源码、编译测试、运行测试中classpath有效，但在运行时无效**。比如servlet-api，这个在编译和测试的时候需要用到，但是在运行的时候，web容器已经提供了，就不需要maven帮忙引入了。
- runtime：运行时依赖范围，使用此依赖范围的maven依赖，**对于编译测试、运行测试和运行项目的classpath有效，但在编译主代码时无效**，比如jdbc驱动实现，运行的时候才需要具体的jdbc驱动实现。
- system：系统依赖范围，该依赖与3中classpath的关系，和provided依赖范围完全一致。但是，使用system范围的依赖时必须通过systemPath元素显示第指定依赖文件的路径。这种依赖直接依赖于本地路径中的构件，可能每个开发者机器中构件的路径不一致，所以如果使用这种写法，你的机器中可能没有问题，别人的机器中就会有问题，所以建议谨慎使用。
- import：.......

![图片](https://mmbiz.qpic.cn/mmbiz_png/xicEJhWlK06BmBu5jcGtXXESwqDCMf1S2UL9JT09L2kC2CjvVtlFLjLpofGqYxefhutCALMBhGP6cjlo1hcTic6g/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

scope如果对于运行范围有效，意思是指依赖的jar包会被打包到项目的运行包中，最后运行的时候会被添加到classpath中运行。如果scope对于运行项目无效，那么项目打包的时候，这些依赖不会被打包到运行包中。



### 依赖传递

假设A依赖于B，B依赖于C，我们说A对于B是第一直接依赖，B对于C是第二直接依赖，而A对于C是传递性依赖，而第一直接依赖的scope和第二直接依赖的scope决定了传递依赖的范围，即决定了A对于C的scope的值。

下面我们用表格来列一下这种依赖的效果，表格最左边一列表示第一直接依赖（即A->B的scope的值）,而表格中的第一行表示第二直接依赖（即B->C的scope的值），行列交叉的值显示的是A对于C最后产生的依赖效果。

![图片](https://mmbiz.qpic.cn/mmbiz_png/xicEJhWlK06BmBu5jcGtXXESwqDCMf1S2sfFZnIOz520Zf0xZF1y3L0m2tZuLwzJCQuM1EgIKic6icssicbbq05aaQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



### 依赖调节

现实中可能存在这样的情况，A->B->C->Y(1.0)，A->D->Y(2.0)，此时Y出现了2个版本，1.0和2.0，此时maven会选择Y的哪个版本？

解决这种问题，maven有2个原则：

1. 路径最近原则：上面`A->B->C->Y(1.0)，A->D->Y(2.0)`，Y的2.0版本距离A更近一些，所以maven会选择2.0。
2. 最先声明原则：`A->B->Y(1.0)，A->D->Y(2.0)`，此时会看A的pom.xml中所依赖的B、D在`dependencies`中的位置，谁的声明在最前面，就以谁的为主，比如`A->B`在前面，那么最后Y会选择1.0版本。



### 依赖可选

假设有依赖：`A->B->C`

dependency元素下面有个optional，是一个boolean值，表示是一个可选依赖，B->C时将这个值置为true，那么C不会被A自动引入。



### 依赖排除

```xml
<dependency>
    <groupId>com.javacode2018</groupId>
    <artifactId>B</artifactId>
    <version>1.0</version>
    <exclusions>
        <exclusion>
            <groupId>com.javacode2018</groupId>
            <artifactId>C</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```





### 插件

**pluginManagement 插件继承：**

```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <version>3.2.0</version>
                <executions>
                    <execution>
                        <id>attach-source</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>jar-no-fork</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```





## 反应堆（reactor）

`mvn`命令对多模块构件时，会根据模块的依赖关系而得到模块的构建顺序，这个功能就是maven的反应堆（reactor）做的事情，反应堆会根据模块之间的依赖关系、聚合关系、继承关系等等，从而计算得出一个合理的模块构建顺序，所以反应堆的功能是相当强大的。

```shell
mvn clean install -pl b2b-account
mvn clean install -pl b2b-account/b2b-account-api
mvn clean install -pl b2b-account/b2b-account-api,b2b-account/b2b-account-service
mvn clean install -pl :b2b-account-api,b2b-order/b2b-order-api
mvn clean install -pl :b2b-account-api,:b2b-order-service
```



### 按需构建

`-pl,--projects <arg>`

构件指定的模块，arg表示多个模块，之间用逗号分开，模块有两种写法

```
-pl 模块1相对路径 [,模块2相对路径] [,模块n相对路径]
-pl [模块1的groupId]:模块1的artifactId [,[模块2的groupId]:模块2的artifactId] [,[模块n的groupId]:模块n的artifactId]
```

举例：

> 下面命令都是在b2b/pom.xml来运行

```
mvn clean install -pl b2b-account
mvn clean install -pl b2b-account/b2b-account-api
mvn clean install -pl b2b-account/b2b-account-api,b2b-account/b2b-account-service
mvn clean install -pl :b2b-account-api,b2b-order/b2b-order-api
mvn clean install -pl :b2b-account-api,:b2b-order-service
mvn clean install -pl :b2b-account-api
mvn clean install -pl com.javacode2018:b2b-account-api
```

`-rf,--resume-from <arg>`

从指定的模块恢复反应堆

`-am,--also-make`

同时构建所列模块的依赖模块

`-amd,--also-make-dependents`

同时构件依赖于所列模块的模块



引用下面依赖的所有模块都会被构建

```shell
mvn clean install -pl b2b-account/b2b-account-api -amd
```

所有依赖的模块都会一起构建

```shell
mvn clean install -pl b2b-order/b2b-order-service -am
```

裁剪反应堆列表，直接从下面模块部分开始构建

```shell
mvn clean install -rf b2b-order/b2b-order-service
```







## 属性

**内置属性：**

```xml
${basedir}：表示项目根目录，即包含pom.xml文件的目录
${version}：表示项目的版本号

${pom.build.sourceDirectory}：项目的主源码目录，默认为src/main/java/
${project.build.testSourceDirectory}：项目的测试源码目录，默认为src/test/java/
${project.build.directory}：项目构建输出目录，默认为target/
${project.build.outputDirectory}：项目主代码编译输出目录，默认为target/classes
${project.build.testOutputDirectory}：项目测试代码编译输出目录，默认为target/test-classes
${project.groupId}：项目的groupId
${project.artifactId}：项目的artifactId
${project.version}：项目的version，与${version}等价
${project.build.finalName}：项目打包输出文件的名称，默认为${project.artifactId}-${project.version}

${settings.localRepository} 以settings.开头来引用~/.m2/settings.xml中的内容


所有的环境变量都可以使用env.开头的方式来进行引用，如：
${env.JAVA_HOME}


<properties>
    <!-- 项目的主源码目录，默认为src/main/java/ -->
    <a>${pom.build.sourceDirectory}</a>
    <!-- 项目的测试源码目录，默认为src/test/java/ -->
    <b>${project.build.testSourceDirectory}</b>
    <!-- 项目构建输出目录，默认为target/ -->
    <c>${project.build.directory}</c>
    <!-- 项目主代码编译输出目录，默认为target/classes -->
    <d>${project.build.outputDirectory}</d>
    <!-- 项目测试代码编译输出目录，默认为target/test-classes -->
    <e>${project.build.testOutputDirectory}</e>
    <!-- 项目的groupId -->
    <f>${project.groupId}</f>
    <!-- 项目的artifactId -->
    <g>${project.artifactId}</g>
    <!-- 项目的version，与${version}等价-->
    <h>${project.version}</h>
    <!-- 项目打包输出文件的名称，默认为${project.artifactId}-${project.version} -->
    <i>${project.build.finalName}</i>

    <!-- setting属性 -->
    <!-- 获取本地仓库地址-->
    <a1>${settings.localRepository}</a1>

    <!-- 系统属性 -->
    <!-- 用户目录 -->
    <a2>${user.home}</a2>

    <!-- 环境变量属性，获取环境变量JAVA_HOME的值 -->
    <a3>${env.JAVA_HOME}</a3>
</properties>

<!-- 上述的属性是 b2b-account-service 的 pom 文件中的内容，下面的命令可以将上述的实际值输出 -->
mvn help:effective-pom -pl :b2b-account-service > 1.xml
```





## 多套环境构建

> mvn help:all-profiles
>
> mvn help:active-profiles



设置文件复制过程的编码：

```xml
<properties>
    <encoding>UTF-8</encoding>
</properties>
```

资源文件中可以通过`${maven属性}`来引用maven属性中的值，打包的过程中这些会被替换掉，替换的过程默认是不开启的，需要手动开启配置：

```properties
jdbc.url=${jdbc.url}
jdbc.username=${jdbc.username}
jdbc.password=${jdbc.password}
```

```xml
<properties>
    <!-- 指定资源文件复制过程中采用的编码方式 -->
    <encoding>UTF-8</encoding>
    <jdbc.url>jdbc:mysql://localhost:3306/javacode2018?characterEncoding=UTF-8</jdbc.url>
    <jdbc.username>root</jdbc.username>
    <jdbc.password>root</jdbc.password>
</properties>
```

开启动态配置替换：

```xml
<build>
    <resources>
        <resource>
            <!-- 指定资源文件的目录 -->
            <directory>${project.basedir}/src/main/resources</directory>
            <!-- 是否开启过滤替换配置，默认是不开启的 -->
            <filtering>true</filtering>
        </resource>
    </resources>
    <testResources>
        <testResource>
            <!-- 指定资源文件的目录 -->
            <directory>${project.basedir}/src/test/resources</directory>
            <!-- 是否开启过滤替换配置，默认是不开启的 -->
            <filtering>true</filtering>
        </testResource>
    </testResources>
</build>
```



自定义分隔符：

```xml
<plugins>
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-resources-plugin</artifactId>
        <version>2.6</version>
        <configuration>
            <!-- 是否使用默认的分隔符，默认分隔符是${*}和@ ,这个地方设置为false，表示不启用默认分隔符配置-->
            <useDefaultDelimiters>false</useDefaultDelimiters>
            <!-- 自定义分隔符 -->
            <delimiters>
                <delimiter>$*$</delimiter>
                <delimiter>##</delimiter>
            </delimiters>
        </configuration>
    </plugin>
</plugins>
```





包含和排除指定的配置文件：

```xml
<resources>
    <resource>
        <!-- 指定资源文件的目录 -->
        <directory>${project.basedir}/src/main/resources</directory>
        <!-- 是否开启过滤替换配置，默认是不开启的 -->
        <filtering>true</filtering>
        <includes>
            <include>**/jdbc.properties</include>
        </includes>
        <excludes>
            <exclude>**/const.properties</exclude>
        </excludes>
    </resource>
</resources>
```





maven支持让我们配置多套环境，每套环境中可以指定自己的maven属性，mvn命令对模块进行构建的时候可以通过`-P`参数来指定具体使用哪个环境的配置

```xml
<profiles>
    <profile>测试环境配置信息</profile>
    <profile>开发环境配置信息</profile>
    <profile>线上环境配置信息</profile>
    <profile>环境n配置信息</profile>
</profiles>

<profile>
    <id>dev</id>
    <properties>
        <jdbc.url>dev jdbc url</jdbc.url>
        <jdbc.username>dev jdbc username</jdbc.username>
        <jdbc.password>dev jdbc password</jdbc.password>
    </properties>
</profile>
```

id：表示这套环境的标识信息，properties可以定义环境中使用到的属性列表。

执行mvn命令编译的时候可以带上一个`-P profileid`来使用指定的环境进行构建。

```shell
mvn clean package -pl :b2b-account-service -Pdev
```





示例：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.javacode2018</groupId>
    <artifactId>b2b-account-service</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <!-- 指定资源文件复制过程中采用的编码方式 -->
        <encoding>UTF-8</encoding>
    </properties>

    <!-- 配置多套环境 -->
    <profiles>
        <!-- 开发环境使用的配置 -->
        <profile>
            <id>dev</id>
            <!-- 默认开启 dev -->
            <activation>
                <activeByDefault>true</activeByDefault>
                <!-- 对应 mvn clean package -pl :b2b-account-service -Denv=env_prod -->
                <property>
                    <name>env</name>
                    <value>env_dev</value>
            	</property>
            </activation>
            <properties>
                <jdbc.url>dev jdbc url</jdbc.url>
                <jdbc.username>dev jdbc username</jdbc.username>
                <jdbc.password>dev jdbc password</jdbc.password>
            </properties>
        </profile>
        <!-- 测试环境使用的配置 -->
        <profile>
            <id>test</id>
            <properties>
                <jdbc.url>test jdbc url</jdbc.url>
                <jdbc.username>test jdbc username</jdbc.username>
                <jdbc.password>test jdbc password</jdbc.password>
            </properties>
        </profile>
        <!-- 线上环境使用的配置 -->
        <profile>
            <id>prod</id>
            <properties>
                <jdbc.url>prod jdbc url</jdbc.url>
                <jdbc.username>prod jdbc username</jdbc.username>
                <jdbc.password>prod jdbc password</jdbc.password>
            </properties>
        </profile>
    </profiles>

    <dependencies>
        <dependency>
            <groupId>com.javacode2018</groupId>
            <artifactId>b2b-account-api</artifactId>
            <version>${project.version}</version>
        </dependency>
    </dependencies>

    <build>
        <resources>
            <resource>
                <!-- 指定资源文件的目录 -->
                <directory>${project.basedir}/src/main/resources</directory>
                <!-- 是否开启过滤替换配置，默认是不开启的 -->
                <filtering>true</filtering>
                <includes>
                    <include>**/jdbc.properties</include>
                </includes>
            </resource>
            <resource>
                <directory>${project.basedir}/src/main/resources</directory>
                <includes>
                    <include>**/const.properties</include>
                </includes>
            </resource>
        </resources>
        <testResources>
            <testResource>
                <!-- 指定资源文件的目录 -->
                <directory>${project.basedir}/src/test/resources</directory>
                <!-- 是否开启过滤替换配置，默认是不开启的 -->
                <filtering>true</filtering>
            </testResource>
        </testResources>

        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-resources-plugin</artifactId>
                <version>2.6</version>
                <configuration>
                    <!-- 是否使用默认的分隔符，默认分隔符是${*}和@ ,这个地方设置为false，表示不启用默认分隔符配置-->
                    <useDefaultDelimiters>false</useDefaultDelimiters>
                    <!-- 自定义分隔符 -->
                    <delimiters>
                        <delimiter>$*$</delimiter>
                        <delimiter>##</delimiter>
                    </delimiters>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

可以在`-P`参数后跟多个环境的id，多个之间用逗号隔开，当使用多套环境的时候，多套环境中的maven属性会进行合并，如果多套环境中属性有一样的，后面的会覆盖前面的

```shell
mvn clean package -pl :b2b-account-service -Pdev,test,prod
```

查看有那些环境

```shell
mvn help:all-profiles
```



### 环境配置聚合

可以在profile中指定一个外部属性文件`xx.properties`，文件内容是这种格式的：

```properties
key1=value1
key2=value2
keyn=value2
```

```xml
<build>
    <filters>
        <filter>xx.properties文件路径（相对路径或者完整路径）</filter>
    </filters>
</build>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.javacode2018</groupId>
    <artifactId>b2b-account-service</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>com.javacode2018</groupId>
            <artifactId>b2b-account-api</artifactId>
            <version>${project.version}</version>
        </dependency>
    </dependencies>

    <properties>
        <!-- 指定资源文件复制过程中采用的编码方式 -->
        <encoding>UTF-8</encoding>
    </properties>

    <!-- 配置多套环境 -->
    <profiles>
        <!-- 开发环境使用的配置 -->
        <profile>
            <id>dev</id>
            <activation>
                <activeByDefault>true</activeByDefault>
                <property>
                    <name>env</name>
                    <value>env_dev</value>
                </property>
            </activation>
            <build>
                <filters>
                    <filter>../../config/dev.properties</filter>
                </filters>
            </build>
        </profile>
        <!-- 测试环境使用的配置 -->
        <profile>
            <id>test</id>
            <activation>
                <property>
                    <name>env</name>
                    <value>env_test</value>
                </property>
            </activation>
            <build>
                <filters>
                    <filter>../../config/test.properties</filter>
                </filters>
            </build>
        </profile>
        <!-- 线上环境使用的配置 -->
        <profile>
            <id>prod</id>
            <activation>
                <property>
                    <name>env</name>
                    <value>env_prod</value>
                </property>
            </activation>
            <build>
                <filters>
                    <filter>../../config/prod.properties</filter>
                </filters>
            </build>
        </profile>
    </profiles>

    <build>
        <resources>
            <resource>
                <!-- 指定资源文件的目录 -->
                <directory>${project.basedir}/src/main/resources</directory>
                <!-- 是否开启过滤替换配置，默认是不开启的 -->
                <filtering>true</filtering>
            </resource>
        </resources>
        <testResources>
            <testResource>
                <!-- 指定资源文件的目录 -->
                <directory>${project.basedir}/src/test/resources</directory>
                <!-- 是否开启过滤替换配置，默认是不开启的 -->
                <filtering>true</filtering>
            </testResource>
        </testResources>
    </build>
</project>
```







## 命令

### Mvn help:system

> maven中所有的命令都是以插件的形式提供的，所以maven扩展也是相当容易的。

1. 运行`mvn help:system`之后
2. 系统会去环境变量PATH对应的所有目录中寻找mvn命令，然后在`D:\installsoft\maven\apache-maven-3.6.2\bin`中找到了可执行的`mvn`文件
3. 运行mvn文件，也就是执行mvn命令
4. 通常一些软件启动的时候，会有一个启动配置文件，maven也有，mvn命令启动的时候会去`~/.m2`目录寻找配置文件`settings.xml`，这个文件是mvn命令启动配置文件，可以对maven进行一些启动设置（如本地插件缓存放在什么位置等等），若`~/.m2`目录中找不到`settings.xml`文件，那么会去`M2_HOME/conf`目录找这个配置文件，然后运行maven程序
5. mvn命令后面跟了一个参数：`help:sytem`，这个是什么意思呢？这个表示运行`help`插件，然后给help插件发送`system`命令
6. maven查看本地缓存目录（默认为`~/.m2`目录）寻找是否有help插件，如果本地没有继续下面的步骤
7. maven会去默认的一个站点（apache为maven提供的一个网站[repo.maven.apache.org]，这个叫中央仓库）下载help插件到`~/.m2`目录
8. 运行help插件，然后给help插件发送`system`指令，help插件收到`system`指令之后，输出了本地环境变量的信息，如果系统找不到指定的插件或者给插件发送无法识别的命令，都会报错

例如我的输出如下：

```shell
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------< org.apache.maven:standalone-pom >-------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] --------------------------------[ pom ]---------------------------------
[INFO] 
[INFO] --- maven-help-plugin:3.4.0:system (default-cli) @ standalone-pom ---
[INFO] 
===============================================================================
========================= Platform Properties Details =========================
===============================================================================

===============================================================================
System Properties
===============================================================================

java.runtime.name=OpenJDK Runtime Environment
sun.boot.library.path=/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/amd64
java.vm.version=25.392-b08
java.vm.vendor=Private Build
maven.multiModuleProjectDirectory=/home/gzw/A-Code/Java/Individual/gapibe/script
java.vendor.url=http://java.oracle.com/
path.separator=:
guice.disable.misplaced.annotation.check=true
java.vm.name=OpenJDK 64-Bit Server VM
file.encoding.pkg=sun.io
user.country=CN
sun.java.launcher=SUN_STANDARD
sun.os.patch.level=unknown
java.vm.specification.name=Java Virtual Machine Specification
user.dir=/home/gzw/A-Code/Java/Individual/gapibe/script
java.runtime.version=1.8.0_392-8u392-ga-1~22.04-b08
java.awt.graphicsenv=sun.awt.X11GraphicsEnvironment
java.endorsed.dirs=/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/endorsed
os.arch=amd64
java.io.tmpdir=/tmp
line.separator=

java.vm.specification.vendor=Oracle Corporation
os.name=Linux
classworlds.conf=/usr/local/maven/apache-maven-3.8.1/bin/m2.conf
sun.jnu.encoding=UTF-8
java.library.path=/usr/java/packages/lib/amd64:/usr/lib/x86_64-linux-gnu/jni:/lib/x86_64-linux-gnu:/usr/lib/x86_64-linux-gnu:/usr/lib/jni:/lib:/usr/lib
maven.conf=/usr/local/maven/apache-maven-3.8.1/conf
java.specification.name=Java Platform API Specification
java.class.version=52.0
sun.management.compiler=HotSpot 64-Bit Tiered Compilers
os.version=6.5.0-14-generic
library.jansi.path=/usr/local/maven/apache-maven-3.8.1/lib/jansi-native
user.home=/home/gzw
user.timezone=Asia/Shanghai
java.awt.printerjob=sun.print.PSPrinterJob
java.specification.version=1.8
file.encoding=UTF-8
user.name=gzw
java.class.path=/usr/local/maven/apache-maven-3.8.1/boot/plexus-classworlds-2.6.0.jar
java.vm.specification.version=1.8
sun.arch.data.model=64
java.home=/usr/lib/jvm/java-8-openjdk-amd64/jre
sun.java.command=org.codehaus.plexus.classworlds.launcher.Launcher help:system
java.specification.vendor=Oracle Corporation
user.language=zh
awt.toolkit=sun.awt.X11.XToolkit
java.vm.info=mixed mode
java.version=1.8.0_392
java.ext.dirs=/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/ext:/usr/java/packages/lib/ext
securerandom.source=file:/dev/./urandom
sun.boot.class.path=/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/resources.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/rt.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/sunrsasign.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/jsse.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/jce.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/charsets.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/lib/jfr.jar:/usr/lib/jvm/java-8-openjdk-amd64/jre/classes
java.vendor=Private Build
java.specification.maintenance.version=5
maven.home=/usr/local/maven/apache-maven-3.8.1
file.separator=/
java.vendor.url.bug=http://bugreport.sun.com/bugreport/
sun.cpu.endian=little
sun.io.unicode.encoding=UnicodeLittle
sun.desktop=gnome
sun.cpu.isalist=

===============================================================================
Environment Variables
===============================================================================

PWD=/home/gzw/A-Code/Java/Individual/gapibe/script
GDK_BACKEND=x11
LC_TIME=zh_CN.UTF-8
GTK_IM_MODULE=fcitx
DEFAULTS_PATH=/usr/share/gconf/ubuntu.default.path
PATH=/home/gzw/.nvm/versions/node/v18.19.0/bin:/usr/local/maven/apache-maven-3.8.1//bin:/home/gzw/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/snap/bin:/usr/lib/jvm/java-8-openjdk-amd64/bin:/home/gzw/A-Software/Download/aliyunpan-v0.2.8-linux-amd64
LSCOLORS=Gxfxcxdxbxegedabagacad
NVM_DIR=/home/gzw/.nvm
XDG_SESSION_TYPE=x11
CLUTTER_IM_MODULE=xim
DESKTOP_AUTOSTART_ID=10465cb008ece6fa7170546986855619800000288150016
TERMINAL_EMULATOR=JetBrains-JediTerm
TERM_SESSION_ID=e1a4cfe7-cdc2-4e08-aa5d-afa70b948095
XDG_DATA_DIRS=/usr/share/ubuntu:/usr/share/gnome:/home/gzw/.local/share/flatpak/exports/share:/var/lib/flatpak/exports/share:/usr/local/share/:/usr/share/:/var/lib/snapd/desktop
XDG_RUNTIME_DIR=/run/user/1000
GIO_LAUNCHED_DESKTOP_FILE=/home/gzw/.config/autostart/utools.desktop
MAVEN_CMD_LINE_ARGS= help:system
LC_NAME=zh_CN.UTF-8
NVM_BIN=/home/gzw/.nvm/versions/node/v18.19.0/bin
NVM_INC=/home/gzw/.nvm/versions/node/v18.19.0/include/node
CHROME_DESKTOP=uTools.desktop
LC_IDENTIFICATION=zh_CN.UTF-8
LC_ADDRESS=zh_CN.UTF-8
QT_ACCESSIBILITY=1
DISPLAY=:1
GDMSESSION=ubuntu
USERNAME=gzw
XDG_SESSION_CLASS=user
TERM=xterm-256color
ZSH=/home/gzw/.oh-my-zsh
SHELL=/usr/bin/zsh
LC_MONETARY=zh_CN.UTF-8
XDG_CONFIG_DIRS=/etc/xdg/xdg-ubuntu:/etc/xdg
SESSION_MANAGER=local/gontoy:@/tmp/.ICE-unix/28815,unix/gontoy:/tmp/.ICE-unix/28815
IM_CONFIG_PHASE=1
WINDOWPATH=2
GIO_LAUNCHED_DESKTOP_FILE_PID=29276
LC_MEASUREMENT=zh_CN.UTF-8
MANAGERPID=28509
DESKTOP_SESSION=ubuntu
SHLVL=1
QT_IM_MODULE=fcitx
_=/usr/local/maven/apache-maven-3.8.1//bin/mvn
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
XDG_MENU_PREFIX=gnome-
SYSTEMD_EXEC_PID=28815
MAVEN_PROJECTBASEDIR=/home/gzw/A-Code/Java/Individual/gapibe/script
LOGNAME=gzw
HOME=/home/gzw
XMODIFIERS=@im=fcitx
GNOME_SHELL_SESSION_MODE=ubuntu
DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus
NVM_CD_FLAGS=-q
SSH_AGENT_LAUNCHER=gnome-keyring
JOURNAL_STREAM=8:108187
INVOCATION_ID=cf1d2f5077b44393bcc7a4dbf0cbcdd8
M2_HOME=/usr/local/maven/apache-maven-3.8.1/
XDG_CURRENT_DESKTOP=Unity
XDG_SESSION_DESKTOP=ubuntu
MANDATORY_PATH=/usr/share/gconf/ubuntu.mandatory.path
OLDPWD=/home/gzw/A-Code/Java/Individual/gapibe/script
LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:
GNOME_DESKTOP_SESSION_ID=this-is-deprecated
PAGER=less
LC_NUMERIC=zh_CN.UTF-8
PAPERSIZE=a4
SSH_AUTH_SOCK=/run/user/1000/keyring/ssh
ORIGINAL_XDG_CURRENT_DESKTOP=ubuntu:GNOME
LC_PAPER=zh_CN.UTF-8
XAUTHORITY=/run/user/1000/gdm/Xauthority
GPG_AGENT_INFO=/run/user/1000/gnupg/S.gpg-agent:0:1
LESS=-R
LANG=zh_CN.UTF-8
LC_TELEPHONE=zh_CN.UTF-8
GTK_MODULES=gail:atk-bridge
LANGUAGE=zh_CN:en
USER=gzw

[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.292 s
[INFO] Finished at: 2024-01-17T21:04:58+08:00
[INFO] ------------------------------------------------------------------------
```

注意：`mvn 插件名称:help`会输出插件的帮助信息。





## 插件

> https://maven.apache.org/plugins/
>
> 在pom.xml中配置插件的时候，如果是官方的插件，可以省略`groupId`
>
> pluginManagement
>
> mvn help:effective-pom



### 插件配置

```xml
<pluginRepositories>
    <pluginRepository>
        <id>myplugin-repository</id>
        <url>http://repo1.maven.org/maven2/</url>
        <releases>
            <enabled>true</enabled>
        </releases>
    </pluginRepository>
</pluginRepositories>
```



### maven-compiler-plugin

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.8.1</version>
    <configuration>
        <source>1.8</source>
        <target>1.8</target>
        <encoding>UTF-8</encoding>
    </configuration>
</plugin>
```



### maven-surefire-plugin

运行测试用例

```xml
<dependency>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>2.12.4</version>
</dependency>
```





### spring-boot-maven-plugin

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>${spring-boot.version}</version>
    <configuration>
        <mainClass>org.gontoy.log.SpringBootLogDemoApplication</mainClass>
        <skip>true</skip>
    </configuration>
    <executions>
        <execution>
            <id>repackage</id>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```





## 生命周期

maven将项目的生命周期抽象成了3套生命周期，每套生命周期又包含多个阶段，每套中具体包含哪些阶段是maven已经约定好的，但是每个阶段具体需要做什么，是用户可以自己指定的。

maven中定义的3套生命周期：

1. **clean生命周期**
2. **default生命周期**
3. **site生命周期**



### Clean

| 生命周期阶段 | 描述                                  |
| :----------- | :------------------------------------ |
| pre-clean    | 执行一些需要在clean之前完成的工作     |
| clean        | 移除所有上一次构建生成的文件          |
| post-clean   | 执行一些需要在clean之后立刻完成的工作 |





### Default

| 生命周期阶段            | 描述                                                         |
| :---------------------- | :----------------------------------------------------------- |
| validate                | 校验：校验项目是否正确并且所有必要的信息可以完成项目的构建过程。 |
| initialize              | 初始化：初始化构建状态，比如设置属性值。                     |
| generate-sources        | 生成源代码：生成包含在编译阶段中的任何源代码。               |
| process-sources         | 处理源代码：处理源代码，比如说，过滤任意值。                 |
| generate-resources      | 生成资源文件：生成将会包含在项目包中的资源文件。             |
| process-resources       | 编译：复制和处理资源到目标目录，为打包阶段最好准备。         |
| compile                 | 处理类文件：编译项目的源代码。                               |
| process-classes         | 处理类文件：处理编译生成的文件，比如说对Java class文件做字节码改善优化。 |
| generate-test-sources   | 生成测试源代码：生成包含在编译阶段中的任何测试源代码。       |
| process-test-sources    | 处理测试源代码：处理测试源代码，比如说，过滤任意值。         |
| generate-test-resources | 生成测试源文件：为测试创建资源文件。                         |
| process-test-resources  | 处理测试源文件：复制和处理测试资源到目标目录。               |
| test-compile            | 编译测试源码：编译测试源代码到测试目标目录.                  |
| process-test-classes    | 处理测试类文件：处理测试源码编译生成的文件。                 |
| test                    | 测试：使用合适的单元测试框架运行测试（Juint是其中之一）。    |
| prepare-package         | 准备打包：在实际打包之前，执行任何的必要的操作为打包做准备。 |
| package                 | 打包：将编译后的代码打包成可分发格式的文件，比如JAR、WAR或者EAR文件。 |
| pre-integration-test    | 集成测试前：在执行集成测试前进行必要的动作。比如说，搭建需要的环境。 |
| integration-test        | 集成测试：处理和部署项目到可以运行集成测试环境中。           |
| post-integration-test   | 集成测试后：在执行集成测试完成后进行必要的动作。比如说，清理集成测试环境。 |
| verify                  | 验证：运行任意的检查来验证项目包有效且达到质量标准。         |
| install                 | 安装：安装项目包到本地仓库，这样项目包可以用作其他本地项目的依赖。 |
| deploy                  | 部署：将最终的项目包复制到远程仓库中与其他开发者和项目共享。 |



### Site

| 阶段        | 描述                                                       |
| :---------- | :--------------------------------------------------------- |
| pre-site    | 执行一些需要在生成站点文档之前完成的工作                   |
| site        | 生成项目的站点文档                                         |
| post-site   | 执行一些需要在生成站点文档之后完成的工作，并且为部署做准备 |
| site-deploy | 将生成的站点文档部署到特定的服务器上                       |





### 插件目标

maven中的插件以jar的方式存在于仓库中，和其他构件是一样的，也是通过坐标进行访问，每个插件中可能为了代码可以重用，一个插件可能包含了多个功能，比如编译代码的插件，可以编译源代码、也可以编译测试代码；**插件中的每个功能就叫做插件的目标（Plugin Goal），每个插件中可能包含一个或者多个插件目标（Plugin Goal）**。

插件目标是用来执行任务的，那么执行任务肯定是有参数配的，这些就是目标的参数，每个插件目标对应于java中的一个类，参数就对应于这个类中的属性。maven只是定义了生命周期中的阶段，而没有定义每个阶段中具体的实现，这些实现是由插件的目标来完成的，所以需要将阶段和插件目标进行绑定，来让插件目标帮助生命周期的阶段做具体的工作，生命周期中的每个阶段支持绑定多个插件的多个目标。

**当我们将生命周期中的阶段和插件的目标进行绑定的时候，执行`mvn 阶段`就可以执行和这些阶段绑定的`插件目标`。**

3套生命周期的运行时没有依赖的，但是每套中的阶段是有先后顺序的，运行某个阶段的时候，会先执行他前面所有的阶段。清理代码使用的是`clean`周期中的`clean`阶段，编译代码用的是`default`周期中的`compile`阶段，当直接运行`mvn compile`编译代码的时候并不会去清理代码，编译代码的时候若发现文件没有变动，会跳过没有变化的文件进行编译。如果我们想每次编译之前强制先清理代码，我们经常这么写：

```shell
mvn clean compile
```





### Maven内置绑定

#### Clean

| 生命周期阶段 | 插件:目标                |
| :----------- | :----------------------- |
| pre-clean    |                          |
| clean        | maven-clean-plugin:clean |
| post-clean   |                          |



#### Default

| 生命周期阶段           | 插件:目标                            | 执行任务                       |
| :--------------------- | :----------------------------------- | :----------------------------- |
| process-resources      | maven-resources-plugin:resources     | 复制主资源文件至主输出目录     |
| compile                | maven-compiler-plugin:compile        | 编译主代码至主输出目录         |
| process-test-resources | maven-resources-plugin:testResources | 复制测试资源文件至测试输出目录 |
| test-compile           | maven-compiler-plugin:testCompile    | 编译测试代码至测试输出目录     |
| test                   | maven-surefile-plugin:test           | 执行测试用例                   |
| package                | maven-jar-plugin:jar                 | 创建项目jar包                  |
| install                | maven-install-plugin:install         | 将输出构件安装到本地仓库       |
| deploy                 | maven-deploy-plugin:deploy           | 将输出的构件部署到远程仓库     |



##### Site

| 生命周期阶段 | 插件:目标                |
| :----------- | :----------------------- |
| pre-site     |                          |
| site         | maven-site-plugin:site   |
| post-site    |                          |
| site-deploy  | maven-site-plugin:deploy |
