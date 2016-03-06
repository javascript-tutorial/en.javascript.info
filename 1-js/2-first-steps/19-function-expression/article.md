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

The function is not called there. There are programming languages where any use of function name causes it's call, but JavaScript is not like that. In JavaScript, a function is a value and we can deal with that as a value. The code above shows its string representation, that is its source code.

It is a special value of course, in the sense that we can call it using brackets: `"sayHi()"`.

But it's still a value. So we can work with it like with other kinds of values.

We can copy a function to another variable:

```js run no-beautify
function sayHi() {   // (1) create
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) call the copy (it works)!
sayHi(); // Hello    //     this works too (why wouldn't it)
```

In more detail:
1. Function Declaration `(1)` creates the function and puts it into the variable `sayHi`"
2. Line `(2)` copies it into variable `func`.

    Please note again: there are no brackets after `sayHi`. If they were, then `func = sayHi()` would write  *the result of the call* `sayHi()` into `func`, not *the function* `sayHi` itself.
3. Now the function can be called both as `sayHi()` and `func()`.


Note, that we could also have used a Function Expression to declare `sayHi`, in the first line: `let sayHi = function() { ... }`. Everything would work the same.

```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can copy it between variables and run when we want.
```

## Function Expression as a method

Now let's go back: we have two ways of declaring a function. Do we really need both? What's about Function Expressions that makes it a good addition?

Actually, yes. We'll see many examples below, but let's start with objects.

As we remember from the chapter <info:types>, objects are data structures meant to store collections of data.

Most often, we create objects to represent entities of the real world, like here:

```js
let user = {
  name: "John",
  age: 30
};
```

In the real world, a user can `act`, like: select something from the shopping cart, login, logout etc. For the start, let's teach him to say hello:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

You see? We've just used a Function Expression to create the function and assign it to the property `user.sayHi` of the object.

Then we can call it any time. The user now can speak!

That is how a so-called "object-oriented code" is written. We make objects which reflect entities of the real world: like a user, or a document, or a button that is clickable etc.

An object stores its data in regular properties (like `name`, `age` etc) and has functions to express itself. Function properties are usually called *methods*. So, one can say that in the code above "`sayHi` is a method of the object `user`". 



Of course we could use a Function Declaration for the same purpose:

```js run
let user = {
  // ...
};

*!*
function sayHi() {
  alert("Hello!");
};

user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

That would also work, but is longer. Also we get an "extra" function `sayHi` outside of the `user` object. Here we don't want it.


## Function Expression vs Function Declaration

Let's formulate key differences between Function Declarations and Expressions.

### What's where

Here's the exact distinction between these two.

- *Function Declaration:* a function, declared as a separate statement, in the main code flow.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* a function, created in the context of an expression.

    Here the function is created in the context of an "assignment expression":
    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    }
    ```

### Creation time

Another difference is when they are actualy created by the JavaScript engine.

**Function Expressions are created when the execution reaches them.**

That's kind of obvious. Once the execution flow passes to the right side of the assignment `let sum = function` -- here we go, the function is made and can be used (assigned, called etc) from now on.

Function Declarations are different. 

**Function Declarations are created before the script or a code block begins to execute and are visible in the whole script/block.**

In other words, when JavaScript *prepares* to run the script or a code block, it first looks for Function Declarations in it and creates the functions. We can think of it as an "initialization stage". 

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

Function Declaration `sayHi` is created when JavaScript is preparing to start the script and is visible everywhere in it.

...And if there were Function Expression, then it wouldn't work:

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*)
  alert( `Hello, ${name}` );
};
```

Now there's no magic. Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.


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
    alert("Hello!");       //  |  Function Declaration is available 
  }                        //  |  everywhere in the block when it's declared
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {
                           // \
  function welcome() {     //  |  
    alert("Greetings!");   //  |  as we don't enter this block, 
  }                        //  |  this "welcome" is never created
                           // /
}

// Now we're out of figure brackets,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
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
  function() { alert("Hello!"); } : function() { alert("Greetings!"); }

*!*
welcome(); // ok now
*/!*
```

```smart header="What to choose: a Declaration or an Expression?"
As a rule of thumb, a Function Declaration is prefered. It gives more freedom in how to organize our code, because we can call it both above and below. It's also a little bit easier to look up Function Declarations in the code, they increase readability of the code.

But if a Function Declaration does not suit us for some reason, then a Function Expression should be used.
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
