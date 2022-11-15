# O'zgaruvchilar (Variables)

Ko'pincha JavaScript ilovalari ma'lumot bilan ishlashiga to'g'ri keladi. Quyida ikkita misol:
1. Onlayn do'kon -- ma'lumotlar sotilayotgan tovarlar va xarid savatini o'z ichiga olishi mumkin.
2. Chat ilovasi -- ma'lumotlar foydalanuvchilar, xabarlar va boshqalarni o'z ichiga oladi.

O'zgaruvchilar ushbu ma'lumotlarni saqlash uchun ishlatiladi.

## O'zgaruvchi

[O'zgaruvchi](https://en.wikipedia.org/wiki/Variable_(computer_science)) - bu ma'lumotlar uchun "nomlangan xotira". Biz o'zgaruvchilardan tashrif buyuruvchilar va boshqa ma'lumotlarni saqlash uchun foydalanishimiz mumkin.

JavaScriptda oʻzgaruvchi yaratish uchun `let` kalit soʻzidan foydalaning.

Quyidagi bayonot "message" nomli o'zgaruvchini yaratadi (boshqacha aytganda: *uni e'lon qiladi*):

```js
let message;
```

Endi biz `=` tayinlash operatoridan foydalanib, unga ba'zi ma'lumotlarni kiritishimiz mumkin:

```js
let message;

*!*
message = 'Hello'; // "Hello" string-ni message nomli o'zgaruvchiga saqlang
*/!*
```

Endi string o'zgaruvchi bilan bog'langan xotira maydoniga saqlanadi. Biz unga o'zgaruvchi nomi yordamida kirishimiz mumkin:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // o'zgaruvchi tarkibini ko'rsatadi
*/!*
```

Qisqacha aytganda, biz o'zgaruvchini e'lon qilish va tayinlash amallarini bitta qatorga birlashtira olamiz:

```js run
let message = 'Hello!'; // o'zgaruvchini aniqlang va qiymatni belgilang

alert(message); // Hello!
```

Biz bir qatorda bir nechta o'zgaruvchilarni e'lon qilishimiz ham mumkin:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Bu qisqaroq bo'lib ko'rinishi mumkin, lekin buni tavsiya etmaymiz. Yaxshiroq o'qilishi uchun har bir o'zgaruvchi uchun alohida qatordan foydalaning.

Ko'p qatorli uslub biroz uzun, ammo o'qishga osonroq:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Ba'zilar ushbu ko'p qatorli uslubda bir nechta o'zgaruvchilarni ham e'lon qiladishadi:

```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...Yoki "vergul-birinchi" uslubda:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Texnik jihatdan, bu variantlarning barchasi bir xil ishni bajaradi. Demak, bu shaxsiy did va estetika masalasi.

```smart header="`let` ni o'rniga `var`"
Eski skriplarda `let`ni o'rniga boshqa kalit so'z - `var` ni uchratishingiz ham mumkin:

```js
*!*var*/!* message = 'Hello';
```

`var` kalit so'zi `let` bilan *deyarli* bir xil. U ham o'zgaruvchi e'lon qiladi, lekin biroz boshqacha, "eski" usulda.

"Let" va "var" o'rtasida nozik farqlar mavjud, ammo ular biz uchun hozircha muhim emas. Ularni <info:var> bobida batafsil yoritamiz.
````

````
## Haqiqiy hayotdagi o'xshashlik

Agar "o'zgaruvchi" ni ma'lumotlar uchun ustida maxsus nomlangan yorlig' mavjud quti deb tasavvur qilsak, ushbu tushunchani osongina tushunishimiz mumkin bo'ladi.

Masalan, "message" o'zgaruvchisini qiymati "Hello!" bo'lgan "message" yorlig'li quti sifatida tasavvur qilish mumkin:

![](variable.svg)

Qutiga istalgan qiymatni kiritishimiz mumkin:

Yana uni xohlagancha o'zgartirishimiz ham mumkin:
```js run
let message;

message = 'Hello!';

message = 'World!'; // qiymat o'zgardi

alert(message);
```

Qiymat o'zgartirilganda, eski ma'lumotlar o'zgaruvchidan o'chiriladi:

![](variable-change.svg)

Shuningdek, biz ikkita o'zgaruvchini e'lon qilishimiz va ma'lumotlarni biridan ikkinchisiga nusxalashimiz ham mumkin.

```js run
let hello = 'Hello world!';

