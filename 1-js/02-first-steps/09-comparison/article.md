# Taqqoslashlar 

Biz matematikadan ko'plab taqqoslash operatorlarini bilamiz.

Ular JavaScriptda quyidagicha yoziladi:

- Katta/kichik: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Katta/kichik yoki teng: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Teng: `a == b`, yodda tuting: `==` juft tenglik belgisi tenglik tekshiruvini bildiradi, bitta `a = b` esa tayinlashni bildiradi..
- Teng emas: matematikada inkor bu <code>&ne;</code>, lekin JavaScriptda u <code>a != b</code> kabi yoziladi.

Ushbu maqolada biz turli xil taqqoslash turlari, JavaScript ularni qanday yaratishi, shu jumladan muhim xususiyatlar haqida ko'proq bilib olamiz.

Oxirida siz "JavaScript g'alatiliklari" bilan bog'liq muammolarni oldini olish uchun yaxshi qo'llanma topasiz.

## Boolean bu natija

Barcha taqqoslash operatorlari boolean qiymat qaytaradi:

- `true` -- "ha", "to'g'ri" yoki "rost" ni anglatadi.
- `false` -- "yo'q", "noto'g'ri" yoki "yolg'on" ni anglatadi.

Misol uchun:

```js run
alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

Taqqoslash natijasini har qanday qiymat kabi o'zgaruvchiga tayinlash mumkin:

```js run
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true
```

## String taqqoslash

Bir string boshqasidan katta yoki emasligini ko'rish uchun JavaScript "lug'at" yoki "leksikografik" deb ataladigan tartibdan foydalanadi.

Boshqacha qilib aytganda, string-lar harfma-harf taqqoslanadi.

Misol uchun:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

Ikki string-ni solishtirish algoritmi oddiy:

1. Ikkala string-ning birinchi belgisini solishtiring.
2. Agar birinchi string-ning birinchi belgisi boshqa string-dan katta (yoki kichik) bo'lsa, birinchi string ikkinchisidan katta (yoki kichik) bo'ladi. Tamom.
3. Aks holda, agar ikkala string-ning birinchi belgilari bir xil bo'lsa, ikkinchi belgilarni shu tarzda solishtiring.
4. Ikkala string-ning oxirigacha takrorlang.
5. Agar ikkala string bir xil uzunlikda tugasa, ular tengdir. Aks holda, uzunroq satr katta bo'ladi.

Yuqoridagi birinchi misolda `'Z' > 'A'` taqqoslash birinchi bosqichda natijaga erishadi.

Ikkinchi taqqoslash `'Glow' va 'Glee'` uchun ko'proq qadamlar kerak, chunki string-lar har bir belgi bilan taqqoslanadi:

1. `G` bilan `G` bir xil.
2. `l` bilan `l` bir xil.
3. `e`dan `o` katta. Shu yerda to'xtaymiz. Birinchi string kattaroq.

```smart header="Not a real dictionary, but Unicode order"
Yuqorida keltirilgan taqqoslash algoritmi taxminan lug'atlar yoki telefon kitoblarida qo'llaniladigan algoritmga teng, ammo u mutlaq bir xil emas.
```
Masalan, string-ning holati muhim ahamiyat kasb etadi. Katta harf "A" kichik “a” ga teng emas. Qaysi biri kattaroq? Kichik `"a"`. Nega? Chunki kichik harf JavaScript ishlatadigan ichki kodlash jadvalida kattaroq indeksga ega (Unicode). Buning aniq tafsilotlari va oqibatlariga <info:string> bobida qaytamiz.
```
```

## Har xil turlarni taqqoslash

When comparing values of different types, JavaScript converts the values to numbers.
Har xil turlar qiymatlarini taqqoslayotganda JavaScript qiymatlarni number (sonlar) ga aylantirib oladi.

Misol uchun:

```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

Boolean qiymatlar uchun, `true` `1` ga aylanadi va `false` `0` ga aylanadi.

Misol uchun:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="A funny consequence"
Bir vaqtning o'zida ular bo'lishi mumkin:

- Ikkala qiymat teng.
- Biri boolean sifatida "to'g'ri", ikkinchisi boolean sifatida "noto'g'ri".

Misol uchun:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

JavaScript nuqtai nazaridan, bu natija normal holatdir. Tenglik tekshiruvi qiymatlarni raqamli konvertatsiya yordamida o'zgartiradi (shuning uchun `"0"` `0` bo'ladi), tashqi `Boolean` konvertatsiya esa boshqa qoidalar to'plamidan foydalanadi.
````

## Qat'iy tenglik

Doimiy tenglik tekshiruvi `==` kamchilikga ega. U `0`ni `false`dan farqlay olmaydi:

```js run
alert( 0 == false ); // true
```

Bo'sh string bilan ham xuddi shu xol takrorlanadi:

```js run
alert( '' == false ); // true
```

Buning sababi, har xil turdagi operandlarni tenglik operatori `==` raqamlarga aylantiradi. Bo'sh string, xuddi `false` kabi, nolga aylanadi.

Agar `0` ni `false` dan farqlamoqchi bo‘lsak, nima qilishimiz kerak?

