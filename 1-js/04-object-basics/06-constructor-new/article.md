# Konstruktor, "new" (yangi) operatori

Oddiy `{...}` sintaksisi bizga bitta obyekt yaratish imkonini beradi. Lekin ko'pincha biz o'xshash obyektlarni yaratishimiz kerak, masalan, bir nechta foydalanuvchi, menyu elementlari va boshqalar.

Buni konstruktor funksiyalari va `"new` operatori yordamida amalga oshirish mumkin.

## Konstruktor funksiyasi

Konstruktor funktsiyalari texnik jihatdan muntazam funktsiyalardir. Shunga qaramay, ikkita konventsiya mavjud:

1. Ular birinchi navbatda bosh harf bilan nomlanadi.
2. Ular faqat `"new"` operatori bilan bajarilishi kerak.

Masalan:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

Funksiya `new` bilan bajarilganda, u quyidagi amallarni bajaradi:

1. Yangi bo'sh obyekt yaratiladi va `this` ga tayinlanadi.
2. Funksiya tanasi vazifa bajaradi. Odatda u `this` ni o'zgartiradi, unga yangi xususiyatlar qo'shadi.
3. `this` ning qiymati qaytariladi.

Boshqacha qilib aytganda, `new user(...)` quyidagiha ish qiladi:

```js
function User(name) {
*!*
  // this = {};  (implicitly)
*/!*

  // this ga xususiyatlar qo'shing
  this.name = name;
  this.isAdmin = false;

*!*
  // buni qaytaring; (bilvosita)
*/!*
}
```

Demak, `let user = new User("Jack")` quyidagi kabi bir xil naija beradi:

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

Endi biz boshqa foydalanuvchilarni yaratmoqchi bo'lsak, biz `new User("Ann")`, `new User("Alice")` va hokazolarni chaqirishimiz mumkin. Har safar harflarni ishlatishdan ancha qisqaroq va o'qish ham oson.

Bu konstruktorlarning asosiy maqsadi -- qayta foydalanish mumkin bo'lgan obyekt yaratish kodini amalga oshirish.

Yana bir bor ta'kidlaymiz -- texnik jihatdan har qanday funksiyadan (o'q funksiyalaridan tashqari, ularda `this` yo'q) konstruktor sifatida foydalanish mumkin. Uni `new` bilan ishga tushirish mumkin va u yuqoridagi algoritmni bajaradi. "Birinchi bosh harf" funksiyani `new` bilan bajarish kerakligini aniq ko'rsatish uchun umumiy kelishuvdir.

````smart header="new function() { ... }"
Agar bizda bitta murakkab obyektni yaratish bo'yicha ko'plab kod satrlari bo'lsa, biz ularni darhol chaqiriladigan konstruktor funktsiyasiga o'rashimiz mumkin, masalan:

```js
// funksiya yarating va darhol uni new bilan chaqiring
let user = new function() { 
  this.name = "John";
  this.isAdmin = false;

  // ...foydalanuvchi yaratish uchun boshqa kod
  // murakkab mantiq va bayonotlar
  // mahalliy o'zgaruvchilar va boshqalar
};
```
Bu konstruktorni qayta chaqirib bo'lmaydi, chunki u hech qayerda saqlanmaydi, shunchaki yaratiladi va chaqiriladi. Shunday qilib, bu hiyla kelajakda qayta ishlatmasdan, bitta obyektni yaratuvchi kodni inkapsulyatsiya qilishga qaratilgan.
````

## Konstruktor rejimi testi: new.target

```smart header="Advanced stuff"
Ushbu bo'limdagi sintaksis kamdan-kam qo'llaniladi, agar hamma narsani bilishni xohlamasangiz, uni o'tkazib yuboring.
```
Funksiya ichida biz maxsus `new.target` xususiyatidan foydalanib, `new` bilan yoki usiz chaqirilganligini tekshirishimiz mumkin.

Bu oddiy qo'ng'iroqlar uchun aniqlanmagan va `new` bilan chaqirilganda funksiyaga teng bo'ladi:

```js run
function User() {
  alert(new.target);
}

// "new" siz:
*!*
User(); // undefined
*/!*

// "new" bilan:
*!*
new User(); // function User { ... }
*/!*
```

Bu funksiya ichida `new` yoki "konstruktor rejimida" yoki usiz "muntazam rejimda" chaqirilganligini bilish uchun ishlatilishi mumkin.

Xuddi shunday qilish uchun biz `new` va oddiy qo'ng'iroqlarni ham qilishimiz mumkin, masalan:

