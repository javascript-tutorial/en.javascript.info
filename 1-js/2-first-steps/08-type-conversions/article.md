# Type Conversions

A variable in JavaScript can contain any data. A variable can at one moment be a string and later recieve a numeric value:

```js
// no error
let message = "hello";
message = 123456;
```

...But some operations implicitly convert a value from one type to another. For example, `alert` automatically converts any value to a string, to show it. Or mathematical operations convert values to numbers. That is called *type coercion*.

There are also cases when we need to explicitly convert between types to ensure that we store the right data the right way or to use special features of a certain type.

## ToString

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

The string conversion is mostly obvious. A `false` becomes `"false"`, `null` becomes `"null"` etc.

## ToNumber

Numeric conversion happens in mathematical functions and expressions automatically.

For example, when division '/' is applied to non-numbers:

```js run
alert( "6" / "2" ); // 3, strings are converted to numbers
```

We can use a `Number(value)` function to explicitly convert a `value`:

```js run
let str = "123";
alert(typeof str); // string

let n = Number(str); // becomes a number 123

alert(typeof n); // number 
```

The explicit conversion is usually required when we read a value coming from a text form field or another string-based source, but we expect a number to be entered.

If the string is not a valid number, the result of such conversion is `NaN`, for instance:

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

````smart header="Addition '+' concatenates strings"
Almost all mathematical operations convert values to numbers. With a notable exception of the addition `+`. If one of the added values is a string, then another one is also converted to a string.

Then it concatenates (joins) them:

```js run
alert( 1 + '2' ); // '12' (string to the right)
alert( '1' + 2 ); // '12' (string to the left)

alert( 1 + 2 ); // 3, numbers (for the contrast)
```

That only happens when one of arguments is a string, in other cases values are converted to numbers.
````

## ToBoolean

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

````warn header="Empty objects and arrays are truthy"
All objects become `true`:

```js run
alert( Boolean([]) ); // true
alert( Boolean({}) ); // true
```
````


## ToPrimitive

A string or numeric conversion of an object is a two-stage process. The object is first converted to a primitive value, and then ToString/ToNumber rules are applied to it.

The conversion is customizable on a per-object basis, so we'd better deal with it later when we know more about objects. 

For now, let's just see two common rules that we often meet when showing objects.

- When a plain object is converted into a string, is becomes `[object Object]`:

  ```js run
  alert( {} ); // [object Object]
  alert( {name: "John"} ); // [object Object]
  ```

- An array becomes a comma-delimited list of items:

  ```js run
  let arr = [1, 2, 3];

  alert( arr ); // 1,2,3
  alert( String(arr) === '1,2,3' ); // true
  ```

We'll return to it in the chapter [todo].

```smart header="It was only about ToString/ToNumber"
For ToBoolean, there is no complexity neither customizability. 

The rule is simple: all objects are truthy.
```


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

Most of these rules are easy to understand and memorize. The notable exceptions where people usually make mistakes are:

- `undefined` is `NaN` as a number.
- `"0"` is true as a boolean.

Objects can define their own methods of converting to a string or a number, we'll see them later. But they can't redefine the conversion to boolean.

