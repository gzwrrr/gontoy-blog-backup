---
title: "Android 错误处理"
shortTitle: "Android 错误处理"
description: "Android 错误处理"
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
  text: "Android 错误处理"
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
  title: "Android 错误处理"
  description: "Android 错误处理"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 错误处理

[[toc]]





## CrashHandler

Android提供了处理崩溃的方法：

```java
public static void setDefaultUncaughtExceptionHandler(UncaughtException.Handler handler) {
    Thread.defaultUncaughtHandler = handler;
}
```

当crash发生的时候，系统就会回调UncaughtExceptionHandler的uncaughtException方法，在uncaughtException方法中就可以获取到异常信息，可以选择把异常信息存储到SD卡中，然后在合适的时机通过网络将crash信息上传到服务器上，这样开发人员就可以分析用户crash的场景从而在后面的版本中修复此类crash。

我们还可以在crash发生时，弹出一个对话框告诉用户程序crash了，然后再退出，这样做比闪退要温和一点。

```java
public class CrashHandler implements UncaughtExceptionHandler {
    private static final String TAG = "CrashHandler";
    private static final boolean DEBUG = true;
    private static final String PATH = Environment.getExternal-StorageDirectory().getPath() + "/CrashTest/log/";
    private static final String FILE_NAME = "crash";
    private static final String FILE_NAME_SUFFIX = ".trace";
    private static CrashHandler sInstance = new CrashHandler();
    private UncaughtExceptionHandler mDefaultCrashHandler;
    private Context mContext;
    
    private CrashHandler() {
    }
    
    public static CrashHandler getInstance() {
        return sInstance;
    }
    
    public void init(Context context) {
        mDefaultCrashHandler = Thread.getDefaultUncaughtExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler(this);
        mContext = context.getApplicationContext();
    }
    
    /**
     * 这个是最关键的函数，当程序中有未被捕获的异常，系统将会自动调用#uncaught￾Exception方法
     * thread为出现未捕获异常的线程，ex为未捕获的异常，有了这个ex，我们就可以得到异常信息
     */
    @Override
    public void uncaughtException(Thread thread,Throwable ex) {
        try {
            //导出异常信息到SD卡中
            dumpExceptionToSDCard(ex);
            //这里可以上传异常信息到服务器，便于开发人员分析日志从而解决bug
            uploadExceptionToServer();
        } catch (IOException e) {
            e.printStackTrace();
        }
        ex.printStackTrace();
        //如果系统提供了默认的异常处理器，则交给系统去结束程序，否则就由自己结束自己
        if (mDefaultCrashHandler != null) {
            mDefaultCrashHandler.uncaughtException(thread,ex);
        } else {
            Process.killProcess(Process.myPid());
        }
    }
    
    private void dumpExceptionToSDCard(Throwable ex) throws IOException {
        //如果SD卡不存在或无法使用，则无法把异常信息写入SD卡
        if (!Environment.getExternalStorageState().equals(Environment.
                                                          MEDIA_MOUNTED)) {
            if (DEBUG) {
                Log.w(TAG,"sdcard unmounted,skip dump exception");
                return;
            }
        }
        File dir = new File(PATH);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        long current = System.currentTimeMillis();
        String time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new
                                                                         Date(current));
        File file = new File(PATH + FILE_NAME + time + FILE_NAME_SUFFIX);
        try {
            PrintWriter pw = new PrintWriter(new BufferedWriter(new
                                                                FileWriter(file)));
            pw.println(time);
            dumpPhoneInfo(pw);
            pw.println();
            ex.printStackTrace(pw);
            pw.close();
        } catch (Exception e) {
            Log.e(TAG,"dump crash info failed");
        }
    }
    
    private void dumpPhoneInfo(PrintWriter pw)throws NameNotFoundException{
        PackageManager pm = mContext.getPackageManager();
        PackageInfo pi = pm.getPackageInfo(mContext.getPackageName(),
                                           PackageManager.GET_ACTIVITIES);
        pw.print("App Version: ");
        pw.print(pi.versionName);
        pw.print('_');
        pw.println(pi.versionCode);
        //Android版本号
        pw.print("OS Version: ");
        pw.print(Build.VERSION.RELEASE);
        pw.print("_");
        pw.println(Build.VERSION.SDK_INT);
        //手机制造商
        pw.print("Vendor: ");
        pw.println(Build.MANUFACTURER);
        //手机型号
        pw.print("Model: ");
        pw.println(Build.MODEL);
        //CPU架构
        pw.print("CPU ABI: ");
        pw.println(Build.CPU_ABI);
    }
    private void uploadExceptionToServer() {
        //TODO Upload Exception Message To Your Web Server
    }
}
```

