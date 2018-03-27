# Promise

Imagine that you're a top singer, and fans ask day and night for your upcoming single.

To get some relief, you promise to send it to them when it's published. You give your fans a list to which they can subscribe for updates. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, if plans to publish the song are cancelled, they will still be notified.

Everyone is happy: you, because the people don't crowd you any more, and fans, because they won't miss the single.

This is a real-life analogy for things we often have in programming:

1. A "producing code" that does something and takes time. For instance, the code loads a remote script. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions in your "consuming code" may need that result. These are "fans".
3. A *promise* is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes the time it needs to produce the promised result, and the "promise" makes it available to all of the subscribed code when it's ready.

The analogy isn't terribly accurate, because JavaScript promises are more complex than a simple subscription list: they have additional features and limitations. But this will serve for an introduction.

The constructor syntax for a promise object is:

```js
let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});
```

The function passed to `new Promise` is called the *executor*. When the promise is created, this executor function is called (run) automatically. It contains the producing code, that should eventually produce a result. In terms of the analogy above: the executor is the "singer".

The resulting `promise` object has internal properties:

- `state` — initially "pending", then changes to either "fulfilled" or "rejected",
- `result` — an arbitrary value of your choosing, initially `undefined`.

When the executor finishes the job, it should call one of the following functions:

- `resolve(value)` — to indicate that the job finished successfully:
    - sets `state` to `"fulfilled"`,
    - sets `result` to `value`.
- `reject(error)` — to indicate that an error occurred:
    - sets `state` to `"rejected"`,
    - sets `result` to `error`.

![](promise-resolve-reject.png)

To gather all of that together: here's an example of a Promise constructor and a simple executor function with its "producing code" (the `setTimeout`):

```js run
let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  alert(resolve); // function () { [native code] }
  alert(reject);  // function () { [native code] }

  // after 1 second signal that the job is done with the result "done!"
  setTimeout(() => *!*resolve("done!")*/!*, 1000);
});
```

We can see two things by running the code above:

1. The executor is called automatically and immediately (by the `new Promise`).
2. The executor receives two arguments: `resolve` and `reject` — these functions are pre-defined. We don't need to create them. Instead, we should write the executor to call them when ready.

After one second of "processing" the executor calls `resolve("done")` to produce the result:

![](promise-resolve-1.png)

That was an example of a successful job completion, a "fulfilled promise".

And now an example of the executor rejecting the promise with an error:

```js
let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.png)

To summarize, the executor should do a job (something that takes time usually) and then call `resolve` or `reject` to change the state of the corresponding Promise object.

The Promise that is either resolved or rejected is called "settled", as opposed to a "pending" Promise.

````smart header="There can be only a single result or an error"
The executor should call only one `resolve` or `reject`. The promise's state change is final.

All further calls of `resolve` and `reject` are ignored:

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
```

The idea is that a job done by the executor may have only one result or an error. (If you are familiar with other languages, you might be aware of data structures which allow many "flowing" results, like streams and queues. They have their own advantages and disadvantages as compared with Promises. But as they are not supported by the JavaScript core, we won't be covering them.)

Further, `resolve`/`reject` expect only one argument and will ignore additional arguments.
````

```smart header="Reject with `Error` objects"
Technically, we can pass any type of argument to `reject` (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.
```

````smart header="Immediately calling `resolve`/`reject`"
In practice, an executor usually does something asynchronously and calls `resolve`/`reject` after some time, but it doesn't have to. We can call `resolve` or `reject` immediately, like this:

```js
let promise = new Promise(function(resolve, reject) {
  resolve(123); // immediately give the result: 123
});
```

For instance, it might happen when we start to do a job but then see that everything has already been completed. That is fine: we have a resolved Promise immediately.
````

```smart header="The `state` and `result` are internal"
The properties `state` and `result` of the Promise object are internal. We can't directly access them from our "consuming code". We can use the methods `.then`/`.catch` for that. They are described below.
```

## Consumers: `.then and `.catch`

A Promise object serves as a link between the executor (the "producing code" or "singer) and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using the methods `.then` and `.catch`.

The syntax of `.then` is:

```js
promise.then(
  function(result) { *!*/* handle a successful result */*/!* },
  function(error) { *!*/* handle an error */*/!* }
);
```

The first function argument:

1. runs when the Promise is resolved, and
2. receives the result.

The second function argument:

1. runs when the Promise is rejected, and
2. receives the error.

For instance:

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

In the case of a rejection:

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

If we're interested only in successful Promises, then we can provide only one function argument to `.then`:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
promise.then(alert); // shows "done!" after 1 second
*/!*
```

If we're interested only in errors, then we can use `.catch(errorHandlingFunction)`, which is just like doing `.then(null, errorHandlingFunction)`.


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
*/!*
```

The call `.catch(f)` is a complete analog of `.then(null, f)`, it's just a shorthand.

````smart header="On settled promises `then` runs immediately"
If a promise is pending, `.then/catch` handlers wait for the result. Otherwise, if a promise has already settled, they execute immediately:

```js run
// an immediately resolved promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (shows up right now)
```

That's handy for jobs that may sometimes require time and sometimes finish immediately. The handler is guaranteed to run in both cases.
````

````smart header="Handlers of `.then`/`.catch` are always asynchronous"
Even when the Promise is immediately resolved, code which occurs on lines below your `.then`/`.catch` can still run first. When the JavaScript engine sees your Promise, it will not only run the executor (the "producing code"), it will also go ahead and start executing code which occurs after your Promise and its `.then`/`.catch` calls.

So, when it is time for the function passed to `.then`/`.catch` to execute (nearly immediately in the case of an immediately-resolved Promise), the JavaScript engine puts it into an internal execution queue which will then already have items to be run.

The JavaScript engine is trying to do as many things at virtually the same time as possible. Everything is racing to get done. So, in the example code below, behind the scenes, you can imagine that the events might occur in this order:

1. The new Promise object is constructed on Line 2. 
2. The subscriber on Line 4 (the call to `alert`) is be registered with the Promise.
3. The executor is run by the Promise object and immediately resolves.
4. The other `alert` call, on Line 6, is executed.
6. The Promise notices it has been resolved and therefore executes the registered call to `alert` from Line 4.

```js run
// an "immediately" resolved Promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // this alert shows last

alert("code finished"); // this alert shows first
```

So the code *after* `.then` ends up always running *before* the Promise's subscribers, even in the case of an immediately-resolved Promise. Usually that's unimportant, in some scenarios it may matter a great deal.
````

Now, let's see more practical examples of how promises can help us to write asynchronous code.

## Example: loadScript

We've got the `loadScript` function for loading a script from the previous chapter.

Here's the callback-based variant, just to remind us of it:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error ` + src));

  document.head.append(script);
}
```

Let's rewrite it using Promises.

The new function `loadScript` will not require a callback. Instead, it will create and return a Promise object that resolves when the loading is complete. The outer code can add handlers (subscribing functions) to it using `.then`:

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

We can immediately see a few benefits over the callback-based pattern:

```compare minus="Callbacks" plus="Promises"
- We must have a ready `callback` function when calling `loadScript`. In other words, we must know what to do with the result *before* `loadScript` is called.
- There can be only one callback.
+ Promises allow us to do things in the natural order. First, we run `loadScript`, and `.then` we write what to do with the result.
+ We can call `.then` on a Promise as many times as we want. Each time, we're adding a new "fan", a new subscribing function, to the "subscription list". More about this in the next section: [Promise Chaining](/promise-chaining).
```

So Promises already give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
