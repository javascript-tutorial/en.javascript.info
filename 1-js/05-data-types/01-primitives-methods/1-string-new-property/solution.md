
Try running it:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).

Why? Let's replay what's happening at line `(*)`:

1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears.

So, without strict mode, in the last line `str` has no trace of the property.

**This example clearly shows that primitives are not objects.**

They can't store additional data.
