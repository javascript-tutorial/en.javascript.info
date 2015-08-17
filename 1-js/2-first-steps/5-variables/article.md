# Variables

Depending on our aims, the script needs to work with the information.

If it's an online-shop -- that's going to be the goods and the card. If it's a chat -- visitors, message and so on.

Variables are used to store the information.

[cut]

## A variable

According to Wikipedia, a [variable]("https://en.wikipedia.org/wiki/Variable_(computer_science)") is a storage location paired with an associated symbolic name (identifier). The name is used to access the stored information.

To declare a variable in JavaScript, there are two keywords:

<ol>
<li>the `var` keyword comes from the ancient times.</li>
<li>the `let` keyword is a "modern school".</li>
</ol>

We'll start with `var`, because it is widely used in older scripts and we need to understand it. Later when we know enough to understand the subtle differences (when they actually matter for us) we'll move further to `let`.

The statement below creates (in other words: *declares* or *defines*) the variable `message`:

```js
var message;
```

Now we can assign some data into it:

```js
var message;
message = 'Hello'; // keep the string
```

The string is now saved into the associated memory area. We can access it using the variable name:

```js
//+ run
var message;
message = 'Hello!';

alert( message ); // shows the variable content
```

To be concise we can merge the variable declaration and assignment into a single line:

```js
var message = 'Hello!';
```

We can also declare multiple variables in one line:

```js
//+ no-beautify
var user = 'John', age = 25, message = 'Hello';
```

That might seem shorter, but it's recommended, for the sake of beter readability, to use a single line per variable.

This code is a bit longer, but easier to read:

```js
//+ no-beautify
var user = 'John';
var age = 25;
var message = 'Hello';
```

## Real-life analogy

We can easily grasp the concept of a "variable" if we imagine it as a "box" for the data, with the unique-named sticker on it.

For instance, the variable `message` -- is a box with the value `"Hello!" labelled `"message"`:

<img src="variable.png"> 

We can put any value into the box. And later -- we can change it.

The value can be changed as many times as we need:

```js
//+ run
var message;

message = 'Hello!';

message = 'World!'; // value changed

alert( message );
```

When the value is changed, the old data is removed from the variable:

<img src="variable-change.png">

We can also declare two variables and copy data from one into another.

```js
//+ run
var hello = 'Hello world!';

var message;

*!*
// copy value
message = hello;
*/!*

alert( hello ); // Hello world!
alert( message ); // Hello world!
```

[smart]
It may seem that the ability to change a value is natural, but it's really not so.

There also exist [functional](http://ru.wikipedia.org/wiki/%D0%AF%D0%B7%D1%8B%D0%BA_%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F) programming languages that forbid to change a variable once it's assigned. For example, [Scala](http://www.scala-lang.org/) and [Erlang](http://www.erlang.org/).

In such languages, once the value is in the box -- it's there forever. If we need to store something else -- please create a new box (declare a new variable), can't reuse the old one.

Though it may seem a little bit odd at the first sight, these languages are quite capable of serious development. More than that, there are areas like parallel computations where this limitation infers certain benefits. Studying of such a language (even if not planning to use soon) is recommended to broaden the mind.
[/smart]

## Variable naming [#variable-naming]

There are two limitations on the variable name in JavaScript:

<ol>
<li>The name must contain only letters, digits, symbols `$` and `_`.</li>
<li>The first character must not be a digit.</li>
</ol>

Valid name examples:

```js
var userName;
var test123;
```

When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another with the capital letter at start: `myVeryLongName`.

What's interesting -- the dollar sign `'$'` and the underscore `'_'` are considered ordinary symbols, just like letters.

These names are valid:

```js
//+ run untrusted
var $ = 1; // declared a variable with the name "$"
var _ = 2; // and now the variable with the name "_"

alert( $ + _ ); // 3
```

Examples of incorrect variable names:

```js
//+ no-beautify
var 1a; // cannot start with a digit

