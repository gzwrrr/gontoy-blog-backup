---
title: "IOC 源码"
shortTitle: "IOC 源码"
description: "IOC 源码"
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
timeline: true,
dir:
  text: "IOC 源码"
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
  title: "IOC 源码"
  description: "IOC 源码"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# IOC 源码

> IoC 主要有两个模块实现：spring-beans 和 spring-context

| 序号 | 体系                      | 说明                                                         |
| ---- | ------------------------- | ------------------------------------------------------------ |
| 1    | Resource 体系             | 资源的抽象，每一个实现类都代表一种资源                       |
| 2    | ResourceLoader 体系       | 资源加载                                                     |
| 3    | BeanDefinition 体系       | 描述 Bean 对象                                               |
| 4    | BeanDefinitionReader 体系 | 读取 Spring 的配置文件，将其转换成 BeanDefinition            |
| 5    | BeanFactory 体系          | Bean 容器，其中 BeanDefinition 是基本结构，BeanFactory 根据 BeanDefinition Map 进行 Bean 的创建和管理 |
| 6    | ApplicationContext 体系   | BeanFactory 的增强，提供国际化标准访问策略、强大的事件机制、多种资源加载器、Web 应用的支持 |





## Resource 体系

> Resource 位于 spring-core 模块中
>
> Resource 体系的职责只有「如何定义资源」，而不涉及「如何加载资源」
>
> 资源由 ResourceLoader 体系加载后给客户端返回统一的抽象

:::info 继承关系

Resource 继承 InputStreamSource，其默认实现类为 AbstractResource

AbstractResource 很重要，如果要自定义 Resource 需要继承 AbstractResource（实现比较简单，主要交给子类实现具体功能）

:::

