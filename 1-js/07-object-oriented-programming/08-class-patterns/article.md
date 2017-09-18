
# Class patterns

```quote author="Wikipedia"
In object-oriented programming, a *class* is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods).
```

There's a special syntax construct and a keyword `class` in JavaScript. But before studying it, we should consider that the term "class" comes from the theory of object-oriented programming. The definition is cited above, and it's language-independant.

In JavaScript there are several well-known programming patterns to make classes even without using the `class` keyword. And here we'll talk about them first.

The `class` construct will be described in the next chapter, but in JavaScript it's a "syntax sugar" and an extension of one of the patterns that we'll study here.

[cut]


## Functional class pattern

The constructor function below can be considered a "class" according to the definition:

```js run
function User(name) {
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // John
```

It follows all parts of the definition:

1. It is a "program-code-template" for creating objects (callable with `new`).
2. It provides initial values for the state (`name` from parameters).
3. It provides methods (`sayHi`).

This is called *functional class pattern*.

In the functional class pattern, local variables and nested functions inside `User`, that are not assigned to `this`, are visible from inside, but not accessible by the outer code.

So we can easily add internal functions and variables, like `calcAge()` here:

```js run
function User(name, birthday) {

*!*
  // only visible from other methods inside User
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }
*/!*

  this.sayHi = function() {
    alert(name + ', age:' + calcAge());
  };
}

let user = new User("John", new Date(2000,0,1));
user.sayHi(); // John
```

In this code variables `name`, `birthday` and the function `calcAge()` are internal, *private* to the object. They are only visible from inside of it.

From the other hand, `sayHi` is the external, *public* method. The external code that creates `user` can access it.

This way we can hide internal implementation details and helper methods from the outer code. Only what's assigned to `this` becomes visible outside.

## Factory class pattern

We can create a class without using `new` at all.

Like this:

```js run
function User(name, birthday) {
  // only visible from other methods inside User
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }

  return {
    sayHi() {
      alert(name + ', age:' + calcAge());
    }
  };
}

*!*
let user = User("John", new Date(2000,0,1));
*/!*
user.sayHi(); // John
```

As we can see, the function `User` returns an object with public properties and methods. The only benefit of this method is that we can omit `new`: write `let user = User(...)` instead of `let user = new User(...)`. In other aspects it's almost the same as the functional pattern.

## Prototype-based classes

Prototype-based classes is the most important and generally the best. Functional and factory class patterns are rarely used in practice.

Soon you'll see why.

Here's the same class rewritten using prototypes:

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
  alert(this._name + ', age:' + this._calcAge());
};

let user = new User("John", new Date(2000,0,1));
user.sayHi(); // John
```

The code structure:

- The constructor `User` only initializes the current object state.
- Methods are added to `User.prototype`.

As we can see, methods are lexically not inside `function User`, they do not share a common lexical environment. If we declare variables inside `function User`, then they won't be visible to methods.

So, there is a widely known agreement that internal properties and methods are prepended with an underscore `"_"`. Like `_name` or `_calcAge()`. Technically, that's just an agreement, the outer code still can access them. But most developers recognize the meaning of `"_"` and try not to touch prefixed properties and methods in the external code.

Here are the advantages over the functional pattern:

- In the functional pattern, each object has its own copy of every method. We assign a separate copy of `this.sayHi = function() {...}` and other methods in the constructor.
- In the prototypal pattern, all methods are in `User.prototype` that is shared between all user objects. An object itself only stores the data.

So the prototypal pattern is more memory-efficient.

...But not only that. Prototypes allow us to setup the inheritance in a really efficient way. Built-in JavaScript objects all use prototypes. Also there's a special syntax construct: "class" that provides nice-looking syntax for them. And there's more, so let's go on with them.

## Prototype-based inheritance for classes

Let's say we have two prototype-based classes.

`Rabbit`:

```js
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(this.name + ' jumps!');
};

let rabbit = new Rabbit("My rabbit");
```

![](rabbit-animal-independent-1.png)

...And `Animal`:

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  alert(this.name + ' eats.');
};

let animal = new Animal("My animal");
```

![](rabbit-animal-independent-2.png)

Right now they are fully independent.

But we'd want `Rabbit` to extend `Animal`. In other words, rabbits should be based on animals, have access to methods of `Animal` and extend them with its own methods.

What does it mean in the language of prototypes?

Right now methods for `rabbit` objects are in `Rabbit.prototype`. We'd like `rabbit` to use `Animal.prototype` as a "fallback", if the method is not found in `Rabbit.prototype`.

So the prototype chain should be `rabbit` -> `Rabbit.prototype` -> `Animal.prototype`.

Like this:

![](class-inheritance-rabbit-animal.png)

The code to implement that:

```js run
// Same Animal as before
function Animal(name) {
  this.name = name;
}

// All animals can eat, right?
Animal.prototype.eat = function() {
  alert(this.name + ' eats.');
};

// Same Rabbit as before
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(this.name + ' jumps!');
};

*!*
// setup the inheritance chain
Rabbit.prototype.__proto__ = Animal.prototype; // (*)
*/!*

let rabbit = new Rabbit("White Rabbit");
*!*
rabbit.eat(); // rabbits can eat too
*/!*
rabbit.jump();
```

The line `(*)` sets up the prototype chain. So that `rabbit` first searches methods in `Rabbit.prototype`, then `Animal.prototype`. And then, just for completeness, let's mention that if the method is not found in `Animal.prototype`, then the search continues in `Object.prototype`, because `Animal.prototype` is a regular plain object, so it inherits from it.

So here's the full picture:

![](class-inheritance-rabbit-animal-2.png)

## Summary

The term "class" comes from the object-oriented programming. In JavaScript it usually means the functional class pattern or the prototypal pattern. The prototypal pattern is more powerful and memory-efficient, so it's recommended to stick to it.

According to the prototypal pattern:
1. Methods are stored in `Class.prototype`.
2. Prototypes inherit from each other.

In the next chapter we'll study `class` keyword and construct. It allows to write prototypal classes shorter and provides some additional benefits.
