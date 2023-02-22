import{_ as a,Q as s,S as n,a5 as e}from"./framework-ec2af7a3.js";const t={},p=e(`<h1 id="java-中的数据结构" tabindex="-1"><a class="header-anchor" href="#java-中的数据结构" aria-hidden="true">#</a> Java 中的数据结构</h1><h2 id="java-中的容器" tabindex="-1"><a class="header-anchor" href="#java-中的容器" aria-hidden="true">#</a> java 中的容器</h2><blockquote><p>容器主要包括 Collection 和 Map 两种，Collection 存储着对象的集合，而 Map 存储着键值对（两个对象）的映射表</p></blockquote><h3 id="_1-collection" tabindex="-1"><a class="header-anchor" href="#_1-collection" aria-hidden="true">#</a> 1.Collection</h3><p><strong>1.Set：</strong></p><ul><li><code>TreeSet</code>：基于红黑树实现，支持有序性操作，例如根据一个范围查找元素的操作。但是查找效率不如 HashSet，HashSet 查找的时间复杂度为 O(1)，<code>TreeSet</code> 则为 O(logN)。</li><li><code>HashSet</code>：基于哈希表实现，支持快速查找，但不支持有序性操作。并且失去了元素的插入顺序信息，也就是说使用 Iterator 遍历 HashSet 得到的结果是不确定的。</li><li><code>LinkedHashSet</code>：具有 HashSet 的查找效率，并且内部使用双向链表维护元素的插入顺序。</li></ul><p><strong>2.List：</strong></p><ul><li><code>ArrayList</code>：基于动态数组实现，支持随机访问。</li><li><code>Vector</code>：和 <code>ArrayList</code> 类似，但它是线程安全的。</li><li><code>LinkedList</code>：基于双向链表实现，只能顺序访问，但是可以快速地在链表中间插入和删除元素。不仅如此，LinkedList 还可以用作栈、队列和双向队列。</li></ul><p><strong>3.Queue：</strong></p><ul><li><code>LinkedList</code>：可以用它来实现双向队列。</li><li><code>PriorityQueue</code>：基于堆结构实现，可以用它来实现优先队列。</li></ul><br><h3 id="_2-map" tabindex="-1"><a class="header-anchor" href="#_2-map" aria-hidden="true">#</a> 2.Map</h3><ul><li><code>TreeMap</code>：基于红黑树实现。</li><li><code>HashMap</code>：基于哈希表实现。</li><li><code>HashTable</code>：和 HashMap 类似，但它是线程安全的，这意味着同一时刻多个线程同时写入 HashTable 不会导致数据不一致。它是遗留类，不应该去使用它，而是使用 ConcurrentHashMap 来支持线程安全，ConcurrentHashMap 的效率会更高，因为 ConcurrentHashMap 引入了分段锁。</li><li><code>LinkedHashMap</code>：使用双向链表来维护元素的顺序，顺序为插入顺序或者最近最少使用（LRU）顺序。</li></ul><br><h2 id="java-容器的相关知识点" tabindex="-1"><a class="header-anchor" href="#java-容器的相关知识点" aria-hidden="true">#</a> Java 容器的相关知识点</h2><h3 id="_1-arraylist" tabindex="-1"><a class="header-anchor" href="#_1-arraylist" aria-hidden="true">#</a> 1.Arraylist</h3><p>因为 <code>ArrayList</code> 是基于数组实现的，所以支持快速随机访问：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">AbstractList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">implements</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">RandomAccess</span><span class="token punctuation">,</span> <span class="token class-name">Cloneable</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Serializable</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>数组的默认大小为 10：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">DEFAULT_CAPACITY</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><h3 id="_2-vector" tabindex="-1"><a class="header-anchor" href="#_2-vector" aria-hidden="true">#</a> 2.Vector</h3><p>它的实现与 <code>ArrayList</code> 类似，但是使用了 <code>synchronized</code> 进行同步：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">boolean</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     modCount<span class="token operator">++</span><span class="token punctuation">;</span>
     <span class="token function">ensureCapacityHelper</span><span class="token punctuation">(</span>elementCount <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     elementData<span class="token punctuation">[</span>elementCount<span class="token operator">++</span><span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span>
     <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token class-name">E</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&gt;=</span> elementCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ArrayIndexOutOfBoundsException</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>    
	<span class="token keyword">return</span> <span class="token function">elementData</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 ArrayList 的比较：</p><ul><li>Vector 是同步的，因此开销就比 ArrayList 要大，访问速度更慢。最好使用 ArrayList 而不是 Vector，因为同步操作完全可以由程序员自己来控制；</li><li>Vector 每次扩容请求其大小的 2 倍（也可以通过构造函数设置增长的容量），而 ArrayList 是 1.5 倍。</li></ul><br><h3 id="_3-linkedlist" tabindex="-1"><a class="header-anchor" href="#_3-linkedlist" aria-hidden="true">#</a> 3. LinkedList</h3><p>基于双向链表实现，使用 Node 存储链表节点信息：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
	<span class="token class-name">E</span> item<span class="token punctuation">;</span>
	<span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> next<span class="token punctuation">;</span>
	<span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> prev<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个链表存储了 first 和 last 指针：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	<span class="token keyword">transient</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> first<span class="token punctuation">;</span>
	<span class="token keyword">transient</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> last<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>与 ArrayList 的比较：</p><ul><li><p>ArrayList 基于动态数组实现，LinkedList 基于双向链表实现。ArrayList 和 LinkedList 的区别可以归结为数组和链表的区别：</p></li><li><p>数组支持随机访问，但插入删除的代价很高，需要移动大量元素；</p></li><li><p>链表不支持随机访问，但插入删除只需要改变指针。</p></li></ul><br><h3 id="_4-hashmap" tabindex="-1"><a class="header-anchor" href="#_4-hashmap" aria-hidden="true">#</a> 4 HashMap</h3><p><strong>HashMap 的底层实现是「数组」+「链表」</strong></p><p>存储结构：</p><ul><li>内部包含了一个 Entry 类型的数组 table。</li><li>Entry 存储着键值对。它包含了四个字段，从 next 字段我们可以看出 Entry 是一个链表。即数组中的每个位置被当成一个桶，一个桶存放一个链表</li><li>HashMap 使用拉链法来解决冲突，同一个链表中存放哈希值和散列桶取模运算结果相同的 Entry。</li></ul>`,39),c=[p];function o(l,i){return s(),n("div",null,c)}const d=a(t,[["render",o],["__file","A-Java中的数据结构.html.vue"]]);export{d as default};
