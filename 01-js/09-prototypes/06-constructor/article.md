# F.prototype по умолчанию, "constructor"

В стандарте JavaScript есть свойство `constructor`, которое, по идее, должно быть в каждом объекте и указывать, какой функцией он создан. 

Однако на практике оно ведет себя не всегда адекватным образом. Мы рассмотрим, как оно работает и почему именно так, а также -- как сделать, чтобы оно работало правильно.
[cut]

## Свойство constructor [#constructor]

По замыслу, свойство `constructor` объекта должно содержать ссылку на функцию, создавшую объект. И в простейших случаях так оно и есть, вот например:

```js
//+ run
function Rabbit() { }

var rabbit = new Rabbit();

*!*
alert( rabbit.constructor == Rabbit ); // true
*/!*
```

Как видим, всё работает. Мы получили из объекта функцию, которая его создала.

Но всё не так просто. Расширим наш пример установкой `Rabbit.prototype`:

```js
//+ run
function Rabbit() { } 

Rabbit.prototype = { jumps: true } ; 

var rabbit = new Rabbit();

*!*
alert( rabbit.constructor == Rabbit ); // false (упс, потеряли конструктор!)
*/!*
```

...Сломалось! Чтобы детальнее понять происходящее -- посмотрим, откуда берется свойство `constructor` и что с ним произошло.

## Значение prototype по умолчанию

До этого мы записывали и меняли свойство `prototype`, но оказывается, оно существует и без нашего вмешательства.

**Свойство `prototype` есть у каждой функции, даже если его не ставить.**

**Оно создается автоматически вместе с самой функцией, и по умолчанию является пустым объектом с единственным свойством `constructor`, которое ссылается обратно на функцию.**

Вот такой вид имеет прототип по умолчанию:

```js
Rabbit.prototype = { 
  constructor: Rabbit
}
```

<img src="8.png">

Так что объект `rabbit` не хранит в себе свойство `constructor`, а берёт его из прототипа.

Сделаем прямую проверку этого:

```js
//+ run
function Rabbit() { }

var rabbit = new Rabbit();

*!*
alert( rabbit.hasOwnProperty('constructor') ); // false, в объекте нет!

alert( Rabbit.prototype.hasOwnProperty('constructor') ); // true, да, оно в прототипе
*/!*
```

## Потеря constructor 

JavaScript не прилагает никаких усилий для проверки корректности или поддержания правильного значения `constructor`.

**При замене `Rabbit.prototype` на свой объект, свойство `constructor` из него обычно пропадает.**

Например:

```js
//+ run
function Rabbit() { }

Rabbit.prototype = {};  // (*)

var rabbit = new Rabbit();

alert( rabbit.constructor == Rabbit ); // false
alert( rabbit.constructor == Object ); // true
```

Ого! Теперь конструктором `rabbit` является не `Rabbit`, а `Object`. Но почему?

Вот иллюстрация, которая наглядно демонстрирует причину:

<img src="9.png">

То есть, свойство `constructor` бралось из `Rabbit.prototype`, но мы заменили его на пустой объект `Rabbit.prototype = {}`. В нём свойства `constructor` там уже нет, значит оно ищется дальше по цепочке прототипов, в `{}.__proto__`, то есть  берётся из встроенного `Object.prototype`. А там оно равно `Object`.

Что делать?

**Если мы хотим, чтобы свойство `constructor` объекта всегда хранило функцию, которая его создала -- об этом нужно позаботиться самостоятельно.**

То есть, можно не заменять встроенный `Rabbit.prototype`, а расширить его. Или же, если обязательно нужно заменить, скажем при наследовании, то указать `constructor` явно:

```js
//+ run
function Animal() { }
Animal.prototype.run = function() { }

function Rabbit() { }
*!*
Rabbit.prototype = Object.create(Animal);
Rabbit.prototype.constructor = Rabbit;
*/!*

Rabbit.prototype.run = function() { }

var rabbit = new Rabbit();

*!*
alert( rabbit.constructor == Rabbit ); // true
*/!*
```

## Итого

При создании функции, её `prototype` -- это объект с единственным свойством `constructor`, которое указывает обратно на функцию.

**Забавен тот факт, что больше нигде в спецификации JavaScript свойство `constructor` не упоминается. Интерпретатор не использует его никак и нигде.** 

В результате, в частности, `constructor` теряется при замене `prototype` на новый объект. И ничего страшного в этом нет.

Но если мы хотим использовать это свойство сами, чтобы при необходимости получать функцию-конструктор объекта, но при смене прототипа нужно самим смотреть, чтобы ненароком не перезаписать его.


