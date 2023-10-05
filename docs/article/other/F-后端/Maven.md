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



## 聚合与继承

对于聚合来说，聚合模块是知道被聚合模块的存在的，而被聚合模块是感知不到聚合模块的存在。

对于继承来说，父构件是感知不到子构件的存在，而子构件需要使用`parent`来引用父构件。



**聚合：**

父 Pom 文件

```xml
<!-- 表明这是一个用于聚合的 pom 文件，可以作为父 pom -->
<packaging>pom</packaging>
```



**可以被子 pom 集成的属性：**
groupId：项目组ID，项目坐标的核心元素
version：项目版本，项目坐标的核心元素
description：项目的描述信息
organization：项目的组织信息
inceptionYear：项目的创始年份
url：项目的url地址
developers：项目的开发者信息
contributors：项目的贡献者信息
distributionManagement：项目的部署配置信息
issueManagement：项目的缺陷跟踪系统信息
ciManagement：项目的持续集成系统信息
scm：项目的版本控制系统信息
mailingLists：项目的邮件列表信息
properties：自定义的maven属性配置信息
dependencyManagement：项目的依赖管理配置
repositories：项目的仓库配置
build：包括项目的源码目录配置、输出目录配置、插件管理配置等信息
reporting：包括项目的报告输出目录配置、报告插件配置等信息



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

