# Type conversions

A variable in JavaScript can contain any data. A variable can at one moment be a string and later recieve a numeric value:

```js
// no error
let message = "hello";
message = 123456;
```

...But sometimes we need to convert a value from one type to another. For example, `alert` automatically converts any value to a string, to show it. Or, so to say, an `if(value)` test converts the `value` to  boolean type to see if it's `true` or `false`.

There are also cases when we need to explicitly convert between types to ensure that we store the right data the right way or to use special features of a certain type.

There are many type conversions in JavaScript, fully listed in [the specification](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-type-conversion).

Three conversions that happen the most often:

1. String conversion.
2. Numeric conversion.
3. Boolean conversion.

Let's see how they work and when they happen.

## String conversion

The string conversion happens when we need a string form of a value.

For example, `alert` does it:

```js run
let a = true;

alert( a ); // "true"
```

We can also use a call `String(value)` function for that:

```js run
let a = true;
alert(typeof a); // boolean

*!*
a = String(a); // now: a = "true"
alert(typeof a); // string
*/!*
```

The string conversion is obvious. A `false` becomes `"false"`, `null` becomes `"null"` etc.

For objects it's a little bit trickier. By default, regular objects are converted like this:

```js run
alert( {} ); [object Object]
```

Although, some object subtypes have their own way of formatting, for instance, arrays turn into the comma-delimited list of items:

```js run
let arr = [1,2,3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Later we'll see how to create custom rules for string conversions for our objects.

## Numeric conversion

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
|<code>true&nbsp;and&nbsp;false</code> | `1` and `0` |
| `string` | Whitespaces from the start and the end are removed. Then, if the remaining string is empty, the result is `0`, otherwise -- the number is "read" from the string. An error gives `NaN`. |

Examples:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Please note that `null` and `undefined` behave differently here: `null` becomes a zero, while `undefined` becomes `NaN`.

## Boolean conversion

Boolean conversion is the simplest one.

It happens in logical operations (later we'll meet `if` tests and other kinds), but also can be performed manually with the call of `Boolean(value)`.

The conversion rule:

- Values that are intuitively "empty", like `0`, an empty string, `null`, `undefined` and `NaN` become `false`. 
- Other values become `true`.

````warn header="Please note: the string with zero `\"0\"` is `true`"
Some languages (namely PHP) treat `"0"` as `false`. But in JavaScript a non-empty string is always `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // any non-empty string, even whitespaces are true
```
````

## Summary

There exist three most widely used type conversions: to string, to number and to boolean.

The conversion to string is usully obvious for primitive values and depends on the object type for objects. For instance, arrays turn into a comma-delimited list of elements. 

To number follows the rules:

| Value |  Becomes... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | The string is read "as is", whitespaces from both sides are ignored. An empty string is  `0`. An error gives `NaN`. |

To boolean:

| Value |  Becomes... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|any other value| `true` |

Objects provide advanced means to specify how they are converted to string and number, we'll see them later, when study objects in-depth.

Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:

- `undefined` is `NaN` as a number.
- `"0"` is true as a boolean.

In the next chapter we'll study operators. You will find enough tasks for type conversion there.