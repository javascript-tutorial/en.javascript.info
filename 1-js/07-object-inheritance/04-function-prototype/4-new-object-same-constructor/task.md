importance: 5

---

# Create an object with the same constructor

Imagine, we have an arbitrary object `obj`, created by a constructor function -- we don't know which one, but we'd like to create a new object using it.

Can we do it like that?

```js
let obj2 = new obj.constructor();
```

Give an example of a constructor function for `obj` which lets such code work right. And an example that makes it work wrong.
