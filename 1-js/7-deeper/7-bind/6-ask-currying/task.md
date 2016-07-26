importance: 5

---

# Partial application for login [todo solution]

The task is a little more complex variant of <info:task/question-use-bind>. 

We have the same `ask` function, prompting for password. But instead of `user.loginOk()` and `user.loginFail()`, now there's a single method: `user.loginDone(true/false)`, that should be called with `true` for correct input and `false` otherwise.

There's a full code below.

Right now, there's a problem. When `user` variable is overwritten by another value, errors start to appear in the highlighted fragment (run it).

How to write it right?

```js run
function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result == answer) ok();
  else fail();
}

let user = {
  login: 'John',
  password: '12345',

  // метод для вызова из ask
  loginDone(result) {
    alert( this.login + (result ? ' logged in' : ' failed to log in') );
  },

  checkPassword() {
*!*
    ask("Your password?", this.password, 
      ()=>user.loginDone(true)
      ()=>user.loginDone(false)
    );
*/!*
  }
};

let john = user;
user = null;
john.checkPassword();
```

Your changes should only modify the highlighted fragment.

