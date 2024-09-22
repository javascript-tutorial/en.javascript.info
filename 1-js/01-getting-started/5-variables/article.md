# Variables

If we want to write a JavaScript application bigger than "Hello, World", we need variables.

A [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) is a "named storage" for data. We can use variables to store goodies, visitors, and other data.

For example:
1. An online shop -- variables to store goods being sold and a shopping cart.
2. A chat application -- variables for users, messages, and much more.

## Let

To create a variable in JavaScript, use the `let` keyword.

The statement below creates (in other words: *declares*) a variable with the name "message":

```js
let message;
```

One can think of a variable as a "box" for data, with a uniquely-named sticker on it.

![](variable-message.svg)

We can put any value in the box using the assignment `=`.

For instance, let's store a string `Hello!`.

```js run
let message;

message = 'Hello!';
```

![](variable.svg)

The string is now saved into the memory area associated with the variable. We can access it using the variable name:

```js run
let message;

message = 'Hello!';

*!*
console.log(message); // shows the variable content
*/!*
```

To be concise, we can combine the variable declaration and assignment into a single line:

```js run
*!*
let message = 'Hello!'; // define the variable and assign the value
*/!*

console.log(message); // Hello!
```

We can also change it as many times as we want:

```js run
let message;

message = 'Hello!';

*!*
message = 'World!'; // value changed
*/!*

console.log(message); // World!
```

When the value is changed, the old data is automatically removed from the variable:

![](variable-change.svg)


We can also declare two variables and copy data from one into the other.

```js run
let hello = 'Hello world!';

let message;

*!*
// copy 'Hello world' from hello into message
message = hello;
*/!*

// now two variables hold the same data
console.log(hello); // Hello world!
console.log(message); // Hello world!
```

````warn header="Declaring twice triggers an error"
A variable should be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "This";

// repeated 'let' leads to an error
let message = "That"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then use it without `let`.
````

```smart header="Using `var` instead of `let`"
A long time ago, JavaScript used another keyword `var` to declare variables.

There're subtle differences between `var` and `let`, but the most important one is that `var` is outdated, people don't use it any more, so neither will we.

We only mention `var` because you may see it in some really old scripts, so that you know what it means.
```

## Variable naming [#variable-naming]

There are two limitations on variable names:

1. The name must contain only letters, digits, or the symbols `$` and `_`.
2. The first character must not be a digit.

Examples of valid names:

```js
let userName;
let test123;
```

When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word except first starting with a capital letter: `myVeryLongName`.

What's interesting -- the dollar sign `'$'` and the underscore `'_'` can also be used in names. They are regular symbols, just like letters, without any special meaning.

These names are valid:

```js run untrusted
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

alert($ + _); // 3
```

Examples of incorrect variable names:

```js no-beautify
let 1a; // cannot start with a digit

let my-name; // hyphens '-' aren't allowed in the name
```

```smart header="Case matters"
Variables named `apple` and `APPLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:

```js
let имя = '...';
let 我 = '...';
```

Technically, there is no error here. However, there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.
````

````warn header="Reserved names"
There is a [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), which cannot be used as variable names because they are used by the language itself.

For example: `let`, `class`, `return`, and `function` are reserved.

The code below gives a syntax error:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```
````

````warn header="An assignment without `use strict`"
Normally, we need to define a variable before using it. But in the old times, it was technically possible to create a variable by a mere assignment of the value without using `let`. This still works now if we don't put `use strict` in our scripts to maintain compatibility with old scripts.

```js run no-strict
// note: no "use strict" in this example

num = 5; // the variable "num" is created if it didn't exist

alert(num); // 5
```

This is a bad practice and would cause an error in strict mode:

```js
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```
````

## Constants

To declare a constant (unchanging) variable, use `const` instead of `let`:

```js
const myBirthDate = '18.04.1982';
```

Variables declared using `const` are called "constants". They cannot be reassigned. An attempt to do so would cause an error:

```js run
const myBirthDate = '18.04.1982';

myBirthDate = '01.01.2001'; // error, can't reassign the constant!
```

When a programmer is sure that a variable must never change, they can declare it with `const` to guarantee it and clearly communicate this fact to everyone.

### Uppercase constants

There is a widespread practice to use constants as aliases for difficult-to-remember values.

Such constants are named using capital letters and underscores.

For instance, let's make constants for colors in so-called "web" (hexadecimal) format:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Benefits:

- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype in `"#FF7F00"` than in `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But some constants are known before execution (like a hexadecimal value for red), they are also called "hard-coded" values, and for them we should use capital letters.

On the other hand, some constants are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance, in a web page:

```js
const pageLoadTime = /* time taken by a webpage to load */;
```

The value of `pageLoadTime` is not known before the execution, it's not "hard-coded", so it's not capitalized. But it's still a constant because it doesn't change after the assignment.

## Summary

We can declare variables to store data using `let` and `const` keywords.

- `let` -- is a modern variable declaration.
- `const` -- is like `let`, but the value of the variable can't be changed.

There's also `var` -- an old-school variable declaration, which we won't ever use.
