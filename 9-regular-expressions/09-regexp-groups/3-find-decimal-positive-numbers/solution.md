
An non-negative integer number is `pattern:\d+`. A zero `0` can't be the first digit,  but we should allow it in further digits.

So that gives us `pattern:[1-9]\d*`.

A decimal part is: `pattern:\.\d+`.

Because the decimal part is optional, let's put it in parentheses with the quantifier `pattern:?`.

Finally we have the regexp: `pattern:[1-9]\d*(\.\d+)?`:

```js run
let reg = /[1-9]\d*(\.\d+)?/g;

let str = "1.5 0 -5 12. 123.4.";

alert( str.match(reg) );   // 1.5, 5, 12, 123.4
```

So, we have to exclude `5` from the result. It can be done by using a negated lookbehind. For example, `/(?<!-)\d+/` matches a number only if it is not preceded by a minus sign. Thus, the resulting pattern is `pattern:(?<!-)[1-9]\d*(\.\d+)?`.

```js run
reg = /(?<!-)[1-9]\d*(\.\d+)?/g;

alert( str.match(reg) );   // 1.5, 12, 123.4
```

Please note that lookbehinds are only available in browsers supporting ECMA2018 standard, and that means, only the latest versions of Chrome can handle them.
