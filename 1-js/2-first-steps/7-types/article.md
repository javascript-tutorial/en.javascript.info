# Data types

There are 7 data types in JavaScript.

Here we will get the common understanding of them. In the next chapters we'll talk about each type in detail.

[cut]

## A number

```js
let n = 123;
n = 12.345;
```

There is a single *number* type for both integer and floating point numbers.

Besides numbers it may store so called "numeric values": `Infinity`, `-Infinity` and `NaN`.

`Infinity` is meant to represent the mathematical [Infinity](https://en.wikipedia.org/wiki/Infinity).

We can get it dividing by zero:

```js
//+ run
alert( 1 / 0 ); // Infinity
alert( -1 / 0 ); // -Infinity
```

`NaN` represents a computational error. It is the result of an incorrect or undefined mathematical operation, for instance:

```js
//+ run
alert( "not a number" * 2 ); // NaN
```

These values formally belong to the "number" type. Of course they are not numbers in a common sense of this word.

We'll cover working with numbers in the chapter [](/number).

## A string

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;
```

In JavaScript, there are 3 types of quotes.

<ol>
<li>Double quotes: `"Hello"`.</li>
<li>Single quotes: `'Hello'`.</li>
<li>Backtricks are "extended functionality" quotes. They allow to embed other variables or even expressions into the string wrapping them by `${…}`.</li>
</ol>

Double and single quotes are essentially the same. The only difference between them can be seen when the string includes the quotation character `"` or `'`.

A double quote symbol may appear inside single-quoted lines and vise versa:

```js
let hello = "I'm JavaScript"; // single-quote inside "…"
let name = 'My "official" name is "EcmaScript"'; // vise versa
```

If we want to include a single quote inside a same-quoted string, we can do it too. But we need to prepend it with a slash:

```js
// prepend ' inside the string with a slash \'
let hello = 'I\'m JavaScript'; 
```

Similarly with double quotes.

[smart header="There is no *character* type."]
In some languages, there is a special "character" type for a single character. For example, in the C language it is `char`.

In JavaScript, there is only one type: `string`. 
[/smart]

We'll cover strings more thoroughly in the chapter [](/string).

## A boolean (logical)

The boolean type has only two values in it: `true` and `false`.

This type is commonly used to store the yes/no values.

For instance:

```js
//+ no-beautify
let checked = true; // the form field is checked
checked = false;    // the form field is not checked
```

Boolean values usually originate from the comparisons:

```js
//+ run
let isGreater = 4 > 1;
alert(isGreater); // true
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

The code above basically says that the `age` is unknown.

## The "undefined" value

The special value `undefined` stands separately. It makes a type of its own, just like `null`. 

The sense of `undefined` is "value is not assigned".

If a variable is declared, but not assigned, then its value is exactly `undefined`:

```js
//+ run
let x;
alert( x ); // shows "undefined"
```

Technically, it is possible to assign to `undefined`:

```js
//+ run
let x = 123;
x = undefined;

alert( x ); // "undefined"
```

...But it's not recommended to do that, because such assignment contradicts to the sense of `undefined`.

To write an "empty" or an "unknown" value into the variable, use `null`.

## The typeof operator [#type-typeof]

The `typeof` operator returns the type of the argument.

It has two syntaxes: with the brackets or without them.

<ol>
<li>As an operator: `typeof x`.</li>
<li>Function style: `typeof(x)`.</li>
</ol>

They work the same. 

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
typeof function(){} // "function"  (2)
*/!*
```

Please note the last two lines, because `typeof` behaves specially there.

<ol>
<li>The result of `typeof null` equals to `"object"`. That is an officially recognized error in the language that is kept for compatibility. In fact, `null` is not an object, but a special value from a data type of its own.</li>
<li>Functions are yet to be covered. As of now let's just note that functions is a kind of objects. But `typeof` treats them separately returning `"function"`. That's very convenient in practie.</li>
</ol>

## Type conversions

A variable in JavaScript can contain any data. The same variable can get a string and, a little bit later, be used to store a number:

```js
// perfectly fine
let message = "hello";
message = 123456;
```

But sometimes we need to convert a value of one type to another. That is mostly useful because each type has it's own features, so we are really going to benefit from storing a number as a number, not a string with it.

There are many type conversions in JavaScript, fully listed in [the specification](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-type-conversion).

Three conversions that are required most often are:

<ol>
<li>String conversion.</li>
<li>Numeric conversion.</li>
<li>Boolean conversion.</li>
</ol>

### String conversion

The string conversion happens when we need a string from a value.

For example, `alert` does it:

```js
//+ run
let a = true;

alert( a ); // "true"
```

We can also use a call `String(value)` function for that:

```js
//+ run
let a = true;

a = String(a); // now: a = "true"
alert(typeof a); // string
```

The string conversion is the most obvious. A `false` becomes `"false"`, `null` becomes `"null"` etc.

### Numeric conversion

Numeric conversion happens in mathematical functions and expressions automatically. 

For example, a mathematical operation like division '/' can be applied to non-numbers:

```js
//+ run
alert( "6" / "2" ); // 3, strings become numbers
```

Although if we want to ensure that the value is a number, we can use a `Number(value)` function to do it explicitly:

```js
//+ run
let n = Number("6"); 

alert(typeof n); // number
```

We can use that to ensure that a user-supplied value is a number. 

If the string is not a number, the result is `NaN`.

For example:

```js
//+ run
let age = Number("a user-supplied string"); 

alert(age); // NaN, conversion failed
alert(age); // number, because NaN belongs to the "number" type
```

The rules of transformation:

<table>
<thead>
<tr><th>Value</th><th>Becomes...</th></tr>
</thead>
<tbody>
<tr><td>`undefined`</td><td>`NaN`</td></tr>
<tr><td>`null`</td><td>`0`</td></tr>
<tr><td>`true / false`</td><td>`1 / 0`</td></tr>
<tr><td>A string</td><td>Whitespaces from the start and the end are cut.<br>Afterwards, if we have an empty string, then `0`, otherwise -- "read" aиначе из непустой строки "считывается" число, при ошибке результат `NaN`.</td></tr>
</tbody>
</table>

Other examples:

```js
//+ run
alert( Number("   123   ") ); // 123
alert( Number("123z") ); // NaN (not a number because of "z")
alert( Number(true) ); // 1
alert( Number(false) ); // 0
```

Please note that `null` and `undefined` are similar in many aspects, but here they are not. A `null` becomes a zero, but `undefined` becomes `NaN`.

## Boolean conversion

Boolean conversion is happens automatically in some operations, but also can be performed manually with the call of `Boolean(value)`.

All values that are intuitively "empty" become `false`. These are: `0`, an empty string, `null`, `undefined` and `NaN`.

Other values become `true`.

[warn header="Please note: a string `\"0\"` is `true`"]
Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript a non-empty string is always `false`, no matter what is in it.

```js
//+ run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // any non-empty string, even whitespaces are true
```
[/warn]


## Object and Symbol

The `object` type is special. 

All other types are called "primitive", because their values can contain only a single thing (be it a string or a number or whatever).

In contrast, objects are used to store collections of various data and more complex entities.

### Object

An object is defined with the figure brackets `{…}`.

For instance, here we create a `user` object with the name and the age:

```js
let user = { 
  name: "John",
  age: 30
};
```

We can access the data form the object via the dot notation:

```js
alert( user.name ); // John
alert( user.age ); // 30
```

We'll cover working with objects in the chapter [](/object).

### Symbol

The `symbol` type is used to create unique identifiers.

```js
let id = Symbol("id");
```

...And then we could use `id` as a special kind of identifier for object properties. We'll see more about object properties in the following chapters.

As of now, let's just say that JavaScript symbols is a separate primitive type. And they are different from symbols in Ruby language (just in case you are familiar with it, please don't get trapped by the same word).

We list symbols here for completeness, their in-depth study will follow after objects.


## Summary

<ul>
<li>There are 7 basic types in JavaScript. Six "primitive" types: `number`, `string`, `boolean`, `null`, `undefined`, `symbol` and `object`.</li>
<li>Use `typeof x` to see which type is stored in `x`, but note that `typeof null` is mistakingly returned as undefined.</li>
</ul>

Type conversions usually happen automatically, but there are also functions for the manual conversion:
<ul>
<li>String</li>
<li>Number</li>
<li>Boolean</li>
</ul>

Now let's move on to operators and compute something using these types.

