# Managing prototype: the history

In modern Javascript there are many ways to manipulate object prototype. But it wasn't like that all the time.

Let's swim a little bit with the flow of history to understand these ways and internals of Javascript.

## Old times: F.prototype

JavaScript has prototypal inheritance from the beginning. It was one of the core features of the language.

But in the old times, the `[[Prototype]]` property was internal. There was no way to read or modify it.

There was only way to set it: `prototype` property on a constructor function. And it still works.

**When `new F` is called, `[[Prototype]]` of the new object is set to `F.prototype`.**

Here `F.prototype` means a regular property named `"prototype"`, we didn't use it before.

For instance:

```js run
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = animal;
*/!*

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

Setting `Rabbit.prototype = animal` literally means the following: "When a `new Rabbit` is created, assign its prototype to `animal`".

Here's the picture:

![](proto-constructor-animal-rabbit.png)

To make it clear: `prototype` is not `[[Prototype]]`. They look similar, but they are totally different. The value of `Rabbit.prototype` is used to set `[[Prototype]]`. That's all. Afterwards, the inhertiance mechanism uses `[[Prototype]]` only.

```smart header="`prototype` is only \"magical\" for constructors"
We can create a property named `"prototype"` in any object. But the special behavior only happens if it's assigned to a constructor function.

And even if we assign it to a constructor function, it does nothing until we call it with `new`. And only then it will be used to set the prototype for a new object.
```

```warn header="The value of `prototype` should be an object or null"
Technically, we can assign anything to `F.prototype`. That's a regular property.

But the `new` operator will only use it to set `[[Prototype]]` if it's an object or null. Any other value like a string or a number will be ignored.
```

## Native prototypes



# Встроенные "классы" в JavaScript

В JavaScript есть встроенные объекты: `Date`, `Array`, `Object` и другие. Они используют прототипы и демонстрируют организацию "псевдоклассов" на JavaScript, которую мы вполне можем применить и для себя.

[cut]

## Откуда методы у {} ?

Начнём мы с того, что создадим пустой объект и выведем его.

```js run
var obj = {};
alert( obj ); // "[object Object]" ?
```

Где код, который генерирует строковое представление для `alert(obj)`? Объект-то ведь пустой.

## Object.prototype

...Конечно же, это сделал метод `toString`, который находится... Конечно, не в самом объекте (он пуст), а в его прототипе `obj.__proto__`, можно его даже вывести:

```js run
alert( {}.__proto__.toString ); // function toString
```

Откуда новый объект `obj` получает такой `__proto__`?

1. Запись `obj = {}` является краткой формой `obj = new Object`, где `Object` -- встроенная функция-конструктор для объектов.
2. При выполнении `new Object`, создаваемому объекту ставится `__proto__` по `prototype` конструктора, который в данном случае равен встроенному `Object.prototype`.
3. В дальнейшем при обращении к `obj.toString()` -- функция будет взята из `Object.prototype`.

![](native-prototypes-object.png)

Это можно легко проверить:

```js run
var obj = {};

// метод берётся из прототипа?
alert( obj.toString == Object.prototype.toString ); // true, да

// проверим, правда ли что __proto__ это Object.prototype?
alert( obj.__proto__ == Object.prototype ); // true

