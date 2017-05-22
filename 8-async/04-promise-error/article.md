# Error handling

Asynchronous actions may sometimes fail: errors are possible, so corresponding promises can become rejected. For instance, `loadScript` fails if there's no such script. We can use `.catch` to handle errors (rejections).

Promise chaining is great at that aspect. When a promise rejects, the control jumps to the closest rejection handler down the chain. That's very convenient.

In the example below we append `.catch` to handle all errors in the scripts loading chain:

```js run
*!*
loadScript("NO_SUCH_SCRIPT.js")
*/!*
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    alert('done!');
  })
*!*
  .catch(function(error) { // (*)
    alert(error.message);
  });
*/!*
```

In the code above the first `loadScript` call fails, because `NO_SUCH_SCRIPT.js` doesn't exist. The control jumps to the closest error handler `(*)`.

Now let's see what happens if the second script fails to load. Actually, the same `.catch` handles it, just because it's the closest one down the chain:


```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
*!*
    return loadScript("NO_SUCH_SCRIPT.js");
*/!*
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    alert('done!');
  })
*!*
  .catch(function(error) {
    alert(error.message);
  });
*/!*
```

The `.catch` works similarly to the `try..catch` construct. We may have as many `.then` as we want, and then use a single `.catch` at the end to handle errors in all of them.


## Implicit try..catch

The code of the executor and promise handlers has an "invisible `try..catch`" around it. If an error happens, it gets caught and treated as a rejection.

For instance, this code:

```js run
new Promise(function(resolve, reject) {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(function(error) {
  alert(error.message); // Whoops!
});
```

...Works the same way as this:

```js run
new Promise(function(resolve, reject) {
*!*
  reject(new Error("Whoops!"));
*/!*  
}).catch(function(error) {
  alert(error.message); // Whoops!
});
```

The "invisible `try..catch`" around the executor automatically catches the error and treats it as a rejection.

That works not only in the executor, but in handlers as well. If we `throw` inside `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.

Here's an example:

```js run
new Promise(function(resolve, reject) {
  resolve("ok");
}).then(function(result) {
*!*
  // .then returns a rejected promise
  throw new Error("Whoops!");
*/!*
}).catch(function(error) {
  // and the error is handled here
  alert(error.message); // Whoops!
});
```

That's so not only for `throw`, but for any errors, including programming errors as well:

```js run
new Promise(function(resolve, reject) {
  resolve("ok");
}).then(function(result) {
*!*
  blabla(); // no such function
*/!*
}).catch(function(error) {
  alert(error.message); // blabla is not defined
});
```

## The full picture

To summarize, `.then/catch(handler)` returns a new promise that changes depending on what handler does:

1. If it returns a value or finishes without a `return` (same as `return undefined`), then the new promise becomes resolved, and the closest resolve handler (the first argument of `.then`) is called with that value.
2. If it throws an error, then the new promise becomes rejected, and the closest rejection handler (second argument of `.then` or `.catch`) is called with it.
3. If it returns a promise, then JavaScript waits for its result and goes on with it as described above.

The picture of how the promise returned by `.then/catch` changes:

![](promise-handler-variants.png)

The smaller picture of how handlers are called:

![](promise-handler-variants-2.png)

## Rethrowing

As we already noticed, `.catch` behaves like `try..catch`. We may have as many `.then` as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if can't handle. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the closest successful `.then` handler.

In the example below the `.catch` handles the error and finishes with `return`, so the execution continues normally, the control goes to the next `.then`:

```js run
// the execution: catch -> then
new Promise(function(resolve, reject) {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("Handled it!");
*!*
  return "result"; // return, the execution goes the "normal way"
*/!*

*!*
}).then(alert); // result shown
*/!*
```

...And here's an example of "rethrowing":


```js run
// the execution: catch -> catch -> then
new Promise(function(resolve, reject) {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  alert("Can't handle the error here!");

*!*
  throw error; // throwing this or another error jumps to the next catch
*/!*

}).catch(error => { // (**)

  alert("The error is fully handled.");
  // don't return anything => execution goes the normal way

});
```

The handler `(*)` catches the error and just can't handle it. In real project it would try to analyze the error object, but here it just throws it again. So the execution jumps to the next `.catch` down the chain `(**)`.

## Unhandled rejections

...But what if we forget to append an error handler to the end of the chain?

Like here:

```js untrusted run refresh
new Promise(function() {
  errorHappened(); // Error here (no such function)
});
```

Or here:

```js untrusted run refresh
new Promise(function() {
  throw new Error("Whoops!");
}).then(function() {
  // ...something...
}).then(function() {
  // ...something else...
}).then(function() {
  // ...but no catch after it!
});
```

Technically, when an error happens, the promise state becomes "rejected", and the execution should jump to the closest rejection handler. But there is no such handler in the examples above.

Usually that means that the code is bad. Indeed, how come that there's no error handling?

Most JavaScript engines track such situations and generate a global error in that case. In the browser we can catch it using `window.addEventListener('unhandledrejection')` as specified in the [HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections):


```js run
window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function() {
  throw new Error("Whoops!");
}).then(function() {
  // ...something...
}).then(function() {
  // ...something else...
}).then(function() {
  // ...but no catch after it!
});
```

Now if an error has occured, and there's no `.catch`, the event `unhandledrejection` triggers, and our handler can do something with the exception. Once again, such situation is usually a programming error.

In non-browser environments like Node.JS there are other similar ways to track unhandled errors.

## Summary

- A call to `.then/catch` returns a promise, so we can chain them.
- There are 3 possible outcomes of a handler:
    1. Return normally -- the result is passed to the closest successful handler down the chain.
    2. Throw an error -- it is passed to the closest rejection handler down the chain.
    3. Return a promise -- the chain waits till it settles, and then its result is used.

That allows to form a "queue" of actions in the chain.

The great thing about chaining is that we can always append more actions to it.

For instance, the `showMessage()` function below loads a script, and then animates a message:

```js run
function showMessage() {
  return new Promise(function(resolve, reject) {
    alert('loading...');
    return loadScript('/article/promise-chaining/getMessage.js');
  }).then(function(script) {
    let message = getMessage(); // getMessage function comes from the script
    return animateMessage(message);
  }).catch(function(err) { /*...*/ });
}

function animateMessage(message) {
  return new Promise(function(resolve, reject) {
    // ...imagine the code for an asynchronous CSS-animation here...
    alert(message);
    resolve();  
  });
}

showMessage();
```

We can add more actions like this:
```js
showMessage()
  .then(function() {
    // the code to run after the message is shown
  });
```
