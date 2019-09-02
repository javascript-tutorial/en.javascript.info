# Sets and ranges [...]

Several characters or character classes inside square brackets `[…]` mean to "search for any character among given".

## Sets

For instance, `pattern:[eao]` means any of the 3 characters: `'a'`, `'e'`, or `'o'`.

That's called a *set*. Sets can be used in a regexp along with regular characters:

```js run
// find [t or m], and then "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Please note that although there are multiple characters in the set, they correspond to exactly one character in the match.

So the example below gives no matches:

```js run
// find "V", then [o or i], then "la"
alert( "Voila".match(/V[oi]la/) ); // null, no matches
```

The pattern assumes:

- `pattern:V`,
- then *one* of the letters `pattern:[oi]`,
- then `pattern:la`.

So there would be a match for `match:Vola` or `match:Vila`.

## Ranges

Square brackets may also contain *character ranges*.

For instance, `pattern:[a-z]` is a character in range from `a` to `z`, and `pattern:[0-5]` is a digit from `0` to `5`.

In the example below we're searching for `"x"` followed by two digits or letters from `A` to `F`:

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Please note that in the word `subject:Exception` there's a substring `subject:xce`. It didn't match the pattern, because the letters are lowercase, while in the set `pattern:[0-9A-F]` they are uppercase.

If we want to find it too, then we can add a range `a-f`: `pattern:[0-9A-Fa-f]`. The `i` flag would allow lowercase too.

**Character classes are shorthands for certain character sets.**

For instance:

- **\d** -- is the same as `pattern:[0-9]`,
- **\w** -- is the same as `pattern:[a-zA-Z0-9_]`,
- **\s** -- is the same as `pattern:[\t\n\v\f\r ]` plus few other unicode space characters.

We can use character classes inside `[…]` as well.

For instance, we want to match all wordly characters or a dash, for words like "twenty-third". We can't do it with `pattern:\w+`, because `pattern:\w` class does not include a dash. But we can use `pattern:[\w-]`.

We also can use several classes, for example `pattern:[\s\S]` matches spaces or non-spaces -- any character. That's wider than a dot `"."`, because the dot matches any character except a newline (unless `s` flag is set).

## Excluding ranges

Besides normal ranges, there are "excluding" ranges that look like `pattern:[^…]`.

They are denoted by a caret character `^` at the start and match any character *except the given ones*.

For instance:

- `pattern:[^aeyo]` -- any character except  `'a'`, `'e'`, `'y'` or `'o'`.
- `pattern:[^0-9]` -- any character except a digit, the same as `\D`.
- `pattern:[^\s]` -- any non-space character, same as `\S`.

The example below looks for any characters except letters, digits and spaces:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ and .
```

## No escaping in […]

Usually when we want to find exactly the dot character, we need to escape it like `pattern:\.`. And if we need a backslash, then we use `pattern:\\`.

In square brackets the vast majority of special characters can be used without escaping:

- A dot `pattern:'.'`.
- A plus `pattern:'+'`.
- Parentheses `pattern:'( )'`.
- Dash `pattern:'-'` in the beginning or the end (where it does not define a range).
- A caret `pattern:'^'` if not in the beginning (where it means exclusion).
- And the opening square bracket `pattern:'['`.

In other words, all special characters are allowed except where they mean something for square brackets.

A dot `"."` inside square brackets means just a dot. The pattern `pattern:[.,]` would look for one of characters: either a dot or a comma.

In the example below the regexp `pattern:[-().^+]` looks for one of the characters `-().^+`:

```js run
// No need to escape
let reg = /[-().^+]/g;

alert( "1 + 2 - 3".match(reg) ); // Matches +, -
```

...But if you decide to escape them "just in case", then there would be no harm:

```js run
// Escaped everything
let reg = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(reg) ); // also works: +, -
```
