
# Basic concepts

Let's take a piece of JavaScript code and discuss it line by line.

Please don't hesitate to open "read more" sections below. They aren't strictly required, but contain valueable information.

```js run
"use strict";

let message = "Hello!";

alert(message);
```

Click the "run" icon ▷ in the right-upper corner to see how it works.

Now we'll go over it line by line.

## Strict mode

The first line:

```js
"use strict";
```

The code starts with the special directive: `"use strict"`. 

To understand what it means, let's make a short dive into the history of JavaScript.

JavaScript appeared many years ago, in 1995. For a long time, it evolved without compatibility issues. New features were added to the language while old functionality didn't change.

That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript's creators got stuck in the language forever.

This was the case until 2009, when the 5th version of the standard appeared. It added new features to the language and modified some of the existing ones. 

Now the important part. 

**To keep the old code working, these modernizations are off by default.** We need to explicitly enable them with a special directive: `"use strict"`

With that directive on top the script runs in so-called "strict mode". Or, we'd better say "modern mode", because that's what it essentially is.

![](use-strict.svg)

Some JavaScript features enable strict mode automatically, e.g. classes and modules, so that we don't need to write `"use strict"` for them. We'll cover these features later.

**Here, in the tutorial, we'll always use strict mode, unless explicitly stated otherwise.**

We're studying modern JavaScript after all. But you'll also see notes about how things work without `use strict`, just in case you come across an old script.

## Variables

A [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) is a "named storage" for data. We can use variables to store goodies, visitors, and so on.

The second line declares (creates) a variable with the name `message` and stores the string `"John"` in it:

```js
let message = "Hello!";
```

We could also split this line into two:

```js
let message;
message = "Hello!";
```

Here, we first declare the variable with `let message`, and then assign the value.

We can easily grasp the concept of a "variable" if we imagine it as a "box" for data, with a uniquely-named sticker on it.

For instance, the variable `message` can be imagined as a box labeled `"message"` with the value `"Hello!"` in it:

![](variable.svg)

We can put any value in the box.

We can also change it as many times as we want:
```js
let message;

message = "Hello!";

message = "World!"; // value changed
```

When the value is changed, the old data is removed from the variable:

![](variable-change.svg)

We can also declare multiple variables and copy data from one into another.

```js run
let hello = "Hello!";

let message;

*!*
// copy the value "Hello!" from hello into message
message = hello;
*/!*
```

Now we have two variables, both store the same string:

![](variable-copy-value.svg)

````warn header="Re-declaration triggers an error"
A variable can be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "One";

// repeated 'let' leads to an error
let message = "Two"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

````warn header="Omitting `let` is possible without `use strict`"
In the old times, it was possible to create a variable by a mere assignment of the value without using `let`. This still works now if the script runs in the "compatibility mode", without `use strict`:

```js run no-strict
// note: no "use strict" in this example

num = 5; // the variable "num" is created if it didn't exist

alert(num); // 5
```

This is a bad practice and would cause an error in strict mode.
````

### Variable naming

There are two limitations on variable names in JavaScript:

1. The name must contain only letters, digits, or the symbols `$` and `_`.
2. The first character must not be a digit.

Examples of valid names:

```js
let userName;
let test123;
```

When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word after the first one starts with a capital letter: `myVeryLongName`.

Examples of incorrect variable names:

```js no-beautify
let 1a; // cannot start with a digit

let my-name; // hyphens '-' aren't allowed in the name
```

```smart header="Case matters"
Variables named `apple` and `AppLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including cyrillic letters or even hieroglyphs, like this:

```js
let имя = "...";
let 我 = "...";
```

Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if you're writing a small script, it may have a long life ahead. People from other countries may need to read it in the future.
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

### Other ways to declare a variable

Besides `let`, there are two other keywords that declare a variable:

- `var` (e.g. `var message`) -- the outdated way to declare a variable, you can meet it in really old scripts. 
    Please don't use it.
- `const` (e.g. `const message`) -- declares a *constant* variable.

A constant variable must be declared with the initial value, and afterwards it can't be reassigned.

For example:
```js run
const birthday = "18.04.1982"; 

birthday = "01.01.1970"; // Error: Assignment to constant variable.
```

A person might change their name, but not the birthday. The idea of `const` is to let everyone (including the JavaScript engine)¸know about it.

## Statements and semicolons

The third line of our code is:

```js
alert(message);
```


<hr>



It means that the script should run in the "strict mode". 

