import{_ as n,Q as s,S as a,a5 as t}from"./framework-ec2af7a3.js";const p={},e=t(`<h1 id="注解与反射" tabindex="-1"><a class="header-anchor" href="#注解与反射" aria-hidden="true">#</a> 注解与反射</h1><h1 id="java-基础与进阶" tabindex="-1"><a class="header-anchor" href="#java-基础与进阶" aria-hidden="true">#</a> Java 基础与进阶</h1><h2 id="栈、堆、方法区" tabindex="-1"><a class="header-anchor" href="#栈、堆、方法区" aria-hidden="true">#</a> 栈、堆、方法区</h2><p><mark>注：方法区是特殊的堆</mark></p><h3 id="_1-1-栈" tabindex="-1"><a class="header-anchor" href="#_1-1-栈" aria-hidden="true">#</a> 1.1 栈</h3><h3 id="_1-2-堆" tabindex="-1"><a class="header-anchor" href="#_1-2-堆" aria-hidden="true">#</a> 1.2 堆</h3><h3 id="_1-3-方法区" tabindex="-1"><a class="header-anchor" href="#_1-3-方法区" aria-hidden="true">#</a> 1.3 方法区</h3><h2 id="注解与反射-1" tabindex="-1"><a class="header-anchor" href="#注解与反射-1" aria-hidden="true">#</a> 注解与反射</h2><h3 id="_1-反射" tabindex="-1"><a class="header-anchor" href="#_1-反射" aria-hidden="true">#</a> 1.反射</h3><h4>1.1 获取 Class</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 第一种方法，通过包名</span>
<span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">class</span> <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.xxx.xxx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 第二种方法，通过类名</span>
<span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">class</span> <span class="token operator">=</span> <span class="token class-name">Object<span class="token punctuation">.</span>Class</span><span class="token punctuation">;</span>

<span class="token comment">// 第三种方法，通过对象实例</span>
<span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">class</span> <span class="token operator">=</span> object<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 第四中方法，仅限于包装类，每个包装类都有一个TYPE属性，存放着自身的Class对象</span>
<span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">class</span> <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4>1.2 有Class对象的类型</h4><ul><li>外部类、成员内部类、静态内部类、局部内部类、匿名内部类</li><li>注解、接口、数组、枚举</li><li>基本数据类型以及void</li></ul><h4>1.3 类加载过程</h4><h5>1.3.1 加载</h5><blockquote><p>将 class 文件的字节码内容加载到内存中，并将这些动态数据转换成方法区的运行时数据结构，然后生成一个代表这个类的 Class 对象</p></blockquote><h5>1.3.2 链接</h5><blockquote><p>将 Java 类的二进制代码合并到 JVM 的运行状态中</p><p>（1）验证：确保加载的类信息符合 JVM 规范，没有安全方面的问题</p><p>（2）准备：正式为类变量 （static） 分配内存并设置类变量默认的初始值，这些内存都在方法区进行分配</p><p>（3）解析：虚拟机常量池内的符号引用（常量名）替换为直接引用（地址）的过程</p></blockquote><h5>1.3.3 初始化</h5><blockquote><p>（1）执行类构造器 <code>&lt;clinit&gt;()</code> 方法的过程，该方法是由编译期自动收集类中所有的类变量的赋值动作和静态代码块中的语句合并产生的（类构造器是构造类的信息，不是构造该类的构造器）</p><p>（2）当初始化一个类时，如果发现其父类没有初始化，则需要先初始化其父类</p><p>（3）虚拟机保证一个类的 <code>&lt;clinit&gt;()</code> 方法在多线程环境中被正确加锁和同步</p><p>（4）初始化的时间：</p><p><strong>主动引用时初始化：</strong></p><ul><li>主动引用（new）时会初始化</li><li>反射也会产生主动引用</li><li>虚拟机启动时，先初始化 main 方法中所有的类</li><li>调用类的静态成员（除 final 常量）和静态方法</li><li>初始化类时其父类未被初始化，则先让父类初始化</li></ul><p><strong>被动引用时不初始化：</strong></p><ul><li>当访问一个静态区域时，只有真正声明这个域的类才会被初始化。如通过子类引用父类的静态变量时，不会导致子类初始化</li><li>通过数组定义类引用，不会触发此类的初始化</li><li>引用常量不会触发此类的初始化（常量在链接阶段就存入调用类的常量池中了）</li></ul></blockquote><h4>1.4 类加载器的作用</h4><figure><img src="http://gitee.com/gzwrrr/typora-img/raw/master/images/image-20210824200208973.png" alt="image-20210824200208973" tabindex="0" loading="lazy"><figcaption>image-20210824200208973</figcaption></figure><blockquote><p>（1）类加载的作用：将 class 文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后在堆中生成一个代表这个类的 Class 对象，这个对象会做为方法区中类数据的访问入口</p><p>（2）类缓存：标准的 JavaSE 类加载器可以按照要求查找类，但一旦某个类被加载到了类加载器中，它将维持加载（缓存）一段时间。不过 JVM 的垃圾回收机制可以回收这些 Class 对象</p></blockquote><figure><img src="http://gitee.com/gzwrrr/typora-img/raw/master/images/image-20210824200322460.png" alt="image-20210824200322460" tabindex="0" loading="lazy"><figcaption>image-20210824200322460</figcaption></figure><h4>1.5 获取类的完整结构</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Class</span> <span class="token keyword">class</span> <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取类的包名+类名</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取类名</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取类的全部属性</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclareFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取类的 public 属性</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getFields</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获得任意指定属性</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclareField</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取指定 public 属性</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getField</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取本类及其父类的 public 方法</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getMethons</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取本类的全部方法</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclareMethons</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取指定的方法（后面的 xxx.class 是防止有重载的方法而无法确定）</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getMethon</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span> xxx<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获得构造器</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getConstructors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclareConstructs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获得指定的构造器</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclareConstructor</span><span class="token punctuation">(</span>xxx<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> xxx<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4>1.6 动态创建对象</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Class</span> <span class="token keyword">class</span> <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 调用无参构造器创建一个对象</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 通过构造器创建一个对象</span>
<span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDelareConstrutor</span><span class="token punctuation">(</span> xxx<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span> xxx<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4>1.7 反射获取方法以及执行</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Class</span> <span class="token keyword">class</span> <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Methon</span> methon <span class="token operator">=</span> <span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDelaredMethon</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span>xxx<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 执行方法</span>
methon<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 方法的参数<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4>1.8 反射获取属性并操作</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Class</span> <span class="token keyword">class</span> <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Field</span> field <span class="token operator">=</span> <span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDelaredField</span><span class="token punctuation">(</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 可修改，默认为false</span>
field<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 执行方法</span>
field<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;xxx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","注解与反射.html.vue"]]);export{k as default};
