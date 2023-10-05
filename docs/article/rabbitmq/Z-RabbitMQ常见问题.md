---
title: "RabbitMQ 常见问题"
shortTitle: "Z-RabbitMQ 常见问题"
description: "RabbitMQ 常见问题"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-05-09
category: 
- "通信"
- "中间件"
- "rabbitmq"
tag:
- "通信"
- "中间件"
- "rabbitmq"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "RabbitMQ 常见问题"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 2
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "RabbitMQ 常见问题"
  description: "RabbitMQ 常见问题"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# RabbitMQ 常见问题



[[toc]]



1. RabbitMQ 的基本概念：包括消息、队列、交换机、绑定等概念，以及它们之间的关系和作用。
2. RabbitMQ 的使用场景：在哪些场景下适合使用 RabbitMQ，以及与其他消息中间件的比较。
3. RabbitMQ 的高可用：如何实现 RabbitMQ 的高可用，包括镜像队列、集群等方案。
4. RabbitMQ 的性能优化：如何提高 RabbitMQ 的性能，包括队列、消息、交换机等的配置。
5. RabbitMQ 的安全机制：包括用户认证、权限控制等。
6. RabbitMQ 的消息确认机制：如何保证消息的可靠性，包括 ACK 确认、TTL、DLX 等机制。
7. RabbitMQ 的消息传输协议：AMQP 是什么，与其它传输协议的区别和优缺点。
8. RabbitMQ 的管理和监控：如何通过 RabbitMQ 的 Web 界面管理和监控 RabbitMQ，以及如何通过插件进行监控。





## 如何保证幂等性？

- 用户对同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生副作用
- 消息重复消费：消费者在消费 MQ 中的消息时，MQ 已经把消息发送给消费者，消费者在给 MQ 返回 ack 时网络中断，此时 MQ 未受到确认信息，该消息会重新发给其他消费者，或者在网络重连后再次发送给该消费者，但是实际上该消费者已经成功消费了该消息，这就会造成重复消费消息
- 解决方案：一般使用全局 ID 或写一个唯一标识，比如时间戳、UUID；消费者消费消息时也可以利用 id，在每次消费前都判断一次是否已经消费过
- 消费端的幂等性保障：在业务高峰期，生产端可能有重复消息，这时消费端就需要实现幂等性，这意味着消息不会被消费多次；主流的幂等性操作有两种：
  - 唯一 ID + 指纹码机制，利用数据库逐渐去重。这里的指纹码是指：一些规则或者时间戳加背的服务给到的唯一信息码，不一定是系统生成的，基本都是由业务规则拼接而来的，但是一定要保证唯一性；之后使用查询语句判断这个 ID 是否存在于数据库中。优势是实现简单（拼接即可），劣势就是高并发时数据库压力会很高
  - 利用 Redis 的原子性实现：执行 setnx 命令，天然具有幂等性（推荐）





## 如何保证消息可靠传输？

1. 使用事务消息

2. 使用消息确定机制：

   发送方确认：Channel 设置为 `confirm` 模式，则每条消息会被分配唯一 ID

   1. 消息投递成功后信道就会发送 `ack` 给生产者，其中包含了分配的 ID，接着回调 `ComfirmCallback` 接口
   2. 如果发生错误导致消息丢失，那么就发送 `nack` 给生产者，回调 `ReturnCallback` 接口
   3. 两种情况只能触发其中一个，并且是 **异步触发**，之后可以继续发送消息

   接收方确认：

   1. 声明队列时，指定 `noack=false`，broker 会等待消费者手动返回 `ack`
   2. broker 的 `ack` 没有超时机制，只会判断链接是否断开，如果断开了，消息就会被重新发送



## RabbitMQ 中的消息大小限制

RabbitMQ 中的消息大小限制取决于 RabbitMQ 配置中的一些因素，包括 Erlang/OTP 节点的内存和磁盘限制，以及 RabbitMQ 服务器配置中的参数设置。默认情况下，RabbitMQ 允许的消息大小是比较大的，通常在数百 KB 到数 MB 之间。

在 RabbitMQ 的默认配置中，典型的消息大小限制可能在 1 MB 到 2 MB 之间。但请注意，这个限制可以根据实际需求进行配置，可以通过以下几种方式来调整消息大小限制：

