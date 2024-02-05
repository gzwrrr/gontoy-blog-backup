---
title: "Android 缓存"
shortTitle: "Android 缓存"
description: "Android 缓存"
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
  text: "Android 缓存"
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
  title: "Android 缓存"
  description: "Android 缓存"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Android 缓存

[[toc]]



:::info 说明

目前比较常用的缓存策略是LruCache和DiskLruCache。其中LruCache常被用做内存缓存，而DiskLruCache常被用做存储缓存。

:::



## Bitmap

> Bitmap在Android中指的是一张图片，可以是png格式也可以是jpg等其他常见的图片格式。

加载图片可以使用BitmapFactory，包含四类方法：

- `decodeFile`
- `decodeResource`
- `decodeStream`
- `decodeByteArray`

其中decodeFile和decodeResource又间接调用了decodeStream方法，这四类方法最终是在Android的底层实现的，对应着BitmapFactory类的几个native方法。

高效加载Bitmap可以采用`BitmapFactory.Options`来加载所需尺寸的图片。

通过`BitmapFactory.Options`就可以按一定的采样率来加载缩小后的图片，将缩小后的图片在ImageView中显示，这样就会降低内存占用从而在一定程度上避免OOM，提高了Bitmap加载时的性能。BitmapFactory提供的加载图片的四类方法都支持`BitmapFactory.Options`参数，通过它们就可以很方便地对一个图片进行采样缩放。

通过`BitmapFactory.Options`来缩放图片，主要是用到了它的inSampleSize参数，即采样率。

获取采样率也很简单，遵循如下流程：

1. 将`BitmapFactory.Options`的inJustDecodeBounds参数设为true并加载图片。
2. 从`BitmapFactory.Options`中取出图片的原始宽高信息，它们对应于outWidth和outHeight参数。
3. 根据采样率的规则并结合目标View的所需大小计算出采样率inSampleSize。
4. 将`BitmapFactory.Options`的inJustDecodeBounds参数设为false，然后重新加载图片。

经过上面4个步骤，加载出的图片就是最终缩放后的图片。

inJustDecodeBounds参数设为true时，BitmapFactory只会解析图片的原始宽/高信息，并不会去真正地加载图片，所以这个操作是轻量级的。

BitmapFactory获取的图片宽/高信息和图片的位置以及程序运行的设备有关，比如同一张图片放在不同的drawable目录下或者程序运行在不同屏幕密度的设备上，这都可能导致BitmapFactory获取到不同的结果，之所以会出现这个现象，这和Android的资源加载机制有关。

```java
public static Bitmap decodeSampledBitmapFromResource(Resources res,int resId,
                                                     int reqWidth,int reqHeight) {
    // First decode with inJustDecodeBounds=true to check dimensions
    final BitmapFactory.Options options = new BitmapFactory.Options();
    options.inJustDecodeBounds = true;
    BitmapFactory.decodeResource(res,resId,options);
    // Calculate inSampleSize
    options.inSampleSize = calculateInSampleSize(options,reqWidth,reqHeight);
    // Decode bitmap with inSampleSize set
    options.inJustDecodeBounds = false;
    return BitmapFactory.decodeResource(res,resId,options);
}

public static int calculateInSampleSize(BitmapFactory.Options options,int reqWidth,int reqHeight) {
    // Raw height and width of image
    final int height = options.outHeight;
    final int width = options.outWidth;
    int inSampleSize = 1;
    if (height > reqHeight || width > reqWidth) {
        final int halfHeight = height / 2;
        final int halfWidth = width / 2;
        // Calculate the largest inSampleSize value that is a power of 2 and
        keeps both
            // height and width larger than the requested height and width.
            while ((halfHeight / inSampleSize) => reqHeight
                   && (halfWidth / inSampleSize) => reqWidth) {
                inSampleSize *= 2;
            }
    }
    return inSampleSize;
}
```

有了上面的两个方法，实际使用的时候就很简单了，比如ImageView所期望的图片大小为100×100像素，这个时候就可以通过如下方式高效地加载并显示图片：

```java
mImageView.setImageBitmap(decodeSampledBitmapFromResource(getResources(),R.id.myimage,100,100));
```





## 缓存策略



### LruCache

:::warning 注意

