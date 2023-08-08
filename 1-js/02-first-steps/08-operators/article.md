# Asosiy operatorlar, matematika

Ko'plab operatorlarni maktab davridan bilamiz. Ular qo'shuv `+`, ko'paytiruv `*`, ayiruv `-` va boshqa shunga o'xshash narsalar.

Ushbu bobda oddiy operatorlardan boshlaymiz, so'ngra maktab arifmetikasi bilan qamrab olinmagan JavaScript-ga xos jihatlarga e'tibor qaratamiz.

## Terminlar: "unary", "binary", "operand"

Davom etishdan oldin, keling, ba'zi umumiy atamalarni tushunib olaylik.

- *operand* -- operatorlar qo'llaniladigan narsadir. Misol uchun, `5 * 2` ko'paytmasida ikkita operand mavjud: chap operand `5` va o'ng operand `2`. Ba'zan odamlar bularni "operand"ni o'rniga "argument" deb atashadi.
- Agar operator yakka operand-ga ega bo'lsa u *unary*. Misol uchun, unary inkor `-` raqam belgisini teskarisiga aylantiradi:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, unary inkor qo'llanilgan
    ```
- Agar operator ikkita operand-ga ega bo'lsa u *binary*. Binary shaklda ham o'xshash minus mavjud:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binary minus qiymatlarni ayiradi
    ```

    Rasman, yuqoridagi misollarda bizda bir xil belgiga ega bo'lgan ikki xil operator mavjud: inkor operatori, belgini teskari aylantiruvchi unary operator va ayirish operatori, bir raqamni boshqasidan ayiradigan binary operator.

## Matematika

Quyidagi operatorlar qo'llab quvvatlanadi:

- Qo'shuv `+`,
- Ayiruv `-`,
- Ko'paytiruv `*`,
- Bo'luv `/`,
- Qoldiq `%`,
- Darajaga ko'tarish `**`.

Birinchi to'rttasi oddiy, `%` va `**` esa ozgina tushuntiruv talab qiladi.

### Qoldiq %

Qoldiq operatori `%`, ko'rinishiga qaramay, foizlarga bo'gliq emas.

 `a % b`ning natijasi `a`ni `b`ga bo'lgandagi butun [qoldiq](https://en.wikipedia.org/wiki/Remainder)ga teng.

Misol uchun:

```js run
alert( 5 % 2 ); // 1, 5ni 2ga bo'lgandagi qoldiq
alert( 8 % 3 ); // 2, 8ni 3ga bo'lgandagi qoldiq
```

### Darajaga ko'tarish **

Darajaga ko'tarish operatori `a ** b`, `a`ni `b` darajasiga ko'taradi.

Maktab matematikasida, uni a<sup>b</sup> ko'rinishida yozamiz.

Misol uchun:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

Matematikada bo'lganidek, darajaga ko'tarish operatori butun bo'lmagan raqamlar uchun ham ishlaydi. 

Misol uchun, kvadrat ildiz ½chi darajaga teng:

```js run
alert( 4 ** (1/2) ); // 2 (1/2 daraja kvadrat ildiz bilan barobar)
alert( 8 ** (1/3) ); // 2 (1/3 daraja kvadrat ildiz bilan barobar)
```


## Binary bilan string birlashtirish +

Keling, maktab arifmetikasidan uzoqda bo'lgan JavaScript operatorlarining xususiyatlari bilan tanishaylik.
Let's meet the features of JavaScript operators that are beyond school arithmetics.

Odatda, plyus `+` operatori raqamlarni qo'shadi.

Lekin, binary plyus `+` string-larga qo'llanilsa, u ularni birlashtiradi:

```js
let s = "my" + "string";
alert(s); // mystring
```

Esda tuting, agar operand-lardan birontasi string bo'lsa, u holda boshqasi ham string-ga aylantiriladi.

Misol uchun:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Ko'rishimiz mumkin, birinchi operand yoki ikkinchisi string bo'lishi ahamiyatsiz.