// А есть ли __proto__ у Object.prototype?
alert( obj.__proto__.__proto__ ); // null, нет
```

## Встроенные "классы" в JavaScript

Точно такой же подход используется в массивах `Array`, функциях `Function` и других объектах. Встроенные методы для них находятся в `Array.prototype`, `Function.prototype` и т.п.

![](native-prototypes-classes.png)

Например, когда мы создаём массив, `[1, 2, 3]`, то это альтернативный вариант синтаксиса `new Array`, так что у массивов есть стандартный прототип `Array.prototype`.

Но в нём есть методы лишь для массивов, а для общих методов всех объектов есть ссылка `Array.prototype.__proto__`, равная `Object.prototype`.

Аналогично, для функций.

Лишь для чисел (как и других примитивов) всё немного иначе, но об этом чуть далее.

Объект `Object.prototype` -- вершина иерархии, единственный, у которого `__proto__` равно `null`.

**Поэтому говорят, что "все объекты наследуют от `Object`", а если более точно, то от `Object.prototype`.**

"Псевдоклассом" или, более коротко, "классом", называют функцию-конструктор вместе с её `prototype`. Такой способ объявления классов называют "прототипным стилем ООП".

При наследовании часть методов переопределяется, например, у массива `Array` есть свой `toString`, который выводит элементы массива через запятую:

```js run
var arr = [1, 2, 3]
alert( arr ); // 1,2,3 <-- результат Array.prototype.toString
```

Как мы видели раньше, у `Object.prototype` есть свой `toString`, но так как в `Array.prototype` он ищется первым, то берётся именно вариант для массивов:

![](native-prototypes-array-tostring.png)

````smart header="Вызов методов через `call` и `apply` из прототипа"
Ранее мы говорили о применении методов массивов к "псевдомассивам", например, можно использовать `[].join` для `arguments`:

```js run
function showList() {
*!*
  alert( [].join.call(arguments, " - ") );
*/!*
}

showList("Вася", "Паша", "Маша"); // Вася - Паша - Маша
```

Так как метод `join` находится в `Array.prototype`, то можно вызвать его оттуда напрямую, вот так:

```js run
function showList() {
*!*
  alert( Array.prototype.join.call(arguments, " - ") );
*/!*
}

showList("Вася", "Паша", "Маша"); // Вася - Паша - Маша
```

Это эффективнее, потому что не создаётся лишний объект массива `[]`, хотя, с другой стороны -- больше букв писать.
````

## Примитивы

Примитивы не являются объектами, но методы берут из соответствующих прототипов: `Number.prototype`, `Boolean.prototype`, `String.prototype`.

По стандарту, если обратиться к свойству числа, строки или логического значения, то будет создан объект соответствующего типа, например `new String` для строки, `new Number` для чисел, `new Boolean` -- для логических выражений.

Далее будет произведена операция со свойством или вызов метода по обычным правилам, с поиском в прототипе, а затем этот объект будет уничтожен.

Именно так работает код ниже:

```js run
var user = "Вася"; // создали строку (примитив)

*!*
alert( user.toUpperCase() ); // ВАСЯ
// был создан временный объект new String
// вызван метод
// new String уничтожен, результат возвращён
*/!*
```

Можно даже попробовать записать в этот временный объект свойство:

```js run
// попытаемся записать свойство в строку:
var user = "Вася";
user.age = 30;

*!*
alert( user.age ); // undefined
*/!*
```

Свойство `age` было записано во временный объект, который был тут же уничтожен, так что смысла в такой записи немного.

````warn header="Конструкторы `String/Number/Boolean` -- только для внутреннего использования"
Технически, можно создавать объекты для примитивов и вручную, например `new Number`. Но в ряде случаев получится откровенно бредовое поведение. Например:

```js run
alert( typeof 1 ); // "number"

alert( typeof new Number(1) ); // "object" ?!?
```

Или, ещё страннее:

```js run
var zero = new Number(0);

if (zero) { // объект - true, так что alert выполнится
  alert( "число ноль -- true?!?" );
}
```

Поэтому в явном виде `new String`, `new Number` и `new Boolean` никогда не вызываются.
````

```warn header="Значения `null` и `undefined` не имеют свойств"
Значения `null` и `undefined` стоят особняком. Вышесказанное к ним не относится.

Для них нет соответствующих классов, в них нельзя записать свойство (будет ошибка), в общем, на конкурсе "самое примитивное значение" они точно разделили бы первое место.
```

## Изменение встроенных прототипов [#native-prototype-change]

Встроенные прототипы можно изменять. В том числе -- добавлять свои методы.

Мы можем написать метод для многократного повторения строки, и он тут же станет доступным для всех строк:

```js run
String.prototype.repeat = function(times) {
  return new Array(times + 1).join(this);
};

alert( "ля".repeat(3) ); // ляляля
```

Аналогично мы могли бы создать метод `Object.prototype.each(func)`, который будет применять `func` к каждому свойству:

```js run
Object.prototype.each = function(f) {
  for (var prop in this) {
    var value = this[prop];
    f.call(value, prop, value); // вызовет f(prop, value), this=value
  }
}

