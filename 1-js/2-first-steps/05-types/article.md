# Data types

A variable in JavaScript can contain any data. A variable can at one moment be a string and later recieve a numeric value:

```js
// no error
let message = "hello";
message = 123456;
```

Such languages are called "dynamically typed", meaning that there are language types, but variables are not bound to any of them.

There are 7 basic data types in JavaScript. Here we'll study the basics, and in the next chapters we'll talk about each of them in detail.

[cut]

## A number

```js
let n = 123;
n = 12.345;
```

A *number* type serves both for integer and floating point numbers.

There are many operations for numbers, e.g. multiplication `*`, division `/`, addition `+`, substraction `-` and so on.

Besides regular numbers there are so-called "special numeric values" which also belong to that type: `Infinity`, `-Infinity` and `NaN`.

- `Infinity` represents the mathematical [Infinity](https://en.wikipedia.org/wiki/Infinity) ∞. It is a special value that's greater than any number.

    We can get it as a result of division by zero:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Or just mention it in the code directly:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` represents a computational error. It is a result of an incorrect or an undefined mathematical operation, for instance:

    ```js run
    alert( "not a number" / 2 ); // NaN
    ```

    `NaN` is sticky. Any further operation on `NaN` would give `NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN + 5 is still NaN
    ```

    So, if there's `NaN` somewhere in a mathematical expression, it propagates to the whole result.

```smart header="Mathematical operations are safe"
Doing maths is safe in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

The script will never stop with a fatal error ("die"). At worst we'll get `NaN` as the result.
```

Special numeric values formally belong to the "number" type. Of course they are not numbers in a common sense of this word.

We'll see more into working with numbers in the chapter <info:number>.

## A string

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;
```

In JavaScript, there are 3 types of quotes.

1. Double quotes: `"Hello"`.
2. Single quotes: `'Hello'`.
3. Backticks: <code>&#96;Hello&#96;</code>.

Double and single quotes are similar, "simple" quotes.

Backticks are "extended functionality" quotes. They allow to embed variables and expressions into a string by wrapping them in `${…}`, for example:

```js run
let name = "John";

// embed variable
alert( `Hello, ${name}!` ); // Hello, John!

// embed expression
alert( `the result is ${1 + 2}` ); // the result is 3
```

The expression inside `${…}` is evaluated and the result becomes a part of the string. We can put anything there: a variable like `name` or an arithmetical expression like `1 + 2` or something more complex.

We'll cover strings more thoroughly in the chapter <info:string>.

```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language it is `char`.

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of only one character or many of them.
```

## A boolean (logical)

The boolean type has only two values: `true` and `false`.

This type is commonly used to store yes/no values: `true` means "yes, correct", and `false` means the "no, incorrect".

For instance:

```js
let checked1 = true;  // yes, the form field is checked
let checked2 = false; // no, the form field is not checked
```

Boolean values also come as the result of comparisons:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (the comparison result is "yes")
```

We'll cover booleans more deeply later while discussing [logical operators](/logical-ops).

## The "null" value

The special `null` value does not belong to any type described above.

It forms a separate type of its own, which contains only the `null` value:

```js
let age = null;
```

In JavaScript `null` is not a "reference to a non-existing object" or a "null pointer" like in some other languages.

It's just a special value which has the sense of "nothing", "empty" or "value unknown".

The code above states that the `age` is unknown or empty for some reason.

## The "undefined" value

The special value `undefined` stands apart. It makes a type of its own, just like `null`.

The sense of `undefined` is "value is not assigned".

If a variable is declared, but not assigned, then its value is exactly `undefined`:

```js run
let x;

alert( x ); // shows "undefined"
```

Technically, it is possible to assign to `undefined`:

```js run
let x = 123;

x = undefined;

alert( x ); // "undefined"
```

...But it's not recommended to do that. Normally, we use `null` to write an "empty" or an "unknown" value into the variable, and `undefined` is only used for checks, to see if the variable is assigned or similar.

## Objects and Symbols

The `object` type is special.

All other types are called "primitive", because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections data and more complex entities. We'll deal with them later after we know enough about primitives.

The `symbol` type is used to create unique identifiers for objects. We have to mention it here for completeness, but we'd better study them after covering objects.

[todo when ? chapter?]

## The typeof operator [#type-typeof]
[todo we need typeof in types]

The `typeof` operator returns the type of the argument. It's useful when we want to process values of different types differently, or just want to make a quick check.

It supports two forms of syntax:

1. As an operator: `typeof x`.
2. Function style: `typeof(x)`.

In other words, it works both with the brackets or without them. The result is the same.

The call to `typeof x` returns a string, which has the type name:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

The last three lines may be a little unobvious so here's explanations:

1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here it serves just as an example of an object.
2. The result of `typeof null` equals to `"object"`. That's wrong. It is an officially recognized error in `typeof`, kept for compatibility. Of course, `null` is not an object. It is a special value with a separate type of its own. So, again, that's an error in the language.
3. The result of `typeof alert` is `"function"`, because `alert` is a function of the language. We'll study functions in the near future and see that actually functions belong to the object type. But `typeof` treats them differently. That's very convenient in practice.


## Summary

There are 7 basic types in JavaScript.

- `number` for numbers of any kind, can convert into it using `Number(value)`.
- `string` for strings and characters, can convert into it using `String(value)`.
- `boolean` for `true`/`false`, can convert into it using `Boolean(value)`.
- `null` for unknown values (a standalone type that has a single value `null`).
- `undefined` for unassigned values (a standalone type that has a single value `undefined`).
- `object` for more complex data structures.
- `symbol` for unique identifiers.

The `typeof` operator allows to see which type is stored in the variable.

- Two forms: `typeof x` or `typeof(x)`.
- Returns a string with the name of the type, like `"string"`.
- Mistreats `null` as an `object` -- the old official error in the language.

In nearest chapters we'll concentrate on understanding how to operate on primitives and once we're familiar with that, then we'll move on to objects.
