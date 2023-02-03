# Netty 简单使用





# I/O 模型

- I/O 模型简单理解：用什么样的通道进行数据的发送和接收，模型很大程度决定了程序通信的性能
- Java BIO：同步阻塞模型，服务器实现为一个连接一个线程，客户端有连接时服务器就需要启动一个形成进行处理，如果这个连接不做任何事情就会造成不必要的线程开销；适用于连接数较小且固定的架构，对服务器资源要求比较高，但是程序简单易理解
- Java NIO：同步非阻塞模型，服务器实现为一个线程处理多个请求，客户端发送的连接请求都会注册到「多路复用器」上，多路复用器轮询到连接有 I/O 请求就会进行处理；适用于连接数较多且连接比较短（轻操作）的架构，比如聊天服务器，弹幕系统，服务器间通讯。编程较为复杂
- Java AIO（没有广泛使用）：异步非阻塞模型，引入了「异步通道」的概念，采用 Proactor 模式，简化了程序编写，有效的请求才启动线程，特点是由操作系统完成后才通知服务端程序启动线程处理请求，一般适用于连接数较多且连接时间较长的应用，比如相册服务器，充分调用 OS 参与并发操作，编程比较复杂



# NIO

- NIO 有三大核心部分：Selector：选择器、Channel：管道、Buffer：缓冲区
- 三大核心的关系：
  - 每个 Selector 都会对应一个 线程，而一个线程会对应多个 Channel
  - 每个 Channel 都会对应一个 Buffer
  - 程序切换到哪个 Channel 是由「事件」决定的，这里的事件 Event 也是 NIO 中很重要的概念，Selector 会根据不同的事件切换不同的 Channel
  - Buffer 本质就是一个内存块，底层都有一个数组，数据的读写都是通过 Buffer 的
  - Channel 和 Buffer 都是「双向的」，前者很好地反映了底层操作系统的情况，后者的切换需要通过 `flip()` 方法实现

- NIO 是面向「缓冲区」或者面向「块」编程的，数据读取到一个稍后处理的缓冲区中，需要时可在缓冲区中前后移动，这样增加了处理过程中的灵活性，使用它可以提供非阻塞式的「伸缩性网格」
- NIO 的非阻塞模式（多路复用），使一个线程从某通道发送请求或者读取数据，但是这仅能读取到目前可用的数据，如果目前没有数据可用，就什么都不会获取，而不是保持线程阻塞，这样线程就可以处理其他事情
- BIO 是以「流」的方式处理数据的，而 NIO 是基于 Channel 和 Buffer 进行操作的，数据总是从通道读取到缓冲区中，或者从缓冲区写入到通道中；Selector 用于监听多个通道的事件，比如连接请求、数据到达等，因此使用单个线程就可以监听到多个客户端通道



## Buffer

- 缓冲区本质上就是一个可以「读写数据」的「内存块」，可以理解成一个容器对象，底层是数组，该对象提供了一组方法，以便轻松地使用内存块
- 缓冲区对象还内置了一些「机制」，能够跟踪和记录缓冲区的「状态变化」情况
- 在 NIO 中，Buffer 是一个「顶层父类」，是一个「抽象类」，基础类型都有对应的 Buffer 类（除了布尔类型）
- Buffer 类定义了所有缓冲区都具有的「四个属性」，这些属性用于提供关于其所包含的数据元素的「信息」，四个属性如下：
  - mark：标志位
  - position：下一个要被读或写的元素的「索引」，每次读写缓冲区数据时都会改变该索引的位置
  - limit：表示缓冲区的当前终点，即不能对缓冲区超过极限的位置进行读写操作，但是这个极限是可以修改的
  - capacity：容量，即可以容纳的最大数据量，在缓冲区创建时就被设定并且不能改变
- Buffer 可以使用方法 `asReadOnlyBuffer()` 手动转换成「只读缓冲区」，读取的时候还必须按照写入类型的顺序进行相应，否则会抛异常

### 基本使用

```java
public class BasicBuffer {
    public static void main(String[] args) {
        // 创建一个 Buffer
        IntBuffer intBuffer = IntBuffer.allocate(5);
        // 向 Buffer 中存放数据
        for (int i = 0; i < intBuffer.capacity(); i++) {
            intBuffer.put(i * 2);
        }
        // 从 Buffer 中读取数据，需要先将 Buffer 转换，即读写切换
        intBuffer.flip();
        while (intBuffer.hasRemaining()) {
            System.out.println(intBuffer.get());
        }
    }
}
```



