Ответ: `1`.

Переменная `a` создается до начала выполнения кода, так что условие `"a" in window` выполнится и сработает `a = 1`.

```js
//+ run  untrusted refresh
if ("a" in window) {
  a = 1;
}
var a;

alert( a ); // 1
```

