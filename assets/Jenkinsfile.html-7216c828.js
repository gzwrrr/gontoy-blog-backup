import{_ as n,Q as s,S as a,a5 as o}from"./framework-ec2af7a3.js";const t={},i=o(`<h1 id="jenkinsfile-简单使用" tabindex="-1"><a class="header-anchor" href="#jenkinsfile-简单使用" aria-hidden="true">#</a> Jenkinsfile 简单使用</h1><h2 id="声明式流水线" tabindex="-1"><a class="header-anchor" href="#声明式流水线" aria-hidden="true">#</a> 声明式流水线</h2><h3 id="_1-结构" tabindex="-1"><a class="header-anchor" href="#_1-结构" aria-hidden="true">#</a> 1.结构</h3><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code><span class="token comment">// 加载共享库</span>
<span class="token annotation punctuation">@Library</span><span class="token punctuation">(</span><span class="token string">&#39;jenkinslib@master&#39;</span><span class="token punctuation">)</span> <span class="token number">_</span>

String workspace <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;/opt/jenkins/workspace&quot;</span></span>

pipeline <span class="token punctuation">{</span>
    <span class="token comment">// 代理</span>
	agent <span class="token punctuation">{</span>
		node <span class="token punctuation">{</span>
            <span class="token comment">// 指定运行节点的标签或名称</span>
			label <span class="token interpolation-string"><span class="token string">&quot;master&quot;</span></span>
            <span class="token comment">// 指定运行工作目录</span>
			customWorkspace <span class="token interpolation-string"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">workspace</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 全局工具</span>
    tool <span class="token punctuation">{</span>
        xxx
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 环境，全局变量</span>
    environment <span class="token punctuation">{</span>
        xxx
    <span class="token punctuation">}</span>
    
    options <span class="token punctuation">{</span>
        <span class="token comment">// 日志时间</span>
        <span class="token function">timestamps</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 删除隐式 checkout scm 语句 </span>
        <span class="token function">skipDefaultCheckout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 禁止并行</span>
        <span class="token function">disableConcurrentBuilds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 流水线超时设置为 30 分钟</span>
        <span class="token function">timeout</span><span class="token punctuation">(</span>time<span class="token punctuation">:</span> <span class="token number">30</span><span class="token punctuation">,</span> unit<span class="token punctuation">:</span> <span class="token string">&#39;MINUTES&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    stages <span class="token punctuation">{</span>
        input <span class="token punctuation">{</span>
        	xxx    
        <span class="token punctuation">}</span>
        stage <span class="token punctuation">{</span>
            when <span class="token punctuation">{</span>
            	environment name<span class="token punctuation">:</span> <span class="token string">&#39;xxx&#39;</span><span class="token punctuation">,</span>
            	value<span class="token punctuation">:</span> <span class="token string">&#39;xxx&#39;</span>
        	<span class="token punctuation">}</span>
            <span class="token function">timeout</span><span class="token punctuation">(</span>time<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span> unit<span class="token punctuation">:</span> <span class="token string">&#39;MINUTES&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                script <span class="token punctuation">{</span>
                    <span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&#39;xxx&#39;</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token function">stage</span><span class="token punctuation">(</span><span class="token string">&#39;Example&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                xxx
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    post <span class="token punctuation">{</span>
        always <span class="token punctuation">{</span>
            echo <span class="token string">&#39;xxx&#39;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-各部分解释" tabindex="-1"><a class="header-anchor" href="#_2-各部分解释" aria-hidden="true">#</a> 2.各部分解释</h3><ul><li>agent</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/agent.png" alt="image-20220516235709630" tabindex="0" loading="lazy"><figcaption>image-20220516235709630</figcaption></figure><ul><li>post</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/post.png" alt="image-20220516235920789" tabindex="0" loading="lazy"><figcaption>image-20220516235920789</figcaption></figure><ul><li>stages</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/stages.png" alt="image-20220517000051638" tabindex="0" loading="lazy"><figcaption>image-20220517000051638</figcaption></figure><ul><li>environment</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/environment.png" alt="image-20220517000225049" tabindex="0" loading="lazy"><figcaption>image-20220517000225049</figcaption></figure><ul><li>options</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/options.png" alt="image-20220517000337820" tabindex="0" loading="lazy"><figcaption>image-20220517000337820</figcaption></figure><ul><li>paramters</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/paramters.png" alt="image-20220517000520950" tabindex="0" loading="lazy"><figcaption>image-20220517000520950</figcaption></figure><ul><li>trigger</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/trigger.png" alt="image-20220517000551382" tabindex="0" loading="lazy"><figcaption>image-20220517000551382</figcaption></figure><ul><li>tool</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/tool.png" alt="image-20220517000643113" tabindex="0" loading="lazy"><figcaption>image-20220517000643113</figcaption></figure><ul><li>input</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/input.png" alt="image-20220517000914784" tabindex="0" loading="lazy"><figcaption>image-20220517000914784</figcaption></figure><ul><li>when</li></ul><figure><img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/when.png" alt="image-20220517001202914" tabindex="0" loading="lazy"><figcaption>image-20220517001202914</figcaption></figure>`,25),c=[i];function p(e,l){return s(),a("div",null,c)}const m=n(t,[["render",p],["__file","Jenkinsfile.html.vue"]]);export{m as default};
