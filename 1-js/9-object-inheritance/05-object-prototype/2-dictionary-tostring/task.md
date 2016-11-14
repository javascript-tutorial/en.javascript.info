importance: 5

---

# Add toString to dictionary

There's an object `dictionary`, suited to store any `key/value` pairs.

Add `toString` for it, that would show a list of comma-delimited keys. The method itself should not show up in `for..in` over the object.

Here's how it should work:

```js
let dictionary = Object.create(null);

// your code to add toString

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple and __proto__ is in the loop
for(let key in dictionary) {
  alert(key); // "apple", then "__proto"
}  

// comma-separated list of properties by toString
alert(dictionary); // "apple,__proto__"
```

