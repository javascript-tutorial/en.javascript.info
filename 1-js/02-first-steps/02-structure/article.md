# Kod tuzilishi

Biz o'rganadigan birinchi narsa - kodning qurilish bloklari.

## Bayonotlar

Bayonotlar sintaksis tuzilmalari va amallarni bajaradigan buyruqlardir.

Biz allaqachon `alert('Salom, dunyo!')` bayonotini ko'rganmiz, unda "Salom, dunyo!" xabari ko'rsatiladi. 

Kodimizda biz xohlagancha ko'p bayonotlar bo'lishi mumkin. Bayonotlarni nuqtali vergul bilan ajratish mumkin.

Masalan, biz bu yerda "Salom dunyo" ni ikkita ogohlantirishga ajratamiz:

```js run no-beautify
alert('Hello'); alert('World');
```
Odatda, kodni o'qilishi yanada oson bo'lishi uchun bayonotlar alohida satrlarda yoziladi:

```js run no-beautify
alert('Hello');
alert('World');
```

## Nuqtali vergul [#semicolon]

Ko'p hollarda satr uzilishi mavjud bo'lsa, nuqtali vergul tushirib qoldirilishi mumkin.

Bu ham ishlaydi:

```js run no-beautify
alert('Hello')
alert('World')
```
Bu yerda JavaScript satr uzilishini "noto'g'ri" nuqtali vergul sifatida izohlaydi. Bu [avtomatik nuqtali vergul qo'yish](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) deb ataladi.

**Aksariyat hollarda yangi qator nuqtali vergulni bildiradi. Ammo "ko'p hollarda" "har doim" degani emas!**

Yangi qator nuqtali vergulni bildirmaydigan holatlar mavjud. Masalan:

```js run no-beautify
alert(3 +
1
+ 2);
```

Kod `6` chiqaradi, chunki JavaScript bu yerga nuqtali vergul qo'ymaydi. Ko'rinib turibdiki, agar chiziq plyus `"+"` bilan tugasa, bu "to'liq bo'lmagan ifoda" bo'lib, u yerda nuqtali vergul noto'g'ri bo'ladi. Va bu holda, kod maqsadga muvofiq ishlaydi.

**Ammo JavaScriptdagi haqiqatan zarur bo'lgan joyga nuqta-vergul qo'yish "muvaffaqiyatsiz" qoladigan holatlar ham mavjud.**

Bunday hollarda yuzaga keladigan xatolarni topish va tuzatish juda qiyin.

````smart header="Xatoga misol"
Agar siz bunday xatoning aniq misolini ko'rishni bilmoqchi bo'lsangiz, ushbu kodni tekshiring:

```js run
alert("Hello");

[1, 2].forEach(alert);
```

`[]` va `forEach` qavslarining ma`nosi haqida o`ylashning hojati yo'q. Biz ularni keyinroq o'rganamiz. Hozircha kodni ishga tushirish natijasini eslab qoling: u "Salom", keyin "1", keyin "2" ni ko'rsatadi.

Endi `alert` dan keyin nuqtali vergulni olib tashlaymiz:

```js run no-beautify
alert("Hello")

[1, 2].forEach(alert);
```
Yuqoridagi kod bilan solishtirganda farq faqat bitta belgidan iborat: birinchi qatorning oxiridagi nuqtali vergul yo'qolgan.

Agar biz ushbu kodni ishga tushirsak, faqat birinchi "Salom" ko'rinadi (va xatolik bor, uni ko'rish uchun konsolni ochishingiz kerak bo'lishi mumkin). Boshqa raqamlar mavjud emas.

Buning sababi, JavaScript `[...]` kvadrat qavs oldidan nuqtali vergul qo'ymaydi. Shunday qilib, oxirgi misoldagi kod bitta bayonot sifatida ko'rib chiqiladi.

Dvigatel buni qanday ko'radi:

```js run no-beautify
alert("Hello")[1, 2].forEach(alert);
```

G'alati ko'rinadi, to'g'rimi? Bu holda bunday birlashish noto'g'ri. Kod to'g'ri ishlashi uchun `alert` dan keyin nuqta-vergul qo'yishimiz kerak.

Bu boshqa holatlarda ham sodir bo'lishi mumkin.
````

Agar ular yangi qatorlar bilan ajratilgan bo'lsa ham, gaplar orasiga nuqtali vergul qo'yishni tavsiya qilamiz. Bu qoida jamiyat tomonidan keng qabul qilingan. Yana bir bor ta'kidlaymiz -- ko'p hollarda nuqtali vergul qo'yish mumkin *. Ammo ulardan foydalanish, ayniqsa yangi boshlanuvchilar uchun ancha xavfsiz.

## Sharhlar [#code-comments]

Vaqt o'tishi bilan dasturlar yanada murakkablashadi. Kod nima qilishini va nima uchun ekanligini tavsiflovchi *sharhlar* qo'shish kerak bo'ladi.

Sharhlar skriptning istalgan joyiga qo'yilishi mumkin. Sharhlar uning bajarilishiga ta'sir qilmaydi, chunki dvigatel ularni e'tiborsiz qoldiradi.

**Bir qatorli sharhlar ikkita qiyshiq chiziqli `//` belgisi bilan boshlanadi.**

Qatorning qolgan qismi sharhdir. U o'zining to'liq qatorini egallashi yoki bayonotga amal qilishi mumkin.

Huddi quydagidek:
```js run
// Bu sharh o'ziga xos qatorni egallaydi
alert('Hello');

alert('World'); // Ushbu sharh bayonotni kuzatib boradi
```

**Ko‘p qatorli izohlar to‘g‘ridan-to‘g‘ri chiziq va yulduzcha <code>/&#42;</code> bilan boshlanib, yulduzcha va to‘g‘ri chiziq <code>&#42;/</code> bilan tugaydi.**

Quyidagi kabi:

```js run
/* Ikki xabarli misol.
Bu ko'p qatorli sharh.
*/
alert('Hello');
alert('World');
```

Izohlar mazmuni e'tiborga olinmaydi, shuning uchun kodni <code>/&#42; ... &#42;/</code>ga yozsak, u bajarilmaydi.

Ba'zan kodning bir qismini vaqtincha o'chirib qo'yish qulay bo'lishi mumkin:

```js run
/* Commenting out the code
alert('Hello');
*/
alert('World');
```

```smart header="Issiq tugmalardan foydalaning!"
Aksariyat muharrirlarda bitta qatorli izoh uchun “Ctrl+/” qisqa tugmachasini va ko‘p qatorli izohlar uchun “Ctrl+Shift+/” tugmachasini bosish orqali kod qatorini sharhlash mumkin (kod qismini tanlang). va tezkor tugmani bosing). Mac uchun `key:Ctrl` o`rniga `key:Cmd` va `key:Shift` o`rniga `key:Option`ni sinab ko`ring.
```

````warn header="Ichki izohlar qo'llab-quvvatlanmaydi!"
Boshqa `/*...*/` ichida `/*...*/` bo`lmasligi mumkin.

Bunday kod xato bilan o'ladi:

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````

Iltimos, kodingizni sharhlashdan tortinmang.

Sharhlar umumiy kod izini oshiradi, lekin bu umuman muammo emas. Ishlab chiqarish serveriga nashr qilishdan oldin kodni kichiklashtiradigan ko'plab vositalar mavjud. Ular sharhlarni olib tashlaydi, shuning uchun ular ishchi skriptlarda ko'rinmaydi. Shuning uchun sharhlar ishlab chiqarishga umuman salbiy ta'sir ko'rsatmaydi.

Keyinchalik o'quv qo'llanmada <info:code-quality> bo'limi bo'lib, unda qanday qilib yaxshiroq sharh yozish mumkinligi tushuntiriladi.