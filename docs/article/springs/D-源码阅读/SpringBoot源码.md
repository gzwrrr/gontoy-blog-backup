---
title: "Spring Boot 源码"
shortTitle: "Spring Boot 源码"
description: "Spring Boot 源码"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "spring"
tag:
- "spring"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Spring Boot 源码"
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
  title: "Spring Boot 源码"
  description: "Spring Boot 源码"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Spring Boot 源码

**spring-boot-project 包含模块：**

1. spring-boot（核心）：核心实现，大概 4 万行代码
2. spring-boot-autoconfigure（核心）：可以根据类路径内容自动配置大部分常用的程序，大概 4 万行代码
3. spring-boot-actuator：监控和管理生产环境的模块，暴露自身应用信息，大概 2 W 行代码
4. spring-boot-actuator-autoconfigure：spring-boot-actuator 的自动配置功能，可以不看
5. spring-boot-starters：启动模块，只包含 Pom.xml 文件，可以不看
6. spring-boot-cli：提供命令行功能，可以运行 Groovy 脚本，可以不看
7. spring-boot-dependencies：依赖管理，可以不看
8. spring-boot-devtools：热部署，可以不看
9. spring-boot-test：提供测试方面的支持，可以不看
10. spring-boot-test-autoconfigure：spring-boot-test 的自动配置功能，可以不看
11. spring-boot-parent：其他项目的 parent，该模块的父模块是 spring-boot-dependencies，可以不看
12. spring-boot-tools：略
13. spring-boot-docs：略
14. spring-boot-properties-migrator：略



## jar 启动原理

jar 包中包含四大模块：

1. META-INF：`MANIFEST.MF` 文件提供了 `jar` 包的元数据，其中声明了 jar 包的启动类
2. org：spring-boot-loader 模块，是 Spring Boot 启动的关键，解决了 jar 包嵌套的问题
3. BOOT-INF/lib：项目中引入的依赖
4. BOOT-INF/classes：项目源文件（.class 文件、配置文件）



### MANIFEST.MF

> 下面是 Halo 项目的 jar 包中 MANIFEST.MF 的内容

```shell
# 版本
Manifest-Version: 1.0
# 引用名称
Implementation-Title: Halo Application
Implementation-Version: 1.5.4
# 加载类，由 spring-boot-maven-plugin 插件写入该信息
Main-Class: org.springframework.boot.loader.JarLauncher
# 项目启动类
Start-Class: run.halo.app.Application
Spring-Boot-Version: 2.5.12
# 项目源文件（.class 和配置文件）
Spring-Boot-Classes: BOOT-INF/classes/
# 项目依赖
Spring-Boot-Lib: BOOT-INF/lib/
# 项目依赖索引
Spring-Boot-Classpath-Index: BOOT-INF/classpath.idx
# 项目层次结构索引
Spring-Boot-Layers-Index: BOOT-INF/layers.idx
```

主要实现如下：

```java
// 三大核心如下
protected void launch(String[] args) throws Exception {
    // 注册 URL 协议的处理器
    // 处理器的作用：处理 jar: 协议的 URL 的资源读取，后续读取每个 Archive 里的内容
    JarFile.registerUrlProtocolHandler();
    // 类加载器：LaunchedURLClassLoader
    ClassLoader classLoader = createClassLoader(getClassPathArchives());
    // 执行 Start-Class 指定的启动类
    launch(args, getMainClass(), classLoader);
}

// 上面类加载部分的 createClassLoader 方法如下
// Archive 对象是项目档案的抽象
// BOOT-INF/classes/ 目录被归类为「一个」 Archive 对象
// BOOT-INF/lib/ 目录下的「每个」内嵌 jar 包都对应一个 Archive 对象
// 也就是将所有需要的文件「平铺开来」
protected ClassLoader createClassLoader(List<Archive> archives) throws Exception {
    List<URL> urls = new ArrayList<>(archives.size());
    for (Archive archive : archives) {
        urls.add(archive.getUrl());
    }
    // 返回 LaunchedURLClassLoader，用于后续加载 BOOT-INF/classes/ 和 BOOT-INF/lib/
    return createClassLoader(urls.toArray(new URL[0]));
}

// 找到 Start-Class 指定的启动类
protected String getMainClass() throws Exception {
    Manifest manifest = this.archive.getManifest();
    String mainClass = null;
    if (manifest != null) {
        mainClass = manifest.getMainAttributes().getValue("Start-Class");
    }
    if (mainClass == null) {
        throw new IllegalStateException("No 'Start-Class' manifest entry specified in " + this);
    }
    return mainClass;
}

// 运行指定的启动类
protected void launch(String[] args, String mainClass, ClassLoader classLoader) throws Exception {
    Thread.currentThread().setContextClassLoader(classLoader);
   	// 这里是通过反射运行 Start-Class 指定的类的 main 方法
    createMainMethodRunner(mainClass, args, classLoader).run();
}
```

