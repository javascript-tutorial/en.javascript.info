# Takrorlanuvchilar

_Takrorlanuvchi_ ob'ektlar massivlarning umumlashtirilishi hisoblanadi. Bu bizga har qanday ob'ektni `for..of` tsiklida foydalanishga imkon beradigan tushunchadir.

Albatta, massivlar takrorlanadi. Ammo yana ko'plab o'rnatilgan ob'ektlar mavjud, ular ham takrorlanadi. Masalan, stringlar ham takrorlanadi.

Agar ob'ekt texnik jihatdan massiv bo'lmasa, lekin biror narsaning to'plamini (ro'yxatini, to'plamini) ifodalasa, u holda `for..of` uni aylantirish uchun ajoyib sintaksisdir, shuning uchun uni qanday ishlashini ko'rib chiqamiz.

## Symbol.iterator

Biz o'zimiz birini yaratib, takrorlanuvchilar tushunchasini osongina tushunishimiz mumkin.

Masalan, bizda massiv bo'lmagan, lekin `for..of` uchun mos keladigan ob'ekt mavjud.

Raqamlar oralig'ini ifodalovchi `range` ob'ekti kabi:

```js
let range = {
  from: 1,
  to: 5,
};

// Biz for..of ishlashini xohlaymiz:
// for(let num of range) ... num=1,2,3,4,5
```

