Sure, it works, no problem.

The `const` only protects the variable itself from changing. 

In other words, `user` stores a reference to the object. And it can't be changed. But the content of the object can.

```js run
const user = {
  name: "John"
};

*!*
// works
user.name = "Pete";
*/!*

// error
user = 123;
```
