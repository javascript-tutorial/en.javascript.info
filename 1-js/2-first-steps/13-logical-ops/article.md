# Logical operators

There are three logical operators in JavaScript: `||` (OR), `&&` (AND), `!` (NOT). 

Although they are called "logical", they can be applied to values of any type, not only boolean. The result can also be of any type.

Let's see the details.

[cut]

## || (OR)

The "OR" operator is represented with two vertical line symbols:

```js
result = a || b;
```

In classical programming, logical OR is meant to manipulate boolean values. If any of it's arguments is `true`, then it returns `true`, otherwise -- returns `false`.

In JavaScript the operator is a little bit more tricky and powerful. But first let's see what happens with logical values.

A table of possible logical combinations:

```js
//+ run
alert( true || true ); // true
alert( false || true ); // true
alert( true || false ); // true
alert( false || false ); // false
```

As we can see, most results are truthy except for the case when `false` is at both sides.

If an operand is not boolean, then it's converted to boolean for the sake of evaluation.

For instance, a number `1` is treated as `true`, a number `0` -- as `false`:

```js
//+ run
if (1 || 0) { // works just like if( true || false )
  alert( 'truthy!' );
}
```

Mainly, OR is used in the `if` expression to test for *any* of given conditions.

For example:

```js
//+ run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'The office is closed.' ); 
}
```

We can pass more conditions:

```js
//+ run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
  alert( 'The office is closed.' ); // it is weekend 
}
```

## OR seeks the first truthy value

The logic described above is somewhat classical. Now let's see reconsider the logic of OR to cover nice features of JavaScript.

Given multiple OR'ed values:

```js
result = value1 || value2 || value3;
```

The OR `"||"` operator is doing the following:

<ul>
<li>Evalutes operands from left to right.</li>
<li>Returns the first value that would be truthy as a boolean, or the last one if all are falsy.</li>
<li>The value is returned "as is", without the conversion.</li>
</ul>

For instance:

```js
//+ run
alert( 1 || 0 ); // 1 (is truthy)
alert( true || 'no matter what' ); // (true is truthy)

alert( null || 1 ); // 1 (null is falsy, so 1)
alert( undefined || 0 ); // 0 (all falsy, so the last one)
```

This logic does not contradict to what was spoken above. If you check this behavior with the boolean table, you see that it still works the same.

But there leads to some interesting usages compared to a "pure, classical, boolean-only OR".

<ol>
<li>**Getting the first truthy value from the list.**

Imagine, we have several variables, which can be either set or non-set. And we need to choose the first one with data.

Using OR for that:

```js
//+ run
let currentUser = null;
let defaultUser = "John";

*!*
let name = currentUser || defaultUser || "unnamed";
*/!*

alert( name ); // outputs "John" -- the first truthy value
```

If both `currentUser` and `defaultUser` were falsy then `"unnamed"` would be the result.
</li>
<li>**Short-circuit evaluation.**

Operands can be not only values, but arbitrary expressions. OR evaluates and tests them from left to right. The evaluation stops when a truthy value is reached, and the value is returned. The process is called "a short-circuit evaluation".

This is especially notable when the expression given as the second argument has a side effect. Like variable assignment.

If we run the example below, `x` will not get assigned:

```js
//+ run no-beautify
let x;

*!*true*/!* || (x = 1);  

alert(x); // undefined, (x = 1) not evaluated
```

...And here the first argument is `false`, so `OR` goes on and evaluates the second one thus running the assignment:

```js
//+ run no-beautify
let x;

*!*false*/!* || (x = 1);

alert(x); // 1
```
</li>
</ol>


## && (AND)

The AND operator is represented with two ampersands `&&`:

```js
result = a && b;
```

In classic programming AND returns `true` if both arguments are truthy and `false` -- otherwise:

```js
//+ run
alert( true && true ); // true
alert( false && true ); // false
alert( true && false ); // false
alert( false && false ); // false
```

An example with `if`:

```js
//+ run
let hour = 12,
  minute = 30;

if (hour == 12 && minute == 30) {
  alert( 'Time is 12:30' );
}
```

Just as in OR, any value is allowed in AND:

```js
//+ run
if (1 && 0) { // evaluated as true && false
  alert( "won't work, because the result is falsy" );
}
```

More formally, given multiple AND'ed values:

```js
result = value1 && value2 && value3;
```

The AND `"&&"` operator is doing the following:
<ul>
<li>Evalutes operands from left to right.</li>
<li>Returns the first value that would be falsy as a boolean, or the last one if all are truthy.</li>
<li>The value is returned "as is", without the conversion.</li>
</ul>

The rules above are all-in-all similar to OR. The difference is that AND returns the first *falsy* value while OR returns the first *truthy* one.

Examples: 

```js
//+ run
// if the first operand is truthy,
// && returns the second one.
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// now the first operand is falsy,
// it is returned, and the second one is ignored
alert( null && 5 ); // null
alert( 0 && "no matter what" ); // 0
```

If we pass several values in a row, the first falsy one is returned (or the last one if all of them are truthy):

```js
//+ run
alert( 1 && 2 && null && 3 ); // null

alert( 1 && 2 && 3 ); // 3
```

[smart header="AND `&&` executes before OR `||`"]
The precedence of the AND `&&` operator is higher than OR `||`, so it executes before OR.

In the code below `1 && 0` is calculated first:

```js
//+ run
alert( 5 || 1 && 0 ); // 5
```
[/smart]

[warn header="Don't use `&&` instead of `if`"]
The AND `&&` operator can sometimes replace `if`.

For instance:

```js
//+ run
let x = 1;

(x > 0) && alert( 'Greater than zero!' );
```

The action in the right part of `&&` would execute only if the evaluation reaches it. That is: only if `(x > 0)` is true.

So we basically have an analogue for:

```js
//+ run
let x = 1;

if (x > 0) {
  alert( 'Greater than zero!' );
}
```

The variant with `&&` appears to be shorter. Although `if` is more obvious and tends to be a little bit more readable. So it is recommended to use `if` if we want if. And use `&&` if we want AND.
[/warn]

## ! (NOT)

The boolean NOT operator is represented with an exclamation `"!"`.

The syntax is one of the simplest:

```js
let result = !value;
```

The operator accepts a single argument and does the following:

<ol>
<li>Converts the operand to logical type: `true/false`.</li>
<li>Returns an inverse value.</li>
</ol>

For instance:

```js
//+ run
alert( !true ); // false
alert( !0 ); // true
```

A double NOT is sometimes used for converting a value to boolean:

```js
//+ run
alert( !!"non-empty string" ); // true
alert( !!null ); // false
```

That is: the first NOT converts the value to boolean and returns the inverse, and the second NOT inverses it again, so we have a plain value-to-boolean conversion.

Although, there's a more obvious way to do that: a built-in `Boolean` function:

```js
//+ run
alert( Boolean("non-empty string") ); // true
alert( Boolean(null) ); // false
```

