
Solution:

```js run
let reg = /\.{3,}/g;
alert( "Hello!... How goes?.....".match(reg) ); // ..., .....
```

Please note that the dot is a special character, so we have to escape it and insert as `\.`.
