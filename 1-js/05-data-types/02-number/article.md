# Number-lar

Zamonaviy JavaScript-da number-larning ikki turi mavjud:

JavaScript-dagi oddiy raqamlar 64-bit formatda [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) saqlanadi, shuningdek, "ikkita aniqlikdagi kasr sonlar" sifatida ham tanilgan. Bular biz ko'pincha ishlatadigan raqamlar va ushbu bobda ular haqida gaplashamiz.

2. BigInt sonlar - katta o'lchamli butun sonlarni ifodalash uchun. Ba'zan ular kerak bo'ladi, chunki oddiy son <code>2<sup>53</sup></code>dan yuqori yoki <code>-2<sup>53</sup></code>dan past bo'la olmaydi. BigInt-lar bir nechta maxsus sohalarda qo'llanilganligi sababli, biz ular haqida maxsus <info:bigint> bobida o'rganamiz.
1. Regular numbers in JavaScript are stored in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), also known as "double precision floating point numbers". These are numbers that we're using most of the time, and we'll talk about them in this chapter.

2. BigInt numbers represent integers of arbitrary length. They are sometimes needed because a regular integer number can't safely exceed <code>(2<sup>53</sup>-1)</code> or be less than <code>-(2<sup>53</sup>-1)</code>, as we mentioned earlier in the chapter <info:types>. As bigints are used in few special areas, we devote them a special chapter <info:bigint>.

Shunday qilib, biz bu yerda oddiy raqamlar haqida gaplashamiz. Keling, ular haqidagi bilimlarimizni kengaytiraylik.

## Number yozishning boshqa usullari

Tasavvur qiling, 1 milliardni yozishimiz kerak. Buning aniq yo'li:

```js
let billion = 1000000000;
```

Biz yana pastki chiziqchadan `_` ajratuvchi sifatida foydalanishimiz mumkin:

```js
let billion = 1_000_000_000;
```

Bu erda pastki chiziq `_` "sytactic sugar" rolini o'ynaydi, bu raqamning o'qilishini yanada osonlashtiradi. JavaScript engini raqamlar orasidagi `_` ga e'tibor bermaydi, shuning uchun u yuqoridagi kabi bir milliardga teng bo'ladi.
Here the underscore `_` plays the role of the "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)", it makes the number more readable. The JavaScript engine simply ignores `_` between digits, so it's exactly the same one billion as above.

Shunga qaramasdan, biz hayotda nollarning uzun ketma-ketligini yozishdan qochishga harakat qilamiz. Chunki buning uchun juda dangasamiz. Biz milliard uchun `"1bn"` yoki 7 milliard 300 million uchun `"7.3bn"` yozishga harakat qilamiz. Ko'pchilik katta raqamlar uchun ham xuddi shunday.

JavaScript-da biz raqamga `"e"` harfini qo'shish va nol sonini belgilash orqali uni qisqartirishimiz mumkin:

```js run
let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes

alert( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)
```

Boshqacha qilib aytganda, `e` sonni `1` bilan berilgan nollar soniga ko'paytiradi.

```js
1e3 === 1 * 1000; // e3 means *1000
1.23e6 === 1.23 * 1000000; // e6 means *1000000
```

Endi juda kichik bir narsa yozib ko'ramiz. Aytaylik, 1 mikrosoniya (soniyaning milliondan biri):

```js
let mсs = 0.000001;
```

Xuddi avvalgidek, `"e"` dan foydalanish yordam berishi mumkin. Agar nollarni yozishdan qochmoqchi bo'lsak, xuddi shunday deyishimiz mumkin:
Just like before, using `"e"` can help. If we'd like to avoid writing the zeroes explicitly, we could write the same as:

```js
let mcs = 1e-6; // five zeroes to the left from 1
```

Agar `0.000001`dagi nollar sonini sanasak, ular 6 ta. Demak, bu tabiiy `1e-6` bo'ladi.

Boshqacha qilib aytganda, `"e"` dan keyingi manfiy son 1 bilan berilgan nollar soniga bo'lishni anglatadi:

```js
// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
```

### Hex, binary va octal numbers

[Hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) raqamlardan JavaScript-da ranglarni ifodalash, belgilarni kodlash va boshqa ko'p narsalar uchun keng qo'llaniladi. Demak, tabiiyki, ularni yozishning qisqaroq usuli mavjud: `0x` va keyin raqam.

