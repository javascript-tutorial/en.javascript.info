
# The "constructor" property

[todo make me more interesting]
Every function by default already has the `"prototype"` property.

It's an object of this form:

```js
function Rabbit() {}

Rabbit.prototype = {
  constructor: Rabbit
};
```

Here, `Rabbit.prototype` is assigned manually, but the same object is its value by default.

We can check it:

```js
function Rabbit() {}
// Rabbit.prototype = { constructor: Rabbit }

alert( Rabbit.prototype.constructor == Rabbit ); // true
```

Here's the picture:

![](function-prototype-constructor.png)

Naturally, the `"constructor"` property becomes available to all rabbits through the `[[Prototype]]`:

```js run
function Rabbit() {}

let rabbit = new Rabbit();

alert(rabbit.constructor == Rabbit); // true
```

![](rabbit-prototype-constructor.png)

We can use it to create a new object using the same constructor as the existing one:

```js run
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");
```

That may come in handy when we have an object, but don't know which constructor was used for it (e.g. it comes from a 3rd party library), and we need to create the same.

Probably the most important thing about `"constructor"` is that...

**JavaScript itself does not use the `"constructor"` property at all.**

Yes, it exists in the default `"prototype"` for functions, but that's literally all about it. No language function relies on it and nothing controls its validity.

It is created automatically, but what happens with it later -- is totally on us.

In particular, if we assign our own `Rabbit.prototype = { jumps: true }`, then there will be no `"constructor"` in it any more.

Such assignment won't break native methods or syntax, because nothing in the language uses the `"constructor"` property. But we may want to keep `"constructor"` for convenience or just in case, by adding properties to the default `"prototype"` instead of overwriting it as a whole:

```js
function Rabbit() {}

// Not overwrite Rabbit.prototype totally
// just add to it
Rabbit.prototype.jumps = true
// the default Rabbit.prototype.constructor is preserved
```

Or, alternatively, recreate it manually:

```js
Rabbit.prototype = {
  jumps: true,
*!*
  constructor: Rabbit
*/!*
};
```
