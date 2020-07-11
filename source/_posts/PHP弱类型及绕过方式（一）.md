---
title: PHP弱类型及绕过方式（一）
date: 2020-05-03 15:04:05
tags: php学习
categories: 技术
photos:  https://cdn.jsdelivr.net/gh/yremp/cdn@2.1.5/img/cover/(5).jpg.webp
---



﻿前言：学长带着我们学习了一些PHP弱类型，现在总结记一下。
  *目录：
    0×01.extract函数变量覆盖
    0×02.strcmp函数数组漏洞
    0×03.urldecode二次密码绕过
    0×04.md5函数加密
    0×05.sha()函数比较绕过
    0×06.数组返回NULL绕过
    0×07.弱类型整数大小比较绕过*
    

以下题目来源BugkuCTF

**0×01.extract函数变量覆盖**

```
<?php
$flag='xxx';
extract($_GET);
if(isset($shiyan))
{
$content=trim(file_get_contents($flag));
if($shiyan==$content)
{
echo'flag{xxx}';
}
else
{
echo'Oh.no';
}
}
?>
```
里面有很多函数是我没见过的，先了解一下。

extract() 函数从数组中将变量导入到当前的符号表。
该函数使用数组键名作为变量名，使用数组键值作为变量值。针对数组中的每个元素，将在当前符号表中创建对应的一个变量。
漏洞：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503114734560.png)


isset() 函数用于检测变量是否已设置并且非 NULL。
如果已经使用 unset() 释放了一个变量之后，再通过 isset() 判断将返回 FALSE。
若使用 isset() 测试一个被设置成 NULL 的变量，将返回 FALSE。
同时要注意的是 null 字符（"\0"）并不等同于 PHP 的 NULL 常量。

trim() 函数移除字符串两侧的空白字符或其他预定义字符。

file_get_contents() 函数把整个文件读入一个字符串中。
漏洞：当()里是变量的话，会返回为空值。

运算符的了解：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503115023141.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
首先，我们传入的函数经过extract函数处理，if语句判断是否存在shiyan变量，file_get_contents() 处理的是flag会返回空值，即content=空值。要想拿到flag，我们就需要让shiyan也为空值，但这并不能看到变量的覆盖。
我们传入的shiyan= ,即将原来的shiyan的覆盖为空值，同时我们传入flag= ，覆盖原来flag的值为空，就可以拿到flag了，这题有点小毛病。![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503120417592.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
**0×02.strcmp函数数组漏洞**

```
<?php
$flag = "flag{xxxxx}";
if (isset($_GET['a'])) {
if (strcmp($_GET['a'], $flag) == 0) //如果 str1 小于 str2 返回 < 0； 如果 str1大于 str2返回 > 0；如果两者相等，返回 0。
//比较两个字符串（区分大小写）
die('Flag: '.$flag);
else
print 'No';
}
?>
```
看到不懂的函数就去问度娘

die() 函数输出一条消息，并退出当前脚本。

int strcmp ( string $str1 , string $str2 )
参数 str1第一个字符串。str2第二个字符串。
如果 str1 小于 str2 返回 < 0；
如果 str1 大于 str2 返回 > 0；
如果两者相等，返回 0。

我们要想拿到flag，就需要str1=str2,但是flag的长度我们也不知道，这个时候我们就不能走寻常路了：

在这里strcmp函数有漏洞只需将get传入进来的变为数组就行了。
注：这一个漏洞适用与5.3之前版本的php。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503121949137.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
flag到手。

   **0×03.urldecode二次密码绕过**
   代码奉上：

```
   <?php
if(eregi("hackerDJ",$_GET[id])) {
echo("

not allowed!

");
exit();
}
$_GET[id] = urldecode($_GET[id]);
if($_GET[id] == "hackerDJ")
{
echo "
Access granted!

";
echo "
flag

";
}
?>
```
eregi()函数在由模式指定的字符串中搜索指定的字符串，搜索不区分大小写。
exit() 函数输出一条消息，并退出当前脚本。

我们传入的id会被eregi函数与hackerDJ比较，相同的话直接就GG了。
所以我往下面看，我们传入的id经过一次url解码等于hackerDJ的话就可以拿到flag，但是浏览器还会给我们解码一次，这就意味着我们需要给hackerDJ编码两次，就能拿到flag。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503125011628.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)

