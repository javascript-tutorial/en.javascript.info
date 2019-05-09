# Character classes

Consider a practical task -- we have a phone number `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79035419441`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A character class is a special notation that matches any symbol from a certain set.

For the start, let's explore a "digit" class. It's written as `\d`. We put it in the pattern, that means "any single digit".

For instance, the let's find the first digit in the phone number:

```js run
let str = "+7(903)-123-45-67";

let reg = /\d/;

alert( str.match(reg) ); // 7
```

Without the flag `g`, the regular expression only looks for the first match, that is the first digit `\d`.

Let's add the `g` flag to find all digits:

```js run
let str = "+7(903)-123-45-67";

let reg = /\d/g;

alert( str.match(reg) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

alert( str.match(reg).join('') ); // 79035419441
```

That was a character class for digits. There are other character classes as well.

Most used are:

`\d` ("d" is from "digit")
: A digit: a character from `0` to `9`.

`\s` ("s" is from "space")
: A space symbol: that includes spaces, tabs, newlines.

`\w` ("w" is from "word")
: A "wordly" character: either a letter of English alphabet or a digit or an underscore. Non-Latin letters (like cyrillic or hindi) do not belong to `\w`.

For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", like `"1 a"`.

**A regexp may contain both regular symbols and character classes.**

For instance, `pattern:CSS\d` matches a string `match:CSS` with a digit after it:

```js run
let str = "CSS4 is cool";
let reg = /CSS\d/

alert( str.match(reg) ); // CSS4
```

Also we can use many character classes:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // 'HTML5'
```

The match (each character class corresponds to one result character):

![](love-html5-classes.png)

## Word boundary: \b

A word boundary `pattern:\b` -- is a special character class.

It does not denote a character, but rather a boundary between characters.

For instance, `pattern:\bJava\b` matches `match:Java` in the string `subject:Hello, Java!`, but not in the script `subject:Hello, JavaScript!`.

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

The boundary has "zero width" in a sense that usually a character class means a character in the result (like a wordly character or a digit), but not in this case.

The boundary is a test.

When regular expression engine is doing the search, it's moving along the string in an attempt to find the match. At each string position it tries to find the pattern.

When the pattern contains `pattern:\b`, it tests that the position in string is a word boundary, that is one of three variants:

- Immediately before is `\w`, and immediately after -- not `\w`, or vise versa.
- At string start, and the first string character is `\w`.
- At string end, and the last string character is `\w`.

For instance, in the string `subject:Hello, Java!` the following positions match `\b`:

![](hello-java-boundaries.png)

So it matches `pattern:\bHello\b`, because:

1. At the beginning of the string the first `\b` test matches.
2. Then the word `Hello` matches.
3. Then `\b` matches, as we're between `o` and a space.

Pattern `pattern:\bJava\b` also matches. But not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character, so there's no word boundary after it).


```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

Once again let's note that `pattern:\b` makes the searching engine to test for the boundary, so that `pattern:Java\b` finds `match:Java` only when followed by a word boundary, but it does not add a letter to the result.

Usually we use `\b` to find standalone English words. So that if we want `"Java"` language then `pattern:\bJava\b` finds exactly a standalone word and ignores it when it's a part of another word, e.g. it won't match `match:Java` in `subject:JavaScript`.

Another example: a regexp `pattern:\b\d\d\b` looks for standalone two-digit numbers. In other words, it requires that before and after `pattern:\d\d` must be a symbol different from `\w` (or beginning/end of the string).

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
```

```warn header="Word boundary doesn't work for non-Latin alphabets"
The word boundary check `\b` tests for a boundary between `\w` and something else. But `\w` means an English letter (or a digit or an underscore), so the test won't work for other characters (like cyrillic or hieroglyphs).

Later we'll come by Unicode character classes that allow to solve the similar task for different languages.
```


## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "reverse" means that it matches all other characters, for instance:

`\D`
: Non-digit: any character except `\d`, for instance a letter.

`\S`
: Non-space: any character except `\s`, for instance a letter.

`\W`
: Non-wordly character: anything but `\w`.

`\B`
: Non-boundary: a test reverse to `\b`.

In the beginning of the chapter we saw how to get all digits from the phone `subject:+7(903)-123-45-67`.

One way was to match all digits and join them:

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

An alternative, shorter way is to find non-digits `\D` and remove them from the string:


```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## Spaces are regular characters

Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a dash:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

Here we fix it by adding spaces into the regexp `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
```

**A space is a character. Equal in importance with any other character.**

Of course, spaces in a regexp are needed only if we look for them. Extra spaces (just like any other extra characters) may prevent a match:

```js run
alert( "1-5".match(/\d - \d/) ); // null, because the string 1-5 has no spaces
```

In other words, in a regular expression all characters matter, spaces too.

## A dot is any character

The dot `"."` is a special character class that matches "any character except a newline".

For instance:

```js run
alert( "Z".match(/./) ); // Z
```

Or in the middle of a regexp:

```js run
let reg = /CS.4/;

alert( "CSS4".match(reg) ); // CSS4
alert( "CS-4".match(reg) ); // CS-4
alert( "CS 4".match(reg) ); // CS 4 (space is also a character)
```

Please note that the dot means "any character", but not the "absense of a character". There must be a character to match it:

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
```

### The dotall "s" flag

Usually a dot doesn't match a newline character.

For instance, `pattern:A.B` matches `match:A`, and then `match:B` with any character between them, except a newline.

This doesn't match:

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)

// a space character would match, or a letter, but not \n
```

Sometimes it's inconvenient, we really want "any character", newline included.

That's what `s` flag does. If a regexp has it, then the dot `"."` match literally any character:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```

## Summary

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- English letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline.

...But that's not all!

The Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if a letter) it is it a punctuation sign, etc.

Modern JavaScript allows to use these properties in regexps to look for characters, for instance:

- A cyrillic letter is: `pattern:\p{Script=Cyrillic}` or `pattern:\p{sc=Cyrillic}`.
- A dash (be it a small hyphen `-` or a long dash `—`): `pattern:\p{Dash_Punctuation}` or `pattern:\p{pd}`.
- A currency symbol, such as `$`, `€` or another: `pattern:\p{Currency_Symbol}` or `pattern:\p{sc}`.
- ...And much more. Unicode has a lot of character categories that we can select from.

These patterns require `'u'` regexp flag to work. More about that in the chapter [](info:regexp-unicode).
