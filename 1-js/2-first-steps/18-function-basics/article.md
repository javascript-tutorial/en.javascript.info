# Function basics

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

The function has a full access to an outer variable. It can modify it as well.

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

Let's note that an outer variable is only used if there's no local with the same name.

For example, if we had `let` before `userName` in the line (1) then the function would have a local variable `userName` and use it instead of the outer one. This process is called "shadowing".

In the code below the local `userName` shadows the outer one:

```js
//+ run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declare a local variable 
*/!*

  let message = 'Hello, my name is ' + userName;
  alert(message);
}

// the function will create and use it's own userName
showMessage();

*!*
alert( userName ); // John, the function did not access the outer variable
*/!*
```

[smart header="Global variables"]
Variables declared outside of any function, are called *global*.

Global variables are visible from any function. 

They should be only used to store the data of project-wide importance. Variables needed by specific tasks should reside in the corresponding functions. 
[/smart]

## Parameters

We can pass arbitrary data to the function using it's parameters (also called *function arguments*) .

In the example below, the function has two parameters: `from` and `text`.

```js
//+ run no-beautify
function showMessage(*!*from, text*/!*) { // arguments: from, text
  
  from = "[" + from + "]";

  alert(from + ': ' + text);
}

*!*
showMessage('Ann', 'Hello!'); // [Ann]: Hello!
showMessage('Ann', "What's up?"); // [Ann]: What's up?
*/!*
```

When the function is called, the values in the brackets are copied to local variables `from` and `next`. The function can modify them.

Note that the changes are not seen from outside:

```js
//+ run
function showMessage(from, text) {
*!*
  from = '[' + from + ']'; // changes the local from
*/!*
  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello");

// the old value of "from" is still here, the function modified a local copy
alert( from ); // Ann
```

## Default parameter values

A function can be called with any number of arguments. If a parameter is not provided, but listed in the declaration, then its value becomes `undefined`.

For instance, the aforementioned function `showMessage(from, text)` can be called with a single argument:

```js
showMessage("Ann");
```

That's not an error. Such call would output `"Ann: undefined"`, because `text === undefined`.

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
<li>ES-2015 introduced a neater syntax for default values:

```js
//+ run
function showMessage(from, *!*text = 'no text given'*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text for you
```

Here `'no text given'` is a string, but it can be any other value or expression, which is only evaluated and assigned if the parameter is missing.
</li>
</ol>

## Returning a value

A function can return a value into the calling code as the result.

The simplest example would be a function that sums two values:

```js
//+ run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many uses of `return` in a function. For instance: 

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

It is possible to use `return` without a value. That causes the function to exit immediately.

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


[smart header="A function with an empty `return` or without it returns `undefined`"]
If a function does not return a value, it is the same as if it returns `undefined`:

```js
//+ run
function doNothing() { /* empty */ }

alert( doNothing() ); // undefined
```

An empty `return` is also the same as `return undefined`:

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

There is an agreement within the team on the terms here. For instance, functions that start with `"show"` -- usually show something:

```js
//+ no-beautify
showMessage(..)     // shows a message
```

Function starting with...
<ul>
<li>`"get"` -- allow to get something,</li>
<li>`"calc"` -- calculate something,</li>
<li>`"create"` -- create something,</li>
<li>`"check"` -- check something and return a boolean, etc.</li>
</ul>

Examples of such names:

```js
//+ no-beautify
getAge(..)          // return the age (get it somehow)
calcSum(..)         // calculate a sum and return the result
createForm(..)      // create a form, usually returns it
checkPermission(..) // check a permission, return true/false
```

The agreement about prefixes is very convenient. A glance on a function name, even on the prefix of it, gives an understanding what it does and what kind of value it returns.

[smart header="One function -- one action"]
A function should do exactly what is suggested by its name. 

Two independant actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function calling those two).

Few examples of breaking this rule:
<ul>
<li>`getAge` -- if shows the age to the visitor (should only get).</li>
<li>`createForm` -- if modifies the document, adds a form to it (should only create it and return).</li>
<li>`checkPermission` -- if displays the `access granted/denied` message or stores the result of the check anywhere (should only perform the check and return the result).</li>
</ul>
[/smart]


[smart header="Ultrashort function names"]
Functions that are used *very often* sometimes have ultrashort names.

For example, [jQuery](http://jquery.com) framework defines a function `$`, [LoDash](http://lodash.com/) library has it's core function named `_`.

These are exceptions though. Generally the functions names should be concise, but descriptive.
[/smart]


## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

<ul>
<li>Values passed to function as parameters are copied to its local variables.</li>
<li>A function may access outer variables. But it works only one-way. The code outside of the function doesn't see its local variables.</li>
<li>A function can return a value. If it doesn't then its result is `undefined`.</li>
</ul>

It is possible for a function to access variables defined outside of it.

But to make the code cleaner and easier to understand, it's recommended to use local variables and parameters instead as much as possible.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side-effect.

Function naming:

<ul>
<li>A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.</li>
<li>A function is an action, so function names are usually verbal.</li>
<li>There is a bunch of commonly adapted verbal prefixes like `create…`, `show…`, `get…`, `check…` etc which can help. The main point is to be consistent about their meaning.</li>
</ul>

Functions are the main building blocks of scripts. Now we covered the basics, so we actually can use them.

But we are going to return to them, going more deeply in their advanced features.