0×04.md5函数加密

```
<?php
error_reporting(0);
$flag = 'flag{test}';
if (isset($_GET['username']) and isset($_GET['password'])) {
if ($_GET['username'] == $_GET['password'])
print 'Your password can not be your username.';
else if (md5($_GET['username']) === md5($_GET['password']))
die('Flag: '.$flag);
else
print 'Invalid password';
}
?>
```

我们要知道md5函数加密在低版本中是无法处理数组的(但是md5处理数组时会返回空值)。
那么突破口就来了，但是：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503192133325.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
两个返回的都是null，自然是相同的，但是代码中又要求我们不相同。
emmmmmmm,思考一下。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503192433451.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
这样值就不一样了，flag到手！



**0×05.sha()函数比较绕过**

```
<?php
$flag = "flag";
if (isset($_GET['name']) and isset($_GET['password']))
{
var_dump($_GET['name']);
echo "
";
var_dump($_GET['password']);
var_dump(sha1($_GET['name']));
var_dump(sha1($_GET['password']));
if ($_GET['name'] == $_GET['password'])
echo '

Your password can not be your name!

';
else if (sha1($_GET['name']) === sha1($_GET['password']))
die('Flag: '.$flag);
else
echo '
Invalid password.

';
}
else
echo '
Login first!

';
?>
```

这sha1函数加密，绕过方式和MD5一样，这里就不详讲了。
sha1()函数无法处理数组类型，将报错并返回false。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503194311608.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
flag奉上！



**0×06.数组返回NULL绕过**

```
<?php
$flag = "flag";

if (isset ($_GET['password'])) {
if (ereg ("^[a-zA-Z0-9]+$", $_GET['password']) === FALSE)
echo 'You password must be alphanumeric';
else if (strpos ($_GET['password'], '--') !== FALSE)
die('Flag: ' . $flag);
else
echo 'Invalid password';
}
?>
```


```
if (ereg ("^[a-zA-Z0-9]+$", $_GET['password']) === FALSE)
```
ereg函数会对你传入的password从a-z,A-Z,0-9 进行匹配，将你的密码限制在这三种字符中。

ereg()函数用指定的模式搜索一个字符串中指定的字符串,如果匹配成功返回true,否则,则返回false。搜索字母的字符是大小写敏感的。
ereg()限制password的格式，只能是数字或者字母。但ereg()函数存在NULL截断漏洞，可以使用%00绕过验证。
这里ereg有两个漏洞：
         
           ①%00截断及遇到%00则默认为字符串的结束
           ②当ntf为数组时它的返回值不是FALSE


​    
这个漏洞没有使用到。

strpos — 查找字符串首次出现的位置
作用：主要是用来查找字符在字符串中首次出现的位置。

　strpos()如果传入数组，会返回NULL（和MD5，sha1类似无法处理数组，返回值为NULL）
思路就出来了：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503200448591.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)

嘿嘿嘿，flag到手。

**0×07.弱类型整数大小比较绕过**

```
$temp = $_GET['password'];
is_numeric($temp)?die("no numeric"):NULL;
if($temp>1336){
echo $flag;
```
简单明了

is_numeric() 函数用于检测变量是否为数字或数字字符串。
我们传入的值会被is_numeric函数进行检测，如果为数字就直接输出no numeric，所以我们要后者使其返回为NULL，并且大于1366.


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200503201458938.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1ODY5MDM5,size_16,color_FFFFFF,t_70)
这就结束了？ 对的

未完待续......
