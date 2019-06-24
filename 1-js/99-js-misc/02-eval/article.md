# Eval: run a code string

The built-in `eval` function allows to execute a string of `code`.;

The syntax is:

```js
let result = eval(code);
```

For example:

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

A call to `eval` returns the result of the last statement.

For example:
```js run
let value = eval('1+1');
alert(value); // 2
```

The code is executed in the current lexical environment, so it can see outer variables:

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

It can change outer variables as well:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, value modified
```

In strict mode, `eval` has its own lexical environment. So functions and variables, declared inside eval, are not visible outside:

```js untrusted refresh run
// reminder: 'use strict' is enabled in runnable examples by default

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (no such variable)
// function f is also not visible
```

Without `use strict`, `eval` doesn't have its own lexical environment, so we would see `x` and `f` outside.

## Using "eval"

In modern programming `eval` is used very sparingly. It's often said that "eval is evil".

The reason is simple: long, long time ago JavaScript was a much weaker language, many things could only be done with `eval`. But that time passed a decade ago.

Right now, there's almost no reason to use `eval`. If someone is using it, there's a good chance they can replace it with a modern language construct or a [JavaScript Module](info:modules).

Still, if you're sure you need to dynamically `eval` a string of code, please note that its ability to access outer variables has side-effects.

Code minifiers (tools used before JS gets to production, to compress it) replace local variables with shorter ones for brewity. That's usually safe, but not if `eval` is used, as it may reference them. So minifiers don't replace all local variables that might be visible from `eval`. That negatively affects code compression ratio.

Using outer local variables inside `eval` is a bad programming practice, as it makes maintaining the code more difficult.

There are two ways how to evade any eval-related problems.

**If eval'ed code doesn't use outer variables, please call `eval` as `window.eval(...)`:**

This way the code is executed in the global scope:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (global variable)
}
```

**If your code needs local variables, execute it with `new Function` and pass them as arguments:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

The `new Function` construct is explained in the chapter <info:new-function>. It creates a function from a string, also in the global scope. So it can't see local variables. But it's so much clearer to pass them explicitly as arguments, like in the example above.

## Summary

A call to `eval(code)` runs the string of code and returns the result of the last statement.
- Rarely used in modern JavaScript, as there's usually no need.
- Can access outer local variables. That's considered bad practice.
- Instead, to `eval` the code in the global scope, use `window.eval(code)`.
- Or, if your code needs some data from the outer scope, use `new Function` and pass it as arguments.
