The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
