---
notPage: true
---

# ElasticSearch

:::info 说明
ElasticSearch 简单使用
:::





[[toc]]



## 简介

ElasticSearch 是分布式的「搜索」与「分析」引擎，可以快速地存储、搜索和分析海量数据，底层是对 Lucene 进行封装，以此提供 RESTful API 接口，开箱即用

基本概念

1. 索引：理解为动词时，相当于 MySQL 中的 insert；理解为名词时，相当于 MySQL 中的 database
2. 字段类型：在索引中可以定义一个或多个类型，类似于 MySQL 中的表（table），其中每一种类型的数据放在一起。补充：ES 7 以上的版本都建议不使用类型，即将数据直接存储在索引下面，原因是使用类型时，不同类型下的字段可能相同，这样在检索时效率会下降，并且在 8 以上的版本类型将会被移除
3. 文档：保存在某个索引某个类型下的数据就称为文档，文档是以 JSON 格式存储的，类似于 MySQL 中的表的内容
4. 分片（倒排索引）：先将整句分词，之后维护一张记录这些词出现在哪条记录的倒排索引表，搜索时也会先分词然后匹配所有相关记录，同一条记录出现次数最高的相关性得分最高，那么这条记录就是最符合的搜索结果

补充：ElesticSearch 和 Kibana（图形化界面） 的版本要一致



<br/>

## 安装 ES 与 Kibana

- `docker pull elasticsearch:7.5.1`
- `mkdir -p /data/elasticsearch/config`
- `mkdir -p /data/elasticsearch/data`
- `chmod -R 777 /data/elasticsearch/data`
- `echo "http.host: 0.0.0.0">>/data/elasticsearch/config/elsticsearch.yml`
- `docker run --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms256m -Xmx512m" -v /data/elasticsearch/config/elsticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml -v /data/elasticsearch/data:/usr/share/elasticsearch/data -v /data/elasticsearch/plugins:/usr/share/elasticsearch/plugins -d elasticsearch:7.5.1`

docker 安装 Kibana：

- `docker pull kibana:7.5.1`
- `docker run --name kibana -e ELASTICSEARCH_HOSTS=http://192.168.30.100:9200 -p  5601:5601 -d kibana:7.5.1`







 