
Ответ: `pattern:\b\d\d:\d\d\b`.

```js run
alert( "Завтрак в 09:00 в комнате 123:456.".match( /\b\d\d:\d\d\b/ ) ); // 09:00
```
