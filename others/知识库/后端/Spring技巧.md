# Springs 技巧

待办：https://mp.weixin.qq.com/s?__biz=MzkwOTAyMTY2NA==&mid=2247493167&idx=1&sn=a6aed6fa7bc2f9b728e73003b2fcbedf&chksm=c0c3bea0f7b437b67096c1482cff5b6f1ba9584a10edc55eafb582e57dc53b459cd6fafdd1e1&scene=126&sessionid=1692608425#rd



## 概览

Spring：

1. AOP
2. ApplicationEvent
3. 资源加载、配置解析、数据绑定
4. 泛型处理
5. 国际化
6. Filter 和 Interceptor
7. Bean 生命周期：
   1. BeanFactoryPostProcessor（在创建了 BeanDeinition 之后，修改 BeanDeinition）
   2. InitializingBean（在 bean 赋值后，bean 初始化之前执行）
   3. BeanPostProcessor（`postProcessBeforeInitialization` 和 `postProcessAfterInitialization`，用于在 Bean 初始化前后执行自定义的处理逻辑。它允许你在初始化阶段对 Bean 进行修改，例如代理对象、添加额外的处理等。）
   4. DisposableBean（在 bean 销毁之前执行）



Spring MVC：

1. HandlerInterceptor：拦截器的接口，用于在处理器方法执行前后执行自定义的逻辑。常用于权限验证、日志记录等
2. HandlerMethodArgumentResolver 接口：参数解析器，用于将请求参数解析为处理器方法的参数类型，方便在处理器方法中获取请求参数。



Spring Boot：

1. Spring Boot Camunda 流程引擎
2. 自动装配
3. 自动配置
4. 模板模式
   1. RestTemplate
   2. AsyncRestTemplate
   3. RedisTemplate
   4. RabbitTemplate
   5. JdbcTemplate
   6. HibernateTemplate







## 解析配置

### Environment

**使用 Environment 对象：** Spring 提供了 `Environment` 接口，它允许你访问应用程序的环境属性。可以通过依赖注入将 `Environment` 对象注入到你的组件中，然后使用它来获取环境变量。

```java
@Autowired
private Environment environment;

public void getEnvironmentVariable() {
    String value = environment.getProperty("variableName");
    // 处理获取到的环境变量值
}
```



### @Value 注解

**使用 @Value 注解：** Spring 中的 `@Value` 注解可以用于直接将环境变量的值注入到属性中。

```java
@Value("${variableName}")
private String value;

public void getEnvironmentVariable() {
    // 使用注入的环境变量值
}
```



### ConfigurationProperties

```yml
decorate:
  recommend:
    amount: 10
    weight:
      - "virtualSales=0.3"
      - "actualSales=0.5"
      - "commentNumber=0.2"
```

```java
@Component
@ConfigurationProperties("decorate.recommend")
public class RecommendConfiguration {
    private int amount;
    private List<String> weight;

    // Getter and Setter methods
   // ...
}
```



### 其他

**使用 System.getProperty()：** 你可以使用 Java 中的 `System.getProperty()` 方法来获取系统属性，其中包括 Java 虚拟机的环境属性。这些属性可以通过 `-D` 命令行参数设置。

```java
String value = System.getProperty("variableName");
```

**使用 System.getenv()：** 你还可以使用 Java 中的 `System.getenv()` 方法来获取操作系统环境变量。

```java
String value = System.getenv("variableName");
```

**使用 PropertySourcesPlaceholderConfigurer：** 这是一种在 Spring 配置文件中解析属性占位符的方式，使你可以将环境变量的值注入到配置中。

```java
<bean class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">
    <property name="locations">
        <list>
            <value>classpath:application.properties</value>
        </list>
    </property>
</bean>
```







## 扩展接口

1. ApplicationContextInitializer
2. BeanDefinitionRegistryPostProcessor
3. BeanFactoryPostProcessor
4. InstantiationAwareBeanPostProcessor 
5. SmartInstantiationAwareBeanPostProcessor
6. BeanFactoryAware
7. ApplicationContextAwareProcessor（六个子扩展点）
8. @PostConstruct
9. InitializingBean
10. FactoryBean
11. SmartInitializingSingleton
12. CommandLineRunner
13. DisposableBean





### ApplicationContextInitializer

这是整个spring容器在刷新之前初始化`ConfigurableApplicationContext`的回调接口，简单来说，就是在容器刷新之前调用此类的`initialize`方法。这个点允许被用户自己扩展。用户可以在整个spring容器还没被初始化之前做一些事情。

