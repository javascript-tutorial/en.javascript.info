
Let's output it using `alert`:

```js
//+ run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // shows the function code
*/!*
```

Note that there are no brackets after `sayHi` in the last line. The function is not called there. 

The code above only shows the string representation of the function, that is it's source code.

[cut]


As the function is a value, we can copy it to another variable:

```js
//+ run no-beautify
function sayHi() {   // (1)
  alert( "Hello" ); 
}

let func = sayHi;    // (2)
func(); // Hello     // (3)

sayHi = null;        // (4)
sayHi();             // error 
```

<ol>
<li>Function declaration `(1)` creates the function and puts it into the variable `sayHi`"</li>
<li>Line `(2)` copies it into variable `func`. 

Please note again: there are no brackets after `sayHi`. If they were, then the call `let func = sayHi()` would write a *result* of `sayHi()` into `func`, not the function itself.</li>
<li>At the moment `(3)` the function can be called both as `sayHi()` and `func()`.</li>
<li>...We can overwrite `sayHi` easily. As well as `func`, they are normal variables. Naturally, the call attempt would fail in the case `(4)`.</li>
</ol>

[smart header="A function is an \"action value\""]
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

A function declaration creates that action and puts it into a variable of the given name. Then we can run it via brackets `()` or copy into another variable.
[/smart]
