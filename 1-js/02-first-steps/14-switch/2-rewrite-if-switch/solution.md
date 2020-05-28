The first two checks turn into two `case`. The third check is split into two cases:

```js run
let a = +prompt('a?', '');

switch (a) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
*!*
    break;
*/!*
}
```

Please note: the `break` at the bottom is not required. But we put it to make the code future-proof.

In the future, there is a chance that we'd want to add one more `case`, for example `case 4`. And if we forget to add a break before it, at the end of `case 3`, there will be an error. So that's a kind of self-insurance.
