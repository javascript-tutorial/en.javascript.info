
# Symbol type

By specification, object property keys may be either of string type, or of symbol type. Not numbers, not booleans, only strings or symbols, these two types.

Till now we only saw strings. Now let's see the advantages that symbols can give us.

[cut]

## Symbols

"Symbol" value represents an unique identifier with a given name. 

A value of this type can be created using `Symbol(name)`:

```js
// id is a symbol with the name "id"
let id = Symbol("id");
```

Symbols are guaranteed to be unique. Even if we create many symbols with the same name, they are different values.

For instance, here are two symbols with the same name -- they are not equal:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

If you are familiar with Ruby or another language that uses the "symbol" concept -- please don't be misguided. Javascript symbols are pretty different. 


## "Private" properties

Symbols allow to create concealed, "private" properties of an object, that no other part of code can occasionally access or overwrite. 

For instance, if we want to store an "identifier" for the object `user`, we can create a symbol with the name `id` for it:

```js run
let user = { name: "John" };
let id = Symbol("id"); 

user[id] = "ID Value";
alert( user[id] ); // we can access the data using the symbol as the key
```

Now let's imagine that another script wants to have his own "id" property inside `user`, for his own purposes. That may be another Javascript library, so the scripts are completely unaware for each other.

No problem. It can create its own `Symbol("id")`. 

Their script:

```js 
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

There will be no conflict, because symbols are always different, even if they have the same name.

Please note that if we used a string `"id"` instead of a symbol for the same purpose, then there *would* be a conflict:

```js run
let user = { name: "John" };

// our script uses "id" property
user.id = "ID Value";

// ...if later another script the uses "id" for its purposes...

user.id = "Their id value"
// boom! overwritten! it did not mean to harm the colleague, but did it!
```

### Symbols in literal

If we want to use a symbol in an object literal, we need square brackets.

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

### Symbols are not in loop

Symbolic properties do not participate in `for..in` loop.

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

That's a part of the general "hiding" concept. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.

In contrast, [Object.assign](mdn:js/Object/assign) copies both string and symbol properties:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

There's no paradox here. That's the expected behavior, because when we clone an object, we expect symbolic properties (like `id`) to be copied as well.


````smart header="Property keys of other types are coerced to strings"
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

Normally, all symbols are different. But sometimes we want same-named symbols to be the same.

For instance, different parts of our application want to use `Symbol("id")` meaning the exactly the same property.

To achieve that, there's a *global symbol registry*. That's a place where we can create symbols and access them later, and it is guaranteed that repeating access by the same name returns the same symbol.

To can create or read a symbol, use `Symbol.for(name)`.

For instance:

```js run
// read from the global registry
let name = Symbol.for("name"); // if the symbol did not exist, it is created

// read it again
let nameAgain = Symbol.for("name");

// the same symbol
alert( name === nameAgain ); // true
```

If we want an application-wide symbol, accessible everywhere in the code -- that's what the registry is for.

```smart header="That sounds like Ruby"
In some programming languages, like Ruby, there's a single symbol per name. 

In Javascript, as we can see, it's correct for global symbols.
```

### Symbol.keyFor

For global symbols, not only `Symbol.for(name)` returns a symbol by name, but there's a reverse call: `Symbol.keyFor(sym)`, that returns a name for a global symbol.

For instance:

```js run
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name from symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

The `Symbol.keyFor` internally uses the global symbol registry, to look up the name for the symbol.

So it doesn't work for non-global symbols. If the symbol is not global, it returns `undefined.

For instance:

```js run
alert( Symbol.keyFor(Symbol.for("name")) ); // name, global symbol

alert( Symbol.keyFor(Symbol("name2")) ); // undefined, non-global symbol
```

For non-global symbols, the name is only used for debugging purposes.

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

Technically though, there is still a way to discover all symbols of an object with a build-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols). Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns all keys of an object, including symbolic ones. So they are not completely hidden and private. 

But most libraries, built-in methods and syntax constructs adhere to a common agreement that they are. And the one who explicitly calls the aforementioned methods probably understands well what he's doing.