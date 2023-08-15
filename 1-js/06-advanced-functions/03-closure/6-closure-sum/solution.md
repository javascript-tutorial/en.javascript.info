Ikkinchi qavslar ishlashi uchun birinchi qavslar funksiyani qaytarishi kerak.

Shunga o'xshash:

```js run
function sum(a) {

  return function(b) {
    return a + b; // tashqi leksik muhitdan “a”ni oladi
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```

