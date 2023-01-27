# WeakMap va WeakSet

<info:garbage-collection> bo'limidan ma'lumki, JavaScript dvigateli xotirada qiymatni "olish mumkin" va undan foydalanish mumkin bo'lgan holatda saqlaydi.

Masalan:

```js
let john = { name: "John" };

// ob'ektga kirish mumkin, John unga havola

// havolaning ustiga yozing

john = null;

*!*
// ob'ekt xotiradan o'chiriladi
*/!*
```

Odatda, ob'ekt yoki massiv yoki boshqa ma'lumotlar strukturasi elementlarining xususiyatlari mavjud deb hisoblanadi va ma'lumotlar strukturasi xotirada bo'lganda xotirada saqlanadi.

Misol uchun, agar biz ob'ektni massivga qo'ysak, u holda massiv tirik bo'lsa ham, unga boshqa havolalar bo'lmasa ham, ob'ekt ham tirik bo'ladi.

Quyidagicha:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // havolaning ustiga yozing

*!*
// avval John tomonidan havola qilingan ob'ekt massiv ichida saqlanadi
// shuning uchun u axlat yig'ilmaydi
// biz uni massiv [0] sifatida olishimiz mumkin
*/!*
```

Shunga o'xshab, agar biz ob'ektni oddiy `Map` da kalit sifatida ishlatsak, `Map` mavjud bo'lsa, u ham mavjud. U xotirani egallaydi va axlat yig'ilmasligi mumkin.

Masalan:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // havolaning ustiga yozing

*!*
// Jon xaritada saqlanadi,
// Biz buni map.keys() yordamida olishimiz mumkin.
*/!*
```

`WeakMap` bu jihatdan tubdan farq qiladi. Bu asosiy ob'ektlarning axlat yig'ilishiga to'sqinlik qilmaydi.

Keling, misollarda nimani anglatishini ko'rib chiqaylik.

## WeakMap

`Map` va `WeakMap` o'rtasidagi birinchi farq shundaki, kalitlar primitiv qiymatlar emas, balki ob'ektlar bo'lishi kerak:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // yaxshi ishlaydi (ob'ekt kaliti)

*!*
// string kalit sifatida ishlata olmaydi
weakMap.set("test", "Whoops"); // Xato, chunki "test" ob'ekt emas
*/!*
```

Endi, agar biz ob'ektni kalit sifatida ishlatsak va bu ob'ektga boshqa havolalar bo'lmasa, u avtomatik ravishda xotiradan (va xaritadan) o'chiriladi.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // havolaning ustiga yozing

// John xotiradan olib tashlandi!
```

Uni yuqoridagi oddiy `Map` misoli bilan solishtiring. Endi agar `john` faqat `WeakMap` kaliti sifatida mavjud bo'lsa, u avtomatik ravishda xaritadan (va xotiradan) o'chiriladi.

`WeakMap` iteratsiya va `keys()`, `values()`, `entries()` usullarini qo'llab-quvvatlamaydi, shuning uchun undan barcha kalit yoki qiymatlarni olishning imkoni yo`q.

`WeakMap` faqat quyidagi usullarga ega:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Nega bunday cheklov? Bu texnik sabablarga ko'ra. Agar ob'ekt boshqa barcha havolalarni yo'qotgan bo'lsa (masalan, yuqoridagi koddagi "John"), u avtomatik ravishda axlat yig'ilishi kerak. Lekin texnik jihatdan _tozalash qachon sodir bo'lishi_ aniq belgilanmagan.

JavaScript dvigateli buni hal qiladi. U xotirani darhol tozalashni yoki ko'proq o'chirish sodir bo'lganda tozalashni kutish va keyinroq bajarishni tanlashi mumkin. Shunday qilib, texnik jihatdan `WeakMap` ning joriy elementlari soni ma'lum emas. Dvigatel uni tozalagan yoki qilmagan yoki qisman qilgan bo'lishi mumkin. Shu sababli, barcha kalitlarga/qiymatlarga kirish usullari qo'llab-quvvatlanmaydi.

