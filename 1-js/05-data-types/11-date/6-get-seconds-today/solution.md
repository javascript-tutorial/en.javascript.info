Soniyalar sonini olish uchun biz joriy kun va vaqt 00:00:00 dan foydalanib sanani yaratishimiz mumkin, keyin uni "hozir" dan ayiramiz.

Farqi kun boshidan millisekundlar soni bo'lib, soniyalarni olish uchun biz 1000 ga bo'lishimiz kerak:

```js run
function getSecondsToday() {
  let now = new Date();

  // joriy kun/oy/yildan foydalanib ob'ekt yaratish
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms farqi
  return Math.round(diff / 1000); // soniyalar qilish
}

alert(getSecondsToday());
```

Muqobil yechim soat/daqiqa/sekundlarni olish va ularni soniyalarga aylantirishdir:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert(getSecondsToday());
```
