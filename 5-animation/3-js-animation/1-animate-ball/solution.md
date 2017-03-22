To bounce we can use CSS property `top` and `position:absolute` for the ball inside the field with `position:relative`.

The bottom coordinate of the field is `field.clientHeight`. But the `top` property gives coordinates for the top of the ball, the edge position is `field.clientHeight - ball.clientHeight`.

So we animate the `top` from `0` to `field.clientHeight - ball.clientHeight`.

Now to get the "bouncing" effect we can use the timing function `bounce` in `easeOut` mode.

Here's the final code for the animation:

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
