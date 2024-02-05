---
title: "Android 界面绘制"
shortTitle: "G-Android 界面绘制"
description: "Android 界面绘制"
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
  text: "Android 界面绘制"
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
  title: "Android 界面绘制"
  description: "Android 界面绘制"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 界面绘制

[[toc]]



:::info 相关文章

[可绘制资源](https://developer.android.google.cn/guide/topics/resources/drawable-resource?hl=zh-cn#LayerList)

:::

> 控件都可以称为 View 或者视图

两种方式：

1. XML
2. 硬编码

两种 API：

1. View（自定义 View）
2. Compose

界面的构成（使用 UDF 管理，状态向下流动、事件向上流动的这种模式称为单向数据流 (UDF)）：

1. 元素
2. 状态

中级控件

高级控件

自定义控件



## 属性前缀

在 Android 开发中，XML 布局文件中的属性通常具有前缀，这些前缀指示属性所属的命名空间或属性类别。以下是一些常见的前缀及其含义：

1. **android:**：这个前缀用于指示属性是 Android 系统提供的属性，用于控制 Android 系统提供的特定行为或外观。
2. **app:**：这个前缀通常用于自定义属性，特别是用于自定义 View 或组件时。您可以使用此前缀为自定义组件定义属性，以实现特定的行为或外观。
3. **tools:**：这个前缀用于指定仅在布局预览中使用的属性。您可以使用这些属性来提高布局文件的可读性或优化布局的预览效果，而不会影响最终应用的实际行为。

除了这些常见的前缀之外，有时也可以遇到其他前缀，特别是针对特定的库、框架或自定义组件。您可以在相关文档中找到关于这些前缀的信息。

要自定义前缀，需要在定义属性时使用自己定义的命名空间。例如，如果要为自定义组件定义属性，可以在 XML 文件中声明一个新的命名空间，然后在属性中使用这个命名空间作为前缀。确保在使用自定义前缀时遵循 XML 的命名空间规范，并确保在整个应用中使用一致的前缀命名约定。



## UDF

状态向下流动、事件向上流动的这种模式称为单向数据流 (UDF)。这种模式对应用架构的影响如下：

- ViewModel 会存储并公开界面要使用的状态。界面状态是经过 ViewModel 转换的应用数据。
- 界面会向 ViewModel 发送用户事件通知。
- ViewModel 会处理用户操作并更新状态。
- 更新后的状态将反馈给界面以进行呈现。
- 系统会对导致状态更改的所有事件重复上述操作。

换句话说，UDF 有助于实现以下几点：

- **数据一致性**。界面只有一个可信来源。
- **可测试性**。状态来源是独立的，因此可独立于界面进行测试。
- **可维护性**。状态的更改遵循明确定义的模式，即状态更改是用户事件及其数据拉取来源共同作用的结果。

如需关于将 `LiveData` 用作可观察数据容器的介绍，请参阅[此 Codelab](https://developer.android.google.cn/codelabs/basic-android-kotlin-training-livedata?hl=zh-cn)。如需关于 Kotlin 数据流的类似介绍，请参阅 [Android 上的 Kotlin 数据流](https://developer.android.google.cn/kotlin/flow?hl=zh-cn)。



## 用户事件

如果用户事件与修改界面元素的状态（如可展开项的状态）相关，界面便可以直接处理这些事件。如果事件需要执行业务逻辑（如刷新屏幕上的数据），则应用由 ViewModel 处理此事件。



## 尺寸

:::info 相关文章

[Android中的常用尺寸单位（dp、sp）快速入门教程](https://www.jb51.net/article/113125.htm)

:::

| 单位/概念  | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| px         | 像素（Pixel），是屏幕上的最小可操作单元，通常用于表示图像或屏幕上的点 |
| resolution | 分辨率，表示屏幕上水平和垂直方向的像素数量，通常以宽x高的形式表示，例如1920x1080 |
| dpi        | 每英寸点数（Dots Per Inch），表示每英寸的线性像素密度，用于测量屏幕或图像的清晰度 |
| density    | 密度，通常指屏幕像素密度或显示设备的像素密度，通常以DPI（每英寸点数）表示 |
| inch       | 英寸，1 英寸约等于2.54厘米，主要用来描述手机屏幕的大小       |
| pt         | 通常用来作为字体的尺寸单位，1 pt相当于1/72英寸               |
| sp         | 大部分人只知道它通常用作字体的尺寸单位，实际大小还与具体设备上的用户设定有关 |
| dp（dip）  | 即设备无关像素（device independent pixels），这种尺寸单位在不同设备上的物理大小相同 |

- `dpi`：像素密度

- `ldpi`：对应的dpi范围为0 ~ 120，也就是说每英寸有0到120个像素点的屏幕的屏幕密度都属于
- `mdpi`：dpi范围为120 ~ 160
- `hdpi`：dpi范围为160 ~ 240
- `xhdpi`：dpi范围为240~320
- `xxhdpi`：dpi范围为320~480
- `px = dip x dpi / 160`

:::warning 注意

对于相同尺寸的手机，即使分辨率不一样，同 dp 的组件占用屏幕的比例也相同

:::



## 视图/布局

视图：

1. `ScrollView` 垂直滚动视图
2. `HorizontalScrollView` 水平滚动视图

布局（可以自定义后引入，组件化思想）：

1. `LinearLayout` 线性布局：水平、垂直、权重
2. `RelativeLayout` 相对布局：[相关文章](https://blog.csdn.net/ZQIR12/article/details/127822301)
3. `GridLayout` 网格布局
4. `FrameLayout`：帧布局（外加 Fragment）
5. `ConstraintLayout`：约束布局

其他：

1. layout_width、layout_height：wrap_content、match_parent、固定大小
2. ViewGroup、Context（Resource）
3. 对齐（layout_gravity、gravity）
4. orientation=vertical/horizontal



### ScrollView

| 属性             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| `id`             | 可以通过该 `id` 获取到相应的对象                             |
| `layout_width`   | 布局的宽度                                                   |
| `layout_height`  | 布局的高度                                                   |
| `fillViewport`   | 是否填充视口                                                 |
| `scrollbars`     | 滚动条的可见性，可选值为 `none`、`vertical`、`horizontal`、`both` |
| `fadeScrollbars` | 滚动条是否在不活动时淡出                                     |
| `scrollbarStyle` | 滚动条的样式，可选值为 `insideOverlay`、`insideInset`、`outsideOverlay`、`outsideInset` |
| `overScrollMode` | 滚动到边界时的行为，可选值为 `always`、`ifContentScrolls`、`never` |
| `layout_gravity` | 子视图的对齐方式                                             |
| `padding`        | 内边距，即子视图与父布局边界之间的距离                       |
| `paddingLeft`    | 左边界的内边距                                               |
| `paddingRight`   | 右边界的内边距                                               |
| `paddingTop`     | 顶部的内边距                                                 |
| `paddingBottom`  | 底部的内边距                                                 |



### HorizontalScrollView

| 属性             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| `id`             | 可以通过该 `id` 获取到相应的对象                             |
| `layout_width`   | 布局的宽度                                                   |
| `layout_height`  | 布局的高度                                                   |
| `fillViewport`   | 是否填充视口                                                 |
| `scrollbars`     | 滚动条的可见性，可选值为 `none`、`horizontal`                |
| `fadeScrollbars` | 滚动条是否在不活动时淡出                                     |
| `scrollbarStyle` | 滚动条的样式，可选值为 `insideOverlay`、`insideInset`、`outsideOverlay`、`outsideInset` |
| `overScrollMode` | 滚动到边界时的行为，可选值为 `always`、`ifContentScrolls`、`never` |
| `layout_gravity` | 子视图的对齐方式                                             |
| `padding`        | 内边距，即子视图与父布局边界之间的距离                       |
| `paddingLeft`    | 左边界的内边距                                               |
| `paddingRight`   | 右边界的内边距                                               |
| `paddingTop`     | 顶部的内边距                                                 |
| `paddingBottom`  | 底部的内边距                                                 |



### LinearLayout

| 属性                        | 说明                                                  |
| --------------------------- | ----------------------------------------------------- |
| `id`                        | 可以通过该 `id` 获取到相应的对象                      |
| `layout_width`              | 布局的宽度                                            |
| `layout_height`             | 布局的高度                                            |
| `orientation`               | 子视图的排列方向，可选值为 `horizontal` 或 `vertical` |
| `gravity`                   | 子视图的对齐方式                                      |
| `padding`                   | 内边距，即子视图与父布局边界之间的距离                |
| `paddingLeft`               | 左边界的内边距                                        |
| `paddingRight`              | 右边界的内边距                                        |
| `paddingTop`                | 顶部的内边距                                          |
| `paddingBottom`             | 底部的内边距                                          |
| `weightSum`                 | 权重的总和，用于确定子视图分配的空间                  |
| `baselineAligned`           | 是否基于基准线对齐子视图                              |
| `baselineAlignedChildIndex` | 基准线对齐的子视图的索引                              |
| `divider`                   | 子视图之间的分隔线                                    |
| `showDividers`              | 是否显示分隔线                                        |
| `dividerPadding`            | 分隔线的内边距                                        |



### RelativeLayout

| 属性                       | 说明                                   |
| -------------------------- | -------------------------------------- |
| `id`                       | 可以通过该 `id` 获取到相应的对象       |
| `layout_width`             | 布局的宽度                             |
| `layout_height`            | 布局的高度                             |
| `layout_centerInParent`    | 子视图是否居中于父布局                 |
| `layout_alignParentTop`    | 子视图是否与父布局顶部对齐             |
| `layout_alignParentBottom` | 子视图是否与父布局底部对齐             |
| `layout_alignParentStart`  | 子视图是否与父布局开始端对齐           |
| `layout_alignParentEnd`    | 子视图是否与父布局结束端对齐           |
| `layout_alignTop`          | 子视图是否与另一视图顶部对齐           |
| `layout_alignBottom`       | 子视图是否与另一视图底部对齐           |
| `layout_alignStart`        | 子视图是否与另一视图开始端对齐         |
| `layout_alignEnd`          | 子视图是否与另一视图结束端对齐         |
| `layout_toStartOf`         | 子视图是否位于另一视图的开始端之前     |
| `layout_toEndOf`           | 子视图是否位于另一视图的结束端之后     |
| `layout_above`             | 子视图是否位于另一视图上方             |
| `layout_below`             | 子视图是否位于另一视图下方             |
| `layout_toRightOf`         | 子视图是否位于另一视图右侧             |
| `layout_toLeftOf`          | 子视图是否位于另一视图左侧             |
| `layout_margin`            | 外边距，即子视图与父布局边界之间的距离 |
| `layout_marginLeft`        | 左边界的外边距                         |
| `layout_marginRight`       | 右边界的外边距                         |
| `layout_marginTop`         | 顶部的外边距                           |
| `layout_marginBottom`      | 底部的外边距                           |



### GridLayout

| 属性                   | 说明                                                  |
| ---------------------- | ----------------------------------------------------- |
| `id`                   | 可以通过该 `id` 获取到相应的对象                      |
| `layout_width`         | 布局的宽度                                            |
| `layout_height`        | 布局的高度                                            |
| `columnCount`          | 列数                                                  |
| `rowCount`             | 行数                                                  |
| `orientation`          | 子视图的排列方向，可选值为 `horizontal` 或 `vertical` |
| `alignmentMode`        | 对齐模式，包括 `alignBounds` 和 `alignMargins`        |
| `rowOrderPreserved`    | 是否保留行的顺序                                      |
| `columnOrderPreserved` | 是否保留列的顺序                                      |
| `useDefaultMargins`    | 是否使用默认的外边距                                  |
| `layout_column`        | 子视图所在的列索引                                    |
| `layout_row`           | 子视图所在的行索引                                    |
| `layout_columnSpan`    | 子视图跨越的列数                                      |
| `layout_rowSpan`       | 子视图跨越的行数                                      |
| `layout_gravity`       | 子视图的对齐方式                                      |
| `layout_margin`        | 外边距，即子视图与父布局边界之间的距离                |
| `layout_marginLeft`    | 左边界的外边距                                        |
| `layout_marginRight`   | 右边界的外边距                                        |
| `layout_marginTop`     | 顶部的外边距                                          |
| `layout_marginBottom`  | 底部的外边距                                          |



### FrameLayout

| 属性                 | 说明                                   |
| -------------------- | -------------------------------------- |
| `id`                 | 可以通过该 `id` 获取到相应的对象       |
| `layout_width`       | 布局的宽度                             |
| `layout_height`      | 布局的高度                             |
| `foreground`         | 前景视图                               |
| `foregroundGravity`  | 前景视图的对齐方式                     |
| `foregroundTint`     | 前景视图的着色                         |
| `foregroundTintMode` | 前景视图的着色模式                     |
| `measureAllChildren` | 是否测量所有子视图                     |
| `layout_gravity`     | 子视图的对齐方式                       |
| `padding`            | 内边距，即子视图与父布局边界之间的距离 |
| `paddingLeft`        | 左边界的内边距                         |
| `paddingRight`       | 右边界的内边距                         |
| `paddingTop`         | 顶部的内边距                           |
| `paddingBottom`      | 底部的内边距                           |



### ConstraintLayout

```groovy
implementation 'androidx.constraintlayout:constraintlayout:xxx'
```

| 属性                                 | 说明                             |
| ------------------------------------ | -------------------------------- |
| `id`                                 | 可以通过该 `id` 获取到相应的对象 |
| `layout_width`                       | 布局的宽度                       |
| `layout_height`                      | 布局的高度                       |
| `layout_constraintLeft_toLeftOf`     | 左边与其他视图左边对齐           |
| `layout_constraintRight_toRightOf`   | 右边与其他视图右边对齐           |
| `layout_constraintTop_toTopOf`       | 顶部与其他视图顶部对齐           |
| `layout_constraintBottom_toBottomOf` | 底部与其他视图底部对齐           |
| `layout_constraintStart_toStartOf`   | 开始位置与其他视图开始位置对齐   |
| `layout_constraintEnd_toEndOf`       | 结束位置与其他视图结束位置对齐   |
| `layout_constraintWidth_percent`     | 宽度相对于父容器宽度的百分比     |
| `layout_constraintHeight_percent`    | 高度相对于父容器高度的百分比     |
| `layout_constraintHorizontal_bias`   | 控制水平方向上的偏移             |
| `layout_constraintVertical_bias`     | 控制垂直方向上的偏移             |
| `layout_constraintGuide_percent`     | 定义辅助线的位置，作为百分比     |
| `layout_constraintCircle`            | 使一个视图以另一个视图为圆心布局 |





## 简单控件

:::info 相关文章

[Android 常用的控件总结](https://blog.csdn.net/weixin_49770443/article/details/117327634)

:::



:::note 说明（XML）

注意点：需要注意命名空间

代码中获取 XML 中的组件使用 R 类（gradle 自动生成）直接获取

层次结构：

1. layout
2. id

引用：

1. 唯一 ID：@+id/
2. 引用组件：@string/

:::



文本（设置文本的：内容、颜色、宽高）：

1. `TextView`（文本框）
2. `EditView`（输入框）
3. `AutoCompleteTextView`

选择框：

1. `RadioGroup`（单选）
2. `CheckBox`（多选）

按钮：

1. `Button`：由 `TextView` 派生而来
   1. `onClick `点击事件（不推荐直接使用，应当使用监听器）
   2. `setOnClickListener` 设置监听（实现 `View.onOnClickListener`）
   3. `setOnLongClickListener `长按点击事件
   4. 双击事件
   5. 可用/禁用
2. `ImageButton`（图像按钮）
3. `ToggleButton`（开关）
4. `RadioButton`（单选按钮）

图像：

1. `ImageView`
2. `ImageButton`：继承于 `ImageView`
3. 同时展示文本和图像：`ImageView` + `TextView`、Button 的 drawable 属性
4. `ImageSwitcher` / `Gallery`

列表：

1. `Spinner`：下拉列表
2. `ListView`：列表（最常用）

日期/时间：

1. `DatePicker`：日期选择器
2. `TimePicker`：时间选择器

提示/对话框：

1. `Toast`：提示
2. `Dialog`：对话

进度条：

1. `ProgressBar`：进度条
2. `ProgressDialog`：对话框中的进度条

其他：

1. `SeekBar`：拖动条
2. `RatingBar`：评分组件
3. `CardView`：卡片





### TextView

| 属性            | 说明                                   |
| --------------- | -------------------------------------- |
| `id`            | 可以通过该`id`获取到相应的对象         |
| `layout_width`  | 控件宽度                               |
| `layout_height` | 控件高度                               |
| `gravity`       | 控件内容的对其方式                     |
| `text`          | 显示的文本内容，一般写到`string.xml`中 |
| `textColor`     | 字体颜色                               |
| `textStyle`     | 字体风格：`normal`、`bold`、`italic`   |
| `textSize`      | 字体大小，单位一般为`sp`               |
| `background`    | 控件的背景颜色、图片                   |



### EditText

| 属性            | 说明                                 |
| --------------- | ------------------------------------ |
| `id`            | 可以通过该`id`获取到相应的对象       |
| `layout_width`  | 控件宽度                             |
| `layout_height` | 控件高度                             |
| `hint`          | 提示用户输入的文本，当文本为空时显示 |
| `text`          | 显示的文本内容                       |
| `textColor`     | 字体颜色                             |
| `textStyle`     | 字体风格：`normal`、`bold`、`italic` |
| `textSize`      | 字体大小，单位一般为`sp`             |
| `background`    | 控件的背景颜色、图片                 |
| `inputType`     | 输入类型，如文本、数字、日期等       |
| `maxLength`     | 允许输入的最大长度                   |
| `editable`      | 控制文本框是否可编辑                 |
| `lines`         | 设置输入框的行数                     |
| `maxLines`      | 设置输入框最大的行数                 |
| `minLines`      | 设置输入框最小的行数                 |
| `gravity`       | 控件内容的对齐方式                   |



### AutoCompleteTextView

| 属性                     | 说明                                 |
| ------------------------ | ------------------------------------ |
| `id`                     | 可以通过该`id`获取到相应的对象       |
| `layout_width`           | 控件宽度                             |
| `layout_height`          | 控件高度                             |
| `hint`                   | 提示用户输入的文本，当文本为空时显示 |
| `text`                   | 显示的文本内容                       |
| `textColor`              | 字体颜色                             |
| `textStyle`              | 字体风格：`normal`、`bold`、`italic` |
| `textSize`               | 字体大小，单位一般为`sp`             |
| `background`             | 控件的背景颜色、图片                 |
| `inputType`              | 输入类型，如文本、数字、日期等       |
| `completionThreshold`    | 触发自动完成建议的字符阈值           |
| `dropDownHeight`         | 下拉建议列表的高度                   |
| `dropDownWidth`          | 下拉建议列表的宽度                   |
| `adapter`                | 提供建议列表的数据适配器             |
| `threshold`              | 触发自动完成建议的字符阈值           |
| `popupBackground`        | 下拉建议列表的背景颜色               |
| `popupElevation`         | 下拉建议列表的阴影高度               |
| `popupAnchor`            | 下拉建议列表的位置相对于输入框的锚点 |
| `popupWidth`             | 下拉建议列表的宽度                   |
| `completionHint`         | 完成提示文本                         |
| `completionHintView`     | 自定义完成提示视图                   |
| `maxWidth`               | 控件的最大宽度                       |
| `imeOptions`             | 输入法编辑操作选项                   |
| `singleLine`             | 控制是否以单行模式显示文本           |
| `ellipsize`              | 超出文本框时的省略方式               |
| `maxLines`               | 设置文本框的最大行数                 |
| `minLines`               | 设置文本框的最小行数                 |
| `lines`                  | 设置文本框的行数                     |
| `onItemClickListener`    | 监听用户选择建议列表项的操作         |
| `onItemSelectedListener` | 监听建议列表项的选择事件             |
| `onDismissListener`      | 监听下拉建议列表消失事件             |
| `popupTheme`             | 下拉建议列表的主题                   |



### RadioGroup

| 属性                      | 说明                                                    |
| ------------------------- | ------------------------------------------------------- |
| `id`                      | 可以通过该 `id` 获取到相应的对象                        |
| `layout_width`            | 布局的宽度                                              |
| `layout_height`           | 布局的高度                                              |
| `orientation`             | 单选按钮的排列方向，可选值为 `horizontal` 或 `vertical` |
| `gravity`                 | 单选按钮的对齐方式                                      |
| `divider`                 | 单选按钮之间的分隔线                                    |
| `showDividers`            | 是否显示单选按钮之间的分隔线                            |
| `checkedButton`           | 当前选中的单选按钮                                      |
| `onCheckedChangeListener` | 监听选中单选按钮的变化                                  |



### CheckBox

| 属性                      | 说明                                                    |
| ------------------------- | ------------------------------------------------------- |
| `id`                      | 可以通过该 `id` 获取到相应的对象                        |
| `layout_width`            | 布局的宽度                                              |
| `layout_height`           | 布局的高度                                              |
| `orientation`             | 单选按钮的排列方向，可选值为 `horizontal` 或 `vertical` |
| `gravity`                 | 单选按钮的对齐方式                                      |
| `divider`                 | 单选按钮之间的分隔线                                    |
| `showDividers`            | 是否显示单选按钮之间的分隔线                            |
| `checkedButton`           | 当前选中的单选按钮                                      |
| `onCheckedChangeListener` | 监听选中单选按钮的变化                                  |



### Button

| 属性            | 说明                                   |
| --------------- | -------------------------------------- |
| `id`            | 可以通过该 `id` 获取到相应的对象       |
| `layout_width`  | 按钮的宽度                             |
| `layout_height` | 按钮的高度                             |
| `text`          | 按钮上显示的文本内容                   |
| `background`    | 按钮的背景颜色或图像                   |
| `textColor`     | 按钮文本的颜色                         |
| `textSize`      | 按钮文本的大小，单位一般为 `sp`        |
| `onClick`       | 按钮点击事件的处理方法                 |
| `enabled`       | 按钮是否可用                           |
| `padding`       | 内边距，即按钮文本与按钮边界之间的距离 |
| `paddingLeft`   | 左边界的内边距                         |
| `paddingRight`  | 右边界的内边距                         |
| `paddingTop`    | 顶部的内边距                           |
| `paddingBottom` | 底部的内边距                           |



### ImageButton

| 属性            | 说明                               |
| --------------- | ---------------------------------- |
| `id`            | 可以通过该 `id` 获取到相应的对象   |
| `layout_width`  | 图像按钮的宽度                     |
| `layout_height` | 图像按钮的高度                     |
| `src`           | 显示在按钮上的图像资源             |
| `background`    | 图像按钮的背景颜色或图像           |
| `onClick`       | 图像按钮点击事件的处理方法         |
| `enabled`       | 图像按钮是否可用                   |
| `padding`       | 内边距，即图像与按钮边界之间的距离 |
| `paddingLeft`   | 左边界的内边距                     |
| `paddingRight`  | 右边界的内边距                     |
| `paddingTop`    | 顶部的内边距                       |
| `paddingBottom` | 底部的内边距                       |



### ToggleButton

| 属性            | 说明                                       |
| --------------- | ------------------------------------------ |
| `id`            | 可以通过该 `id` 获取到相应的对象           |
| `layout_width`  | 切换按钮的宽度                             |
| `layout_height` | 切换按钮的高度                             |
| `textOn`        | 按钮处于开启状态时显示的文本               |
| `textOff`       | 按钮处于关闭状态时显示的文本               |
| `background`    | 切换按钮的背景颜色或图像                   |
| `onClick`       | 切换按钮点击事件的处理方法                 |
| `enabled`       | 切换按钮是否可用                           |
| `padding`       | 内边距，即切换按钮文本与按钮边界之间的距离 |
| `paddingLeft`   | 左边界的内边距                             |
| `paddingRight`  | 右边界的内边距                             |
| `paddingTop`    | 顶部的内边距                               |
| `paddingBottom` | 底部的内边距                               |



### RadioButton

| 属性            | 说明                                       |
| --------------- | ------------------------------------------ |
| `id`            | 可以通过该 `id` 获取到相应的对象           |
| `layout_width`  | 单选按钮的宽度                             |
| `layout_height` | 单选按钮的高度                             |
| `text`          | 单选按钮显示的文本内容                     |
| `checked`       | 单选按钮是否被选中                         |
| `onClick`       | 单选按钮点击事件的处理方法                 |
| `enabled`       | 单选按钮是否可用                           |
| `padding`       | 内边距，即单选按钮文本与按钮边界之间的距离 |
| `paddingLeft`   | 左边界的内边距                             |
| `paddingRight`  | 右边界的内边距                             |
| `paddingTop`    | 顶部的内边距                               |
| `paddingBottom` | 底部的内边距                               |



### ImageView

| 属性               | 说明                               |
| ------------------ | ---------------------------------- |
| `id`               | 可以通过该 `id` 获取到相应的对象   |
| `layout_width`     | 图像视图的宽度                     |
| `layout_height`    | 图像视图的高度                     |
| `src`              | 要显示的图像资源                   |
| `scaleType`        | 图像的缩放类型                     |
| `adjustViewBounds` | 是否根据图像的尺寸调整视图边界     |
| `maxWidth`         | 图像视图的最大宽度                 |
| `maxHeight`        | 图像视图的最大高度                 |
| `alpha`            | 图像的透明度                       |
| `tint`             | 图像的着色                         |
| `padding`          | 内边距，即图像与视图边界之间的距离 |
| `paddingLeft`      | 左边界的内边距                     |
| `paddingRight`     | 右边界的内边距                     |
| `paddingTop`       | 顶部的内边距                       |
| `paddingBottom`    | 底部的内边距                       |



### ImageSwitcher

| 属性            | 说明                                 |
| --------------- | ------------------------------------ |
| `id`            | 可以通过该 `id` 获取到相应的对象     |
| `layout_width`  | 图像切换器的宽度                     |
| `layout_height` | 图像切换器的高度                     |
| `inAnimation`   | 图像进入切换器时的动画效果           |
| `outAnimation`  | 图像离开切换器时的动画效果           |
| `factory`       | 用于创建切换图像视图的工厂对象       |
| `padding`       | 内边距，即图像与切换器边界之间的距离 |
| `paddingLeft`   | 左边界的内边距                       |
| `paddingRight`  | 右边界的内边距                       |
| `paddingTop`    | 顶部的内边距                         |
| `paddingBottom` | 底部的内边距                         |



### Spinner

| 属性                     | 说明                                            |
| ------------------------ | ----------------------------------------------- |
| `id`                     | 可以通过该 `id` 获取到相应的对象                |
| `layout_width`           | 下拉选择列表的宽度                              |
| `layout_height`          | 下拉选择列表的高度                              |
| `entries`                | 用于填充 Spinner 的选项列表                     |
| `prompt`                 | 选择列表的提示文本                              |
| `spinnerMode`            | Spinner 的模式，可选值为 `dialog` 或 `dropdown` |
| `onItemSelectedListener` | 监听选择项的变化                                |



### ListView

| 属性                  | 说明                               |
| --------------------- | ---------------------------------- |
| `id`                  | 可以通过该 `id` 获取到相应的对象   |
| `layout_width`        | 列表视图的宽度                     |
| `layout_height`       | 列表视图的高度                     |
| `divider`             | 列表项之间的分隔线                 |
| `dividerHeight`       | 列表项分隔线的高度                 |
| `choiceMode`          | 选择模式，用于确定列表项的选择行为 |
| `onItemClickListener` | 监听列表项点击事件的处理方法       |



### DatePicker

| 属性                    | 说明                             |
| ----------------------- | -------------------------------- |
| `id`                    | 可以通过该 `id` 获取到相应的对象 |
| `layout_width`          | 日期选择器的宽度                 |
| `layout_height`         | 日期选择器的高度                 |
| `calendarViewShown`     | 是否显示日历视图                 |
| `spinnersShown`         | 是否显示旋转器视图               |
| `minDate`               | 可选择的最小日期                 |
| `maxDate`               | 可选择的最大日期                 |
| `onDateChangedListener` | 监听日期变化的回调函数           |



### TimePicker

| 属性                    | 说明                             |
| ----------------------- | -------------------------------- |
| `id`                    | 可以通过该 `id` 获取到相应的对象 |
| `layout_width`          | 时间选择器的宽度                 |
| `layout_height`         | 时间选择器的高度                 |
| `time`                  | 当前选择的时间                   |
| `hour`                  | 当前选择的小时数                 |
| `minute`                | 当前选择的分钟数                 |
| `is24HourView`          | 是否显示为 24 小时格式           |
| `onTimeChangedListener` | 监听时间变化的回调函数           |



### Toast

| 属性         | 说明                                               |
| ------------ | -------------------------------------------------- |
| `duration`   | 持续时间，可选值为 `LENGTH_SHORT` 或 `LENGTH_LONG` |
| `text`       | 要显示的文本内容                                   |
| `setGravity` | 设置 Toast 的显示位置                              |
| `setMargin`  | 设置 Toast 的外边距                                |
| `setView`    | 设置自定义视图到 Toast 中                          |
| `show`       | 显示 Toast                                         |



### Dialog

| 属性                | 说明                           |
| ------------------- | ------------------------------ |
| `setTitle`          | 设置对话框的标题               |
| `setMessage`        | 设置对话框的消息内容           |
| `setCancelable`     | 设置对话框是否可取消           |
| `setPositiveButton` | 设置对话框的积极按钮及点击事件 |
| `setNegativeButton` | 设置对话框的消极按钮及点击事件 |
| `setNeutralButton`  | 设置对话框的中立按钮及点击事件 |
| `setView`           | 设置对话框的自定义视图         |
| `show`              | 显示对话框                     |



### ProgressBar

| 属性                | 说明                             |
| ------------------- | -------------------------------- |
| `id`                | 可以通过该 `id` 获取到相应的对象 |
| `layout_width`      | 进度条的宽度                     |
| `layout_height`     | 进度条的高度                     |
| `style`             | 进度条的样式，如水平、圆形等     |
| `max`               | 进度条的最大值                   |
| `progress`          | 当前的进度值                     |
| `indeterminate`     | 是否是确定的进度值               |
| `indeterminateTint` | 不确定进度条的着色               |
| `progressTint`      | 确定进度条的着色                 |



### SeekBar

| 属性                      | 说明                             |
| ------------------------- | -------------------------------- |
| `id`                      | 可以通过该 `id` 获取到相应的对象 |
| `layout_width`            | 滑动条的宽度                     |
| `layout_height`           | 滑动条的高度                     |
| `max`                     | 可选数值的最大值                 |
| `progress`                | 当前滑块的位置                   |
| `onSeekBarChangeListener` | 监听滑动条变化的回调函数         |



### RatingBar

| 属性                        | 说明                             |
| --------------------------- | -------------------------------- |
| `id`                        | 可以通过该 `id` 获取到相应的对象 |
| `layout_width`              | 评分条的宽度                     |
| `layout_height`             | 评分条的高度                     |
| `numStars`                  | 显示的星星数量                   |
| `rating`                    | 当前的评分值                     |
| `stepSize`                  | 评分步长                         |
| `isIndicator`               | 是否仅用于指示，而不允许用户交互 |
| `onRatingBarChangeListener` | 监听评分条变化的回调函数         |



### CardView

| 属性                  | 说明                                     |
| --------------------- | ---------------------------------------- |
| `id`                  | 可以通过该 `id` 获取到相应的对象         |
| `layout_width`        | 卡片视图的宽度                           |
| `layout_height`       | 卡片视图的高度                           |
| `cardElevation`       | 卡片的高度，用于创建阴影效果             |
| `cardBackgroundColor` | 卡片的背景颜色                           |
| `contentPadding`      | 内容的内边距，即卡片内容与边界之间的距离 |
| `radius`              | 卡片的圆角半径                           |

```java
public class CardViewActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_card_view);
        if (savedInstanceState == null) {
            getFragmentManager().beginTransaction()
                    .add(R.id.container, CardViewFragment.newInstance())
                    .commit();
        }
    }
}

public class CardViewFragment extends Fragment {
    private static final String TAG = CardViewFragment.class.getSimpleName();
    CardView mCardView;
    SeekBar mRadiusSeekBar;
    SeekBar mElevationSeekBar;
    public static CardViewFragment newInstance() {
        CardViewFragment fragment = new CardViewFragment();
        fragment.setRetainInstance(true);
        return fragment;
    }
    public CardViewFragment() {}
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_card_view, container, false);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mCardView = (CardView) view.findViewById(R.id.cardview);
        mRadiusSeekBar = (SeekBar) view.findViewById(R.id.cardview_radius_seekbar);
        mRadiusSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                Log.d(TAG, String.format("SeekBar Radius progress : %d", progress));
                mCardView.setRadius(progress);
            }
            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {}
            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {}
        });

        mElevationSeekBar = (SeekBar) view.findViewById(R.id.cardview_elevation_seekbar);
        mElevationSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                Log.d(TAG, String.format("SeekBar Elevation progress : %d", progress));
                mCardView.setElevation(progress);
            }
            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {}
            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {}
        });
    }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context="com.example.android.cardview.CardViewActivity"
    tools:ignore="MergeRootFrame" />

<?xml version="1.0" encoding="utf-8"?>
<ScrollView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:layout_height="match_parent"
    android:layout_width="match_parent"
    >
    <LinearLayout android:layout_width="match_parent"
                  android:layout_height="wrap_content"
                  android:orientation="vertical"
                  android:paddingBottom="@dimen/activity_vertical_margin"
                  android:paddingTop="@dimen/activity_vertical_margin"
                  android:paddingLeft="@dimen/activity_horizontal_margin"
                  android:paddingRight="@dimen/activity_horizontal_margin"
        >
        <android.support.v7.widget.CardView
            android:id="@+id/cardview"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:elevation="100dp"
            card_view:cardElevation=""
            card_view:cardBackgroundColor="@color/cardview_initial_background"
            card_view:cardCornerRadius="8dp"
            android:layout_marginLeft="@dimen/margin_large"
            android:layout_marginRight="@dimen/margin_large"
            >
            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_margin="@dimen/margin_medium"
                android:text="@string/cardview_contents"
                />
        </android.support.v7.widget.CardView>

        <LinearLayout
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="@dimen/margin_large"
            android:orientation="horizontal"
            >
            <TextView
                android:layout_width="@dimen/seekbar_label_length"
                android:layout_height="wrap_content"
                android:layout_gravity="center_vertical"
                android:text="@string/cardview_radius_seekbar_text"
                />
            <SeekBar
                android:id="@+id/cardview_radius_seekbar"
                android:layout_width="fill_parent"
                android:layout_height="wrap_content"
                android:layout_margin="@dimen/margin_medium"
                />
        </LinearLayout>

        <LinearLayout
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            >
            <TextView
                android:layout_width="@dimen/seekbar_label_length"
                android:layout_height="wrap_content"
                android:layout_gravity="center_vertical"
                android:text="@string/cardview_elevation_seekbar_text"
                />
            <SeekBar
                android:id="@+id/cardview_elevation_seekbar"
                android:layout_width="fill_parent"
                android:layout_height="wrap_content"
                android:layout_margin="@dimen/margin_medium"
                />
        </LinearLayout>
    </LinearLayout>
</ScrollView>
```









## 高级控件

适配器：

1. 数组适配器
2. 简单适配器
3. 基础适配器

控件：

1. 下拉列表
2. 列表类视图
   1. ListView
   2. RecyclerView
   3. GridView
3. 翻页类视图
   1. ViewPager（可以做引导页）
   2. PagerTabStrip
4. Fragment（处理适配）
   1. 生命周期
   2. 静态注册、动态注册
5. WebView 网页控件
6. Snackbar
7. DrawerLayout
8. NavigationView/circleimageview
9. FloatingActionButton
10. CoordinatorLayout/FrameLayout
11. MaterialCardView
12. AppBarLayout
13. SwipeRefreshLayout
14. CollapsingToolbarLayout



## 界面渲染

- 每一个Activity都拥有一个Window对象的实例。这个实例实际是PhoneWindow类型的。那么PhoneWindow从名字很容易看出，它应该是Window的儿子
- 每一个Activity都有一个PhoneWindow对象，通过setContentView()设置的布局是被放到DecorView中，DecorView是视图树的最顶层
- DecorView继承了FrameLayout，并且一般情况下，它会在先添加一个预设的布局。比如DecorCaptionView，它是从上到下放置自己的子布局的，相当于一个LinearLayout。通常它会有一个标题栏，然后有一个容纳内容的mContentRoot，这个布局的类型视情况而定。我们希望显示的布局就是放到了mContentRoot中。
- WindowManager是在Activity执行attach()时被创建的，attach()方法是在onCreate()之前被调用的。
- WindowManagerImpl持有了PhoneWindow的引用，因此它可以对PhoneWindow进行管理。同时它还持有一个非常重要的引用mGlobal。这个mGlobal指向一个WindowManagerGlobal类型的单例对象，这个单例每个应用程序只有唯一的一个。在图中，我说明了WindowManagerGlobal维护了本应用程序内所有Window的DecorView，以及与每一个DecorView对应关联的ViewRootImpl。这也就是为什么我前面提到过，WindowManager只是一个代理，实际的管理功能是通过WindowManagerGlobal实现的。
- WindowManagerImpl确实只是WindowManagerGlobal的一个代理而已。同时，上面这个方法在整个Android的视图框架流程中十分的重要。我们知道，在Activity执行onResume()后界面就要开始渲染了。原因是在onResume()时，会调用WindowManager的addView()方法(实际最后调用的是WindowManagerGlobal的addView()方法)，把视图添加到窗口上。