可以想到的场景可能为，在最开始激活一些配置，或者利用这时候class还没被类加载器加载的时机，进行动态字节码注入等操作。

扩展方式为：

```java
public class TestApplicationContextInitializer implements ApplicationContextInitializer {
    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        System.out.println("[ApplicationContextInitializer]");
    }
}
```

因为这时候spring容器还没被初始化，所以想要自己的扩展的生效，有以下三种方式：

- 在启动类中用`springApplication.addInitializers(new TestApplicationContextInitializer())`语句加入
- 配置文件配置`context.initializer.classes=com.example.demo.TestApplicationContextInitializer`
- Spring SPI扩展，在spring.factories中加入`org.springframework.context.ApplicationContextInitializer=com.example.demo.TestApplicationContextInitializer`

```java
@SpringBootApplication
public class SpringBootExtendDemoApplication {
    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(SpringBootExtendDemoApplication.class);
        springApplication.addInitializers(new ATestApplicationContextInitializer());
        ConfigurableApplicationContext context = springApplication.run(args);
        context.close();
    }
}
```





### BeanDefinitionRegistryPostProcessor

这个接口在读取项目中的 `beanDefinition` 之后执行，提供一个补充的扩展点

使用场景：你可以在这里动态注册自己的 `beanDefinition`，可以加载 classpath 之外的 bean

也可以通过 @Configuration 注入

```java
@Component
public class BTestBeanDefinitionRegistryPostProcessor implements BeanDefinitionRegistryPostProcessor {
    @Override
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException {
        System.out.println("[BeanDefinitionRegistryPostProcessor] postProcessBeanDefinitionRegistry");
    }
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        System.out.println("[BeanDefinitionRegistryPostProcessor] postProcessBeanFactory");
    }
}
```





### BeanFactoryPostProcessor

这个接口是`beanFactory`的扩展接口，调用时机在spring在读取`beanDefinition`信息之后，实例化bean之前。

在这个时机，用户可以通过实现这个扩展接口来自行处理一些东西，比如修改已经注册的`beanDefinition`的元信息。

```java
@Component
public class CTestBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
        System.out.println("[BeanFactoryPostProcessor]");
    }
}
```





### InstantiationAwareBeanPostProcessor 

该接口继承了`BeanPostProcess`接口，区别如下：

**`BeanPostProcess`接口只在bean的初始化阶段进行扩展（注入spring上下文前后），而`InstantiationAwareBeanPostProcessor`接口在此基础上增加了3个方法，把可扩展的范围增加了实例化阶段和属性注入阶段。**

该类主要的扩展点有以下5个方法，主要在bean生命周期的两大阶段：**实例化阶段** 和**初始化阶段** ，下面一起进行说明，按调用顺序为：

- `postProcessBeforeInstantiation`：实例化bean之前，相当于new这个bean之前
- `postProcessAfterInstantiation`：实例化bean之后，相当于new这个bean之后
- `postProcessPropertyValues`：bean已经实例化完成，在属性注入时阶段触发，`@Autowired`,`@Resource`等注解原理基于此方法实现
- `postProcessBeforeInitialization`：初始化bean之前，相当于把bean注入spring上下文之前
- `postProcessAfterInitialization`：初始化bean之后，相当于把bean注入spring上下文之后

使用场景：这个扩展点非常有用 ，无论是写中间件和业务中，都能利用这个特性。比如对实现了某一类接口的bean在各个生命期间进行收集，或者对某个类型的bean进行统一的设值等等。

```java
@Component
public class DTestInstantiationAwareBeanPostProcessor implements InstantiationAwareBeanPostProcessor {
    public DTestInstantiationAwareBeanPostProcessor() {
        System.out.println("[TestInstantiationAwareBeanPostProcessor]");
    }
    // @Override
    // public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
    //     System.out.println("[TestInstantiationAwareBeanPostProcessor] before initialization " + beanName);
    //     return bean;
    // }
    // @Override
    // public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
    //     System.out.println("[TestInstantiationAwareBeanPostProcessor] after initialization " + beanName);
    //     return bean;
    // }
    // @Override
    // public Object postProcessBeforeInstantiation(Class<?> beanClass, String beanName) throws BeansException {
    //     System.out.println("[TestInstantiationAwareBeanPostProcessor] before instantiation " + beanName);
    //     return null;
    // }
    // @Override
    // public boolean postProcessAfterInstantiation(Object bean, String beanName) throws BeansException {
    //     System.out.println("[TestInstantiationAwareBeanPostProcessor] after instantiation " + beanName);
    //     return true;
    // }
    // @Override
    // public PropertyValues postProcessPropertyValues(PropertyValues pvs, PropertyDescriptor[] pds, Object bean, String beanName) throws BeansException {
    //     System.out.println("[TestInstantiationAwareBeanPostProcessor] postProcessPropertyValues " + beanName);
    //     return pvs;
    // }
}
```





