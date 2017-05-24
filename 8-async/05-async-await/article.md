# Async/await

There's a special syntax to work with promises in a more comfort fashion, called "async/await". It's surprisingly easy to understand and use.

## Async functions

Let's start with the `async` keyword. It can be placed before function, like this:

```js
async function f() {
  return 1;
}
```

The word "async" before a function means one simple thing: a function always returns a promise. If it's not so, then the value is wrapped in `Promise.resolve`.

For instance, the code above returns `Promise.resolve(1)`:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...We can explicitly return a promise, that would be the same:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

So, `async` ensures that the function returns a promise.

But not only that. There's another keyword `await` that works only inside `async` functions.

## Await

The syntax:

```js
// works only inside async functions
let value = await promise;
```

The keyword `await` before a promise makes JavaScript to wait until that promise settles and return its result.

For instance, the code below shows "done!" after one second:

```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // wait till the promise resolves
*/!*

  alert(result); // "done!"
}

f();
```

Let's emphasize that: `await` literally makes JavaScript to wait until the promise settles, and then continue with the result. That doesn't cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.

It's just a more elegant syntax of getting promise result than `promise.then`.

````warn header="Can't use `await` in regular functions"
If we try to use `await` in non-async function, that would be a syntax error:

```js run
function f() {
  let promise = Promise.resolve(1); // any promise
*!*
  let result = await promise; // Syntax error
*/!*
}
```

Usually we get such error when we forget to put `async` before a function.
````

Let's take an avatar-showing example from the chapter <info:promise-chaining> and rewrite it using `async/await`:

```js run
async function showAvatar() {

  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Pretty clean and easy to read, right? And works the same as before.

Once again, please note that we can't write `await` in top-level code:

```js
// syntax error
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

...We need to wrap it into an async function.

````smart header="Await accepts thenables"
Like `promise.then`, `await` allows to use thenable objects (those with a callable `then` method). Again, the idea is that a 3rd-party object may be promise-compatible: if it supports `.then`, that's enough.

For instance:
```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```
Just like with promise chains, if `await` detects an object with `.then`, it calls that method providing native functions `resolve`, `reject` as arguments. Then `await` waits until one of them is called `(*)`and proceeds with the result.
````

## Error handling

If a promise resolves normally, then `await promise` returns the result. But in case of a rejection it throws an error, just if there were a `throw` statement at that line.

This code:

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```

...Is the same as this:

```js
async function f() {
  throw new Error("Whoops!");
}
```

In real situations the promise may take time before it rejects. So `await` will wait for some time, then throw an error.

We can catch that error using `try..catch`, the same way as a regular `throw`:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

In case of an error, the control jumps to the `catch`, so we can wrap multiple lines:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
```

If we don't have `try..catch`, then the promise generated by the async function `f` becomes rejected, so we can catch the error on it like this:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

If we also forget to add `.catch` there, then we get an unhandled promise error. We can catch such errors using a global event handler as described in the chapter <info:promise-chaining>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`, that's usually (not always) more convenient.

But at the top-level of the code, when we're calling the outmost `async` function, we're syntactically unable to use `await` (as we're not in an `async` function yet), so it's a normal practice to add `.then/catch` to handle the final result or falling-through errors.

Like in the line `(*)` of the example above.
```

````smart header="Async/await works well with `Promise.all`"
When we need to wait for multiple promises, we can wrap them in `Promise.all` and then `await`:

```js
// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

In case of an error, it propagates as usual: from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.

````
