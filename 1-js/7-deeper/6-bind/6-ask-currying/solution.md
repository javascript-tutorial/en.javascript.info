# Решение с bind

Первое решение -- передать в `ask` функции с привязанным контекстом и аргументами.

```js run
"use strict";

function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}

var user = {
  login: 'Василий',
  password: '12345',

  loginDone: function(result) {
    alert( this.login + (result ? ' вошёл в сайт' : ' ошибка входа') );
  },

  checkPassword: function() {
*!*
    ask("Ваш пароль?", this.password, this.loginDone.bind(this, true), this.loginDone.bind(this, false));
*/!*
  }
};

user.checkPassword();
```

# Решение с локальной переменной

Второе решение -- это скопировать `this` в локальную переменную (чтобы внешняя перезапись не повлияла):

```js run
"use strict";

function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}

var user = {
  login: 'Василий',
  password: '12345',

  loginDone: function(result) {
    alert( this.login + (result ? ' вошёл в сайт' : ' ошибка входа') );
  },

  checkPassword: function() {
    var self = this;
*!*
    ask("Ваш пароль?", this.password,
      function() {
        self.loginDone(true);
      },
      function() {
        self.loginDone(false);
      }
    );
*/!*
  }
};

user.checkPassword();
```

Оба решения хороши, вариант с `bind` короче.