```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```

E'tibor bering, arrow funktsiyalarida biz qo'shimcha qavslardan foydalanishimiz kerak.

Biz shunday yoza olmaymiz:

```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Esda tutganimizdek, ikkita arrow funksiyasi mavjud: `value => expr` tanasisiz va `valuei => {...}` tanasi bilan.

Bu yerda JavaScript `{` ni obyektning boshlanishi emas, balki funksiya tanasining boshlanishi sifatida ko'radi. Vaqtinchalik yechim ularni "oddiy" qavslarga o'rashdir:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Endi yaxshi.
