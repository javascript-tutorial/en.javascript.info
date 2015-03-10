Выведут **1,2,3,4.**

Здесь внутренняя функция будет искать -- и находить `currentCount` каждый раз в самом внешнем объекте переменных: глобальном объекте `window`.

В результате все счётчики будут разделять единое, глобальное текущее значение.

```js
//+ run
var currentCount = 1;

function makeCounter() {
  return function() {
    return currentCount++;
  };
}

var counter = makeCounter();
var counter2 = makeCounter();

*!*
alert( counter() ); // ?
alert( counter() ); // ?
*/!*

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