LruCache是Android 3.1所提供的一个缓存类，通过support-v4兼容包可以兼容到早期的Android版本，目前Android 2.2以下的用户量已经很少了，因此我们开发的应用兼容到Android 2.2就已经足够了。

为了能够兼容Android 2.2版本，在使用LruCache时建议采用support-v4兼容包中提供的LruCache，而不要直接使用Android 3.1提供的LruCache。

:::

LruCache是一个泛型类，它内部采用一个LinkedHashMap以强引用的方式存储外界的缓存对象，其提供了get和put方法来完成缓存的获取和添加操作，当缓存满时，LruCache会移除较早使用的缓存对象，然后再添加新的缓存对象。

LruCache是线程安全的。简单使用如下：

```java
int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);
int cacheSize = maxMemory / 8;
mMemoryCache = new LruCache<String,Bitmap>(cacheSize) {
    @Override
    protected int sizeOf(String key,Bitmap bitmap) {
        // 单位为kB
        return bitmap.getRowBytes() * bitmap.getHeight() / 1024;
    }
};
```

一些特殊情况下，还需要重写LruCache的entryRemoved方法，LruCache移除旧缓存时会调用entryRemoved方法，因此可以在entryRemoved中完成一些资源回收工作。





### DiskLruCache

:::warning 注意

DiskLruCache用于实现存储设备缓存，即磁盘缓存，它通过将缓存对象写入文件系统从而实现缓存的效果。

