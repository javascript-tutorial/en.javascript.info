# Object methods, "this"

Objects are usually created to represent entities of the real world, like users, orders and so on:

```js
let user = {
  name: "John",
  age: 30
};
```

And, in the real world, a user can `act`: to select something from the shopping cart, to login, to logout etc. 

Let's implement the same in Javascript using functions in properties.

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

OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That's architecture. We will make use of OOP further when we get enough familarity with the language. 
```

Of course, we could use a Function Declaration for the same purpose:

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

That would also work, but is longer. Also we get an "extra" function `sayHi` outside of the `user` object. Usually we don't want that.

## Method shorthand

There exists a shorter syntax for methods in an object literal:

```js 
// these objects do the same

let user = {
  sayHi: function() { 
    alert("Hello");
  }
}; 

// method shorthand looks better, right?
let user = {
*!*
  sayHi() { // same as "sayHi: function()"
*/!*
    alert("Hello");
  }
}; 
```

As demonstrated, we can omit a colon with the word `"function"`. 

To say the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later), but for now they do not matter. In almost all cases the shorter syntax is preferred.

## "this" in methods

It's common that an object method needs to access the information stored in the object to do its job.

For instance, `user.sayHi()` may need to mention the name of the user.

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

If we used `this.name` instead of `user.name` inside the `alert`, then the code would work.

## "this" is free

In Javascript, "this" keyword behaves unlike most other programming languages.

The "this" keyword can be used in any function. There's no syntax error in the code like that:

```js
function sayHi() {
  alert( this.name );
} 
```

It is fully syntactically free. The value of `this` will be evaluated during the run-time.

For instance, the function may have different "this" when called in contexts of different objects:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// use the same functions in two objects
user.f = sayHi;
admin.g = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.g(); // Admin  (this == admin)

admin['g'](); // Admin (dot or square brackets access the method – doesn't matter)
```

Actually, we can call the function without an object at all:

```js run
function sayHi() {
  alert(this);
}

sayHi();
```

In this case `this` is `undefined` in strict mode. If we try to access `this.name`, there will be an error.

Please note that usually a call like this is not normal, but rather a programming mistake. If a function has `this`, then it is usually to be called in the context of an object.

In a non-strict mode, if you forget `use strict` (let's hope you don't), then the value of `this` for a function without an object will be the *global object* (`"window"` for browser). We'll return to it later, but in a completely different chapter, because here it's just an odd thing of the previous standard that `"use strict"` fixes. 

## Reference Type

An intricate method call can loose `this`, for instance:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (the simple call works)

*!*
// now let's call user.hi or user.bye depending on the name
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

On the last line the method `user.hi` is retrieved during the execution of the ternary `?`, and immediately called with brackets `()`. But that doesn't work right. You can see that the call results in an error, cause the value of `"this"` inside the call becomes `undefined`.

Actually, anything more complex than a simple `obj.method()` (or square brackets here) looses `this`.

If we want to understand why it happens -- the reason is in the details of how `obj.method()` call works.

The method call is not a single thing. It has two successive operations in it: 
- the dot `'.'` retrieves the property
- brackets `()` execute it (assuming that's a function).

So, you might have already asked yourself, why does it work? That is, if we put these operations on separate lines, then `this` will be lost for sure:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// split getting and calling the method in two lines
let hi = user.hi;
hi(); // Error, because this is undefined
*/!*
```

That's because a function is a value of its own. It does not carry the object. So `hi = user.hi` saves it into the variable, and then on the last line it is completely standalone.

To make `user.hi()` calls work, Javascript uses a trick -- the dot `'.'` returns not a function, but a value of the special [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type).

The Reference Type is a "specification type". We can't explicitly access it, but it is used internally by the language.

The value of the Reference Type is a combination `(base, name, strict)`, where:

- `base` is the object.
- `name` is the property.
- `strict` is true if `use strict` is in effect.

The result of a property access `'.'` is a value of the Reference Type. For `user.hi` in strict mode it is:

```js
// Reference Type value
(user, "hi", true)
```

When brackets `()` are called on the Reference Type, they receive the full information about the object and it's method, and can set the right `this` (`=user` in this case).

Any other operation like assignment `hi = user.hi` discards the reference type as a whole, takes the value of `user.hi` (a function) and passes it on. So any further operation "looses" `this`.

So, as the result, the value of `this` is only passed the right way if the function is called directly using a dot `obj.method()` or square brackets `obj[method]()` syntax (they do the same here).


## Explicit "this" with "call/apply" [#call-apply]

The value of `this` does not have to come from the aforementioned rules.

We can explicitly set it to any object using `func.call`.

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

So `sayHi.call(admin)` runs the function `sayHi` with `this = admin`, hence `this.name` in it becomes `"Admin"`.

These calls are roughly equivalent:
```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

They both call `func` with arguments `1`, `2` and `3`. The only difference is that `call` also sets `"this"`.

The method `func.call` is used when we'd like to use a function in the context of different objects, but do not want to actually assign it to them. We'll see more examples of it soon.

### "func.apply"

There's also a similar method `func.apply`:

```js
func.apply(context, args)
```

It does the same as `call`: executes the function providing `context` as `this`, but where `call` awaits a list of arguments, `apply` awaits an array.

These two calls do the same:

```js
func.call(obj, 1, 2, 3);
func.apply(obj, [1, 2, 3]);
```

In old times `apply` was more powerful, because it allows to create the array of arguments dynamically. Their number is not hardcoded at code-write time.

But in the modern language, we have the spread operator `'...'` and can use it to convert an array into a list of for `call`, so these two are equal:

```js
let args = [1, 2, 3];

func.call(obj, ...args);
func.apply(obj, args);
```

Nowadays the use of `apply` or `call` is mainly a metter of personal preference. But `apply` is  somewhat better optimized in engines than the call + spread combination, because it exists longer. So it would execute a little bit faster.

## Binding "this" with "bind"

There's still a way to bind "this" to a function.

[todo] migrate bind here????


## Summary

[todo]