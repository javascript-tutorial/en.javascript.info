# Перекрытие переменной

[importance 4]

Если во внутренней функции есть своя переменная с именем `currentCount` -- можно ли в ней получить `currentCount` из внешней функции?

```js
function makeCounter() {
  var currentCount = 1;
    
  return function() { 
    var currentCount;
    // можно ли здесь вывести currentCount из внешней функции (равный 1)?
  };
}
```

