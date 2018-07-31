
# The "new Function" syntax

There's one more way to create a function. It's rarely used, but sometimes there's no alternative.

## Syntax

The syntax for creating a function:

```js
let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

In other words, function parameters (or, more precisely, names for them) go first, and the body is last. All arguments are strings.

It's easier to understand by looking at an example. Here's a function with two arguments:

```js run
let sum = new Function('a', 'b', 'return a + b'); 

alert( sum(1, 2) ); // 3
```

If there are no arguments, then there's only a single argument, the function body:

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

The major difference from other ways we've seen is that the function is created literally from a string, that is passed at run time. 

All previous declarations required us, programmers, to write the function code in the script.

But `new Function` allows to turn any string into a function. For example, we can receive a new function from a server and then execute it:

```js
let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
```

It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template. The need for that usually arises at advanced stages of development.

## Closure

Usually, a function remembers where it was born in the special property `[[Environment]]`. It references the Lexical Environment from where it's created.

But when a function is created using `new Function`, its `[[Environment]]` references not the current Lexical Environment, but instead the global one.

```js run

function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

Compare it with the regular behavior:

```js run 
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, from the Lexical Environment of getFunc
```

This special feature of `new Function` looks strange, but appears very useful in practice.

Imagine that we must create a function from a string. The code of that function is not known at the time of writing the script (that's why we don't use regular functions), but will be known in the process of execution. We may receive it from the server or from another source.

Our new function needs to interact with the main script.

Perhaps we want it to be able to access outer local variables?

The problem is that before JavaScript is published to production, it's compressed using a *minifier* -- a special program that shrinks code by removing extra comments, spaces and -- what's important, renames local variables into shorter ones.

For instance, if a function has `let userName`, minifier replaces it `let a` (or another letter if this one is occupied), and does it everywhere. That's usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function, minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don't break anything. They're not just a dumb find-and-replace.

But, if `new Function` could access outer variables, then it would be unable to find `userName`, since this is passed in as a string *after* the code is minified.

**Even if we could access outer lexical environment in `new Function`, we would have problems with minifiers.**

The "special feature" of `new Function` saves us from mistakes.

And it enforces better code. If we need to pass something to a function created by `new Function`, we should pass it explicitly as an argument.

Our "sum" function actually does that right:

```js run 
*!*
let sum = new Function('a', 'b', 'return a + b');
*/!*

let a = 1, b = 2;

*!*
// outer values are passed as arguments
alert( sum(a, b) ); // 3
*/!*
```

## Summary

The syntax:

```js
let func = new Function(arg1, arg2, ..., body);
```

For historical reasons, arguments can also be given as a comma-separated list. 

These three mean the same:

```js 
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```

Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that's actually good, because it saves us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
