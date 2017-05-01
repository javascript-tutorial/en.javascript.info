
````smart header="Handlers are always asynchronous, like `setTimeout(...,0)`"
Handlers assigned by `.then/catch` are always asynchronous. But if the promise is settled they run as soon as possible, similar to `setTimeout(...,0)`.

Here's the example to demonstrate that:

```js run
// the promise is immediately resolved with "done!"
let promise = new Promise(resolve => resolve("done!"));

// alert runs asynchronously, like if it were wrapped in setTimeout(..., 0);
promise.then(alert); // (2)

alert('code end'); // (1)
```

We'll first see "code end" `(1)`, and then "done!" `(2)`.

Like if we had this instead of `(2)`:
```js
promise.then(result => setTimeout(() => alert(result), 0));
```

The inner mechanics is like this:
- Promise handlers form a queue.
- When the current code is complete, the queue shifts and the next handler is executed.
````

````smart header="Functions resolve/reject accept at most one argument"
Functions `resolve/reject` accept only one argument.

We can call them without any arguments too, that's the same as passing `undefined`:

```js run
let promise = new Promise(resolve => resolve());

promise.then(alert); // undefined
```

...But if we pass many arguments: `resolve(1, 2, 3)`, then all arguments after the first one are ignored.
The idea is that a promise may have only one result (or an error). Use objects and destructuring if you need to pass many values, like this:

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


