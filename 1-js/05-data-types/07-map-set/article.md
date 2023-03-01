# Map va Set

Hozirgacha biz quyidagi murakkab ma'lumotlar tuzilmalari haqida bilib oldik:

- Ob'ektlar kalitli kolleksiyalarni saqlash uchun ishlatiladi.
- Massivlar buyurtma qilingan kollektsiyalarni saqlash uchun ishlatiladi.

Ammo bu haqiqiy hayot uchun etarli emas. Shuning uchun `Map` va `Set` ham mavjud.

## Map

[Map](mdn:js/Map) Ob'ekt kabi kalitli ma'lumotlar to'plamidir. Lekin asosiy farq shundaki, `Map` har qanday turdagi kalitlarga ruxsat beradi.

Metodlari va xususiyatlari quyidagilardir:

- `new Map()` -- mapni yaratadi.
- [`map.set(key, value)`](mdn:js/Map/set) -- qiymatni kalit orqali saqlaydi.
- [`map.get(key)`](mdn:js/Map/get) -- agar `key` xaritada mavjud boʻlmasa, `undefined` kalit boʻyicha qiymatni qaytaradi.
- [`map.has(key)`](mdn:js/Map/has) -- agar `key` mavjud bo‘lsa, `true`, aks holda `false` qiymatini qaytaradi.
- [`map.delete(key)`](mdn:js/Map/delete) -- kalit orqali qiymatni olib tashlaydi.
- [`map.clear()`](mdn:js/Map/clear) -- mapdan hamma narsani olib tashlaydi.
- [`map.size`](mdn:js/Map/size) -- joriy elementlar sonini qaytaradi.

Masalan:

```js run
let map = new Map();

map.set("1", "str1"); // stringli kalit
map.set(1, "num1"); // raqamli kalit
map.set(true, "bool1"); // mantiqiy kalit

// oddiy ob'ektni eslaysizmi? u kalitlarni stringga aylantiradi
// Map tni saqlaydi, shuning uchun bu ikkisi farq qiladi:
alert(map.get(1)); // 'num1'
alert(map.get("1")); // 'str1'

alert(map.size); // 3
```

Ko'rib turganimizdek, ob'ektlardan farqli o'laroq, kalitlar satrlarga aylantirilmaydi. Har qanday turdagi kalit mumkin.

``smart header="`map[key]` `Map`ni ishlatishning to'g'ri yo'li emas.`map[key]`ham ishlasa-da, masalan. biz`map[key] = 2`ni oʻrnatishimiz mumkin, bu`map`ni oddiy JavaScript obyekti sifatida koʻrib chiqadi, shuning uchun u barcha tegishli cheklovlarni nazarda tutadi (faqat string/simvol tugmachalari va boshqalar).

Shunday qilib, biz `map` usullaridan foydalanishimiz kerak: `set`, `get` va boshqalar.

**Map obyektlardan kalit sifatida ham foydalanishi mumkin.**

Masalan:

```js run
let john = { name: "John" };

// har bir foydalanuvchi uchun ularning tashriflari sonini saqlaylik
let visitsCountMap = new Map();

// John map uchun kalit
visitsCountMap.set(john, 123);

alert(visitsCountMap.get(john)); // 123
```

Ob'ektlarni kalit sifatida ishlatish eng muhim va muhim `Map` funksiyalaridan biridir. Xuddi shu narsa `Ob'ekt` uchun hisobga olinmaydi. `Ob'ekt` da kalit sifatida string yaxshi, lekin biz `Ob'ekt` da boshqa `Ob'ekt` dan kalit sifatida foydalana olmaymiz.

Sinab ko'ramiz:

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // ob'ektdan foydalanishga harakat qiling

visitsCountObj[ben] = 234; // ben ob'ektini kalit sifatida ishlatishga harakat qiling
visitsCountObj[john] = 123; // kalit sifatida john ob'ektidan foydalanishga harakat qiling, ben ob'ekti almashtiriladi

*!*
// Bu yozilgan!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

