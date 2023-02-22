import{_ as n,Q as s,S as a,a5 as e}from"./framework-ec2af7a3.js";const t={},p=e(`<h1 id="css-通用" tabindex="-1"><a class="header-anchor" href="#css-通用" aria-hidden="true">#</a> CSS 通用</h1><h1 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h1><h2 id="vue" tabindex="-1"><a class="header-anchor" href="#vue" aria-hidden="true">#</a> vue</h2><table><thead><tr><th style="text-align:center;">序号</th><th style="text-align:center;">名称</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">vue-tinder</td><td style="text-align:center;">移动端卡片滑动隐藏组件</td></tr></tbody></table><h1 id="bug" tabindex="-1"><a class="header-anchor" href="#bug" aria-hidden="true">#</a> Bug</h1><h3 id="基线对齐错位" tabindex="-1"><a class="header-anchor" href="#基线对齐错位" aria-hidden="true">#</a> 基线对齐错位</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* 变换基线对齐方式就可以解决错位问题 */</span>
<span class="token property">vertical-align</span><span class="token punctuation">:</span> top<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="样式-动画" tabindex="-1"><a class="header-anchor" href="#样式-动画" aria-hidden="true">#</a> 样式/动画</h1><h3 id="滚动条样式修改" tabindex="-1"><a class="header-anchor" href="#滚动条样式修改" aria-hidden="true">#</a> 滚动条样式修改</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.scrollStyle::-webkit-scrollbar</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 6px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #F5F5F5<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.scrollStyle::-webkit-scrollbar-track</span> <span class="token punctuation">{</span>
  <span class="token property">-webkit-box-shadow</span><span class="token punctuation">:</span> inset 0 0 6px <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #F5F5F5<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.scrollStyle::-webkit-scrollbar-thumb</span> <span class="token punctuation">{</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">-webkit-box-shadow</span><span class="token punctuation">:</span> inset 0 0 6px <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> .3<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #72b5fb<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元素抖动动画" tabindex="-1"><a class="header-anchor" href="#元素抖动动画" aria-hidden="true">#</a> 元素抖动动画</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@keyframes</span> shake</span> <span class="token punctuation">{</span>
  <span class="token selector">10%,
  90%</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate3d</span><span class="token punctuation">(</span>-1px<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">20%,
  80%</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate3d</span><span class="token punctuation">(</span>2px<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">30%,
  50%,
  70%</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate3d</span><span class="token punctuation">(</span>-4px<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token selector">40%,
  60%</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate3d</span><span class="token punctuation">(</span>4px<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.apply-shake</span> <span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> shake 0.82s <span class="token function">cubic-bezier</span><span class="token punctuation">(</span>0.36<span class="token punctuation">,</span> 0.07<span class="token punctuation">,</span> 0.19<span class="token punctuation">,</span> 0.97<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元素同宽" tabindex="-1"><a class="header-anchor" href="#元素同宽" aria-hidden="true">#</a> 元素同宽</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.sameWidth</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> inline-flex<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文字超出省略" tabindex="-1"><a class="header-anchor" href="#文字超出省略" aria-hidden="true">#</a> 文字超出省略</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.omit</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),c=[p];function i(l,o){return s(),a("div",null,c)}const r=n(t,[["render",i],["__file","CSS通用.html.vue"]]);export{r as default};
