# Дескрипторы, геттеры и сеттеры свойств

В этой главе мы рассмотрим возможности, которые позволяют очень гибко и мощно управлять всеми свойствами объекта, включая их аспекты -- изменяемость, видимость в цикле `for..in` и даже "невидимые" геттеры-сеттеры.

Они поддерживаются всеми современными браузерами, но не IE8-. Точнее говоря, они поддерживаются даже в IE8, но не для всех объектов, а только для DOM-объектов (они используются при работе со страницей, это сейчас вне нашего рассмотрения).

Большая часть этих методов, в частности, работа с дескрипторами, не задействуется в других главах учебника для обеспечения совместимости с IE8-, но во вспомогательных скриптах -- библиотеках для тестирования, сборки, а также для сервера Node.JS они используются достаточно активно.

[cut]
## Дескрипторы в примерах

Основной метод для управления свойствами -- [Object.defineProperty](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty).

Он позволяет определить свойство путём задания "дескриптора" -- описания, включающего в себя ряд важных внутренних параметров.

Синтаксис:

```js
Object.defineProperty(obj, prop, descriptor)
```

Аргументы:
<dl>
<dt>`obj`</dt>
<dd>Объект, в котором объявляется свойство.</dd>
<dt>`prop`</dt>
<dd>Имя свойства, которое нужно объявить или модифицировать.</dd>
<dt>`descriptor`</dt>
<dd>Дескриптор -- объект, который описывает поведение свойства. В нём могут быть следующие поля:

<dl>
<dt>`value`</dt>
<dd>Значение свойства, по умолчанию `undefined`</dd>
<dt>`writable`</dt>
<dd>Значение свойства можно менять, если `true`. По умолчанию `false`.</dd>
<dt>`configurable`</dt>
<dd>Если `true`, то свойство можно удалять, а также менять его в дальнейшем при помощи `defineProperty`. По умолчанию `false`.</dd>
<dt>`enumerable`</dt>
<dd>Если `true`, то свойство будет участвовать в переборе `for..in`. По умолчанию `false`.</dd>
<dt>`get`</dt>
<dd>Функция, которая возвращает значение свойства. По умолчанию `undefined`.</dd>
<dt>`set`</dt>
<dd>Функция, которая записывает значение свойства. По умолчанию `undefined`.</dd>
</dl>
</dd>
</dl>

Чтобы избежать конфликта, запрещено одновременно указывать значение `value` и функции `get/set`. Либо значение, либо функции для его чтения-записи, одно из двух. Также запрещено и не имеет смысла указывать `writable` при наличии `get/set`-функций.

Далее мы подробно разберём эти свойства на примерах.

### Пример: обычное свойство

Обычное свойство добавить очень просто.

Два таких вызова работают одинаково:

```js
var user = {};

// 1. простое присваивание
user.name = "Вася";

// 2. указание значения через дескриптор
Object.defineProperty(user, "name", { value: "Вася" });
```

### Пример: свойство-константа

Для того, чтобы сделать свойство неизменяемым, добавим ему флаги `writable` и `configurable`:

```js
//+ run
*!*
"use strict";
*/!*

var user = {};

Object.defineProperty(user, "name", {
  value: "Вася",
  writable: false,    // запретить присвоение "user.name=" 
  configurable: false // запретить удаление "delete user.name"
});

// Теперь попытаемся изменить это свойство.

// в strict mode присвоение "user.name=" вызовет ошибку
*!*
user.name = "Петя";
*/!*
```

**Заметим, что ошибки при попытке изменения такого свойства произойдут только при `use strict`.**

Без `use strict` операция записи "молча" не сработает. 

### Пример: свойство, скрытое для for..in

Встроенный метод `toString`, как и большинство встроенных методов, не участвует в цикле `for..in`. Это удобно, так как обычно такое свойство является "служебным".

К сожалению, свойство `toString`, объявленное обычным способом, будет видно в цикле `for..in`, например:

```js
//+ run
var user = {
  name: "Вася",
  toString: function() { return this.name; }
};

*!*
for(var key in user) alert(key);  // name, toString
*/!*
```

`Object.defineProperty` может помочь исключить `toString` из списка итерации. Достаточно поставить ему флаг `enumerable: false`:

```js
//+ run
var user = {
  name: "Вася",
  toString: function() { return this.name; }
};

*!*
Object.defineProperty(user, "toString", {enumerable: false});

for(var key in user) alert(key);  // name
*/!*
```

Обратим внимание, вызов `defineProperty` не перезаписал свойство, а просто модифицировал настройки у существующего `toString`.

### Пример: свойство как функция-геттер

Дескриптор позволяет задать свойство, которое на самом деле работает как функция. Для этого в нём нужно указать эту функцию в `get`.

Например, у объекта `user` есть обычные свойства: имя `firstName` и фамилия `surname`. 

Создадим свойство `fullName`, которое на самом деле является функцией:

```js
//+ run
var user = {
  firstName: "Вася",
  surname: "Петров"
}

Object.defineProperty(user, "fullName", {
  *!*get*/!*: function() {
    return this.firstName + ' ' + this.surname;
  }
});

*!*
alert(user.fullName); // Вася Петров
*/!*
```

**Обратим внимание, снаружи это обычное свойство `user.fullName`.**

Лишь в описании указывается, что на самом деле его значение возвращается функцией.

### Пример: свойство геттер-сеттер

Также можно указать функцию, которая используется для записи значения, при помощи дескриптора `set`.

Например, добавим возможность присвоения `user.fullName` к примеру выше:

