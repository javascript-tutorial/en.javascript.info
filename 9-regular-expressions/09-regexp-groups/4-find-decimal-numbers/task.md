# Find all numbers

Write a regexp that looks for all decimal numbers including integer ones, with the floating point and negative ones.

An example of use:

```js
let reg = /your regexp/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(re) ); // -1.5, 0, 2, -123.4
```
