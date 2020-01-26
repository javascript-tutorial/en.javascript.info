Answer: `pattern:\d\d[-:]\d\d`.

```js run
let regexp = /\d\d[-:]\d\d/g;
alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30
```

Please note that the dash `pattern:'-'` has a special meaning in square brackets, but only between other characters, not when it's in the beginning or at the end, so we don't need to escape it.
