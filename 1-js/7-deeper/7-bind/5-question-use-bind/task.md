importance: 5

---

# Ask loosing this

The call to `user.checkPassword()` in the code below should `ask` for password and call `loginOk/loginFail` depending on the answer.

But it leads to an error. Why?

Fix the highlighted line for everything to start working right (other lines are not to be changed).

```js run
function ask(question, answer, ok, fail) {
  let result = prompt(question, '');
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
    ask("Your password?", this.password, this.loginOk, this.loginFail);
*/!*
  }
};

user.checkPassword();
```

P.S. Your solution should also work if `user` gets overwritten. For instance, the last lines instead of `user.checkPassword()` would be:

```js
let john = user;
user = null;
john.checkPassword();
```

