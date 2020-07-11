---
title: C++复习
date: 2020-05-20 15:04:05
tags: c++学习
categories: 技术
photos: https://pics.images.ac.cn/image/5ece063c787c7.html
---



﻿前言：慢慢复习路！！！

目录：
0×01：函数的重载
0×02：函数的模板
0×03：有默认参数的函数
0×04：变量的引用
0×05：将引用作为函数参数
0×06：内置函数
0×07：作用域运算符
0×08：字符串变量
0×09：动态分配/撤销内存的运算符new和delete


**0×01：函数的重载**
          定义：C++允许在同一个域中用一个函数名定义多个函数，这些函数的参数个数、参数类型不相同。用一个函数名实现不同的功能，就是函数的重载。

例一：
```

#include <iostream>
using namespace std;
int max(int a,int b,int c)           //求3个整数中的最大者
{ if (b>a) a=b;
if (c>a) a=c;
return a; 
} 
float max(float a,float b, float c)  //求3个实数中的最大者
{if (b>a) a=b;
 if (c>a) a=c;
 return a; 
} 
long max(long a,long b,long c)  //求3个长整数中的最大者
{if (b>a) a=b;
 if (c>a) a=c;
 return a;
}
```
例二：
```
int main( )
{int a,b,c;  float d,e,f;  long g,h,i;
cin>>a>>b>>c; 
cin>>d>>e>>f;
cin>>g>>h>>i;
int m;
m= max(a,b,c);                        //函数值为整型
cout <<"max_i="<<m<<endl;
float n;
n=max(d,e,f);                          //函数值为实型
cout<<"max_f="<<n<<endl;
long int p;
p=max(g,h,i);                          //函数值为长整型
cout<<"max_l="<<p<<endl;
return 0;
}
```
例三：
```
下面的例子说明用函数重载设计参数个数不同的函数，用一个函数名求两个整数或三个整数中的最大数。
#include <iostream>
using namespace std;

int max(int a,int b,int c)     //求3个整数中的最大者
{if (b>a) a=b;
 if (c>a) a=c;
 return a;
}
```
注意：`不允许函数参数个数、参数类型都相同，只是函数返回值不同。因为系统无法从调用形式上判断调用与哪个函数相匹配。`

**0×02：函数的模板**

定义：如果两个函数的参数个数相同，函数的行为相同（做同样的事），只是函数和参数的数据类型不同，如果用函数重载的话，编写的函数代码是相同的，为了节省时间，C++提供了函数模板功能。(C++比C语言方便多了，小声bb)

格式：
	template typename 标识符[, typename 标识符, … … ]
	函数定义（函数的类型和参数的类型用声明的标识符表示）
template    是关键字，含义是模板
	typename  是关键字，表示其后的标识符代表类型参数，调用时根据实参的类型确定形参的类型。
	所谓函数模板，是建立一个通用函数，不指定函数类型和参数类型，而用一个虚拟的类型表示。在调用函数时，用实参的类型取代模板中的虚拟类型。

例1  为计算两个数中的大数定义函数模板

```
#include <iostream>
using namespace std;
template <typename T>
T max(T a,T b,T c)  //用虚拟类型T表示类型
{if(b>a) a=b;
 if(c>a) a=c;
 return a;
}
int main()
{int i1=8,i2=5,i3=6,i;
 double d1=56.9,d2=90.765,d3=43.1,d;
 long g1=67843,g2=-456,g3=78123,g;
 i=max(i1,i2,i3);
 d=max(d1,d2,d3);
 g=max(g1,g2,g3);
 cout<<"i_max="<<i<<endl;
 cout<<"d_max="<<d<<endl;
cout<<"g_max="<<g<<endl;
 return 0;
}
```
注意：`从程序中看到，此问题用函数模板比用函数重载更方便。注意，函数模板只适用于函数参数的个数相同而类型不同，并且函数体相同的情况，如果函数的参数个数不同，则不能用函数模板。
`
**0×03：有默认参数的函数**

C++允许为函数的参数设置默认值，这时调用函数时，如果没有实参，就以默认值作为实参值。
	格式：
	形参类型  形参变量名 = 常数
	功能：调用函数时，如果没有实参，就以常数作为该形参的值;如果有实参，仍以实参的值作为该形参的值。
	注意：`有默认值的形参必须放在形参表的右边，不允许无默认参数值和有默认参数值的形参交错排列。`

字面意思不好理解，例子奉上。

```
编写计算圆柱体体积函数
	float  volume ( float h, float r = 12.5)

	调用可以采用以下任何一种形式：
	volume( 45.6);
	volume( 32.5, 10.5);
	函数参数结合从左到右，用第一种方式调用时，只有一个实参，圆半径的值取默认值12.5，用第二种方式调用时，有两个实参，圆半径的值取实参的值10.5。
```
注意：`
一、如果用函数原型声明，只要在函数原型声明中定义形参的默认值即可。
二、一个函数名不能同时用于重载函数和带默认形参值的函数。当调用函数时，如少写一个参数，系统无法判断是利用重载函数还是利用带默认参数值的函数，出现二义性。`

