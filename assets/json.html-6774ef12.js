import{_ as n,Q as s,S as a,a5 as t}from"./framework-ec2af7a3.js";const e={},o=t(`<h1 id="json" tabindex="-1"><a class="header-anchor" href="#json" aria-hidden="true">#</a> JSON</h1><h2 id="简单使用" tabindex="-1"><a class="header-anchor" href="#简单使用" aria-hidden="true">#</a> 简单使用</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> json

<span class="token comment"># 创建一个字典对象</span>
data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;age&quot;</span><span class="token punctuation">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
    <span class="token string">&quot;hobbies&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;reading&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;coding&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;music&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># 打开一个文件对象，用&quot;w&quot;模式表示写入</span>
<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;data.json&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;w&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    <span class="token comment"># 使用json.dump()函数将字典对象转换为JSON格式，并写入文件中</span>
    json<span class="token punctuation">.</span>dump<span class="token punctuation">(</span>data<span class="token punctuation">,</span> f<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>https://www.ncei.noaa.gov/data/global-summary-of-the-day/access/2014/94474099999.csv</p>`,4),p=[o];function c(i,u){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","json.html.vue"]]);export{d as default};
