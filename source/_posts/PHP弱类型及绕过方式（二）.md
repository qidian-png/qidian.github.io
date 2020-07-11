---
title: PHP弱类型及绕过方式（二）
date: 2020-05-04 15:04:05
tags: php学习
categories: 技术
photos:  https://cdn.jsdelivr.net/gh/yremp/cdn@2.1.5/img/cover/(4).jpg.webp
---



继续！！！

目录：
         0×01.md5加密相等绕过
         0×02.十六进制与数字比较
         0×03.ereg正则%00截断
         0×04.strpos数组绕过


  **0×01.md5加密相等绕过**

```
<?php
$md51 = md5('QNKCDZO');
$a = @$_GET['a'];
$md52 = @md5($a);
if(isset($a)){
if ($a != 'QNKCDZO' && $md51 == $md52) {
echo "flag{*}";
} else {
echo "false!!!";
}}
else{echo "please input a";}
?>
```
看看上面的代码，有点矛盾，让他们MD5加密之后相等，但是明文却不同，what？
百度一下，发现QNKCDZO经过MD5 加密之后为：             0e830400451993494058024219903391

原理：
     PHP在处理哈希字符串时，会利用”!=”或”==”来对哈希值进行比较，它把每一个以”0E”开头的哈希值都解释为0，所以如果两个不同的密码经过哈希以后，其哈希值都是以”0E”开头的，那么PHP将会认为他们相同，都是0。

那么我们就可以用其他0exxxxx来进行比较就能拿到flag。
![在这里插入图片描述](https://img-blog.csdnimg.cn/202005041756418.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
以下这些字符串，md5哈希之后都是0e开头的：

s878926199a
0e545993274517709034328855841020

s155964671a
0e342768416822451524974117254469

s214587387a
0e848240448830537924465865611904

s214587387a
0e848240448830537924465865611904

s878926199a
0e545993274517709034328855841020

s1091221200a
0e940624217856561557816327384675

s1885207154a
0e509367213418206700842008763514

s1502113478a
0e861580163291561247404381396064

s1885207154a
0e509367213418206700842008763514

s1836677006a
0e481036490867661113260034900752

s155964671a
0e342768416822451524974117254469

s1184209335a
0e072485820392773389523109082030

s1665632922a
0e731198061491163073197128363787

s1502113478a
0e861580163291561247404381396064

s1836677006a
0e481036490867661113260034900752

s1091221200a
0e940624217856561557816327384675

s155964671a
0e342768416822451524974117254469


**0×02.十六进制与数字比较**

```
<?php
error_reporting(0);
function noother_says_correct($temp)
{
$flag = 'flag{test}';
$one = ord('1'); //ord — 返回字符的 ASCII 码值
$nine = ord('9'); //ord — 返回字符的 ASCII 码值
$number = '3735929054';
// Check all the input characters!
for ($i = 0; $i < strlen($number); $i++)
{
// Disallow all the digits!
$digit = ord($temp{$i});
if ( ($digit >= $one) && ($digit <= $nine) )
{
// Aha, digit not allowed!
return "flase";
}
}
if($number == $temp)
return $flag;
}
$temp = $_GET['password'];
echo noother_says_correct($temp);
?>
```
首先看看代码，函数要求变量temp不能存在1~9之间的数字，
最后，又要求temp=3735929054;
有点自相矛盾，**但php在转码时会把16进制转化为十进制**.于是把
3735929054转换成16进制为0xdeadc0de，记得带上0x；
把3735929054进行十六进制转化deadc0de，然后PHP再转回来，emmmm就欧克了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200504190602471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
**0×03.ereg正则%00截断**

```
<?php
$flag = "xxx";
if (isset ($_GET['password']))
{
if (ereg ("^[a-zA-Z0-9]+$", $_GET['password']) === FALSE)
{
echo '

You password must be alphanumeric

';
}
else if (strlen($_GET['password']) < 8 && $_GET['password'] > 9999999)
{
if (strpos ($_GET['password'], '-') !== FALSE) //strpos — 查找字符串首次出现的位置
{
die('Flag: ' . $flag);
}
else
{
echo('
- have not been found

');
}
}
else
{
echo '
Invalid password

';
}
}
?>
```
看来一下代码 <8,>9999999,存在矛盾

ereg()函数用指定的模式搜索一个字符串中指定的字符串,如果匹配成功返回true,否则,则返回false。

用正则匹配，如果有'a-zA-Z0-9'则直接错误，我们可以用%00来截断，在%00之后的数值函数无法识别,同时满足   strlen($_GET['password']) < 8 && $_GET['password'] > 9999999

长度跟数值本来就矛盾，我们可以用1e8 即1x10的八次方或者用数组绕过。

strpos() 查找某字符串在另一字符串中第一次出现的位置（区分大小写），本题中需要匹配到"*-*"才能输出flag。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200504192904986.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
**0×04.strpos数组绕过**

```
<?php
$flag = "flag";
if (isset ($_GET['ctf'])) {
if (@ereg ("^[1-9]+$", $_GET['ctf']) === FALSE)
echo '必须输入数字才行';
else if (strpos ($_GET['ctf'], '#biubiubiu') !== FALSE)
die('Flag: '.$flag);
else
echo '骚年，继续努力吧啊~';
}
?>
```
看看代码
首先看到的是get传参 ctf，然后必须是数字，然后再绕过 strpos。
strpos函数可以用数组绕过。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200504214809607.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
emmmmm，flag到手。
