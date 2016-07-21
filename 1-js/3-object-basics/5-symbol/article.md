
# Symbol type

A "symbol" represents an unique identifier with a given name.

A value of this type can be created using `Symbol(name)`:

```js
// id is a symbol with the name "id"
let id = Symbol("id");
```

Symbols in JavaScript are different from symbols in Ruby language (if you are familiar with it, please don't get trapped by the same word). Two symbols with the same name are not the same:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Symbols is a special primitive type used for identifiers, which are guaranteed to be unique. So, even if we create many symbols with the same name, they are still unique.

## "Private" properties

Symbols allow to create concealed, "private" properties of an object, that no other part of code can occasionally access or overwrite. 

For instance, if we want to store an "identifier" for the object `user`, we can create a symbol with the name `id` for it:

```js run
let user = { name: "John" };
let id = Symbol("id"); 

user[id] = "ID Value";
alert( user[id] ); // we can access the data using the symbol as the key
```

Now let's imagine that another script wants to have his own "id" property inside `user`, for his own purposes. That may be another javascript library, so the scripts are completely unaware for each other.

No problem. It can create its own `Symbol("id")`. There will be no conflict, because symbols are always different, even if they have the same name.

Please note that if we used a string `"id"` instead of a symbol for the same purpose, then there would be a conflict:

```js run
let user = { name: "John" };

// our script uses "id" property
user.id = "ID Value";

// ...if later another script the uses "id" for its purposes...

user.id = "ID 2"
// boom! overwritten! it did not mean to harm the colleague, but did it!
```

Two `Symbol("id")` are not equal, that's why they would allow to store values safely.

**If we want to use a symbol in an object literal, we need square brackets.**

Like this:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // not just "id: 123"
*/!*
};
```
That's because we use the value from the variable `id`, not the string "id".

**Symbolic properties do not participate in `for..in` loop.**

For instance:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for(let key in user) alert(key); // name, age (no symbols)
*/!*

// the direct access by the global symbol works
alert( "Direct: " + user[Symbol.for("id")] ); 
```

That's a part of the general "hiding" concept. So if another script or a library loops over our object, it won't unexpectedly access the symbol property.

In contrast, [Object.assign](mdn:js/Object/assign) copies both string and symbol properties:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

There's no paradox here. That's the expected behavior, because when we clone an object, we await symbol properties (like `id`) to be copied as well.


````smart header="Property identifier must be either a string or a symbol"
We can only use strings or symbols as keys in objects. Other types are coerced to strings.

For instance:

```js run
let obj = {
  0: "test" // same as "0": "test"
}

// bot alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```
````


## Global symbols

There is a global symbols registry that allows, if necessary, to create common global symbols and access them by their name.

To read a global symbol, we need to call a built-in method `Symbol.for(name)`. If there is no such symbol, it is created.

For instance:

```js run
// read from the global registry
let name = Symbol.for("name");

// read it again
let nameAgain = Symbol.for("name");

// the same symbol
alert( name === nameAgain ); // true
```

If we want an application-wide symbol, accessible everywhere in the code -- that's what the registry is for.

```smart
In some programming languages, like Ruby, the name identifies the symbol. In Javascript, as we can see, that's true for global symbols.
```

The `Symbol.for(name)` call, which returns a symbol by name, there exists the reverse call `Symbol.keyFor(sym)`. It returns the name by the global symbol.

For instance:

```js run
let sym = Symbol.for("name");

alert( Symbol.keyFor(sym) ); // name
```

````warn header="`Symbol.keyFor` returns `undefined` for non-global symbols"
The `Symbol.keyFor` method works only for global symbols. Otherwise it returns `undefined`, like here:

```js run
alert( Symbol.keyFor(Symbol.for("name")) ); // name, global symbol
alert( Symbol.keyFor(Symbol("name2")) ); // undefined, non-global symbol
```

In practice, that's fine, because the name of the symbol, if it's not global, is generally not used except for debugging purposes.
````

## System symbols

There exist many "system" symbols that Javascript uses internally, and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) table. For instance, `Symbol.toPrimitive` allows to describe object to primitive conversion. We'll see its use very soon. Other symbols will become more obvious as we'll study the corresponding language features.

## Summary

- Symbol is a primitive type for unique identifiers.
- Symbols are created with `Symbol(name)` call.
- Symbols are useful if we want to create a field that only those who know the symbol can access. 
- Symbols created with `Symbol(name)` are always different, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(name)` returns (creates if needed) a global symbol with the given name. Multiple calls return the same symbol.
- There are system symbols used by Javascript and accessible as `Symbol.*`. We can use them to alter some built-in behaviors.

Symbols don't appear in `for..in` loops. As we'll see further, there are other means to get object properties which also ignore symbols, so they remain hidden.

Technically though, there is still a way to discover all symbols of an object with a build-in method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols). So they are not completely hidden and private. But most scripts and built-in methods adhere to a common agreement that they are. And the one who explicitly calls a method with such a cumbersome name probably knows what he's doing.
