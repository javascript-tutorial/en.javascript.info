
# Hello, world!

Let's start coding!

You can do it right here, in this tutorial, using the code editor at the right side of this text (if you're using a narrow screen, then use a toggler at the page bottom to switch to the editor).

Try something, for example type `console.log("Hello, world!")` and click "Run".

This is a *statement* that outputs a string `"Hello, world!"`. You can see the output produced by this command in the "Console" tab at the bottom.


TODO: arrow with "statement"

```js
console.log('Hello');
```

## Statements

Statements are syntax constructs and commands that perform actions.

We've already seen a statement, `console.log('Hello, world!')`, which shows the message "Hello, world!".

We can have as many statements in our code as we want. Statements can be separated with a semicolon.

For example, let's split "Hello World" into two outputs:

TODO: arrows with "statement"

```js run no-beautify
*!*console.log('Hello')*/!*; *!*console.log('World')*/!*;
```

A semicolon signals the end of the first statement, so that we can start with the second.

Usually, statements are written on separate lines to make the code more readable:

```js run no-beautify
console.log('Hello');
console.log('World');
```

### Are semicolons necessary? [#semicolon]

A newline usually implies a semicolon. In other words, when a line ends, JavaScript automatically assumes that there's a semicolon there. This language feature is called an [automatic semicolon insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion).

The same code will still work if we cut out the semicolons:

```js run no-beautify
console.log('Hello')
console.log('World')
```


However, there are situations when a newline doesn't mean a statement end.

Such as this:

```js run no-beautify
console.log(3 +
1
+ 2);
```

This is a single statement which spans on multiple lines. It outputs `6`.

It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression", so a semicolon there is not needed.

JavaScript has intricate internal rules to figure out rare cases a newline doesn't mean the "statement end", but they are not 100% reliable. In this particular case it gets things right. However, it's not always so.

To avoid any issues, it's recommended to be explicit: always put a semicolon at a statement end.

````smart header="An example of an error caused by an omitted semicolon"
Let's see an example of a situation when JavaScript syntax rules do not align with a programmer's intention, and an omitted semicolon causes an error.

Run this code:

```js run
console.log("Hello");

[1, 2].forEach(console.log);
```

No need to think about the meaning of the brackets `[]` and `forEach` yet. We'll study them later. For now, just remember the result of running the code: it shows `Hello`, then two more lines.

Now let's say a lazy programmer forgot to put the semicolon after the `console.log`:

```js run no-beautify
console.log("Hello")

[1, 2].forEach(console.log);
```

The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.

If we run this code, only the first `Hello` shows and no more lines – that's because of an error.

In our last example, JavaScript assumes that a square bracket `[` means that the expression has not ended yet, and so doesn't auto-insert the semicolon, similar to the plus `+` character before.

So, the code in the last example is treated as a single statement.

Here's how the engine sees it:

```js run no-beautify
console.log("Hello")[1, 2].forEach(console.log);
```

Looks weird, right? Such merging in this case is just wrong. We need to put a semicolon after `console.log` for the code to work correctly.

This can happen in other situations also.
````

We recommend putting semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community. To put it short -- *it is possible* to leave out semicolons most of the time. But it's safer -- especially for a beginner -- to use them.

## Comments [#code-comments]

As time goes on, programs become more and more complex. It becomes necessary to add *comments* which describe what the code does and why.

Comments can be put into any place of a script. They don't affect its execution because the engine simply ignores them.

**One-line comments start with two forward slash characters `//`.**

The rest of the line is a comment. It may occupy a full line of its own or follow a statement.

Like here:

TODO: comment picture

```js run
*!*
// This comment occupies a line of its own
*/!*
console.log('Hello');

console.log('World'); *!*// This comment follows the statement*/!*
```

**Multiline comments start with a forward slash and an asterisk <code>/&#42;</code> and end with an asterisk and a forward slash <code>&#42;/</code>.**

Like this:

TODO: comment picture

```js run
*!*
/* An example with two messages.
This is a multiline comment.
*/
*/!*
console.log('Hello');
console.log('World');
```

The content of comments is ignored, so if we put code inside <code>/&#42; ... &#42;/</code>, it won't execute.

Sometimes it can be handy to temporarily disable ("comment out") a part of code:

TODO: comment picture

```js run
*!*
/*
console.log('Hello');
*/
*/!*
console.log('World');
```

```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). For Mac, try `key:Cmd` instead of `key:Ctrl` and `key:Option` instead of `key:Shift`.
```

````warn header="Nested comments are not supported!"
There may not be `/*...*/` inside another `/*...*/`.

Such code will exit with a syntax error:

```js run no-beautify
/*
  /* nested comment ?!? */
*/
console.log( 'World' );
```
````

Please, don't hesitate to comment your code.

Comments increase the overall code length, but that's not a problem at all. There are many tools which minify code before publishing to a production server. They remove comments, so they don't appear in the working scripts. Therefore, comments do not have negative effects on production at all.

## Strict mode

...And a one more minor thing.

Sometimes you may see scripts starting with the line `"use strict";`.

```js
"use strict";

// ...the code...
```

This is a so-called "strict directive". It switches the script to the "strict mode", which actually isn't that strict. It simply switches a few language features to behave in modern and correct way.

This mode is enabled automatically when a script uses modules, classes and some other modern syntax. So this directive is rarely needed.

However, if you run a very simple script without this directive, for example just to test how things work, then it may run in the "old mode".

To avoid confusion, we will specifically mention language features which behave differently in the old mode. Luckily, there're only a few of them, and the difference is small.

All code in this tutorial assumes strict mode, unless specified otherwise.
