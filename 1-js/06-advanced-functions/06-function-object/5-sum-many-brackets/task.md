muhimlik: 2

---

# Qavslarning ixtiyoriy miqdori bilan yig'indisi

Shu tarzda ishlaydigan `sum` funksiyasini yozing:

```js
sum(1)(2) == 3; // 1 + 2
sum(1)(2)(3) == 6; // 1 + 2 + 3
sum(5)(-1)(2) == 6
sum(6)(-1)(-2)(-3) == 0
sum(0)(1)(2)(3)(4)(5) == 15
```

P.S. Maslahat: funksiyangiz uchun primitiv konvertatsiya qilish uchun maxsus ob'ektni sozlashingiz kerak bo'lishi mumkin.