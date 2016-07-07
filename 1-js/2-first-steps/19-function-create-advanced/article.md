# Function expressions and more

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
};
```

The latter syntax is called a "Function Expression".

The meaning of these code samples is the same: "create a function and put it into the variable `sayHi`".

Let's stress: a function is not a "magical language structure", but a kind of value. Both syntaxes mean the same: create a special "function" value and put it into the variable.

No matter, how the function is defined -- it's just a value, stored in the variable `sayHi`.

We can even print out that value using `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // shows the function code
*/!*
```

Note that there are no brackets after `sayHi` in the last line, because we do not intend to run the function. There are programming languages where any mention of a function name causes it's call, but JavaScript is not like that. In JavaScript, a function is a value and we can deal with that as a value. The code above shows its string representation, that is its source code.

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

That's what happens above in detail:

1. Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
2. Line `(2)` copies it into variable `func`.

    Please note again: there are no brackets after `sayHi`. If they were, then `func = sayHi()` would write  *the result of the call* `sayHi()` into `func`, not *the function* `sayHi` itself.
3. Now the function can be called both as `sayHi()` and `func()`.

Note, that we could also have used a Function Expression to declare `sayHi`, in the first line:

```js
let sayHi = function() { ... };

let func = sayHi;
// ...
```

Everything would work the same. Even more obvious what's going on, right?


````smart header="Why semicolon?"
There might be a question, why Function Expression has a semicolon `;` at the end, and Function Declaration does not:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

The answer is simple:
- There's no need in `;` at the end of code blocks and syntax structures that use them like `if { ... }`, `for {  }`, `function f { }` and alike.
- A Function Expression appears in the context of the statement: `let sayHi = value;`. It's not a code block. The semicolon `;` is recommended at the end of statements, no matter what is the `value`. So the semicolon here is not related to Function Expression itself in any way, it just terminates the statement.
````



## Function is an object

Every value in Javascript has the type. What type of value is a function?

In Javascript, a function is an object. 

For example, all functions have property `name` (function name) and `length` (number of arguments):

```js run
function sayHi() {
  alert("Hi");
}

alert( sayHi.name ); // sayHi
alert( sayHi.length ); // 0
```

We can add our own properties to it as well:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // let's count how many times we run
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // initial value

sayHi(); // Hi 
sayHi(); // Hi 

alert( `Called ${sayHi.counter} times` ); // Called 2 times
```


```warn header="A property is not a variable"
A property assigned to a function like `sayHi.counter = 0` does *not* define a local variable `counter` inside it. In other words, a property `sayHi.counter` and `let counter` inside the function (if we have it) are two unrelated things.

We can treat a function as an object for convenience, store properties in it, that has no effect on its execution.
```

There are many well-known Javascript libraries that make a great use of custom function properties. 

They create a "main" function and attach many other "helper" functions to it. For instance, the [jquery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`. And then adds `_.clone`, `_.keyBy` and other properties to (see the [docs](https://lodash.com/docs) when you want learn more about them). 

So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.

```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can copy it between variables and run when we want. We can even add properties to it if we wish.
```


## Function Expression vs Function Declaration

Let's formulate the key differences between Function Declarations and Expressions.

First, the syntax: how to see what is what in the code.

- *Function Declaration:* a function, declared as a separate statement, in the main code flow.

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* a function, created in the context of an expression.

    Here the function is created in the context of an "assignment expression =":
    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    }
    ```

The more subtle difference is when they are actualy created by the JavaScript engine.

**Function Expressions are created when the execution reaches them and are usable since then.**

That's kind of obvious. Once the execution flow passes to the right side of the assignment `let sum = function` -- here we go, the function is created and can be used (assigned, called etc) from now on.

Function Declarations are different. 

**Function Declarations are usable in the whole script/code block.**

In other words, when JavaScript *prepares* to run the script/code block, it first looks for Function Declarations in it and creates the functions. We can think of it as an "initialization stage". 

And after all Function Declarations are processed, it actually executes it.

As a natural effect, a function declared as Function Declaration can be called earlier than it is defined.

For example, this works:

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

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

Function Expressions are created when the execution reaches them. That would happen only in the line `(*)`. Too late.


### Function Declaration in a block

When Function Declaration is made within a code block, it is visible everywhere inside that block. But not outside of it.

Sometimes that's handy to declare a local function, only needed in that only block. But can also be a problem.

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get in run time. And then use it sometimes later.

The code below doesn't work:

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

The Function Declaration is visible only inside the code block where it resides. 

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
    alert("Greetings!");   //  |  in this if test we don't enter this block, 
  }                        //  |  so this "welcome" is never created
                           // /
}

// Now we're out of figure brackets,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside? 

The right thing would be to use a Function Expression and assign `welcome` to the variable which is declared outside of `if` and has the proper visibility:

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
As a rule of thumb, a Function Declaration is prefered. It gives more freedom in how to organize our code, because we can call it both above and below. 

It's also a little bit easier to look up Function Declarations in the code, they increase readability of the code.

