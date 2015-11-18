# Comparisons

Many comparison operators we know from the maths:

<ul>
<li>Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.</li>
<li>Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.</li>
<li>Equality check is written as `a == b` (please note the double equation sign `'='`. A single symbol `a = b` would mean an assignment).</li>
<li>Not equals. In maths the sign is <code>&ne;</code>, in JavaScript we use an assignment with an exclamation before it: <code>a != b</code>.</li>
</ul>

[cut]

## Boolean is the result

Just as all other operators, a comparison returns a value. The value is of the boolean type. 

<ul>
<li>`true` -- means "yes", "correct" or "the truth".</li>
<li>`false` -- means "no", "wrong" or "a lie".</li>
</ul>

For example:

```js
//+ run
alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

A result of a comparison can be assigned to a variable, just like any value:

```js
//+ run
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true
```

## Strings comparison

To see which string is greater than the other, the so-called "dictionary" or "lexicographical" order is used.

In other words, strings are compared letter-by-letter. 

For example: 

```js
//+ run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

The algorithm to compare two strings is simple:
<ol>
<li>Compare the first characters of both strings.</li>
<li>If the first one is greater(or less), then the first string is greater(or less) than the second and we're done.</li>
<li>Otherwise if first characters are equal, compare the second characters the same way.</li>
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

[smart header="Not a real dictionary"]
The strings "dictionary" comparison algorithm given above is roughly equivalent to the one used in book dictionaries or phone books. But it's not exactly the same.

For instance, the case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? It is defined by a character's index in the internal encoding (Unicode) table. We'll get back to specific details and consequences in the chapter [](/strings).
[/smart]


## Comparison of different types

When compared values are of different types, they get autoconverted to numbers. 

For example:

```js
//+ run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

For boolean values, `true` becomes `1` and `false` becomes `0`, that's why:

```js
//+ run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

[smart header="A funny consequence"]

It is possible that in the same time:
<ul>
<li>Two values are equal.</li>
<li>One of them is `true` as a boolean and the other one is `false` as a boolean.</li>
</ul>

For example:

```js
//+ run
let a = 0; 
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

From JavaScript standpoint that's quite normal. An equality check converts using the numeric conversion (hence `"0"` becomes `0`), while `Boolean` conversion uses another set of rules.
[/smart]



## Strict equality

A regular equality check `==` has a "problem": it cannot differ `0` from `false`:

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

In other words, `a === b` immediately returns `false` if `a` and `b` belong to different types. Without attempting to use numeric conversion as `==` would do.

Let's try it:

```js
//+ run
alert( 0 === false ); // false, because the types are different
```

There also exists a "strict non-equality" operator `!==`, as an analogy for `!=`.

The string equality check is a bit longer to write, but it's more obvious what's going on.

## Comparison with null and undefined

There's a non-intuitive behavior when `null` or `undefined` is compared with other values.

For a strict equality check `===` the result is simple: `null` and `undefined` belong to different types of their own. So `null === null` and no other value. The similar thing is true for `undefined`.

But what for `null > 0` or `null == undefined`? The trap is that `null/undefined` may feel like `false` or a zero in this case. But it is not so.

<ol>
<li>For an equality check `==` there's a simple rule. Values `null` and `undefined` are equal `==` to each other and non-equal to any other value.</li>
<li>For other non-strict comparisons a numeric conversion is involved. After it `null` becomes `0`, while `undefined` becomes `NaN`.</li>
</ol>

Let's see few notable examples.

### Strange result: null vs 0

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

Yeah, mathematically that's strange. But the reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, hence treat it as `0`. That's why `null >= 0` is true and `null > 0` is false.

From the other hand, equality has a rule that a "sweet couple" `undefined` and `null` match each other and no other value.

That's why we have a strange-looking situation above.

### An uncomparable undefined

The value `undefined` shouldn't participate in comparisons at all:

```js
//+ run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Why does it dislike a zero so much? Always false!

We've got such result, because:
<ul>
<li>Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN`. And `NaN` is a special numeric value which returns `false` for all comparisons.</li>
<li>The equality check `(3)` returns `false`, because `undefined` only equals `null` and no other value.</li>
</ul>

Why did we observe these examples? Should we remember these pecularities all the time? Well, they will become known and obvious over the time, but actually there's no need. Just one little conclusion is enough.

**Any comparison with `undefined/null` except the strict equality `===` should be done with exceptional care.**

For clarity it is preferable not to use comparisons `>= > < <=` with a variable which may be `null/undefined` at all. 

We can always make a separate check for `null` or add an explicit type conversion. Makes the code less bug-proof.

## Summary

<ul>
<li>Comparison operators return a logical value.</li>
<li>Strings are compared letter-by-letter in the "dictionary" order.</li>
<li>When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).</li>
<li>Values `null` and `undefined` equal `==` each other and do not equal any other value.</li>
<li>Be careful when using comparisons like `>` or `<` with variables that can occasionaly be `null/undefined`. Making a separate check for `null/undefined` is a good idea.</li>
</ul>

