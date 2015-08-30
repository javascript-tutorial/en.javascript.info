# Loops: while and for

We often have a need to perform similar actions many times in a row.

For example, when we need to output goods from the list one after another. Or just write the same code for each number from 1 to 10.

*Loops* are a way to repeat the same part code multiple times.

[cut]
## The "while" loop

The `while` loop has the following syntax:

```js
while (condition) {
  // code, loop body
}
```

While the `condition` is true -- the `code` from the loop body is executed.

For instance, the loop below outputs `i` while `i<3`:

```js
//+ run
var i = 0;
while (i < 3) {
  alert( i );
  i++;
}
```

There's a special term *iteration* for each loop run. The loop in the example above makes 3 iterations.

If there were no `i++` in the example above, the loop would repeat (in theory) forever. In practice, the browser would show a message about a "hanging" script and let the user stop it.

The `condition` is treated as a logical value, so instead of `while (i!=0)` we usually write `while (i)`:

```js
//+ run
var i = 3;
*!*
while (i) { // when i becomes 0, the condition is falsy and the loop stops
*/!*
  alert( i );
  i--;
}
```

[smart header="Brackes are not required for a single-line body"]

If the loop body has a single statement, we can omit the brackets `{…}`:

```js
//+ run
var i = 3;
*!*
while (i) alert(i--);
*/!*
```
[/smart]

## The "do..while" loop

The condition check can be moved *below* the loop body using the `do..while` syntax:

```js
do {
  // loop body
} while (condition);
```

The loop will first execute the body and then check the condition. 

For example:

```js
//+ run
var i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

This form of syntax is rarely used, because the ordinary `while` is more obvious. We don't need to eye down the code looking for the condition. Neither we need to ask ourselves a question why it is checked at the bottom.

## The "for" loop

The `for` loop is actually the most often used one.

It looks like this:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

An example of the loop which runs `alert(i)` for `i` from `0` to `3` not including `3`:

```js
//+ run
var i;

