Да, распознает.

Он проверяет наследование с учётом цепочки прототипов.

```js
//+ run
function Animal() {}

function Rabbit() {}
Rabbit.prototype = Object.create(Animal.prototype);

var rabbit = new Rabbit();

alert( rabbit instanceof Rabbit ); // true
alert( rabbit instanceof Animal ); // true
alert( rabbit instanceof Object ); // true
```