**0×04：变量的引用**

C++提供了为变量取别名的功能，这就是变量的引用。
格式： 类型   &变量1 = 变量2
变量2是在此之前已经定义过的变量，且与变量1的类型相同。这里为变量2定义一个别名变量1，在程序里变量1和变量2 就是同一个变量。
注意：两个变量不能用同一个别名。

```
例：int a = 3 ,b =4;
	       int &c = a;  //   c是a 的别名
	       int &c = b;  //   错误的用法
	一个变量可以有多个别名
	例：int a = 3;
		  int & b= a;
		  int & c= b;
	变量a 有两个别名b和c。
```
又来

```
#include <iostream>
using namespace std;
int main( )
{int a=10;
 int &b=a;    //声明b是a的引用
 a=a*a;       //a的值变化了，b的值也应一起变化
 cout<<a<<"  "<<b<<endl;   
 b=b/5;        //b的值变化了，a的值也应一起变化
 cout<<b<<"  "<<a<<endl;
 return 0;
}
```
**0×05：将引用作为函数参数**

C++除了可以用普通变量、指针变量做形参外，还可以用引用变量做形参。
	（1）用普通变量做形参
	这时传递的是实参的值，在函数内形参与实参是两个不同的内存单元，对形参的修改不会影响实参的值。
	

```
例：无法实现两个变量的值互换的程序
#include <iostream>
using namespace std;
void swap(int a,int b)
{ int temp;
 temp=a;
 a=b;
 b=temp;                //  实现a和b的值互换
}
int main( )
{int i=3,j=5;
 swap(i,j);
 cout<<i<<","<<j<<endl;   //  i和j的值未互换
 return 0;
}
```
（2）用指针变量做形参

C语言还允许用指针变量做形参，这时传递的是实参变量的地址（指针），在函数内利用这个指针访问实参变量。
	例1.11用指针变量做形参，实现两个变量值的交换。
```
#include <iostream>
using namespace std;
void swap(int *p1,int *p2)
{int temp;
 temp=*p1;
 *p1= *p2;
 *p2=temp;
}
int main( )
{int i=3,j=5;
 swap(&i,&j);
 cout<<i<<","<<j<<endl;
 return 0;
}
```
3）用引用变量做形参

用指针变量做形参，它将实参变量的地址传递给形参，在函数内用“*指针变量”的方式访问实参变量。我们知道引用变量是变量的别名，在调用函数时，用引用变量做的形参就成了实参变量的别名，在函数中用的形参名就是实参的别名，这样比用指针变量更直观、更方便。

```
例：利用引用变量实现两个变量值的交换
#include <iostream>
using namespace std;
void swap(int &a,int &b)
{int temp;
 temp=a;
 a=b;
 b=temp;
}
int main( )
{int i=3,j=5;
 swap(i,j);
 cout<<"i="<<i<<"   "<<"j="<<j<<endl;
 return 0;
}
```
***对引用的进一步说明***
（1）引用变量都具有非void类型
（2）不能建立引用的数组
（3）可以建立常引用变量，不允许修改常引用变量的值
例： int i ;
 	   const  int &a = i;
 	   a = 3;   //    错误的用法
 	   i  = 8;   //    i 不是常变量，可以修改
 	   （4）可以建立指针变量的引用变量
例：int i; 
 	  int  *p = & i;
 	  int * &pt = p; // pt是p的别名变量，同时
                            // 也是指针变量


**0×06：内置函数**

C++ 提供了一种机制，在编译时，将所调用的函数的代码嵌入到调用函数代码中，在执行函数时省去了调用环节，提高了函数的执行速度。这种机制称为内置函数，有的书称内联函数。
	格式：
	inline 函数类型 函数名(形参表)
	{    函数体    } 
  	inline 是C++的关键字，在编译时，编译程序会把这个函数嵌入到调用函数的函数体中
	调用格式：   函数名（实参表）
	

```
例：计算三个整数中的大数
#include <iostream>
using namespace std;
inline int max(int a,int b,int c)   // 这是一个内置函数，
                                                 // 求3个整数中的最大者
{if (b>a) a=b;
 if (c>a) a=c;
 return a;
} 

int main( )
{int i=7,j=10,k=25,m;
 m=max(i,j,k);
 cout<<"max="<<m<<endl;
 return 0;
}
```
由于在定义函数时指定它是内置函数，因此编译系统在遇到函数调用max( i,j,k ) 时就用max函数体的代码代替max( i,j,k ) ，同时用实参代替形参。调用语句m= max( i,j,k ) 就被置换成：
	{  a=i ; b = j ; c= k;
	if ( b>a) a=b;
	if ( c>a) a=c;
	m=a;  
	 }


