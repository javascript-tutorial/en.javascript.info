
# Symbol turi

Spetsifikatsiyaga ko'ra, ob'ekt xossalari kalitlari string turida yoki Symbollar turida bo'lishi mumkin. Raqamlar emas, mantiqiy emas, faqat satrlar yoki Symbollar, shu ikki turda bo'ladi.

Hozirgacha faqat satrlardan foydalanayotkan edik. Keling endi, Symbollar bizga qanday foyda keltirishi mumkinligini ko'rib chiqamiz.
By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.

## Symbollar

"Symbol" noyob aniqlovchini ifodalaydi.

A value of this type can be created using `Symbol()`:

```js
// id yangi Symboldir
let id = Symbol();
```

Yaratilgandan so'ng, Symbolga tavsif berish mumkin(shuningdek Symbol vaqti ham deb ataladi), va ayniqsa debugging maqsadlarida foydali bo'ladi: 
let id = Symbol();
```

Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:

```js
// id - "id" tavsifiga ega Symbol
let id = Symbol("id");
```

Symbol o'ziga hos bo'lishi kafolatlanadi. Xatto bir xil tavsif bilan ko'plab Symbol yaratsak ham, ular har xil qiymatda bo'ladi. Tavsif shunchaki yorliq bo'lib, hech narsaga ta'sir qilmaydi.
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.


Misol uchun, bu yerda bir xil tavsifga ega ikkita symbol bor - ular teng emas:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Agar Ruby yoki qandaydir "symbol"lari bo'lgan boshqa bir til bilan tanish bo'lsangiz -- yanglishmang. JavaScript belgilari boshqacha.

````warn header="Symbol lar avtomatik ravishda string ga aylantirilmaydi"
JavaScript dagi aksariayat qiymatlar string ga yashirin o'tishni qo'llaydi. Misol uchun, biz deyarli barcha qiymatni `alert` qila olamiz, va bu ishlaydi. Symbol lar maxsusdir. Ular avtomatik ravishda o'zgarmaydi. 
So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.

Misol uchun, ushbu `alert` xatolikni ko'rsatib beradi:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Symbol qiymatni string ga aylantirib bo‘lmaydi
*/!*
```

Bu chalkashlikllarni oldini olish uchun "language guard" (til qo'riqchisi) dir, chunki string lar va symbol lar tubdan farq qiladi va ular tasodifan bir-biriga aylantirilmasligi kerak.

Agar symbol ni ko'rsatmoqchi bo'lsak, unda `.toString()` ni ochiq tarzda chaqirishimiz kerak bo'ladi, xuddi shunga o'xshab:
If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), endi u ishlaydi
*/!*
```

Yoki faqat tavsifni ko'rsatish uchun "symbol.description" xususiyatini olinadi:
Or get `symbol.description` property to show the description only:

```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## "Hidden" (Yashirin) xususiyatlar

Symbol lar bizga ob'ektning kodning boshqa bir qismi tasodifan kira olmaydigan va ustiga  yoza olmaydigan "yashirin" xususiyatlar yaratish imkonini beradi. 

Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.

Misol uchun, agar `user` ob'ektlari bilan foydalanayotkan bo'lsak, ular uchinchi qism kodiga tegishli. Biz ularga aniqlovchialrni qo'shmoqchimiz.

Buning uchun symbol kalitidan foydalanamiz:

```js run
let user = { // boshqa kodga tegishli
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // Ma'lumotlarga symbol dan kalit sifatida foydalanib kirish mumkin
```

`Symbol("id")` ni `"id"` stringi ustidan foydalanishning foydasi nima?

`user` ob'ektlari boshqa kodga tegishli bo'lgani uchun va bu kod ular bilan ham ishlaganligi uchun, unga shunchaki maydon qo'shmasligimiz kerak bo'ladi. Bu xavfli ish. Ammo symbolga tasodifan kirish mumkin emas, uchinchi tomon kodi uni hatto ko'rmasligi ham mumkin, shuning uchun buni qilish to'g'ri bo'lishi ham mumkin.

Bundan tashqari, tasavvur qiling, boshqa skript o'z maqsadlari uchun `user` ichida o'z identifikatoriga ega bo'lishni xohlayapti. Bu boshqa bir JavaScript kutubxonasi bo'lishi mumkin, shuning uchun skriptlar bir-biridan mutlaqo bexabar holatda.
As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.

Keyin bu skript o'zining "Symbol("id")' ni yaratishi mumkin, masalan:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

