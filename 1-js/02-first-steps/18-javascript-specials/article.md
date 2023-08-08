# JavaScript spetsifikatsiyalari

Ushbu bobda biz hozirgacha o'rgangan JavaScript-ning xususiyatlarini qisqacha ko'rib chiqamiz va nozik nuqtalarga alohida e'tibor qaratamiz.

## Kod tuzilishi

Ifodalar nuqtali vergul bilan ajratiladi:

```js run no-beautify
alert('Hello'); alert('World');
```

Odatda, line-break ga ham ajratuvchi sifatida qaraladi, shuning uchun u ham ishlatilinadi:

```js run no-beautify
alert('Hello')
alert('World')
```

Bu "avtomatik nuqtali-vergul qo'yish" deb ataladi. Ba'zan u ishlamaydi, masalan:

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

Ko'pgina kod uslubi qo'llanmalari har bir ifodadan keyin nuqtali-vergul qo'yish kerak degan fikrni maqullaydi.

`{...}` kod bloklari va ular bilan loop kabi sintaksis tuzilmalaridan keyin nuqtali-vergul qoʻyish shart emas:

```js
function f() {
  // no semicolon needed after function declaration
}

for(;;) {
  // no semicolon needed after the loop
}
```

...Lekin agar biror joyga "oshiqcha" nuqtali-vergul qo'ysak ham, bu xatolik emas. Bu hisobga olinmaydi.

Ko'proq: <info:structure> da.

## Qat'iy rejim

Zamonaviy JavaScript-ning barcha xususiyatlarini to'liq faollashtirish uchun skriptlarni `"use strict"` bila boshlashimiz kerak.

```js
'use strict';

...
```

Direktiv skriptning yuqori qismida yoki funktsiya tanasining boshida bo'lishi kerak.

`"Qat'iy rejim"`siz hamma narsa ishlayveradi, lekin ba'zi xususiyatlar eskicha, "mos keluvchan" usulda ishlaydi. Biz odatda zamonaviy usulni afzal ko'ramiz.
Without `"use strict"`, everything still works, but some features behave in the old-fashioned, "compatible" way. We'd generally prefer the modern behavior.

Tilning ba'zi zamonaviy xususiyatlari (masalan, biz keyinroq o'rganadigan class-lar) qat'iy rejimni bilvosita faollashtiradi.

Ko'proq: <info:strict-mode> da.

## O'zgaruvchilar

Quyidagilar yordamida e'lon qilinadi:

- `let`
- `const` (konstanta, o'zgartirib bo'lmas)
- `var` (eski-uslubda, keyinroq ko'ramiz)

O'zgaruvchi nomi o'z ichiga quyidagilarni olishi mumkin:
- Harflar va raqamlar, lekin birinchi belgi raqam bo'la olmaydi.
- `$` va `_` belgilar odatda, harflar bilan teng.
- Lotin bo'lmagan alifbo va ierogliflarga ham ruxsat berilgan, lekin ulardan keng qo'llanilmaydi.

O'zgaruvchilar dinamik ravishda yoziladi. Ular istalgan qiymatni saqlay oladi:

```js
let x = 5;
x = "John";
```

8 ta ma'lumot turi mavjud:

- `number` kasr nuqta va butun sonlar uchun,
- `bigint` katta o'lchamli butun sonlar uchun,
- `string` satirlar uchun,
- `boolean` mantiqiy qiymatlar uchun: `true/false`,
- `null` -- "bo'sh" yoki "mavjud emas"ni anglatuvchi yagona `null` qiymatga ega tur ,
- `undefined` -- "e'lon qilinmagan"ni anglatuvchi yagona `undefined` qiymatga ega tur, 
- `object` va `symbol` -- murakkab ma'lumotlar tuzilmalari va noyob identifikatorlar uchun, biz ularni hali o'rganmaganmiz.

`typeof` operatori qiymatning turini qaytaradi, lekin ikkita istisno mavjud:
```js
typeof null == "object" // error in the language
typeof function(){} == "function" // functions are treated specially
```

Ko'proq: <info:variables> va <info:types> da.

## O'zaro ta'sir

Biz ishlash muhiti sifatida brauzerdan foydalanamiz, shuning uchun asosiy UI funktsiyalari quyidagilar bo'ladi:

[`prompt(savol, [default])`](mdn:api/Window/prompt)
:`savol` so'raydi va foydalanuvchi kiritgan qiymatni yoki agar "bekor qilish" ni bossa `null`ni qaytaradi.

[`confirm(savol)`](mdn:api/Window/confirm)
:`savol` so'raydi va Ok yoki Cancel dan birini tanlash imkinini beradi. Tanlov `true/false` bo'lib qaytariladi.

[`alert(habar)`](mdn:api/Window/alert)
:`habar`ni chiqaradi.

Bu funksiyalarning barchasi *modal* bo‘lib, ular kod bajarilishini to‘xtatib turadi va tashrif buyuruvchi javob bermaguncha sahifa bilan o‘zaro aloqa qilishiga yo‘l qo‘ymaydi.

Masalan:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName ); // Alice
alert( "Tea wanted: " + isTeaWanted ); // true
```

Ko'proq: <info:alert-prompt-confirm> da.

## Operatorlar

JavaScript quyidagi operatorlarni qo'llab-quvvatlaydi:

Arifmetik
: Doimiy: `* + - /`, `%` qoldiq uchun va `**` sonning darajasi uchun.

    Binar plus `+` string-larni birlashtiradi. Va agar operandlardan biri string bo'lsa, qolgani ham string-ga konvertatsiya qilinadi.

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Tayinlashlar
: Oddiy tayinlash mavjud: `a = b` va u `a *= 2` ga o'xshaganlarni biriktiradi.

Bitwise
: Bitwise operatorlar juda past, bit-darajadagi 32-bitli butun sonlar bilan ishlaydi : kerak bo'lganda [docs](mdn:/JavaScript/Guide/Expressions_and_Operators#Bitwise) dan ko'ring.
: Bitwise operators work with 32-bit integers at the lowest, bit-level: see the [docs](mdn:/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) when they are needed.

Shart
: Uchta parametrga ega yagona operator: `cond ? resultA : resultB`. Agar `cond` rost bo'lsa, `resultA` ni, aks holda `resultB` ni qaytaradi.

Mantiqiy operatorlar
: Mantiqiy AND `&&` va OR `||` kichik doirali hisoblashni amalga oshiradi va to'xtagan joyidagi qiymatni qaytaradi (  `true`/`false` kerak emas). Mantiqiy NOT `!` operandni boolean turga aylantiradi va uning teskari qiymatini qaytaradi.

Nullish coalescing operator
: `??` operatori o'zgaruvchilar ro'yhatidan e'lon qilingan qiymatni tanlash imkonini beradi. `a ?? b` ning natijasi u `null/undefined` bo'lmaguncha `a` ga, keyin `b` ga teng.

 Taqqoslashlar
: Tenglik tekshiruvi `==` xar hil turgadi qiymatlarni (`null` va `undefined` dan tashqari, chunki ular bir-biridan boshqa hechn narsaga teng emas) songa aylantiradi , shunday qilib, ular teng bo'ladi:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Boshqa taqqoslashlar ham songa aylantiradi albatta.

    Qat'iy tenglik tekshiruve `===` konvertatsiyani amalga oshirmaydi: xar hil turlar u uchun turli qiymatlar hisoblanadi.

    `null` va `undefined` lar maxsus qiymatlardir: ular bir-biriga teng `==` va boshqa hech narsaga teng emas.

    Kattaroq/kichikroq taqqoslashlar string-larni belgima-belgi solishtiradi, boshqa turlar esa songa aylantiriladi.

Boshqa operatorlar
: Yana ba'zi boshqa operatorlar ham mavjud, vergul operatori kabi.

Ko'proq: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator> da.

## Loop-lar

- Biz loop-larning 3 ta turini ko'rib chiqdik:

    ```js
    // 1
    while (condition) {
      ...
    }

    // 2
    do {
      ...
    } while (condition);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- `for(let...)` loop-da e'lon qilingan o'zgaruvchi faqat loop ichida ko'rinadi. Ammo biz `let` ni tushirib qoldirishimiz va joriy o'zgaruvchidan qayta foydalanishimiz mumkin.
