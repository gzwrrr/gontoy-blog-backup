---
title: "Conda"
shortTitle: "Conda"
description: "Conda"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-02-18
category: 
- "python"
tag:
- "python"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Conda"
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
  title: "Conda"
  description: "Conda"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# Requests

[[toc]]


- [官方文档](https://requests.readthedocs.io/en/latest/)
- Python requests库是一个基于 `urllib` 的，采用 `Apache2` 开源协议的HTTP库，它可以方便地发送和接收 `HTTP` 请求和响应。它提供了一些简单的API函数，如 `get, post, put, delete` 等，以及一个 `Request` 类，用于构建和发送自定义的请求



## 官方示例

==使用 urllib2：==

```python
import urllib2

gh_url = 'https://api.github.com'

req = urllib2.Request(gh_url)

password_manager = urllib2.HTTPPasswordMgrWithDefaultRealm()
password_manager.add_password(None, gh_url, 'user', 'pass')

auth_manager = urllib2.HTTPBasicAuthHandler(password_manager)
opener = urllib2.build_opener(auth_manager)

urllib2.install_opener(opener)

handler = urllib2.urlopen(req)

print handler.getcode()
print handler.headers.getheader('content-type')
```

==使用 requests：==

```python
import requests

r = requests.get('https://api.github.com', auth=('user', 'pass'))

print r.status_code
print r.headers['content-type']
```

