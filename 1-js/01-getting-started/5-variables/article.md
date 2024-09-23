# Variables

If we want to create a JavaScript application bigger than "Hello, World", we need variables.

A [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) is a "named storage" for data.

For example:
1. An online shop -- variables can store information about goods being sold and a shopping cart.
2. A chat application -- variables store information about users, messages, and much more.

## Declaration

To create a variable in JavaScript, use the `let` keyword.

The statement below creates (in other words: *declares*) a variable with the name "message":

```js
let message;
```

One can think of a variable as a "box" for data, with a uniquely-named sticker on it.

We've just created such box:

![](variable-message.svg)

We can put any value in the box using an assignment `=`.

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
// copy 'Hello world' from hello
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
So, the variable should be declared once, and then we can assign to it (or use otherwise) without `let`.
````

```smart header="The outdated `var` keyword"
A long time ago, JavaScript used another keyword: `var` to declare variables. It still works.

However, there're subtle differences between `var` and `let`, in short: `let` is better, while `var` is an artifact from the past of JavaScript. Nowadays, people don't `var` it any more, so neither will we.

The only reason to mention `var` is that you may see it in some really old scripts.
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

// these variables are regular, such characters have no special meaning
console.log($ + _); // 3
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

console.log(num); // 5
```

This is a bad practice and would cause an error in strict mode:

```js run
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```
````
