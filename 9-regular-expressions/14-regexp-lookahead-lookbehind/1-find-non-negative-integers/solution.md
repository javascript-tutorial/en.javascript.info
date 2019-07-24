
A number is `pattern:\d+`.

We can exclude negatives by prepending it with the negative lookahead: `pattern:(?<!-)\d+`.

If we try it now, we may notice one more "extra" result:

```js run
let reg = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(reg) ); // 0, 12, 123, *!*8*/!*
```

It matches `match:8` of `subject:-18`. To exclude it, we need to ensure that the regexp starts matching a number not from the middle of another number.

We can do it by specifying another negative lookbehind: `pattern:(?<!-)(?<!\d)\d+`. Now `pattern:(?<!\d)` ensures that a match does not start after another digit.

Or we can use a single lookbehind here:

```js run
let reg = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

alert( str.match(reg) ); // 0, 12, 123
```
