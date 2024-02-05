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
timeline: true
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



## 请求方法

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



## 响应码

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



## header

HTTP头部（Header）可以包含多个字段，用于传递各种信息，包括控制信息、元数据、内容类型、身份验证等。以下是一些常见的HTTP头部字段：

1. **Content-Type：** 指定发送到服务器或返回给客户端的实体正文的媒体类型。
2. **Content-Length：** 指定请求或响应正文的长度，以字节为单位。
3. **Accept：** 指定客户端可以处理的媒体类型，用于指定客户端期望接受的响应内容类型。
4. **Authorization：** 用于将客户端的认证凭据发送到服务器进行身份验证。
5. **User-Agent：** 发送请求的用户代理应用程序的信息，用于标识客户端的软件代理和版本号。
6. **Cache-Control：** 用于指定请求/响应链上所有缓存机制必须服从的指令。
7. **Cookie：** 包含 HTTP 请求中的用户 Cookie 信息，用于在服务器上识别和跟踪用户会话。
8. **Date：** 表示消息的日期和时间，用于标识消息的生成时间。
9. **Location：** 指定客户端重定向的位置，常用于指示服务器资源的新位置。
10. **Pragma：** 用于向客户端传递特定于实现的指令，例如强制缓存。



### header 参数

HTTP 头部可以包含多个参数，用于传递不同类型的信息。这些参数可以根据需要提供额外的控制、元数据或其他信息。以下是一些常见的HTTP头部参数：

1. **charset：** 用于指定字符集的参数，通常与 Content-Type 头部一起使用，以指定响应正文的字符集。
2. **boundary：** 用于分隔多部分消息体的参数，通常在 Content-Type 头部中使用，特别是在处理 `multipart` 类型的数据时使用。
3. **max-age：** 用于指定缓存条目的最长存活时间，以秒为单位，通常与 Cache-Control 头部一起使用。
4. **q：** 用于指定质量因子的参数，通常与 Accept 头部一起使用，用于表示客户端对不同媒体类型的偏好程度。
5. **realm：** 用于指定受保护资源的域的参数，通常与 Authorization 头部一起使用，用于指定要访问的受保护资源所在的域。

类型包括：

- integer
- string
- number



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



## params

在HTTP请求中，params参数通常用于向服务器传递一些额外的数据。具体来说，这些参数通常用于GET请求或POST请求中的查询字符串部分。以下是常见的HTTP请求中params参数的几种类型：

1. 查询字符串参数：这些参数附加在URL的末尾，以键值对的形式出现，用“?”符号与URL主体分隔，用“&”符号分隔不同的参数。例如：https://www.example.com/api/resource?param1=value1&param2=value2。
2. URL路径参数：在RESTful API中，URL路径参数可以用来指定资源的唯一标识符。例如，一个类似于“/users/{user_id}”的URL路径可以用来指定特定用户的信息。
3. 请求体参数：对于POST请求或其他包含请求体的HTTP方法，参数可以作为请求体的一部分发送到服务器。请求体参数通常以JSON、表单数据或其他格式发送。
4. HTTP头部参数：有时一些参数可能以HTTP头部的形式发送到服务器。这些参数通常用于传递元数据或控制信息，例如身份验证信息或内容类型。



### query参数

不是所有类型的HTTP请求都可以直接携带query参数。通常，GET请求是最常见的可以直接携带query参数的请求类型。GET请求中，query参数可以附加在URL的末尾，作为URL的一部分，用于向服务器请求特定资源或执行特定操作。例如：

```shell
https://api.example.com/resource?key1=value1&key2=value2
```

然而，POST请求也可以通过请求体携带类似于query参数的数据，但这些参数通常不会直接附加在URL上。相反，它们会作为POST请求的一部分发送到服务器。

其他请求类型（如PUT、DELETE、PATCH等）也可以通过请求体传递类似于query参数的数据。但是，它们通常用于更新或删除资源，而不是直接请求资源，因此它们的语义与GET请求略有不同。

