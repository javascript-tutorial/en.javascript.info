
The regexp for an integer number is `pattern:\d+`.

We can exclude negatives by prepending it with the negative lookahead: `pattern:(?<!-)\d+`.

Although, if we try it now, we may notice one more "extra" result:

```js run
let reg = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(reg) ); // 0, 12, 123, *!*8*/!*
```

As you can see, it matches `match:8`, from `subject:-18`. To exclude it, we need to ensure that the regexp starts matching a number not from the middle of another (non-matching) number.

We can do it by specifying another negative lookbehind: `pattern:(?<!-)(?<!\d)\d+`. Now `pattern:(?<!\d)` ensures that a match does not start after another digit, just what we need.

We can also join them into a single lookbehind here:

```js run
let reg = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

alert( str.match(reg) ); // 0, 12, 123
```
