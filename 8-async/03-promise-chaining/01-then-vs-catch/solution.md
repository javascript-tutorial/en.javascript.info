The short answer is: **no, they are not the equal**:

The difference is that if an error happens in `f1`, then it is handled by `.catch` here:

```js run
promise
  .then(f1)
  .catch(f2);
```

...But not here:

```js run
promise
  .then(f1, f2);
```

That's because an error is passed down the chain, and in the second code piece there's no chain below `f1`.

In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there's a `catch` below, and in the second one -- there isn't, so the error is unhandled.
