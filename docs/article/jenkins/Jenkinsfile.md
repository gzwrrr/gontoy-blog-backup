---
title: "Jenkinsfile 配置"
shortTitle: "Jenkinsfile 配置"
description: "Jenkinsfile 配置"
icon: ""
author:
  name: gzw
  url:
  email: 1627121193@qq.com
isOriginal: false
date: 2022-07-12
category:
  - "jenkins"
  - "运维"
tag:
  - "jenkins"
  - "运维"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "Jenkinsfile 配置"
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
  title: "Jenkinsfile 配置"
  description: "Jenkinsfile 配置"
  author:
    name: gzw
    email: 1627121193@qq.com
---

# Jenkinsfile 简单使用

[[toc]]

## 声明式流水线

### 1.结构

```groovy
// 加载共享库
@Library('jenkinslib@master') _

String workspace = "/opt/jenkins/workspace"

pipeline {
    // 代理
	agent {
		node {
            // 指定运行节点的标签或名称
			label "master"
            // 指定运行工作目录
			customWorkspace "${workspace}"
		}
	}

    // 全局工具
    tool {
        xxx
    }

    // 环境，全局变量
    environment {
        xxx
    }

    options {
        // 日志时间
        timestamps()
        // 删除隐式 checkout scm 语句
        skipDefaultCheckout()
        // 禁止并行
        disableConcurrentBuilds()
        // 流水线超时设置为 30 分钟
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        input {
        	xxx
        }
        stage {
            when {
            	environment name: 'xxx',
            	value: 'xxx'
        	}
            timeout(time: 5, unit: 'MINUTES') {
                script {
                    println('xxx')
                }
            }
        }
        stage('Example') {
            steps {
                xxx
            }
        }
    }

    post {
        always {
            echo 'xxx'
        }
    }
}
```

### 2.各部分解释

- agent

![image-20220516235709630](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/agent.png)

- post

![image-20220516235920789](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/post.png)

- stages

![image-20220517000051638](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/stages.png)

- environment

![image-20220517000225049](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/environment.png)

- options

![image-20220517000337820](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/options.png)

- paramters

![image-20220517000520950](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/paramters.png)

- trigger

![image-20220517000551382](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/trigger.png)

- tool

![image-20220517000643113](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/tool.png)

- input

![image-20220517000914784](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/input.png)

- when

![image-20220517001202914](https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown/https://my-photos-1.oss-cn-hangzhou.aliyuncs.com/markdown//jenkins/20230209/when.png)
