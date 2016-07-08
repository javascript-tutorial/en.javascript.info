# Object methods, "this"

As we remember from the chapter <info:types>, objects to store keyed collections of data. We usually create objects to represent entities of the real world, like users, orders and so on:

```js
let user = {
  name: "John",
  age: 30
};
```

And, in the real world, a user can `act`: to select something from the shopping cart, to login, to logout etc. 

Let's implement the same in Javascript.

[cut]

For the start, let's teach the `user` to say hello:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

Here we've just used a Function Expression to create the function and assign it to the property `user.sayHi` of the object.

Then we can call it. The user now can speak!

A function that is the property of an object is called its *method*.

So, here we've got a method `sayHi` of the object `user`.

```smart header="Object-oriented programming"
When we write our code using objects to represent entities, that's called an [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), in short: "OOP". 

OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the code and the interaction between them? That's an architecture. 

We will make use of OOP further when we get enough familarity with basic functions of the language. 
```

Of course we could use a Function Declaration for the same purpose:

```js run
let user = {
  // ...
};

*!*
function sayHi() {
  alert("Hello!");
};

user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

That would also work, but is longer. Also we get an "extra" function `sayHi` outside of the `user` object. Here we don't want it.

## Method syntax

In an object literal, there's a shorter syntax for methods:

```js 
// these objects do the same

let user = {
  sayHi: function() { 
    alert("Hello");
  }
}; 

let user = {
*!*
  sayHi() { // same as "sayHi: function()"
*/!*
    alert("Hello");
  }
}; 
```

As demonstrated, we can omit a colon with the word `"function"`. And it actually looks better.

To say the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later), but for now they do not matter. In almost all cases the shorter syntax is preferred.

## "this" in methods

It's common that an object method needs to access the information stored in the object to do its job.

For instance, `user.sayHi()` may need to mention the name.

**To access the object, a method can use the `this` keyword.**

The value of `this` is the object "before dot", the one used to call the method.

For instance:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( this.name ); // "this" means "this object"
*/!*
  }

};

user.sayHi(); // John
```

Here during the execution of `user.sayHi()`, the value of `this` will be `user`.

Technically, it's also possible to access the object without `this`:

```js 
...
  sayHi() {
    alert( *!*user.name*/!* ); 
  }
...
```

...But such code is unreliable. If we decide to copy `user` to another variable, e.g. `admin = user` and overwrite `user` with something else, then it will access the wrong object.

That's demonstrated below:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // leads to an error
*/!*
  }

};


let admin = user;
user = null; // overwrite to make things obvious

admin.sayHi(); // wops! inside sayHi(), the old name is used! error!
```

The variant with `this.name` instead of `user.name` would work fine here.

## "this" is free

In Javascript, "this" keyword behaves unlike most other programming languages.

The "this" keyword can be used in any function. There's no syntax error in the code like that:

```js
function sayHi() {
  alert( this.name );
} 
```

It is fully syntactically free. The function does not yet know what "this" value will be. It will be evaluated during the run-time.

For instance, it may have different "this" when called in the context of different objects:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

user.f = sayHi;
admin.g = sayHi;

// "this" inside the function is the object "before the dot"
user.f(); // John
admin.g(); // Admin
admin['g'](); // Admin (dot or square brackets to access the method – doesn't matter)
```

Actually, we can call the function without an object at all:

```js run
function sayHi() {
  alert(this);
}

sayHi();
```

In this case `this` is `undefined`. If we try to access `this.name`, there will be an error.

Such calls are often a result of the programming mistake. If a function has `this`, then it is usually to be called in the context of an object.

```smart header="And without `use strict`..."
If you forget `use strict`, then you may see something like "window" in the example above.

That's one of the odd things of the previous standard that `"use strict"` fixes.
```

## "this" is for direct calls

The value of `this` is only passed the right way if the function is called using a dot `'.'` or square brackets.

A more intricate call would lead to losing `this`, for instance:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (the simple call works)

*!*
// now let's call user.hi or user.bye depending on the name
(user.name == "John" ? user.hi : user.bye)(); // undefined
*/!*
```

On the last line the method is retrieved during the execution of the ternary `?`, and immediately called. But `"this"` is lost, the result is not `"John"` how it should be.

If we want to understand why it happens -- the reason is in the details of how `obj.method()` works.

The method call has two independant operations in it: a dot `'.'` to access the property and brackets `()` to execute it (assuming that's a function).

As we've already seen, the function is a value of its own. It does not memorize the object by itself. So to "carry" it to the brackets, Javascript uses a trick -- the dot `'.'` returns not a function, but a value of the special Reference Type.

The Reference Type is a "specification type". It does not exist in real, but used internally to explain how some language features work.

The value of the Reference Type is a tuple `(base, name, strict)`, where:

- `base` is the object.
- `name` is the property.
- `strict` is true if `use strict` is in effect.

The result of a property access `'.'` is a value of the Reference Type. For `user.sayHi` in strict mode it is:

```js
// base name   strict
(user, "sayHi", true)
```

Any operation on the Reference Type immediately "resolves" it:

- Brackets `()` get the property `base[name]` and execute it with `this = base`.
- Other operators just get `base[name]` and use it.

So any operation on the result of dot `'.'` except a direct call discards `this`. 

## Explicit "this" with "call/apply" [#call-apply]

We can call a function explicitly providing the value of `"this"`.

The syntax is:

```js
func.call(context, arg1, arg2, ...)
```

For instance:

```js run
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

The first parameter of `call` is the intended value of `"this"`, the latter are arguments. 

These calls are roughly equivalent:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

...Except that the `call` sets "this" of course!

That's handy when we want to use a function in the context of different objects, but do not want to actually assign it to them.

### "func.apply"

There's also a similar syntax:

```js
func.apply(context, args)
```

It does the same as `call`: executes the function providing `context` as `this`, but where `call` awaits a list of arguments, `apply` awaits a single array of arguments.

These two calls do the same:

```js
func.call(obj, 1, 2, 3);
func.apply(obj, [1, 2, 3]);
```

In old times `apply` was more powerful, because it allows to form the array of arguments dynamically. 

But in the modern language, we have the spread operator `'...'` and can use it to unfurl an array into the list of for `call`, so these two are equal:

```js
let args = [1, 2, 3];

func.call(obj, ...args);
func.apply(obj, args);
```

So the use of `apply` over `call` is mainly a metter of personal preference. And it's somewhat better optimized than the spread operator, because it exists longer.

## Binding "this" with "bind"

There's still a way to bind "this" to a function.

[todo] migrate bind here????


## Summary

[todo]