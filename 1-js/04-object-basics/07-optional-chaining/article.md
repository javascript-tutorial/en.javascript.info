
# Ixtiyoriy zanjirlanish '?.'

[oxirgi brauzer="yangi"]

Ixtiyoriy zanjirlanish `?.` bu xatto agar o'rta xususiyat mavjud bo'lmasa ham, o'rnatilgan obyekt xususiyatlariga kirishning xavfsiz yo'lidir. 

## "Mavjud bo'lmagan xususiyat" muammosi

Agar siz qo'llanmani endi o'qib, JavaScriptni o'rganayotkan bo'lsangiz, bu muammoga hali duch kelmagan bo'lishingiz mumkin, ammo bu keng tarqalgan muammmolardan biridir.

Misol sifatida, faraz qilaylik, bizda foydalanuvchilar haqida ma'lumotni ushlab turuvchi `user` (foydalanuvchi) obyektlari bor.

Ko‘pchilik foydalanuvchilarimiz `user.address` xususiyatida, `user.address.street` ko‘chasida manzillarga ega, biroq ba’zilari ularni ko'rsatmagan.
Bunday vaziyatda, `user.address.street` ni olishga harakat qilganimizda, va foydalanuvchi manzilsiz bo'lib chiqsa, biz xatolikka duch kelamiz:

```js run
let user = {}; // ""manzil" xususiyatiga ega bo'lmagan foydalanuvchi 

alert(user.address.street); // Xatolik!
```

Bu kutilgan natija. JavaScript shunday ishlaydi. `user.address` `undefined` (aniqlanmagan) bo'lganligi tufayli, `user.address.street` ni olishga bo'lgan harakat xatoga uchrab muvoffaqiyatsiz yakunlanadi. 

Ko'plab amaliy holatlarda, biz xato (bu yerda "ko'cha yo'q" degan ma'noni bildiradi) ni o'rniga `undefined` ni olishni afzal ko'ramiz. 

...boshqa bir misol. Web dasturlashda  biz `document.querySelector('.elem')` kabi maxsus usul chaqiruvi yordamida web-sahifa elementiga mos keladigan ob'ektni olishimiz mumkin va bunday element bo'lmaganda u "null" qiymatini qaytaradi.

```js run
// Agar element (tarkibiy qism) bo'lmasa document.querySelector('.elem') nol bo'ladi
let html = document.querySelector('.elem').innerHTML; // Agar nol bo'lsa xato hisoblamadi
```

Yana bir bor, agar element mavjud bo'lmasa, `null` ning `.innerHTML` ga kirishda xatolikka duch kelamiz. Va ba'zi hollarda, elementning yo'qligi normal bo'lsa, biz xatolikka yo'l qo'ymaslikni va natija sifatida "html = null" ni qabul qilishni xohlaymiz.

Buni qanday qilishimiz mumkin?

Eng aniq yechim xususiyatga kirishdan oldin `if` yoki shartli operator`?` yordamida qiymatni tekshirish bo'ladi, xuddi quyidagi kabi:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

Bu narsa ish beradi, hech qanday xatolik yo'q... Ammo u ancha noaniq. Ko'rib turganingizdek, `"user.address"` kodda ikki marta qaytarilyapti. Ko'proq takrorlash talab etilganligi tufayli chuqurroq joylashtirilgan xususiyatlar uchun bu muammoga aylanib qoladi. 

Masalan, `user.address.street.name` ni olishga harakat qilaylik.

Biz ham `user.address`ni ham `user.address.street`ni tekshirishimiz kerak:

```js
let user = {}; // foydalanuvchining manzili yo'q

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

Bu shunchaki juda yomon, hatto bunday kodni tushunishda muammolar ham bo'lishi mumkin.

Bunga ahamiyat bermang, chunki uni `&&` operatoridan foydalanib, yozishning yaxshiroq usuli bor:

```js run
let user = {}; // foydalanuvchining manzili yo'q

