
The error occurs because `ask` gets functions `loginOk/loginFail` without the object.

When it calls them, they naturally assume `this=undefined`.

Let's `bind` the context:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Now it works.

An alternative solution could be:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Usually that also works, but may fail in more complex situations where `user` has a chance of being overwritten between the moments of asking and running `() => user.loginOk()`. 


