A positive number with an optional decimal part is (per previous task): `pattern:\d+(\.\d+)?`.

Let's add an optional `-` in the beginning:

```js run
let reg = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(reg) );   // -1.5, 0, 2, -123.4
```
