---
title: "Netty 模型"
shortTitle: "C-Netty 模型"
description: "Netty 模型"
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
  text: "Netty 模型"
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
  title: "Netty 模型"
  description: "Netty 模型"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Netty 模型



[[toc]]



## Netty 任务队列

- 当需要处理的业务非常耗时时就可以将其放入任务队列，否则会阻塞线程
- 任务队列中的 Task 有三种典型使用场景：
  - 用户程序自定义的普通任务（会提交到 TaskQueue）
  - 用户自定义的定时任务（会提交到 ScheduleTaskQueue）
  - 非当前 Reactor 线程调用 Channel 的各种方法



## 异步模型

- 当一个异步过程调用发出后，调用者不会立即得到结果，实际处理这个调用的组件在完成后，会通过状态、通知和回调来通知调用者
- Netty 中的 I/O 操作是异步的，包括 bind、write、connect 等操作都会简单地返回一个 ChannelFuture
- 异步模型下，调用者不能立即获得结果，但是之后可以通过 Future-Listener 机制来主动获取或者通过通知机制获得 I/O 操作结果
- Netty 的异步模型是建立在 Future 和 Callback 上的，「拦截操作」和「转换出入栈数据」只需要用户提供 Future 或者 Callback 即可，这样可以让「业务逻辑」从网络基础应用编码中分离出来（与业务解耦，也是 Netty 的设计目标）



### Future-Listener 机制

- 当 Future 对象刚创建时，处于非完成状态，调用者可以通过返回的 ChannelFuture 来获取操作执行的状态，注册监听函数来执行完成后的操作
- 常见的操作有：
  - 通过方法 `isDone()` 来判断当前操作是否「完成」
  - 通过方法 `isSuccess()` 来判断已完成的操作是否「成功」
  - 通过方法 `getCause()` 来判断已完成的操作的「失败原因」
  - 通过方法 `isCancelled()` 来判断已完成的操作是否「被取消」
  - 通过方法 `addListener()`  方法来注册监听器，当操作已完成，将会通知指定的监听器

```java
ChannelFuture cf = bootstrap.bind(6668).sync();
// 给 cf 注册监听器，监听关心的事件
cf.addListener(new ChannelFutureListener() {
    @Override
    public void operationComplete(ChannelFuture channelFuture) throws Exception {
        if (channelFuture.isSuccess()) {
            System.out.println("监听端口成功！");
        } else {
            System.out.println("监听端口失败！");
        }
    }
});
```



## 简单的 HTTP 服务

**服务端（客户端是浏览器）：**

```java
public class TestServer {
    public static void main(String[] args) throws InterruptedException {
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            // 链式编程配置
            bootstrap.group(bossGroup, workerGroup)
                    // 使用 NioServerSocketChannel 作为服务器的通道实现
                    .channel(NioServerSocketChannel.class)
                    // 设置 workerGroup 的 EventGroup 对应的管道的处理器
                    .childHandler(new TestServerInitializer());
            System.out.println("服务器配置完成...");
            ChannelFuture channelFuture = bootstrap.bind(8881).sync();
            channelFuture.channel().closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```

**管道初始化：**

```java
public class TestServerInitializer extends ChannelInitializer<SocketChannel> {
    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {
        // 向管道加入处理器
        // 获取管道
        ChannelPipeline pipeline = socketChannel.pipeline();
        // 加入一个 Netty 提供的 HTTP 编解码器
        pipeline.addLast("HttpServerCodec", new HttpServerCodec());
        // 增加一个处理器
        pipeline.addLast("TestHttpServerHandler", new TestHttpServerHandler());
    }
}
```

**自定义处理器，向浏览器返回一段话：**

