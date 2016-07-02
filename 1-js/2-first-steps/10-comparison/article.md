# Comparisons

Many comparison operators we know from maths:

- Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Equality check is written as `a == b` (please note the double equation sign `'='`. A single symbol `a = b` would mean an assignment).
- Not equals. In maths the sign is <code>&ne;</code>, in JavaScript we use an assignment with an exclamation before it: <code>a != b</code>.

[cut]

## Boolean is the result

Just as all other operators, a comparison returns a value. The value is of the boolean type.

- `true` -- means "yes", "correct" or "the truth".
- `false` -- means "no", "wrong" or "a lie".

For example:

```js run
alert( 2 > 1 );  // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

A result of a comparison can be assigned to a variable, just like any value:

```js run
let result = 5 > 4; // assign the result of the comparison
alert( result ); // true
```

## Strings comparison

To see which string is greater than the other, the so-called "dictionary" or "lexicographical" order is used.

In other words, strings are compared letter-by-letter.

For example:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

The algorithm to compare two strings is simple:

1. Compare the first characters of both strings.
2. If the first one is greater(or less), then the first string is greater(or less) than the second and we're done.
3. Otherwise if first characters are equal, compare the second characters the same way.
4. Repeat until the end of any string.
5. If both strings ended simultaneously, then they are equal. Otherwise the longer string is greater.

In the example above, the comparison `'Z' > 'A'` gets the result at the first step.

Strings `"Glow"` and `"Glee"` are compared character-by-character:

1. `G` is the same as `G`.
2. `l` is the same as `l`.
3. `o` is greater than `e`. Stop here. The first string is greater.

```smart header="Not a dictionary, but Unicode"
The comparison algorithm given above is roughly equivalent to the one used in book dictionaries or phone books. But it's not exactly the same.

For instance, the case matters. A capital letter `"A"` is not equal to the lowercase `"a"`. Which one is greater? Actually, the lowercase `"a"` is. Why? Because the lowercase character has a greater index in the internal encoding table (Unicode). We'll get back to specific details and consequences in the chapter <info:string>.
```

## Comparison of different types

When compared values belong to different types, they get autoconverted to numbers.

For example:

```js run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

For boolean values, `true` becomes `1` and `false` becomes `0`, that's why:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="A funny consequence"
It is possible that in the same time:

- Two values are equal.
- One of them is `true` as a boolean and the other one is `false` as a boolean.

For example:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

From JavaScript standpoint that's quite normal. An equality check converts using the numeric conversion (hence `"0"` becomes `0`), while `Boolean` conversion uses another set of rules.
````

## Strict equality

A regular equality check `"=="` has a problem. It cannot differ `0` from `false`:

```js run
alert( 0 == false ); // true
```

The same thing with an empty string:

```js run
alert( '' == false ); // true
```

That's the natural consequence of what we've seen before. Operands of different types are converted to a number. An empty string, just like `false`, becomes a zero.

What to do if we'd like to differentiate `0` from `false`?

**A strict equality operator `===` checks the equality without type conversion.**

In other words, if `a` and `b` are of different types then `a === b` immediately returns `false`, without an attempt to convert them.

Let's try it:

```js run
alert( 0 === false ); // false, because the types are different
```

There also exists a "strict non-equality" operator `!==`, as an analogy for `!=`.

The string equality check operator is a bit longer to write, but makes more obvious what's going on.

## Comparison with null and undefined

Let's see more corner cases. 

There's a non-intuitive behavior when `null` or `undefined` is compared with other values.

- For a strict equality check `===` these values are different, because each of them belong to a separate type of it's own.

- For a non-strict check `null == undefined`, there's a special rule. These two are a "sweet couple". They equal each other (in the sense of `==`), but no any other value.

- For maths and evaluation of other comparisons including `<`, `>`, `<=`, `>=`, values `null/undefined` are converted to a number: `null` becomes `0`, while `undefined` becomes `NaN`. 

Now let's see funny things that happen when we apply those rules. And then, later, how do not fall into a trap with unobvious language features.

### Strange result: null vs 0

Let's compare `null` with a zero:

```js run
alert( null > 0 );  // false
alert( null == 0 ); // false
alert( null >= 0 ); // *!*true*/!*
```

Yeah, mathematically that's strange. The last result states that "`null` is equal or greater than zero". Then one of the comparisons above must be correct, but they are both falsy.

Well, every programmer language has its own unobvious features. That was an example for Javascript.

The reason is that an equality check `==` and comparisons `> < >= <=` work differently. Comparisons convert `null` to a number, hence treat it as `0`. That's why `null >= 0` is true and `null > 0` is false.

From the other hand, equality `==` for `undefined` and `null` works without any conversions. There's just a rule that they equal each other and don't equal anything else. That's why `null == 0` is false.

### An uncomparable undefined

The value `undefined` shouldn't participate in comparisons at all:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Why does it dislike a zero so much? Always false!

We've got such result, because:

- Comparisons `(1)` and `(2)` return `false` because `undefined` gets converted to `NaN`. And `NaN` is a special numeric value which returns `false` for all comparisons.
- The equality check `(3)` returns `false`, because `undefined` only equals `null` and no other value.

### How to live a good life

Why did we observe these examples? Should we remember these pecularities all the time? Well, not really. Actually, these tricky things will gradually become familiar over the time, but there's a solid way to evade any problems with them.

Just treat any comparison with `undefined/null` except the strict equality `===` with an exceptional care.

Don't use comparisons `>= > < <=` with a variable which may be `null/undefined`, unless you are really sure what you're doing. If a variable can have such values, then check it separately.


## Summary

- Comparison operators return a logical value.
- Strings are compared letter-by-letter in the "dictionary" order.
- When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
- Values `null` and `undefined` equal `==` each other and do not equal any other value.
- Be careful when using comparisons like `>` or `<` with variables that can occasionaly be `null/undefined`. Making a separate check for `null/undefined` is a good idea.

