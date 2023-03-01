
1. Hamma narsa ishlashi uchun *qanday bo'lmasin*, `sum` natijasi funksiya bo'lishi kerak.
2. Ushbu funktsiya chaqiruvlar orasidagi joriy qiymatni xotirada saqlashi kerak.
3. Vazifaga ko'ra, funksiya `==` da ishlatilganda raqamga aylanishi kerak. Funktsiyalar ob'ektlardir, shuning uchun konvertatsiya <info:object-toprimitive> bobida tasvirlanganidek amalga oshiriladi va biz raqamni qaytaradigan o'z uslubimizni taqdim etishimiz mumkin.

Now the code:

```js demo run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Esda tutingki, `sum` funksiyasi aslida bir marta ishlaydi. U `f` funksiyasini qaytaradi.

Keyin, har bir keyingi chaqiruvda `f` o'z parametrini `currentSum` yig'indisiga qo'shadi va o'zini qaytaradi.

**`f` ning oxirgi qatorida rekursiya yo‘q.**

Rekursiya quyidagicha ko'rinishga ega:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- rekursiv chaqiruv
}
```

Va bizning holatimizda, biz faqat funktsiyani chaqirmasdan qaytaramiz:

```js
function f(b) {
  currentSum += b;
  return f; // <-- o'zini chaqirmaydi, o'zini qaytaradi
}
```

Bu `f` keyingi chaqiruvda ishlatiladi, yana o'zini, kerak bo'lganda ko'p marta qaytaradi. Keyin, raqam yoki satr sifatida foydalanilganda -- `toString` `currentSum` qaytaradi. Konvertatsiya qilish uchun bu yerda `Symbol.toPrimitive` yoki `valueOf` dan ham foydalanishimiz mumkin.
