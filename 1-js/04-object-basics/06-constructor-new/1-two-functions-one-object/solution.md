Yes, it's possible.

If a function returns an object then `new` returns it instead of `this`.

So they can, for instance, return the same externally defined object `obj`:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
