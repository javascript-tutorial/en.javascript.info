# Promise

A promise is an object of the built-in `Promise` class. It has the meaning of the "delayed result".

The constructor syntax is:

```js
let promise = new Promise(function(resolve, reject) {
  // executor
});
```

The function passed to `new Promise` is called *executor*. It is called automatically and immediately when the promise is created.

So, if you run this, the output is shown immediately:

```js run
let promise = new Promise(function(resolve, reject) {
  alert(resolve); // function () { [native code] }
  alert(reject);  // function () { [native code] }
});
```

The string description of `resolve` and `reject` may differ between engines, but they both are functions provided by JavaScript itself. We don't need to create them.

The executor should do a job, like loading a script, and at the end, it should call one of:

- `resolve(result)` -- to indicate that the job finished successfully with the `result`.
- `reject(error)` -- to indicate that an error occured, and `error` should be the `Error` object (technically can be any value).

Like this:

```js
let promise = new Promise(function(*!*resolve*/!*, reject) {
  // this function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done!"
  setTimeout(() => resolve("done!"), 1000);
});
```

Or, in case of an error:

```js
let promise = new Promise(function(resolve, *!*reject*/!*) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Woops!")), 1000);
});
```

## Promise state

The promise object has an internal state. The `Promise` constructor sets it to "pending". Then it may change in two ways.

When `resolve` is called, the state becomes "fulfilled". When `reject` is called, the state becomes "rejected":

![](promiseInit.png)

```smart
The promise that is either resolved or rejected is also called "settled" (as opposed to "pending").
```

The external code may add "handlers" to run when the promise becomes settled.

There are two methods for that:

- `promise.then(onResolve)` schedules the function `onResolve` to call when the promise is fulfilled, and it gets the result.
- `promise.catch(onReject)` schedules the function `onReject` to call when the promise is rejected, and it gets the error.

For instance, here's how to react on the successful job completion:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// shows "done!" after 1 second
promise.then(result => alert(result));
```

...And here's the reacton on an error:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Woops!")), 1000);
});

// shows "Woops!" after 1 second
promise.catch(error => alert(error.message));
```


Also we can call `promise.then(onResolve, onReject)` to set both handlers at once. Technically, `promise.catch(func)` works the same way as `promise.then(null, func)`.

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
// set both success and error handlers
promise.then(
  result => alert(result),
  error => alert(error)
);
*/!*
```

So, when we want to do something asynchronously, we can create a promise with the proper executor to do a job, and then add handlers to it. They run when it finishes.

Let's see more examples to explore the benefits over the callback-based approach.

## Example: loadScript

We have the `loadScript` function for loading a script from the previous chapter, here's the callback-based variant:

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

The call to `loadScript(src)` below returns a promise that resolves/rejects when the loading is complete:

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

promise.then(script => alert('One more handler to do something else with the script'));
```

We can immediately see some benefits over the callback-based syntax in the example above:

1. We can call `promise.then` as many times as want, so we can add any number of handlers.
2. We can call `promise.then` at any time. Maybe much later, when we really need that script.
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
