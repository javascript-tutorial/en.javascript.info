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

There are many operations for numbers, e.g. multiplication `*`, division `/`, addition `+`, substraction `-` and so on.

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
    alert( "not a number" / 2 ); // NaN
    ```

    `NaN` is sticky. Any further operation on `NaN` would give `NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    So, in a long mathematical expression if we have `NaN` in one place, it propagates to the whole result.

```smart header="Mathematical operations are safe"
Doing maths is safe in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

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

This type is commonly used to store yes/no values.

For instance:

```js no-beautify
let checked = true; // the form field is checked
checked = false;    // the form field is not checked
```

Boolean values also come as the result of comparisons:

```js run
let isGreater = 4 > 1; 

alert( isGreater ); // true (the comparison result is "yes")
```

We'll cover booleans more deeply while discussing logical operators.

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


## Objects

The `object` type is special.

All other types are called "primitive", because their values can contain only a single thing (be it a string or a number or whatever).

In contrast, objects are used to store *keyed collections* of various data and more complex entities.

An object is defined with the figure brackets `{…}` with an optional list of "key: value" pairs. In programming that's sometimes called an "associative array" or a "hash".

A `key` is a string, `value` can be anything.

For instance, here we create a `user` object with two properties: 

```js
let user = {
  name: "John",
  age: 30
};
```

The `user` object can be imagined as a cabinet with two signed files labelled "name" and "age". 

![user object](object-user.png)

Both values (also called "fields" or "properties") are accessible using the dot notation:

```js
// get fields of the object:
alert( user.name ); // John
alert( user.age ); // 30
```

Also we can add new information to the user any time later:

```js
user.isAdmin = true; 
```

![user object 2](object-user-isadmin.png)

...Or remove it with the help of `delete` operator:

```js
delete user.age;
```

![user object 3](object-user-delete.png)

If the string which denotes the key (also called a "property name") has multiple words, then we should use square brackets notation to access it:

```js
user["likes to swim?"] = true;
```

See, the dot requires the property name to be a valid variable identifier. That is: no spaces and other limitations. Square brackets work with any string. 


```js
// this would give a syntax error
user.likes to swim? = true;
```

Another powerful feature of square bracket notation is that they allow to access a property by the name from the variable:

```js
let key = "likes to swim?";
user[key] = true; // same as above
```

Here we have a variable `key` which contains the property name, probably evaluated or calculated at run-time. 

Most of time, the dot is used to access object properties, but when we need a complex property name or to pass the name as a variable, then -- we go square brackets.

Javascript supports object inheritance. There are many types that are based on objects: `Date` for dates, `Array` for ordered data, `Error` for error-reporting and so on. So the word "object" is applicable to a variety of things. The term *plain objects* is used to represent "basic" objects, the ones we create with `{ ... }`.

Objects in JavaScript are very powerful. Here we've just scratched the surface of the topic that is really huge. We'll be closely working with objects and learning more about them in further parts of the tutorial.

## Arrays

As we’ve just seen, objects in Javascript store arbitrary keyed values. 

But quite often we find that we need an *ordered collection*, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc. It not convenient to use an object here, because it provides no methods to manage the order of elements. We can’t easily access the n-th element in an object. Also we can’t insert a new property “before” the existing ones, and so on. Objects are just not meant for such use.

There exists a special data structure named "an array", to store ordered collections. 

An array is created using square brackets:

```js
let empty = []; // empty array

let fruits = ["Apple", "Orange", "Plum"]; // array with 3 values
```

Individual items are accessed using brackets `[]`, the first item has zero index:

```js run
let fruits = ["Apple", "Orange", "Plum"]; // array with 3 values

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum

// how many elements (last index + 1)
alert( fruits.length ); // 3
```

Please note that arrays do not form a separate language type. They are based on objects. But they greatly extend them with features of their own, methods to add, remove, extract elements from the array, to sort arrays and more. We'll cover them in the chapter <info:array>.

## Symbol type

The `symbol` type is used in conjunction with objects. Probably we won't need them any time soon, but it's the 7th and the last type of the language, so we must mention it here for the sake of completeness.

A "symbol" represents an unique identifier with a given name.

A value of this type can be created using `Symbol(name)`:

```js
// id is a symbol with the name "id"
let id = Symbol("id");
```

Symbols in JavaScript are different from symbols in Ruby language (if you are familiar with it, please don't get trapped by the same word). Two symbols with the same name are not the same:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

Symbols is a special primitive type used for identifiers, which are guaranteed to be unique. So, even if we create many symbols with the same name, they are still unique.

The use case for symbols is to create "concealed" properties of an object, which only make sense locally, that no other part of code can occasionally access or overwrite. 

For instance, if we want to store an "identifier" for the object `user`, we can create a symbol with the name `id` for it:

```js run
let user = { name: "John" };
let id = Symbol("id");

user[id] = "ID Value";
alert( user[id] ); // we can access the data using the symbol as the key
```

Now let's imagine that another script wants to have his own "id" property inside `user`, for his own purposes. That may be another javascript library, so the scripts are completely unaware for each other.

No problem. It can create its own `Symbol("id")`. There will be no conflict, because symbols are always different, even if they have the same name.

Please note that in the same case if we used a string `"id"` instead of a symbol here, then there would be a conflict:

```js run
let user = { name: "John" };

// our script
user.id = "ID Value";

// ...if later another script the uses same name for its purposes...

user.id = "ID 2"
// then boom! overwritten! it did not mean to harm the colleague, but did it!
```

Two `Symbol("id")` are not equal, that's why they would allow to store values safely.


Symbols are widely used by the JavaScript language itself to store "system" properties which we'll learn in later chapters.

## The typeof operator [#type-typeof]

The `typeof` operator returns the type of the argument. It's handy in the case when we want to process values of different types differently, or just to make a quick check.

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
typeof [] // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Please note the last lines.

1. The array is not a type of its own, but a subtype of object, that's why `typeof []` is `"object"`.
2. The result of `typeof null` equals to `"object"`. That's wrong. It is an officially recognized error in `typeof` implementation, kept for compatibility. Of course, `null` is not an object. It is a special value with a separate type of its own. 
3. The result of `typeof alert` is `"function"`, because `alert` is a function of the language. We'll study functions in the near future and see that actually functions belong to the object type. But `typeof` treats them differently. That's very convenient in practice.



## Summary

There are 7 basic types in JavaScript.

- `number` for numbers of any kind, can convert into it using `Number(value)`.
- `string` for strings and characters, can convert into it using `String(value)`.
- `boolean` for `true`/`false`, can convert into it using `Boolean(value)`.
- `null` for unknown values.
- `undefined` for unassigned values.
- `symbol` for unique identifiers.
- `object` for more complex data structures (there exist many, we saw arrays).

The `typeof` operator allows to see which type is stored in the variable. 

