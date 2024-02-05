---
title: "Android IPC"
shortTitle: "Android IPC"
description: "Android IPC"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-10-01
category: 
- "Android"
- "移动端"
tag:
- "Android"
- "移动端"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Android IPC"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 1
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "Android IPC"
  description: "Android IPC"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android IPC

[[toc]]



## 写在前面

### 进程间通信

:::info 说明

IPC是Inter-Process Communication的缩写，含义为进程间通信或者跨进程通信，是指两个进程之间进行数据交换的过程。

:::

**UI 线程：**

- 最简单的情况下，一个进程中可以只有一个线程，即主线程，在Android里面主线程也叫UI线程，在UI线程里才能操作界面元素。

- 一个进程中需要执行大量耗时的任务，如果这些任务放在主线程中去执行就会造成界面无法响应，严重影响用户体验，这种情况在PC系统和移动系统中都存在，在Android中有ANR（ApplicationNot Responding），即应用无响应。解决这个问题就需要用到线程，把一些耗时的任务放在线程中即可。

<br/>

**Android 中的进程间通信：**

- 对于Android来说，它是一种基于Linux内核的移动操作系统，它的进程间通信方式并不能完全继承自Linux，相反，它有自己的进程间通信方式。在Android中最有特色的进程间通信方式就是Binder了，通过Binder可以轻松地实现进程间通信。

- 除了Binder，Android还支持Socket，通过Socket也可以实现任意两个终端之间的通信，当然同一个设备上的两个进程通过Socket通信自然也是可以的。

<br/>

**可能的情况：**

1. 因为某些原因自身需要采用多进程模式来实现，比如有些模块由于特殊原因需要运行在单独的进程中，又或者为了加大一个应用可使用的内存所以需要通过多进程来获取多份内存空间（Android对单个应用所使用的最大内存做了限制，早期的一些版本可能是16MB，不同设备有不同的大小）
2. 当前应用需要向其他应用获取数据，由于是两个应用，所以必须采用跨进程的方式来获取所需的数据，甚至我们通过系统提供ContentProvider去查询数据的时候，其实也是一种进程间通信，只不过通信细节被系统内部屏蔽了，我们无法感知而已。



### 启动多进程

> 通过给四大组件指定`android:process`属性，我们可以轻易地开启多进程模式，但是实际使用过程中会涉及到很多问题，有时候我们通过多进程得到的好处甚至都不足以弥补使用多进程所带来的代码层面的负面影响。

正常情况下，在Android中多进程是指一个应用中存在多个进程的情况。

在Android中使用多进程只有一种方法，那就是给四大组件（Activity、Service、Receiver、ContentProvider）在AndroidMenifest中指定`android:process`属性，除此之外没有其他办法，也就是说我们无法给一个线程或者一个实体类指定其运行时所在的进程。

:::warning 注意

其实还有另一种非常规的多进程方法，那就是通过JNI在native层去fork一个新的进程，但是这种方法属于特殊情况，也不是常用的创建多进程的方式，因此我们暂时不考虑这种方式。

:::



### 不同的进程模式

SecondActivity和ThirdActivity的android:process属性分别为“:remote”和“com.ryg.chapter_2.remote”，那么这两种方式有区别吗？其实是有区别的，区别有两方面：首先，“:”的含义是指要在当前的进程名前面附加上当前的包名，这是一种简写的方法，对于SecondActivity来说，它完整的进程名为com.ryg.chapter_2:remote，这一点通过图2-1和2-2中的进程信息也能看出来，而对于ThirdActivity中的声明方式，它是一种完整的命名方式，不会附加包名信息；

其次，进程名以“:”开头的进程属于当前应用的私有进程，其他应用的组件不可以和它跑在同一个进程中，而进程名不以“:”开头的进程属于全局进程，其他应用通过ShareUID方式可以和它跑在同一个进程中。