```java
public class TestHttpServerHandler extends SimpleChannelInboundHandler<HttpObject> {
    /**
     * 读取客户端数据
     * @param ctx 上下文对象
     * @param msg 客户端和服务端相互通讯的数据被封装成了该对象
     * @throws Exception
     */
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, HttpObject msg) throws Exception {
        if (msg instanceof HttpRequest) {
            System.out.println("msg 类型: " + msg.getClass());
            System.out.println("客户端地址: " + ctx.channel().remoteAddress());
            // 回复消息给浏览器
            ByteBuf context = Unpooled.copiedBuffer("Hello 我是服务器", CharsetUtil.UTF_8);
            // 构造一个 HTTP Response
            DefaultFullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK, context);
            response.headers().set(HttpHeaderNames.CONTENT_TYPE, "text/plain");
            response.headers().set(HttpHeaderNames.CONTENT_LENGTH, context.readableBytes());
            ctx.writeAndFlush(response);
        }
    }
}
```



## Pipeline 与 Channel

![image-20230108195118087](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//netty/20230209/Pipeline%E4%B8%8EChannel.png)

- 每个 Channel 都有且仅有一个 ChannelPipeline 与之对应
- ChannelPipeline 中维护了一个由 ChannelHandlerContext 组成的双向链表，并且每个 ChannelHandlerContext 中又关联着一个 ChannelHandler
- 入栈事件和出栈事件均在一个双向链表中，入栈事件会从链表头网后传递到最后一个入栈的 Handler，出栈事件相反，两种类型的 Handler 互不干扰
- ChannelHandlerContext 保存了 Channel 相关的所有上下文信息，ChannelHandler 是其中包含的一个具体的事件处理器，同时 ChannelHandlerContext 中也绑定了对应的 Pipeline 和 Channel 的信息，方便 ChannelHandler 进行调用
- ChannelHandlerContext 中常用的方法有：`close()` 关闭通道、`flush()` 刷新、`writeAndFlush()` 写数据到 ChannelPipeline 中



## EventLoopGroup

- EventLoopGroup 是一组 EventLoop 的抽象，Netty 为了更好地利用多核 CPU 的资源，一般会有多个 EventLoop 同时工作，每个 EventLoop 维护着一个 Selector 实例
- EventLoopGroup 提供 `next` 接口，可以从 Group 中按照一定规则获取其中一个 EventLoop 来处理任务，在 Netty 编程中，我们一般都需要提供两个 EventLoopGroup，即 BossEventLoopGroup 和 WorkerEventLoopGroup
- 通常一个服务端口，即一个 ServerSocketChannel 对应一个 Selector 和一个 EventLoop 线程；BossEventLoopGroup 负责接收客户端的连接并将 SocketChannel 交给 WorkerEventLoopGroup 来进行 I/O 处理
- 一般来说，BossEventLoopGroup 是单线程，而 WorkerEventLoopGroup 默认是 CPU 核数 * 2



## Netty 心跳检测

**服务端：**

```java
public class Server {
    public static void main(String[] args) throws InterruptedException {
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    // 日志处理器
                    .handler(new LoggingHandler(LogLevel.INFO))
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            ChannelPipeline pipeline = socketChannel.pipeline();
                            /**
                             * Netty 提供的处理空闲状态的处理器
                             * 三个参数的含义分别为：
                             * 1.多长时间没有读操作后，会发送一个心跳检测包检测是否连接
                             * 2.多长时间没有写操作后，会发送一个心跳检测包检测是否连接
                             * 1.多长时间没有读写操作后，会发送一个心跳检测包检测是否连接
                             */
                            pipeline.addLast(new IdleStateHandler(3, 5, 7, TimeUnit.SECONDS));
                            // 当 IdleStateHandler 触发后，会传递给管道的下一处理器的 userEventTriggered 方法处理
                            pipeline.addLast(new ServerHandler());
                        }
                    });
            System.out.println("服务器准备就绪...");
            ChannelFuture channelFuture = serverBootstrap.bind(7500).sync();
            channelFuture.channel().closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```

**处理器：**

```java
public class ServerHandler extends ChannelInboundHandlerAdapter {
    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if (evt instanceof IdleStateEvent) {
            IdleStateEvent event = (IdleStateEvent) evt;
            String eventType = null;
            switch (event.state()) {
                case READER_IDLE:
                    eventType = "读空闲";
                    break;
                case WRITER_IDLE:
                    eventType = "写空闲";
                    break;
                case ALL_IDLE:
                    eventType = "读写空闲";
                    break;
                default:
                    break;
            }
            System.out.println(ctx.channel().remoteAddress() + " 超时时间发生: " + eventType);
        }
    }
}
```



## Netty WebSocket 长连接

**服务端：**

```java
public class Server {
    public static void main(String[] args) throws InterruptedException {
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    // 日志处理器
                    .handler(new LoggingHandler(LogLevel.INFO))
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            ChannelPipeline pipeline = socketChannel.pipeline();
                            // 基于 HTTP 协议，使用 HTTP 的编解码器
                            pipeline.addLast(new HttpServerCodec());
                            // 以块方式写，添加 ChunkedWriteHandler 处理器
                            pipeline.addLast(new ChunkedWriteHandler());
                            /**
                             * HTTP 数据传输过程是分段的，可以通过 HttpObjectAggregator 将多个段聚合
                             * 这就是为什么发送大量数据时浏览器需要发出多个 HTTP 请求
                             */
                            pipeline.addLast(new HttpObjectAggregator(8192));
                            /**
                             * 对应 WebSocket，数据以数据帧的形式传递
                             * WebSocketFrame 下有六个子类
                             * 浏览器请求时，使用的协议是 WebSocket，形式为：ws://localhost:xxx/xxx
                             * WebSocketServerProtocolHandler 的功能是将 HTTP 协议升级成 WebSocket 协议，以此保持长连接
                             */
                            pipeline.addLast(new WebSocketServerProtocolHandler("/hello"));
                            // 自定义处理器处理业务逻辑
                            pipeline.addLast(new WebSocketServerHandler());
                        }
                    });
            System.out.println("服务器准备就绪...");
            ChannelFuture channelFuture = serverBootstrap.bind(7500).sync();
            channelFuture.channel().closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```

**服务端处理器：**

```java
public class WebSocketServerHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) throws Exception {
        System.out.println("服务器收到消息: "  + msg.text());
        // 回复消息
        ctx.channel().writeAndFlush(new TextWebSocketFrame("服务器当前时间: " + LocalDateTime.now() + " " + msg.text()));
    }

    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        // id 表示唯一的值，LongText 是唯一的，ShortText 不是唯一的
        System.out.println("handlerAdded 被调用 " + ctx.channel().id().asLongText());
    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        System.out.println("handlerRemoved 被调用 " + ctx.channel().id().asLongText());
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        System.out.println("发生异常: " + cause.getMessage());
        ctx.close();
    }
}
```

**客户端，浏览器页面：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <script>
        var socket;
        if (window.WebSocket) {
            socket = new WebSocket("ws://localhost:7500/hello")
            socket.onmessage = (ev) => {
                let rt = document.getElementById('response')
                rt.value = rt.value + "\n" + ev.data
            }
            socket.onopen = (ev) => {
                let rt = document.getElementById('response')
                rt.value = '连接开启...'
            }
            socket.onclose = (ev) => {
                let rt = document.getElementById('response')
                rt.value = '连接断开...'
            }
        } else {
            alert('不支持 WebSocket');
        }

        function send(msg) {
            if (!window.socket) {
                return
            }
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(msg)
            } else {
                alert('连接未开启...')
            }
        }
    </script>
    <form onsubmit=return false>
        <textarea name="message" style="height: 300px; width: 300px"></textarea>
        <input type="button" value="发送" onclick="send(this.form.message.value)">
        <textarea id="response" style="height: 300px; width: 300px"></textarea>
        <input type="button" value="清空" onclick="document.getElementById('response').value = ''">
    </form>
