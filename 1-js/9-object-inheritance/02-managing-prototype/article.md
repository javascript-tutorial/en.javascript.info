# Managing prototypes: the history

In modern Javascript there are many ways to manipulate object prototype. But it wasn't like that all the time.

Let's swim a little bit with the flow of history to understand these ways and also get deeper into internals of Javascript.

## Old times: F.prototype

JavaScript has had prototypal inheritance from the beginning. It was one of the core features of the language.

But in the old times, the `[[Prototype]]` property was internal. There was no way to read or modify it.

There was only way to set it: to use a `"prototype"` property of the constructor function. 

As we know already, `new F` creates a new object. But what we didn't use yet is a special `"prototype"` property on it.

**When `new F` is called, `[[Prototype]]` of the new object is set to `F.prototype`.**

Here `F.prototype` means a regular property named `"prototype"`. It sounds something similar to the term "prototype", but here we really mean a regular property with this name.

Like this:

```js run
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = animal;
*/!*

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

Setting `Rabbit.prototype = animal` literally states the following: "When a `new Rabbit` is created, assign its `[[Prototype]]` to `animal`".

Here's the picture:

![](proto-constructor-animal-rabbit.png)

On the picture, `"prototype"` is a horizontal arrow, meaning that it's a regular property, and `[[Prototype]]` is vertical, meaning the inheritance of `rabbit` from `animal`.

To make it finally clear: `"prototype"` is not `[[Prototype]]`. They look similar, but they are totally different. The value of `Rabbit.prototype` is used to set `[[Prototype]]`. That's all about it. Afterwards, the property search mechanism uses `[[Prototype]]` only.

To evade any misunderstandings, in this text the quoted `"prototype"` means the property, while the unquoted prototype means the object prototype.

```smart header="The `\"prototype\"` property is only \"magical\" for constructors"
We can create a property named `"prototype"` in any object. But the special behavior only happens if it's assigned to a constructor function.

And even if we assign it to a constructor function, it does nothing until we call it with `new`. And only then it will be used to set the `[[Prototype]]` for a new object.
```

```warn header="The value of `\"prototype\"` should be either an object or null"
Technically, we can assign anything to `F.prototype`. That's a regular property by nature.

But the `new` operator will only use it for `[[Prototype]]` if it's an object or `null`. Any other value like a string or a number will be ignored.
```

## The "constructor" property

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




## Object.prototype

The `"prototype"` property is deep in the core of Javascript. All built-in objects use it to keep their methods.

We'll see how it works for plain objects first, and then for more complex ones.

Let's say we output an empty object:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

Where's the code that generates `"[object Object]"`? That's a built-in `toString` method, but where is it? The object is empty.

Of course, it's in the prototype. Let's check:

```js run
alert( {}.__proto__.toString ); // function toString()
```

The short notation `obj = {}` is the same as `obj = new Object()`, where `Object` -- is the built-in object constructor function. That value of its `"prototype"` property is a built-in object with `toString` and other functions:

![](object-prototype.png)

During the construction of `new Object()`, the `[[Prototype]]` of it is set to `Object.prototype`:

![](object-prototype-1.png)

For future calls of `obj.toString()` -- the function will be taken from `Object.prototype`.

There are several other methods in `Object.prototype`, for instance:

- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty) -- returns `true` if `obj` has its own (not inherited) property named `key`.
- [objA.isPrototypeOf(objB)](mdn:js/Object/isPrototypeOf) -- returns `true` if `objA` is a prototype of `objB`, taking into account the full prototype chain. In other words, it checks if `objB.__proto__.__proto__...__proto__ == objA`.

They are available for all objects by default.

For instance, we can use `for..in` loop to walk over all properties and `hasOwnProperty` -- to detect (and filter if needed) properties that are inherited:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let key in rabbit) {
*!*
  let isOwn = rabbit.hasOwnProperty(key);
*/!*
  alert(`${key} is own: ${isOwn}`); // "jumps is own: true", then: "eats is own: false"
}
```

Here we have a chain of prototypes: `rabbit`, then `animal`, then `Object.prototype`, the  implicit prototype of `animal`, and only `null` above it:

![](rabbit-animal-object.png)

Quite surprising, most object-related methods are not in `Object.prototype`, but on the `Object` constructor itself.

