# Object.prototype and methods

The `"prototype"` property is widely used by the core of Javascript itself. All built-in constructor functions use it.

We'll see how it is for plain objects first, and then for more complex ones.

Let's say we output an empty object:

```js run
let obj = {};
alert( obj ); // "[object Object]" ?
```

Where's the code that generates the string `"[object Object]"`? That's a built-in `toString` method, but where is it? The `obj` is empty!

...But the short notation `obj = {}` is the same as `obj = new Object()`, where `Object` -- is a built-in object constructor function. And that function has `Object.prototype` that references a huge object with `toString` and other functions.

Like this (all that is built-in):

![](object-prototype.png)

When `new Object()` is called (or a literal object `{...}` is created), the `[[Prototype]]` of it is set to `Object.prototype` by the rule that we've discussed in the previous chapter:

![](object-prototype-1.png)

Afterwards when `obj.toString()` is called -- the method is taken from `Object.prototype`.

We can check it like this:

```js run
let obj = {};

alert(obj.__proto__ === Object.prototype); // true
// obj.toString === obj.__proto__toString == Object.prototype.toString
```

Please note that there is no additional `[[Prototype]]` in the chain above `Object.prototype`:

```js run
alert(Object.prototype.__proto__); // null
```

## Getting all properties

There are many ways to get keys/values from an object:

- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- returns an array of all own string property names.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- returns an array of all own symbolic property names.
- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of enumerable own string property names/values/key-value pairs.

All of them operate on the object itself. But `for..in` loop is different: it also gives inherited properties.

For instance:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// only own keys
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// inherited keys too
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

If we want to differ inherited properties, there's a built-in method [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.

So we can filter out inherited properties (or do something else with them):

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);
  alert(`${prop}: ${isOwn}`); // jumps:true, then eats:false
}
```
Here we have the following inheritance chain: `rabbit`, then `animal`, then `Object.prototype` (because `animal` is a literal object `{...}`, so it's by default), and then `null` above it:

![](rabbit-animal-object.png)

So when `rabbit.hasOwnProperty` is called, the method `hasOwnProperty` is taken from `Object.prototype`. Why `hasOwnProperty` itself does not appear in `for..in` loop? The answer is simple: it's not enumerable just like all other properties of `Object.prototype`.

As a take-away, let's remember that if we want inherited properties -- we should use `for..in`, and otherwise we can use other iteration methods or add the `hasOwnProperty` check.

## Prototype setters and getters

There are also other ways to get/set a prototype, besides those that we already know:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.


For instance:

```js run
let animal = {
  eats: true
};

*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true
alert(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // reset the prototype of rabbit to {}
```


````smart header="`Object.create` to make a clone"
`Object.create` can be used to perform a full object cloning:

```js
// fully identical shallow clone of obj
let clone = Object.create(obj, Object.getOwnPropertyDescriptors(obj));
```

This call makes a truly exact copy of `obj`, including all properties: enumerable and non-enumerable, data properties and setters/getters -- everything, and with the right `[[Prototype]]`. But not an in-depth copy of course.
````


If we count all the ways to manage `[[Prototype]]`, there's a lot! Many ways to do the same!

Why so?

That's for historical reasons.

- The `"prototype"` property of a constructor function works since very ancient times.
- Later in the year 2012: `Object.create` appeared in the standard. It allowed to create objects with the given prototype, but that was all. So browsers implemented a more powerful, but non-standard `__proto__` accessor that allowed to get/set a prototype at any time.
- Later in the year 2015: `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, and also `__proto__` became a part of the Annex B of the standard (optional for non-browser environments), because almost all browsers implemented it.

And now we have all these ways at our disposal.

But please note: for most practical tasks, prototype chains are fixed: `rabbit` inherits from `animal`, and that is not going to change. And Javascript engines are highly optimized to that. Changing a prototype "on-the-fly" with `Object.setPrototypeOf` or `obj.__proto__=` is a very slow operation. But it is possible.

## "Very plain" objects

As we know, objects can be used as associative arrays to store key/value pairs.

...But if we try to use it for *any* keys (user-provided for instance), we can see an interesting glitch.

Check out the example:

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // [object Object], not "some value"!
```

Here if the user types in `__proto__`, the assignment is ignored! That's because `__proto__` must be either an object or `null`, a string can not become a prototype.

We did not intend to implement such behavior, right? So that's a bug. Here the consequences are not terrible. But in more complex cases the prototype may indeed be changed, so the execution may go wrong in totally unexpected ways.

What's worst -- usually developers do not think about such possibility at all. That makes such bugs hard to notice and even turn them into vulnerabilities, especially when Javascript is used on server-side.

Such thing happens only with `__proto__`. All other properties are "assignable" normally.

So, what's going and and how to evade the problem?

First, we can just switch to using `Map`, then everything's fine.

But `Object` also can serve us well here, because language creators gave a thought to that problem long ago.

The `__proto__` is not a property of an object, but an accessor property of `Object.prototype`:

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

`Object.create(null)` creates an empty object without a prototype (`[[Prototype]]` is `null`):

![](object-prototype-null.png)

So, there is no inherited getter/setter for `__proto__`. Now it is processed as a regular data property, so the example above works right.

We can call such object "very plain" or "pure dictionary objects", because they are even simpler than regular plain object `{...}`.

A downside is that such objects lack any built-in object methods, e.g. `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

...But that's usually fine for associative arrays. If needed, we can add a `toString` of our own.

Please note that most object-related methods are `Object.something(...)`, like `Object.keys(obj)` -- they are not in the prototype, so they will keep working on such objects:


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "ni hao";
chineseDictionary.bye = "zai jian";

alert(Object.keys(chineseDictionary)); // hello,bye
```


## Summary

The `"prototype"` property of constructor functions is essential for Javascript built-in methods.

In this chapter we saw how it works for objects:

-

In the next chapter we'll see the bigger picture: how other built-ins rely on it to inherit from each other.