Android系统会为每个应用分配一个唯一的UID，具有相同UID的应用才能共享数据。这里要说明的是，两个应用通过ShareUID跑在同一个进程中是有要求的，需要这两个应用有相同的ShareUID并且签名相同才可以。在这种情况下，它们可以互相访问对方的私有数据，比如data目录、组件信息等，不管它们是否跑在同一个进程中。当然如果它们跑在同一个进程中，那么除了能共享data目录、组件信息，还可以共享内存数据，或者说它们看起来就像是一个应用的两个部分。



### 多进程的问题

所有运行在不同进程中的四大组件，只要它们之间需要通过内存来共享数据，都会共享失败，这也是多进程所带来的主要影响。

正常情况下，四大组件中间不可能不通过一些中间层来共享数据，那么通过简单地指定进程名来开启多进程都会无法正确运行。

当然，特殊情况下，某些组件之间不需要共享数据，这个时候可以直接指定android:process属性来开启多进程，但是这种场景是不常见的，几乎所有情况都需要共享数据。

一般来说，使用多进程会造成如下几方面的问题：

1. 静态成员和单例模式完全失效。

2. 线程同步机制完全失效。

3. SharedPreferences的可靠性下降。

4. Application会多次创建。



### 进程通信的方式

1. 通过Intent传递数据
2. 共享文件
3. SharedPreferences
4. 基于Binder的Messenger
5. AIDL以及Socket







## 相关概念



### 序列化

**Serializable 接口：**

- Serializable 是一个空接口，为对象提供标准的序列化和反序列化操作。

- 在Android中也提供了新的序列化方式，那就是Parcelable接口，使用Parcelable来实现对象的序列号，其过程要稍微复杂一些。

<br/>

**Parcelable 接口：**

- Parcelable也是一个接口，只要实现这个接口，一个类的对象就可以实现序列化并可以通过Intent和Binder传递。
- Parcel对象内部包装了可序列化的数据，可以在Binder中自由传输。
- 在序列化过程中需要实现的功能有序列化、反序列化和内容描述。序列化功能由writeToParcel方法来完成，最终是通过Parcel中的一系列write方法来完成的；反序列化功能由CREATOR来完成，其内部标明了如何创建序列化对象和数组，并通过Parcel的一系列read方法来完成反序列化过程；内容描述功能由describeContents方法来完成，几乎在所有情况下这个方法都应该返回0，仅当当前对象中存在文件描述符时，此方法返回1。

需要注意的是，在User(Parcel in)方法中，由于book是另一个可序列化对象，所以它的反序列化过程需要传递当前线程的上下文类加载器，否则会报无法找到类的错误。

系统已经为我们提供了许多实现了Parcelable接口的类，它们都是可以直接序列化的，比如Intent、Bundle、Bitmap等，同时List和Map也可以序列化，前提是它们里面的每个元素都是可序列化的。

**注意：**

Serializable是Java中的序列化接口，其使用起来简单但是开销很大，序列化和反序列化过程需要大量I/O操作。而Parcelable是Android中的序列化方式，因此更适合用在Android平台上，它的缺点就是使用起来稍微麻烦点，但是它的效率很高，这是Android推荐的序列化方式，因此我们要首选Parcelable。

Parcelable主要用在内存序列化上，通过Parcelable将对象序列化到存储设备

中或者将对象序列化后通过网络传输也都是可以的，但是这个过程会稍显复杂，因此在这两种情况下建议大家使用Serializable。



### Binder

**从不同角度看：**

- API 层面：Binder是Android中的一个类，它继承了IBinder接口。
- IPC 层面：Binder是Android中的一种跨进程通信方式，Binder还可以理解为一种虚拟的物理设备，它的设备驱动是/dev/binder，该通信方式在Linux中没有。

- Android Framework 层面：Binder是ServiceManager连接各种Manager（ActivityManager、WindowManager，等等）和相应ManagerService的桥梁。

- Android应用层：Binder是客户端和服务端进行通信的媒介，当bindService的时候，服务端会返回一个包含了服务端业务调用的Binder对象，通过这个Binder对象，客户端就可以获取服务端提供的服务或者数据，这里的服务包括普通服务和基于AIDL的服务。

