
# O'zgaruvchi doirasi, Closure

JavaScript juda funktsiyaga yo'naltirilgan tildir. Bu bizga katta erkinlik beradi. Funktsiya istalgan vaqtda yaratilishi, boshqa funktsiyaga argument sifatida uzatilishi va keyin kodning butunlay boshqa joyidan chaqirilishi mumkin.

Biz allaqachon bilamizki, funktsiya undan tashqaridagi o'zgaruvchilarga ("tashqi" o'zgaruvchilarga) kira oladi.

Ammo funktsiya yaratilgandan keyin tashqi o'zgaruvchilar o'zgarsa nima bo'ladi? Funktsiya yangi yoki eski qiymatlarni oladimi?

Va agar funktsiya argument sifatida uzatilsa va kodning boshqa joyidan chaqirilsa, u yangi joyda tashqi o'zgaruvchilarga kirish huquqiga ega bo'ladimi?

Keling, ushbu va yanada murakkab stsenariylarni tushunish uchun bilimimizni kengaytiraylik.

`` ``smart header="Bu yerda `let/const` o‘zgaruvchilari haqida gaplashamiz"
JavaScriptda o'zgaruvchini e'lon qilishning 3 ta usuli mavjud: `let`, `const` (zamonaviylar) va `var` (o'tmish qoldig'i).

- Ushbu maqolada biz misollarda `let` o'zgaruvchilardan foydalanamiz.
- `const` bilan e'lon qilingan o'zgaruvchilar xuddi shunday harakat qiladilar, shuning uchun bu maqola `const` haqida ham.
- Eski `var` ba`zi sezilarli farqlarga ega, ular <info:var> maqolasida yoritiladi.
```
```
## Kod bloklari

Agar oʻzgaruvchi `{...}` kod blokida eʼlon qilingan boʻlsa, u faqat shu blok ichida koʻrinadi.

Masalan:

```js run
{
  // tashqarida ko'rinmasligi kerak bo'lgan mahalliy o'zgaruvchilar bilan ba'zi ishlarni bajaring

  let message = "Hello"; // faqat ushbu blokda ko'rinadi

  alert(message); // Salom
}

alert(message); // Error: message undefined
```

Biz bundan o'z vazifasini bajaradigan, faqat unga tegishli bo'lgan o'zgaruvchilar bilan kod qismini ajratish uchun foydalanishimiz mumkin:

```js run
{
  // message ni ko'rsatish
  let message = "Hello";
  alert(message);
}

{
  // boshqa message ni ko'rsatish
  let message = "Goodbye";
  alert(message);
}
```

``smart header="Bloksiz xatolik yuz beradi"
E'tibor bering, alohida bloklarsiz, mavjud o'zgaruvchi nomi bilan `let` dan foydalansak, xato bo'ladi:

```js run
// messageni ko'rsatish
let message = "Hello";
alert(message);

// boshqa message ni ko'rsatish
*!*
let message = "Goodbye"; // Error: o'zgaruvchi allaqachon e'lon qilingan
*/!*
alert(message);
```
``

`if`, `for`, `while` va hokazolar uchun `{...}` da e`lon qilingan o`zgaruvchilar ham faqat ichida ko`rinadi:

```js run
if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Error, bunday o'zgaruvchi yo'q
```

Bu yerda `if` tugagandan so‘ng, quyidagi `alert` `phrase`ni ko‘rmaydi, shuning uchun error chiqadi.

Bu juda zo'r, chunki u bizga `if` tarmog'iga xos bo'lgan blok-lokal o'zgaruvchilarni yaratishga imkon beradi.

Xuddi shunday narsa `for` va `while` sikllari uchun ham amal qiladi:

```js run
for (let i = 0; i < 3; i++) {
  // i o'zgaruvchisi faqat buning ichida ko'rinadi
  alert(i); // 0, keyin 1, keyin 2
}

alert(i); // Error, bunday o'zgaruvchi yo'q
```

Vizual ravishda `let i` `{...}` dan tashqarida. Lekin bu yerda `for` konstruksiyasi alohida ahamiyatga ega: uning ichida e’lon qilingan o‘zgaruvchi blokning bir qismi hisoblanadi.

## Ichma-ich funktsiyalar

Funktsiya boshqa funktsiya ichida yaratilganda "nested" deb ataladi.