### MappedByteBuffer

```java
/**
 * 直接在内存中修改文件
 * MappedByteBuffer 可以让文件直接在内存修改（堆外内存），这样操作系统不用拷贝一次
 */
public class NIOFileChannel05 {
    public static void main(String[] args) throws IOException {
        RandomAccessFile randomAccessFile = new RandomAccessFile("xxx.xxx", "rw");
        // 获取对应的通道
        FileChannel channel = randomAccessFile.getChannel();
        /**
         * 三个参数的含义依次为：
         * 1、使用读写模式
         * 2、可以直接修改的起始位置
         * 3、映射到内存中的大小，即将文件的多少个字节映射到内存中
         * 即可以修改的范围就是 0 ~ 5（不包含 5）
         * MappedByteBuffer 的实际类型是 DirectByteBuffer
         */
        MappedByteBuffer mappedByteBuffer = channel.map(FileChannel.MapMode.READ_WRITE, 0, 5);
        // 修改文件
        mappedByteBuffer.put(0, (byte) 'H');
        // 关闭流
        randomAccessFile.close();
    }
}
```



## Channel

- Channel 是双向的，可以进行读写操作，在 NIO 中是一个接口，常用的 Channel 类有：
  - `FileChannel`：用于文件的数据读写
  - `DatagramChannel`：用于 UDP 的数据读写
  - `ServerSocketChannel` 和 `SocketChannel`：用于 TCP 的数据读写

### 基本使用

```java
public class NIOFileChannel01 {
    public static void main(String[] args) throws IOException {
        String str = "hello world";
        // 创建一个输出流
        FileOutputStream fileOutputStream = new FileOutputStream("xxx.xxx");
        // 获取对应的 FileChannel
        FileChannel fileChannel = fileOutputStream.getChannel();
        // 创建一个 byte 缓冲区
        ByteBuffer byteBuffer = ByteBuffer.allocate(1024);
        // 将信息放入缓冲区
        byteBuffer.put(str.getBytes());
        // 缓冲区反转，position=0，limit=信息的字节数，这样写入就不会出错
        byteBuffer.flip();
        // 将缓冲区的数据写入 channel
        fileChannel.write(byteBuffer);
        // 关闭流
        fileOutputStream.close();
    }
}
```



### ScatteringAndGathering

```java
/**
 * Scattering：将数据写入到 Buffer 时，可以采用 Buffer 数组，依次写入（分散写入）
 * Gathering：从 Buffer 读取数据时，可以采用 Buffer 数组，依次读出（分散读出）
 */
public class ScatteringAndGathering {
    public static void main(String[] args) throws IOException {
        // 使用 ServerSocketChannel 和 SocketChannel 网络
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        InetSocketAddress inetSocketAddress = new InetSocketAddress(7000);
        // 绑定端口并启动
        serverSocketChannel.socket().bind(inetSocketAddress);
        // 创建 Buffer 数组
        ByteBuffer[] byteBuffers = new ByteBuffer[2];
        byteBuffers[0] = ByteBuffer.allocate(5);
        byteBuffers[1] = ByteBuffer.allocate(3);
        // 等待客户端连接
        SocketChannel socketChannel = serverSocketChannel.accept();
        // 假定从客户端接收 8 个字节
        int messageLength = 8;
        // 循环读取
        while (true) {
            long byteRead = 0;
            while (byteRead < messageLength) {
                long l = socketChannel.read(byteBuffers);
                byteRead += l;
                System.out.println("byteRead: " + byteRead);
                // 输出当前 Buffer 的 position 和 limit
                Arrays.asList(byteBuffers).stream().map(buffer -> "position: " + buffer.position() + "; limit: " + buffer.limit()).forEach(System.out::println);
            }
            // 将所有的 Buffer 进行反转
            Arrays.asList(byteBuffers).forEach(byteBuffer -> byteBuffer.flip());
            // 将数据回显到客户端
            long byteWrite = 0;
            while (byteWrite < messageLength) {
                long l = socketChannel.write(byteBuffers);
                byteWrite += l;
            }
            // 将所有的 Buffer 复位
            Arrays.asList(byteBuffers).forEach(byteBuffer -> byteBuffer.clear());
            System.out.println("byteRead: " + byteRead + "; byteWrite: " + byteWrite + "; messageLength: " + messageLength);
        }
    }
}
```



