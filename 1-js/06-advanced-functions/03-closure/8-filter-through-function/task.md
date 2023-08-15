importance: 5

---

# Funktsiya orqali filtrlash

Bizda massivlar uchun o‘rnatilgan `arr.filter(f)` usuli mavjud. U barcha elementlarni `f` funksiyasi orqali filtrlaydi. Agar u `true` qiymatini qaytarsa, u holda bu element olingan massivda qaytariladi.

"Foydalanishga tayyor" filtrlar to'plamini yarating:

- `inBetween(a, b)` -- `a` va `b` orasida yoki ularga teng (shu jumladan).
- `inArray([...])` -- berilgan massivda.

Foydalanish quyidagicha bo'lishi kerak:

- `arr.filter(inBetween(3,6))` -- faqat 3 dan 6 gacha bo'lgan qiymatlarni tanlaydi.
- `arr.filter(inArray([1,2,3]))` -- faqat `[1,2,3]` a`zolaridan biri bilan mos keladigan elementlarni tanlaydi.

For instance:

```js
/* .. inBetween and inArraydagi kodingiz */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

