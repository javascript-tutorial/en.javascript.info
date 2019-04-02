# Find HTML tags

Create a regular expression to find all (opening and closing) HTML tags with their attributes.

An example of use:

```js run
let reg = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(reg) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

Let's assume that may not contain `<` and `>` inside (in quotes too), that simplifies things a bit. 