For instance:

- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- returns an array of all own string property names.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- returns an array of all own symbolic property names.
- [Object.keys(obj)](mdn:js/Object/keys) -- returns an array of enumerable own string property names. 
- ...and others.

Why language creators made this way? What's the point of making `Object.keys(obj)` instead of better-looking `obj.keys()`?

That's because it's possible to create objects not inheriting from `Object.prototype`. Such objects do not inherit prototype methods, but `Object.keys` will work for them just nice. We'll see examples very soon. 

Here we were talking about plain objects, but `Array`, `Date` and other native objects also keep their methods in `Array.prototype`, `Date.prototype` and so on respectively. We'll look  more deeply into the overall structure in the next chapter.

Meanwhile, let's continue with the history flow.

## ES5: Object.create

People wanted a more straightforward way to use prototypal inheritance, without constructor functions as well.

Some browsers implemented non-standard `__proto__` property, and specification also advanced a bit.

With the arrival of 5th edition of EcmaScript, a new method has appeared: 

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.

Now we could use a single-argument call of `Object.create` to create the inheriting object, and then fill it with properties:

```js run
// Historical code
let animal = {
  eats: true
};

*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true

// add other properties
rabbit.jumps = true;
```

Great, prototypal inheritance became possible without any constructor functions!

````smart header="`Object.create` to make a clone"
Nowadays, `Object.create` is sometimes used to perform a full object cloning:

```js 
// fully identical clone of obj
let clone = Object.create(obj, Object.getOwnPropertyDescriptors(obj));
```

This call makes a truly exact copy, including all properties: enumerable and non-enumerable, data properties and setters/getters -- everything, and with the right `[[Prototype]]`.
````
## Full access

In 2015, the new version of EcmaScript specification included two methods to get/set prototype:

- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- returns the prototype of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- sets the prototype of `obj` to `proto`.

Using `setPrototypeOf` was not recommended, because Javascript engines try their best to remember prototype chains and optimize access. For most practical tasks, prototype chains are stable: `rabbit` inherits from `animal`, and that's it, so this method is indeed rarely used. But it exists.

At the same time there was a quest to either ditch or standartize de-facto implemented by engines `__proto__` property. 

Usually things that are adopted by everyone make their way into the standard. But with `__proto__` there was a problem.

As we know, objects can be used as associative arrays, that is: to store key/value pairs. And if the key is a user-provided string, then he can type in `"__proto__"` as well.

Like in this example:

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], not "some value"!
```

Here the assignment is ignored, because `__proto__` must be either an object or `null`, a string can not become a prototype. That's already not good, because we expect it to happen. But in more complex cases the prototype may indeed be changed, so the execution may go wrong in totally unexpected ways.

What's worst -- usually developers do not think about such possibility at all. That makes such bugs hard to notice and may turn them into vulnerabilities.

Such thing happens only with `__proto__`. All other properties are safe.

So, what to do?

It was decided that `__proto__` should indeed be standartized, but as a 2nd class citizen, in Annex B of the standard, that is optional for non-browser environments. And in a way that allows to work around that problem.

The `__proto__`, by the latest specification, is not a property of an object, but an accessor property of `Object.prototype`:

![](object-prototype-2.png)

So, if `obj.__proto__` is read or assigned, the corresponding getter/setter is called from its prototype, and it gets/sets `[[Prototype]]`.

As it was said in the beginning: `__proto__` is a way to access `[[Prototype]]`, it is not `[[Prototype]]` itself.

Now, if we want to use an object as an assotiative array, we can do it with a little trick:

```js run
*!*
let obj = Object.create(null);
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

`Object.create(null)` creates an empty object without a prototype:

![](object-prototype-null.png)

So, there are no inherited getter/setter for `__proto__`. Now it is processed as a regular data property, so the example above works right.

Of course, such object lacks other built-in object methods, e.g. `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

...But that's usually ok for associative arrays. If needed, we can add a `toString` of our own.

Please note that most object methods are `Object.something`, like `Object.keys(obj)` -- they are not in the prototype, so they will keep working on such objects. 


## Summary [todo]

Here in the tutorial I use `__proto__` for shorter and more readable examples. Also all modern engines support it. But in the long run, `Object.getPrototypeOf/setPrototypeOf` is safer.