因此，虽然不是所有类型的请求都可以直接携带query参数，但是在许多情况下，可以通过请求体来传递类似于query参数的数据。

| 参数类型 | 示例                     |
| -------- | ------------------------ |
| string   | `?name=JohnDoe`          |
| integer  | `?age=30`                |
| array    | `?colors=red,blue,green` |
| number   | `?price=29.99`           |



### body参数

HTTP请求方法中，通常可以携带请求体（body）的方法包括：

1. POST：POST请求通常用于向服务器提交数据，这些数据可以包含在请求体中。这使得POST请求适用于创建新资源、提交表单数据等操作。
2. PUT：PUT请求通常用于更新现有资源，请求体可以包含新的资源状态。通过PUT请求，可以完全替换服务器上的资源，因此请求体中的数据通常代表新的完整资源。
3. PATCH：PATCH请求类似于PUT请求，但不是完全替换资源，而是对资源进行部分更新。请求体中的数据通常表示要应用于资源的更改。
4. DELETE：虽然DELETE请求不常常包含请求体，但它可以包含用于指定要删除的资源的信息。通常，这些信息以请求体的形式传递，以标识要删除的资源。

这些HTTP请求方法允许在请求体中携带数据，以实现不同的操作，如创建、更新、部分更新或删除资源。请求体的内容通常以不同的格式（例如JSON、表单数据等）传递，具体取决于服务器的接受能力和资源的要求。



#### Form-data

以下是 `FormData` 对象的一个简单示例：

```js
javascriptCopy code// 创建一个新的 FormData 对象
const formData = new FormData();

// 添加字段和值到 FormData 对象
formData.append('username', 'JohnDoe');
formData.append('email', 'johndoe@example.com');

// 创建一个新的文件对象
const file = new File(['Contents of the file'], 'example.txt', { type: 'text/plain' });

// 将文件对象添加到 FormData 对象
formData.append('file', file);

// 将 FormData 对象传递给 fetch 或其他发送请求的方法
fetch('https://example.com/upload', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

通过 `FormData` 对象，可以使用 `append` 方法添加键值对或文件，以构建表示表单数据的对象。然后，可以将 `FormData` 对象作为请求的 `body`，使用 `fetch` 方法或其他发送请求的方法发送到服务器。	





#### x-www-form-urlencoded

`x-www-form-urlencoded` 是一种常见的编码格式，用于将表单数据转换为键值对的形式，以便通过 HTTP 请求发送。它通常用于 `POST` 请求，并且数据以 `key1=value1&key2=value2` 的形式进行编码，其中键值对之间用 `&` 进行分隔，键与值之间用 `=` 进行分隔。

以下是一个使用 `x-www-form-urlencoded` 编码的示例：

```js
key1=value1&key2=value2&key3=value3
```

如果用 JavaScript 来表示，可以使用 `URLSearchParams` 对象来构建和处理 `x-www-form-urlencoded` 格式的数据。以下是一个示例：

```js
javascriptCopy codeconst params = new URLSearchParams();
params.append('key1', 'value1');
params.append('key2', 'value2');
params.append('key3', 'value3');

const encodedData = params.toString();
console.log(encodedData);
```

在这个示例中，`URLSearchParams` 对象用于构建键值对，然后使用 `toString` 方法将其转换为 `x-www-form-urlencoded` 编码的字符串。可以在控制台中查看 `encodedData` 变量的值来查看编码后的结果。



#### json

```json
{
  "key1": "value1",
  "key2": "value2",
  "key3": ["value3_1", "value3_2", "value3_3"],
  "key4": {
    "subkey1": "subvalue1",
    "subkey2": "subvalue2"
  }
}
```





#### xml

```xml
<bookstore>
  <book category="cooking">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Laurentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
  <book category="children">
    <title lang="en">Harry Potter</title>
    <author>J.K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  <book category="web">
    <title lang="en">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
