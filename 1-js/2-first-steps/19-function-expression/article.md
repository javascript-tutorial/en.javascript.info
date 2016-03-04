# Function expressions

In JavaScript, a function is a value.

We can declare it as we did before:

```js
function sayHi() {
  alert( "Hello" );
}
```

This syntax is called a "Function Declaration".

...But there is another way of creating a function:

```js
let sayHi = function() {
  alert( "Hello" );
}
```

The latter syntax is called a "Function Expression".

The meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".

Yes, no matter, how the function is defined -- it's just a value, stored in the variable `sayHi`.

Let's stress: a function is not a "magical language structure". Both syntaxes mean the same: create a special "function" value and put it into the variable.

We can even print out that value using `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // shows the function code
*/!*
```

Note that there are no brackets after `sayHi` in the last line. 

The function is not called there. There are programming languages where any use of function name causes it's call, but JavaScript is not like that. In JavaScript, a function is a value and we can deal with that as a value, like print string representation, that is the source code.


It is a special value though, in the sense that we can call it using brackets: `"sayHi()"`, but only if we explicitly put brackets into the code.

Other actions with functions are also available, in the same fashion as with other values.

We can copy a function to another variable:

```js run no-beautify
function sayHi() {   // (1) create
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) call the copy (it works)!

sayHi = null;        // (4) store null in the old variable
sayHi();             // error! (now null, the function is overwritten)

func();              // the copy still works
```

In more detail:
1. Function Declaration `(1)` creates the function and puts it into the variable `sayHi`"
2. Line `(2)` copies it into variable `func`.

    Please note again: there are no brackets after `sayHi`. If they were, then `func = sayHi()` would write  *the result* of the call `sayHi()` into `func`, not the function `sayHi` itself.
3. At the moment `(3)` the function can be called both as `sayHi()` and `func()`.
4. ...We can overwrite `sayHi`, it have had the function, but now it stores `null`. Naturally, the call attempt would fail.
5. But `func` still has the function, it is still callable.

Note, that we could use a Function Expression in the first line: `let sayHi = function() { ... }`. Everything would work the same.

```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can copy it between variables and run when we want.
```

## Why Function Expression?

Now let's go back: we have two ways of declaring a function. Why so? What's about Function Expressions that makes it a good addition?

**Function Expressions are very convenient for creating an action in-place and passing it along the code.**

There is a built-in [setTimeout](https://developer.mozilla.org/en/docs/Web/API/WindowTimers/setTimeout) function in JavaScript, that can schedule a function to run after a given period of time.

The syntax is: `setTimeout(func, ms, ...arguments)`:

`func`
: The function to run.

`ms`
: The number of milliseconds (1/1000 of a second) to schedule the call after.

`arguments`
: One of more arguments to pass to the function.

What if we wanted to say "Hello" in a second?

One could write a code like this:

```js run
function sayHi() {
  alert("Hello!")
}

setTimeout(sayHi, 1000);
```

That would work. But we have declared a function that has no future use.

A Function Expression is much cleaner:

```js run
setTimeout(function() {
  alert("Hello!")
}, 1000);
```

Such functions are sometimes called "anonymous" meaning that they are defined without a name.  So to say, we can't reuse them, because there is no variable for them. But here it's  exactly what we want.

Creating functions in-place is very natural and in the spirit of JavaScript.

## Function Expression vs Function Declaration

Let's briefly reformulate the distinction between these two.

- *Function Declaration:* a function, declared as a separate statement, in the main code flow.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* a function, created in the context of an expression.

    Here the function is created in the context of an "assignment expression", it's an expression:
    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    }
    ```

    Here the function is created inside another function call:

    ```js 
    // Function Expression
    setTimeout(function() {
      alert("Hello!")
    }, 1000);
    ```    

### Creation time

There are more differences between them besides the syntax.

**Function Expressions are created when the execution reaches them.**

That's rather obvious. Once the execution flow passes to the right side of the assignment -- here we go, the function is made and can be used (assigned, called etc) from now on.

Function Declarations are different. 

**Function Declarations are created before the script or a code block begins to execute and are visible in the whole scropt/block.**

In other words, when JavaScript *prepares* to run the script or a code block, it first looks for Function Declarations in it and creates the functions. We can think of it as an "initialization stage". Then it runs the code.


As a natural effect, a function declared as Function Declaration can be called earlier than it is defined.

For instance, this works:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

Function Declaration `sayHi` is created when the script starts and is visible everywhere in it.

...And if there were Function Expression, then it wouldn't work:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*)
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. No magic. That would happen only in the line `(*)`. Too late.


### Visibility

Now let's explore the visibility differences.

Imagine, we need to declare `welcome()` depending on some data we get in run-time.

For instance:

```js run
let age = prompt("What is your age?", 18);

if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

*!*
welcome(); // Error: welcome is not defined
*/!*
```

In the code above, we'd like to create function `welcome()` depending on the `age`. So, that it can't be called later, probably from another place of the code, in case of an event or such, doesn't matter now.

But that doesn't work.

**A Function Declaration is visible only inside the code block where it resides.**

We can call it from within the block, but not from outside:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  welcome is available everywhere in its block
  }                        //  |
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {
                           // \
  function welcome() {     //  |
    alert("Greetings!");   //  |  another welcome is limited to its own block
  }                        //  |
                           // /
}

*!*
welcome(); // Error: outside of the block there's no welcome
*/!*
```

What can we do to fix the problem? One of the ways is to use a Function Expression and assign `welcome` to the variable which is declared outside of `if` and has the proper visibility:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  }

} else {

  welcome = function() {
    alert("Greetings!");
  }

}

*!*
welcome(); // ok now
*/!*
```

Or we could go on to simplify it even further using a question mark operator `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() {
    alert("Hello!");
  } :
  function() {
    alert("Greetings!");
  }

*!*
welcome(); // ok now
*/!*
```

```smart header="What to choose: a Declaration or an Expression?"
As a rule of thumb, a Function Declaration is prefered. It gives more freedom in how to organize our code, because we can call it both above and below. It's also a little bit easier to look up Function Declarations in the text.

But if a Function Declaration does not suit us for some reason, or we need to create an anonymous function "at-place", then a Function Expression should be used.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement -- it's called a Function Declaration.
- If the function is created as a part of an expression -- it's a Function Expression.
- Function Declarations are processed before the code block is executed. So they are available everywhere in the block. Or in the whole script if not enclosed in a block.
- Function Expressions are created when the execution flow reaches them.

Novice programmers sometimes overuse Function Expression by creating many functions with `let func = function()`.

But in most cases Function Declaration is preferable.

Compare, which code is more readable:

```js no-beautify
// Function Expression
let f = function() { ... }

// Function Declaration
function f() { ... }
```

Function Declaration is shorter and more obvious. The additional bonus -- it can be called before the actual declaration.

Use Function Expression to write elegant code when the function must be created at-place, inside another expression or when Function Declaration doesn't fit well for the task.
