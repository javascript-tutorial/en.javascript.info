muhimlik: 4

---

# Faktorial hisoblang

Natural sonning [factorial](https://en.wikipedia.org/wiki/Factorial) `"son minus bir"` ga, so'ngra `"minus ikki"` ga ko'paytiriladigan son va hokazo. `1`. `n` omili `n!` sifatida belgilanadi

Faktorialning ta'rifini quyidagicha yozishimiz mumkin:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Turli `n` uchun faktoriallarning qiymatlari:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Vazifa rekursiv chaqiruvlar yordamida `n!` ni hisoblaydigan `factorial(n)` funksiyasini yozishdan iborat.

```js
alert( factorial(5) ); // 120
```

P.S. Maslahat: `n!` `n * (n-1) shaklida yozilishi mumkin!` Masalan: `3! = 3*2! = 3*2*1! = 6`
