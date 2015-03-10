Так как окончательная длина строки должна быть `maxlength`, то нужно её обрезать немного короче, чтобы дать место для троеточия.

```js
//+ run
function truncate(str, maxlength) {
  if (str.length > maxlength) {
    return str.slice(0, maxlength - 3) + '...';
    // итоговая длина равна maxlength
  }

  return str;
}

alert( truncate("Вот, что мне хотелось бы сказать на эту тему:", 20) );
alert( truncate("Всем привет!", 20) );
```

Можно было бы написать этот код ещё короче:

```js
//+ run
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 3) + '...' : str;
}
```

P.S. Кстати, в кодироке Unicode существует специальный символ "троеточие": `…` (HTML: `&hellip;`), который можно использовать вместо трёх точек. Если его использовать, то можно отрезать только один символ.
