importance: 5

---

# Add toString to the dictionary

There's an object `dictionary`, created as `Object.create(null)`, to store any `key/value` pairs.

Add method `dictionary.toString()` into it, that should return a comma-delimited list of keys. Your `toString` should not show up in `for..in` over the object.

Here's how it should work:

```js
let dictionary = Object.create(null);

*!*
// your code to add dictionary.toString method
*/!*

// add some data
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // __proto__ is a regular property key here

// only apple and __proto__ are in the loop
for(let key in dictionary) {
  alert(key); // "apple", then "__proto__"
}  

// your toString in action
alert(dictionary); // "apple,__proto__"
```