let message;

*!*
// "Hello World" ni hello-dan message-ga nusxalang
message = hello;
*/!*

// endi ikkala o'zgaruvchi ham bitta ma'lumotni o'zida saqlaydi
alert(hello); // Hello world!
alert(message); // Hello world!
```

````warn header="Ikki marta e'lon qilish xatolikni keltirib chiqaradi"
O'zgaruvchi faqat bir marta e'lon qilinishi kerak.

Bir o'zgaruvchining takroriy e'lon qilinishi xatoga olib keladi:
````
```js run
let message = "This";

// takroriy 'let' xatoga olib keladi
let message = "That"; // SyntaxError: 'message' has already been declared ("message" allaqachon e'lon qilingan)
```
Shunday qilib, biz o'zgaruvchini bir marta e'lon qilishimiz va keyin unga "let"siz murojaat qilishimiz kerak.

```smart header="Functional languages"
Shunisi qiziqki, o'zgaruvchi qiymatlarini o'zgartirishni taqiqlaydigan [Scala](http://www.scala-lang.org/) yoki [Erlang] kabi [funksional](https://en.wikipedia.org/wiki/Functional_programming) dasturlash tillari mavjud. (http://www.erlang.org/).

Bunday tillarda qiymat "qutida" saqlanganidan keyin u yerda abadiy qoladi. Agar boshqa biror narsani saqlashimiz kerak bo'lsa, til bizni yangi quti yaratishga (yangi o'zgaruvchini e'lon qilish) majbur qiladi. Eskisini qayta ishlata olmaymiz.

Bir qarashda g'alati ko'rinsada, bu tillar ancha rivojlangan. Bundan tashqari, parallel hisoblash joylar borki, unda bunday cheklash ancha yordam beradi. Fikrlashni kengaytirish uchun bunday tilni o'rganish (hatto uni yaqin orada ishlatishni rejalashtirmagan bo'lsangiz ham) tavsiya etiladi.
```

## O'zgaruvchi nomlanishi [#variable-naming]

JavaScriptda o'zgaruvchini nomlashda 2ta cheklov mavjud:

1. Nom faqat harflar, raqamlar, yoki `$` va `_` belgilarini o'zida saqlashi kerak.
2. Birinchi xarakter raqam bo'lmasligi kerak.

To'g'ri nomlarga misollar:

```js
let userName;
let test123;
```

Nom ko'p so'zdan iborat bo'lganda, [camelCase](https://en.wikipedia.org/wiki/CamelCase) usulidan keng foydalaniladi. Unda: so'zlar bir-biridan so'ng, birinchisidan tashqari qolganlari barchasi katta bosh xarf bilan yoziladi: `myVeryLongName`.

Qizig'i shundaki -- dollor `'$'` va pastgi chiziqcha `'_'` belgilari ham nomlarda ishlatilinishi mumkin. Ular ham xuddi harflar kabi hech qanday ma'noga ega bo'lmagan doimiy belgilar.

Quyidagi nomlar to'g'ri:

```js run untrusted
let $ = 1; // "$" nomi bilan o'zgaruvchi e'lon qilingan
let _ = 2; // va endi "_" nomi bilan o'zgaruvchi 

alert($ + _); // 3
```

Noto'g'ri o'zgaruvchi nomlariga misollar:

```js no-beautify
let 1a; // raqam bilan boshlana olmaydi

