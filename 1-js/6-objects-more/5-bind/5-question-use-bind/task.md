# Использование функции вопросов

[importance 5]

Вызов `user.checkPassword()` в коде ниже должен, при помощи `ask`, спрашивать пароль и вызывать `loginOk/loginFail` в зависимости от правильности ответа. 

Однако, его вызов приводит к ошибке. Почему? 

Исправьте выделенную строку, чтобы всё работало (других строк изменять не надо).

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
    ask("Ваш пароль?", this.password, this.loginOk, this.loginFail);
*/!*
  }
};

user.checkPassword();
```

P.S. Ваше решение должно также срабатывать, если переменная `user` будет перезаписана, например вместо `user.checkPassword()` в конце будут строки:

```js
var vasya = user;
user = null;
vasya.checkPassword();
```

