# Function expressions

Function Expression is analternative syntax for creating a function. 

It looks like this:

```js
//+ run
let func = function(parameters) {
  // body
};
```

For instance:

```js
//+ run
let sayHi = function(person) {
  alert( `Hello, ${person}` );
};

sayHi('John'); // Hello, John
```

The function created in the example above is fully functional and identical to:

```js
function sayHi(person) {
  alert( `Hello, ${person}` );
}
```

## Function is a value

Function Expressions clearly demonstrate one simple thing.

**In JavaScript, function is a kind of a value.**

We can declare it as we did before:

```js
function sayHi() {
  alert( "Hello" );
}
```

...Or as a function expression:

```js
let sayHi = function() {
  alert( "Hello" );
}
```

The meaning of these lines is the same: create a function, put it into the variable `sayHi`.

Yes, no matter, how it is defined -- it's just a value.

We can even show it using `alert`:

```js
//+ run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // shows the function code
*/!*
```

Note that there are no brackets after `sayHi` in the last line. The function is not called there. Instead the `alert` shows it's string representation, that is the source code.

As the function is a value, we can also copy it to another variable:

```js
//+ run no-beautify
function sayHi() {   // (1) create
  alert( "Hello" ); 
}

let func = sayHi;    // (2) copy
func(); // Hello     // (3) callable!

sayHi = null;        // (4) kill old
sayHi();             // error! (null now)
```

<ol>
<li>Function declaration `(1)` creates the function and puts it into the variable `sayHi`"</li>
<li>Line `(2)` copies it into variable `func`. 

Please note again: there are no brackets after `sayHi`. If they were, then the call `let func = sayHi()` would write a *result* of `sayHi()` into `func`, not the function itself.</li>
<li>At the moment `(3)` the function can be called both as `sayHi()` and `func()`.</li>
<li>...We can overwrite `sayHi` easily. As well as `func`, they are normal variables. Naturally, the call attempt would fail in the case `(4)`.</li>
</ol>

Again, it does not matter how to create a function here. If we change the first line above into a Function Expression: `let sayHi = function() {`, everything would be the same.

[smart header="A function is a value representing an \"action\""]
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can copy it between variables and run when we want.
[/smart]


## Comparison with Function Declaration

The "classic" syntax of the function that looks like `function name(params) {...}` is called a "Function Declaration".

We can formulate the following distinction:
<ul>
<li>*Function Declaration* -- is a function, declared as a separate statement.

```js
// Function Declaration
function sum(a, b) {
  return a + b;
}
```

</li>
<li>*Function Expression* -- is a function, created anywhere inside an expression.

Here the function is created to the right side of an assignment:
```js
// Function Expression
let sum = function(a, b) {
  return a + b;
}
```
Soon we're going to see more use cases.
</li>
</ul>

The main difference between them is the creation time.

<ul>
<li>Function Declarations are processed before the code begins to execute.</li>
<li>Function Expressions are created when the execution reaches them.</li>
</ul>

In other words, when JavaScript prepares to run the code block, it looks for Function Declarations in it and creates the functions. We can think of it as an "initialization stage". Then it runs the code. And while the code is running, Function Expressions can be created.

As a side-effect, functions declared as Function Declaration can be called earlier than they are defined.

For instance, this works:

```js
//+ run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

...And if there were Function Expression, then it wouldn't work:

```js
//+ run refresh untrusted
*!*
sayHi("John"); // error! 
*/!*

let sayHi = function(name) {  // (*)
  alert( `Hello, ${name}` );
};
```

Function Expressions are created in the process of evaluation of the expression with them. So, in the code above, the function is created and assigned to `sayHi` only when the execution reaches the line `(*)`.

Usually, a Function Declaration is preferable because of that. It gives more freedom in how to organize our code.

## Anonymous functions

As a function is a value, it can be created on-demand and passed to another place of the code.

For instance, let's consider the following real-life task.

Function `ask(question, yes, no)` should accept a question and two other functions: `yes` and `no`. It asks a question and, if the user responds positively, executes `yes()`, otherwise `no()`.

It could look like this:
```js
//+ run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
```

In real-life `ask` will be usually much more complex, because it draws a nice windows and takes care about how to preent the `question` to the user, but here we don't care about that. Just `confirm` is enough.

So, how do we use it?

If we had only Function Declarations in our toolbox, we could declare `showOk/showCancel` as actions and pass them:


```js
function showOk() {
  alert( "Ok, proceeding." );
}

function showCancel() {
  alert( "Execution canceled." );
}

// usage
ask("Should we proceed?", showOk, showCancel);
```

...But Function Expressions allow us to solve the task much more elegantly:

```js
ask("Should we proceed?", 
  function() { alert( "Ok, proceeding." ); },
  function() { alert( "Execution canceled." ); },
);
```

So, we can declare a function in-place, exactly when we need it.

These functions are sometimes called "anonymous" meaning that they are defined without a name.  So to say, we can't reuse this function anywhere outside of `ask`. And that's fine here.

Creating functions in-place is very natural and in the spirit of JavaScript.

## Summary

<ul>
<li>
Functions are values. They can be assigned, copied or declared in any place of the code.
<ul>
<li>If the function is declared as a separate statement -- it's called a Function Declaration.</li>
<li>If the function is created as a part of an expression -- it's a Function Expression.</li>
</ul>
</li>
<li>Function Declarations are processed before the code is executed. JavaScript scans the code, looks for them and creates corresponding functions.</li>
<li>Function Expressions are created when the execution flow reaches them.</li>
</ul>

Novice programmers sometimes overuse Function Expressions. Somewhy, maybe not quite understanding what's going on, they create functions like `let func = function()`. 

But in most cases Function Declaration is preferable.

Compare, which one is more readable:

```js
//+ no-beautify
// Function Expression 
let f = function() { ... }

// Function Declaration 
function f() { ... }
```

Function Declaration is shorter and more obvious. The additional bonus -- it can be called before the declaration.

Use Function Expression only when the function must be created at-place, inside another expression.

