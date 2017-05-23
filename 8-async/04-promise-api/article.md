# Promise API

There are 4 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.resolve

The syntax:

```js
let promise = Promise.resolve(value);
```

Returns a resolved promise with the given `value`.

Same as:

```js
let promise = new Promise(resolve => resolve(value));
```

The method is used when we already have a value, but would like to have it "wrapped" into a promise.

For instance, the `loadCached` function below fetches the `url` and remembers the result, so that future calls on the same URL return it immediately:

```js
function loadCached(url) {
  let cache = loadCached.cache || (loadCached.cache = new Map());

  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache[url] = text;
      return text;
    });
}
```

We can use `loadCached(url).then(…)`, because the function is guaranteed to return a promise. That's the purpose `Promise.resolve` in the line `(*)`: it makes sure the interface unified. We can always use `.then` after `loadCached`.

## Promise.reject

The syntax:

```js
let promise = Promise.reject(error);
```

Create a rejected promise with the `error`.

Same as:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

We cover it here for completeness, rarely used in real code.

## Promise.all

The method to run many promises in parallel and wait till all of them are ready.

The syntax is:

```js
let promise = Promise.all(iterable);
```

It takes an `iterable` object with promises, for instance an array and returns a new promise that resolves with when all of them are settled and has an array of results.

For instance, the `Promise.all` below settles after 3 seconds, and the result is an array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))
]).then(alert); // 1,2,3 after all promises are ready
```

Please note that the relative order is the same. Even though the first promise takes the longest time to resolve, it is still first in the array of results.

A more real-life example with fetching user information for an array of github users by their names:

```js run
let names = ['iliakan', 'remy', 'jresig'];

// map every url to the promise fetch(github url)
let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => {
    // all responses are ready, we can show HTTP status codes
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into array of response.json() and wrap them info Promise.all
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: users is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

If any of the promises is rejected, `Promise.all` also rejects with that error.

For instance:


```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

Here the `.catch` runs after 2 seconds, when the second promise rejects, and the rejection error becomes the outcome of the whole `Promise.all`.

The important detail is that promises provide no way to "cancel" or "abort" their execution. So in the example above all promises finally settle, but in case of an error all results are ignored, "thrown away".

````smart header="`Promise.all` wraps non-promise arguments into `Promise.resolve`"
Normally, `Promise.all(iterable)` accepts an iterable of promise objects. But if any of those objects is not a promise, it's wrapped in `Promise.resolve`.

For instance, here the results are `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // treated as Promise.resolve(2)
  3  // treated as Promise.resolve(3)
]).then(alert); // 1, 2, 3
```

So we are able to pass non-promise values to `Promise.all` where convenient.

````

## Promise.race

Similar to `Promise.all` takes an iterable of promises, but instead of waiting for all of them to finish -- waits for the first result (or error), and goes on with it.

The syntax is:

```js
let promise = Promise.race(iterable);
```

For instance, here the result will be `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

So, the first result/error becomes the result of the whole `Promise.race`, and further results/errors are ignored.

## Summary

There are 4 static methods of `Promise` class:

1. `Promise.resolve(value)` -- makes a resolved promise with the given value,
2. `Promise.reject(error)` -- makes a rejected promise with the given error,
3. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, then it becomes the error of `Promise.all`, and all other results are ignored.
4. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