### SmartInstantiationAwareBeanPostProcessor

该扩展接口有3个触发点方法：

- `predictBeanType`：该触发点发生在`postProcessBeforeInstantiation`之前(在图上并没有标明，因为一般不太需要扩展这个点)，这个方法用于预测Bean的类型，返回第一个预测成功的Class类型，如果不能预测返回null；当你调用`BeanFactory.getType(name)`时当通过bean的名字无法得到bean类型信息时就调用该回调方法来决定类型信息。
- `determineCandidateConstructors`：该触发点发生在`postProcessBeforeInstantiation`之后，用于确定该bean的构造函数之用，返回的是该bean的所有构造函数列表。用户可以扩展这个点，来自定义选择相应的构造器来实例化这个bean。
- `getEarlyBeanReference`：该触发点发生在`postProcessAfterInstantiation`之后，当有循环依赖的场景，当bean实例化好之后，为了防止有循环依赖，会提前暴露回调方法，用于bean实例化的后置处理。这个方法就是在提前暴露的回调方法中触发。

```java
@Component
public class ETestSmartInstantiationAwareBeanPostProcessor implements SmartInstantiationAwareBeanPostProcessor {

    public ETestSmartInstantiationAwareBeanPostProcessor() {
        System.out.println("[TestSmartInstantiationAwareBeanPostProcessor]");
    }

    // @Override
    // public Class<?> predictBeanType(Class<?> beanClass, String beanName) throws BeansException {
    //     System.out.println("[TestSmartInstantiationAwareBeanPostProcessor] predictBeanType " + beanName);
    //     return beanClass;
    // }
    //
    // @Override
    // public Constructor<?>[] determineCandidateConstructors(Class<?> beanClass, String beanName) throws BeansException {
    //     System.out.println("[TestSmartInstantiationAwareBeanPostProcessor] determineCandidateConstructors " + beanName);
    //     return null;
    // }
    //
    // @Override
    // public Object getEarlyBeanReference(Object bean, String beanName) throws BeansException {
    //     System.out.println("[TestSmartInstantiationAwareBeanPostProcessor] getEarlyBeanReference " + beanName);
    //     return bean;
    // }

}
```



### BeanFactoryAware

这个类只有一个触发点，发生在bean的实例化之后，注入属性之前，也就是Setter之前。这个类的扩展点方法为`setBeanFactory`，可以拿到`BeanFactory`这个属性。

使用场景为，你可以在bean实例化之后，但还未初始化之前，拿到 `BeanFactory`，在这个时候，可以对每个bean作特殊化的定制。也或者可以把`BeanFactory`拿到进行缓存，日后使用。

```java
@Component
public class FTestBeanFactoryAware implements BeanFactoryAware {

    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("[TestBeanFactoryAware] setBeanFactory");
    }
}
```





### ApplicationContextAwareProcessor

6 个类扩展点（类），用法和上述的类似：

1. `EnvironmentAware`：用于获取`EnviromentAware`的一个扩展类，这个变量非常有用， 可以获得系统内的所有参数。当然个人认为这个Aware没必要去扩展，因为spring内部都可以通过注入的方式来直接获得。
2. `EmbeddedValueResolverAware`：用于获取`StringValueResolver`的一个扩展类， `StringValueResolver`用于获取基于`String`类型的properties的变量，一般我们都用`@Value`的方式去获取，如果实现了这个Aware接口，把`StringValueResolver`缓存起来，通过这个类去获取`String`类型的变量，效果是一样的。
3. `ResourceLoaderAware`：用于获取`ResourceLoader`的一个扩展类，`ResourceLoader`可以用于获取classpath内所有的资源对象，可以扩展此类来拿到`ResourceLoader`对象。
4. `ApplicationEventPublisherAware`：用于获取`ApplicationEventPublisher`的一个扩展类，`ApplicationEventPublisher`可以用来发布事件，结合`ApplicationListener`来共同使用，下文在介绍`ApplicationListener`时会详细提到。这个对象也可以通过spring注入的方式来获得。
5. `MessageSourceAware`：用于获取`MessageSource`的一个扩展类，`MessageSource`主要用来做国际化。
6. `ApplicationContextAware`：用来获取`ApplicationContext`的一个扩展类，`ApplicationContext`应该是很多人非常熟悉的一个类了，就是spring上下文管理器，可以手动的获取任何在spring上下文注册的bean，我们经常扩展这个接口来缓存spring上下文，包装成静态方法。同时`ApplicationContext`也实现了`BeanFactory`，`MessageSource`，`ApplicationEventPublisher`等接口，也可以用来做相关接口的事情。





