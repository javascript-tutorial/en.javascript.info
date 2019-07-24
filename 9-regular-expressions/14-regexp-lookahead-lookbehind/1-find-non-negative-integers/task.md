# Find non-negative integers

There's a string of integer numbers.

Create a regexp that looks for only non-negative ones (zero is allowed).

An example of use:
```js
let reg = /your regexp/g;

let str = "0 12 -5 123 -18";

alert( str.match(reg) ); // 0, 12, 123
```
