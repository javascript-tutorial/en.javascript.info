
# Iterables

*Iterable* objects is a general concept that allows to make any object useable in a `for..of` loop.

Many built-ins are partial cases of this concept. For instance, arrays are iterable. But not only arrays. Strings are iterable too. 

Iterables come from the very core of Javascript and are widely used both in built-in methods and those provided by the environment. 

[cut]

## Symbol.iterator

We can easily grasp the concept of iterables by making one of our own.

For instance, we have an object, that is not an array, but looks a suitable for `for..of`.

Like a `range` object that represents an interval of numbers:

```js
let range = {
  from: 1,
  to: 5
};

// We want for..of to work:
// for(let num of range) ... num=1,2,3,4,5
```

To make the `range` iterable (and thus let `for..of` work) we need to add a method to the object named `Symbol.iterator` (a special built-in symbol just for that).

- When `for..of` starts, it calls that method (or errors if none found). 
- The method must return an *iterator* -- an object with the method `next`.
- When `for..of` wants the next value, it calls `next()` on that object.
- The result of `next()` must have the form `{done: Boolean, value: any}`: `done:true` means that the iteration is finished, otherwise `value` must be the new value.

Here's the full impelementation for `range`:

```js run
let range = {
  from: 1,
  to: 5
}

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

  // 2. ...it returns the iterator:
  return {
    current: this.from, // remember "from" and "to" of the range
    last: this.to,      // in object properties

    // 3. next() is called on each iteration of the loop
    next() {
      if (this.current <= this.last) {
        // 4. iterator returns the value as an object {done:.., value :...}
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

There is an important separation of concerns in this code.

- The `range` itself does not have the `next()` method.
- Instead, another object, a so-called "iterator" is created by the call to `range[Symbol.iterator]()`.
- It keeps the iteration state in its `current` property. That's good, because the original object is not modified by iterations. Also multiple `for..of` loops over the same object can run simultaneously, because they create separate iterators. 

The fact that the object itself does not do the iteration also adds flexibility, because `range[Symbol.iterator]` can create iterators the smart way, depending on other object properties or external conditions. It's a full-fledged function that may be more complex than just a `return {...}`.

Please note that the internal mechanics is not seen from outside. Here `for..of` calls `range[Symbol.iterator]()` and then the `next()` until `done: false`, but the external code doesn't see that. It only gets values.

```smart header="Infinite iterators"
Infinite iterators are also doable. For instance, the `range` becomes infinite for `range.to = Infinity`. Or we can make an iterable object that generates an infinite sequence of pseudorandom numbers. Also can be useful.

There are no limitations on `next`, it can return more and more values, that's normal.

Of course, the `for..of` loop over such an iterable would be endless, we'll need to stop if, for instance, using `break`.
```

````smart header="`Symbol.iterator` in a literal"
We could also write `Symbol.iterator` directly in the object literal, via computed properties syntax:

```js
let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {...};
  }
};
```
````

## Built-in iterables

Arrays and strings are most widely used built-in iterables.

For a string, `for..of` loops over its characters:

```js run
for(let char of "test") {
  alert( char ); t, then e, then s, then t
}
```

Iterators can also be created explicitly, without `for..of`, with a direct call of `Symbol.iterator`. For built-in objects too.

For instance, this code gets a string iterator and calls it "manually":

```js run
let str = "Hello";

// does the same as
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while(true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // outputs characters one by one
}
```

The same works for an array.

## Iterables VS array-likes

There are two official terms that are similar, but actually very different. Please take care to avoid the confusion.

- Iterables are objects that implement the `Symbol.iterator` method, as described above.
- Array-likes are objects that have indexes and `length`, so they look like arrays. 

Sometimes they can both be applied. For instance, strings are both iterable and array-like.

But an iterable may be not array-like and vise versa.

For example, the `range` in the example above is iterable, but not array-like, because it does not have indexed properties and `length`.

And here's the object that is array-like, but not iterable:

```js run
let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (not Symbol.iterator)
for(let item of arrayLike) {}
*/!*
```

But what they share in common -- both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we received such object and want to work with it as with an array.

There's a universal method [Array.from](mdn:js/Array/from) that brings them together. It takes an iterable *or* an array-like value and makes a "real" `Array` from it. Then we can call array methods on it.

For instance:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike);
alert(arr.pop()); // World (method works)
```

```js
// assuming that range is taken from the example above
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 
```

The full syntax for `Array.from` allows to provide an optional "mapping" function:
```js
Array.from(obj[, mapFn, thisArg])
```

The second argument `mapFn` should be the function to apply to each element before adding to the array, and `thisArg` allows to set `this` for it.

For instance:

```js
// assuming that range is taken from the example above

// square each number
let arr = Array.from(range, num => num * num); 

alert(arr); // 1,4,9,16,25 
```


## Summary

Objects that can be used in `for..of` are called *iterable*.

- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]` is called an *iterator*. It handles the further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the iteration end, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.

The modern specification mostly uses iterables instead of arrays where an ordered collection is required, because they are more abstract. We'll see more examples of it very soon.

Objects that have indexed properties and `length` are called *array-like*. Such objects may also have other properties and methods, but lack built-in methods of arrays.

`Array.from(obj[, mapFn, thisArg])` makes a real `Array` of an iterable or array-like `obj`, and then we can use array methods on it. The optional arguments `mapFn` and `thisArg` allow to apply a function to each item.


