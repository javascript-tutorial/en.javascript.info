# Operators

Many operators are known to us from the school program. It is an addition `+`, a multiplication `*`, a substraction `-` and so on.

In this chapter we concentrate on aspects that are not covered by the school arithmetic.

[cut]

## Terms: "unary", "binary", "operand"

Before we move on, let's make a dip in the common terminology, used in the development.

- *An operand* -- is what operators are applied to. For instance in multiplication `5 * 2` there are two operands: the left operand is `5`, and the right operand is `2`. Sometimes operands are called "arguments".
- An operator is *unary* if it has a single operand. For example, the unary minus `"-"` reverses the sign of the number:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, unary minus was applied
    ```
- An operator is *binary* if it has two operands. The same minus exists in the binary form as well:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binary minus substracts values
    ```

    Formally, we're talking about the two different operators here: the unary minus (single operand, reverses the sign) and the binary minus (two operands, substracts).

## Strings concatenation, binary +

Now let's get into Javascript specials. 

Usually the plus operator `'+'` sums numbers.

But if the binary `+` is applied to strings, it merges (concatenates) them:

```js
let s = "my" + "string";
alert( s ); // mystring
```

If one of operands of `+` is a string, then the other one is converted to string too.

For example:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Note that it doesn't matter whether the first operand is a string or the second one. The rule is simple: if any of operands is a string, then convert the other one into a string as well.

The string concatenation and conversion is the special feature of the binary plus `"+"`. Other arithmetic operators work only with numbers. They always convert their operands to numbers.

For instance, substraction and division:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Numeric conversion, unary +

The plus `+` exist in two forms. The binary form that we used above and the unary form.

The unary plus or, in other words, the plus operator `+` applied to a single value, doesn't do anything with numbers, but if the operand is not a number, then it is converted into it.

For example:

```js run
// No effect on numbers
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Converts non-numbers
alert( +true ); // 1 
alert( +"" );   // 0
*/!*
```

It actually does the same as `Number(true)` or `Number("")`, but shorter.

A need to convert string to number arises very often. For example, if we are getting values from HTML form fields, then are usually strings.

What if we want to sum them?

The binary plus would add them as strings:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", the binary plus concatenates strings
```

If we want to treat them as numbers, then we can convert and then sum:

```js run
let apples = "2";
let oranges = "3";

alert( Number(apples) + Number(oranges) ); // 5

*!*
// or the shorter variant:
// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5
*/!*
```

From a mathematician's standpoint the abundance of pluses may seem strange. But from a programmer's standpoint -- there's nothing special: unary pluses are applied first, they convert strings to numbers, and then the binary plus sums them up.

Why are unary pluses applied to values before the binary one? As we're going to see, that's because of their *higher precedence*.

## Operators precedence

If an expression has more than one operator, the execution order is defined by their *precedence*, that is an implicit order among the operators.

From the school we all know that the multiplication in the expression `1 + 2 * 2` should be calculated before the addition. That's exactly the precedence thing. The multiplication is said to have *a higher precedence* than the addition.

Brackets override any precedence, so if we're not satisfied with the order, we can use them, like: `(1 + 2) * 2`.

There are many operators in JavaScript. For clarity and internal needs there exists a [precedence table](https://developer.mozilla.org/en/JavaScript/Reference/operators/operator_precedence). Every operator has a corresponding precedence number. The one with the bigger number executes first. If the precedence is same -- the execution order is from left to right.

An extract from the table:


| Precedence | Name | Sign |
|------------|------|------|
| ... | ... | ... |
| 15 | unary plus | `+` |
| 15 | unary minus | `-` |
| 14 | multiplication | `*` |
| 14 | division | `/` |
| 13 | addition (binary) | `+` |
| 13 | substraction | `-` |
| ... | ... | ... |
| 3 | assignment | `=` |
| ... | ... | ... |

As we can see, the "unary plus" has a priority of `15`, higher than `13` for the "addition" (binary plus). That's why in the expression `+apples + +oranges` unary pluses worked first, and then the addition.

## Assignment

Let's note that an assignment `=` is also an operator. It is listed in the precedence table with the very low priority of `3`.

That's why when we assign a variable, like `x = 2 * 2 + 1`, then the calculations are done first, and afterwards the `=` is evaluated, storing the result in `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

It is possible to chain assignments:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Assignments always evaluate the right value first, then assign it to the left one. So the chain of assignments is executed from right to left: the rightmost expression `2+2` is calculated first, assigned to `c`, then `b = c` works, thus assigning it to `b`, and then `a = b`. At the end, all variables share a single value.

````smart header="The assignment operator `\"=\"` returns a value"
An operator always returns a value. That's obvious for most of them like an addition `+` or a multiplication `*`. But the assignment follows that rule too.

The call `x = value` writes the `value` into `x` *and then returns it*.

So it is actually possible to use an assignment as the part of a more complex expression:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

In the example above, the result of `(a = b + 1)` is the value which is assigned to `a` (that is `3`). It is then used to substract from `3`.

