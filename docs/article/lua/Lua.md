---
title: "Lua 简单使用"
shortTitle: "Lua 简单使用"
description: "Lua 简单使用"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-11-10
category: 
- "lua"
tag:
- "lua"
sticky: 1
star: false
article: true
timeline: true,
dir:
  text: "Lua 简单使用"
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
  title: "Lua 简单使用"
  description: "Lua 简单使用"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# Lua 简单使用



[[toc]]



## 概览

**包含：**

1. 基础语法
2. 流程控制
3. 函数
4. table（包含很多函数）：pack、unpack、concat、insert、remove、sort，可以数组和 map 混合存储，且 map 的元素不占数组的索引
   1. 数组：可以有多维，数组下面从 1 开始，无需声明长度，可以随时添加元素，并且元素可以是任意类型，但是不能包含 nil
   2. map
5. 迭代器：pairs（迭代数组元素）、ipairs（迭代所有元素）
6. 模块：一般为一个 table
7. 元表与元方法：每个普通的 table 都可以变为一个元表，可以改变普通 table 的方法或者说表现
   1. setmetatable(table, metatable)：将 metatable 指定为普通表的元表
   2. getmetatable()：获取元表
8. 对象：Lua 中没有类的概念，但是可以通过 table、function 和元表模拟类的功能和结构
9. 协同线程：类型为 thread，也称为多线程，但是注意，任意时刻只会有一个协同线程执行，不会有多个，只不过可以暂停转到其他协同线程执行
10. 协同函数：协同线程可以单独创建执行，也可以通过协同函数的调用启动执行，可以使用 coroutine.wrap() 获取到协同函数
11. 文件 IO

**其他：**

1. 空值：nil

2. 函数可以当作参数传递



## 流程控制

```lua
-- if
if a > 1 then
    -- xx
elseif a < 1 then
    --xx
else
    --xx
end

-- for 循环
for i = 1, 3 do
    print(i)
end

-- 数组 foreach
for i, v in pairs(array) do
    print(i, v)
end

-- table foreach
for i, v in ipairs(array) do
    print(i, v)
end
```



## 模块

```lua
-- 声明模块，单独文件中声明
rect = {}

-- 在其他文件中引入
require "rect"

-- 添加一个模块变量
rect.pi = 3.14

-- 添加一个模块函数
function rect.per(a, b)
    return (a + b) * 2
end

-- 匿名函数
rect.area = function(a, b)
    return a * b
end

-- 下面定义与模块无关的内容，在其他文件中引入后可以直接使用
-- 定义一个全局变量
global = 100

-- 定义一个局部函数
local function circle(r)
    return rect.pi * r * r
end

-- 定义一个全局函数
function maxArea(a, b)
    local r = math.min(a, b)
    return circle(r)
end
```



## 元表

> 其他元方法看官网：https://www.lua.org/manual/5.4/

```lua
-- 声明一个元表
meta = {
    __tostring = function(tab)
        ---xxx
    end
}

-- 将原表与元表相关联，使用时还是直接用 table
setmetatable(table, meta)

-- key 不存在原本输出 nil，可以修改
meta.__index = function(tab, key)
    return key..”不存在“
end

-- 新增一个 key 时返回
function meta.__newindex(tab, key, val)
    print("新增"..key)
	return val
end
```





## 类

```lua
-- 创建一个对象，但是这样创建之后引用指向的全是同一个对象
animal = {
    -- 名字
    name = "tom",
    
    --年龄
    age = 5,
    
    -- 添加方法，注意 self 要自己传
    bark = function(self, voice)
    	print(self.name.."在"..voice.."叫")
	end,
    
    -- 也可以按下面的方式添加，self 不用自己传，但是调用时要用 animal:say(xxx)
    function animal:say(word)
        print(self.name.."说"..say)
    end
}


-- 指向的都是同一个对象
animal1 = animal
animal2 = animal


-- 可以配合元表实现创建不同的对象
Animal = {
    -- 名字
    name = "tom",
    
    --年龄
    age = 5
}


-- 添加一个自定义方法，当作无参构造器
function Animal:new()
    -- 创建一个空表
    local a = {}
    -- 为新表指定元表，以此当作基础类表
    -- 在新表中找不到的 key，会从 self 基础类中查找
    setmetatable(a, {__index=self})
    -- 返回新表
    return a
end


-- 创建不同的对象，取值时如果没有会到 self 表中找，赋值时会直接赋值到新表 a 中
Animal1 = Animal:new()
Animal2 = Animal:new()

-- 创建有参构造器，这里以传入一个 table 举例
function Animal:new(table)
    local a = obj or {}
    setmetatable(a, {__index=self})
    return a 
end

-- 继承
Cat = Animal:new({type = "cat"})
Cat1 = Cat:new()
```





## 协同线程

```lua
-- 创建一个协同线程实例
crt = coroutine.create(
    -- 匿名函数作为参数
	function (a, b)
        print(a, b, a + b)
        
        -- 获取正在运行的协同线程的实例
        print(coroutine.running())
        
        -- 查看协同线程的状态
        print("crt: "..coroutine.status(crt))
        
        -- 挂起协同线程
        coroutine.yield()
        
        -- 继续执行时打印
        print("继续执行...")
        
        return a, b
    end
)

-- 启动协同线程实例
coroutine.resume(crt, 3, 5)

-- 在主线程中查看协同线程的状态
print("main: "..coroutine.status(crt))

-- 继续执行协同线程，可以获取到返回值
a, b = coroutine.resume(crt)
```



## 协同函数

```lua
-- 获取协同线程
cf = coroutine.wrap(
	function (a, b)
        print(a, b)
        
        -- 获取当前协同函数创建的协同线程
        tr = coroutine.running()
        print(type(tr))
        
        -- 挂起协同线程
        coroutine.yield(a, b)
        
        -- 继续执行时打印
        print("继续执行...")
        
        return a + b, a * b
    end
)

-- 调用协同函数，启动协同线程，获取 yield 时返回的数据
a, b = cf(3, 5)

-- 继续执行挂起的协同线程
r1, r2 = cf(3, 5)
```





## 文件 IO

```lua
-- 只读方式打开文件
file = io.open("<path>", "r")

-- 指定要读取的文件为 file
io.input(file)

-- 读取当前位置
pos = file:seek()

-- 读取一行数据
line = io.read("*1")

while line ~= nil do
    print(line)
    line = io.read("*1")
end

-- 关闭文件
io.close(file)

-- 指定要写入的文件为 file
io.output(file)

-- 写入一行数据
io.write("\nhelloworld")

-- 关闭文件
io.close(file)
```