```js
//+ run
var user = {
  firstName: "Вася",
  surname: "Петров"
}

Object.defineProperty(user, "fullName", {

  get: function() {
    return this.firstName + ' ' + this.surname;
  },

*!*
  set: function(value) {
    var split = value.split(' ');
    this.firstName = split[0];
    this.surname = split[1];
  }
*/!*
});

*!*
user.fullName = "Петя Иванов";
*/!*
alert(user.firstName); // Петя 
alert(user.surname); // Иванов
```

## Геттеры и сеттеры в литералах

Если мы создаём объект при помощи синтаксиса `{ ... }`,  то задать геттеры/сеттеры можно прямо в его определении.

Для этого используется особый синтаксис: `get свойство` или `set свойство`. 

Например, ниже объявлен геттер-сеттер `fullName`:

```js
//+ run
var user = {
  firstName: "Вася",
  surname: "Петров",

*!*
  get fullName() {
*/!*
    return this.firstName + ' ' + this.surname;
  },

*!*
  set fullName(value) {
*/!*
    var split = value.split(' ');
    this.firstName = split[0];
    this.surname = split[1];
  }
};

*!*
alert(user.fullName); // Вася Петров (из геттера)

user.fullName = "Петя Иванов";
alert(user.firstName); // Петя  (поставил сеттер)
alert(user.surname); // Иванов (поставил сеттер)
*/!*
```

## Да здравствуют геттеры и сеттеры!

Казалось бы, зачем нам назначать геттеры и сеттеры через всякие хитрые вызовы? Можно же сделать функции `getFullName`, `setFullName`...

**Основной бонус -- возможность получить контроль над свойством в любой момент!**

В начале разработки мы можем использовать обычные свойства, например у `User` будет имя `name` и возраст `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

var pete = new User("Петя", 25);

alert(pete.age); // 25
```

**С обычными свойствами в коде меньше букв, они удобны.**

...Но рано или поздно может наступить расплата! 

Например, когда написано много кода, который использует эти свойства, формат данных изменился и теперь вместо возраста `age` хранится дата рождения `birthday`:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

var pete = new User("Петя", new Date(1987, 6, 1));
```

Что теперь делать со старым кодом, который выводит свойство `age`? 

Можно, конечно, найти все места и поправить их, но это долго, а иногда и невозможно, скажем, если вы взаимодействуете со сторонней библиотекой, код в которой -- чужой и влезать в него нежелательно.

Геттеры позволяют обойти проблему легко и непринуждённо. 

Просто добавляем геттер `age`:

```js
//+ run
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  Object.defineProperty(this, "age", { 
    get: function() { 
      var todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

var pete = new User("Петя", new Date(1987, 6, 1));

alert(pete.age); // получает возраст из даты рождения
```

**Таким образом, `defineProperty` позволяет нам использовать обычные свойства и, при необходимости, в любой момент заменить их на функции, сохраняя совместимость внешнего интерфейса.**

## Другие методы работы со свойствами

<dl>
<dt>[Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperties)</dt>
<dd>Позволяет объявить несколько свойств сразу:

```js
//+ run
var user = {}

Object.defineProperties(user, {
*!*
  firstName: {
*/!*
    value: "Петя"
  },

*!*
  surname: {
*/!*
    value: "Иванов"
  },

*!*
  fullName: {
*/!*
    get: function() {
      return this.firstName + ' ' + this.surname;
    }
  }
});

alert( user.fullName ); // Петя Иванов
```

</dd>
<dt>[Object.keys(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys), [Object.getOwnPropertyNames(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)</dt>
<dd>Возвращают массив -- список свойств объекта.

При этом `Object.keys` возвращает только `enumerable`-свойства, а `Object.getOwnPropertyNames` -- все:

```js
//+ run
var obj = {
  a: 1,
  b: 2,
  internal: 3
};

Object.defineProperty(obj, "internal", {enumerable: false});

*!*
alert( Object.keys(obj) ); // a,b 
alert( Object.getOwnPropertyNames(obj) ); // a, internal, b
*/!*
```

</dd>
<dt>[Object.getOwnPropertyDescriptor(prop)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)</dt>
<dd>Возвращает дескриптор для свойства с `prop`.

Полученный дескриптор можно изменить и использовать `defineProperty` для сохранения изменений, например:

```js
//+ run
var obj = { test: 5 };
*!*
var descriptor = Object.getOwnPropertyDescriptor(obj, 'test');
*/!*

*!*
// заменим value на геттер, для этого...
*/!*
delete descriptor.value; // ..нужно убрать value/writable
delete descriptor.writable;
descriptor.get = function() { // и поставить get
  alert("Preved :)"); 
};

*!*
// поставим новое свойство вместо старого
*/!*

// если не удалить - defineProperty объединит старый дескриптор с новым
delete obj.test; 

Object.defineProperty(obj, 'test', descriptor);

obj.test; // Preved :)
```

</dd>
</dl>

...И несколько методов, которые используются очень редко:
<dl>
<dt>[Object.preventExtensions(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/seal)</dt>
<dd>Запрещает добавление свойств в объект.</dd>
<dt>[Object.seal(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/seal)</dt>
<dd>Запрещает добавление и удаление свойств, все текущие свойства делает `configurable: false`.</dd>
<dt>[Object.freeze(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/freeze)</dt>
<dd>Запрещает добавление, удаление и изменение свойств, все текущие свойства делает `configurable: false, writable: false`.</dd>
<dt>[Object.isExtensible(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/isExtensible), [Object.isSealed(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/isSealed), [Object.isFrozen(obj)](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/isFrozen)</dt>
<dd>Возвращают `true`, если на объекте были вызваны методы `Object.preventExtensions/seal/freeze`.</dd>
</dl>