`visitsCountObj` ob'ekt bo'lgani uchun u yuqoridagi `john` va `ben` kabi barcha `Ob'ekt` tugmachalarini bir xil `"[object Object]"` qatoriga o`zgartiradi. Albatta, biz xohlagan narsa emas.

``smart header="`Xarita`kalitlarni qanday taqqoslaydi"
Kalitlarni ekvivalentligini tekshirish uchun`Map` [SameValueZero] algoritmidan foydalanadi (https://tc39.github.io/ecma262/#sec-samevaluezero). Bu qat'iy tenglik`===`bilan taxminan bir xil, ammo farq shundaki,`NaN` `NaN`ga teng hisoblanadi. Shunday qilib, `NaN` kalit sifatida ham ishlatilishi mumkin.

Bu algoritmni oʻzgartirish yoki sozlash mumkin emas.

`
``smart header=`Zanjirlash`Har bir`map.set`qo‘ng‘irog‘i xaritaning o‘zini qaytaradi, shuning uchun biz qo‘ng‘iroqlarni`zanjirlash`imiz mumkin:

```js
map.set("1", "str1").set(1, "num1").set(true, "bool1");
```

````

## Map ustida takrorlash

`Map` bo'ylab aylanish uchun 3 ta usul mavjud:

- [`map.keys()`](mdn:js/Map/keys) -- kalitlar uchun iteratsiyani qaytaradi,
- [`map.values()`](mdn:js/Map/values) -- qiymatlar uchun iteratsiyani qaytaradi,
- [`map.entries()`](mdn:js/Map/entries) -- `[kalit, qiymat]` yozuvlari uchun iteratsiyani qaytaradi, u sukut bo'yicha `for..of` da ishlatiladi.

Masalan:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// kalitlar ustida takrorlash (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// qiymatlar ustidan takrorlash (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// [kalit, qiymat] yozuvlari ustidan takrorlash
for (let entry of recipeMap) { // retseptMap.entries() bilan bir xil
  alert(entry); // cucumber,500 (and so on)
}
````

` `smart header= `Qo'shish tartibi qo'llaniladi"`
Takrorlash qiymatlar kiritilgan tartibda davom etadi. `Map` oddiy `Ob'ekt` dan farqli o'laroq, bu tartibni saqlaydi.
``

Bundan tashqari, `Map` da `Massiv` ga o'xshash o'rnatilgan `forEach` usuli mavjud:

```js
// har bir (kalit, qiymat) juftligi uchun funksiyani ishga tushiradi
recipeMap.forEach((value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 va boshqalar
});
```

## Object.entries: Objectdan Map

`Xarita` yaratilganda, ishga tushirish uchun kalit/qiymat juftlari bilan massivni (yoki boshqa iterativ) o‘tkazishimiz mumkin, masalan:

```js run
// array of [key, value] pairs
let map = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

alert(map.get("1")); // str1
```

Agar bizda oddiy ob'ekt bo'lsa va undan `Xarita` yaratmoqchi bo'lsak, massivni qaytaradigan o'rnatilgan [Object.entries(obj)](mdn:js/Object/entries) metodidan foydalanishimiz mumkin. aynan shu formatdagi ob'ekt uchun kalit/qiymat juftliklari.

Shunday qilib, biz bunday ob'ektdan map yaratishimiz mumkin:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

Bu yerda `Object.entries` kalit/qiymat juftliklari massivini qaytaradi: `[ [["ism","Jon"], ["yosh", 30] ]`. `Map`ga aynan shu kerak.

## Object.fromEntries: Mapdan Ob'ekt

Biz hozirgina `Object.entries(obj)` yordamida oddiy obyektdan `Map`ni qanday yaratishni ko‘rib chiqdik.

Buning teskarisini amalga oshiradigan `Object.fromEntries` usuli mavjud: `[kalit, qiymat]` juftlik massivi berilganda, u ulardan obyekt yaratadi:

```js run
let prices = Object.fromEntries([
  ["banana", 1],
  ["orange", 2],
  ["meat", 4],
]);

// endi narxlar = { banana: 1, orange: 2, meat: 4}

alert(prices.orange); // 2
```

Biz `Map` dan oddiy obyektni olish uchun `Object.fromEntries` dan foydalanishimiz mumkin.

Masalan, biz ma'lumotlarni `Map` da saqlaymiz, lekin uni oddiy ob'ektni kutayotgan uchinchi tomon kodiga o'tkazishimiz kerak.

Here we go:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // oddiy ob'ekt yasash (*)
*/!*

// tayyor!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

`map.entries()` ga chaqiruv qilish `Object.fromEntries` uchun aynan to'g'ri formatda kalit/qiymat juftlarining takrorlanishini qaytaradi.

Biz `(*)` qatorini qisqartirishimiz ham mumkin:

```js
let obj = Object.fromEntries(map); // omit .entries()
```

Xuddi shunday, chunki `Object.fromEntries` argument sifatida takrorlanadigan ob'ektni kutadi. Massiv bo'lishi shart emas. `Map` uchun standart iteratsiya `map.entries()` bilan bir xil kalit/qiymat juftlarini qaytaradi. Shunday qilib, biz `map` bilan bir xil kalit/qiymatlarga ega oddiy ob'ektni olamiz.

## Set

`Set` - bu maxsus turdagi to'plam - `qiymatlar to'plami` (kalitlarsiz), unda har bir qiymat faqat bir marta bo'lishi mumkin.

Uning asosiy metodlari quyidagilardir:

- `new Set(iterable)` -- to‘plamni yaratadi va agar `takrorlanuvchi` ob’ekt taqdim etilsa (odatda massiv), undan qiymatlarni to‘plamga ko‘chiradi.
- [`set.add(value)`](mdn:js/Set/add) -- qiymat qo'shadi, to'plamning o'zini qaytaradi.
- [`set.delete(value)`](mdn:js/Set/delete) -- qiymatni olib tashlaydi, agar chaqiruv paytida `qiymat` mavjud bo'lsa, `true` qaytaradi, aks holda `false`.
- [`set.has(value)`](mdn:js/Set/has) -- Agar qiymat to'plamda mavjud bo'lsa, `true` qaytaradi, aks holda `false`.
- [`set.clear()`](mdn:js/Set/clear) -- to'plamdan hamma narsani olib tashlaydi.
- [`set.size`](mdn:js/Set/size) -- elementlar soni hisoblanadi.

Asosiy xususiyat shundaki, bir xil qiymatga ega `set.add(value)` ning takroriy chaqiruvlari hech narsa qilmaydi. Shuning uchun har bir qiymat `To'plam` da faqat bir marta paydo bo'ladi.

Misol uchun, bizga tashrif buyuruvchilar bor va biz hammani eslashni xohlaymiz. Ammo takroriy tashriflar dublikatlarga olib kelmasligi kerak. Mehmon faqat bir marta "hisoblanishi" kerak.

`Set` buning uchun to'g'ri narsa:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// tashriflar, ba'zi foydalanuvchilar bir necha marta keladi
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// to'plam faqat noyob qiymatlarni saqlaydi
alert(set.size); // 3

for (let user of set) {
  alert(user.name); // Jon (keyin Pit va Meri)
}
```

`Set` ga muqobil foydalanuvchilar qatori va [arr.find](mdn:js/Array/find) yordamida har bir qoʻshishda dublikatlarni tekshirish uchun kod boʻlishi mumkin. Ammo ishlash ancha yomonroq bo'lar edi, chunki bu usul har bir elementni tekshirib, butun massiv bo'ylab yuradi. `Set` o'ziga xoslikni tekshirish uchun ichki optimallashtirilgan.

## To'plam ustidan takrorlash

Biz to'plamni `for..of` yoki `forEach` yordamida aylantirishimiz mumkin:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// forEach bilan bir xil:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

Qiziqarli narsaga e'tibor bering. `ForEach` da o'tkazilgan qayta chaqiruv funksiyasi 3 ta argumentga ega: `qiymat`, keyin _bir xil qiymat_ `valueAgain` va keyin maqsadli obyekt. Darhaqiqat, bir xil qiymat argumentlarda ikki marta paydo bo'ladi.

Bu `Map` bilan moslik uchun, bu yerda ``forEach` qayta chaqirish uchta argumentga ega. Biroz g'alati ko'rinadi, shubhasiz. Ammo bu ma'lum holatlarda `Map` ni `Set` bilan osongina almashtirishga yordam beradi va aksincha.