Quyida ancha murakkabroq misol:

```js run
alert(2 + 2 + '1' ); // "41" va "221" emas
```

Bu yerda operatorlar birin-ketin ishlaydi. Birinchi `+` ikkita raqamni jamlaydi, shuning uchun u `4` ni qaytaradi, keyin keyingi `+` unga `1` qatorini qo`shadi, shuning uchun `4 + '1' = '41'` kabi bo`ladi.

```js run
alert('1' + 2 + 2); // "122" va "14" emas
```

Bu yerda birinchi operand string bo'lib, compiler qolgan ikkita operandga ham string sifatida qaraydi. `2` `'1'` ga birlashtiriladi, shuning uchun u `'1' + 2 = "12"` va `"12" + 2 = "122"` kabi bo'ladi.

Binary `+` string-larni shu tarzda qo'llab-quvvatlaydigan yagona operatordir. Boshqa arifmetik operatorlar faqat raqamlar bilan ishlaydi va har doim o'z operandlarini raqamlarga aylantiradi.

Quyida ko'paytiruv va bo'luv uchun demo:

```js run
alert( 6 - '2' ); // 4, '2' ni songa aylantiradi
alert( '6' / '2' ); // 3, ikkala operandni songa aylantiradi
```

## Numeric conversion, unary +

Plyus `+` ikki shaklda mavjud: biz yuqorida ishlatgan binary shakl va unary shakl.

Bitta qiymatga qo'llaniladigan unary plyus yoki boshqacha qilib aytganda, plyus operatori `+` raqamlarga hech qanday o'zgarish kiritmaydi. Ammo operand raqam bo'lmasa, unary plyus uni raqamga aylantiradi.

Misol uchun:

```js run
// No effect on numbers
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Aslida u `Number(...)` bilan bir xil vazifa bajaradi, lekin u qisqaroq.

String-larni number-ga aylantirish zarurati tez-tez tug'iladi. Misol uchun, agar biz HTML forma maydonlaridan qiymatlarni olayotgan bo'lsak, ular odatda string-lardir. Agar ularni yig'indisini hisoblamoqchi bo'lsak-chi?

Binary plus ularni string-dek qo'shadi:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", the binary plus concatenates strings
```

Agar ularni raqamlar deb hisoblamoqchi bo'lsak, ularni konvertatsiya qilishimiz va keyin qo'shishimiz kerak:

```js run
let apples = "2"; 
let oranges = "3";

*!*
// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5
*/!*

// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5
```

Matematik nuqtai nazaridan, ortiqcha plyuslarning ko'pligi g'alati tuyulishi mumkin. Ammo dasturchi nuqtai nazaridan, g'alati narsa yo'q: birinchi navbatda unary plyuslar qo'llaniladi, ular string-larni number-larga aylantiradi va so'ngra inary plyus ularni jamlaydi.

Nima uchun unary plyuslar binary-dan oldingi qiymatlarga qo'llaniladi? Ko'rib turganimizdek, bu ularning *yuqori ustunligi* bilan bog'liq.

## Operator ustuvorligi

Agar ifoda bir nechta operatorga ega bo'lsa, bajarilish tartibi ularning *ustuvorligi* yoki boshqacha aytganda, operatorlarning doimiy ustuvorlik tartibi bilan belgilanadi.

Maktabdan hammamiz bilamizki, `1 + 2 * 2` ifodasidagi ko'paytirish qo'shishdan oldin hisoblanishi kerak. Bu aynan birinchi o'rinda turadigan narsa. Koʻpaytirish qoʻshishga qaraganda *yuqori ustunlikka* ega deyiladi.

Qavslar har qanday ustunlikni inkor qiladi, shuning uchun standart tartib bizni qoniqtirmasa, uni o'zgartirish uchun ulardan foydalanishimiz mumkin. Masalan, `(1 + 2) * 2` yozish mumkin.