Bizning va ularning identifikatorlari o'rtasida hech qanday ziddiyat bo'lmaydi, chunki symbol lar bir xil nomga ega bo'lsa ham, har doim farq qiladi.

...Ammo bir xil maqsad uchun symbol o'rniga `"id"` string idan foydalansak, U holda u yerda ziddiyat *bo'lardi*:
```js
    
let user = { name: "John" };

// Bizning skriptimiz "id" xususiyatidan foydalanadi
user.id = "Our id value";

// ...Boshqa skript ham o'zining maqsadlari uchun "id" dan foydalanishni xohlaydi... 

user.id = "Their id value"   
// Bom! boshqa skript tomonidan yozilgan!
```

### Ob'ekt harfidagi symbol lar

Agar biz `{...}` ob'ektida symboldan foydalanmoqchi bo'lsak, uning atrofida kvadrat qavslar kerak.

Shunga o'xshash:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // "id" emas: 123
*/!*
};
```
Buning sababi, kalit sifatida bizga "id" string emas, balki "id" o'zgaruvchisi qiymati kerak.

### Symbols for..in tomonidan tashlab ketiladi 

Symbolic xususiyatlar `for..in` siklida qatnashmaydi.

Misol uchun:
```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // ism, yosh (symbol larsiz)
*/!*

// symbol orqali to'g'ridan to'g'ri kirish ishlaydi
alert( "Direct: " + user[id] );
// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) ham ularga e'tibor bermaydi. Bu umumiy "symbolic xususiyatlarni yashirish" tamoyilining bir qismidir. Agar boshqa skript yoki kutubxona ob'ektimiz ustidan aylansa, u kutilmaganda symbolic xususiyatga kira olmaydi.

Bundan farqli ravishda, [Object.assign](mdn:js/Object/assign) ham string, ham symbol xususiyatlarini nusxalaydi:
```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

Bu yerda hech qanday paradoks yo'q, bu shunchki dizayn bo'yicha. G'oya shundan iboratki, biz ob'ektni klonlash yoki ob'ektlarni birlashtirganda, biz odatda *barcha* xususiyatlarni (jumladan, `id` kabi symbol larni) ham nusxalashni xohlaymiz.

## Global symbol lar

Ko'rib turganimizdek, odatda barcha belgilar bir xil nomga ega bo'lsa ham, har xil bo'ladi. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.

Bunga erishish uchun *global symbol registr*i mavjud. Unda symbol lar yaratib, ularga keyinroq kirsa bo'ladi va u bir xil nom bilan qayta-qayta kirirish  ayni bir xil symbolga qaytishni kafolatlaydi. 

Ro'yxatga olish kitobidan belgini o'qish (agar yo'q bo'lsa yaratialdi) uchun `Symbol.for(key)` dan foydalaning.

Ushbu chaqiruv global registrni tekshiradi va agar `key` sifatida tasvirlangan symbol bo'lsa, uni qaytaradi, aks holda yangi `Symbol(key)` symbolni yaratadi va uni berilgan `kalit` bo'yicha registrda saqlaydi.

Masalan:

```js run
// global registrdan o'qing
let id = Symbol.for("id"); // agar symbol mavjud bo'lmasa, u yaratiladi

// uni yana o'qing (kodning boshqa qismidan bo'lishi mumkin)
let idAgain = Symbol.for("id");

// bir xil symbol
alert( id === idAgain ); // to'g'ri
```

Ro'yxatga olish ichidagi symbol lar *global symbollar* deb ataladi. Agar biz kodning hamma joyidan foydalanish mumkin bo'lgan keng ko'lamli dastur symbol ga ega bo'lishni istasak - ular aynan shu maqsadda.

```smart header="Bu Rubyga o'xshab ketadi"
Ruby kabi ba'zi dasturlash tillarida har bir nom uchun bitta symbol mavjud.

JavaScript-da, biz ko'rib turganimizdek, bu global symbol lar uchun to'g'ri.
In JavaScript, as we can see, that's true for global symbols.
```

### Symbol.keyFor

Global symbol lar uchun nafaqat `Symbol.for(key)` nomi bilan symbol ni qaytaradi, balki teskari chaqiruv ham mavjud: `Symbol.keyFor(sym)`, bu teskari harakatni amalga oshiradi: nomni global symbol bilan qaytaradi.
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:

For instance:

Misol uchun:
```js run
// nomi bilan symbol ni oling
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// nomnni belgi bilan oling
alert( Symbol.keyFor(sym) ); // nom
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` symbol kalitini qidirish uchun global symbol lar registridan ichki ravishda foydalanadi.  Shunday uchun, u global bo'lmagan belgilar uchun ishlamaydi. Agar belgi global bo'lmasa, uni topa olmaydi va `undefined` ga qaytadi.

Ammo, har qanday symbol lar ham "descriptionary" xususiyatiga ega.
That said, all symbols have the `description` property.

Misol uchun:

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // nom, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, global emas

alert( localSymbol.description ); // nom
```

