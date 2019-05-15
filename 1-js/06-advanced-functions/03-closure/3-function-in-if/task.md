
# Function in if

Look at the code. What will be result of the call at the last line?

```js run
'use strict';

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
