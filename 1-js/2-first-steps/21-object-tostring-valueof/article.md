
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

```smart header="ToPrimitive returns a primitive"
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

## Examples for built-ins

Let's check a few examples to finally get the whole picture.

```js run
alert( [] + 1 ); // '1'
alert( [1] + 1 ); // '11'
alert( [1,2] + 1 ); // '1,21'
```

The array from the left side of `+` is first converted to primitive using `toPrimitive(obj, "number")`.

For arrays (and most other built-in objects) only `toString` is implemented, and it returns a list of items.

So we'll have:

```js 
alert( '' + 1 ); // '1'
alert( '1' + 1 ); // '11'
alert( '1,2' + 1 ); // '1,21'
```

Now the addition has the first operand -- a string, so it converts the second one to a string also. Hence the result.

Now with a plain object:

```js run
alert( +{} ); // NaN
alert( {} + {} ); // [object Object][object Object]
```

Plain objects actually have both `toString()` and `valueOf()`:

................TODO ALG OF OBJECT TOSTRING

The result of these operations should be somewhat obvious now.






## [[Class]]

From the chapter <info:types> we know that `typeof` cannot distinguish different kinds of objects. Arrays, plain objects and others are all the same "object" for it.

But there's a semi-hidden way to access the right class.

Most built-in objects 




Here are some built-in objects

Most built-in object implement only `toString()`. From the algorithm string conversion is much more widely used






The similar thing with the method `valueOf`. It is called when the object is converted to a number.

```js run
let room = {
  number: 777,

  valueOf() {
    return this.number; 
  },
};

alert( +room );  // 777, valueOf is called
```

What really sounds strange -- is the name of the method. Why is it called "valueOf", why not "toNumber"?

The reason is that `valueOf` is used by default to convert an object to a primitive for operations where a primitive value is required.



