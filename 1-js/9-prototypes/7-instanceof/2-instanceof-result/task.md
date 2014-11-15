# Что выведет instanceof?

[importance 5]

В коде ниже создаётся простейшая иерархия классов: `Animal -> Rabbit`.

Что выведет [instanceof](/instanceof)?  

Распознает ли он `rabbit` как `Animal`, `Rabbit` и к тому же `Object`?

```js
function Animal() { }

function Rabbit() { }
Rabbit.prototype = Object.create(Animal.prototype);

var rabbit = new Rabbit();

alert( rabbit instanceof Rabbit );
alert( rabbit instanceof Animal );
alert( rabbit instanceof Object );
```

