
# Object.keys, values, entries

Let's step away from the individual data structures and talk about the iterations over them. 

In the previous chapter we saw methods `map.keys()`, `map.values()`, `map.entries()`.

These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too. 

They are supported for:

- `Map`
- `Set`
- `Array` (except `arr.values()`)

Plain objects also support similar methods, but the syntax is a bit different.

## Object.keys, values, entries

For plain objects, the following methods are available:

- [Object.keys(obj)](mdn:js/Object/keys) -- returns an array of keys.
- [Object.values(obj)](mdn:js/Object/values) -- returns an array of values.
- [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of `[key, value]` pairs.

...But please note the distinctions (compared to map for example):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Call syntax | `map.keys()`  | `Object.keys(obj)`, but not `obj.keys()` |
| Returns     | iterable    | "real" Array                     |

The first difference is that we have to call `Object.keys(obj)`, and not `obj.keys()`.

Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in JavaScript. So we may have an object of our own like `order` that implements its own `order.values()` method. And we still can call `Object.values(order)` on it.

The second difference is that `Object.*` methods return "real" array objects, not just an iterable. That's mainly for historical reasons.

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

Here's an example of using `Object.values` to loop over property values:

```js run
let user = {
  name: "John",
  age: 30
};

// loop over values
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

## Object.keys/values/entries ignore symbolic properties

Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, the method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) returns *all* keys.
