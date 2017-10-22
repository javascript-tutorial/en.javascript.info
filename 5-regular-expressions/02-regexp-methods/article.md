# Methods of RegExp and String

There are two sets of methods to deal with regular expressions.

1. First, regular expressions are objects of the built-in [RegExp](mdn:js/RegExp) class, it provides many methods.
2. Besides that, there are methods in regular strings can work with regexps.

The structure is a bit messed up, so we'll first consider methods separately, and then -- practical recipes for common tasks.

[cut]

## str.search(reg)

We've seen this method already. It returns the position of the first match or `-1` if none found:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( *!*/a/i*/!* ) ); // 0 (the first position)
```

**The important limitation: `search` always looks for the first match.**

We can't find next positions using `search`, there's just no syntax for that. But there are other methods that can.

## str.match(reg), no "g" flag

The method `str.match` behavior varies depending on the `g` flag. First let's see the case without it.

Then `str.match(reg)` looks for the first match only.

The result is an array with that match and additional properties:

- `index` -- the position of the match inside the string,
- `input` -- the subject string.

For instance:

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

alert( result[0] );    // Fame (the match)
alert( result.index ); // 0 (at the zero position)
alert( result.input ); // "Fame is the thirst of youth" (the string)
```

The array may have more than one element.

**If a part of the pattern is delimited by parentheses `(...)`, then it becomes a separate element of the array.**

For instance:

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

alert( result[0] ); // JavaScript (the whole match)
alert( result[1] ); // script (the part of the match that corresponds to the parentheses)
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

Due to the `i` flag the search is case-insensitive, so it finds `match:JavaScript`. The part of the match that corresponds to `pattern:SCRIPT` becomes a separate array item.

We'll be back to parentheses later in the chapter <info:regexp-groups>. They are great for search-and-replace.

## str.match(reg) with "g" flag

When there's a `"g"` flag, then `str.match` returns an array of all matches. There are no additional properties in that array, and parentheses do not create any elements.

For instance:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/ho/ig*/!* );

alert( result ); // HO, Ho, ho (all matches, case-insensitive)
```

With parentheses nothing changes, here we go:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/h(o)/ig*/!* );

alert( result ); // HO, Ho, ho
```

So, with `g` flag the `result` is a simple array of matches. No additional properties.