### BeanNameAware

可以看到，这个类也是Aware扩展的一种，触发点在bean的初始化之前，也就是`postProcessBeforeInitialization`之前，这个类的触发点方法只有一个：`setBeanName`

使用场景为：用户可以扩展这个点，在初始化bean之前拿到spring容器中注册的的beanName，来自行修改这个beanName的值。

```java
@Component
public class HTestBeanNameAware implements BeanNameAware {
    @Override
    public void setBeanName(String s) {
        System.out.println("[TestBeanNameAware] setBeanName");
    }
}
```



### @PostConstruct

这个并不算一个扩展点，其实就是一个标注。其作用是在bean的初始化阶段，如果对一个方法标注了`@PostConstruct`，会先调用这个方法。这里重点是要关注下这个标准的触发点，这个触发点是在`postProcessBeforeInitialization`之后，`InitializingBean.afterPropertiesSet`之前。

```java
@Component
public class ITestPostConstruct {

    @PostConstruct
    public void testPostConstruct() {
        System.out.println("[TestPostConstruct]");
    }

}
```





### InitializingBean

```java
@Component
public class JTestInitializingBean implements InitializingBean {
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("[TestInitializingBean] afterPropertiesSet");
    }
}
```



### FactoryBean

一般情况下，Spring通过反射机制利用bean的class属性指定支线类去实例化bean，在某些情况下，实例化Bean过程比较复杂，如果按照传统的方式，则需要在bean中提供大量的配置信息。配置方式的灵活性是受限的，这时采用编码的方式可能会得到一个简单的方案。Spring为此提供了一个`org.springframework.bean.factory.FactoryBean`的工厂类接口，用户可以通过实现该接口定制实例化Bean的逻辑。`FactoryBean`接口对于Spring框架来说占用重要的地位，Spring自身就提供了70多个`FactoryBean`的实现。它们隐藏了实例化一些复杂bean的细节，给上层应用带来了便利。从Spring3.0开始，`FactoryBean`开始支持泛型，即接口声明改为`FactoryBean<T>`的形式

使用场景：用户可以扩展这个类，来为要实例化的bean作一个代理，比如为该对象的所有的方法作一个拦截，在调用前后输出一行log，模仿`ProxyFactoryBean`的功能。

```java
@Component
public class KTestFactoryBean implements FactoryBean<KTestFactoryBean.TestFactoryInnerBean> {

    public KTestFactoryBean() throws Exception {
        System.out.println("[TestFactoryBean]");
        getObject();
    }

    @Override
    public KTestFactoryBean.TestFactoryInnerBean getObject() throws Exception {
        System.out.println("[TestFactoryBean] getObject");
        return new KTestFactoryBean.TestFactoryInnerBean();
    }

    @Override
    public Class<?> getObjectType() {
        return KTestFactoryBean.TestFactoryInnerBean.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    public static class TestFactoryInnerBean{
        public TestFactoryInnerBean() {
            System.out.println("[TestFactoryInnerBean]");
        }
    }
}
```



### SmartInitializingSingleton

这个接口中只有一个方法`afterSingletonsInstantiated`，其作用是是 在spring容器管理的所有单例对象（非懒加载对象）初始化完成之后调用的回调接口。其触发时机为`postProcessAfterInitialization`之后。

使用场景：用户可以扩展此接口在对所有单例对象初始化完毕后，做一些后置的业务处理。	

```java
@Component
public class LTestSmartInitializingSingleton implements SmartInitializingSingleton {
    @Override
    public void afterSingletonsInstantiated() {
        System.out.println("[TestSmartInitializingSingleton] afterSingletonsInstantiated");
    }
}
```





