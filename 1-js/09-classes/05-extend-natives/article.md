
# Extending built-in classes

Built-in classes like Array, Map and others are extendable also.

For instance, here `PowerArray` inherits from the native `Array`:

```js run
// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

Please note a very interesting thing. Built-in methods like `filter`, `map` and others -- return new objects of exactly the inherited type. They rely on the `constructor` property to do so.

In the example above,
```js
arr.constructor === PowerArray
```

So when `arr.filter()` is called, it internally creates the new array of results using exactly `new PowerArray`, not basic `Array`. That's actually very cool, because we can keep using `PowerArray` methods further on the result.

Even more, we can customize that behavior.

We can add a special static getter `Symbol.species` to the class. If exists, it should return the constructor that JavaScript will use internally to create new entities in `map`, `filter` and so on.

If we'd like built-in methods like `map`, `filter` will return regular arrays, we can return `Array` in `Symbol.species`, like here:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr is not PowerArray, but Array
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

As you can see, now `.filter` returns `Array`. So the extended functionality is not passed any further.

## No static inheritance in built-ins

Built-in objects have their own static methods, for instance `Object.keys`, `Array.isArray` etc.

As we already know, native classes extend each other. For instance, `Array` extends `Object`.

Normally, when one class extends another, both static and non-static methods are inherited.

So, if `Rabbit extends Animal`, then:

1. `Rabbit.methods` are callable for `Animal.methods`, because `Rabbit.[[Prototype]] = Animal`.
2. `new Rabbit().methods` are also available, because `Rabbit.prototype.[[Prototype]] = Animal.prototype`.

That's thoroughly explained in the chapter [](info:static-properties-methods#statics-and-inheritance).

But built-in classes are an exception. They don't inherit statics `(1)` from each other.

For example, both `Array` and `Date` inherit from `Object`, so their instances have methods from `Object.prototype`. But  `Array.[[Prototype]]` does not point to `Object`. So there's `Object.keys()`, but not `Array.keys()` and `Date.keys()`.

Here's the picture structure for `Date` and `Object`:

![](object-date-inheritance.png)

Note, there's no link between `Date` and `Object`. Both `Object` and `Date` exist independently. `Date.prototype` inherits from `Object.prototype`, but that's all.
