libs:
  - lodash

---

# Currying and partials

Until now we have only been talking about binding `this`. Let's take it a step further.

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
function mul(a, b) {
  return a * b;
}

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
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide first argument of every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

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
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread operator, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Currying

Sometimes people mix up partial function application mentioned above with another thing named "currying". That's another interesting technique of working with functions that we just have to mention here.

[Currying](https://en.wikipedia.org/wiki/Currying) is a transformation of functions that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`. In JavaScript, we usually make a wrapper to keep the original function.

Currying doesn't call a function. It just transforms it.

Let's create a helper `curry(f)` function that performs currying for a two-argument `f`. In other words, `curry(f)` for two-argument `f(a, b)` translates it into `f(a)(b)`

```js run
*!*
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
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
  return function(...args) {
    // if args.length == f.length (as many arguments as f has),
    //   then pass the call to f
    // otherwise return a partial function that fixes args as first arguments
  };
}
```

## Currying? What for?

To understand the benefits we definitely need a worthy real-life example.

Advanced currying allows the function to be both callable normally and partially.

For instance, we have the logging function `log(date, importance, message)` that formats and outputs the information. In real projects such functions also have many other useful features like sending logs over the network, here we just use `alert`:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

Let's curry it!

```js
log = _.curry(log);
```

After that `log` work both the normal way and in the curried form:

```js
log(new Date(), "DEBUG", "some debug"); // log(a,b,c)
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Now we can easily make a convenience function for current logs:

```js
// currentLog will be the partial of log with fixed first argument
let currentLog = log(new Date());

// use it
currentLog("INFO", "message"); // [HH:mm] INFO message
```

And here's a convenience function for current debug messages:

```js
let todayDebug = currentLog("DEBUG");

currentLog("message"); // [HH:mm] DEBUG message
```

So:
1. We didn't lose anything after currying: `log` is still callable normally.
2. We were able to generate partial functions such as for today's logs.

## Advanced curry implementation

In case you'd like to get in details (not obligatory!), here's the "advanced" curry implementation that we could use above.

It's pretty short:

```js
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
```

Usage examples:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

The new `curry` may look complicated, but it's actually easy to understand.

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

But most implementations of currying in JavaScript are advanced, as described: they also keep the function callable in the multi-argument variant.
```

## Summary

- When we fix some arguments of an existing function, the resulting (less universal) function is called *a partial*. We can use `bind` to get a partial, but there are other ways also.

    Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.

- *Currying* is a transform that makes `f(a,b,c)` callable as `f(a)(b)(c)`. JavaScript implementations usually both keep the function callable normally and return the partial if arguments count is not enough.

    Currying is great when we want easy partials. As we've seen in the logging example: the universal function `log(date, importance, message)` after currying gives us partials when called with one argument like `log(date)` or two arguments `log(date, importance)`.  