Masalan:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (the same, case doesn't matter)
```

Binary(ikkilik) va octal(sakkizlik) sanoq sistemalaridan kamdan-kam hollarda qo'llaniladi, lekin `0b` va `0o` prefikslari yordamida ham qo'llab-quvvatlanadi:

```js run
let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

alert( a == b ); // true, the same number 255 at both sides
```

Bunday qo'llab quvvatlashga qodir faqat 3 ta sanoq sistemalari mavjud. Boshqa sanoq sistemalari uchun biz `parseInt` funksiyasidan foydalanishimiz kerak (uni keyinroq ushbu bobda ko'rib chiqamiz).

## toString(base)

`num.toString(base)` metodi `num` ning berilgan `base` ga teng sanoq sistemasidagi satrli ko'rinishini qaytaradi.

Masalan:
```js run
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```

`base` `2` dan `36` gacha o'zgarishi mumkin. Doimiyda esa u `10`ga teng.

Common use cases for this are:

- **base=16** hex (oltilik) ranglar, belgilarni kodlash va hokazolar uchun ishlatilinadi, raqamlar `0..9` yoki `A..F` ko'rinishida bo'lishi mumkin.
- **base=2** asosan bitwise amallarni debug qilish uchun ishlatilinadi, raqamlar `0` yoki `1` ko'rinishida bo'lishi mumkin.
- **base=36** eng kattasi, raqamlar `0..9` yoki `A..Z` ko'rinishda bo'lishi mumkin. Sonni aks ettirish uchun to'liq lotin alifbosidan foydalaniladi. `36`ning kulgili, ammo foydali ishlatilinish holati - bu biz uzun raqamli identifikatorni qisqaroq narsaga aylantirishimiz kerak bo'lganda, masalan, qisqa url qilish uchun. Uni oddiygina `36` asosli sanoq sistemada ifodalash mumkin:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Two dots to call a method"
Shuni yodda tutingki, `123456..toString(36)` dagi ikkita nuqta bu xato emas. Agar metodni sonda to'g'ridan to'gri chaqirmoqchi bo'lsak, xuddi yuqoridagi misoldagi `toString` kabi, u holda undan keyin ikkita nuqta `..` qo'yishimiz kerak.

Agar yakka nuqta qo'yganimizda: `123456.toString(36)`, u holda xatolik bo'lgan bo'lardi, chunki JavaScript sintaksisi birinchi nuqtadan keyingi qismni kasr deb hisoblaydi. Agar yana bitta nuqta qo'yadigan bo'lsak, unda JavaScript kasr qismni bo'sh deb biladi va shunda metodga o'tadi.

Yana `(123456).toString(36)` deb yozish ham mumkin.

```

## Yaxlitlash

Sonlar bilan ishlayotganda eng ko'p qo'llanilinadigan amallardan biri bu yaxlitlashdir.

Yaxlitlash uchun bir nechta ichki o'rnatilgan funktsiyalar mavjud:

`Math.floor`
: Pastga qarab yaxlitlaydi: `3.1` => `3` bo'ladi, va `-1.1` => `-2` bo'ladi.

`Math.ceil`
: Yuqoriga qarab yaxlitlaydi: `3.1` => `4` bo'ladi, va `-1.1` => `-1` bo'ladi.

`Math.round`
: Eng yaqin butunga qarab yaxlitlaydi: `3.1` => `3` bo'ladi, `3.6` => `4` bo'ladi, o'rtadagilar esa: `3.5` ham yuqoriga `4`ga yaxlitlanadi.

`Math.trunc` (Internet Explorer tomonidan qo'llab-quvvatlanmaydi)
: Kasrdan keyin hamma narsani yaxlitlashsiz olib tashlaydi: `3.1` => `3` bo'ladi, `-1.1` => `-1` bo'ladi.

Quyida ular orasidagi farqlarni umumlashtirish uchun jadval:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Bu funktsiyalar sonning o'nlik qismi bilan ishlashning barcha mumkin bo'lgan usullarini qamrab oladi. Ammo o'nli kasrdan keyin raqamni `n-chi` raqamga yaxlitlashni istasak nima bo'ladi?

Masalan, bizda `1.2345` bor va faqatgina `1.23`ni olgan xolda uni 2 ta raqamga yaxlitlashni xohlaymiz.

Buni amalga oshirishning ikki usuli mavjud:

1. Ko'paytirish-va-bo'lish.

    Masalan, sonni kasrdan keyingi 2chi raqamgacha yaxlitlagani, sonni `100`ga (yoki 10 ning kattaroq darajasiga) ko'paytirishimiz, yaxlitlash funktsiyasini chaqirishimiz va keyin uni qaytarib bo'lishimiz mumkin.
    For example, to round the number to the 2nd digit after the decimal, we can multiply the number by `100`, call the rounding function and then divide it back.
    ```js run
    let num = 1.23456;

    alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) metodi sonni nuqtadan keyingi `n` raqamgacha yaxlitlaydi va natijaning string ko'rinishini qaytaradi.

    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    Bu eng yaqindagi qiymat tomon yuqoriga yoki pastga qarab yaxlitlaydi, xuddi `Math.round`ga o'xshab:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    Yodda tuting, `toFixed`ning natijasi string-ga teng. Agar kasr qism kerakligidan kichikroq bo'lsa, u holda oxiriga nollar qo'shiladi:
    Please note that the result of `toFixed` is a string. If the decimal part is shorter than required, zeroes are appended to the end:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits
    ```

    Biz uni unary plyus yoki`Number()` chaqiruvi yordamida songa aylantirishimiz mumkin: `+num.toFixed(5)`.
    We can convert it to a number using the unary plus or a `Number()` call, e.g write `+num.toFixed(5)`.

## Noto'g'ri hisob-kitoblar

Ichki tomondan, raqam 64 bitli [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) formatda taqdim etiladi, shuning uchun raqamni saqlash uchun aniq 64 ta bit mavjud: ulardan 52 tasi raqamlarni saqlash uchun ishlatiladi, 11 tasi kasr o'rnini saqlaydi (butun sonlar uchun ular nolga teng), va 1 ta bit belgi uchun.

Agar son juda katta bo'lsa, u 64-bitlik xotiraga sig'maydi va u katta ehtimol bilan cheksizlikni beradi: 
Internally, a number is represented in 64-bit format [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), so there are exactly 64 bits to store a number: 52 of them are used to store the digits, 11 of them store the position of the decimal point, and 1 bit is for the sign.

If a number is really huge, it may overflow the 64-bit storage and become a special numeric value `Infinity`:

```js run
alert( 1e500 ); // Infinity
```

Aniqlikni yo'qotish unchalik ravshan bo'lmasligi mumkin, lekin tez-tez sodir bo'ladi.

Ushbu (noto'g'ri!) testni ko'ring:
Consider this (falsy!) equality test:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

To'g'ri, `0.1` va `0.2` ning yig'indisi `0.3` yoki emasligini tekshirganimizda, `false` ni olamiz.

G'alati! Agar `0.3` bo'lmasa unda nima?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Buning noto'g'ri taqqoslashdan ko'ra ko'proq oqibatlari bo'lishi mumkin. Tasavvur qiling siz elektron xarid qilish saytini yaratyapsiz va tashrif buyuruvchi savatiga `$0.10` va `$0.20` lik tovarlarni qo'yadi. Buyurtma jami `$0.30000000000000004` bo'ladi. Bu albatta hammani hayratlantiradi.
Ouch! Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into their cart. The order total will be `$0.30000000000000004`. That would surprise anyone.

Ammo nega bunday bo'ladi?

Son xotirada binar (ikkilik) shaklda, ya'ni birlar va nollar - bitlar ketma-ketligida saqlanadi. Lekin o'nlik sanoq sistemasida oddiy koʻrinadigan `0.1`, `0.2` kabi kasrlar aslida o'zining binar koʻrinishida tugamaydigan kasrlardir.

Boshqacha qilib aytganda, `0.1` o'zi nima? U bir bo'lingan o'n `1/10`, ya'ni o'ndan bir. O'nlik sanoq sistemasida bunday sonlar osongina ifodalanadi. Uni uchdan birga solishtirsak: `1/3`. U cheksiz kasr `0.33333(3)`ga aylanadi.
What is `0.1`? It is one divided by ten `1/10`, one-tenth. In decimal numeral system such numbers are easily representable. Compare it to one-third: `1/3`. It becomes an endless fraction `0.33333(3)`.

Demak, `10` darajalariga bo'luv o'nlik sistemada yaxshi ishlashi kafolatlangan, lekin `3`ga bo'luv bunday emas. Ayni sababga ko'ra, ikkilik sanoq sistemasida, `2`ning darajalariga bo'luvlar ishlashi kafolatlanadi, ammo `1/10` cheksiz ikkilik kasrga aylanadi.

Ikkilik sistemada *aniq 0.1* yoki *aniq 0.2* ni saqlashning hech qanday yo'li mavjud emas, xuddi uchdan birni o'nlik kasr sifatida saqlashning ilojisi bo'lmagani kabi.

IEEE-754 raqamli formati buni imkon qadar yaqin raqamga yaxlitlash orqali hal qiladi. Ushbu yaxlitlash qoidalari odatda "kichik aniqlik yo'qolishi" ni ko'rishga imkon bermaydi, lekin u mavjud bo'ladi.

Buni amalda ko‘rishimiz mumkin:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

Ikkita raqamni jamlaganimizda, ularning "aniqlik yo'qotishlari" oshib boradi.

Shuning uchun `0.1 + 0.2` aynan `0.3` emas.

```smart header="Faqat JavaScript emas"
Xuddi shu muammo boshqa ko'plab dasturlash tillarida ham mavjud.

PHP, Java, C, Perl, Ruby bir xil natijani beradi, chunki ular ham bir xil raqamli formatga asoslangandir.
```

Muammoni hal qila olamizmi? Albatta, buning eng ishonchli usuli bu natijani [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) metodi yordamida yaxlitlashdir:

```js run
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
```

Yodda tuting, `toFixed` doim string qaytaradi. Bu kasr qismda 2 ta raqam bor ekanligini ta'minlaydi. Bu ayniqsa elektron xarid qilayotganda va `$0.30`ni ko'rsatish kerak bo'lganda juda qulay. Boshqa hollarda, uni number-ga aylantirish uchun unar plyusdan foydalanishimiz mumkin:

```js run
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

Biz yana sonlarni butunga aylantirish uchun ularni vaqtinchalik 100 (yoki kattaroq son)ga ko'paytirshimiz, amallarni bajarishimiz va qayta bo'lishimiz ham mumkin. Bunda, butun sonlar bilan amallar bajarayotganimiz uchun, xatolik qaysidir ma'noda kamayadi, lekin biz uni bo'lishdan olamiz:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

Shunday qilib, ko'paytiruv/bo'luv usuli xatoni kamaytiradi, lekin uni butunlay olib tashlamaydi.

Ba'zan biz kasrlardan qochishga harakat qilishimiz mumkin. Agar do'kon bilan ishlayotgan bo'lsak, unda narxlarni dollor o'rniga sentda saqlashimiz mumkin. Lekin agar 30% chegirma qo'ysakchi? Amalda, butunlay kasrlardan qochishning ilojisi yo'q. Shunchaki kerak bo'lganida "dumlar"ni kesish uchun ularni yaxlitlang.

````smart header="The funny thing"
Buni bajarib ko'ring:

```js run
// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000
```

Bu ham bir xil muammoga ega: aniqlik yo'qolishi. Son uchun 64 ta bit mavjud, ularning 52 tasi raqamlarni saqlash uchun ishlatilinishi mumkin, ammo bu yetarli emas. Shuning uchun, eng kam ahamiyatli raqamlar yo'qoladi.

JavaScript bunday holatlarda xatolik keltirib chiqarmaydi. U sonni kerakli formatga joylash uchun qo'lidan kelganini qiladi, ammo afsuski, bunday format yetarlicha katta bo'lmaydi.
````

```smart header="Two zeroes"
Raqamlarning ichki ko'rinishining yana bir kulgili natijasi bu unda ikkita nolning mavjudligidir: `0` va `-0`.

Buning sababi, belgi bitta bit bilan ifodalanadi, shuning uchun uni har qanday raqam uchun, shu jumladan nol uchun o'rnatish yoki o'rnatmaslik mumkin.

Aksariyat hollarda farq sezilmaydi, chunki operatorlar ularga bir xil munosabatda bo'lishga mos keladi.
```

## Testlar: isFinite va isNaN

Ushbu ikkita maxsus raqamli qiymatlarni eslaysizmi?

- `Infinity` (va `-Infinity`) bu har qanday narsadan kattaroq (kamroq) bo'lgan maxsus raqamli qiymat.
- `NaN` xatoni ifodalaydi.

Ular `number` turiga qarashli, lekin "odatiy" raqamlar emas, shuning uchun ularni tekshirish uchun maxsus funktsiyalar mavjud:


- `isNaN(value)` o'z argumentini raqamga aylantiradi va keyin uning `NaN` ekanligini tekshiradi:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    Lekin bizga bu funktsiya kerakmi? Shunchaki `=== NaN` taqqoslashdan foydalanib qo'ya olmaymizmi? Kechirasiz, lekin javobi yo'q. `NaN` qiymatini noyob jihati shundaki u hech narsaga teng emas, shu jumladan o'ziga ham:
    But do we need this function? Can't we just use the comparison `=== NaN`? Unfortunately not. The value `NaN` is unique in that it does not equal anything, including itself:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` o'z argumentini raqamga aylantiradi va agar u `NaN/Infinity/ -Infinity` emas balki odatiy raqam bo'lsa, `true` ni qaytaradi:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, because a special value: NaN
    alert( isFinite(Infinity) ); // false, because a special value: Infinity
    ```

Ba'zan `isFinite` dan string-ning qiymati odatiy raqam yoki emasligini tasdiqlash uchun foydalaniladi:


```js run
let num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );
```

Yodda tuting, boʻsh yoki faqat boʻsh joy boʻlgan string barcha raqamli funksiyalarda, jumladan `isFinite`da `0` sifatida qabul qilinadi.

````smart header="`Number.isNaN` and `Number.isFinite`"
[Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) and [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) methods are the more "strict" versions of `isNaN` and `isFinite` functions. They do not autoconvert their argument into a number, but check if it belongs to the `number` type instead.

`===` kabi qiymatlarni taqqoslaydigan maxsus ichki o'rnatilgan [`Object.is`](mdn:js/Object/is) metodi mavjud, ammo u ikki tomonlama holatlar uchun ishonchliroqdir:

1. U `NaN` bilan ishlaydi: `Object.is(NaN, NaN) === true`, bu yaxshi narsa.
2. `0` va `-0` qiymatlari turlicha: `Object.is(0, -0) === false`, texnik jihatdan bu to'g'ri, chunki ichki tomondan raqam boshqa barcha bitlar nol bo'lsa ham farqli bo'lishi mumkin bo'lgan ishora bitiga ega.
- `Number.isNaN(value)` returns `true` if the argument belongs to the `number` type and it is `NaN`. In any other case it returns `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("str" / 2) ); // true

    // Note the difference:
    alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number type
    alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN as a result of this conversion
    ```

- `Number.isFinite(value)` returns `true` if the argument belongs to the `number` type and it is not `NaN/Infinity/-Infinity`. In any other case it returns `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Note the difference:
    alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the number type
    alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
    ```

In a way, `Number.isNaN` and `Number.isFinite` are simpler and more straightforward than `isNaN` and `isFinite` functions. In practice though, `isNaN` and `isFinite` are mostly used, as they're shorter to write.
````

```smart header="Comparison with `Object.is`"
There is a special built-in method `Object.is` that compares values like `===`, but is more reliable for two edge cases:

1. It works with `NaN`: `Object.is(NaN, NaN) === true`, that's a good thing.
2. Values `0` and `-0` are different: `Object.is(0, -0) === false`, technically that's correct, because internally the number has a sign bit that may be different even if all other bits are zeroes.

Boshqa barcha holatlarda, `Object.is(a, b)` `a === b` bilan bir xil.

Ushbu taqqoslash usulidan JavaScript spesifikatsiyasida tez-tez foydalaniladi. Ichki algoritm ikki qiymatning aynan o'xshash ekanligini taqqoslashi kerak bo'lganida u `Object.is` (ichki tomondan [SameValue](https://tc39.github.io/ecma262/#sec-samevalue) deb nomlangan) metoddan foydalanadi.
We mention `Object.is` here, because it's often used in JavaScript specification. When an internal algorithm needs to compare two values for being exactly the same, it uses `Object.is` (internally called [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt va parseFloat

`+` plyus yoki `Number()` yordamidagi raqamli konvertatsiyalar qat'iydir. Agar qiymat aniq raqam bo'lmasa, u ishlamaydi:

```js run
alert( +"100px" ); // NaN
```

Yagona istisno bu string-ning boshida yoki oxiridagi bo'shliqlardir, chunki ular e'tiborga olinmaydi.

Lekin real hayotda biz ko'pincha CSS-da `"100px"` yoki `"12pt"` kabi birliklarda qiymatlarga egamiz. Shuningdek, ko'pgina mamlakatlarda pul birligi belgisi summadan keyin keladi, shuning uchun bizda `19€` bor va undan raqamli qiymat chiqarmoqchimiz.

`parseInt` va `parseFloat` aynan shuning uchundir.

Ular string-dan raqamni o'qiy olmaguncha "o'qiydilar". Xato bo'lganida, to'plangan raqam qaytariladi. `parseInt` funksiyasi butun sonni qaytaradi, `parseFloat` esa kasr sonni qaytaradi:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
```

`parseInt/parseFloat` metodlari `NaN` ni qaytaruvchi vaziyatlar mavjud. Bu hech qanday raqam o'qilmaganida sodir bo'ladi:

```js run
alert( parseInt('a123') ); // NaN, the first symbol stops the process
```

````smart header="The second argument of `parseInt(str, radix)`"
`parseInt()` funktsiyasi ixtiyoriy ikkinchi argumentga ega. U sanoq sistemasining asosini belgilaydi, shuning uchun `parseInt`, o'n oltilik, ikkilik raqamlar va boshqalar string-larni ham parse qila oladi:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Boshqa matematik funktsiyalar

JavaScript ichki o'rnatilgan [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object-iga ega bo'lib, unda matematik funktsiyalar va konstantalarning kichik kutubxonasi mavjud.

Ba'zi misollar:

`Math.random()`
: 0 dan 1 gacha bo'lgan tasodifiy raqamni qaytaradi (shu jumladan 1 ni).

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (istalgan tasodifiy raqamlar)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Argumentlarning ixtiyoriy sonidan eng kattasini/kichigini qaytaradi.
`Math.max(a, b, c...)` and `Math.min(a, b, c...)`
: Returns the greatest and smallest from the arbitrary number of arguments.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, power)`
: Berilgan darajaga ko'tarilgan `n` ni qaytaradi.

    ```js run
    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024
    ```

There are more functions and constants in `Math` object, including trigonometry, which you can find in the [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).
`Math` object-ida ko'plab funksiya va konstantalar mavjud, jumladan trigonometriya, ularni [docs for the Math object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math)da topishingiz mumkin.

## Xulosa

Ko'p nolga ega raqamlarni yozish uchun:

- Raqamga `"e"` ni nollar soni bilan bilan qo'shing. Xuddi: `123e6` - `123` bilan 6 ta nol, ya'ni `123000000`ga teng.
- `"e"`dan keyingi manfiy raqam sonni 1 bilan berilgan nollar soniga bo'linishiga olib keladi. M.u. `123e-6` - `0.000123` (miliondan `123`) degani.

Turli sanoq sistemalari uchun:

- Raqamlarni to'g'ridan-to'g'ri o'n oltilik (`0x`), sakkizlik (`0o`) va ikkilik (`0b`) sistemalarda yozish mumkin.
- `parseInt(str, base)` `str` string-ini berilgan `base` ga ega sanoq sistemasidagi butun songa parse qiladi, `2 ≤ base ≤ 36`.
- `num.toString(base)` raqamni berilgan `base` ga ega sanoq sistemasidagi string-ga konvertatsiya qiladi.

`12pt` va `100px` kabi qiymatlarni raqamga konvertatsiya qilish uchun:
For regular number tests:

- `isNaN(value)` converts its argument to a number and then tests it for being `NaN`
- `Number.isNaN(value)` checks whether its argument belongs to the `number` type, and if so, tests it for being `NaN`
- `isFinite(value)` converts its argument to a number and then tests it for not being `NaN/Infinity/-Infinity`
- `Number.isFinite(value)` checks whether its argument belongs to the `number` type, and if so, tests it for not being `NaN/Infinity/-Infinity`

For converting values like `12pt` and `100px` to a number:

-"yumshoq" konvertatsiya uchun `parseInt/parseFloat` dan foydalaning, u raqamni string-dan o'qiydi va xatogacha o'qiy olgan qiymatni qaytaradi.

Kasrlar uchun:

- `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` yoki `num.toFixed(precision)` yordamida yaxlitlang.
- Kasrlar bilan ishlayotganda aniqlik yo'qolishi borligini yodda tuting.

Ko'proq matematik funktsiyalar:

- Kerak bo'lganida [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object-ini ko'ring. Ushbu kutubxona juda kichik, lekin barcha zaruriy narsalarni qamraydi.
