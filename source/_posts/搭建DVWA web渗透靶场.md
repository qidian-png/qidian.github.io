---
title: 搭建DVWA web渗透靶场
date: 2020-04-08 15:04:05
tags: 靶场
categories: 技术
photos: https://cdn.jsdelivr.net/gh/yremp/cdn@2.1.5/img/cover/(3).jpg.webp
---



﻿## 靶场的搭建是基于phpstudy环境下，phpstudy+DVWA。

### 1、进入 DVWA 的官网
官网 http://www.dvwa.co.uk/ 页面拉到最下面有下载按钮，也可以从GitHub上clone下来。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200408113245560.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
### 2、DVWA的安装与配置
1、将DVWA解压到phpstudy目录下的www目录下。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200408114405700.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
2、修改配置文件
先将 //www/DVWA-master/configure/ 中的 configure.inc.php.disc 去掉 .disc 后缀或拷贝一份去掉后缀
然后将 configure/configure.inc.php 文件中的数据库信息修改为如下图（也就是配置数据库密码）：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020040811532423.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)


**用户名，密码是你数据库的。**

### 3、然后浏览器访问 http://127.0.01/DWWA/setup.php
正常页面：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200408120125627.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
这样直接创建就行了。
### 4、创建成功
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200408120814519.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
### 5、登录靶场
五选一.......
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200408145600310.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
### 6、进入主页面
下面就是靶场漏洞目录，还有很多功能，我就不一一介绍了。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200408145729704.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
开始学习吧！！！
### 7、报错总结
成功总不是一帆风顺的，踩坑。
1、如果出现 reCAPTCHA:Missing 字样：
需要在 configure/configure.inc.php中配置两个量
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200408120450316.png)

```
配置$_DVWA[ 'recaptcha_public_key' ] = '6LdK7xITAAzzAAJQTfL7fu6I-0aPl8KHHieAT_yJg';
配置$_DVWA[ 'recaptcha_private_key' ] = '6LdK7xITAzzAAL_uw9YXVUOPoIHPZLfw2K1n5NVQ';
```

然后刷新页面即可。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200408120518902.png)
2、数据库连接失败，会出现无法连接提示
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020040812060150.png)
这就是前面为什么使用数据库账号和密码的原因，这样才能连接成功。



