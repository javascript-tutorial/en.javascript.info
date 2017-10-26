
# The old "var"

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:

1. `let`
2. `const`
3. `var`

`let` and `const` behave exactly the same way in terms of Lexical Environments.

But `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan meeting such scripts you may even skip this chapter or postpone it, but then there's a chance that it bites you later.

[cut]

From the first sight, `var` behaves similar to `let`. That is, declares a variable:

```js run
function sayHi() {
  var phrase = "Hello"; // local variable, "var" instead of "let"

  alert(phrase); // Hello
}

sayHi();

alert(phrase); // Error, phrase is not defined
```

...But here are the differences.

## "var" has no block scope

`var` variables are either function-wide or global, they are visible through blocks.

For instance:

```js
if (true) {
  var test = true; // use "var" instead of "let"
}

*!*
alert(test); // true, the variable lives after if
*/!*
```

If we used `let test` on the 2nd line, then it wouldn't be visible to `alert`. But `var` ignores code blocks, so we've got a global `test`.

The same thing for loops: `var` cannot be block- or loop-local:

```js
for (var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10, "i" is visible after loop, it's a global variable
*/!*
```

If a code block is inside a function, then `var` becomes a function-level variable:

```js
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // works
}

sayHi();
alert(phrase); // Error: phrase is not defined
```

As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript blocks had no Lexical Environments. And `var` is a reminiscence of that.

## "var" are processed at the function start

`var` declarations are processed when the function starts (or script starts for globals).

In other words, `var` variables are defined from the beginning of the function, no matter where the definition is (assuming that the definition is not in the nested function).

So this code:

```js
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
```

...Is technically the same as this (moved `var phrase` above):

```js
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
```

...Or even as this (remember, code blocks are ignored):

```js
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
```

People also call such behavior "hoisting" (raising), because all `var` are "hoisted" (raised) to the top of the function.

So in the example above, `if (false)` branch never executes, but that doesn't matter. The `var` inside it is processed in the beginning of the function, so at the moment of `(*)` the variable exists.

**Declarations are hoisted, but assignments are not.**

That's better to demonstrate with an example, like this:

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

The line `var phrase = "Hello"` has two actions in it:

1. Variable declaration `var`
2. Variable assignment `=`.

The declaration is processed at the start of function execution ("hoisted"), but the assignment always works at the place where it appears. So the code works essentially like this:

```js run
function sayHi() {
*!*
  var phrase; // declaration works at the start...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...assignment - when the execution reaches it.
*/!*
}

sayHi();
```

Because all `var` declarations are processed at the function start, we can reference them at any place. But variables are undefined until the assignments.

In both examples above `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

## Summary

There are two main differences of `var`:

1. Variables have no block scope, they are visible minimum at the function level.
2. Variable declarations are processed at function start.

There's one more minor difference related to the global object, we'll cover that in the next chapter.

These differences are actually a bad thing most of the time. First, we can't create block-local variables. And hoisting just creates more space for errors. So, for new scripts `var` is used exceptionally rarely.