1. **RabbitMQ 服务器配置：** 你可以在 RabbitMQ 的配置文件（rabbitmq.conf）中修改 `vm_memory_high_watermark` 和 `disk_free_limit` 等参数，以调整内存和磁盘的限制，从而影响消息大小限制。
2. **队列的属性：** 在创建队列时，你可以通过参数指定队列的最大长度（`x-max-length`）和最大消息大小（`x-max-length-bytes`），从而对队列的消息大小进行限制。
3. **消息的属性：** 当发送消息时，你可以设置消息的属性，如大小限制、优先级等。但要注意，RabbitMQ 不会对已经接收的消息进行大小检查。

需要强调的是，将消息的大小限制设置得过大可能会导致系统的资源消耗增加，甚至可能造成性能问题。因此，在实际应用中，应根据消息的特性和业务需求来合理地设置消息大小限制。





## 其他

:::info 相关文章

[MQ实际场景解决方案参考](https://blog.csdn.net/summer_fish/article/details/125180531)

:::

1. 元数据
2. RAM Node、Disk Node
3. 一个 Queue 中存放的消息是否有上限
4. vhost 的作用
5. 单 Node 和多 Node 构成的 Cluster 中声明 queue、exchange、binding 与元数据有关
6. routing_key 和 binding_key 的最大长度限制为 255 字节





## 待处理

8、若cluster中拥有某个queue的owner node失效了，且该queue
被声明具有durable属性，是否能够成功从其他node上重新声明该
queue
不能，在这种情况下，将得到404NOT_FOUND错误。只能等queue所
属的node恢复后才能使用该queue。但若该queue本身不具有durable
属性，则可在其他node上重新声明。

<br/>

9、cluster中node的失效会对consumer产生什么影响？若是在
cluster中创建了mirrored queue,这时node失效会对consumer产
生什么影响？
若是consumer所连接的那个node失效（无论该node是否为consumer
所订阅queue的owner node),则consumer会在发现TCP连接断开时，
按标准行为执行重连逻辑，并根据“Assume Nothing”原则重建相应的
fabric即可。若是失效的node为consumer订阅queue的owner node,
则consumer只能通过Consumer Cancellation Notification机制来检测与
该queue订阅关系的终止，否则会出现傻等却没有任何消息来到的问
题。

<br/>

10、能够在地理上分开的不同数据中心使用RabbitMQ cluster么？
不能。
第一，你无法控制所创建的queue实际分布在cluster里的哪个node上
(一般使用HAProxy+cluster模型时都是这样)，这可能会导致各种跨地域
访问时的常见问题；
第二，Erlang的OTP通信框架对延迟的容忍度有限，这可能会触发各种
超时，导致业务疲于处理；
第三，在广域网上的连接失效问题将导致经典的“脑裂”问题，而
RabbitMQ目前无法处理(该问题主要是说Mnesia)。

<br/>

11、为什么heavy RPC的使用场景下不建议采用disk node
heavy RPC是指在业务逻辑中高频调用RabbitMQ提供的RPC机制，导
致不断创建、销毁reply queue,进而造成disk node的性能问题（因为会
针对元数据不断写盘）。所以在使用RPC机制时需要考虑自身的业务场
景。

<br/>

17、什么说保证message被可靠持久化的条件是queue和exchange
具有durable属性，同时message具有persistent属性才行？
binding关系可以表示为exchange-binding-queue。从文档中我们知
道，若要求投递的message能够不丢失，要求message本身设置
persistent属性，要求exchange和queue都设置durable属性。其实这问
题可以这么想，若exchange或queue未设置durable属性，则在其
crash之后就会无法恢复，那么即使message设置了persistent属性，仍
然存在message虽然能恢复但却无处容身的问题；同理，若message本身
未设置persistent属性，则message的持久化更无从谈起。

<br/>

18、什么情况下会出现blackholed问题？
blackholed问题是指，向exchange投递了message,而由于各种原因导
致该message丢失，但发送者却不知道。可导致blackholed的情况：
1.向未绑定queue的exchange发送message,
2.exchange以binding_key key_A绑定了
queue
queue._A,但向该
exchange发送message使用的
routing_key
却是
key_B

<br/>

20、Consumer Cancellation Notification机制用于什么场景？
用于保证当镜像queue中master挂掉时，连接到slave上的consumer可
以收到自身consume被取消的通知，进而可以重新执行consume动作从
新选出的master出获得消息。若不采用该机制，连接到slave上的
consumer将不会感知master挂掉这个事情，导致后续无法再收到新
master广播出来的message。另外，因为在镜像queue模式下，存在将
message进行requeue的可能，所以实现consumer的逻辑时需要能够正
确处理出现重复message的情况。

