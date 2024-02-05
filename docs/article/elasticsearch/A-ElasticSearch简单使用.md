---
title: "ElasticSearch 简单使用"
shortTitle: "A-ElasticSearch 简单使用"
description: "ElasticSearch 简单使用"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-04-23
category: 
- "中间件"
- "elasticsearch"
tag:
- "中间件"
- "elasticsearch"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "ElasticSearch 简单使用"
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
  title: "ElasticSearch 简单使用"
  description: "ElasticSearch 简单使用"
  author:
    name: gzw
    email: 1627121193@qq.com
---







# ElasticSearch 简单使用





[[toc]]



<br/>

## CRUD

**新增或更新：**

```json
// put 或 post 请求：http://192.168.30.100:9200/customer/external/1
// 两种请求方式都是默认更新的，但是如果在 post 请求最后加上 /_update 就会对比版本号再决定是否更新
// 携带数据示例
{
    "name": "zhangsan"
}
// post 请求：http://192.168.30.100:9200/customer/external/1/_update，注意下面的 doc 语法
{
    "doc": {
    	"name": "zhangsan",
    	"age": "18"
    }
}
```

**查询与删除：**

```json
// get 请求：http://192.168.30.100:9200/customer/external/1
// delete 请求删除数据：http://192.168.30.100:9200/customer/external/1
// delete 请求删除索引：http://192.168.30.100:9200/customer，注意不可以删除类型，但是删除类型下的所有数据就相当于删除了类型
```

bulk 批量 API 语法：对需要携带数据的操作，两行为一个整体操作；用大括号区分不同行，请求体类型是 text，不是 json：

```json
// 使用 Kibana 进行操作
POST /customer/external/_bulk
{"index":{"_id":"1"}}
{"name":"zhangsan"}
{"index":{"_id":"2"}}
{"name":"zhangsan"}

// 对整个 ElasticSearch 进行操作
POST /_bulk
{"delete":{"_index":"website", "_type":"blog","_id":"123"}}
{"create":{"_index":"website", "_type":"blog","_id":"123"}}
{"title":"my test"}
{"index":{"_index":"website", "_type":"blog"}}
{"title":"my test index"}
{"update":{"_index":"website", "_type":"blog","_id":"123"}}
{"doc":{"title":"my test update"}}
```



<br/>

## Search API（Query DSL）

ES 支持两种基本方式检索：

1. 通过 RESTful API 发送搜索参数
2. 使用 REST request body 发送参数

```json
// 下面表示查询 shakespeare 下的所有数据并按照 line_id 升序排序
GET /shakespeare/_search?q=*&sort=line_id:asc
// 或者使用
GET /shakespeare/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "line_id": "asc"
    }
  ]
}
```

下面就是上述示例的搜索条件，称为领域搜索语言（Query DSL，内容比较多）：

```json
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "line_id": "asc"
    }
  ]
}
```

<br/>

### 查询

```json
{
  "query": {
    // 查询所有数据
    "match_all": {}
    
    // 全文匹配字段的值，会进行分词
    ”match“: {
      "line_id": 20,
      // 字段后面加上 .keyword 表示精确匹配
      "address.keyword": "xxx xxx"
  	}
    
    // 全文匹配字段的值，不会进行分词
    "match_phrase": {
      "address": "xxx"
	}
	
	// 多字段匹配，其中一个匹配就会返回
	"multi_match": {
      "query": "xxx",
      // 只要在下面的字段中匹配到上面写的查询条件即可
      "fields": ["xxx", "xxx"]
	}

	// 复合查询
	”bool“: {
        // 必须符合的条件
        "must" : [
            {"match": {
                ”gender“: "xxx"
            }},
            {"match": {
                ”address“: "xxx"
            }}
        ],
        // 必须不符合的条件
        "must_not": [
            {"match": {
                ”age“: "xxx"
            }},
        ],
        // 最好满足的条件
        "should": [
            {"match": {
                ”name“: "xxx"
            }},
        ],
        // 过滤器匹配，与 match 的差别在于，match 会共享相关性得分，但是 filter 不会
        ”filter“: {
            "range": {
                "age": {
                    "gte": xx,
                    "lte": xx
                }
            }
        }
    }

	// 检索非文本字段（有精确值的），注意不要用 term 来检索文本，这样有可能一个也不返回
	“term”: {
        “address”: "xx"
	}
  }
}
```

<br/>

### 排序

```json
{
  "sort": [
    {
      // 按 line_id 进行降序排序
      "line_id": {
          ”order“: ”desc“
      }
    }
  ]
}
```

<br/>

### 分页

```json
{
  // 查询 0-4 共 5 条数据
  "from": 0,
  "size": 5
}
```

<br/>

### 返回部分字段

```json
{
  // 返回 line_id 字段
  "_source": "{line_id}"
  // 返回多个字段
  "_source": ["field-1", "field-2"]
}
```

<br/>

### 聚合

ES 在查询出数据的同时还能将数据分析聚合起来，这样一次查询就可以得到我们想要的结果，注意，聚合操作是可以嵌套的，也即可以聚合完之后再聚合

```json
{
  "ggs" {
      // aggsName 聚合的名称
      "aggsName": {
    		// terms 是聚合类型
          	"terms": {
    			"field": "age",
    			"size": 10
			}
      },
	  "aggsName": {
          	"avg": {
    			"field": "age",
    			"size": 10
			}
      }
  }
}
```



<br/>

## Mapping 映射

映射操作下不使用「类型」，而是直接在「索引」下进行数据处理

```json
// 创建一个索引并指定映射类型
PUT /my_index
{
  "mappings": {
  	  // properties 指定数据类型
      "properties": {
          "age": {"type": "integer"},
          // keyword 不会全文检索，而是精确检索
          "email": {"type": "keyword"},
          "name": {"type": "text"}
      }
  }
}
```

<br/>

### 添加新字段

```json
// 往已有的索引中添加一个字段
PUT /my_index/_mapping
{
    "properties": {
        "xxx": {"type": "integer"}
    }
}
```

<br/>

### 修改字段

映射中不能直接修改字段，真的需要修改时需要创建一个新的正确的索引并将数据迁移

```json
// 迁移数据，即用新索引覆盖以前的需要修改的索引
POST _reindex
{
    // 指定就索引及其类型
    "source": {
        "index": "bank",
        "type": "account"
    },
    // 新索引（去除了类型）
    "dest": {
    	”index“: "newBank"
	}
}
```



<br/>

## 分词

ES 中的默认分词器只能对英语句子进行分词，对中文进行操作会将一个句子中所有的字单独拆开，一般都会采用开源的 ik 分词器进行中文句子的分词

```json
// 分词操作示例
POST _analyze
{
    "analyzer": "ik_smart",
    "text": "我是中国人"
}
// 或者使用 ik_max_word，表示最大分词可能
POST _analyze
{
    "analyzer": "ik_max_word",
    "text": "我是中国人"
}
```

 



## 补充

ES 中数组会被扁平化处理，即把不同对象的每一个字段单独抽取一个数组，然后将这些对象该字段的值全部存储在一起，不做任何处理会让搜索结果不符合预期

解决方法：可以指定字段类型 `"type":"nested"` ，即把数据指定成嵌入的





