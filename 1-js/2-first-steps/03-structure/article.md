# Code structure

The first overall thing to know is the code structure.

[cut]

## Statements

The code consists of [statements](https://en.wikipedia.org/wiki/Statement_(computer_science)) -- syntax constructs and commands to perform actions.

We've already seen a statement `alert('Hello, world!')`, which shows the message.

We can have as many statements in the code as we want. Another statement can be separated with a semicolon.

For example, here we split the message into two:

```js run no-beautify
alert( 'Hello' ); alert( 'World' );
```

Usually each statement is written on a separate line -- thus the code becomes more readable:

```js run no-beautify
alert( 'Hello' );
alert( 'World' );
```

## The semicolon [#semicolon]

The semicolon may be omitted in most cases when a line break exists.

This would also work:

```js run no-beautify
alert( 'Hello' )
alert( 'World' )
```

In this case JavaScript interprets the line break as a splitter. Just as if there were a semicolon between the lines.

**But it's important that "in most cases" does not mean "always"!**

There are cases when a newline does not mean a semicolon, for example:

```js run no-beautify
alert(3 +
1
+ 2);
```

The code outputs `6`, because JavaScript does not insert semicolons here. It is intuitively obvious that if the line ends with a plus `"+"`, then it is an "incomplete expression". And in this case that's actually fine and comfortable.

**But there are situations where JavaScript "fails" to assume a semicolon break where it is really needed.**

Errors which come appear in such cases are quite hard to find and fix.

````smart header="An example of the error"
For a curious reader who might be interested in a concrete example, check this code out:

```js run
[1, 2].forEach(alert)
```

It shows `1` then `2`.

No need to think about the meaning of the brackets `[]` and `forEach` just for now -- it does not matter here. Let's just remember the result.

Now we prepend an `alert` statement *not followed by a semicolon*:

```js run no-beautify
alert( "There will be an error" ) // shown
[1, 2].forEach(alert) // doesn't work!
```

Now if we run it, only the first `alert` is shown, and then an error.

But everything's fine if we add a semicolon:
```js run
alert( "All fine now" ); // shown
[1, 2].forEach(alert)  // then this too
```

The error in the former variant occurs because JavaScript engine does not assume a semicolon before square brackets `[...]`, so the code is actually treated as a one-line statement:

```js run no-beautify
alert( "There will be an error" )[1, 2].forEach(alert) 
```

And in this particular case, that's just wrong. Hence the error.

````

It's recommended to put semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community. Let's note once again -- it is possible to leave out semicolons most of time. But it's safer, especially for a beginner -- to put them.

## Comments

As the time goes, the program becomes more and more complex. It becomes necessary to add *comments* which describe what happens and why.

Comments can be put into any place of the script. They don't affect the execution, because the engine simply ignores them.

**One-line comments start with the two slash characters `//`.**

The rest of the line is a comment. It may occupy a full line of its own or follow a statement.

Like this:
```js run
// This shows "Hello" (the comment occupies a line of its own)
alert( 'Hello' );

alert( 'World' ); // ...this shows "World" (the comment follows a statement)
```

**Multiline comments start with a slash and a star <code>"/&#42;"</code> and end with a star and a slash <code>"&#42;/"</code>.**

Like this:

```js run
/* An example with two messages.
This is a multiline comment.
*/
alert( 'Hello' );
alert( 'World' );
```

The content of comments is ignored, so if we put a code inside <code>/&#42; ... &#42;/</code> or after `//` it won't execute.

Sometimes it comes handy to temporarily disable a part of the code:

```js run
/* Commenting out the code
alert( 'Hello' );
*/
alert( 'World' );
```

```smart header="Use hotkeys!"
In most editors a line of code can be commented out by `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a code and press the hotkey).
```

````warn header="Nested comments are not supported!"
There may not be comments inside comments.

This code will die with an error:

```js run no-beautify
/*
  /* nested comment ?!? */
*/
alert( 'World' );
```
````

Please, don't hesitate to comment your code.

Comments increase the overall code footprint, but that's not a problem at all. There are many tools which minify the code before publishing to production server. They remove comments, so they do not appear in the working scripts. So, the comments do not have any negative effects on production at all.

Further in the tutorial we'll make more notes about how to write the code better, easier to read and maintain. We'll also talk more about comments.

