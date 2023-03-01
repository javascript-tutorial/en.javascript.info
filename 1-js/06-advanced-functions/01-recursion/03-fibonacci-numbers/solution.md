Bu erda sinab ko'rishimiz mumkin bo'lgan birinchi yechim rekursivdir.

Fibonachchi raqamlari ta'rifi bo'yicha rekursivdir:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // juda sekin bo'ladi!
```

...Lekin `n` ning katta qiymatlari uchun bu juda sekin. Masalan, `fib(77)` barcha protsessor resurslarini iste'mol qilib, dvigatelni bir muddat o'chirib qo'yishi mumkin.

Buning sababi, funktsiya juda ko'p qo'shimcha qo'ng'iroqlarni amalga oshiradi. Xuddi shu qiymatlar qayta-qayta baholanadi.

Masalan, `fib(5)` uchun hisob-kitoblarni ko'rib chiqamiz:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Bu yerda biz `fib(3)` qiymati `fib(5)` va `fib(4)` uchun zarur ekanligini ko'rishimiz mumkin. Shunday qilib, `fib(3)` ikki marta mustaqil ravishda chaqiriladi va baholanadi.

Mana to'liq rekursiya daraxti:

![fibonacci recursion tree](fibonacci-recursion-tree.svg)

Biz `fib(3)` ikki marta va `fib(2)` uch marta baholanishini aniq ko'rishimiz mumkin. Hisoblashlarning umumiy miqdori `n` dan tezroq o'sadi, bu hatto `n=77` uchun ham juda katta bo'ladi.

Biz buni allaqachon baholangan qiymatlarni eslab, optimallashtirishimiz mumkin: agar `fib(3)` deylik qiymati bir marta hisoblansa, uni kelajakdagi hisob-kitoblarda qayta ishlatishimiz mumkin.

Yana bir variant - rekursiyadan voz kechish va butunlay boshqa tsiklga asoslangan algoritmdan foydalanish.

`n` dan pastroq qiymatlarga o‘tish o‘rniga, `1` va `2` dan boshlanadigan, so‘ngra ularning yig‘indisi sifatida `fib(3)` ni, so‘ngra yig‘indi sifatida `fib(4)` ni oladigan sikl yasashimiz mumkin. oldingi ikkita qiymatdan, keyin `fib(5)` va kerakli qiymatga yetguncha yuqoriga va yuqoriga ko'tariladi. Har bir qadamda biz faqat ikkita oldingi qiymatni eslab qolishimiz kerak.

Bu yerda yangi algoritmning qadamlari batafsil.

Boshlanish:

```js
// a = fib(1), b = fib(2), bu qiymatlar ta'rifi bo'yicha 1
let a = 1, b = 1;

// c = fib(3)ni ularning yig'indisi sifatida oling
let c = a + b;

/* endi bizda fib(1), fib(2), fib(3) bor
a  b  c
1, 1, 2
*/
```

Endi biz `fib(4) = fib(2) + fib(3)` ni olishni istaymiz.

O'zgaruvchilarni o'zgartiramiz: `a,b` `fib(2),fib(3)`, `c` esa ularning yig'indisini oladi:

```js no-beautify
a = b; // now a = fib(2)
b = c; // now b = fib(3)
c = a + b; // c = fib(4)

/* Endi bizda ketma-ketlik bor:
   a  b  c
1, 1, 2, 3
*/
```

Keyingi qadam boshqa tartib raqamini beradi:

```js no-beautify
a = b; // now a = fib(3)
b = c; // now b = fib(4)
c = a + b; // c = fib(5)

/* endi ketma-ketlik (yana bitta raqam):
      a  b  c
1, 1, 2, 3, 5
*/
```

...Va shunga o'xshash, biz kerakli qiymatni olmagunimizcha. Bu rekursiyadan ancha tezroq va takroriy hisob-kitoblarni o'z ichiga olmaydi.

To'liq kod:

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

Sikl `i=3` bilan boshlanadi, chunki birinchi va ikkinchi ketma-ketlik qiymatlari `a=1`, `b=1` o`zgaruvchilarga qattiq kodlangan.

Yondashuv [dinamik dasturlash pastdan yuqoriga] (https://en.wikipedia.org/wiki/Dynamic_programming) deb ataladi.
