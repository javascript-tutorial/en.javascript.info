# Kodlash uslubi

Bizning kodimiz iloji boricha aniq va o'qishga oson bo'lishi kerak.

Bu aslida dasturlash san'ati -- murakkab vazifani olib, uni to'g'ri va inson o'qiy oladigan tarzda kodlashdir. Bunda yaxshi kod uslubi katta yordam beradi.

## Sintaksis

Ba'zi tavsiya etilgan qoidalarga ega qo'llanma varog'i (batafsil ma'lumot uchun quyidagilarni ko'ring):

![](code-style.svg)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter a non-negative integer number`);
} else {
  alert( pow(x, n) );
}
```

-->

Qoidalar va ularning sabablarini batafsil muhokama qilab chiqamiz.

```warn header="Hech qanday \"kerak\" qoidalari yo'q
Hech narsa qat'iy belgilab qo'yilmagan. Bular shunchaki uslubiy afzalliklar, diniy ishonch(doma)lar emas. 
```

### Curly Braces Jingalak qavslar

Ko'plab JavaScript loyihalarida jingalak qavslar "Misr" uslubida ochilayotkan qavs bilan mos keladigan tugma (keyword) bilan bir qatorda yoziladi -- yangi qatorda emas. Shuningdek ochilish qavsdan oldin ham bo'sh joy bo'lishi kerak, masalan:

```js
if (condition) {
  // do this buni bajaring 
  // ...va buni 
  // ...va buni
}
```

Bir qatorli konstruksiya, masalan, `if (condition) doSomething()` muhim chekka hol hisoblanadi. Biz umuman olganda qavslardan foydalanishimiz kerakmi?
 
 Quyidagilar izohlangan variantlar, endi shunday qilib ularning o'qilishi mumkinligini o'zingiz baholay olasiz:

1. 😠 Ba'zida yangi boshlovchilar shu ishni qilishadi. Bu ish yomon! Jingalak qavslar kerak emas:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 Alohida qatorga qavslarsiz ajratish. Hech qachon bunday qilmang, yangi qatorlarni qo'shishda xato qilish oson bo'lib qoladi:
    ```js
    if (n < 0)
      alert(`Power ${n} is not supported`);
    ```
3. 😏 Qavssiz bitta qator - qisqa bo'lsa, qabul qilinadi:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 Eng yaxshi variant:
    ```js
    if (n < 0) {
      alert(`Power ${n} is not supported`);
    }
    ```

Juda qisqa kod uchun bitta qatorga ruxsat beriladi, masalan. `if (cond) return null`. Ammo kod bloki (oxirgi variant) odatda ko'proq o'qishga oson.

### Qator uzunligi

Hech kim kodning uzun gorizontal chizig'ini o'qishni yoqtirmaydi. Shuning uchun ularni ajratib olish eng yaxshi uslubdir.

Misol uchun:
```js
// backtick quotes ` satrni bir nechta qatorlarga bo'lish imkonini beradi
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

Va `if` iboralari uchun:

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

Maksimal chiziq uzunligi jamoa darajasida kelishib olinishi kerak. Odatda 80 yoki 120 belgidan iborat bo'ladi.

### Indentlar

Ikki turdagi indentlar mavjud:

- **Gorizontal indentlar: 2 yoki 4 bo'sh joy.**

    Gorizontal chekinish 2 yoki 4 bo'shliq yoki gorizontal tab belgisi (kalit `key:Tab` tugmasi) yordamida amalga oshiriladi. Qaysi birini tanlash kerak - qadimgi zamonda qolib ketkan. Hozirgi vaqtda bo'shliqlar keng tarqalgan.

    Bo'shliqlarning tablarga nisbatan afzalliklaridan biri shundaki, bo'shliqlar tab belgisiga qaraganda ko'proq moslashuvchan konfiguratsiyalarga imkon beradi.

    Masalan, biz parametrlarni ochilish qavs bilan tenglashtira olamiz, masalan:

    ```js no-beautify
    show(parameters,
         aligned, // Chap tomonda 5 ta bo'sh joy 
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **Vertikal chekinishlar: kodni mantiqiy bloklarga bo'lish uchun bo'sh qatorlar.**

    Hatto bitta funktsiyani ham ko'pincha mantiqiy bloklarga bo'lish mumkin.Quyidagi misolda o'zgaruvchilarni ishga tushirish, asosiy qaytariluvchi amal va natijani qaytarish vertikal ravishda ajratiladi:
    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Kodni o'qishga oson bo'lishiga yordam beruchi qo'shimcha yangi qator qo'shing. Vertikal chekinishsiz kodlar qatori to'qqiztadan oshish kerak emas. 

### Nuqtali vergullar

Har bir ifodadan so'ng nuqtali vergul bo'lishi kera, hatto uni tashlab ketish mumkin bo'lsa ham. 

Nuqtali vergul chindan ham ixtiyoriy bo'lgan va kamdan-kam qo'llaniladigan tillar mavjud. Lekin  JavaScriptda, ma'lum vaziyatlar bor, ularda qator uzilishi nuqtali vergul deb qaralmaydi, bu narsa kodni xatolikka moyil qiladi. Bu haqida <info:structure#semicolon> bo'limida ko'proq ko'rib chiqsangiz bo'ladi. 

Agar siz tajribali JavaScript dasturchisi bo'lsangiz, [StandardJS](https://standardjs.com/) kabi nuqtali vergulsiz kod uslubini tanlashingiz mumkin. Aks holda, yuzaga kelishi mumkin bo'lgan tuzoqlardan qochish uchun nuqtali verguldan foydalanish eng yaxshi yo'l. Aksariyat dasturchilar nuqtali vergul qo'yishadi.

### Nesting Levels

Kodni juda ko'p darajali chuqurlashtirishdan qochishga harakat qiling.

Masalan, qaytariluvchi amalda ba'zan qo'shimcha joylashtirishdan qochish uchun [`davom etish`](info:while-for#continue) ko'rsatmasidan foydalanish yaxshi fikr bo'ladi.

Misol uchun, bu jabi shartli `if` qo'shish o'rniga:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- yana bir nesting darajasi
  }
}
```

