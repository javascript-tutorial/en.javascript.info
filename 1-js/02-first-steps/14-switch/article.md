# The "switch" statement

`switch` statement ko'plab `if` tekshiruvlarini o'rnini bosishi mumkin.

Bu qiymatni ko'plab variant-lar bilan solishtirishning yanada tavsifiy usulini beradi.

## Sintaksis

`switch` bir yoki undan ko'proq `case` bloklari va ixtiyoriy default-dan iborat.
 
U shunga o'xshaydi:

```js no-beautify
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- `x`ning qiymati birinchi `case` (ya'ni `value1`) dan ikkinchisiga (`value2`) va hokazo qiymatlarga qat'iy tenglik uchun tekshiriladi.
- Agar tenglik topilsa, `switch` mos kelgan `case`dan boshlab eng yaqin `break`ga (yoki `switch` yakuniga) qadar ishlashni boshlaydi.
- Agar bironta `case` mos kelmasa u holda `default` kod (agar mavjud bo'lsa) ishga tushadi.

## Misol

`switch`ga misol (bajarilgan kod yoritilgan):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
    break;
*!*
  case 4:
    alert( 'Exactly!' );
    break;
*/!*
  case 5:
    alert( 'Too big' );
    break;
  default:
    alert( "I don't know such values" );
}
```

Bu yerda `switch` `a`ni `3`ga teng bo'lgan birinchi `case`dan solishtirishni boshlaydi. O'xshashlik muvaffaqiyatsiz tugaydi.

So'ngra `4`. U mos keladi, shuning uchun bajaruv `case4`dan boshlanib eng yaqin `break`gacha davom etadi.

**Agar `break` mavjud bo'lmasa barajuv hech qanday tekshiruvlarsiz keyingi `case` bilan davom etadi.**

`break` mavjud bo'lmagandagi misol:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Too small' );
*!*
  case 4:
    alert( 'Exactly!' );
  case 5:
    alert( 'Too big' );
  default:
    alert( "I don't know such values" );
*/!*
}
```

Yuqoridagi misolda uchta `alert`ning  ketma-ket bajariluvini ko'ramiz:

```js
alert( 'Exactly!' );
alert( 'Too big' );
alert( "I don't know such values" );
```

````smart header="Any expression can be a `switch/case` argument"
`switch` ham `case` ham katta hajmli ifodalarga ham ishlaydi.

Misol uchun:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("this runs, because +a is 1, exactly equals b+1");
    break;
*/!*

  default:
    alert("this doesn't run");
}
```
Bu yerda `+a` `1`ni beradi, u `case`da `b + 1` bilan solishtiriladi va mos kelgan kod bajariladi.
````
````

## "case"ni guruhlash

Bir xil kodga ega bo'lgan "case" ning bir nechta variantlarini guruhlash mumkin.

Misol uchun, agar bir xil kodni `case 3` uchun ham `case 5` uchun bajarilishini xohlasak:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Right!');
    break;

*!*
  case 3: // (*) grouped two cases
  case 5:
    alert('Wrong!');
    alert("Why don't you take a math class?");
    break;
*/!*

  default:
    alert('The result is strange. Really.');
}
```

Endi `3` ham `5` ham bir xil habarni ko'rsatadi.

Case-larni guruhlash qobiliyati `switch/case` `break`siz qanday ishlashining yon ta'siridir. Bu yerda `case 3`ning bajariluvi `(*)` qatordan boshlanadi va `case 5`gacha davom etadi, lekin bironta `break` mavjud emas.
The ability to "group" cases is a side effect of how `switch/case` works without `break`. Here the execution of `case 3` starts from the line `(*)` and goes through `case 5`, because there's no `break`.


## Turning ahamiyati

Shuni ta'kidlash kerakki, tenglikni tekshirish har doim qat'iydir. Qiymatlar mos kelishi uchun bir xil turdga ega bo'lishi kerak.

Misol uchun:

```js run
let arg = prompt("Enter a value?");
switch (arg) {
  case '0':
  case '1':
    alert( 'One or zero' );
    break;

  case '2':
    alert( 'Two' );
    break;

  case 3:
    alert( 'Never executes!' );
    break;
  default:
    alert( 'An unknown value' );
}
```

1. `0`, `1` uchun, birnchi `alert` bajariladi.
2. `2` uchun ikkinchi `alert` bajariladi.
3. Lekin `3` uchun, `prompt`ning natijasi number `3`ga qat'iy teng `===` bo'lmagan string `"3"`. Shunday qilib bizda  `case 3`da ishlamaydigan kod bor! Va `default` variant bajariladi.
