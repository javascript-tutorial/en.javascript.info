# Variables

Most of the time, a JavaScript application needs to work with information. Here are 2 examples:
1. An online-shop -- the information might include goods being sold and a shopping cart. 
2. A chat application -- the information might include users, messages, and much more.

Variables are used to store this information.

[cut]

## A variable

A [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) is a "named storage" for data. We can use variables to store goodies, visitors and other data.

To create a variable in JavaScript, we need to use the `let` keyword.

The statement below creates (in other words: *declares* or *defines*) a variable with the name "message":

```js
let message;
```

Now we can put some data into it by using the assignment operator `=`:

```js
let message;

*!*
message = 'Hello'; // store the string
*/!*
```

The string is now saved into the memory area associated with the variable. We can access it using the variable name:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // shows the variable content
*/!*
```

To be concise we can merge the variable declaration and assignment into a single line:

```js run
let message = 'Hello!'; // define the variable and assign the value

alert(message); // Hello!
```

We can also declare multiple variables in one line:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

That might seem shorter, but it's not recommended. For the sake of better readability, please use a single line per variable.

The multiline variant is a bit longer, but easier to read:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Some people also write many variables like that:
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...Or even in the "comma-first" style:

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Technically, all these variants do the same. So, it's a matter of personal taste and aesthetics.


````smart header="`var` instead of `let`"
In older scripts you may also find another keyword: `var` instead of `let`:

```js
*!*var*/!* message = 'Hello';
```

The `var` keyword is *almost* the same as `let`. It also declares a variable, but in a slightly different, "old-school" fashion.

There are subtle differences between `let` and `var`, but they do not matter for us yet. We'll cover them in detail later, in the chapter <info:var>.
````

## A real-life analogy

We can easily grasp the concept of a "variable" if we imagine it as a "box" for data, with a uniquely-named sticker on it.

For instance, the variable `message` can be imagined as a box labelled `"message"` with the value `"Hello!"` in it:

![](variable.png)

We can put any value into the box.

Also we can change it. The value can be changed as many times as needed:

```js run
let message;

message = 'Hello!';

message = 'World!'; // value changed

alert(message);
```

When the value is changed, the old data is removed from the variable:

![](variable-change.png)

We can also declare two variables and copy data from one into the other.

```js run
let hello = 'Hello world!';

let message;

*!*
// copy 'Hello world' from hello into message
message = hello;
*/!*

// now two variables hold the same data
alert(hello); // Hello world!
alert(message); // Hello world!
```

```smart header="Functional languages"
It may be interesting to know that there also exist [functional](https://en.wikipedia.org/wiki/Functional_programming) programming languages that forbid changing a variable value. For example, [Scala](http://www.scala-lang.org/) or [Erlang](http://www.erlang.org/).

In such languages, once the value is stored "in the box", it's there forever. If we need to store something else, the language forces us to create a new box (declare a new variable). We can't reuse the old one.

Though it may seem a little bit odd at first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation confers certain benefits. Studying such a language (even if not planning to use it soon) is recommended to broaden the mind.
```

## Variable naming [#variable-naming]

There are two limitations for a variable name in JavaScript:

1. The name must contain only letters, digits, symbols `$` and `_`.
2. The first character must not be a digit.

Valid names, for instance:

```js
let userName;
let test123;
```

When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word starts with a capital letter: `myVeryLongName`.

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

let my-name; // a hyphen '-' is not allowed in the name
```

```smart header="Case matters"
Variables named `apple` and `AppLE` -- are two different variables.
```

````smart header="Non-english letters are allowed, but not recommended"
It is possible to use any language, including cyrillic letters or even hieroglyphs, like this:

```js
let имя = '...';
let 我 = '...';
```

Technically, there is no error here, such names are allowed, but there is an international tradition to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it some time.
````

````warn header="Reserved names"
There is a list of reserved words, which cannot be used as variable names, because they are used by the language itself.

For example, words `let`, `class`, `return`, `function` are reserved.

The code below gives a syntax error:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```
````

````warn header="An assignment without `use strict`"

Normally, we need to define a variable before using it. But in the old times, it was technically possible to create a variable by a mere assignment of the value, without `let`. This still works now if we don't put `use strict`. The behavior is kept for compatibility with old scripts.

```js run no-strict
// note: no "use strict" in this example

num = 5; // the variable "num" is created if didn't exist

alert(num); // 5
```

That's a bad practice, it gives an error in the strict mode:

```js run untrusted
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```

````

## Constants

To declare a constant (unchanging) variable, one can use `const` instead of `let`:

```js
const myBirthday = '18.04.1982';
```

Variables declared using `const` are called "constants". They cannot be changed. An attempt to do it would cause an error:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```

When a programmer is sure that the variable should never change, he can use `const` to guarantee it, and also to clearly show that fact to everyone.


### Uppercase constants

There is a widespread practice to use constants as aliases for difficult-to-remember values that are known prior to execution.

Such constants are named using capital letters and underscores.

Like this:

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

When should we use capitals for a constant, and when should we name them normally? Let's make that clear.

Being a "constant" just means that the value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red), and there are those that are *calculated* in run-time, during the execution, but do not change after the assignment.

For instance:
```js
const pageLoadTime = /* time taken by a webpage to load */;
```

The value of `pageLoadTime` is not known prior to the page load, so it's named normally. But it's still a constant, because it doesn't change after assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.  

## Name things right

Talking about variables, there's one more extremely important thing.

Please name the variables sensibly. Take time to think if needed.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code is written by a beginner and which by an experienced developer.

In a real project, most of the time is spent on modifying and extending the existing code base, rather than writing something completely separate from scratch. And when we return to the code after some time of doing something else, it's much easier to find information that is well-labelled. Or, in other words, when the variables have good names.

Please spend some time thinking about the right name for a variable before declaring it. That will repay you a lot.

Some good-to-follow rules are:

- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you're doing.
- Make the name maximally descriptive and concise. Examples of bad names are `data` and `value`. Such a name says nothing. It is only ok to use them if it's exceptionally obvious from the context which data or value is meant.
- Agree on terms within your team and in your own mind. If a site visitor is called a "user" then we should name related variables like `currentUser` or `newUser`, but not `currentVisitor` or a `newManInTown`.

Sounds simple? Indeed it is, but creating good descriptive-and-concise names in practice is not. Go for it.

```smart header="Reuse or create?"
And the last note. There are some lazy programmers who, instead of declaring a new variable, tend to reuse the existing ones.

As a result, the variable is like a box where people throw different things without changing the sticker. What is inside it now? Who knows... We need to come closer and check.

Such a programmer saves a little bit on variable declaration, but loses ten times more on debugging the code.

An extra variable is good, not evil.

Modern JavaScript minifiers and browsers optimize code well enough, so it won't create performance issues. Using different variables for different values can even help the engine to optimize.
```

## Summary

We can declare variables to store data. That can be done using `var` or `let` or `const`.

- `let` -- is a modern variable declaration. The code must be in strict mode to use `let` in Chrome (V8).
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.

Variables should be named in a way that allows us to easily understand what's inside.
