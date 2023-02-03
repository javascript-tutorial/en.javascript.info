# JSON metodlari, toJSON

Aytaylik, bizda murakkab ob'ekt bor va biz uni satrga aylantirmoqchimiz, uni tarmoq orqali jo'natmoqchimiz yoki uni ro'yxatga olish maqsadida chiqarishni xohlaymiz.

Tabiiyki, bunday satr barcha muhim xususiyatlarni o'z ichiga olishi kerak.

Biz konvertatsiyani quyidagicha amalga oshirishimiz mumkin:

```js run
let user = {
  name: "John",
  age: 30,

*!*
  toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
*/!*
};

alert(user); // {name: "John", age: 30}
```

...Ammo rivojlanish jarayonida yangi xususiyatlar qo'shiladi, eski xususiyatlar o'zgartiriladi va olib tashlanadi. Bunday `toString` ni har safar yangilash og'riqli bo'lishi mumkin. Biz undagi xususiyatlarni aylanib chiqishga harakat qilishimiz mumkin, lekin agar ob'ekt murakkab bo'lsa va xususiyatlarda ichki ob'ektlar bo'lsa-chi? Biz ularning konvertatsiyasini ham amalga oshirishimiz kerak.

Yaxshiyamki, bularning barchasini hal qilish uchun kod yozishning hojati yo'q. Vazifa allaqachon hal qilingan.

## JSON.stringify

