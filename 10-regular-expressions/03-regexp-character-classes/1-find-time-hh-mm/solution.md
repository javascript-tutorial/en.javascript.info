
The answer: `pattern:\b\d\d:\d\d\b`.

```js run
alert( "Breakfast at 09:00 in the room 123:456.".match( /\b\d\d:\d\d\b/ ) ); // 09:00
```
