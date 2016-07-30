
# Advanced loops

Now as we know arrays, iterables and destructuring, we're ready to cover more forms of loops.

## Over objects

We've already seen one of the most popular loops: `for..in`

```js
for(let key in obj) {
  // key iterates over object keys
}
```

But there are also ways to get keys, values or or key/value pairs as arrays:

- [Object.keys(obj)](mdn:js/Object/keys) -- returns the array of keys.
- [Object.values(obj)](mdn:js/Object/values) -- returns the array of values.
- [Object.entries(obj)](mdn:js/Object/entries) -- returns the array of `[key, value]` pairs.

For instance:

```js 
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = [name, age]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`


We can use `Object.values` to iterate over object values:

```js
for(let value of Object.values(obj)) {
  // value iterates over object values
}
```

Here `Object.values(obj)` returns the array of properties, and `for..of` iterates over the array.

Also we can combine destructuring with `Object.entries` to iterate over key/value pairs:

```js
for(let [key, value] of Object.entries(obj)) {
  // key,value iterate over properties
}
```

The example of all 3 loops:

```js run
let user = { 
  name: "John", 
  age: 30 
};

// over keys
for(let key in user) {
  alert(key); // name, then age
  // can get the values with user[key]
}

// over values
for(let value of Object.values(user)) {
  alert(value); // John, then 30
}

// over key/value pairs
for(let [key, value] of Object.entries(user)) {
  alert(key + ':' + value); // name:John, then age:30
}
```


```smart header="The loops ignore symbolic properties"
All 3 forms of loops (and the given `Object` methods) ignore properties that use `Symbol(...)` as keys. 

That's an expected behavior, because symbols are often created to make sure that the property can not be accessed accidentaly. There is a separate method named [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys (if we really know what we're doing). Also, the method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) returns all keys.
```

## Over arrays

There are many data structures that keep keys and/or values. `Object` is one of them, `Array` is the other one, and we'll see more in the future.

The method names `keys()`, `values()` and `entries()` are generic, there is a common agreement to use them for common iterations.

For arrays:

- [arr.keys()](mdn:js/Array/keys) -- returns the iterable for keys (indexes).
- [arr.entries()](mdn:js/Array/entries) -- returns the iterable for `[index, value]` pairs.

There is no `arr.values()`, because `for..of` iterates over values already.

Note that for arrays and further data structures the methods are callable directly, and they return iterables, not arrays.

The loops:

```js run
let users = ["John", "Pete", "Ann"];

// over keys (indexes)
for(let key of users.keys()) {
  alert(key); // 0, 1, 2
}

// over values, basic for..of (no special method)
for(let value of users) {
  alert(value); // John, then 30
}

// over key/value pairs
for(let [key, value] of users.entries()) {
  alert(key + ':' + value); // 0:John, then 1:Pete, 2:Ann
}
```

````smart header="No holes"
All these methods treat arrays as contiguous. "Holes" are considered `undefined` items.

```js run
let arr = [];
arr[4] = "test";

*!*
// all keys till arr.length
*/!*
for(let i of arr.keys()) alert(i); // 0,1,2,3,4
alert(`Length: ${arr.length}`); // 5, remember, length is the last index + 1
```

````

## Over Sets, Maps...

As we've seen in the chapter <info:map-set-weakmap-weakset>, `Map` and `Set` also implement methods `keys()`, `values()` and `entries()`.

So we can iterate over them the same way.

For instance, key/value iteration over a map:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

for(let [key, value] of recipeMap) { // the same as of recipeMap.entries()
  alert(key); // cucumber
  alert(value); // 500
  // .. and so on
}
```

## Summary [todo]

keys/values/entries are generic for collections