```js run
function User(name) {
  if (!new.target) { // Agar siz meni new siz boshqarsangiz
    return new User(name); // ...Men siz uchun boshqa newni qo'shaman
  }

  this.name = name;
}

let john = User("John"); // qo'ng'iroqni yangi foydalanuvchiga yo'naltiradi
alert(john.name); // John
```

Ushbu yondashuv ba'zan sintaksisni yanada moslashuvchan qilish uchun kutubxonalarda qo'llaniladi. Shunday qilib, odamlar funksiyani `new` bilan yoki usiz chaqirishlari mumkin va u hali ham ishlaydi.

Ehtimol, hamma joyda foydalanish yaxshi emas, chunki `new` ni o'tkazib yubormaslik, nima bo'layotganini biroz kamroq ravshan qiladi. `new` bilan barchamiz yangi obyekt yaratilayotganini bilamiz.

## Konstruktorlardan qaytish

Odatda, konstruktorlarda `return` ifodasi mavjud emas. Ularning vazifasi `this` ga barcha kerakli narsalarni yozishdir va u avtomatik ravishda natijaga aylanadi.

Ammo `return` ifodasi bo'lsa, qoida oddiy:

- Agar `return` obyekt bilan chaqirilsa, u holda `this` o'rniga obyekt qaytariladi.
- Agar `return` primitive bilan chaqirilsa, u e'tiborga olinmaydi.

Boshqacha qilib aytganda, obyekt bilan `return` o'sha obyektni qaytaradi, qolgan barcha hollarda `this` qaytariladi.

Misol uchun, bu erda `return` obyektni qaytarish orqali `this` ni bekor qiladi:

```js run
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- this obyektini qaytaradi
}

alert( new BigUser().name );  // Godzilla, bu obyektni oldi
```

Va bu yerda bo'sh `return` bilan misol (yoki biz undan keyin primitiv qo'yishimiz ham mumkin):

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- this ni qaytaradi
}

alert( new SmallUser().name );  // John
```

Odatda konstruktorlarda `return` iborasi mavjud emas. Bu yerda biz asosan to'liqlik uchun qaytariladigan obyektlar bilan maxsus xatti-harakatlarni eslatib o'tamiz.

````smart header="Qavslarni olib tashlash"
Aytgancha, biz `new` dan keyin qavslarni olib tashlashimiz mumkin:

```js
let user = new User; // <-- qavslar yo'q
// same as
let user = new User();
```

Bu yerda qavslarni tashlab qo'yish "yaxshi uslub" deb hisoblanmaydi, lekin sintaksisga spetsifikatsiyaga muvofiq ruxsat beriladi.
````

## Konstruktorda usullar

Obyektlarni yaratish uchun konstruktor funksiyalaridan foydalanish katta moslashuvchanlikni beradi. Konstruktor funksiyasi obyektni qanday qurish va unga nima qo'yish kerakligini aniqlaydigan parametrlarga ega bo'lishi mumkin.

Albatta, biz `this` ga nafaqat xususiyatlarni, balki usullarni ham qo'shishimiz mumkin.

Masalan, quyida joylashgan `new User(name)` berilgan `name` va `sayHi` usuli bilan obyekt yaratadi:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

To create complex objects, there's a more advanced syntax, [classes](info:classes), that we'll cover later.
Murakkab ob'ektlarni yaratish uchun yanada rivojlangan sintaksis mavjud [sinflar] (ma'lumot: sinflar), biz ularni keyinroq ko'rib chiqamiz.

## Xulosa

- Konstruktor funksiyalari yoki qisqacha aytganda, konstruktorlar oddiy funksiyalardir, lekin ularni avval bosh harf bilan nomlash haqida umumiy kelishuv mavjud.
- Konstruktor funksiyalarini faqat `new` yordamida chaqirish kerak. Bunday qo'ng'iroq boshida bo'sh `this` ni yaratishni va oxirida to'ldirilganni qaytarishni anglatadi.

Biz bir nechta o'xshash obyektlarni yaratish uchun konstruktor funktsiyalaridan foydalanishimiz mumkin.

JavaScript ko'plab o'rnatilgan til obyektlari uchun konstruktor funksiyalarini taqdim etadi: sanalar uchun `Date`, to'plamlar uchun `Set` va biz o'rganishni rejalashtirgan boshqalar.

```smart header="Obyektlar, biz qaytib kelamiz!"
Ushbu bobda biz faqat obyektlar va konstruktorlar haqida asosiy ma'lumotlarni yoritamiz. Ular keyingi boblarda ma'lumotlar turlari va funksiyalari haqida ko'proq ma'lumot olish uchun zarurdir.

Buni o'rganganimizdan so'ng, biz obyektlarga qaytamiz va ularni <info:prototypes> va <info:classes> boblarida chuqurroq yoritamiz.
```