简单使用如下：

```java
public class TestApp extends Application {
    private static TestApp sInstance;
    @Override
    public void onCreate() {
        super.onCreate();
        sInstance = this;
        //在这里为应用设置异常处理，然后程序才能获取未处理的异常
        CrashHandler crashHandler = CrashHandler.getInstance();
        crashHandler.init(this);
    }
    public static TestApp getInstance() {
        return sInstance;
    }
}
```

需要注意的是，代码中被catch的异常不会交给CrashHandler处理，CrashHandler只能收到那些未被捕获的异常。





## multidex

:::warning 注意

在Android中单个dex文件所能够包含的最大方法数为65536，这包含Android FrameWork、依赖的jar包以及应用本身的代码中的所有方法。65536是一个很大的数，一般来说一个简单应用的方法数的确很难达到65536，但是对于一些比较大型的应用来说，65536就很容易达到了。

另外一种情况有所不同，有时候方法数并没有达到65536，并且编译器也正常地完成了编译工作，但是应用在低版本手机安装时异常中止，这是dexopt导致的。dexopt是一个程序，应用在安装时，系统会通过dexopt来优化dex文件，在优化过程中dexopt采用一个固定大小的缓冲区来存储应用中所有方法的信息，这个缓冲区就是LinearAlloc。LinearAlloc缓冲区在新版本的Android系统中其大小是8MB或者16MB，但是在Android 2.2和2.3中却只有5MB，当待安装的apk中的方法数比较多时，尽管它还没有达到65536这个上限，但是它的存储空间仍然有可能超出5MB，这种情况下dexopt程序就会报错，从而导致安装失败，这种情况主要在2.x系列的手机上出现。

:::

之前很多应用都会考虑采用插件化的机制来动态加载部分dex，通过将一个dex拆分成两个或多个dex，这就在一定程度上解决了方法数越界的问题。

但是插件化是一套重量级的技术方案，并且其兼容性问题往往较多，从单纯解决方法数越界的角度来说，插件化并不是一个非常适合的方案。

为了解决这个问题，Google在2014年提出了multidex的解决方案，通过multidex可以很好地解决方法数越界的问题，并且使用起来非常简单。

:::warning 注意

在Android 5.0以前使用multidex需要引入Google提供的android-support-multidex.jar这个jar包，这个jar包可以在Android SDK目录下的`extras/android/support/multidex/library/libs`下面找到。

从Android 5.0开始，Android默认支持了multidex，它可以从apk中加载多个dex文件。

:::

在AndroidStudio和Gradle编译环境中，如果要使用multidex，首先要使用Android SDK Build Tools 21.1及以上版本，接着修改工程中app目录下的build.gradle文件，在defaultConfig中添加`multiDexEnabled true`这个配置项：

```java
android {
    compileSdkVersion 22
        buildToolsVersion "22.0.1"
        defaultConfig {
        applicationId "com.ryg.multidextest"
            minSdkVersion 8
            targetSdkVersion 22
            versionCode 1
            versionName "1.0"
            // enable multidex support
            multiDexEnabled true
    }
    ...
}
```

接着还需要在dependencies中添加multidex的依赖：compile 'com.android.support:multidex:1.0.0'：

```java
dependencies {
    compile fileTree(dir: 'libs',include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:22.1.1'
    compile 'com.android.support:multidex:1.0.0'
}
```

经过了上面的过程，还需要做另一项工作，那就是在代码中加入支持multidex的功能，这个过程是比较简单的，有三种方案可以选：

1. 在manifest文件中指定Application为MultiDexApplication
2. 让应用的Application继承MultiDexApplication
3. 重写Application的attachBaseContext方法，这个方法比Application的onCreate要先执行

```xml
<application android:name="android.support.multidex.MultiDexApplication"
             android:allowBackup="true"
             android:icon="@mipmap/ic_launcher"
             android:label="@string/app_name"
             android:theme="@style/AppTheme" >
    ...
</application>
```

```java
public class TestApplication extends MultiDexApplication {
   ...
}

public class TestApplication extends Application {
    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
}
```

采用multidex可能带来的问题：

1. 应用启动速度会降低。由于应用启动时会加载额外的dex文件，这将导致应用的启动速度降低，甚至可能出现ANR现象，尤其是其他dex文件较大的时候，因此要避免生成较大的dex文件。
2. 由于Dalvik linearAlloc的bug，这可能导致使用multidex的应用无法在Android 4.0以前的手机上运行，因此需要做大量的兼容性测试。同时由于Dalvik linearAlloc的bug，有可能出现应用在运行中由于采用了multidex方案从而产生大量的内存消耗的情况，这会导致应用崩溃（实际开发中极少遇到）





