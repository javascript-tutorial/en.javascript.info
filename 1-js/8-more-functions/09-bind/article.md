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

The task is quite typical -- we want to pass an object method somewhere else (here -- to the scheduler) where it will be called. How to make sure that it will be called in the right context?

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

The same, but shorter:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Looks fine, but a slight vulnerability appears in our code structure.

What is before `setTimeout` triggers (there's one second delay!) `user` changes value? Then, suddenly, the it will call the wrong object!


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

Javascript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(obj)](http://lodash.com/docs#bindAll) in lodash.
````



## Partial application

Till now we were only talking about binding `this`. Now let's make a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

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

Let's use `bind` to create a function `double` on its base:

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

Please note that here we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:

```js run
*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Why do we usually make a partial function?

Here our benefit is that we created an independent function with a readable name (`double`, `triple`). We can use it and don't write the first argument of every time, cause it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function, and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

### Going partial without context

What if we'd like to fix some arguments, but not bind `this`?

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
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method that says something now by fixing the first argument
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] Hello, John!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it the spread operator, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Currying

Sometimes people mix up partial function application mentioned above with another thing named "currying". That's another interesting technique of working with functions that we just have to mention here.

[Currying](https://en.wikipedia.org/wiki/Currying) is translating a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`.

Let's make `curry` function that performs currying for binary functions. In other words, it translates `f(a, b)` into `f(a)(b)`:

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

More advanced implementations of currying like [_.curry](https://lodash.com/docs#curry) from lodash library do something more sophisticated. They return a wrapper that allows a function to be called normally when all arguments are supplied *or* returns a partial otherwise.

```js
function curry(f) {
  return function(..args) {
    // if args.length == f.length (as many arguments as f has),
    //   then pass the call to f
    // otherwise return a partial function that fixes args as first arguments
  };
}
```

### Currying? What for?

Advanced currying allows both to keep the function callable normally and to get partials easily. To understand the benefits we definitely need a worthy real-life example.

For instance, we have the logging function `log(date, importance, message)` that formats and output the information. In real projects such functions also have many other useful features like: sending it over the network or filtering:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Let's curry it!

```js
log = _.curry(log);
```

After that `log` still works the normal way:

```js
log(new Date(), "DEBUG", "some debug");
```

...But also can be called in the curried form:

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Let's get a convenience function for today's logs:

```js
// todayLog will be the partial of log with fixed first argument
let todayLog = log(new Date());

// use it
todayLog("INFO", "message"); // [HH:mm] INFO message
```

And now a convenience function for today's debug messages:

```js
let todayDebug = todayLog("DEBUG");

todayDebug("message"); // [HH:mm] DEBUG message
```

So:
1. We didn't loose anything after currying: `log` is still callable normally.
2. We were able to generate partial functions that are convenient in many cases.

### Advanced curry implementation

In case you're interested, here's the "advanced" curry implementation that we could use above.

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

let curriedSum = curry(sum);

// still callable normally
alert( curried(1, 2, 3) ); // 6

// get the partial with curried(1) and call it with 2 other arguments
alert( curried(1)(2,3) ); // 6

// full curried form
alert( curried(1)(2)(3) ); // 6
```

The new `curry` may look complicated, but it's actually pretty easy to understand.

The result of `curry(func)` is the wrapper `curried` that looks like this:

```js
// func is the function to transform
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

When we run it, there are two branches:

1. Call now: if passed `args` count is the same as the original function has in its definition (`func.length`) or longer, then just pass the call to it.
2. Get a partial: otherwise, `func` is not called yet. Instead, another wrapper `pass` is returned, that will re-apply `curried` providing previous arguments together with the new ones. Then on a new call, again, we'll get either a new partial (if not enough arguments) or, finally, the result.

For instance, let's see what happens in the case of `sum(a, b, c)`. Three arguments, so `sum.length = 3`.

For the call `curried(1)(2)(3)`:

1. The first call `curried(1)` remembers `1` in its Lexical Environment, and returns a wrapper `pass`.
2. The wrapper `pass` is called with `(2)`: it takes previous args (`1`), concatenates them with what it got `(2)` and calls `curried(1, 2)` with them together.

    As the argument count is still less than 3, `curry` returns `pass`.
3. The wrapper `pass` is called again with `(3)`,  for the next call `pass(3)` takes previous args (`1`, `2`) and adds `3` to them, making the call `curried(1, 2, 3)` -- there are `3` arguments at last, they are given to the original function.

If that's still not obvious, just trace the calls sequence in your mind or on the paper.

```smart header="Fixed-length functions only"
The currying requires the function to have a known fixed number of arguments.
```

```smart header="A little more than currying"
By definition, currying should convert `sum(a, b, c)` into `sum(a)(b)(c)`.

But most implementations of currying in Javascript are advanced, as described: they also keep the function callable in the multi-argument variant.
```

## Summary

- Method `func.bind(context, ...args)` returns a "bound variant" of function `func` that fixes the context `this` and first arguments if given.

    We may need to fix a context for passing an object method somewhere to be called. For example, to `setTimeout`.

- When we fix some arguments of an existing function, the resulting (less universal) function is called *a partial*. We saw other ways of making partials than `bind`.

    Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.

- *Currying* is a transform that makes `f(a,b,c)` callable as `f(a)(b)(c)`. Javascript implementations usually both keep the function callable normally and return the partial if arguments count is not enough.

    Currying is convenient when we want to have easy partials. We saw an example with logging: the universal function `log(date, importance, message)` after currying gives us partials when called with one argument like `log(date)` or two arguments `log(date, importance)`.
