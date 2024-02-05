---
notPage: true
---



# C

:::info 说明
C 的简单使用

相关文章：
1. [W3C 的 C 语言教程](https://www.w3cschool.cn/c/c-intro.html)
2. [MinGW 下载](https://www.w3cschool.cn/c/install-mingw.html)
3. [C/C++框架和第三方库汇总](https://zhuanlan.zhihu.com/p/414471607)

:::





## 标准库

> 参考：https://www.w3cschool.cn/c/c-standard-library.html

1. `<assert.h>`：用于验证程序做出的假设，并在假设为假时输出诊断消息
2. `<ctype.h>`：可用于测试和映射字符
3. `<errno.h>`：C 标准库的 **errno.h** 头文件定义了整数变量 **errno**，它是通过系统调用设置的，在错误事件中的某些库函数表明了什么发生了错误；在程序启动时，**errno** 设置为零，C 标准库中的特定函数修改它的值为一些非零值以表示某些类型的错误
4. `<float.h>`：C 标准库的 **float.h** 头文件包含了一组与浮点值相关的依赖于平台的常量。这些常量是由 ANSI C 提出的，这让程序更具有可移植性
5. `<limists.h>`：**limits.h** 头文件决定了各种变量类型的各种属性。定义在该头文件中的宏限制了各种变量类型（比如 char、int 和 long）的值
6. `<locale.h>`：**locale.h** 头文件定义了特定地域的设置，比如日期格式和货币符号
7. `<math.h>`：**math.h** 头文件定义了各种数学函数和一个宏。在这个库中所有可用的功能都带有一个 **double** 类型的参数，且都返回 **double** 类型的结果
8. `<setjmp.h>`：**setjmp.h** 头文件定义了宏 **setjmp()**、函数 **longjmp()** 和变量类型 **jmp_buf**，该变量类型会绕过正常的函数调用和返回规则
9.  `<signal.h>`：**signal.h** 头文件定义了一个变量类型 **sig_atomic_t**、两个函数调用和一些宏来处理程序执行期间报告的不同信号
10. `<stdarg.h>`：**stdarg.h** 头文件定义了一个变量类型 **va_list** 和三个宏，这三个宏可用于在参数个数未知（即参数个数可变）时获取函数中的参数
11. `<stddef.h>`：**stddef .h** 头文件定义了各种变量类型和宏。这些定义中的大部分也出现在其它头文件中
12. `<stdio.h>`：**stdio .h** 头文件定义了三个变量类型、一些宏和各种函数来执行输入和输出
13. `<stdlib.h>`：**stdlib .h** 头文件定义了四个变量类型、一些宏和各种通用工具函数
14. `<string.h>`：**string .h** 头文件定义了一个变量类型、一个宏和各种操作字符数组的函数
15. `<time.h>`：**time.h** 头文件定义了四个变量类型、两个宏和各种操作日期和时间的函数







