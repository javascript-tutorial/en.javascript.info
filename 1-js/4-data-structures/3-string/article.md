# Strings

In JavaScript, the textual data is stored as strings. There is no separate type for a single character.

The internal format for strings is always [UTF-16](https://en.wikipedia.org/wiki/UTF-16), it is not tied to the page encoding.

[cut]

## Quotes

Let's remember the kinds of quotes.

Strings can be enclosed either with the single, double quotes or in backticks:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Single and double quotes are essentially the same. Backticks allow to embed any expression into the string, including function calls:

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

If we try to use single or double quotes the same way, there will be an error:
```js run
let guestList = "Guests:  // Error: Unexpected token ILLEGAL
  * John";
```

That's because they come from ancient times of language creation, and the need for multiline strings was not taken into account. Backticks appeared much later.

````smart header="Template function"
The advanced feature of backticks is the ability to specify a "template function" at the beginning that would get the string and it's `${…}` components and can convert them.

The syntax is: 
```js
function f(...) { /* the function to postprocess he string */ }

let str = f`my string``;
```
We'll get back to this advanced stuff later, because it's rarely used and we won't need it any time soon.
````

## Special characters

It is still possible to create multiline strings with single quotes, using a so-called "newline character" written as `\n`, that denotes a line break:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // a list of guests, multiple lines, same as with backticks above
```

So to speak, these two lines describe the same: 

```js run
alert( "Hello\nWorld" ); // two lines, just like below

alert( `Hello
World` );
```

There are other, less common "special" characters as well, here's the list:

| Character | Description |
|-----------|-------------|
|`\b`|Backspace|
|`\f`|Form feed|
|`\n`|New line|
|`\r`|Carriage return|
|`\t`|Tab|
|`\uNNNN`|A unicode symbol with the hex code `NNNN`, for instance `\u00A9` -- is a unicode for the copyright symbol `©`. Must be exactly 4 hex digits. |
|`\u{NNNNNNNN}`|Some rare characters are encoded with two unicode symbols, taking up to 4 bytes. The long unicode requires braces around.|

For example:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 𠌱, a rare chinese hieroglyph 
```

As we can see, all special characters start with a backslash character `\`. It is also called an "escaping character".

Another use of it is an insertion of the enclosing quote into the string.

For instance:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

See, we have to prepend the inner quote by the backslash `\'`, because otherwise it would mean the string end.

As a more elegant solution, we could wrap the string in double quotes or backticks instead:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus! 
```

Most of time when we know we're going to use this or that kind of quotes inside of the string, we can choose non-conflicting quotes to enclose it. 

Note that the backslash `\` serves for the correct reading of the string by JavaScript, then disappears. The in-memory string has no `\`. You can clearly see that in `alert` from the examples above.

But what if we need exactly a backslash `\` in the string?

That's possible, but we need to double it like `\\`:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## The length and characters

- The `length` property has the string length: 

    ```js run
    alert( `My\n`.length ); // 3
    ```

    Note that `\n` is a single "special" character, so the length is indeed `3`.

- To get a character, use square brackets `[position]` or the method [str.charAt(position)](mdn:js/String/charAt). The first character starts from the zero position:

    ```js run
    let str = `Hello`;

    // the first character
    alert( str[0] ); // H
    alert( str.charAt(0) ); // H

    // the last character
    alert( str[str.length - 1] ); // o
    ```

    The square brackets is a modern way of getting a character, while `charAt` exists mostly for historical reasons.

    The only difference between them is that if no character found, `[]` returns `undefined`, and `charAt` returns an empty string:

    ```js run
    let str = `Hello`;

    alert( str[1000] ); // undefined
    alert( str.charAt(1000) ); // '' (an empty string)
    ```

```warn header="`length` is a property"
Please note that `str.length` is a numeric property, not a function. 

There is no need to add brackets after it. The call `str.length()` won't work, must use bare `str.length`.
```

## Strings are immutable

Strings can't be changed in JavaScript. It is impossible to change a character. 

Let's try to see that it doesn't work:

```js run
let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // doesn't work
```

The usual workaround is to create a whole new string and assign it to `str` instead of the old one.

For instance:

```js run
let str = 'Hi';

str = 'h' + str[1];  // replace the string

alert( str ); // hi
```

In the following sections we'll see more examples of that.

## Changing the case

Methods [toLowerCase()](mdn:js/String/toLowerCase) and [toUpperCase()](mdn:js/String/toUpperCase) change the case:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Or, if we want a single character lowercased:

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## Finding substrings

There are multiple ways to look for a substring in a string.

### str.indexOf

The first method is [str.indexOf(substr, pos)](mdn:js/String/indexOf). 

It looks for the `substr` in `str`, starting from the given position `pos`, and returns the position where the match was found or `-1` if nothing found.

For instance:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive

alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)
```

The optional second parameter allows to search starting from the given position.

For instance, the first occurence of `"id"` is at the position `1`. To look for the next occurence, let's start the search from the position `2`:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```


If we're interested in all occurences, we can run `indexOf` in a loop. Every new call is made with the position after the previous match:


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

```smart header="`str.lastIndexOf(pos)`"
There is also a similar method [str.lastIndexOf(pos)](mdn:js/String/lastIndexOf) that searches from the end of the string to its beginning.

It would list the occurences in the reverse way.
```

The inconvenience with `indexOf` is that we can't put it "as is" into an `if` check:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // won't work
}
```

That's because `str.indexOf("Widget")` returns `0` (found at the starting position). Right, but `if` considers that `false`.

So, we should actualy check for `-1`, like that:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!* 
    alert("We found it"); // works now!
}
```

