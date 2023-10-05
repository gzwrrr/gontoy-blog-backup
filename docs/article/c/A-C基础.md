---
title: "C 基础"
shortTitle: "A-C 基础"
description: "C 基础"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-03-20
category: 
- "c"
- "编程"
tag:
- "c"
- "编程"
sticky: 1
star: false
article: true
timeline: true
dir:
  text: "C 基础"
  icon: ""
  collapsible: true
  index: true
  comment: true
headerDepth: 3
index: true
order: 2
copy:
  triggerWords: 100
  disableCopy: false
  disableSelection: false
feed:
  title: "C 基础"
  description: "C 基础"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# C 基础



[[toc]]



## 类型

分类

| 类型      | 描述                                                         |
| :-------- | :----------------------------------------------------------- |
| 基本类型  | 算术类型，包括两种类型：整数类型和浮点类型                   |
| 枚举类型  | 算术类型，被用来定义在程序中只能赋予其一定的离散整数值的变量 |
| void 类型 | 类型说明符 void 表明没有可用的值                             |
| 派生类型  | 指针类型、数组类型、结构类型、共用体类型、函数类型           |

注意：

1. 数组类型和结构类型统称为聚合类型
2. 函数的类型指的是函数返回值的类型





### 整数类型

| 类型           | 存储大小     | 值范围                                               |
| :------------- | :----------- | :--------------------------------------------------- |
| char           | 1 byte       | -128 到 127 或 0 到 255                              |
| unsigned char  | 1 byte       | 0 到 255                                             |
| signed char    | 1 byte       | -128 到 127                                          |
| int            | 2 或 4 bytes | -32,768 到 32,767 或 -2,147,483,648 到 2,147,483,647 |
| unsigned int   | 2 或 4 bytes | 0 到 65,535 或 0 到 4,294,967,295                    |
| short          | 2 bytes      | -32,768 到 32,767                                    |
| unsigned short | 2 bytes      | 0 到 65,535                                          |
| long           | 4 bytes      | -2,147,483,648 到 2,147,483,647                      |
| unsigned long  | 4 bytes      | 0 到 4,294,967,295                                   |



### 浮点类型

| 类型        | 存储大小 | 值范围                 | 精度      |
| :---------- | :------- | :--------------------- | :-------- |
| float       | 4 byte   | 1.2E-38 到 3.4E+38     | 6 位小数  |
| double      | 8 byte   | 2.3E-308 到 1.7E+308   | 15 位小数 |
| long double | 10 byte  | 3.4E-4932 到 1.1E+4932 | 19 位小数 |





### void 类型

| 类型         | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| 函数返回空   | **函数返回为空** C 中有各种函数都不返回值，或者您可以说它们返回空。不返回值的函数的返回类型为空。例如 **void exit (int status);** |
| 函数参数为空 | **函数参数为空** C 中有各种函数不接受任何参数。不带参数的函数可以接受一个 void。例如 **int rand(void);** |
| 指针指向空   | **指针指向 void** 类型为 void * 的指针代表对象的地址，而不是类型。例如，内存分配函数 **void \*malloc( size_t size );** 返回指向 void 的指针，可以转换为任何数据类型。 |





### 变量

变量声明：

1. 变量声明向编译器保证变量以给定的类型和名称存在，这样编译器在不需要知道变量完整细节的情况下也能继续进一步的编译。变量声明只在编译时有它的意义，在程序连接时编译器需要实际的变量声明

2. 可以使用 **extern** 关键字在任何地方声明一个变量。虽然可以在程序中多次声明一个变量，但变量只能在某个文件、函数或代码块中被定义一次

```c
#include <stdio.h>

// 变量声明
extern int a, b;
extern int c;
extern float f;

// 函数声明
int func();

int main()
{
    /* 变量定义 */
    int a, b;
    int c;
    float f;

    /* 实际初始化 */
    a = 10;
    b = 20;

    c = a + b;
    printf("value of c : %d \n", c);

    f = 70.0 / 3.0;
    printf("value of f : %f \n", f);

    // 函数调用
    int i = func();
    printf("i: %d \n", i);

    return 0;
}

// 函数定义
int func()
{
    return 0;
}
```





### 常量

