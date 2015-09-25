# Operators

Many operators are known to us from the school program. It is an addition `+`, a multiplication `*`, a substraction `-` and so on.

In this chapter we concentrate on aspects that are not covered by the school arithmetic.
[cut]

## Terms: "unary", "binary", "operand"

Before we move on, let's make a dip in the terminology, to understand what we're talking about.

<ul>
<li>*An operand* -- is what operators are applied to. For instance in `5 * 2` the left operand of the multiplication is `5`, the right operand is `2`. Another word is "an argument of an operator".</li>
<li>*Unary* is the operator which has a single operand. For example, the unary minus `"-"` reverses the sign of the number:

```js
//+ run
let x = 1;

*!*
x = -x;
*/!*
alert( x ); // -1, unary minus was applied
```

</li>
<li>*Binary* is the operator which has two operands. The same minus exists in the binary form as well:

```js
//+ run no-beautify
let x = 1, y = 3;
alert( y - x ); // 2, binary minus
```

Formally, we're talking about the two different operators here: the unary minus (single operand, reverses the sign) and the binary minus (two operands, substracts).
</li>
</ul>


## Strings concatenation, binary +

Usually the plus operator `'+'` sums numbers.

But if the binary `+` is applied to strings, it merges (concatenates) them:

```js
let s = "my" + "string";
alert( s ); // mystring
```

If one of operands is a string, then the other one is converted to string too.

For example:

```js
//+ run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Note that it doesn't matter whether the first operand is a string or the second one. The rule is simple: if any of operands is a string, then convert the other one into a string as well.

The string concatenation and conversion is the special feature of the binary plus `"+"`. Other arithmetic operators work only with numbers. They always convert their operands into numbers.

For instance:

```js
//+ run
alert( 2 - '1' ); // 1
alert( 6 / '2' ); // 3
```

## Numeric conversion, unary +

The unary plus or, in other words, the plus applied to a single value, doesn't do anything with numbers:


```js
//+ run
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2
```

As we can see, the plus didn't change a thing. The result is the same as it was.

But there is a widely used "side-effect": if the plus is applied not not a number, it converts it to a number.

For example, if we are getting values from HTML-fields or the visitor types them in a prompt, then they are usually strings.

What if we need to summarize them?

The binary plus would add them as strings:

```js
//+ run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", the binary plus concatenates strings
```

So we can use the unary plus to convert values to numbers, and then sum them:

```js
//+ run
let apples = "2";
let oranges = "3";

alert( +apples + +oranges ); // 5, both operands converted to numbers before the binary plus
```

From a mathematician's standpoint the abundance of pluses may seem strange. But from a programmer's -- there's nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus summarizes them.

Why did unary pluses work before the binary one? As we're going to see soon, that's because of their *precedence*.

## Operators precedence

If an expression has more than one operator -- their execution order is defined the their *precedence*.

From the school we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That's exactly the precedence thing. If we're not satisfied with the order, we can use brackets to override the default precedence: `(1 + 2) * 2`.

There are many operators in JavaScript. For clarity and internal needs there exists a [precedence table](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence). Every operator has a corresponding precedence number. The one with the bigger number executes first. If the precedence is same -- the execution order is from left to right.

An extract from the table:

<table>
<tr><td>...</td><td>...</td><td>...</td></tr>
<tr><td>15</td><td>unary plus</td><td>`+`</td></tr>
<tr><td>15</td><td>unary minus</td><td>`-`</td></tr>
<tr><td>14</td><td>multiplication</td><td>`*`</td></tr>
<tr><td>14</td><td>division</td><td>`/`</td></tr>
<tr><td>13</td><td>addition</td><td>`+`</td></tr>
<tr><td>13</td><td>substraction</td><td>`-`</td></tr>
<tr><td>...</td><td>...</td><td>...</td></tr>
<tr><td>3</td><td>assignment</td><td>`=`</td></tr>
<tr><td>...</td><td>...</td><td>...</td></tr>
</table>

As we can see, the "unary plus" has a priority of `15`, higher than `13` for the ordinary "addition". That's why in the expression `+apples + +oranges` unary pluses worked first, and then the addition.

## Assignment

Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `3`.

That's why when we assign a variable, like `x = 2 * 2 + 1`, the maths is done first, and then the assignment is evaluated.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

It is possible to chain assignments:

```js
//+ run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

The chain is evaluated from right to left: the rightmost expression `2+2` is calculated first, assigned to `c`, then `b = c` works, thus assigning it to `b`, and then `a = b`.

[smart header="The assignment operator `\"=\"` returns a value"]
An operator always returns a value. The assignment is not an exception.

The call `x = value` writes the `value` into `x` and then returns it. 

So it is actually possible to use an assignment as the part of the more complex expression:

