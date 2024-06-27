# Loops: while and for

We often need to repeat actions.

For example, outputting goods from a list one after another or just running the same code for each number from 1 to 10.

*Loops* are a way to repeat the same code multiple times.

```smart header="The for..of and for..in loops"
A small announcement for advanced readers.

This article covers only basic loops: `while`, `do..while` and `for(..;..;..)`.

If you came to this article searching for other types of loops, here are the pointers:

- See [for..in](info:object#forin) to loop over object properties.
- See [for..of](info:array#loops) and [iterables](info:iterable) for looping over arrays and iterable objects.

Otherwise, please read on.
```

## Understanding loops

 There are basically three parts to any loop - `Initialization , Condition and Iteration`.
- **Initialization** refers to the phase where variables essential for the loop's execution are defined and initialized. This typically involves setting up the initial state of loop control variables(variables that will be used in condition part of loop).

- **Condition** is a crucial part of the loop that determines whether the loop should continue executing or terminate. It consists of a Boolean expression that evaluates to `true` or `false`, which guide the loop's iteration.


- **Iteration update** involves updating the control variables, during or after each iteration, variables initialized during the initialization phase are modified to progress towards the exit condition defined in the loop's **condition** part.

As you learn about each loop, try to visualize where does `Initialization` , `Condition` and `Iteration update` fits, for each loop. It will help you understand the loops better.

**Note**:- Both updating of control variables (that are used in condition part of loop) and running the code block of the loop are refered as **Iteration**.

## The "while" loop

The `while` loop has the following syntax:

```js
while (condition) {
  // code
  // so-called "loop body"
}
```

While the `condition` is truthy, the `code` from the loop body is executed.

For instance, the loop below outputs `i` while `i < 3`:

```js run
let i = 0;     //initalization
while (i < 3)  //Condition
{
  alert( i );
  i++;         //iteration update (control variable updated)
}
```

A single execution of the loop body is called *an iteration*. The loop in the example above makes three iterations.

If `i++` was missing from the example above, the loop would repeat (in theory) forever. In practice, the browser provides ways to stop such loops, and in server-side JavaScript, we can kill the process.

Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by `while`.

For instance, a shorter way to write `while (i != 0)` is `while (i)`,given that `i` don't become one of other four falsy values (null , undefined, false, "") :

```js run
let i = 3;
*!*
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
*/!*
  alert( i );
  i--;
}
```

````smart header="Curly braces are not required for a single-line body"
If the loop body has a single statement, we can omit the curly braces `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
The alert statement need not to be in the same line as while() , this is true for all loops when loop body have only one statement.

```js run
let i = 3;
*!*
while (i) 
  alert(i--);
*/!*
  alert('This statement is not a part of While()');

```
In summary, curly braces are necessary for multiple lines of code within a loop. However, it is recommended to always use curly braces even for single lines to enhance readability and facilitate future code additions.
````

## The "do..while" loop

The condition check can be moved *below* the loop body using the `do..while` syntax:

```js
do {
  // loop body
} while (condition);
```

The loop will first execute the body, then check the condition, and, while it's truthy, execute it again and again.

For example:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

This form of syntax should only be used when you want the body of the loop to execute **at least once** regardless of the condition being truthy. Usually, the other form is preferred: `while(…) {…}`.

## The "for" loop

The `for` loop is more complex, but it's also the most commonly used loop.

It looks like this:

```js
for (initialization; condition; iteration update) {
  // ... loop body ...
}
```

Let's learn the meaning of these parts by example. The loop below runs `alert(i)` for `i` from `0` up to (but not including) `3`:

```js run
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert(i);
}
```

Let's examine the `for` statement part-by-part:

| part  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| initialization | `let i = 0`    | Executes once upon entering the loop.                                      |
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |
| iteration update | `i++`      | Executes after the body on each iteration |

The general loop algorithm works like this:

```
Run initialization
→ (if (condition) → run body and run iteration_update)
→ (if (condition) → run body and run iteration_update)
→ (if (condition) → run body and run iteration_update)
→ ...
```

That is, `Initialization` executes once, and then for each iteration of the loop `condition` is checked,if `true` , `body` is run and then `iteration update ` is done

If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.

Here's exactly what happens in our case:

```js
// for (let i = 0; i < 3; i++) alert(i)

// initialize control variable/s ,run only once
let i = 0;

// check condition
if (i < 3) 
// run the body
{ alert(i); 
// update control varibles
i++;
}

// check condition
if (i < 3) 
// run the body
{ alert(i); 
// update control varibles
i++;
}

// check condition
if (i < 3) 
// run the body
{ alert(i); 
// update control varibles
i++;
}

// ...finish, because now i == 3 , condition became falsy
```

````smart header="Inline variable declaration"
Here, the "counter" variable `i` is declared right in the loop. This is called an "inline" variable declaration. Such variables are visible only inside the loop.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no such variable
```