## 插件化

不同的插件化方案各有各的特色，但是它们都必须要解决三个基础性问题：

1. 资源访问
2. Activity生命周期的管理
3. ClassLoader的管理





### 资源访问

Activity的工作主要是通过ContextImpl来完成的，Activity中有一个叫mBase的成员变量，它的类型就是ContextImpl。注意到Context中有如下两个抽象方法，看起来是和资源有关的，实际上Context就是通过它们来获取资源的。这两个抽象方法的真正实现在ContextImpl中，也就是说，只要实现这两个方法，就可以解决资源问题了：

```java
/** Return an AssetManager instance for your application's package. */
public abstract AssetManager getAssets();
/** Return a Resources instance for your application's package. */
public abstract Resources getResources();
```

具体实现如下：

```java
protected void loadResources() {
    try {
        AssetManager assetManager = AssetManager.class.newInstance();
        Method addAssetPath = assetManager.getClass().getMethod ("addAssetPath",String.class);
        addAssetPath.invoke(assetManager,mDexPath);
        mAssetManager = assetManager;
    } catch (Exception e) {
        e.printStackTrace();
    }
    Resources superRes = super.getResources();
    mResources = new Resources(mAssetManager,superRes.getDisplay-Metrics(),
                               superRes.getConfiguration());
    mTheme = mResources.newTheme();
    mTheme.setTo(super.getTheme());
}
```

从loadResources()的实现可以看出，加载资源的方法是通过反射，通过调用AssetManager中的addAssetPath方法，我们可以将一个apk中的资源加载到Resources对象中，由于addAssetPath是隐藏API我们无法直接调用，所以只能通过反射。下面是它的声明，通过注释我们可以看出，传递的路径可以是zip文件也可以是一个资源目录，而apk就是一个zip，所以直接将apk的路径传给它，资源就加载到AssetManager中了。然后再通过AssetManager来创建一个新的Resources对象，通过这个对象我们就可以访问插件apk中的资源了，这样一来问题就解决了。

```java
/**
* Add an additional set of assets to the asset manager. This can be
* either a directory or ZIP file. Not for use by applications. Returns
* the cookie of the added asset,or 0 on failure.
* {@hide}
*/
public final int addAssetPath(String path) {
    synchronized (this) {
        int res = addAssetPathNative(path);
        makeStringBlocks(mStringBlocks);
        return res;
    }
}
```

接着在代理Activity中实现`getAssets()`和`getResources()`：

```java
@Override
public AssetManager getAssets() {
    return mAssetManager == null ? super.getAssets() : mAssetManager;
}

@Override
public Resources getResources() {
    return mResources == null ? super.getResources() : mResources;
}
```

通过上述这两个步骤，就可以通过R来访问插件中的资源了。



### 生命周期管理

可以使用：

1. 反射：首先通过Java的反射去获取Activity的各种生命周期方法，比如onCreate、onStart、onResume等，然后在代理Activity中去调用插件Activity对应的生命周期方法即可
2. 接口：将Activity的生命周期方法提取出来作为一个接口（比如叫DLPlugin），然后通过代理Activity去调用插件Activity的生命周期方法，这样就完成了插件Activity的生命周期管理，并且没有采用反射，这就解决了性能问题。







### 插件 ClassLoader 管理

为了更好地对多插件进行支持，需要合理地去管理各个插件的DexClassoader，这样同一个插件就可以采用同一个ClassLoader去加载类，从而避免了多个ClassLoader加载同一个类时所引发的类型转换错误。

简单实现如下：

```java
public class DLClassLoader extends DexClassLoader {
    private static final String TAG = "DLClassLoader";
    private static final HashMap<String,DLClassLoader> mPluginClassLoaders
        = new HashMap<String,DLClassLoader>();
    protected DLClassLoader(String dexPath,String optimizedDirectory,String libraryPath,ClassLoader parent) {
        super(dexPath,optimizedDirectory,libraryPath,parent);
    }
    
    /**
     * return a available classloader which belongs to different apk
     */
    public static DLClassLoader getClassLoader(String dexPath,Context context,ClassLoader parentLoader) {
        DLClassLoader dLClassLoader = mPluginClassLoaders.get(dexPath);
        if (dLClassLoader != null)
            return dLClassLoader;
        File dexOutputDir = context.getDir("dex",Context.MODE_PRIVATE);
        final String dexOutputPath = dexOutputDir.getAbsolutePath();
        dLClassLoader = new DLClassLoader(dexPath,dexOutputPath,null,
                                          parentLoader);
        mPluginClassLoaders.put(dexPath,dLClassLoader);
        return dLClassLoader;
    }
}
```

