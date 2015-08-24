# Comparisons and boolean values

In this chapter we'll meet the comparison operators and boolean values that are their results.

[cut]

Many comparison operators we know from maths:

<ul>
<li>Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.</li>
<li>Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.</li>
<li>Equals: `a == b` (please note the double equation sign `'='`. A single symbol `a = b` would mean an assignment).</li>
<li>Not equals. In maths the sign is <code>&ne;</code>, in JavaScript we use an assignment with an exclamation before it: <code>a != b</code>.</li>
</ul>

## Boolean values

Just as other operators, a comparison returns a value.

The value has the boolean type. The term "logical type" is also used and means the same.

There are only two logical values:

<ul>
<li>`true` -- means "yes", "correct" or "the truth".</li>
<li>`false` -- means "no", "wrong" or "a lie".</li>
</ul>

For example:

```js
//+ run
alert( 2 > 1 ); // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

Boolean values can be assigned directly, just like any other values:

```js
//+ run
var a = true; // assign directly

var b = 3 > 4; // assign the result of the comparison
alert( b ); // false

alert( a == b ); // false (cause a=true, b=false)
```

## Strings comparison

Strings are compared letter-by-letter, alphabetically.

For example: 

```js
//+ run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

The algorithm to compare two strings is simple:
<ol>
<li>Compare the first characters of both strings. If the first one is greater(or less), then the first string is greater(or less).</li>
<li>If first characters are equal, compare the second characters the same way.</li>
<li>Repeat until the end of any string.</li>
<li>If both strings ended simultaneously, then they are equal. Otherwise the longer string is greater.</li>
</ol>

In the example above, the comparison `'Z' > 'A'` gets the result at the first step.

Strings `"Glow"` and `"Glee"` are compared character-by-character:
<ol>
<li>`G` is the same as `G`.</li>
<li>`l` is the same as `l`.</li>
<li>`o` is greater than `e`. Stop here. The first string is greater.</li>
</ol>

[smart header="Lexicographical ordering"]
The strings are compared in the so-called "lexicographical" or "dictionary" order.

It implies that the greater string is the one which goes further in the dictionary. So, for example, `Z` goes after `A` in a dictionary. And `Glow` goes after `Glee`.

But the actual situation is a little bit more complex with that, because of internal encoding details. We'll get back in the chapter [](/strings) where we study strings specifically.
[/smart]


## Comparison of different types

When compared values are of different types, they get autoconverted to numbers.

Strings are converted the same way as unary plus does. We discussed that in the chapter [](/operators).

For example:

```js
//+ run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

For boolean values, `true` becomes `1` and `false` becomes `0`, so:

```js
//+ run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

Rules for numeric conversion are to be discussed in more details in the chapter [](/types-conversion). 

## Strict equality

A regular equality `==` has a "problem": it cannot differ `0` from `false`:

```js
//+ run
alert( 0 == false ); // true
```

The same thing with an empty string:

```js
//+ run
alert( '' == false ); // true
```

That's the natural consequence of what we've seen before. Operands of different types are converted to a number. An empty string, just like `false`, becomes a zero.

What to do if we'd like to differentiate `0` from `false`?

**A strict equality operator `===` checks the equality without type conversion.**

In other words, `a === b` always returns `false` if `a` and `b` belong to differnt types.

Let's try it:

```js
//+ run
alert( 0 === false ); // false, because the types are different
```

There also exists a "strict non-equality" operator `!==`, as an analogy for `!=`.

The string equality is one character longer, but it's more obvious what's going on.

## Comparison with null and undefined

Thre's a non-intuitive behavior when `null` or `undefined` is compared with other values.

It may feel like `null/undefined` are equivalent to zero. But it is not so.

<ol>
<li>For equality `==` the rule is simple: values `null` and `undefined` are equal `==` each other and non-equal to any other value.</li>
<li>Comparisons like `< > >= <=` convert `null/undefined` to a number in the evaluation process. Upon the conversion `null` becomes `0`, while `undefined` becomes `NaN`.</li>
</ol>

Let's see funny consequences.

### Incorrect result of comparing null with 0

Let's compare `null` with a zero:

```js
//+ run
alert( null > 0 ); // false
alert( null == 0 ); // false
```

Okay, from the code above we may decide that `null` is not greater and not equal to zero. 

But...

```js
//+ run
alert(null >= 0); // *!*true*/!*
```

How can that be possible? If `null` is "not greater than zero and not equal to zero" then how `null >= 0` can be true? 

Yeah, mathematically that's strange. The reason is that an equality check `==` and comparisons `> < >= <=` work differently.

Comparisons convert `null` to a number, hence treat it as `0`. That's why `null >= 0` is true and `null > 0` is false.

From the other hand, equality has a rule that a "sweet couple" `undefined` and `null` match with each other and no other value.

That's why we have a strange-looking situation above.

### An uncomparable undefined

The value `undefined` shouldn't participate in comparisons at all:

```js
//+ run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Formally, it works like this:
<ul>
<li>Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN`. And `NaN` is a special numeric value which returns `false` for all comparisons.</li>
<li>The equality check `(3)` returns `false`, because `undefined` only equals `null` and no other value.</li>
</ul>

**Conclusion: any comparison with `undefined/null` except the exact equality `===` should be done with care.**

For clarity it is preferable not to use comparisons `>= > < <=` with a variable which may be `null/undefined`. We can always make a separate check for `null` or add an explicit type conversion.

## Summary

<ul>
<li>JavaScript has logical values `true` and `false`. Comparison operators return one of those.</li>
<li>Strings are compared letter-by-letter in dictionary order.</li>
<li>When values of different types are compared, they get converted to numbers, with the exclusion of a string equality check `===` (`!==`).</li>
<li>Values `null` and `undefined` equal `==` each other and do not equal any other value. It's better not to use them in comparisons with `>` or `<`, because the result may be unexpected.</li>
</ul>