JavaScript-da ko'plab operatorlar mavjud. Har bir operator tegishli ustunlik raqamiga ega. Ko'proq raqamga ega bo'lgani birinchi bajariladi. Agar ustunlik bir xil bo'lsa, bajarish tartibi chapdan o'ngga qarab bo'ladi.

Quyida [ustunlik jadvali](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) dan ko'chirma (buni eslab qolishning hojati yo'q, lekin unary operatorlar mos keladigan binary operatorlardan yuqori ekanligini unutmang):

| Ustuvorlik | Nomi | Belgisi |
|------------|------|------|
| ... | ... | ... |
| 15 | unary plyus | `+` |
| 15 | unary inkor | `-` |
| 14 | darajaga ko'ratish | `**` |
| 13 | ko'paytiruv | `*` |
| 13 | bo'luv | `/` |
| 12 | qo'shuv | `+` |
| 12 | ayiruv | `-` |
| 14 | unary plus | `+` |
| 14 | unary negation | `-` |
| 13 | exponentiation | `**` |
| 12 | multiplication | `*` |
| 12 | division | `/` |
| 11 | addition | `+` |
| 11 | subtraction | `-` |
| ... | ... | ... |
| 2 | tayinlash | `=` |
| ... | ... | ... |

Ko'rib turganimizdek, "unary plyus" "qo'shish" (binary plyus) ning "12" dan yuqori bo'lgan "15" ustuvorligiga ega. Shuning uchun `"+olma + +apelsinlar"` ifodasida qo'shuvdan oldin unary plyuslar ishlaydi.
As we can see, the "unary plus" has a priority of `14` which is higher than the `11` of "addition" (binary plus). That's why, in the expression `"+apples + +oranges"`, unary pluses work before the addition.

## Tayinlash

Tayinlash `=` ham operator ekanligini ta'kidlaymiz. U ustunlik jadvalida juda past ustunlik `2` bilan berilgan.

Shuning uchun `x = 2 * 2 + 1` kabi o'zgaruvchini tayinlaganimizda, avval hisob-kitoblar amalga oshiriladi, so'ngra `=` hisoblanadi va natija `x` da saqlanadi.   

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Tayinlash = qiymat qaytaradi

`=` ning "sehrli" til konstruktsiyasi emas, balki operator ekanligi qiziq ma'noga ega.

JavaScript-dagi barcha operatorlar qiymat qaytaradi. Bu `+` va `-` uchun aniq, lekin `=` uchun ham amal qiladi.

`x = value` chaqiruvi `qiymat`ni `x` ga yozadi va *keyin uni qaytaradi*.

Quyida topshiriqni murakkabroq ifodaning bir qismi sifatida ishlatuvchi demo:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

Yuqoridagi misolda, `(a = b + 1)` ifonading natijasi `a`ga tayinlangan qiymat (`3`)ga teng. Keyin u keyingi hisoblashlarda ishlatilinadi.

Kulgili kod, shunday emasmi? Uni qanday ishlashini tushunishimiz kerak, chunki ba'zida uni JavaScript kutubxonalarida uchratamiz.

Shunga qaramay, kodni unday yozmang. Bunday hiylalar kodni hech qanday aniqroq yoki o'qishga qulay qilib bermaydi.

### Chaining assignments (Zanjirlash topshiriqlari)

Yana bir qiziqarli xususiyati bu topshiriqlarni zanjirlay olishidir:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Zanjirlangan topshiriqlar o'ngdan chapga qarab hisoblanadi. Birinchidan, eng o'ngdagi "2 + 2" ifodasi hisoblanadi va keyin chapdagi o'zgaruvchilarga tayinlanadi: "c", "b" va "a". Oxir-oqibat, barcha o'zgaruvchilar bitta qiymatga ega bo'ladi.

Yana bir bor, yaxshiroq o'qilishi uchun bunday kodni bir nechta qatorga bo'lgan yaxshiroq:

```js
c = 2 + 2;
b = c;
a = c;
```
U o'qishga osonroq, asosan kodga tez ko'z yugirtirib chiqilganda.

