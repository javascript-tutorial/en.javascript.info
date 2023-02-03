# Sana va vaqt

Keling, yangi o'rnatilgan ob'ekt bilan tanishamiz: [Date](mdn:js/Date). U sana, vaqtni saqlaydi va sana/vaqtni boshqarish metodlarini taqdim etadi.

Masalan, biz uni yaratish/o'zgartirish vaqtlarini saqlash, vaqtni o'lchash yoki joriy sanani chop etish uchun ishlatishimiz mumkin.

## Yaratilishi

Yangi `Date` ob'ektini yaratish uchun quyidagi argumentlardan biri bilan `new Date()` ga chaqiruv qiling:

`new Date()`
: Argumentlarsiz – joriy sana va vaqt uchun `Date` ob'ektini yarating:

    ```js run
    let now = new Date();
    alert( now ); // joriy sana/vaqtni ko'rsatadi
    ```

`new Date(milliseconds)`
: 1970-yil 1-yanvar UTC+0 dan keyin oʻtgan millisekundlar soniga (1/1000 soniya) teng vaqtga ega `Date` ob'ektini yarating.

    ````js run
    // 0 degani 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // endi 24 soat qo'shing, 02.01.1970 UTC+0 oling
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ````
    ``

    1970-yil boshidan buyon oʻtgan millisekundlar sonini ifodalovchi butun songa _timestamp_ deyiladi.

``    
Bu sananing yengil raqamli tasviri. Biz har doim`new Date(timestamp)`yordamida vaqt tamg'asidan sana yaratishimiz va mavjud "Sana" ob'ektini`date.getTime()` metodi yordamida vaqt belgisiga aylantirishimiz mumkin (pastga qarang).

    D01.01.1970 dan oldingi ates salbiy vaqt belgilariga ega, e.g.:
    ```js run
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Agar bitta argument bo'lsa va u satr bo'lsa, u avtomatik ravishda tahlil qilinadi. Algoritm `Date.parse` ishlatadigan bilan bir xil, biz buni keyinroq ko'rib chiqamiz.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // Vaqt belgilanmagan, shuning uchun GMT yarim tunda bo'lishi taxmin qilinmoqda va
    // kod ishlayotgan vaqt zonasiga qarab o'rnatiladi
    // Shunday qilib, natija bo'lishi mumkin
    // 2017-yil 26-yanvar, 11:00:00 GMT+1100 (Avstraliyaning Sharqiy kunduzi vaqti)
    // yoki
    // 2017 yil 25-yanvar chorshanba 16:00:00 GMT-0800 (Tinch okeani standart vaqti)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Mahalliy vaqt mintaqasida berilgan komponentlar bilan sana yarating. Faqat birinchi ikkita dalil majburiydir.

- `Year` 4 ta raqamdan iborat bo'lishi kerak. Moslik uchun 2 ta raqam ham qabul qilinadi va "19xx" deb hisoblanadi, masalan. `98` bu yerda `1998` bilan bir xil, lekin har doim 4 ta raqamdan foydalanish qat`iyan tavsiya etiladi.
- `month` hisobi `0` (yanvar) dan boshlanadi, `11` (dekabr) gacha.
- `date` parametri aslida oyning kunidir, agar yo'q bo'lsa, `1` qabul qilinadi.
- Agar `hours/minutes/seconds/ms` bo‘lmasa, ular `0` ga teng deb hisoblanadi.

  Masalan:

  ```js
  new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Yan 2011, 00:00:00
  new Date(2011, 0, 1); // bir xil, soatlar va boshqalar standart bo'yicha 0 dir
  ```

  Maksimal aniqlik 1 ms (1/1000 sek):

  ```js run
  let date = new Date(2011, 0, 1, 2, 3, 4, 567);
  alert(date); // 1.01.2011, 02:03:04.567
  ```

## Sana komponentlariga kirish

`Date` obyektidan yil, oy va hokazolarga kirish metodlari mavjud:

[getFullYear()](mdn:js/Date/getFullYear)
: Yilni olish (4 ta raqam)

[getMonth()](mdn:js/Date/getMonth)
: Oyni olish, **0 dan 11** gacha.

[getDate()](mdn:js/Date/getDate)
: Oyning kunini 1 dan 31 gacha oling, metodning nomi biroz g'alati ko'rinadi.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Tegishli vaqt komponentlarini olish.

``
`warn header="``getYear()`emas,`getFullYear()`"
Ko'pgina JavaScript dvigatellari `getYear()`nostandart metodini qo'llaydi. Bu metod eskirgan. Ba'zan 2 xonali yilni qaytaradi. Iltimos, hech qachon foydalanmang. Yil uchun`getFullYear()` mavjud.

