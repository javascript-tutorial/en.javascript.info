
# Classes

The "class" construct allows to define prototype-based classes with a clean, nice-looking syntax.

[cut]

## The "class" syntax

The `class` syntax is versatile, we'll start from a simple example first.

Here's a prototype-based class `User`:

```js run
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
}

let user = new User("John");
user.sayHi();
```

...And that's the same using `class` syntax:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let user = new User("John");
user.sayHi();
```

It's easy to see that the two examples are alike. So, what exactly does `class` do? We may think that it defines a new language-level entity, but that would be wrong.

The `class User {...}` here actually does two things:

1. Declares a variable `User` that references the function named `"constructor"`.
2. Puts into `User.prototype` methods listed in the definition. Here it includes `sayHi` and the `constructor`.

Here's some code to demonstrate that:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name);  }
}

*!*
// proof: User is the "constructor" function
*/!*
alert(User == User.prototype.constructor); // true

*!*
// proof: there are two methods in its "prototype"
*/!*
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

Here's the illustration of `class User`:

![](class-user.png)

So `class` is a special syntax to define the constructor with prototype methods.

...But not only that. There are minor tweaks here and there to ensure the right usage.

For instance, the `constructor` function can't be called without `new`:
```js run
class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
```

```smart header="Outputting a class"
If we output it like `alert(User)`, some engines show `"class User..."`, while others show `"function User..."`.

Please don't be confused: the string representation may vary, but that's still a function, there is no separate "class" entity in JavaScript language.
```

```smart header="Class methods are non-enumerable"
Class definition sets `enumerable` flag to `false` for all methods in the `"prototype"`. That's good, because if we `for..in` over an object, we usually don't want its class methods.
```

```smart header="What if there's no constructor?"
If there's no `constructor` in the `class` construct, then an empty function is generated, same as if we had written `constructor() {}`.
```

```smart header="Classes always `use strict`"
All code inside the class construct is automatically in strict mode.
```

### Getters/setters

Classes may also include getters/setters. Here's an example with `user.name` implemented using them:

```js run
class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name too short.
```

### Only methods

Unlike object literals, no `property:value` assignments are allowed inside `class`. There may be only methods (without a comma between them) and getters/setters.

The idea is that everything inside `class` goes to the prototype. And the prototype should store methods only, which are shared between objects. The data describing a concrete object state should reside in individual objects.

If we really insist on putting a non-function value into the prototype, then `class` can't help here. We can alter `prototype` manually though, like this:

```js run
class User { }

User.prototype.test = 5;

alert( new User().test ); // 5
```

So, technically that's possible, but we should know why we're doing it.

An alternative here would be to use a getter:

```js run
class User {
  get test() {
    return 5;
  }
}

alert( new User().test ); // 5
```

From the external code, the usage is the same. But the getter variant is probably a bit slower.

## Class Expression

Just like functions, classes can be defined inside another expression, passed around, returned etc.

Here's a class-returning function ("class factory"):

```js run
function getClass(phrase) {
*!*
  return class {
    sayHi() {
      alert(phrase);
    };
  };
*/!*
}

let User = getClass("Hello");

new User().sayHi(); // Hello
```

That's quite normal if we recall that `class` is just a special form of function-with-prototype definition.

And, like Named Function Expressions, such classes also may have a name, that is visible inside that class only:

```js run
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass);
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass is only visible in methods of the class
```

## Static methods

Static methods are bound to the class function, not to its `"prototype"`.

An example:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this == User);
  }
}

User.staticMethod(); // true
```

That actually does the same as assigning it as a function property:

```js
function User() { }

User.staticMethod = function() {
  alert(this == User);
};
```

The value of `this` inside `User.staticMethod()` is the class constructor `User` itself (the "object before dot" rule).

Usually, static methods are used when the code is related to the class, but not to a particular object of it.

For instance, we have `Article` objects and need a function to compare them. The natural choice would be `Article.compare`, like this:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("Mind", new Date(2016, 1, 1)),
  new Article("Body", new Date(2016, 0, 1)),
  new Article("JavaScript", new Date(2016, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // Body
```

Here `Article.compare` stands "over" the articles, as a means to compare them.

Another example would be a so-called "factory" method, that creates an object with specific parameters.

Like `Article.createTodays()` here:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // remember, this = Article
    return new this("Todays digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( articles.title ); // Todays digest
```

Now every time we need to create a todays digest, we can call `Article.createTodays()`.

Static methods are often used in database-related classes to search/save/remove entries from the database, like this:

```js
// assuming Article is a special class for managing articles
// static method to remove the article:
Article.remove({id: 12345});
```