Buni JavaScript bilan osonlik bilan qilish mumkin.

Biz undan kodimizni tartibga solish uchun foydalanishimiz mumkin, masalan:

```js
function sayHiBye(firstName, lastName) {

  // quyida foydalanish uchun yordamchi ichki funksiya
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
```

Bu yerda qulaylik uchun *nested* funksiyasi `getFullName()` yaratilgan. U tashqi o'zgaruvchilarga kirishi mumkin va shuning uchun to'liq ismni qaytarishi mumkin. JavaScriptda ichki o'rnatilgan funktsiyalar juda keng tarqalgan.

Qizig'i shundaki, o'rnatilgan funktsiyani qaytarish mumkin: yangi ob'ektning mulki sifatida yoki natijada o'zi. Keyin uni boshqa joyda ishlatish mumkin. Qaerda bo'lishidan qat'i nazar, u hali ham bir xil tashqi o'zgaruvchilarga kirish huquqiga ega.

Quyida `makeCounter` har bir chaqiruvda keyingi raqamni qaytaruvchi “hisoblagich” funksiyasini yaratadi:

```js run
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
```

Ushbu kodning sodda bo'lishiga qaramay, biroz o'zgartirilgan variantlari, masalan, avtomatlashtirilgan testlar uchun tasodifiy qiymatlarni yaratish uchun [tasodifiy raqamlar generatori] (https://en.wikipedia.org/wiki/Pseudorandom_number_generator) sifatida amaliy qo'llanilishiga ega.

U qanday ishlaydi? Agar biz bir nechta hisoblagich yaratsak, ular mustaqil bo'ladimi? Bu erda o'zgaruvchilar bilan nima sodir bo'lmoqda?

Bunday narsalarni tushunish JavaScript-ni umumiy bilish uchun juda yaxshi va murakkabroq stsenariylar uchun foydalidir. Shunday qilib, keling, bir oz chuqurroq boraylik.

## Leksik muhit

```warn header="Bu yerda ajdarlar!"
Chuqur texnik tushuntirish oldinda.

Men past darajadagi til tafsilotlaridan qochishni istardim, ularsiz har qanday tushunish kam va to'liq bo'lmaydi, shuning uchun tayyorlaning.
```

Aniqlik uchun tushuntirish bir necha bosqichlarga bo'lingan.

### 1-qadam. O'zgaruvchilar

JavaScript-da har bir ishlaydigan funksiya, `{...}` kod bloki va umuman skript *Leksik muhit* deb nomlanuvchi ichki (yashirin) bog'langan ob'ektga ega.

Leksik muhit obyekti ikki qismdan iborat:

1. *Atrof-muhit yozuvi* -- barcha mahalliy o'zgaruvchilarni o'z xususiyatlari sifatida saqlaydigan ob'ekt (va "bu" qiymati kabi boshqa ma'lumotlar).
2. Tashqi kod bilan bog'liq bo'lgan *tashqi leksik muhitga* havola.

**"O'zgaruvchi" bu faqat maxsus ichki ob'ekt, 'Atrof-muhit yozuvi' xususiyatidir. "O'zgaruvchini olish yoki o'zgartirish" "ushbu ob'ektning xususiyatini olish yoki o'zgartirish" degan ma'noni anglatadi.**

Funktsiyasiz ushbu oddiy kodda faqat bitta leksik muhit mavjud:

![lexical environment](lexical-environment-global.svg)

Bu butun skript bilan bog'langan *global* Leksik muhit deb ataladi.

Yuqoridagi rasmda to'rtburchak atrof-muhit yozuvi (o'zgaruvchi ombori) va o'q tashqi ma'lumotni anglatadi. Global leksik muhitda tashqi havola yo'q, shuning uchun o'q `null` ni ko'rsatadi.

Kod bajarila boshlagach va davom etar ekan, leksik muhit o'zgaradi.

Quyida bir oz ko'proq kod:

![lexical environment](closure-variable-phrase.svg)

O'ng tomondagi to'rtburchaklar global leksik muhitning bajarilishi davomida qanday o'zgarishini ko'rsatadi:

1. Skript boshlanganda, leksik muhit barcha e'lon qilingan o'zgaruvchilar bilan oldindan to'ldiriladi.
    - Dastlab, ular "Boshlanmagan" holatidadir. Bu maxsus ichki holat, ya'ni vosita o'zgaruvchi haqida biladi, lekin `let` bilan e'lon qilinmaguncha unga havola qilib bo'lmaydi. Bu o'zgaruvchi mavjud bo'lmagani bilan deyarli bir xil.
2. Shundan so'ng `let phrase` ta'rifi paydo bo'ladi. Hali hech qanday topshiriq yoʻq, shuning uchun uning qiymati `undefined`. Biz o'zgaruvchini shu nuqtadan oldinga ishlatishimiz mumkin.
3. `phrase` qiymat tayinlanadi.
4. `phrase` qiymatini o'zgartiradi.

Hozircha hamma narsa oddiy ko'rinadi, shunday emasmi?

- O'zgaruvchi - bu hozir bajarilayotgan blok/funksiya/skript bilan bog'langan maxsus ichki ob'ektning xossasi.
- O'zgaruvchilar bilan ishlash aslida ushbu ob'ektning xususiyatlari bilan ishlashdir.

```smart header="Leksik muhit spetsifikatsiya ob'ektidir"
"Leksik Muhit" spetsifikatsiya ob'ektidir: u faqat [til spetsifikatsiyasida] (https://tc39.es/ecma262/#sec-lexical-environments) narsalar qanday ishlashini tasvirlash uchun "nazariy jihatdan" mavjud. Biz ushbu ob'ektni kodimizga kirita olmaymiz va uni to'g'ridan-to'g'ri boshqara olmaymiz.

JavaScript dvigatellari, shuningdek, ko'rinadigan xatti-harakatlar tavsiflanganidek qolsa, uni optimallashtirishi, xotirani saqlash va boshqa ichki fokuslarni bajarish uchun foydalanilmaydigan o'zgaruvchilarni o'chirishi mumkin.
```

### 2-qadam. Funktsiya deklaratsiyasi

Funktsiya ham o'zgaruvchi kabi qiymatdir.

**Farqi shundaki, Funktsiya deklaratsiyasi darhol to'liq ishga tushiriladi.**

