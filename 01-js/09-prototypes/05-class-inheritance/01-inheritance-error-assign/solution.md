Ошибка в строке:

```js
Rabbit.prototype = Animal.prototype;
```

Эта ошибка приведёт к тому, что `Rabbit.prototype` и `Animal.prototype` -- один и тот же объект. В результате методы `Rabbit` будут помещены в него и, при совпадении, перезапишут методы `Animal`.

Получится, что все животные прыгают, вот пример:

```js
//+ run
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() { 
  alert("ходит " + this.name);
};

function Rabbit(name) {
  this.name = name;
}
*!*
Rabbit.prototype = Animal.prototype;
*/!*

Rabbit.prototype.walk = function() { 
  alert("прыгает! и ходит: " + this.name);
};

*!*
var animal = new Animal("Хрюшка");
animal.walk(); // прыгает! и ходит Хрюшка
*/!*
```

Правильный вариант этой строки:

```js
Rabbit.prototype = Object.create(Animal.prototype);
```

Если так написать, то в `Rabbit.prototype` будет отдельный объект, который прототипно наследует от `Animal.prototype`, но может содержать и свои свойства, специфичные для кроликов.
