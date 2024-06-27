# Functions

Quite often we find ourselves in need to execute the same action multiple times throughout the script.

For example, we need to show a nice-looking message when a visitor logs in, logs out and maybe somewhere else.

Functions are the main "building blocks" of the program. They allow the code to be executed multiple times without repeating the code again and again.

We've already seen examples of built-in functions, like `alert(message)`, `prompt(message, default)` and `confirm(question)`. But we can create functions of our own as well.

## Function Declaration

To create a function we can use a *function declaration*.

It looks like this:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

The `function` keyword goes first, then goes the *name of the function*, then a list of *parameters* between the parentheses (comma-separated, empty in the example above, we'll see examples later) and finally the code of the function, also named "the function body", between curly braces.

```js
function name(parameter1, parameter2, ... parameterN) {
 // function body
}
```

Our new function can be called by its name: `showMessage()`.

For instance:

```js run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

The call `showMessage()` executes the code of the function. Here we will see the message two times.

This example clearly demonstrates one of the main purposes of functions: to avoid code duplication.

If we ever need to change the message or the way it is shown or if we want to change the functionality of a function completely, we only need to modify function's body.

## Local variables

A variable declared inside a function is only visible inside that function.

For example:

```js run
function showMessage() {
*!*
  let message = "Hello, I'm JavaScript!"; // local variable
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function
```
Here in the given example, message is a local variable, which means it exists only within the function scope, i.e., between the curly braces of the function. Outside the function, no one knows it exists, no one can use it, and no one can modify it.

## Outer variables

A function can access an outer variable as well, for example:

```js run no-beautify
let *!*userName*/!* = 'John';

function showMessage() {
  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, John
```

The function has full access to the outer variable. It can modify it as well.

For instance:

```js run
let *!*userName*/!* = 'John';

function showMessage() {
  *!*userName*/!* = "Bob"; // (1) changed the outer variable

  let message = 'Hello, ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // *!*John*/!* before the function call

showMessage();

alert( userName ); // *!*Bob*/!*, the value was modified by the function
```

The outer variable is only used if there's no local one.

If a same-named variable is declared inside the function then it *shadows* the outer one. For instance, in the code below the function uses the local `userName`. The outer one is ignored:

```js run
let userName = 'John';

function showMessage() {
*!*
  let userName = "Bob"; // declare a local variable
*/!*

  let message = 'Hello, ' + userName; // *!*Bob*/!*
  alert(message);
}

// the function will create and use its own userName
showMessage();

alert("Hello "+ userName ); // *!*Hello John*/!*, unchanged, the function did not access the outer variable
```

```smart header="Global variables"
Variables declared outside of any function, such as the outer `userName` in the code above, are called *global* variables.

Global variables are visible from any function (unless shadowed by locals).

It's a good practice to minimize the use of global variables. Modern code has few or no global variables. Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.
```

## Parameters

```smart header="Note to people who know languages like Java and C++"

In Java, C++, and many other languages when parameters are defined, their types are also defined along with them.
That is not the case with JavaScript; in JavaScript, a parameter can receive any kind of value without the need to explicitly define its type.

```java 
void JavaFun(Type1 para1 , Type2 para2, ...., TypeN paraN){
  //function body
}
```  

In the example above you can see that a java function is defined by the name `JavaFun` and it has a return type and the parameters also have type.
```

We can pass arbitrary data to functions using parameters.

In the example below, the function has two parameters: `from` and `text`.

```js run
function showMessage(*!*from, text*/!*) { // parameters: from, text
  alert(from + ': ' + text); //parameters getting used in function body
}

*!*showMessage('Ann', 'Hello!');*/!* // Ann: Hello! (*)
*!*showMessage('Ann', "What's up?");*/!* // Ann: What's up? (**)
```

When the function is called in lines `(*)` and `(**)`, the given values (Ann , Hello) & (Ann, What's up?) are copied to parameters `from` and `text`. Then the function uses them.

Here's one more example: 
we have a variable `Name` that is passed to the function. Please note: the function changes `from` that is passed the value of `Name`, but the change is not seen outside, because a function always gets a copy of the value (with exceptions of array , objects and functions, explained later):

```js run
function showMessage(from, text) { //here 'from' and 'text' are parameters

*!*
  from = '*' + from + '*'; // make "from" look nicer
*/!*

  alert( from + ': ' + text );
}

let Name = "Ann";

showMessage(Name, "Hello"); // *Ann*: Hello , here 'Name' and 'Hello' are arguments

// the value of "from" is the same, the function modified a local copy
alert( from ); // Ann
```

When values are passed to a function's parameters, those values are called *arguments*.

In simple terms:

- **Parameters** are the variable listed inside the parentheses of `function showMessage(from , text){...}` during function declaration. (it is a declaration-time term).
- **Arguments** are the value that are passed to the function during call `showMessage('Ann' ,'hello');`, these values are stored in Parameters and gets used in function body (arguments is a call-time term).


In the example above : "the function `showMessage` is declared with two parameters `from` and `text`, then called with two arguments: `Name` (Name='Ann') and `"Hello"`.


## Default values

If a function is called, but an argument is not provided, then the corresponding value becomes `undefined`.

For instance,the earlier mentioned function `showMessage(from, text)` can be called with a single argument or no argument at all:

```js
showMessage("Ann");
showMessage();
```

That's not an error. Such calls would output `"*Ann*: undefined"` for 1st line and `"*undefined*: undefined"` for 2nd line. Because when the value/s for `from` and `text` are not passed, they become `undefined`.

We can specify the "default" value of a parameter during the declaration of function, using `=` operator:

```js run
function showMessage(from, *!*text = "no text given"*/!*) {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
showMessage(); //User: no text given
```

Now if second argument is not passed during the call, the default value `"no text given"` will be used for `text` and if both values are not passed during the call then default values will be used for `text` and "undefined" will be used for `from`.

Since the first parameter in function declaration is `from` , first argument will correspond to `from` and similarly `text` will correspond to the second argument passed , their position can't be interchanged during call, it has to be done manually in function declaration.

You can't do :
```js
showMessage("hello","Ann"); //hello: Ann
```
Expecting the output to be "Ann: hello", because now "hello" is stored in `from` and "Ann" is stored in `text` and used accordingly, giving the output as `hello: Ann`.

The default value is also used if the argument passed strictly equals `undefined`, like this:

```js
showMessage("Ann", undefined); // Ann: no text given
```

In our example above a simple String value `"no text given"` is used, but it can be a more complex expression, which is evaluated and assigned to the parameter if no argument is passed or `undefined` is passed. So, this is also possible:

```js run
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() is called for a value if nothing is passed to "text" parameter
  // its result becomes the value of text
}
```

```smart header="Evaluation of default parameters"
In JavaScript, a default parameter is evaluated every time a function is called without the respective arguments.

In the example above, `anotherFunction()` isn't called at all, if the `text` parameter is provided a value other than `undefined` , even if the value is an empty string or null.

On the other hand, it's independently called every time if the argument for `text` is missing or `undefined` is passed to it.
```

### Alternative default parameters

Several years ago, JavaScript didn't support the syntax for default parameters. So people used other ways to specify them, they are still widely used for different scenarios.

Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.

We can check if the parameter is passed during the function execution, by comparing it with `undefined`:

```js run
function showMessage(text) {
  // ...

*!*
  if (text === undefined) { // if the parameter is missing
    text = 'empty message';
  }
*/!*

  alert(text);
}

showMessage(); // empty message
```

...Or we could use the `||` operator:

```js
function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
  text = text || 'empty';
  ...
}
```
Both of these approaches were commonly used before additional methods for default parameters were added to JavaScript.

Modern JavaScript engines support the [nullish coalescing operator](info:nullish-coalescing-operator) `??`, it's better when most falsy values, such as `0`, should be considered as a "normal" values:

```js run
function showCount(count) {
  // if count is undefined or null, show "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown ,because count===undefined when nothing is passed
showCount(false); //false
showCount(undefined) //unknown
```

In conclusion, you will use old methods along with the new ones for different scenarios, because the old ones are still useful for many cases.

## Returning a value

A function can return a value back into the calling code as the result.

The simplest example would be a function that sums two values:

```js run no-beautify
function sum(a, b) {
  *!*return*/!* a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

The directive `return` can be in any place of the function. When the execution reaches it, the function stops, and the value is returned to the calling code (assigned to `result` above).

There may be many occurrences of `return` in a single function. For instance:

```js run
function checkAge(age) {
  if (age >= 18) {
*!*
    return true;
*/!*
  } else {
*!*
    return confirm('Do you have permission from your parents?');
*/!*
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

````smart header="A function with an empty `return` or without it returns `undefined`"
If a function does not return a value, it is the same as if it returns `undefined`:

```js run
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

An empty `return` is also the same as `return undefined`:

```js run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
````

````warn header="Never add a newline between `return` and the value"
For a long expression in `return`, it might be tempting to put it on a separate line, like this:

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```
It won't work because JavaScript will automatically insert a semicolon after return, assuming it's the end of the line. So, the code actually becomes:

```js
return*!*;*/!*
 (some + long + expression + or + whatever * f(a) + f(b))
```

Now, what you have is an empty return.

If we want the returned expression to wrap across multiple lines, we should start it at the same line as `return`, or at least place the opening parentheses there. This makes it clear that the line is not complete until the closing parentheses is provided:

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
  )
```
And it will work just as we expect it to.
````

## Naming a function [#function-naming]

Functions are actions. So their name is usually a verb. It should be brief, as accurate as possible and describe what the function does, so that someone reading the code gets an indication of what the function does.

It is a widespread practice to start a function with a verbal prefix which vaguely describes the action. There must be an agreement within the team on the meaning of the prefixes.

For instance, functions that start with `"show"` usually show something.

Function starting with...

- `"get…"` -- return a value,
- `"calc…"` -- calculate something,
- `"create…"` -- create something,
- `"check…"` -- check something and return a boolean, etc.

Examples of such names:

```js no-beautify
showMessage(..)     // shows a message
getAge(..)          // returns the age (gets it somehow)
calcSum(..)         // calculates a sum and returns the result
createForm(..)      // creates a form (and usually returns it)
checkPermission(..) // checks a permission, returns true/false
```

With prefixes in place, a glance at a function name gives an understanding what kind of work it does and what kind of value it returns.

```smart header="One function -- one action"
A function should do exactly what is suggested by its name, no more.

Two independent actions usually deserve two functions, even if they are usually called together (in that case we can make a 3rd function that calls those two).

A few examples of breaking this rule:

- `getAge` -- would be bad if it shows an `alert` with the age (should only get).
- `createForm` -- would be bad if it modifies the document, adding a form to it (should only create it and return).
- `checkPermission` -- would be bad if it displays the `access granted/denied` message (should only perform the check and return the result).

These examples assume common meanings of prefixes. You and your team are free to agree on other meanings, but usually they're not much different. In any case, you should have a firm understanding of what a prefix means, what a prefixed function can and cannot do. All same-prefixed functions should obey the rules. And the team should share the knowledge.
```

```smart header="Ultrashort function names"
Functions that are used *very often* sometimes have ultrashort names.

For example, the [jQuery](https://jquery.com/) framework defines a function with `$`. The [Lodash](https://lodash.com/) library has its core function named `_`.

These are exceptions. Generally function names should be concise and descriptive.
```

As for the Naming rules, they are same as variable naming rules
 
- Function names can contain letters (A-Z, a-z), digits (0-9), underscores (`_`), and dollar signs (`$`).
- The first character of a function name must be a letter, an underscore (`_`), or a dollar sign (`$`).

## Functions == Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth it to split the function into a few smaller functions. Sometimes following this rule may not be that easy, but it's definitely a good thing.

A separate function is not only easier to test and debug -- its very existence is a great comment!

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```js
function showPrimes(n) {
  nextPrime: for (let i = 2; i < n; i++) {

    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test for primality:

```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand, isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

So, functions can be created even if we don't intend to reuse them. They structure the code and make it readable.

## Call by Value / Call by Reference

As stated in the Parameters section, when values are passed to a function, their copies are assigned to the parameters. Any modifications to these parameters within the function body do not affect the original values passed as arguments. Although, technically this is always true in JavaScript, practical behavior can differ.

There are two ways to pass a value:

- **Call by Value** - When a value is passed to a function and a copy of that value is made, any modification to the value within the function does not affect the original value. This is called `call by value`.
- **Call by Reference** - When a value is passed to a function and, instead of making a copy, the original value is used in the function, any modification to the value within the function affects the original value. This is called `call by reference`.

In JavaScript, values are always passed by value. That is, a copy of the value is made and any modification to the value within the function does not affect the original value. However, the complication arises when the value passed is not the actual value but a memory address or reference to the value. Modifying the value using that address/reference affects the original value, effectively causing `call by reference`.

In JavaScript, `Arrays` and `Objects`(discussed in detail in later chapters) are such values that are not actual values but references to the addresses of the values. When they are passed as arguments, their address or reference is copied to the parameters, effectively referring to the same values. Consequently, any modification now affects the original data.

## Summary

A function declaration looks like this:

```js
function name(parameters, delimited, by, comma) {
  /* code */
}
```

- Values passed to a function as arguments are copied to its parameters and used in functions body.
- A function may access outer variables. But it works only from inside out. The code outside of the function doesn't see its local variables.
- A function can return any value. If it doesn't, then its result is `undefined`.But remember it can only return one value. You can do as :
```js
function Hello(){
  return "Hello","world" ; 
}
```
while you cannot directly return multiple values from a function, you can encapsulate multiple values within an array or an object and return that composite structure.

To make the code clean and easy to understand, it's recommended to use mainly local variables and parameters in the function, not outer variables.

It is always easier to understand a function which gets parameters, works with them and returns a result than a function which gets no parameters, but modifies outer variables as a side effect.

Function naming:

- A name should clearly describe what the function does. When we see a function call in the code, a good name instantly gives us an understanding what it does and returns.
- A function is an action, so function names are usually verbal.
- There exist many well-known function prefixes like `create…`, `show…`, `get…`, `check…` and so on. Use them to hint what a function does.

Functions are the main building blocks of scripts. Now we've covered the basics, so we actually can start creating and using them. But that's only the beginning of the path. We are going to return to them many times, going more deeply into their advanced features.
