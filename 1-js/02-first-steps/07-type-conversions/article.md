# Tur o'zgarishi

Ko'pincha, operator va funktsiyalar ularga berilgan qiymatlarni kerakli turga avtomatik tarzda aylantiradi.

Misol uchun, `alert` har qanday qiymatni ko'rsatish uchun uni string-aylantiradi. Matematik ammallar qiymatlarni number-ga aylantiradi.

Qiymatni kutilgan turga explicit tarzda aylantirishimiz kerak bo'lgan holatlar ham mavjud.

```smart header="Hozircha object-lar haqida gaplashmaymiz"
Bu bob object-larni o'z ichiga olmaydi. Hozircha faqat primitive-lar haqida gaplashamiz.

Keyinchalik, ob'ektlar bilan tanishganimizdan so'ng, <info:object-toprimitive> bobida biz ob'ektlar qanday tuzilishini ko'rib chiqamiz.
```

## String Conversion

String conversion bizga qiymatning string shakli kerak bo'lganda sodir bo'ladi.

Misol uchun, `alert(value)` qiymatni ko'rsatish uchun buni amalga oshiradi.

Shuningdek, qiymatni string-ga aylantirish uchun `String(value)` funksiyani chaqirishimiz ham mumkin.

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // now value is a string "true"
alert(typeof value); // string
*/!*
```

String conversion juda aniq. `false` `"false"`ga aylanadi, `null` `"null"`ga aylanadi va hokazo.

## Numeric Conversion

Numeric conversion matematik funktsiya va ifodalarda avtomatik ravishda amalga oshadi.

Misol uchun, `/` bo'luv amali raqam bo'lmaganlarga nisbatan qo`llanilganda:

```js run
alert( "6" / "2" ); // 3, string-lar number-larga aylanadi
```

`value`ni raqamga aylantirish uchun `Number(value)` funksiyasidan foydalanishimiz mumkin:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(typeof num); // number
```

Bizga matnga o'xshash shakldagi string-ga asoslangann manbadan qiymat kerak bo'lganda va number kiritilishi kutilganda, odatda explicit conversion talab qilinadi.

Agar string number bo'lamasa, bunday conversion natijasi `Nan` bo'ladi. Misol uchun:

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

Numeric conversion rules:

| Qiymat |  Aylanadi... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;va&nbsp;false</code> | `1` va `0` |
| `string` | Bosh va oxirdagi bo'sh joylar olib tashlanadi. Agar mavjud string bo'sh bo'lsa, natija `0` bo'ladi. Aks holda, number string-dan "o'qiladi". Xatolik `NaN`ni ko'rsatadi. |

Examples:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Esda tutingki,  `null` va `undefined` bu yerda turli harakat qiladi: `null` nolga, `undefined` esa `NaN` ga aylanadi.

Most mathematical operators also perform such conversion, we'll see that in the next chapter.

## Boolean Conversion

Boolean conversion is the simplest one.

It happens in logical operations (later we'll meet condition tests and other similar things) but can also be performed explicitly with a call to `Boolean(value)`.

Conversion qoidasi:

- Values that are intuitively "empty", like `0`, an empty string, `null`, `undefined`, and `NaN`, become `false`.
- Other values become `true`.


For instance:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
```

````warn header="Yodda tuting: qiymati `\"0\"`bo'lgan string `true`ga teng"
Ba'zi tillar (jumladan PHP) `"0"`ni `false`deb qabul qiladi. Lekin JavaScript-da bo'sh bo'lmagan string doim `true`ga teng.\

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)
```
````
````

## Xulosa

Eng ko'p qo'llaniladigan uchta turdagi conversion-larga string-ga, number-ga va boolean-ga aylantirishlardir.

**`String Conversion`** -- Biror narsani chiqarganimizda sodir bo'ladi. `String(value)` orqali amalga oshirish mumkin. String-ga aylantirish oadatda primitive qiymatlar uchun aniq.

**`Numeric Conversion`** -- Matematik ammalda sodir bo'ladi. `Number(value)` orqali amalga oshirish mumkin.

Conversion quyidagi qoidalarga amal qiladi:

| Qiymat |  Aylanadi... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | String qanday bo'lsa shunday o'qiladi, ikkala tomondagi bo'sh joylar olib tashlanadi. Bo'sh string `0`ga aylanadi. Xatolik `NaN`ni qaytaradi. |

**`Boolean Conversion`** -- Mantiq operatorlarida sodir bo'ladi. `Boolean(value)` orqali amalga oshirish mumkin.

Quyidagi qoidalarga amal qiladi:

| Qiymat |  Aylanadi... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|boshqa har qanday qiymat| `true` |


Ushbu qoidalarning ko'pi tushunish va eslab qolishga oson. Odamlar odatda xato qiladigan e'tiborli istisnolar:

- `undefined` number sifatida `NaN`ga teng, `0`ga emas.
- `"0"` va faqat bo'shliqdan iborat string-lar `"   "` boolean sifatida true-ga teng.

Bu yerda object-lar yoritilmagan. JavaScript haqida ko'proq asosiy narsalarni o'rganganimizdan so'ng, faqat object-larga bag'ishlangan <info:object-toprimitive> bobida ularga yana qaytamiz.
