# Promise API

There are helpful static methods in the `Promise` class. There are only 4 of them, so we'll quickly cover them here.

## Promise.all

The method to run many promises in parallel and wait till all of them are ready.

The syntax is:

```js
let promise = Promise.all(iterable);
```

It takes an `iterable` object with promises, for instance an array and returns a new promise that resolves with the array of their results when all of them are settled, or rejects with the first encountered error if any.

For instance:

```js run
// loads 3 scripts in parallel and returns an array of them
Promise.all([
  loadScript('/article/promise-api/one.js'),
  loadScript('/article/promise-api/two.js'),
  loadScript('/article/promise-api/three.js')
]).then(scripts => {
  alert(`scripts loaded: ${scripts}`);
});
```



- the returned `promise` awaits for al

In the previous chapter we saw how to run things sequentially. Promises also

- Promise.all
- Promise.race
- Promise.reject
- Promise.resolve

Let's meet more functions and methods for promises.



Keywords `async` and `await` provide a more elegant way to write the code using promises.

## Async functions

The `async` function is like a regular one, but it wraps a returned value in a `Promise`.



Nowadays, promises are de-facto standard for asynchronous actions, when we need to
