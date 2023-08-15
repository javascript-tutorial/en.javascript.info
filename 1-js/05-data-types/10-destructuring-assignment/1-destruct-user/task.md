muhimlik: 5

---

# Destruktiv topshiriq

Bizda ob'ekt bor:

```js
let user = {
  name: "John",
  years: 30,
};
```

O'qishni buzish topshirig'ini yozing:

- `name` xususiyatini `name` o`zgaruvchisiga kiriting.
- `years` xususiyati `age` o'zgaruvchisiga.
- `isAdmin` o'zgaruvchisiga `isAdmin` xususiyati (agar bunday xususiyat bo'lmasa, noto'g'ri)

Sizning topshirig'ingizdan keyingi qiymatlarga misol:

```js
let user = { name: "John", years: 30 };

// sizning kodingiz chap tomonda:
// ... = user

alert(name); // John
alert(age); // 30
alert(isAdmin); // false
```
