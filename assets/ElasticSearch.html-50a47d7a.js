import{_ as n,Q as s,S as a,a5 as t}from"./framework-ec2af7a3.js";const e={},p=t(`<h1 id="elasticsearch-简单使用" tabindex="-1"><a class="header-anchor" href="#elasticsearch-简单使用" aria-hidden="true">#</a> ElasticSearch 简单使用</h1><h1 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面" aria-hidden="true">#</a> 写在前面</h1><p>ElasticSearch 是分布式的「搜索」与「分析」引擎，可以快速地存储、搜索和分析海量数据，底层是对 Lucene 进行封装，以此提供 RESTful API 接口，开箱即用</p><p>基本概念</p><ol><li>索引：理解为动词时，相当于 MySQL 中的 insert；理解为名词时，相当于 MySQL 中的 database</li><li>字段类型：在索引中可以定义一个或多个类型，类似于 MySQL 中的表（table），其中每一种类型的数据放在一起。补充：ES 7 以上的版本都建议不使用类型，即将数据直接存储在索引下面，原因是使用类型时，不同类型下的字段可能相同，这样在检索时效率会下降，并且在 8 以上的版本类型将会被移除</li><li>文档：保存在某个索引某个类型下的数据就称为文档，文档是以 JSON 格式存储的，类似于 MySQL 中的表的内容</li><li>分片（倒排索引）：先将整句分词，之后维护一张记录这些词出现在哪条记录的倒排索引表，搜索时也会先分词然后匹配所有相关记录，同一条记录出现次数最高的相关性得分最高，那么这条记录就是最符合的搜索结果</li></ol><p>补充：ElesticSearch 和 Kibana（图形化界面） 的版本要一致</p><br><h1 id="安装-es-与-kibana" tabindex="-1"><a class="header-anchor" href="#安装-es-与-kibana" aria-hidden="true">#</a> 安装 ES 与 Kibana</h1><ul><li><code>docker pull elasticsearch:7.5.1</code></li><li><code>mkdir -p /data/elasticsearch/config</code></li><li><code>mkdir -p /data/elasticsearch/data</code></li><li><code>chmod -R 777 /data/elasticsearch/data</code></li><li><code>echo &quot;http.host: 0.0.0.0&quot;&gt;&gt;/data/elasticsearch/config/elsticsearch.yml</code></li><li><code>docker run --name elasticsearch -p 9200:9200 -p 9300:9300 -e &quot;discovery.type=single-node&quot; -e ES_JAVA_OPTS=&quot;-Xms256m -Xmx512m&quot; -v /data/elasticsearch/config/elsticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /data/elasticsearch/data:/usr/share/elasticsearch/data -v /data/elasticsearch/plugins:/usr/share/elasticsearch/plugins -d elasticsearch:7.5.1</code></li></ul><p>docker 安装 Kibana：</p><ul><li><code>docker pull kibana:7.5.1</code></li><li><code>docker run --name kibana -e ELASTICSEARCH_HOSTS=http://192.168.30.100:9200 -p 5601:5601 -d kibana:7.5.1</code></li></ul><br><h1 id="crud" tabindex="-1"><a class="header-anchor" href="#crud" aria-hidden="true">#</a> CRUD</h1><p><strong>新增或更新：</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// put 或 post 请求：http://192.168.30.100:9200/customer/external/1</span>
<span class="token comment">// 两种请求方式都是默认更新的，但是如果在 post 请求最后加上 /_update 就会对比版本号再决定是否更新</span>
<span class="token comment">// 携带数据示例</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;zhangsan&quot;</span>
<span class="token punctuation">}</span>
<span class="token comment">// post 请求：http://192.168.30.100:9200/customer/external/1/_update，注意下面的 doc 语法</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;doc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    	<span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;zhangsan&quot;</span><span class="token punctuation">,</span>
    	<span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token string">&quot;18&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查询与删除：</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// get 请求：http://192.168.30.100:9200/customer/external/1</span>
<span class="token comment">// delete 请求删除数据：http://192.168.30.100:9200/customer/external/1</span>
<span class="token comment">// delete 请求删除索引：http://192.168.30.100:9200/customer，注意不可以删除类型，但是删除类型下的所有数据就相当于删除了类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>bulk 批量 API 语法：对需要携带数据的操作，两行为一个整体操作；用大括号区分不同行，请求体类型是 text，不是 json：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 使用 Kibana 进行操作</span>
POST /customer/external/_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;zhangsan&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;zhangsan&quot;</span><span class="token punctuation">}</span>

<span class="token comment">// 对整个 ElasticSearch 进行操作</span>
POST /_bulk
<span class="token punctuation">{</span><span class="token property">&quot;delete&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;website&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span><span class="token string">&quot;blog&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;create&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;website&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span><span class="token string">&quot;blog&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;my test&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;website&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span><span class="token string">&quot;blog&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;my test index&quot;</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;update&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;website&quot;</span><span class="token punctuation">,</span> <span class="token property">&quot;_type&quot;</span><span class="token operator">:</span><span class="token string">&quot;blog&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;doc&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;title&quot;</span><span class="token operator">:</span><span class="token string">&quot;my test update&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="search-api-query-dsl" tabindex="-1"><a class="header-anchor" href="#search-api-query-dsl" aria-hidden="true">#</a> Search API（Query DSL）</h1><p>ES 支持两种基本方式检索：</p><ol><li>通过 RESTful API 发送搜索参数</li><li>使用 REST request body 发送参数</li></ol><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 下面表示查询 shakespeare 下的所有数据并按照 line_id 升序排序</span>
GET /shakespeare/_search?q=*&amp;sort=line_id<span class="token operator">:</span>asc
<span class="token comment">// 或者使用</span>
GET /shakespeare/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;line_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;asc&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面就是上述示例的搜索条件，称为领域搜索语言（Query DSL，内容比较多）：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;line_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;asc&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 查询所有数据</span>
    <span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token comment">// 全文匹配字段的值，会进行分词</span>
    ”match“<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;line_id&quot;</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
      <span class="token comment">// 字段后面加上 .keyword 表示精确匹配</span>
      <span class="token property">&quot;address.keyword&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxx xxx&quot;</span>
  	<span class="token punctuation">}</span>
    
    <span class="token comment">// 全文匹配字段的值，不会进行分词</span>
    <span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span>
	<span class="token punctuation">}</span>
	
	<span class="token comment">// 多字段匹配，其中一个匹配就会返回</span>
	<span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">// 只要在下面的字段中匹配到上面写的查询条件即可</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;xxx&quot;</span><span class="token punctuation">]</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 复合查询</span>
	”bool“<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 必须符合的条件</span>
        <span class="token property">&quot;must&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                ”gender“<span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span><span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                ”address“<span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 必须不符合的条件</span>
        <span class="token property">&quot;must_not&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                ”age“<span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 最好满足的条件</span>
        <span class="token property">&quot;should&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span><span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                ”name“<span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 过滤器匹配，与 match 的差别在于，match 会共享相关性得分，但是 filter 不会</span>
        ”filter“<span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> xx<span class="token punctuation">,</span>
                    <span class="token property">&quot;lte&quot;</span><span class="token operator">:</span> xx
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

	<span class="token comment">// 检索非文本字段（有精确值的），注意不要用 term 来检索文本，这样有可能一个也不返回</span>
	“term”<span class="token operator">:</span> <span class="token punctuation">{</span>
        “address”<span class="token operator">:</span> <span class="token string">&quot;xx&quot;</span>
	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="排序" tabindex="-1"><a class="header-anchor" href="#排序" aria-hidden="true">#</a> 排序</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token comment">// 按 line_id 进行降序排序</span>
      <span class="token property">&quot;line_id&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          ”order“<span class="token operator">:</span> ”desc“
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="分页" tabindex="-1"><a class="header-anchor" href="#分页" aria-hidden="true">#</a> 分页</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 查询 0-4 共 5 条数据</span>
  <span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">5</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="返回部分字段" tabindex="-1"><a class="header-anchor" href="#返回部分字段" aria-hidden="true">#</a> 返回部分字段</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">// 返回 line_id 字段</span>
  <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token string">&quot;{line_id}&quot;</span>
  <span class="token comment">// 返回多个字段</span>
  <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;field-1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;field-2&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="聚合" tabindex="-1"><a class="header-anchor" href="#聚合" aria-hidden="true">#</a> 聚合</h2><p>ES 在查询出数据的同时还能将数据分析聚合起来，这样一次查询就可以得到我们想要的结果，注意，聚合操作是可以嵌套的，也即可以聚合完之后再聚合</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token string">&quot;ggs&quot;</span> <span class="token punctuation">{</span>
      <span class="token comment">// aggsName 聚合的名称</span>
      <span class="token property">&quot;aggsName&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    		<span class="token comment">// terms 是聚合类型</span>
          	<span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    			<span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span>
    			<span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
			<span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
	  <span class="token property">&quot;aggsName&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          	<span class="token property">&quot;avg&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    			<span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span>
    			<span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
			<span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="mapping-映射" tabindex="-1"><a class="header-anchor" href="#mapping-映射" aria-hidden="true">#</a> Mapping 映射</h1><p>映射操作下不使用「类型」，而是直接在「索引」下进行数据处理</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 创建一个索引并指定映射类型</span>
PUT /my_index
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  	  <span class="token comment">// properties 指定数据类型</span>
      <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;integer&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token comment">// keyword 不会全文检索，而是精确检索</span>
          <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="添加新字段" tabindex="-1"><a class="header-anchor" href="#添加新字段" aria-hidden="true">#</a> 添加新字段</h2><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 往已有的索引中添加一个字段</span>
PUT /my_index/_mapping
<span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;xxx&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;integer&quot;</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h2 id="修改字段" tabindex="-1"><a class="header-anchor" href="#修改字段" aria-hidden="true">#</a> 修改字段</h2><p>映射中不能直接修改字段，真的需要修改时需要创建一个新的正确的索引并将数据迁移</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 迁移数据，即用新索引覆盖以前的需要修改的索引</span>
POST _reindex
<span class="token punctuation">{</span>
    <span class="token comment">// 指定就索引及其类型</span>
    <span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bank&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;account&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 新索引（去除了类型）</span>
    <span class="token property">&quot;dest&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    	”index“<span class="token operator">:</span> <span class="token string">&quot;newBank&quot;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="分词" tabindex="-1"><a class="header-anchor" href="#分词" aria-hidden="true">#</a> 分词</h1><p>ES 中的默认分词器只能对英语句子进行分词，对中文进行操作会将一个句子中所有的字单独拆开，一般都会采用开源的 ik 分词器进行中文句子的分词</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 分词操作示例</span>
POST _analyze
<span class="token punctuation">{</span>
    <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_smart&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;我是中国人&quot;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 或者使用 ik_max_word，表示最大分词可能</span>
POST _analyze
<span class="token punctuation">{</span>
    <span class="token property">&quot;analyzer&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ik_max_word&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;我是中国人&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="spring-boot-整合-elasticsearch" tabindex="-1"><a class="header-anchor" href="#spring-boot-整合-elasticsearch" aria-hidden="true">#</a> Spring Boot 整合 ElasticSearch</h1><p>下面一定要指定版本，Spring Boot 的默认版本是 6.8.5</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>java.version</span><span class="token punctuation">&gt;</span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>java.version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>elasticsearch.version</span><span class="token punctuation">&gt;</span></span>7.5.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>elasticsearch.version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.elasticsearch.client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>elasticsearch-rest-high-level-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span> 
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>7.5.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>配置类：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ElasticSearchConfig</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">RequestOptions</span> <span class="token constant">COMMON_OPTIONS</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">RequestOptions<span class="token punctuation">.</span>Builder</span> builder <span class="token operator">=</span> <span class="token class-name">RequestOptions</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span><span class="token punctuation">.</span><span class="token function">toBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// TODO 加入自定义配置</span>
        <span class="token constant">COMMON_OPTIONS</span> <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RestHighLevelClient</span> <span class="token function">esRestClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RestHighLevelClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RestHighLevelClient</span><span class="token punctuation">(</span>
                <span class="token class-name">RestClient</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">HttpHost</span><span class="token punctuation">(</span><span class="token string">&quot;192.168.30.100&quot;</span><span class="token punctuation">,</span> <span class="token number">9200</span><span class="token punctuation">,</span> <span class="token string">&quot;http&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> client<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>测试：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">indexData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">IndexRequest</span> indexRequest <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IndexRequest</span><span class="token punctuation">(</span><span class="token string">&quot;users&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexRequest<span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> json <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    indexRequest<span class="token punctuation">.</span><span class="token function">source</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">XContentType</span><span class="token punctuation">.</span><span class="token constant">JSON</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">IndexResponse</span> index <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span>indexRequest<span class="token punctuation">,</span> <span class="token class-name">ElasticSearchConfig</span><span class="token punctuation">.</span><span class="token constant">COMMON_OPTIONS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="补充" tabindex="-1"><a class="header-anchor" href="#补充" aria-hidden="true">#</a> 补充</h1><p>ES 中数组会被扁平化处理，即把不同对象的每一个字段单独抽取一个数组，然后将这些对象该字段的值全部存储在一起，不做任何处理会让搜索结果不符合预期</p><p>解决方法：可以指定字段类型 <code>&quot;type&quot;:&quot;nested&quot;</code> ，即把数据指定成嵌入的</p>`,69),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","ElasticSearch.html.vue"]]);export{r as default};
