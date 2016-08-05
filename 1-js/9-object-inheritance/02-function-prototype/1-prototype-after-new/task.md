importance: 5

---

# Прототип после создания

В примерах ниже создаётся объект `new Rabbit`, а затем проводятся различные действия с `prototype`.

Каковы будут результаты выполнения? Почему?

Начнём с этого кода. Что он выведет?

```js
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

alert( rabbit.eats );
```

Добавили строку (выделена), что будет теперь?

```js
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

*!*
Rabbit.prototype = {};
*/!*

alert( rabbit.eats );
```

А если код будет такой? (заменена одна строка):

```js
function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

*!*
Rabbit.prototype.eats = false;
*/!*

alert( rabbit.eats );
```

А такой? (заменена одна строка)

```js
function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

*!*
delete rabbit.eats; // (*)
*/!*

alert( rabbit.eats );
```

И последний вариант:

```js
function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

*!*
delete Rabbit.prototype.eats; // (*)
*/!*

alert( rabbit.eats );
```