But if a Function Declaration does not fit for some reason (we've seen an example), then a Function Expression should be used.
```


## Named Function Expression

Now the feature that exists for a Function Expression, but not for Function Declaration, and hence may be a reason to use them. 

**We can specify an "internal" name for a Function Expression.**

Compare these two variants:

```js
let sayHi = function() { // (1)
  alert('Hello');
};

let sayHi = function *!*func*/!*() { // (2)
  alert('Hello');
};
```

Both create a function and put it into the variable `sayHi`. And usually we don't specify anything in the `function()`, so the 1st variant works fine.

Although the function can move to another variable. As we've seen it's easy to copy a function and maybe replace the previous value with something else:

```js run
let sayHi = function() {
  alert('Hello');
};

// oh maybe that's better?
let oldSayHi = sayHi; // keep the old variant here
sayHi = function() { //  replace with a newer one
  alert("What's up dude?");
};


oldSayHi(); // Hello 
sayHi(); // What's up dude?
```

The problem may occur if a function references *itself* from inside. It happens when the function wants to access its properties (`sayHi.counter` in the example above), or sometimes it wants to call itself one more time.


But if the function has moved, then the old name is not relevant any move!


Let's see:

```js run
// create a function
let sayHi = function() {
  sayHi.counter++;
  alert('Hi ' + sayHi.counter);
};
sayHi.counter = 0; 

// move it 
let movedSayHi = sayHi;

// overwrite the old name to make things more obvious
sayHi = null;

*!*
movedSayHi(); // Error: Cannot read property 'counter' of null
*/!*
```

The optional `name` which we can put into `function name()` is exactly meant to solve this kind of problems.

- It is only visible from inside the function.
- It always references the current function.

Let's use it to fix the code:

```js run
// now with the internal name "say"
*!*
let sayHi = function say() {
  say.counter++; 
  alert('Hi ' + say.counter); // and use it everywhere inside
};
*/!*
sayHi.counter = 0; 

let movedSayHi = sayHi;

sayHi = null;

movedSayHi(); // Hi 1
movedSayHi(); // Hi 2 (works)

alert(say); // Error (say is undefined, that's normal)
```

Please note that:

- The name `say` references the current function no matter where it is. That's why it works.
- The name `say` exists only inside the function. The last line demonstrates that.

So the outer code still uses `sayHi` (or `movedSayHi` later). It doesn't see `say`, actually it doesn't need to see it. The `say` is an "internal function name", how it calls itself privately.

A Function Expression with a name is called *Named Function Expression*.

The "internal name" feature described here is only available for Function Expressions, not to Function Declarations. For Function Declarations, the `function name()` behaves like `sayHi`, there's just no syntax possibility to add a one more "internal" name for them. 



## Arrow functions [#arrow-functions]

Enough with the complexities for now. Let's relax with another syntax of functions that can make our code shorter.

Arrow functions act like a function expression, but look a little bit differently. 

The syntax is:

```js
let func = (arg1, arg2, ...argN) => expression
```

...This creates a function `func` that has arguments `arg1..argN`, evaludates the `expression` on the right side with their use and returns its result.

In other words, it's roughly the same as:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
}
```

Let's see the example:

```js run
let sum = (a, b) => a + b;

alert( sum(1, 2) ); // 3
```

Here the function is same as:

```js
let sum = function(a, b) {
  return a + b;
}
```

If we have only one argument, then brackets can be omitted, making that even shorter:

```js run
// same as 
// let double = function(n) { return n*2 }
let double = n => n*2;

alert( double(3) ); // 6
```

If there are no arguments, we can put empty brackets. For instance, here's the rewritten example with `welcome()`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ? () => alert('Hello') : () => alert("Greetings!");

welcome(); // ok now
```

The syntax may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

Arrow functions are very convenient for simple one-line actions, when we're just lazy to write many words.

```smart header="Multiline arrow functions"

The examples above took arguments from the left of `=>` and evaluate the right-side expression with them. 

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in figure brackets. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the figure bracket opens a multiline function
  let result = a + b;
*!*
  return result; // if we use figure brackets, must use return
*/!*
}

alert( sum(1, 2) ); // 3
```

```smart header="More to come"
Here we praised arrow functions for shortness. But that's not all! Arrow functions have other interesting features in them. We'll return to them later and see where else they shine. 

As for now, we can already use them for one-line actions.
```

## new Function

And the last syntax for the functions:
```js
let func = new Function('a, b', 'return a + b');
```

The major difference is that it creates a function literally from a string, at run time. See, both arguments are strings. The first one lists the arguments, while the second one is the function body.

All previous declarations required us, programmers, to write the function code in the script.

But `new Function` allows to turn any string into a function, for example we can receive a new function from the server and then execute it:

```js
let str = ... receive the code from the server dynamically ...

let func = new Function('', str);
func();
```

It is used in very specific cases, like when we receive the code from the server, or to dynamically compile a function from a template. The need for such uses arises at advanced stages of the development.


## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement, in the main code flow -- that's called a Function Declaration.
- If the function is created as a part of an expression -- it's a Function Expression.
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block (or the script).
- Function Expressions are created when the execution flow reaches them.
- Function Expressions allow to specify an optional name for internal needs (Named Function Expression). 


If we simple want to create a function, then in most cases Function Declaration is preferable.

Novice programmers sometimes tend to overuse Function Expression by creating many functions with `let func = function()`, but compare, which code is more readable:

```js no-beautify
let f = function() { /* expression */ }

function f() { /* declaration */ }
```

Function Declaration is shorter and more obvious. The additional bonus -- it can be called before the actual declaration.

**Use Function Expression only when Function Declaration does not fit the task.**

We've seen a couple of examples of that in the chapter. And will see more in the future.

We also touched two other ways to create a function:

- Arrow functions are handy for one-liners. The come in two flavours:
    1. Without figure brackets: `(...args) => expression` -- returns the evaluated `expression`.
    2. With brackets: `(...args) => { body }` -- need an explicit `return` statement to return something, but can be more complex.

- `new Function(args, body)`

    This syntax allows to create a function from a string, that may be composed dynamically during the execution.
