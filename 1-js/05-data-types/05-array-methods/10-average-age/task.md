muhimlik: 4

---

# O'rtacha yoshni aniqlash

`age` xususiyatiga ega ob'ektlar massivini oladigan va o'rtacha yoshni qaytaruvchi `getAverageAge(users)` funksiyasini yozing.

O'rtacha yosh uchun formula `(age1 + age2 + ... + ageN) / N`.

Misol uchun:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [john, pete, mary];

alert(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28
```
