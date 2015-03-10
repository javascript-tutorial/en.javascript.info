# Определите, пуст ли объект

[importance 5]

Создайте функцию `isEmpty(obj)`, которая возвращает `true`, если в объекте нет свойств и `false` -- если хоть одно свойство есть.

Работать должно так:

```js
function isEmpty(obj) {
  /* ваш код */
}

var schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "подъём";

alert( isEmpty(schedule) ); // false
```

