# Идея

Задача может быть решена несколькими способами. Один из них -- разбить строку по дефису `str.split('-')`, затем последовательно сконструировать новую.

# Решение

Разобьем строку в массив, а затем преобразуем его элементы и сольём обратно:

```js
//+ run
function camelize(str) {
  var arr = str.split('-');

  for(var i=1; i<arr.length; i++) {
    // преобразовать: первый символ с большой буквы
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join('');
}

alert( camelize("background-color"));   // backgroundColor
alert( camelize("list-style-image") );    // listStyleImage
alert( camelize("-webkit-transition") ); // WebkitTransition
```