[JSON](https://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) qiymatlar va obyektlarni ifodalash uchun umumiy formatdir. U [RFC 4627](https://tools.ietf.org/html/rfc4627) standartida tasvirlangan. Dastlab u JavaScript uchun yaratilgan, ammo boshqa ko'plab tillarda ham uni boshqarish uchun kutubxonalar mavjud. Shunday qilib, mijoz JavaScript-dan foydalansa va server Ruby/PHP/Java/Whatever da yozilgan bo'lsa, ma'lumotlar almashinuvi uchun JSON-dan foydalanish oson.

JavaScript quyidagi metodlarni taqdim etadi:

- `JSON.stringify` ob'ektlarni JSONga aylantirish uchun.
- `JSON.parse` JSON-ni yana ob'ektga aylantirish uchun.

Masalan, biz talabani `JSON.stringify` qilamiz:

```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

*!*
let json = JSON.stringify(student);
*/!*

alert(typeof json); // bizda endi string bor!

alert(json);
*!*
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/
*/!*
```

`JSON.stringify(student)` usuli ob'ektni oladi va uni satrga aylantiradi.

Olingan json qatori _JSON-kodlangan_ yoki _seriyalashtirilgan_ yoki _stringlashtirilgan_ yoki _marshalllangan_ obyekt deb ataladi. Biz uni sim orqali yuborishga yoki oddiy ma'lumotlar do'koniga joylashtirishga tayyormiz.

E'tibor bering, JSON-kodlangan ob'ekt ob'ekt literalidan bir nechta muhim farqlarga ega:

- Sstringlar qo'sh tirnoqlardan foydalanadi. JSONda bitta tirnoq yoki teskari belgi yo'q. Shunday qilib, `'John'` `"John"` ga aylanadi.
- Obyekt xossalari nomlari ham ikki tirnoqli. Bu majburiy. Shunday qilib, `age: 30` `"age": 30` ga aylanadi.

`JSON.stringify` primitivlarga ham qo'llanilishi mumkin.

JSON quyidagi ma'lumotlar turlarini qo'llab-quvvatlaydi:

- Ob'ektlar `{ ... }`
- Massivlar `[ ... ]`
- Primitivlar:
  - stringlar,
  - raqamlar,
  - boolean qiymaylar `true/false`,
  - `null`.

Masalan:

```js run
// JSONdagi raqam shunchaki raqamdir
alert(JSON.stringify(1)); // 1

// JSONdagi satr hali ham satr, lekin ikki tirnoqli
alert(JSON.stringify("test")); // "test"

alert(JSON.stringify(true)); // true

alert(JSON.stringify([1, 2, 3])); // [1,2,3]
```

JSON faqat maʼlumotlarga bogʻliq boʻlgan tilga bogʻliq boʻlmagan spetsifikatsiyadir, shuning uchun JavaScript-ga xos boʻlgan baʼzi obyekt xususiyatlari `JSON.stringify` tomonidan oʻtkazib yuboriladi.

Ya'ni:

- Funksiya xususiyatlari (metodlari).
- Ramziy kalitlar va qiymatlar.
- `Undefined`ni saqlaydigan xususiyatlar.

```js run
let user = {
  sayHi() {
    // e'tiborga olinmagan
    alert("Hello");
  },
  [Symbol("id")]: 123, // e'tiborga olinmagan
  something: undefined, // e'tiborga olinmagan
};

alert(JSON.stringify(user)); // {} (bo'sh ob'ekt)
```

Odatda bu yaxshi. Agar bu biz xohlagan narsa bo'lmasa, tez orada jarayonni qanday sozlashni ko'ramiz.

Ajoyib narsa shundaki, ichki o'rnatilgan ob'ektlar avtomatik ravishda qo'llab-quvvatlanadi va o'zgartiriladi.

Masalan:

```js run
let meetup = {
  title: "Conference",
*!*
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
*/!*
};

alert( JSON.stringify(meetup) );
/* The whole structure is stringified:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

Muhim cheklov: dumaloq havolalar bo'lmasligi kerak.

Maslan:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // uchrashuv ma'lumotnomalari xonasi
room.occupiedBy = meetup; // xona ma'lumotnomalari uchrashuvi

*!*
JSON.stringify(meetup); // Error: aylanma tuzilmani JSON ga aylantirishda
*/!*
```

Bu yerda konvertatsiya amalga oshmadi, chunki aylanali havola: `room.occupiedBy` `meetup` va `meetup.place` havolalari `room`:

![](json-meetup.svg)

## Istisno qilish va o'zgartirish: almashtiruvchi

`JSON.stringify` ning to'liq sintaksisi:

```js
let json = JSON.stringify(value[, replacer, space])
```

value
: Kodlash uchun qiymat.

replacer
: Kodlash uchun xossalar massivi yoki `function (key, value)` xaritalash funksiyasi.

space
: Formatlash uchun foydalanish uchun bo'sh joy miqdori

Ko'pincha `JSON.stringify` faqat birinchi argument bilan ishlatiladi. Ammo agar biz aylanma havolalarni filtrlash kabi almashtirish jarayonini nozik sozlashimiz kerak bo'lsa, biz `JSON.stringify` ning ikkinchi argumentidan foydalanishimiz mumkin.

Agar unga xossalar massivini uzatsak, faqat shu xossalar kodlanadi.

Masalan:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // uchrashuv ma'lumotnomalari xonasi
};

room.occupiedBy = meetup; // xona ma'lumotnomalari uchrashuvi

alert( JSON.stringify(meetup, *!*['title', 'participants']*/!*) );
// {"title":"Conference","participants":[{},{}]}
```

Bu erda, ehtimol, biz juda qattiqqo'lmiz. Xususiyatlar ro'yxati butun ob'ekt tuzilishiga qo'llaniladi. Shunday qilib, `participants` dagi ob'ektlar bo'sh, chunki `name` ro'yxatda yo'q.

Keling, ro'yxatga dumaloq havolaga sabab bo'ladigan `room.occupiedBy`dan tashqari har bir xususiyatni kiritaylik:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // uchrashuv ma'lumotnomalari xonasi
};

room.occupiedBy = meetup; // xona ma'lumotnomalari uchrashuvi

alert( JSON.stringify(meetup, *!*['title', 'participants', 'place', 'name', 'number']*/!*) );
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Endi `occupiedBy` dan tashqari hamma narsa seriyalashtirildi. Ammo mulklar ro'yxati juda katta.

Yaxshiyamki, biz massiv o‘rniga `replacer` sifatida funksiyadan foydalanishimiz mumkin.

Funktsiya har bir `(kalit, qiymat)` juftligi uchun chaqiriladi va asl qiymati o'rniga ishlatiladigan "almashtirilgan(replaced)" qiymatni qaytarishi kerak. Yoki qiymat o'tkazib yuborilishi kerak bo'lsa, `undefined`.

Bizning holatda, biz `occupiedBy` dan tashqari hamma narsa uchun `value` ni "bo'lgani kabi" qaytarishimiz mumkin. `OccupiedBy` ni e'tiborsiz qoldirish uchun quyidagi kod "aniqlanmagan"ni qaytaradi:

```js run
let room = {
  number: 23,
};

