
# Object to primitive conversion

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions of primitives.

But we left a gap for objects. Now let's close it. And, in the process, we'll see some  built-in methods and the example of a built-in symbol.

[cut]

## Where and why?

The process of object to primitive conversion can be customized, here we'll see how to implement our own methods for it. But first, let's see when it happens.

The conversion of an object to primitive value (a number or a string) is a rare thing in practice.

Just think about cases when such conversion may be necessary. For instance, numeric conversion happens when we compare an object against a primitive: `user > 18`. But what such comparison actually means? Are we going to compare `18` against user's age? Then it would be more obvious to write `user.age > 18`. And it's easier to read and understand it too.

Or, for a string conversion... Where does it happen? Usually, when we output an object. But simple ways of object-as-string output like `alert(user)` are only used for debugging and logging purposes. For real stuff, the output is more complicated. That's why it is usually implemented with object methods like `user.format(...)` or even in more advanced ways.

So, most of the time, it's more flexible and gives more readable code to explicitly get an object property or call a method than rely on the conversion.

That said, there are still valid reasons why we should know how to-primitive conversion works.

- Simple object-as-string output is useable sometimes.
- Many built-in objects implement their own to-primitive conversion, we need to know how to work with that.
- Sometimes an unexpected conversion happens, and we should understand what's going on.
- Okay, the final one. There are quizzes and questions on interviews that rely on that knowledge. Looks like people think it's a good sign that person understands Javascript if he knows type conversions well.

## ToPrimitive

The algorithm of object-to-primitive conversion is called `ToPrimitive` in [the specification](https://tc39.github.io/ecma262/#sec-toprimitive).

There are 3 types (also called "hints") of object-to-primitive conversion:

`"string"`
: For object-to-string conversions, like:

    ```js
    // output
    alert(obj);

    // using object as a property key
    anotherObj[obj] = 123;
    ```

`"number"`
: For object-to-number conversions, like:

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
: Occurs in rare cases where it's not clear what is desired.

    For instance:

    ```js
    // binary plus can work both with strings (concatenates) and numbers (adds)
    let total = car1 + car2;

    // obj == string, number or symbol also uses default
    if (user == 1) { ... };
    ```

    So, binary addition `+` and equality check `==` use this hint. Seems right, because they operate both with strings and numbers. Although, there's some inconsistency here. The greater/less operator `<>` can work with both strings and numbers too. Still, it uses "number" hint. That's for historical reasons.

    In practice, all built-in objects except for one case (`Date` object, we'll learn it later) implement `"default"` conversion the same way as `"number"`. And probably we should do the same.

Please note -- there are only three conversions. That simple. There is no "boolean" hint (all objects are `true` in boolean context) or anything else. And if we treat `"default"` and `"number"` the same, like most built-ins do, then there are only two conversions.

To do the conversion, Javascript tries to find and call three object methods:

1. `Symbol.toPrimitive(hint)` if exists,
2. Otherwise if hint is `"string"`, try `toString()` and `valueOf()`, whatever exists.
3. Otherwise if hint is `"number"` or `"default"`, try `valueOf()` and `toString()`, whatever exists.

## Symbol.toPrimitive

For instance, here `user` object implements the 1st method:

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

As we can see from the code, `user` becomes a self-descriptive string or a money amount depending on the conversion.

## toString/valueOf

Methods `toString` and `valueOf` come from ancient times, that's why they are not symbols. They provide an alternative "old-style" way to implement the conversion.

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

## Summary


[todo describe article]


Minor notes:

- If `Symbol.toPrimitive` returns an object, that's an error.
- If `toString/valueOf` return an object, they are ignored (historical behavior).
- By default, all objects have both `toString` and `valueOf`, but `valueOf` returns the object itself, and hence is ignored.