- `break/continue` direktivlari loop/joriy iteratsiyadan chiqish imkonini beradi. Ichma-ich loop-larni buzish uchun label-lardan foydalaning.

Ko'proq ma'mulot uchun: <info:while-for>.

Keyinchalik biz object-lar bilan ishlash uchun ko'proq turdagi loop-larni o'rganamiz.

## "switch" tuzilmasi

"switch" tuzilmasi bir nechta `if` tekshiruvlarini o'rnini bosa oladi. U taqqoslashlar uchun `===` (qat'iy tenglik) dan foydalanadi.

Masalan:

```js run
let age = prompt('Your age?', 18);

switch (age) {
  case 18:
    alert("Won't work"); // the result of prompt is a string, not a number
    break;

  case "18":
    alert("This works!");
    break;

  default:
    alert("Any value not equal to one above");
}
```

Ko'proq ma'lumot uchun: <info:switch>.

## Funktsiyalar

Biz JavaScript-da funksiya yaratishning uchta usulini ko'rib chiqdik:

1. Function Declaration: asosiy kod oqimidagi funktsiya

    ```js
    function sum(a, b) {
      let result = a + b;

      return result;
    }
    ```

2. Function Expression: ifoda kontekstidagi funksiya

    ```js
    let sum = function(a, b) {
      let result = a + b;

      return result;
    };
    ```

3. Arrow funktsiyalar
3. Arrow functions:

    ```js
    // expression on the right side
    let sum = (a, b) => a + b;

    // or multi-line syntax with { ... }, need return here:
    let sum = (a, b) => {
      // ...
      return a + b;
    }

    // without arguments
    let sayHi = () => alert("Hello");

    // with a single argument
    let double = n => n * 2;
    ```


- Funktsiyalar mahalliy o'zgaruvchilarga ega bo'lishi mumkin: uning tanasi ichida yoki parametrlari ro'yhati e'lon qilingan. Bunday o'zgaruvchilarni faqat funktsiya ichidan ko'rsa bo'ladi.
- Parameterlar doimiy qiymatga ega bo'lishi mumkin: `function sum(a = 1, b = 2) {...}`.
- Funktsiyalar har doim nimadur qaytaradi. Agar `return` ifodasi bo'lmasa, u holda natija `undefined` bo'ladi.

Ma'lumot uchun: <info:function-basics>, <info:arrow-functions-basics>.

## Hali davom etadi

Bu JavaScript xususiyatlarining qisqacha ro'yxati edi. Hozircha biz faqat asosiy narsalarni o'rgandik. Kelgusi darsliklarda siz JavaScript-ning boshqa maxsus va ilg'or xususiyatlarini topasiz.