Endi bunday ma'lumotlar tuzilmasi qayerga kerak?

## Foydalanish holati: qo'shimcha ma'lumotlar

`WeakMap` qoʻllanilishining asosiy sohasi _qoʻshimcha maʼlumotlarni saqlash_ hisoblanadi.

Agar biz boshqa kodga, hatto uchinchi tomon kutubxonasiga "tegishli" ob'ekt bilan ishlayotgan bo'lsak va u bilan bog'langan ba'zi ma'lumotlarni saqlamoqchi bo'lsak, ular faqat ob'ekt tirik bo'lganda mavjud bo'lishi kerak - u holda `WeakMap` aynan nima kerak.

Ob'ektni kalit sifatida ishlatib, `WeakMap` ga ma'lumotlarni joylashtiramiz va ob'ekt axlat yig'ilganda, bu ma'lumotlar ham avtomatik ravishda yo'qoladi.

```js
weakMap.set(john, "maxfiy hujjatlar");
// agar John o'lsa, maxfiy hujjatlar avtomatik ravishda yo'q qilinadi
```

Keling, bir misolni ko'rib chiqaylik.

Masalan, bizda foydalanuvchilar uchun tashriflar sonini saqlaydigan kod mavjud. Ma'lumotlar xaritada saqlanadi: foydalanuvchi ob'ekti kalit, tashriflar soni esa qiymatdir. Foydalanuvchi tark etganda (uning ob'ekti axlat yig'iladi), biz ularning tashriflari sonini boshqa saqlashni xohlamaymiz.

Quyida `Map` yordamida hisoblash funksiyasiga misol:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => tashriflar hisobga olinadi

// tashriflar sonini oshirish
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Va bu kodning yana bir qismi, ehtimol uni ishlatadigan boshqa fayl:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // tashriflarini hisoblash

// keyin John bizni tark etadi
john = null;
```

Endi `john` ob'ekti axlat yig'ilishi kerak, lekin xotirada qoladi, chunki u `visitsCountMap` da kalit hisoblanadi.

Biz foydalanuvchilarni o'chirishda `visitsCountMap` ni tozalashimiz kerak, aks holda u xotirada cheksiz o'sib boradi. Bunday tozalash murakkab arxitekturada zerikarli vazifaga aylanishi mumkin.

Buning o'rniga `WeakMap` ga o'tish orqali uni oldini olishimiz mumkin:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => tashriflar soni

// tashriflar sonini oshirish
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Endi biz `visitsCountMap` ni tozalashimiz shart emas. `John` ob'ektiga etib bo'lmaydigan holga kelgandan so'ng, `WeakMap` kaliti bundan mustasno, u `WeakMap` dan ushbu kalit ma'lumotlari bilan birga xotiradan o'chiriladi.

## Foydalanish holati: keshlash

Yana bir keng tarqalgan misol keshlashdir. Biz funksiyadan natijalarni ("kesh") saqlashimiz mumkin, shunda bir xil ob'ektga kelajakdagi qo'ng'iroqlar uni qayta ishlatishi mumkin.

Bunga erishish uchun biz `Map` dan foydalanishimiz mumkin (optimal stsenariy emas):

```js run
// 📁 cache.js
let cache = new Map();

