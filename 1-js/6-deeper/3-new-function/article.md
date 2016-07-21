
# The exclusion: new Function

There is one exclusion from the behavior of nested function.

When a function is created using `new Function`, its `[[Environment]]` references not the current Lexical Environment, got the global one.

## Example

The `new Function` syntax is used rarely so let's remember it:

```js run
let sum = new Function('arg1, arg2', 'return arg1 + arg2');

alert( sum(1, 2) ); // 3
```

It creates the function dynamically from the string. The first argument is a comma-separated list of arguments, the second one is the code.

Here's the example that shows how a function created with `new Function` ignores the outer variable `a`:


```js run untrusted refresh 
function getFunc() {
  let a = 1;

*!*
  let func = new Function('', 'alert(a)');
*/!*

  return func;
}

getFunc()(); // error: a is not defined
// it would show the global "a" if we had any.
```


Compare it with the regular behavior:

```js run untrusted refresh
function getFunc() {
  let a = 2;

*!*
  let func = function() { alert(a); };
*/!*

  return func;
}

getFunc()(); // *!*1*/!*, from the Lexical Environment of getFunc
```

## Where is it useful?

```warn header="Advanced knowledge"
The subsection describes advanced practical use cases. To know them is not required to continue studying Javascript.
```

This "speciality" of `new Function` looks strange, but appears very useful in practice.

Imagine that we really have to create a function from the string. The code of that function is not known at the time of writing the script (that's why we don't use regular functions), but will be known in the future. We can receive it from the server or from another source.

That new function needs to interact with the main script.

But the problem is that before Javascript is published to production, it's compressed using a *minifier* -- a special program that shrinks code by removing extra comments, spaces and -- what's important, renames local variables into shorter ones.

So, if a function has `let userName`, then a minifier replaces it `let a` (or another letter if this one is occupied), and does it everywhere. That's usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, not just find-and-replace the text.

...So if `new Function` could access outer variables, then it would be unable to find `userName`.

**Even if we could access outer lexical environment in `new Function`, we would have problems with minifiers.**

The "special feature" of `new Function` saves us from mistakes.

If we need to pass something to a functionc created by `new Function`, we should pass them explicitly as arguments, for instance:

```js run untrusted refresh no-beautify
*!*
let sum = new Function('a, b', ' return a + b; ');
*/!*

let a = 1, b = 2;

*!*
alert( sum(a, b) ); // 3
*/!*
```

## Summary

- Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one.
- Hence, they can not use outer variables. But that's actually good, because it saves us from errors. Explicit parameters passing is a much better thing architecturally and has no problems with minifiers.