// Попробуем! (внимание, пока что это работает неверно!)
var user = {
  name: 'Вася',
  age: 25
};

user.each(function(prop, val) {
  alert( prop ); // name -> age -> (!) each
});
```

Обратите внимание -- пример выше работает не совсем корректно. Вместе со свойствами объекта `user` он выводит и наше свойство `each`. Технически, это правильно, так как цикл `for..in` перебирает свойства и в прототипе тоже, но не очень удобно.

Конечно, это легко поправить добавлением проверки `hasOwnProperty`:

```js run
Object.prototype.each = function(f) {

  for (var prop in this) {

*!*
    // пропускать свойства из прототипа
    if (!this.hasOwnProperty(prop)) continue;
*/!*

    var value = this[prop];
    f.call(value, prop, value);

  }

};

// Теперь все будет в порядке
var obj = {
  name: 'Вася',
  age: 25
};

obj.each(function(prop, val) {
  alert( prop ); // name -> age
});
```

Здесь это сработало, теперь код работает верно. Но мы же не хотим добавлять  `hasOwnProperty` в цикл по любому объекту! Поэтому либо не добавляйте свойства в `Object.prototype`, либо можно использовать [дескриптор свойства](/descriptors-getters-setters) и флаг `enumerable`.

Это, конечно, не будет работать в IE8-:

```js run
Object.prototype.each = function(f) {

  for (var prop in this) {
    var value = this[prop];
    f.call(value, prop, value);
  }

};

*!*
// поправить объявление свойства, установив флаг enumerable: false
Object.defineProperty(Object.prototype, 'each', {
  enumerable: false
});
*/!*

// Теперь все будет в порядке
var obj = {
  name: 'Вася',
  age: 25
};

obj.each(function(prop, val) {
  alert( prop ); // name -> age
});
```

Есть несколько "за" и "против" модификации встроенных прототипов:

```compare
+ Методы в прототипе автоматически доступны везде, их вызов прост и красив.
- Новые свойства, добавленные в прототип из разных мест, могут конфликтовать между собой. Представьте, что вы подключили две библиотеки, которые добавили одно и то же свойство в прототип, но определили его по-разному. Конфликт неизбежен.
- Изменения встроенных прототипов влияют глобально, на все-все скрипты, делать их не очень хорошо с архитектурной точки зрения.
```

Как правило, минусы весомее, но есть одно исключение, когда изменения встроенных прототипов не только разрешены, но и приветствуются.

**Допустимо изменение прототипа встроенных объектов, которое добавляет поддержку метода из современных стандартов в те браузеры, где её пока нет.**

Например, добавим `Object.create(proto)` в старые браузеры:

```js
if (!Object.create) {

  Object.create = function(proto) {
    function F() {}
    F.prototype = proto;
    return new F;
  };

}
```

Именно так работает библиотека [es5-shim](https://github.com/kriskowal/es5-shim), которая предоставляет многие функции современного JavaScript для старых браузеров. Они добавляются во встроенные объекты и их прототипы.

## Итого

- Методы встроенных объектов хранятся в их прототипах.
- Встроенные прототипы можно расширить или поменять.
- Добавление методов в `Object.prototype`, если оно не сопровождается `Object.defineProperty` с установкой `enumerable` (IE9+), "сломает" циклы `for..in`, поэтому стараются в этот прототип методы не добавлять.

    Другие прототипы изменять менее опасно, но все же не рекомендуется во избежание конфликтов.

    Отдельно стоит изменение с целью добавления современных методов в старые браузеры, таких как <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/create">Object.create</a>, <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys">Object.keys</a>, <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind">Function.prototype.bind</a> и т.п. Это допустимо и как раз делается [es5-shim](https://github.com/kriskowal/es5-shim).




















## Свойство constructor

У каждой функции по умолчанию уже есть свойство `prototype`.

Оно содержит объект такого вида:

```js
function Rabbit() {}

Rabbit.prototype = {
  constructor: Rabbit
};
```

В коде выше я создал `Rabbit.prototype` вручную, но ровно такой же -- генерируется автоматически.

Проверим:

```js run
function Rabbit() {}

