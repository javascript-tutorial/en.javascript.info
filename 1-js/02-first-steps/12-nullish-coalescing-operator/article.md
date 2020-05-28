# Nullish coalescing operator '??'

[recent browser="new"]

The nullish coalescing operator `??` provides a short syntax for selecting a first "defined" variable from the list.

The result of `a ?? b` is:
- `a` if it's not `null` or `undefined`,
- `b`, otherwise.

So, `x = a ?? b` is a short equivalent to:

```js
x = (a !== null && a !== undefined) ? a : b;
```

Here's a longer example.

Let's say, we have a `firstName`, `lastName` or `nickName`, all of them optional.

Let's choose the defined one and show it (or "Anonymous" if nothing is set):

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// show the first not-null/undefined variable
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

## Comparison with ||

That's very similar to OR `||` operator. Actually, we can replace `??` with `||` in the code above and get the same result.

The important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

This matters a lot when we'd like to treat `null/undefined` differently from `0`.

For example:

```js
height = height ?? 100;
```

This sets `height` to `100` if it's not defined. But if `height` is `0`, then it remains "as is".

Let's compare it with `||`:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value, depeding on use cases that may be incorrect.

The `height ?? 100` returns `100` only if `height` is exactly `null` or `undefined`.

## Precedence

The precedence of the `??` operator is rather low: `7` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

That's lower than most operators and a bit higher than `=` and `?`.

So if we need to use `??` in a complex expression, then consider adding parentheses:

```js run
let height = null;
let width = null;

// important: use parentheses
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Otherwise, if we omit parentheses, then `*` has the higher precedence and would run first. That would be the same as:

```js
// not correct
let area = height ?? (100 * width) ?? 50;
```

There's also a related language-level limitation. Due to safety reasons, it's forbidden to use `??` together with `&&` and `||` operators.

The code below triggers a syntax error:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

The limitation is surely debatable, but for some reason it was added to the language specification.

Use explicit parentheses to fix it:

```js run
let x = (1 && 2) ?? 3; // Works
alert(x); // 2
```

## Summary

- The nullish coalescing operator `??` provides a short way to choose a "defined" value from the list.

    It's used to assign default values to variables:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- The operator `??` has a very low precedence, a bit higher than `?` and `=`.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
