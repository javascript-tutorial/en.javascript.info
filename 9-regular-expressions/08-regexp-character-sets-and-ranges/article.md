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

The pattern searches for:

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

Here `pattern:[0-9A-F]` has two ranges: it searches for a character that is either a digit from `0` to `9` or a letter from `A` to `F`.

If we'd like to look for lowercase letters as well, we can add the range `a-f`: `pattern:[0-9A-Fa-f]`. Or add the flag `pattern:i`.

We can also use character classes inside `[…]`.

For instance, if we'd like to look for a wordly character `pattern:\w` or a hyphen `pattern:-`, then the set is `pattern:[\w-]`.

Combining multiple classes is also possible, e.g. `pattern:[\s\d]` means "a space character or a digit".

```smart header="Character classes are shorthands for certain character sets"
For instance:

- **\d** -- is the same as `pattern:[0-9]`,
- **\w** -- is the same as `pattern:[a-zA-Z0-9_]`,
- **\s** -- is the same as `pattern:[\t\n\v\f\r ]`, plus few other rare Unicode space characters.
```

### Example: multi-language \w

As the character class `pattern:\w` is a shorthand for `pattern:[a-zA-Z0-9_]`, it can't find Chinese hieroglyphs, Cyrillic letters, etc.

We can write a more universal pattern, that looks for wordly characters in any language. That's easy with Unicode properties: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Let's decipher it. Similar to `pattern:\w`, we're making a set of our own that includes characters with following Unicode properties:

- `Alphabetic` (`Alpha`) - for letters,
- `Mark` (`M`) - for accents,
- `Decimal_Number` (`Nd`) - for digits,
- `Connector_Punctuation` (`Pc`) - for the underscore `'_'` and similar characters,
- `Join_Control` (`Join_C`) - two special codes `200c` and `200d`, used in ligatures, e.g. in Arabic.

An example of use:

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hi 你好 12`;

// finds all letters and digits:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

Of course, we can edit this pattern: add Unicode properties or remove them. Unicode properties are covered in more details in the article <info:regexp-unicode>.

```warn header="Unicode properties aren't supported in IE"
Unicode properties `pattern:p{…}` are not implemented in IE. If we really need them, we can use library [XRegExp](https://xregexp.com/).

Or just use ranges of characters in a language that interests us, e.g.  `pattern:[а-я]` for Cyrillic letters.
```

## Excluding ranges

Besides normal ranges, there are "excluding" ranges that look like `pattern:[^…]`.

They are denoted by a caret character `^` at the start and match any character *except the given ones*.

For instance:

- `pattern:[^aeyo]` -- any character except  `'a'`, `'e'`, `'y'` or `'o'`.
- `pattern:[^0-9]` -- any character except a digit, the same as `pattern:\D`.
- `pattern:[^\s]` -- any non-space character, same as `\S`.

The example below looks for any characters except letters, digits and spaces:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ and .
```

## Escaping in […]

Usually when we want to find exactly a special character, we need to escape it like `pattern:\.`. And if we need a backslash, then we use `pattern:\\`, and so on.

In square brackets we can use the vast majority of special characters without escaping:

- Symbols `pattern:. + ( )` never need escaping.
- A hyphen `pattern:-` is not escaped in the beginning or the end (where it does not define a range).
- A caret `pattern:^` is only escaped in the beginning (where it means exclusion).
- The closing square bracket `pattern:]` is always escaped (if we need to look for that symbol).

In other words, all special characters are allowed without escaping, except when they mean something for square brackets.

A dot `.` inside square brackets means just a dot. The pattern `pattern:[.,]` would look for one of characters: either a dot or a comma.

In the example below the regexp `pattern:[-().^+]` looks for one of the characters `-().^+`:

```js run
// No need to escape
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Matches +, -
```

...But if you decide to escape them "just in case", then there would be no harm:

```js run
// Escaped everything
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // also works: +, -
```

## Ranges and flag "u"

If there are surrogate pairs in the set, flag `pattern:u` is required for them to work correctly.

For instance, let's look for `pattern:[𝒳𝒴]` in the string `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // shows a strange character, like [?]
// (the search was performed incorrectly, half-character returned)
```

The result is incorrect, because by default regular expressions "don't know" about surrogate pairs.

The regular expression engine thinks that `[𝒳𝒴]` -- are not two, but four characters:
1. left half of `𝒳` `(1)`,
2. right half of `𝒳` `(2)`,
3. left half of `𝒴` `(3)`,
4. right half of `𝒴` `(4)`.

We can see their codes like this:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

So, the example above finds and shows the left half of `𝒳`.

If we add flag `pattern:u`, then the behavior will be correct:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

The similar situation occurs when looking for a range, such as `[𝒳-𝒴]`.

If we forget to add flag `pattern:u`, there will be an error:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
```

The reason is that without flag `pattern:u` surrogate pairs are perceived as two characters, so `[𝒳-𝒴]` is interpreted as `[<55349><56499>-<55349><56500>]` (every surrogate pair is replaced with its codes). Now it's easy to see that the range `56499-55349` is invalid: its starting code `56499` is greater than the end `55349`. That's the formal reason for the error.

With the flag `pattern:u` the pattern works correctly:

```js run
// look for characters from 𝒳 to 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
