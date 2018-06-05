
# ES６中的Class

```引用自"维基百科"
在面向对象的编程中，*class* 是用于创建对象的可扩展的程序代码模版，它为对象提供了状态(成员变量)的初始值和行为(成员函数和方法)的实现。
```

在Javascript中有一个特殊的语法结构和一个关键字 `class` 但是在学习它之前，我们应该明确“类”这个术语来自面向对象的编程理论。定义正如上面所说，它是和语言无关的。

在Javascript中，在不使用 `class` 关键字的情况下，有很多种众所周知的编程模式来创建类，这里我们将首先讨论它们。

我们将在下一节描述 `class` 结构，但在Javascript中，`class` 是一种“语法糖”，也是我们接下来将要学习的众多模式中某一个的扩展。


## 构造函数模式

根据定义，下面的构造器函数可以被认为是一个“类”:

```js run
function User(name) {
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // John
```

它遵循定义的所有条目:

1. 它是一个创建对象的“程序代码模版”(可以使用 `new` 关键字调用)。
2. 它提供了状态的初始值(参数中的 `name` )。
3. 它提供了方法( `sayHi` )。

这被叫做 *构造函数模式* 。

在构造函数模式中,`User` 内的局部变量和嵌套函数并不会被指派给 `this`, 他们是内部可见的, 但不能被外部代码访问到。

所以我们可以轻松的添加内部函数和变量, 就像这里的 `calcAge()` :

```js run
function User(name, birthday) {
*!*
  // 只对User内的其他方法可见
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }
*/!*

  this.sayHi = function() {
    alert(`${name}, age:${calcAge()}`);
  };
}

let user = new User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:17
```

在这段代码中变量 `name`、 `birthday` 和方法 `calcAge()` 是内部的, 对对象来说是*私有的*。 他们只对它的内部可见.

另一方面, `sayHi` 是外部的, *公有的*方法. 创建 `user` 的外部代码可以访问它。

这样我们可以对外部代码隐藏内部的实现细节和辅助方法。只有被分配到 `this` 上的变量或方法才能对外部代码可见。

## 工厂类模式

我们可以完全不使用 `new` 关键字来创建一个类。

就像这样:

```js run
function User(name, birthday) {
  // 只对User内的其他方法可见
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }

  return {
    sayHi() {
      alert(`${name}, age:${calcAge()}`);
    }
  };
}

*!*
let user = User("John", new Date(2000, 0, 1));
*/!*
user.sayHi(); // John, age:17
```

我们可以看到, 函数 `User` 返回一个带有公共属性和方法的对象。这种方法的唯一好处是我们可以省略 `new`: 用 `let user = User(...)` 代替 `let user = new User(...)`。在其他方面它和构造函数模式几乎一样。

## 基于原型的类

基于原型的类是最重要也是一般来说最好的创建类的方式。构造函数模式和工厂类模式在实践中是很少用的。

接下来你将看到为什么。

这是用原型重写的同一个类：

```js run
function User(name, birthday) {
*!*
  this._name = name;
  this._birthday = birthday;
*/!*
}

*!*
User.prototype._calcAge = function() {
*/!*
  return new Date().getFullYear() - this._birthday.getFullYear();
};

User.prototype.sayHi = function() {
  alert(`${this._name}, age:${this._calcAge()}`);
};

let user = new User("John", new Date(2000, 0, 1));
user.sayHi(); // John, age:17
```

代码结构:

- 构造器 `User` 只是初始化当前对象的状态。
- 方法被添加到 `User.prototype` 中。

正如我们看到的, 所有的方法在词法上来说不在 `function User` 内部，它们不共享一个词汇环境。如果我们在 `function User` 内部声明变量，那么它们对方法是不可见的。

所以, 有一个众所周知的协定就是内部方法和属性的命名以下划线`"_"`开头，例如`_name`或者`_calcAge()`。从技术上来说，这只是一个协定，外部代码仍然可以访问到它们。但是几乎所有的开发者都知道 `"_"` 的意义，并且尽量不会在外部代码中触碰有前缀的属性和方法。

以下是相比构造函数模式的优势:

- 在构造函数模式中，每个对象都有它自己的方法的副本。我们在构造器中指定一个 `this.sayHi = function() {...}` 和其他方法的隔离的副本。
- 在原型模式中，所有的方法都在 `User.prototype` 上，并对所有的user对象共享。对象本身只存储数据。

所以原型模式存储效率更高。

...不止这些。原型允许我们以真正有效率的方式实现继承。内置的JavaScript对象都使用了原型。还有一个特殊的语法结构："class"，它提供了一个看起来更优雅的语法来实现原型继承。还有更多，让我们继续。

## 类基于原型的继承

假设我们有两个基于原型的类。

`Rabbit`:

```js
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(`${this.name} jumps!`);
};

let rabbit = new Rabbit("My rabbit");
```

![](rabbit-animal-independent-1.png)

...和 `Animal`:

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  alert(`${this.name} eats.`);
};

let animal = new Animal("My animal");
```

![](rabbit-animal-independent-2.png)

现在他们完全独立了。

但是我们希望 `Rabbit` 来继承 `Animal`。换句话说，`Rabbit` 应该是基于 `Animal` 的，可以访问 `Animal` 的所有方法并且用它自己的方法扩展它们。

在原型的语境中这意味着什么呢？

现在 `rabbit` 对象的方法都在 `Rabbit.prototype` 中。我们希望当方法没在 `Rabbit.prototype` 中被找到的时候 `Animal.prototype` 被作为 `rabbit` 的“后备”。

所以原型链应该是这样的 `rabbit` -> `Rabbit.prototype` -> `Animal.prototype`.

就像这样:

![](class-inheritance-rabbit-animal.png)

代码实现:

```js run
// 和之前一样的Animal
function Animal(name) {
  this.name = name;
}

// 所有的动物都能吃, 对吧?
Animal.prototype.eat = function() {
  alert(`${this.name} eats.`);
};

// 和之前一样的Rabbit
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(`${this.name} jumps!`);
};

*!*
// 设置继承链
Rabbit.prototype.__proto__ = Animal.prototype; // (*)
*/!*

let rabbit = new Rabbit("White Rabbit");
*!*
rabbit.eat(); // 兔子也可以吃了
*/!*
rabbit.jump();
```

`(*)` 行设置了原型链。以至于 `rabbit` 首先从 `Rabbit.prototype` 中查找方法, 然后从 `Animal.prototype` 查找。 而后为了完整起见，让我们注意一下如果在 `Animal.prototype` 中找不到该方法, 那么则继续在 `Object.prototype` 中查找, 因为 `Animal.prototype` 是简单对象, 所以继承自它。

这里是完整的关系:

![](class-inheritance-rabbit-animal-2.png)

## 总结

"class"的概念来自于面向对象的编程，在Javascript中它通常意味着构造函数模式或者原型模式。 原型模式是更强大的和存储效率更高的, 所以推荐使用它。

通过原型模式做到:
1. 方法被挂载到 `Class.prototype` 中。
2. 原型间的继承。

下一章节我们将学习 `class` 关键字和语法结构。它允许编写更短的原型类并提供一些额外的好处。