Android开发中，Binder主要用在Service中，包括AIDL和Messenger，其中普通Service中的Binder不涉及进程间通信，所以较为简单，无法触及Binder的核心，而Messenger的底层其实是AIDL，所以这里选择用AIDL来分析Binder的工作机制。

所有可以在Binder中传输的接口都需要继承IInterface接口。

AIDL会自动生成对应的 Java 代码，其中方法如下：

| 方法                                  | 说明                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| `asInterface(android.os.IBinder obj)` | 用于将服务端的Binder对象转换成客户端所需的AIDL接口类型的对象，这种转换过程是区分进程的，如果客户端和服务端位于同一进程，那么此方法返回的就是服务端的Stub对象本身，否则返回的是系统封装后的Stub.proxy对象。 |
| `asBinder`                            | 此方法用于返回当前Binder对象。                               |
| `onTransact`                          | 这个方法运行在服务端中的Binder线程池中，当客户端发起跨进程请求时，远程请求会通过系统底层封装后交由此方法来处理。该方法的原型为`public Boolean onTransact(int code,android.os.Parcel data,android.os.Parcel reply,int flags)`。服务端通过code可以确定客户端所请求的目标方法是什么，接着从data中取出目标方法所需的参数（如果目标方法有参数的话），然后执行目标方法。当目标方法执行完毕后，就向`reply`中写入返回值（如果目标方法有返回值的话），`onTransact`方法的执行过程就是这样的。需要注意的是，如果此方法返回false，那么客户端的请求会失败，因此我们可以利用这个特性来做权限验证，毕竟我们也不希望随便一个进程都能远程调用我们的服务。 |
| `Proxy#xxx`                           | 当客户端远程调用时，它的内部实现是这样的：首先创建该方法所需要的输入型`Parcel`对象`_data`、输出型`Parcel`对象`_reply`和返回值对象`List`；然后把该方法的参数信息写入`_data`中（如果有参数的话）；接着调用`transact`方法来发起RPC（远程过程调用）请求，同时当前线程挂起；然后服务端的`onTransact`方法会被调用，直到RPC过程返回后，当前线程继续执行，并从`_reply`中取出RPC过程的返回结果；最后返回`_reply`中的数据。 |

**注意点：**

- 当客户端发起远程请求时，由于当前线程会被挂起直至服务端进程返回数据，所以如果一个远程方法是很耗时的，那么不能在UI线程中发起此远程请求；
- 由于服务端的Binder方法运行在Binder的线程池中，所以Binder方法不管是否耗时都应该采用同步的方式去实现，因为它已经运行在一个线程中了。

![image-20231014113744339](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231014/binder%E5%B7%A5%E4%BD%9C%E6%9C%BA%E5%88%B6.png)

完全可以不提供AIDL文件即可实现Binder，之所以提供AIDL文件，是为了方便系统为我们生成代码。

系统根据AIDL文件生成Java文件的格式是固定的，我们可以抛开AIDL文件直接写一个Binder出来。



Binder运行在服务端进程，如果服务端进程由于某种原因异常终止，这个时候我们到服务端的Binder连接断裂（称之为Binder死亡），会导致我们的远程调用失败。更为关键的是，如果我们不知道Binder连接已经断裂，那么客户端的功能就会受到影响。

为了解决这个问题，Binder中提供了两个配对的方法`linkToDeath`和`unlinkToDeath`，通过`linkToDeath`我们可以给Binder设置一个死亡代理，当Binder死亡时，我们就会收到通知，这个时候我们就可以重新发起连接请求从而恢复连接。



## IPC 方式

### Bundle

- 四大组件中的三大组件（Activity、Service、Receiver）都是支持在Intent中传递Bundle数据的，由于Bundle实现了Parcelable接口，所以它可以方便地在不同的进程间传输。
- 当我们在一个进程中启动了另一个进程的Activity、Service和Receiver，我们就可以在Bundle中附加我们需要传输给远程进程的信息并通过Intent发送出去。
- 传输的数据必须能够被序列化，比如基本类型、实现了Parcellable接口的对象、实现了Serializable接口的对象以及一些Android支持的特殊对象，具体内容可以看Bundle这个类，就可以看到所有它支持的类型。

