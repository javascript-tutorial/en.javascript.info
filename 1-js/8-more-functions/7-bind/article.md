libs:
  - lodash

---

# Function binding

When using `setTimeout` with object methods or passing object methods along, there's a known problem: "loosing `this`".

Suddenly, `this` just stops working right. The situation is typical for novice developers, but happens with experienced ones as well. 

[cut]

## Loosing "this"

We already know that in Javascript it's easy to loose `this`. Once a method is passed somewhere separately from the object -- `this` is lost.

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

The method `setTimeout` is a little special: it sets `this=window` for the function call. So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases as we'll see, usually `this` just becomes `undefined`. 

The task is quite typical -- we want to pass an object method somewhere else where it will be called. How to make sure that it will be called in the right context?

There are few ways we can go.

## Solution 1: a wrapper

The simplest solution is to use an wrapping function:

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

The same function, but shorter:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Looks fine, but a slight vulnerability appears in our code structure.

What is before `setTimeout` triggers (one second delay!) `user` will get another value. Then, suddenly, the it will call the wrong object!

Surely, we could write code more carefully. But it would be better if we could just guarantee the right context, no matter what.

## Solution 2: bind

Functions provide a built-in method [bind](mdn:js/Function/bind) that allows to fix `this`.

The syntax is:

```js
// more complex syntax will be little later
let bound = func.bind(context);
````

The result of `func.bind` is a special "exotic object", that is essentially a function, but instead of having its own body, it transparently passes the call to `func` with given arguments and `this=context`.

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

We can think of `func.bind(user)` as a "bound" variant of `func`, with fixed `this=user`.

The example below demonstrates that arguments are passed "as is" to `func`:


```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

let funcUser = func.bind(user); // funcUser passes all calls to func with this=user 
*!*
funcUser("Hello"); // Hello, John (argument "Hello" is passed as is)
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

It fixes only `this`, arguments are passed "as is":

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

Javascript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(obj)](http://lodash.com/docs#bindAll) in lodash.
````



## Partial application

Till now we were only talking about binding `this`. Now let's make a step further.

We can bind not only `this`, but also arguments. That's more seldom used, but can also be handy.

The full syntax of `bind`:

```js
let bound = func.bind(context, arg1, arg2, ...);
```

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Let's use `bind` to create a function, doubling the value:

```js run
*!*
let double = mul.bind(null, 2); 
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that here we actually don't use the `this` context. But `bind` requires it first, so we need to pass something like `null`.

The function `triple` in the code below triples the value:

```js run
*!*
let triple = mul.bind(null, 3); 
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Why to make a partial function? 

Here our benefit is that we created an independent function with a readable name (`double`, `triple`). We can use it and don't write the first argument of every time, cause it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function, and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

### Going partial without context

What if we'd like to fix arguments only, but do not touch the context?

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a `partial` function for binding only arguments can be easily implemented.

Like this:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args); 
  }
}
*/!*

// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${phrase}, ${this.firstName}!`);
  }
};

user.sayNow = partial(user.say, "10:00"); // fix the first argument

user.sayNow("Hello"); 
// [10:00] Hello, John!
// translates to: user.say("10:00", "Hello")
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)


In other words, the function gets an unaltered context, then partial-bound arguments, then those that come from the call.

So easy to do it the spread operator, right?

Also we can use [_.partial](https://lodash.com/docs#partial) from lodash library.

## Currying 

Sometimes people mix up partial function application mentioned above with another thing named "currying".

[Currying](https://en.wikipedia.org/wiki/Currying) is translating a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`.

Let's make `curry` function that translates `f(a, b)` into `f(a)(b)`:

```js run
*!*
function curry(func) {
  return function(a) {
    return function(b) {
      return func(a, b);
    };
  };
}
*/!*

// usage
function sum(a, b) {
  return a + b;
}

let carriedSum = curry(sum);

alert( carriedSum(1)(2) ); // 3
```

As you can see, the implementation is a series of wrappers. 

- The result of `curry(func)` is a wrapper `function(a)`. 
- When it is called like `sum(1)`, the argument is saved in the Lexical Environment, and a new wrapper is returned `function(b)`.
- Then `sum(1)(2)` finally calls `function(b)` providing `2`, and it passes the call to the original multi-argument `sum`.

We can make it more universal:

```js run
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args); 
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2)); 
      }
    }
  };

}

function sum(a, b, c) {
  return a + b + c;
}

let curried = curry(sum);

alert( curried(1)(2)(3) ); // 6
```

Now it transforms 3-argument `sum` with ease.

The new `curry` is a little more complicated. An attentive look still can make it easy to understand.

The result of `curry(func)` is a wrapper:

```js
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args); 
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2)); 
    }
  }
};
```

1. If passed `args` count is the same as the original function has in its definition (`func.length`) or longer, then just pass the call to it.
2. Otherwise, `func` is not called yet. Instead, another wrapper is returned, that will take already-received `args` from the closure and try to invoke `curried` with them plus what it gets.

For instance, let's see what happens in the case of `sum(a, b, c)`. Three arguments, so `sum.length = 3`.

For the call `curried(1)(2)(3)`:

1. The first call `curried(1)` remembers `1` in its Lexical Environment, and returns a wrapper `pass`.
2. The next call becomes `pass(2)`, it takes previous args (`1`), concatenates them with what it got `(2)` and calls `curried(1, 2)` with them together.

    As the argument count is still less than 3, `curry` returns `pass`, current arguments (now `1` and `2`) are  retained in the Lexical Environment.
3. Finally, for the next call `pass(3)` takes previous args (`1`, `2`) and adds `3` to them, making the call `curried(1, 2, 3)` -- there are `3` arguments at last, they are given to the original function.

If that's still not obvious, just trace the calls sequence in your mind or on the paper.

We can also use [_.curry](https://lodash.com/docs#curry) from lodash library for the same purpose.

```smart header="Fixed-length functions only"
The currying process requires the function to have a known fixed number of arguments.
```

```smart header="A little more than currying"
By definition, currying should convert `sum(a, b, c)` into `sum(a)(b)(c)`.

But most implementations of currying in Javascript also keep the function callable in the multi-argument variant.
```

### Currying? What for?

Currying allows to get partial functions easily, without breaking normal function runs.

For instance, we have the logging function `log(date, importance, message)` to nicely output that information (and in real-life it has a lot of other useful features):

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

// let's curry it!
log = _.curry(log);

// still works the normal way
log(new Date(), "DEBUG", "3-arg call");

// but also can call it in curried form:
log(new Date())("DEBUG")("3-arg call");

*!*
// let's get a convenience function for today's logs:
let todayLog = log(new Date());
*/!*

todayLog("INFO", "2-arg call");

// let's get a convenience function for today's debug messages:
*!*
let todayDebug = todayLog("DEBUG");
*/!*

todayDebug("1-arg call");
```

## Summary [todo]

To safely pass an object method to `setTimeout`, we can bind the context to it.

The syntax:

```js
let bound = func.bind(context, arg1, arg2...)
```

The result is an "exotic object" that passes all calls to `func`, fixing context and arguments (if provided).

We can use it to fix the context (most often case), or also some of the arguments.