Iteratorlar uchun `Map` ning bir xil usullari ham qo'llab-quvvatlanadi:

- [`set.keys()`](mdn:js/Set/keys) -- qiymatlar uchun takrorlanadigan ob'ektni qaytaradi,
- [`set.values()`](mdn:js/Set/values) -- `Map` bilan mosligi uchun `set.keys()` bilan bir xil,
- [`set.entries()`](mdn:js/Set/entries) -- `[qiymat, qiymat]` yozuvlari uchun takrorlanadigan obyektni qaytaradi, `Map` bilan muvofiqligi uchun mavjud.

## Xulosa

`Map` -- kalitli qiymatlar to'plamidir.

Metodlari va xususiyatlari:

- `new Map([iterable])` -- ishga tushirish uchun ixtiyoriy `takrorlanuvchi` (masalan, massiv) `[kalit, qiymat]` juftliklari bilan xaritani yaratadi.
- [`map.set(key, value)`](mdn:js/Map/set) -- kalit orqali qiymatni saqlaydi, xaritaning o'zini qaytaradi.
- [`map.get(key)`](mdn:js/Map/get) -- Agar `key` xaritada mavjud boʻlmasa, `undefined` kalit boʻyicha qiymatni qaytaradi.
- [`map.has(key)`](mdn:js/Map/has) -- agar `key` mavjud bo‘lsa, `true`, aks holda `yolg‘on` qiymatini qaytaradi.
- [`map.delete(key)`](mdn:js/Map/delete) -- kalit bo'yicha qiymatni olib tashlaydi, agar chaqiruv paytida `key` mavjud bo'lsa, `true` qaytaradi, aks holda `false`.
- [`map.clear()`](mdn:js/Map/clear) -- xaritadan hamma narsani olib tashlaydi.
- [`map.size`](mdn:js/Map/size) -- joriy elementlar sonini qaytaradi.

Oddiy `Ob'ekt` dan farqlari:

- Har qanday kalitlar, ob'ektlar kalit bo'lishi mumkin.
- Qo'shimcha qulay metodlar, `size` xususiyati.

`Set` -- noyob qiymatlar to'plamidir.

Metodlari va xususiyatlari:

- `new Set([iterable])` -- ishga tushirish uchun ixtiyoriy `iterable` (masalan, massiv) qiymatlar to'plamini yaratadi.
- [`set.add(value)`](mdn:js/Set/add) -- qiymat qo'shadi (agar `value` mavjud bo'lsa, hech narsa qilmaydi), to'plamning o'zini qaytaradi.
- [`set.delete(value)`](mdn:js/Set/delete) -- qiymatni olib tashlaydi, agar chaqiruv paytida `qiymat` mavjud bo'lsa, `true` qaytaradi, aks holda `false`.
- [`set.has(value)`](mdn:js/Set/has) -- Agar qiymat to'plamda mavjud bo'lsa, `true` ni qaytaradi, aks holda `false`.
- [`set.clear()`](mdn:js/Set/clear) -- to'plamdan hamma narsani olib tashlaydi.
- [`set.size`](mdn:js/Set/size) -- elementlar soni hisoblanadi.

`Map` va `Set` boʻyicha takrorlash har doim qoʻshish tartibida boʻladi, shuning uchun biz bu toʻplamlar tartibsiz deb ayta olmaymiz, lekin elementlarni qayta tartiblay olmaymiz yoki toʻgʻridan-toʻgʻri uning raqami boʻyicha elementni ololmaymiz.

```

```
