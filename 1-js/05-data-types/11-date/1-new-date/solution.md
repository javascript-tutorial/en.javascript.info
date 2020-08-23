The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.

Date object can be created in two formats:

1. new Date(year, month, date, hour, minute, second, millisecond)

```js run
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```

2. new Date(datastring)

```js run
let d2 = new Date("February 20, 2012 03:12:00");
alert(d2);
```
