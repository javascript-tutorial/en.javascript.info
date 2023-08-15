Fikr oddiy: berilgan kunlar sonini `date`dan ayirish:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...Ammo funksiya `date` ni o'zgartirmasligi kerak. Bu muhim narsa, chunki bizga sanani beradigan tashqi kod uning o'zgarishini kutmaydi.

Uni amalga oshirish uchun sanani klonlaymiz, masalan:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert(getDateAgo(date, 1)); // 1, (1 Yan 2015)
alert(getDateAgo(date, 2)); // 31, (31 Dek 2014)
alert(getDateAgo(date, 365)); // 2, (2 Yan 2014)
```
