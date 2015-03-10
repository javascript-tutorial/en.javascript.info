Для копирования массива используем `slice()`, и тут же -- сортировку:

```js
//+ run
var arr = ["HTML", "JavaScript", "CSS"];

*!*
var arrSorted = arr.slice().sort();
*/!*

alert( arrSorted );
alert( arr );
```

