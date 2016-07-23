
# Object to primitive conversion

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives.

But we left a gap for objects. Now let's fill it.


[cut]

## Where and why?

The process of object to primitive conversion can be customized, here we'll see how to implement our own methods for it.

But first, let's note that conversion of an object to primitive value (a number or a string) is a rare thing in practice.

Just think about cases when such conversion happens. For numeric conversion, when we compare an object against a primitive: `user == 18`. But what do we mean here? Maybe to compare the user's age? Then wouldn't it be more obvious to write `user.age == 18`? And read it later too.

Or, for a string conversion... Where does it happen? Usually, when we output an object. But simple ways of output like `alert(user)` are only used for debugging and logging purposes. In projects, the output is more complicated. And it may require additional parameters too, so it should be implemented separately, maybe with methods.

Most of the time, it's more flexible and gives more readable code to explicitly write an object property or call a method than rely on the conversion.

That said, there are still valid reasons why we should know how it works.

- The `alert(user)` kind of output is still used for logging and debugging.
- Sometimes it just happens (on mistake?), and we should understand what's going on.

## ToPrimitive 

When an object is used as a primitive, the special internal algorithm named [ToPrimitive](https://tc39.github.io/ecma262/#sec-toprimitive) is invoked.

It comes in 3 flavours:

- `ToPrimitive(obj, "string")` 
- `ToPrimitive(obj, "number")` 
- `ToPrimitive(obj)`, the so-called "default" flavour

When [ToString](https://tc39.github.io/ecma262/#sec-tostring) conversion is applied to objects, it does two steps:


1. `let primitive = ToPrimitive(obj, "string")`
2. `return ToString(primitive)`

In other words, `ToPrimitive` is applied first, then the result (a primitive) is converted to string using [primitive rules](info:type-conversions) that we already know.

When [ToNumber](https://tc39.github.io/ecma262/#sec-tonumber) conversion is applied to objects, it also does two similar steps:

1. `let primitive = ToPrimitive(obj, "number")`
2. `return ToNumber(primitive)`

Again, `ToPrimitive` is applied first, then the primitive result is converted to number.

The "default" flavour occurs in [binary `+`](https://tc39.github.io/ecma262/#sec-addition-operator-plus-runtime-semantics-evaluation) operator, in [equality test](https://tc39.github.io/ecma262/#sec-abstract-equality-comparison) of an object versus a string, a number or a symbol, and in few other rare cases. It exists mainly for historical reasons to cover few backwards-compatible edge cases. Most of time it does that same as "number", but we should be aware of this case if we're impementing our own conversion method.

So, to understand `ToNumber` and `ToString` for objects, we should redirect ourselves to `ToPrimitive`.

## The modern style: Symbol.toPrimitive

The internal `ToPrimitive(obj, hint)` call has two parameters: 

`obj`
: The object to transform.

`hint`
: The flavour: one of `"string"`, `"number"` or `"default"`.

If the object has `Symbol.toPrimitive` method implemented, which it is called with the `hint`.

For instance:

```js run
let user = {
  name: "John",
  age: 30,

  // must return a primitive
  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? this.name : this.age;
  }
  
};

// conversions demo:
alert(user); // hint: string -> John
alert(+user); // hint: number -> 30
alert(user + 1); // hint: default -> 31
```


```smart header="`Symbol.toPrimitive` must return a primitive, but its type is not guaranteed"
The method `Symbol.toPrimitive` must return a primitive value, otherwise it will be an error.

But it can be any primitive. There's no control whether the call returns exactly a string or, say, a boolean. 

If `ToPrimitive` is a part of a `ToNumber/ToString` conversion, then after it there will be one more step to transform the primitive to a string or a number.
```

## The old style: toString and valueOf

If there is no `Symbol.toPrimitive`, then the other two methods are used:

- `toString` -- for string conversion,
- `valueOf` -- for numeric conversion.

These methods are not symbols, because they come from ancient times when no symbols existed. 

The algorithm is:

1. If `hint == "string"` try to call `obj.toString()` and then `obj.valueOf()`.
2. If `hint == "number" or "default"` we try to call `obj.valueOf()` and then `obj.toString()`.

If the result of either method is not an object, then it is ignored.

For instance, this `user` does the same as above:

```js run
let user = {
  name: "John",
  age: 30,

  // for hint="string"
  toString() {
    return this.name;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.age;
  }

};

alert(user); // John
alert(+user); // 30
alert(user + 1); // 31 (default like number calls valueOf)
```

If we want a single "catch-all" place for primitive conversions, or only want a nice debugging output of our object, then we can implement `toString` only. It the absence of `valueOf` it will be used for all conversions.

For instance:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

// here the hint would be "number"
// only toString exists, so it is used
alert( user > 'Abba' ); // true, "John" > "Abba"
alert( user < 'Zeta' ); // true, "John" < "Zeta"
```

````smart header="There's no `ToBoolean`"
There is no such thing as `ToBoolean`. All objects (even empty) are `true` in boolean context:

```js run
if ({}) alert("true"); // works
```

That is not customizable.
````



