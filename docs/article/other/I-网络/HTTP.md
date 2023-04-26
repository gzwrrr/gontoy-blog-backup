---
title: "HTTP"
shortTitle: "HTTP"
description: "HTTP"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-04-18
category: 
- "网络"
- "小知识点"
tag:
- "网络"
- "小知识点"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "HTTP"
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
  title: "HTTP"
  description: "HTTP"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# HTTP

:::info 说明

[精读《图解HTTP》](https://zhuanlan.zhihu.com/p/38548737)

:::





### 请求方法

| 序号 | 方法    | 描述                                                         |
| :--- | :------ | :----------------------------------------------------------- |
| 1    | GET     | 请求指定的页面信息，并返回实体主体。                         |
| 2    | HEAD    | 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头 |
| 3    | POST    | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。 |
| 4    | PUT     | 从客户端向服务器传送的数据取代指定的文档的内容。             |
| 5    | DELETE  | 请求服务器删除指定的页面。                                   |
| 6    | CONNECT | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。    |
| 7    | OPTIONS | 允许客户端查看服务器的性能。                                 |
| 8    | TRACE   | 回显服务器收到的请求，主要用于测试或诊断。                   |
| 9    | PATCH   | 是对 PUT 方法的补充，用来对已知资源进行局部更新 。           |



### 响应码

| 状态码 | 描述                                             |
| ------ | ------------------------------------------------ |
| 1xx    | 信息提示，表示请求已被接受，继续处理             |
| 100    | 继续                                             |
| 101    | 切换协议                                         |
| 2xx    | 成功，表示请求已被成功接收、理解、接受处理       |
| 200    | 成功                                             |
| 201    | 已创建                                           |
| 202    | 已接受                                           |
| 204    | 无内容                                           |
| 206    | 部分内容                                         |
| 3xx    | 重定向，表示需要进一步的操作才能完成请求         |
| 300    | 多种选择                                         |
| 301    | 永久移动                                         |
| 302    | 临时移动                                         |
| 303    | 查看其它位置                                     |
| 304    | 未修改                                           |
| 307    | 临时重定向                                       |
| 4xx    | 客户端错误，表示客户端发生错误，请求无法完成     |
| 400    | 请求错误                                         |
| 401    | 未授权                                           |
| 403    | 禁止访问                                         |
| 404    | 未找到                                           |
| 405    | 方法不允许                                       |
| 406    | 不可接受                                         |
| 408    | 请求超时                                         |
| 409    | 冲突                                             |
| 410    | 已删除                                           |
| 413    | 请求实体过大                                     |
| 414    | URI 过长                                         |
| 415    | 不支持的媒体类型                                 |
| 416    | 请求范围不符合要求                               |
| 417    | 期望失败                                         |
| 418    | 我是一个茶壶                                     |
| 422    | 不可处理的实体                                   |
| 429    | 请求过多                                         |
| 5xx    | 服务器错误，表示服务器在处理请求的过程中发生错误 |
| 500    | 内部服务器错误                                   |
| 501    | 未实现                                           |
| 502    | 错误网关                                         |
| 503    | 服务不可用                                       |
| 504    | 网关超时                                         |
| 505    | HTTP 版本不受支持                                |



### Content-Type

| Content-Type                      | 说明                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| text/html                         | HTML 格式                                                    |
| text/plain                        | 纯文本格式                                                   |
| text/xml                          | XML 格式                                                     |
| image/gif                         | gif 图片格式                                                 |
| image/jpeg                        | jpg 图片格式                                                 |
| image/png                         | png 图片格式                                                 |
| application/xhtml+xml             | XHTML 格式                                                   |
| application/xml                   | XML 数据格式                                                 |
| application/atom+xml              | Atom XML 聚合格式                                            |
| application/json                  | JSON 数据格式                                                |
| application/pdf                   | pdf 格式                                                     |
| application/msword                | Word 文档格式                                                |
| application/octet-stream          | 二进制流数据（如常见的文件下载）                             |
| application/x-www-form-urlencoded | `<form encType="">` 中默认的 encType，form表单数据被编码为 key/value 格式发送到服务器（表单默认的提交数据的格式） |
| multipart/form-data               | 需要在表单中进行文件上传时，就需要使用该格式                 |