## Selector

- Selector 是多路复用器，是 Java NIO 核心组件中的用于检查一个或者多个 Channel 的状态是否处于可读或者可写
- 使用 Selector 的好处在于，可以使用更少的线程来处理通道，避免了上下文切换带来的开销
- 但是注意，不是所有的 Channel 都可以被 Selector 复用，比如 FileChannel 就不能被复用；判断一个 Channel 是否能被复用，前提是它是否继承了抽象类 `SelectableChannel`，集成即可复用，否则不能
- `SelectableChannel` 类提供了实现通道的「可选择性」的公共方法，这是所有支持「就绪检查」的通道类的「父类」；所有的 Socket 通道都是可选择的，包括从「管道（Pipe）」对象中获得的通道
- 选择器和通道之间使用「注册」的方式完成联系；一个通道可以被注册到「多个选择器」上，但是对每个选择器而言只能被注册一次；在注册时，需要指定通道的哪些操作是选择器关心的
- 通道操作包括以下四种：
  - 可读：`SelectionKey.OP_READ`
  - 可写：`SelectionKey.OP_WRITE`
  - 连接：`SelectionKey.OP_CONNECT`
  - 接收：`SelectionKey.OP_ACCEPT`

- 如果通道对多操作感兴趣，那么可以通过「位或」操作符来实现，如：`int key = SelectionKey.OP_READ |SelectionKey.OP_WRITE `
- 选择器查询的不是通道的「操作」，而是通道的某一个操作的一种「就绪状态」，这里的就绪状态是指，一旦通道具备完成某个操作的条件，就表示该通道的某个操作「就绪」，此时就可以被选择器查询到，程序就可以对通道进行相应的操作

### 基本使用

**服务端：**

```java
public class NIOServer {
    public static void main(String[] args) throws IOException {
        // 创建通道
        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
        // 获取选择器对象
        Selector selector = Selector.open();
        // 绑定一个端口
        serverSocketChannel.socket().bind(new InetSocketAddress(6666));
        // 设置为非阻塞
        serverSocketChannel.configureBlocking(false);
        // 把 serverSocketChannel 注册到选择器上
        serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);
        // 循环等待客户端连接
        while (true) {
            if (selector.select(1000) == 0) {
                // 没有任何事情发生
                System.out.println("等待1秒，无连接...");
                continue;
            }
            // 如果有事件发生，可以通过 selectionKeys 反向获取通道
            Set<SelectionKey> selectionKeys = selector.selectedKeys();
            // 遍历集合
            Iterator<SelectionKey> keysIterator = selectionKeys.iterator();
            while (keysIterator.hasNext()) {
                // 获取 key
                SelectionKey key = keysIterator.next();
                // 根据 key 获取相应的通道并做出相应的处理
                if (key.isAcceptable()) {
                    // 这里表示有新的客户端连接
                    SocketChannel socketChannel = serverSocketChannel.accept();
                    // 设置成非阻塞的，否则会报错
                    socketChannel.configureBlocking(false);
                    System.out.println("成功连接了一个客户端...");
                    // 将当前的 socketChannel 也注册到选择器上，关心的事件为读事件，并关联一个 Buffer
                    socketChannel.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(1024));
                }
                if (key.isReadable()) {
                    // 如果是可读的，获取到该可读的管道
                    SocketChannel channel = (SocketChannel)key.channel();
                    // 获取到这个管道关联的 Buffer
                    ByteBuffer buffer = (ByteBuffer)key.attachment();
                    channel.read(buffer);
                    System.out.println("From Client: " + new String(buffer.array()));
                }
                // 手动从集合中删除当前的 key，防止多线程下重复操作
                keysIterator.remove();
            }
        }
    }
}
```

**客户端：**

