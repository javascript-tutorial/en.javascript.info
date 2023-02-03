muhimlik: 4

---

# Oyning qaysi kuni bir necha kun oldin edi?

`getDateAgo(sana, kunlar)` funksiyasini yarating. `sana`dan `kunlar` oldingi oy kunini qaytarish uchun.

Misol uchun, agar bugun 20-chi bo'lsa, `getDateAgo(new Date(), 1)` 19-chi va `getDateAgo(new Date(), 2)` 18-bo'lishi kerak.

`kunlar=365` yoki undan ko'p ishonchli ishlashi kerak:

```js
let date = new Date(2015, 0, 2);

alert(getDateAgo(date, 1)); // 1, (1 Yan 2015)
alert(getDateAgo(date, 2)); // 31, (31 Dek 2014)
alert(getDateAgo(date, 365)); // 2, (2 Yan 2014)
```

P.S. Funksiya berilgan `sana`ni o‘zgartirmasligi kerak.