```

```

Bundan tashqari, biz haftaning bir kunini olishimiz mumkin:

[getDay()](mdn:js/Date/getDay)
: `0` (yakshanba) dan `6` (shanba) gacha haftaning kunini olish. Birinchi kun har doim yakshanba, ba'zi mamlakatlarda bunday emas, lekin o'zgartirib bo'lmaydi.

**Yuqoridagi barcha metodlar mahalliy vaqt mintaqasiga nisbatan komponentlarni qaytaradi.**

UTC+0 vaqt mintaqasi uchun qaytariladigan kun, oy, yil va shunga o'xshash ularning UTC alternativlari ham bor: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Shunchaki `“get”`dan so‘ng `“UTC”`ni kiriting.

Agar sizning mahalliy vaqt mintaqangiz UTC ga nisbatan o'zgartirilsa, quyidagi kod turli soatlarni ko'rsatadi:

```js run
// joriy sana
let date = new Date();

// joriy vaqt mintaqangizdagi soat
alert(date.getHours());

// UTC+0 vaqt mintaqasidagi soat (London vaqti kunduzgi vaqtni hisobga olmagan holda)
alert(date.getUTCHours());
```

Berilgan metodlardan tashqari, UTC-variantiga ega bo'lmagan ikkita maxsus metodlar mavjud:

[getTime()](mdn:js/Date/getTime)
: Sana uchun vaqt tamg'asini qaytaradi -- 1970 yil 1 yanvardan boshlab o'tgan millisekundlar soni UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: UTC va mahalliy vaqt mintaqasi o'rtasidagi farqni daqiqalarda qaytaradi:

    ```js run
    // agar siz UTC-1 vaqt zonasida bo'lsangiz, 60 chiqadi
    // agar siz UTC+3 vaqt zonasida bo'lsangiz, -180 chiqadi
    alert( new Date().getTimezoneOffset() );

    ```

## Sana komponentlarini qo'llash

Quyidagi metodlar sana/vaqt komponentlarini sozlash imkonini beradi:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (sets the whole date by milliseconds since 01.01.1970 UTC)

`setTime()`dan tashqari ularning har biri UTC-variantiga ega, masalan: `setUTCHours()`.

Ko'rib turganimizdek, ba'zi metodlar bir vaqtning o'zida bir nechta komponentlarni o'rnatishi mumkin, masalan, `setHours`. Ko'rsatilmagan komponentlar o'zgartirilmaydi.

Masalan:

```js run
let today = new Date();

today.setHours(0);
alert(today); // hamon bugun, lekin soat 0 ga o'zgartirildi

today.setHours(0, 0, 0, 0);
alert(today); // hamon bugun, hozir 00:00:00 keskin.
```

## Avtokorreksiya

_Avtokorreksiya_ `Date` obyektlarining juda qulay xususiyatidir. Biz diapazondan tashqari qiymatlarni o'rnatishimiz mumkin va u o'zini avtomatik ravishda sozlaydi.

Masalan:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Yan 2013 ?!?
alert(date); // ...is 1 Fev 2013!
```

Diapazondan tashqari sana komponentlari avtomatik ravishda taqsimlanadi.

Aytaylik, “2016-yil 28-fevral” sanasini 2 kunga oshirishimiz kerak. Kabisa yili bo'lsa, "2 mart" yoki "1 mart" bo'lishi mumkin. Bu haqda o'ylashimiz shart emas. Faqat 2 kun qo'shing. `Date` obyekti qolgan ishlarni bajaradi:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Ushbu xususiyat ko'pincha berilgan vaqtdan keyin sanani olish uchun ishlatiladi. Masalan, "70 soniyadan keyin" sanasini olaylik:

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert(date); // to'g'ri sanani ko'rsatadi
```

Shuningdek, biz nol yoki hatto salbiy qiymatlarni o'rnatishimiz mumkin. Masalan:

```js run
let date = new Date(2016, 0, 2); // 2 Yan 2016

date.setDate(1); // oyning 1 kunini belgilash
alert(date);

date.setDate(0); // min kun 1, shuning uchun oldingi oyning oxirgi kuni qabul qilinadi
alert(date); // 31 Dek 2015
```

## Sanadan raqamga, sana farqi

`Date` obyekti raqamga aylantirilganda, u `date.getTime()` bilan bir xil vaqt tamg‘asiga aylanadi:

```js run
let date = new Date();
alert(+date); // millisekundlar soni date.getTime() bilan bir xil
```