let my-name; // chiziqlar '-' ishlatish mumkin emas
```

```smart header="Case ahamiyat kasb etadi"
`apple` va `AppLE` nomli o'zgaruvchilar 2ta turli o'zgaruvchilardir.
```

````smart header="Lotin bo'lmagan harflardan foydalanish mumkin, lekin tavsiya etilmaydi"
Har qanday tildan, jumladan kirill harflari yoki hatto ierogliflardan foydalanish mumkin:

```js
let имя = '...';
let 我 = '...';
```

Texnik jihatdan, bu yerda hech qanday xatolik yo'q. Bunday nomlash mumkin, ammo o'zgaruvchi nomlarida ingliz tilidan foydalanish bo'yicha xalqaro kelishuv mavjud. Xatto kichik skript yozayotgan bo'lsak ham, u shu orqali uzoq umr ko'rishi mumkin. Boshqa mamlakatlardagi odamlar ham uni o'qishi kerak bo'lib qolishi mumkin.
````

````warn header="Band qilingan nomlar"
JavaScriptda o'zgaruvchi nomi sifatida ishlatilina olmaydigan [band qilingan so'zlar ro'yhati](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords) mavjud, chunki ulardan tilning o'zida foydalaniladi.

Misol uchun: `let`, `class`, `return`, va `function`lar band qilingan.

Quyidagi kod sintaks xatoga olib keladi:

```js run no-beautify
let let = 5; // o'zgaruvchini "let" deb nomlab bo'lmaydi, xatolik!
let return = 5; // "return" deb ham nomlab bo'lmaydi, xatolik!
```
````

````warn header="`use strict`siz tayinlash"

Odatda, biz uni ishlatishdan oldin o'zgaruvchini e'lon qilishimiz kerak. Ammo qadimgi davrlarda `let`dan foydalanmasdan turib ham, shunchaki qiymatni tayinlash orqali oʻzgaruvchini yaratish texnik jihatdan mumkin bo'lgan. Eski skriptlar bilan mosligini saqlab qolish uchun skriptlarimizda `use strict`ni ishlatmasak, bu hozir ham ishlaydi.

```js run no-strict
// diqqat: bu misolda "use strict" mavjud emas

num = 5; // agar u mavjud bo'lmasa, "num" nomli o'zgaruvchi yaratiladi

alert(num); // 5
```

Bunday qilish yaxshi emas va qat'iy rejimda xatolikka olib keladi:

```js
"use strict";

*!*
num = 5; // xatolik: num e'lon qilinmagan
*/!*
```


## Konstantalar

O'zgarmas o'zgaruvchi e'lon qilish uchun, `let`ning o'rniga `const`dan foydalaning:

```js
const myBirthday = '18.04.1982';
```

`const` yordamida e'lon qilingan o'zgaruvchilar "konstantalar" deb ataladi. Ularga qayta tayinlashning iloji yo'q. Bunday qilishga urinish xatoga olib keladi:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```

Agar dasturchilar o'zgaruvchi hech qachon o'zgarmasligiga ishonchi komil bo'lsa, ular buni kafolatlash va hammaga aniq yetkazish uchun o'zgaruvchini `const` bilan e'lon qilishlari mumkin.


### Katta harfdagi konstantalar

Konstantalar eslab qolishga qiyin qiymatlar uchun taxalluslar sifatida foydalanish keng tarqalgan amaliyotdir.

Bunday konstantalar katta harflar va pastki chiziqchalar yordamida nomlanadi.

Misol uchun, keling, ranglar uchun "veb" (o'n oltilik) formatda konstantalar yarataylik:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...rangni tanlashimiz kerak bo'lganda
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Foydali jihatlari:

- `#FF7F00`dan ko'ra `COLOR_ORANGE` eslab qolishga ancha oson .
- `COLOR_ORANGE`dan ko'ra `#FF7F00`ni xato yozish ehtimolligi yuqori .
- Kodni o'qish paytida, `#FF7F00`dan ko'ra `COLOR_ORANGE` ancha mazmunliroq.

Qachon konstanta uchun bosh harflardan foydalanishimiz kerak va qachon uni odatdagidek nomlashimiz kerak? Keling, buni aniqlab olamiz.

"Konstanta" bo'lish shunchaki o'zgaruvchining qiymati hech qachon o'zgarmasligini anglatadi. Lekin shunday konstantalar borki, ular ishlatilinishidan avval ma'lum bo'ladi (masalan, qizil rang uchun o'n oltilik qiymat) va shunday konstantalar borki, ular bajarilish vaqtida  *hisoblanadi*, lekin dastlabki qiymat tayinlanganidan keyin o'zgarmaydi.

Misol uchun:
```js
const pageLoadTime = /* time taken by a webpage to load */;
```

