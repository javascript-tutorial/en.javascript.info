importance: 5

---

# Sort objects

Write the function `sortByName(users)` that gets an array of objects with the `age` property and sorts them by `age`.

For instance:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

sortByName(arr);

// now: [john, mary, pete]
alert(arr[0].name); // Mary
alert(arr[2].name); // Pete
```
