importance: 5

---

# Delaying decorator

Create a decorator `delay(f, ms)` that delays each call of `f` by `ms` milliseconds.

For instance:

```js
function f(x) {
  alert(x);
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms
```

In other words, `delay(f, ms)` returns a "delayed by `ms`" variant of `f`.

In the code above, `f` is a function of a single argument, but your solution should pass all arguments and the context `this`.
