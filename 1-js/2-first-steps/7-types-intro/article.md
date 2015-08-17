# Data types

There are 7 data types in JavaScript.

Here we will get the common understanding of them. In the next chapters we'll talk about each type in detail.

[cut]

## A number

```js
var n = 123;
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
var str = "Hello";
var str2 = 'Single quotes are ok too';
var prase = `can embed ${str}`;
```

In JavaScript, there are 3 types of quotes.

<ol>
<li>Double quotes and single quotes are essentially the same. Can use either.</li>
<li>Backtricks are "extended functionality" quotes. They allow to embed other variables or even expressions into the string wrapping them by `${…}`.</li>
</ol>

[smart header="There is no *character* type."]
In some languages, there is a special "character" type for a single character. For example, in the C language it is `char`.

In JavaScript, there is only one type: `string`. 
[/smart]

We'll cover strings more thoroughly in the chapter [](/string).

## Boolean (logical) type

The boolean type has only two values in it: `true` and `false`.

This type is commonly used to store the yes/no values.

For instance:

```js
//+ no-beautify
var checked = true; // the form field is checked
checked = false;    // the form field is not checked
```

We'll cover booleans while discussing logical operators.

## The "null" value

The special `null` value does not belong to any type described above.

It forms a separate type of its own, which contains only the `null` value:

```js
var age = null;
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
var x;
alert( x ); // shows "undefined"
```

Technically, it is possible to assign to `undefined`:

```js
//+ run
var x = 123;
x = undefined;

alert( x ); // "undefined"
```

...But it's not recommended to do that, because such assignment contradicts to the sense of `undefined`.

To write an "empty" or an "unknown" value into the variable, use `null`.


## Symbols and objects

The "symbol" type is used to create unique identifiers.

```js
//+ run
var s = Symbol();
```

Symbols are mainly used for objects and thus we'll cover



```js
//+ run
var s = Symbol("id");

x = undefined;

alert( x ); // "undefined"
```


## Object

The `object` type is special. 

All other types are called "primitive", because their values can contain only a single thing (be it a string or a number or whatever).

In contrast, objects are used to store collections of various data and more complex entities.

An object is defined with the figure brackets `{…}`.

For instance, here we create a `user` object with the name and the age:

```js
var user = { 
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

## Symbol

The `symbol` type is used to create unique identifiers for objects.

```js
var id = Symbol("id");
```

There are other programming languages with a "symbol" type, namely Ruby. 

Let's just say that JavaScript symbols are not the same.

We list symbols here for completeness, their in-depth study goes after covering objects.

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

## Summary

<ul>
<li>There are 7 basic types in JavaScript. Six "primitive" types: `number`, `string`, `boolean`, `null`, `undefined`, `symbol` and `object`.</li>
<li>Use `typeof x` to see which type is stored in `x`, but note that `typeof null` is mistakingly returned as undefined.</li>
</ul>

Now as we know which types exist, let's move on to operators and compute something using these types.
