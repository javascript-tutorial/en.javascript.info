We can't "replace" the first character, because strings in JavaScript are immutable.

But we can make a new string based on the existing one, with the uppercased first character:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.

There are two variants here:

1. Use `str.charAt(0)`, as it always returns a string (maybe empty).
2. Add a test for an empty string.

Here's the 2nd variant:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

