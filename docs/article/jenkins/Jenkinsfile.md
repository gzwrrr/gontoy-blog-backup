# Jenkinsfile 简单使用



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

![image-20220516235709630](./Jenkinsfile.assets/image-20220516235709630-16527166328131.png)

- post

![image-20220516235920789](./Jenkinsfile.assets/image-20220516235920789-16527167624512.png)

- stages

![image-20220517000051638](./Jenkinsfile.assets/image-20220517000051638-16527168537603.png)

- environment

![image-20220517000225049](./Jenkinsfile.assets/image-20220517000225049-16527169465654.png)

- options

![image-20220517000337820](./Jenkinsfile.assets/image-20220517000337820-16527170192515.png)

- paramters

![image-20220517000520950](./Jenkinsfile.assets/image-20220517000520950-16527171226386.png)

- trigger

![image-20220517000551382](./Jenkinsfile.assets/image-20220517000551382-16527171526947.png)

- tool

![image-20220517000643113](./Jenkinsfile.assets/image-20220517000643113-16527172049108.png)

- input

![image-20220517000914784](./Jenkinsfile.assets/image-20220517000914784-16527173561449.png)

- when

![image-20220517001202914](./Jenkinsfile.assets/image-20220517001202914-165271752421610.png)