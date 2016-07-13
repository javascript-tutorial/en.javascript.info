# JSON methods, toJSON

The [JSON](http://en.wikipedia.org/wiki/JSON) is mostly used to represent an object as a string.

When we need to send an object over a network -- from the client to server or backwards, this format is used almost all the time.

Javascript provides built-in methods to convert objects into JSON and back, which also allow a few tricks that make them even more useful.

[cut]

## Формат JSON

Данные в формате JSON ([RFC 4627](http://tools.ietf.org/html/rfc4627)) представляют собой:

- JavaScript-объекты `{ ... }` или
- Массивы `[ ... ]` или
- Значения одного из типов:
    - строки в двойных кавычках,
    - число,
    - логическое значение `true`/`false`,
    - `null`.

Почти все языки программирования имеют библиотеки для преобразования объектов в формат JSON.

Основные методы для работы с JSON в JavaScript -- это:

- `JSON.parse` -- читает объекты из строки в формате JSON.
- `JSON.stringify` -- превращает объекты в строку в формате JSON, используется, когда нужно из JavaScript передать данные по сети.

## Метод JSON.parse

Вызов `JSON.parse(str)` превратит строку с данными в формате JSON в JavaScript-объект/массив/значение.

Например:

```js run
var numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
```

Или так:

```js run
var user = '{ "name": "Вася", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

user = JSON.parse(user);

alert( user.friends[1] ); // 1
```

Данные могут быть сколь угодно сложными, объекты и массивы могут включать в себя другие объекты и массивы. Главное чтобы они соответствовали формату.

````warn header="JSON-объекты ≠ JavaScript-объекты"
Объекты в формате JSON похожи на обычные JavaScript-объекты, но отличаются от них более строгими требованиями к строкам -- они должны быть именно в двойных кавычках.

В частности, первые два свойства объекта ниже -- некорректны:

```js
{
  *!*name*/!*: "Вася",       // ошибка: ключ name без кавычек!
  "surname": *!*'Петров'*/!*,// ошибка: одинарные кавычки у значения 'Петров'!
  "age": 35,           // .. а тут всё в порядке.
  "isAdmin": false    // и тут тоже всё ок
}
```

Кроме того, в формате JSON не поддерживаются комментарии. Он предназначен только для передачи данных.

Есть нестандартное расширение формата JSON, которое называется [JSON5](http://json5.org/) и как раз разрешает ключи без кавычек, комментарии и т.п, как в обычном JavaScript. На данном этапе, это отдельная библиотека.
````

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

