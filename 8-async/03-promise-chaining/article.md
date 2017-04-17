
# Promises chaining

Let's formulate the problem mentioned in the chapter <info:callback-hell>:

- We have a sequence of tasks to be done one after another. For instance, loading scripts. The next task may need  the result of the previous one.
- How to code it well?

Promises can cover that need in two ways:

1. Promises chaining.
2. Async functions.

Let's see the first way in this chapter and the second one in the next.

Promises chaining looks like this:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1
  return result * 2;

}).then(function(result) {

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
// ...
```

As we can see, a call to `promise.then` returns a promise, that we can use again for `.then`. A value returned by `.then` becomes a result in the next `.then`. So in the example above we have a sequence of results: `1` -> `2` -> `4`.

Please note that chaining `.then` is not the same as many `.then` on a single promise, like below:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

In the code above, all `.then` are on the same promise, so all of them get the same result -- the result of that promise. And all `alert` show the same: 1.

If we want to use the value returned by a handler of `.then`, then we should add a new `.then` after it (to chain).

## Returning promises

Normally, the value returned by a handler is passed to the next `.then`. But there's an exception. If the returned value is a promise, then further execution is suspended till it settles. And then the result of that promise is used.

Let's see it in action here:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) {

  alert(result); // 2

*!*
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) {

  alert(result); // 4

});
```

Now we have the same 1 -> 2 > 4 output, but with 1 second delay between each.

When we return `new Promise(…)`, the next `.then` in the chain is executed when it settles and gets its result.

Let's use it with `loadScript` to load multiple scripts one by one, in sequence:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // use variables declared in scripts
    // to show that they indeed loaded
    alert("Done: " + (one + two + three));
  });
```


The code totally evades the pyramid of doom. We can add more asynchronous actions to the chain, and the code is still "flat".

## Error handling

In case of an error, the closest `onRejected` handler down the chain is called.

Let's recall that a rejection (error) handler may be assigned with two syntaxes:

- `.then(...,onRejected)`, as a second argument of `.then`.
- `.catch(onRejected)`, a shorthand for `.then(null, onRejected)`.

In the example below we use the second syntax to catch all errors in the script load chain:

```js run
function loadScript(src) {  
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
*!*
    script.onerror = () => reject(new Error("Script load error: " + src)); // (*)
*/!*

    document.head.append(script);
  });
}

*!*
loadScript("/article/promise-chaining/ERROR.js")
*/!*
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // use variables declared in scripts
    // to show that they indeed loaded
    alert("Done: " + (one + two + three));
  })
*!*
  .catch(function(error) { // (**)
    alert(error.message);
  });
*/!*
```

In the code above the first `loadScript` call fails, because `ERROR.js` doesn't exist. The initial error is generated in the line `(*)`, then the first error handler in the chain is called, that is `(**)`.

Now the same thing, but the error occurs in the second script:


```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
*!*
    return loadScript("/article/promise-chaining/ERROR.js");
*/!*
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // use variables declared in scripts
    // to show that they indeed loaded
    alert("Done: " + (one + two + three));
  })
*!*
  .catch(function(error) {
    alert(error.message);
  });
*/!*
```

Once again, the `.catch` handles it.

**Throwing an exception is also considered an error.**

For instance:

```js run
new Promise(function(resolve, reject) {
  throw new Error("Woops!");
}).catch(function(error) {
  alert(error.message); // Whoops
});

## Inheriting from promise, thenables, error handling?

An object that has a method called `.then` is called a "thenable".

Instead of checking if something is `instanceof Promise`, we should usually check it for being thenable, and if it is, then treat it as a promise ("duck typing").

JavaScript specification also checks the value returned by a handler for being a thenable, not exactly a promise, when it decides whether to pass it along the chain or wait for the result. So in the examples above we could use custom thenables instead of `Promise` instances.

For instance, native promises give no way to "abort" the execution. The `loadScript` above cannot "cancel" script loading, just because there's no `.abort` method on promises, we can only listen for the state change using `.then/catch`.

Let's








## Error handling






```js run
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
}).then(function(result) {

  throw new Error("Woops!");

}).catch(function(error) {

  alert(error.message); // Woops!

});
```




The idea is :

- A callback in `.then` may return a result.


One of main purposes of promises is to make asyn
The main purpose of promises
Promises

Promises can be chained. That allows actions to follow one after another.

Here's a simple example first:

```js
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(""))
})



What if we want to
The main idea behind promises
Promises can be used for asynchronous tasks that eventually finish with a result or an error.

We already have `loadScript`
