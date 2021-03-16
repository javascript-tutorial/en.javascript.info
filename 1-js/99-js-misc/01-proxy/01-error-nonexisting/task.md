# Error on reading non-existant property

Usually, an attempt to read a non-existant property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existant property instead.

That can help to detect programming mistakes early.

Write a function `wrap(target)` that takes an object `target` and return a proxy that adds this functionality aspect.

That's how it should work:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* your code */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: Property doesn't exist "age"
*/!*
```
