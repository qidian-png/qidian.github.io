---
title: zip知识点的部分总结！
date: 2020-04-08 15:04:05
tags: zip知识学习
categories: 技术
photos: https://cdn.jsdelivr.net/gh/yremp/cdn@2.1.5/img/cover/(4).jpg.webp
---



﻿前言：写这篇博客很犹豫，毕竟是自学可能有很多错误的地方，望大佬指点！
目录
0×01.zip文件格式及伪加密

0×02.暴力破解

0×03.明文攻击

0×04.CRC爆破

**0×01.zip文件格式及伪加密**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420112851603.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
这就是一个zip文件的格式。

```
压缩源文件数据区：
50 4B 03 04：这是头文件标记（0x04034b50） 
14 00：解压文件所需 pkware 版本 
00 00：全局方式位标记（有无加密） 
08 00：压缩方式 
20 9E：最后修改文件时间 
66 4F：最后修改文件日期 
F2 1B 0F 4A：CRC-32校验（4A0F1BF2）
0E 00 00 00：压缩后尺寸 
0C 00 00 00：未压缩尺寸
08 00：文件名长度 
00 00：扩展记录长度 
66 6C 61 67 2E 74 78 74: 文件名（不定长）
4B CB 49 4C AF 36 34 32 36 31 35 AB 05 00: 文件flag.txt压缩后的数据

压缩源文件目录区：
50 4B 01 02：目录中文件文件头标记(0x02014b50) 
1F 00：压缩使用的 pkware 版本
14 00：解压文件所需 pkware 版本 
00 00：全局方式位标记（有无加密，这个更改这里进行伪加密，改为09 00打开就会提示有密码了）
08 00：压缩方式
20 9E：最后修改文件时间
66 4F：最后修改文件日期 
F2 1B 0F 4A：CRC-32校验（4A0F1BF2）
0E 00 00 00：压缩后尺寸 
0C 00 00 00：未压缩尺寸 
08 00：文件名长度 
24 00：扩展字段长度 
00 00：文件注释长度
00 00：磁盘开始号
00 00：内部文件属性 
20 00 00 00：外部文件属性 
00 00 00 00：局部头部偏移量 
50 4B 05 06：目录结束标记
00 00：当前磁盘编号 
00 00：目录区开始磁盘编号
01 00：本磁盘上纪录总数
01 00：目录区中纪录总数 
5A 00 00 00：目录区尺寸大小 
34 00 00 00：目录区对第一张磁盘的偏移量
00 00 ：ZIP 文件注释长度

```
**伪加密：**
第一行的七八位，00 00是没有加密。（从这里可以判断出是否为伪加密）
第四行的十三，十四位00 00：全局方式位标记，有无加密，这个更改这里进行伪加密，改为09 00打开就会提示有密码了，这样就达到了zip伪加密的目的，可是这里又有一个疑问了，你可能会问，为什么改成09，而不是其他的数字呢，其实改成09只是举的一个例子，只要末位是奇数，就代表加密，反之，末位是偶数代表未加密，具体什么原理，可以去官网看一下。

那么，如何辨别当前的zip是真的加密还是伪加密？

无加密
压缩源文件数据区的全局加密应当为00 00  （504B0304两个bytes之后）
且压缩源文件目录区的全局方式位标记应当为00 00（504B0304四个bytes之后）

假加密
压缩源文件数据区的全局加密应当为00 00 
且压缩源文件目录区的全局方式位标记应当为09 00

真加密
压缩源文件数据区的全局加密应当为09 00 
且压缩源文件目录区的全局方式位标记应当为09 00 

哦，对了。kail貌似可以直接打开伪加密的文件。

知道了原理就可以解决问题了，如果是伪加密可以修改回来；但是要是真加密呐！咱们往下看。

**0×02.暴力破解**

说到暴力破解就要说到另外两个方法了。
1. 爆破：顾名思义，逐个尝试选定集合中可以组成的所有密码，知道遇到正确密码（密码短的还好说，密码长的话可能一年半个月也破解不出来）
2. 字典：字典攻击的效率比爆破稍高，因为字典中存储了常用的密码，因此就避免了爆破时把时间浪费在脸滚键盘类的密码上

3.  掩码攻击：如果已知密码的某几位，如已知6位密码的第3位是a，那么可以构造 ??a??? 进行掩码攻击，掩码攻击的原理相当于构造了第3位为a的字典，因此掩码攻击的效率也比爆破高出不少

暴力破解也可在kail里进行，软件为kali自带的fcrackzip
使用步骤

> fcrackzip -help
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420152716363.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
找到 上传压缩包所在文件目录,在此目录下进行操作
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420152833895.png)
> fcrackzip -b -c1 -l 1-4 -u 压缩文件 -v

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420152928348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
对于以上方法，当然推荐一款神器AZPR
爆破！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420141549683.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
字典（合适的字典可以达到事半功倍的效果）！
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042014161979.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)

掩码攻击！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420141753909.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
**0×03.明文攻击**

原理：明文攻击（Known plaintext attack）是一种攻击模式，指攻击者已知明文、密文及算法，求密钥的过程。
同一个zip压缩包里的所有文件都是使用同一个加密密钥来加密的，所以可以用已知文件来找加密密钥，利用密钥来解锁其他加密文件。

在网上找到一个例题，链接：[这里](http://ctf5.shiyanbar.com/misc/no.zip)
1解压这个zip文件，会得到flag.zip和tips.txt.提示“密码是十位大小写字母、数字、特殊符号组成的，你爆破的开么？！”
这就尴尬了，想暴力破解？不可能！！！

不多说拉进winhex分析一波。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420153917942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
很明显 明文攻击 ！

将明文tips.txt进行压缩，判断明文压缩后的CRC32是否与加密文件中的一致，若不一致可以换一个压缩工具。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420154501231.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042015450914.png)
上工具AZPR！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200420154555287.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
emmmmm 密码出来了。

**0×04.CRC32爆破**
原理：它的全称是循环冗余校验(Cyclic Redundancy Check, CRC)，用来校验文件是否出错但并不能用于自动纠错。CRC32则表示会产生一个32bit（8位十六进制数）的校验值。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020042015513465.png)
注意：限于CPU的能力，CRC碰撞只能用于压缩文件较小的情况.
神器：[CEC32](https://github.com/theonlypwner/crc32)
使用方法：

```
python crc32.py reverse 你的crc32密文
```
具体的我也解释不清。
[大佬文章](https://www.360zhijia.com/360anquanke/217342.html)

持续更新！！！
