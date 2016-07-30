
# Map, Set, WeakMap and WeakSet

Now we know the following complex data structures:

- Objects for storing keyed collections.
- Arrays for storing ordered collections.

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

As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

**Map can also use objects as keys.**

For instance:
```js run
let john = { name: "John" };

// for every user, let's store his visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

Using objects as keys is one of most notable and important `Map` features. For string keys, `Object` can be fine, but it would be difficult to replace the `Map` with a regular `Object` in the example above.

In the old times, before `Map` existed, people added unique identifiers to objects for that:

```js run
// we add the id field
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

// now store the value by id
visitCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

...But `Map` is much more elegant.


```smart header="How `Map` compares keys"
To test values for equivalence, `Map` uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as the strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`. So `NaN` can be used as the key as well.

This algorithm can't be changed or customized.
```


````smart header="Chaining"

Every `map.set` call returns the map itself, so we can "chain" the calls:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## Map from Object

When a `Map` is created, we can pass an array (or another iterable) with key-value pairs, like this:

```js
// array of [key, value] pairs
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

Note that this is exactly the format of [Object.entries](mdn:js/Object/entries), so we can initialize a map from an object:

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

Here, `Object.entries` returns the array of key/value pairs: `[ ["name","John"], ["age", 30] ]`. That's what `Map` needs. 

## Iteration over Map

For looping over a `map`, there are 3 methods:

- `map.keys()` -- returns an iterable for keys,
- `map.values()` -- returns an iterable for values,
- `map.entries()` -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.

For instance:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for(let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomateos, onion
}

// iterate over values (amounts)
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

- `new Set(iterable)` -- creates the set, optionally from an array of values (any iterable will do). 
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

The alternative to `Set` could be an array of users, and the code to check for duplicates on every insertion using [arr.find](mdn:js/Array/find). But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.

## Iteration over Set

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

The same methods as `Map` has for iterators are also supported:

- `set.keys()` -- returns an iterable object for values,
- `set.values()` -- same as `set.keys`, for compatibility with `Map`,
- `set.entries()` -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.

## WeakMap and WeakSet

`WeakSet` is a special kind of `Set` that does not prevent JavaScript from memory cleaning. `WeakMap` is the same thing for `Map`.

That is: usually the JavaScript engine stores a value in memory while it can potentially be accessed/used.

For instance:
```js
let john = { name: "John" };

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

// the object will be removed from memory 
```

We'll go into more details later, but the example here is somewhat obvious, right? If nothing references the object, it can be safely removed.

Usually, if an object is in a set or an array or another data structure, and the data structure is in memory, then the object remains in memory too. With the exception of `WeakMap/WeakSet`.

**`WeakMap/WeakSet` does not prevent the object removal from the memory.**

For instance, let's start with `WeakMap`. The first difference from `Map` is that its keys can only be objects, not primitive values:


```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

*!*
weakMap.set("test", "wops"); // Error, because "test" is a primitive
*/!*
```

So it stores data for objects. And the data only exists while the object exists. That's handy for situations when we have a main storage for the objects somewhere and need to keep additional information that is only relevant while the object lives.

Let's see an example. 

For instance, we have a code that keeps a visit count for each user. The information is stored in a map: a user is the key and the visit count is the value. When a user leaves, we don't want to store his visit count any more.

One way would be to keep track of leaving users and clean up the storage manually:

```js run
let john = { name: "John" };

// map: user => visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

// now john leaves us, we don't need him any more
john = null;

*!*
// but it's still in the map, we need to clean it!
*/!*
alert( visitsCountMap.size ); // 1
// it's also in the memory, because Map uses it as the key
```

Another way would be to use `WeakMap`:

```js 
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

// now john leaves us, we don't need him any more
john = null;

// there are no references except WeakMap, 
// so the object is removed both from the memory and from visitsCountMap automatically
```

With a regular `Map`, the user deletion becomes a tedious task: we not only need to remove the user from it's main storage (be it a variable or an array), but also need to clean up the additional stores like `visitsCountMap`. And it can become cumbersome in more complex cases when users are managed in one place of the code and the additional structure is at another place and is getting no information about removals. 

`WeakMap` can make things simpler, because it is cleaned up automatically.

`WeakMap` has only the following methods:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key, value)`
- `weakMap.has(key)`

Please note `WeakMap` does not support methods `clear()` and has no `size` property. Also we can not iterate over it.

That's for technical reasons. If the object is to be removed (like `john` in the code above), then it `WeakMap` will be cleaned up automatically. But technically it's not exactly specified *when the cleanup happens*.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically the current element count of the `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason,  the methods that access the `WeakMap` as a whole are not supported.

The same refers to `WeakSet`.

- It keeps a set of objects, an object exists while it is referenced from anywhere else.
- Like `Set`, it supports `add`, `has` and `delete`, but not `size` and no iterations.

The limitations may appear inconvenient, but they actually do not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.

## Summary

- `Map` -- is a a collection of keyed values.

    The differences from a regular `Object`:

    - Any keys, objects can be keys.
    - Iterates in the insertion order.
    - Additional convenient methods, the `size` property.

- `Set` -- is a collection of unique values.

    - Unlike an array, does not allow to reorder elements.
    - Keeps the insertion order.

- `WeakMap` -- a variant of `Map` that allows only objects as keys and removes them once they become unaccessible by other means. 

    - It does not support operations on the structure as a whole: no `size`, no `clear()`, no iterations.

- `WeakSet` -- is a variant of `Set` that only stores objects and removes them once they become unaccessible by other means.

    - Also does not support `size/clear()` and iterations.

`WeakMap` and `WeakSet` are used as "secondary" data structures in additional to the "main" object storage. Once the object is removed from the main storage, so it only stays in `WeakMap/WeakSet`, they clean up aumatically.

