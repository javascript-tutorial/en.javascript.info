# Code structure

In this section we explore the code structure and statements.

[cut]
## Statements

We've already seen a statement: `alert('Hello, world!')`, which shows the message.

Another statement can be separated with a semicolon.

For example, here we split the message into two:

```js
//+ run no-beautify
alert( 'Hello' ); alert( 'World' );
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

**But it's important that "in most cases" does not mean "always" here!**

Consider this code as an example:

```js
//+ run no-beautify
alert(3 +
1
+ 2);
```

It outputs `6`.

JavaScript does not insert semicolons here. It is intuitively obvious that the first lines are an "uncomplete expression". JavaScript notes that and awaits the rest of the expression on the next line. And in this case that's actually fine and comfortable.

**But there are situations where JavaScript "fails" to assume a semicolon where it is really needed.**

Errors which come appear in such cases are quite hard to find and fix.

[smart header="An example of the error"]
For a curious reader who might be interested in a concrete example, check this code out:

```js
//+ run
[1, 2].forEach(alert)
```

It shows `1` then `2`. 

Please don't think about the meaning of `[...].forEach` just for now -- it does not matter here (we'll get it later). 

Now let's prepend an `alert` *without a semicolon* before it:

```js
//+ run no-beautify
alert( "..." ) // works
[1, 2].forEach(alert) // doesn't work!
```

Now only the phrase is shown, not the numbers. And we can see an error in the developer console. 

But everything's fine if we add a semicolon:
```js
//+ run
alert( "With the semicolon everything works" ); // printed
[1, 2].forEach(alert)  // printed too
```

The error in the former variant occurs because JavaScript engine does not autoinsert a semicolon before square brackets `[...]`, so it was actually treated as a one-line statement:

```js
//+ run no-beautify
// without semicolon after alert it becomes
alert( "..." )[1, 2].forEach(alert) // doesn't work!
```

[/smart]

As a conclusion, it's recommended to put semicolons between statements even if they are separated by newlines. This rule is widely adopted by the community.

## Comments

As the time goes, the program becomes more and more complex. It becomes necessary to add *comments* which describe what happens and why.

Comments can be put into any place of the script. They don't affect it's execution. The JavaScript engine simply ignores them.

*One-line comments* start with a double slash `//`. The text after them till the end of line is considered a comment.

It may occupy a full line of it's own or follow a statement.

Like this:
```js
//+ run
// This says "Hello" (the comment occupies a line of it's own)
alert( 'Hello' );

alert( 'World' ); // ...this says "World" (the comment follows a statement)
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

The content of comments is ignored, so if we put a code inside <code>/&#42; ... &#42;/</code> or after `//` it won't execute.

Sometimes it's used to temporarily disable a part of the code.

```js
//+ run
/* Commenting out the code
alert( 'Hello' );
*/
alert( 'World' );
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

Don't hesitate to comment. 

Comments increase the overall code footprint, but that's not a problem at all, because there are many tools which minify the code before publishing to production server and remove comments in the process.

There are various types of comments, answering different questions:

<ul>
<li>What the code does?</li>
<li>Why the code is written like that?</li>
<li>Which counter-intuitive or implicit connections it has with other parts of the script?</li>
</ul>


Further in the tutorial we'll make more notes about how to write the code better, easier to read and maintain. We'll also talk more about comments.

[smart header="The good code is inherently readable and self-commenting"]
Please note that the first type of comments ("what the code does") should be used to describe a "high-level" action, like the overall architecture, a function or a chunk of code. It's purpose is to give an overview, so a reader doesn't need to delve into the code and figure out.

Novice programmers sometimes tend to elaborate too much. Please don't. The good code is inherently readable. No need to describe what few lines do. Unless it's something hard to grasp, and *then* it's worth to consider rewriting the code at the first place rather than commenting it.
[/smart]

