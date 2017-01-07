
# Object to primitive conversion

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives.

But we left a gap for objects. Now let's close it. And, in the process, we'll see some  built-in methods and the example of a built-in symbol.

[cut]

## Where and why?

The process of object to primitive conversion can be customized, here we'll see how to implement our own methods for it. But first, let's see when it happens.

That's because the conversion of an object to primitive value (a number or a string) is a rare thing in practice.

For objects, there's no to-boolean conversion, because all objects are `true` in a boolean context. So there are only string and numeric conversions.

For instance, numeric conversion happens in most mathematical functions. But do we run maths on an object as a whole? Rarely the case. It also occurs when we compare an object against a primitive: `user > 18`. But should we write like that? What such comparison actually means? Maybe we want to compare `18` against the age of the `user`? Then it would be more obvious to write `user.age > 18`. And it's easier to read and understand it too.

As for the string conversion... Where does it occur? Usually, when we output an object like `alert(obj)`. But `alert` and similar ways to show an object are only used for debugging and logging purposes. For real stuff, the output is more complicated. It is usually implemented with special object methods like `user.format(...)` or in more advanced ways.

Still, there are still valid reasons why we should know how to-primitive conversion works:

- Simple object-as-string output (`alert` and alike) is useable sometimes.
- Many built-in objects implement their own to-primitive conversion, we need to know how to work with that.
- Sometimes an unexpected conversion happens, and we should understand what's going on.
- The final one. There are quizzes and questions on interviews that rely on that knowledge. Looks like people think it's a good sign that person understands Javascript if he knows type conversions well.

## ToPrimitive

When an object is used in the context where a primitive is required, it is converted to primitive using the `ToPrimitive` algorithm, thoroughly described in the [specification](https://tc39.github.io/ecma262/#sec-toprimitive)).

That algorithm joins all conversion cases and allows to customize them in a special object method.

When a built-in function (like `alert` or mathematical functions) or an operator (like an addition or substraction) get an object as their argument, they initiate the to-primitive conversion using one of 3 so-called "hints":

`"string"`
: When an operation expects a string, for object-to-string conversions, like:

    ```js
    // output
    alert(obj);

    // using object as a property key
    anotherObj[obj] = 123;
    ```

`"number"`
: When an operation expects a number, for object-to-number conversions, like:

    ```js
    // explicit conversion
    let num = Number(obj);

    // maths (except binary plus)
    let n = +obj; // unary plus
    let delta = date1 - date2;

    // less/greater comparison
    let greater = user1 > user2;
    ```

`"default"`
: Occurs in rare cases when the operator is "not sure" what type to expect.

    For instance, binary plus `+` can work both with strings (concatenates them) and numbers (adds them).

    Or when an object is compared with a string, number or a symbol using `==`, then also the `"default"` hint is used.

    ```js
    // binary plus
    let total = car1 + car2;

    // obj == string/number/symbol
    if (user == 1) { ... };
    ```

    Seems right to use that hint for binary addition `+` and equality check `==`, because they operate both on strings and numbers. Although, there's some inconsistency here. The greater/less operator `<>` can work with both strings and numbers too. Still, it uses "number" hint, not "default". That's for historical reasons.

    In practice, all built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And probably we should do the same.

Please note -- there are only three hints. That simple. There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.

**To do the conversion, Javascript tries to find and call three object methods:**

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

## Symbol.toPrimitive

Let's start from the first method. There's a built-in symbol named `Symbol.toPrimitive` that should be used to name the conversion method, like this:

```js
obj[Symbol.toPrimitive] = function(hint) {
  // return a primitive value
  // hint = one of "string", "number", "default"
}
```

For instance, here `user` object implements it:

```js run
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

As we can see from the code, `user` becomes a self-descriptive string or a money amount depending on the conversion. The single method `user[Symbol.toPrimitive]` handles all conversion cases.


## toString/valueOf

Methods `toString` and `valueOf` come from ancient times. They are not symbols (symbols did not exist that long ago), but rather "regular" string-named methods. They provide an alternative "old-style" way to implement the conversion.

If there's no `Symbol.toPrimitive` then Javascript tries to find them and try in the order:

- `toString -> valueOf` for "string" hint.
- `valueOf -> toString` otherwise.

For instance, here `user` does the same as above using a combination of `toString` and `valueOf`:

```js run
let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

Often we want a single "catch-all" place to handle all primitive conversions. In this case we can implement `toString` only, like this:

```js run
let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
```

In the absense of `Symbol.toPrimitive` and `valueOf`, `toString` will handle all primitive conversions.


## ToPrimitive and ToString/ToNumber

The important thing to know about all primitive-conversion methods is that they not necessarily return the "hinted" primitive.

There is no control whether `toString()` returns exactly a string, or whether `Symbol.toPrimitive` method returns a number for a hint "number".

**The only mandatory thing: these methods must return a primitive.**

An operation that initiated the conversion gets that primitive, and then continues to work with it, applying further conversions if necessary.

For instance:

- Mathematical operations (except binary plus) apply `ToNumber` after `ToPrimitive` with `"number"` hint:

    ```js run
    let obj = {
      toString() { // toString handles all ToPrimitive in the absense of other methods
        return "2";
      }
    };

    alert(obj * 2); // 4, ToPrimitive gives "2", then it becomes 2
    ```

- Binary plus first checks if the primitive is a string, and then does concatenation, otherwise performs `ToNumber` and works with numbers.

    String example:
    ```js run
    let obj = {
      toString() {
        return "2";
      }
    };

    alert(obj + 2); // 22 (ToPrimitive returned string => concatenation)
    ```

    Number example:
    ```js run
    let obj = {
      toString() {
        return true;
      }
    };

    alert(obj + 2); // 3 (ToPrimitive returned boolean, not string => ToNumber)
    ```

```smart header="Minor notes"
- If `Symbol.toPrimitive` exists, it *must* return an primitive, otherwise there will be an error.
- Methods `toString` or `valueOf` *should* return a primitive: if any of them returns and object, then it is ignored (like if the method didn't exist). That's the historical behavior.
```

## Summary

The object-to-primitive conversion is called automatically by many built-in functions and operators that expect a primitive as a value.

There are 3 types (hints) of it:
- `"string"`
- `"number"`
- `"default"`

So, operations use the hint depending on what they expect to get. The specification describes explicitly which operator uses which hint. There are very few operators that "don't know what to expect" and use the `"default"` hint. Usually for built-in objects it works the same way as `"number"`, so in practice the last two are often merged together.

The conversion algorithm is:

1. Call `obj[Symbol.toPrimitive](hint)` if the method exists,
2. Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.

In practice, it's often enough to implement only `obj.toString()` as a "catch-all" method for all conversions that returns a "human-readable" representation of an object, for logging or debugging purposes.  
