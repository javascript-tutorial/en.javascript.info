The reason is that prompt returns user input as a string.

So variables have values `"1"` and `"2"` respectively.

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);

alert(a + b); // 12
```

What we should do is to convert strings to numbers before `+`. For example, using `Number()` or prepending them with `+`.

For example, right before `prompt`:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);

alert(a + b); // 3
```

Or in the `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(+a + +b); // 3
```

Using both unary and binary `+` in the latest code. Looks funny, doesn't it?

or in the `alert`: you can do it this way

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

alert(Number(a) + Number(b));
```




