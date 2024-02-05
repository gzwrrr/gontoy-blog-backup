---
title: "Git 速查"
shortTitle: "Git 速查"
description: "Git 速查"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-02-01
category: 
- "git"
- "运维"
tag:
- "git"
- "运维"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Git 速查"
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
  title: "Git 速查"
  description: "Git 速查"
  author:
    name: gzw
    email: 1627121193@qq.com
---

# Git 速查



[[toc]]





# 写在前面

- 本文章为 Git 常用命令的速查记录
- 持续添加...



# 添加/删除远程仓库地址
```bash
git remote add <name> <url>
# 指定分支和上传
git push --set-upstream <name> master
# 查看远程仓库地址
git remote -v
# 删除全部远程地址
git remote remove origin
```



# 强制覆盖本地分支

```bash
git fetch --all  
git reset --hard origin/分支名称
git pull
```



# 本地强制回滚

```bash
git log
git reset --hard 提交的 ID
```

