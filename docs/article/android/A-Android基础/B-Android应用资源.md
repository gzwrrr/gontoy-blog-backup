---
title: "Android 应用资源"
shortTitle: "B-Android 应用资源"
description: "Android 应用资源"
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
  text: "Android 应用资源"
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
  title: "Android 应用资源"
  description: "Android 应用资源"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 应用资源

[[toc]]



:::warning 注意

[官方文档](https://developer.android.google.cn/guide/topics/resources/providing-resources?hl=zh-cn)

切勿将资源文件直接保存在 `res/` 目录内，否则会导致编译器错误。

注意要做适配

:::

资源是指代码使用的：

1. 附加文件
2. 静态内容：位图、布局定义、界面字符串、动画说明等

```shell
res/
	drawable/
    	graphic.png
    layout/
    	main.xml
        info.xml
   	mipmap/
    	icon.png
    values/
    	strings.xml
```

| 目录        | 资源类型                                                     |
| :---------- | :----------------------------------------------------------- |
| `animator/` | 用于定义[属性动画](https://developer.android.google.cn/guide/topics/graphics/prop-animation?hl=zh-cn)的 XML 文件。 |
| `anim/`     | 用于定义[补间动画](https://developer.android.google.cn/guide/topics/graphics/view-animation?hl=zh-cn#tween-animation)的 XML 文件。属性动画也可保存在此目录中，但为了区分这两种类型，属性动画首选 `animator/` 目录。 |
| `color/`    | 定义颜色状态列表的 XML 文件。如需了解详情，请参阅[颜色状态列表资源](https://developer.android.google.cn/guide/topics/resources/color-list-resource?hl=zh-cn)。 |
| `drawable/` | 位图文件（PNG、`.9.png`、JPG 或 GIF）或编译为以下可绘制资源子类型的 XML 文件：位图文件九宫图（可调整大小的位图）状态列表形状动画可绘制对象其他可绘制对象如需了解详情，请参阅[可绘制资源](https://developer.android.google.cn/guide/topics/resources/drawable-resource?hl=zh-cn)。 |
| `mipmap/`   | 适用于不同启动器图标密度的可绘制对象文件。如需详细了解如何使用 `mipmap/` 文件夹管理启动器图标，请参阅[将应用图标放在 mipmap 目录中](https://developer.android.google.cn/training/multiscreen/screendensities?hl=zh-cn#mipmap)。 |
| `layout/`   | 用于定义界面布局的 XML 文件。如需了解详情，请参阅[布局资源](https://developer.android.google.cn/guide/topics/resources/layout-resource?hl=zh-cn)。 |
| `menu/`     | 用于定义应用菜单（例如选项菜单、上下文菜单或子菜单）的 XML 文件。如需了解详情，请参阅[菜单资源](https://developer.android.google.cn/guide/topics/resources/menu-resource?hl=zh-cn)。 |
| `raw/`      | 需以原始形式保存的任意文件。如要使用原始 `InputStream` 打开这些资源，请使用资源 ID（即 `R.raw.*filename*`）调用 `Resources.openRawResource()`。但是，如需访问原始文件名和文件层次结构，请考虑将资源保存在 `assets/` 目录（而非 `res/raw/`）下。`assets/` 中的文件没有资源 ID，因此您只能使用 `AssetManager` 读取这些文件。 |
| `values/`   | 包含字符串、整数和颜色等简单值的 XML 文件。其他 `res/` 子目录中的 XML 资源文件会根据 XML 文件名定义单个资源，而 `values/` 目录中的文件可描述多个资源。对于此目录中的文件，`<resources>` 元素的每个子元素均会定义一个资源。例如，`<string>` 元素会创建 `R.string` 资源，`<color>` 元素会创建 `R.color` 资源。由于每个资源均使用自己的 XML 元素进行定义，因此您可以随意命名文件，并在某个文件中放入不同的资源类型。但是，您可能需要将独特的资源类型放在不同的文件中，使其一目了然。例如，对于可在此目录中创建的资源，下面给出了相应的文件名约定：`arrays.xml` 用于资源数组（[类型化数组](https://developer.android.google.cn/guide/topics/resources/more-resources?hl=zh-cn#TypedArray)）`colors.xml` 用于[颜色值](https://developer.android.google.cn/guide/topics/resources/more-resources?hl=zh-cn#Color)`dimens.xml` 用于[维度值](https://developer.android.google.cn/guide/topics/resources/more-resources?hl=zh-cn#Dimension)`strings.xml` 用于[字符串值](https://developer.android.google.cn/guide/topics/resources/string-resource?hl=zh-cn)`styles.xml` 用于[样式](https://developer.android.google.cn/guide/topics/resources/style-resource?hl=zh-cn)如需了解详情，请参阅[字符串资源](https://developer.android.google.cn/guide/topics/resources/string-resource?hl=zh-cn)、[样式资源](https://developer.android.google.cn/guide/topics/resources/style-resource?hl=zh-cn)和[更多资源类型](https://developer.android.google.cn/guide/topics/resources/more-resources?hl=zh-cn)。 |
| `xml/`      | 可在运行时通过调用 `Resources.getXML()` 读取的任意 XML 文件。各种 XML 配置文件（例如[搜索配置](https://developer.android.google.cn/guide/topics/search/searchable-config?hl=zh-cn)）都必须保存在此处。 |
| `font/`     | 带有扩展名的字体文件（例如 TTF、OTF 或 TTC），或包含 `<font-family>` 元素的 XML 文件。如需详细了解以资源形式使用的字体，请参阅[将字体添加为 XML 资源](https://developer.android.google.cn/guide/topics/ui/look-and-feel/fonts-in-xml?hl=zh-cn)。 |

> TODO 复杂 XML 资源



## 可绘制图像

1. 位图图形文件：PNG、WEBP、JPG 或 GIF， 可创建 `BitmapDrawable`。
2. 9-patch 文件：具有可伸缩区域的 PNG 文件，支持根据内容调整图像大小 (`.9.png`)。可创建 `NinePatchDrawable`。
3. 图层列表：管理其他可绘制对象数组的可绘制对象。这些可绘制对象按数组顺序绘制，因此索引最大的元素绘制于顶部。可创建 `LayerDrawable`。
4. 状态列表：此 XML 文件用于为不同状态引用不同位图图形，例如，点按按钮时使用不同图像。可创建 `StateListDrawable`。
5. 级别列表：此 XML 文件用于定义管理大量备选可绘制对象的可绘制对象，每个可绘制对象都配有最大备选数量。可创建 `LevelListDrawable`。
6. 转换可绘制对象：此 XML 文件用于定义可在两种可绘制资源之间交错淡出的可绘制对象。可创建 `TransitionDrawable`。
7. 插入可绘制对象：此 XML 文件用于定义以指定距离插入其他可绘制对象的可绘制对象。当视图需要小于视图实际边界的背景可绘制对象时，此类可绘制对象非常有用。
8. 裁剪可绘制对象：此 XML 文件用于定义对其他可绘制对象进行裁剪（根据其当前级别值）的可绘制对象。可创建 `ClipDrawable`。
9. 缩放可绘制对象：此 XML 文件用于定义更改其他可绘制对象大小（根据其当前级别值）的可绘制对象。可创建 `ScaleDrawable`。
10. 形状可绘制对象：此 XML 文件用于定义几何图形形状（包括颜色和渐变）。可创建 `GradientDrawable`。





## 资源文件 Resources

- 命名 遵循前缀表明类型的习惯，形如`type_foo_bar.xml`。例如：`fragment_contact_details.xml`，`view_primary_button.xml`，`activity_main.xml`.
- 组织布局文件 如果你不确定如何排版一个布局文件，遵循一下规则可能会有帮助。
  - 每一个属性一行，缩进4个空格
  - `android:id` 总是作为第一个属性
  - `android:layout_****` 属性在上边
  - `style` 属性在底部
  - 关闭标签`/>`单独起一行，有助于调整和添加新的属性
- 考虑使用Designtime attributes 设计时布局属性，Android Studio已经提供支持，而不是硬编码`android:text`（[参考](http://stormzhang.com/devtools/2015/01/11/android-studio-tips1/)）
- 作为一个经验法则,`android:layout_****`属性应该在 layout XML 中定义,同时其它属性`android:****` 应放在 styler XML中。此规则也有例外，不过大体工作 的很好。这个思想整体是保持layout属性(positioning, margin, sizing) 和content属性在布局文件中，同时将所有的外观细节属性（colors, padding, font）放 在style文件中。
- 尽量保持视图tree：学习如何使用RelativeLayout, 如何 optimize 你的布局 和如何使用 `<merge>` 标签.
- 小心关于WebViews的问题：如果必须显示一个web视图， 比如说对于一个新闻文章，避免做客户端处理HTML的工作， 最好让后端工程师协助，让他返回一个 「纯 HTML」。 当绑定WebViews到引用它的Activity,而不是绑定到ApplicationContext时。WebViews 也能导致内存泄露。 当使用简单的文字或按钮时，避免使用WebView，这时使用TextView或Buttons更好。





## 限定符

| 限定符   | 描述                                            |
| -------- | ----------------------------------------------- |
| `small`  | 提供给小屏幕设备的资源                          |
| `normal` | 提供给中等屏幕设备的资源                        |
| `large`  | 提供给大屏幕设备的资源                          |
| `xlarge` | 提供给超大屏幕设备的资源                        |
| `ldpi`   | 提供给低分辨率设备的资源（120 dpi以下）         |
| `mdpi`   | 提供给中等分辨率设备的资源（120 dpi~160 dpi）   |
| `hdpi`   | 提供给高分辨率设备的资源（160 dpi~240 dpi）     |
| `xhdpi`  | 提供给超高分辨率设备的资源（240 dpi~320 dpi）   |
| `xxhdpi` | 提供给超超高分辨率设备的资源（320 dpi~480 dpi） |
| `land`   | 提供给横屏设备的资源                            |
| `port`   | 提供给竖屏设备的资源                            |

:::note 说明

最小宽度限定符允许我们对屏幕的宽度指定一个最小值（以dp为单位），然后以这个最小值为临界点，屏幕宽度大于这个值的设备就加载一个布局，屏幕宽度小于这个值的设备就加载另一个布局。

例如：在res目录下新建layout-sw600dp文件夹

:::





## Drawable

Drawable表示的是一种可以在Canvas上进行绘制的抽象的概念，它的种类有很多，最常见的颜色和图片都可以是一个Drawable。

在实际开发中，Drawable常被用来作为View的背景使用。

Drawable一般都是通过XML来定义的，当然我们也可以通过代码来创建具体的Drawable对象，只是用代码创建会稍显复杂。

Drawable是一个抽象类，它是所有Drawable对象的基类，每个具体的Drawable都是它的子类，比如ShapeDrawable、BitmapDrawable等。

Drawable的种类繁多，常见的有：

| Drawable             | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| `BitmapDrawable`     | 表示一张图片，在实际开发中，我们可以直接引用原始的图片即可，但是也可以通过XML的方式来描述它，通过XML来描述的BitmapDrawable可以设置更多的效果。 |
| `ShapeDrawable`      | 通过颜色来构造的图形，它既可以是纯色的图形，也可以是具有渐变效果的图形。 |
| `LayerDrawable`      | LayerDrawable对应的XML标签是`<layer-list>`，它表示一种层次化的Drawable集合，通过将不同的Drawable放置在不同的层上面从而达到一种叠加后的效果。 |
| `StateListDrawable`  | StateListDrawable对应于`<selector>`标签，它也是表示Drawable集合，每个Drawable都对应着View的一种状态，这样系统就会根据View的状态来选择合适的Drawable。StateListDrawable主要用于设置可单击的View的背景，最常见的是Button。 |
| `LevelListDrawable`  | LevelListDrawable对应于`<level-list>`标签，它同样表示一个Drawable集合，集合中的每个Drawable都有一个等级（level）的概念。根据不同的等级，LevelListDrawable会切换为对应的Drawable。 |
| `TransitionDrawable` | TransitionDrawable对应于`<transition>`标签，它用于实现两个Drawable之间的淡入淡出效果。 |
| `InsetDrawable`      | InsetDrawable对应于`<inset>`标签，它可以将其他Drawable内嵌到自己当中，并可以在四周留出一定的间距。当一个View希望自己的背景比自己的实际区域小的时候，可以采用InsetDrawable来实现，同时我们知道，通过LayerDrawable也可以实现这种效果。 |
| `ScaleDrawable`      | ScaleDrawable对应于`<scale>`标签，它可以根据自己的等级（level）将指定的Drawable缩放到一定比例。 |
| `ClipDrawable`       | ClipDrawable对应于`<clip>`标签，它可以根据自己当前的等级（level）来裁剪另一个Drawable，裁剪方向可以通android:clipOrientation和android:gravity这两个属性来共同控制。 |