```java
public class NIOClient {
    public static void main(String[] args) throws IOException {
        // 获取通道
        SocketChannel socketChannel = SocketChannel.open();
        // 设置非阻塞
        socketChannel.configureBlocking(false);
        // 指定服务端的 ip 和端口
        InetSocketAddress inetSocketAddress = new InetSocketAddress("127.0.0.1", 6666);
        // 连接服务器
        if (!socketChannel.connect(inetSocketAddress)) {
            while (!socketChannel.finishConnect()) { 
                System.out.println("连接需要事件，客户端不阻塞，可以继续其他工作...");
            }
        }
        // 连接成功，发送信息
        String str = "Hello world";
        ByteBuffer buffer = ByteBuffer.wrap(str.getBytes());
        socketChannel.write(buffer);
        System.in.read();
    }
}
```



### 聊天室

**服务端：**

```java
public class GroupChatServer {
    /**
     * 选择器
     */
    private Selector selector;

    /**
     * 监听通道
     */
    private ServerSocketChannel listenChannel;

    /**
     * 监听端口
     */
    private static final int PORT = 6667;

    public GroupChatServer() {
        try {
            this.selector = Selector.open();
            this.listenChannel = ServerSocketChannel.open();
            // 绑定端口
            this.listenChannel.socket().bind(new InetSocketAddress(PORT));
            // 设置非阻塞
            this.listenChannel.configureBlocking(false);
            // 将管道注册到选择器上
            this.listenChannel.register(this.selector, SelectionKey.OP_ACCEPT);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 监听方法
     */
    public void listen() {
        try {
            // 循环处理
            while (true) {
                int count = this.selector.select(2000);
                if (count > 0) {
                    // 说明有事情需要处理
                    Iterator<SelectionKey> iterator = this.selector.selectedKeys().iterator();
                    while (iterator.hasNext()) {
                        // 获取 key
                        SelectionKey key = iterator.next();
                        if (key.isAcceptable()) {
                            SocketChannel sc = this.listenChannel.accept();
                            sc.configureBlocking(false);
                            // 注册
                            sc.register(this.selector, SelectionKey.OP_READ);
                            // 输出提示
                            System.out.println(sc.getRemoteAddress() + " 上线...");
                        }
                        if (key.isReadable()) {
                            // 通道可读时
                            readData(key);
                        }
                        // 删除 key，防止重复处理
                        iterator.remove();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // TODO
        }

    }

    /**
     * 读取数据
     */
    public void readData(SelectionKey key) {
        SocketChannel channel = null;
        try {
            channel = (SocketChannel) key.channel();
            // 创建 Buffer
            ByteBuffer buffer = ByteBuffer.allocate(1024);
            int count = channel.read(buffer);
            if (count > 0) {
                // 读取到了数据
                String msg = new String(buffer.array());
                System.out.println("From Client: " + msg.trim());
                // 向其他客户端转发消息，要排除自己
                sendToClients(msg, channel);
            }
        } catch (IOException e) {
            try {
                System.out.println(channel.getRemoteAddress() + " 离线了...");
                // 取消注册
                key.cancel();
                // 关闭通道
                channel.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    /**
     * 向其他客户端转发消息
     */
    public void sendToClients(String msg, SocketChannel self) throws IOException {
        System.out.println("服务器转发消息...");
        for(SelectionKey key : this.selector.keys()) {
            Channel targetChannel = key.channel();
            // 排除自己
            if (targetChannel instanceof SocketChannel && targetChannel != self) {
                SocketChannel dest = (SocketChannel) targetChannel;
                ByteBuffer buffer = ByteBuffer.wrap(msg.getBytes());
                // 将数据写入通道
                dest.write(buffer);
            }
        }
    }

    public static void main(String[] args) {
        // 启动服务器
        GroupChatServer chatServer = new GroupChatServer();
        chatServer.listen();
    }
}
```

**客户端：**

