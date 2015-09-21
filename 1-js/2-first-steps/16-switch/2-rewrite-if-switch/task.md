# Rewrite "if" into "switch"

[importance 4]

Rewrite the code below using a single `switch` statement:

```js
//+ run
var a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}
```

