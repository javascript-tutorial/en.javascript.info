
An integer number is `pattern:[1-9]+`.

A decimal part is: `pattern:\.\d+`.

Because the decimal part is optional, let's put it in parentheses with the quantifier `pattern:'?'`.

Finally we have the regexp: `pattern:[1-9]+(\.\d+)?`:

```js run
let reg = /[1-9]+(\.\d+)?/g;

let str = "1.5 0 12. 123.4.";

alert( str.match(reg) );   // 1.5, 12, 123.4
```
