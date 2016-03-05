

```js run demo
let a = +prompt("The first number?", "");
let b = +prompt("The second number?", "");

alert( a + b );
```

Note the unary plus `+` before `prompt`. It immediately converts the value to a number.

Otherwise, `a` and `b` would be string their sum would be their concatenation, that is: `"1" + "2" = "12"`.