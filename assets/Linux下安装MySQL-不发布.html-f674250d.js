import{_ as s,Q as n,S as a,a5 as e}from"./framework-ec2af7a3.js";const l={},i=e(`<h1 id="linux下安装mysql" tabindex="-1"><a class="header-anchor" href="#linux下安装mysql" aria-hidden="true">#</a> Linux下安装MySQL</h1><h1 id="下载" tabindex="-1"><a class="header-anchor" href="#下载" aria-hidden="true">#</a> 下载</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入官网下载</span>
https://dev.mysql.com/downloads/mysql/
<span class="token comment"># 或者直接使用</span>
<span class="token function">wget</span> https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.20-linux-glibc2.12-x86_64.tar.xz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="解压" tabindex="-1"><a class="header-anchor" href="#解压" aria-hidden="true">#</a> 解压</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 确保安装了 tar，可以使用</span>
yum <span class="token function">install</span> <span class="token function">tar</span>
<span class="token comment"># 解压</span>
<span class="token function">tar</span> <span class="token parameter variable">-xvJf</span> mysql-8.0.21-linux-glibc2.12-x86_64.tar.xz
<span class="token comment"># 改名</span>
<span class="token function">mv</span> mysql-8.0.21-linux-glibc2.12-x86_64 mysql8.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="创建存储文件" tabindex="-1"><a class="header-anchor" href="#创建存储文件" aria-hidden="true">#</a> 创建存储文件</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入 mysql8.0</span>
<span class="token builtin class-name">cd</span> mysql8.0
<span class="token comment"># 创建 data 目录</span>
<span class="token function">mkdir</span> data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="创建用户组" tabindex="-1"><a class="header-anchor" href="#创建用户组" aria-hidden="true">#</a> 创建用户组</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">groupadd</span> mysql
<span class="token function">useradd</span> <span class="token parameter variable">-g</span> mysql mysql
<span class="token comment"># 赋予权限</span>
<span class="token function">chown</span> <span class="token parameter variable">-R</span> mysql.mysql /usr/local/mysql/mysql8.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="初始化-mysql" tabindex="-1"><a class="header-anchor" href="#初始化-mysql" aria-hidden="true">#</a> 初始化 MySQL</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入 bin 目录</span>
<span class="token builtin class-name">cd</span> bin
<span class="token comment"># 初始化基本信息</span>
./mysqld <span class="token parameter variable">--user</span><span class="token operator">=</span>mysql <span class="token parameter variable">--basedir</span><span class="token operator">=</span>/usr/local/mysql/mysql8.0 <span class="token parameter variable">--datadir</span><span class="token operator">=</span>/usr/local/mysql/mysql8.0/data/ <span class="token parameter variable">--initialize</span>
<span class="token comment"># 如果报错可能是依赖库为下载</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> libaio.so.1
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> libaio
<span class="token comment"># 基本信息初始化完成后记下最后一行的临时密码</span>
<span class="token number">2022</span>-08-26T09:55:28.807250Z <span class="token number">6</span> <span class="token punctuation">[</span>Note<span class="token punctuation">]</span> <span class="token punctuation">[</span>MY-010454<span class="token punctuation">]</span> <span class="token punctuation">[</span>Server<span class="token punctuation">]</span> A temporary password is generated <span class="token keyword">for</span> root@localhost: 9qwb/o<span class="token punctuation">;</span>r<span class="token operator">!</span>feD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="添加服务到系统" tabindex="-1"><a class="header-anchor" href="#添加服务到系统" aria-hidden="true">#</a> 添加服务到系统</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入 mysql8.0 后</span>
<span class="token function">cp</span> <span class="token parameter variable">-a</span> ./support-files/mysql.server /etc/init.d/mysql
<span class="token comment"># 授权并添加服务</span>
<span class="token function">chmod</span> +x /etc/init.d/mysql
<span class="token function">chkconfig</span> <span class="token parameter variable">--add</span> mysql
<span class="token comment"># 创建 my.cnf</span>
<span class="token function">vim</span> my.cnf
<span class="token comment"># 设置权限</span>
<span class="token function">chmod</span> <span class="token number">664</span> /etc/my.cnfs
<span class="token comment"># 进入 cd /etc/init.d，修改 mysql 文件</span>
<span class="token builtin class-name">cd</span> /etc/init.d
<span class="token function">vim</span> mysql
<span class="token comment"># 添加实际路径</span>
<span class="token assign-left variable">basedir</span><span class="token operator">=</span>/usr/local/mysql/mysql8.0
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/usr/local/mysql/mysql8.0/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),c=[i];function t(d,r){return n(),a("div",null,c)}const p=s(l,[["render",t],["__file","Linux下安装MySQL-不发布.html.vue"]]);export{p as default};