</bookstore>
```





#### raw

在HTTP请求中，`raw` 是一种请求体数据格式，它允许以纯文本形式发送数据。这意味着可以直接在请求体中以纯文本的形式发送任何内容，而不需要特定的编码或格式。`raw` 格式可以用于发送各种类型的数据，包括文本、JSON、XML 等。

以下是一个使用 JavaScript 的示例，演示了如何使用 `raw` 格式来创建一个包含纯文本数据的 HTTP 请求：

```js
javascriptCopy codeconst data = 'This is the raw data to be sent in the request body.';

fetch('https://example.com/api/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain'
  },
  body: data
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

在这个示例中，`data` 包含了要发送的纯文本数据。使用 `fetch` 方法发送了一个 `POST` 请求到指定的 URL，并设置了适当的请求头和请求体。这个示例中的数据是纯文本，但也可以将其他格式的数据发送到服务器，比如 JSON 或 XML。





#### binary

在HTTP请求中，`binary` 是一种数据传输格式，用于发送二进制数据，例如图像、音频或视频文件。与纯文本数据不同，二进制数据不能直接以文本形式传输，而是以其原始二进制形式传输。

在 JavaScript 中，可以使用 `Blob` 对象来处理二进制数据，并通过 `fetch` 方法或其他适当的方式将其发送到服务器。

以下是一个简单的 JavaScript 示例，演示了如何使用 `Blob` 对象来发送二进制数据的 HTTP 请求：

```js
javascriptCopy code// 创建一个包含二进制数据的 Blob 对象
const binaryData = new Blob([/* binary data here */], { type: 'application/octet-stream' });

// 发送包含二进制数据的 HTTP 请求
fetch('https://example.com/upload', {
  method: 'POST',
  body: binaryData
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

在这个示例中，`Blob` 对象用于存储二进制数据，并通过 `fetch` 方法发送到服务器。请注意，实际应用中，需要将适当的二进制数据放入 `Blob` 对象中，比如图像文件、音频文件或其他二进制文件。





## Cookie

在HTTP请求中，Cookie是一种用于存储在客户端的小型数据片段，用于跟踪或识别用户会话的机制。Cookie可以包含一些参数来提供额外的控制或元数据。以下是一些常见的Cookie中的参数：

1. **Domain：** 指定可以访问Cookie的域名，用于控制哪些域可以访问特定的Cookie。
2. **Path：** 指定可以访问Cookie的路径，用于限制哪些路径可以访问特定的Cookie。
3. **Expires/Max-Age：** 指定Cookie的过期时间或存活时间，用于控制Cookie的有效期。
4. **Secure：** 如果设置为true，则表示该Cookie只能通过HTTPS连接发送，用于提高安全性。
5. **HttpOnly：** 如果设置为true，则表示该Cookie不能通过JavaScript访问，用于防止跨站点脚本攻击（XSS）。
6. **SameSite：** 指定Cookie的SameSite属性，用于控制是否在跨站点请求中发送Cookie。



## Auth

HTTP的Auth（授权）是一种基于身份验证机制，用于确保客户端（用户）和服务器之间的安全通信。它允许服务器验证客户端的身份，以便只有经过身份验证的用户才能访问受保护的资源或执行特定的操作。在HTTP中，有几种常见的身份验证机制，包括以下几种：

1. **基本认证（Basic Authentication）：** 基本认证是HTTP的一种简单的身份验证机制，它通过在请求头中使用Base64编码的用户名和密码来进行身份验证。然而，由于其不安全性，它已经不再被推荐用于传输敏感信息。
2. **摘要认证（Digest Authentication）：** 摘要认证是一种更安全的HTTP身份验证机制，它通过使用哈希函数对密码进行摘要处理，并在每个请求中使用随机数来防止重放攻击。
3. **Bearer令牌认证（Bearer Token Authentication）：** Bearer令牌认证是一种基于令牌的身份验证机制，客户端使用令牌来证明其身份。通常用于OAuth 2.0认证流程中，用于授权第三方应用程序访问资源。
4. **OAuth认证（OAuth Authentication）：** OAuth是一种授权框架，允许客户端访问受保护的资源，而不必向客户端公开用户的凭据。它通过访问令牌来授权客户端访问资源，而不是直接使用用户的凭据。

