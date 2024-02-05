---
title: "Android 应用配置"
shortTitle: "B-Android 应用配置"
description: "Android 应用配置"
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
  text: "Android 应用配置"
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
  title: "Android 应用配置"
  description: "Android 应用配置"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Android 应用配置

[[toc]]



## 标签概览

:::info 说明

[应用配置官方解释](https://developer.android.google.cn/guide/topics/manifest/manifest-intro?hl=zh-cn)

:::

`AndroidManifest.xml` 包含以下几个部分：

1. 运行配置、备份等
2. Activity：应用程序组件
3. 软件包名、应用 ID
4. 应用组件：`<activity>`、`<service>`、`<receiver>`、`<provider>`
5. Intent 过滤器
6. 图标、标签
7. 权限
8. 设备兼容

| 标签                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `<action>`                 | 向 Intent 过滤器添加操作。                                   |
| `<activity>`               | 声明 Activity 组件。                                         |
| `<activity-alias>`         | 声明 Activity 的别名。                                       |
| `<application>`            | 应用的声明。                                                 |
| `<category>`               | 向 Intent 过滤器添加类别名称。                               |
| `<compatible-screens>`     | 指定与应用兼容的每个屏幕配置。                               |
| `<data>`                   | 向 Intent 过滤器添加数据规范。                               |
| `<grant-uri-permission>`   | 指定父级内容提供程序有权访问的应用数据的子集。               |
| `<instrumentation>`        | 声明支持您监控应用与系统进行交互的 `Instrumentation` 类。    |
| `<intent-filter>`          | 指定 Activity、服务或广播接收器可以响应的 Intent 类型。      |
| `<manifest>`               | AndroidManifest.xml 文件的根元素。                           |
| `<meta-data>`              | 可以提供给父级组件的其他任意数据项的名称-值对。              |
| `<path-permission>`        | 定义内容提供程序中特定数据子集的路径和所需权限。             |
| `<permission>`             | 声明安全权限，可用于限制对此应用或其他应用的特定组件或功能的访问。 |
| `<permission-group>`       | 为相关权限的逻辑分组声明名称。                               |
| `<permission-tree>`        | 声明权限树的基本名称。                                       |
| `<provider>`               | 声明内容提供程序组件。                                       |
| `<receiver>`               | 声明广播接收器组件。                                         |
| `<service>`                | 声明服务组件。                                               |
| `<supports-gl-texture>`    | 声明应用支持的一种 GL 纹理压缩格式。                         |
| `<supports-screens>`       | 声明应用支持的屏幕尺寸，并为大于此尺寸的屏幕启用屏幕兼容模式。 |
| `<uses-configuration>`     | 指明应用要求的特定输入功能。                                 |
| `<uses-feature>`           | 声明应用使用的单个硬件或软件功能。                           |
| `<uses-library>`           | 指定应用必须链接到的共享库。                                 |
| `<uses-permission>`        | 指定为使应用正常运行，用户必须授予的系统权限。               |
| `<uses-permission-sdk-23>` | 指明应用需要特定权限，但仅当应用在运行 Android 6.0（API 级别 23）或更高版本的设备上安装时才需要。 |
| `<uses-sdk>`               | 您可以通过整数形式的 API 级别，表示应用与一个或多个版本的 Android 平台的兼容性。 |





## 应用权限

Android 系统实现了*最小权限原则*。换言之，默认情况下，每个应用只能访问执行其工作所需的组件，而不能访问其他组件。这样便能创建非常安全的环境，在此环境中，应用无法访问其未获得权限的系统部分。不过，应用仍可通过一些途径与其他应用共享数据以及访问系统服务：

- 可以安排两个应用共享同一 Linux 用户 ID，在此情况下，二者便能访问彼此的文件。为节省系统资源，也可安排拥有相同用户 ID 的应用在同一 Linux 进程中运行，并共享同一 VM。应用还必须使用相同的证书进行签名。
- 应用可以请求访问设备数据（如用户的联系人、短信消息、可装载存储装置（SD 卡）、相机、蓝牙等）的权限。用户必须明确授予这些权限。如需了解详细信息，请参阅[使用系统权限](https://developer.android.google.cn/training/permissions?hl=zh-cn)。

方式：

1. 懒加载
2. 饿汉式



### 动态申请权限

1. 检查是否开启了指定权限
2. 请求系统弹窗，以便用户选择是否开启权限
3. 判断用户的结果



## 运行时权限

并不是所有权限都需要在运行时申请，对于用户来说，不停地授权也很烦琐。Android现

在将常用的权限大致归成了两类，一类是普通权限，一类是危险权限

**危险权限：**

| 权限组名             | 权限名                                                       |
| -------------------- | ------------------------------------------------------------ |
| CALENDAR             | READ_CALENDAR、WRITE_CALENDAR                                |
| CALL_LOG             | READ_CALL_LOG、WRITE_CALL_LOG、PROCESS_OUTGOING_CALLS        |
| CAMERA               | CAMERA                                                       |
| CONTACTS             | READ_CONTACTS、WRITE_CONTACTS、GET_ACCOUNTS                  |
| LOCATION             | ACCESS_FINE_LOCATION、ACCESS_COARSE_LOCATION、ACCESS_BACKGROUND_LOCATION |
| MICROPHONE           | RECORD_AUDIO                                                 |
| PHONE                | READ_PHONE_STATE、READ_PHONE_NUMBERS、CALL_PHONE、ANSWER_PHONE_CALLS、ADD_VOICEMAIL、USE_SIP、ACCEPT_HANDOVER |
| SENSORS              | BODY_SENSORS                                                 |
| ACTIVITY_RECOGNITION | ACTIVITY_RECOGNITION                                         |
| SMS                  | SEND_SMS、RECEIVE_SMS、READ_SMS、RECEIVE_WAP_PUSH、RECEIVE_MMS |
| STORAGE              | READ_EXTERNAL_STORAGE、WRITE_EXTERNAL_STORAGE、ACCESS_MEDIA_LOCATION |



## 混淆

[ProGuard](http://proguard.sourceforge.net/ ) 是一个在Android项目中广泛使用的压缩和混淆打包的源码的工具