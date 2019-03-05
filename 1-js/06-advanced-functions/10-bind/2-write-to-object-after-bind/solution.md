The answer: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

The context of a bound function is hard-fixed. There's just no way to further change it.

So even while we run `user.g()`, the original function is called with `this=null`.

PS: if you try it on Chrome or other devTool that is not using `'strict mode'`, `this` will reference the `window` object. Just for test purposes, try a IIFE on `'strict mode'`:

```js run
  (function() {

      'use strict'
      function f() {
        alert( this ); // null
      }

      let user = {
        g: f.bind(null)
      };

      user.g();
  }());
  ```
