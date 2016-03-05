# Data types

There are 7 data types in JavaScript.

Here we will get the common understanding of them. In the next chapters we'll talk about each type in detail.

[cut]

## A number

```js
let n = 123;
n = 12.345;
```

A *number* type serves both for integer and floating point numbers.

Besides regular numbers there are so-called "special numeric values" which also belong to that type: `Infinity`, `-Infinity` and `NaN`.

- `Infinity` represents the mathematical [Infinity](https://en.wikipedia.org/wiki/Infinity). It is a value that's greater than any number.

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
    alert( "not a number" * 2 ); // NaN
    ```

    `NaN` is sticky. Any further operation on `NaN` would give `NaN`:

    ```js run
    alert( "not a number" * 2 + 5 - 9 ); // still NaN
    ```

    So, in a long mathematical expression if we have `NaN` in one place, it propagates to the whole result.

```smart header="Maths is safe"
Maths is safe in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

The script will never die. At worst we'll get `NaN` as the result.
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
3. Backtricks: <code>&#96;Hello&#96;</code>.

Double and single quotes are essentially the same.

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

This type is commonly used to store the yes/no values.

For instance:

```js no-beautify
let checked = true; // the form field is checked
checked = false;    // the form field is not checked
```

Boolean values also come as the result of comparisons:

```js run
let isGreater = 4 > 1;
alert( isGreater ); // true
```

We'll cover booleans more deeply while discussing logical operators.

## The "null" value

The special `null` value does not belong to any type described above.

It forms a separate type of its own, which contains only the `null` value:

```js
let age = null;
```

In JavaScript `null` is not a "reference to a non-existing object" or a "null pointer" like in some other languages.

It's just a special value which has the sense of "nothing" or "value unknown".

The code above states that the `age` is unknown.

## The "undefined" value

The special value `undefined` stands separately. It makes a type of its own, just like `null`.

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

...But it's not recommended to do that, because such assignment contradicts to the sense of `undefined`.

Normally, we use `null` to write an "empty" or an "unknown" value into the variable, and `undefined` is only used for checks, to see if the variable is assigned or similar.

## Object type

The `object` type is special.

All other types are called "primitive", because their values can contain only a single thing (be it a string or a number or whatever).

In contrast, objects are used to store *collections* of various data and more complex entities.

An object is defined with the figure brackets `{…}`.

For instance, here we create a `user` object with the name and the age:

```js
let user = {
  name: "John",
  age: 30
};
```

Now `user` is a complex entity, can be imagine of a shelf with two folders labelled "name" and "age".

We can access either via the dot notation:

```js
// get parts of the object:
alert( user.name ); // John
alert( user.age ); // 30
```

Also we can add new information to the user any time later:

```js
user.isAdmin = true; 
```

...Or remove it with the help of `delete` operator:

```js
delete user.age;
```

Any string can be used as a property name. But if it has multiple words, then we should use another kind of notation to access it. Namely, square brackets:

```js
user["likes to swim?"] = true;
```

See, the dot requires the property name to be a valid variable identifier. That is: no spaces and other limitations. Square brackets work with any string. 

We can split the code above into two lines by putting the property name into a variable:

```js
let key = "likes to swim?";
user[key] = true; // same as above
```

Objects in JavaScript are very powerful. Here we just started the topic that is really huge. We'll be closely working with objects in the next parts of the tutorial.

## Symbol type

The `symbol` type stands apart from the others. Probably we won't need them any time soon, but it's the 7th and the last type of the language. So we must mention it for the sake of completeness.

Type "symbol" represents an unique identifier with a given name.

A value of this type can be created like this:

```js
// id is a symbol with the name "id"
let id = Symbol("id");
```

Symbols in JavaScript are different from symbols in Ruby language (if you are familiar with it, please don't get trapped by the same word) in that two symbols with the same name are different:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

Symbols is a separate primitive type used for identifiers, which are guaranteed to be unique.

So if we want to create a "hidden" property in an object, only for us, and ensure that no other part of code can occasionally access it, we can create a symbol for it:

```js run
let user = { name: "John" };
let id = Symbol("id");

user[id] = "Secret ID Value";
alert( user[id] ); // we can access the data
```

Now, if another script wants his own "id" property inside `user`, it can create its own `Symbol("id")`. There will be no conflict, because symbols are always different.

Symbols are widely used by the JavaScript language itself to store "system" properties. We'll find out more details after studying objects.

## The typeof operator [#type-typeof]

The `typeof` operator returns the type of the argument.

It allows two forms of syntax:

1. As an operator: `typeof x`.
2. Function style: `typeof(x)`.

In other words, it works both with the brackets or without them. They result is the same.

The result of `typeof x` is a string, which has the type name:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof {} // "object"

*!*
typeof null // "object"  (1)
*/!*

*!*
typeof alert // "function"  (2)
*/!*
```

Please note the last two lines, because `typeof` behaves specially there.

1. The result of `typeof null` equals to `"object"`. That is an officially recognized error in `typeof` implementation, kept for compatibility. Of course, `null` is not an object. It is a special value with a separate type of its own.
2. The result of `typeof alert` is `"function"`, because `alert` is a function of the language. We'll study more functions in near future. Formally, there is no special type for functions, but `typeof` makes them look different.  That's very convenient in practice.


## Type conversions

A variable in JavaScript can contain any data. A variable can at one moment be a string and later recieve a numeric value:

```js
// no error
let message = "hello";
message = 123456;
```

...But sometimes we need to convert a value from one type to another. For example, `alert` automatically converts any value to a string, to show it. Or, so to say, an `if (value)` converts it's argument into a boolean to see if it's `true` or `false`.

There are also cases when we need to convert between types to ensure that we store the right data the right way, or to use special features of a certain type.

There are many type conversions in JavaScript, fully listed in [the specification](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-type-conversion).

Three conversions that happen most often are:

1. String conversion.
2. Numeric conversion.
3. Boolean conversion.

Let's see how and when they happen.

### String conversion

The string conversion happens when we need a string form of a value.

For example, `alert` does it:

```js run
let a = true;

alert( a ); // "true"
```

We can also use a call `String(value)` function for that:

```js run
let a = true;

a = String(a); // now: a = "true"
alert(typeof a); // string
```

The string conversion is obvious. A `false` becomes `"false"`, `null` becomes `"null"` etc.

### Numeric conversion

Numeric conversion happens in mathematical functions and expressions automatically.

For example, a mathematical operation like division '/' can be applied to non-numbers:

```js run
alert( "6" / "2" ); // 3, strings become numbers
```

We can use a `Number(value)` function to convert any `value` to a number:

```js run
let str = "123";
alert(typeof str); // string

let n = Number(str); // becomes a number 123

alert(typeof n); // number 
```

The conversion is usually applied when we have a numeric value coming from a text form field or another string-based source.

If the string is not a number, the result of such conversion is `NaN`, for instance:

```js run
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

The numeric conversion rules:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| A string | Whitespaces from the start and the end are cut off. Then, if the remaining string is empty, the result is `0`, otherwise – the value is "read" from the string. An error gives `NaN`. |

Examples:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Please note that `null` and `undefined` behave differently here. A `null` becomes a zero, but `undefined` becomes `NaN`.

### Boolean conversion

Boolean conversion is happens automatically in logical operations (to be covered), but also can be performed manually with the call of `Boolean(value)`.

The conversion rules are simple here:

- All values that are intuitively "empty" become `false`. These are: `0`, an empty string, `null`, `undefined` and `NaN`.
- Other values become `true`.

````warn header="Please note: a string `\"0\"` is `true`"
Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript a non-empty string is always `false`, no matter what is in it.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // any non-empty string, even whitespaces are true
```
````


## Summary

There are 7 basic types in JavaScript.

- `number` for numbers of any kind, can convert into it using `Number(value)`.
- `string` for strings and characters, can convert into it using `String(value)`.
- `boolean` for `true`/`false`, can convert into it using `Boolean(value)`.
- `null` for unknown values.
- `undefined` for unassigned values.
- `object` for complex data structures.
- `symbol` for unique identifiers.

The `typeof` operator allows to see which type is stored in the variable, but note that it mistakingly returns `"object"` for `null`.

Now let's study operators and other language constructs that actually form our code.
