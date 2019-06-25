
An non-negative integer number is `pattern:\d+`. A zero `0` can't be the first digit,  but we should allow it in further digits.

So that gives us `pattern:[1-9]\d*`.

A decimal part is: `pattern:\.\d+`.

Because the decimal part is optional, let's put it in parentheses with the quantifier `pattern:?`.

Finally we have the regexp: `pattern:[1-9]\d*(\.\d+)?`:

```js run
let reg = /[1-9]\d*(\.\d+)?/g;

let str = "1.5 0 -5 12. 123.4.";

alert( str.match(reg) );   // 1.5, 0, 12, 123.4
```