![image-20230514192423469](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//ioc%E6%BA%90%E7%A0%81/20230514/Resource%E7%BB%A7%E6%89%BF%E5%85%B3%E7%B3%BB.png)

```java
public interface Resource extends InputStreamSource {
    // 父接口方法
    InputStream getInputStream() throws IOException;
    
    // 资源是否存在
	boolean exists();

    // 资源是否可读
	default boolean isReadable() {
		return exists();
	}

    // 资源是否被打开
	default boolean isOpen() {
		return false;
	}

    // 是否为文件
	default boolean isFile() {
		return false;
	}

    // 返回资源的 URL
	URL getURL() throws IOException;

    // 返回资源的 URI
	URI getURI() throws IOException;

	// 返回文件资源
	File getFile() throws IOException;

    // 转换输入流，返回 ReadableByteChannel
	default ReadableByteChannel readableChannel() throws IOException {
		return Channels.newChannel(getInputStream());
	}

	// 返回资源长度
	long contentLength() throws IOException;

	// 返回资源的最后修改事件
	long lastModified() throws IOException;

	// 根据资源的相对路径创建资源
	Resource createRelative(String relativePath) throws IOException;

	// 获取资源文件名称
	@Nullable
	String getFilename();
	
    // 获取资源的描述
	String getDescription();
}
```

Resource 的实现类：

| 序号 | 实现类              | 说明                                                         |
| ---- | ------------------- | ------------------------------------------------------------ |
| 1    | FileSystemResource  | 对 `java.io.File` 类型资源的封装，只要是跟 File 打交道的，基本上与 FileSystemResource 也可以打交道。支持文件和 URL 的形式，实现 WritableResource 接口，且从 Spring Framework 5.0 开始，FileSystemResource 使用 NIO2 API进行读/写交互 |
| 2    | ByteArrayResource   | 对字节数组提供的数据的封装。如果通过 InputStream 形式访问该类型的资源，该实现会根据字节数组的数据构造一个相应的 ByteArrayInputStream |
| 3    | UrlResource         | 对 `java.net.URL`类型资源的封装。内部委派 URL 进行具体的资源操作 |
| 4    | ClassPathResource   | class path 类型资源的实现。使用给定的 ClassLoader 或者给定的 Class 来加载资源 |
| 5    | InputStreamResource | 将给定的 InputStream 作为一种资源的 Resource 的实现类        |





## ResourceLoader 体系

> ResourceLoader 位于 spring-core 模块中
>
> ResourceLoader 体系的指责只有加载资源，具体是根据给定的资源地址返回对应的 Resource
>
> DefaultResourceLoader 是 ResourceLoader 的默认实现（实现较为简单，就是需要注意获取资源时有三种策略）

![image-20230514201438816](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//ioc%E6%BA%90%E7%A0%81/20230514/ResourceLoader%E7%BB%A7%E6%89%BF%E5%85%B3%E7%B3%BB%E5%9B%BE.png)

```java
public interface ResourceLoader {
	// 前缀，默认为 "classpath:"
	String CLASSPATH_URL_PREFIX = ResourceUtils.CLASSPATH_URL_PREFIX;

    /*
     * 获取资源
     * 有三种方式加载：
     * 	1. URL 位置资源：file:C:/xxx.xx
     * 	2. ClassPath 位置资源：classpath:xxx.xx
     * 	3. 相对路径资源: WEB-INF/xxx.xx
     */
	Resource getResource(String location);

    // 获取类加载器
	@Nullable
	ClassLoader getClassLoader();
}
```

ProtocolResolver 函数式接口是 ResourceLoader 的 SPI，用于使用自定义的资源加载器返回对应资源

```java
@FunctionalInterface
public interface ProtocolResolver {
	@Nullable
	Resource resolve(String location, ResourceLoader resourceLoader);
}
```

注意 ProtocolResolver 是没有实现类的，需要用户自定义；DefaultResourceLoader 通过一个 Set 维护 Resolver 集合，然后在实际需要获取 Resource 的时候将自身设置为对应的资源加载器

```java
public class DefaultResourceLoader implements ResourceLoader {
    private final Set<ProtocolResolver> protocolResolvers = new LinkedHashSet<>(4);
    
	public void addProtocolResolver(ProtocolResolver resolver) {
        Assert.notNull(resolver, "ProtocolResolver must not be null");
        this.protocolResolvers.add(resolver);
    }
    
	public Resource getResource(String location) {
		Assert.notNull(location, "Location must not be null");

		for (ProtocolResolver protocolResolver : getProtocolResolvers()) {
			Resource resource = protocolResolver.resolve(location, this);
			if (resource != null) {
				return resource;
			}
		}

		if (location.startsWith("/")) {
			return getResourceByPath(location);
		}
		else if (location.startsWith(CLASSPATH_URL_PREFIX)) {
			return new ClassPathResource(location.substring(CLASSPATH_URL_PREFIX.length()), getClassLoader());
		}
		else {
			try {
				// Try to parse the location as a URL...
				URL url = new URL(location);
				return (ResourceUtils.isFileURL(url) ? new FileUrlResource(url) : new UrlResource(url));
			}
			catch (MalformedURLException ex) {
				// No URL -> resolve as resource path.
				return getResourceByPath(location);
			}
		}
	}
}
```

还可以通过 ResourcePatternResolver 返回指定匹配模式下的所有资源

```java
public interface ResourcePatternResolver extends ResourceLoader {
   String CLASSPATH_ALL_URL_PREFIX = "classpath*:";
   Resource[] getResources(String locationPattern) throws IOException;
}
```

最常用的实现类为 PathMatchingResourcePatternResolver，支持 Ant 风格的路径匹配模式，其中最重要的就是获取多个资源的实现

```java
public class PathMatchingResourcePatternResolver implements ResourcePatternResolver {
	public Resource[] getResources(String locationPattern) throws IOException {
		Assert.notNull(locationPattern, "Location pattern must not be null");
        // 以 "classpath*:" 开头
		if (locationPattern.startsWith(CLASSPATH_ALL_URL_PREFIX)) {
			// 路径包含通配符
			if (getPathMatcher().isPattern(locationPattern.substring(CLASSPATH_ALL_URL_PREFIX.length()))) {
				// a class path resource pattern
				return findPathMatchingResources(locationPattern);
			}
            // 路径不包含通配符
			else {
				return findAllClassPathResources(locationPattern.substring(CLASSPATH_ALL_URL_PREFIX.length()));
			}
		}
        // 不以 "classpath*:" 开头
		else {
			int prefixEnd = (locationPattern.startsWith("war:") ? locationPattern.indexOf("*/") + 1 :
					locationPattern.indexOf(':') + 1);
			// 路径包含通配符
            if (getPathMatcher().isPattern(locationPattern.substring(prefixEnd))) {
				return findPathMatchingResources(locationPattern);
			}
            // 路径包含通配符
			else {
				return new Resource[] {getResourceLoader().getResource(locationPattern)};
			}
		}
	}
}
```





## BeanDefinition

IoC 容器的使用过程大致为：

1. 获取资源
2. 获取 BeanFactory
3. 根据新建的 BeanFactory 创建一个 BeanDefinitionReader 对象，该 Reader 对象为资源的**解析器**
4. 装载资源

所以大致过程就是：资源定位 -> 装载（资源到 BeanDefinition）-> 注册（通过 HashMap 来维护 BeanDefinition）

注意：每一个 Bean 都对应一个 BeanDefinition

注意：上述过程还没有完成依赖注入（即 Bean 是懒加载的），而是完成了注册

**加载的核心代码如下：**

```java
/**
 * 当前线程，正在加载的 EncodedResource 集合。
 */
private final ThreadLocal<Set<EncodedResource>> resourcesCurrentlyBeingLoaded = new NamedThreadLocal<>("XML bean definition resources currently being loaded");

// EncodedResource 保证读取到的 Resoure 数据是正确的
public int loadBeanDefinitions(EncodedResource encodedResource) throws BeanDefinitionStoreException {
	Assert.notNull(encodedResource, "EncodedResource must not be null");
	if (logger.isTraceEnabled()) {
		logger.trace("Loading XML bean definitions from " + encodedResource);
	}

	// 获取已经加载过的资源
	Set<EncodedResource> currentResources = this.resourcesCurrentlyBeingLoaded.get();
	if (currentResources == null) {
		currentResources = new HashSet<>(4);
		this.resourcesCurrentlyBeingLoaded.set(currentResources);
	}
	if (!currentResources.add(encodedResource)) { // 将当前资源加入记录中。如果已存在，抛出异常
		throw new BeanDefinitionStoreException("Detected cyclic loading of " + encodedResource + " - check your import definitions!");
	}
	try {
		// 从 EncodedResource 获取封装的 Resource ，并从 Resource 中获取其中的 InputStream
		InputStream inputStream = encodedResource.getResource().getInputStream();
		try {
			InputSource inputSource = new InputSource(inputStream);
			if (encodedResource.getEncoding() != null) { // 设置编码
				inputSource.setEncoding(encodedResource.getEncoding());
			}
			// 核心逻辑部分，执行加载 BeanDefinition
			return doLoadBeanDefinitions(inputSource, encodedResource.getResource());
		} finally {
			inputStream.close();
		}
	} catch (IOException ex) {
		throw new BeanDefinitionStoreException("IOException parsing XML document from " + encodedResource.getResource(), ex);
	} finally {
		// 从缓存中剔除该资源
		currentResources.remove(encodedResource);
		if (currentResources.isEmpty()) {
			this.resourcesCurrentlyBeingLoaded.remove();
		}
	}
}

// 加载 BeanDefinition
protected int doLoadBeanDefinitions(InputSource inputSource, Resource resource)
		throws BeanDefinitionStoreException {
	try {
		// 获取 XML Document 实例
		Document doc = doLoadDocument(inputSource, resource);
		// 根据 Document 实例，注册 Bean 信息
		int count = registerBeanDefinitions(doc, resource);
		if (logger.isDebugEnabled()) {
			logger.debug("Loaded " + count + " bean definitions from " + resource);
		}
		return count;
	} catch (Expection e) {
    	// ...
    }
}

// 获取 XML 实例
protected Document doLoadDocument(InputSource inputSource, Resource resource) throws Exception {
    // 加载实例
	return this.documentLoader.loadDocument(inputSource, getEntityResolver(), this.errorHandler,
            // 获取验证模型
			getValidationModeForResource(resource), isNamespaceAware());
}
```

doLoadBeanDefinitions 主要就是负责：

1. 验证资源（XML 的正确性，与 DTD 和 XSD 有关）
2. 获取 XML 实例
3. 注册 Bean 实例

注册 Bean 核心代码如下：

```java
// AbstractBeanDefinitionReader.java
private final BeanDefinitionRegistry registry;

// XmlBeanDefinitionReader.java
public int registerBeanDefinitions(Document doc, Resource resource) throws BeanDefinitionStoreException {
	// 创建 BeanDefinitionDocumentReader 对象
	BeanDefinitionDocumentReader documentReader = createBeanDefinitionDocumentReader();
	// 获取已注册的 BeanDefinition 数量
	int countBefore = getRegistry().getBeanDefinitionCount();
	// 创建 XmlReaderContext 对象
	// 注册 BeanDefinition，doc 是 XML 实例, createReaderContext(resource) 是当前解析器的上下文
	documentReader.registerBeanDefinitions(doc, createReaderContext(resource));
	// 计算新注册的 BeanDefinition 数量
	return getRegistry().getBeanDefinitionCount() - countBefore;
}

private Class<? extends BeanDefinitionDocumentReader> documentReaderClass = DefaultBeanDefinitionDocumentReader.class;

protected BeanDefinitionDocumentReader createBeanDefinitionDocumentReader() {
	return BeanUtils.instantiateClass(this.documentReaderClass);
}


@Nullable
private XmlReaderContext readerContext;

@Nullable
private BeanDefinitionParserDelegate delegate;
    
/**
 * This implementation parses bean definitions according to the "spring-beans" XSD
 * (or DTD, historically).
 * <p>Opens a DOM Document; then initializes the default settings
 * specified at the {@code <beans/>} level; then parses the contained bean definitions.
 */
@Override
public void registerBeanDefinitions(Document doc, XmlReaderContext readerContext) {
    this.readerContext = readerContext;
    // 获得 XML Document Root Element
    // 执行注册 BeanDefinition
    doRegisterBeanDefinitions(doc.getDocumentElement());
}

/**
 * Register each bean definition within the given root {@code <beans/>} element.
 */
@SuppressWarnings("deprecation")  // for Environment.acceptsProfiles(String...)
protected void doRegisterBeanDefinitions(Element root) {
    // Any nested <beans> elements will cause recursion in this method. In
    // order to propagate and preserve <beans> default-* attributes correctly,
    // keep track of the current (parent) delegate, which may be null. Create
    // the new (child) delegate with a reference to the parent for fallback purposes,
    // then ultimately reset this.delegate back to its original (parent) reference.
    // this behavior emulates a stack of delegates without actually necessitating one.
    // 记录老的 BeanDefinitionParserDelegate 对象
    BeanDefinitionParserDelegate parent = this.delegate;
    // 创建 BeanDefinitionParserDelegate 对象，并进行设置到 delegate
    this.delegate = createDelegate(getReaderContext(), root, parent);
    // 检查 <beans /> 根标签的命名空间是否为空，或者是 http://www.springframework.org/schema/beans
    if (this.delegate.isDefaultNamespace(root)) {
        // 处理 profile 属性。可参见《Spring3自定义环境配置 <beans profile="">》http://nassir.iteye.com/blog/1535799
        String profileSpec = root.getAttribute(PROFILE_ATTRIBUTE);
        if (StringUtils.hasText(profileSpec)) {
            // 使用分隔符切分，可能有多个 profile 。
            String[] specifiedProfiles = StringUtils.tokenizeToStringArray(
                    profileSpec, BeanDefinitionParserDelegate.MULTI_VALUE_ATTRIBUTE_DELIMITERS);
            // 如果所有 profile 都无效，则不进行注册
            // We cannot use Profiles.of(...) since profile expressions are not supported
            // in XML config. See SPR-12458 for details.
            if (!getReaderContext().getEnvironment().acceptsProfiles(specifiedProfiles)) {
                if (logger.isDebugEnabled()) {
                    logger.debug("Skipped XML bean definition file due to specified profiles [" + profileSpec +
                            "] not matching: " + getReaderContext().getResource());
                }
                return;
            }
        }
    }

    // 解析前处理
    preProcessXml(root);
    // 解析
    parseBeanDefinitions(root, this.delegate);
    // 解析后处理
    postProcessXml(root);

    // 设置 delegate 回老的 BeanDefinitionParserDelegate 对象
    this.delegate = parent;
}
```