alert( user.address && user.address.street && user.address.street.name ); // aniqlanmagan (xato yo'q)
```

VA xossaga boradigan butun yo'l barcha komponentlarning mavjudligini ta'minlaydi (agar bo'lmasa, baholash to'xtaydi), lekin ayni paytda ideal emas.

Ko'rib turganingizdek, kodda xossa nomlari hali ham takrorlanib turibdi. Masalan, yuqoridagi kodda "user.address" uch marta paydo qaytarilyapti. 

Shuning tufayli tilga ixtiyoriy zanjirbandlik `?.` qo`shilgan. Bu muammoni bir marta va barcha uchun ahl qiladi!

## Ixtiyoriy zanjirlanish

 Agar `?` dan avvalgi qiymat `undefined` (aniqlanmagan) yoki `null` bo'lsa, ixtiyoriy zanjirlanish `?`  baholashni to'xtatadi, va `undefined` (aniqlanmagan)ga qaytadi. 

**Keyinchalik ushbu maqolada, qisqa qilib, agar u `nul` yoki `aniqlanmagan` bo'lmasa, “mavjud” deb hisoblaymiz.**

Boshqa so'z bilan aytkanda, `qiymat?.prop`:
- Agar `value`(qiyamt) mavjud bo'lsa `value.prop` sifatida ishlaydi,
- Aks holda (`value` (qiymat) `undefined/null` (aniqlanmagan/nol) bo'lganda) u `undefined` ga qaytadi.

Quyidagi `?.` dan foydalanib `user.address.street`ga kirishning xavfsiz yo'li:

```js run
let user = {}; // foydalanuvchining manzili yo'q

alert( user?.address?.street ); // aniqlanmagan (xato mavjud emas)
```

Kod qisqa va aniq, hech qanday takrorlanishlar mavjud emas. 

Manzilni `user?.address` bilan o'qish hatto `user` obyekti mavjud bo'lmasa ham ishlay oladi:

```js run
let user = null;

alert( user?.address ); // aniqlanmagan
alert( user?.address.street ); // aniqlanmagan
```

Esda tuting: `?.` sintaksisi o'zidan oldingi qiymatni ixtiyoriy qiladi, lekin bundan ortig'ini emas.

Masalan, `user?.address.street.name` da `?.` `foydalanuvchi` ga xavfsiz tarzda `noll/aniqlanmagan` bo‘lishiga imkon beradi (va bu holda `aniqlanmagan`ni qaytaradi, lekin bu faqat `foydalanuvchi` uchun. Qo'shimcha xususiyatlarga esa odatiy tarzda kirish mumkin. Agar ulardan ba'zilari ixtiyoriy bo'lishini istasak, ko'proq `.` ni `?.` bilan almashtirishimiz kerak bo'ladi.

```warn header="Ixtiyoriy zanjirndan keragidan ortiq foydalanmang"
Biz `?.` dan faqat biror narsa mavjud bo'lmasligi zarari yo'q bo'lgan hollarda foydalanishimiz kerak.

Misol uchun, agar bizning kodlash mantiqimizga ko'ra, `foydalanuvchi` ob'ekti mavjud bo'lishi kerak, lekin `manzil` ixtiyoriy bo'lsa, biz `foydalanuvchi.manzil?. ko'cha` ni yozishimiz kerak, lekin `foydalanuvchi?manzil?.ko'cha` ni emas.

Shunday qilib, agar "foydalanuvchi" xato tufayli aniqlanmagan bo'lsa, bu haqda dasturlash xatosini ko'ramiz va uni tuzatamiz.
Aks holda, kodlash xatolari mos bo'lmagan joyda o'chirilishi mumkin va debug qilish qiyinroq bo'lib qoladi.
```

````warn header="The variable before `?.` ma'lum qilinishi kerak"
Agar `user` o‘zgaruvchisi umuman bo‘lmasa, `user?.anything` xatolikni keltirib chiqaradi:

```js run
// ReferenceError: foydalanuvchi aniqlanmagan
user?.address;
```
Oʻzgaruvchi eʼlon qilinishi kerak (masalan, “let/const/var user” yoki funksiya parametri sifatida). Ixtiyoriy zanjir faqat e'lon qilingan o'zgaruvchilar uchun ishlaydi.
````

## Qisqa tutashuv

Yuqorida aytib o'tilganidek, agar chap qism mavjud bo'lmasa, `?.` darhol baholashni to'xtatadi ("qisqa tutashuvlar").

Shuning uchun, agar boshqa funktsiya chaqiruvlari yoki nojo'ya ta'sirlar mavjud bo'lsa, ular yuzaga kelmaydi.

Misol uchun:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // "sayHi" yo'q, shuning uchun amal x++ ga etib bormaydi

alert(x); // 0, qiymat oshirilmagan
```

## Boshqa variantlar: ?.(), ?.[]

Ixtiyoriy zanjirlash `?.` operator emas, balki funksiyalar va kvadrat qavslar bilan ham ishlaydigan maxsus sintaksis konstruktsiyasidir.


Masalan, `?.()` mavjud bo`lmasligi mumkin bo`lgan funksiyani chaqirish uchun ishlatiladi.

Quyidagi kodda ba'zi foydalanuvchilarimiz "admin" usuliga ega, ba'zilarida esa yo'q:

```js run
let userAdmin = {
  admin() {
    alert("Men adminman");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // Men adminman
*/!*

*!*
userGuest.admin?.(); // hech narsa (bunday usul yo'q)
*/!*
```

Bu yerda ikkala qatorda ham `admin` xususiyatini olish uchun avval nuqtadan (`userAdmin.admin`) foydalanamiz, chunki biz foydalanuvchi obyekti mavjud deb hisoblaymiz, shuning uchun uni xavfsiz o'qish mumkin.

Keyin `?.()` chap qismni tekshiradi: agar admin funksiyasi mavjud bo'lsa, u ishlaydi ("userAdmin" uchun shunday). Aks holda (`userGuest` uchun) baholash xatosiz to`xtaydi.

Agar biz nuqta `.` o`rniga xususiyatlarga kirish uchun `[]` qavslardan foydalanmoqchi bo`lsak, `?.[]` sintaksisi ham ishlaydi. Oldingi holatlarga o'xshab, u mavjud bo'lmagan ob'ektdan xususiyatni xavfsiz o'qish imkonini beradi.

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null; 

alert( user1?.[key] ); // John
alert( user2?.[key] ); // aniqlanmagan 
```

Shuningdek, `?.` ni `delete` bilan ham foydalanishimiz mumkin:

```js run
foydalanuvchini o'chirish?.name; // agar foydalanuvchi mavjud bo'lsa, user.name o'chiriladi
```

````warn header="Biz xavfsiz o'qish va o'chirish uchun `?.` dan foydalanishimiz mumkin, lekin yozish uchun emas"
Ixtiyoriy zanjirli `?.` topshiriqning chap tomonida ishlatilmaydi.

Masalan:
```js run
let user = null;

user?.name = "John"; // Xato, ishlamayapti
// chunki u undefined = "John" ga baholanadi
```

Bu shunchaki aqlli ish emas.
````

## Xulosa 

Ixtiyoriy zanjirli `?.` sintaksisi uchta shaklga ega:

1. Agar `obj` mavjud bo'lsa `obj?.prop` -- qaytadi `obj.prop` ga, aks holda `aniqlanmagan`.
2. `obj?.[prop]` -- agar `obj` mavjud bo'lsa, `obj[prop]`ni qaytaradi, aks holda `aniqlanmagan`.
3. `obj.method?.()` -- agar `obj.method` mavjud bo'lsa, `obj.method()` ni chaqiradi, aks holda `aniqlanmagan`ni qaytaradi.

Ko'rib turganimizdek, ularning barchasi oddiy va ulardan foydalanish oson. `?.` chap qismda `null/nodefined` mavjudligini tekshiradi va agar bunday bo'lmasa, baholashni davom ettirishga imkon beradi.

`?.` zanjiri ichki kiritilgan xususiyatlarga xavfsiz kirish imkonini beradi.

Shunga qaramay, biz `?.` ni faqat chap qism mavjud bo'lmagan hollarda ehtiyotkorlik bilan qo'llashimiz kerak. Agar dasturlash xatolari yuzaga kelsa, ularni bizdan yashirmasligi uchun.