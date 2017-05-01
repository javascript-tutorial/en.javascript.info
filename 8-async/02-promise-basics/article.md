# Promise

Imagine that you're a top singer, and fans ask for your next upcoming single day and night.

You make a promise to send it to them when it's published. You give your fans a list. They can fill in their coordinates, so that when the song becomes available, all subscribed parties instantly get it. And they also can leave a note that if something goes very wrong, so that the song won't be published ever, then they are to be notified.

Everyone is happy: you, because people don't crowd you any more, and fans, because they won't miss the single.

That was a real-life analogy for things we often have in programming:

1. A "producing code" does something that needs time. For instance, it loads a remote script. That's the "singer".
2. A "consuming code" wants the result when it's ready. Many functions may need that result. So that's the "fans".
3. A *promise* is a special JavaScript object that links them together. That's the "list". The singer makes it and gives to fans, so that they can subscribe.

The analogy is not precise: promises are more complex than a simple list. They have additional features and limitations. But still they are alike.

The constructor syntax is:

```js
let promise = new Promise(function(resolve, reject) {
  // producing code
});
```

The function passed to `new Promise` is called *executor*. When the promise is created, it's called automatically. It contains the producing code, that should eventually finish with a result. The executor is a "singer".


The `promise` object has internal properties:

- `state` -- initially is "pending", then changes to "fulfilled" or "rejected",
- `result` -- an arbitrary value, initially `undefined`.

When the executor finishes the job, it should change the state of the promise by calling one of:

- `resolve(value)` -- to indicate that the job finished successfully: sets `state` to `"fulfilled"`, and `result` to `value`.
- `reject(error)` -- to indicate that an error occured: sets `state` to `"rejected"` and `result` to `error`.

![](promise-resolve-reject.png)

The `promise` object can be used to subscribe to the result (like a "list"), soon we'll cover that, but first let's see few code examples of `new Promise`.

Here's a simple executor, just to see it in action:

```js run
let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  alert(resolve); // function () { [native code] }
  alert(reject);  // function () { [native code] }
});
```

We can see two things by running the code above:

1. The executor is called automatically and immediately (by `new Promise`).
2. Executor arguments `resolve` and `reject` are functions that come from JavaScript engine. We don't need to create them (their string representation may vary between JavaScript engines). Instead the executor should call them when ready.

Now let's make the executor that thinks for 1 second and then produces a result:

```js
let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is done with the result "done!"
  setTimeout(() => *!*resolve("done!")*/!*, 1000);
});
```

![](promise-resolve-1.png)

The next example rejects the promise with an error:

```js
let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.png)

The promise that was either resolved or rejected is called "settled".

````smart header="There can be only one result or an error"
We must call only one `resolve` or `reject`. And that's final.

All further calls of `resolve` and `reject` are ignored:

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
```

The idea is that a job done by the executor may have only one result or an error. In programming, there exist other data structures that allow many results, for instance streams and queues, but we don't cover them here, because they are not supported by JavaScript core, and they lack certain features that promises provide.

Also we shouldn't call `resolve/reject` with more then one argument: those after the first one are ignored. If we want a complex result, we can return an object.
````

```smart header="Reject with `Error` objects"
Technically we can call `resolve` and `reject` with any value. But it's recommended to use `Error` objects in `reject` (or inherited from them). The reasoning for that will become obvious soon.
```

````smart header="Resolve/reject can be immediate"
In practice an executor usually does something asynchronously, but it doesn't have to. We can call `resolve` or `reject` immediately, like this:

```js
let promise = new Promise(function(resolve, reject) {
  resolve(123);
});
```

For instance, it happens when we start to do a job and then see that everything has already been done before. Technically that's fine: we have a resolved promise right now.
````


## Consumers: ".then" and ".catch"

A promise object allows to add "consumers" -- handler functions to run when it resolves/rejects.


The syntax is:

```js
promise.then(
  function(result) { /* handle a sucessful result */ },
  function(error) { /* handle an error */ }
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

If we're interested only in errors, then we can use `.then(null, function)` or an "alias" to it: `.catch(function)`


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// same as promise.then(null, alert)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
*/!*
```


````smart header="On settled promises `then` runs immediately"
If the promise is pending, `.then/catch` handlers wait for the result. Otherwise, if the promise has already settled, they execute immediately:

```js run
let promise = new Promise(resolve => resolve("done!")); // immediately resolve

promise.then(alert); // done! (without delay)
```

That's good for jobs that may be both asynchronous (loading something) and synchronous (we already have it and can resolve right now). The handler is guaranteed to run in both cases.
````

Now let's see more practical examples to see how promises can help us to write asynchronous code.



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
```

Usage:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js");
promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('One more handler to do something else!'));
```

We can immediately see few benefits over the callback-based syntax:

```compare minus="Callbacks" plus="Promises"
- We must have `callback` function available when calling `loadScript`. So we must know what to do with the result *before* we make a call for it.
- There can be only one callback.
+ Promises allow us to code more naturally. First we run `loadScript`, and `.then` code what we do with the result.
+ We can call `.then` as many times as we want.
```

So promises give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
