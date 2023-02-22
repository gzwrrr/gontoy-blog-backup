import{_ as l,Q as i,S as e,a5 as a}from"./framework-ec2af7a3.js";const r={},t=a('<h1 id="多节点复制" tabindex="-1"><a class="header-anchor" href="#多节点复制" aria-hidden="true">#</a> 多节点复制</h1><h1 id="写在前面" tabindex="-1"><a class="header-anchor" href="#写在前面" aria-hidden="true">#</a> 写在前面</h1><ul><li><p>主从复制所有的写请求都必须经过主节点，而又因为只有一个主节点，所以就很容易出现性能问题</p></li><li><p>虽然从节点可以冗余应对容错，但是对写请求实际上是不具备扩展性的</p></li></ul><p><strong>如何加大容错率：</strong></p><ul><li>如果客户端来源于多个地区，那么不同地区的客户端感知到的服务响应时间差距可能会非常大</li><li>顺着主从复制继续延申，采用多个主节点同时承担写请求，主节点收到写请求后再将数据同步到从节点</li><li>主节点还可能是其他主节点的从节点，同步数据时不同的主节点是同步到自己处于的数据中心的从节点的</li><li>这些主节点会不断同步在另一个数据中心节点上的数据</li><li>由于每个节点是同时处理其他节点的数据和客户端发送的数据，所以每个数据中心的主节点需要增加一个冲突处理模块</li></ul><br><h1 id="多主节点的使用场景" tabindex="-1"><a class="header-anchor" href="#多主节点的使用场景" aria-hidden="true">#</a> 多主节点的使用场景</h1><ul><li>多数据中心部署： <ul><li>异地多活：一般是为了做多数据中心容灾或让客户端就近访问，因此同一个地区使用多主节点意义不大</li><li>性能提升：与主从复制相比，由于有多个主节点，所以吞吐量自然可以上去；此外因为是多个区域搭建的，所以客户端可以就近访问，响应时间就变快了</li><li>容灾能力提升：主从复制下主节点故障比较难以将流量全部切换到另一个数据中心，但是使用多主节点的话就可以无缝切换到另一个数据中心，提高整体服务的可用性</li></ul></li><li>离线客户端操作： <ul><li>网络离线下还可以工作：离线是先将数据保存在本地，连接上节点后再将数据同步到远程节点上</li><li>这里可以将客户端可看成是其中的一个节点（副本），这样就可以承担用户再本地的变更请求</li></ul></li><li>协同编辑： <ul><li>多人编辑同一个文档时，可以将这个文档看作是一个主节点，每个人单独保存时系统就可以自动地将数据同步到其他的主节点上，然后各个节点再处理冲突</li></ul></li></ul><br><h1 id="解决冲突" tabindex="-1"><a class="header-anchor" href="#解决冲突" aria-hidden="true">#</a> 解决冲突</h1><blockquote><p>// TODO 待完善</p></blockquote>',11),h=[t];function d(n,c){return i(),e("div",null,h)}const _=l(r,[["render",d],["__file","多节点复制-已发布.html.vue"]]);export{_ as default};