Muhim yon ta'siri: sanalarni olib tashlash mumkin, natijada ularning msdagi farqi.

Bu vaqtni o'lchash uchun ishlatilishi mumkin:

```js run
let start = new Date(); // vaqtni o'lchashni boshlash

// ishni bajarish
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // vaqt o'lchashni tugatish

alert(`Sikl ${end - start} ms vaqt oldi`);
```

## Date.now()

Agar biz faqat vaqtni o'lchashni istasak, bizga `Date` ob'ekti kerak emas.

Joriy vaqt tamg'asini qaytaruvchi `Date.now()` maxsus metodi mavjud.

U semantik jihatdan `new Date().getTime()` ga teng, lekin u oraliq “Sana” obyektini yaratmaydi. Shunday qilib, u tezroq va axlat yig'ishda bosim o'tkazmaydi.

U asosan qulaylik uchun yoki JavaScriptdagi o'yinlarda yoki boshqa maxsus ilovalarda ishlash muhim bo'lganda ishlatiladi.

Shunday qilib, ehtimol bu yaxshiroq:

```js run
*!*
let start = Date.now(); // millisekundlar 1970 yil 1 yanvardan boshlab hisoblanadi
*/!*

// ishni bajarish
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // tayyor
*/!*

alert( `Sikl ${end - start} ms vaqt oldi` ); // sanalarni emas, raqamlarni ayirish
```

## Benchmarking

Agar biz CPUga ochlik funktsiyasining ishonchli mezonini xohlasak, ehtiyot bo'lishimiz kerak.

Masalan, ikkita sana orasidagi farqni hisoblaydigan ikkita funktsiyani o'lchaymiz: qaysi biri tezroq?

Bunday ishlash o'lchovlari ko'pincha "benchmarks" deb ataladi.

```js
// bizda date1 va date2 bor, qaysi funktsiya ularning farqini ms da tezroq qaytaradi?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Bu ikkalasi aynan bir xil ishni bajaradi, lekin ulardan biri sanani msda olish uchun aniq `date.getTime()` dan foydalanadi, ikkinchisi esa sanadan raqamga o'zgartirishga tayanadi. Ularning natijasi har doim bir xil bo'ladi.

Xo'sh, qaysi biri tezroq?

Birinchi g'oya ularni ketma-ket ko'p marta ishlatish va vaqt farqini o'lchash bo'lishi mumkin. Bizning holatlarimiz uchun funktsiyalar juda oddiy, shuning uchun biz buni kamida 100000 marta bajarishimiz kerak.

Keling, o'lchaymiz:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert("diffSubtract vaqti: " + bench(diffSubtract) + "ms");
alert("diffGetTime vaqti: " + bench(diffGetTime) + "ms");
```

Qoyil! `getTime()` dan foydalanish juda tez! Buning sababi, hech qanday turdagi konvertatsiya yo'qligi, dvigatellar uchun optimallashtirish ancha oson.

Yaxshi, bizda nimadir bor. Ammo bu hali yaxshi ko'rsatkich emas.

Tasavvur qiling-a, `bench(diffSubtract)` ishlayotgan vaqtda protsessor parallel ravishda biror narsa qilyapti va u resurslarni olayotgan edi. Va `bench(diffGetTime)` ishga tushirilganda, bu ish tugadi.

Zamonaviy ko'p jarayonli OS uchun juda haqiqiy stsenariy.

Natijada, birinchi benchmark ikkinchisiga qaraganda kamroq CPU resurslariga ega bo'ladi. Bu noto'g'ri natijalarga olib kelishi mumkin.

**Ishonchliroq taqqoslash uchun barcha ko'rsatkichlar to'plami bir necha marta takrorlanishi kerak.**

Masalan, bu kabi:

```js run
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// bench(diffSubtract) va bench(diffGetTime)ni har 10 marta o'zgartiring
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( `diffSubtractning to'liq vaqti: ` + time1 );
alert( `diffGetTimening to'liq vaqti: ` + time2 );
```

Zamonaviy JavaScript dvigatellari ilg'or optimallashtirishni faqat ko'p marta bajariladigan "issiq kod" uchun qo'llashni boshlaydi (kamdan-kam bajariladigan narsalarni optimallashtirishga hojat yo'q). Shunday qilib, yuqoridagi misolda birinchi ijrolar yaxshi optimallashtirilmagan. Biz isitish oqimini qo'shishni xohlashimiz mumkin:

```js
// asosiy sikldan oldin "isitish" uchun qo'shilgan
bench(diffSubtract);
bench(diffGetTime);

