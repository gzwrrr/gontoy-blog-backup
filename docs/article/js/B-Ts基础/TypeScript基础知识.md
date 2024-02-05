---
title: "TypeScript 基础知识"
shortTitle: "TypeScript 基础知识"
description: "TypeScript 基础知识"
icon: ""
author: 
  name: gzw
  url: 
  email: 1627121193@qq.com
isOriginal: false
date: 2022-12-12
category: 
- "ts"
tag:
- "ts"
sticky: 2
star: false
article: true
timeline: true
dir:
  text: "TypeScript 基础知识"
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
  title: "TypeScript 基础知识"
  description: "TypeScript 基础知识"
  author:
    name: gzw
    email: 1627121193@qq.com
---





# TypeScript 基础知识

[[toc]]



## 发展历程

> [中文教学文档](https://www.tslang.cn/docs/handbook/declaration-files/templates/global-d-ts.html)

1. **2012年 - 初始版本发布：** TypeScript的第一个版本是在2012年10月发布的。它由Anders Hejlsberg（C#语言的首席架构师）领导的团队开发，目的是为了解决大型JavaScript应用程序的可维护性和可读性问题。TypeScript引入了静态类型系统，使开发人员能够在编写代码时更早地捕捉错误。
2. **2013年 - 放开开源：** 在初始发布后，TypeScript于2013年10月正式成为开源项目。这使得开发人员能够更加积极地参与到语言的演进和改进中。
3. **2015年 - TypeScript 1.5和ECMAScript 6：** TypeScript 1.5引入了一些新特性，包括装饰器和ECMAScript 6支持。它对JavaScript的新特性进行了支持，并且在语言层面上提供了模块化的支持。
4. **2016年 - TypeScript 2.0：** TypeScript 2.0发布，引入了非空类型、交叉类型和联合类型等新特性。这一版本还加强了对ECMAScript标准的支持，包括对可选参数和属性的支持。
5. **2017年 - TypeScript 2.3和2.4：** TypeScript 2.3和2.4分别引入了新的类型检查器和条件类型。这些版本继续提升了TypeScript的类型系统和开发体验。
6. **2018年 - TypeScript 3.x系列：** TypeScript 3.x系列引入了许多新的语言特性，如Tuple类型、readonly修饰符、引入unknown类型等。这一系列版本致力于提高开发人员的生产力和代码质量。
7. **2019年以后 - 持续改进：** TypeScript继续保持活跃的开发，每年发布几个小版本。更新包括性能改进、新的语言特性、更好的编辑器支持等。TypeScript在JavaScript生态系统中的使用逐渐增多，成为许多大型项目的首选语言之一。



## 知识点

```shell
├── TypeScript基础
│   ├── 变量和数据类型
│   ├── 函数和箭头函数
│   ├── 接口和类型
│   ├── 类和继承
│   ├── 泛型
│   ├── 枚举
│   └── 类型断言
│
├── 高级 TypeScript
│   ├── 高级类型（联合类型、交叉类型、条件类型）
│   ├── 声明合并
│   ├── 装饰器
│   ├── 模块和命名空间
│   └── 类型守卫
│
├── TypeScript 工具
│   ├── tsconfig.json 配置
│   ├── 编译器选项
│   ├── 类型定义文件（.d.ts）
│   └── TSLint 和 ESLint
│
├── Node.js 和 NPM
│   ├── Node.js 基础
│   ├── NPM 包管理
│   └── 模块解析
│
├── 构建和打包
│   ├── Webpack 配置
│   ├── Rollup 用于库打包
│   └── Babel 和 TypeScript
│
├── TypeScript 测试
│   ├── 单元测试（Jest、Mocha）
│   ├── E2E 测试（Cypress）
│   └── 测试工具
│
├── 前端框架
│   ├── React 与 TypeScript
│   ├── Angular 与 TypeScript
│   └── Vue 与 TypeScript
│
├── 服务器端开发
│   ├── Express 与 TypeScript
│   ├── NestJS（Node.js 框架）
│   └── GraphQL 与 TypeScript
│
├── 数据库交互
│   ├── TypeORM 或 Sequelize
│   └── 数据库设计和查询
│
├── 异步编程
│   ├── Promises 和 Async/Await
│   ├── Observables（RxJS）
│   └── 异步模式
│
└── 持续集成与部署
    ├── CI/CD 管道
    └── Docker 与容器化
```



## 基本类型

| 数据类型          | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| `number`          | 表示数字类型，包括整数和浮点数。                             |
| `string`          | 表示文本或字符序列类型。                                     |
| `boolean`         | 表示布尔类型，只能是`true`或`false`。                        |
| `array`           | 表示数组类型，可以包含多个相同或不同类型的元素。             |
| `tuple`           | 表示元组类型，是固定长度和固定类型的数组。                   |
| `enum`            | 表示枚举类型，用于定义一组命名的常量值。                     |
| `any`             | 表示任意类型，可绕过类型检查，不推荐使用。                   |
| `void`            | 表示没有返回值的函数或表达式。                               |
| `null`            | 表示空值或空引用。                                           |
| `undefined`       | 表示未定义的值。                                             |
| `never`           | 表示永远不会发生的类型，通常用于抛出异常或无限循环等场景。   |
| `object`          | 表示非原始类型，即除`number`、`string`、`boolean`、`symbol`、`null`和`undefined`之外的类型。 |
| `union`           | 表示联合类型，可以是多个类型中的一个。                       |
| `intersection`    | 表示交叉类型，包含多个类型的组合。                           |
| `type assertions` | 表示类型断言，允许将一个变量指定为特定的类型。               |

涉及到的知识点：

- 声明变量：`var`、`let`、`const`
- 解构数组，解构对象，。属性重命名
- **类型推断：** TypeScript 具有类型推断能力，即它可以根据变量的赋值情况自动推断其类型，无需显式指定类型。
- **类型别名：** 使用 `type` 关键字可以创建类型别名，用于给一个类型起一个新的名称，以增加代码的可读性和重用性。
- **字面量类型：** 可以使用字面量表示特定的值，如字符串字面量类型、数字字面量类型等。
- **联合类型和交叉类型：** 联合类型 (`union`) 允许一个变量具有多种类型，而交叉类型 (`intersection`) 允许组合多个类型。
- **函数类型：** 包括参数类型、返回值类型，以及可选参数和默认参数的使用。
- **类型断言：** 除了 `<type>` 和 `as`，还可以使用 `!` 表示非空断言，告诉 TypeScript 某个表达式的结果不会为 `null` 或 `undefined`。
- **Readonly 属性：** 使用 `readonly` 关键字可以创建只读属性，防止属性值被修改。
- **Partial 和 Required：** `Partial` 类型允许将所有属性设置为可选，而 `Required` 类型则要求所有属性都必须存在。

```tsx
// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串
let name: string = "bob";
name = "smith";
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.
I'll be ${ age + 1 } years old next month.`;

// 数组
let list01: number[] = [1, 2, 3];
let list02: Array<number> = [1, 2, 3];

// 元组
let x: [string, number];
x = ['hello', 10];

// 枚举
enum Color {Red, Green, Blue};
let c: Color = Color.Green;

/**
 * 任意值
 * 在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。
 * 可能认为 Object有相似的作用，就像它在其它语言中那样。 但是 Object类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法
 */
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
let anyList: any[] = [1, true, "free"];
anyList[1] = 100;

// 空值
function warnUser(): void {
    alert("This is my warning message");
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
let unusable: void = undefined;
/**
 * TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大
 * 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
 * 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免很多常见的问题。 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。
 */
let u: undefined = undefined;
let n: null = null;


/**
 * never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；
 * 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。
 * never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
 */
function error(message: string): never {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

/**
 * 类型断言
 * 两种写法：
 * 1.  <类型>值
 * 2.  值 as 类型
 * 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的
 * 类型断言只会影响编译时的类型，类型断言语句在编译结果中会被删除
 */
let someValue01: any = "this is a string";
let strLength02: number = (<string>someValue01).length;
let someValue03: any = "this is a string";
let strLength04: number = (someValue03 as string).length;
```





## 高级类型

- 交叉类型，既是又是
- 联合类型，或是
- 类型保护与区分类型，用户自定义的类型保护
- 字符串字面量类型
- 可辨识联合
- 自ECMAScript 2015起，`symbol`成为了一种新的原生类型，就像`number`和`string`一样



## 函数

涉及到的知识点：

- 函数定义，推断类型
- 可选参数，默认参数，剩余参数
- 箭头函数
- 重载



### 普通函数

在 TypeScript 中，函数是一等公民，具有丰富的类型系统支持。以下是关于函数的一些重要概念和用法：

**函数声明：** 可以使用 `function` 关键字声明函数。

```tsx
typescriptCopy codefunction add(x: number, y: number): number {
    return x + y;
}
```

**函数表达式：** 可以使用变量赋值的形式创建函数表达式。

```tsx
typescriptCopy codeconst subtract = function(x: number, y: number): number {
    return x - y;
};
```

**箭头函数：** 箭头函数是一种更简洁的函数表达式，使用 `=>` 语法。

```tsx
typescriptCopy code
const multiply = (x: number, y: number): number => x * y;
```

**可选参数与默认参数：** 可以使用 `?` 表示可选参数，使用 `=` 设置默认参数值。

```tsx
typescriptCopy codefunction greet(name: string, greeting?: string): string {
    return `${greeting || 'Hello'}, ${name}!`;
}
```

**剩余参数：** 使用剩余参数（Rest Parameters）可以处理可变长度的参数列表。

```tsx
typescriptCopy codefunction concatenate(...values: string[]): string {
    return values.join('');
}
```

**函数重载：** 可以使用函数重载为同一个函数提供多个不同的类型签名。

```tsx
typescriptCopy codefunction displayInfo(x: number): void;
function displayInfo(x: string): void;
function displayInfo(x: any): void {
    console.log(x);
}
```

**回调函数：** TypeScript 支持回调函数的定义和使用。

```tsx
typescriptCopy codefunction fetchData(callback: (data: string) => void): void {
    // Async operation
    const result = 'Data received';
    callback(result);
}
```



### 箭头函数

箭头函数是一种更简洁的函数语法，常用于回调函数和短小的函数体。

**基本语法：**

```tsx
typescriptCopy code
const add = (x: number, y: number): number => x + y;
```

**省略 return：**

箭头函数的简洁性允许省略 `return` 关键字，表达式的值即为返回值。

```tsx
typescriptCopy code
const multiply = (x: number, y: number): number => x * y;
```

**单参数省略括号：**

如果箭头函数只有一个参数，可以省略参数周围的括号。

```tsx
typescriptCopy code
const square = x => x * x;
```

**没有 this 绑定：**

箭头函数没有自己的 `this` 绑定，它会继承上下文中的 `this` 值。

```tsx
typescriptCopy codeconst obj = {
    value: 42,
    getValue: function() {
        return () => this.value;
    }
};
```

**箭头函数与普通函数的区别：**

箭头函数和普通函数在某些方面有区别，特别是在处理 `this` 上下文和 `arguments` 对象时。箭头函数没有 `arguments` 对象，并且其 `this` 值是词法上绑定的。

```tsx
typescriptCopy codefunction regularFunction() {
    console.log(arguments); // 正常工作
}

const arrowFunction = () => {
    console.log(arguments); // 错误：arguments 在箭头函数中不可用
};
```



## 接口

> 接口（Interfaces）和类型（Types）是 TypeScript 中用于定义自定义类型的重要概念。它们有很多相似之处，但也有一些区别。

**基本用法：** 接口用于定义对象的形状，包括属性和方法。

```tsx
typescriptCopy codeinterface Person {
  name: string;
  age: number;
  greet(): void;
}
```

**可选属性：** 使用 `?` 表示属性是可选的。

```tsx
typescriptCopy codeinterface Config {
  width: number;
  height?: number;
}
```

**只读属性：** 使用 `readonly` 关键字定义只读属性。

```tsx
typescriptCopy codeinterface Point {
  readonly x: number;
  readonly y: number;
}
```

**索引签名：** 允许接口表示有任意属性的对象。

```tsx
typescriptCopy codeinterface Dictionary {
  [key: string]: string;
}
```

**继承：** 接口可以继承其他接口。

```tsx
typescriptCopy codeinterface Employee extends Person {
  jobTitle: string;
}
```

接口使用的一个简单的示例如下：

```tsx
// 定义一个接口表示用户信息
interface UserInfo {
    // 必选属性
    id: number;
    username: string;
    age: number;

    // 可选属性
    email?: string;

    // 只读属性
    readonly registrationDate: Date;

    // 函数成员
    greet(): string;
}

// 实现接口
const user: UserInfo = {
    id: 1,
    username: 'john_doe',
    age: 25,
    email: 'john@example.com',
    registrationDate: new Date('2022-01-01'),
    greet: function() {
        return `Hello, ${this.username}!`;
    }
};

// 使用接口定义函数参数
function printUser(user: UserInfo) {
    console.log(`ID: ${user.id}`);
    console.log(`Username: ${user.username}`);
    console.log(`Age: ${user.age}`);
    console.log(`Email: ${user.email || 'N/A'}`);
    console.log(`Registration Date: ${user.registrationDate.toDateString()}`);
    console.log(`Greeting: ${user.greet()}`);
}

// 调用函数
printUser(user);
```



## 类型

**基本用法：** 类型用于给一个值设置别名。

```tsx
typescriptCopy code
type Age = number;
```

**联合类型和交叉类型：** 类型可以用于创建联合类型和交叉类型。

```tsx
typescriptCopy codetype Result = Success | Failure;
type Combined = Type1 & Type2;
```

**泛型：** 类型可以使用泛型来增加灵活性。

```tsx
typescriptCopy codetype Pair<T> = {
  first: T;
  second: T;
};
```

**条件类型：** 类型可以使用条件语句进行定义。

```tsx
typescriptCopy code
type Check<T> = T extends string ? true : false;
```

**Mapped Types：** 使用 `keyof` 和 `in` 等关键字可以创建新的类型。

```tsx
typescriptCopy codetype Flags = {
  [K in 'option1' | 'option2']: boolean;
};
```

```tsx
// 定义商品类型
type Product = {
  id: number;
  name: string;
  price: number;
};

// 定义购物车项类型
type CartItem = {
  product: Product;
  quantity: number;
};

// 定义用户类型
type User = {
  id: number;
  username: string;
};

// 定义购物车类型
type ShoppingCart = {
  user: User;
  items: CartItem[];
  totalPrice: number;
};

// 创建商品
const laptop: Product = {
  id: 1,
  name: 'Laptop',
  price: 1000,
};

const headphones: Product = {
  id: 2,
  name: 'Headphones',
  price: 100,
};

// 创建用户
const currentUser: User = {
  id: 101,
  username: 'john_doe',
};

// 创建购物车项
const laptopItem: CartItem = {
  product: laptop,
  quantity: 2,
};

const headphonesItem: CartItem = {
  product: headphones,
  quantity: 1,
};

// 创建购物车
const shoppingCart: ShoppingCart = {
  user: currentUser,
  items: [laptopItem, headphonesItem],
  totalPrice: laptopItem.product.price * laptopItem.quantity + headphonesItem.product.price * headphonesItem.quantity,
};

// 打印购物车信息
console.log(`User: ${shoppingCart.user.username}`);
console.log('Items:');
shoppingCart.items.forEach((item, index) => {
  console.log(`${index + 1}. ${item.product.name} - Quantity: ${item.quantity}`);
});
console.log(`Total Price: $${shoppingCart.totalPrice}`);
```

:::warning 注意

**类型别名 vs 接口：** 在大多数情况下，可以互相替代使用，但类型别名可以更灵活，可以为基本类型、联合类型、交叉类型等提供别名。

注意：在实践中，接口和类型通常可以互相替代使用，具体选择取决于个人或团队的偏好以及项目的需求。如果希望创建对象的形状，或者使用接口来表示类的契约，接口可能是更自然的选择。如果更关注类型别名的灵活性和通用性，类型可能更适合。

:::

| 特性 / 场景  | 接口（Interfaces）                                       | 类型（Types）                                                |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| 对象形状描述 | 用于描述对象的形状，包括属性和方法。                     | 用于给一个值设置别名，适用于基本类型、联合类型、交叉类型等。 |
| 可选属性     | 可以定义可选属性。                                       | 可以使用 `Partial` 类型实现可选属性。                        |
| 只读属性     | 可以定义只读属性。                                       | 可以使用 `readonly` 关键字定义只读属性。                     |
| 函数成员     | 可以包含函数成员的定义。                                 | 适用于函数类型定义。                                         |
| 继承         | 可以通过 `extends` 实现接口的继承。                      | 可以通过 `extends` 实现类型的继承。                          |
| 实例化检查   | 对于类的实例化有更严格的检查，必须符合接口的形状。       | 对于实际值和类型之间的匹配较灵活，可以更容易进行类型操作。   |
| 扩展性       | 更适用于描述对象形状，以及需要在多个地方重复使用的情况。 | 更适用于创建别名，以及在多种类型操作场景中灵活使用。         |

还涉及到的知识点：

- 可选属性、只读属性
- 函数类型、可索引类型
- 类类型，类与接口的实现和继承





## 类

涉及到的知识点：

- 修饰符：public、private、protected、readonly
- 存取器：get、set
- 静态属性，静态方法
- 抽象类
- 方法重写
- **mixin 模式：** 使用 mixin 模式可以在类之间共享方法，提供一种组合类功能的方式

**静态方法：** 使用 `static` 关键字定义静态方法，静态方法属于类而不是实例，可以直接通过类名调用。

```tsx
typescriptCopy codeclass MathOperations {
    static add(x: number, y: number): number {
        return x + y;
    }
}

const result = MathOperations.add(5, 3);
```

**实例类型和静态类型：** TypeScript 中有实例类型和静态类型之分。实例类型是指类的实例部分，而静态类型是指类的构造函数部分。

```tsx
typescriptCopy codeclass Example {
    static staticProperty: number;
    instanceProperty: string;

    constructor(value: string) {
        this.instanceProperty = value;
    }
}

const instance: Example = new Example('Hello');
Example.staticProperty = 42;
```

**类表达式：** 类可以通过表达式的方式进行定义。

```tsx
typescriptCopy codeconst MyClass = class {
    constructor(private prop: string) {}

    getProp(): string {
        return this.prop;
    }
};

const instance = new MyClass('Example');
console.log(instance.getProp()); // Output: Example
```

**mixin 模式：** 使用 mixin 模式可以在类之间共享方法，提供一种组合类功能的方式。

```tsx
typescriptCopy codefunction Timestamped<T extends new (...args: any[]) => {}>(Base: T) {
    return class extends Base {
        timestamp = new Date();
    };
}

class Loggable {
    log(message: string) {
        console.log(message);
    }
}

class TimestampedLoggableClass extends Timestamped(Loggable) {
    // Combined functionality from Timestamped and Loggable
}
```

**实现多个接口：** 一个类可以实现多个接口，通过逗号分隔。

```tsx
typescriptCopy codeinterface Printable {
    print(): void;
}

interface Loggable {
    log(): void;
}

class Logger implements Printable, Loggable {
    print() {
        console.log('Printing...');
    }

    log() {
        console.log('Logging...');
    }
}
```





## 泛型

**基本泛型语法：**

使用 `<T>` 或其他字母（通常是单个大写字母）作为类型参数的占位符，使得函数或类可以在定义时不指定具体类型，而在使用时动态确定。

```tsx
typescriptCopy codefunction identity<T>(arg: T): T {
    return arg;
}

const result: number = identity(42);
```

**多类型参数：**

可以使用多个泛型参数，用逗号分隔。

```tsx
typescriptCopy codefunction pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result = pair(10, 'Hello'); // result: [number, string]
```

**泛型函数类型：**

泛型也可以应用于函数类型的定义。

```tsx
typescriptCopy codetype IdentityFunction<T> = (arg: T) => T;

const identity: IdentityFunction<number> = (arg) => arg;
```

**泛型类：**

类也可以使用泛型，类似于函数。

```tsx
typescriptCopy codeclass Box<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}

const box = new Box<number>(42);
```

**泛型约束：**

可以使用泛型约束来限制泛型类型的范围。

```tsx
typescriptCopy codeinterface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

**泛型默认值：**

可以为泛型参数设置默认值。

```tsx
typescriptCopy codefunction identity<T = number>(arg: T): T {
    return arg;
}

const result: string = identity('Hello'); // T 默认为 string
```

**泛型与 keyof：**

泛型可以与 `keyof` 操作符结合，用于获取对象的键集合。

```tsx
typescriptCopy codefunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { id: 1, name: 'John' };
const userId: number = getProperty(user, 'id');
```

**泛型在接口中的应用：**

泛型可以应用于接口的定义，以增加接口的灵活性。

```tsx
typescriptCopy codeinterface GenericIdentityFn<T> {
    (arg: T): T;
}

const identity: GenericIdentityFn<number> = (arg) => arg;
```





## 枚举

**数字枚举：**

数字枚举为枚举成员赋予数字值，默认从 0 开始，依次递增。

```tsx
typescriptCopy codeenum Direction {
    Up, // 0
    Down, // 1
    Left, // 2
    Right // 3
}

const move: Direction = Direction.Up;
```

**字符串枚举：**

字符串枚举为每个成员赋予字符串值。

```tsx
typescriptCopy codeenum Color {
    Red = 'RED',
    Green = 'GREEN',
    Blue = 'BLUE'
}

const selectedColor: Color = Color.Green;
```

**反向映射：**

枚举可以通过值得到对应的名字。

```tsx
typescriptCopy codeenum Direction {
    Up,
    Down,
    Left,
    Right
}

const directionName: string = Direction[0]; // 'Up'
```

**常数枚举：**

常数枚举在编译阶段被删除，并且不能包含计算成员。

```tsx
typescriptCopy codeconst enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}

const today: Weekday = Weekday.Wednesday;
```

**异构枚举：**

枚举可以包含数字和字符串值。

```tsx
typescriptCopy codeenum Result {
    Success = 1,
    Error = 'ERROR'
}

const success: Result = Result.Success;
const error: Result = Result.Error;
```

**枚举成员类型：**

枚举成员可以具有自定义的值，可以是数字、字符串、表达式等。

```tsx
typescriptCopy codeenum StatusCode {
    OK = 200,
    NotFound = 404,
    InternalServerError = 500
}

const status: StatusCode = StatusCode.OK;
```

**位枚举：**

位枚举用于处理一组标志，使得可以组合多个值。

```tsx
typescriptCopy codeenum Permission {
    Read = 1 << 0,
    Write = 1 << 1,
    Execute = 1 << 2
}

const userPermission: Permission = Permission.Read | Permission.Write;
```

**枚举的使用场景：**

- 表示有限集合的一组常量值。
- 用于标识状态、选项或配置项。





## 迭代器和生成器

- `for..of`和`for..in`均可迭代一个列表；但是用于迭代的值却不同，`for..in`迭代的是对象的 *键* 的列表，而`for..of`则迭代对象的键对应的
- 当生成目标为ES5或ES3，迭代器只允许在`Array`类型上使用。 在非数组值上使用 `for..of`语句会得到一个错误，就算这些非数组值已经实现了`Symbol.iterator`属性



## 装饰器

涉及到的知识点：

- 装饰器组合
- 类装饰器
- 方法装饰器
- 访问器装饰器
- 属性装饰器
- 参数装饰器
- 元数据

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

```tsx
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
```



## Mixins

```tsx
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```

首先应该注意到的是，没使用`extends`而是使用`implements`。 把类当成了接口，仅使用Disposable和Activatable的类型而非其实现。 这意味着我们需要在类里面实现接口。 但是这是我们在用mixin时想避免的。

我们可以这么做来达到目的，为将要mixin进来的属性方法创建出占位属性。 这告诉编译器这些成员在运行时是可用的。 这样就能使用mixin带来的便利，虽说需要提前定义一些占位属性。





## 模块与命名空间

> 不应该对模块使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突。 模块文件本身已经是一个逻辑分组，并且它的名字是由导入这个模块的代码指定，所以没有必要为导出的对象增加额外的模块层。
>
> 就像每个JS文件对应一个模块一样，TypeScript里模块文件与生成的JS文件也是一一对应的。 这会产生一种影响，根据你指定的目标模块系统的不同，你可能无法连接多个模块源文件。 例如当目标模块系统为 `commonjs`或`umd`时，无法使用`outFile`选项，但是在TypeScript 1.8以上的版本[能够](https://www.typescriptlang.org/docs/release-notes/typescript-1.8.html#concatenate-amd-and-system-modules-with---outfile)使用`outFile`当目标为`amd`或`system`。



### 命名空间

> 命名空间是位于全局命名空间下的一个普通的带有名字的JavaScript对象。 这令命名空间十分容易使用。 它们可以在多文件中同时使用，并通过 `--outFile`结合在一起。 命名空间是帮你组织Web应用不错的方式，你可以把所有依赖都放在HTML页面的 `<script>`标签里。
>
> 但就像其它的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中。

**概念：** 命名空间是 TypeScript 中用于组织代码的另一种机制，它通过 `namespace` 关键字来定义一个命名空间，可以在命名空间内部封装相关的变量和函数。命名空间提供了一种逻辑上的组织结构。

**作用：**

- 封装和组织代码：命名空间提供了一种逻辑上的组织结构，使得相关功能可以被组织在一个独立的命名空间内。
- 避免全局命名冲突：命名空间内的变量和函数不会污染全局命名空间，避免了命名冲突。

**使用场景：**

- 在早期的 TypeScript 版本中，命名空间是主要的组织代码的机制。但随着 ES6 模块的引入，模块成为了更推荐的组织代码的方式。
- 有些场景下，仍然可以使用命名空间，例如在已有的项目中逐渐迁移到模块化的架构。



### 使用模块

**概念：** 模块是 TypeScript 中用于组织代码的机制，它将相关的代码组织在一起，提供了封装和复用的能力。模块的代码可以在其内部使用 `export` 关键字导出，而其他模块可以使用 `import` 关键字引入。

**作用：**

- 封装和隔离代码：模块允许将相关的功能和变量封装在一起，使得代码更具可读性和可维护性。
- 避免全局命名冲突：模块作用域可以避免全局命名冲突，每个模块的变量和函数在模块内部是私有的。

**使用场景：**

- 分割大型代码库：当项目变得庞大时，可以将代码分割成多个模块，以便更好地组织和管理。
- 代码复用：可以通过导出和引入模块来实现代码的复用。

像命名空间一样，模块可以包含代码和声明。 不同的是模块可以 *声明*它的依赖。

模块会把依赖添加到模块加载器上（例如CommonJs / Require.js）。 对于小型的JS应用来说可能没必要，但是对于大型应用，这一点点的花费会带来长久的模块化和可维护性上的便利。 模块也提供了更好的代码重用，更强的封闭性以及更好的使用工具进行优化。

对于Node.js应用来说，模块是默认并推荐的组织代码的方式。

从ECMAScript 2015开始，模块成为了语言内置的部分，应该会被所有正常的解释引擎所支持。 因此，对于新项目来说推荐使用模块做为组织代码的方式。



### 声明合并

Typescript中的声明会创建以下三种实体之一：命名空间，类型或值。 创建命名空间的声明会新建一个命名空间，它包含了用（.）符号来访问时使用的名字。 创建类型的声明是：用声明的模型创建一个类型并绑定到给定的名字上。 最后，创建值的声明会创建在JavaScript输出中看到的值。

| Declaration Type | Namespace | Type | Value |
| :--------------- | :-------- | :--- | :---- |
| Namespace        | X         |      | X     |
| Class            |           | X    | X     |
| Enum             |           | X    | X     |
| Interface        |           | X    |       |
| Type Alias       |           | X    |       |
| Function         |           |      | X     |
| Variable         |           |      | X     |

涉及到的知识点还有：

- 非法的合并
- 模块扩展
- 全局扩展



## 编译

> TypeScript 允许你指定目标模块系统，例如 `commonjs`、`amd`、`system`、`umd` 等。这个指定是通过编译选项中的 `module` 字段来完成的。
>
> 根据目标模块系统的不同，使用 `outFile` 选项合并多个模块文件时可能会受到一些限制。这是因为不同的模块系统对于代码的组织和加载方式有不同的要求，因此在合并模块时需要考虑这些差异。



### 概念

**CommonJS (`commonjs`)：**

- **意义：** CommonJS 是 Node.js 默认的模块系统，也被广泛用于服务器端 JavaScript。
- **特点：** 使用 `require` 导入模块，使用 `module.exports` 或 `exports` 导出模块。
- **适用场景：** 主要用于服务器端开发，适合同步加载模块的环境。

**Asynchronous Module Definition (`amd`)：**

- **意义：** AMD 是一种异步加载模块的标准，主要用于浏览器端的 JavaScript。
- **特点：** 使用 `define` 定义模块，使用 `require` 异步加载模块。
- **适用场景：** 主要用于浏览器端，支持异步加载模块，适合于大型前端应用。

**SystemJS (`system`)：**

- **意义：** SystemJS 是一个通用的模块加载器，可以在浏览器和 Node.js 等环境中使用。
- **特点：** 提供了更灵活的模块加载和配置方式，支持 CommonJS、AMD 等多种模块格式。
- **适用场景：** 适用于多环境共存的应用，提供了一种统一的模块加载机制。

**Universal Module Definition (`umd`)：**

- **意义：** UMD 是一种通用的模块定义方式，兼容 CommonJS、AMD 和全局变量的引入方式。
- **特点：** 通过判断环境来选择使用 CommonJS、AMD 或全局变量的方式进行模块定义。
- **适用场景：** 适用于既要在浏览器端使用，又要在 Node.js 等环境下使用的模块。

**`.ts` 文件：**

- **类型：** TypeScript 源文件。
- **含义：** 这是包含 TypeScript 代码的源文件，其中可以包含 TypeScript 的类型注解、接口、类等特性。这些文件经过编译后会生成相应的 JavaScript 文件（.js）。

**`.tsx` 文件：**

- **类型：** TypeScript 源文件（包含 JSX）。
- **含义：** 与 `.ts` 文件类似，但是允许包含 JSX（JavaScript XML）语法，用于构建 React 组件。当使用 TypeScript 开发 React 应用时，通常会使用 `.tsx` 扩展名的文件。

**`.d.ts` 文件：**

- **类型：** TypeScript 声明文件。
- **含义：** 这是包含类型声明的文件，通常用于描述 JavaScript 代码库中的类型信息。声明文件中不包含实际的实现，只有类型信息。`.d.ts` 文件允许在 TypeScript 中使用第三方 JavaScript 库，提供了类型检查和编辑器支持。



### declare

在 TypeScript 中，`declare` 关键字用于告诉编译器某个变量、函数、类等的声明存在于其他地方，比如外部的 JavaScript 文件或库中，而不是当前 TypeScript 文件中。`declare` 的作用是提供类型信息，告诉 TypeScript 编译器某个符号的类型和结构，但并不实际生成对应的 JavaScript 代码。

主要用途包括：

**声明全局变量：**

```tsx
typescriptCopy code
declare var myGlobal: number;
```

上述声明告诉 TypeScript 编译器在运行时会有一个名为 `myGlobal` 的全局变量，但编译后的 JavaScript 代码中并不会有对应的声明，因为这个变量是在外部定义的。

**声明模块：**

```tsx
typescriptCopy codedeclare module 'some-module' {
    export function someFunction(): void;
    export const someValue: number;
}
```

这个声明告诉 TypeScript 编译器，有一个名为 `'some-module'` 的模块，其中包含了 `someFunction` 函数和 `someValue` 常量。实际的实现和类型信息在外部模块中。

**声明函数签名：**

```tsx
typescriptCopy code
declare function myFunction(x: number): number;
```

这个声明告诉 TypeScript 编译器，存在一个名为 `myFunction` 的函数，接受一个 `number` 类型的参数，并返回一个 `number`。

`declare` 关键字主要用于与外部的 JavaScript 代码集成，提供类型信息以使 TypeScript 编译器进行类型检查和编辑器支持。在编译后的 JavaScript 代码中，`declare` 语句不会生成实际的代码。



### 编译选项

| 编译选项                             | 含义                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| `--allowJs`                          | 允许编译器处理 JavaScript 文件。                             |
| `--declaration`                      | 生成相应的 `.d.ts` 声明文件。                                |
| `--outDir`                           | 指定输出目录。                                               |
| `--target`                           | 指定 ECMAScript 目标版本。默认为 ES3。                       |
| `--module`                           | 指定模块代码生成规范。可选值有 `commonjs`、`amd`、`system`、`umd`。 |
| `--strict`                           | 开启所有严格类型检查选项。                                   |
| `--noImplicitAny`                    | 在表达式和声明上有隐含的 `any` 类型时报错。                  |
| `--strictNullChecks`                 | 启用严格的 `null` 类型检查。                                 |
| `--strictFunctionTypes`              | 函数参数双向协变检查。                                       |
| `--noUnusedLocals`                   | 报告未使用的局部变量。                                       |
| `--noUnusedParameters`               | 报告未使用的参数。                                           |
| `--noImplicitReturns`                | 函数有返回值时要求显式的返回类型。                           |
| `--esModuleInterop`                  | 生成按照 `import = require()` 生成 `export =` 语句的模块代码。 |
| `--skipLibCheck`                     | 跳过声明文件的类型检查。                                     |
| `--forceConsistentCasingInFileNames` | 强制一致的文件名大小写。                                     |
| `--moduleResolution`                 | 指定模块解析策略。可选值有 `node` 或 `classic`。             |
| `--jsx`                              | 指定 JSX 代码生成规范。可选值有 `react`、`preserve`、`react-native`。 |
| `--sourceMap`                        | 生成相应的 `.map` 文件，用于调试。                           |
| `--removeComments`                   | 删除注释。                                                   |
| `--noEmit`                           | 不生成输出文件。                                             |
| `--isolatedModules`                  | 将每个文件做为单独的模块（与 `--module` 一起使用）。         |
| `--strictPropertyInitialization`     | 开启严格属性初始化检查。                                     |
| `--preserveConstEnums`               | 在编译时不会被删除的 const 枚举成员。                        |
| `--esModuleInterop`                  | 允许 `import` 语句导入默认导出并导出所有值。                 |
| `--rootDir`                          | 指定输入文件的根目录。                                       |

| 选项                                 | 类型       | 默认值                                                       | 描述                                                         |
| :----------------------------------- | :--------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `--allowJs`                          | `boolean`  | `true`                                                       | 允许编译javascript文件。                                     |
| `--allowSyntheticDefaultImports`     | `boolean`  | `module === "system"`                                        | 允许从没有设置默认导出的模块中默认导入。这并不影响代码的显示，仅为了类型检查。 |
| `--allowUnreachableCode`             | `boolean`  | `false`                                                      | 不报告执行不到的代码错误。                                   |
| `--allowUnusedLabels`                | `boolean`  | `false`                                                      | 不报告未使用的标签错误。                                     |
| `--baseUrl`                          | `string`   |                                                              | 解析非相对模块名的基准目录。查看[模块解析文档](http://www.tslang.cn/docs/handbook/module-resolution.html#base-url)了解详情。 |
| `--charset`                          | `string`   | `"utf8"`                                                     | 输入文件的字符集。                                           |
| `--declaration` `-d`                 | `boolean`  | `false`                                                      | 生成相应的'.d.ts'文件。                                      |
| `--declarationDir`                   | `string`   |                                                              | 生成声明文件的输出路径。                                     |
| `--diagnostics`                      | `boolean`  | `false`                                                      | 显示诊断信息。                                               |
| `--disableSizeLimit`                 | `boolean`  | `false`                                                      | 禁用JavaScript工程体积大小的限制                             |
| `--emitBOM`                          | `boolean`  | `false`                                                      | 在输出文件的开头加入BOM头（UTF-8 Byte Order Mark）。         |
| `--emitDecoratorMetadata`[1]         | `boolean`  | `false`                                                      | 给源码里的装饰器声明加上设计类型元数据。查看[issue #2577](https://www.w3cschool.cn/targetlink?url=https://github.com/Microsoft/TypeScript/issues/2577)了解更多信息。 |
| `--experimentalDecorators`[1]        | `boolean`  | `false`                                                      | 实验性启用ES7装饰器支持。                                    |
| `--forceConsistentCasingInFileNames` | `boolean`  | `false`                                                      | 不允许不一致包装引用相同的文件。                             |
| `--help` `-h`                        |            |                                                              | 打印帮助信息。                                               |
| `--inlineSourceMap`                  | `boolean`  | `false`                                                      | 生成单个sourcemaps文件，而不是将每sourcemaps生成不同的文件。 |
| `--inlineSources`                    | `boolean`  | `false`                                                      | 将代码与sourcemaps生成到一个文件中，要求同时设置了`--inlineSourceMap`或`--sourceMap`属性。 |
| `--init`                             |            |                                                              | 初始化TypeScript项目并创建一个`tsconfig.json`文件。          |
| `--isolatedModules`                  | `boolean`  | `false`                                                      | 无条件地给没有解析的文件生成imports。                        |
| `--jsx`                              | `string`   | `"Preserve"`                                                 | 在'.tsx'文件里支持JSX：'React' 或 'Preserve'。查看[JSX](http://www.tslang.cn/docs/handbook/jsx.html)。 |
| `--lib`                              | `string[]` |                                                              | 编译过程中需要引入的库文件的列表。 可能的值为：  ► `es5`  ► `es6`  ► `es2015`  ► `es7`  ► `es2016`  ► `es2017` `dom` `webworker` `scripthost`  ► `es2015.core`  ► `es2015.collection`  ► `es2015.generator`  ► `es2015.iterable`  ► `es2015.promise`  ► `es2015.proxy`  ► `es2015.reflect`  ► `es2015.symbol`  ► `es2015.symbol.wellknown`  ► `es2016.array.include`  ► `es2017.object`  ► `es2017.sharedmemory`  注意：如果`--lib`没有指定默认库。默认库是 ► For `--target ES5: dom,es5,scripthost` ► For `--target ES6: dom,es6,dom.iterable,scripthost` |
| `--listEmittedFiles`                 | `boolean`  | `false`                                                      | 打印出编译后生成文件的名字。                                 |
| `--listFiles`                        | `boolean`  | `false`                                                      | 编译过程中打印文件名。                                       |
| `--locale`                           | `string`   | *(platform specific)*                                        | 显示错误信息时使用的语言，比如：en-us。                      |
| `--mapRoot`                          | `string`   |                                                              | 为调试器指定指定sourcemap文件的路径，而不是使用生成时的路径。当`.map`文件是在运行时指定的，并不同于`js`文件的地址时使用这个标记。指定的路径会嵌入到`sourceMap`里告诉调试器到哪里去找它们。 |
| `--maxNodeModuleJsDepth`             | `number`   | `0`                                                          | node_modules下的最大依赖深度搜索并加载JavaScript文件。仅适用于使用`--allowJs`。 |
| `--module` `-m`                      | `string`   | `target === 'ES6' ? 'ES6' : 'commonjs'`                      | 指定生成哪个模块系统代码：'commonjs'，'amd'，'system'，或 'umd'或'es2015'。只有'amd'和'system'能和`--outFile`一起使用。当目标是ES5或以下的时候不能使用'es2015'。 |
| `--moduleResolution`                 | `string`   | `module === 'amd' | 'system' | 'ES6' ? 'classic' : 'node'`   | 决定如何处理模块。或者是'node'对于Node.js/io.js，或者是'classic'（默认）。查看[模块解析文档](http://www.tslang.cn/docs/handbook/module-resolution.html)了解详情。 |
| `--newLine`                          | `string`   | *(platform specific)*                                        | 当生成文件时指定行结束符：'CRLF'（dos）或 'LF' （unix）。    |
| `--noEmit`                           | `boolean`  | `false`                                                      | 不生成输出文件。                                             |
| `--noEmitHelpers`                    | `boolean`  | `false`                                                      | 不在输出文件中生成用户自定义的帮助函数代码，如`__extends`。  |
| `--noEmitOnError`                    | `boolean`  | `false`                                                      | 报错时不生成输出文件。                                       |
| `--noFallthroughCasesInSwitch`       | `boolean`  | `false`                                                      | 报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿） |
| `--noImplicitAny`                    | `boolean`  | `false`                                                      | 在表达式和声明上有隐含的'any'类型时报错。                    |
| `--noImplicitReturns`                | `boolean`  | `false`                                                      | 不是函数的所有返回路径都有返回值时报错。                     |
| `--noImplicitThis`                   | `boolean`  | `false`                                                      | 当`this`表达式的值为`any`类型的时候，生成一个错误。          |
| `--noImplicitUseStrict`              | `boolean`  | `false`                                                      | 模块输出中不包含'use strict'指令。                           |
| `--noLib`                            | `boolean`  | `false`                                                      | 不包含默认的库文件（lib.d.ts）。                             |
| `--noResolve`                        | `boolean`  | `false`                                                      | 不把`/// <reference``>`或模块导入的文件加到编译文件列表。    |
| `--noUnusedLocals`                   | `boolean`  | `false`                                                      | 若有未使用的局部变量则抛错。                                 |
| `--noUnusedParameters`               | `boolean`  | `false`                                                      | 若有未使用的参数则抛错。                                     |
| ~~`--out`~~                          | `string`   |                                                              | 弃用。使用 `--outFile` 代替。                                |
| `--outDir`                           | `string`   |                                                              | 重定向输出目录。                                             |
| `--outFile`                          | `string`   |                                                              | 将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和`///<reference``>`和`import`的文件顺序决定的。查看输出文件顺序文件了解详情。 |
| `paths`[2]                           | `Object`   |                                                              | 模块名到基于`baseUrl`的路径映射的列表。查看[模块解析文档](http://www.tslang.cn/docs/handbook/module-resolution.html#path-mapping)了解详情。 |
| `--preserveConstEnums`               | `boolean`  | `false`                                                      | 保留`const`和`enum`声明。查看[const enums documentation](https://www.w3cschool.cn/targetlink?url=https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#94-constant-enum-declarations)了解详情。 |
| `--pretty`[1]                        | `boolean`  | `false`                                                      | 给错误和消息设置样式，使用颜色和上下文。                     |
| `--project` `-p`                     | `string`   |                                                              | 编译指定目录下的项目。这个目录应该包含一个`tsconfig.json`文件来管理编译。查看[tsconfig.json](http://www.tslang.cn/docs/handbook/tsconfig-json.html)文档了解更多信息。 |
| `--reactNamespace`                   | `string`   | `"React"`                                                    | 当目标为生成'react' JSX时，指定`createElement`和`__spread`的调用对象 |
| `--removeComments`                   | `boolean`  | `false`                                                      | 删除所有注释，除了以`/!*`开头的版权信息。                    |
| `--rootDir`                          | `string`   | *(common root directory is computed from the list of input files)* | 仅用来控制输出的目录结构`--outDir`。                         |
| `rootDirs`[2]                        | `string[]` |                                                              | *根（root）*文件夹列表，联给了代表运行时表示工程结构的内容。查看[模块解析文档](http://www.tslang.cn/docs/handbook/module-resolution.html#virtual-directories-with-rootdirs)了解详情。 |
| `--skipLibCheck`                     | `boolean`  | `false`                                                      | 不检查默认库文件（`lib.d.ts`）的正确性。                     |
| `--skipDefaultLibCheck`              | `boolean`  | `false`                                                      | 不检查用户定义的库文件（`*.d.ts`）的正确性。                 |
| `--sourceMap`                        | `boolean`  | `false`                                                      | 生成相应的'.map'文件。                                       |
| `--sourceRoot`                       | `string`   |                                                              | 指定TypeScript源文件的路径，以便调试器定位。当TypeScript文件的位置是在运行时指定时使用此标记。路径信息会被加到`sourceMap`里。 |
| `--strictNullChecks`                 | `boolean`  | `false`                                                      | 在严格的`null`检查模式下，`null`和`undefined`值不包含在任何类型里，只允许用它们自己和`any`来赋值（有个例外，`undefined`可以赋值到`void`）。 |
| `--stripInternal`[1]                 | `boolean`  | `false`                                                      | 不对具有`/** @internal */` JSDoc注解的代码生成代码。         |
| `--suppressExcessPropertyErrors`[1]  | `boolean`  | `false`                                                      | 阻止对对象字面量的额外属性检查。                             |
| `--suppressImplicitAnyIndexErrors`   | `boolean`  | `false`                                                      | 阻止`--noImplicitAny`对缺少索引签名的索引对象报错。查看[issue #1232](https://www.w3cschool.cn/targetlink?url=https://github.com/Microsoft/TypeScript/issues/1232#issuecomment-64510362)了解详情。 |
| `--target` `-t`                      | `string`   | `"ES5"`                                                      | 指定ECMAScript目标版本'ES3' (默认)，'ES5'，或'ES6'[1]        |
| `--traceResolution`                  | `boolean`  | `false`                                                      | 生成模块解析日志信息                                         |
| `--types`                            | `string[]` |                                                              | 要包含的类型声明文件名列表。                                 |
| `--typeRoots`                        | `string[]` |                                                              | 要包含的类型声明文件路径列表。                               |
| `--version` `-v`                     |            |                                                              | 打印编译器版本号。                                           |
| `--watch` `-w`                       |            |                                                              | 在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。 |



### tsconfig

如果一个目录下存在一个`tsconfig.json`文件，那么它意味着这个目录是TypeScript项目的根目录。`tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项。

- 不带任何输入文件的情况下调用`tsc`，编译器会从当前目录开始去查找`tsconfig.json`文件，逐级向上搜索父目录。
- 不带任何输入文件的情况下调用`tsc`，且使用命令行参数`--project`（或`-p`）指定一个包含`tsconfig.json`文件的目录。

如果一个glob模式里的某部分只包含`*`或`.*`，那么仅有支持的文件扩展名类型被包含在内（比如默认`.ts`，`.tsx`，和`.d.ts`， 如果`allowJs`设置能`true`还包含`.js`和`.jsx`）。

如果`"files"`和`"include"`都没有被指定，编译器默认包含当前目录和子目录下所有的TypeScript文件（`.ts`,`.d.ts` 和 `.tsx`），排除在`"exclude"`里指定的文件。JS文件（`.js`和`.jsx`）也被包含进来如果`allowJs`被设置成`true`。 如果指定了 `"files"`或`"include"`，编译器会将它们结合一并包含进来。 使用 `"outDir"`指定的目录下的文件永远会被编译器排除，除非你明确地使用`"files"`将其包含进来（这时就算用`exclude`指定也没用）。

使用`"include"`引入的文件可以使用`"exclude"`属性过滤。 然而，通过 `"files"`属性明确指定的文件却总是会被包含在内，不管`"exclude"`如何设置。 如果没有特殊指定， `"exclude"`默认情况下会排除`node_modules`，`bower_components`，和`jspm_packages`目录。

任何被`"files"或`"include"`指定的文件所引用的文件也会被包含进来。`A.ts`引用了`B.ts`，因此`B.ts`不能被排除，除非引用它的`A.ts`在`"exclude"`列表中。

`tsconfig.json`文件可以是个空文件，那么所有默认的文件（如上面所述）都会以默认配置选项编译。

在命令行上指定的编译选项会覆盖在`tsconfig.json`文件里的相应选项。

```json
{
    // 在最顶层设置compileOnSave标记，可以让IDE在保存文件的时候根据tsconfig.json重新生成文件。
    "compileOnSave": true,
    // "compilerOptions"可以被忽略，这时编译器会使用默认值。
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outFile": "../../built/local/tsc.js",
        "sourceMap": true
    },
    // "files"指定一个包含相对或绝对文件路径的列表。 "include"和"exclude"属性指定一个文件glob匹配模式列表。 支持的glob通配符有：
	// * 匹配0或多个字符（不包括目录分隔符）
    // ? 匹配一个任意字符（不包括目录分隔符）
    // **/ 递归匹配任意子目录
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "emitter.ts",
        "program.ts",
        "commandLineParser.ts",
        "tsc.ts",
        "diagnosticInformationMap.generated.ts"
    ],
    // 和上面的files选一个
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
    
}
```





### 三斜线指令

三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令*仅*可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

`/// <reference path="..." />`

`/// <reference path="..." />`指令是三斜线指令中最常见的一种。 它用于声明文件间的 *依赖*。

三斜线引用告诉编译器在编译过程中要引入的额外的文件。

当使用`--out`或`--outFile`时，它也可以做为调整输出内容顺序的一种方法。 文件在输出文件内容中的位置与经过预处理后的输入顺序一致。



一个常见的错误是使用`/// <reference>`引用模块文件，应该使用`import`。 要理解这之间的区别，我们首先应该弄清编译器是如何根据 `import`路径（例如，`import x from "...";`或`import x = require("...")`里面的`...`，等等）来定位模块的类型信息的。

编译器首先尝试去查找相应路径下的`.ts`，`.tsx`再或者`.d.ts`。 如果这些文件都找不到，编译器会查找 *外部模块声明*。 回想一下，它们是在 `.d.ts`文件里声明的。

- `myModules.d.ts`

```
// In a .d.ts file or .ts file that is not a module:
declare module "SomeModule" {
    export function fn(): string;
}
```

- `myOtherModule.ts`

```
/// <reference path="myModules.d.ts" />
import * as m from "SomeModule";
```

这里的引用标签指定了外来模块的位置。 这就是一些Typescript例子中引用 `node.d.ts`的方法。





## 其他

- 类型推断
- 类型兼容性，在TypeScript里，有两种类型的兼容性：子类型与赋值
  - 函数
  - 函数参数双向协变
  - 可选参数及剩余参数
  - 重载
  - 枚举，数字类型与枚举类型兼容
  - 类，接口



### Null和undefined类型 

TypeScript现在有两个特殊的类型：Null和Undefined, 它们的值分别是`null`和`undefined`。 以前这是不可能明确地命名这些类型的，但是现在 `null`和`undefined`不管在什么类型检查模式下都可以作为类型名称使用。

以前类型检查器认为`null`和`undefined`赋值给一切。实际上，`null`和`undefined`是每一个类型的有效值， 并且不能明确排除它们（因此不可能检测到错误）。

`--strictNullChecks`

`--strictNullChecks`可以切换到新的严格空检查模式中。

在严格空检查模式中，`null`和`undefined`值*不再*属于任何类型的值，仅仅属于它们自己类型和`any`类型的值 （还有一个例外， `undefined`也能赋值给`void`）。因此，尽管在常规类型检查模式下`T`和`T | undefined`被认为是相同的 （因为 `undefined`被认为是任何`T`的子类型），但是在严格类型检查模式下它们是不同的， 并且仅仅 `T | undefined`允许有`undefined`值，`T`和`T | null`的关系同样如此。



### 类静态部分与实例部分的区别

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

```tsx
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。

因此，我们应该直接操作类的静态部分。 看下面的例子，我们定义了两个接口， `ClockConstructor`为构造函数所用和`ClockInterface`为实例方法所用。 为了方便我们定义一个构造函数 `createClock`，它用传入的类型创建实例。

```tsx
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

因为`createClock`的第一个参数是`ClockConstructor`类型，在`createClock(AnalogClock, 7, 32)`里，会检查`AnalogClock`是否符合构造函数签名。



### 混合类型

**Counter 接口：**

```tsx
typescriptCopy codeinterface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
```

- 这个接口定义了一个混合类型 `Counter`，它既是一个函数，也有属性 `interval` 和方法 `reset`。
- 函数签名表示这个混合类型的实例可以被调用，接受一个 `number` 类型的参数，并返回一个 `string` 类型的值。

**getCounter 函数：**

```tsx
typescriptCopy codefunction getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
```

- `getCounter` 函数返回一个 `Counter` 类型的实例。
- 在函数内部，定义了一个函数 `counter`，并将其类型断言为 `Counter`，即强制认为这个函数满足 `Counter` 接口的定义。
- 添加了属性 `interval` 和方法 `reset` 给这个函数。 
- 最后，返回了这个具备函数和属性的对象。

**使用 Counter 实例：**

```tsx
typescriptCopy codelet c = getCounter();
c(10);        // 可调用，返回 string 类型
c.reset();    // 调用 reset 方法
c.interval = 5.0;  // 设置 interval 属性
```

- 使用 `getCounter` 得到一个 `Counter` 类型的实例 `c`。
- 可以调用 `c`，因为它被定义为一个函数。
- 可以调用 `reset` 方法，因为它被定义为 `Counter` 接口中的方法。
- 可以设置 `interval` 属性，因为它也是 `Counter` 接口中的属性。

这种混合类型的使用方式常见于一些需要同时具备函数、属性和方法的情况，例如定时器函数或类似于 jQuery 的库。在这个例子中，通过接口定义了一个通用的混合类型，并在 `getCounter` 函数中创建了一个实例。这样可以更灵活地操作对象，同时保持类型检查的安全性。