Leksik muhit yaratilganda, Funktsiya deklaratsiyasi darhol foydalanishga tayyor funktsiyaga aylanadi (`let` dan farqli o'laroq, bu deklaratsiyagacha yaroqsiz).

Shuning uchun biz Funktsiya deklaratsiyasi deb e'lon qilingan funktsiyani deklaratsiyadan oldin ham ishlatishimiz mumkin.

Masalan, funktsiyani qo'shganda global leksik muhitning dastlabki holati:

![](closure-function-declaration.svg)

Tabiiyki, bu xatti-harakat faqat funksiya deklaratsiyasiga taalluqlidir, bunda biz o‘zgaruvchiga funktsiya tayinlashimiz mumkin emas, masalan, `let say = function(name)...` kabi.

### 3-qadam. Ichki va tashqi leksik muhit

Funktsiya ishga tushganda, qo'ng'iroq boshida, qo'ng'iroqning mahalliy o'zgaruvchilari va parametrlarini saqlash uchun avtomatik ravishda yangi Leksik muhit yaratiladi.

Masalan, `say("John")` uchun u shunday ko'rinadi (bajarish strelka bilan belgilangan qatorda):

<!--
    ```js
    let phrase = "Hello";

    function say(name) {
     alert( `${phrase}, ${name}` );
    }

    say("John"); // Hello, John
    ```-->

![](lexical-environment-simple.svg)

Funktsiyani chaqirish paytida bizda ikkita leksik muhit mavjud: ichki (funktsiya chaqiruvi uchun) va tashqi (global):

- Ichki leksik muhit `say` amaldagi bajarilishiga mos keladi. U bitta xususiyatga ega: `name`, funktsiya argumenti. Biz `say("John")` deb chaqirdik, shuning uchun `name` qiymati `"John"`.
- Tashqi leksik muhit global leksik muhitdir. Unda `phrase` o'zgaruvchisi va funksiyaning o'zi mavjud.

Ichki leksik muhit `tashqi` muhitga ishora qiladi.

**Kod o‘zgaruvchiga kirishni istasa -- avval ichki leksik muhit, so‘ngra tashqi, so‘ngra ko‘proq tashqi va global bo‘lgunga qadar qidiriladi.**

Agar o'zgaruvchi hech qanday joyda topilmasa, bu qat'iy rejimdagi xatodir (`use strict`siz, mavjud bo'lmagan o'zgaruvchiga tayinlash eski kod bilan moslik uchun yangi global o'zgaruvchini yaratadi).

Ushbu misolda qidiruv quyidagicha davom etadi:

- `name` o'zgaruvchisi uchun `say` ichidagi `alert` uni darhol ichki leksik muhitda topadi.
- Agar u `phrase` ga kirishni xohlasa, u holda mahalliy `phrase` yo'q, shuning uchun u tashqi leksik muhitga havolani kuzatib boradi va uni o'sha yerda topadi.

![lexical environment lookup](lexical-environment-simple-lookup.svg)


### 4-qadam. Funktsiyani qaytarish

Keling, `makeCounter` misoliga qaytaylik.

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

Har bir `makeCounter()` chaqiruvining boshida ushbu `makeCounter` ishga tushirilishi uchun o‘zgaruvchilarni saqlash uchun yangi Leksik muhit obyekti yaratiladi.

Shunday qilib, bizda yuqoridagi misoldagi kabi ikkita ichki leksik muhit mavjud:

![](closure-makecounter.svg)

Farqi shundaki, `makeCounter()` bajarilayotganda faqat bitta qatordan kichik ichki funksiya yaratiladi: `return count++`. Biz uni hali ishga tushirmayapmiz, faqat yaratamiz.

Barcha funktsiyalar ular yaratilgan leksik muhitni eslab qoladi. Texnik jihatdan bu yerda hech qanday sehr yo‘q: barcha funksiyalar funksiya yaratilgan leksik muhitga havolani saqlaydigan `[[Atrof-muhit]]` nomli yashirin xususiyatga ega:

![](closure-makecounter-environment.svg)

Demak, `counter.[[Atrof-muhit]]` `{count: 0}` Leksik muhitga havolaga ega. Funktsiya qayerda chaqirilganidan qat'i nazar, qayerda yaratilganligini shunday eslab qoladi. `[[Atrof-muhit]]` mos yozuvi funksiya yaratish vaqtida bir marta va abadiy oʻrnatiladi.

Keyinchalik, `counter()` chaqirilganda, qo'ng'iroq uchun yangi Leksik Muhit yaratiladi va uning tashqi Leksik Muhit havolasi `counter[[Environment]]`dan olinadi:

![](closure-makecounter-nested-call.svg)

Endi `counter()` ichidagi kod `count` o‘zgaruvchisini qidirganda, u avval o‘zining leksik muhitini (bo‘sh, chunki u yerda mahalliy o‘zgaruvchilar yo‘q), so‘ngra tashqi `makeCounter()` chaqiruvining leksik muhitini qidiradi, qaerdan topadi va o'zgartiradi.

**O'zgaruvchi o'zi yashaydigan leksik muhitda yangilanadi.**

Ijrodan keyingi holat:

![](closure-makecounter-nested-call-2.svg)

Agar biz `counter()` ni bir necha marta chaqirsak, `count` o‘zgaruvchisi bir joyda `2`, `3` va hokazolarga ko‘payadi.

``smart header="Yopish(closure)"
Ishlab chiquvchilar odatda bilishi kerak bo'lgan "closure" degan umumiy dasturlash atamasi mavjud.

[yopish](https://en.wikipedia.org/wiki/Closure_(computer_programming)) bu tashqi oʻzgaruvchilarni eslab qoladigan va ularga kira oladigan funksiyadir. Ba'zi tillarda bu mumkin emas yoki funksiya uni amalga oshirish uchun maxsus tarzda yozilishi kerak. Ammo yuqorida aytib o'tilganidek, JavaScriptda barcha funktsiyalar tabiiy ravishda yopiladi (faqat bitta istisno mavjud, <info:new-function> da yoritiladi).

Ya'ni: ular yashirin `[[Environment]]` xususiyati yordamida qayerda yaratilganligini avtomatik ravishda eslab qoladi va keyin ularning kodi tashqi o'zgaruvchilarga kira oladi.

Intervyuda frontend dasturchisiga “closure(yopilish) nima?” degan savol beriladi, toʻgʻri javob closurening taʼrifi va JavaScriptdagi barcha funksiyalar closure ekanligini tushuntirish va texnik tafsilotlar haqida yana bir necha soʻz boʻlishi mumkin: `[[Environment]]` xususiyati va Leksik muhitlar qanday ishlashi.
``

## Axlat yig'ish

Odatda, funktsiya chaqiruvi tugagandan so'ng, leksik muhit barcha o'zgaruvchilar bilan xotiradan o'chiriladi. Buning sababi, unga havolalar yo'q. Har qanday JavaScript ob'ekti kabi, u faqat mavjud bo'lganda xotirada saqlanadi.

Ammo, agar funktsiya tugaganidan keyin ham kirish mumkin bo'lgan ichki o'rnatilgan funksiya mavjud bo'lsa, u lug'aviy muhitga havola qiluvchi `[[Environment]]` xususiyatiga ega.

Bunday holda, leksik muhitga funktsiya tugagandan keyin ham kirish mumkin, shuning uchun u tirik qoladi.

Masalan:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] tegishli f() chaqiruvining leksik muhitiga havolani saqlaydi
```

E'tibor bering, agar `f()` ko'p marta chaqirilsa va natijada olingan funksiyalar saqlangan bo'lsa, barcha mos keladigan Leksik muhit ob'ektlari ham xotirada saqlanib qoladi. Quyidagi kodda ularning uchtasi:

```js
function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// Massivda 3 ta funksiya, ularning har biri leksik muhitga bog'langan
// mos keladigan f() ishga tushirishdan
let arr = [f(), f(), f()];
```

Lexical Environment ob'ekti erishib bo'lmaydigan holga kelganda o'ladi (xuddi boshqa har qanday ob'ekt kabi). Boshqacha qilib aytganda, u faqat unga havola qiluvchi kamida bitta ichki funksiya mavjud bo'lganda mavjud.

Quyidagi kodda, ichki o'rnatilgan funksiya o'chirilgandan so'ng, uni o'rab turgan leksik muhit (va shuning uchun `value` xotiradan tozalanadi:

```js
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g funktsiyasi mavjud bo'lganda, qiymat xotirada qoladi

g = null; // ...va endi xotira tozalandi
```

### Real hayotdagi optimallashtirish

Ko'rib turganimizdek, nazariy jihatdan funktsiya tirikligida barcha tashqi o'zgaruvchilar ham saqlanib qoladi.

Lekin amalda JavaScript dvigatellari buni optimallashtirishga harakat qiladi. Ular o'zgaruvchilardan foydalanishni tahlil qiladilar va agar koddan tashqi o'zgaruvchi ishlatilmaganligi aniq bo'lsa, u o'chiriladi.

**V8 (Chrome, Edge, Opera) ning muhim yon ta'siri shundaki, bunday o'zgaruvchi disk raskadrovkada mavjud bo'lmaydi.**

Quyidagi misolni Chrome brauzerida Developer Tools ochiq holda ishga tushirib ko‘ring.

U to'xtatilganda, konsolda `alerr(value)` ni kiriting.

```js run
function f() {
  let value = Math.random();

  function g() {
    debugger; // konsolda: alert(value) yozing; Bunday o'zgaruvchi yo'q!
  }

  return g;
}

let g = f();
g();
```

Ko'rib turganingizdek -- bunday o'zgaruvchi yo'q! Nazariy jihatdan, unga kirish mumkin bo'lishi kerak, ammo dvigatel uni optimallashtirdi.

Bu nosozliklarni tuzatish bilan bog'liq kulgili (agar ko'p vaqt talab qilmasa) olib kelishi mumkin. Ulardan biri -- kutilgan o'rniga bir xil nomli tashqi o'zgaruvchini ko'rishimiz mumkin:

```js run global
let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // konsolda: alert(value) yozing; Syurpriz!
  }

  return g;
}

let g = f();
g();
```

V8 ning bu xususiyati bilish yaxshi. Agar siz Chrome/Edge/Opera bilan debugging qilsangiz, ertami-kechmi siz uni uchratasiz.

Bu tuzatuvchidagi xato emas, balki V8 ning o'ziga xos xususiyati. Ehtimol, qachondir o'zgartiriladi. Siz har doim ushbu sahifadagi misollarni ishga tushirish orqali buni tekshirishingiz mumkin.
