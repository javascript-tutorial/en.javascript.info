# Function expressions

Function Expression is an analternative syntax for declaring a function. 

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

The function `sayHi` created in the example above is identical to:

```js
function sayHi(person) {
  alert( `Hello, ${person}` );
}
```

## Function is a value

Function Expression clearly demonstrates one simple thing.

**In JavaScript, a function is a value.**

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

Yes, no matter, how it is defined -- it's just a value, stored in the variable `sayHi`.

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

func(); // Hello     // (3) call the copy (it works)!

sayHi = null;        // (4) nullify the old variable
sayHi();             // error! (null now)
```

<ol>
<li>Function declaration `(1)` creates the function and puts it into the variable `sayHi`"</li>
<li>Line `(2)` copies it into variable `func`. 

Please note again: there are no brackets after `sayHi`. If they were, then `func = sayHi()` would write  *the result* of the call `sayHi()` into `func`, not the function `sayHi` itself.</li>
<li>At the moment `(3)` the function can be called both as `sayHi()` and `func()`.</li>
<li>...We can overwrite `sayHi` easily. As `func`, it is a normal variable. Naturally, the call attempt would fail in the case `(4)`.</li>
</ol>

Again, it does not matter how to create a function here. If we change the first line above into a Function Expression: `let sayHi = function() {`, everything would be the same.

[smart header="A function is a value representing an \"action\""]
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can copy it between variables and run when we want.
[/smart]


Function Expressions are very convenient for creating an action in-place and passing it along the code.

For instance, let's consider the following real-life task.

Function `ask(question, yes, no)` should accept a textual `question` and two other functions: `yes` and `no`. It asks a question and, if the user responds positively, executes `yes()`, otherwise `no()`.

It could look like this:
```js
//+ run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
```

In real-life `ask` would be usually much more complex, because it would draw a nice window and take care about how to present the `question` to the user etc. But here we consider the general form of such function, so `confirm` is enough.

So, how do we use it?

If we had only Function Declarations in our toolbox, we could declare `showOk/showCancel` and pass them:


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

Here we can declare actions in-place, exactly when we need it.

Such functions are sometimes called "anonymous" meaning that they are defined without a name.  So to say, we can't reuse them outside of `ask`, because there is no variable for them. But for this kind of task it's exactly what we want.

Creating functions in-place is very natural and in the spirit of JavaScript.


## Function Expression vs Function Declaration

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
<li>*Function Expression* -- is a function, created in the context of an expression.

In the example above the function was created in the context of an "assignment expression":
```js
// Function Expression
let sum = function(a, b) {
  return a + b;
}
```

</li>
</ul>

The main differences between them are visibility and creation time.

**Function Expressions are created when the execution reaches them.**

That's easy. Once the execution flow passes to the right side of the assignment -- here we go, the function is made and can be used (assigned, called etc) from now on.

Function Declarations are different. They are treated in a special way.

When JavaScript prepares to run the code block, it looks for Function Declarations in it and creates the functions. We can think of it as an "initialization stage". Then it runs the code. 

**Function Declarations are created before the code block begins to execute and is visible in the whole block.**

If the Function Declaration is not inside a code block `{...}`, then it is created when the script starts and is visible in the whole script. All declarations in the examples above are not in the code block.

As a natural effect, a function declared as Function Declaration can be called earlier than it is defined.

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

Function Declaration `sayHi` is created when the script starts and is visible everywhere in it.

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

Function Expressions are created in the process of evaluation of the expression with them. So, in the code above, the function would be created and assigned to `sayHi` only when the execution reaches the line `(*)`. Too late.

Now let's explore the visibility thing.

Imagine, we need to declare `welcome()` depending on some data we get in run-time.

For instance:

```js
//+ run

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

In the code above, we mean to create function `welcome()` depending on the `age`. So, that it can't be called later, probably from another place of the code, in case of an event or such. 

But that doesn't work, because Function Declaration `function welcome()` is visible only inside the block where it resides.

We can call it from within the block, but not from outside:

```js
//+ run
let age = 15; // let's consider 15 as an example

if (age < 18) {
*!*
  welcome();               // \   (works)
*/!*
                           //  | 
  function welcome() {     //  |
    alert("Hello!");       //  |  available here
  }                        //  |
                           //  |
*!*
  welcome();               // /   (works)
*/!*
  
} else {
                           // \ 
  function welcome() {     //  |
    alert("Greetings!");   //  |  available here
  }                        //  |
                           // /
}

*!*
welcome(); // Error: outside of the block there's no welcome
*/!*
```

What can we do to fix the problem? One of the ways is to use a Function Expression and assign `welcome` to the variable which has the proper visibility:



```js
//+ run

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

```js
//+ run

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

[smart header="So, a Declaration or an Expression?"]
As a rule of thumb, if we want just to declare a function, then a Function Declaration is prefered. It gives more freedom in how to organize our code, because we can put "helper functions" below. It's also a little bit easier to read and look up them in the text.

Only if a Function Declaration does not suit us for some reason, then a Function Expression should be used.
[/smart]


## Summary

<ul>
<li>
Functions are values. They can be assigned, copied or declared in any place of the code.
<ul>
<li>If the function is declared as a separate statement -- it's called a Function Declaration.</li>
<li>If the function is created as a part of an expression -- it's a Function Expression.</li>
</ul>
</li>
<li>Function Declarations are processed before the code block is executed. So they are available everywhere in the block. Or in the whole script if not enclosed in a block.</li>
<li>Function Expressions are created when the execution flow reaches them.</li>
</ul>

Novice programmers sometimes overuse Function Expression by creating many functions with `let func = function()`. 

But in most cases Function Declaration is preferable.

Compare, which code is more readable:

```js
//+ no-beautify
// Function Expression 
let f = function() { ... }

// Function Declaration 
function f() { ... }
```

Function Declaration is shorter and more obvious. The additional bonus -- it can be called before the declaration.

Use Function Expression only when the function must be created at-place, inside another expression.
