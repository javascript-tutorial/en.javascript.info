importance: 5

---
# Function in if

Look at the code. What will be the result of the call at the last line?

```js
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
