# Izohlar

<info:structure> bobidan ma'lumki, izohlar bir qatorli `//` va ko'p qatorli `/* ... */`  bo'lishi mumkin. 

Ulardan odatda kod qanday ishlashini va nima vazifada ishlashini tasvirlashda foydalaniladi. 

Bir qarashda, izohlar aniq ko'rinadi, ammo yangi dasturlovchilar ularni ham ko'pincha noto'g'ri ishlatishadi.

## Yomon izohlar 

Boshlang'ich dasturlovchilar izohlardan ko'pincha "kodda nima sodir bo'layotkanini" tushuntirishda foydalanishga o'rganib qolishgan. Xuddi shunga o'xshash: 

```js
// Bu kod bu ishni bajaradi (...) va bu esa buni (...)
// ...yana kim nimani bilishi...
very;
complex;
code;
```

Lekin yaxshi kodda, bu kabi "sharhlovchi" izohlar minimal miqdorda bo'ladi. Haqiqatdan ham, kod bularsiz ancha o'qishga oson bo'lib qoladi.  

Bu to'g'risida bir ajoyib qoida bor: "agar kod izoh talab qiladigan darajada noaniq bo'lsa, demak izoh o'rniga kodni qaytadan yozish kerak".

### Retsept: funktsiyalarni hisobga olish

Ba'zan kod qismini funksiya bilan almashtirish foydali bo'ladi, xuddi shu kabi:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // tub son ekanligini tekshirish
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

`isPrime` funksiyasi ajratilgan eng yaxshi variant:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Hozir kodni osonlik bilan tushuna olamiz. Funksiyaning o'zi izoh bo'lib qoladi. Bunday kod *o'zini-tasvirlovchi* dep ataladi. 

### Retsept: funksiyalarni yaratish

Va agar  uzun "kod varog'i" bo'lsa:

```js
// here we add whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// here we add juice
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

So'ng, buni quyidagi kabi funksiyalarga tiklash yaxshiroq variant bo'lishi mumkin:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

Yana bir bor ta'kidlab o'tilganda, funksiyani o'zi ham nima sodir bo'layotkanini aytib turadi. Izoh berishga hech narsa yo'q. Bundan tashqari, kod tuzilishi ajratilganda yaxshiroq ishlaydi. Har bir funksiya nima vazifa bajarishi, nimani talab qilishi va nimani qaytarishi ma'lum bo'lib qoladi.

 Asilda, "tushuntiruvchi" izohlardan butunlay qochib qutilishning iloji yo'q chunki ba'zi murakkab algoritmlar mavjud. Optimallashtirish uchun aqilli "tweaklar" ham bor. Qisqa qilib aytkanda, kodni iloji boricha sodda va o'zini o'zi tasvirlab turuvchi qilib saqlash kerak.  

## Yaxshi izohlar

Demak, odatda tushuntiruvchi izohlar yomon ekan, u holda qaysi izohlar yaxshi?

Arxitektura(tuzilsh)ni tasvirlovchi. 
: Komponent(tarkibiy tuzilma)larning yuqori darajadagi umumiy ko'rinishini taqdim etadi, ular qanday o'zaro ta'sir qiladi va turli vaziyatlarda boshqaruv oqimi nima  kabilar bilan ta'minlaydi ... Qisqa qilib aytkanda -- kodga yuqoridan boqish degani. Bu kabi yuqori darajali kodni izohlab turuvchi arxitektura diagrammalarini tuzish uchun maxsus til bor [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) va bu albatta o'qib chiqishg arziydi. 

Hujjat funksiyasi parametrlari va ishlatilishi
: Funktsiyani hujjatlashtirish uchun maxsus [JSDoc](http://en.wikipedia.org/wiki/JSDoc) sintaksisi mavjud: foydalanish, parametrlar, qaytarilgan qiymat.

Misol uchun:
```js
/**
 * n-chi darajaga ko'tarilgan x ni qaytaradi.
 *
 * @param {number} x Ko'tariladigan raqam.
 * @param {number} n Daraja, tabiy son bo'lishi kerak. 
 * @return {number} x n-chi darajaga ko'tarildi.
 */