Funny code, isn't it? We should understand how it works, but don't write anything like that ourselves. Such tricks definitely don't make the code clearer and more readable.
````

## Remainder %

The remainder operator `%` despite it's look does not have a relation to percents.

The result of `a % b` is the remainder of the integer division of `a` by `b`.

For instance:

```js run
alert( 5 % 2 ); // 1 is a remainder of 5 divided by 2
alert( 8 % 3 ); // 2 is a remainder of 8 divided by 3
alert( 6 % 3 ); // 0 is a remainder of 6 divided by 3
```

## Exponentiation **

The exponentiation operator `**` is a recent addition to the language. Not all browsers support it yet.

For a natural number `b`, the result of `a ** b` is `a` multiplied by itself `b` times. 

For instance:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

The operator works with non-integer numbers of `a` and `b` as well, for instance:

```js run
alert( 4 ** (1/2) ); // 2 (square root of 4)
alert( 8 ** (1/3) ); // 2 (cubic root of 8)
```


## Increment/decrement: ++, --

Increasing or decreasing a number by one is among the most common numerical operations.

So, there are special operators for that:

- **Increment** `++` increases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter++;      // works same as counter = counter + 1, but shorter
    alert( counter ); // 3
    ```
- **Decrement** `--` decreases a variable by 1:

    ```js run no-beautify
    let counter = 2;
    counter--;      // works same as counter = counter - 1, but shorter
    alert( counter ); // 1
    ```

```warn
Increment/decrement can be applied only to a variable. An attempt to use it on a value like `5++` will give an error.
```

Operators `++` and `--` can be placed both after and before the variable.

- When the operator goes after the variable, it is called a "postfix form": `counter++`. 
- The "prefix form" is when the operator stands before the variable: `++counter`.

Both of these records do the same: increase `i` by `1`.

Is there any difference? Yes, but we can only see it if we use the retured value of `++/--`.

Let's clarify. As we know, all operators return a value. Increment/decrement is not an exception here. The prefix form returns the new value, while the postfix form returns the old value (prior to increment/decrement).

Let's see the examples:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

Here in the line `(*)` the prefix call `++counter` increments `i` and returns the new value that is `2`. So the `alert` shows `2`.

Now let's use the postfix form:

```js run
let counter = 1;
let a = counter++; // (*) changed ++counter to counter++

alert(a); // *!*1*/!*
```

In the line `(*)` the *postfix* form `counter++` also increments `i`, but returns the *old* value (prior to increment). So the `alert` shows `1`.

To summarize:

- If the result of increment/decrement is not used, then there is no difference which form to use:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, the lines above did the same
    ```
- If we'd like to use the result of the operator right now, then we need the prefix form:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- If we'd like to increment, but use the previous value, then we need the postfix form:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Increment/decrement among other operators"
Operators `++/--` can be used inside an expression as well. Their precedence is higher than most other arithmetical operations.

For instance:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compare with:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, because counter++ returns the "old" value
```

Though technically allowable, such notation usually makes the code less readable. One line does multiple things -- not good.

While reading the code, a fast "vertical" eye-scan can easily miss such `counter++`, and it won't be obvious that the variable increases.

The "one line -- one action" style is advised:

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Bitwise operators

Bitwise operators treat arguments as 32-bit interger numbers and work on the level on their binary representation.

These operators are not JavaScript-specific. They are supported in most programming languages.

The list of operators:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely. To understand them, we should delve into low-level number representation, and it would not be optimal to do that right now. Especially because we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article in MDN. But it would be more practical to do that when a real need arises.

## Modify-in-place

We often need to apply an operator to a variable and store the new result in it.

For example:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

This notation can be shortened using operators `+=` and `*=`:

```js run
let n = 2;
n += 5; // now n=7 (same as n = n + 5)
n *= 2; // now n=14 (same as n = n * 2)

alert( n ); // 14
```

Short "modify-and-assign" operators exist for all arithmetical and bitwise operators: `/=`, `-=` etc.

The modify-and-assign call has the same precedence as a normal assignment, so it executes after most other calculations:

```js run
let n = 2;
n *= 3 + 5;

alert( n ); // 16  (same as n *= 8)
```

## Comma

The comma operator `','` is one of most rare and unusual ones. Sometimes it's used to write shorter code, so we need to know it in order understand what's going on.

The comma operator allows to evaluate several expressions, dividing them with a comma `','`. Each of them is evaluated, but result of only the last one is returned.

For example:

```js run
*!*
a = (1+2, 3+4);
*/!*

alert( a ); // 7 (the result of 3+4)
```

Here, the first expression `1+2` is evaluated, and it's result is thrown away, then `3+4` is evaluated and returned as the result.

Why do we need such an operator which throws away everything except the last part?

Usually it is used in more complex constructs to put several actions in one line.

For example:

```js
// three operations in one line
for (*!*a = 1, b = 3, c = a*b*/!*; a < 10; a++) {
 ...
}
```

Such tricks are used in many JavaScript frameworks, that's why we mention about them. But usually they don't benefit to code readability, so take care.
