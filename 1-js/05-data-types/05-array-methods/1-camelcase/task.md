Muhimlik: 5

---

# Border-left-width ni borderLeftWidth ga o'zgartiring.

`my-short-string` kabi chiziqcha bilan ajratilgan so'zlarni tuyali `myShortString` ga o'zgartiruvchi `camelize(str)` funksiyasini yozing.

Ya'ni: barcha tirelarni olib tashlaydi, chiziqdan keyingi har bir so'z bosh harfga aylanadi.

Misollar:

```js
camelize("background-color") == "backgroundColor";
camelize("list-style-image") == "listStyleImage";
camelize("-webkit-transition") == "WebkitTransition";
```

P.S. Maslahat: satrni massivga bo'lish, uni o'zgartirish va qayta qo'shilish uchun `split` dan foydalaning.