### CommandLineRunner

这个接口也只有一个方法：`run(String... args)`，触发时机为整个项目启动完毕后，自动执行。如果有多个`CommandLineRunner`，可以利用`@Order`来进行排序。

使用场景：用户扩展此接口，进行启动项目之后一些业务的预处理。

```java
@Component
public class MTestCommandLineRunner implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("[TestCommandLineRunner] run");
    }
}
```



### DisposableBean

这个扩展点也只有一个方法：`destroy()`，其触发时机为当此对象销毁时，会自动执行这个方法。比如说运行`applicationContext.registerShutdownHook`时，就会触发这个方法。

```java
@Component
public class NTestDisposableBean implements DisposableBean {
    @Override
    public void destroy() throws Exception {
        System.out.println("[TestDisposableBean] destroy");
    }
}
```





## 监听器

Spring Framework 中的事件（Events）模型是一种在应用程序中实现松散耦合的方式。通过该模型，组件可以发布事件，而其他组件可以订阅这些事件，并在事件发生时采取相应的行动。Spring 的事件模型基于发布者-订阅者（Publisher-Subscriber）模式。

在 Spring 中，事件相关的主要类和接口位于 `org.springframework.context` 包中。以下是一些常见的 Spring 事件类和接口：

1. **ApplicationEvent：** 这是一个抽象类，表示一个应用程序事件。可以通过继承该类来定义自定义的事件。
2. **ApplicationListener：** 该接口用于监听特定类型的应用程序事件。实现此接口的类可以在事件发生时执行相应的逻辑。
3. **ApplicationContext：** Spring 应用程序上下文，实现了 ApplicationEventPublisher 接口，允许应用程序发布事件。
4. **ApplicationEventPublisher：** 该接口定义了发布应用程序事件的方法，由 ApplicationContext 实现。
5. **ContextRefreshedEvent：** 当应用程序上下文被初始化或刷新时，将发布此事件。
6. **ContextStartedEvent：** 当应用程序上下文启动时，将发布此事件。
7. **ContextStoppedEvent：** 当应用程序上下文停止时，将发布此事件。
8. **ContextClosedEvent：** 当应用程序上下文被关闭时，将发布此事件。
9. **RequestHandledEvent**：当一个请求结束时，将发布此事件。
10. **PayloadApplicationEvent：** 这是 ApplicationEvent 的子类，用于在事件中携带有效载荷数据。
11. **事件发布和监听方法：** Spring 支持使用 `@EventListener` 注解将方法标记为事件监听器，使其可以订阅特定类型的事件。





## 工具类 Utils

### ObjectUtils

```java
// 获取对象的类名。参数为 null 时，返回字符串："null" 
String nullSafeClassName(Object obj)
// 参数为 null 时，返回 0
int nullSafeHashCode(Object object)
// 参数为 null 时，返回字符串："null"
String nullSafeToString(boolean[] array)
// 获取对象 HashCode（十六进制形式字符串）。参数为 null 时，返回 0 
String getIdentityHexString(Object obj)
// 获取对象的类名和 HashCode。 参数为 null 时，返回字符串："" 
String identityToString(Object obj)
// 相当于 toString()方法，但参数为 null 时，返回字符串：""
String getDisplayString(Object obj)
    
    
// 判断数组是否为空
boolean isEmpty(Object[] array)
// 判断参数对象是否是数组
boolean isArray(Object obj)
// 判断数组中是否包含指定元素
boolean containsElement(Object[] array, Object element)
// 相等，或同为 null时，返回 true
boolean nullSafeEquals(Object o1, Object o2)
/*
判断参数对象是否为空，判断标准为：
    Optional: Optional.empty()
       Array: length == 0
CharSequence: length == 0
  Collection: Collection.isEmpty()
         Map: Map.isEmpty()
 */
boolean isEmpty(Object obj)
    
    
// 向参数数组的末尾追加新元素，并返回一个新数组
<A, O extends A> A[] addObjectToArray(A[] array, O obj)
// 原生基础类型数组 --> 包装类数组
Object[] toObjectArray(Object source)
```



### StringUtils

