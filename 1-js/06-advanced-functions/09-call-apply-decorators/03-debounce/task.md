importance: 5

---

# Debounce decorator

The result of `debounce(f, ms)` decorator should be a wrapper that passes the call to `f` at maximum once per `ms` milliseconds.

In other words, when we call a "debounced" function, it guarantees that all future calls to the function made less than `ms` milliseconds after the previous call will be ignored.

For instance:

```js no-beautify
let f = debounce(alert, 1000);

f(1); // runs immediately
f(2); // ignored

setTimeout( () => f(3), 100); // ignored ( only 100 ms passed )
setTimeout( () => f(4), 1100); // runs
setTimeout( () => f(5), 1500); // ignored (less than 1000 ms from the last run)
```

In practice `debounce` is useful for functions that retrieve/update something when we know that nothing new can be done in such a short period of time, so it's better not to waste resources.
