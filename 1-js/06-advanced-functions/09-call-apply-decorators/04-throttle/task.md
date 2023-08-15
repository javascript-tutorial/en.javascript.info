muhimlik: 5

---

# Throttle dekorator

Wrapperni qaytaruvchi “throttling” dekorator `throttle(f, ms)` yarating.

Bir necha marta chaqirilganda, u chaqiruvni millisekundlarda bir marta f ga o'tkazadi.

Debounce dekoratori bilan solishtirganda, xatti-harakatlar butunlay boshqacha:
- `debounce` funksiyani "sovutish" davridan keyin bir marta ishga tushiradi. Yakuniy natijani qayta ishlash uchun yaxshi.
- `throttle` uni berilgan `ms` vaqtidan tez-tez ishlatmaydi. Tez-tez bo'lmasligi kerak bo'lgan muntazam yangilanishlar uchun yaxshi.

Boshqacha qilib aytganda, `throttle` telefon chaqiruvlarini qabul qiladigan kotibga o'xshaydi, lekin xo'jayinni bezovta qiladi (haqiqiy `f` ni chaqiradi) `ms` millisekundiga bir martadan ko'p emas.

Keling, ushbu talabni yaxshiroq tushunish va u qayerdan kelganini bilish uchun real hayotdagi ilovani tekshirib ko'raylik.

**Misol uchun, biz sichqoncha harakatlarini kuzatishni xohlaymiz.**

Brauzerda biz sichqonchaning har bir harakatida ishlaydigan funksiyani o'rnatishimiz va u harakatlanayotganda ko'rsatgichning joylashishini olishimiz mumkin. Sichqonchadan faol foydalanish paytida bu funksiya odatda juda tez-tez ishlaydi, sekundiga 100 marta (har 10 ms) bo'lishi mumkin.

**Koʻrsatkich harakatlanayotganda veb-sahifadagi baʼzi maʼlumotlarni yangilashni xohlaymiz.**

...Ammo `update()` funksiyasini yangilash har bir mikro-harakatda bajarish uchun juda og‘ir. Bundan tashqari, 100ms uchun bir martadan ko'proq yangilanishning ma'nosi yo'q.

Shunday qilib, biz uni dekoratorga o'tkazamiz: asl `update()` o'rniga sichqonchaning har bir harakatida ishga tushirish uchun funktsiya sifatida `throttle(update, 100)` dan foydalaning. Dekorator tez-tez chaqiriladi, lekin chaqiruvni `update()` ga maksimal 100msda bir marta yo'naltiring.

Vizual ravishda u quyidagicha ko'rinadi:

1. Sichqonchaning birinchi harakati uchun bezatilgan variant darhol “yangilanish”ga chaqiruv qiladi. Bu juda muhim, foydalanuvchi ularning harakatiga bizning munosabatimizni darhol ko'radi.
2. Keyin sichqoncha harakatlanar ekan, `100ms`gacha hech narsa sodir bo'lmaydi. Bezatilgan variant chaqiruvlarga e'tibor bermaydi.
3. `100ms` oxirida -- oxirgi koordinatalar bilan yana bir `update` sodir bo'ladi.
4. Keyin, nihoyat, sichqoncha bir joyda to'xtaydi. Bezatilgan variant `100ms` muddati tugaguncha kutadi va so‘ng oxirgi koordinatalar bilan `update`ni ishga tushiradi. Shunday qilib, juda muhim, oxirgi sichqoncha koordinatalari qayta ishlanadi.

Kod misolida:

```js
function f(a) {
  console.log(a);
}

// f1000 f ga chaqiruvlarni 1000 msda maksimal bir marta o'tkazadi
let f1000 = throttle(f, 1000);

f1000(1); // 1 ko'rsatadi
f1000(2); // (throttling, 1000ms hali tugamagan)
f1000(3); // (throttling, 1000ms hali tugamagan)

// 1000 ms vaqt tugashi bilan...
// ...chiqishlar 3, oraliq qiymat 2 e'tiborga olinmadi
```

P.S. Argumentlar va `f1000` ga o'tkazilgan `this` konteksti asl `f` ga o'tkazilishi kerak.
