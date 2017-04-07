
# Promises chaining

There are many great things about promises. We're only starting.

Now we'll cover promises chaining. They allow to build sequences of asynchronous actions.

[cut]

Here's the idea:

```js run
new Promise(function(resolve, reject) {
  // do a job...
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

As you can see:

- Calls to `.then` can be chained -- that's because `promise.then` returns a promise.
- A value returned by `.then` becomes a result in the next `.then`.

If there's an error, it is also passed down the chain:


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