除了直接传递数据这种典型的使用场景，它还有一种特殊的使用场景。比如A进程正在进行一个计算，计算完成后它要启动B进程的一个组件并把计算结果传递给B进程，可是遗憾的是这个计算结果不支持放入Bundle中，因此无法通过Intent来传输，这个时候如果我们用其他IPC方式就会略显复杂。可以考虑如下方式：我们通过Intent启动进程B的一个Service组件（比如IntentService），让Service在后台进行计算，计算完毕后再启动B进程中真正要启动的目标组件，由于Service也运行在B进程中，所以目标组件就可以直接获取计算结果，这样一来就轻松解决了跨进程的问题。这种方式的核心思想在于将原本需要在A进程的计算任务转移到B进程的后台Service中去执行，这样就成功地避免了进程间通信问题，而且只用了很小的代价。



### 文件共享

- 共享文件也是一种不错的进程间通信方式，两个进程通过读/写同一个文件来交换数据，比如A进程把数据写入文件，B进程通过读取这个文件来获取数据。

- 通过文件共享这种方式来共享数据对文件格式是没有具体要求的，比如可以是文本文件，也可以是XML文件，只要读/写双方约定数据格式即可。

- 通过文件共享的方式也是有局限性的，比如并发读/写的问题，像上面的那个例子，如果并发读/写，那么我们读出的内容就有可能不是最新的，如果是并发写的话那就更严重了。我们要尽量避免并发写这种情况的发生或者考虑使用线程同步来限制多个线程的写操作。

**注意：**

SharedPreferences是个特例，众所周知，SharedPreferences是Android中提供的轻量级存储方案，它通过键值对的方式来存储数据，在底层实现上它采用XML文件来存储键值对，每个应用的SharedPreferences文件都可以在当前包所在的data目录下查看到。一般来说，它的目录位于`/data/data/packagename/shared_prefs`目录下，其中package name表示的是当前应用的包名。从本质上来说，SharedPreferences也属于文件的一种，但是由于系统对它的读/写有一定的缓存策略，即在内存中会有一份SharedPreferences文件的缓存，因此在多进程模式下，系统对它的读/写就变得不可靠，当面对高并发的读/写访问，Sharedpreferences有很大几率会丢失数据，因此，不建议在进程间通信中使用SharedPreferences。



### Messenger

- Messenger可以翻译为信使，顾名思义，通过它可以在不同进程中传递Message对象，在Message中放入我们需要传递的数据，就可以轻松地实现数据的进程间传递了。

- Messenger是一种轻量级的IPC方案，它的底层实现是AIDL。

- Messenger的使用方法很简单，它对AIDL做了封装，使得我们可以更简便地进行进程间通信。

- 由于它一次处理一个请求，因此在服务端我们不用考虑线程同步的问题，这是因为服务端中不存在并发执行的情形。
- 在Messenger中进行数据传递必须将数据放入Message中，而Messenger和Message都实现了Parcelable接口，因此可以跨进程传输。
- Message中所支持的数据类型就是Messenger所支持的传输类型。实际上，通过Messenger来传输Message，Message中能使用的载体只有`what`、`arg1`、`arg2`、`Bundle`以及`replyTo`。

![image-20231014162515802](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231014/messenger%E5%B7%A5%E4%BD%9C%E6%96%B9%E5%BC%8F.png)





### AIDL

> AIDL是一种最常用的进程间通信方式，是日常开发中涉及进程间通信时的首选

- Messenger是以串行的方式处理客户端发来的消息，如果大量的消息同时发送到服务端，服务端仍然只能一个个处理，如果有大量的并发请求，那么用Messenger就不太合适了。
- Messenger的作用主要是为了传递消息，很多时候我们可能需要跨进程调用服务端的方法，这种情形用Messenger就无法做到了，但是我们可以使用AIDL来实现跨进程的方法调用。
- AIDL也是Messenger的底层实现，因此Messenger本质上也是AIDL，只不过系统为我们做了封装从而方便上层的调用而已。



