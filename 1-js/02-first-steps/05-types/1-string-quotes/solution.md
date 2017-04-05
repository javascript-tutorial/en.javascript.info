
Backticks embed the expression inside `${...}` into the string.

```js run
let name = "Ilya";

// the expression is a number 1
alert( `hello ${1}` ); // Hello, 1

// the expression is a string "name"
alert( `hello ${"name"}` ); // Hello, name

// the expression is a variable, embed it
alert( `hello ${name}` ); // Hello, Ilya
```