总结：

1. 处理器：处理 jar: 协议的 URL 的资源读取，后续读取每个 Archive 里的内容
2. Archive：jar 包中的 class 和所有依赖中嵌套的 jar 都被转换为 Archive 对象
3. LaunchedURLClassLoader：加载所有类
4. launch：反射运行元数据中指定的启动类的 main 方法





## 自动配置

加上注解 `@EnableAutoConfiguration` 启动自动配置，注意，加上 `@SpringBootApplication` 就直接开启了自动配置

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
// java 自带注解，子类会自动继承当前注解
@Inherited
// 继承自 @Configuration，标注为一个配置
@SpringBootConfiguration
// 开启自动配置
@EnableAutoConfiguration
// 扫描指定路径下的 Component
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
@ConfigurationPropertiesScan
public @interface SpringBootApplication { ... }
```

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
// 会主动获取主类的包路径，并将包路径下的所有 Component 注入 IoC 容器中
@AutoConfigurationPackage
// 核心注解：@Import，核心类：AutoConfigurationImportSelector
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
	String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";
	Class<?>[] exclude() default {};
	String[] excludeName() default {};
}
```

AutoConfigurationImportSelector 类中的核心方法如下：

```java
// 注意这里实现了 DeferredImportSelector
class AutoConfigurationImportSelector implements DeferredImportSelector, BeanClassLoaderAware,
		ResourceLoaderAware, BeanFactoryAware, EnvironmentAware, Ordered {
    // 后面改方法会被该类下的另一个方法调用
    // 简单来说就是获取候选的配置类，但是之后还需要做过滤
    protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
    	// 加载所有带有 EnableAutoConfiguration 的类，这些类的全限定名在 META-INF/spring.factories 里中声明
        List<String> configurations = SpringFactoriesLoader
            .loadFactoryNames(getSpringFactoriesLoaderFactoryClass(), getBeanClassLoader());
        Assert.notEmpty(configurations, 
                        "No auto configuration classes found in META-INF/spring.factories. If you "
                        + "are using a custom packaging, make sure that file is correct.");
        return configurations;
	}
}
```

获取到需要自动装配的类后就需要解析，核心类为 ConfigurationClassParser：

```java
class ConfigurationClassParser {
    private static class DeferredImportSelectorGrouping {
        private final DeferredImportSelector.Group group;
        private final List<DeferredImportSelectorHolder> deferredImports = new ArrayList();
        DeferredImportSelectorGrouping(DeferredImportSelector.Group group) {
            this.group = group;
        }
        public void add(DeferredImportSelectorHolder deferredImport) {
            this.deferredImports.add(deferredImport);
        }
        
        // 处理被 @Import 注解标注的类，返回需要导入的配置类
        // 注意：DeferredImportSelector 的具体实现就是 AutoConfigurationImportSelector
        // 这里的 Group 是 AutoConfigurationImportSelector 的内部类，具体实现在下面
        public Iterable<DeferredImportSelector.Group.Entry> getImports() {
            Iterator var1 = this.deferredImports.iterator();
			
            while(var1.hasNext()) {
                DeferredImportSelectorHolder deferredImport = (DeferredImportSelectorHolder)var1.next();
                // 处理被 @Import 注解的注解
                this.group.process(deferredImport.getConfigurationClass().getMetadata(), deferredImport.getImportSelector());
            }
			// 选择需要导入的配置类
            return this.group.selectImports();
        }
    }
}
```

