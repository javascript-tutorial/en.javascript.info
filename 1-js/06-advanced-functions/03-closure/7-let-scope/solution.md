Natija: **error**.

Uni ishga tushirishga harakat qiling:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

Ushbu misolda biz "mavjud bo'lmagan" va "boshlanmagan" o'zgaruvchilar o'rtasidagi o'ziga xos farqni kuzatishimiz mumkin.

Maqolada o'qigan bo'lishingiz mumkin [](info:closure), o'zgaruvchi kod blokiga (yoki funksiyaga) kirgan paytdan boshlab "initiallashtirilmagan" holatda boshlanadi. Tegishli `let` iborasi paydo bo'lgunga qadar u boshlang'ichsiz qoladi.

Boshqacha qilib aytganda, oʻzgaruvchi texnik jihatdan mavjud, lekin `let` dan oldin ishlatilmaydi.

The code above demonstrates it.

```js
function func() {
*!*
  // mahalliy o'zgaruvchi x funktsiya boshidanoq mexanizmga ma'lum,
  // lekin ruxsat etilmaguncha ("o'lik zona") "boshlanmagan" (foydalanish mumkin emas).
  // shuning uchun error chiqadi
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
```

O'zgaruvchining vaqtinchalik yaroqsizligi zonasi (kod blokining boshidan `let` gacha) ba'zan "o'lik zona" deb ataladi.
