
# Объекты и прототипы

В этом разделе мы рассмотрим нововведения, которые касаются именно объектов.

По классам -- чуть позже, в отдельном разделе, оно того заслуживает.

## Короткое свойство

Зачастую у нас есть переменные, например, `name` и `isAdmin`, и мы хотим использовать их в объекте.

При объявлении объекта в этом случае достаточно указать только имя свойства, а значение будет взято из переменной с таким именем.

Например:

```js
//+ run
'use strict';

let name = "Вася";
let isAdmin = true;

*!*
let user = {
  name, 
  isAdmin
};
*/!*
alert( JSON.stringify(user) ); // {"name": "Вася", "isAdmin": true}
```


## Вычисляемые свойства

В качестве имени свойства можно использовать выражение, например:

```js
//+ run
'use strict';

let propName = "firstName";

let user = {
*!*
  [propName]: "Вася"
*/!*
};

alert( user.firstName ); // Вася
```

Или даже так:

```js
//+ run
'use strict';

let a = "Мой ";
let b = "Зелёный ";
let c = "Крокодил";

let user = {
*!*
  [(a + b + c).toLowerCase()]: "Вася"
*/!*
};

alert( user["мой зелёный крокодил"] ); // Вася
```


## Геттер-сеттер для прототипа

В ES5 для прототипа был метод-геттер:
<ul>
<li>`Object.getPrototypeOf(obj)`</li>
</ul>

В современной JavaScript также добавился сеттер:
<ul>
<li>`Object.setPrototypeOf(obj, newProto)`</li>
</ul>

...А также "узаконено" свойство `__proto__`, которое даёт прямой доступ к прототипу. Его, в качестве "нестандартного", но удобного способа работы с прототипом реализовали почти все браузеры (кроме IE10-), так что было принято решение добавить его в стандарт.

По стандарту оно реализовано через геттеры-сеттеры `Object.getPrototypeOf/setPrototypeOf`.


## Object.assign

Синтаксис:
```js
Object.assign(target, src1, src2...)
```

Функция `Object.assign` получает список объектов и копирует в первый `target` свойства из остальных.

Последующие свойства перезаписывают предыдущие.

Например:

```js
//+ run
'use strict';

let user = { name: "Вася" };
let visitor = { isAdmin: false, visits: true };
let admin = { isAdmin: true };

Object.assign(user, visitor, admin);

alert( JSON.stringify(user) ); // user: Вася, visits: true, isAdmin: true
```

## Object.is(value1, value2)

Возвращает `true`, если `value1 === value2`, иначе `false`.

Есть, однако, два отличия от обычного `===`, а именно: 

```js
//+ run

// Сравнение +0 и -0
alert( Object.is(+0, -0)); // false
alert( +0 === -0 );        // true

// Сравнение с NaN
alert( Object.is(NaN, NaN) ); // true
alert( NaN === NaN );         // false
```

При сравнении объектов через `Object.is` успользуется алгоритм [SameValue](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-samevalue), который неявно применяется во многих других местах современного стандарта.


## Методы объекта

Долгое время в JavaScript термин "метод объекта" был просто альтернативным названием для свойства-функции.

Теперь это уже не так, добавлены именно "методы объекта". Они, по сути, являются "свойствами-функциями, привязанными к объекту".

Их особенности:

<ol>
<li>Более короткий синтаксис.</li>
<li>Наличие в методах специального внутреннего свойства `[[HomeObject]]` ("домашний объект"), ссылающегося на объект, которому метод принадлежит. Мы посмотрим его использование чуть дальше, в разделе про `super`.</li>
</ol>

Для объявления метода вместо записи `"prop: function() {…}"` нужно написать просто `"prop() { … }"`.

Например:

```js
//+ run
'use strict';

let name = "Вася";
let user = {
  name,
*!*
  /* вместо sayHi: function() { */
  sayHi() { 
    alert(this.name);
  }
*/!*
};

user.sayHi(); // Вася
```

Как видно, создание такого метода -- чуть короче, а обращение -- не отличается от обычной функции.

Также методами станут объявления геттеров `get prop()` и сеттеров `set prop()`:

```js
//+ run
'use strict';

let name = "Вася", surname="Петров";
let user = {
  name,
  surname,
  get fullName() {
    return `${name} ${surname}`;
  }
};

alert( user.fullName ); // Вася Петров
```

Можно задать и метод с вычисляемым названием:

```js
//+ run
'use strict';

let methodName = "getFirstName";

let user = {
  // в квадратных скобках может быть любое выражение, 
  // которое должно вернуть название метода
  [methodName]() {  // вместо [methodName]: function() {
    return "Вася";
  }
};

alert( user.getFirstName() ); // Вася
```

## super

Вызов `super.parentProperty` позволяет из метода объекта получить свойство его прототипа.

Например, в коде ниже `rabbit` наследует от `animal`. Вызов `super.walk` из метода объекта `rabbit` обращается к `animal.walk`:

```js
//+ run
'use strict';

let animal = { 
  walk() { 
    alert("I'm walking");
  }
};

let rabbit = { 
  __proto__: animal,
  walk() {
*!*
    alert(super.walk); // walk() { … }
    super.walk(); // I'm walking
*/!*
  }
};

rabbit.walk();
```

При обращении через `super` используется `[[HomeObject]]` текущего метода, и от него берётся `__proto__`. Поэтому `super` работает только внутри методов.

Например, если переписать этот код, оформив `rabbit.walk` как обычное свойство-функцию, то будет ошибка:

```js
//+ run
'use strict';

let animal = { 
  walk() { 
    alert("I'm walking");
  }
};

let rabbit = { 
  __proto__: animal,
*!*
  walk: function() {
    super.walk(); // Будет ошибка!
  }
*/!*
};

rabbit.walk();
```

Ошибка возникнет, так как `rabbit.walk` теперь обычная функция, и не имеет `[[HomeObject]]`. В ней не работает `super`.

Исключением из этого правила являются функции-стрелки. В них используется `super` внешней функции. Например, здесь функция-стрелка в `setTimeout` берёт внешний `super`:


```js
//+ run
'use strict';

let animal = { 
  walk() { 
    alert("I'm walking");
  }
};

let rabbit = { 
  __proto__: animal,
  walk() {
*!*
    setTimeout(() => super.walk()); // I'm walking
*/!*
  }
};

rabbit.walk();
```

[smart header="Свойство `[[HomeObject]]` -- не изменяемое"]

При создании метода -- он привязан к своему объекту навсегда. Технически можно даже скопировать его и запустить независимо:

```js
//+ run
'use strict';

let animal = { 
  walk() { alert("I'm walking"); }
};

let rabbit = { 
  __proto__: animal,
  walk() {
    super.walk();
  }
};

let walk = rabbit.walk; // скопируем метод в переменную
*!*
walk(); 
// I'm walking
*/!*
```

В примере выше метод `walk()` запускается отдельно от объекта, но всё равно сохраняется через `super` доступ к его прототипу, благодаря `[[HomeObject]]`. 

Это относится именно к `super`. Правила `this` для методов те же, что и для обычных функций. В примере выше при вызове `walk()` без объекта `this` будет `undefined`.
[/smart]

## Итого 

Улучшения в описании свойств:
<ul>
<li>Запись `name: name` можно заменить на просто `name`</li>
<li>Если имя свойства находится в переменной или задано выражением `expr`, то его можно указать в квадратных скобках `[expr]`.</li>
<li>Свойства-функции можно оформить как методы: `"prop: function() {"` -> `"prop() {"`.</li>
</ul>

В методах работает обращение к свойствам прототипа через `super.parentProperty`.

Для работы с прототипом:
<ul>
<li>`Object.setPrototypeOf(obj, proto)` -- метод для установки прототипа.</li>
<li>`obj.__proto__` -- ссылка на прототип.</li>
</ul>

Дополнительно:
<ul>
<li>Метод `Object.assign(target, src1, src2...)` -- копирует свойства из всех аргументов в первый объект.</li>
<li>Метод `Object.is(value1, value2)` проверяет два значения на равенство. В отличие от `===` считает `+0` и `-0` разными числами. А также считает, что `NaN` равно самому себе.</li>
</ul>
