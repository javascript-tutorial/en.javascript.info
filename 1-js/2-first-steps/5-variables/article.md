# Variables

Most of the time, script needs to work with the information.

If it's an online-shop -- that's going to be the goods and a shopping cart. If it's a chat -- visitors, messages and so on.

Variables are used to store the information.

[cut]

## A variable

A [variable]("https://en.wikipedia.org/wiki/Variable_(computer_science)") is defined as a "named storage" for the information. We can use variables to store the goods, visitors etc.

To create a variable in JavaScript, we need to use the `let` keyword.

The statement below creates (in other words: *declares* or *defines*) the variable with the name "message":

```js
let message;
```

Now we can put some data into it:

```js
let message;

*!*
message = 'Hello'; // store the string
*/!*
```

The string is now saved into the memory area assosiated with that variable. We can access it using the variable name:

```js run
let message;
message = 'Hello!';

*!*
alert( message ); // shows the variable content
*/!*
```

To be concise we can merge the variable declaration and assignment into a single line:

```js run
let message = 'Hello!';
alert( message ); // same as above
```

We can also declare multiple variables in one line:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

That might seem shorter, but it's recommended, for the sake of beter readability, to use a single line per variable.

The rewritten code is a bit longer, but easier to read:

```js no-beautify
let user = 'John';
let age = 25;
let message = 'Hello';
```

````smart header="`var` instead of `let`"
In older scripts you may also find another keyword: `var` instead of `let`:

```js
*!*var*/!* message = 'Hello';
```

The `var` keyword is *almost* the same as `let`. It also declares a variable, but in a slightly different, "old-school" fashion.

The subtle differences does not matter for us yet. We'll cover them in detail later.
````

## Real-life analogy

We can easily grasp the concept of a "variable" if we imagine it as a "box" for the data, with the unique-named sticker on it.

For instance, the variable `message` is a box with the value `"Hello!"` labelled `"message"`:

![](variable.png)

We can put any value into the box (variable). 

Also we can change it. The value can be changed as many times as we need:

```js run
let message;

message = 'Hello!';

message = 'World!'; // value changed

alert( message );
```

When the value is changed, the old data is removed from the variable:

![](variable-change.png)

We can also declare two variables and copy the data from one into the other.

```js run
let hello = 'Hello world!';

let message;

*!*
// copy 'Hello world' into message
message = hello;
*/!*

// now two variables have the same data
alert( hello ); // Hello world!
alert( message ); // Hello world!
```

```smart header="Functional languages"
It may be interesting to know that there also exist [functional](http://ru.wikipedia.org/wiki/%D0%AF%D0%B7%D1%8B%D0%BA_%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F) programming languages that forbid to change a variable value. For example, [Scala](http://www.scala-lang.org/) or [Erlang](http://www.erlang.org/).

In such languages, once the value is "in the box" -- it's there forever. If we need to store something else -- the language forces to create a new box (declare a new variable), we can't reuse the old one.

Though it may seem a little bit odd at the first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation infers certain benefits. Studying of such a language (even if you're not planning to use it soon) is recommended to broaden one's mind.
```

## Variable naming [#variable-naming]

There are two limitations for the variable name in JavaScript:

1. The name must contain only letters, digits, symbols `$` and `_`.
2. The first character must not be a digit.

Valid names, for instance:

```js
let userName;
let test123;
```

When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word starts with a capital letter: `myVeryLongName`.

What's interesting -- the dollar sign `'$'` and the underscore `'_'` are considered ordinary symbols, just like letters.

These names are valid:

```js run untrusted
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now the variable with the name "_"

alert( $ + _ ); // 3
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

Technically, there is no error here, such names are allowed, but there is an international tradition to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People coming with another language background may need to read it some time.
````

````warn header="Reserved names"
There is a list of reserved words, which cannot be used as variable names, because they are used by the language itself.

For example, words `let`, `class`, `return`, `function` are reserved.

The code below will give a syntax error:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```
````

