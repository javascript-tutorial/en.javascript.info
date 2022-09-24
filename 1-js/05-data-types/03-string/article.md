# Strings

In JavaScript, the textual data is stored as strings. There is no separate type for a single character.

The internal format for strings is always [UTF-16](https://en.wikipedia.org/wiki/UTF-16), it is not tied to the page encoding.

## Quotes

Let's recall the kinds of quotes.

Strings can be enclosed within either single quotes, double quotes or backticks:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in `${…}`:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Another advantage of using backticks is that they allow a string to span multiple lines:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // a list of guests, multiple lines
```

Looks natural, right? But single or double quotes do not work this way.

If we use them and try to use multiple lines, there'll be an error:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

Single and double quotes come from ancient times of language creation, when the need for multiline strings was not taken into account. Backticks appeared much later and thus are more versatile.

Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This is called "tagged templates". This feature makes it easier to implement custom templating, but is rarely used in practice. You can read more about it in the [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Special characters

It is still possible to create multiline strings with single and double quotes by using a so-called "newline character", written as `\n`, which denotes a line break:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // a multiline list of guests, same as above
```

As a simpler example, these two lines are equal, just written differently:

```js run
let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

There are other, less common "special" characters:

| Character | Description |
|-----------|-------------|
|`\n`|New line|
|`\r`|In Windows text files a combination of two characters `\r\n` represents a new break, while on non-Windows OS it's just `\n`. That's for historical reasons, most Windows software also understands `\n`. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- mentioned for completeness, coming from old times, not used nowadays (you can forget them right now). |

As you can see, all special characters start with a backslash character `\`. It is also called an "escape character".

Because it's so special, if we need to show an actual backslash `\` within the string, we need to double it:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

So-called "escaped" quotes `\'`, `\"`, <code>\\`</code> are used to insert a quote into the same-quoted string.

For instance:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

As you can see, we have to prepend the inner quote by the backslash `\'`, because otherwise it would indicate the string end.

Of course, only the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:

```js run
alert( "I'm the Walrus!" ); // I'm the Walrus!
```

Besides these special characters, there's also a special notation for Unicode codes `\u…`, we'll cover it a bit later in this chapter.

## String length

The `length` property has the string length:

```js run
alert( `My\n`.length ); // 3
```

Note that `\n` is a single "special" character, so the length is indeed `3`.

```warn header="`length` is a property"
People with a background in some other languages sometimes mistype by calling `str.length()` instead of just `str.length`. That doesn't work.

Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it.
```

## Accessing characters

To get a character at position `pos`, use square brackets `[pos]` or call the method [str.charAt(pos)](mdn:js/String/charAt). The first character starts from the zero position:

```js run
let str = `Hello`;

// the first character
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
```

The square brackets are a modern way of getting a character, while `charAt` exists mostly for historical reasons.

The only difference between them is that if no character is found, `[]` returns `undefined`, and `charAt` returns an empty string:

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (an empty string)
```

We can also iterate over characters using `for..of`:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}
```

## Strings are immutable

Strings can't be changed in JavaScript. It is impossible to change a character.

Let's try it to show that it doesn't work:

```js run
let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // doesn't work
```

The usual workaround is to create a whole new string and assign it to `str` instead of the old one.

For instance:

```js run
let str = 'Hi';

str = 'h' + str[1]; // replace the string

alert( str ); // hi
```

In the following sections we'll see more examples of this.

## Changing the case

Methods [toLowerCase()](mdn:js/String/toLowerCase) and [toUpperCase()](mdn:js/String/toUpperCase) change the case:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Or, if we want a single character lowercased:

```js run
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Searching for a substring

There are multiple ways to look for a substring within a string.

### str.indexOf

The first method is [str.indexOf(substr, pos)](mdn:js/String/indexOf).

It looks for the `substr` in `str`, starting from the given position `pos`, and returns the position where the match was found or `-1` if nothing can be found.

For instance:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive

alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)
```

The optional second parameter allows us to start searching from a given position.

For instance, the first occurrence of `"id"` is at position `1`. To look for the next occurrence, let's start the search from position `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

If we're interested in all occurrences, we can run `indexOf` in a loop. Every new call is made with the position after the previous match:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // let's look for it

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue the search from the next position
}
```

The same algorithm can be layed out shorter:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
There is also a similar method [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) that searches from the end of a string to its beginning.

It would list the occurrences in the reverse order.
```