DiskLruCache并不是Android SDK中的一部分（[源码戳这](https://android.googlesource.com/platform/libcore/+/android-4.1.1_r1/luni/src/main/java/libcore/io/DiskLruCache.java)）

从上述网址获取的DiskLruCache的源码并不能直接在Android中使用，需要稍微修改编译错误。

:::

DiskLruCache并不能通过构造方法来创建，它提供了open方法用于创建自身：

```java
/**
 * directory：磁盘缓存在文件系统中的存储路径。缓存路径可以选择SD卡上的缓存目录。
 * 具体是指/sdcard/Android/data/package_name/cache目录，其中package_name表示当前应用的包名，当应用被卸载后，此目录会一并被删除。
 * 当然也可以选择SD卡上的其他指定目录，还可以选择data下的当前应用的目录，具体可根据需要灵活设定。
 * 如果应用卸载后就希望删除缓存文件，那么就选择SD卡上的缓存目录，如果希望保留缓存数据那就应该选择SD卡上的其他特定目录。
 * 
 * appVersion：应用的版本号，一般设为1即可。当版本号发生改变时DiskLruCache会清空之前所有的缓存文件。
 * 而这个特性在实际开发中作用并不大，很多情况下即使应用的版本号发生了改变缓存文件却仍然是有效的，因此这个参数设为1比较好。
 *
 * valueCount：单个节点所对应的数据的个数，一般设为1即可。
 *
 * maxSize：缓存的总大小，当缓存大小超出这个设定值后，DiskLruCache会清除一些缓存从而保证总大小不大于这个设定值。
 *
 */
public static DiskLruCache open(File directory,int appVersion,int valueCount,long maxSize)
```

简单使用如下：

```java
private static final long DISK_CACHE_SIZE = 1024 * 1024 * 50; //50MB

File diskCacheDir = getDiskCacheDir(mContext,"bitmap");
if (!diskCacheDir.exists()) {
    diskCacheDir.mkdirs();
}

mDiskLruCache = DiskLruCache.open(diskCacheDir,1,1,DISK_CACHE_SIZE);
```

DiskLruCache的缓存添加的操作是通过Editor完成的，Editor表示一个缓存对象的编辑对象。

拿图片举例：首先需要获取图片url所对应的key，然后根据key就可以通过edit()来获取Editor对象，如果这个缓存正在被编辑，那么edit()会返回null，即DiskLruCache不允许同时编辑一个缓存对象。

之所以要把url转换成key，是因为图片的url中很可能有特殊字符，这将影响url在Android中直接使用，一般采用url的md5值作为key：

```java
private String hashKeyFormUrl(String url) {
    String cacheKey;
    try {
        final MessageDigest mDigest = MessageDigest.getInstance("MD5");
        mDigest.update(url.getBytes());
        cacheKey = bytesToHexString(mDigest.digest());
    } catch (NoSuchAlgorithmException e) {
        cacheKey = String.valueOf(url.hashCode());
    }
    return cacheKey;
}

private String bytesToHexString(byte[] bytes) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < bytes.length; i++) {
        String hex = Integer.toHexString(0xFF & bytes[i]);
        if (hex.length() == 1) {
            sb.append('0');
        }
        sb.append(hex);
    }
    return sb.toString();
}
```

将图片的url转成key以后，就可以获取Editor对象了。对于这个key来说，如果当前不存在其他Editor对象，那么edit()就会返回一个新的Editor对象，通过它就可以得到一个文件输出流。

由于前面在DiskLruCache的open方法中设置了一个节点只能有一个数据，因此下面的DISK_CACHE_INDEX常量直接设为0即可：

```java
String key = hashKeyFormUrl(url);
DiskLruCache.Editor editor = mDiskLruCache.edit(key);
if (editor != null) {
    OutputStream outputStream = editor.newOutputStream(DISK_CACHE_INDEX);
}
```

当从网络下载图片时，图片就可以通过这个文件输出流写入到文件系统上：

```java
public boolean downloadUrlToStream(String urlString,OutputStream outputStream) {
    HttpURLConnection urlConnection = null;
    BufferedOutputStream out = null;
    BufferedInputStream in = null;
    try {
        final URL url = new URL(urlString);
        urlConnection = (HttpURLConnection) url.openConnection();
        in = new BufferedInputStream(urlConnection.getInputStream(),
                                     IO_BUFFER_SIZE);
        out = new BufferedOutputStream(outputStream,IO_BUFFER_SIZE);
        int b;
        while ((b = in.read()) != -1) {
            out.write(b);
        }
        return true;
    } catch (IOException e) {
        Log.e(TAG,"downloadBitmap failed." + e);
    } finally {
        if (urlConnection != null) {
            urlConnection.disconnect();
        }
        MyUtils.close(out);
        MyUtils.close(in);
    }
    return false;
}
```

经过上面的步骤，其实并没有真正地将图片写入文件系统，还必须通过Editor的`commit()`来提交写入操作，如果图片下载过程发生了异常，那么还可以通过Editor的`abort()`来回退整个操作：

```java
OutputStream outputStream = editor.newOutputStream(DISK_CACHE_INDEX);
if (downloadUrlToStream(url,outputStream)) {
    editor.commit();
} else {
    editor.abort();
}
mDiskLruCache.flush();
```

和缓存的添加过程类似，缓存查找过程也需要将url转换为key，然后通过DiskLruCache的`get`方法得到一个Snapshot对象，接着再通过Snapshot对象即可得到缓存的文件输入流，有了文件输出流，自然就可以得到Bitmap对象了。

为了避免加载图片过程中导致的OOM问题，一般不建议直接加载原始图片。

通过`BitmapFactory.Options`对象来加载一张缩放后的图片时，对FileInputStream的缩放存在问题，原因是FileInputStream是一种有序的文件流，而两次decodeStream调用影响了文件流的位置属性，导致了第二次decodeStream时得到的是null。

为了解决这个问题，可以通过文件流来得到它所对应的文件描述符，然后再通过BitmapFactory.decodeFileDescriptor方法来加载一张缩放后的图片。

```java
Bitmap bitmap = null;
String key = hashKeyFormUrl(url);
DiskLruCache.Snapshot snapShot = mDiskLruCache.get(key);
if (snapShot != null) {
    FileInputStream fileInputStream = (FileInputStream)snapShot.getInput- Stream(DISK_CACHE_INDEX);
    FileDescriptor fileDescriptor = fileInputStream.getFD();
    bitmap = mImageResizer.decodeSampledBitmapFromFileDescriptor (fileDescriptor,
                                                                  reqWidth,reqHeight);
    if (bitmap != null) {
        addBitmapToMemoryCache(key,bitmap);
    }
}
```





## 实现 ImageLoader

ImageLoader应该具备如下功能：

- 图片的同步加载：以同步的方式向调用者提供所加载的图片，这个图片可能是从内存缓存中读取的，也可能是从磁盘缓存中读取的，还可能是从网络拉取的。
- 图片的异步加载：内部在线程中加载图片并将图片设置给所需的ImageView。
- 图片压缩：是降低OOM概率的有效手段。
- 内存缓存与磁盘缓存：ImageLoader 的核心在于这两级缓存。
- 网络拉取

:::warning 注意

除此之外，ImageLoader还需要处理一些特殊的情况，比如在ListView或者GridView中，View复用既是它们的优点也是它们的缺点，优点想必读者都很清楚了，那缺点可能还不太清楚。考虑一种情况，在ListView或者GridView中，假设一个item A正在从网络加载图片，它对应的ImageView为A，这个时候用户快速向下滑动列表，很可能item B复用了ImageView A，然后等了一会之前的图片下载完毕了。如果直接给ImageView A设置图片，由于这个时候ImageView A被item B所复用，但是item B要显示的图片显然不是itemA刚刚下载好的图片，这个时候就会出现itemB中显示了itemA的图片，这就是常见的列表的错位问题，ImageLoader需要正确地处理这些特殊情况。

:::



### 图片压缩

```java
public class ImageResizer {
    private static final String TAG = "ImageResizer";
    public ImageResizer() {
    }
    public Bitmap decodeSampledBitmapFromResource(Resources res,
                                                  int resId,int reqWidth,int reqHeight) {
        // First decode with inJustDecodeBounds=true to check dimensions
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeResource(res,resId,options);
        // Calculate inSampleSize
        options.inSampleSize = calculateInSampleSize(options,reqWidth,reqHeight);
        // Decode bitmap with inSampleSize set
        options.inJustDecodeBounds = false;
        return BitmapFactory.decodeResource(res,resId,options);
    }
    public Bitmap decodeSampledBitmapFromFileDescriptor(FileDescriptor fd,
                                                        int reqWidth,int reqHeight) {
        // First decode with inJustDecodeBounds=true to check dimensions
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeFileDescriptor(fd,null,options);
        // Calculate inSampleSize
        options.inSampleSize = calculateInSampleSize(options,reqWidth,reqHeight);
        // Decode bitmap with inSampleSize set
        options.inJustDecodeBounds = false;
        return BitmapFactory.decodeFileDescriptor(fd,null,options);
    }
    public int calculateInSampleSize(BitmapFactory.Options options,
                                     int reqWidth,int reqHeight) {
        if (reqWidth == 0 || reqHeight == 0) {
            return 1;
        }
        // Raw height and width of image
        final int height = options.outHeight;
        final int width = options.outWidth;
        Log.d(TAG,"origin,w=" + width + " h=" + height);
        int inSampleSize = 1;
        if (height > reqHeight || width > reqWidth) {
            final int halfHeight = height / 2;
            final int halfWidth = width / 2;
            // Calculate the largest inSampleSize value that is a power of 2
            and
                // keeps both
                // height and width larger than the requested height and width.
                while ((halfHeight / inSampleSize) => reqHeight
                       && (halfWidth / inSampleSize) => reqWidth) {
                    inSampleSize *= 2;
                }
        }
        Log.d(TAG,"sampleSize:" + inSampleSize);
        return inSampleSize;
    }
}
```





### 内存缓存与磁盘缓存

```java
private LruCache<String,Bitmap> mMemoryCache;
private DiskLruCache mDiskLruCache;
private ImageLoader(Context context) {
    mContext = context.getApplicationContext();
    int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);
    int cacheSize = maxMemory / 8;
    mMemoryCache = new LruCache<String,Bitmap>(cacheSize) {
        @Override
        protected int sizeOf(String key,Bitmap bitmap) {
            return bitmap.getRowBytes() * bitmap.getHeight() / 1024;
        }
    };
    File diskCacheDir = getDiskCacheDir(mContext,"bitmap");
    if (!diskCacheDir.exists()) {
        diskCacheDir.mkdirs();
    }
    if (getUsableSpace(diskCacheDir) > DISK_CACHE_SIZE) {
        try {
            mDiskLruCache = DiskLruCache.open(diskCacheDir,1,1,
                                              DISK_CACHE_SIZE);
            mIsDiskLruCacheCreated = true;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

private void addBitmapToMemoryCache(String key,Bitmap bitmap) {
    if (getBitmapFromMemCache(key) == null) {
        mMemoryCache.put(key,bitmap);
    }
}

private Bitmap getBitmapFromMemCache(String key) {
    return mMemoryCache.get(key);
}

private Bitmap loadBitmapFromHttp(String url,int reqWidth,int reqHeight)
    throws IOException {
    if (Looper.myLooper() == Looper.getMainLooper()) {
        throw new RuntimeException("can not visit network from UI Thread.");
    }
    if (mDiskLruCache == null) {
        return null;
    }
    String key = hashKeyFormUrl(url);
    DiskLruCache.Editor editor = mDiskLruCache.edit(key);
    if (editor != null) {
        OutputStream outputStream = editor.newOutputStream(DISK_CACHE_INDEX);
        if (downloadUrlToStream(url,outputStream)) {
            editor.commit();
        } else {
            editor.abort();
        }
        mDiskLruCache.flush();
    }
    return loadBitmapFromDiskCache(url,reqWidth,reqHeight);
}

private Bitmap loadBitmapFromDiskCache(String url,int reqWidth,
                                       int reqHeight) throws IOException {
    if (Looper.myLooper() == Looper.getMainLooper()) {
        Log.w(TAG,"load bitmap from UI Thread,it's not recommended!");
    }
    if (mDiskLruCache == null) {
        return null;
    }
    Bitmap bitmap = null;
    String key = hashKeyFormUrl(url);
    DiskLruCache.Snapshot snapShot = mDiskLruCache.get(key);
    if (snapShot != null) {
        FileInputStream fileInputStream = (FileInputStream)snapShot.getInputStream(DISK_CACHE_INDEX);
        FileDescriptor fileDescriptor = fileInputStream.getFD();
        bitmap = mImageResizer.decodeSampledBitmapFromFileDescriptor(fileDescriptor,
                                                                     reqWidth,reqHeight);
        if (bitmap != null) {
            addBitmapToMemoryCache(key,bitmap);
        }
    }
    return bitmap;
}
```





### 同步加载与异步加载

```java
/**
* load bitmap from memory cache or disk cache or network.
* @param uri http url
* @param reqWidth the width ImageView desired
* @param reqHeight the height ImageView desired
* @return bitmap,maybe null.
*/
public Bitmap loadBitmap(String uri,int reqWidth,int reqHeight) {
    Bitmap bitmap = loadBitmapFromMemCache(uri);
    if (bitmap != null) {
        Log.d(TAG,"loadBitmapFromMemCache,url:" + uri);
        return bitmap;
    }
    try {
        bitmap = loadBitmapFromDiskCache(uri,reqWidth,reqHeight);
        if (bitmap != null) {
            Log.d(TAG,"loadBitmapFromDisk,url:" + uri);
            return bitmap;
        }
        bitmap = loadBitmapFromHttp(uri,reqWidth,reqHeight);
        Log.d(TAG,"loadBitmapFromHttp,url:" + uri);
    } catch (IOException e) {
        e.printStackTrace();
    }
    if (bitmap == null && !mIsDiskLruCacheCreated) {
        Log.w(TAG,"encounter error,DiskLruCache is not created.");
        bitmap = downloadBitmapFromUrl(uri);
    }
    return bitmap;
}

// 异步加载
public void bindBitmap(final String uri,final ImageView imageView,
                       final int reqWidth,final int reqHeight) {
    imageView.setTag(TAG_KEY_URI,uri);
    Bitmap bitmap = loadBitmapFromMemCache(uri);
    if (bitmap != null) {
        imageView.setImageBitmap(bitmap);
        return;
    }
    Runnable loadBitmapTask = new Runnable() {
        @Override
        public void run() {
            Bitmap bitmap = loadBitmap(uri,reqWidth,reqHeight);
            if (bitmap != null) {
                LoaderResult result = new LoaderResult(imageView,uri,bitmap);
                mMainHandler.obtainMessage(MESSAGE_POST_RESULT,result).sendToTarget();
            }
        }
    };
    THREAD_POOL_EXECUTOR.execute(loadBitmapTask);
}
```

:::info 说明

从bindBitmap的实现来看，bindBitmap方法会尝试从内存缓存中读取图片，如果读取成功就直接返回结果，否则会在线程池中去调用loadBitmap方法，当图片加载成功后再将图片、图片的地址以及需要绑定的imageView封装成一个LoaderResult对象，然后再通过mMainHandler向主线程发送一个消息，这样就可以在主线程中给imageView设置图片了，之所以通过Handler来中转是因为子线程无法访问UI。

:::

bindBitmap中用到了线程池和Handler，可以看出它的核心线程数为当前设备的CPU核心数加1，最大容量为CPU核心数的2倍加1，线程闲置超时时长为10秒：

```java
private static final int CORE_POOL_SIZE = CPU_COUNT + 1;
private static final int MAXIMUM_POOL_SIZE = CPU_COUNT * 2 + 1;
private static final long KEEP_ALIVE = 10L;

private static final ThreadFactory sThreadFactory = new ThreadFactory() {
    private final AtomicInteger mCount = new AtomicInteger(1);
    public Thread newThread(Runnable r) {
        return new Thread(r,"ImageLoader#" + mCount.getAndIncrement());
    }
};

public static final Executor THREAD_POOL_EXECUTOR = new ThreadPoolExecutor(
    CORE_POOL_SIZE,MAXIMUM_POOL_SIZE,
    KEEP_ALIVE,TimeUnit.SECONDS,
    new LinkedBlockingQueue<Runnable>(),sThreadFactory);
```

Handler的实现如下：

```java
private Handler mMainHandler = new Handler(Looper.getMainLooper()) {
    @Override
    public void handleMessage(Message msg) {
        LoaderResult result = (LoaderResult) msg.obj;
        ImageView imageView = result.imageView;
        imageView.setImageBitmap(result.bitmap);
        String uri = (String) imageView.getTag(TAG_KEY_URI);
        if (uri.equals(result.uri)) {
            imageView.setImageBitmap(result.bitmap);
        } else {
            Log.w(TAG,"set image bitmap,but url has changed,ignored!");
        }
    };
};
```

ImageLoader直接采用主线程的Looper来构造Handler对象，这就使得ImageLoader可以在非主线程中构造了。另外为了解决由于View复用所导致的列表错位这一问题，在给ImageView设置图片之前都会检查它的url有没有发生改变，如果发生改变就不再给它设置图片，这样就解决了列表错位的问题。





### 完整实现

```java
public class ImageLoader {
    private static final String TAG = "ImageLoader";
    public static final int MESSAGE_POST_RESULT = 1;
    private static final int CPU_COUNT = Runtime.getRuntime().available-Processors();
    private static final int CORE_POOL_SIZE = CPU_COUNT + 1;
    private static final int MAXIMUM_POOL_SIZE = CPU_COUNT * 2 + 1;
    private static final long KEEP_ALIVE = 10L;
    private static final int TAG_KEY_URI = R.id.imageloader_uri;
    private static final long DISK_CACHE_SIZE = 1024 * 1024 * 50;
    private static final int IO_BUFFER_SIZE = 8 * 1024;
    private static final int DISK_CACHE_INDEX = 0;
    private boolean mIsDiskLruCacheCreated = false;
    
    private static final ThreadFactory sThreadFactory = new ThreadFactory() {
        private final AtomicInteger mCount = new AtomicInteger(1);
        public Thread newThread(Runnable r) {
            return new Thread(r,"ImageLoader#" + mCount.getAndIncrement());
        }
    };
    
    public static final Executor THREAD_POOL_EXECUTOR = new ThreadPool￾Executor(
        CORE_POOL_SIZE,MAXIMUM_POOL_SIZE,
        KEEP_ALIVE,TimeUnit.SECONDS,
        new LinkedBlockingQueue<Runnable>(),sThreadFactory);
    
    private Handler mMainHandler = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {
            LoaderResult result = (LoaderResult) msg.obj;
            ImageView imageView = result.imageView;
            imageView.setImageBitmap(result.bitmap);
            String uri = (String) imageView.getTag(TAG_KEY_URI);
            if (uri.equals(result.uri)) {
                imageView.setImageBitmap(result.bitmap);
            } else {
                Log.w(TAG,"set image bitmap,but url has changed,ignored!");
            }
        };
    };
    
    private Context mContext;
    private ImageResizer mImageResizer = new ImageResizer();
    private LruCache<String,Bitmap> mMemoryCache;
    private DiskLruCache mDiskLruCache;
    private ImageLoader(Context context) {
        mContext = context.getApplicationContext();
        int maxMemory = (int) (Runtime.getRuntime().maxMemory() / 1024);
        int cacheSize = maxMemory / 8;
        mMemoryCache = new LruCache<String,Bitmap>(cacheSize) {
            @Override
            protected int sizeOf(String key,Bitmap bitmap) {
                return bitmap.getRowBytes() * bitmap.getHeight() / 1024;
            }
        };
        File diskCacheDir = getDiskCacheDir(mContext,"bitmap");
        if (!diskCacheDir.exists()) {
            diskCacheDir.mkdirs();
        }
        if (getUsableSpace(diskCacheDir) > DISK_CACHE_SIZE) {
            try {
                mDiskLruCache = DiskLruCache.open(diskCacheDir,1,1,
                                                  DISK_CACHE_SIZE);
                mIsDiskLruCacheCreated = true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * build a new instance of ImageLoader
     * @param context
     * @return a new instance of ImageLoader
     */
    public static ImageLoader build(Context context) {
        return new ImageLoader(context);
    }
    private void addBitmapToMemoryCache(String key,Bitmap bitmap) {
        if (getBitmapFromMemCache(key) == null) {
            mMemoryCache.put(key,bitmap);
        }
    }
    private Bitmap getBitmapFromMemCache(String key) {
        return mMemoryCache.get(key);
    }
    
    /**
     * load bitmap from memory cache or disk cache or network async,then bind imageView and bitmap.
     * NOTE THAT: should run in UI Thread
     * @param uri http url
	 * @param imageView bitmap's bind object
	 */
    public void bindBitmap(final String uri,final ImageView imageView) {
        bindBitmap(uri,imageView,0,0);
    }
    
    public void bindBitmap(final String uri,final ImageView imageView,
                           final int reqWidth,final int reqHeight) {
        imageView.setTag(TAG_KEY_URI,uri);
        Bitmap bitmap = loadBitmapFromMemCache(uri);
        if (bitmap != null) {
            imageView.setImageBitmap(bitmap);
            return;
        }
        Runnable loadBitmapTask = new Runnable() {
            @Override
            public void run() {
                Bitmap bitmap = loadBitmap(uri,reqWidth,reqHeight);
                if (bitmap != null) {
                    LoaderResult result = new LoaderResult(imageView,uri,
                                                           bitmap);
                    mMainHandler.obtainMessage(MESSAGE_POST_RESULT,result).
                        sendToTarget();
                }
            }
        };
        THREAD_POOL_EXECUTOR.execute(loadBitmapTask);
    }
    
    /**
     * load bitmap from memory cache or disk cache or network.
     * @param uri http url
     * @param reqWidth the width ImageView desired
     * @param reqHeight the height ImageView desired
     * @return bitmap,maybe null.
     */
    public Bitmap loadBitmap(String uri,int reqWidth,int reqHeight) {
        Bitmap bitmap = loadBitmapFromMemCache(uri);
        if (bitmap != null) {
            Log.d(TAG,"loadBitmapFromMemCache,url:" + uri);
            return bitmap;
        }
        try {
            bitmap = loadBitmapFromDiskCache(uri,reqWidth,reqHeight);
            if (bitmap != null) {
                Log.d(TAG,"loadBitmapFromDisk,url:" + uri);
                return bitmap;
            }
            bitmap = loadBitmapFromHttp(uri,reqWidth,reqHeight);
            Log.d(TAG,"loadBitmapFromHttp,url:" + uri);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (bitmap == null && !mIsDiskLruCacheCreated) {
            Log.w(TAG,"encounter error,DiskLruCache is not created.");
            bitmap = downloadBitmapFromUrl(uri);
        }
        return bitmap;
    }
    
    private Bitmap loadBitmapFromMemCache(String url) {
        final String key = hashKeyFormUrl(url);
        Bitmap bitmap = getBitmapFromMemCache(key);
        return bitmap;
    }
    
    private Bitmap loadBitmapFromHttp(String url,int reqWidth,int reqHeight) throws IOException {
        if (Looper.myLooper() == Looper.getMainLooper()) {
            throw new RuntimeException("can not visit network from UI Thread.");
        }
        if (mDiskLruCache == null) {
            return null;
        }
        String key = hashKeyFormUrl(url);
        DiskLruCache.Editor editor = mDiskLruCache.edit(key);
        if (editor != null) {
            OutputStream outputStream = editor.newOutputStream(DISK_CACHE_
                                                               INDEX);
            if (downloadUrlToStream(url,outputStream)) {
                editor.commit();
            } else {
                editor.abort();
            }
            mDiskLruCache.flush();
        }
        return loadBitmapFromDiskCache(url,reqWidth,reqHeight);
    }
    
    private Bitmap loadBitmapFromDiskCache(String url,int reqWidth,
                                           int reqHeight) throws IOException {
        if (Looper.myLooper() == Looper.getMainLooper()) {
            Log.w(TAG,"load bitmap from UI Thread,it's not recommended!");
        }
        if (mDiskLruCache == null) {
            return null;
        }
        Bitmap bitmap = null;
        String key = hashKeyFormUrl(url);
        DiskLruCache.Snapshot snapShot = mDiskLruCache.get(key);
        if (snapShot != null) {
            FileInputStream fileInputStream = (FileInputStream)snapShot.
                getInputStream(DISK_CACHE_INDEX);
            FileDescriptor fileDescriptor = fileInputStream.getFD();
            bitmap = mImageResizer.decodeSampledBitmapFromFileDescriptor
                (fileDescriptor,reqWidth,reqHeight);
            if (bitmap != null) {
                addBitmapToMemoryCache(key,bitmap);
            }
        }
        return bitmap;
    }
    
    public boolean downloadUrlToStream(String urlString,
                                       OutputStream outputStream) {
        HttpURLConnection urlConnection = null;
        BufferedOutputStream out = null;
        BufferedInputStream in = null;
        try {
            final URL url = new URL(urlString);
            urlConnection = (HttpURLConnection) url.openConnection();
            in = new BufferedInputStream(urlConnection.getInputStream(),
                                         IO_BUFFER_SIZE);
            out = new BufferedOutputStream(outputStream,IO_BUFFER_SIZE);
            int b;
            while ((b = in.read()) != -1) {
                out.write(b);
            }
            return true;
        } catch (IOException e) {
            Log.e(TAG,"downloadBitmap failed." + e);
        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
            MyUtils.close(out);
            MyUtils.close(in);
        }
        return false;
    }
    
    private Bitmap downloadBitmapFromUrl(String urlString) {
        Bitmap bitmap = null;
        HttpURLConnection urlConnection = null;
        BufferedInputStream in = null;
        try {
            final URL url = new URL(urlString);
            urlConnection = (HttpURLConnection) url.openConnection();
            in = new BufferedInputStream(urlConnection.getInputStream(),
                                         IO_BUFFER_SIZE);
            bitmap = BitmapFactory.decodeStream(in);
        } catch (final IOException e) {
            Log.e(TAG,"Error in downloadBitmap: " + e);
        } finally {
            if (urlConnection != null) {
                urlConnection.disconnect();
            }
            MyUtils.close(in);
        }
        return bitmap;
    }
    
    private String hashKeyFormUrl(String url) {
        String cacheKey;
        try {
            final MessageDigest mDigest = MessageDigest.getInstance("MD5");
            mDigest.update(url.getBytes());
            cacheKey = bytesToHexString(mDigest.digest());
        } catch (NoSuchAlgorithmException e) {
            cacheKey = String.valueOf(url.hashCode());
        }
        return cacheKey;
    }
    
    private String bytesToHexString(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            String hex = Integer.toHexString(0xFF & bytes[i]);
            if (hex.length() == 1) {
                sb.append('0');
            }
            sb.append(hex);
        }
        return sb.toString();
    }
    
    public File getDiskCacheDir(Context context,String uniqueName) {
        boolean externalStorageAvailable = Environment
            .getExternalStorageState().equals(Environment.MEDIA_MOUNTED);
        final String cachePath;
        if (externalStorageAvailable) {
            cachePath = context.getExternalCacheDir().getPath();
        } else {
            cachePath = context.getCacheDir().getPath();
        }
        return new File(cachePath + File.separator + uniqueName);
    }
    
    @TargetApi(VERSION_CODES.GINGERBREAD)
    private long getUsableSpace(File path) {
        if (Build.VERSION.SDK_INT => VERSION_CODES.GINGERBREAD) {
            return path.getUsableSpace();
        }
        final StatFs stats = new StatFs(path.getPath());
        return (long) stats.getBlockSize() * (long) stats.getAvailableBlocks();
    }
    
    private static class LoaderResult {
        public ImageView imageView;
        public String uri;
        public Bitmap bitmap;
        public LoaderResult(ImageView imageView,String uri,Bitmap bitmap) {
            this.imageView = imageView;
            this.uri = uri;
            this.bitmap = bitmap;
        }
    }
}
```