可以发现 ConfigurationClassParser 依赖于 AutoConfigurationGroup 类，AutoConfigurationGroup 的核心方法如下：

```java
// 实现自 DeferredImportSelector 接口
public Class<? extends Group> getImportGroup() {
    return AutoConfigurationGroup.class;
}

// 注意：AutoConfigurationGroup 是 AutoConfigurationImportSelector 的内部类
// 实现 DeferredImportSelector.Group、BeanClassLoaderAware、BeanFactoryAware、ResourceLoaderAware 接口，自动配置的 Group 实现类
private static class AutoConfigurationGroup
		implements DeferredImportSelector.Group, BeanClassLoaderAware, BeanFactoryAware, ResourceLoaderAware {
    
	// 元数据映射，key 为配置类的全限定类名，在 process 方法中赋值
    private final Map<String, AnnotationMetadata> entries = new LinkedHashMap<>();
	
    // AutoConfigurationEntry 的数组，AutoConfigurationEntry 是 AutoConfigurationImportSelector 的内部类
    // AutoConfigurationEntry 包含了两个类型的全限定类名数组：配置类数组 和 「排除」的配置类数组
    // 同样在 process 方法中赋值
    private final List<AutoConfigurationEntry> autoConfigurationEntries = new ArrayList<>();

    // 自动配置的元数据，实现按条件加载
    private AutoConfigurationMetadata autoConfigurationMetadata;
    
    // 获取需要自动配置的配置类（注意不是候选配置类，而是已经过滤后的配置类）
    public void process(AnnotationMetadata annotationMetadata, DeferredImportSelector deferredImportSelector) {
        Assert.state(deferredImportSelector instanceof AutoConfigurationImportSelector,
                     () -> String.format("Only %s implementations are supported, got %s",
                                         AutoConfigurationImportSelector.class.getSimpleName(),
                                         deferredImportSelector.getClass().getName()));
        // 获得 AutoConfigurationEntry 对象
        AutoConfigurationEntry autoConfigurationEntry = ((AutoConfigurationImportSelector) deferredImportSelector)
            // 这个方法很重要，是在 AutoConfigurationImportSelector 中实现的，具体看下面
            .getAutoConfigurationEntry(getAutoConfigurationMetadata(), annotationMetadata);
        // 添加到 autoConfigurationEntries 中
        this.autoConfigurationEntries.add(autoConfigurationEntry);
        for (String importClassName : autoConfigurationEntry.getConfigurations()) {
            // entries 赋值
            this.entries.putIfAbsent(importClassName, annotationMetadata);
        }
    }
    
    // process 方法中调用的 getAutoConfigurationMetadata 方法，返回 PropertiesAutoConfigurationMetadata
    // 这个方法会根据「条件」加载配置类，这里涉及到 @ConditionalOnClass 注解
    // 比如 A.class 上标注了 @ConditionalOnClass({ B.class, C.class, D.class })，那么只有 classpath 下有 B、C、D 三个类，A 才会生效
    // 简单来说，AutoConfigurationMetadata 用途就是制定配置类（Configuration）的生效条件
    private AutoConfigurationMetadata getAutoConfigurationMetadata() {
        if (this.autoConfigurationMetadata == null) {
            this.autoConfigurationMetadata = AutoConfigurationMetadataLoader.loadMetadata(this.beanClassLoader);
        }
        return this.autoConfigurationMetadata;
    }
    
    // 在 process 过滤后，再次排除一些类，获得要自动配置的配置类
    // 然后该方法被上面提到的 ConfigurationClassParser 解析类获取并解析
    public Iterable<Entry> selectImports() {
        if (this.autoConfigurationEntries.isEmpty()) {
            return Collections.emptyList();
        }
        // 获得 allExclusions
        Set<String> allExclusions = this.autoConfigurationEntries.stream()
            .map(AutoConfigurationEntry::getExclusions).flatMap(Collection::stream).collect(Collectors.toSet());
        // 从 processedConfigurations 中，移除排除的
        Set<String> processedConfigurations = this.autoConfigurationEntries.stream()
            .map(AutoConfigurationEntry::getConfigurations).flatMap(Collection::stream)
            .collect(Collectors.toCollection(LinkedHashSet::new));
        processedConfigurations.removeAll(allExclusions);
		
        // sortAutoConfigurations 进行了排序，涉及到 @Order 注解
        return sortAutoConfigurations(processedConfigurations, getAutoConfigurationMetadata()).stream()
            .map((importClassName) -> new Entry(this.entries.get(importClassName), importClassName))
            .collect(Collectors.toList());
    }
}

// 该方法调用了最初说到的 getCandidateConfigurations 方法，然后进行了一系列过滤，获得最终需要自动配置的配置类
// 然后该方法被上面的 AutoConfigurationGroup 内部类中的 process 方法调用
protected AutoConfigurationEntry getAutoConfigurationEntry(AutoConfigurationMetadata autoConfigurationMetadata,
                                                           AnnotationMetadata annotationMetadata) {
    // 判断是否开启自动装配，没有就返回空
    if (!isEnabled(annotationMetadata)) {
        return EMPTY_ENTRY;
    }
    // 返回 exclude 和 excludeName 属性
    // 例子：@SpringBootApplication(exclude = {SpringApplicationAdminJmxAutoConfiguration.class}, scanBasePackages = "cn.iocoder")
    AnnotationAttributes attributes = getAttributes(annotationMetadata);
    // 获取候选配置列列表，就是一开始解释的方法
    List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);
   	// 移除重复的配置类
    configurations = removeDuplicates(configurations);
    // 获得需要排除的配置类
    Set<String> exclusions = getExclusions(annotationMetadata, attributes);
    // 校验排除的配置类是否合法
    checkExcludedClasses(configurations, exclusions);
    // 移除需要排除的配置类
    configurations.removeAll(exclusions);
    // 根据条件（Condition），过滤掉不符合条件的配置类
    configurations = filter(configurations, autoConfigurationMetadata);
    // 触发自动配置类引入完成的事件
    fireAutoConfigurationImportEvents(configurations, exclusions);
    // 创建 AutoConfigurationEntry 对象
    return new AutoConfigurationEntry(configurations, exclusions);
}
```
总结：

