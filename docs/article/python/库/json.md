---
title: "JSON"
shortTitle: "JSON"
description: "JSON"
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
  text: "JSON"
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
  title: "JSON"
  description: "JSON"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# JSON

[[toc]]


## 简单使用

```python
import json

# 创建一个字典对象
data = {
    "name": "Alice",
    "age": 25,
    "hobbies": ["reading", "coding", "music"]
}

# 打开一个文件对象，用"w"模式表示写入
with open("data.json", "w") as f:
    # 使用json.dump()函数将字典对象转换为JSON格式，并写入文件中
    json.dump(data, f)
```



https://www.ncei.noaa.gov/data/global-summary-of-the-day/access/2014/94474099999.csv







