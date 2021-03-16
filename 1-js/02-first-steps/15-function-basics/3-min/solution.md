A solution using `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

A solution with a question mark operator `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. In the case of an equality `a == b` it does not matter what to return.