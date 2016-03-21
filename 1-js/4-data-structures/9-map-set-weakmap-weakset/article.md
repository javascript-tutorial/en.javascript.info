
# Map, Set, WeakMap and WeakSet

Now we have the following data structures:

- Objects for storing keyed collections
- Arrays for storing ordered collections

But that's not enough for real life. That's why there also exist `Map` and `Set`.

## Map

[Map](mdn:js/Map) is a collection of keyed data items. Just like an `Object`. But the main difference is that `Map` allows keys of any type.

The main methods are:

- `new Map()` -- creates the map.
- `map.set(key, value)` -- stores the value by the key.
- `map.get(key)` -- returns the value by the key.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` -- removes the value by the key.
- `map.clear()` -- clears the map
- `map.size` -- is the current elements count.

For instance:

```js run
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would keys to string
// Map keeps the type, so these two are different:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

Every `map.set` call returns the map itself, so we can "chain" the calls:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```

When a `Map` is created, we can pass an array (or another iterable object) with key-value pairs, like this:

```js
// array of [key, value] pairs
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

**Map can use objects as keys.**

That can be really helpful.

For instance:
```js run
let john = { name: "John" };

// for every user, let's store his visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Using objects as keys is one of most notable and important `Map` features. It's difficult to replace the `Map` with a regular `Object` here.


```smart header="How `Map` compares keys"
To test values for equivalence, `Map` uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as the strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`. So `NaN` can be used as the key as well.

This algorithm can't be changed to our own.
```

````smart header="Using an `Object` instead"
In some cases objects have a special "unique identifier" property. Or we can create it for them. That allows to use an object:

```js run
// note the id field
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

visitCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

That was the main way to go in the past when maps did not exist in the language. But now we have maps. They are more versatile. And they do not require such identifiers to exist.
````


````smart header="`Map` allows *any* keys"
The important syntax diference from objects is that `Map` values are inserted/removed via methods. 

```js
// object vs map syntax
obj[key] = value;
map.set(key, value);
```

There's a reason for that. In objects, there is a built-in property named `__proto__`. We'll see the details about it later. Here the important thing is that it should not be overwritten. If it is set to a primitive then the write operation is ignored, so we can say that JavaScript protects it to a certain extent.

But if key/value pairs come from the user (like a user naming himself `__proto__`), then we can meet unexpected problems with it. That's actually an endless source of bugs in many well-known JavaScript libraries. `Map`, from the other hand, is totally safe. 
````


### Iteration

For looping over `map`, there are 3 methods:

- `map.keys()` -- returns an iterable object for keys,
- `map.values()` -- returns an iterable object for values,
- `map.entries()` -- returns an iterable object for entries `[key, value]`, it's used by default in `for..of`.

For instance:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over vegetables 
for(let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomateos, onion
}

// iterate over amounts
for(let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for(let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,50 (and so on)
}
```

```smart header="The insertion order is used"
The iteration goes in the same order as the values were inserted. `Map` guarantees that unlike a regular `Object`.
```

Besides that, `Map` has a built-in `forEach` method, similar to `Array`:

```js
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 50 etc
});
```


## Set

`Set` -- is a collection of values, where each value may occur.

The main methods are:

- `new Set([values])` -- creates the set, optionally with an array of values (any iterable will do). 
- `set.add(value)` -- adds a value, returns the set itself.
- `set.delete(value)` -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` -- returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` -- removes everything from the set.
- `set.size` -- is the elements count.

For example, we have visitors coming, and we'd like to remember everyone. But repeated visits should not lead to duplicates. A visitor must be "counted" only once.

`Set` is just the right thing for that:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert( set.size ); // 3

for(let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

The alternative to `Set` could be an array of users. We can check for duplicates on every insertion using [arr.find](mdn:js/Array/find). 

But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.

### Iteration

We can loop over a set either with `for..of` or using `forEach`:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for(let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value); 
});
```

Note the funny thing. The `forEach` function in the `Set` has 3 arguments: a value, then *again a value*, and then the target object. Indeed, the same value appears in the arguments twice.

That's made for compatibility with `Map` where `forEach` has three arguments.

## WeakMap and WeakSet

`WeakSet` -- is a special kind of `Set` that does not prevent JavaScript from memory cleaning. `WeakMap` -- is the same thing for `Map`.

That is: usually the JavaScript engine stores something in memory while it can potentially be accessed/used.

For instance:
```js
// created an object
let john = { name: "John" };

// it will be removed from memory now:
john = null;
```

We'll go into more details later, but the gist is somewhat obvious, right? If nothing references the object, it can be safely removed.

**If an object only exists in `WeakMap/WeakSet`, then it is removed from the memory.**

That's handy for situations when we have a main storage for the objects somewhere and need to keep additional data for them that only exists while the object exists.

For instance, we have users and want to keep a visit count for them. But the visit count is only relevant while the user exists.

So we can put it into a `WeakMap`:

```js run
let john = { name: "John" };

// user => visits count
let visitsCountMap = new WeakMap();

// john is the key for the map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123

// now john leaves us, we don't need him any more
john = null;

*!*
alert( visitsCountMap.get(john) ); // undefined
*/!*
```

Do you see the difference versus a regular `Map`? If `visitorCountMap` were a `new Map()`, then `john` would remain in it. If users keep coming and leaving, then there would be more and more values flooding the map. 

So, with a regular `Map`, the user deletion becomes a more tedious task: we also need to clean up the additional stores. And it can be a cumbersome task in the more complex case when users are managed in one place of the code and the additional structure is at another place and is getting no information about removals. `WeakMap` comes to the rescue.

`WeakMap` uses only objects as keys. It has the following methods:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key, value)`
- `weakMap.has(key)`

`WeakMap` does not support methods `clear()` and has no `size` property. Also we can not iterate over it.

That's for technical reasons. Once a key is no longer referenced from anywhere, it is removed from the `WeakMap` and from the memory. But technically it's not exactly specified *when the removal happens*.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or wait and do the cleaning later when more deletions happen. So, technically the current element count of the `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason,  the methods that access the `WeakMap` as a whole are not supported.

The same refers to `WeakSet`.

- It keeps a set of objects, an object exists while it is referenced from anywhere else.
- It only supports `add`, `has` and `delete`, no support for `size` and no iterations.

The limitations may appear inconvenient, but they actually do not prevent `WeakMap/WeakSet` from doing the main task -- be an "additional" storage of data for objects which are stored/managed at another place.

## Summary

- `Map` -- is a a collection of keyed values.

    The differences from a regular `Object`:

    - Any keys, objects can be keys.
    - Iterates in the insertion order.
    - Additional convenient methods for iterating and cleaning, the `size` property.

- `Set` -- is a collection of unique values.

    - Unlike an array, does not allow to reorder elements. Keeps the insertion order.

- `WeakMap` -- a variant of `Map` that allows only objects as keys and removes them once they become unaccessible by other means. 

    - It does not support operations on the structure as a whole: no `size`, no `clear()`, no iterations.

- `WeakSet` -- is a variant of `Set` that only stores objects and removes them once they become unaccessible by other means.

`WeakMap` and `WeakSet` are used as "secondary" data structures in additional to the "main" object storage. Once the object is removed from the main storage, they clean up aumatically.

