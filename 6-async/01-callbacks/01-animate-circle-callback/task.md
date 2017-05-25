
# Animated circle with callback

In the task <info:task/animate-circle> an animated growing circle is shown.

Now let's say we need not just a circle, but to show a message inside it. The message should appear *after* the animation is complete (the circle is fully grown), otherwise it would look ugly.

In the solution of the task, the function `showCircle(cx, cy, radius)` draws the circle, but gives no way to track when it's ready.

Add a callback argument: `showCircle(cx, cy, radius, callback)` to be called when the animation is complete. The `callback` should receive the circle `<div>` as an argument.

Here's the example:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```

Demo:

[iframe src="solution" height=260]

Take the solution of the task <info:task/animate-circle> as the base.
