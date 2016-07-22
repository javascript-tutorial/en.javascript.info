importance: 5

---

# Are counters independent?

What is the second counter going to show? `0,1` or `2,3` or something else?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

var counter = makeCounter();
var counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```

