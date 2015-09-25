

```js
//+ run demo
let userName = prompt('Who's there?', '');

if (userName == 'Admin') {

  let pass = prompt('Password?', '');

  if (pass == 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass == null || pass == '') { // (*)
    alert( 'Canceled.' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName == null || userName == '') { // (**)

  alert( 'Canceled' );

} else {

  alert( "I don't know you" );

}
```

Please note the `if` check in lines `(*)` and `(**)`. Every browser except Safari returns `null` when the input is canceled, and Safari returns an empty string. So we must treat them same for compatibility.

Also note the vertical indents inside the `if` blocks. They are technically not required, but make the code more readable.