There is a slight inconvenience with `indexOf` in the `if` test. We can't put it in the `if` like this:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // doesn't work!
}
```

The `alert` in the example above doesn't show because `str.indexOf("Widget")` returns `0` (meaning that it found the match at the starting position). Right, but `if` considers `0` to be `false`.

So, we should actually check for `-1`, like this:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // works now!
}
```

### includes, startsWith, endsWith

The more modern method [str.includes(substr, pos)](mdn:js/String/includes) returns `true/false` depending on whether `str` contains `substr` within.

It's the right choice if we need to test for the match, but don't need its position:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

The optional second argument of `str.includes` is the position to start searching from:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
```

The methods [str.startsWith](mdn:js/String/startsWith) and [str.endsWith](mdn:js/String/endsWith) do exactly what they say:

```js run
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" ends with "get"
```

## Getting a substring

There are 3 methods in JavaScript to get a substring: `substring`, `substr` and `slice`.

`str.slice(start [, end])`
: Returns the part of the string from `start` to (but not including) `end`.

    For instance:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
    ```

    If there is no second argument, then `slice` goes till the end of the string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
    ```

    Negative values for `start/end` are also possible. They mean the position is counted from the string end:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Returns the part of the string *between* `start` and `end` (not including `end`).

    This is almost the same as `slice`, but it allows `start` to be greater than `end` (in this case it simply swaps `start` and `end` values).

    For instance:

    ```js run
    let str = "st*!*ring*/!*ify";

    // these are same for substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...but not for slice:
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)

    ```

    Negative arguments are (unlike slice) not supported, they are treated as `0`.

`str.substr(start [, length])`
: Returns the part of the string from `start`, with the given `length`.

    In contrast with the previous methods, this one allows us to specify the `length` instead of the ending position:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
    ```

    The first argument may be negative, to count from the end:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
    ```

    This method resides in the [Annex B](https://tc39.es/ecma262/#sec-string.prototype.substr) of the language specification. It means that only browser-hosted Javascript engines should support it, and it's not recommended to use it. In practice, it's supported everywhere.

Let's recap these methods to avoid any confusion:

| method | selects... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` (not including `end`)| negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |

```smart header="Which one to choose?"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write.

So, for practical use it's enough to remember only `slice`.
```

## Comparing strings

As we know from the chapter <info:comparison>, strings are compared character-by-character in alphabetical order.

Although, there are some oddities.

1. A lowercase letter is always greater than the uppercase:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letters with diacritical marks are "out of order":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    This may lead to strange results if we sort these country names. Usually people would expect `Zealand` to come after `Österreich` in the list.

To understand what happens, let's review the internal representation of strings in JavaScript.

All strings are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back.

`str.codePointAt(pos)`
: Returns a decimal number representing the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (if we need a more commonly used hex value of the code)
    ```

`String.fromCodePoint(code)`
: Creates a character by its numeric `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    alert( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)
    ```

    We can also add Unicode characters by their codes using `\u` followed by the hex code:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Now let's see the characters with codes `65..220` (the latin alphabet and a little bit extra) by making a string of them:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

See? Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.

Now it becomes obvious why `a > Z`.

The characters are compared by their numeric code. The greater code means that the character is greater. The code for `a` (97) is greater than the code for `Z` (90).

- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, its code is greater than anything from `a` to `z`.

### Correct comparisons [#correct-comparisons]

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.

So, the browser needs to know the language to compare.

Luckily, all modern browsers (IE10- requires the additional library [Intl.js](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

It provides a special method to compare strings in different languages, following their rules.

The call [str.localeCompare(str2)](mdn:js/String/localeCompare) returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

- Returns a negative number if `str` is less than `str2`.
- Returns a positive number if `str` is greater than `str2`.
- Returns `0` if they are equivalent.

For instance:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.

## Internals, Unicode

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.
```