````smart header="The bitwise NOT trick"
One of the old tricks used here is the [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` operator. For 32-bit integers the call `~n` is the same as `-(n+1)`. 

For instance:

```js run
alert( ~2 ); // -(2+1) = -3
alert( ~1 ); // -(1+1) = -2
alert( ~0 ); // -(0+1) = -1
*!*
alert( ~-1 ); // -(-1+1) = 0
*/!*
```
As we can see, `~n` is zero only if `n == -1`.

So, `if ( ~str.indexOf("...") )` means that the `indexOf` result is different from `-1`.

People use it to shorten `indexOf` checks:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // works
}
```

It is usually not recommended to use language features in a non-obvious way, but this particular trick is widely used, generally JavaScript programmers understand it.

Just remember: `if (~str.indexOf(...))` reads as "if found".
````

### includes, startsWith, endsWith

The more modern method [str.includes(substr)](mdn:js/String/includes) returns `true/false` depending on whether `str` has `substr` as its part.

That's usually a simpler way to go if we don't need the exact position:

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

The methods [str.startsWith](mdn:js/String/startsWith) and [str.endsWith](mdn:js/String/endsWith) do exactly what they promise:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
```


## Getting a substring

There are 3 methods in JavaScript to get a substring: `substring`, `substr` and `slice`.

`str.slice(start [, end])`
: Returns the part of the string from `start` to, but not including, `end`. 

    For instance:

    ```js run
    let str = "stringify";
    alert( str.slice(0,5) ); // 'string', the substring from 0, but not including 5
    alert( str.slice(0,1) ); // 's', the substring from 0, but not including 1
    ```

    If there is no `end` argument, then `slice` goes till the end of the string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, from the 2nd position till the end
    ```

    Negative values for `start/end` are also possible. They mean the position is counted from the string end:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // gif
    ```
    

`str.substring(start [, end])`
: Returns the part of the string *between* `start` and `end`.

    Almost the same as `slice`, but allows `start` greater than `end`. For instance:


    ```js run
    let str = "st*!*ring*/!*ify";

    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // compare with slice:
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)

    ```

    Negative arguments are treated as `0`. 


`str.substr(start [, length])`
: Returns the part of the string from `start`, with the given `length`.

    In contrast with the previous methods, this one allows to specify the `length` instead of the ending position:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, from the 2nd position get 4 characters
    ```

    The first argument may be negative, to count from the end:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, from the 4th position get 2 characters
    ```

Let's recap the methods to avoid any confusion:

| method | selects... | negatives |
|--------|-----------|-----------|
| `slice(start, end)` | from `start` to `end` | allows negatives |
| `substring(start, end)` | between `start` and `end` | negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |


```smart header="Which one to choose?"
All of them can do the job. The author of this chapter finds himself using `slice` almost all the time.
```

## Comparing strings

As we know from the chapter <info:comparison>, strings are compared character-by-character, in the alphabet order.

Although, there are some oddities.

1. A lowercase letter is always greater than the uppercase:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Letters with diacritical marks are "out of the alphabet":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    That may give strange results if we sort country names. Usually people would await for `Zealand` to be after `Österreich` in the list.

To understand the reasoning behind that, let's review the internal representaion of strings in JavaScript.

All strings are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back.

`str.codePointAt(pos)`
: Returns the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Creates a character by its numeric `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    We can also add unicode charactes by their codes using `\u` followed by the hex code:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Now let's make the string from the characters with codes `65..220` (the latin alphabet and a little bit extra):

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str ); 
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Now it becomes obvious why `a > Z`.