## System symbol lar

JavaScript ichki tarzda foydalanadigan ko'plab "tizim" symbol lari mavjud va biz ulardan ob'ektlarimizning turli tomonlarini nozik sozlashda foydalanishimiz mumkin.

Ular [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) jadvalidagi spetsifikatsiyada keltirilgan:

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...va boshqalar.

Misol uchun, `Symbol.toPrimitive` bizga ob'ektni primitiv konvertatsiya qilishni tasvirlash imkonini beradi. Tez orada uning ishlatilishini ko'ramiz.
Tegishli til xususiyatlarini o'rganganimizda boshqa symbol lar ham tanish bo'lib qoladi.

## Xulosa

`Symbol` noyob identifikatorlar uchun primitiv tur hisoblanadi.

Belgilar ixtiyoriy tavsif (nom) bilan `Symbol()` chaqiruvi bilan yaratiladi.

Belgilar bir xil nomga ega bo'lishiga qaramay, har doim turli xil qiymatlardir. Agar bir xil nomdagi belgilar teng bo'lishini istasak, u holda global registrdan foydalanishimiz kerak: `Symbol.for(key)` nom sifatida `key` bilan global symbolni qaytaradi (agar kerak bo'lsa yaratadi).`Symbol.for` ning bir xil  `key` bilan bir nechta chaqiruvlari aynan bir xil belgini qaytaradi.
Symbol lar ikkita asosiy foydalanish holatiga ega:

1. "Yashirin" ob'ekt xususiyatlari.
   Agar biz boshqa skript yoki kutubxonaga "tegishli" ob'ektga xususiyat qo'shmoqchi bo'lsak, biz symbol yaratishimiz va uni xususiyat key (kalit)i sifatida ishlatishimiz mumkin. Symbolic xususiyat `for..in` da ko'rinmaydi, shuning uchun u boshqa xususiyatlar bilan birga tasodifan qayta jarayondan o'tishi mumkin emas. Bundan tashqari, unga to'g'ridan-to'g'ri kirish imkoni yo'q, chunki boshqa skriptda bizning symbol yo'q. Shunday uchun, mulk tasodifiy foydalanish yoki qayta yozishdan himoyalangan bo'ladi.

  O'zimizga kerak bo'lgan narsalarni "yashirincha" yashira olamiz, lekin symbolic xususiyatlardan foydalanib, boshqalar ko'rmasligi kerak. 

2. JavaScript-da `Symbol.*` sifatida foydalanish mumkin bo'lgan ko'plab tizim belgilari mavjud. Ulardan ba'zi o'rnatilgan xatti-harakatlarni o'zgartirish uchun foydalanish mumkin. Misol uchun, qo'llanmaning keyingi qismida, [iterables](info:iterable) uchun `Symbol.inerator` dan, [object-to-primitive conversion](info:object-toprimitive) ni ishka tushish uchun `Symbol.toPrimitive` dan foydalanamiz va boshqalar.

Texnik jihatdanm symbol-lar 100% yashiringan bo'ladi. Bizga barcha symbol-larni olish imkonini beruvchi [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) ichki o'rnatilgan uslub mavjud. Yana, object-ning symbol-larni ham o'z ichiga olgan *barcha* key-larni qaytaruvchi [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) deb atalgan uslub mavjud. Shunday ekan, ular unchalik ham yashirin emas. Lekin ko'plab kutubxonalar, ichki o'rnatilgan funktsiyalar va sintaksis tuzilmalar bu uslublardan foydalanmaydilar.
1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

    So we can "covertly" hide something into objects that we need, but others should not see, using symbolic properties.

2. There are many system symbols used by JavaScript which are accessible as `Symbol.*`. We can use them to alter some built-in behaviors. For instance, later in the tutorial we'll use `Symbol.iterator` for [iterables](info:iterable), `Symbol.toPrimitive` to setup [object-to-primitive conversion](info:object-toprimitive) and so on.

Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
