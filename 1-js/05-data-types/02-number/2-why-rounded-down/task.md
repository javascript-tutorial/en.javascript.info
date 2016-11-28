importance: 4

---

# Why 6.35.toFixed(1) == 6.3?

According to the documentation `Math.round` and `toFixed` both round to the nearest number: `0..4` lead down while `5..9` lead up.

For instance:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

How do you think why in the similar example below `6.35` is rounded to `6.3`, not `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

How to round `6.35` the right way?

