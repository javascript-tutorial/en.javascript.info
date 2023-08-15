Ertaga millisekundlar sonini olish uchun biz "ertaga 00:00:00" dan joriy sanani ayirishimiz mumkin.

Birinchidan, biz "ertaga" ni yaratamiz va keyin buni qilamiz:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // tomorrow date
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
```

Muqobil yechim:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Shuni yodda tutingki, ko'plab mamlakatlarda yozgi vaqt (DST) mavjud, shuning uchun 23 yoki 25 soatlik kunlar bo'lishi mumkin. Biz bunday kunlarni alohida ko'rib chiqishni xohlaymiz.