<br/>

21、Basic.Reject的用法是什么？
该信令可用于consumer对收到的message进行reject。若在该信令中设
置requeue=true,则当RabbitMQ server收到该拒绝信令后，会将该
message重新发送到下一个处于consume状态的consumer处（理论上仍
可能将该消息发送给当前consumer)。若设置requeue=:false,则
RabbitMQ server在收到拒绝信令后，将直接将该message从queue中移
除。
另外一种移除queue中message的小技巧是，consumer回复Basic..Ack
但不对获取到的message做任何处理
而Basic.Nack是对Basic.Reject的扩展，以支持一次拒绝多条message
的能力。

<br/>

22、为什么不应该对所有的message都使用持久化机制？
首先，必然导致性能的下降，因为写磁盘比写RAM慢的多，message的
吞吐量可能有10倍的差距。其次，message的持久化机制用在
RabbitMQ的内置cluster方案时会出现“坑爹”问题。矛盾点在于，若
message设置了persistent属性，但queue未设置durable属性，那么当
该queue的owner node出现异常后，在未重建该queue前，发往该
queue的message将被blackholed;若message设置了persistent属性，
同时queue也设置了durable属性，那么当queue的owner node异常且
无法重启的情况下，则该queue无法在其他node上重建，只能等待其
owner node重启后，才能恢复该queue的使用，而在这段时间内发送给
该queue的message将被blackholed。所以，是否要对message进行
持久化，需要综合考虑性能需要，以及可能遇到的问题。若想达到
1O0,000条/秒以上的消息吞吐量(单RabbitMQ服务器)，则要么使用其他
的方式来确保message的可靠delivery,要么使用非常快速的存储系统以
支持全持久化(例如使用SSD)。另外一种处理原则是：仅对关键消息作持久
化处理（根据业务重要程度），且应该保证关键消息的量不会导致性能瓶
颈。

<br/>

23、RabbitMQ中的cluster、mirrored queue,以及warrens机制分
别用于解决什么问题？存在哪些问题？
cluster是为了解决当cluster中的任意node失效后，producer和
consumer均可以通过其他node继续工作，即提高了可用性；另外可以通
过增加node数量增加cluster的消息吞吐量的目的。cluster本身不负责
message的可靠性问题（该问题由producer通过各种机制自行解
决）；cluster无法解决跨数据中心的问题（即脑裂问题）。
另外，在cluster前使用HAProxy可以解决node的选择问题，即业务无
需知道cluster中多个node的ip地址。可以利用HAProxy进行失效node
的探测，可以作负载均衡。
Mirrored queue是为了解决使用cluster时所创建的queue的完整信息仅
存在于单一node上的问题，从另一个角度增加可用性。若想正确使用该
功能，需要保证：
1.consumer
需要支持Consumer Cancellation Notification机制：
2.consumer必须能够正确处理重复message
o
Warrens是为了解决cluster中message可能被blackholed的问题，即不
能接受producer不停republish message但RabbitMQ server无回应的情
况。Varrens有两种构成方式：
一种模型是两台独立的RabbitMQ server+HAProxy,其中两个server的
状态分别为active和hot-standby。该模型的特点为：两台server之间无任
何数据共享和协议交互，两台server可以基于不同的RabbitMQ版本。
另一种模型为两台共享存储的RabbitMQ server+keepalived,其中两个
server的状态分别为active和cold-standby.。

该模型的特点为：两台server基于共享存储可以做到完全恢复，要求必须
基于完全相同的RabbitMQ版本。
Warrens模型存在的问题：
对于第一种模型，虽然理论上讲不会丢失消息，但若在该模型上使用持久
化机制，就会出现这样一种情况，即若作为active的server异常后，持久
化在该server上的消息将暂时无法被consume,因为此时该queue将无
法在作为hot-standby的server上被重建，所以，只能等到异常的active
server恢复后，才能从其上的queue中获取相应的message进行处理。
而对于业务来说，需要具有：a.感知AMQP连接断开后重建各种fabric的能
力；b.感知active server恢复的能力；c.切换回active server的时机控制，以
及切回后，针对message先后顺序产生的变化进行处理的能力。
对于第二种模型，因为是基于共享存储的模式，所以导致active server异
常的条件，可能同样会导致cold-standby server异常；另外，在该模型下，
要求active和cold-standby的server必须具有相同的node名和UlD,否
则将产生访问权限问题；最后，由于该模型是冷备方案，故无法保证cod-
standby server能在你要求的时限内成功启动。