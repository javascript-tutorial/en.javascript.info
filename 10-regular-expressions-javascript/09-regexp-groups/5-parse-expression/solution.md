A regexp for a number is: `pattern:-?\d+(\.\d+)?`. We created it in previous tasks.

An operator is `pattern:[-+*/]`. We put a dash `pattern:-` the first, because in the middle it would mean a character range, we don't need that.

Note that a slash should be escaped inside a JavaScript regexp `pattern:/.../`.

We need a number, an operator, and then another number. And optional spaces between them.

The full regular expression: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

To get a result as an array let's put parentheses around the data that we need: numbers and the operator: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

In action:

```js run
let reg = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(reg) );
```

The result includes:

- `result[0] == "1.2 + 12"` (full match)
- `result[1] == "1"` (first parentheses)
- `result[2] == "2"` (second parentheses -- the decimal part `(\.\d+)?`)
- `result[3] == "+"` (...)
- `result[4] == "12"` (...)
- `result[5] == undefined` (the last decimal part is absent, so it's undefined)

We need only numbers and the operator. We don't need decimal parts.

So let's remove extra groups from capturing by added `pattern:?:`, for instance: `pattern:(?:\.\d+)?`.

The final solution:

```js run
function parse(expr) {
  let reg = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(reg);

  if (!result) return;
  result.shift();

  return result;
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
```