**Qat'iy tenglik operatori `===` turni o'zgartirmasdan tenglikni tekshiradi.**

Boshqacha qilib aytganda, agar `a` va `b` har xil turdan bo'lsa, `a === b` ularni o'zgartirishga urinmasdan darhol `false`ni qaytaradi.

Keling, sinab ko'ramiz:

```js run
alert( 0 === false ); // false, because the types are different
```

`!=` ga o'xshash "qat'iy tengsizlik" operatori `!==` ham mavjud.

Qat'iy tenglik operatori yozish uchun biroz ko'proq vaqt talab etadi, lekin nima bo'layotganini aniq ko'rsatadi va xatolar uchun kamroq imkon qoldiradi.

## Null va undefined bilan taqqoslash

`Null` yoki `undefined` boshqa qiymatlar bilan solishtirilganda o'zini boshqacha tutadi.

Qat'iy tenglik tekshiruvi `===` uchun
: Bu qiymatlar har xil, chunki ularning har biri har xil turdan.

    ```js run
    alert( null === undefined ); // false
    ```

Noqat'iy tengsizlik tekshiruvi `==` uchun
: Bitta maxsus qoida mavjud. Bu ikkisi "sweet couple" (shirin juftlik)dir: ular bir-biriga teng (`==` ma'nosida), lekin boshqa qiymatga emas.

    ```js run
    alert( null == undefined ); // true
    ```

Matematik va boshqa taqqoslashlar `< > <= >=` uchun
: `null/undefined` sonlarga aylantiriladi: `null` `0`ga aylanadi, `undefined` esa `NaN`ga aylanadi.

Keling, ushbu qoidalarni qo'llaganimizda sodir bo'ladigan ba'zi kulgili narsalarni va eng muhimi, ular bilan qanday qilib tuzoqqa tushmaslik kerakligini ko'rib chiqaylik.

### G'alati natija: null vs 0

Keling, `null`ni nol bilan taqqoslab ko'ramiz:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Matematik jihatdan, bu g'alati. Oxirgi natija "`null` noldan katta yoki tengligini" ko'rsatadi, demak yuqoridagi taqqoslashlardan biri `true` bo'lishi kerak, lekin ularning ikkisi ham false.

Sababi shundaki, tenglik tekshiruvi `==` va taqqoslashlar `> < >= <=` turlicha ishlaydi. Taqqoslashlar `null`ni songa o'zgartiradi, unga `0` sifatida qaraydi. Shuning uchun (3) `null >= 0` true va (1) `null > 0` false.

Boshqa tomondan, `undefined` va `null` uchun `==` tenglik tekshiruvi shunday aniqlanadiki, hech qanday konversiyasiz ular bir-biriga tenglashadi va boshqa hech narsaga teng bo'lmaydi. Shuning uchun (2) `null == 0` false.

### Taqqoslab bo'lmas undefined

`Undefined` qiymati boshqa qiymatlar bilan taqqoslanmasligi kerak:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Nega u nolni buncha yomon ko'radi? Doim false!

Biz ushbu natijalarni olamiz chunki:

- `(1)` va `(2)` taqqoslashlar `false` ni qaytaradi chunki `undefined` `NaN` ga o'zgaradi va `NaN` hamma taqqoslashlar uchun `false` qaytaruvchi maxsus son qiymatdir. 
- `(3)` tenglik tekshiruvi `false` ni qaytaradi chunki `undefined` faqat `null` va `undefined` dan boshqa hech qayday qiymatga teng emas.

### Muammolardan qochamiz

Nega biz bu misollarni ko'rib chiqdik? Bu o'ziga xos xususiyatlarni doimo esda tutishimiz kerakmi? Xo'sh, unchalik emas. Aslida, vaqt o'tishi bilan bu murakkab narsalar asta-sekin tanish bo'lib qoladi, ammo ular bilan bog'liq muammolardan qochishning ishonchli yo'li bor:

- `===` qatiiy tenglikdan tashqari `undefined/null` bilan har qanday taqqoslashga alohida e'tibor bilan munosabatda bo'ling.
- Agar nima qilayotganingizga ishonchingiz komil bo'lmasa, o'zgaruvchisi `null/undefined` bo'lishi mumkin bo'lgan `>= > < <=` taqqoslashlardan foydalanmang. Agar o'zgaruvchi ushbu qiymatlarga ega bo'lsa, ularni alohida tekshiring.

## Xulosa

- Taqqoslash operatorlari boolean qiymat qaytaradi.
- String-lar "lug'at" tartibida harfma-harf taqqoslanadi.
- Har xil turdagi qiymatlarni taqqoslaganda, ular raqamlarga aylanadi (qat'iy tenglik tekshiruvi bundan mustasno).
- `Null` va `undefined` bir biriga `==` teng, boshqa hech qaysi qiymatga teng emas.
- `>` yoki `<` taqqoslashlarini o'zgaruvchilar bilan ishlatayotganda ehtiyot bo'ling chunki ular vaqti vaqti bilan `null/undefined` bo'lishi mumkin. `Null/undefined` ni alohida tekshirish yaxshiroq. 
