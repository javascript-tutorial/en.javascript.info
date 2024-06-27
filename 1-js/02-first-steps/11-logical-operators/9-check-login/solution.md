

```js run demo
const userName = prompt("Who's there?", '');

if (userName === 'Admin') {

  const pass = prompt('Password?', '');

  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
} else {
  alert( "I don't know you" );
}
```

Note the vertical indents inside the `if` blocks. They are technically not required, but make the code more readable.

Also Note that I used `const` to declare `userName` and `pass` because we are not modifying them in further code and
we don't want them to accidentally get modified.