var my-name; // a hyphen '-' is not allowed in the name
```

[smart header="Case matters"]
Variables named `apple` and `AppLE` -- are two different variables.
[/smart]

[smart header="Non-english letters are allowed, but not recommended."]

It is possible to use cyrillic letters or even hieroglyphs, like this:

```js
//+ run
var имя = 123;
var 我 = 456;
```

Technically, there is no error here, but there is a tradition to use only latin alphabet in variable names.
[/smart]

[warn header="Reserved names"]
There is a list of reserved words, which cannot be used as variable names, because they are used by the language itself.

For example: `var, class, return, function` and alike are reserved.

The code below will give a syntax error:

```js
//+ run no-beautify
var return = 5; // error!
```
[/warn]


## Strict mode and "var"

Without strict mode, it is possible to create a variable without a `var`, by a mere assignment of the value:

```js
//+ run
num = 5; // the variable "num" is created if didn't exist

alert(num);
```

...But in `"use strict"` it is not allowed.

The code below will give an error:

```js
//+ run
"use strict";

*!*
num = 5; // error: num is not defined
*/!*
```

[smart header="Ensure that 'use strict' is at the top"]
Please make sure that `"use strict"` is on the top of the script, otherwise the strict mode may not be enabled.

There is no strict mode here:

```js
//+ run
var something;

"use strict"; // too late

*!*
num = 5; // no error, strict mode is not activated
*/!*
```
[/smart]

## Constants

Variables with a fixed value are called "constant variables" or just *constants*.

To declare a constant variable, one can use `const`:

```js
//+ run
'use strict';

const myBirthday = '18.04.1982';

color = '01.01.2001'; // error!
```

The code below can now calculate other values based on the constant, like the age or the sign of the zodiac. It can be sure that the calculations are always valid, because `myBirthday` never changes.

Please note that `const` variables actually *can be assigned*, but only once.

This is not an error:

```js
//+ run
'use strict';

const myBirthday;

myBirthday = '18.04.1982'; // the first assignment 
```


[smart header="CONSTANT_NAMING"]
There is a widespread practice to use constants as aliases for difficult-to-remember values. Such constants are named using capitals and underscores.

Like this:

```js
//+ run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

const a;
a = 5;

var color = COLOR_ORANGE;
alert( color ); // #FF7F00
```

`COLOR_ORANGE` is easy to understand and remember. It is much easier to grasp what `color = COLOR_ORANGE` means than `color = "#FF7F00"`.

Besides, it is much easier to make a typo in `"#FF7F00"` than in `COLOR_ORANGE`.

So, sometimes constants are used as aliases to complex values, to evade errors and make the code more readable.
[/smart]

## Summary

<ul>
<li>We must declare variables to store data. That can be done using `var` or `let`. As of now we can think that `let` is a newer alias of `var`, later we'll cover their differences in detail.</li>
<li>We can assign a value when the variable is declared: `var x = 10`.</li>
<li>If a variable is not going to change after assignment, it is called "a constant". We can use `const` keyword instead of `var` to declare constants.</li>
</ul>

And there's one more thing. The most important one.

Please name the variables sensibly.

Variable naming is one of the most important and complex skills in programming. Just looking at variable names can obviously show which code is written by a beginner and which by an experienced guru.

In the real project, most of time is spent not on writing of the completely new code, but rather on modifying and improving the existing one.

It might be not so obvious to the one who didn't write big things. Or to a freelances who writes a "read-only code" (write 5 lines, give to the customer, forget). But for the serious and especially team projects, that's always true.

It is much easier to find the information if it's well-labelled. Or, in other words, when the variables is named right. 

Please spend some time thinking about the right name for a variable before declaring it. That will repay you a lot.

[warn header="The name must always correspond to the data"]
There exist lazy programmers who instead of declaring a new variable, tend to reuse the existing one, write other data into it.

As the result, the variable is like a box where people throw different things without changing the sticker. What is inside it now? Who knows... We need to come closer and check.

Such a programmer saves a little bit on variable declaration, but looses ten times more on debugging the code.

An extra variable is good, not evil.
[/warn]