> 常量是固定值，在程序执行期间不会改变。这些固定的值，又叫做字面量
>
> 常量可以是任何的基本数据类型，比如整数常量、浮点常量、字符常量，或字符串字面值，也有枚举常量
>
> 常量就像是常规的变量，只不过常量的值在定义后不能进行修改

```c
85         /* 十进制 */
0213       /* 八进制 */
0x4b       /* 十六进制 */
30         /* 整数 */
30u        /* 无符号整数 */
30l        /* 长整数 */
30ul       /* 无符号长整数 */
3.14159       /* 合法的 */
314159E-5L    /* 合法的 */
510E          /* 非法的：不完整的指数 */
210f          /* 非法的：没有小数或指数 */
.e55          /* 非法的：缺少整数或分数 */
```

 C 中，有两种简单的定义常量的方式：

1. 使用 `#define` 预处理器
2. 使用 `const` 关键字

```c
#include <stdio.h>
#define LENGTH 10
#define WIDTH 5
#define NEWLINE '\n'

int main()
{
    int area;
    area = LENGTH * WIDTH;
    printf("value of area : %d", area);
    printf("%c", NEWLINE);

    const int LENGTH1 = 10;
    const int WIDTH1 = 5;
    const char NEWLINE1 = '\n';
    int area1;
    area1 = LENGTH1 * WIDTH1;
    printf("value of area : %d", area1);
    printf("%c", NEWLINE1);

    return 0;
}
```

注意：当局部变量被定义时，系统不会对其初始化，您必须自行对其初始化。定义全局变量时，系统会自动对其初始化

| 数据类型 | 初始化默认值 |
| :------- | :----------- |
| int      | 0            |
| char     | ''           |
| float    | 0            |
| double   | 0            |
| pointer  | NULL         |



### 存储类

存储类定义 C 程序中变量/函数的范围（可见性）和生命周期。这些说明符放置在它们所修饰的类型之前。下面列出 C 程序中可用的存储类：

- auto：auto 只能用在函数内，即 auto 只能修饰局部变量，auto 只能用在函数内，即 auto 只能修饰局部变量
- register：register 存储类用于定义存储在寄存器中而不是 RAM 中的局部变量。这意味着变量的最大尺寸等于寄存器的大小（通常是一个字节），且不能对它应用一元的 '&' 运算符（因为它没有内存位置）；寄存器只用于需要快速访问的变量，比如计数器。还应注意的是，定义 'register' 并不意味着变量将被存储在寄存器中，它意味着变量可能存储在寄存器中，这取决于硬件和实现的限制
- static：static 存储类指示编译器在程序的生命周期内保持局部变量的存在，而不需要在每次它进入和离开作用域时进行创建和销毁。因此，使用 static 修饰局部变量可以在函数调用之间保持局部变量的值
- extern：
  - extern 存储类用于提供一个全局变量的引用，全局变量对所有的程序文件都是可见的。当使用 'extern' 时，对于无法初始化的变量，会把变量名指向一个之前定义过的存储位置
  - 当有多个文件且定义了一个可以在其他文件中使用的全局变量或函数时，可以在其他文件中使用 *extern* 来得到已定义的变量或函数的引用。可以这么理解，*extern* 是用来在另一个文件中声明一个全局变量或函数



## 流程控制

1. 判断：
   1. if-else
   2. 三元运算符
2. 循环：
   1. for
   2. while
   3. do-while
3. 循环控制语句：
   1. break
   2. continue
   3. goto





## 函数

> C 标准库提供了大量的程序可以调用的内置函数。例如，函数 **strcat()** 用来连接两个字符串，函数 **memcpy()** 用来复制内存到另一个位置

包含：

1. 函数声明：告诉编译器函数的名称、返回类型和参数
2. 函数定义：提供了函数的实际主体
3. 函数参数：
   1. 传值调用： 该方法把参数的实际值复制给函数的形式参数。在这种情况下，修改函数内的形式参数不会影响实际参数
   2. 引用调用：该方法把参数的地址复制给形式参数。在函数内，该地址用于访问调用中要用到的实际参数。这意味着，修改形式参数会影响实际参数





### 数组

