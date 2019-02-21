```js demo
function debounce(f, ms) {

  let isCooldown = false;

  return function() {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };

}
```

A call to `debounce` returns a wrapper. There may be two states:

- `isCooldown = false` -- ready to run.
- `isCooldown = true` -- waiting for the timeout.

In the first call `isCooldown` is falsy, so the call proceeds, and the state changes to `true`.

While `isCooldown` is true, all other calls are ignored.

Then `setTimeout` reverts it to `false` after the given delay.
