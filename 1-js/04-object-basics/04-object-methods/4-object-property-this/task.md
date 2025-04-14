importance: 5

---

# Using "this" in object literal

Here the function `makeUser` returns an object.

What is the result of accessing its `ref`? Why?

```js
"use strict";
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // What's the result?
```

