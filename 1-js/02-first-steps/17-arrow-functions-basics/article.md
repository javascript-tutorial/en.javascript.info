# Arrow funksiyalar, asoslari

Funktsiyalarni yaratish uchun yana bir juda sodda va ixcham sintaksis mavjud bo'lib, u ko'pincha Function Expression lardan yaxshiroq.

Ular "arrow functions" deb ataladi, chunki ular quyidagicha ko'rinishga ega:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

Bu `arg1..argN` argumentlarni qabul qiluvchi `func` funksiyasini yaratadi, so‘ngra ulardan foydalanish bilan o‘ng tarafdagi `ifoda` ni hisoblaydi va uning natijasini qaytaradi.

Boshqacha qilib aytganda, bu quyidagi kodni yozishning qisqa usuli:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Keling, aniq bir misolni ko'rib chiqaylik:

```js run
let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

Ko'rib turganingizdek, `(a, b) => a + b` `a` va `b` nomli ikkita argumentni qabul qiluvchi funktsiyani bildiradi. Amalga oshirilgandan so'ng, u `a + b` ifodasini hisoblaydi va natijani qaytaradi.

- Agar bizda faqat bitta argument bo'lsa, parametrlar atrofidagi qavslarni olib tashlash mumkin, bu esa uni yanada qisqaroq qiladi.

    Masalan:

    ```js run
    *!*
    let double = n => n * 2;
    // roughly the same as: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Agar argumentlar bo'lmasa, qavslar bo'sh bo'ladi (lekin mavjud bo'lishi shart):
- If there are no arguments, parentheses are empty, but they must be present:

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Arrow funktsiyalardan Function Expressions kabi foydalanish mumkin.

Masalan, funktsiyani dinamik tarzda yaratgani:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello!') :
  () => alert("Greetings!");

welcome();
```

Arroq funktsiyalar notanish va boshida unchalik o'qishga oson bo'lmay ko'rinishi mumkin, lekin ko'zlar tuzilishga o'zganishi bilan bu darhol o'zgaradi.

Ko'p so'zlarni yozishga eringanimizda, ular oddiy bir-qatorli harakatlar uchun judayam qulay.

## Ko'p-qatorli arrow funktsiyalar

Yuqorida misollar `=>` ning chap tomonidagi argumentarni oldi va ular bilan o'ng tomondagi ifodalarni hisobladi.

Ba'zan bizga bir nechta iboralar yoki ifodalar kabi biroz murakkabroq narsa kerak bo'ladi. Buning ilojisi bor, lekin biz ularni jingalak qavslar ichiga olishimiz kerak. Keyin ular ichida oddiy `return` dan foydalanamiz.
The arrow functions that we've seen so far were very simple. They took arguments from the left of `=>`, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a `return` within them to return a value (just like a regular function does).

Mana bunga o'xshash:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return"
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Bu erda biz qisqaligi uchun arrow funktsiyalarini maqtadik. Lekin bu hammasi emas!

Arrow funktsiyalar boshqa qiziqarli xususiyatlarga ega.

Ularni chuqur o‘rganish uchun avvalo JavaScript-ning ba’zi boshqa jihatlari bilan tanishishimiz kerak, shuning uchun keyinroq <info:arrow-functions> bobida arrow funktsiyalariga qaytamiz.

Hozircha, biz allaqachon arrow funktsiyalarni bir qatorli harakatlar va callback lar uchun foydalana olamiz.
```

## Xulos

Arrow funktsiyalar bir qatorchilar uchun qulay. Ular ikki xil ko'rinishda bo'ladi:

1. Jingalak qavslarsiz: `(...args) => expression` -- o'ng tomon ifoda: funktsiya uni hosblaydi va qaytaradi.
2. Jingalak qavslar bilan: `(...args) => { body }` -- qavslar bizga funktsiya ichida bir nechta ifodalarni yozish imkonini beradi, ammo biz biror narsani qaytarish uchun `return` dan foydalanishimiz kereak.
Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there's only a single argument, e.g. `n => n*2`.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