```java
// 判断字符串是否为 null，或 ""。注意，包含空白符的字符串为非空
boolean isEmpty(Object str)
// 判断字符串是否是以指定内容结束。忽略大小写
boolean endsWithIgnoreCase(String str, String suffix)
// 判断字符串是否已指定内容开头。忽略大小写
boolean startsWithIgnoreCase(String str, String prefix) 
// 是否包含空白符
boolean containsWhitespace(String str)
// 判断字符串非空且长度不为 0，即，Not Empty
boolean hasLength(CharSequence str)
// 判断字符串是否包含实际内容，即非仅包含空白符，也就是 Not Blank
boolean hasText(CharSequence str)
// 判断字符串指定索引处是否包含一个子串。
boolean substringMatch(CharSequence str, int index, CharSequence substring)
// 计算一个字符串中指定子串的出现次数
int countOccurrencesOf(String str, String sub)
    
    
// 查找并替换指定子串
String replace(String inString, String oldPattern, String newPattern)
// 去除尾部的特定字符
String trimTrailingCharacter(String str, char trailingCharacter) 
// 去除头部的特定字符
String trimLeadingCharacter(String str, char leadingCharacter)
// 去除头部的空白符
String trimLeadingWhitespace(String str)
// 去除头部的空白符
String trimTrailingWhitespace(String str)
// 去除头部和尾部的空白符
String trimWhitespace(String str)
// 删除开头、结尾和中间的空白符
String trimAllWhitespace(String str)
// 删除指定子串
String delete(String inString, String pattern)
// 删除指定字符（可以是多个）
String deleteAny(String inString, String charsToDelete)
// 对数组的每一项执行 trim() 方法
String[] trimArrayElements(String[] array)
// 将 URL 字符串进行解码
String uriDecode(String source, Charset charset)
    
    
// 解析路径字符串，优化其中的 “..” 
String cleanPath(String path)
// 解析路径字符串，解析出文件名部分
String getFilename(String path)
// 解析路径字符串，解析出文件后缀名
String getFilenameExtension(String path)
// 比较两个两个字符串，判断是否是同一个路径。会自动处理路径中的 “..” 
boolean pathEquals(String path1, String path2)
// 删除文件路径名中的后缀部分
String stripFilenameExtension(String path) 
// 以 “. 作为分隔符，获取其最后一部分
String unqualify(String qualifiedName)
// 以指定字符作为分隔符，获取其最后一部分
String unqualify(String qualifiedName, char separator)
```





### CollectionUtils

```java
// 判断 List/Set 是否为空
boolean isEmpty(Collection<?> collection)
// 判断 Map 是否为空
boolean isEmpty(Map<?,?> map)
// 判断 List/Set 中是否包含某个对象
boolean containsInstance(Collection<?> collection, Object element)
// 以迭代器的方式，判断 List/Set 中是否包含某个对象
boolean contains(Iterator<?> iterator, Object element)
// 判断 List/Set 是否包含某些对象中的任意一个
boolean containsAny(Collection<?> source, Collection<?> candidates)
// 判断 List/Set 中的每个元素是否唯一。即 List/Set 中不存在重复元素
boolean hasUniqueObject(Collection<?> collection)
    
    
// 将 Array 中的元素都添加到 List/Set 中
<E> void mergeArrayIntoCollection(Object array, Collection<E> collection)  
// 将 Properties 中的键值对都添加到 Map 中
<K,V> void mergePropertiesIntoMap(Properties props, Map<K,V> map)
// 返回 List 中最后一个元素
<T> T lastElement(List<T> list)  
// 返回 Set 中最后一个元素
<T> T lastElement(Set<T> set) 
// 返回参数 candidates 中第一个存在于参数 source 中的元素
<E> E findFirstMatch(Collection<?> source, Collection<E> candidates)
// 返回 List/Set 中指定类型的元素。
<T> T findValueOfType(Collection<?> collection, Class<T> type)
// 返回 List/Set 中指定类型的元素。如果第一种类型未找到，则查找第二种类型，以此类推
Object findValueOfType(Collection<?> collection, Class<?>[] types)
// 返回 List/Set 中元素的类型
Class<?> findCommonElementType(Collection<?> collection)
```





### FileCopyUtils

```java
// 从文件中读入到字节数组中
byte[] copyToByteArray(File in)
// 从输入流中读入到字节数组中
byte[] copyToByteArray(InputStream in)
// 从输入流中读入到字符串中
String copyToString(Reader in)
    
    
// 从字节数组到文件
void copy(byte[] in, File out)
// 从文件到文件
int copy(File in, File out)
// 从字节数组到输出流
void copy(byte[] in, OutputStream out) 
// 从输入流到输出流
int copy(InputStream in, OutputStream out) 
// 从输入流到输出流
int copy(Reader in, Writer out)
// 从字符串到输出流
void copy(String in, Writer out)
```





