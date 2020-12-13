A regexp for a number is: `pattern:-?\d+(\.\d+)?`. We created it in the previous task.

An operator is `pattern:[-+*/]`. The hyphen `pattern:-` goes first in the square brackets, because in the middle it would mean a character range, while we just want a character `-`.

The slash `/` should be escaped inside a JavaScript regexp `pattern:/.../`, we'll do that later.

We need a number, an operator, and then another number. And optional spaces between them.

The full regular expression: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

It has 3 parts, with `pattern:\s*` between them:
1. `pattern:-?\d+(\.\d+)?` - the first number,
1. `pattern:[-+*/]` - the operator,
1. `pattern:-?\d+(\.\d+)?` - the second number.

To make each of these parts a separate element of the result array, let's enclose them in parentheses: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

In action:

```js run
let regexp = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(regexp) );
```

The result includes:

- `result[0] == "1.2 + 12"` (full match)
- `result[1] == "1.2"` (first group `(-?\d+(\.\d+)?)` -- the first number, including the decimal part)
- `result[2] == ".2"` (second group`(\.\d+)?` -- the first decimal part)
- `result[3] == "+"` (third group `([-+*\/])` -- the operator)
- `result[4] == "12"` (forth group `(-?\d+(\.\d+)?)` -- the second number)
- `result[5] == undefined` (fifth group `(\.\d+)?` -- the last decimal part is absent, so it's undefined)

We only want the numbers and the operator, without the full match or the decimal parts, so let's "clean" the result a bit.

The full match (the arrays first item) can be removed by shifting the array `result.shift()`.

Groups that contain decimal parts (number 2 and 4) `pattern:(.\d+)` can be excluded by adding  `pattern:?:` to the beginning: `pattern:(?:\.\d+)?`.

The final solution:

```js run
function parse(expr) {
  let regexp = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(regexp);

  if (!result) return [];
  result.shift();

  return result;
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
```
