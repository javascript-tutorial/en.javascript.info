Мы не можем просто заменить первый символ, т.к. строки в JavaScript неизменяемы.

Но можно пересоздать строку на основе существующей, с заглавным первым символом:

```js
//+ run
function ucFirst(str) {
  var newStr = str.charAt(0).toUpperCase();

  for(var i=1; i<str.length; i++) {
    newStr += str.charAt(i);
  }

  return newStr;
}

alert( ucFirst("вася") );
```

P.S. Возможны и более короткие решения, использующие методы для работы со строками, которые мы пройдём далее.