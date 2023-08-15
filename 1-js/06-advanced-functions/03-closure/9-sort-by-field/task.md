muhimlik: 5

---

# Maydon bo'yicha saralash

Bizda saralash uchun bir qator ob'ektlar mavjud:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

Buni qilishning odatiy usuli:

```js
// ism bo'yicha (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// yosh bo'yicha (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

Buni shunga o'xshash yanada batafsilroq qilib bera olamizmi?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Shunday qilib, funktsiya yozish o'rniga `byField(fieldName)` ni qo'ying.

Buning uchun ishlatilishi mumkin bo'lgan `byField` funksiyasini yozing.
