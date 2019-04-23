libs:
  - lodash

---

# Function binding

When using `setTimeout` with object methods or passing object methods along, there's a known problem: "losing `this`".

Suddenly, `this` just stops working right. The situation is typical for novice developers, but happens with experienced ones as well.

## Losing "this"

We already know that in JavaScript it's easy to lose `this`. Once a method is passed somewhere separately from the object -- `this` is lost.

Here's how it may happen with `setTimeout`:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

As we can see, the output shows not "John" as `this.firstName`, but `undefined`!

That's because `setTimeout` got the function `user.sayHi`, separately from the object. The last line can be rewritten as:

```js
let f = user.sayHi;
setTimeout(f, 1000); // lost user context
```

The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases as we'll see, usually `this` just becomes `undefined`.

The task is quite typical -- we want to pass an object method somewhere else (here -- to the scheduler) where it will be called. How to make sure that it will be called in the right context?

## Solution 1: a wrapper

The simplest solution is to use a wrapping function:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Now it works, because it receives `user` from the outer lexical environment, and then calls the method normally.

The same, but shorter:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Looks fine, but a slight vulnerability appears in our code structure.

What if before `setTimeout` triggers (there's one second delay!) `user` changes value? Then, suddenly, it will call the wrong object!


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...within 1 second
user = { sayHi() { alert("Another user in setTimeout!"); } };

// Another user in setTimeout?!?
```

The next solution guarantees that such thing won't happen.

## Solution 2: bind

Functions provide a built-in method [bind](mdn:js/Function/bind) that allows to fix `this`.

The basic syntax is:

```js
// more complex syntax will be little later
let boundFunc = func.bind(context);
````

The result of `func.bind(context)` is a special function-like "exotic object", that is callable as function and transparently passes the call to `func` setting `this=context`.

In other words, calling `boundFunc` is like `func` with fixed `this`.

For instance, here `funcUser` passes a call to `func` with `this=user`:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Here `func.bind(user)` as a "bound variant" of `func`, with fixed `this=user`.

All arguments are passed to the original `func` "as is", for instance:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// bind this to user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (argument "Hello" is passed, and this=user)
*/!*
```

Now let's try with an object method:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!
```

In the line `(*)` we take the method `user.sayHi` and bind it to `user`. The `sayHi` is a "bound" function, that can be called alone or passed to `setTimeout` -- doesn't matter, the context will be right.

Here we can see that arguments are passed "as is", only `this` is fixed by `bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John ("Hello" argument is passed to say)
say("Bye"); // Bye, John ("Bye" is passed to say)
```

````smart header="Convenience method: `bindAll`"
If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(obj)](http://lodash.com/docs#bindAll) in lodash.
````

## Summary

Method `func.bind(context, ...args)` returns a "bound variant" of function `func` that fixes the context `this` and first arguments if given.

Usually we apply `bind` to fix `this` in an object method, so that we can pass it somewhere. For example, to `setTimeout`. There are more reasons to `bind` in the modern development, we'll meet them later.
