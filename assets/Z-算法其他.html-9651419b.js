import{_ as n,Q as s,S as a,a5 as p}from"./framework-ec2af7a3.js";const t={},e=p(`<h1 id="算法-其他" tabindex="-1"><a class="header-anchor" href="#算法-其他" aria-hidden="true">#</a> 算法-其他</h1><h2 id="位运算" tabindex="-1"><a class="header-anchor" href="#位运算" aria-hidden="true">#</a> 位运算</h2><ul><li>与：&amp;</li><li>或：|</li><li>非：~</li><li>异或：^</li></ul><br><h3 id="异或" tabindex="-1"><a class="header-anchor" href="#异或" aria-hidden="true">#</a> 异或</h3><p><strong>二进制，异或的性质</strong></p><p>0 ^ N = N;</p><p>N ^ N = 0;</p><p>异或运算满足：结合律、交换律（与顺序无关，可以用无进位相加理解）</p><p><strong>二进制，无进位相加表格理解</strong></p><table><thead><tr><th style="text-align:center;">a</th><th style="text-align:center;">b</th><th style="text-align:center;">c</th><th style="text-align:center;">result</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td><td style="text-align:center;">0</td></tr><tr><td style="text-align:center;">1</td><td style="text-align:center;">1</td><td style="text-align:center;">1</td><td style="text-align:center;">1</td></tr><tr><td style="text-align:center;">1</td><td style="text-align:center;">0</td><td style="text-align:center;">0</td><td style="text-align:center;">1</td></tr></tbody></table><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">// 大前提：a 和 b 的值可以一样，但是分别指向的内存是不同的</span>
<span class="token comment">// 因为本质上是内存地址进行了交换，如果地址一样则异或成0</span>
<span class="token comment">// 两数交换，无需额外空间，且由于是位运算，所以速度较快</span>
a <span class="token operator">=</span> a <span class="token operator">^</span> b<span class="token punctuation">;</span> <span class="token comment">// a = a ^ b;  b = b;</span>
b <span class="token operator">=</span> a <span class="token operator">^</span> b<span class="token punctuation">;</span> <span class="token comment">// a = a ^ b;  b = a ^ b ^ b = a;</span>
a <span class="token operator">=</span> a <span class="token operator">^</span> b<span class="token punctuation">;</span> <span class="token comment">// a = a ^ b ^ a = b;  b = a;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>巧用异或的例子：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
*  要求：o(n),n(1)
* （1）有一个数组，奇数个的相同数字只有一个，打印出该数字
* （2）有一个数组，奇数个的相同数字只有两个，打印出该数字
* */</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printOneOdd</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> eor <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        eor <span class="token operator">^=</span> num<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>eor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printTwoOddNum</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">int</span> eor <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        eor <span class="token operator">^=</span> num<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
	
    <span class="token comment">// 取出最右边的1</span>
    <span class="token keyword">int</span> rightOne <span class="token operator">=</span> eor <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token operator">~</span>eor <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> onlyOne <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>num <span class="token operator">&amp;</span> rightOne<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            onlyOne <span class="token operator">^=</span> num<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>onlyOne <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>eor <span class="token operator">^</span> onlyOne<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="不使用判断返回大值" tabindex="-1"><a class="header-anchor" href="#不使用判断返回大值" aria-hidden="true">#</a> 不使用判断返回大值</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 不使用「判断语句」返回两个有符号整数中较大的数字
 * <span class="token keyword">@author</span> gzw
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GetMax</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 上游函数保证传入的参数 num 只会是 1 或者 0
     * 该函数的功能是将 num 从 1 变为 0，将 0 变为 1
     * 这样做可以得到两个互斥的条件，条件用 1 或 0 的形式代表，意义自行定义
     * <span class="token keyword">@param</span> <span class="token parameter">num</span> 0 或 1
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">flip</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> num <span class="token operator">^</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取传入的数字的符号
     * 为 1 代表正数，为 0 代表负数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sign</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">(</span>num <span class="token operator">&gt;&gt;</span> <span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 使用加法与互斥条件返回两数中的大数
     * 但是这个方法是问题的，因为在求差值时可能溢出
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getMax1</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里是有可能溢出的</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
        <span class="token comment">// c 为正数说明 a &gt;= b，此时 sA = 1，sB = 0，否则 a &lt; b，此时 sA = 0，sB = 1</span>
        <span class="token keyword">int</span> sA <span class="token operator">=</span> <span class="token function">sign</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> sB <span class="token operator">=</span> <span class="token function">flip</span><span class="token punctuation">(</span>sA<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 因为是互斥条件，所以只可能返回加号两边的其中一项</span>
        <span class="token keyword">return</span> sA <span class="token operator">*</span> a <span class="token operator">+</span> sB <span class="token operator">*</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 使用加法与互斥条件返回两数中的大数
     * 这个方法就算差值溢出也能返回正确的结果
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getMax2</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里是有可能溢出的</span>
        <span class="token keyword">int</span> c <span class="token operator">=</span> a <span class="token operator">-</span> b<span class="token punctuation">;</span>
        <span class="token comment">// 求出三个值的符号</span>
        <span class="token keyword">int</span> sA <span class="token operator">=</span> <span class="token function">sign</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> sB <span class="token operator">=</span> <span class="token function">sign</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> sC <span class="token operator">=</span> <span class="token function">sign</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 当 sA 与 sB 符号相同，difSab = 0，sameSab = 1，否则相反</span>
        <span class="token keyword">int</span> difSab <span class="token operator">=</span> sA <span class="token operator">^</span> sB<span class="token punctuation">;</span>
        <span class="token keyword">int</span> sameSab <span class="token operator">=</span> <span class="token function">flip</span><span class="token punctuation">(</span>difSab<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 判断是该返回 a 还是 b</span>
        <span class="token comment">// 加号左边的含义：两个数符号不相同时，如果 sA 是正数，那么就一定返回 a，因为此时 b 为负数一定小，否则返回 b，所以此处直接用 sA 的状态即可</span>
        <span class="token comment">// 加号右边的含义：两个数符号相同时，绝对不可能溢出，此时直接用 sC 的结果即可</span>
        <span class="token keyword">int</span> returnA <span class="token operator">=</span> difSab <span class="token operator">*</span> sA <span class="token operator">+</span> sameSab <span class="token operator">*</span> sC<span class="token punctuation">;</span>
        <span class="token comment">// 与返回 A 的条件互斥</span>
        <span class="token keyword">int</span> returnB <span class="token operator">=</span> <span class="token function">flip</span><span class="token punctuation">(</span>returnA<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 因为是互斥条件，所以只可能返回加号两边的其中一项</span>
        <span class="token keyword">return</span> returnA <span class="token operator">*</span> a <span class="token operator">+</span> returnB <span class="token operator">*</span> b<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">2147483647</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2147480000</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a <span class="token operator">-</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">GetMax</span> getMax <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GetMax</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>getMax<span class="token punctuation">.</span><span class="token function">getMax1</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回错误</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>getMax<span class="token punctuation">.</span><span class="token function">getMax2</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 返回正确</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="判断是否为-2-或-4-的次幂" tabindex="-1"><a class="header-anchor" href="#判断是否为-2-或-4-的次幂" aria-hidden="true">#</a> 判断是否为 2 或 4 的次幂</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IsPower</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 判断某个数是否是 2 的次幂
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">is2Power</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>n <span class="token operator">&amp;</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 判断某个数是否是 4 的次幂
     * 前提就是该数是 2 的次幂
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">is4Power</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 0x55555555 是 01010101...0101</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>n <span class="token operator">&amp;</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>n <span class="token operator">&amp;</span> <span class="token number">0x55555555</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h3 id="实现加减乘除" tabindex="-1"><a class="header-anchor" href="#实现加减乘除" aria-hidden="true">#</a> 实现加减乘除</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ArithmeticOperation</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 前提是 a + b 本身不溢出
     * 溢出是不管是系统还是该方法都不保证计算结果正确
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> a<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>b <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 异或运算本身就是无进位相加</span>
            sum <span class="token operator">=</span> a <span class="token operator">^</span> b<span class="token punctuation">;</span>
            <span class="token comment">// 与运算能求出进位的结果，当进位为 0 时，此时的 sum 就是最终结果</span>
            b <span class="token operator">=</span> <span class="token punctuation">(</span>a <span class="token operator">&amp;</span> b<span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">;</span>
            a <span class="token operator">=</span> sum<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 取反加 1
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">negNum</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token operator">~</span>n<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 减法
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">minus</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token function">negNum</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 乘法
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">multi</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>b <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>b <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">add</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            a <span class="token operator">&lt;&lt;=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token comment">// 这里主要要用逻辑右移，否则当 b 是负数时高位会补 1</span>
            b <span class="token operator">&gt;&gt;&gt;=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 判断是否为负数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isNeg</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 除法
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">div</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> x <span class="token operator">=</span> <span class="token function">isNeg</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">negNum</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">:</span> a<span class="token punctuation">;</span>
        <span class="token keyword">int</span> y <span class="token operator">=</span> <span class="token function">isNeg</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">negNum</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token operator">:</span> b<span class="token punctuation">;</span>
        <span class="token keyword">int</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">31</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">=</span> <span class="token function">minus</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>x <span class="token operator">&gt;&gt;</span> i<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                res <span class="token operator">|=</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                x <span class="token operator">=</span> <span class="token function">minus</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token operator">&lt;&lt;</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">isNeg</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token function">isNeg</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">negNum</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">:</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h2><p><strong>入手点：</strong></p><p>（1）根据数据状况优化</p><p>（2）根据问题描述优化</p><p><strong>例如：</strong></p><p>二分查找一般用于有序数组中查找某一个值，无序数组中很少用到，无序列表应用二分法查找的一个例子是寻找局部最小</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
	1.局部最小的定义：
	（1）在 0 ~ 1 位置上 arr[0] &lt; arr[1]，0位置局部最小
	（2）在 n-2 ~ n-1 位置上 arr[n-1] &lt; arr[n-2]，n-1 位置局部最小 
	（3）在 i-1 ~ i ~ i+1 位置上 arr[i-1] &gt; arr[i] &lt; arr[i+1]，i 位置局部最小
	
	2.问题描述：
	（1）数组无序
	（2）任意相邻数之间不重复
	（3）在 时间复杂度 &lt; o(n) 的情况下找出一个局部最小的位置
	
	以上的数据与题目描述适合用二分法，这就是一个根据数况与问题优化解题的例子 
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="对数器" tabindex="-1"><a class="header-anchor" href="#对数器" aria-hidden="true">#</a> 对数器</h2><p><strong>对数器的概念：</strong></p><ul><li><p>方法 A：优化后的解法，但不知道是否正确</p></li><li><p>方法 B：相对容易的实现的解法，已知正确</p></li><li><p>随机生成两个相同的数组，分别放入 A 和 B 测试 N 次比对结果是否一致，当 N 足够大时就能保 证 A 方法是正确的，这就是对数器的基础理解</p></li></ul><p><strong>优点：</strong></p><ul><li><p>保证优化后的代码正确</p></li><li><p>不用依赖线上测试平台</p></li></ul><p><strong>缺点：</strong></p><ul><li>需要实现两种解法</li></ul><br><h2 id="比较器" tabindex="-1"><a class="header-anchor" href="#比较器" aria-hidden="true">#</a> 比较器</h2><ul><li><p>比较器的是指就是重载比较运算符</p></li><li><p>比较器可以很好地应用在特殊标准的排序上</p></li><li><p>比较器可以很好地应用在根据特殊标准排序的结构上</p></li></ul><br><h2 id="小技巧" tabindex="-1"><a class="header-anchor" href="#小技巧" aria-hidden="true">#</a> 小技巧</h2><h3 id="求中点" tabindex="-1"><a class="header-anchor" href="#求中点" aria-hidden="true">#</a> 求中点</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">int</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> r <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// 用此方法可能会有溢出问题</span>
mid <span class="token operator">=</span> <span class="token punctuation">(</span>l <span class="token operator">+</span> r<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">// 所以用位运算，且速度较快</span>
mid <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>r <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="等概率返回" tabindex="-1"><a class="header-anchor" href="#等概率返回" aria-hidden="true">#</a> 等概率返回</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 自己改造随机
 * 例如：17 ~ 56 等概率返回，39 = 56 - 17 + 1
 *   f(): 0/1        6 位最大 64         超出 39 就重做    最后得到 0 ~ 39 再加上 17 即可
 * 获得 01 发生器 -&gt; 看看需要几个二进制位 -&gt; 超出范围就重做 -&gt; 最后加回去
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> randomTest <span class="token punctuation">{</span>
    <span class="token comment">// 最终等概率返回函数</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">g</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">f06</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">f06</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> ans <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">do</span> <span class="token punctuation">{</span>
            ans <span class="token operator">=</span> <span class="token function">f07</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>ans <span class="token operator">==</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 使用 0 1 等概率发生器随机出等概率的 [0, 7]</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">f07</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token function">f01</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token function">f01</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">f01</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 只能用 randomf 获得等概率的 0 和 1</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">f01</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> ans <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">do</span> <span class="token punctuation">{</span>
            ans <span class="token operator">=</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>ans <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> ans <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 下面的函数不能改变</span>
    <span class="token comment">// [1, 5] 等概率返回</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","Z-算法其他.html.vue"]]);export{r as default};
