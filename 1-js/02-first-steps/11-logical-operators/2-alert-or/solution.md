The answer: first `1`, then `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

The call to `alert` does not return a value. Or, in other words, it returns `undefined`.

1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.

There will be no `3`, because the evaluation does not reach `alert(3)`.
