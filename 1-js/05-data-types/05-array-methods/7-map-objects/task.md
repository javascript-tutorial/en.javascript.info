muhimlik: 5

---

# Map to objects

Sizda `foydalanuvchi` obyektlari masivi bor, ularning har birida `ism`, `familiya` va `id` mavjud.

Undan `id` va `fullName`ga ega bo'lgan boshqa massivni yaratish uchun kodni yozing, bu yerda `fullName` `ism` va `familiya`dan hosil bo`ladi.

Misol uchun:

```js no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = /* ... your code ... */
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ) // 1
alert( usersMapped[0].fullName ) // John Smith
```

Shunday qilib, aslida siz ob'ektlarning bir qatorini boshqasiga joylashtirishingiz kerak. Bu yerda `=>` dan foydalanib koʻring. Kichkina ushlash bor.
