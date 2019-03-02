importance: 5

---

# Iterable keys

We want to get an array of `map.keys()` and go on working with it (apart from the map itself).

But there's a problem:

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
