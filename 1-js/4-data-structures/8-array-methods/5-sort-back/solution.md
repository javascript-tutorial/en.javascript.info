

```js run
var arr = [5, 2, 1, -10, 8];

function compareReversed(a, b) {
  return b - a;
}

arr.sort(compareReversed);

alert( arr );
```