// в Rabbit.prototype есть одно свойство: constructor
alert( Object.getOwnPropertyNames(Rabbit.prototype) ); // constructor

// оно равно Rabbit
alert( Rabbit.prototype.constructor == Rabbit ); // true
```

Можно его использовать для создания объекта с тем же конструктором, что и данный:

```js run
function Rabbit(name) {
  this.name = name;
  alert( name );
}

var rabbit = new Rabbit("Кроль");

var rabbit2 = new rabbit.constructor("Крольчиха");
```

Эта возможность бывает полезна, когда, получив объект, мы не знаем в точности, какой у него был конструктор (например, сделан вне нашего кода), а нужно создать такой же.

````warn header="Свойство `constructor` легко потерять"
JavaScript никак не использует свойство `constructor`. То есть, оно создаётся автоматически, а что с ним происходит дальше -- это уже наша забота. В стандарте прописано только его создание.

В частности, при перезаписи `Rabbit.prototype = { jumps: true }` свойства `constructor` больше не будет.

Сам интерпретатор JavaScript его в служебных целях не требует, поэтому в работе объектов ничего не "сломается". Но если мы хотим, чтобы возможность получить конструктор, всё же, была, то можно при перезаписи гарантировать наличие `constructor` вручную:
```js
Rabbit.prototype = {
  jumps: true,
*!*
  constructor: Rabbit
*/!*
};
```

Либо можно поступить аккуратно и добавить свойства к встроенному `prototype` без его замены:
```js
// сохранится встроенный constructor
Rabbit.prototype.jumps = true
```
````

## Эмуляция Object.create для IE8- [#inherit]

Как мы только что видели, с конструкторами всё просто, назначить прототип можно кросс-браузерно при помощи `F.prototype`.

Теперь небольшое "лирическое отступление" в область совместимости.

Прямые методы работы с прототипом отсутствуют в старых IE, но один из них -- `Object.create(proto)` можно эмулировать, как раз при помощи `prototype`. И он будет работать везде, даже в самых устаревших браузерах.

Кросс-браузерный аналог -- назовём его `inherit`, состоит буквально из нескольких строк:

```js
function inherit(proto) {
  function F() {}
  F.prototype = proto;
  var object = new F;
  return object;
}
```

Результат вызова `inherit(animal)` идентичен `Object.create(animal)`. Она создаёт новый пустой объект с прототипом `animal`.

Например:

```js run
var animal = {
  eats: true
};

var rabbit = inherit(animal);

alert( rabbit.eats ); // true
```

Посмотрите внимательно на функцию `inherit` и вы, наверняка, сами поймёте, как она работает...

Если где-то неясности, то её построчное описание:

```js no-beautify
function inherit(proto) {
  function F() {}     // (1)
  F.prototype = proto // (2)
  var object = new F; // (3)
  return object;      // (4)
}
```

1. Создана новая функция `F`. Она ничего не делает с `this`, так что если вызвать `new F`, то получим пустой объект.
2. Свойство `F.prototype` устанавливается в будущий прототип `proto`
3. Результатом вызова `new F` будет пустой объект с `__proto__` равным значению `F.prototype`.
4. Мы получили пустой объект с заданным прототипом, как и хотели. Возвратим его.

Для унификации можно запустить такой код, и метод `Object.create` станет кросс-браузерным:

```js
if (!Object.create) Object.create = inherit; /* определение inherit - выше */
```

В частности, аналогичным образом работает библиотека [es5-shim](https://github.com/es-shims/es5-shim), при подключении которой `Object.create` станет доступен для всех браузеров.

## Итого

Для произвольной функции -- назовём её `Person`, верно следующее:

- Прототип `__proto__` новых объектов, создаваемых через `new Person`, можно задавать при помощи свойства `Person.prototype`.
- Значением `Person.prototype` по умолчанию является объект с единственным свойством `constructor`, содержащим ссылку на `Person`. Его можно использовать, чтобы из самого объекта получить функцию, которая его создала. Однако, JavaScript никак не поддерживает корректность этого свойства, поэтому программист может его изменить или удалить.
- Современный метод `Object.create(proto)` можно эмулировать при помощи `prototype`, если хочется, чтобы он работал в IE8-.

