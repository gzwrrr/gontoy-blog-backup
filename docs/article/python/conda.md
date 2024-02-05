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
date: 2022-02-01
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





# Conda

[[toc]]


## 验证 conda

- 方法一：在电脑上点击开始 --> Anaconda3 (64-bit) --> Anaconda Navigator，如果出现Anaconda的界面，表示安装成功。
- 方法二：在电脑上点击开始 --> Anaconda3 (64-bit) --> 右键点击Anaconda Prompt (以管理员身份运行)，在弹开的命令行中输入`conda --version`或者`conda list`，如果出现版本号或者已安装的包名，表示安装成功。

conda中的python版本有很多，可以通过conda create --name  python= 来创建不同版本的python环境，例如，如果你想创建一个python3.6的环境，你可以执行conda create --name Python36 python=3.6。你也可以通过conda info --envs 来查看系统当前已有的python环境



## 创建新环境

conda创建新环境的方法是使用 `conda create --name <env_name> python=<version>` 命令12，其中 `<env_name>` 是你想要的环境名，`<version>` 是你想要的python版本。例如，如果你想创建一个名为 `myenv`的环境，使用python3.8版本，你可以执行 `conda create --name myenv python=3.8`。创建完后，你可以在anaconda的目录下找到 `envs/myenv`目录



## 切换环境

1. 打开命令行窗口，输入`conda env list`或者`conda info --envs`查看当前已有的虚拟环境，其中带星号的是当前激活的环境。
2. 如果想要切换到其他虚拟环境，可以使用`conda activate <NAME>`命令，其中`<NAME>`是你想要切换的虚拟环境的名称。例如，如果你想要切换到名为my_test的虚拟环境，可以输入`conda activate my_test`
3. 如果想要退出当前虚拟环境，可以使用`conda deactivate`命令。





## 镜像源

conda国内镜像源设置的方法是使用 `conda config --add channels <URLS>` 命令1，其中 `<URLS>` 是你想要添加的镜像源的地址。你可以从一些国内的网站上找到可用的镜像源，例如https://developer.aliyun.com/mirror/anaconda2。在使用国内镜像源的时候，最好删除一下~/.condarc 里的 defaults 频道，因为这是官方的频道，在国内连接可能会很慢或者失败1。你可以用vim打开~/.condarc 手动删除掉 defaults 这一行，或者运行conda config --remove channels defaults 命令

- 打开命令行窗口，输入`conda config --show-sources`查看当前的镜像源设置。
- 如果想要添加新的镜像源，可以使用`conda config --add channels <URL>`命令，其中 `<URL>` 是你想要添加的镜像源的网址。例如，如果你想要添加清华大学的镜像源，可以输入`conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/`
- 如果想要删除某个镜像源，可以使用`conda config --remove channels <NAME>`命令，其中 `<NAME>` 是你想要删除的镜像源的名称。例如，如果你想要删除默认的官方镜像源（可能会导致连接慢或失败），可以输入`conda config --remove channels defaults`
- 如果想要查看或修改镜像源配置文件，可以使用文本编辑器打开~/.condarc文件（Linux/Mac）或C:\Users\用户名.condarc文件（Windows），并按照需要进行修改。
- 修改完毕后，可以再次使用`conda config --show-sources`命令查看是否生效。



## 移除镜像源

- 在命令行输入`conda config --show channels`，显示当前的镜像源
- 在命令行输入`conda config --remove channels <channel_name>`，移除指定的镜像源
- 在命令行输入`conda config --remove-key channels`，移除所有的镜像源



## 命令

|       命令       |    参数    |              解释              |                    例子                     |
| :--------------: | :--------: | :----------------------------: | :-----------------------------------------: |
|   conda create   |   --name   |          指定环境名称          |          conda create --name myenv          |
|   conda create   |  --clone   |      克隆一个已存在的环境      |  conda create --name newenv --clone oldenv  |
|   conda create   |     -n     |        --name的缩写形式        |            conda create -n myenv            |
|  conda activate  |  环境名称  |       激活指定名称的环境       |            conda activate myenv             |
| conda deactivate |     无     |       停用当前活跃的环境       |              conda deactivate               |
|  conda install   | 软件包名称 |        安装指定的软件包        |             conda install numpy             |
|  conda install   | --channel  |        指定软件包的渠道        | conda install --channel conda-forge pandas  |
|  conda install   |     -c     |      --channel的缩写形式       |     conda install -c conda-forge pandas     |
|  conda install   |   --file   |     从文件中安装一组软件包     |    conda install --file requirements.txt    |
|   conda update   | 软件包名称 |        更新指定的软件包        |             conda update numpy              |
|   conda remove   | 软件包名称 |        移除指定的软件包        |             conda remove numpy              |
|    conda list    |     无     | 显示当前环境中安装的所有软件包 |                 conda list                  |
|   conda search   | 软件包名称 | 在conda仓库中搜索指定的软件包  |             conda search pandas             |
|   conda search   |   --info   |      显示软件包的详细信息      |         conda search --info pandas          |
|    conda info    |     无     |     显示当前环境的详细信息     |                 conda info                  |
|   conda config   |   --set    |         设置配置项的值         | conda config --set auto_activate_base false |
|   conda config   |   --show   |        显示当前配置的值        |             conda config --show             |

|     命令      |    参数    |                  解释                  |              例子               |
| :-----------: | :--------: | :------------------------------------: | :-----------------------------: |
|  pip install  | 软件包名称 |         安装指定的Python软件包         |        pip install numpy        |
|  pip install  | --upgrade  |            升级指定的软件包            |   pip install --upgrade numpy   |
|  pip install  |     -U     |          --upgrade的缩写形式           |      pip install -U numpy       |
|  pip install  |     -r     |         从要求文件中安装软件包         | pip install -r requirements.txt |
| pip uninstall | 软件包名称 |            卸载指定的软件包            |       pip uninstall numpy       |
|   pip list    |     无     |     列出当前环境中安装的所有软件包     |            pip list             |
|  pip search   | 软件包名称 |        在PyPI中搜索指定的软件包        |        pip search pandas        |
|  pip search   |   --user   |         仅为当前用户安装软件包         |    pip install --user pandas    |
|   pip show    | 软件包名称 |        显示指定软件包的详细信息        |         pip show pandas         |
|  pip freeze   |     无     | 以要求文件格式输出当前环境的软件包列表 |  pip freeze > requirements.txt  |