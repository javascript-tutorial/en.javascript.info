muhimlik: 5

---

# "this" ni yo'qotadigan funktsiyani tuzating

Quyidagi koddagi `askPassword()` ni chaqirish parolni tekshirishi va javobga qarab `user.loginOk/loginFail` ni chaqirishi kerak.

Ammo bu xatoga olib keladi. Nega?

Har bir narsa to'g'ri ishlay boshlashi uchun ajratilgan chiziqni tuzating (boshqa qatorlarni o'zgartirish mumkin emas).

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
askPassword(user.loginOk, user.loginFail);
*/!*
```