Yozishimiz mumikin:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- qo'shimcha joylashtirish darajasi yo'q
}
```

Shunga o'xshash narsani `if/else` va `return` bilan qilish mumkin.

Masalan, quyida keltirilgan ikkita konstruktsiya bir xil.

Tanlov 1:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Tanlov 2:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Ikkinchisi ko'proq o'qisa bo'ladigan, chunki `n < 01` ning "maxsus holati" erta ko'rib chiqiladi. Tekshirish tugallangandan so'ng, biz qo'shimcha joylashtirishsiz "asosiy" kod oqimiga o'tishimiz mumkin.

## Funktsiyani joylashtirish

Agar siz bir nechta "yordamchi" funktsiyalarni va ulardan foydalanadigan kodni yozayotgan bo'lsangiz, funktsiyalarni tartibga solishning uchta usuli mavjud.

1. Funktsiyalarni ularni ishlatadigan kodning *yuqorisida* e'lon qilish:

    ```js
    // *!*funksiya deklaratsiyasi*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*ulardan foydalanadigan kod*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Avval kod, keyin funksiyalar

    ```js
    // *!*funksiyalardan foydalanadigan kod*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*yordamchi funksiyalar*/!* ---
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Aralash: funktsiya birinchi marta ishlatilgan joyda e'lon qilinadi.

Ko'pincha ikkinchi variantga afzal ko'riladi.

Chunki, kod o'qiyotkanimizda birinchi bilmoqchi bo'lgan narsamiz uni *nima qilishi*dir. Agar kod birinchi kelsa, u boshidan aniq bo'lib qoladi. Shunda funksiyalarni umuman o‘qishimiz shart bo‘lmasligi ham mumkin, ayniqsa ularning nomlari ular aslida nima qilayotganini tavsiflab tursa.

## Uslub bo'yicha qo'llanmalar

Uslublar qo'lllanmasi kodni "qanday yozish" bo'yicha umumiy qoidalarni o'zida jamlagan, misol uchun, qaysi qo'shtirnoqlardan foydalanish, qancha bo'sh joy ajratish, maksimal chiziq uzunligi va hokazo va ko'plab kichik narsalar.

Jamoaning barcha a'zolari bir xil uslublar qo'llanmasidan foydalanganda, jamoaning qays a'zosi yozganidan qat'i nazar, kod bir xil ko'rinadi.

Albatta, jamoa har doim o'z uslubiy qo'llanmasini yozishi mumkin, lekin odatda bunga hojat yo'q. Tanlash uchun ko'plab mavjud qo'llanmalar mavjud.

Ba'zi mashhur tanlovlar:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (va yana ko'plari)

Agar siz yangi dasturchi bo'lsangiz, shu bo'limning boshidagi yordam beruvchi sahifadan boshlang. Keyin ko'proq g'oyalarni tanlash va qaysi biri sizga ko'proq yoqishini aniqlash uchun boshqa uslublar qo'llanmalarini ko'rib chiqishingiz mumkin.

## Avtomatlashtirilgan linterlar

Linters - bu kodingiz uslubini avtomatik ravishda tekshiradigan va takomillashtirish uchun takliflar beradigan vositalar.

Ularning ajoyib jihati shundaki, tekshirish jarayonida ular o'zgaruvchilar yoki funksiyadagi imloviy xatolikalar singari xatoliklarni ham topib beradi. Shu jihati uchun ham, xatto ma'lum bir "kod uslubi"ga bog'lanib qolishni istamasangiz ham, bundan foydalanish tavsiya etiladi. 

Ba'zi mashhur linting vositalari:

- [JSLint](https://www.jslint.com/) -- dastlabki linterlardan biri.
- [JSHint](https://jshint.com/) -- JSLint-ga qaraganda ko'proq sozlamalar.
- [ESLint](https://eslint.org/) -- ehtimol eng yangisi.

Ularning barchasi vazifani bajara oladi. Muallif [ESLint](https://eslint.org/) dan foydalanadi.

Ko'p linterlar ko'plab mashhur muharrirlar bilan birlashtirilgan: ahunchaki muharrirda plaginni yoqing va uslubni sozlang.

Masalan, ESLint uchun quyidagilarni bajarishingiz kerak bo'ladi:

1.  [Node.js](https://nodejs.org/) ni O'rnating.
2. ESLint-ni `npm install -g eslint` buyrug'i bilan o'rnating (npm bu JavaScript paketini o'rnatuvchidir).
3. JavaScript loyihangizning ildizida (barcha fayllaringiz joylashgan papkada) `.eslintrc` nomli konfiguratsiya faylini yarating.
4. ESLint bilan integratsiyalashuvchi muharrir uchun plaginni o'rnating/yoqing. Ko'pchilik muharrirlar bitta plagini bo'ladi.

`.eslintrc` fayliga misol:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": 2
  }
}
```
 
`"extends"` direkivikatsiyasi konfiguratsiya "eslint:recommended" sozlamalar to'plamiga asoslanganligini bildiradi. Shundan keyin, o'zimiznikini belgilaymiz.

Uslublar qoidalari to'plamini websitedan yuklab olib, ularni kengaytirish ham mumkin. O'rnatish haqida batafsil ma'lumot uchun <https://eslint.org/docs/user-guide/getting-started> ga qarang.

Bundan tashqari, ba'zi IDE-larda o'rnatilgan linting mavjud, bu qulay, ammo ESLint kabi moslashtirilmaydi.

## Summary

Ushbu bobda tasvirlangan barcha sintaksis qoidalari (va havola qilingan uslublar qo'llanmalari) kodingizning o'qish qobiliyatini oshirishga qaratilgan. Ularning barchasi munozarali.

"Yaxshiroq" kod yozish haqida o'ylaganimizda, o'zimizga quyidagi savollarni berishimiz kerak bo'ladi: "Nima kodni o'qilishi va tushunishni osonlashtiradi?" va "Xatolardan qochishimizga nima yordam beradi?" Bular kod uslublarini tanlash va muhokama qilishda yodda tutish kerak bo'lgan asosiy narsalar.

Mashhur uslublar bo'yicha qo'llanmalarni o'qish sizga kod uslubi tendentsiyalari va eng yaxshi amaliyotlar haqidagi so'nggi g'oyalardan xabardor bo'lish imkonini beradi.