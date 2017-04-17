The short answer is: **no, they are not**:

The difference is that if an error happens in `f1`, then it is handled by `.catch` here:

```js run
promise.then(f1).catch(f2);
```

...But not here:

```js run
promise.then(f1, f2);
```

That's because an error/result is passed down the chain, and in the second code piece there's no chain below.