// hisoblang va natijani eslang
function process(obj) {
  if (!cache.has(obj)) {
    let result = obj /* uchun natijalarni hisoblash */ ;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// Endi biz boshqa faylda process() dan foydalanamiz:
*/!*

// 📁 main.js
let obj = {/* deylik, bizda ob'ekt bor */};

let result1 = process(obj); // calculated

// ...keyinroq, kodning boshqa joyidan...
let result2 = process(obj); // keshdan olingan eslab qolgan natija

// ...keyinroq, ob'ektga kerak bo'lmaganda:
obj = null;

alert(cache.size); // 1 (Voy! Ob'ekt hali ham keshda, xotirani oladi!)
```

Xuddi shu ob'ekt bilan bir nechta `process(obj)` chaqiruvlari uchun u faqat birinchi marta natijani hisoblab chiqadi va keyin uni `keshdan` oladi. Salbiy tomoni shundaki, agar ob'ektga kerak bo'lmasa, biz `keshni` tozalashimiz kerak.

Agar `Map` ni `WeakMap` bilan almashtirsak, bu muammo yo'qoladi. Ob'ekt axlat yig'ilgandan so'ng keshlangan natija avtomatik ravishda xotiradan o'chiriladi.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// hisoblang va natijani eslang
function process(obj) {
  if (!cache.has(obj)) {
    let result = obj /* uchun natijani hisoblang */;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* ba'zi ob'ekt */};

let result1 = process(obj);
let result2 = process(obj);

// ...keyinchalik, ob'ekt endi kerak bo'lmaganda:
obj = null;

// cache.size faylini ololmadi, chunki u WeakMap,
// lekin u 0 yoki tez orada 0 bo'ladi
// Obj axlat yig'ilganda keshlangan ma'lumotlar ham o'chiriladi
```

## WeakSet

`WeakSet` xuddi shunday harakat qiladi:

- Bu `Set` ga o'xshaydi, lekin biz faqat `WeakSet` ga ob'ektlarni qo'shishimiz mumkin (ibtidoiy emas).
- Ob'ekt to'plamda mavjud bo'lib, unga boshqa joydan kirish mumkin.
- `Set` kabi, u `add`, `has` va `delete`ni qoʻllab-quvvatlaydi, lekin `size`, `keys()`ni va hech qanday takrorlashlarni qoʻllab-quvvatlamaydi .

"Zaif" bo'lib, u qo'shimcha saqlash vazifasini ham bajaradi. Lekin o'zboshimchalik bilan ma'lumotlar uchun emas, balki "ha/yo'q" faktlari uchun. `WeakSet` ga a'zolik ob'ekt haqida biror narsani anglatishi mumkin.

Masalan, saytimizga tashrif buyurganlarni kuzatib borish uchun foydalanuvchilarni `WeakSet`ga qo‘shishimiz mumkin:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John bizga tashrif buyurdi
visitedSet.add(pete); // Keyin Pete
visitedSet.add(john); // Yana John

// visitedSetda hozirda 2 ta foydalanuvchi bor

// John tashrif buyurganligini tekshirish?
alert(visitedSet.has(john)); // true

// Mary tashrif buyurganligini tekshirish?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet avtomatik ravishda tozalanadi
```

`WeakMap` va `WeakSet` ning eng ko'zga ko'ringan cheklovi - bu iteratsiyalarning yo'qligi va barcha joriy tarkibni olishning mumkin emasligi. Bu noqulay bo'lib ko'rinishi mumkin, lekin `WeakMap/WeakSet` asosiy vazifasini bajarishiga to'sqinlik qilmaydi -- boshqa joyda saqlanadigan/boshqariladigan ob'ektlar uchun ma'lumotlarni "qo'shimcha" saqlash.

## Summary

`WeakMap` bu `Map`ga o'xshash to'plam bo'lib, u faqat ob'ektlarga kalit sifatida ruxsat beradi va boshqa vositalar bilan kirish imkoni bo`lmaganda ularni tegishli qiymatlari bilan birga olib tashlaydi.

`WeakSet` bu `Set`ga o'xshash to'plam bo'lib, u faqat ob'ektlarni saqlaydi va boshqa vositalar bilan kirish imkoni bo`lmaganda ularni olib tashlaydi.

Ularning asosiy afzalliklari shundaki, ular ob'ektlarga zaif havolaga ega, shuning uchun ularni axlat yig'uvchi tomonidan osongina olib tashlash mumkin.

Bu `clear`, `size`, `keys`, `values`ni qoʻllab-quvvatlamaslik evaziga keladi...

`WeakMap` va `Weakset` "asosiy" ob'ektni saqlashdan tashqari "ikkilamchi" ma'lumotlar tuzilmalari sifatida ishlatiladi. Ob'ekt asosiy xotiradan olib tashlangandan so'ng, agar u faqat `WeakMap` yoki `WeakSet` kaliti sifatida topilsa, u avtomatik ravishda tozalanadi.