Instead of defining a variable, we could use an existing one:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // use an existing variable
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop
```
````

### Skipping parts

Any part of `for` can be skipped.

For example, we can omit `initialization` if we don't need to do anything at the loop start.

Like here:

```js run
let i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "initialization"
  alert( i ); // 0, 1, 2
}
```

We can also remove the `iteration update` part:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

This makes the loop identical to `while (i < 3)`.

We can actually remove everything, creating an infinite loop:

```js
for (;;) {
  // repeats without limits
}
```

Please note that the two `for` semicolons `;` must be present. Otherwise, there would be a syntax error.

## Breaking the loop

Normally, a loop exits when its condition becomes falsy.

But we can force the exit at any time using the special `break` directive.

For example, the loop below asks the user for a series of numbers, "breaking" when no number is entered:

```js run
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

The `break` directive is activated at the line `(*)` if the user enters an empty line or cancels the input. It stops the loop immediately, passing control to the first line after the loop. Namely, `alert`.

The combination `infinite loop + break` is great for situations when a loop's condition must be checked not in the beginning or end of the loop, but in the middle or even in several places of its body.

## Continue to the next iteration [#continue]

The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

We can use it if we're done with the current iteration and would like to move on to the next one.

The loop below uses `continue` to output only odd values:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

For even values of `i`, the `continue` directive stops executing the body and passes control to the next `iteration update` of `for`. So the `alert` is only called for odd values.

````smart header="The `continue` directive helps decrease nesting"
A loop that shows odd values could look like this:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an `if` block instead of using `continue`.

But as a side effect, this created one more level of nesting (the `if(..){...}` inside `for` loop). If the code inside `if` is longer than a few lines, that may decrease the overall readability.
````

````warn header="No `break/continue` to the right side of '?'"
Please note that syntax constructs that are not expressions (which can not be evaluated to be true or false) cannot be used with the ternary/conditional operator `?`. In particular, directives such as `break/continue` aren't allowed there.

For example, if we take this code:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...and rewrite it using a question mark:

```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...it stops working: there's a syntax error.

This is just another reason not to use the question mark operator `?` instead of `if`.
````

## Labels for break/continue

Sometimes we need to break out from multiple nested loops at once.

For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');
```

We need a way to stop the process if the user cancels the input.

The ordinary `break` after `input` would only break the inner loop, that's not sufficient. This is where labels, come to the rescue!

A `label` is an identifier with a colon, placed just before a loop or code block.

```js
labelName: for (...) {
  ...
}
```

The `break <labelName>` statement in the loop below breaks out to the label:

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

In the code above, `break outer` looks upwards for the label named `outer` and breaks out of that loop.

So the control goes straight from `(*)` to `alert('Done!')`.

We can also move the label onto a separate line:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

## Multiple Labels and Breaking Nested Loops

When dealing with deeply nested loops in JavaScript, you can label each loop to precisely control where to break out of the loop hierarchy using the `break` statement.

Remember when we are labelling multiple nested loops, like in code below, the label names must be unique, otherwise we will get syntax error.

Consider the following example:
```js no-beautify
*!*firstLabel:*/!* 
for (let i = 0; i < 3; i++) {

  *!*secondLabel:*/!*
  for (let j = 0; j < 3; j++) {

    *!*thirdLabel:*/!*
    for(let k = 0; k<3 ;k++) {

        let input = prompt(`Value at coords (${i},${j},${k})`, '');

        if(i===1 && j===1 && k===1)
        {
          *!*break <labelname>;*/!* //break out to provided labelname
        }
    }
    console.log('third loop ended');
  }
  console.log('second loop ended');
}

console.log('first loop ended');
```

In the provided code example, you can substitute any of the label names (firstLabel, secondLabel, thirdLabel) in place of \<labelname>. This allows the break statement to exit the loop labeled with the specified label when i = 1, j = 1, and k = 1.

For instance, replacing <labelname> with secondLabel causes the break statement to terminate the loop labeled secondLabel when i = 1, j = 1, and k = 1, after which the console logs "Second loop ended" and then the first loop will continue its execution.

## "Continue \<LabelName>"

The `continue` directive can also be used with a label. In this case, code execution jumps to the next iteration of the labeled loop.

```js run no-beautify
outerLoop: 
for (let i = 0; i < 3; i++) {
  console.log(`Outer loop iteration ${i}`);
  
  innerLoop: 
  for (let j = 0; j < 3; j++) {

    if (i === 1 && j === 1) {
      console.log("Skipping inner loop iteration 1 of outer loop iteration 1");
      continue outerLoop; // Continue to the next iteration of outerLoop
    }
    console.log(`  Inner loop iteration ${j}`);
  }
}

```

In the provided example when i=1 and j=1 `countinue outerLoop ;` is run ,causing the control to jump to `i++` of the outer loop and a new iteration of the first loop begins.

````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.

For example, it is impossible to do this:

```js
break label; // jump to the label below (doesn't work)

label: for (...)
```

A `break` directive must be inside a code block. Technically, any labelled code block will do, e.g.:

```js
label: {
  // ...
  break label; // works
  // ...
}
```

...Although, 99.9% of the time `break` is used inside loops, as we've seen in the examples above.

A `continue` is only possible from inside a loop.
````

## Summary

We covered 3 types of loops:

- `while` -- The condition is checked before each iteration.
- `do..while` -- The condition is checked after each iteration.
- `for (;;)` -- The condition is checked before each iteration, additional settings available.

To make an "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.

If we don't want to do anything in the current iteration and would like to forward to the next one, we can use the `continue` directive.

`break/continue` support labels before the loop. A label is the only way for `break/continue` to escape a nested loop to go to an outer one.
