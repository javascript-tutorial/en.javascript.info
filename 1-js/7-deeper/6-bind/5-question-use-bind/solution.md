
The error occurs because `ask` gets functions `loginOk/loginFail` without the object.

When it calls them, they naturally assume `this=undefined`.

Let's `bind` the context:

```js run
function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result == answer) ok();
  else fail();
}

let user = {
  login: 'John',
  password: '12345',

  loginOk() {
    alert(`${this.login} logged in`);
  },

  loginFail() {
    alert(`${this.login} failed to log in`);
  },

  checkPassword() {
*!*
    ask("Your password?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));
*/!*
  }
};

let john = user;
user = null;
john.checkPassword();
```

Now it works.

An alternative solution could be:
```js
//...
ask("Your password?", this.password, () => user.loginOk(), () => user.loginFail());
```

...But that code would fail if `user` becomes overwritten. 


