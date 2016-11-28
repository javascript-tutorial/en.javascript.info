importance: 5

---

# Strange instanceof

Why `instanceof` below returns `true`? We can easily see that `a` is not created by `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