`pageLoadTime` qiymati sahifa yuklanishidan oldin noma`lum, shuning uchun u odatdagidek nomlanadi. Ammo bu hali ham kontanta, chunki u tayinlashdan keyin o'zgarmaydi.

Boshqacha qilib aytganda, katta harflarda nomlangan konstantalar yozilishi qiyin bo'lgan qiymatlarni saqlash uchun ishlatilinadi.

## Narsalarni to'gri nomlang

O'zgaruvchilar haqida gapirilganda, yana bir muhim narsa mavjud.

O'zgaruvchining nomi u saqlaydigan ma'lumotlarni tavsiflovchi toza, aniq ma'noga ega bo'lishi kerak.

O'zgaruvchilarni nomlash dasturlashning eng muhim va murakkab ko'nikmalaridan biridir. O'zgaruvchilar nomlariga bir qarashda kodni  yangi boshlovchi yoki tajribali dasturchi tomonidan yozilganligini aniqlash mumkin.

Haqiqiy loyhilarda, vaqtning ko'p qismi biror narsani butunlay noldan yozishdan ko'ra mavjuda kod bazasini o'zgartirish va kengaytirishga sarflanadi. Biroz vaqt boshqa narsa bajarib kodga qaytganimizda, yaxshi yozilgan ma'lumotlarni yoki boshqacha qilib aytganda, yaxshi nomlangan o'zgaruvchilarni topish oson bo'ladi.

O'zgaruvchi e'lon qilishdan avval unga to'g'ri keladigan nomni yaxshilab o'ylash uchun vaqt sarflang. Bunday qilish sizning foydangizga xizmat qiladi.

Amal qilinsa yaxshi ba'zi qoidalar:

- `userName` yoki `shoppingCart` kabi inson o'qishiga qulay nomlardan foydalaning.
- Agar nima qilayotganingizni bilmasangiz, qisqartmalar yoki `a`, `b`, `c` kabi qisqa nomlardan foydalanmang.
- Nomlarni iloji boricha tavsiflovchi va qisqacha qiling. Yomon nomlarga misol qilib `data` va `value`larni keltirish mumkin. Bunday nomlar hech qanday mazmunga ega emas. Agar kod mazmuni o'zgaruvchi qaysi ma'lumot yoki qiymatga murojat qilayotgani aniq bo'lsa, shunda ulardan foydalanish mumkin.
- Jamoangiz va o'z fikringiz shartlariga rozi bo'ling. Agar saytga tashrif buyuruvchi `user` deb atalsa, `currentVisitor` yoki `newManInTown`  o‘rniga tegishli o‘zgaruvchilarni `currentUser` yoki `newUser` deb nomlashimiz kerak.

Oddiy tuyuldimi? Haqiqatan ham shunday, lekin tavsiflovchi va qisqacha o'zgaruvchilar nomlarini amalda yaratish bunday emas. Qani olg'a.

```smart header="Qayta foydalanish yoki yaratish?"
Va oxirgi eslatma. Yangi o'zgaruvchilarni e'lon qilish o'rniga, mavjudlarini qayta ishlatishga moyil ba'zi dangasa dasturchilar mavjud.

Natijada, ular yozgan o'zgaruvchilar odamlar yorlig'larni o'zgartirmasdan turli narsalarni tashlaydigan qutilarga o'xshaydi. Endi qutining ichida nima bor? Kim biladi? Yaqinlashib tekshirishimizga to'g'ri keladi.

Bunday dasturchilar o'zgaruvchi e'lon qilishda biroz vaqt tejab qolishadi, lekin debug qilish jarayonida o'n barobar ko'proq vaqt yo'qotishadi.

Qo'shimcha o'zgaruvchi yomon emas, balki yaxshi.

Zamonaviy JavaScript minifikatorlari va brauzerlari kodni etarlicha optimallashtiradi, shuning uchun kod ishlash bilan bog'liq muammolarni keltirib chiqarmaydi. Turli xil qiymatlar uchun turli xil o'zgaruvchilardan foydalanish hatto engine-ga kodingizni optimallashtirishga yordam beradi.
```

## Xulosa

Biz ma'lumotlar saqlashi uchun `var`, `let`, yoki `const` kalit so'zlari yordamida o'zgaruvchilar e'lon qilishimiz mumkin.

- `let` -- zamonaviy o'zgaruvchi e'lon qilish usuli.
- `var` -- eski o'zgaruvchi e'lon qilish usuli. Odatda biz undan umuman foydalanmaymiz, lekin sizga kerak bo'lsa, <info:var> bobida `let` dan farqli jihatlarini ko'rib chiqamiz.
- `const` -- `let`ga o'xshaydi, lekin o'zgaruvchi qiymatini o'zgartirib bo'lmaydi.

O'zgaruvchilar ularning ichida nima borligini osongina tushunishimizga imkon beradigan tarzda nomlanishi kerak.