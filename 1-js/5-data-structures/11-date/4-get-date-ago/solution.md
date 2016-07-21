Из даты `date` нужно вычесть указанное количество дней.  Это просто:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

Ситуацию осложняет то, что исходный объект даты не должен меняться. Это разумное требование, оно позволит избежать сюрпризов.

Для того чтобы ему соответствовать, создадим копию объекта даты:

```js run
function getDateAgo(date, days) {
  var dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

var date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 января 2015)
alert( getDateAgo(date, 2) ); // 31, (31 декабря 2014)
alert( getDateAgo(date, 365) ); // 2, (2 января 2014)
```