## Unicode characters

As we already mentioned, JavaScript strings are based on [Unicode](https://en.wikipedia.org/wiki/Unicode).

Each character is represented by a byte sequence of 1-4 bytes.

JavaScript allows us to specify a character not only by directly including it into a stirng, but also by its hexadecimal Unicode code using these three notations:

- `\xXX` -- a character whose Unicode code point is `U+00XX`.

    `XX` is two hexadecimal digits with value between `00` and `FF`, so `\xXX` notation can be used only for the first 256 Unicode characters (including all 128 ASCII characters).

    These first 256 characters include latin alphabet, most basic syntax characters and some others. For example, `"\x7A"` is the same as `"z"` (Unicode `U+007A`).
- `\uXXXX` -- a character whose Unicode code point is `U+XXXX` (a character with the hex code `XXXX` in UTF-16 encoding).

    `XXXX` must be exactly 4 hex digits with the value between `0000` and `FFFF`, so `\uXXXX` notation can be used for the first 65536 Unicode characters. Characters with Unicode value greater than `U+FFFF` can also be represented with this notation, but in this case we will need to use a so called surrogate pair (we will talk about surrogate pairs later in this chapter).
- `\u{X…XXXXXX}` -- a character with any given Unicode code point (a character with the given hex code in UTF-32 encoding).

    `X…XXXXXX` must be a hexadecimal value of 1 to 6 bytes between `0` and `10FFFF` (the highest code point defined by Unicode). This notation allows us to easily represent all existing Unicode characters.

Examples with Unicode:

```js run
alert( "\uA9" ); // ©, the copyright symbol

alert( "\u00A9" ); // ©, the same as above, using the 4-digit hex notation
alert( "\u044F" ); // я, the cyrillic alphabet letter
alert( "\u2191" ); // ↑, the arrow up symbol

alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
```

### Surrogate pairs

All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.

Initially, JavaScript was based on UTF-16 encoding that only allowed 2 bytes per character. But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol of Unicode.

So rare symbols that require more than 2 bytes are encoded with a pair of 2-byte characters called "a surrogate pair".

As a side effect, the length of such symbols is `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
```

That's because surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` property shows a length of `2`.

Getting a symbol can also be tricky, because most language features treat surrogate pairs as two characters.

For example, here we can see two odd characters in the output:

```js run
alert( '𝒳'[0] ); // shows strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Pieces of a surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

So the methods `String.fromCodePoint` and `str.codePointAt` were added in JavaScript to deal with surrogate pairs.

They are essentially the same as [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt), but they treat surrogate pairs correctly.

One can see the difference here:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for the 1st part of 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt is surrogate-pair aware
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, reads both parts of the surrogate pair
```

That said, if we take from position 1 (and that's rather incorrect here), then they both return only the 2nd part of the pair:

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// meaningless 2nd half of the pair
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

````warn header="Takeaway: splitting strings at an arbitrary point is dangerous"
We can't just split a string at an arbitrary position, e.g. take `str.slice(0, 4)` and expect it to be a valid string, e.g.:

```js run
alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
```

Here we can see a garbage character (first half of the smile surrogate pair) in the output.

Just be aware of it if you intend to reliably work with surrogate pairs. May not be a big problem, but at least you should understand what happens.
````

### Diacritical marks and normalization

In many languages, there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for these characters: `àáâäãåā`.

Most common "composite" characters have their own code in the Unicode table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, Unicode standard allows us to use several Unicode characters: the base character followed by one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different Unicode compositions.

For instance:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

To solve this, there exists a "Unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so Unicode creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.

## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- Strings in JavaScript are encoded using UTF-16, with surrogate pairs for rare characters (and these cause glitches).
- We can use special characters like `\n` and insert letters by their Unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings:

- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.