for (i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert( i );
}
```

Here:
<ul>
<li>**Begin:** `i=0`.</li>
<li>**Condition:** `i<3`.</li>
<li>**Step:** `i++`.</li>
<li>**Body:** `alert(i)`, the code inside figure brackets. Brackets not required for a single statement.</li>
</ul>

The loop execution follows these steps:

<ol>
<li>Begin: `i=0` executes only once upon entering the loop.</li>
<li>Condition: `i<3` is checked before every iteration including the first one. If it fails, the loop stops.</li>
<li>Body: `alert(i)` runs is the condition is truthy.</li>
<li>Step: `i++` executes after the `body` on each iteration, but before the `condition` check.</li>
<li>Continue to step 2.</li>
</ol>

In other words, the execution flow is: `begin` -> (if `condition` -> run `body` and `step`) -> (if `condition` -> run `body` and `step`) -> ... and so on while the `condition` is truthy.

[smart header="Inline variable declaration"]
We can declare a "counter" variable right in the beginning of the loop.

```js
//+ run no-beautify
for (*!*var*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
```
[/smart]


## Skipping of "for" parts

Any part of the `for` can be skipped.

For example, we can remove `begin`, or move it before the actual `for`, like here:

```js
//+ run
var i = 0;

for (; i < 3; i++) { 
  alert( i ); // 0, 1, 2
}
```

It would work same as `for(var i=0; ...)`.

We can also remove the `step` part:

```js
//+ run
var i = 0;

for (; i < 3;) {
  alert( i );
  // the loop became identical to while (i<3)
}
```

We can actually remove everything, thus creating an infinite loop:

```js
for (;;) {
  // repeats without limits
}
```

Although the semicolons `;` must present, otherwise it would be a syntax error.

[smart header="`for..in`"]
There is also a special construct `for..in` to iterate over object properties.

We'll get to it later while [talking about objects](#for..in).
[/smart]


## Breaking the loop

Normally the loop exists when the condition becomes falsy.

But we can force the exit any moment. There's a special `break` directive for that.

For example, this code calculates the sum of numbers until the user keeps entering them. And then outputs it:

```js
var sum = 0;

while (true) {

  var value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

The `break` directive is activated in the line `(*)` if the user enters an empty line or cancels the input. It stops the loop immediately, passing the control to the first line after it's loop. Namely, `alert`.

Actually, the composition: "an infinite loop + break" is a great thing for situations when the condition must be checked not in beginning/end of the loop, but in the middle.

## Continue to the next iteration [#continue]

The `continue` is a younger sister of `break`. It doesn't break the whole loop, just the current body execution, as if it finished.

We can use it if we're done on the current iteration and would like to move to the next one.

The loop above uses `continue` to output only odd values:

```js
//+ run no-beautify
for (var i = 0; i < 10; i++) {
  
  *!*if (i % 2 == 0) continue;*/!*

  alert(i);
}
```

For even `i` the `continue` directive stops body execution, passing the control to the next iteration of `for` (with the next number).

[smart header="`continue` allows to decrease nesting level"]
A loop for odd-only values could look like this:

```js
for (var i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

From the technical point of view it's identical. Really, we can just wrap the code in the `if` block instead of `continue`.

But we got one more figure brackets nesting level. If the code inside `if` is longer than a few lines, that lowers the overall readability.
[/smart]

[warn header="No `break/continue` to the right side of '?'"]
Usually it is possible to replace `if` with a question mark operator `'?'`.

The code:

```js
if (condition) {
  a();
} else {
  b();
}
```

...Is identical to:

```js
condition ? a() : b();
```

In both cases either `a()` or `b()` is executed depending on the `condition`. 

Please note that syntax constructs that do not return a value cannot be used in `'?'`. Directives `break/continue` are not expressions. They are disallowed here.

The code below will give a syntax error:

```js
//+ no-beautify
(i > 5) ? alert(i) : *!*continue*/!*;
```

That's one more reason not to use a question mark operator `'?'` instead of `if`.
[/warn]

## Labels for break/continue

Sometimes we need to break out from multiple nested loops at once.

For example, in the code below we loop over `i` and `j` asking for values on coordinates `(i, j)` from `(0,0)` to `(3,3)`: 


```js
//+ run no-beautify
for (var i = 0; i < 3; i++) {

  for (var j = 0; j < 3; j++) {
    
    var input = prompt(`Value at coords (${i},${j})`, '');
    // do something with the value...

  }
}

alert('Done!');
```

Let's say we need a way to stop the process. Like if we user decides to cancel the input.

The ordinary `break` after `input` would only break the iterations over `j`. That's not sufficient.

A *label* is an identifier with a colon before a loop:
```js
labelName: for(...) {
  ...
}
```

We can put the `labelName` after a break statement, and it will break out of the labelled loop.

Like here:

```js
//+ run no-beautify
*!*outer:*/!* for (var i = 0; i < 3; i++) {

  for (var j = 0; j < 3; j++) {
    
    var input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}
alert('Done!');
```

In the code above `break outer` looks upwards for the label named `outer` and breaks out of that loop.

So the control goes straight from `(*)` to `alert('Done!')`.

We can also move a label into the separate string:

```js
//+ no-beautify
outer: 
for (var i = 0; i < 3; i++) { ... }
```

The `continue` directive can also be used with a label. In this case the execution would jump onto the next iteration of the labelled loop.

[warn header="Labels are not Goto"]
Labels do not allow to jump into an arbitrary place of code.

For example, it is impossible to do like this:
```js
break label;  // jumps to label? No. 

label: for(...)
```

The call to a `break` is only possible from inside the loop, and the label must be somewhere upwards from the `break`.
[/warn]

## Summary

There are 3 types of loops in JavaScript:

<ul>
<li>`while` -- the condition is checked before each iteration.</li>
<li>`do..while` -- the condition is checked after each iteration.</li>
<li>`for` -- the condition is checked before each iteration, additional settings available.</li>
</ul>

To make in "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

If we don't want to do anything more on this iteration and would like to forward on to the next one -- use the `continue` directive.

Both these directives support labels before the loop. A label is the only way for `break/continue` to go up the nesting and affect the outer loop.

