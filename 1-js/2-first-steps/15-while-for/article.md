# Loops: while and for

We often have a need to perform similar actions many times in a row.

For example, when we need to output goods from the list one after another. Or just run the same code for each number from 1 to 10.

*Loops* are a way to repeat the same part of code multiple times.

[cut]

## The "while" loop

The `while` loop has the following syntax:

```js
while (condition) {
  // code ("loop body")
}
```

While the `condition` is `true` -- the `code` from the loop body is executed.

For instance, the loop below outputs `i` while `i<3`:

```js run
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  alert( i );
  i++;
}
```

There's a special term *iteration* for each loop run. The loop in the example above makes 3 iterations.

If there were no `i++` in the example above, the loop would repeat (in theory) forever, eating 100% CPU. In practice, the browser would show a message about a "hanging" script and let the user stop it.

The `while` converts `condition` to a logical value. It can be any expression, not just a comparison.

For instance, the shorter way to write `while (i!=0)` could be `while (i)`:

```js run
let i = 3;
*!*
while (i) { // when i becomes 0, the condition is falsy and the loop stops
*/!*
  alert( i );
  i--;
}
```

````smart header="Brackes are not required for a single-line body"
If the loop body has a single statement, we can omit the brackets `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## The "do..while" loop

The condition check can be moved *below* the loop body using the `do..while` syntax:

```js
do {
  // loop body
} while (condition);
```

The loop will first execute the body and then check the condition.

For example:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

This form of syntax is rarely used, because the ordinary `while` is more obvious. We don't need to scroll down the code looking for the condition.

## The "for" loop

The `for` loop is actually the most often used one.

It looks like this:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

Let's see these parts in an example. The loop below runs `alert(i)` for `i` from `0` up to (but not including) `3`:

```js run
let i;

for (i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert( i );
}
```

Let's split the last example into parts:

begin: `i=0`
: Executes once upon entering the loop.

condition: `i<3`
: Checked before every loop iteration, if fails the loop stops.

body: `alert(i)`
: Runs again and again while the condition is truthy

step: `i++`
: Executes after the body on each iteration, but before the condition check.

The execution flow is:
```
Begin
  → (if condition → run body and run step)
  → (if condition → run body and run step)
  → ... repeat until the condition is falsy.
```

````smart header="Inline variable declaration"
We can declare a "counter" variable right in the beginning of the loop.

```js run no-beautify
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
```

The variable will be visible only inside the loop.
````

## Skipping parts

Any part of the `for` can be skipped.

For example, we can omit `begin` if we don't need to do anything at the loop start.

Like here:

```js run
let i = 0;

for (; i < 3; i++) {
  alert( i ); // 0, 1, 2
}
```

It would work same as `for(let i=0; ...)`.

We can also remove the `step` part:

```js run
let i = 0;

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

Please note that the semicolons `;` must present, otherwise it would be a syntax error.

```smart header="`for..in` and `for..of`"
There are special constructs: `for..in` and `for..of` for more advanced iterations over objects. 

We'll get to them later, in chapters about objects.
```

## Breaking the loop

Normally the loop exists when the condition becomes falsy.

But we can force the exit at any moment. There's a special `break` directive for that.

For example, this code below asks user for numbers and breaks if no number entered:

```js
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

The `break` directive is activated in the line `(*)` if the user enters an empty line or cancels the input. It stops the loop immediately, passing the control to the first line after it's loop. Namely, `alert`.

The composition: "infinite loop + break as needed" is a great thing for situations when the condition must be checked not in beginning/end of the loop, but in the middle. Or even in several places of the body.

## Continue to the next iteration [#continue]

The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead if stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done on the current iteration and would like to move on to the next.

The loop above uses `continue` to output only odd values:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body 
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

For even values of `i` the `continue` directive stops body execution, passing the control to the next iteration of `for` (with the next number). So the `alert` is only called for odd values.

````smart header="The directive `continue` helps to decrease nesting level"
A loop for odd-only values could look like this:

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

From the technical point of view it's identical. Surely, we can just wrap the code in the `if` block instead of `continue`.

But as a side-effect we got one more figure brackets nesting level. If the code inside `if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions cannot be used in `'?'`. In particular, directives `break/continue` are disallowed there.

For example, if one we took this code:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...And rewrote it using a question mark:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue not allowed here
```

...Then it won't work. The code like this will give a syntax error:


That's just another reason not to use a question mark operator `'?'` instead of `if`.
````

## Labels for break/continue

Sometimes we need to break out from multiple nested loops at once.

For example, in the code below we loop over `i` and `j` asking for values on coordinates `(i, j)` from `(0,0)` to `(3,3)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if I want to exit from here?

  }
}

alert('Done!');
```

Let's say we need a way to stop the process. Like if we user decides to cancel the input.

The ordinary `break` after `input` would only break the inner loop. That's not sufficient. Labels come to the rescue.

A *label* is an identifier with a colon before a loop:
```js
labelName: for(...) {
  ...
}
```

We can put the `labelName` after a break statement, and it will break out of the labelled loop.

Like here:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

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

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

The `continue` directive can also be used with a label. In this case the execution would jump onto the next iteration of the labelled loop.

````warn header="Labels are not a \"goto\""
Labels do not allow to jump into an arbitrary place of code.

For example, it is impossible to do like this:
```js
break label;  // jumps to label? No.

label: for(...)
```

The call to a `break/continue` is only possible from inside the loop, and the label must be somewhere upwards from the directive.
````

## Summary

There are 3 types of loops in JavaScript:

- `while` -- the condition is checked before each iteration.
- `do..while` -- the condition is checked after each iteration.
- `for` -- the condition is checked before each iteration, additional settings available.

To make in "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

If we don't want to do anything more on this iteration and would like to forward on to the next one -- the `continue` directive does it.

`Break/continue` support labels before the loop. A label is the only way for `break/continue` to escape the nesting and go to the outer loop.

