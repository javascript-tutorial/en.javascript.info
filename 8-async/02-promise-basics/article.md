# Promise


```compare plus="Plus" minus="Minus"
+ One
- two
```

A promise is an object of the built-in `Promise` class.

The promise object has two main internal properties: `state` and the `result`.

The idea is that we have one place in the code that creates a promise object and manages its state and result ("producing" code), and other places that await for the result and then make use of it ("consuming" code).

The constructor syntax is:

```js
let promise = new Promise(function(resolve, reject) {
  // executor
});
```

The function passed to `new Promise` is called *executor*. When the promise is created, it is called automatically.

The purpose of that function is to do a job and then change the state of the promise by calling one of:

- `resolve(value)` -- to indicate that the job finished successfully: sets `state` to `"fulfilled"`, and `result` to `value`.
- `reject(error)` -- to indicate that an error occured: sets `state` to `"rejected"` and `result` to `error`.

![](promise-resolve-reject.png)

Let's see examples.

First, a simplest executor, just to see how it works:

```js run
let promise = new Promise(function(resolve, reject) {
  alert(resolve); // function () { [native code] }
  alert(reject);  // function () { [native code] }
});
```

We can see two things here:

1. The executor is called immediately by `new Promise`.
2. Both functions `resolve` and `reject` are provided by JavaScript itself. We don't need to create them. Their string representation may vary between JavaScript engines.

Now let's wait 1 second and then resolve the promise:

```js
let promise = new Promise(function(*!*resolve*/!*, reject) {
  // this function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done!"
  setTimeout(() => resolve("done!"), 1000);
});
```

![](promise-resolve-1.png)

Here we wait 1 second and then reject the promise with an error:

```js
let promise = new Promise(function(resolve, *!*reject*/!*) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
```

![](promise-reject-1.png)

The promise that was either resolved or rejected is called "settled".

We must call only one `resolve` or `reject`. And that's final.

All calls of `resolve` and `reject` after the first one are ignored:

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
```

The idea is that a job may have only one result or an error.

There are other data structures for jobs that have many results, for instance streams and queues. But they are not supproted by JavaScript language core and lack certain features that promises provide.

```smart header="Reject with `Error` objects"
Technically we can call `resolve` and `reject` with any value. But it's recommended to use `Error` objects in `reject` (or inherited from them).
```

````smart header="Resolve/reject can be immediate"
In practice an executor usually does something asynchronously, but it doesn't have to. We can call `resolve` or `reject` immediately, like this:

```js
let promise = new Promise(function(resolve, reject) {
  resolve(123);
});
```

````


## Consumers: ".then" and ".catch"

A promise object allows to add "handlers" to run when it becomes settled.

The syntax is:

```js
promise.then(
  function(result) { /* process a sucessful result */ },
  function(error) { /* process an error */ }
);
```

The first argument of `then` runs on `resolve` and gets the result, and the second one -- on `reject` and gets the error.

For example:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
*!*
  result => alert(result), // shows "done!" after 1 second
*/!*
  error => alert(error) // doesn't run
);
```

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise.then(
  result => alert(result), // doesn't run
*!*
  error => alert(error) // shows "Error: Whoops!" after 1 second
*/!*
);
```

If we're interested only in successful completions, then we can provide only one argument to `.then`:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // shows "done!" after 1 second
*/!*
```

If we're interested only in errors, then we can use `.then(null, function)` or a special shorthand: `.catch`


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// same as promise.then(null, alert)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
*/!*
```

Now let's see more practical examples to explore the benefits over the callback-based approach.

## Example: loadScript

We have the `loadScript` function for loading a script from the previous chapter.

Here's the callback-based variant:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error ` + src));

  document.head.append(script);
}
```

Let's rewrite it using promises.

The new function `loadScript` will not require a callback. Instead it will create and return a promise object that settles when the loading is complete. The outer code can add handlers to it using `.then`:

```js run
function loadScript(src) {  
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
}

*!*
// Usage:
*/!*
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js");
promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`);
);

promise.then(script => alert('One more handler to do something else!'));
```

We can immediately see few benefits over the callback-based syntax in the example above.

| Callbacks | Promises |
|-----------|----------|
| We must have `callback` function when calling `loadScript`. So we must know what to do with the result *before* we make a call for it. | Promises allow us to code more naturally. First we run `loadScript`, then code what we do with the result. |
|There can be only one callback. | We can call `.then` as many times as we want. |


We can call `promise.then` at any time. Maybe much later, when we really need that script.

1. We can call `promise.then` as many times as want, so we can add any number of handlers.
3. The `promise` object can be passed around, new handlers can be added where needed in other parts of the code.

So promises give us flexibility. But there's more. We can chain promises and use `async` functions and so on. We'll see that in the next chapters.

Read the notes below for better understanding of promise objects.

````warn header="Once a promise settles, it can't be changed"
When either `resolve` or `reject` is called -- the state change is final. The argument of `resolve/reject` is saved in the promise object.

Future calls of `resolve/reject` are ignored, so there's no way to "re-resolve" or "re-reject" a promise.

For instance, here only the first `resolve` works:

```js run
let promise = new Promise(function(resolve, reject) {
  resolve("done!"); // immediately fulfill with the result: "done"

  // a subsequent resolve is ignored
  setTimeout(() => resolve("..."), 1000);
  // a subsequent reject is ignored
  setTimeout(() => reject(new Error("..."), 2000));  
});

promise.then(result => alert(result), () => alert("Never runs"));
```
````


````smart header="A promise may resolve immediately, doesn't have to be asynchronous"
As we've seen from the example above, a promise may call resolve/reject without delay:

```js run
new Promise(function(resolve, reject) {
  resolve("done!"); // immediately fulfill with the result: "done"
}).then(alert);
```

That's normal, sometimes it turns out that there's no asynchronous job to be done. For instance, if we have a cached result.
````

````smart header="On settled promises `then` runs immediately"
We can add `.then/catch` at any time.

If the promise has not settled yet, then it will wait for the result.

Otherwise, if the promise has already resolved/rejected, then subsequent `promise.then/catch` handlers are executed immediately.

To be precise -- they are still asynchronous, but run as soon as possible, similar to `setTimeout(...,0)`.

For instance, here we'll first see "code end", and then "done!":

```js run
// the promise is in the "resolved" state immediately
let promise = new Promise(function(resolve, reject) {
  resolve("done!");
});

// the handler runs as soon as possible, but asynchronously, like setTimeout(...,0)
promise.then(alert);

alert('code end');
```

````

````smart header="Functions resolve/reject have only one argument"
Functions `resolve/reject` accept only one argument.

We can call them without any arguments too. The call `resolve()` makes the result `undefined`:

```js run
let promise = new Promise(function(resolve, reject) {
  resolve();
});

promise.then(result => alert(result)); // undefined
```

...But if we pass many arguments: `resolve(1, 2, 3)`, then all arguments after the first one are ignored. A promise may have only one value as a result/error.

Use objects and destructuring if you need to pass many values, like this:

```js run
let promise = new Promise(function(resolve, reject) {
  let name = "John";
  let age = 25;

  resolve({name, age}); // "pack" the values in an object
});

// destructuring
promise.then(function({name, age}) {
  // here we have name and age variables as if the promise had two results
  alert(`${name} ${age}`); // John 25
})
```

````
