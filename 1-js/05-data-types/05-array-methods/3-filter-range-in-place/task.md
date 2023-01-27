muhimlik: 4

---

# Filtr diapazoni "joyida"

`filterRangeInPlace(arr, a, b)` funksiyasini yozing, u `arr` massivini olsin va undan `a` va `b` orasidagi qiymatlardan tashqari barcha qiymatlarni olib tashlasin. Testi: `a ≤ arr[i] ≤ b`.

Funktsiya faqat massivni o'zgartirishi kerak. Bu hech narsani qaytarmasligi kerak.

Misol uchun:

```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 1 dan 4 gacha bo'lgan raqamlardan tashqari raqamlar olib tashlandi

alert(arr); // [3, 1]
```
