
Try running it:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test); 
```

There may be two kinds of result:
1. `undefined`
2. An error.

Why? Let's replay what's happening at line `(*)`:

1. When a property of `str` is accessed, a "wrapper object" is created.
2. The operation with the property is carried out on it. So, the object gets the `test` property.
3. The operation finishes and the "wrapper object" disappears.

So, on the last line, `str` has no trace of the property. A new wrapper object for every object operation on a string.

Some browsers though may decide to further limit the programmer and disallow to assign properties to primitives at all. That's why in practice we can also see errors at line `(*)`. It's a little bit farther from the specification though.

**This example clearly shows that primitives are not objects.**

They just can not store data. 

All property/method operations are performed with the help of temporary objects.

