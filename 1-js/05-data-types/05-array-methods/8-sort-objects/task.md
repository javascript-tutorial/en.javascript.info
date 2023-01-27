muhimlik: 5

---

# Foydalanuvchilarni yoshga qarab tartiblang

`age` xususiyatiga ega ob'ektlar qatorini oladigan va ularni `yosh` bo'yicha saralaydigan `sortByAge(users)` funksiyasini yozing.

Misol uchun:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [pete, john, mary];

sortByAge(arr);

// endi: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
