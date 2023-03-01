# Object.keys, qiymatlar, yozuvlar

Keling, alohida ma'lumotlar tuzilmalaridan uzoqlashaylik va ular ustidagi iteratsiyalar haqida gapiraylik.

Oldingi bobda biz `map.keys()`, `map.values()`, `map.entries()` metodlarini ko`rdik.

Ushbu metodlar umumiydir, ulardan ma'lumotlar tuzilmalari uchun foydalanish bo'yicha umumiy kelishuv mavjud. Agar biz o'zimizning ma'lumotlar tuzilmasini yaratsak, ularni ham amalga oshirishimiz kerak.

Ular quyidagilar uchun qo'llab-quvvatlanadi:

- `Map`
- `Set`
- `Array`

Oddiy ob'ektlar ham shunga o'xshash metodlarni qo'llab-quvvatlaydi, ammo sintaksis biroz boshqacha.

## Object.keys, qiymatlar, yozuvlar

Oddiy ob'ektlar uchun quyidagi metodlar mavjud:

- [Object.keys(obj)](mdn:js/Object/keys) -- kalitlar qatorini qaytaradi.
- [Object.values(obj)](mdn:js/Object/values) -- qiymatlar massivini qaytaradi.
- [Object.entries(obj)](mdn:js/Object/entries) -- `[kalit, qiymat]` juftlik massivini qaytaradi.

Farqlarga e'tibor bering (masalan, mapga nisbatan):

|                       | Map            | Object                                     |
| --------------------- | -------------- | ------------------------------------------ |
| chaqiruv sintaksisi | `map.keys()`   | `Object.keys(obj)`, ammo `obj.keys()` emas |
| Qaytaradi             | takrorlanuvchi | "haqiqiy" Masvic                           |

Birinchi farq shundaki, biz `obj.keys()` emas, balki `Object.keys(obj)` ni chaqirishimiz kerak.

Nega shunday? Asosiy sabab - moslashuvchanlik. Esda tutingki, ob'ektlar JavaScript-dagi barcha murakkab tuzilmalarning asosidir. Shunday qilib, bizda o'zining `data.values()` metodini amalga oshiradigan "ma'lumotlar" kabi o'z ob'ektimiz bo'lishi mumkin. Va biz hali ham `Object.values(data)` ni chaqirishimiz mumkin.

Ikkinchi farq shundaki, `Object.*` metodlari shunchaki takrorlanuvchi emas, balki «haqiqiy» massiv obyektlarini qaytaradi. Bu asosan tarixiy sabablarga ko'ra.

Masalan:

```js
let user = {
  ism: "John",
  yosh: 30,
};
```

- `Object.keys(user) = ["ism", "yosh"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["ism","John"], ["yosh",30] ]`

Xususiyat qiymatlari ustidan aylanish uchun `Object.values` dan foydalanishga misol:

```js run
let user = {
  ism: "John",
  yosh: 30,
};

// qiymatlarni aylantirish
for (let value of Object.values(user)) {
  alert(value); // John, keyin 30
}
```

``warn header="Object.keys/values/entries ramziy xususiyatlarga e'tibor bermaydi""
Xuddi `for..in`tsikli kabi, bu metodlar kalit sifatida`Symbol(...)` dan foydalanadigan xususiyatlarni e'tiborsiz qoldiradi.

Odatda bu qulay. Ammo agar biz ramziy kalitlarni ham xohlasak, unda faqat ramziy kalitlar qatorini qaytaradigan alohida metod [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) mavjud. Bundan tashqari, _all_ kalitlarni qaytaradigan [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) metodi mavjud.

``

## Ob'ektlarni o'zgartirish

Ob'ektlarda massivlar uchun mavjud bo'lgan ko'plab metodlar mavjud emas, masalan. `map`, `filter` va boshqalar.

Agar biz ularni qo'llamoqchi bo'lsak, `Object.entries` dan keyin `Object.fromEntries` dan foydalanishimiz mumkin:

1. `obj`dan kalit/qiymat juftliklari qatorini olish uchun `Object.entries(obj)` dan foydalaning.
2. Ushbu massivda massiv metodlaridan foydalaning, masalan. `map`, bu kalit/qiymat juftlarini aylantirish uchun.
3. Olingan massivni ob'ektga aylantirish uchun `Object.fromEntries(array)` dan foydalaning.

Misol uchun, bizda narxlari bo'lgan ob'ekt bor va ularni ikki barobarga oshirishni xohlaymiz:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // narxlarni massivga aylantiring, har bir kalit/qiymat juftligini boshqa juftlikka xaritalang
  // va keyin fromEntries ob'ektni qaytarib beradi
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);
*/!*

alert(doublePrices.meat); // 8
```

Bu birinchi qarashda qiyin ko'rinishi mumkin, lekin uni bir yoki ikki marta ishlatganingizdan keyin tushunish oson bo'ladi. Shu tarzda biz kuchli o'zgarishlar zanjirlarini yaratishimiz mumkin.
