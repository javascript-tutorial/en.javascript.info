
# Global ob'ekt

Global ob'ekt istalgan joyda mavjud bo'lgan o'zgaruvchilar va funktsiyalarni ta'minlaydi. Odatiy bo'lib, tilga yoki muhitga o'rnatilganlar.

Brauzerda u `window` deb nomlangan, Node.js uchun `global`, boshqa muhitlar uchun u boshqa nomga ega bo'lishi mumkin.

Yaqinda barcha muhitlarda qo'llab-quvvatlanishi kerak bo'lgan global ob'ekt uchun standartlashtirilgan nom sifatida tilga `globalThis` qo'shildi. U barcha asosiy brauzerlarda qo'llab-quvvatlanadi.

Bizning muhitimiz brauzer deb faraz qilsak, bu yerda `window` dan foydalanamiz. Agar skriptingiz boshqa muhitlarda ishlashi mumkin boʻlsa, uning oʻrniga `globalThis` dan foydalangan maʼqul.

Global ob'ektning barcha xususiyatlariga bevosita kirish mumkin:

```js run
alert("Hello");
window.alert("Hello");
// bu ikkisi bir xil
```

Brauzerda `var` (`let/const` emas!) bilan e'lon qilingan global funksiyalar va o'zgaruvchilar global ob'ektning mulkiga aylanadi:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (global ob'ektning mulkiga aylandi)
```

Funktsiya e'lonlari bir xil ta'sirga ega (asosiy kod oqimida funktsiya ifodalari emas, balki `function` kalit so'zi bo'lgan iboralar).

Iltimos, bunga ishonmang! Bu xatti-harakatlar muvofiqlik sabablari tufayli mavjud. Zamonaviy skriptlar bunday narsa sodir bo'lmaganda [JavaScript modullaridan](info:modules) foydalanadi.

Agar biz `let` o'rniga ishlatsak, bunday narsa bo'lmaydi:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (global ob'ektning mulkiga aylanmaydi)
```

Agar qiymat juda muhim bo'lsa, uni global miqyosda mavjud qilishni xohlasangiz, uni bevosita mulk sifatida yozing:

```js run
*!*
// barcha skriptlarga kirishiga ruxsat berish uchun joriy foydalanuvchi ma'lumotlarini global qiling
window.currentUser = {
  name: "John"
};
*/!*

// kodning boshqa joyida
alert(currentUser.name);  // John

// yoki agar bizda "currentUser" nomli mahalliy o'zgaruvchi bo'lsa
// uni windowdan aniq oling (xavfsiz!)
alert(window.currentUser.name); // John
```

Ya'ni, global o'zgaruvchilardan foydalanish odatda tavsiya etilmaydi. Iloji boricha kamroq global o'zgaruvchilar bo'lishi kerak. Funktsiya "input" o'zgaruvchilarini oladigan va ma'lum "natija" chiqaradigan kod dizayni tashqi yoki global o'zgaruvchilardan foydalangandan ko'ra aniqroq, xatolarga kamroq moyil va sinovdan o'tkazish osonroq.

## polyfillar uchun foydalanish

Biz zamonaviy til xususiyatlarini qo'llab-quvvatlashni tekshirish uchun global ob'ektdan foydalanamiz.

Masalan, o'rnatilgan `Promise` ob'ekti mavjudligini tekshirib ko'ring (bu eski brauzerlarda yo'q):
```js run
if (!window.Promise) {
  alert("Sizning brauzeringiz haqiqatan ham eski!");
}
```

Agar yo'q bo'lsa (aytaylik, biz eski brauzerdamiz), biz "polyfillar" yaratishimiz mumkin: atrof-muhit tomonidan qo'llab-quvvatlanmaydigan, ammo zamonaviy standartda mavjud bo'lgan funktsiyalarni qo'shing.

```js run
if (!window.Promise) {
  window.Promise = ... // zamonaviy til xususiyatini maxsus amalga oshirish
}
```

## Xulosa

- Global ob'ekt hamma joyda mavjud bo'lishi kerak bo'lgan o'zgaruvchilarga ega.

    Bunga JavaScript oʻrnatilgan `Array` va `window.innerHeight` kabi muhitga xos qiymatlar kiradi – brauzerdagi oyna balandligi.
- Global ob'ekt `globalThis` universal nomiga ega.

    ...Lekin ko'pincha `window` (brauzer) va `global` (Node.js) kabi "eski maktab" muhitga xos nomlar bilan ataladi.
- Biz qiymatlarni global ob'ektda saqlashimiz kerak, agar ular bizning loyihamiz uchun haqiqatan ham global bo'lsa. Va ularning sonini minimal darajada saqlang.
- Brauzerda, agar biz [modullar](info:modules) dan foydalanmasak, `var` bilan eʼlon qilingan global funksiyalar va oʻzgaruvchilar global obyektning xususiyatiga aylanadi.
- Kodimizni kelajakka mos va tushunarli qilish uchun global ob'ektning xususiyatlariga to'g'ridan-to'g'ri `window.x` sifatida kirishimiz kerak.
