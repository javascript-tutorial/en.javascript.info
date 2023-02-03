Kelgusi oydan foydalanib sana yarataylik, lekin kun sifatida nolni belgilaymiz:

```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert(getLastDayOfMonth(2012, 0)); // 31
alert(getLastDayOfMonth(2012, 1)); // 29
alert(getLastDayOfMonth(2013, 1)); // 28
```

Odatda, sanalar 1 dan boshlanadi, lekin texnik jihatdan biz istalgan raqamni o'tkazishimiz mumkin, sana avtomatik ravishda sozlanadi. Shunday qilib, biz 0 dan o'tsak, bu "oyning 1-kunidan bir kun oldin", boshqacha aytganda: "oldingi oyning oxirgi kuni" degan ma'noni anglatadi.
