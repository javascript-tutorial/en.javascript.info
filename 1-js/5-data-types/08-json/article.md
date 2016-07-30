# JSON methods, toJSON [todo: after Date]

The [JSON](http://en.wikipedia.org/wiki/JSON) (JavaScript Object Notation) format is used to represent an object as a string.

When we need to send an object over a network -- from the client to server or in the reverse direction, this format is the most widespread.

Javascript provides built-in methods to convert objects into JSON and back, which also allow a few tricks that make them even more useful.

[cut]

## JSON.stringify

JSON, despite its name (JavaScript Object Notation) is an independent standard. It is described as [RFC 4627](http://tools.ietf.org/html/rfc4627). Most programming languages have libraries to encode objects in it. So it's easy to use JSON for data exchange when the client uses Javascript and the server is written on Ruby/PHP/Java/Whatever.

In Javascript, the native method [JSON.stringify(value)](mdn:js/JSON/stringify) accepts a value and returns it's representation as a string in JSON format.

For instance:
```js run
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};

let json = JSON.stringify(student);

alert(typeof json); // we've got a string!

alert(json); 
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
```

The JSON-encoded object has several important differences from the original variant:

- Strings use double quotes. No single quotes or backticks in JSON. So `'John'` becomes `"John"`.
- Object property names are double-quoted also. Also obligatory. So `age:30` becomes `"age":30`.

`JSON.stringify` can be applied not only to objects, but to other values: 

```js run
// a number in JSON is just a number
alert( JSON.stringify(1) ) // 1

// a string in JSON is still a string, but double-quoted
alert( JSON.stringify('test') ) // "test"

// double quotes are escaped 
alert( JSON.stringify('"quoted"') ) // "\"quoted\"" (inner quotes are escaped with \")

// array of objects 
alert( JSON.stringify([{name: "John"},{name: "Ann"}]) ); // [{"name":"John"},{"name":"Ann"}]
```

The supported JSON types are:

- Objects `{ ... }` 
- Arrays `[ ... ]` 
- Primitives:
    - strings,
    - numbers,
    - boolean values `true/false`,
    - `null`.

In the examples above we can see them all.

JSON format does not support any other types.

For instance, functions and `undefined` values, symbolic properties are skipped by `JSON.stringify`:

```js run
let user = {
  sayHi() { // ignored
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // ignored 
};

alert( JSON.stringify(user) ); // {} (empty object)
```

### Custom "toJSON"

If an object is not satisfied with the default behavior of `JSON.stringify`, it override it by implementing method `toJSON`.

For instance:

```js run
let room = {
  number: 23
};

let event = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(event) );
/*
  {
    "title":"Conference",
*!*
    "date":"2017-01-01T00:00:00.000Z",  // (1)
*/!*
    "room": {"number":23}               // (2)
  }
*/
```

Here we can see that `date` `(1)` became a string. That's because all dates have a built-in `toJSON` method which returns such kind of string. 

Now let's add a custom `toJSON` for our object `room`:

```js run
let room = {
  number: 23,
*!*
  toJSON() {
    return this.number;
  }
*/!*
};

let event = {
  title: "Conference",
  room
};

*!*
alert( JSON.stringify(room) ); // 23
*/!*

alert( JSON.stringify(event) );
/*
  {
    "title":"Conference",
*!*
    "room": 23
*/!*
  }
*/
```

As we can see, `toJSON` is used both for the direct call `JSON.stringify(room)` and for the nested object.


## JSON.parse

To decode a JSON-string, we need another method named [JSON.parse](mdn:js/JSON/parse).

For instance:

```js run
// stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Or for nested objects:

```js run
let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user = JSON.parse(user);

alert( user.friends[1] ); // 1
```

The JSON may be as complex as necessary, objects and arrays can include other objects and arrays. But they must obey the format.

Here are typical mistakes of novice developers who try to write custom JSON manually (for debugging purposes mainly):

```js
let json = `{
  *!*name*/!*: "John",                     // mistake: property name without quotes
  "surname": *!*'Smith'*/!*,               // mistake: single quotes in value (must be double)
  *!*'isAdmin'*/!*: false                  // mistake: single quotes in key (must be double)
  "birthday": *!*new Date(2000, 2, 3)*/!*, // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
```

Besides, JSON does not support comments. Adding a comment to JSON makes it invalid. 

There's another format named [JSON5](http://json5.org/), which allows unquoted keys, comments etc. But this is a standalone library, not in the specification of the language.

The regular JSON is that strict not because its developers are lazy, but to allow easy, reliable and very fast implementations of the parsing algorithm.

## Умный разбор: JSON.parse(str, reviver)

Метод `JSON.parse` поддерживает и более сложные алгоритмы разбора.

Например, мы получили с сервера объект с данными события `event`.

Он выглядит так:

```js
// title: название события, date: дата события
var str = '{"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}';
```

...И теперь нужно *восстановить* его, то есть превратить в JavaScript-объект.

Попробуем вызвать для этого `JSON.parse`:

```js run
var str = '{"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}';

var event = JSON.parse(str);

*!*
alert( event.date.getDate() ); // ошибка!
*/!*
```

...Увы, ошибка!

Дело в том, что значением `event.date` является строка, а отнюдь не объект `Date`. Откуда методу `JSON.parse` знать, что нужно превратить строку именно в дату?

**Для интеллектуального восстановления из строки у `JSON.parse(str, reviver)` есть второй параметр `reviver`, который является функцией `function(key, value)`.**

Если она указана, то в процессе чтения объекта из строки `JSON.parse` передаёт ей по очереди все создаваемые пары ключ-значение и может возвратить либо преобразованное значение, либо `undefined`, если его нужно пропустить.

В данном случае мы можем создать правило, что ключ `date` всегда означает дату:

```js run
// дата в строке - в формате UTC
var str = '{"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}';

*!*
var event = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});
*/!*

alert( event.date.getDate() ); // теперь сработает!
```

Кстати, эта возможность работает и для вложенных объектов тоже:

```js run
var schedule = '{ \
  "events": [ \
    {"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}, \
    {"title":"День рождения","date":"2015-04-18T12:00:00.000Z"} \
  ]\
}';

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

*!*
alert( schedule.events[1].date.getDate() ); // сработает!
*/!*
```

## Сериализация, метод JSON.stringify

Метод `JSON.stringify(value, replacer, space)` преобразует ("сериализует") значение в JSON-строку.

Пример использования:

```js run
var event = {
  title: "Конференция",
  date: "сегодня"
};

var str = JSON.stringify(event);
alert( str ); // {"title":"Конференция","date":"сегодня"}

// Обратное преобразование.
event = JSON.parse(str);
```

**При сериализации объекта вызывается его метод `toJSON`.**

Если такого метода нет -- перечисляются его свойства, кроме функций.

Посмотрим это в примере посложнее:

```js run
var room = {
  number: 23,
  occupy: function() {
    alert( this.number );
  }
};

event = {
  title: "Конференция",
  date: new Date(Date.UTC(2014, 0, 1)),
  room: room
};

alert( JSON.stringify(event) );
/*
  {
    "title":"Конференция",
    "date":"2014-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/
```

Обратим внимание на два момента:

1. Дата превратилась в строку. Это не случайно: у всех дат есть встроенный метод `toJSON`. Его результат в данном случае -- строка в таймзоне UTC.
2. У объекта `room` нет метода `toJSON`. Поэтому он сериализуется перечислением свойств.

    Мы, конечно, могли бы добавить такой метод, тогда в итог попал бы его результат:

    ```js run
    var room = {
      number: 23,
    *!*
      toJSON: function() {
          return this.number;
        }
    */!*
    };

    alert( JSON.stringify(room) ); // 23
    ```

### Исключение свойств

Попытаемся преобразовать в JSON объект, содержащий ссылку на DOM.

Например:

```js run
var user = {
  name: "Вася",
  age: 25,
  window: window
};

*!*
alert( JSON.stringify(user) ); // ошибка!
// TypeError: Converting circular structure to JSON (текст из Chrome)
*/!*
```

Произошла ошибка! В чём же дело, неужели некоторые объекты запрещены? Как видно из текста ошибки -- дело совсем в другом. Глобальный объект `window` -- сложная структура с кучей встроенных свойств и круговыми ссылками, поэтому его преобразовать невозможно. Да и нужно ли?

**Во втором параметре `JSON.stringify(value, replacer)` можно указать массив свойств, которые подлежат сериализации.**

Например:

```js run
var user = {
  name: "Вася",
  age: 25,
  window: window
};

*!*
alert( JSON.stringify(user, ["name", "age"]) );
// {"name":"Вася","age":25}
*/!*
```

Для более сложных ситуаций вторым параметром можно передать функцию `function(key, value)`, которая возвращает сериализованное `value` либо `undefined`, если его не нужно включать в результат:

```js run
var user = {
  name: "Вася",
  age: 25,
  window: window
};

*!*
var str = JSON.stringify(user, function(key, value) {
  if (key == 'window') return undefined;
  return value;
});
*/!*

alert( str ); // {"name":"Вася","age":25}
```

В примере выше функция пропустит свойство с названием `window`. Для остальных она просто возвращает значение, передавая его стандартному алгоритму. А могла бы и как-то обработать.

```smart header="Функция `replacer` работает рекурсивно"
То есть, если объект содержит вложенные объекты, массивы и т.п., то все они пройдут через `replacer`.
```

### Красивое форматирование

В методе `JSON.stringify(value, replacer, space)` есть ещё третий параметр `space`.

Если он является числом -- то уровни вложенности в JSON оформляются указанным количеством пробелов, если строкой -- вставляется эта строка.

Например:

```js run
var user = {
  name: "Вася",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

*!*
var str = JSON.stringify(user, "", 4);
*/!*

alert( str );
/* Результат -- красиво сериализованный объект:
{
    "name": "Вася",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
```

## Итого

- JSON -- формат для представления объектов (и не только) в виде строки.
- Методы [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) и [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) позволяют интеллектуально преобразовать объект в строку и обратно.