Historically, 

If we omit it, then some language features will work a little bit differently. We'll mention the differences later as


 or, in other words, in the modern mode of execution.

There are basically two modes of script execution of a script:
- The "strict mode", .
- The "strict mode".

What does it mean?

Well, 


There was a time long ago when JavaScript was a bit different language. 

The core elements of scripts are statements. 

Statements are syntax constructs and commands that perform actions, make JavaScript "do" something.

Here's an example of a statement:

```js run
alert('Hello, world!');
```

Click the "run" icon ▷ in the right-upper corner to see how it works.

We can have as many statements in our code as we want. 

Statements can be separated with a semicolon.

For example, here we split "Hello World" into two alerts:

```js run no-beautify
alert('Hello'); alert('World');
```

Usually, statements are written on separate lines to make the code more readable:

```js run no-beautify
alert('Hello');
alert('World');
```

A semicolon may be omitted in most cases when a line break exists.

This would also work:

```js run no-beautify
alert('Hello')
alert('World')
```

Here, JavaScript interprets the line break as an "implicit" semicolon. This is called an [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

**In most cases, a newline implies a semicolon. But "in most cases" does not mean "always"!**

There are cases when a newline does not mean a semicolon. 

For example:

```js run no-beautify
alert(1 +
2);
```

The code outputs `3` because JavaScript does not insert semicolons after the plus `+`. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an incomplete expression, that's continued on the next line. And in this case that works as intended.

**But there are situations where JavaScript "fails" to assume a semicolon where it is really needed.**

**TODO: The section below is optional, so it's collapsed by default - make it a hint on first open?**

**TODO: design this.**

````spoiler header="Read more about it"

If you're curious to see a concrete example of such an error, check this code out:

```js run
[1, 2].forEach(alert)
```

If the code is too complex to understand, that's all right. You don't have to.

All you need now is to run the code and remember the result: it shows `1` then `2`.

Let's add an `alert` before the code and *not* finish it with a semicolon:

```js run no-beautify
alert("Without a semicolon after me - error")

[1, 2].forEach(alert)
```

Now if you run the code, only the first `alert` is shown and then there's an error!

...But everything becomes fine again we add a semicolon after the `alert`:
```js run
alert("With a semicolon after me - all ok");

[1, 2].forEach(alert)  
```

The error in the no-semicolon variant occurs because JavaScript doesn't "auto-insert" a semicolon on a newline before square brackets `[...]`.

So, because the semicolon is not auto-inserted, the code in the first example is treated as a single statement. Here's how the engine sees it:

```js run no-beautify
alert("There will be an error")[1, 2].forEach(alert)
```

But such a merge in this case is just wrong, hence the error. This can happen in other situations as well.
````


We recommend putting semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community. Let's note once again -- *it is possible* to leave out semicolons most of the time. But it's safer -- 
especially for a beginner -- to use them.

## Comments

As time goes on, programs become more and more complex. It becomes necessary to add *comments* which describe what the code does and why.

Comments can be put into any place of a script. They don't affect its execution because the engine simply ignores them.

**One-line comments start with two forward slash characters `//`.**

The rest of the line is a comment. It may occupy a full line of its own or follow a statement.

Like here:
```js run
// This comment occupies a line of its own
alert('Hello');

alert('World'); // This comment follows the statement
```

**Multiline comments start with a forward slash and an asterisk <code>/&#42;</code> and end with an asterisk and a forward slash <code>&#42;/</code>.**

Like this:

```js run
/* An example with two messages.
This is a multiline comment.
*/
alert('Hello');
alert('World');
```

The content of comments is ignored, so if we put code inside <code>/&#42; ... &#42;/</code>, it won't execute.

Sometimes it can be handy to temporarily disable a part of code:

```js run
/* Commenting out the code
alert('Hello');
*/
alert('World');
```

```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). For Mac, try `key:Cmd` instead of `key:Ctrl` and `key:Option` instead of `key:Shift`.
```

````warn header="Nested comments are not supported!"
There may not be `/*...*/` inside another `/*...*/`.

Such code will die with an error:

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````

Please, don't hesitate to comment your code.

Comments increase the overall code footprint, but that's not a problem at all. There are many tools which minify code before publishing to a production server. They remove comments, so they don't appear in the working scripts. Therefore, comments do not have negative effects on production at all.

Later in the tutorial there will be a chapter <info:code-quality> that also explains how to write better comments.
