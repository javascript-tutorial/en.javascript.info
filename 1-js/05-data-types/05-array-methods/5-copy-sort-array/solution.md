Nusxa olish va undagi tartibni ishga tushirish uchun `slice()` dan foydalanishimiz mumkin:

```js run
function copySorted(arr) {
  return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

*!*
let sorted = copySorted(arr);
*/!*

alert( sorted );
alert( arr );
```
