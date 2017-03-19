# Find positive numbers

Create a regexp that looks for positive numbers, including those without a decimal point.

An example of use:
```js
let reg = /your regexp/g;

let str = "1.5 0 12. 123.4.";

alert( str.match(reg) );   // 1.5, 0, 12, 123.4
```
