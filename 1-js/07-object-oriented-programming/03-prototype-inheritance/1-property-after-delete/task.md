importance: 5

---

# Working with prototype

Here's the code that creates a pair of objects, then modifies them.

Which values are shown in the process?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

There should be 3 answers.
