muhimlik: 3

---

# Massivni aralashtirish

Massiv elementlarini aralashtiruvchi (tasodifiy tartibni o'zgartiruvchi) `shuffle(massiv)` funksiyasini yozing.

Bir nechta `shuffle` elementlarning turli tartiblariga olib kelishi mumkin. Misol uchun:

```js
let arr = [1, 2, 3];

shuffle(arr);
// arr = [3, 2, 1]

shuffle(arr);
// arr = [2, 1, 3]

shuffle(arr);
// arr = [3, 1, 2]
// ...
```

Barcha element tartiblari teng ehtimollikka ega bo'lishi kerak. Masalan, `[1,2,3]` teng ehtimollik bilan `[1,2,3]` yoki `[1,3,2]` yoki `[3,1,2]` va hokazo sifatida qayta tartiblanishi mumkin har bir holatda.
