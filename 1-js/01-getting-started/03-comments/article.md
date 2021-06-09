
# Comments

As time goes on, scripts tend to become more complex. We can add *comments* to describe what the code does and why.

Comments can be put into any place of a script. They don't affect its execution because the engine simply ignores them.

**One-line comments start with two forward slash characters `//`. The rest of the line is a comment.**

Such comment may occupy a full line of its own or follow a statement.

Like here:
```js run
// This comment occupies a line of its own
console.log("Hello");

console.log("World"); // This comment follows the statement
```

For longer, descriptive comments that span multiple lines, we can use the `/* ... */` syntax.

**Multiline comments start with a forward slash and an asterisk <code>/&#42;</code> and end with an asterisk and a forward slash <code>&#42;/</code>.**

Like this:

```js run
/* An example with two messages.
This is a multiline comment.
*/
console.log("Hello");
console.log("World");
```

The content of comments is ignored, so if we wrap a piece of code into `/* ... */`, it won't execute.

It can be handy to temporarily disable ("comment out") a part of code:

```js run
/* Commenting out the code
console.log("Hello");
*/
console.log("World");
```

```smart header="Use hotkeys!"
In most editors, a line of code can be commented out by pressing the `key:Ctrl+/` hotkey for a single-line comment and something like `key:Ctrl+Shift+/` -- for multiline comments (select a piece of code and press the hotkey). 

For Mac, try `key:Cmd` instead of `key:Ctrl` and `key:Option` instead of `key:Shift`.
```

````warn header="Nested comments are not supported!"
There may not be `/*...*/` inside another `/*...*/`.

Such code will die with an error:

```js run no-beautify
/*
  /* nested comment leads to an error! */
*/
console.log( "World" );
```
````

Please, don't hesitate to comment your code.

Comments increase the overall code footprint, but that's not a problem at all. There are many tools which minify code before publishing to a production server. They remove comments, so they don't appear in the working scripts. Therefore, comments do not have negative effects on production at all.