function pow(x, n) {
  ...
}
```

Bu kabi izohlar bizga funksiyani maqsadini tushunish va kodga qaramasdan turib undan to'g'ri foydalanish imkonini beradi.

Aytgancha, [WebStorm](https://www.jetbrains.com/webstorm/) kabi ko'plab muharrirlar ham ularni tushunishlari va avtomatik to'ldirish va ba'zi avtomatik kodlarni tekshirish uchun ulardan foydalanishlari mumkin.

Bundan tashqari, izohlardan HTML-hujjatlarni yaratishi mumkin bo'lgan [JSDoc 3](https://github.com/jsdoc3/jsdoc) kabi vositalar ham mavjud. JSDoc haqida batafsil ma'lumotni <http://usejsdoc.org/> sahifasida o'qishingiz mumkin.
Also, there are tools like [JSDoc 3](https://github.com/jsdoc/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <https://jsdoc.app>.

Nima uchun vazifa bu tarzda hal qilinadi?
: Yozilgan narsa muhim. Lekin, sodir bo'layotkan narsalarni tushunish uchun esa yozilmagan narsa undan ham muhim bo'lishi mumkin. Nima uchun vazifa aynan shu tarzda hal qilingan? Kod javob bermaydi.

    Agar vazifani hal qilishning ko'plab usullari mavjud bo'lsa, nima uchun bu? Ayniqsa, bu eng aniq bo'lmaganda.

    Bunday izohlarsiz quyidagi vaziyat yuzaga kelishi mumkin:
    1. Siz (yoki sizning hamkasbingiz) bir muncha vaqt oldin yozilgan kodni ochasiz va uning "suboptimal" ekanligini ko'rasiz.
    2. Siz: "O'sha paytda men qanchalik ahmoq edim va hozir qanchalik aqlliman" deb o'ylaysiz va "aniqroq va to'g'ri" variantidan foydalanib qayta yozasiz.
    3. ...Qayta yozishga istak yaxshi edi. Lekin, jarayonni o'zida, "aniqroq" yechim yetishmayotkanini ko'rasiz. Ancha avval harakat qilib ko'rganligingiz tufayli buni uncha eslolmaysiz ham. To'g'ri variantga qaytasiz, ammo orada vaqt behuda ketdi. 

    Yechimni tushuntiruvchi izohlar juda muhim. Ular dasturlashni to'g'ri yo'lda davom ettirishga yordam beradi.

Kodning nozik xususiyatlari bormi? Ular qayerda ishlatiladi?
: Agar kodda nozik va intuitiv bo'lgan narsa bo'lsa, albatta izoh berishga arziydi.

## Xulosa

Yaxshi dasturlovchining muhim belgisi izohlardir: Ularning borligi va hatto yo'qligi ham.

Yaxshi sharhlar kodni yaxshi saqlashga, kechikishdan so'ng unga qaytishga va undan samaraliroq foydalanishga imkon beradi.

**Bunga izoh bering:**

- Umumiy arxitektura, yuqori darajadagi ko'rinish.
- Funktsiyadan foydalanish.
- Muhim yechimlar, ayniqsa darhol aniq bo'lmaganda.

**Fikr bildirishdan saqlaning:**

- Bu "kod qanday ishlaydi" va "nima qiladi". 
- Agar kodni talab qilmaydigan darajada sodda va o'zini o'zi tavsiflash imkoni bo'lmasa, ularni kiriting.

Izohlar shuningdek JSDoc3 kabi avtomatik hujjatlashtirish vositalari uchun ham qo'llaniladi: ular ularni o'qiydi va HTML-hujjatlarni (yoki boshqa formatdagi hujjatlarni) yaratadi.