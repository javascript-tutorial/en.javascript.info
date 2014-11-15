# Глобальный счётчик

[importance 5]

Что выведут эти вызовы, если переменная `currentCount` находится вне `makeCounter`?

```js
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