```java
public class GroupChatClient {
    private final String HOST = "127.0.0.1";
    private final int PORT = 6667;
    private Selector selector;
    private SocketChannel socketChannel;
    private String username;

    public GroupChatClient() throws IOException {
        this.selector = Selector.open();
        // 连接服务器
        this.socketChannel = this.socketChannel.open(new InetSocketAddress(HOST, PORT));
        // 设置非阻塞
        this.socketChannel.configureBlocking(false);
        // 注册
        this.socketChannel.register(this.selector, SelectionKey.OP_READ);
        // 获取 username
        this.username = this.socketChannel.getLocalAddress().toString().substring(1);
        System.out.println(this.username + " 准备就绪...");
    }

    /**
     * 向服务器发送消息
     */
    public void sendInfo(String info) {
        info = this.username + ": " + info;
        try {
            this.socketChannel.write(ByteBuffer.wrap(info.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 读取从服务端返回的消息
     */
    public void readInfo() {
        try {
            int readChannels = this.selector.select();
            if (readChannels > 0) {
                Iterator<SelectionKey> iterator = this.selector.selectedKeys().iterator();
                while (iterator.hasNext()) {
                    SelectionKey key = iterator.next();
                    if (key.isReadable()) {
                        SocketChannel sc = (SocketChannel) key.channel();
                        ByteBuffer buffer = ByteBuffer.allocate(1024);
                        // 读取消息
                        sc.read(buffer);
                        String msg = new String(buffer.array());
                        System.out.println(msg.trim());
                    }
                }
                // 删除 key，防止重复操作
                iterator.remove();
            } else {
                // TODO
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws IOException {
        // 启动客户端
        GroupChatClient chatClient = new GroupChatClient();
        // 启动一个线程
        new Thread() {
            @Override
            public void run() {
                while (true) {
                    chatClient.readInfo();
                    try {
                        sleep(3000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();
        // 发送数据给服务端
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextLine()) {
            String s = scanner.nextLine();
            chatClient.sendInfo(s);
        }
    }
}
```



## 零拷贝

- 零拷贝是网络编程的关键，很多性能优化都离不开零拷贝；常用的零拷贝有 `mmap`（内存映射）和 `sendFile`，前者适合小数据量的读写，后者适合大文件的传输 

- 传统 IO 操作是使用 DMA（直接内存拷贝，不使用 CPU），过程经历了 4 次拷贝 3 次切换
- 这里说的零拷贝不是真正的零拷贝，而是从操作系统的角度看的，即没有 CPU 拷贝（4 次拷贝优化成了 3 次）
- `mmap` 通过内存映射，将文件映射到「内核缓冲区」，用户空间可以直接「共享」内核空间的数据，这样在网络传输的过程中就可以减少内核空间到用户空间的拷贝
- `sendFile` 优化下，数据不会经过用户态，而是直接从内核缓冲区进入到 Socket Buffer，同时，由于与用户态完全无关，这样还可以减少一次上下文的切换，即变成了 3 次拷贝 2 次切换



# Netty 简介

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

![什么是Netty？_慕课手记](https://file.yasinshaw.com/201907/11/956A5814BE5F.jpg)

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

![image-20230108113811182](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Netty\Netty.assets\image-20230108113811182.png)

- Reactor 对象通过 select 监控客户端请求事件，收到事件后通过 dispatch 进行分发
- 如果建立连接请求，则 Acceptor 对象通过 Accept 处理连接请求，然后创建一个 Handler 对象处理完成连接后的各个事件
- 如果不是连接请求，则由 Reactor 分发调用连接对应的 Handler 来处理
- Handler 只负责响应事件，不做具体的业务处理，通过 Read 读取数据后，会分发给后面的 Worker 线程池的某个线程处理业务
- Worker 线程池会分配独立的线程完成真正的业务，并将结果返回给 Handler，Handler 收到响应后，通过 Send 将结果返回给客户端
- 优点：可以充分地利用多核 CPU 的处理能力
- 缺点：多线程「数据共享」和「访问」比较复杂，Reactor 处理所有的事件的「监听」和「响应」，Reactor 在单线程高并发场景下容易出现瓶颈



### 主从 Reactor 多线程

<img src="https://www.pianshen.com/images/653/43a4c8cc8c67d3f8314567fd1f5e51dd.png" alt="什么是Netty？_慕课手记" style="zoom:50%;" />

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

![使用netty手撸一个简易http服务器](https://www.icode9.com/img/ll/?i=20200113162543811.png?,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzM3NzE5ODc0,size_16,color_FFFFFF,t_70)

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





# Netty 模型

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

![image-20230108195118087](C:\MyDisk\B-Data\Record\Note\WorkingArea\CodingStudy\Netty\Netty.assets\image-20230108195118087.png)

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