```js
//+ run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

In the example above, the result of `(a = b + 1)` is the value which is assigned to `a` (that is `3`). It is then used to substract from `3`.

Funny code, isn't it?

We should understand how it works, but don't write like that ourselves. Such usage rarely makes the code neater and more readable.
[/smart]

## Remainder %

The remainder operator `%` despite it's look does not have a relation to percents.
 
The result of `a % b` is the remainder of the integer division `a` by `b`.

For instance:

```js
//+ run
alert( 5 % 2 ); // 1 is a remainder of 5 divided by 2
alert( 8 % 3 ); // 2 is a remainder of 8 divided by 3
alert( 6 % 3 ); // 0 is a remainder of 6 divided by 3
```

## Increment/decrement: ++, --   

Increasing or decreasing a number by one is one of the most common numeric operations in JavaScript as well as in many other languages.

So, there are special operators for that:

<ul>
<li>**Increment** `++` increases by 1:

```js
//+ run no-beautify
let i = 2;
i++;      // works same as i = i + 1, but shorter
alert(i); // 3
```

</li>
<li>**Decrement** `--` decreases by 1:

```js
//+ run no-beautify
let i = 2;
i--;      // works same as i = i - 1, but shorter
alert(i); // 1
```

</li>
</ul>

[warn]
Increment/decrement can be applied only to a variable.

An attempt to use it on a value like `5++` will give an error.
[/warn]

These operators can be called both after and before the variable. 

When the operator goes after the variable, it is called a "postfix form": `i++`. The "prefix form" is when the operator is before the variable: `++i`.

Both of these records do the same: increase `i` by `1`.

Is there any difference? Actually, yes. It can be seen when we not only increment/decrement the variable, but also use the result of the operator.

The prefix form returns the new value, while the postfix form returns the old value (pre-increment/decrement).

Let's see the examples:

```js
//+ run
let i = 1;
let a = ++i; // (*)

alert(a); // *!*2*/!*
```

Here in the line `(*)` the prefix call `++i` increments `i` and returns the new value that is `2`. So the `alert` shows `2`.

Now let's use the postfix form:

```js
//+ run
let i = 1;
let a = i++; // (*)

alert(a); // *!*1*/!*
```

In the line `(*)` the *postfix* form `i++` also increments `i`, but returns the old value (it was `1`). So the `alert` shows `1`.

<ul>
<li>If the result of increment/decrement is not used, then there is no difference which form to use:

```js
//+ run
let i = 0;
i++;
++i;
alert( i ); // 2, the lines above did the same
```

</li>
<li>If we'd like to use the result of the operator right now, then we need the prefix form:

```js
//+ run
let i = 0;
alert( ++i ); // 1
```

</li>
<li>If we'd like to increment, but use the previous value, then we need te postfix form:

```js
//+ run
let i = 0;
alert( i++ ); // 0
```

</li>
</ul>

[smart header="Increment/decrement can be used anywhere"]
An attentive reader could note that `++` (as well as `--`) can use as a part of any expression. It's priority is higher than most other arithmetical operations:

```js
//+ run
let i = 1;
alert( 2 * ++i ); // 4
```

Compare with:

```js
//+ run
let i = 1;
alert( 2 * i++ ); // 2, because i++ returns the pre-increment value
```

We should really weigh all pro and contra using such notation, because it makes the code less neat.
During a fast "vertical" code reading it's easy to miss such `i++`, and it would be not obvious that the variable increases.

Three lines, one line -- one action is much better:

```js
//+ run
let i = 1;
alert( 2 * i );
i++;
```
[/smart]

## Bitwise operators

Bitwise operators treat arguments as 32-bit interger numbers and work on the level on their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

<ul>
<li>AND ( `&` )</li>
<li>OR ( `|` )</li>
<li>XOR ( `^` )</li>
<li>NOT ( `~` )</li>
<li>LEFT SHIFT ( `<<` )</li>
<li>RIGHT SHIFT ( `>>` )</li>
<li>ZERO-FILL RIGHT SHIFT ( `>>>` )</li>
</ul>

These operators are used quite rarely. We won't need them any time soon. 

Their study implies the knowledge of low-level number representation, and it would be suboptimal to delve into that now. 

If a reader wants to learn the right now, they are explained in the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article in MDN. It is advised to learn this topic later when such a need arises.

## Modify-in-place 

We often need to apply an operator to a variable and keep the result in it.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using operators `+=` and *=`:

```js
//+ run
let n = 2;
n += 5; // now n=7 (same as n = n + 5)
n *= 2; // now n=14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for `+,-,*,/` and bitwise `<<,>>,>>>,&,|,^`.

The call has the same precedence as a normal assignment, so it executes after most other calculations:

```js
//+ run
let n = 2;
n *= 3 + 5;

alert( n ); // 16  (n = 2 * 8)
```


## Comma

The comma operator `','` is one of most rare and unusual ones. But we just have to explain it here, because it is used to write shorter code, and we need to understand what's going on.

The comma operator allows to evaluate several expressions, dividing them with a comma `','`. Each of them is evaluated, but result of the last one is returned.

For example:

```js
//+ run
*!*
a = (1+2, 3+4);
*/!*

alert( a ); // 7 (the result of 3+4)
```

Here, the first expression `1+2` is evaluated and thrown away, while the last one `3+4` is evaluated and returned as the result.

Why do we need such an operator which throws away everything except the last part?

Usually it is used in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a*b*/!*; a < 10; a++) {
 ...
}
```

Such tricks are used in many JavaScript frameworks, that's why we mention about them. But usually they don't benefit to code readability.
