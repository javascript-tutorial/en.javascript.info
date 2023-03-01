Ta'rifga ko'ra, faktorial `n!` `n * (n-1)!` shaklida yozilishi mumkin.

Boshqacha qilib aytadigan bo'lsak, `factorial(n)` natijasini "n"ni `factorial(n-1)` natijasiga ko'paytirish orqali hisoblash mumkin. Va `n-1` uchun qo'ng'iroq rekursiv ravishda `1` gacha pastga va pastga tushishi mumkin.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

Rekursiyaning asosi `1` qiymati hisoblanadi. Bundan tashqari, biz bu erda `0` ni asos qilib olamiz, unchalik muhim emas, lekin yana bir rekursiv qadam beradi:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