The characters are compared by their numeric code. The greater code means that the character is greater. 

And we can easily see that:

1. Lowercase letters go after uppercase letters, their codes are greater.
2. Some letters like `Ö` stand apart from the main alphabet. Here, it's code is greater than anything from `a` to `z`.


### The correct way

The "right" comparisons are more complex than it may seem. Because the alphabets are different for different languages. The same letter may be located differently in different alphabets.

Luckily, all modern browsers (IE10- requires the additional library [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

It provides a special method to compare strings in different languages, following their rules.

[str.localeCompare(str2)](mdn:js/String/localeCompare):

- Returns `1` if `str` is greater than `str2` according to the language rules.
- Returns `-1` if `str` is less than `str2`.
- Returns `0` if they are equal.

For instance:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

The method actually has two additional arguments, allowing to specify the language (by default taken from the environment) and setup additional rules like case sensivity or should `a` and `á` be treated as the same etc. See the manual for details when you need them.

## Encoding

```warn header="Advanced knowledge"
The section goes deeper into string internals. The knowledge will be useful for you if you plan to deal with emoji, rare math of hieroglyphs characters and such. 

You can skip the section if all you need is common letters and digits. 
```

### Surrogate pairs

Most symbols have a 2-byte code. Letters of most european languages, numbers, even most hieroglyphs have a 2-byte representation. 

But 2 bytes only allow 65536 combinations that's not enough for every possible symbol. So rare symbols are encoded with a pair of 2-byte characters called "a surrogate pair". 

Examples of symbols encoded this way:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare chinese hieroglyph
```

Note that surrogate pairs are incorrectly processed by the language most of the time. We actually have a single symbol in each of the strings above, but the `length` shows the length of `2`. 

`String.fromCodePoint` and `str.codePointAt` are notable exceptions that deal with surrogate pairs right. They recently appeared in the language. Before them, there were only [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt) that do the same, but don't work with surrogate pairs.

Getting a symbol can also be tricky, because most functions treat surrogate pairs as two characters:

```js run
alert( '𩷶'[0] ); // some strange symbols
alert( '𝒳'[0] ); // pieces of the surrogate pair
```

Note that pieces of the surrogate pair have no meaning without each other. So, the alerts actually display garbage.

How to solve this problem? First, let's make sure you have it. Not every project deals with surrogate pairs.

But if you do, then there are libraries in the net which implement surrogate-aware versions of `slice`, `indexOf` and other functions. Surrogate pairs are detectable by their codes: the first character has the code in the interval of `0xD800..0xDBFF`, while the second is in `0xDC00..0xDFFF`. So if we see a character with the code, say, `0xD801`, then the next one must be the second part of the surrogate pair.

### Diacritical marks

In many languages there are symbols that are composed of the base character and a mark above/under it.

For instance, letter `a` can be the base character for: `àáâäãåā`. Most common "composite" character have their own code in the UTF-16 table. But not all of them.

To generate arbitrary compositions, several unicode characters are used: the base character and one or many "mark" characters.

For instance, if we have `S` followed by "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

If we need a one more mark over the letter (or below it) -- no problems, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

The example:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

This leads to great flexibility, but also an interesting problem: the same symbol visually can be represented with different unicode compositions.

For instance:

```js run
alert( 'S\u0307\u0323' ); // Ṩ, S + dot above + dot below
alert( 'S\u0323\u0307' ); // Ṩ, S + dot below + dot above

alert( 'S\u0307\u0323' == 'S\u0323\u0307' ); // false
```

To solve it, there exists a "unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

It's rather funny that in that exactly situation `normalize()` brings a sequence of 3 characters to one: `\u1e68` (S with two dots).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

In real, that is not always so, but the symbol `Ṩ` was considered "common enough" by UTF-16 creators to include it into the main table. 

For most practical tasks that information is enough, but if you want to learn more about normalization rules and variants -- they are described in the appendix to the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/).


## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions.
- Strings in JavaScript are encoded using UTF-16. 
- We can use special characters like `\n` and insert letters by their unicode using `\u...`.
- To get a character: use `[]`.
- To get a substring: use `slice` or `substr/substring`.
- To lowercase/uppercase a string: use `toLowerCase/toUpperCase`.
- To look for a substring: use `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings, like `str.trim()` that removes ("trims") spaces from the beginning and end of the string, see the [manual](mdn:js/String) for them.

Also strings have methods for doing search/replace with regular expressions. But that topic deserves a separate chapter, so we'll return to that later.

