# '??' Nullish coalescing operatori

[recent browser="new"]

Nullish coalescing operatori ikkita `??` so'roq belgisi kabi yoziladi.

Uning `null` va `undefined` ga bir xil munosabatda bo'lgani sababli, biz bu maoqlada maxsus atamadan foydalanamiz. Ifoda na `null` va na `undefined` bo'lganida uni "defined" (aniqlangan) deb ataymiz.

`a ?? b` ning natijasi:
- agar `a` is aniqlangan bo'lsa, u holda `a`,
- agar `a` aniqlanmagan bo'lsa, u holda `b`.

Boshqacha qilib aytganda, `??` agar `null/undefined` bo'lmasa birinchi argument-ni, aks holda ikkinchisini qaytaradi.

Nullish coalescing operatori butunlay yangi narsa emas. Bu ikki qiymatning birinchi "aniqlangan"ini topishning uchun juda yaxshi usuli.

Biz `result = a ?? b` ni o'zimiz bilgan operatorlardan foydalanib boshqatdan quyidagi kabi yozishimiz mumkin:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Endi `??` nima vazifa bajarishi butunlay tushunarli bo'ladi. Keling u qayerda yordam berishini ko'rib chiqaylik.

`??` ning eng keng tarqalgan ishlatilish holati bu aniqlanmagan o'zgaruvchini doimiy qiymat bilan ta'minlashdir.

Misol uchun, quyida agar aniqlangan bo'lsa `user`ni, aks holda `Anonymous`ni ko'rsatamiz:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user not defined)
```

Quyida `user`ning name-ga tayinlanganidagi misoli:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user defined)
```

Biz `??` ketma-ketligidan ro'yhatdagi birinchi `null/undefined` bo'lmagan qiymatni olish uchun ham foydalanishimiz mumkin.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.
Keling, bizda `firstName`, `lastName` yoki `nickName` o'zgaruvchilarida foydalanuvchi ma'lumotlari bor deymiz. Agar foydalanuchi qiymat kiritishni xohlamasa, ularning barchasi aniqlangan bo'lmasligi ham mumkin.

Biz ushbu o'zgaruvchilardan biri yordamida foydalanuvchi ismini yoki agar ularning barchasi aniqlangan bo'lmasa "Anonymous"ni ko'rsatmoqchimiz.

Keling, buning uchun `??` operatoridan foydalanamiz:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first defined value:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## || bilan taqqoslash

[O'tgan bobda](info:logical-operators#or-finds-the-first-truthy-value) aytilgani kabi `||` OR operatori  `??` bilan bir xil ishlatilinishi mumkin. 

Misol uchun, yuqoridagi kodda `??` bilan `||` o'rnini almashtishimiz va shunga qaramay bir xil natijani olishimiz mumkin:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Tarixiy jihatdan, birinchi bo'lib faqat OR `||` operatori bo'lgan. U JavaScript boshidan beri mavjud, shuning uchun dasturchilar undan uzoq vaqt davomida shunday maqsadlarda foydalanishgan.

On the other hand, the nullish coalescing operator `??` was added to JavaScript only recently, and the reason for that was that people weren't quite happy with `||`.
Boshqa tomondan, nullish coalescing operatori `??` JavaScript-ga yaqinda qo'shilgan va buning sababi odamlar `||` bilan unchalik mamnun emasdi.

Ularning o'ratasidagi muhim farqi:
- `||` birinchi *rost* qiymatni qaytaradi.
- `??` birinchi *aniqlangan* qiymatni qaytaradi.

Boshqacha qilib aytganda, `||` `false`, `0`, bo'sh string `""` va `null/aniqlanmagan` qatorlarini ajratmaydi. Ularning barchasi bir xil -- yolg'on qiymatlar. Agar ulardan birortasi `||` ning birinchi argumenti bo'lsa, natija sifatida biz ikkinchi argumentni olamiz.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.
Amalda biz standart qiymatdan faqat o'zgaruvchi `null/undefined` bo'lganda foydalanishni xohlashimiz mumkin. Ya'ni, qiymat haqiqatan ham noma'lum/o'rnatilmagan bo'lsa.

Misol uchun, buni ko'raylik:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

- `height || 100` ifoda `height` yolg'on qiymat ekanligini tekshiradi, va u `0`, rostan ham yolg'on,
    - shunday qilib `||` ning natijasi ikkinchi argument, `100`.
- `height ?? 100` ifoda `height` `null/undefined` ekanligini tekshiradi, va bunday emas,
    - shunday qilib `height` ning natijasi "uning o'zi", ya'ni `0`.

Amalda, nol balandlik ko'pincha haqiqiy qiymat bo'lib, uni standart bilan almashtirmaslik kerak. Demak, `??` to'g'ri ish qiladi.

## Ustunlik

`??` operatorining ustunligi `||` niki bilan bir xil. Ular ikkalasi ham [MDN jadval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table)ida `4` ga teng.

Bu shuni anglatadiki, nullish coalescing operatori ham xuddi `||` kabi `=` va `?` dan avval, lekin `+`, `*` va boshqa ko'plab operatorlardan keyin hisoblanadi

Agar biz ifodada `??` bilan qiymatni boshqa operatorlar bilan ishlatishni istasak, qavslar qo'shishni ko'ramiz:

```js run
let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Aks holda, agar qavslarni tushirib qoldirsak, `??` dan yuqoriroq ustunlikka ega bo'lgani sababli `*` birinchi bajariladi va noto'g'ri natijalar keltirib chiqaradi.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### ?? ni  && yoki || bilan qo'llash

Xavfsizlik nuqtai nazaridan, ustunlik qavslar ichida aniq ko'rsatilmaguncha JavaScript `??` dan `&&` va `||` operatorlari bilan birgalikda foydalanishni taqiqlaydi.

Quyidagi kod sintaksis xatolik keltirib chiqaradi:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

Bu cheklov shubhasiz munozarali,u odamlar `||` dan `??` ga o'tishni boshlaganlarida dasturlashdagi xatolarni oldini olish maqsadida til spetsifikatsiyasiga qo'shilgan edi.

Uning atrofida ishlash uchun tashqi qavslardan foydalaning:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

alert(x); // 2
```

## Xulosa

- `??` nullish coalescing operatori ro'yhatdan birinchi "aniqlangan" qiymatni qisqa yo'l bilan tanlashning imkonini beradi.

    U o'zgaruchilarga doimiy qiymatni tayinlash uchun ishlatilinadi:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- `??` operatori juda past, `?` va `=` dan biroz balandroq ustunlikka ega, shuning uchun undan ifodada foydalanayotganda qavslarni qo'shishni hisobga oling.
- Undan `||` yoki `&&` bilan qavslarsiz foydalanish taqiqlanadi.
