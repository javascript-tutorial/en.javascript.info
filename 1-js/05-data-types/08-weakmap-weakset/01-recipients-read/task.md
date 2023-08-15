muhimlik: 5

---

# "O'qilmagan" bayroqlarni saqlang

Bir qator xabarlar mavjud:

```js
let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];
```

Sizning kodingiz unga kirishi mumkin, ammo xabarlar boshqa birovning kodi tomonidan boshqariladi. Yangi xabarlar qo'shiladi, eskilari o'sha kod orqali muntazam ravishda o'chiriladi va siz bu sodir bo'lgan aniq daqiqalarni bilmaysiz.

Endi xabar "o'qilgan" yoki yo'qligi haqidagi ma'lumotlarni saqlash uchun qaysi ma'lumotlar strukturasidan foydalanishingiz mumkin? Tuzilish "o'qilganmi?" Deb javob berish uchun juda mos bo'lishi kerak. berilgan xabar ob'ekti uchun.

P.S. Xabar `messages` dan o'chirilganda, u sizning tuzilmangizdan ham yo'qolishi kerak.

P.P.S. Biz xabar ob'ektlarini o'zgartirmasligimiz kerak, ularga o'z xususiyatlarini qo'shmasligimiz kerak. Ular boshqa birovning kodi tomonidan boshqarilsa, bu yomon oqibatlarga olib kelishi mumkin.
