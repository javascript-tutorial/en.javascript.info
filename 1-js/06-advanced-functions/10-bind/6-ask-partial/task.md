importance: 5

---

# Partial application for login

The task is a little more complex variant of <info:task/question-use-bind>. 

The `user` object was modified. Now instead of two functions `loginOk/loginFail`, it has a single function `user.login(true/false)`.

What should we pass `askPassword` in the code below, so that it calls `user.login(true)` as `ok` and `user.login(false)` as `fail`?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Your changes should only modify the highlighted fragment.

