
# Object to primitive conversion

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions.

But we left a gap for objects. Now let's close it.

[cut]

For objects, there's a special additional conversion called [ToPrimitive](https://tc39.github.io/ecma262/#sec-toprimitive).

For some built-in objects it is implemented in special way, but mostly comes in two flavors:

- `ToPrimitive(obj, "string")` for a conversion to string
- `ToPrimitive(obj, "number")` for a conversion to number

So, if we convert an object to string, then first `ToPrimitive(obj, "string")` is applied, and then the resulting primitive is converted using primitive rules. The similar thing for a numeric conversion.

What's most interesting in `ToPrimitive` is its customizability.

## toString and valueOf

`ToPrimitive` is customizable via methods `toString()` and `valueOf()`.

The general algorithm of `ToPrimitive(obj, "string")` is:


1. Call the method `obj.toString()` if it exists.
2. If the result is a primitive, return it.
3. Call the method `obj.valueOf()` if it exists.
4. If the result is a primitive, return it.
5. Otherwise `TypeError` (conversion failed)


The `ToPrimitive(obj, "number")` is the same, but `valueOf()` and `toString()` are swapped:

1. Call the method `obj.valueOf()` if it exists.
2. If the result is a primitive, return it.
3. Call the method `obj.toString()` if it exists.
4. If the result is a primitive, return it.
5. Otherwise `TypeError` (conversion failed)

```smart header="ToPrimitive returns a primitive, but its type is not guaranteed"
As we can see, the result of `ToPrimitive` is always a primitive, because even if `toString/valueOf` return a non-primitive value, it is ignored.

But it can be any primitive. There's no control whether `toString()` returns exactly a string or, say a boolean.
```

Let's see an example. Here we implement our own string conversion for `user`:

```js run
let user = {

  name: 'John',

*!*
  toString() {
    return `User ${this.firstName}`;
  }
*/!*

};

*!*
alert( user );  // User John
*/!*
```

Looks much better than the default `[object Object]`, right?


Now let's add a custom numeric conversion with `valueOf`:

```js run
let user = {

  name: 'John',
  age: 30,

*!*
  valueOf() {
    return this.age;
  }
*/!*

};

*!*
alert( +user );  // 30
*/!*
```

In most projects though, only `toString()` is used, because objects are printed out (especially for debugging) much more often than added/substracted/etc.

If only `toString()` is implemented, then both string and numeric conversions use it.

## Array example

Let's see few more examples with arrays to get the better picture.

```js run
alert( [] + 1 ); // '1'
alert( [1] + 1 ); // '11'
alert( [1,2] + 1 ); // '1,21'
```

The array from the left side of `+` is first converted to primitive using `toPrimitive(obj, "number")`.

For arrays (and most other built-in objects) only `toString` is implemented, and it returns a list of items.

So we'll have the following results of conversion:

```js 
alert( '' + 1 ); // '1'
alert( '1' + 1 ); // '11'
alert( '1,2' + 1 ); // '1,21'
```

Now the addition has the first operand -- a string, so it converts the second one to a string also. Hence the result.

## Object, toString for the type

With plain objects it's much more interesting.

An object has both `valueOf()` and `toString()`, but for plain objects `valueOf()` returns the object itself:

```js run
let obj = { };

alert( obj === obj.valueOf() ); // true, valueOf returns the object itself  
```

Because `ToPrimitive` ignores `valueOf` if it returns an object, here we can assume that `valueOf` does not exist at all.

Now `toString`. 

From the first sight it's obvious:

```js run
let obj = { };

alert( obj ); // [object Object]
```

But it's much more powerful than that. 

By [specification](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), `toString` can work in the context of any value. And it returns `[object ...]` with the type of an object instead of dots.

The algorithm of the `toString()` for plain objects looks like this:

- If `this` value is `undefined`, return `[object Undefined]`
- If `this` value is `null`, return `[object Null]`
- ...For arrays return `[object Array]`, for dates return `[object Date]` etc.


It even works for environment-specific objects that exist only in the browser (like `window`) or in node.js (like `process`).

All we need to do to get the type of an `obj` -- is to call plain object `toString` passing `this = obj`.

We can do it like this:

```js run
let s = {}.toString; // copy toString of Object to a variable

// what type is this?
let arr = [];

// copy Object toString to it:
arr.toStringPlain = s;

alert( arr.toStringPlain() ); // [object Array] <-- right!

// try getting the type of a browser window object?
window.toStringPlain = s;

alert( window.toStringPlain() ); // [object Window] <-- it works!
```

Please note that different objects usually have their own `toString`. As we've seen above, the `toString` of `Array` returns a list of items. So we need to use exactly the `toString` of a plain object -- `{}.toString`. 

To call it in the right context, we copy it into a variable `s` -- in Javascript functions are not hardwired to objects, even built-in ones, so we do it -- and then assign as a property to another object `arr.toStringPlain` (not to override `arr.toString`). That's called *method borrowing*.

Actually, we could evade all complexities using [call](info:object-methods#call-apply) to pass `this`:

```js run
let arr = [];

alert( {}.toString.call(arr) ); // [object Array]
alert( {}.toString.call(window) ); // [object Window]
```

Here we do the same in one line: get the `toString` of a plain object and call it with the right `this` to get its type.


