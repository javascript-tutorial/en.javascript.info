muhimlik: 5

---

# Hisoblagichlar mustaqilmi?

Bu yerda biz ikkita hisoblagich yasaymiz: bir xil `makeCounter` funksiyasidan foydalangan holda `counter` va `counter2`.

Ular mustaqilmi? Ikkinchi hisoblagich nimani ko'rsatadi? `0,1` yoki `2,3` yoki boshqa narsa?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

