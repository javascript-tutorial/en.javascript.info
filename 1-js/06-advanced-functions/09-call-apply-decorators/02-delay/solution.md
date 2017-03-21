The solution:

```js
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}
```

Please note how an arrow function is used here. As we know, arrow functions do not have own `this` and `arguments`, so `f.apply(this, arguments)` takes `this` and `arguments` from the wrapper.

If we pass a regular function, `setTimeout` would call it without arguments and `this=window` (in-browser), so we'd need to write a bit more code to pass them from the wrapper:

```js
function delay(f, ms) {

  // added variables to pass this and arguments from the wrapper inside setTimeout
  return function(...args) {
    let savedThis = this;
    setTimeout(function() {
      f.apply(savedThis, args);
    }, ms);
  };

}
```
