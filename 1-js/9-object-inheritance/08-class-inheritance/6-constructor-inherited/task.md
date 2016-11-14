importance: 5

---

# Что содержит constructor?

В коде ниже создаётся простейшая иерархия классов: `Animal -> Rabbit`.

Что содержит свойство `rabbit.constructor`? Распознает ли проверка в `alert` объект как `Rabbit`?

```js
function Animal() {}

function Rabbit() {}
Rabbit.prototype = Object.create(Animal.prototype);

var rabbit = new Rabbit();

alert( rabbit.constructor == Rabbit ); // что выведет?
```

