Для определения примитивного типа строка/число подойдет оператор [typeof](#type-typeof).

Примеры его работы:

```js
//+ run
alert( typeof 123 ); // "number"
alert( typeof "строка" ); // "string"
alert( typeof new Date() ); // "object"
alert( typeof [] ); // "object"
```

Оператор `typeof` не умеет различать разные типы объектов, они для него все на одно лицо: `"object"`. Поэтому он не сможет отличить `Date` от `Array`.

Используем для них утиную типизацию:

Функция:

```js
//+ run
function formatDate(date) {
  if (typeof date == 'number') {
    // перевести секунды в миллисекунды и преобразовать к Date
    date = new Date(date * 1000);
  } else if (typeof date == 'string') {
    // разобрать строку и преобразовать к Date
    date = date.split('-');
    date = new Date(date[0], date[1] - 1, date[2]);
  } else if (date.length) { // есть длина, но не строка - значит массив
    date = new Date(date[0], date[1], date[2]);
  }
  // преобразования для поддержки полиморфизма завершены, 
  // теперь мы работаем с датой (форматируем её)

  var day = date.getDate();
  if (day < 10) day = '0' + day;

  var month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;

  // взять 2 последние цифры года
  var year = date.getFullYear() % 100;
  if (year < 10) year = '0' + year;

  var formattedDate = day + '.' + month + '.' + year;

  return formattedDate;
}

alert( formatDate('2011-10-02') ); // 02.10.11
alert( formatDate(1234567890) ); // 14.02.09
alert( formatDate([2014, 0, 1]) ); // 01.01.14
alert( formatDate(new Date(2014, 0, 1)) ); // 01.01.14
```

