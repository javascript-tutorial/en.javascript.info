importance: 5

---

# Add toString to dictionary

There's an object `dictionary`, suited to store any `key/value` pairs.

Add `toString` for it, that would show a list of comma-delimited keys. Your `toString` should not show up in `for..in` over the object.

Here's how it should work:

```js
let dictionary = Object.create(null);

*!*
// your code to add toString
*/!*

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// only apple and __proto__ are in the loop
for(let key in dictionary) {
  alert(key); // "apple", then "__proto__"
}  

// your toString in action
alert(dictionary); // "apple,__proto__"
```

