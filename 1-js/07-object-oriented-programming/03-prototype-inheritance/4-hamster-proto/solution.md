Let's look carefully at what's going on in the call `speedy.eat("apple")`.

1. The method `speedy.eat` is found in the prototype (`hamster`), but called in the context of `speedy`. So the value of `this` is correct.

2. Then `this.stomach.push()` needs to find `stomach` property and call `push` on it. It looks for `stomach` in `this` (`=speedy`), but nothing found. 

3. Then it follows the prototype chain and finds `stomach` in `hamster`.

4. Then it calls `push` on it, adding the food into *the stomach of the prototype*.

It turns out that all hamsters share a single stomach!

Please note that it would not happen in case of a simple assignment `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // assign to this.stomach instead of this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = { __proto__: hamster };

let lazy = { __proto__: hamster };

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
```

Now all works fine, because `this.stomach=` does not perform a lookup of `stomach`. The value is written directly into `this` object. And for a method call `this.stomach.push`, the object is to be found first (in the prototype), then called, that's the difference.

But more often, we can totally evade the problem by making sure that each hamster has his own stomach, explicitly:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = { 
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = { 
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
alert( lazy.stomach ); // <nothing>
```

As a common solution, all object properties, like `stomach` above, are usually written into each object. That prevents such problems. From the other hand, methods and primives can safely stay in prototypes.