1. 自动装配与两个注解高度相关：`@EnableAutoConfiguration ` 和 `@Import(AutoConfigurationImportSelector.class)`
2. 实现类中与两个类高度相关： AutoConfigurationImportSelector 和 ConfigurationClassParser，前者用于过滤获取需要自动装配的类，后者用于解析
3. AutoConfigurationImportSelector 是一切的核心，其中的方法作用为：
   1. getCandidateConfigurations 方法：获取候选配置类
   2. getAutoConfigurationEntry 方法：过滤候选配置类
   3. 内部类 AutoConfigurationGroup#process 方法：设置内部类各个列表
   4. 内部类 AutoConfigurationGroup#selectImports 方法：获取最终需要自动配置的配置类







## Condition

> Spring 和 Spring Boot 中都有注解 @Conditional 和 Condition 接口
>
> Spring 中 Condition 的实现较少，Spring Boot 中增加了大量实现
>
> Spring 中核心的是 ProfileContion，Spring Boot 中核心的是 SpringBootCondition 抽象类
>
> Spring Boot 中实现按条件加载是通过各种 OnXXXCondition 实现类，然后为最终注解加上 @Conditional(OnXXXCondition.class) 实现按条件加载

SpringBootCondition 的继承关系：

![image-20230516161456196](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//springboot%E6%BA%90%E7%A0%81/20230516/SpringBootCondition%E7%BB%A7%E6%89%BF%E5%85%B3%E7%B3%BB.png)

SpringBootCondition 的主要方法如下，关键要看其子类如何实现：

```java
public abstract class SpringBootCondition implements Condition {
	// 打印符合条件的类
    private final Log logger = LogFactory.getLog(getClass());

    public final boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 判断注解在类上还是方法上
        String classOrMethodName = getClassOrMethodName(metadata);
        try {
			// 交给子类判断并返回匹配结果
            ConditionOutcome outcome = getMatchOutcome(context, metadata);
            // 打印日志
            logOutcome(classOrMethodName, outcome);
            // 记录到 ConditionEvaluationReport 
            recordEvaluation(context, classOrMethodName, outcome);
            // 返回是否匹配
            return outcome.isMatch();
        }
        catch (NoClassDefFoundError ex) {
            throw new IllegalStateException("Could not evaluate condition on " + classOrMethodName + " due to "
                                            + ex.getMessage() + " not found. Make sure your own configuration does not rely on "
                                            + "that class. This can also happen if you are "
                                            + "@ComponentScanning a springframework package (e.g. if you "
                                            + "put a @ComponentScan in the default package by mistake)", ex);
        }
        catch (RuntimeException ex) {
            throw new IllegalStateException("Error processing condition on " + getName(metadata), ex);
        }
    }
    
    // 遍历条件，有一个匹配就返回 true
    protected final boolean anyMatches(ConditionContext context, AnnotatedTypeMetadata metadata,
			Condition... conditions) {
		for (Condition condition : conditions) {
            // 具体的匹配方法交给子类实现
			if (matches(context, metadata, condition)) {
				return true;
			}
		}
		return false;
	}
}
```



### OnPropertyCondition 

SpringBootCondition 的一个具体实现 OnPropertyCondition 如下：

```java
class OnPropertyCondition extends SpringBootCondition {
   	@Override
    public ConditionOutcome getMatchOutcome(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 获取 @ConditionalOnProperty 注解的属性
        List<AnnotationAttributes> allAnnotationAttributes = annotationAttributesFromMultiValueMap(
            metadata.getAllAnnotationAttributes(ConditionalOnProperty.class.getName()));
        List<ConditionMessage> noMatch = new ArrayList<>();
        List<ConditionMessage> match = new ArrayList<>();
        // 逐个判断是否匹配
        for (AnnotationAttributes annotationAttributes : allAnnotationAttributes) {
            // 传入条件以及配置文件中配置的属性得到匹配结果
            ConditionOutcome outcome = determineOutcome(annotationAttributes, context.getEnvironment());
            (outcome.isMatch() ? match : noMatch).add(outcome.getConditionMessage());
        }
        // 有不匹配的就返回不匹配的条件
        if (!noMatch.isEmpty()) {
            return ConditionOutcome.noMatch(ConditionMessage.of(noMatch));
        }
        return ConditionOutcome.match(ConditionMessage.of(match));
    }
    
    private ConditionOutcome determineOutcome(AnnotationAttributes annotationAttributes, PropertyResolver resolver) {
		// 解析成 Spec 对象，是内部类，实现较为简单，就是处理属性
        Spec spec = new Spec(annotationAttributes);
		List<String> missingProperties = new ArrayList<>();
		List<String> nonMatchingProperties = new ArrayList<>();
        // 收集不匹配的信息
		spec.collectProperties(resolver, missingProperties, nonMatchingProperties);
        // 如果属性缺失就返回不匹配
        if (!missingProperties.isEmpty()) {
			return ConditionOutcome.noMatch(ConditionMessage.forCondition(ConditionalOnProperty.class, spec)
					.didNotFind("property", "properties").items(Style.QUOTE, missingProperties));
		}
        // 如果有属性不匹配就返回不匹配的
		if (!nonMatchingProperties.isEmpty()) {
			return ConditionOutcome.noMatch(ConditionMessage.forCondition(ConditionalOnProperty.class, spec)
					.found("different value in property", "different value in properties")
					.items(Style.QUOTE, nonMatchingProperties));
		}
		return ConditionOutcome
				.match(ConditionMessage.forCondition(ConditionalOnProperty.class, spec).because("matched"));
	}
}
```



### AutoConfigurationImportFilter

还有一个非常关键的函数式接口：AutoConfigurationImportFilter，这是在自动配置是用于排除不用的配置类的

> 其中包含的方法为：boolean[] match(String[] autoConfigurationClasses, AutoConfigurationMetadata autoConfigurationMetadata);
>
> 将传入的 `autoConfigurationClasses` 配置类根据 `autoConfigurationMetadata` 的元数据进行匹配，判断是否需要引入，然后返回 `boolean[]` 结果
>
> `boolean[]` 结果和 `autoConfigurationClasses` 配置类是一一对应的关系。假设 `autoConfigurationClasses[0]` 对应的 `boolean[0]` 为 `false` ，表示无需引入，反之则需要引入

AutoConfigurationImportFilter 的实现类是 FilteringSpringBootCondition，是一个抽象类，继承了 SpringBootCondition，其子类有：

1. OnClassCondition：在 @ConditionalOnClass、@ConditionalOnMissingClass 中使用
2. OnWebApplicationCondition：在 @ConditionalOnWebApplication 和 @ConditionalOnNotWebApplication 中使用
3. OnBeanCondition：在 @ConditionalOnBean、@ConditionalOnMissingBean、@ConditionalOnSingleCandidate 中使用

FilteringSpringBootCondition 的核心实现如下：

```java
abstract class FilteringSpringBootCondition extends SpringBootCondition
      implements AutoConfigurationImportFilter, BeanFactoryAware, BeanClassLoaderAware {

    private BeanFactory beanFactory;

    private ClassLoader beanClassLoader;

    @Override
    public boolean[] match(String[] autoConfigurationClasses, AutoConfigurationMetadata autoConfigurationMetadata) {
        ConditionEvaluationReport report = ConditionEvaluationReport.find(this.beanFactory);
       	// 根据类名和元数据批量返回匹配的结果
        ConditionOutcome[] outcomes = getOutcomes(autoConfigurationClasses, autoConfigurationMetadata);
        boolean[] match = new boolean[outcomes.length];
        for (int i = 0; i < outcomes.length; i++) {
            match[i] = (outcomes[i] == null || outcomes[i].isMatch());
            // 不匹配则输出日志
            if (!match[i] && outcomes[i] != null) {
                logOutcome(autoConfigurationClasses[i], outcomes[i]);
                if (report != null) {
                    report.recordConditionEvaluation(autoConfigurationClasses[i], this, outcomes[i]);
                }
            }
        }
        return match;
    }
    
    // 提供给子类使用，过滤除符合的类的数组
    // 在自动配置是有使用到，即在 AutoConfigurationImportSelector 中使用，具体实现看下面
    protected final List<String> filter(Collection<String> classNames, ClassNameFilter classNameFilter,
                                        ClassLoader classLoader) {
        if (CollectionUtils.isEmpty(classNames)) {
            return Collections.emptyList();
        }
        List<String> matches = new ArrayList<>(classNames.size());
        for (String candidate : classNames) {
            // classNameFilter 是内部类，用于判断类是否存在，比较简单
            if (classNameFilter.matches(candidate, classLoader)) {
                matches.add(candidate);
            }
        }
        return matches;
    }
}
```

自动配置类 AutoConfigurationImportSelector 中的过滤实现如下：

```java
public class AutoConfigurationImportSelector implements DeferredImportSelector, BeanClassLoaderAware,
	ResourceLoaderAware, BeanFactoryAware, EnvironmentAware, Ordered {

    private List<String> filter(List<String> configurations, AutoConfigurationMetadata autoConfigurationMetadata) {
        long startTime = System.nanoTime();
        String[] candidates = StringUtils.toStringArray(configurations);
        boolean[] skip = new boolean[candidates.length];
        boolean skipped = false;
        // 遍历 AutoConfigurationImportFilter 数组逐个匹配
        // getAutoConfigurationImportFilters 方法会找到 META-INF/spring.factories 中指定的类
        for (AutoConfigurationImportFilter filter : getAutoConfigurationImportFilters()) {
            invokeAwareMethods(filter);
            boolean[] match = filter.match(candidates, autoConfigurationMetadata);
            for (int i = 0; i < match.length; i++) {
                if (!match[i]) {
                    skip[i] = true;
                    candidates[i] = null;
                    skipped = true;
                }
            }
        }
        // 没有需要忽略的就直接忽略
        if (!skipped) {
            return configurations;
        }
        // 排除需要忽略的配置类
        List<String> result = new ArrayList<>(candidates.length);
        for (int i = 0; i < candidates.length; i++) {
            if (!skip[i]) {
                result.add(candidates[i]);
            }
        }
        if (logger.isTraceEnabled()) {
            int numberFiltered = configurations.size() - result.size();
            logger.trace("Filtered " + numberFiltered + " auto configuration class in "
                         + TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - startTime) + " ms");
        }
        return new ArrayList<>(result);
    }
}	
```

