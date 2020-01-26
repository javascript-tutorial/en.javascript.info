

```js run demo
let userName = prompt("Who's there?", '');

if (userName == 'Admin') {

  let pass = prompt('Password?', '');

  if (pass == 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass == '' || pass == null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName == '' || userName == null) {
  alert( 'Canceled' );
} else {
  alert( "I don't know you" );
}
```

Note the vertical indents inside the `if` blocks. They are technically not required, but make the code more readable.