let meetup = {
  title: "Conference",
  participants: [{ name: "John" }, { name: "Alice" }],
  place: room, // uchrashuv ma'lumotnomalari xonasi
};

room.occupiedBy = meetup; // xona ma'lumotnomalari uchrashuvi

alert(
  JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return key == "occupiedBy" ? undefined : value;
  })
);

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```

Esda tutingki, `replacer` funksiyasi har bir kalit/qiymat juftligini oladi, shu jumladan ichki oʻrnatilgan obyektlar va massiv elementlari. U rekursiv ravishda qo'llaniladi. `Replacer` ichidagi `this` qiymati joriy xususiyatni o'z ichiga olgan ob'ektdir.

Birinchi chaqiruv alohida. U maxsus "oʻrash obyekti" yordamida amalga oshiriladi: `{"": meetup}`. Boshqacha qilib aytganda, birinchi `(kalit, qiymat)` juftligi bo'sh kalitga ega va qiymat butun sifatida maqsadli ob'ektdir. Shuning uchun yuqoridagi misolda birinchi qator `":[object Object]"`.

G'oya `replacer` ni iloji boricha ko'proq quvvat bilan ta'minlashdan iborat: agar kerak bo'lsa, hatto butun ob'ektni tahlil qilish va almashtirish/o'tkazib yuborish imkoniyati mavjud.

## Formatlash: bo'sh joy

`JSON.stringify(value, replacer, space)` ning uchinchi argumenti chiroyli formatlash uchun foydalaniladigan bo'shliqlar soni.

Ilgari, barcha torli ob'ektlarda chuqurchalar va ortiqcha bo'shliqlar yo'q edi. Ob'ektni tarmoq orqali jo'natmoqchi bo'lsak, bu yaxshi. `Space` argumenti faqat chiroyli chiqish uchun ishlatiladi.

Bu erda `space = 2` JavaScript-ga bir nechta satrlarda ichki o'rnatilgan ob'ektlarni ko'rsatishni aytadi, bunda ob'ekt ichida 2 bo'sh joy ajratiladi:

```js run
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true,
  },
};