// endi benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Mikrobenchmarking qilishda ehtiyot bo'ling"
Zamonaviy JavaScript dvigatellari ko'plab optimallashtirishlarni amalga oshiradi. Ular "sun'iy testlar" natijalarini "oddiy foydalanish" bilan solishtirganda o'zgartirishi mumkin, ayniqsa biz juda kichik narsalarni, masalan, operator qanday ishlashini yoki o'rnatilgan funksiyani taqqoslaganda. Shunday qilib, agar siz unumdorlikni jiddiy tushunmoqchi bo'lsangiz, iltimos, JavaScript mexanizmi qanday ishlashini o'rganing. Va keyin sizga mikrobenchmarklar umuman kerak bo'lmaydi.

V8 haqidagi ajoyib maqolalar to'plamini <https://mrale.ph> saytida topish mumkin.
```

## Stringdan Date.parse

[Date.parse(string)](mdn:js/Date/parse) metodi qatordan sanani o‘qiy oladi.

Satr formati quyidagicha bo'lishi kerak: `YYYY-AA-DDTHH:dd:ss.sssZ`, bu erda:

- `YYYY-MM-DD` -- sana: yil-oy-kun.
- Ajratuvchi sifatida `“T”` belgisi ishlatiladi.
- `HH:mm:ss.sss` -- vaqt: soatlar, daqiqalar, soniyalar va millisekundlar.
- Ixtiyoriy `“Z”` qismi “+-ss:mm” formatidagi vaqt mintaqasini bildiradi. Bitta `“Z”` harfi UTC+0 ni bildiradi.

`YYYY-MM-DD` yoki `YYYY-MM` yoki hatto `YYYY` kabi qisqaroq variantlar ham mumkin.

`Date.parse(str)` ga chaqirilgan formatda stringni tahlil qiladi va vaqt tamgʻasini qaytaradi (1970-yil 1-yanvardan boshlab millisekundlar soni UTC+0). Agar format noto‘g‘ri bo‘lsa, `NaN`ni qaytaradi.

Masalan:

```js run
let ms = Date.parse("2012-01-26T13:51:50.417-07:00");

alert(ms); // 1327611110417  (vaqt tamg'asi)
```

Vaqt tamg'asidan bir zumda "yangi sana" obyektini yaratishimiz mumkin:

```js run
let date = new Date(Date.parse("2012-01-26T13:51:50.417-07:00"));

alert(date);
```

## Xulosa

- JavaScript-da sana va vaqt [Date](mdn:js/Date) obyekti bilan ifodalanadi. Biz “faqat sana” yoki “faqat vaqt”ni yarata olmaymiz: `Date` obyektlari har doim ikkalasini ham olib yuradi.
- Oylar noldan hisoblanadi (ha, yanvar nol oy).
- `getDay()` da haftaning kunlari ham noldan boshlab hisoblanadi (bu yakshanba).
- `Date` diapazondan tashqari komponentlar o'rnatilganda o'zini avtomatik ravishda tuzatadi. Kunlar/oylar/soatlarni qo'shish/ayirish uchun yaxshi.
- Sanalarni ayirish mumkin, bu ularning farqini millisekundlarda beradi. Buning sababi, `Date` raqamga aylantirilganda vaqt tamg'asi bo'ladi.
- Joriy vaqt tamg‘asini tezda olish uchun `Date.now()` dan foydalaniladi.

E'tibor bering, boshqa tizimlardan farqli o'laroq, JavaScript-dagi vaqt belgilari soniyalarda emas, millisekundlarda.

Ba'zan bizga aniqroq vaqt o'lchovlari kerak bo'ladi. JavaScript-ning o'zida vaqtni mikrosekundlarda (soniyaning 1 milliondan bir qismi) o'lchash usuli yo'q, lekin ko'pchilik muhitlar buni ta'minlaydi. Masalan, brauzerda [performance.now()](mdn:api/Performance/now) mavjud bo'lib, u sahifa yuklanishi boshlanishidan boshlab mikrosekundlik aniqlikda (nuqtadan keyin 3 ta raqam) millisekundlar sonini beradi:

```js run
alert(`Yuklash ${performance.now()}ms oldin boshlandi`);
// Shunga o'xshash narsa: "Yuklash 34731.26000000001ms oldin boshlangan"
// .26 mikrosoniya (260 mikrosekund)
// kasrdan keyin 3 tadan ortiq raqam aniqlik xatosi, faqat birinchi 3 tasi to'g'ri
```

Node.js da `microtime` moduli va boshqa metodlar mavjud. Texnik jihatdan, deyarli har qanday qurilma va muhit aniqroq bo'lishga imkon beradi, bu shunchaki "Sana" da emas.