</body>
</html>
```



## Protobuf 编解码器

- 网络应用程序传输的都是二进制的字节码数据，在发送数据时就需要编码，接收数据时就需要解码
- Netty 为了解决 Java 本身序列化性能较低的缺点，引入了 Google Protocol Buffers 进行优化，使得数据传输效率提高

**POM 加入依赖：**

```xml
<dependency>
    <groupId>com.google.protobuf</groupId>
    <artifactId>protobuf-java</artifactId>
    <version>3.6.1</version>
</dependency>
```

**编写 proto 文件：**

```protobuf
// 版本
syntax = "proto3";
// 生成的外部类名，也是文件名
option java_outer_classname = "StudentPOJO";

// proto 使用 message 管理数据，下面的写法会在 StudentPOJO 外部类中生成一个内部类 Student，这是真正的 POJO 对象
message Student {
  // 下面不是赋值语句，而是指明 id 的序号为 1
  int32 id = 1;
  string name = 2;
}
```

**下载 protoc.exe，使用命令 protoc.exe --java_out=. Student.proto 生成对应的类**

**服务端指定解码器及其类型：**

```java
bootstrap.group(bossGroup, workerGroup)
    // 使用 NioServerSocketChannel 作为服务器的通道实现
    .channel(NioServerSocketChannel.class)
    // 保持连接状态
    .childOption(ChannelOption.SO_KEEPALIVE, true)
    // 设置 workerGroup 的 EventGroup 对应的管道的处理器
    .childHandler(new ChannelInitializer<SocketChannel>() {
        // 给 Pipeline 设置处理器
        @Override
        protected void initChannel(SocketChannel socketChannel) throws Exception {
            ChannelPipeline pipeline = socketChannel.pipeline();
            // 指定对哪种对象进行解码
            pipeline.addLast("decoder", new ProtobufDecoder(StudentPOJO.Student.getDefaultInstance()));
            pipeline.addLast(new NettyServerHandler());
        }
    });
