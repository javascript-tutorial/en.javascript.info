
An integer number is `pattern:\d+`.

A decimal part is: `pattern:\.\d+`.

Because the decimal part is optional, let's put it in parentheses with quantifier `pattern:'?'`.

Finally we have the regexp: `pattern:\d+(\.\d+)?`:

```js run
let reg = /\d+(\.\d+)?/g;

let str = "1.5 0 12. 123.4.";

alert( str.match(reg) );   // 1.5, 0, 12, 123.4
```
