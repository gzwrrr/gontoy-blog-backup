---
title: "NIO"
shortTitle: "A-NIO"
description: "NIO"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-10-04
category: 
- "通信"
tag:
- "通信"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "NIO"
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
  title: "NIO"
  description: "NIO"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# NIO



[[toc]]



:::info 相关资源

[NIO 实现](https://www.bilibili.com/video/BV1zX4y1G7LE/?p=3&spm_id_from=333.880.my_history.page.click&vd_source=e356fec025b50061af78324a814f8da0)

[软件设计杂谈——事件驱动](https://zhuanlan.zhihu.com/p/184618651)

[IO多路复用——深入浅出理解select、poll、epoll的实现](https://zhuanlan.zhihu.com/p/367591714)

:::



![image-20230728130047363](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//netty/20230728/NIO%E6%A8%A1%E5%9E%8B.png)



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