`Diapazon` ob'ektini takrorlanadigan qilish (va shunday qilib `for..of` ishlashiga imkon berish) uchun biz `Symbol.iterator` nomli ob
'ektga usul qo'shishimiz kerak (buning uchun maxsus o`rnatilgan belgi).

1. `For..of` ishga tushganda, u bu metodni bir marta chaqiradi (yoki topilmasa xatolar). Usul _iterator_ -- "keyingi" usuliga ega ob'ektni qaytarishi kerak.
2. Keyinchalik, `for..of` \_faqat o'sha qaytarilgan ob'ekt bilan ishlaydi.
3. Qachonki `for..of` keyingi qiymatni xohlasa, u ob'ektda `next()` ni chaqiradi.
4. `Next()` natijasi `{bajarildi: Mantiqiy, qiymat: har qanday}` ko'rinishiga ega bo'lishi kerak, bu yerda `bajarildi=true` tsikl tugaganligini bildiradi, aks holda `qiymat` keyingi qiymatdir.

Quyida izohlar bilan “diapazon” uchun toʻliq dastur:

```js run
let range = {
  from: 1,
  to: 5,
};

// 1. for..of chaqiruvi dastlab buni chaqiradi
range[Symbol.iterator] = function () {
  // ...iterator ob'ektini qaytaradi:
  // 2. Keyin, for..of faqat quyidagi iterator ob'ekti bilan ishlaydi va undan keyingi qiymatlarni so'raydi
  return {
    current: this.from,
    last: this.to,

    // 3. next() har bir iteratsiyada for..of sikli orqali chaqiriladi
    next() {
      // 4. u qiymatni ob'ekt sifatida qaytarishi kerak {bajarildi:.., qiymat:...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

// now it works!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Iltimos, takrorlanuvchilarning asosiy xususiyatiga e'tibor bering: aloqalarni ajratish.

- `range` o'zida `next()` usuliga ega emas.
- Buning oʻrniga `range[Symbol.iterator]()` chaqiruvi orqali `iterator` deb ataladigan boshqa obyekt yaratiladi va uning `next()` takrorlash uchun qiymatlarni hosil qiladi.

Shunday qilib, iterator ob'ekti takrorlanadigan ob'ektdan alohida.

Texnik jihatdan biz ularni birlashtirib, kodni soddalashtirish uchun iterator sifatida `range` dan foydalanishimiz mumkin.

Misol uchun:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range) {
  alert(num); // 1, keyin 2, 3, 4, 5
}
```

Endi `range[Symbol.iterator]()` `range` ob'ektining o'zini qaytaradi: u kerakli `next()` metodiga ega va `this.current` da joriy takrorlanish jarayonini eslab qoladi. Qisqaroqmi? Ha. Va ba'zida bu ham yaxshi.

Salbiy tomoni shundaki, endi ob'ekt ustida bir vaqtning o'zida ikkita `for..of` tsikliga ega bo'lishning iloji yo'q: ular iteratsiya holatini baham ko'radi, chunki faqat bitta iterator - ob'ektning o'zi. Ammo ikkita parallel for-of kamdan-kam uchraydi, hatto asinxron stsenariylarda ham.

``smart header="Cheksiz iteratorlar"
Cheksiz iteratorlar ham bo'lishi mumkin. Masalan, `range`cheksiz bo'lib,`range.to = Infinity` uchun. Yoki biz psevdor tasodifiy raqamlarning cheksiz ketma-ketligini hosil qiluvchi takrorlanadigan ob'ektni yaratishimiz mumkin. Shuningdek, foydali bo'lishi mumkin.

`next` bo'yicha hech qanday cheklovlar yo'q, u ko'proq va ko'proq qiymatlarni qaytarishi mumkin, bu normaldir.

Albatta, bunday takrorlanuvchi uchun `for..of` tsikli cheksiz bo'ladi. Lekin biz uni har doim `break` yordamida to'xtata olamiz.

``

## String takrorlanuvchidir

Massivlar va stringlar eng ko'p ishlatiladigan o'rnatilgan iterativlardir.

String uchun `for..of` uning belgilarini aylantiradi:

```js run
for (let char of "test") {
  // 4 marta tetiklaydi: har bir belgi uchun bir marta
  alert(char); // t, keyin e, keyin s, keyin t
}
```

Va u surrogat juftliklar bilan to'g'ri ishlaydi!

```js run
let str = "𝒳😂";
for (let char of str) {
  alert(char); // 𝒳, so'ngra 😂
}
```

## Iteratorni aniq chaqirish

Chuqurroq tushunish uchun iteratordan qanday qilib aniq foydalanishni ko'rib chiqamiz.

Biz satrni xuddi `for..of` bilan bir xil tarzda takrorlaymiz, lekin to'g'ridan-to'g'ri chaqiruvlar bilan. Ushbu kod string iteratorini yaratadi va undan qiymatlarni "qo'lda" oladi:

```js run
let str = "Hello";

// for (let char of str) alert(char);
// kabi qiladi

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // belgilarni birma-bir chiqaradi
}
```

Bu kamdan-kam hollarda kerak bo'ladi, lekin bizga jarayonni `for..of` dan ko'ra ko'proq boshqarish imkonini beradi. Misol uchun, biz iteratsiya jarayonini ajratishimiz mumkin: bir oz takrorlang, keyin to'xtating, boshqa ishni bajaring va keyinroq davom eting.

## Takrorlanuvchilar va massivga o'hshashlar [#array-like]

Ikki rasmiy atama bir-biriga o'xshash, ammo juda farq qiladi. Chalkashmaslik uchun ularni yaxshi tushunganingizga ishonch hosil qiling.

- _Takrorlanuvchilar_ yuqorida ta'riflanganidek, `Symbol.iterator` usulini amalga oshiradigan ob'ektlardir.
- _Masivga o'hshashlar_ - indekslari va `uzunligi` bo'lgan ob'ektlar, shuning uchun ular massivlarga o'xshaydi.

Biz JavaScript-ni brauzerda yoki boshqa har qanday muhitda amaliy vazifalar uchun ishlatganimizda, biz takrorlanadigan yoki massivga o'xshash yoki ikkalasini ham uchratishimiz mumkin.

Masalan, stringlar iterativ (`for..of` ular ustida ishlaydi) va massivga o'xshaydi (ularning raqamli indekslari va `uzunligi` mavjud).

Ammo iteratsiya massivga o'xshamasligi mumkin. Va aksincha, massivga o'xshash takrorlanmasligi mumkin.

Masalan, yuqoridagi misoldagi `range` takrorlanadi, lekin massivga o‘xshamaydi, chunki u indekslangan xususiyatga va `uzunlik`ga ega emas.

Va quyida massivga o'xshash, lekin takrorlanmaydigan ob'ekt:

```js run
let arrayLike = { // indekslari va uzunligi => massivga o'xshash
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

Takrorlanuvchi va massivga o'xshashlar odatda massiv emas, ularda `push`, `pop` va boshqalar yo'q. Agar bizda bunday ob'ekt bo'lsa va u bilan massiv bilan ishlashni xohlasak, bu juda noqulay. Masalan, biz massiv usullaridan foydalangan holda `diapazon` bilan ishlashni xohlaymiz. Bunga qanday erishish mumkin?

## Array.from

Universal metod [Array.from](mdn:js/Array/from) mavjud bo'lib, u takrorlanadigan yoki massivga o'xshash qiymatni oladi va undan `haqiqiy` `Massiv` hosil qiladi. Unda massiv usullarini chaqirishimiz mumkin.

Misol uchun:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (metod ishlaydi)
```

`(*)` qatoridagi `Array.from` ob'ektni oladi, uni takrorlanuvchi yoki massivga o'xshashligini tekshiradi, so'ng yangi massiv yaratadi va unga barcha elementlarni ko`chiradi.

Xuddi shu narsa takrorlanuvchi uchun sodir bo'ladi:

```js run
// bu diapazon yuqoridagi misoldan olingan bo'lsa
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (massiv toString konvertatsiyasi ishlaydi)
```

`Array.from` uchun toʻliq sintaksis bizga ixtiyoriy “mapping” funksiyasini ham taqdim qilish imkonini beradi:

```js
Array.from(obj[, mapFn, thisArg])
```

Ixtiyoriy ikkinchi argument `mapFn` har bir elementni massivga qo‘shishdan oldin qo‘llaniladigan funksiya bo‘lishi mumkin va `thisArg` bizga `this` ni o‘rnatishga imkon beradi.

Misol uchun:

```js run
// bu diapazon yuqoridagi misoldan olingan bo'lsa

// har bir raqamni kvadratga aylantiring
let arr = Array.from(range, (num) => num * num);

alert(arr); // 1,4,9,16,25
```

Bu yerda stringni belgilar massiviga aylantirish uchun `Array.from` dan foydalanamiz:

```js run
let str = "𝒳😂";

// satrni belgilar qatoriga ajratadi
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

`str.split` dan farqli o'laroq, u satrning takrorlanadigan xususiyatiga tayanadi va xuddi `for..of` kabi, surrogat juftlar bilan to'g'ri ishlaydi.

Texnik jihatdan bu yerda u xuddi shunday qiladi:

```js run
let str = "𝒳😂";

let chars = []; // Array.from ichki bir xil siklni bajaradi
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...Ammo u qisqaroq.

Biz hatto uning ustiga surrogatdan xabardor `bo'lak` qurishimiz mumkin:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join("");
}

let str = "𝒳😂𩷶";

alert(slice(str, 1, 3)); // 😂𩷶

// mahalliy metod surrogat juftlarni qo'llab-quvvatlamaydi
alert(str.slice(1, 3)); // axlat (turli surrogat juftliklaridan ikkita bo'lak)
```

## Xulosa

`for..of` da ishlatilishi mumkin bo'lgan ob'ektlar _takrorlanuvchi_ deb ataladi.

- Texnik jihatdan, takrorlanuvchilar `Symbol.iterator` deb nomlangan usulni amalga oshirishi kerak.
  - `obj[Symbol.iterator]()` natijasi _takrorlanuvchi_ deb ataladi. U keyingi iteratsiya jarayonini boshqaradi.
  - Iterator `{bajarildi: mantiqiy, qiymat: har qanday}` ob'ektini qaytaruvchi `next()` nomli metodga ega bo'lishi kerak, bu yerda `bajarildi: true` takrorlash jarayonining oxirini bildiradi, aks holda `qiymat` keyingi hisoblanadi.
- `Symbol.iterator` usuli `for..of` tomonidan avtomatik ravishda chaqiriladi, lekin biz buni to'g'ridan-to'g'ri bajarishimiz ham mumkin.
- Stringlar yoki massivlar kabi o'rnatilgan takrorlanuvchilar `Symbol.iterator`ni ham amalga oshiradi.
- String iterator surrogat juftliklar haqida biladi.

Indekslangan xossalari va `uzunligi` bo'lgan ob'ektlar _massivga-o'xshash_ deb ataladi. Bunday ob'ektlar boshqa xususiyat va metodlarga ham ega bo'lishi mumkin, ammo massivlarning o'rnatilgan usullari mavjud emas.

Agar biz spetsifikatsiyani ko'rib chiqsak, ko'ramiz, o'rnatilgan usullarning aksariyati ular `haqiqiy` massivlar o'rniga takrorlanadigan yoki massivga o'xshashlar bilan ishlaydi, chunki bu mavhumroq.

`Array.from(obj[, mapFn, thisArg])` takrorlanadigan yoki massivga o'xshash `obj` dan haqiqiy `Massiv` hosil qiladi va biz unda massiv usullaridan foydalanishimiz mumkin. `mapFn` va `thisArg` ixtiyoriy argumentlari har bir elementga funktsiyani qo'llash imkonini beradi.