## Modify-in-place

Biz ko'pincha o'zgaruvchiga operatorni qo'llashimiz va yangi natijani o'sha o'zgaruvchida saqlashimiz kerak.

Misol uchun:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Ushbu kodni `+=` va `*=` operatorlari yordamida qisqartirish mumkin:

```js run
let n = 2;
n += 5; // now n = 7 (same as n = n + 5)
n *= 2; // now n = 14 (same as n = n * 2)

alert( n ); // 14
```

Qisqa "o'zgartirish va tayinlash" operatorlari barcha arifmetik va bitwise (bitli) operatorlar: `/=`, `-=` va boshqalar uchun mavjud.

Bunday operatorlar oddiy topshiriq bilan bir xil ustunlikka ega, shuning uchun ular boshqa ko'plab hisob-kitoblardan keyin ishlaydi:

```js run
let n = 2;

n *= 3 + 5; // right part evaluated first, same as n *= 8

alert( n ); // 16  
```

## Oshirish/kamaytirish 

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Raqamni bittaga oshirish yoki kamaytirish eng keng tarqalgan raqamli operatsiyalardan biridir.

Shunday qilib, buning uchun maxsus operatorlar mavjud:

- **Oshirish** `++` o'zgaruvchini bittaga oshiradi:

    ```js run no-beautify
    let counter = 2;
    counter++;        // works the same as counter = counter + 1, but is shorter
    alert( counter ); // 3
    ```
- **Kamaytirish** `--` o'zgaruvchini bittaga kamaytiradi:

    ```js run no-beautify
    let counter = 2;
    counter--;        // works the same as counter = counter - 1, but is shorter
    alert( counter ); // 1
    ```

```warn
Ko'paytirish/kamaytirish faqat o'zgaruvchilarga qo'llanishi mumkin. Uni `5++`ga o'xshash qiymatga ishlatishga urinish xatolikka olib keladi.
```

`++` va `--` operatorlari o'zgaruvchidan avval yoki keyin ham qo'yilishi mumkin.

- Operator o'zgaruvchidan keyin kelganda u "postfiks shakl"da bo'ladi: `counter++`.
- Operator o'zgaruvchidan avval kelganda esa u "prefiks shakl"da bo'ladi: `++counter`.

Ushbu statement-larning ikkalasi ham bir xil vazifa bajaradi: `counter`ni bittaga oshiradi.

Biror farq mavjudmi? Ha, lekin biz uni `++/--`dan qaytgan qiymatdan foydalansakgina ko'rishimiz mumkin.

Keling, aniqlik kiritamiz. Ma'lumki, barcha operatorlar qiymat qaytaradi. Oshirish/kamaytirish ham bundan mustasno emas. Prefiks shakli yangi qiymatni qaytaradi, postfiks shakli esa eski (oshirish/kamaytirishdan oldingi) qiymatni qaytaradi.

Farqni ko'rish uchun, quyida bir misol:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

`(*)` qatorida *prefiks* shakl `++counter` `counter`ni oshiradi va yangi qiymat, `2`ni qaytaradi. Shunday qilib, `alert` `2`ni ko'rsatadi.

Endi postfiks shakldan foydalanib ko'ramiz:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

`(*)` qatorida *prefiks* shakl `++counter` ham `counter`ni oshiradi, lekin *eski* (oshirishdan avvalgi) qiymatni qaytaradi. Shunday qilib, `alert` `1`ni ko'rsatadi.

Xulosa qilganda:

- Agar ko'paytirish/kamaytirishning natijasi ishlatilmasa, qaysi shakldan foydalanishning farqi yo'q:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- Agar qiymatni oshirishni *va* operator natijasini darhol ishlatishni xohlasak, bizga postfiks shakli kerak bo'ladi: 

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Agar biz qiymatni oshirishni, lekin uning oldingi qiymatidan foydalanishni xohlasak, bizga postfiks shakli kerak bo'ladi:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Oshirish/kamaytirish boshqa operatsiyalar orasida"
`++/--` operatorlari ham ifodalarning ichida ishlatilinishi mumkin. Ularning ustunligi ko'plab boshqa arifmetik operatsiyalardan yuqoriroq.
````
Misol uchun:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Solishtirish uchun:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Texnik jihatdan yaxshi bo'lsada, bunday yozuv odatda kodni o'qishga qiyinroq qilishi mumkin. Bitta qator bir nechta ishlarni bajarsa -- yaxshi emas.

Kodni o'qiyotganda, "vertikal" tez ko'z yugurtirilganda `counter++` kabi narsalarni osongina o'tkazib yuborish mumkin va o'zgaruvchining ortishi aniq bo'lmay qoladi.

Biz "bitta qator -- bitta xarakat" usulini maslahat beramiz:

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````
````

## Bitwise operatorlar

Bitli operatorlar argumentlarga 32 bitli butun sonlar sifatida qaraydilar va ularning binary tasviri darajasida ishlaydilar.

These operators are not JavaScript-specific. They are supported in most programming languages.
Bu operatorlar JavaScript-ga xos emas. Ular ko'plab dasturlash tillarid tomonidan qo'llab-quvvatlanadi.

Operatorlar ro'yhati:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

Ushbu operatorlar juda kamdan-kam hollarda, eng past (bit bo'yicha) darajadagi raqamlar bilan ishlashimiz kerak bo'lganda qo'llaniladi. Yaqin orada bizga bu operatorlar kerak bo'lmaydi, chunki veb ishlab chiqishda ulardan kam foydalaniladi, lekin kriptografiya kabi ba'zi maxsus sohalarda ular foydalidir. Zarurat tug'ilganda MDN da [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) bo'limini o'qishingiz mumkin.
These operators are used very rarely, when we need to fiddle with numbers on the very lowest (bitwise) level. We won't need these operators any time soon, as web development has little use of them, but in some special areas, such as cryptography, they are useful. You can read the [Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#bitwise_operators) chapter on MDN when a need arises.

## Comma (vergul)

Vergul `,` operatori eng kam uchraydigan va noodatiy operatorlardan biridir. Ba'zan, undan qisqaroq kod yozgani foydalaniladi, shuning uchun kodni tushunish uchun uni bilishimiz kerak.

Vergul operatori bizga bir nechta iboralarni vergul `,` bilan bo'lish orqali hisoblash imkonini beradi. Ularning har biri baholanadi, lekin faqat oxirgisining natijasi qaytariladi.

Misol uchun:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (the result of 3 + 4)
```

Bu yerda, birinchi `1 + 2` ifodasi hisoblanadi va natijasi tashlab yuboriladi. Keyin, `3 + 4` hisoblanadi va natija sifatida qaytariladi

```smart header="Vergul juda past ustunlikga ega"
Vergul operatori juda past, `=` dan ham past ustunlikka egaligini yodda tuting, shuning uchun yuqoridagi misolda qavslar muhimdir.

Ularsiz: `a = 1 + 2, 3 + 4` birinchi `+`ni hisoblaydi, sonlarni `a = 3, 7`ga jamlaydi, keyin tayinlash operatori `=` `a = 3`ni tayinlaydi, qolganlari esa e'tiborga olinmaydi. Bu xuddi `( a = 1 + 2), 3 + 4` kabi.
```

Nega bizga oxirgi ifodadan tashqari hamma narsani tashlab yuboradigan operator kerak?

Ba'zan, odamlar bir qatorga bir nechta harakatlarni qo'yish uchun undan murakkab tuzilmalarda foydalanadilar.
 
Misol uchun:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Bunday usullardan ko'plab JavaScript freymvor-larida foydalaniladi. Shuning uchun ularni aytib o'tyapamiz. Lekin ular odatda kodni o'quvchanligini yaxshilamaydi, shuning uchun ularni qo'llashimizdan oldin yaxshilab o'ylab ko'rishimiz kerak.
