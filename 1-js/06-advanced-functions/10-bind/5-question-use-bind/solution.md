
Xatolik `ask` ob'ektsiz `loginOk/loginFail` funksiyalarini olganligi sababli yuzaga keladi.

U ularni chaqirganda, ular tabiiy ravishda `this=undefined` deb taxmin qilishadi.

Keling, kontekstni "bog'laymiz":

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

Endi ishlaydi.

Muqobil yechim bo'lishi mumkin:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```

Odatda bu ham ishlaydi va yaxshi ko'rinadi.

Bu biroz ishonchli emas, garchi `user` o'zgaruvchisi *so'ng* `askPassword` chaqirilgandan keyin o'zgarishi mumkin bo'lsa-da, lekin tashrifchi `() => user.loginOk()` ga javob berib, *qo'ng'iroq qilishidan* oldin.
