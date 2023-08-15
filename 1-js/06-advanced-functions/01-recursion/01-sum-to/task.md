muhimlik: 5

---

# Berilgan raqamgacha barcha raqamlarni yig'ing

`1 + 2 + ... + n` raqamlar yig'indisini hisoblaydigan `sumTo(n)` funksiyasini yozing.

Masalan:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

3 ta yechim variantini yarating:

1. For siklidan foydalanish.
2. Rekursiyadan foydalanib, `n > 1` uchun `sumTo(n) = n + sumTo(n-1)` ni keltiring.
3. [arifmetik progressiya] (https://en.wikipedia.org/wiki/Arithmetic_Progression) formulasidan foydalanish.

Natijaga misol:

```js
function sumTo(n) { /*... sizning kod ... */ }

alert( sumTo(100) ); // 5050
```

P.S. Qaysi yechim varianti eng tezkor? Eng sekinmi? Nega?

P.P.S. `sumTo(100000)`ni hisoblash uchun rekursiyadan foydalana olamizmi?
