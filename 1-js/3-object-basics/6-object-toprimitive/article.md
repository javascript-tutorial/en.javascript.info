
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
- The built-in `toString` method of objects allows to get the type of almost anything.
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

If we only want a nice debugging output of our object, then we can implement `toString` only. It the absence of `valueOf` it will be used for both conversions.

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

## Bonus: toString for the type

There are many kinds of built-in objects in Javascript. Many of them have own implementations of `toString` and `valueOf`. We'll see them when we get to them.

But the built-in `toString()` of plain objects is also interesting, it does something very special.

From the first sight it's obvious:

```js run
let obj = { };

alert( obj ); // [object Object]
```

But it's much more powerful than that. 

By [specification](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), `toString` can work in the context of any value. And it returns `[object ...]` with the kind of the value inside.

The algorithm looks like this:

- If `this` value is `undefined`, return `[object Undefined]`
- If `this` value is `null`, return `[object Null]`
- If `this` is a function, return `[object Function]`
- ...Some other builtin cases for strings, numbers etc...
- Otherwise if there's a property `obj[Symbol.toStringTag]`, then return it inside `[object...]`.
- Otherwise, return `[object Object]`.

Most environment-specific objects even if they do not belong to Javascript core, like `window` in the browser or `process` in Node.JS, have `Symbol.toStringTag` property. So this algorithm works for them too.

To make use of it, we should pass the thing to examine as `this`. We can do it using [func.call](info:object-methods#call-apply).

```js run
let s = {}.toString; // copy toString of a plain object into a variable

// call the algorithm with this = null
alert( s.call(null) ); // [object Null]

// call the algorithm with this = alert
alert( s.call(alert) ); // [object Function]

// browser object works too
alert( s.call(window) ); // [object Window]
// (because it has Symbol.toStringTag)
alert( window[Symbol.toStringTag] ); // Window
```

There might be a question: "Why [object Null]?". Well, of course, `null` is not an object. The wrapper `[object ...]` is the same for historical reasons and for making things universal.

In the example above we copy the "original" `toString` method of a plain object to the variable `s`, and then use it to make sure that we use *exactly that* `toString`. 

We could also call it directly:
```js run
alert( {}.toString.call("test") ); // [object String]
```

So, `{}.toString` can serve as "`typeof` on steroids" -- the more powerful version of type detection that not only distinguishes between basic language types, but also returns the kind of an object. 

Most builtins have `Symbol.toStringTag` property, for our objects we can provide it too:

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```




