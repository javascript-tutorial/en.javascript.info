
The method can take all enumerable keys using `Object.keys` and output their list.

To make `toString` non-enumerable, let's define it using a property descriptor. The syntax of `Object.create` allows to provide an object with property descriptors as the second argument.

```js run
*!*
let dictionary = Object.create(null, {
  toString: { // define toString property
    value() { // with function value
      return Object.keys(this).join();
    }
  }
});
*/!*

dictionary.apple = "Apple";
dictionary.__proto__ = "test";

// apple and __proto__ is in the loop
for(let key in dictionary) {
  alert(key); // "apple", then "__proto"
}  

// comma-separated list of properties by toString
alert(dictionary); // "apple,__proto__"
```

