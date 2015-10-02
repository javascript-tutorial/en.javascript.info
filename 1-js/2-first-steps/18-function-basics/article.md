# Functions

Quite often we need to perform a similar action in many places of the script.

For example, we need to show a nice-looking message when a visitor logs in, logs out and maybe somewhere else.

Functions are the main "building blocks" of the program. They allow the code to be called many times without repetition.

[cut]

We've already seen examples of built-in functions, like `alert(message)`, `prompt(message, default)` and `confirm(question)`. But we can create functions of our own as well.

## Definition

An example of a function definition:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

The `function` keyword goes first, then follows the *name of the function*, then a list of *parameters* in the brackets (empty in the example above) and finally the code of the function, also named "the function body".

<img src="function_basics.png">

Once defined, the function can be called by it's name.

For instance:

```js
//+ run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

The call executes the code of the function. Here we will see the message shown two times.

In this example we can see one of the main purposes of the functions: to evade code duplication.

If we ever need to change the message or the way it is shown -- it's enough to modify the code in one place: the function which outputs it.

## Local variables

A variable declared inside a function is only visible inside that function.

For example:

```js
//+ run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // local variable
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function
```

## Outer variables

A function can access an outer variable as well, for example:

```js
//+ run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, my name is ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, my name is John
```

The function can not only read but also modify an outer variable.

For instance:

```js
//+ run
let *!*userName*/!* = 'John';

function showMessage() {
  userName = "Bob"; // (1) changed the outer variable

  let message = 'Hello, my name is ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // John before the function call

showMessage();

*!*
alert( userName ); // Bob, the value was modified by the function
*/!*
```

Of course if we had `let userName = ...` in the line (1) then the function would have a local variable `userName` and use it instead of the outer one:

```js
//+ run
let *!*userName*/!* = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declare a local variable 
*/!*

  let message = 'Hello, my name is ' + *!*userName*/!*;
  alert(message);
}

// the function will create and use it's own userName
showMessage();

*!*
alert( userName ); // John, the outer variable is not modified
*/!*
```

**Variables declared on the script level, outside of any function, are called *global*.**

Global variables are visible from any function. They are used to store the data of a project-wide importance. Variables needed by specific tasks should reside in the corresponding functions. 

[warn header="Attention: implicit global declaration!"]
Without strict mode, for compatibility with the old scripts, it is possible to create a variable by an assignment, without a declaration:

```js
//+ run
function showMessage() {
  message = 'Hello'; // pure assignment, no declaration
}

showMessage();

alert( message ); // Hello
```

In the code above, most probably, the programmer simply forgot to write `let`. As a result, he created a global variable `message`.

With `"use strict"` there will be an error. 

Modern editors and tools for code quality checking like [jshint](http://jshint.com/) allow to see and fix "missed declarations" early while coding.
[/warn]

Later, after we deal with the basics and data structures, in the chapter [](/closures) we will go deeper in the internals of functions and variables.

## Parameters

We can pass arbitrary data to the function using it's parameters (also called *arguments*) .

For example, this code shows two messages:

```js
//+ run no-beautify
function showMessage(*!*from, text*/!*) { // arguments: from, text
  
  from = "**" + from + "**";

  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // **Ann**: Hello!
showMessage('Ann', "What's up?"); // **Ann**: What's up?
*/!*
```

In the example above, the function has two parameters: `from` and `text`.

When the function is called, the values in the brackets are copied to local variables `from` and `next`.

Note that the function can modify those local variables freely, they are not seen from outside anyway:

```js
//+ run
function showMessage(from, text) {
*!*
  from = '**' + from + '**'; // changes the local from
*/!*
  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello");

// the old value of "from" is still here, the function modified a local copy
alert( from ); // Ann
```

## Default arguments

A function can be *called* with any number of arguments. If a parameter is not provided, but listed in the declaration, then its value becomes `undefined`.

For instance, a function `showMessage(from, text)` can actually be called with a single argument:

```js
showMessage("Ann");
```

Normally, such call would output `**Ann**: undefined`, because `text === undefined`.

But we can modify the function to detect missed parameter and assign a "default value" to it:

```js
//+ run
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}

showMessage("Ann", "Hello!"); // Ann: Hello!
*!*
showMessage("Ann"); // Ann: no text given
*/!*
```

Optional arguments are usually given at the end of the list.

There are three most used ways to assign default values:

<ol>
<li>We can check if the argument equals `undefined`, and if yes then assign a default value to it. That's demonstrated by the example above.</li>
<li>Use operator `||`:

```js
function showMessage(from, text) {
  text = text || 'no text given';
  ...
}
```

This way is shorter, but the argument is considered missing also if it's falsy, like an empty line, `0` or `null`.
</li>
<li>ES-2015 introduces an neater syntax for default values:

```js
//+ run
function showMessage(from, *!*text = 'no text given'*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text for you
```

Here `'no text given'` is a string, but it can be any other value or expression, which is only evaluated and assigned if the parameter is missing.

This syntax is not yet widely supported in the browsers, but available with the help of transpilers like Babel.
</li>
</ol>

A call may also provide more arguments than listed, for instance: `showMessage("Ann", "Hello", 1, 2, 3)`. Later we'll see how to read such extra arguments.

## Returning a value

A function can do return a value into the calling code.

For instance, let's make a maths function `calcD` to calculate a [discriminant of a quadratic polynomial] using the formula <code>b<sup>2</sup> - 4ac</code>:

```js
//+ run no-beautify
function calcD(a, b, c) {
  *!*return*/!* b*b - 4*a*c;
}

// discriminant for: -4x^2 + 2x + 1
let test = calcD(-4, 2, 1);
alert(test); // 20
```

The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `test` above).

There may be many returns, for instance: 

```js
//+ run
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Got a permission from the parents?');
  }
}

