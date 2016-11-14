# Свои ошибки, наследование от Error

Когда мы работаем с внешними данными, возможны самые разные ошибки.

Если приложение сложное, то ошибки естественным образом укладываются в иерархию, разобраться в которой помогает `instanceof`.

## Свой объект ошибки

Для примера создадим функцию `readUser(json)`, которая будет разбирать JSON с данными посетителя. Мы его получаем с сервера -- может, нашего, а может -- чужого, в общем -- желательно проверить на ошибки. А может, это даже и не JSON, а какие-то другие данные -- не важно, для наглядности поработаем с JSON.

Пример `json` на входе в функцию: `{ "name": "Вася", "age": 30 }`.

В процессе работы `readUser` возможны различные ошибки. Одна -- очевидно, `SyntaxError` -- если передан некорректный JSON.

Но могут быть и другие, например `PropertyError` -- эта ошибка будет возникать, если в прочитанном объекте нет свойства `name` или `age`.

Реализуем класс `PropertyError`:

```js
function PropertyError(property) {
  Error.call(this, property) ;
  this.name = "PropertyError";

  this.property = property;
  this.message = "Ошибка в свойстве " + property;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, PropertyError);
  } else {
    this.stack = (new Error()).stack;
  }

}

PropertyError.prototype = Object.create(Error.prototype);
```

В этом коде вы можете видеть ряд важных деталей, важных именно для ошибок:

`name` -- имя ошибки.
: Должно совпадать с именем функции.

`message` -- сообщение об ошибке.
: Несмотря на то, что `PropertyError` наследует от `Error` (последняя строка), конструктор у неё немного другой. Он принимает не сообщение об ошибке, а название свойства `property`, ну а сообщение генерируется из него.

    В результате в объекте ошибки есть как стандартное свойство `message`, так и более точное `property`.

    Это частая практика -- добавлять в объект ошибки свойства, которых нет в базовых объектах `Error`, более подробно описывающие ситуацию для данного класса ошибок.

