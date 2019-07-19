importance: 5

---

# Iterable keys

We'd like to get an array of `map.keys()` in a variable and then do apply array-specific methods to it, e.g. `.push`.

But that doesn't work:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

Why? How can we fix the code to make `keys.push` work?