let age = prompt('How old are you?', 18);

if ( checkAge(age) ) {
  alert( 'Access granted' );
} else {
  alert( 'Access denied' );
}
```

The `return` can be used without a value, to exit from the function immediately.

For example:

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
*!*
    return;
*/!*
  }

  alert( "Showing you the movie" ); // (*)  
  // ...
}
```

In the code above, if `checkAge(age)` returns `false`, then `showMovie` won't proceed to the `alert`. 


[smart header="A result with an empty or absent `return` returns `undefined`"]
If a function does not return a value, it is considered to return `undefined`:

```js
//+ run
function doNothing() { /* пусто */ }

alert( doNothing() ); // undefined
```

The same happens when the `return` has no argument:

```js
//+ run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```

[/smart]

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb.

Usually, function names have verbal prefixes which vaguely describe the action.

Functions that shart with `"show"` -- usually show something:

```js
//+ no-beautify
showMessage(..)     // shows a message
```

<ul>
<li>Functions starting with `"get"` -- allow to get something,</li>
<li>with `"calc"` -- calculate something,</li>
<li>with `"create"` -- create something,</li>
<li>with `"check"` -- check something and return a boolean, etc.</li>
</ul>


```js
//+ no-beautify
getAge(..)          // returns the age (gets it somehow)
calcD(..)           // calculate a discriminant and return the result
createForm(..)      // create a form, usually returns it
checkPermission(..) // check a permission, return true/false
```

Most prefixes are reused across multiple projects and understood by the community.

That's very convenient: a glance on a function name gives an understanding what it does and what kind of value it returns.

[smart header="One function -- one action"]
A function should do exactly what is suggested by its name. If many subactions are involved and the code becomes large -- maybe it's worth to separate them in their functions.

By all means, two independant actions deserve two functions, even if they are related.

A few examples of "shouldn't" to see what I mean here:
<ul>
<li>`getAge` should not show update `age` or change it or show anything to the visitor.</li>
<li>`calcD` should not save a calculated discriminant "for future reuse". It should only calculate it.</li>
<li>`createForm` should not show the form to the user or modify something in the document. It should only create it.</li>
<li>`checkPermission` should only perform the check and return the result. Not display the `access granted/access denied` message.</li>
</ul>
[/smart]


[smart header="Ultrashort function names"]
Functions that are used *very often* sometimes have ultrashort names.

For example, [jQuery](http://jquery.com) framework defines a function `$`, [LoDash](http://lodash.com/) library has it's core function named `_`.
[/smart]


## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

<ul>
<li>Values passed in a function call become its local variables.</li>
<li>A function can declare local variables.</li>
<li>A function can return a value. If it doesn't then its result is `undefined`.</li>
</ul>

It is possible for a function to access variables defined outside of it.

But to make the code cleaner and easier to understand, it's recommended to use local variables and parameters instead as much as possible.

It is always easier to understand a function which gets parameters `a, b, c`, works with them and returns a result, than a function which gets no parameters, but modifies outer `a, b, c` somewhere in it's code.

Function naming:

<ul>
<li>A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.</li>
<li>A function is an action, so function names are usually verbal.</li>
<li>There is a bunch of commonly adapted verbal prefixes like `create…`, `show…`, `get…`, `check…` etc which can help. The main point is to be consistent about their meaning.</li>
</ul>

Functions are the main building blocks of scripts. Now we covered the basics, so we actually can use them.

But we are going to return to them, going more deeply in their advanced features.