`stack` -- стек вызовов, которые в итоге привели к ошибке.
: У встроенных объектов `Error` это свойство есть автоматически, вот к примеру:
    ```js run
    function f() {
      alert( new Error().stack );
    }

    f(); // выведет список вложенных вызовов, с номерами строк, где они были сделаны
    ```

    Если же объект ошибки делаем мы, то "по умолчанию" такого свойства у него не будет. Нам нужно как-то самим узнавать последовательность вложенных вызовов на текущий момент. Однако удобного способа сделать это в JavaScript нет, поэтому мы поступаем хитро и копируем его из нового объекта `new Error`, который генерируем тут же.

    В V8 (Chrome, Opera, Node.JS) есть нестандартное расширение [Error.captureStackTrace](https://code.google.com/p/v8-wiki/wiki/JavaScriptStackTraceApi), которое позволяет получить стек.

    Это делает строка из кода выше:
    ```js
    Error.captureStackTrace(this, PropertyError);
    ```

    Такой вызов записывает в объект `this` (текущий объект ошибки) стек вызовов, ну а второй аргумент -- вообще не обязателен, но если есть, то говорит, что при генерации стека нужно на этой функции остановиться. В результате в стеке будет информация о цепочке вложенных вызовов вплоть до вызова `PropertyError`.

    То есть, будет последовательность вызовов до генерации ошибки, но не включая код самого конструктора ошибки, который, как правило, не интересен. Такое поведение максимально соответствует встроенным ошибкам JavaScript.

```smart header="Конструктор родителя здесь не обязателен"
Обычно, когда мы наследуем, то вызываем конструктор родителя. В данном случае вызов выглядит как `Error.call(this, message)`.

Строго говоря, этот вызов здесь не обязателен. Встроенный конструктор `Error` ничего полезного не делает, даже свойство `this.message` (не говоря уже об `name` и `stack`) не назначает. Единственный возможный смысл его вызова -- он ставит специальное внутреннее свойство `[[ErrorData]]`, которое выводится в `toString` и позволяет увидеть, что это ошибка. Поэтому по стандарту вызывать конструктор `Error` при наследовании в таких случаях рекомендовано.
```

## instanceof + try..catch = ♡

Давайте теперь используем наш новый класс для `readUser`:

```js run
*!*
// Объявление
*/!*
function PropertyError(property) {
  this.name = "PropertyError";

  this.property = property;
  this.message = "Ошибка в свойстве " + property;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, PropertyError);
  } else {
    this.stack = (new Error()).stack;
  }

}

PropertyError.prototype = Object.create(Error.prototype);

*!*
// Генерация ошибки
*/!*
function readUser(data) {

  var user = JSON.parse(data);

  if (!user.age) {
    throw new PropertyError("age");
  }

  if (!user.name) {
    throw new PropertyError("name");
  }

  return user;
}

*!*
// Запуск и try..catch
*/!*

try {
  var user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof PropertyError) {
    if (err.property == 'name') {
      // если в данном месте кода возможны анонимы, то всё нормально
*!*
      alert( "Здравствуйте, Аноним!" );
*/!*
    } else {
      alert( err.message ); // Ошибка в свойстве ...
    }
  } else if (err instanceof SyntaxError) {
    alert( "Ошибка в синтаксисе данных: " + err.message );
  } else {
    throw err; // неизвестная ошибка, не знаю что с ней делать
  }
}
```

Всё работает -- и наша ошибка `PropertyError` и встроенная `SyntaxError` корректно генерируются, перехватываются, обрабатываются.

Обратим внимание на проверку типа ошибки в `try..catch`. Оператор `instanceof` проверяет класс с учётом наследования. Это значит, что если мы в дальнейшем решим создать новый тип ошибки, наследующий от  `PropertyError`, то проверка `err instanceof PropertyError` для класса-наследника тоже будет работать. Код получился расширяемым, это очень важно.

## Дальнейшее наследование

`PropertyError` -- это просто общего вида ошибка в свойстве. Создадим ошибку `PropertyRequiredError`, которая означает, что свойства нет.

Это подвид `PropertyError`, так что унаследуем от неё. Общий вид конструктора-наследника -- стандартный:

```js
function PropertyRequiredError(property) {
  // вызываем конструктор родителя и передаём текущие аргументы
  PropertyError.apply(this, arguments);
  ...
}
```

Достаточно ли в наследнике просто вызвать конструктор родителя? Увы, нет.

Если так поступить, то свойство `this.name` будет некорректным, да и `Error.captureStackTrace` тоже получит неправильную функцию вторым параметром.

Можно ли как-то поправить конструктор родителя, чтобы от него было проще наследовать?

Для этого нужно убрать из него упоминания о конкретном классе `PropertyError`, чтобы сделать код универсальным. Частично -- это возможно. Как мы помним, существует свойство `constructor`, которое есть в `prototype` по умолчанию, и которое мы можем намеренно сохранить при наследовании.

Исправим родителя `PropertyError` для более удобного наследования от него:

```js
function PropertyError(property) {
  this.name = "PropertyError";

  this.property = property;
  this.message = "Ошибка в свойстве " + property;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, *!*this.constructor*/!*); // (*)
  } else {
    this.stack = (new Error()).stack;
  }

}

PropertyError.prototype = Object.create(Error.prototype);
*!*
PropertyError.prototype.constructor = PropertyError;
*/!*
```

В строке `(*)` вместо ссылки на `PropertyError` используем `constructor` чтобы получить именно конструктор для текущего объекта. В наследнике там будет `PropertyRequiredError`, как и задумано.

Мы убрали одну жёсткую привязку к `PropertyError`, но со второй (`this.name`), увы, сложности. Оно должно содержать имя ошибки, то есть, имя её функции-конструктора. Его можно получить через `this.name = this.constructor.name`, но в IE11- это работать не будет.

Если подерживать IE11-, то тут уж придётся в наследнике его записывать вручную.

Полный код для наследника:

```js
function PropertyRequiredError(property) {
  PropertyError.apply(this, arguments);
  this.name = 'PropertyRequiredError';
  this.message = 'Отсутствует свойство ' + property;
}

PropertyRequiredError.prototype = Object.create(PropertyError.prototype);
PropertyRequiredError.prototype.constructor = PropertyRequiredError;

var err = new PropertyRequiredError("age");
// пройдёт проверку
alert( err instanceof PropertyError ); // true
```

Здесь заодно и `message` в наследнике было перезаписано на более точное. Если хочется избежать записи и перезаписи, то можно оформить его в виде геттера через `Object.defineProperty`.

## Итого

- Чтобы наследовать от ошибок `Error`, нужно самостоятельно позаботиться о `name`, `message` и `stack`.
- Благодаря тому, что `instanceof` поддерживает наследование, удобно организуются проверки на нужный тип. В иерархию ошибок можно в любой момент добавить новые классы, с понятным кодом и предсказуемым поведением.

Чтобы создавать наследники от `Error` было проще, можно создать класс `CustomError`, записать в него универсальный код, наподобие `PropertyError` и далее наследовать уже от него:

```js
*!*
// общего вида "наша" ошибка
*/!*
function CustomError(message) {
  this.name = "CustomError";
  this.message = message;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

*!*
// наследник
*/!*
function PropertyError(property) {
  CustomError.call(this, "Отсутствует свойство " + property)
  this.name = "PropertyError";

  this.property = property;
}

PropertyError.prototype = Object.create(CustomError.prototype);
PropertyError.prototype.constructor = PropertyError;

*!*
// и ещё уровень
*/!*
function PropertyRequiredError(property) {
  PropertyError.call(this, property);
  this.name = 'PropertyRequiredError';
  this.message = 'Отсутствует свойство ' + property;
}

PropertyRequiredError.prototype = Object.create(PropertyError.prototype);
PropertyRequiredError.prototype.constructor = PropertyRequiredError;

*!*
// использование
*/!*
var err = new PropertyRequiredError("age");
// пройдёт проверку
alert( err instanceof PropertyRequiredError ); // true
alert( err instanceof PropertyError ); // true
alert( err instanceof CustomError ); // true
alert( err instanceof Error ); // true
```

