# Code structure

In this section we explore the code structure and statements.

[cut]
## Statements

We've already seen an example of a statement: `alert('Hello, world!')` shows the message.

To add one more statement to the code, it can be separated with a semicolon.

Let's make split the message into two messages:

```js
//+ run no-beautify
alert('Hello'); alert('World');
```

Usually each statement is written on a separate line -- thus the code becomes more readable:

```js
//+ run no-beautify
alert( 'Hello' ); 
alert( 'World' );
```

## The semicolon [#semicolon]

The semicolon may be omitted in most cases when a line break exists.

This would also work:

```js
//+ run no-beautify
alert( 'Hello' ) 
alert( 'World' )
```

In this case JavaScript interprets the line break as a splitter and automatically assumes a "virtual" semicolon between them.

**But it's important that "in most cases" does not mean "always"!**

Consider this code as an example:

```js
//+ run no-beautify
alert(3 +
1
+ 2);
```

It outputs `6`.

JavaScript does not insert semicolons here. It is intuitively obvious that the reason is the "uncomplete expression". JavaScript notes that the line ends with a plus `+` and awaits the expression to continue on the next line. And that is actually fine and comfortable here.

**But there are situations where "fails" to assume a semicolon where it is really needed.**

Errors which come appear in such cases are quite hard to find and fix.

[smart header="An example of the error"]
For a curious reader who might be interested in a concrete example, check this code out:

```js
//+ run
[1, 2].forEach(alert)
```

It shows `1` then `2`. How it works -- does not matter now, we'll get deal with it later.

But let's insert an `alert` without a semicolon before it:

```js
//+ run no-beautify
alert( "Without a semicolon we get an error here" )
[1, 2].forEach(alert)
```

Now only the first `alert` is shown, not the numbers. And we can see an error in the browser console. That's actually because JavaScript does not insert a semicolon before square brackets `[...]` and misinterprets the code.

Everything's fine if we add a semicolon:
```js
//+ run
alert( "With the semicolon everything works" );
[1, 2].forEach(alert)
```
[/smart]

As a conclusion, it's recommended to put semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community.

## Comments

As the time goes, the program becomes more and more complex. It becomes necessary to add *comments* which describe what happens and why.

Comments can be put into any place of the script. They don't affect it's execution. The JavaScript interpreter simply ignores them.

*One-line comments* start with a double slash `//`. The text after them till the end of line is considered a comment.

It may occupy a full line of it's own or follow a statement, like this:
```js
//+ run
// The statement below outputs a word "Hello"
alert( 'Hello' );

alert( 'World' ); // ...The second word is shown separately.
```

*Multiline comments* start with a slash and a star <code>"/&#42;"</code> and end with a star and a slash <code>"&#42;/"</code>, like this:

```js
//+ run
/* An example with two messages.
This is a multiline comment.
*/
alert( 'Hello' );
alert( 'World' );
```

All contents of comments is ignored. If we put a code inside <code>/&#42; ... &#42;/</code> or after `//` it won't execute.

```js
//+ run
/* Commenting out the code
alert( 'Привет' );
*/
alert( 'Мир' );
```

[smart header="Use hotkeys!"]
In most editors a line of code can be commented out by [key Ctrl+/] hotkey for a single-line comment and something like [key Ctrl+Shift+/] -- for multiline comments (select a code and press the hotkey).
[/smart]
 
[warn header="Nested comments are not supported!"]
There may not be comments inside comments. 

This code will die with an error:

```js
//+ run no-beautify
/* 
  /* nested comment ?!? */
*/
alert( 'World' );
```
[/warn]

Don't hesitate to comment. They more code is in the project -- the more helpful good comments are. 

Comments increase the overall code footprint, but that's not a problem at all, because there are many tools which minify the code before publishing to production server and remove comments in the process.

In our next sections we'll talk about other structure elements of JavaScript like blocks, variables and more.

