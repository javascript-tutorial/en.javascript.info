# Свои ошибки, наследование от Error

Когда мы работаем с внешними данными, возможны самые разные ошибки. 

Если приложение сложное, то ошибки естественным образом укладываются в иерархию, разобраться в которой помогает `instanceof`.

## Свой объект ошибки

Для примера создадим функцию `readUser(json)`, которая будет разбирать JSON с данными посетителя. Мы его получаем с сервера -- может, нашего, а может -- чужого, в общем -- желательно проверить на ошибки. А может, это даже и не JSON, а какие-то другие данные -- не важно, для наглядности поработаем с JSON.

Пример `json` на входе в функцию: `{ "name": "Вася", "age": 30 }`. 

В процессе работы `readUser` возможны различные ошибки. Одна -- очевидно, `SyntaxError` -- если передан некорректный JSON.

Но могут быть и другие, например `PropertyError` -- эта ошибка будет возникать, если в прочитанном объекте нет свойства `name` или `age`. 

Реализуем её:

```js
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
```

Посмотрим внимательнее на код -- в нём важные детали того, как можно позаботиться о стандартных свойствах объекта ошибки:

<dl>
<dt>`name` -- имя ошибки.</dt>
<dd>Должно совпадать с именем функции, просто записали строку в него.</dd>
<dt>`message` -- сообщение об ошибке.</dt>
<dd>Несмотря на то, что `PropertyError` наследует от `Error` (последняя строка), конструктор у неё немного другой. Он принимает не сообщение об ошибке, а название свойства `property`, ну а сообщение генерируется из него. 

В результате в ошибке есть как стандартное свойство `message`, так и более точное `property`.

Это полезная практика -- добавлять в объект ошибки свойства, более подробно описывающие ситуацию, которых нет в базовых объектах `Error`.</dd>
<dt>`stack` -- стек вызовов, которые в итоге привели к ошибке.</dt>
<dd>У встроенных объектов `Error` это свойство есть автоматически, вот к примеру:
```js
//+ run
function f() {
  alert( new Error().stack );
}

f();
```

Если же объект делаем мы, то "по умолчанию" такого свойства у него не будет. Нам нужно как-то самим узнавать последовательность вложенных вызовов на текущий момент. Однако удобного способа сделать это в JavaScript нет, поэтому мы поступаем хитро и копируем его из нового объекта `new Error`, который генерируем тут же.

В V8 (Chrome, Opera, Node.JS) есть нестандартное расширение [Error.captureStackTrace](https://code.google.com/p/v8-wiki/wiki/JavaScriptStackTraceApi), которое позволяет стек получать.

Строка из кода выше:
```js
Error.captureStackTrace(this, PropertyError);
```

Вызов записывает в объект `this` (текущий объект ошибки) стек вызовов, а второй аргумент -- это текущий конструктор, он не обязателен, но если есть, то говорит, что при генерации стека нужно на этой функции остановиться. В результате в стеке не будет информации о том, что делалось внутри конструктора `PropertyError`. 

То есть, будет последовательность вызовов до генерации ошибки, но не включая код самого конструктора ошибки, который, как правило, не интересен. Такое поведение максимально соответствует встроенным ошибкам JavaScript.
</dd>
</dl>

[smart header="Конструктор родителя здесь не нужен"]
В коде выше не вызывается конструктор родителя. Обычно, когда мы наследуем, то мы вызываем его. 

В данном случае вызов выглядел бы как `Error.call(this, message)`. 

Однако, встроенный конструктор `Error` на редкость прост, он ничего полезного не делает, даже свойство `this.message` (не говоря уже об `name` и `stack`) не назначает. Поэтому и вызывать его здесь нет необходимости.
[/smart]


## instanceof + try..catch = ♡

Давайте теперь используем наш новый класс для `readUser`:

```js
//+ run
*!*
// Объявление
*/!*
function PropertyError(property) {
  this.name = "PropertyError";

  this.property = property;
  this.message = "Отсутствует свойство " + property;

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
      alert( err.message ); // Отсутствует свойство ...
    }
  } else if (err instanceof SyntaxError) {
    alert( "Ошибка в данных: " + err.message );
  } else {
    throw err; // неизвестная ошибка, не знаю что с ней делать
  }
}
```

Обратим внимание на проверку типа ошибки в `try..catch`.

Оператор `instanceof` поддерживает иерархию. Это значит, что если мы в дальнейшем решим как-то ещё уточнить тип ошибки `PropertyError`, то для объекта, наследующего от него, `e instanceof PropertyError` по-прежнему будет работать.

## Дальнейшее наследование

Чтобы создать иерархию, нужно наследовать от `PropertyError`.

`PropertyError` -- это просто общего вида ошибка в свойстве. Создадим ошибку `PropertyRequiredError`, которая означает, что свойства нет. 

Типичный вид конструктора-наследника -- такой:

```js
function PropertyRequiredError(property) {
  PropertyError.apply(this, arguments);
  ...
}
```

Можем ли мы просто вызвать конструктор родителя и ничего не делать в дополнение? Увы, нет.

Если так поступить, то свойство `this.name` будет некорректным, да и `Error.captureStackTrace` тоже получит неправильную функцию вторым параметром.

Можно ли как-то поправить конструктор родителя? Убрать из него все упоминания о конкретном классе `PropertyError` и сделать код универсальным?

Частично -- да. Как мы помним, существует свойство `constructor`, которое есть в `prototype` по умолчанию, и которое мы можем намеренно сохранить при наследовании:

```js
function PropertyError(property) {
  this.name = "PropertyError";

  this.property = property;
  this.message = "Отсутствует свойство " + property;

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

В строке `(*)` это свойство было использовано, чтобы получить конструктор уже не в виде жёсткой ссылки `PropertyError`, а тот, который использован для текущего объекта. В наследнике там будет `PropertyRequiredError`, как и задумано.

Мы убрали одно упоминание, но с `this.name`, увы, сложности. Сейчас при наследовании оно будет всегда `"PropertyError"`. Все браузеры, кроме IE11-, поддерживают имя у Function Declaration, то есть имя функции можно было бы получить из `this.constructor.name`, но в IE11- это работать не будет.

Если подерживать IE11-, то тут уж придётся в наследнике его записывать вручную.

Полный код для наследника:

```js
function PropertyRequiredError(property) {
  PropertyError.apply(this, arguments);
  this.name = 'PropertyRequiredError';
  this.message = 'Отсутствует свойство ' + property;
}

PropertyRequiredError.prototype = Object.create(PropertyError);
PropertyRequiredError.prototype.constructor = PropertyRequiredError;

var err = new PropertyRequiredError("age");
// пройдёт проверку
alert( err instanceof PropertyError ); // true
```

Здесь заодно и `message` было перезаписано на более точное. Если хочется избежать записи и перезаписи, то можно оформить его в виде геттера через `Object.defineProperty`.

## Итого

<ul>
<li>Чтобы наследовать встроенному классу ошибок `Error`, нужно самостоятельно позаботиться о `name`, `message` и `stack`.</li>
<li>Благодаря `instanceof` мы получили удобную поддержку иерархии ошибок, с возможностью в любой момент добавить новые классы, понятным кодом и предсказуемым поведением.</li>
</ul>

Чтобы создавать наследники от `Error` было проще, можно создать класс `CustomError`, записать в него универсальный код, наподобие `PropertyError` и далее наследовать уже от него.