```
例:用内置函数计算平方根
#include <iostream>
using namespace std;
inline int power(int x)       //定义内置函数
{return x*x;}

int main()
{cout<<power(2)<<endl;
 cout<<power(1+1)<<endl;
 return 0;
}
```

编译程序遇见内置函数power时，先求出函数的实参值（1+1=2），然后用power函数体代替函数调用，调用语句变成：
	{  cout<<2*2<<endl;
	   cout<<2*2<<endl;
	}
	运行结果是
	4
	4 


优缺点：`使用内置函数可以节省程序的运行时间，但增加了目标程序的长度。所以在使用时要衡量时间和空间的得失。`

**0×07：作用域运算符**
直接看例子：

```
局部变量和全局变量同名
	#include <iostream>
	using namespace std;
	float a=13.5;
	int main( )
	{    int a=5;
	     cout<<a<<endl;
	     return 0;    }
```
程序中有两个变量a，一个是全局变量，另一个是main函数的局部变量，根据局部变量会屏蔽同名的全局变量规则，在函数中出现的变量a是局部变量，因此输出的值是5，而不是13.5，为了在函数中访问全局变量C++提供了作用域运算符 :: ，可以用来指定要访问的作用域，可以把main函数改写成

```
#include <iostream>
	using namespace std;
	float a=13.5;
	int main( )
	{int a=5;
	cout<<a<<endl;
	cout<<::a<<endl;
	 return 0;
	}
```
::a表示全局变量a。注意不能用::访问局部变量。

**0×08：字符串变量**

C++提供了字符串类类型string，实际上它不是C++的基本类型，它是在C++标准库中声明的一个字符串类，程序可以用它定义对象。
	1.定义字符串变量
	格式：  string 变量名表;
	可以在定义变量时用字符串常量为变量赋初值：
			string   变量名 = 字符串常量
	**注意**：`如用字符串变量，在程序开始要用包含语句把C++标准库的string头文件包含进来。`

2.对字符串操作
① 对字符串变量赋值
 	字符串变量= 字符串表达式
例： string  st1,st2;
 	   st1 = “王点点“;
 	   st2 = st1;
 	  
 ②  访问字符串中的字符
C++允许把字符串作为字符数组，第一个字符的下标是0，第二个字符的下标是1，以此类推。
例：string  w = “ then”;
 	  w[2] = ‘e’;
结果字符串w变成 than

③输入输出字符串
格式：cin >> 字符串变量
           cout << 字符串变量

④字符串连接运算
格式：字符串1 + 字符串2
功能：把连接运算符两端的字符连接成一个字符串。表达式中可以用字符串常量也可以用字符串变量。
例：string  st1=“C++”;
 	  string  st2=“Language”;
 	  st1 = st1 + st2 ;
结果是 C++Language

⑤字符串的比较运算
	可以用关系运算符>、>=、==、!=、<、<=对两个字符串同一位置的字符进行比较，根据ASCII码值判定字符的大小。
	例：”china” > “chinese”
	运算结果是假。

**0×09：动态分配/撤销内存的运算符new和delete** 

分配内存运算
new  类型 [ （初值）]
类型是决定分配空间尺寸的关键元素，如果运算结果正确，它的值是分配内存空间的起始地址，否则返回NULL。

```
例：int  *a =new int ;
 	  int  *b =new int( 100);
 	  char *ch = new char[10];
 	  int * q = new int [5][4];
  	  float  * p = new float(3.14159);
```
归还动态内存运算
delete[] 指针变量
[] 代表数组，如果不是数组可以省略[]。
运算功能：撤销指针变量所指的动态内存空间，指针变量的数据类型决定了空间尺寸的大小。

```
例：char *p=new char[10];
        … …
 	 delete [ ] p;
```

```
例1.18用动态内存存放结构体变量
#include <iostream>
#include <string.h>
using namespace std;
struct student 
{char name [10];
 int num;
 char sex;
};
int main ( )
{student *p;
 p=new student;
 strcpy(p->name,"Wang Fun");
 p->num=10123;
 p->sex='M';
 cout<<p->name<<"  "<<p->num<<"  "<<p->sex<<endl;
 delete p;
 return 0;
}
```
先声明了一个结构体类型student，定义一个指向它的指针变量p，用new开辟一个空间存放一个student类型变量。
如果无法正常分配内存，运算会返回一个空指针NULL，程序可以设计判断结构，根据判断结果决定怎样操作。
注意不要混合使用new、delete、malloc、free。要正确搭配，不要用new分配内存后，又用free释放内存。


明天继续复习！！！