在AIDL文件中，并不是所有的数据类型都是可以使用的，支持的类型如下：

- 基本数据类型（int、long、char、boolean、double等）；
- String和CharSequence；
- List：只支持ArrayList，里面每个元素都必须能够被AIDL支持；
- Map：只支持HashMap，里面的每个元素都必须被AIDL支持，包括key和value；
- Parcelable：所有实现了Parcelable接口的对象；
- AIDL：所有的AIDL接口本身也可以在AIDL文件中使用。

其中自定义的Parcelable对象和AIDL对象必须要显式import进来，不管它们是否和当前的AIDL文件位于同一个包内。

为了方便AIDL的开发，建议把所有和AIDL相关的类和文件全部放入同一个包中，这样做的好处是，当客户端是另外一个应用时，我们可以直接把整个包复制到客户端工程中。



### ContentProvider

ContentProvider是Android中提供的专门用于不同应用间进行数据共享的方式，从这一点来看，它天生就适合进程间通信。和Messenger一样，ContentProvider的底层实现同样也是Binder，由此可见，Binder在Android系统中是何等的重要。

虽然ContentProvider的底层实现是Binder，但是它的使用过程要比AIDL简单许多，这是因为系统已经为我们做了封装，使得我们无须关心底层细节即可轻松实现IPC。



### Socket

Socket也称为“套接字”，是网络通信中的概念，它分为流式套接字和用户数据报套接字两种，分别对应于网络的传输控制层中的TCP和UDP协议。

要注意不能在主线程中访问网络，因为这会导致我们的程序无法在Android 4.0及其以上的设备中运行，会抛出如下异常：`android.os.NetworkOnMainThreadException`。





## Binder 连接池

每个业务模块创建自己的AIDL接口并实现此接口，这个时候不同业务模块之间是不能有耦合的，所有实现细节我们要单独开来，然后向服务端提供自己的唯一标识和其对应的Binder对象；对于服务端来说，只需要一个Service就可以了，服务端提供一个queryBinder接口，这个接口能够根据业务模块的特征来返回相应的Binder对象给它们，不同的业务模块拿到所需的Binder对象后就可以进行远程方法调用了。由此可见，Binder连接池的主要作用就是将每个业务模块的Binder请求统一转发到远程Service中去执行，从而避免了重复创建Service的过程。

![image-20231014164349354](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//android/20231014/%E8%81%9A%E5%90%88AIDL.png)





## 优缺点

| 名称            | 优点                                                         | 缺点                                                         | 适用场景                                                     |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Bundle          | 简单易用                                                     | 只能传输Bundle支持的数据类型                                 | 四大组件间的进程通信                                         |
| 文件共享        | 简单易用                                                     | 不适合高并发场景，并且无法做到进程间的实时通信               | 无并发访问的情形，交换简单的数据实时性不高的场景             |
| AIDL            | 功能强大，支持一对多并发通信，支持实时通信                   | 使用复杂，需要处理好线程同步                                 | 一对多通信且有RPC需求                                        |
| Messenger       | 功能一般，支持一对多串行通信，支持实时通信                   | 不能很好处理高并发情形，不支持PRC，数据通过Messenger进行传输，只能使用Bundle支持的数据类型 | 低并发的一对多即时通信，无RPC需求，或者无须返回结果的RPC需求 |
| ContentProvider | 在数据源访问访问功能强大，支持一对多并发数据共享，可以通过`Call`方法扩展其他操作 | 受约束的AIDL，主要提供数据源的CRUD操作                       | 一对多的进程间的数据共享                                     |
| Socket          | 功能强大，可以通过网络传输字节流，支持一对多并发实时通信     | 实现细节繁琐，不支持直接的RPC                                | 网络数据交换                                                 |





