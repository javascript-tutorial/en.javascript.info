# Решение с bind

Ошибка происходит потому, что `ask` получает только функцию, без объекта-контекста. 

Используем `bind`, чтобы передать в `ask` функцию с уже привязанным контекстом:

```js
//+ run
"use strict";

function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}

var user = {
  login: 'Василий',
  password: '12345',

  loginOk: function() {
    alert(this.login + ' вошёл в сайт');
  },

  loginFail: function() {
    alert(this.login + ': ошибка входа');
  },

  checkPassword: function() {
*!*
    ask("Ваш пароль?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));
*/!*
  }
};

var vasya = user;
user = null;
vasya.checkPassword();
```

# Решение через замыкание

Альтернативное решение -- сделать функции-обёртки над `user.loginOk/loginFail`:

```js
var user = {
  ...
  checkPassword: function() {
*!*
    ask("Ваш пароль?", this.password, 
      function() { user.loginOk(); }, function() { user.loginFail(); });
*/!*
  }
}
```

...Но такой код использует переменную `user`, так что если объект переместить из неё, к примеру, так, то работать он не будет:

```js
var vasya = user; // переместим user в vasya
user = null;
vasya.checkPassword(); // упс будет ошибка, ведь в коде объекта остался user
```

Для того, чтобы избежать проблем, можно использовать `this`. Внутри `checkPassword` он всегда будет равен текущему объекту, так что скопируем его в переменную, которую назовём `self`:

```js
//+ run
"use strict";

function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}

var user = {
  login: 'Василий',
  password: '12345',

  loginOk: function() {
    alert(this.login + ' вошёл в сайт');
  },

  loginFail: function() {
    alert(this.login + ': ошибка входа');
  },

  checkPassword: function() {
*!*
    var self = this;
    ask("Ваш пароль?", this.password, 
      function() { self.loginOk(); }, 
      function() { self.loginFail(); }
    );
*/!*
  }
};

var vasya = user;
user = null;
vasya.checkPassword();
```

Теперь всё работает. Анонимные функции достают правильный контекст из замыкания, где он сохранён в переменной `self`.