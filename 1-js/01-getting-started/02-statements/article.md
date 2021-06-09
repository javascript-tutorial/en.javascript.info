
# Statements

Just like a human speech consists of sentences, JavaScript code consists of *statements*.

Here's an example of a statement:

```js run
console.log("Hello, world!");
```

Click the "run" icon ▷ in the right-upper corner to see how it works.

In this particular statement `console.log` is the command to show a message, and `"Hello, world!"` is the string to show. We'll learn more about commands and strings soon.

We can have as many statements as we want. 

For example, let's make it two separate messages, one after the other:

```js run
console.log("Hello"); console.log("World");
```

Usually, statements are written on separate lines to make the code more readable, like this:

```js run no-beautify
console.log("Hello");
console.log("World");
```

Please note: every statement ends with a semicolon `;`.

## Semicolons..or not?

Technically, a semicolon may be unnecessary, if there's a line break between statements.

Here's the same code as above, but without semicolons:

```js run no-beautify
console.log("Hello")
console.log("World")
```

It also works, because usually JavaScript interprets a line break as an "implicit" semicolon. This language feature is called the "semicolon auto-insertion".

There are exceptions for that auto-insertion, for example:

```js run no-beautify
console.log(1 +
2);
```

This code outputs `3`, same as a single-line `console.log(1 + 2)`. Here JavaScript assumes that the  line-break after `+` doesn't end the statement. 

Why so? For us humans, it's intuitively obvious that if the line ends with a plus `+`, then the expression is incomplete and will be continued on the next line. JavaScript has internal grammar rules for that. 

Although, these rules aren't perfect.

**There are situations where our intuition differs from JavaScript semicolon auto-insertion rules.**

That may lead to subtle errors.

To prevent them, we recommend putting semicolons between statements, even if they are separated by newlines. Most of the JavaScript codebase follows this convention.

````spoiler header="See an example of such error"
If you're curious to see a concrete example of such an error, check this code out:

```js run
console.log("Hello");

[1, 2].forEach(console.log);
```

That's some advanced code, but noo need to think about the meaning of the brackets `[]` and `forEach` yet. We’ll study them later.

For now just remember the result of running the code: it shows `Hello`, then `1`, then `2`.

Now let’s remove one semicolon after the console.log, and see how it fails:

```js run
console.log("Hello")

[1, 2].forEach(console.log);
```

The difference compared to the code above is only one character: the semicolon at the end of the first line is gone.

If we run this code, only the first `Hello` shows, and then there's an error. There are no numbers any more!

That's because JavaScript doesn't auto-insert a semicolon before square brackets [...]. So, the code in the last example is treated as a single statement, as if there were no line break at all.

In other words, JavaScript 

```js
console.log("Hello")[1, 2].forEach(console.log);
```

The code may be too advanced to understand right now, but that's all right.

All you need to do is to run the code and remember the result: it shows `1` then `2`.

Let's add an `console.log` before the code and *not* finish it with a semicolon:

```js run no-beautify
console.log("Without a semicolon after the console.log - error")

[1, 2].forEach(console.log)
```

Now if you run the code, only the first `console.log` is shown and then there's an error!

...But everything becomes fine again we add a semicolon after the `console.log`:
```js run
console.log("With a semicolon after me - all ok");

[1, 2].forEach(console.log)  
```

The error in the no-semicolon variant occurs because JavaScript doesn't "auto-insert" a semicolon if a newline is followed by squares brackets `[...]`.

So, because the semicolon is not auto-inserted, the code in the first example is treated as a single statement. Here's how the engine sees it:

```js run no-beautify
console.log("There will be an error")[1, 2].forEach(console.log)
```

But such a merge in this case is just wrong, hence the error. This can happen in other situations as well.
````

Let's note once again -- *it is possible* to leave out semicolons most of the time. But it's safer, especially for a beginner, to use them.

