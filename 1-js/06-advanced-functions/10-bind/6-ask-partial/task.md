muhimlik: 5

---

# Kirish uchun qisman ariza

Vazifa <info:task/question-use-bind> ning biroz murakkabroq variantidir.

`user` obyekti o‘zgartirildi. Endi ikkita `loginOk/loginFail` funksiyasi o‘rniga, u bitta `user.login(true/false)` funksiyasiga ega.

`user.login(true)` ni `ok` va `user.login(false)` `fail` deb chaqirishi uchun quyidagi kodga `askPassword` nimani kiritishimiz kerak?

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

O'zgartirishlaringiz faqat ajratilgan qismni o'zgartirishi kerak.