alert(JSON.stringify(user, null, 2));
/* two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* for JSON.stringify(user, null, 4) the result would be more indented:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

Uchinchi argument ham string bo'lishi mumkin. Bunda qator bo'shliqlar o'rniga chekinish uchun ishlatiladi.

`space` parametri faqat jurnalga yozish va chiroyli chiqish uchun ishlatiladi.

## Maxsus "toJSON"

Stringni oʻzgartirish uchun `toString` singari, obyekt ham JSONʼga oʻtkazish uchun `toJSON` metodini taqdim qilishi mumkin. `JSON.stringify"`agar mavjud bo'lsa, uni avtomatik ravishda chaqiradi.

Masalan:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Bu erda biz `date` `(1)` satrga aylanganini ko'rishimiz mumkin. Buning sababi, barcha sanalarda shunday qatorni qaytaradigan o'rnatilgan "toJSON" usuli mavjud.

Keling, `room` `(2)` obyektimiz uchun maxsus `toJSON` qo'shamiz:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let meetup = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(meetup) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

Ko'rib turganimizdek, `toJSON` ham `JSON.stringify(room)` to'g'ridan-to'g'ri chaqiruvi uchun, ham `room` boshqa kodlangan ob'ektga joylashtirilganda ishlatiladi.

## JSON.parse

JSON-stringni dekodlash uchun bizga [JSON.parse](mdn:js/JSON/parse) nomli boshqa usul kerak bo'ladi.

Sintaksisi:

```js
let value = JSON.parse(str, [reviver]);
```

str
: Tahlil qilish uchun JSON-string.

reviver
: Har bir `(key, value)` juftligi uchun chaqiriladigan va qiymatni o'zgartira oladigan ixtiyoriy function(key, value).

Masalan:

```js run
// stringli massiv
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert(numbers[1]); // 1
```

Yoki o'rnatilgan ob'ektlar uchun:

```js run
let userData =
  '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert(user.friends[1]); // 1
```

JSON kerakli darajada murakkab bo'lishi mumkin, ob'ektlar va massivlar boshqa ob'ektlar va massivlarni o'z ichiga olishi mumkin. Lekin ular bir xil JSON formatiga bo'ysunishlari kerak.

Qo'lda yozilgan JSON-dagi odatiy xatolar (ba'zida biz uni tuzatish uchun yozishimiz kerak):

```js
let json = `{
  *!*name*/!*: "John",                     // mistake: property name without quotes
  "surname": *!*'Smith'*/!*,               // mistake: single quotes in value (must be double)
  *!*'isAdmin'*/!*: false                  // mistake: single quotes in key (must be double)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
```

Bundan tashqari, JSON sharhlarni qo'llab-quvvatlamaydi. JSONga izoh qo‘shish uni yaroqsiz qiladi.

Yana [JSON5](https://json5.org/) nomli format mavjud boʻlib, unda tirnoqsiz kalitlar, sharhlar va hokazolar mavjud. Lekin bu alohida kutubxona boʻlib, til spetsifikatsiyasida emas.

Muntazam JSON juda qattiq, chunki uni ishlab chiquvchilar dangasa emas, balki tahlil qilish algoritmini oson, ishonchli va juda tez amalga oshirish imkonini beradi.

## Reviver ishlatish

Tasavvur qiling-a, biz serverdan simli `meetup` obyektini oldik.

Bu shunday ko'rinadi:

```js
// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
```

...Endi esa yana JavaScript obyektiga aylantirish uchun uni _deserialize_ qilishimiz kerak.

Keling, buni `JSON.parse` chaqirib bajaramiz:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

*!*
alert( meetup.date.getDate() ); // Error!
*/!*
```

Yo'q! Error!

`meetup.date` qiymati `Date` obyekti emas, balki stringdir. `JSON.parse` bu qatorni `Date`ga aylantirish kerakligini qayerdan bilishi mumkin?

`JSON.parse` ga ikkinchi argument sifatida barcha qiymatlarni qaytaruvchi jonlantirish funksiyasini o‘tamiz, lekin `date` `Date`ga aylanadi:

```js run
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

*!*
let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( meetup.date.getDate() ); // endi ishlaydi!
```

Aytgancha, bu ichki o'rnatilgan ob'ektlar uchun ham ishlaydi:

```js run
let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.meetups[1].date.getDate() ); // works!
*/!*
```

## Xulosa

- JSON o'zining mustaqil standarti va ko'pgina dasturlash tillari uchun kutubxonalarga ega bo'lgan ma'lumotlar formatidir.
- JSON oddiy ob'ektlar, massivlar, satrlar, raqamlar, mantiqiy va `null` ni qo'llab-quvvatlaydi.
- JavaScript JSON-ga seriyalashtirish uchun [JSON.stringify](mdn:js/JSON/stringify) va JSON-dan o'qish uchun [JSON.parse](mdn:js/JSON/parse) usullarini taqdim etadi.
- Ikkala metod ham aqlli o'qish/yozish uchun transformator funktsiyalarini qo'llab-quvvatlaydi.
- Agar ob'ektda `toJSON` bo'lsa, u `JSON.stringify` tomonidan chaqiriladi.
