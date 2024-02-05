---
title: "Nvm"
shortTitle: "Nvm"
description: "Nvm"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2023-02-03
category: 
- "前端"
- "版本管理"
tag:
- "前端"
- "版本管理"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Nvm"
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
  title: "Nvm"
  description: "Nvm"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Nvm

[[toc]]



## 命令

|     命令      |     参数     |              解释              |             例子             |
| :-----------: | :----------: | :----------------------------: | :--------------------------: |
|  nvm install  |    版本号    |     安装指定的Node.js版本      |     nvm install 14.17.0      |
|  nvm install  |    --lts     |     安装最新的长期支持版本     |      nvm install --lts       |
|  nvm install  | --latest-npm | 安装Node.js并附带最新的npm版本 |   nvm install --latest-npm   |
|    nvm use    |    版本号    |     使用指定的Node.js版本      |       nvm use 14.17.0        |
|    nvm ls     |      无      |  列出所有已安装的Node.js版本   |            nvm ls            |
| nvm uninstall |    版本号    |     卸载指定的Node.js版本      |    nvm uninstall 14.17.0     |
|  nvm current  |      无      | 显示当前正在使用的Node.js版本  |         nvm current          |
|   nvm alias   | 别名 版本号  |    创建或更改指定版本的别名    |  nvm alias default 14.17.0   |
|    nvm run    | 版本号 脚本  |      使用指定版本运行脚本      |    nvm run 14.17.0 app.js    |
|   nvm exec    | 版本号 命令  |      在指定版本下执行命令      | nvm exec 14.17.0 npm install |
|   nvm which   |    版本号    |  显示指定版本的可执行文件路径  |      nvm which 14.17.0       |