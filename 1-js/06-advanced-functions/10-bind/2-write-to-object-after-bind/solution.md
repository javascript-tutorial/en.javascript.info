Javobi: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

Bog'langan funksiya konteksti qattiq o'rnatiladi. Uni yanada o'zgartirishning iloji yo'q.

Shunday qilib, biz `user.g()` ni ishga tushirganimizda ham, asl funksiya `this=null` bilan chaqiriladi.