## Non-Strict mode assignment

Without strict mode, it is possible to create a variable without a `let`, by a mere assignment of the value:

```js run no-strict
num = 5; // the variable "num" is created if didn't exist

alert(num);
```

...But that is an old feature of the language, kept for compatibility with the old scripts. It's usage has been frowned-upon for a long time. It's an error in the strict mode.

The code with `"use strict"` will give an error:

```js run untrusted
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```


## V8 needs "use strict" for "let"

In Chrome browser, Opera and Node.JS, powered by V8 engine, `"use strict"` is required if we want to use `let` and many other modern features of the language.

Here in the tutorial most examples are executed in the strict mode (except rare cases which are described in the text as "without use strict").

But when you write JS, make sure that you do not forget `"use strict"`. Otherwise V8 will remind you about it by giving an error on `let`.

## Constants

Variables with a fixed value are called "constant variables" or just *constants*.

To declare a constant variable, one can use `const`:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```

A constant variable never changes, so the further code can rely on that to calculate dependant values. For example, the age or a sign of the zodiac.

```js run
const myBirthday = '18.04.1982';

// do some calculations to get the age
const age = calculateAgeBasedOn(myBirthday);
```

Surely, the `age` is constant too. And it always corresponds to `myBirthday`, both constants are not going to change.

### Uppercases constants

There is a widespread practice to use constants as aliases for difficult-to-remember and hard-coded prior to execution values. 

Such constants are named using capitals and underscores.

Like this:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

let color = COLOR_ORANGE;
alert( color ); // #FF7F00
```

`COLOR_ORANGE` is much easier to understand and remember than `"#FF7F00"`. Also it is much easier to make a typo in `"#FF7F00"` than in `COLOR_ORANGE`. 

Such uppercased name is only used for constants that are "hard-coded" (written in the code before its execution). 

An example of the opposite is a constant which value is calculated basing on a webpage content or a user input.


## Name things right

We're almost done with the initial understanding of variables, but there's one more thing.

Please name the variables sensibly.

Variable naming is one of the most important and complex skills in programming. Just looking at variable names can obviously show which code is written by a beginner and which by an experienced guru.

In the real project, most of time is spent on modifying and extending the existing code, rather than writing something completely torn-off of the current base.

And when we return to the code after some time of absence, it's much easier to find the information that is well-labelled. Or, in other words, when the variables are named right.

Please spend some time thinking about the right name for a variable before declaring it. That will repay you a lot.

Few good-to-follow rules are:

- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names `a`, `b`, `c`, unless you really know what you're doing.
- Make the name maximally descriptive and concise. Examples of bad names are `data` and `value`. Any variable stores a "data" or a "value" after all. So such name says nothing. It is only ok to use them if it's exceptionally obvious which data or value is meant.
- Agree on terms within the team and in your own mind. If a site visitor is called a "user" then we should name variables like `currentUser` or `newUser`, but not `currentVisitor` or a `newManInTown`.

Sounds simple? Indeed it is. But creating good descriptive-and-concise names in practice is not. Go for it.

```smart header="Reuse or create?"
And the last piece of advice. There are some lazy programmers who instead of declaring a new variable, tend to reuse the existing one.

As the result, the variable is like a box where people throw different things without changing the sticker. What is inside it now? Who knows... We need to come closer and check.

Such a programmer saves a little bit on variable declaration, but looses ten times more on debugging the code.

An extra variable is good, not evil. 

P.S. Modern JavaScript minifiers and browsers optimize code well enough so that won't create a performance issue.
```

## Summary

We can declare variables to store data. That can be done using `var` or `let` or `const`.

- `let` -- is a modern variable declaration. The code must be in strict mode to use `let` in Chrome (V8).
- `var` -- is an old-school variable declaration. We'll study the subtle differences from `let` later.
- `const` -- is like `let`, but the variable can't be changed.

Variables should be named in a way that allows to easily understand what's inside.