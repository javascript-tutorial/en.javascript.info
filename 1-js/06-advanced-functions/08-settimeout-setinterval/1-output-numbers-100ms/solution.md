
`setInterval` ishlatib:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

Ichma-ich `setTimeout` ishlatib:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
```

E'tibor bering, ikkala yechimda ham birinchi natijadan oldin dastlabki kechikish mavjud. Funktsiya birinchi marta `1000ms` dan keyin chaqiriladi.

Agar biz funktsiyaning darhol ishlashini xohlasak, biz alohida qatorga qo'shimcha chaqiruvni qo'shishimiz mumkin, masalan:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
