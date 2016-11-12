
# Object.keys, values, entries

In the previous chapter we saw methods `map.keys()`, `map.values()`, `map.entries()`.

These methods are generic, there is a common agreement to use them for data structures.

They are supported for:

- `Map`
- `Set`
- `Array` (without `arr.values()`, because that would be repeating itself)

If we ever create a data structure of our own, we should implement them too.

## Object.keys, values, entries

For plain objects, situation is a little bit different.

There are similar methods:

- [Object.keys(obj)](mdn:js/Object/keys) -- returns an array of keys.
- [Object.values(obj)](mdn:js/Object/values) -- returns an array of values.
- [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of `[key, value]` pairs.

...But please note the distinctions (compared to map for example):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Call syntax | `map.keys()`  | `Object.keys(obj)`, but not `obj.keys()` |
| Returns     | iterable    | "real" Array                     |

1. The reason for call syntax `Object.keys(obj)` is flexibility. We can have an object of our own like `order` that implements its own `order.values()` method. And we still can call `Object.values(order)` on it.
2. ...And the returned value is not just an iterable, but an Array for historical reasons.

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

We can also `Object.values` for a loop over property values:

```js run
let user = {
  name: "John",
  age: 30
};

// loop over values
for(let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

```smart header="`Object.keys/values/entries` ignore symbolic properties"
Just like `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. There is a separate method named [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys (if we really know what we're doing). Also, the method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) returns *all* keys.
```
