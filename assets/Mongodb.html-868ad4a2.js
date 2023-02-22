import{_ as e,Q as n,S as i,a5 as d}from"./framework-ec2af7a3.js";const l={},a=d(`<h1 id="mongodb-简单使用" tabindex="-1"><a class="header-anchor" href="#mongodb-简单使用" aria-hidden="true">#</a> Mongodb 简单使用</h1><h1 id="插入文档" tabindex="-1"><a class="header-anchor" href="#插入文档" aria-hidden="true">#</a> 插入文档</h1><p>当向集合中插入文档时，如果没有指定文档的 <code>_id</code> 属性，数据库会自动为文档添加 <code>_id</code>，以此确保数据的唯一性</p><div class="language-mariadb line-numbers-mode" data-ext="mariadb"><pre class="language-mariadb"><code>/* 插入方法 */
db.&lt;collection&gt;.insert([{&lt;JSON&gt;}]);
db.&lt;collection&gt;.insertOne({&lt;JSON&gt;});
db.&lt;collection&gt;.insertMany([{&lt;JSON&gt;}]);
/* 例子 */
db.test_collections_1.insert([{name: &#39;zhangsan&#39;, age: 18}]);
/* 结果 */
/* 1 createdAt:2022/9/10 下午4:34:17*/
{
	&quot;_id&quot; : ObjectId(&quot;631c4c09ea305672f7f3ff3f&quot;),
	&quot;name&quot; : &quot;zhangsan&quot;,
	&quot;age&quot; : 18
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="查询文档" tabindex="-1"><a class="header-anchor" href="#查询文档" aria-hidden="true">#</a> 查询文档</h1><div class="language-mariadb line-numbers-mode" data-ext="mariadb"><pre class="language-mariadb"><code>/* 查询方法 */
/* 
find() 方法可以查询集合中所有符合条件的文档
也可以传递一个对象作为条件参数，使用 find({}) 和 find() 是同样的效果 
*/
db.&lt;collection&gt;.find({});

/* 查询属性为固定值的文档，返回的是一个数组，以下查询会将所有符合条件的文档都查询出来 */
db.&lt;collection&gt;.find({属性: 值});

/* 查询第一个符合条件的文档，返回的是一个对象 */
db.&lt;collection&gt;.findOne({属性: 值});

/* 查询所有文档的数量 */
db.&lt;collection&gt;.find({}).count();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="修改文档" tabindex="-1"><a class="header-anchor" href="#修改文档" aria-hidden="true">#</a> 修改文档</h1><div class="language-mariadb line-numbers-mode" data-ext="mariadb"><pre class="language-mariadb"><code>/* 修改方法，默认会用新对象替换查询到的旧对象 */
db.&lt;collection&gt;.update(查询条件，新对象);
 
/* 例子，下面修改后新文档中只有一个属性 age */
db.test_collections_1.update({age: 19}, {age: 20});

/* 修改匹配到的第一个文档的指定的属性，$set 可以修改指定的属性，$unset 可以删除指定的属性 */
db.test_collections_1.update(查询条件, {$set: {需要修改的属性: 值}});
/* 例子 */
db.test_collections_1.update({age: 21}, {$unset: {age: 21}});

/* 修改全部符合条件的文档，用法与只修改第一个文档的一样 */
db.test_collections_1.updateMany(...)

/* 
相对应还有 updateOne 方法，这与 update 方法的默认方法是一样的
但是实际上 update 方法是 updateOne 与 updateMany 的综合，可以通过修改属性将 update 改成修改多个
*/
db.test_collections_1.update(查询条件, {$set: {需要修改的属性: 值}}, {multi: true});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="删除文档" tabindex="-1"><a class="header-anchor" href="#删除文档" aria-hidden="true">#</a> 删除文档</h1><div class="language-mariadb line-numbers-mode" data-ext="mariadb"><pre class="language-mariadb"><code>/* 删除方法和查询方法的使用相似，remove 方法可以指定删除一个还是全部，但是注意 remove 必须传参 */
db.&lt;collection&gt;.remove([{&lt;JSON&gt;}], true/false);
db.&lt;collection&gt;.deleteOne({&lt;JSON&gt;});
db.&lt;collection&gt;.deleteMany({&lt;JSON&gt;});

/* 删除整个集合的所有文档如果使用 remove 性能会较差，因为是匹配后再删，直接删除集合性能会好些 */
db.&lt;collection&gt;.remove({}); 
db.&lt;collection&gt;.drop();

/* 删除数据库 */
db.dropDatabase();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><br><h1 id="mongoose" tabindex="-1"><a class="header-anchor" href="#mongoose" aria-hidden="true">#</a> Mongoose</h1><p>mongoose 中提供了几个对象：</p><ul><li>Schema：模式对象，定义约束数据库中的文档结构</li><li>Model：作为集合中的所有文档的表示，相当于数据库中的 Collection</li><li>Document：表示集合中的具体文档，相当于集中的一个具体的文档</li></ul>`,17),s=[a];function t(c,r){return n(),i("div",null,s)}const u=e(l,[["render",t],["__file","Mongodb.html.vue"]]);export{u as default};
