muhimlik: 5

---

# Hisoblagich ob'ekti

Bu yerda konstruktor funksiyasi yordamida hisoblagich obyekti yasaladi.

Bu ishlaydimi? U nimani ko'rsatadi?

```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```

