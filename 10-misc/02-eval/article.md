# Eval: run a code string

The built-in `eval(code)` function allows to execute a string of `code`.

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

In modern programming `eval` is used very sparingly. There's also an expression "eval is evil".

The reason is simple: long, long time ago JavaScript was a weak language, many things could only be done with `eval`. But that time has passed.

Right now, there's almost no reason to use `eval`. If someone is using it, there's a good chance they can replace it with a modern language construct, or [JavaScript Modules](info:modules).

Still, if you're sure you need `eval`, please note that its ability to access outer variables has side-effects.

Code minifiers (tools used before JS gets to production, to compress it) replace local variables with shorter ones. That's safe, unless `eval` is used. When they see `eval`, they thing it might use local variables, so they don't replace all local variables that might be visible from `eval`. That negatively affects code compression ratio.

Also, renaming a local variable becomes more dangeours overall.

Using outer variables inside `eval` is a bad programming practice.

There are two solutions.

**If you don't use outer variables, please call `eval` as `window.eval(...)`:**

```js untrusted refresh run
let a = 1;
{
  let a = 5;
  window.eval('alert(a)'); // 1
}
```

**If your code needs variables, execute it with `new Function`:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

The `new Function` construct is explained in the chapter <info:new-function>. It creates a function from a string. Local variables can be passed to it as parameters, like in the example above.

## Summary

- A call to `eval(code)` runs the code and returns the result of the last statement.
- Rarely used in modern JavaScript.
- Can access outer local variables. That's considered bad practice.
- To execute the code in the global scope, use `window.eval(code)`.
- If your code needs some data from the outer scope, use `new Function` and pass it as arguments.
