---
title: GitHub博客搭建
date: 2020-03-01 15:04:05
tags: 博客搭建
categories: 技术
photos: https://cdn.jsdelivr.net/gh/yremp/cdn@2.1.5/img/cover/(6).jpg.webp

​---



GitHub搭建成功有段时间了，期间自己也遇到过很多问题，换过logo，主题，头像，虽然困难很多但总有解决的办法 ，让我骄傲的分享一下搭建的过程！

# 1.安装node!!!
### 1.在百度搜索Node.js,去官网下载最新稳定版本！下载的过程有点慢，不要着急。
### 2.下载并且安装后，打开CMD命令行，输入node-v，会显示出你安装的版本信息，并且你知道你安装成功了！在这里我建议你们都输入一下试试，我就是没有试试，到搭建后期才发现node安装失败了！！！!![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211104548998.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
# 2.GitHub的注册（这个过程没有什么困难就一笔代过了，不过说这个官网超级慢，慢慢来就行了）
# 3.git for Windows的安装！
###  百度搜索并且安装就完事了!
# 4.配置GitHub SSH！
### 1.在你git for windows 的安装路径下的文件夹内找到          git-bash.exe，运行。
### 2.输入ssh-keygen -t  rsa      -C "自己的邮箱"，会生成一段密钥，及密钥所在路径。在.ssh中id-rsa的文件内用记事本打开，复制下来。
### 3.登录你的GitHub，进入设置，找到SSH keys。把刚刚复制的密钥粘贴下来，就行了。
# 5.hexo的安装及使用。
###  1.在D盘内创建一个新文件夹(我的是blog)，以便于后边的hexo的本地安装。
###  2.打开cmd命令行，cd blog回车,然后输入官网安装命令，安装过程有点超级慢，如果不行的话使用npm install -g cnpm --registry=https://registry.npm.taobao.org，这个会提高下载速度。
### 3.按照官网的使用命令教程一步步进行。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211114359163.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
### 4.安装好后本地运行，local host：5555，就可以看到自己的博客了。（是不是很激动）
# 6.安装sublime text。
### 1.安装后直接打开，并将自己的博客目录拖进sublime text。
### 2.自己博客目录里的source文件夹post文件夹是以后我们发布博客要用的，themes文件夹是我们更换主题要用的。
###  *注意：sublime text中更改文件时要记住冒号后面要加上一个空格，才能输入你要更改的内容。否则会出现如下的错误。*![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211115507522.png)
# 7.hexo发布前的准备。
### 1.去hexo官网安装插件，否则会报错哟。安装成功的标志。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211120921962.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
### 2.config.yml中的url更改为自己的博客站点，还有作者的名字。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211120941355.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
### 3.最后面的配置也不能忘！*注意：（repo：自己的GitHub博客仓库地址）*![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211121457874.png)
### 4.然后先hexo g生成，再hexo d再提交，并配置博客信息。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211121852741.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
### 5.输入成功后会让你登录GitHub的博客。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020021112224291.png)

# 自此博客创建成功了！！！开心呀。
