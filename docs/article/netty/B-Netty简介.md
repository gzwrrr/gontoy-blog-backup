---
title: "Netty 简介"
shortTitle: "B-Netty 简介"
description: "Netty 简介"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-10-04
category: 
- "netty"
- "通信"
- "中间件"
tag:
- "netty"
- "通信"
- "中间件"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Netty 简介"
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
  title: "Netty 简介"
  description: "Netty 简介"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Netty 简介





[[toc]]



:::info 说明

[Netty 学习手册](https://dongzl.github.io/netty-handbook/)

:::



- Netty 是一个异步的、基于事件驱动的网络应用框架，用以快速开发高性能、高可靠的网络 IO 程序，简化了 NIO 的开发流程
- Netty 主要针对在 TCP 协议下，面向 Clients 端的高并发应用，或者 Peer-to-Peer 场景下的大量数据持续传输的应用
- Netty 本质是一个 NIO 框架，适用于服务器通讯相关的多种应用场景
- Netty 是高性能的网络通信框架，许多高性能的 RPC 框架和大数据框架都会使用 Netty 作为通信组件
- 目前存在的线程模型有：传统阻塞 I/O 服务模型、Reactor 模式，后者又根据 Reactor 的数量和处理资源池线程的数量不同，有三种典型的表现：
  - 单 Reactor 单线程
  - 单 Reactor 多线程
  - 主从 Reactor 多线程
- Netty 线程模式主要是从主从 Reactor 多线程模型做出了一定的改进（有多个 Reactor）



## Reactor 模式

- Reactor 模式又称为反应器模式、分发者模式、通知者模式
- 基于 I/O 复用模型：多个连接共用一个「阻塞对象」，应用程序只需要在一个阻塞对象等待，无需阻塞等待所有连接，当某个连接有新的数据可以处理时，操作系统通知应用程序，线程从阻塞状态返回，开始进行业务处理
- 基于线程池复用线程资源：不必再为每个连接创建线程，将连接完成后的业务处理任务分配给线程进行处理，一个线程可以处理多个连接业务
- Reactor 模式使用 I/O 复用监听事件，收到事件后，分给某个线程进行处理，进而达到高并发
- Reactor 核心组成：
  - Reactor：在一个单独的线程中运行，负责「监听」和「分发」事件，分发给适当的处理程序对 I/O 事件做出反应
  - Handlers：处理程序执行 I/O 事件要完成的实际事件，Reactor 通过调度适当的处理程序来相应 I/O 事件，处理程序会执行非阻塞操作
- 优点：
  - 响应快，不必为单个同步所阻塞（虽然 Reactor 本身依旧是同步的）
  - 可以最大程度地避免复杂的多线程以及同步问题，并且避免了多线程/多进程的切换开销
  - 扩展性好，可以方便地通过增加 Reactor 实例个数来充分利用 CPU 资源
  - 复用性好，Reactor 模型本身与具体事件处理逻辑无关，具有很高的复用性



### 单线程模型

![什么是Netty？_慕课手记](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//netty/20230209/%E5%8D%95%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%9E%8B.jpg)

- 可以实现应用程序通过一个「阻塞对象」监听「多路连接请求」
- Reactor 对象通过监控客户端请求事件，收到事件进行分发
- 如果建立连接请求事件，则由 Acceptor 对象通过 Accept 处理连接请求，然后创建一个 Handler 对象处理连续完成后的后续业务处理
- 如果建立的不是连接事件，则 Reactor 会分发调用连接对应的 Handler 来响应事件
- Handler 会完成 Read -> 业务处理 -> Send 的完整业务流程
- 这样服务端就用「一个线程」通过多路复用完成了所有的 I/O 操作（包括连接、读写等），编码简单清晰，但是如果客户端连接数量比较多的话，将无法支撑

- 优点：模型简单，没有多线程、进程通信、竞争的问题，即全部都在一个线程内完成
- 缺点：因为只有一个线程，所以会有性能问题，整个进程无法处理其他连接事件，很容易导致性能瓶颈；而且线程如果意外终止，或者进入死循环，会导致整个系统通信模块不可用，不能接收和处理外部消息，造成节点故障（可靠性问题）
- 使用场景：客户端的数量有限，业务处理非常快的情况，比如 Redis 在业务处理时间复杂度 O(1) 的情况



### 多线程模型

![image-20230108113811182](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//netty/20230209/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E6%A8%A1%E5%9E%8B.jpeg)

- Reactor 对象通过 select 监控客户端请求事件，收到事件后通过 dispatch 进行分发
- 如果建立连接请求，则 Acceptor 对象通过 Accept 处理连接请求，然后创建一个 Handler 对象处理完成连接后的各个事件
- 如果不是连接请求，则由 Reactor 分发调用连接对应的 Handler 来处理
- Handler 只负责响应事件，不做具体的业务处理，通过 Read 读取数据后，会分发给后面的 Worker 线程池的某个线程处理业务
- Worker 线程池会分配独立的线程完成真正的业务，并将结果返回给 Handler，Handler 收到响应后，通过 Send 将结果返回给客户端
- 优点：可以充分地利用多核 CPU 的处理能力
- 缺点：多线程「数据共享」和「访问」比较复杂，Reactor 处理所有的事件的「监听」和「响应」，Reactor 在单线程高并发场景下容易出现瓶颈



### 主从 Reactor 多线程

<img src="https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//netty/20230209/%E4%B8%BB%E4%BB%8EReactor%E5%A4%9A%E7%BA%BF%E7%A8%8B.jpeg" alt="什么是Netty？_慕课手记" style="zoom:50%;" />

- SubReactor 可以有多个，即 Reactor 主线程可以对应多个 Reactor 子线程，以此解决 Reactor 的性能瓶颈
- MainReactor 对象通过 Select 监听连接事件，收到后通过 Acceptor 对象处理连接事件
- 当 Acceptor 对象处理连接事件后，MainReactor 会将连接分发给 SubReactor
- SubReactor 将连接加入到连接队列进行监听，并创建 Handler 进行各种事件的处理
- 当有新事件发生时，SubReactor 就会调用对应的 Handler 处理，Handler 通过 Read 读取数据，分发给之后的 Worker 线程处理
- Worker 线程池会分配独立的 Worker 线程进行业务处理并返回结果
- Handler 收到响应结果后，再通过 Send 将结果返回给客户端
- 优点：父线程与子线程的数据交互职责明确，父线程只需要接收新连接，子线程则完成后续的业务处理；父子线程之间的数据交互也简单，Reactor 主线程只需要把新连接传递给子线程即可，子线程无需返回数据
- 缺点：编程复杂度较高
- 该模型再许多项目中都有应用，比如 Nginx 主从 Reactor 多线程模型、Memcahed 主从多线程、Netty 主从多线程



### Netty 主从多线程

![使用netty手撸一个简易http服务器](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//netty/20230209/%E4%B8%BB%E4%BB%8E%E5%A4%9A%E7%BA%BF%E7%A8%8B.jpeg)

- BossGroup 线程维护 Selector，只关注 Accept，接收到 Accept 事件后，会获取对应的 SocketChannel，封装成 NIOSocketChannel 注册到 Worker 线程（事件循环）并进行维护
- 当 Worker 线程监听到 Selector 中通道发生了 Worker 关心的事件时，就会进行处理（由 Handler 处理，这里的 Handler 已经加入到通道了）
- BossGroup 相当于 MainReactor，专门复杂接收客户端的连接，而 WorkerGroup 相当于 SubReactorGroup，专门复杂网络的读写，二者的事件循环（NioEventLoop）可以有多个，以此构成 NioEventGroup
- NioEventLoop 表示一个不断循环的执行处理任务的线程，每个 NioEventLoop 都有一个 Selector，用于监听绑定在其上的 Socket 网络通讯
- 每个 Boss NioEventLoop 执行的步骤有：
  - 轮询 Accept 事件
  - 处理 Accept 事件，与客户端建立连接，生成 NioSocketChannel，并将其注册到某个 Worker NioEventLoop 上的 Selector
  - 处理任务队列的任务，即 runAllTasks
- 每个 Worker NioEventLoop 执行的步骤有：
  - 轮询 Read、Write 事件
  - 处理 I/O 事件，即读写事件，在对应的 NioSocketChannel 中处理
  - 处理任务队列的任务，即 runAllTasks
- 每个 Worker NioEventLoop 处理业务时，会使用 Pipeline（管道），其中包含了 Channel，即通过 Pipeline 可以获得对应的管道，管道中维护了很多的 Handler
- NioEventLoop 内部采用「串行化」设计，消息的读取、解码、处理、编码、发送，始终都由 I/O 线程 NioEventLoop 负责
- 每个 NioEventLoop 都包含一个 Selector 和一个 TaskQueue，Selector 上可以注册监听多个 NioChannel，每个 NioChannel 只会绑定在唯一的 NioEventLoop 上，而且每个 NioChannel 都绑定有一个 ChannelPipeline



## Netty 简单使用

**服务端：**

```java
public class NettyServer {
    public static void main(String[] args) throws InterruptedException {
        // 创建两个线程组（两个底层都是无限循环）
        // 包含的子线程数为：CPU 核数 * 2
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            // 创建服务器端的启动对象，配置参数
            ServerBootstrap bootstrap = new ServerBootstrap();
            // 链式编程配置
            bootstrap.group(bossGroup, workerGroup)
                    // 使用 NioServerSocketChannel 作为服务器的通道实现
                    .channel(NioServerSocketChannel.class)
                    // 线程队列的连接个数
                    .option(ChannelOption.SO_BACKLOG, 128)
                    // 保持连接状态
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    // 设置 workerGroup 的 EventGroup 对应的管道的处理器
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        // 给 Pipeline 设置处理器
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            socketChannel.pipeline().addLast(new NettyServerHandler());
                        }
                    });
            System.out.println("服务器准备就绪...");
            // 绑定一个端口并同步，生成一个 ChannelFuture 对象
            ChannelFuture cf = bootstrap.bind(6668).sync();
            // 对关闭通道进行监听
            cf.channel().closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```

**客户端：**

```java
public class NettyClient {
    public static void main(String[] args) throws InterruptedException {
        // 客户端只需要一个事件循环组
        EventLoopGroup eventExecutors = new NioEventLoopGroup();
        try {
            // 创建客户端的启动对象（不是 ServerBootstrap）
            Bootstrap bootstrap = new Bootstrap();
            // 设置相关参数
            bootstrap.group(eventExecutors)
                    // 设置客户端通道的实现
                    .channel(NioSocketChannel.class)
                    // 设置处理器
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            socketChannel.pipeline().addLast(new NettyClientHandler());
                        }
                    });
            System.out.println("客户端准备就绪...");
            // 启动客户端，连接服务端
            ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 6668).sync();
            // 给关闭通道进行监听
            channelFuture.channel().closeFuture().sync();
        } finally {
            eventExecutors.shutdownGracefully();
        }
    }
}
```

**服务端的处理器：**

```java
/**
 * 自定义处理器，需要遵守 Netty 的规范（ChannelInboundHandlerAdapter）
 */
public class NettyServerHandler extends ChannelInboundHandlerAdapter {
    /**
     *
     * @param ctx 上下文对象，含有 pipeline
     * @param msg 客户端发送的数据，默认是 Object
     * @throws Exception
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("Server Context: " + ctx);
        // 将 msg 转成一个缓冲区（netty 提供的性能更高的缓冲区）
        ByteBuf buf = (ByteBuf) msg;
        System.out.println("客户端发送的消息是: " + buf.toString(CharsetUtil.UTF_8));
        System.out.println("客户端地址: " + ctx.channel().remoteAddress());
    }
    /**
     * 数据读取完毕后做的处理
     * @param ctx 上下文对象
     * @throws Exception
     */
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        // 将数据写入缓冲区并刷新，信息需要进行编码
        ctx.writeAndFlush(Unpooled.copiedBuffer("Hello world", CharsetUtil.UTF_8));
    }
    /**
     * 处理异常，一般是需要关闭通道
     * @param ctx 上下文对象
     * @param cause 异常
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
```

**客户端的处理器：**

```java
public class NettyClientHandler extends ChannelInboundHandlerAdapter {
    /**
     * 当通道就绪就会触发这个方法
     * @param ctx 上下文对象
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("Client Context: " + ctx);
        ctx.writeAndFlush(Unpooled.copiedBuffer("Hello Server", CharsetUtil.UTF_8));
    }
    /**
     * 当通道有读取事件时就会触发这个方法
     * @param ctx 上下文对象
     * @param msg 服务端发送的消息
     * @throws Exception
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        ByteBuf byteBuf = (ByteBuf) msg;
        System.out.println("服务器回复的消息: " + byteBuf.toString(CharsetUtil.UTF_8));
        System.out.println("服务器的地址: " + ctx.channel().remoteAddress());
    }
    /**
     * 处理异常，一般是关闭管道
     * @param ctx 上下文对象
     * @param cause 异常
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        ctx.close();
    }
}
```






