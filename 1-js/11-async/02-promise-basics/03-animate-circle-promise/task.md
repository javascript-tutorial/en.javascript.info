
# Animated circle with promise

Rewrite the `showCircle` function in the solution of the task <info:task/animate-circle-callback> so that it returns a promise instead of accepting a callback.

The new usage:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Take the solution of the task <info:task/animate-circle-callback> as the base.