If we want to get information about match positions and use parentheses then we should use  [RegExp#exec](mdn:js/RegExp/exec) method that we'll cover below.

````warn header="If there are no matches, the call to `match` returns `null`"
Please note, that's important. If there were no matches, the result is not an empty array, but `null`.

Keep that in mind to evade pitfalls like this:

```js run
let str = "Hey-hey-hey!";

alert( str.match(/ho/gi).length ); // error! there's no length of null
```
````

## str.split(regexp|substr, limit)

Splits the string using the regexp (or a substring) as a delimiter.

We already used `split` with strings, like this:

```js run
alert('12-34-56'.split('-')) // [12, 34, 56]
```

But we can also pass a regular expression:

```js run
alert('12-34-56'.split(/-/)) // [12, 34, 56]
```

## str.replace(str|reg, str|func)

The swiss army knife for search and replace in strings.

The simplest use -- search and replace a substring, like this:

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

When the first argument of `replace` is a string, it only looks for the first match.

To find all dashes, we need to use not the string `"-"`, but a regexp `pattern:/-/g`, with an obligatory `g` flag:

```js run
// replace all dashes by a colon
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

The second argument is a replacement string.

We can use special characters in it:

| Symbol | Inserts |
|--------|--------|
|`$$`|`"$"` |
|`$&`|the whole match|
|<code>$&#096;</code>|a part of the string before the match|
|`$'`|a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it means the contents of n-th parentheses counting from left to right|

For instance let's use `$&` to replace all entries of `"John"` by `"Mr.John"`:

```js run
let str = "John Doe, John Smith and John Bull.";

// for each John - replace it with Mr. and then John
alert(str.replace(/John/g, 'Mr.$&'));
// "Mr.John Doe, Mr.John Smith and Mr.John Bull.";
```

Parentheses are very often used together with `$1`, `$2`, like this:

```js run
let str = "John Smith";

alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, John
```

**For situations that require "smart" replacements, the second argument can be a function.**

It will be called for each match, and its result will be inserted as a replacement.

For instance:

```js run
let i = 0;

// replace each "ho" by the result of the function
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3
```

In the example above the function just returns the next number every time, but usually the result is based on the match.

The function is called with arguments `func(str, p1, p2, ..., pn, offset, s)`:

1. `str` -- the match,
2. `p1, p2, ..., pn` -- contents of parentheses (if there are any),
3. `offset` -- position of the match,
4. `s` -- the source string.

If there are no parentheses in the regexp, then the function always has 3 arguments: `func(str, offset, s)`.

Let's use it to show full information about matches:

```js run
// show and replace all matches
function replacer(str, offset, s) {
  alert(`Found ${str} at position ${offset} in string ${s}`);
  return str.toLowerCase();
}

let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

// shows each match:
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho
```

In the example below there are two parentheses, so `replacer` is called with 5 arguments: `str` is the full match, then parentheses, and then `offset` and `s`:

```js run
function replacer(str, name, surname, offset, s) {
  // name is the first parentheses, surname is the second one
  return surname + ", " + name;
}

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, replacer)) // Smith, John
```

Using a function gives us the ultimate replacement power, because it gets all the information about the match, has access to outer variables and can do everything.

## regexp.test(str)

Let's move on to the methods of `RegExp` class, that are callable on regexps themselves.

The `test` method looks for any match and returns `true/false` whether he found it.

So it's basically the same as `str.search(reg) != -1`, for instance:

```js run
let str = "I love JavaScript";

// these two tests do the same
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

An example with the negative answer:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

## regexp.exec(str)

We've already seen these searching methods:

- `search` -- looks for the position of the match,
- `match` -- if there's no `g` flag, returns the first match with parentheses,
- `match` -- if there's a `g` flag -- returns all matches, without separating parentheses.

The `regexp.exec` method is a bit harder to use, but it allows to search all matches with parentheses and positions.

It behaves differently depending on whether the regexp has the `g` flag.

- If there's no `g`, then `regexp.exec(str)` returns the first match, exactly as `str.match(reg)`.
- If there's `g`, then `regexp.exec(str)` returns the first match and *remembers* the position after it in `regexp.lastIndex` property. The next call starts to search from `regexp.lastIndex` and returns the next match. If there are no more matches then `regexp.exec` returns `null` and `regexp.lastIndex` is set to `0`.

As we can see, the method gives us nothing new if we use it without the `g` flag, because `str.match` does exactly the same.

But the `g` flag allows to get all matches with their positions and parentheses groups.

Here's the example how subsequent `regexp.exec` calls return matches one by one:

```js run
let str = "A lot about JavaScript at https://javascript.info";

let regexp = /JAVA(SCRIPT)/ig;

*!*
// Look for the first match
*/!*
let matchOne = regexp.exec(str);
alert( matchOne[0] ); // JavaScript
alert( matchOne[1] ); // script
alert( matchOne.index ); // 12 (the position of the match)
alert( matchOne.input ); // the same as str

alert( regexp.lastIndex ); // 22 (the position after the match)

*!*
// Look for the second match
*/!*
let matchTwo = regexp.exec(str); // continue searching from regexp.lastIndex
alert( matchTwo[0] ); // javascript
alert( matchTwo[1] ); // script
alert( matchTwo.index ); // 34 (the position of the match)
alert( matchTwo.input ); // the same as str

alert( regexp.lastIndex ); // 44 (the position after the match)

*!*
// Look for the third match
*/!*
let matchThree = regexp.exec(str); // continue searching from regexp.lastIndex
alert( matchThree ); // null (no match)

alert( regexp.lastIndex ); // 0 (reset)
```

As we can see, each `regexp.exec` call returns the match in a "full format": as an array with parentheses, `index` and `input` properties.

The main use case for `regexp.exec` is to find all matches in a loop:

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
}
```

The loop continues until `regexp.exec` returns `null` that means "no more matches".

````smart header="Search from the given position"
We can force `regexp.exec` to start searching from the given position by setting `lastIndex` manually:

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;
regexp.lastIndex = 30;

alert( regexp.exec(str).index ); // 34, the search starts from the 30th position
```
````

## The "y" flag [#y-flag]

The `y` flag means that the search should find a match exactly at the position specified by the property `regexp.lastIndex` and only there.

In other words, normally the search is made in the whole string: `pattern:/javascript/` looks for "javascript" everywhere in the string.

But when a regexp has the `y` flag, then it only looks for the match at the position specified in `regexp.lastIndex` (`0` by default).

For instance:

```js run
let str = "I love JavaScript!";

let reg = /javascript/iy;

alert( reg.lastIndex ); // 0 (default)
alert( str.match(reg) ); // null, not found at position 0

reg.lastIndex = 7;
alert( str.match(reg) ); // JavaScript (right, that word starts at position 7)

// for any other reg.lastIndex the result is null
```

The regexp `pattern:/javascript/iy` can only be found if we set `reg.lastIndex=7`, because due to `y` flag the engine only tries to find it in the single place within a string -- from the `reg.lastIndex` position.

So, what's the point? Where do we apply that?

The reason is performance.

The `y` flag works great for parsers -- programs that need to "read" the text and build in-memory syntax structure or perform actions from it. For that we move along the text and apply regular expressions to see what we have next: a string? A number? Something else?

The `y` flag allows to apply a regular expression (or many of them one-by-one) exactly at the given position and when we understand what's there, we can move on -- step by step examining the text.

Without the flag the regexp engine always searches till the end of the text, that takes time, especially if the text is large. So our parser would be very slow. The `y` flag is exactly the right thing here.

## Summary, recipes

Methods become much easier to understand if we separate them by their use in real-life tasks.

To search for the first match only:
: - Find the position of the first match -- `str.search(reg)`.
- Find the full match -- `str.match(reg)`.
- Check if there's a match -- `regexp.test(str)`.
- Find the match from the given position -- `regexp.exec(str)`, set `regexp.lastIndex` to position.

To search for all matches:
: - An array of matches -- `str.match(reg)`, the regexp with `g` flag.
- Get all matches with full information about each one -- `regexp.exec(str)` with `g` flag in the loop.

To search and replace:
: - Replace with another string or a function result -- `str.replace(reg, str|func)`

To split the string:
: - `str.split(str|reg)`

We also covered two flags:

- The `g` flag to find all matches (global search),
- The `y` flag to search at exactly the given position inside the text.

Now we know the methods and can use regular expressions. But we need to learn their syntax, so let's move on.