```

**服务端处理器取出相应对象：**

```java
public class NettyServerHandler extends ChannelInboundHandlerAdapter {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        // 读取客户端发送的对象
        StudentPOJO.Student student = (StudentPOJO.Student) msg;
        System.out.println("客户端发送的数据 id: " + student.getId() + " name: " + student.getName());
    }
}
```

**客户端指定编码器：**

```java
bootstrap.group(eventExecutors)
    // 设置客户端通道的实现
    .channel(NioSocketChannel.class)
    // 设置处理器
    .handler(new ChannelInitializer<SocketChannel>() {
        @Override
        protected void initChannel(SocketChannel socketChannel) throws Exception {
            ChannelPipeline pipeline = socketChannel.pipeline();
            // 加入编码器
            pipeline.addLast("encoder", new ProtobufEncoder());
            pipeline.addLast(new NettyClientHandler());
        }
    });
```

**客户端处理器发送对象：**

```java
public class NettyClientHandler extends ChannelInboundHandlerAdapter {
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        // 发送一个 Student 对象到服务器
        StudentPOJO.Student student = StudentPOJO.Student.newBuilder().setId(4).setName("张三").build();
        ctx.writeAndFlush(student);
    }
}
```



## 入栈出栈机制

- ChannelPipeline 提供 ChannelHandler 的容器链
- 如果事件运动方向是从 ChannelPipeline 到 SocketChannel，发生写操作，需要编码，称之为出栈，即 ChannelPipeline 发送给 SocketChannel 的数据会通过 Pipeline 中的一系列 ChannelOutBoundHandler 并被处理；与之相反的就称之为入栈，发生读操作，需要解码，会被一系列 ChannelInBoundHandler 处理
- 出栈或者入栈时，需要编码或者解码，由于不知道远程节点是否会一次 性发送一个完整的信息，有可能会出现「粘包拆包」的问题，Netty 中有相应的类（ByteToMessageDecoder）对入栈数据进行缓冲，直到这个数据准备好被处理
- 在编解码的时候，如果收到的消息类型与指定的类型一致才会进行编码或者解码的操作，否则就直接跳过
- 其他常用的（编）解码器：
  - `ReplayingDecoder`：扩展了 `ByteToMessageDecoder`（但是速度可能会稍微慢点），使用该类时不需要调用 `readableByte()` 方法，而是使用泛型的形式指定用户状态管理的类型
  - `LineBasedFrameDecoder`：使用行尾控制符（\n 或者 \r\n）作为分隔符来解析数据
  - `DelimiterBasedFrameDecoder`：可以自定义特殊字符作为消息的分隔字符
  - `HttpObjectDecoder`：解析 HTTP 数据
  - `LengthFieldBasedFrameDecoder`：通过指定长度来标识整包消息，这样就可以自动处理黏包和半包的消息

[补充] 粘包拆包：TCP 是面向连接面向流的，收发两端都需要有成对的 Socket。发送端为了高效地将多个包发送给接收端，会进行优化，将多次间隔较小且数据量小的数据，合并成一个大的数据块，然后进行封包（粘包），这样虽然能提高效率，但是面向流的通讯时没有消息保护边界的，所以接收端就需要做出额外的处理

**编码器：**

```java
public class ByteToLongEncoder extends MessageToByteEncoder<Long> {
    @Override
    protected void encode(ChannelHandlerContext ctx, Long msg, ByteBuf out) throws Exception {
        System.out.println("开始进行编码 msg: " + msg);
        out.writeLong(msg);
    }
}
```

**解码器：**

```java
public class ByteToLongDecoder extends ByteToMessageDecoder {
    @Override
    protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
        System.out.println("开始进行解码...");
        // 如果没有大于等于期望获取的类型的字节数（这里期望的类型是 Long，字节数是 8），那么就不应该放入 out List，因为此时获取的数据不是期望的，如果没有这个判断，接收到的数据可能就和预期的有差别
        if (in.readableBytes() >= 8) {
            out.add(in.readLong());
        }
    }
}
```

**服务端：**

```java
public class Server {
    public static void main(String[] args) throws InterruptedException {
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .childHandler(new ServerInitializer());
            ChannelFuture channelFuture = serverBootstrap.bind(7000).sync();
            channelFuture.channel().closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```

**客户端：**

```java
public class Client {
    public static void main(String[] args) throws InterruptedException {
        EventLoopGroup group = new NioEventLoopGroup();

        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(group)
                    .channel(NioSocketChannel.class)
                    .handler(new ClientInitializer());
            ChannelFuture channelFuture = bootstrap.connect("127.0.0.1", 7000).sync();
            channelFuture.channel().closeFuture().sync();
        } finally {
            group.shutdownGracefully();
        }
    }
}
```

**服务端初始化：**

```java
public class ServerInitializer extends ChannelInitializer<SocketChannel> {
    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {
        ChannelPipeline pipeline = socketChannel.pipeline();
        // 入栈 Handler 解码
        pipeline.addLast(new ByteToLongDecoder());
        // 出栈 Handler 编码
        pipeline.addLast(new ByteToLongEncoder());
        // 加入业务处理器
        pipeline.addLast(new ServerHandler());
    }
}
```

**客户端初始化：**

```java
public class ClientInitializer extends ChannelInitializer<SocketChannel> {
    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {
        ChannelPipeline pipeline = socketChannel.pipeline();
        // 下面的编解码器的顺序可以调换，不影响，因为会自动判断是入站还是出战
        // 入栈 Handler 解码
        pipeline.addLast(new ByteToLongDecoder());
        // 出栈 Handler 编码
        pipeline.addLast(new ByteToLongEncoder());
        // 自定义 Handler 处理业务
        pipeline.addLast(new ClientHandler());
    }
}
```

**服务端处理器：**

```java
public class ServerHandler extends SimpleChannelInboundHandler<Long> {
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Long msg) throws Exception {
        System.out.println("客户端: " + ctx.channel().remoteAddress() + " 发送的数据: " + msg);
        // 给客户端会送消息
        System.out.println("服务端发送消息...");
        ctx.writeAndFlush(784327L);
    }
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.close();
    }
}
```

**客户端处理器：**

```java
public class ClientHandler extends SimpleChannelInboundHandler<Long> {
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Long msg) throws Exception {
        System.out.println("收到服务器的消息: " + msg);
    }
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        System.out.println("客户端发送数据...");
        ctx.writeAndFlush(123456L);
    }
}
```