> C 语言支持数组数据结构，它可以存储一个固定大小的相同类型元素的顺序集合。数组是用来存储一系列数据，但它往往被认为是一系列相同类型的变量

```c
#include <stdio.h>

int main()
{
    // 初始化数组，其中 5 可以忽略
    double balance[5] = {1000.0, 2.0, 3.4, 7.0, 50.0};

    int n[10]; /* n 是一个包含 10 个整数的数组 */
    int i, j;

    /* 初始化数组元素 */
    for (i = 0; i < 10; i++)
    {
        n[i] = i + 100; /* 设置元素 i 为 i + 100 */
    }                   /* 输出数组中每个元素的值 */
    for (j = 0; j < 10; j++)
    {
        printf("Element[%d] = %d\n", j, n[j]);
    }
    return 0;
}
```

| 概念                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [多维数组](https://www.w3cschool.cn/c/c-multi-dimensional-arrays.html) | C 支持多维数组。多维数组最简单的形式是二维数组。             |
| [传递数组给函数](https://www.w3cschool.cn/c/c-passing-arrays-to-functions.html) | 您可以通过指定不带索引的数组名称来给函数传递一个指向数组的指针。 |
| [从函数返回数组](https://www.w3cschool.cn/c/c-return-arrays-from-function.html) | C 允许从函数返回数组。                                       |
| [指向数组的指针](https://www.w3cschool.cn/c/c-pointer-to-an-array.html) | 您可以通过指定不带索引的数组名称来生成一个指向数组中第一个元素的指针。 |

```c
// 多维数组声明
type name[size1][size2]...[sizeN];

// 传递数组给函数
// 使用指针传递
void myFunction(int *param){...}
// 形参确定大小
void myFunction(int param[10]){...}
// 形参未知大小
void myFunction(int param[]){...}

// 函数返回数组
// 注意：C 语言不允许返回一个完整的数组作为函数的参数。但是，您可以通过指定不带索引的数组名来返回一个指向数组的指针
int * myFunction(){...}

// 指向数组的指针
double *p;
double balance[10];
p = balance;
```





## 指针

> 通过指针，可以简化一些 C 编程任务的执行，还有一些任务，如动态内存分配，没有指针是无法执行的

每一个变量都有一个内存位置，每一个内存位置都定义了可使用连字号（&）运算符访问的地址，它表示了在内存中的一个地址

```c
#include <stdio.h>

int main()
{
    // & 取地址
    int var1;
    char var2[10];
    printf("var1 变量的地址： %x\n", &var1);
    printf("var2 变量的地址： %x\n", &var2);

    // 指针
    int var = 20; /* 实际变量的声明 */
    int *ip;      /* 指针变量的声明 */
    ip = &var;    /* 在指针变量中存储 var 的地址 */

    printf("Address of var variable: %x\n", &var);
    /* 在指针变量中存储的地址 */
    printf("Address stored in ip variable: %x\n", ip);
    /* 使用指针访问值 */
    printf("Value of *ip variable: %d\n", *ip);
    return 0;
}
```

在变量声明的时候，如果没有确切的地址可以赋值，为指针变量赋一个 NULL 值是一个良好的编程习惯

```c
#include <stdio.h>
int main ()
{	
   int  *ptr = NULL;
   printf("ptr 的值是 %x\n", ptr  );
   return 0;
}
```

还有一些指针相关的内容

| 概念                                                         | 描述                                                     |
| :----------------------------------------------------------- | :------------------------------------------------------- |
| [指针的算术运算](https://www.w3cschool.cn/c/c-pointer-arithmetic.html) | 可以对指针进行四种算术运算：++、--、+、-                 |
| [指针数组](https://www.w3cschool.cn/c/c-array-of-pointers.html) | 可以定义用来存储指针的数组。                             |
| [指向指针的指针](https://www.w3cschool.cn/c/c-pointer-to-pointer.html) | C 允许指向指针的指针。                                   |
| [传递指针给函数](https://www.w3cschool.cn/c/c-passing-pointers-to-functions.html) | 通过引用或地址传递参数，使传递的参数在调用函数中被改变。 |
| [从函数返回指针](https://www.w3cschool.cn/c/c-return-pointer-from-functions.html) | C 允许函数返回指针到局部变量、静态变量和动态内存分配。   |

```c
// 指针数组指：数组中的每一个元素都是指针
// 指针数组声明
int *ptr[MAX];

// 指向指针的指针
int  **pptr;

// 传递指针给函数
void getSeconds(unsigned long *par);
```



## 字符串

> 在 C 语言中，字符串实际上是使用 **null** 字符 '' 终止的一维字符数组。因此，一个以 null 结尾的字符串，包含了组成字符串的字符‘

操作字符串的函数

| 函数                | 说明                                                         |
| :------------------ | :----------------------------------------------------------- |
| **strcpy(s1, s2);** | 复制字符串 s2 到字符串 s1。                                  |
| **strcat(s1, s2);** | 连接字符串 s2 到字符串 s1 的末尾。                           |
| **strlen(s1);**     | 返回字符串 s1 的长度。                                       |
| **strcmp(s1, s2);** | 如果 s1 和 s2 是相同的，则返回 0；如果 s1<s2 则返回小于 0；如果 s1>s2 则返回大于 0。 |
| **strchr(s1, ch);** | 返回一个指针，指向字符串 s1 中字符 ch 的第一次出现的位置。   |
| **strstr(s1, s2);** | 返回一个指针，指向字符串 s1 中字符串 s2 的第一次出现的位置。 |





## 结构体

> C 数组允许定义可存储相同类型数据项的变量，结构体是 C 编程中另一种用户自定义的可用的数据类型，它允许存储不同类型的数据项

结构体的定义

```c
// structure tag 是可选的
struct [structure tag]
{
   // 每个 member definition 是标准的变量定义
   // 比如 int i; 或者 float f; 或者其他有效的变量定义
   member definition;
   member definition;
   ...
   member definition;
   // 在结构定义的末尾，最后一个分号之前，您可以指定一个或多个结构变量，这是可选的
} [one or more structure variables];  
```

为了访问结构的成员，使用成员访问运算符 `.`

```c
#include <stdio.h>
#include <string.h>

struct Books
{
    char title[50];
    char author[50];
    char subject[100];
    int book_id;
};

/* 函数声明 */
void printBook(struct Books book);

int main()
{
    struct Books Book1; /* 声明 Book1，类型为 Book */
    struct Books Book2; /* 声明 Book2，类型为 Book */

    /* Book1 详述 */
    strcpy(Book1.title, "C Programming");
    strcpy(Book1.author, "Nuha Ali");
    strcpy(Book1.subject, "C Programming Tutorial");
    Book1.book_id = 6495407;

    /* Book2 详述 */
    strcpy(Book2.title, "Telecom Billing");
    strcpy(Book2.author, "Zara Ali");
    strcpy(Book2.subject, "Telecom Billing Tutorial");
    Book2.book_id = 6495700;

    /* 输出 Book1 信息 */
    printf("Book 1 title : %s\n", Book1.title);
    printf("Book 1 author : %s\n", Book1.author);
    printf("Book 1 subject : %s\n", Book1.subject);
    printf("Book 1 book_id : %d\n", Book1.book_id);

    /* 输出 Book2 信息 */
    printf("Book 2 title : %s\n", Book2.title);
    printf("Book 2 author : %s\n", Book2.author);
    printf("Book 2 subject : %s\n", Book2.subject);
    printf("Book 2 book_id : %d\n", Book2.book_id);

    printBook(Book1);
    printBook(Book2);
    return 0;
}

void printBook(struct Books book)
{
    printf("Book title : %s\n", book.title);
    printf("Book author : %s\n", book.author);
    printf("Book subject : %s\n", book.subject);
    printf("Book book_id : %d\n", book.book_id);
}
```

可以定义指向结构的指针，方式与定义指向其他类型变量的指针相似，为了使用指向该结构的指针访问结构的成员，必须使用 `->` 运算符

```c#
// 指向结构体的指针
struct Books *struct_pointer;

// 函数声明
void printBook2(struct Books *book);

// 函数定义，使用 -> 访问
void printBook2(struct Books *book)
{
    printf("Book title : %s\n", book->title);
    printf("Book author : %s\n", book->author);
    printf("Book subject : %s\n", book->subject);
    printf("Book book_id : %d\n", book->book_id);
}

int main()
{
    /* 通过传 Book1 的地址来输出 Book1 信息 */
    printBook( &Book1 );

    /* 通过传 Book2 的地址来输出 Book2 信息 */
    printBook( &Book2 );
}
```





## 共用体

> 共用体是一种特殊的数据类型，允许您在相同的内存位置存储不同的数据类型。您可以定义一个带有多成员的共用体，但是任何时候只能有一个成员带有值。共用体提供了一种使用相同的内存位置的有效方式

共用体定义方式与定义结构类似，成员访问规则也类似

```c
union [union tag]
{
   member definition;
   member definition;
   ...
   member definition;
} [one or more union variables];  
```



## Typedef

> C 语言提供了 **typedef** 关键字，您可以使用它来为类型取一个新的名字

```c
#include <stdio.h>
#include <string.h>
 
typedef struct Books
{
   char  title[50];
   char  author[50];
   char  subject[100];
   int   book_id;
} Book;
 
int main( )
{
   Book book;
 
   strcpy( book.title, "C Programming");
   strcpy( book.author, "Nuha Ali"); 
   strcpy( book.subject, "C Programming Tutorial");
   book.book_id = 6495407;
 
   printf( "Book title : %s\n", book.title);
   printf( "Book author : %s\n", book.author);
   printf( "Book subject : %s\n", book.subject);
   printf( "Book book_id : %d\n", book.book_id);

   return 0;
}
```

**#define** 是 C 指令，用于为各种数据类型定义别名，与 **typedef** 类似，但是它们有以下几点不同：

- **typedef** 仅限于为类型定义符号名称，**#define** 不仅可以为类型定义别名，也能为数值定义别名，比如您可以定义 1 为 ONE。
- **typedef** 是由编译器执行解释的，**#define** 语句是由预编译器进行处理的。





## 文件读取

```C
#include <stdio.h>
int main()
{
    FILE *fp;
    // 写操作
    fp = fopen("./file/file.txt", "w+");
    fprintf(fp, "This is testing for fprintf...\n");
    fputs("This is testing for fputs...\n", fp);
    fclose(fp);
    // 读操作
    char buff[255];
    fp = fopen("./file/file.txt", "r");
    fscanf(fp, "%s", buff); // 写入的时候和平常没有区别，还是只有字符串变量前不加‘&’，其他int、double等类型前都要加‘&’符号
    printf("1: %s\n", buff);
    fgets(buff, 255, (FILE *)fp); // scanf遇到空格就会断开，gets会读取空格，遇到换行就结束
    printf("2: %s\n", buff);      // 255是限制最大读取内容长度
    fgets(buff, 255, (FILE *)fp);
    printf("3: %s\n", buff);
    fclose(fp);
}
```



## 预处理器

> **C 预处理器**不是编译器的组成部分，但是它是编译过程中一个单独的步骤。简言之，C 预处理器只不过是一个文本替换工具而已，它们会指示编译器在实际编译之前完成所需的预处理。我们将把 C 预处理器（C Preprocessor）简写为 CPP

| 宏指令   | 说明                                                        |
| :------- | :---------------------------------------------------------- |
| #define  | 定义宏                                                      |
| #include | 包含一个源代码文件                                          |
| #undef   | 取消已定义的宏                                              |
| #ifdef   | 如果宏已经定义，则返回真                                    |
| #ifndef  | 如果宏没有定义，则返回真                                    |
| #if      | 如果给定条件为真，则编译下面代码                            |
| #else    | #if 的替代方案                                              |
| #elif    | 如果前面的 #if 给定条件不为真，当前条件为真，则编译下面代码 |
| #endif   | 结束一个 #if……#else 条件编译块                              |
| #error   | 当遇到标准错误时，输出错误消息                              |
| #pragma  | 使用标准化方法，向编译器发布特殊的命令到编译器中            |

ANSI C 定义了许多宏。在编程中可以使用这些宏，但是不能直接修改这些预定义的宏

| 宏       | 描述                                                |
| :------- | :-------------------------------------------------- |
| __DATE__ | 当前日期，一个以 "MMM DD YYYY" 格式表示的字符常量。 |
| __TIME__ | 当前时间，一个以 "HH:MM:SS" 格式表示的字符常量。    |
| __FILE__ | 这会包含当前文件名，一个字符串常量。                |
| __LINE__ | 这会包含当前行号，一个十进制常量。                  |
| __STDC__ | 当编译器以 ANSI 标准编译时，则定义为 1。            |



## 错误处理

> C 语言不提供对错误处理的直接支持，但是作为一种系统编程语言，它以返回值的形式允许您访问底层数据。在发生错误时，大多数的 C 或 UNIX 函数调用返回 1 或 NULL，同时会设置一个错误代码 errno，该错误代码是全局变量，表示在函数调用期间发生了错误。您可以在 <error.h> 头文件中找到各种各样的错误代码。
>
> 所以，C 程序员可以通过检查返回值，然后根据返回值决定采取哪种适当的动作。开发人员应该在程序初始化时，把 errno 设置为 0，这是一种良好的编程习惯。0 值表示程序中没有错误。

C 语言提供了 **perror()** 和 **strerror()** 函数来显示与 **errno** 相关的文本消息。

- **perror()** 函数显示您传给它的字符串，后跟一个冒号、一个空格和当前 errno 值的文本表示形式。
- **strerror()** 函数，返回一个指针，指针指向当前 errno 值的文本表示形式。



## 内存管理

> C 语言为内存的分配和管理提供了几个函数。这些函数可以在 **<stdlib.h>** 头文件中找到

| 函数                                             | 描述                                                         |
| :----------------------------------------------- | :----------------------------------------------------------- |
| **void \*calloc(int num, int size);**            | 该函数分配一个带有 function allocates an array of **num** 个元素的数组，每个元素的大小为 **size** 字节。 |
| **void free(void \*address);**                   | 该函数释放 address 所指向的h内存块                           |
| **void \*malloc(int num);**                      | 该函数分配一个 **num** 字节的数组，并把它们进行初始化        |
| **void \*realloc(void \*address, int newsize);** | 该函数重新分配内存，把内存扩展到 **newsize**                 |



## 其他

### 作用域规则

任何一种编程中，作用域是程序中定义的变量所存在的区域，超过该区域变量就不能被访问。C 语言中有三个地方可以声明变量：

1. 在函数或块内部的局部变量
2. 在所有函数外部的全局变量
3. 在形式参数的函数参数定义中



### 位域

有些信息在存储时，并不需要占用一个完整的字节，而只需占几个或一个二进制位。例如在存放一个开关量时，只有 0 和 1 两种状态，用 1 位二进位即可。为了节省存储空间，并使处理简便，C 语言又提供了一种数据结构，称为"位域"或"位段"

所谓"位域"是把一个字节中的二进位划分为几个不同的区域，并说明每个区域的位数。每个域有一个域名，允许在程序中按域名进行操作。这样就可以把几个不同的对象用一个字节的二进制位域来表示

典型的实例：

- 用 1 位二进位存放一个开关量时，只有 0 和 1 两种状态。
- 读取外部文件格式——可以读取非标准的文件格式。例如：9 位的整数。

位域与结构体相仿

```c
struct bs{
    int a:8;
    int b:2;
    int c:6;
};
```

注意点：

1. 一个位域必须存储在同一个字节中，不能跨两个字节。如一个字节所剩空间不够存放另一位域时，应从下一单元起存放该位域。也可以有意使某位域从下一单元开始
2. 由于位域不允许跨两个字节，因此位域的长度不能大于一个字节的长度，也就是说不能超过8位二进位。如果最大长度大于计算机的整数字长，一些编译器可能会允许域的内存重叠，另外一些编译器可能会把大于一个域的部分存储在下一个字中
3. 位域可以是无名位域，这时它只用来作填充或调整位置。无名的位域是不能使用的

```c
struct bs{
    unsigned a:4;
    unsigned  :4;    /* 空域 */
    unsigned b:4;    /* 从下一单元开始存放 */
    unsigned c:4
}
```



### 局部变量

C 不支持在函数外返回局部变量的地址，除非定义局部变量为 **static** 变量



### 运算符

> 略



### 其他

1. 头文件
2. 强制类型转换
3. 可变参数
4. 命令行参数