### ResourceUtils

```java
// 判断字符串是否是一个合法的 URL 字符串。
static boolean isUrl(String resourceLocation)
// 获取 URL
static URL getURL(String resourceLocation) 
// 获取文件（在 JAR 包内无法正常使用，需要是一个独立的文件）
static File getFile(String resourceLocation)
    
    
// 文件系统资源 D:\...
FileSystemResource
// URL 资源，如 file://... http://...
UrlResource
// 类路径下的资源，classpth:...
ClassPathResource
// Web 容器上下文中的资源（jar 包、war 包）
ServletContextResource
// 判断资源是否存在
boolean exists()
// 从资源中获得 File 对象
File getFile()
// 从资源中获得 URI 对象
URI getURI()
// 从资源中获得 URI 对象
URL getURL()
// 获得资源的 InputStream
InputStream getInputStream()
// 获得资源的描述信息
String getDescription()
```



### StreamUtils

```java
void copy(byte[] in, OutputStream out)
int copy(InputStream in, OutputStream out)
void copy(String in, Charset charset, OutputStream out)
long copyRange(InputStream in, OutputStream out, long start, long end)
    
    
byte[] copyToByteArray(InputStream in)
String copyToString(InputStream in, Charset charset)
// 舍弃输入流中的内容
int drain(InputStream in) 
```





### ReflectionUtils

```java
// 在类中查找指定方法
Method findMethod(Class<?> clazz, String name) 
// 同上，额外提供方法参数类型作查找条件
Method findMethod(Class<?> clazz, String name, Class<?>... paramTypes) 
// 获得类中所有方法，包括继承而来的
Method[] getAllDeclaredMethods(Class<?> leafClass) 
// 在类中查找指定构造方法
Constructor<T> accessibleConstructor(Class<T> clazz, Class<?>... parameterTypes) 
// 是否是 equals() 方法
boolean isEqualsMethod(Method method) 
// 是否是 hashCode() 方法 
boolean isHashCodeMethod(Method method) 
// 是否是 toString() 方法
boolean isToStringMethod(Method method) 
// 是否是从 Object 类继承而来的方法
boolean isObjectMethod(Method method) 
// 检查一个方法是否声明抛出指定异常
boolean declaresException(Method method, Class<?> exceptionType) 
    
    
// 执行方法
Object invokeMethod(Method method, Object target)  
// 同上，提供方法参数
Object invokeMethod(Method method, Object target, Object... args) 
// 取消 Java 权限检查。以便后续执行该私有方法
void makeAccessible(Method method) 
// 取消 Java 权限检查。以便后续执行私有构造方法
void makeAccessible(Constructor<?> ctor)
    
    
// 在类中查找指定属性
Field findField(Class<?> clazz, String name) 
// 同上，多提供了属性的类型
Field findField(Class<?> clazz, String name, Class<?> type) 
// 是否为一个 "public static final" 属性
boolean isPublicStaticFinal(Field field) 
    
    
// 获取 target 对象的 field 属性值
Object getField(Field field, Object target) 
// 设置 target 对象的 field 属性值，值为 value
void setField(Field field, Object target, Object value) 
// 同类对象属性对等赋值
void shallowCopyFieldState(Object src, Object dest)
// 取消 Java 的权限控制检查。以便后续读写该私有属性
void makeAccessible(Field field) 
// 对类的每个属性执行 callback
void doWithFields(Class<?> clazz, ReflectionUtils.FieldCallback fc) 
// 同上，多了个属性过滤功能。
void doWithFields(Class<?> clazz, ReflectionUtils.FieldCallback fc, 
                  ReflectionUtils.FieldFilter ff) 
// 同上，但不包括继承而来的属性
void doWithLocalFields(Class<?> clazz, ReflectionUtils.FieldCallback fc) 
```





### AopUtils

```java
// 判断是不是 Spring 代理对象
boolean isAopProxy()
// 判断是不是 jdk 动态代理对象
isJdkDynamicProxy()
// 判断是不是 CGLIB 代理对象
boolean isCglibProxy()
    
    
// 获取被代理的目标 class
Class<?> getTargetClass()
```





### AopContext

```java
Object currentProxy()
```

